import type { EngineStatus, Gender, Lead, Niche } from "@shared/types";

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}

export function startSearch(subIds: string[], gender: Gender) {
  return api<EngineStatus>("/api/search/start", {
    method: "POST",
    body: JSON.stringify({ subIds, gender }),
  });
}

export function stopSearch() {
  return api<EngineStatus>("/api/search/stop", { method: "POST" });
}

export function loadNiches() {
  return api<{ niches: Niche[] }>("/api/niches");
}

export function loadLeads(params: { subId?: string; cc?: string; q?: string; offset?: number }) {
  const sp = new URLSearchParams();
  if (params.subId) sp.set("subId", params.subId);
  if (params.cc) sp.set("cc", params.cc);
  if (params.q) sp.set("q", params.q);
  sp.set("offset", String(params.offset ?? 0));
  sp.set("limit", "80");
  return api<{ total: number; items: Lead[] }>(`/api/leads?${sp}`);
}

export function loadStats() {
  return api<{
    total: number;
    bySub: Array<{ id: string; count: number }>;
    byCountry: Array<{ cc: string; country: string; count: number }>;
  }>("/api/stats");
}

export function loadPoints() {
  return api<{ points: Array<{ lat: number; lon: number; subId: string; name: string }> }>("/api/points");
}

export function loadStatus() {
  return api<EngineStatus>("/api/status");
}
