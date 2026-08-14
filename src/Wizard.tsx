import { NICHES, NICHE_GROUPS } from "@shared/niches";
import { startSearch } from "./search/engine";
import { useApp } from "./store";

const GENDERS = [
  { id: "all", ru: "Все", en: "All" },
  { id: "female", ru: "Женский", en: "Women" },
  { id: "male", ru: "Мужской", en: "Men" },
  { id: "unisex", ru: "Унисекс", en: "Unisex" },
] as const;

export default function Wizard() {
  const gender = useApp((s) => s.gender);
  const group = useApp((s) => s.group);
  const selectedNiches = useApp((s) => s.selectedNiches);
  const selectedSubs = useApp((s) => s.selectedSubs);
  const step = useApp((s) => s.step);
  const set = useApp((s) => s.set);
  const storeNiches = useApp((s) => s.niches);
  const niches = storeNiches.length ? storeNiches : NICHES;

  const visibleNiches = niches.filter((n) => !group || n.group === group);
  const subPool = niches.filter((n) => selectedNiches.includes(n.id));

  function launch() {
    if (!selectedSubs.length) return;
    const status = startSearch(selectedSubs, gender);
    set({ status, step: 4 });
  }

  return (
    <section className="panel">
      <div className="panel-h">
        <h2>Запуск поиска</h2>
        <p>Выберите пол, обобщённые ниши и подниши. Дальше движок сам обойдёт мир 24/7.</p>
      </div>
      <div className="steps">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`step ${step >= i ? "on" : ""}`} />
        ))}
      </div>

      {step === 0 && (
        <>
          <p className="hint">Шаг 1 · пол аудитории (для барбершопов, салонов, фитнеса и т.д.)</p>
          <div className="genders">
            {GENDERS.map((g) => (
              <button
                key={g.id}
                className={`card ${gender === g.id ? "on" : ""}`}
                onClick={() => set({ gender: g.id })}
              >
                <b>{g.ru}</b>
                <small>{g.en}</small>
              </button>
            ))}
          </div>
          <div className="footer-bar">
            <span className="hint">Можно оставить «Все»</span>
            <button className="btn" onClick={() => set({ step: 1 })}>
              Дальше
            </button>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <p className="hint">Шаг 2 · обобщённая ниша. Сейчас {NICHE_GROUPS.length} групп, внутри ~100 направлений.</p>
          <div className="groups">
            <button className={`card ${group === "" ? "on" : ""}`} onClick={() => set({ group: "" })}>
              <b>Все группы</b>
              <small>{niches.length} ниш</small>
            </button>
            {NICHE_GROUPS.map((g) => (
              <button key={g} className={`card ${group === g ? "on" : ""}`} onClick={() => set({ group: g })}>
                <b>{g}</b>
                <small>{niches.filter((n) => n.group === g).length} ниш</small>
              </button>
            ))}
          </div>
          <div className="footer-bar">
            <button className="btn ghost" onClick={() => set({ step: 0 })}>
              Назад
            </button>
            <button className="btn" onClick={() => set({ step: 2 })}>
              Дальше
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <p className="hint">Шаг 3 · можно отметить сразу несколько ниш</p>
          <div className="niches">
            {visibleNiches.map((n) => {
              const on = selectedNiches.includes(n.id);
              return (
                <button
                  key={n.id}
                  className={`card ${on ? "on" : ""}`}
                  onClick={() =>
                    set({
                      selectedNiches: on
                        ? selectedNiches.filter((id) => id !== n.id)
                        : [...selectedNiches, n.id],
                    })
                  }
                >
                  <div className="icon">{n.icon}</div>
                  <b>{n.ru}</b>
                  <small>
                    {n.en} · {n.subs.length} подниш
                  </small>
                </button>
              );
            })}
          </div>
          <div className="footer-bar">
            <button className="btn ghost" onClick={() => set({ step: 1 })}>
              Назад
            </button>
            <button className="btn" disabled={!selectedNiches.length} onClick={() => set({ step: 3 })}>
              Подниши · {selectedNiches.length}
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <p className="hint">Шаг 4 · подниши. Поиск пойдёт по тегам карт + синонимам на десятках языков.</p>
          <div className="subs">
            {subPool.map((n) => (
              <div key={n.id}>
                <p className="hint">
                  {n.icon} {n.ru}
                </p>
                <div className="niches">
                  {n.subs.map((s) => {
                    const on = selectedSubs.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        className={`card ${on ? "on" : ""}`}
                        onClick={() =>
                          set({
                            selectedSubs: on
                              ? selectedSubs.filter((id) => id !== s.id)
                              : [...selectedSubs, s.id],
                          })
                        }
                      >
                        <b>{s.ru}</b>
                        <small>{s.en}</small>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="footer-bar">
            <button className="btn ghost" onClick={() => set({ step: 2 })}>
              Назад
            </button>
            <button className="btn" disabled={!selectedSubs.length} onClick={launch}>
              Запустить 24/7 · {selectedSubs.length}
            </button>
          </div>
        </>
      )}
    </section>
  );
}
