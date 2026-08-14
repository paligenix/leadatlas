import { create } from "zustand";
import type { EngineStatus, Gender, Lead, Niche } from "@shared/types";

interface AppState {
  niches: Niche[];
  gender: Gender;
  group: string;
  selectedNiches: string[];
  selectedSubs: string[];
  step: number;
  status: EngineStatus;
  leads: Lead[];
  total: number;
  filterSub: string;
  filterCc: string;
  query: string;
  bySub: Array<{ id: string; count: number }>;
  byCountry: Array<{ cc: string; country: string; count: number }>;
  points: Array<{ lat: number; lon: number; subId: string; name: string }>;
  ticker: string[];
  set: (p: Partial<AppState>) => void;
}

export const useApp = create<AppState>((set) => ({
  niches: [],
  gender: "all",
  group: "",
  selectedNiches: [],
  selectedSubs: [],
  step: 0,
  status: {
    running: false,
    startedAt: null,
    queries: 0,
    found: 0,
    unique: 0,
    currentCity: "",
    currentSub: "",
    currentQuery: "",
    lastError: "",
  },
  leads: [],
  total: 0,
  filterSub: "",
  filterCc: "",
  query: "",
  bySub: [],
  byCountry: [],
  points: [],
  ticker: [],
  set: (p) => set(p),
}));
