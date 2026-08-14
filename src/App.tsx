import { useEffect } from "react";
import Globe from "./Globe";
import Wizard from "./Wizard";
import Results from "./Results";
import { loadLeads, loadNiches, loadPoints, loadStats, loadStatus, stopSearch } from "./api";
import { useApp } from "./store";
import type { EngineStatus, Lead } from "@shared/types";

function fmt(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n);
}

export default function App() {
  const status = useApp((s) => s.status);
  const step = useApp((s) => s.step);
  const ticker = useApp((s) => s.ticker);
  const set = useApp((s) => s.set);
  const showResults = status.running || status.unique > 0 || step === 4;

  useEffect(() => {
    void (async () => {
      const [niches, st, list, stats, pts] = await Promise.all([
        loadNiches(),
        loadStatus(),
        loadLeads({}),
        loadStats(),
        loadPoints(),
      ]);
      set({
        niches: niches.niches,
        status: st,
        leads: list.items,
        total: list.total,
        bySub: stats.bySub,
        byCountry: stats.byCountry,
        points: pts.points,
        step: st.running || stats.total > 0 ? 4 : 0,
      });
    })();
  }, [set]);

  useEffect(() => {
    const es = new EventSource("/api/events");
    es.addEventListener("status", (e) => {
      set({ status: JSON.parse((e as MessageEvent).data) as EngineStatus });
    });
    es.addEventListener("lead", (e) => {
      const lead = JSON.parse((e as MessageEvent).data) as Lead;
      const s = useApp.getState();
      const leads = [lead, ...s.leads].slice(0, 80);
      const points = [...s.points, { lat: lead.lat, lon: lead.lon, subId: lead.subId, name: lead.name }];
      const tickerNext = [`${lead.name} · ${lead.city}`, ...s.ticker].slice(0, 8);
      set({ leads, points, ticker: tickerNext, total: Math.max(s.total, s.status.unique) });
    });
    return () => es.close();
  }, [set]);

  return (
    <div className="app">
      <Globe />
      <div className="overlay">
        <header className="topbar">
          <div className="brand">
            <div className="mark" />
            <div>
              <h1>LeadAtlas</h1>
              <p>открытые карты · синонимы · мир 24/7</p>
            </div>
          </div>
          <div className="stats">
            <div className={`pulse ${status.running ? "" : "off"}`} />
            <div className="stat">
              <b>{fmt(status.unique)}</b>
              <span>уникальных</span>
            </div>
            <div className="stat">
              <b>{fmt(status.queries)}</b>
              <span>запросов</span>
            </div>
            <div className="stat">
              <b>{status.currentCity || "—"}</b>
              <span>{status.currentQuery || "ожидание"}</span>
            </div>
            {status.running ? (
              <button className="btn stop" onClick={() => void stopSearch()}>
                Стоп
              </button>
            ) : (
              <button className="btn ghost" onClick={() => set({ step: 0 })}>
                Новый поиск
              </button>
            )}
            {(status.unique > 0 || step !== 4) && (
              <button className="btn ghost" onClick={() => set({ step: 4 })}>
                Результаты
              </button>
            )}
          </div>
        </header>
        <div className="workspace">
          {showResults && step === 4 ? <Results /> : <Wizard />}
          <div />
        </div>
      </div>
      <div className="ticker">
        {ticker.map((t, i) => (
          <div key={`${t}-${i}`} className="tick">
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
