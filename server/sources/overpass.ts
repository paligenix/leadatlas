import type { Lead, SubNiche, City } from "../../shared/types.ts";
import { bboxOf } from "../../shared/cities.ts";

const MIRRORS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.openstreetmap.fr/api/interpreter",
];

let mirrorIndex = 0;

function tag(el: Record<string, string> | undefined, ...keys: string[]): string {
  if (!el) return "";
  for (const k of keys) {
    const v = el[k];
    if (v) return v.trim();
  }
  return "";
}

function addr(tags: Record<string, string>): { address: string; district: string; city: string } {
  const parts = [
    tag(tags, "addr:street"),
    tag(tags, "addr:housenumber"),
    tag(tags, "addr:city", "addr:town", "addr:village"),
  ].filter(Boolean);
  return {
    address: tag(tags, "addr:full") || parts.join(", "),
    district: tag(tags, "addr:suburb", "addr:district", "addr:neighbourhood", "addr:quarter"),
    city: tag(tags, "addr:city", "addr:town", "addr:village"),
  };
}

export function osmToLead(
  el: {
    type: string;
    id: number;
    lat?: number;
    lon?: number;
    center?: { lat: number; lon: number };
    tags?: Record<string, string>;
  },
  city: City,
  sub: SubNiche,
  nicheId: string,
): Lead | null {
  const tags = el.tags ?? {};
  const lat = el.lat ?? el.center?.lat;
  const lon = el.lon ?? el.center?.lon;
  if (lat == null || lon == null) return null;
  const name = tag(tags, "name", "name:ru", "name:en", "brand", "operator");
  if (!name) return null;
  const a = addr(tags);
  return {
    id: `osm-${el.type}-${el.id}`,
    name,
    nicheId,
    subId: sub.id,
    country: city.country,
    cc: city.cc,
    city: a.city || city.local || city.en,
    district: a.district,
    address: a.address,
    phone: tag(tags, "phone", "contact:phone", "contact:mobile", "mobile"),
    email: tag(tags, "email", "contact:email"),
    website: tag(tags, "website", "contact:website", "url"),
    telegram: tag(tags, "contact:telegram", "telegram"),
    instagram: tag(tags, "contact:instagram", "instagram"),
    facebook: tag(tags, "contact:facebook", "facebook"),
    vk: tag(tags, "contact:vkontakte", "contact:vk", "vk"),
    whatsapp: tag(tags, "contact:whatsapp", "whatsapp"),
    lat,
    lon,
    source: "OpenStreetMap",
    osmId: `${el.type}/${el.id}`,
    foundAt: Date.now(),
  };
}

export async function overpassSearch(city: City, sub: SubNiche): Promise<unknown[]> {
  const [s, w, n, e] = bboxOf(city);
  const filters = sub.osm
    .map(([k, v]) => `nwr["${k}"="${v}"](${s},${w},${n},${e});`)
    .join("\n  ");
  const query = `[out:json][timeout:28];
(
  ${filters}
);
out tags center 80;`;

  const url = MIRRORS[mirrorIndex % MIRRORS.length];
  mirrorIndex += 1;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Accept: "application/json",
      "User-Agent": "LeadAtlas/1.0 (open-map business discovery)",
    },
    body: new URLSearchParams({ data: query }),
    signal: AbortSignal.timeout(32_000),
  });
  if (!res.ok) throw new Error(`Overpass ${res.status} @ ${url}`);
  const json = (await res.json()) as { elements?: unknown[] };
  return json.elements ?? [];
}
