import { CITIES } from "@shared/cities";
import { findSub } from "@shared/niches";
import { leadKey, osmToLead, photonToLead } from "@shared/osm";
import { buildQueries, collectSynonyms, withGender } from "@shared/synonyms";
import type { EngineStatus, Gender, Lead } from "@shared/types";
import { useApp } from "../store";
import { fetchOverpass, fetchPhoton } from "./fetch";

const KEY = "leadatlas-leads-v1";
const leads = new Map<string, Lead>();
let stopFlag = false;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function statusPatch(p: Partial<EngineStatus>) {
  const status = { ...useApp.getState().status, ...p, unique: leads.size };
  useApp.getState().set({ status, total: leads.size });
}

function statsFrom(all: Lead[]) {
  const bySub = new Map<string, number>();
  const byCountry = new Map<string, { cc: string; country: string; count: number }>();
  for (const lead of all) {
    bySub.set(lead.subId, (bySub.get(lead.subId) ?? 0) + 1);
    const cur = byCountry.get(lead.cc);
    if (cur) cur.count += 1;
    else byCountry.set(lead.cc, { cc: lead.cc, country: lead.country, count: 1 });
  }
  return {
    bySub: [...bySub.entries()].map(([id, count]) => ({ id, count })),
    byCountry: [...byCountry.values()].sort((a, b) => b.count - a.count),
  };
}

function publish(added?: Lead) {
  const all = [...leads.values()].sort((a, b) => b.foundAt - a.foundAt);
  const { filterSub, filterCc, query, ticker } = useApp.getState();
  const q = query.trim().toLowerCase();
  const visible = all.filter((x) => {
    if (filterSub && x.subId !== filterSub) return false;
    if (filterCc && x.cc !== filterCc) return false;
    if (q && ![x.name, x.city, x.address, x.phone, x.website].join(" ").toLowerCase().includes(q)) return false;
    return true;
  });
  const points = all.map((x) => ({ lat: x.lat, lon: x.lon, subId: x.subId, name: x.name }));
  const nextTicker = added ? [`${added.name} · ${added.city}`, ...ticker].slice(0, 8) : ticker;
  useApp.getState().set({
    leads: visible.slice(0, 80),
    total: all.length,
    points,
    ticker: nextTicker,
    ...statsFrom(all),
  });
  statusPatch({ unique: all.length });
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify([...leads.values()].slice(-6000)));
  } catch {
    /* quota */
  }
}

export function restoreLeads() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "[]") as Lead[];
    for (const lead of raw) leads.set(leadKey(lead), lead);
  } catch {
    /* empty */
  }
  publish();
}

function ingest(lead: Lead | null) {
  if (!lead) return;
  const key = leadKey(lead);
  if (leads.has(key)) return;
  leads.set(key, lead);
  statusPatch({ found: useApp.getState().status.found + 1, unique: leads.size });
  publish(lead);
}

export function exportCsv(): string {
  const header = [
    "name",
    "niche",
    "country",
    "city",
    "district",
    "address",
    "phone",
    "email",
    "website",
    "telegram",
    "instagram",
    "lat",
    "lon",
    "source",
  ];
  const rows = [...leads.values()].map((l) => {
    const found = findSub(l.subId);
    const vals = [
      l.name,
      found?.sub.ru ?? l.subId,
      l.country,
      l.city,
      l.district,
      l.address,
      l.phone,
      l.email,
      l.website,
      l.telegram,
      l.instagram,
      l.lat,
      l.lon,
      l.source,
    ];
    return vals.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",");
  });
  return "\uFEFF" + [header.join(","), ...rows].join("\n");
}

export function refreshView() {
  publish();
}

export function stopSearch() {
  stopFlag = true;
  statusPatch({ running: false, currentQuery: "остановлено" });
}

export function startSearch(subIds: string[], gender: Gender) {
  if (useApp.getState().status.running) return useApp.getState().status;
  const pairs = subIds.map((id) => findSub(id)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  if (!pairs.length) {
    statusPatch({ lastError: "Не выбраны ниши" });
    return useApp.getState().status;
  }
  stopFlag = false;
  statusPatch({
    running: true,
    startedAt: Date.now(),
    lastError: "",
    currentQuery: "запуск",
  });
  void loop(pairs, gender);
  return useApp.getState().status;
}

async function loop(pairs: NonNullable<ReturnType<typeof findSub>>[], gender: Gender) {
  let step = 0;
  while (!stopFlag) {
    const pair = pairs[step % pairs.length];
    const city = CITIES[Math.floor(step / pairs.length) % CITIES.length];
    step += 1;
    statusPatch({
      currentCity: `${city.en} · ${city.country}`,
      currentSub: pair.sub.ru,
      currentQuery: `OSM · ${city.en}`,
      queries: useApp.getState().status.queries + 1,
    });
    try {
      const elements = await fetchOverpass(city, pair.sub);
      for (const el of elements) {
        ingest(osmToLead(el as Parameters<typeof osmToLead>[0], city, pair.sub, pair.niche.id));
      }
    } catch (err) {
      statusPatch({ lastError: err instanceof Error ? err.message : String(err) });
      await sleep(2500);
    }
    if (stopFlag) break;

    const syn = withGender(collectSynonyms(pair.sub.packs, pair.sub.extra), gender);
    const queries = buildQueries(syn, city.aliases, []).slice(0, 3);
    for (const q of queries) {
      if (stopFlag) break;
      statusPatch({
        currentQuery: q,
        queries: useApp.getState().status.queries + 1,
      });
      try {
        const hits = await fetchPhoton(q, city);
        for (const hit of hits) ingest(photonToLead(hit, city, pair.sub, pair.niche.id));
      } catch (err) {
        statusPatch({ lastError: err instanceof Error ? err.message : String(err) });
      }
      await sleep(900);
    }
    persist();
    await sleep(1600);
  }
  persist();
  statusPatch({ running: false });
}
