import type { City, Lead, SubNiche } from "./types";

export function tag(el: Record<string, string> | undefined, ...keys: string[]): string {
  if (!el) return "";
  for (const k of keys) {
    const v = el[k];
    if (v) return v.trim();
  }
  return "";
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
  const parts = [
    tag(tags, "addr:street"),
    tag(tags, "addr:housenumber"),
    tag(tags, "addr:city", "addr:town", "addr:village"),
  ].filter(Boolean);
  return {
    id: `osm-${el.type}-${el.id}`,
    name,
    nicheId,
    subId: sub.id,
    country: city.country,
    cc: city.cc,
    city: tag(tags, "addr:city", "addr:town", "addr:village") || city.local || city.en,
    district: tag(tags, "addr:suburb", "addr:district", "addr:neighbourhood", "addr:quarter"),
    address: tag(tags, "addr:full") || parts.join(", "),
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

export interface PhotonHit {
  geometry?: { coordinates?: [number, number] };
  properties?: {
    osm_id?: number;
    osm_type?: string;
    name?: string;
    city?: string;
    country?: string;
    countrycode?: string;
    street?: string;
    housenumber?: string;
    district?: string;
    locality?: string;
    osm_key?: string;
    osm_value?: string;
    type?: string;
  };
}

export function photonToLead(hit: PhotonHit, city: City, sub: SubNiche, nicheId: string): Lead | null {
  const p = hit.properties ?? {};
  const coords = hit.geometry?.coordinates;
  if (!coords || !p.name) return null;
  const key = `${p.osm_key || ""}:${p.osm_value || ""}:${p.type || ""}`;
  if (!/shop|amenity|craft|office|tourism|leisure|healthcare|club/i.test(key)) return null;
  const [lon, lat] = coords;
  const osmType = p.osm_type === "N" ? "node" : p.osm_type === "W" ? "way" : p.osm_type === "R" ? "relation" : "";
  return {
    id: p.osm_id ? `ph-${osmType}-${p.osm_id}` : `ph-${p.name}-${lat.toFixed(4)}-${lon.toFixed(4)}`,
    name: p.name,
    nicheId,
    subId: sub.id,
    country: p.country || city.country,
    cc: (p.countrycode || city.cc).toUpperCase(),
    city: p.city || p.locality || city.en,
    district: p.district || "",
    address: [p.street, p.housenumber, p.city].filter(Boolean).join(", "),
    phone: "",
    email: "",
    website: "",
    telegram: "",
    instagram: "",
    facebook: "",
    vk: "",
    whatsapp: "",
    lat,
    lon,
    source: "Photon / OSM",
    osmId: p.osm_id && osmType ? `${osmType}/${p.osm_id}` : undefined,
    foundAt: Date.now(),
  };
}

export function overpassQuery(south: number, west: number, north: number, east: number, osm: Array<[string, string]>): string {
  const filters = osm.map(([k, v]) => `nwr["${k}"="${v}"](${south},${west},${north},${east});`).join("\n  ");
  return `[out:json][timeout:28];\n(\n  ${filters}\n);\nout tags center 80;`;
}

export function leadKey(lead: Pick<Lead, "osmId" | "name" | "phone" | "lat" | "lon">): string {
  if (lead.osmId) return `osm:${lead.osmId}`;
  const phone = (lead.phone || "").replace(/\D+/g, "");
  if (phone.length >= 8) return `p:${phone}`;
  return `n:${lead.name.toLowerCase().trim()}@${lead.lat.toFixed(4)},${lead.lon.toFixed(4)}`;
}
