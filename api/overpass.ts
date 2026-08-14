export const config = { runtime: "edge" };

const MIRRORS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.openstreetmap.fr/api/interpreter",
];

export async function POST(request: Request) {
  const body = await request.text();
  let last = "overpass proxy failed";
  for (const url of MIRRORS) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Accept: "application/json",
          "User-Agent": "LeadAtlas/1.0",
        },
        body,
      });
      if (!res.ok) {
        last = `Overpass ${res.status}`;
        continue;
      }
      return new Response(await res.text(), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    } catch (err) {
      last = err instanceof Error ? err.message : String(err);
    }
  }
  return new Response(JSON.stringify({ error: last }), {
    status: 502,
    headers: { "Content-Type": "application/json" },
  });
}
