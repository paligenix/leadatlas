import { bboxOf } from "@shared/cities";
import { overpassQuery, type PhotonHit } from "@shared/osm";
import type { SubNiche } from "@shared/types";

const MIRRORS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.openstreetmap.fr/api/interpreter",
];

let mirror = 0;

async function postJson(url: string, init: RequestInit): Promise<Response> {
  const res = await fetch(url, { ...init, signal: init.signal ?? AbortSignal.timeout(28_000) });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res;
}

export async function fetchOverpass(city: City, sub: SubNiche): Promise<unknown[]> {
  const [s, w, n, e] = bboxOf(city);
  const query = overpassQuery(s, w, n, e, sub.osm);
  const body = new URLSearchParams({ data: query });
  const urls = [MIRRORS[mirror % MIRRORS.length], "/api/overpass"];
  mirror += 1;
  let last = "overpass failed";
  for (const url of urls) {
    try {
      const res = await postJson(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", Accept: "application/json" },
        body,
      });
      const json = (await res.json()) as { elements?: unknown[] };
      return json.elements ?? [];
    } catch (err) {
      last = err instanceof Error ? err.message : String(err);
    }
  }
  throw new Error(last);
}

export async function fetchPhoton(query: string, city: City, limit = 18): Promise<PhotonHit[]> {
  const qs = new URLSearchParams({
    q: `${query} ${city.en}`,
    lat: String(city.lat),
    lon: String(city.lon),
    limit: String(limit),
    lang: "en",
  });
  const urls = [`https://photon.komoot.io/api/?${qs}`, `/api/photon?${qs}`];
  let last = "photon failed";
  for (const url of urls) {
    try {
      const res = await postJson(url, { method: "GET", headers: { Accept: "application/json" } });
      const json = (await res.json()) as { features?: PhotonHit[] };
      return json.features ?? [];
    } catch (err) {
      last = err instanceof Error ? err.message : String(err);
    }
  }
  throw new Error(last);
}
