export const config = { runtime: "edge" };

export async function GET(request: Request) {
  const src = new URL(request.url);
  const dest = new URL("https://photon.komoot.io/api/");
  src.searchParams.forEach((v, k) => dest.searchParams.set(k, v));
  const res = await fetch(dest, {
    headers: { Accept: "application/json", "User-Agent": "LeadAtlas/1.0" },
  });
  return new Response(await res.text(), {
    status: res.status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}
