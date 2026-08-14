import { findSub } from "@shared/niches";
import { exportCsv, refreshView } from "./search/engine";
import { useApp } from "./store";

export default function Results() {
  const leads = useApp((s) => s.leads);
  const total = useApp((s) => s.total);
  const bySub = useApp((s) => s.bySub);
  const byCountry = useApp((s) => s.byCountry);
  const filterSub = useApp((s) => s.filterSub);
  const filterCc = useApp((s) => s.filterCc);
  const query = useApp((s) => s.query);
  const status = useApp((s) => s.status);
  const set = useApp((s) => s.set);

  function apply(next?: { subId?: string; cc?: string; q?: string }) {
    set({
      filterSub: next?.subId ?? filterSub,
      filterCc: next?.cc ?? filterCc,
      query: next?.q ?? query,
    });
    refreshView();
  }

  function downloadCsv() {
    const blob = new Blob([exportCsv()], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "leadatlas.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <section className="panel">
      <div className="panel-h">
        <h2>Результаты поиска</h2>
        <p>
          {total} точек · {status.currentCity || "ожидание"} · {status.currentSub || "выберите ниши и запустите поиск"}
        </p>
      </div>
      {status.lastError ? <p className="err">{status.lastError}</p> : null}
      <div className="search">
        <input
          placeholder="Фильтр: имя, город, телефон…"
          value={query}
          onChange={(e) => set({ query: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter") apply({ q: query });
          }}
        />
        <button className="btn ghost" type="button" onClick={downloadCsv}>
          CSV
        </button>
      </div>
      <div className="filters">
        <button className={`chip ${!filterSub ? "on" : ""}`} onClick={() => apply({ subId: "" })}>
          Все ниши
        </button>
        {bySub.map((b) => {
          const sub = findSub(b.id);
          return (
            <button key={b.id} className={`chip ${filterSub === b.id ? "on" : ""}`} onClick={() => apply({ subId: b.id })}>
              {sub?.sub.ru ?? b.id} · {b.count}
            </button>
          );
        })}
      </div>
      <div className="filters">
        <button className={`chip ${!filterCc ? "on" : ""}`} onClick={() => apply({ cc: "" })}>
          Все страны
        </button>
        {byCountry.map((c) => (
          <button key={c.cc} className={`chip ${filterCc === c.cc ? "on" : ""}`} onClick={() => apply({ cc: c.cc })}>
            {c.country} · {c.count}
          </button>
        ))}
      </div>
      <div className="list">
        {leads.length === 0 && (
          <div className="empty">Список пуст. Новый поиск → ниша → запустить. Точки начнут появляться сразу.</div>
        )}
        {leads.map((l) => {
          const sub = findSub(l.subId);
          return (
            <article key={l.id} className="lead">
              <div>
                <h3>{l.name}</h3>
                <div className="meta">
                  {sub?.niche.ru} / {sub?.sub.ru} · {l.city}, {l.country}
                  {l.district ? ` · ${l.district}` : ""}
                </div>
                {l.address && <div className="meta">{l.address}</div>}
                <div className="contacts">
                  {l.phone && <span className="tag">{l.phone}</span>}
                  {l.website && (
                    <a href={l.website.startsWith("http") ? l.website : `https://${l.website}`} target="_blank" rel="noreferrer">
                      сайт
                    </a>
                  )}
                  {l.instagram && <span className="tag">ig {l.instagram}</span>}
                  {l.telegram && <span className="tag">tg {l.telegram}</span>}
                  {l.email && <span className="tag">{l.email}</span>}
                  <span className="tag">{l.source}</span>
                </div>
              </div>
              <a
                className="btn ghost"
                href={`https://www.openstreetmap.org/?mlat=${l.lat}&mlon=${l.lon}#map=17/${l.lat}/${l.lon}`}
                target="_blank"
                rel="noreferrer"
              >
                карта
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
