import { NICHES } from "@shared/niches";
import { useEffect } from "react";
import Globe from "./Globe";
import Results from "./Results";
import { restoreLeads, startSearch, stopSearch } from "./search/engine";
import { useApp } from "./store";
import Wizard from "./Wizard";

function fmt(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n);
}

export default function App() {
  const status = useApp((s) => s.status);
  const step = useApp((s) => s.step);
  const ticker = useApp((s) => s.ticker);
  const set = useApp((s) => s.set);

  useEffect(() => {
    set({ niches: NICHES });
    restoreLeads();
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
              <p>открытые карты · поиск 24/7</p>
            </div>
          </div>
          <div className="stats">
            <div className={`pulse ${status.running ? "" : "off"}`} />
            <div className="stat">
              <b>{fmt(status.unique)}</b>
              <span>точек</span>
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
              <button className="btn stop" onClick={() => stopSearch()}>
                Стоп
              </button>
            ) : (
              <button className="btn ghost" onClick={() => set({ step: 0 })}>
                Новый поиск
              </button>
            )}
            <button className="btn ghost" onClick={() => set({ step: 4 })}>
              Результаты
            </button>
          </div>
        </header>
        <div className="workspace">
          {step === 4 ? <Results /> : <Wizard />}
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
