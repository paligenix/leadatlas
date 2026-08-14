import { EventEmitter } from "node:events";
import type { City, EngineStatus, Gender, Lead, SearchConfig, SubNiche } from "../shared/types.ts";
import { CITIES } from "../shared/cities.ts";
import { findSub } from "../shared/niches.ts";
import { buildQueries, collectSynonyms, withGender } from "../shared/synonyms.ts";
import { osmToLead, overpassSearch } from "./sources/overpass.ts";
import { photonSearch, photonToLead } from "./sources/photon.ts";
import type { LeadStore } from "./store.ts";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export class SearchEngine extends EventEmitter {
  status: EngineStatus = {
    running: false,
    startedAt: null,
    queries: 0,
    found: 0,
    unique: 0,
    currentCity: "",
    currentSub: "",
    currentQuery: "",
    lastError: "",
  };

  private stopFlag = false;
  private config: SearchConfig | null = null;

  constructor(private store: LeadStore) {
    super();
    this.status.unique = store.size;
    this.status.found = store.size;
  }

  start(config: SearchConfig) {
    if (this.status.running) return;
    this.config = config;
    this.stopFlag = false;
    this.status.running = true;
    this.status.startedAt = Date.now();
    this.status.lastError = "";
    this.emit("status", this.status);
    void this.loop();
  }

  stop() {
    this.stopFlag = true;
    this.status.running = false;
    this.status.currentQuery = "остановлено";
    this.emit("status", this.status);
  }

  private async loop() {
    const config = this.config;
    if (!config) return;
    const pairs = config.subIds
      .map((id) => findSub(id))
      .filter((x): x is NonNullable<typeof x> => Boolean(x));
    if (!pairs.length) {
      this.stop();
      this.status.lastError = "Не выбраны ниши";
      this.emit("status", this.status);
      return;
    }

    let step = 0;
    while (!this.stopFlag) {
      const pair = pairs[step % pairs.length];
      const city = CITIES[Math.floor(step / pairs.length) % CITIES.length];
      step += 1;
      this.status.currentCity = `${city.en} · ${city.country}`;
      this.status.currentSub = pair.sub.ru;
      this.emit("status", this.status);

      try {
        await this.runOverpass(city, pair.sub, pair.niche.id);
      } catch (err) {
        this.status.lastError = err instanceof Error ? err.message : String(err);
        this.emit("status", this.status);
        await sleep(4000);
      }
      if (this.stopFlag) break;

      try {
        await this.runPhoton(city, pair.sub, pair.niche.id, config.gender);
      } catch (err) {
        this.status.lastError = err instanceof Error ? err.message : String(err);
        this.emit("status", this.status);
      }

      await sleep(2500);
    }
    this.status.running = false;
    this.emit("status", this.status);
  }

  private ingest(lead: Lead | null) {
    if (!lead) return;
    this.status.found += 1;
    const added = this.store.add(lead);
    if (added) {
      this.status.unique = this.store.size;
      this.emit("lead", added);
    }
  }

  private async runOverpass(city: City, sub: SubNiche, nicheId: string) {
    this.status.currentQuery = `OSM tags · ${city.en}`;
    this.status.queries += 1;
    this.emit("status", this.status);
    const elements = await overpassSearch(city, sub);
    for (const el of elements) {
      this.ingest(osmToLead(el as Parameters<typeof osmToLead>[0], city, sub, nicheId));
    }
  }

  private async runPhoton(city: City, sub: SubNiche, nicheId: string, gender: Gender) {
    const syn = withGender(collectSynonyms(sub.packs, sub.extra), gender);
    const queries = buildQueries(syn, city.aliases, []).slice(0, 4);
    for (const q of queries) {
      if (this.stopFlag) return;
      this.status.currentQuery = q;
      this.status.queries += 1;
      this.emit("status", this.status);
      const hits = await photonSearch(q, city);
      for (const hit of hits) this.ingest(photonToLead(hit, city, sub, nicheId));
      await sleep(1100);
    }
  }
}
