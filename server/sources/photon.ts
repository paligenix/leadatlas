import type { City, Lead, SubNiche } from "../../shared/types.ts";

interface PhotonHit {
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

export async function photonSearch(query: string, city: City, limit = 18): Promise<PhotonHit[]> {
  const url = new URL("https://photon.komoot.io/api/");
  url.searchParams.set("q", `${query} ${city.en}`);
  url.searchParams.set("lat", String(city.lat));
  url.searchParams.set("lon", String(city.lon));
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("lang", "en");

  const res = await fetch(url, {
    headers: { "User-Agent": "LeadAtlas/1.0 (open-map business discovery)" },
    signal: AbortSignal.timeout(18_000),
  });
  if (!res.ok) throw new Error(`Photon ${res.status}`);
  const json = (await res.json()) as { features?: PhotonHit[] };
  return json.features ?? [];
}

export function photonToLead(
  hit: PhotonHit,
  city: City,
  sub: SubNiche,
  nicheId: string,
): Lead | null {
  const p = hit.properties ?? {};
  const coords = hit.geometry?.coordinates;
  if (!coords || !p.name) return null;
  const key = `${p.osm_key || ""}:${p.osm_value || ""}:${p.type || ""}`;
  const useful = /shop|amenity|craft|office|tourism|leisure|healthcare|club/i.test(key);
  if (!useful) return null;
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
