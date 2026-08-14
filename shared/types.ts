export type Gender = "all" | "female" | "male" | "unisex";

export type LangCode =
  | "ru"
  | "en"
  | "es"
  | "de"
  | "fr"
  | "pt"
  | "it"
  | "tr"
  | "pl"
  | "uk"
  | "ar"
  | "zh"
  | "ja"
  | "ko"
  | "hi"
  | "nl"
  | "sv"
  | "cs";

export type OsmFilter = [key: string, value: string];

export interface SubNiche {
  id: string;
  ru: string;
  en: string;
  osm: OsmFilter[];
  packs: string[];
  extra?: Partial<Record<LangCode, string[]>>;
  genderRelevant?: boolean;
}

export interface Niche {
  id: string;
  ru: string;
  en: string;
  icon: string;
  group: string;
  subs: SubNiche[];
}

export interface City {
  id: string;
  en: string;
  local: string;
  aliases: string[];
  cc: string;
  country: string;
  lat: number;
  lon: number;
  radiusKm: number;
}

export interface Lead {
  id: string;
  name: string;
  nicheId: string;
  subId: string;
  country: string;
  cc: string;
  city: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  telegram: string;
  instagram: string;
  facebook: string;
  vk: string;
  whatsapp: string;
  lat: number;
  lon: number;
  source: string;
  osmId?: string;
  foundAt: number;
}

export interface SearchConfig {
  subIds: string[];
  gender: Gender;
}

export interface EngineStatus {
  running: boolean;
  startedAt: number | null;
  queries: number;
  found: number;
  unique: number;
  currentCity: string;
  currentSub: string;
  currentQuery: string;
  lastError: string;
}

export interface StatsBucket {
  id: string;
  label: string;
  count: number;
}
