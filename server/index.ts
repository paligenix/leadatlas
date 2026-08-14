import express from "express";
import cors from "cors";
import { NICHES, findSub } from "../shared/niches.ts";
import { COUNTRIES } from "../shared/cities.ts";
import { LeadStore } from "./store.ts";
import { SearchEngine } from "./engine.ts";
import type { Gender, Lead, SearchConfig } from "../shared/types.ts";

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

const store = new LeadStore();
const engine = new SearchEngine(store);

const sseClients = new Set<express.Response>();

function push(event: string, data: unknown) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of sseClients) res.write(payload);
}

engine.on("lead", (lead: Lead) => push("lead", lead));
engine.on("status", (status) => push("status", status));

app.get("/api/niches", (_req, res) => {
  res.json({ niches: NICHES });
});

app.get("/api/countries", (_req, res) => {
  res.json({ countries: COUNTRIES });
});

app.get("/api/status", (_req, res) => {
  res.json(engine.status);
});

app.post("/api/search/start", (req, res) => {
  const body = req.body as Partial<SearchConfig>;
  const subIds = Array.isArray(body.subIds) ? body.subIds.filter((id) => findSub(String(id))) : [];
  const gender = (body.gender as Gender) || "all";
  if (!subIds.length) {
    res.status(400).json({ error: "Выберите хотя бы одну поднишу" });
    return;
  }
  engine.start({ subIds, gender });
  res.json(engine.status);
});

app.post("/api/search/stop", (_req, res) => {
  engine.stop();
  res.json(engine.status);
});

app.get("/api/leads", (req, res) => {
  const subId = typeof req.query.subId === "string" ? req.query.subId : undefined;
  const cc = typeof req.query.cc === "string" ? req.query.cc : undefined;
  const q = typeof req.query.q === "string" ? req.query.q : undefined;
  const offset = Number(req.query.offset || 0);
  const limit = Math.min(200, Number(req.query.limit || 80));
  res.json(store.list({ subId, cc, q, offset, limit }));
});

app.get("/api/stats", (_req, res) => {
  res.json(store.stats());
});

app.get("/api/points", (_req, res) => {
  res.json({ points: store.allCoords() });
});

app.get("/api/export.csv", (req, res) => {
  const { items } = store.list({
    subId: typeof req.query.subId === "string" ? req.query.subId : undefined,
    cc: typeof req.query.cc === "string" ? req.query.cc : undefined,
    q: typeof req.query.q === "string" ? req.query.q : undefined,
    offset: 0,
    limit: 100000,
  });
  const header = [
    "name",
    "niche",
    "sub",
    "country",
    "city",
    "district",
    "address",
    "phone",
    "email",
    "website",
    "telegram",
    "instagram",
    "facebook",
    "vk",
    "whatsapp",
    "lat",
    "lon",
    "source",
  ];
  const rows = items.map((l) => {
    const sub = findSub(l.subId);
    const vals = [
      l.name,
      sub?.niche.ru ?? l.nicheId,
      sub?.sub.ru ?? l.subId,
      l.country,
      l.city,
      l.district,
      l.address,
      l.phone,
      l.email,
      l.website,
      l.telegram,
      l.instagram,
      l.facebook,
      l.vk,
      l.whatsapp,
      l.lat,
      l.lon,
      l.source,
    ];
    return vals.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",");
  });
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", "attachment; filename=leadatlas.csv");
  res.send("\uFEFF" + [header.join(","), ...rows].join("\n"));
});

app.get("/api/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();
  res.write(`event: status\ndata: ${JSON.stringify(engine.status)}\n\n`);
  sseClients.add(res);
  const ping = setInterval(() => res.write(`event: ping\ndata: {}\n\n`), 25000);
  req.on("close", () => {
    clearInterval(ping);
    sseClients.delete(res);
  });
});

const port = Number(process.env.PORT || 8787);
app.listen(port, () => {
  console.log(`LeadAtlas API http://127.0.0.1:${port}`);
});
