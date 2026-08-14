import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Lead } from "../shared/types.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = join(root, "data");
const file = join(dataDir, "leads.json");

function keyOf(lead: Pick<Lead, "osmId" | "name" | "phone" | "lat" | "lon">): string {
  if (lead.osmId) return `osm:${lead.osmId}`;
  const phone = (lead.phone || "").replace(/\D+/g, "");
  if (phone.length >= 8) return `p:${phone}`;
  const lat = lead.lat.toFixed(4);
  const lon = lead.lon.toFixed(4);
  return `n:${lead.name.toLowerCase().trim()}@${lat},${lon}`;
}

export class LeadStore {
  private map = new Map<string, Lead>();
  private dirty = false;

  constructor() {
    mkdirSync(dataDir, { recursive: true });
    if (existsSync(file)) {
      try {
        const raw = JSON.parse(readFileSync(file, "utf8")) as Lead[];
        for (const lead of raw) this.map.set(keyOf(lead), lead);
      } catch {
        /* empty start */
      }
    }
    setInterval(() => this.flush(), 15_000).unref();
  }

  get size() {
    return this.map.size;
  }

  add(lead: Lead): Lead | null {
    const key = keyOf(lead);
    const prev = this.map.get(key);
    if (prev) {
      const merged = mergeLead(prev, lead);
      if (JSON.stringify(merged) !== JSON.stringify(prev)) {
        this.map.set(key, merged);
        this.dirty = true;
      }
      return null;
    }
    this.map.set(key, lead);
    this.dirty = true;
    return lead;
  }

  list(filter: {
    subId?: string;
    cc?: string;
    q?: string;
    offset?: number;
    limit?: number;
  }): { total: number; items: Lead[] } {
    let items = [...this.map.values()];
    if (filter.subId) items = items.filter((x) => x.subId === filter.subId);
    if (filter.cc) items = items.filter((x) => x.cc === filter.cc);
    if (filter.q) {
      const q = filter.q.toLowerCase();
      items = items.filter((x) =>
        [x.name, x.city, x.address, x.phone, x.website].join(" ").toLowerCase().includes(q),
      );
    }
    items.sort((a, b) => b.foundAt - a.foundAt);
    const total = items.length;
    const offset = filter.offset ?? 0;
    const limit = filter.limit ?? 80;
    return { total, items: items.slice(offset, offset + limit) };
  }

  stats() {
    const bySub = new Map<string, number>();
    const byCountry = new Map<string, { cc: string; country: string; count: number }>();
    for (const lead of this.map.values()) {
      bySub.set(lead.subId, (bySub.get(lead.subId) ?? 0) + 1);
      const cur = byCountry.get(lead.cc);
      if (cur) cur.count += 1;
      else byCountry.set(lead.cc, { cc: lead.cc, country: lead.country, count: 1 });
    }
    return {
      total: this.map.size,
      bySub: [...bySub.entries()].map(([id, count]) => ({ id, count })),
      byCountry: [...byCountry.values()].sort((a, b) => b.count - a.count),
    };
  }

  allCoords(): Array<{ lat: number; lon: number; subId: string; name: string }> {
    return [...this.map.values()].map((x) => ({
      lat: x.lat,
      lon: x.lon,
      subId: x.subId,
      name: x.name,
    }));
  }

  flush() {
    if (!this.dirty) return;
    writeFileSync(file, JSON.stringify([...this.map.values()], null, 0));
    this.dirty = false;
  }
}

function mergeLead(a: Lead, b: Lead): Lead {
  const pick = (x: string, y: string) => x || y;
  return {
    ...a,
    phone: pick(a.phone, b.phone),
    email: pick(a.email, b.email),
    website: pick(a.website, b.website),
    telegram: pick(a.telegram, b.telegram),
    instagram: pick(a.instagram, b.instagram),
    facebook: pick(a.facebook, b.facebook),
    vk: pick(a.vk, b.vk),
    whatsapp: pick(a.whatsapp, b.whatsapp),
    address: a.address.length >= b.address.length ? a.address : b.address,
    district: pick(a.district, b.district),
  };
}
