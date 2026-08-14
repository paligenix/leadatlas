import type { LangCode } from "./types";

/** Multilingual synonym packs composed into each sub-niche. */
export const PACKS: Record<string, Partial<Record<LangCode, string[]>>> = {
  cosmo: {
    ru: ["косметология", "косметолог", "косметологическая клиника", "эстетическая медицина", "бьюти клиника", "аппаратная косметология", "инъекционная косметология"],
    en: ["cosmetology", "aesthetic clinic", "med spa", "medspa", "beauty clinic", "cosmetic clinic", "aesthetic medicine"],
    es: ["cosmética", "clínica estética", "medicina estética", "centro de estética"],
    de: ["kosmetikstudio", "ästhetische medizin", "kosmetik klinik"],
    fr: ["cosmétique", "clinique esthétique", "médecine esthétique"],
    pt: ["cosmética", "clínica estética", "medicina estética"],
    it: ["cosmetologia", "clinica estetica", "medicina estetica"],
    tr: ["kozmetik", "estetik klinik", "güzellik kliniği"],
    pl: ["kosmetologia", "klinika estetyczna"],
    uk: ["косметологія", "косметолог", "естетична медицина"],
    ar: ["تجميل", "عيادة تجميل"],
    zh: ["美容诊所", "医美"],
    ja: ["美容クリニック", "エステ"],
  },
  hair: {
    ru: ["барбершоп", "барбер шоп", "парикмахерская", "парикмахер", "стрижка", "салон красоты", "мужская стрижка", "женская стрижка", "hair salon"],
    en: ["barbershop", "barber shop", "barber", "hair salon", "hairdresser", "hair studio", "haircut", "coiffeur"],
    es: ["barbería", "peluquería", "salón de belleza", "corte de pelo"],
    de: ["friseur", "barbershop", "haarstudio", "coiffeur"],
    fr: ["coiffeur", "salon de coiffure", "barbershop", "barbier"],
    pt: ["barbearia", "cabeleireiro", "salão de beleza"],
    it: ["barbiere", "parrucchiere", "salone di bellezza"],
    tr: ["berber", "kuaför", "saç kesimi"],
    pl: ["barber", "fryzjer", "salon fryzjerski"],
    uk: ["барбершоп", "перукарня", "стрижка"],
    ar: ["حلاق", "صالون حلاقة", "مصفف شعر"],
    zh: ["理发店", "美发沙龙", "理发"],
    ja: ["理容室", "美容室", "ヘアサロン"],
  },
  nails: {
    ru: ["маникюр", "педикюр", "ногтевая студия", "nail bar", "наращивание ногтей"],
    en: ["nail salon", "manicure", "pedicure", "nail bar", "nails studio"],
    es: ["manicura", "uñas", "salón de uñas"],
    de: ["nagelstudio", "maniküre"],
    fr: ["manucure", "salon d'ongles"],
    pt: ["manicure", "salão de unhas"],
    it: ["unghie", "centro unghie"],
    tr: ["manikür", "protez tırnak"],
    uk: ["манікюр", "нігтьова студія"],
  },
  spa: {
    ru: ["спа", "spa", "массаж", "массажный салон", "банный комплекс", "хамам", "сауна"],
    en: ["spa", "massage", "day spa", "hammam", "sauna", "wellness center"],
    es: ["spa", "masaje", "centro de bienestar"],
    de: ["spa", "massage", "wellness"],
    fr: ["spa", "massage", "bien-être"],
    tr: ["spa", "masaj", "hamam"],
    uk: ["спа", "масаж"],
  },
  autoRepair: {
    ru: ["автосервис", "СТО", "ремонт авто", "автомастерская", "автослесарь", "диагностика авто"],
    en: ["auto repair", "car service", "garage", "mechanic", "auto workshop", "car mechanic"],
    es: ["taller mecánico", "reparación de autos", "mecánico"],
    de: ["autowerkstatt", "kfz werkstatt", "autogarage"],
    fr: ["garage automobile", "réparation auto", "mécanicien"],
    pt: ["oficina mecânica", "funilaria"],
    it: ["officina", "meccanico auto"],
    tr: ["oto tamir", "oto servis"],
    uk: ["автосервіс", "СТО", "ремонт авто"],
  },
  carwash: {
    ru: ["автомойка", "мойка машин", "бесконтактная мойка", "мойка самообслуживания"],
    en: ["car wash", "carwash", "auto wash", "vehicle wash"],
    es: ["lavadero de coches", "autolavado"],
    de: ["autowäsche", "waschstraße"],
    fr: ["station de lavage", "lave-auto"],
    tr: ["oto yıkama"],
    uk: ["автомийка"],
  },
  detailing: {
    ru: ["детейлинг", "детейлинг центр", "полировка авто", "химчистка салона", "керамика авто", "оклейка авто"],
    en: ["car detailing", "auto detailing", "paint correction", "ceramic coating", "car wrap"],
    es: ["detailing", "estetika automotriz"],
    de: ["autopflege", "detailing"],
    fr: ["detailing automobile"],
    tr: ["oto detailing", "seramik kaplama"],
    uk: ["дете́йлінг", "полірування авто"],
  },
  tires: {
    ru: ["шиномонтаж", "шины", "шины диски", "балансировка колес", "сезонное хранение шин"],
    en: ["tire shop", "tyre service", "wheel alignment", "tire fitting"],
    es: ["neumáticos", "vulcanizadora"],
    de: ["reifen", "reifenservice"],
    fr: ["pneumatiques", "centre pneus"],
    tr: ["lastikçi", "oto lastik"],
    uk: ["шиномонтаж", "шини"],
  },
  dental: {
    ru: ["стоматология", "стоматолог", "зубной", "dentist", "имплантация зубов", "ортодонт"],
    en: ["dentist", "dental clinic", "dental office", "orthodontist", "implants"],
    es: ["dentista", "clínica dental"],
    de: ["zahnarzt", "zahnklinik"],
    fr: ["dentiste", "cabinet dentaire"],
    tr: ["diş kliniği", "diş hekimi"],
    uk: ["стоматологія", "стоматолог"],
    ar: ["طبيب أسنان", "عيادة أسنان"],
    zh: ["牙科", "口腔诊所"],
  },
  clinic: {
    ru: ["клиника", "медицинский центр", "поликлиника", "врач", "медцентр"],
    en: ["clinic", "medical center", "doctors office", "healthcare clinic"],
    es: ["clínica", "centro médico"],
    de: ["klinik", "arztpraxis", "medizinisches zentrum"],
    fr: ["clinique", "centre médical"],
    tr: ["klinik", "tıp merkezi"],
    uk: ["клініка", "медичний центр"],
  },
  fitness: {
    ru: ["фитнес", "спортзал", "тренажерный зал", "gym", "фитнес клуб"],
    en: ["gym", "fitness", "fitness club", "health club", "workout studio"],
    es: ["gimnasio", "fitness"],
    de: ["fitnessstudio", "turnhalle"],
    fr: ["salle de sport", "fitness"],
    tr: ["spor salonu", "fitness"],
    uk: ["фітнес", "спортзал"],
  },
  restaurant: {
    ru: ["ресторан", "ресторанчик", "кухня", "гастробар"],
    en: ["restaurant", "dining", "bistro", "eatery"],
    es: ["restaurante", "asador"],
    de: ["restaurant", "gasthaus"],
    fr: ["restaurant", "brasserie"],
    tr: ["restoran", "lokanta"],
    uk: ["ресторан"],
    zh: ["餐厅", "饭店"],
    ja: ["レストラン", "食堂"],
  },
  cafe: {
    ru: ["кафе", "кофейня", "кофе", "coffee shop", "эспрессо бар"],
    en: ["cafe", "coffee shop", "coffeehouse", "espresso bar"],
    es: ["cafetería", "café"],
    de: ["café", "kaffeehaus"],
    fr: ["café", "coffee shop"],
    tr: ["kafe", "kahve dükkanı"],
    uk: ["кафе", "кав'ярня"],
  },
  legal: {
    ru: ["юрист", "адвокат", "юридическая компания", "правовая помощь"],
    en: ["lawyer", "attorney", "law firm", "legal services"],
    es: ["abogado", "bufete"],
    de: ["anwalt", "kanzlei"],
    fr: ["avocat", "cabinet d'avocats"],
    tr: ["avukat", "hukuk bürosu"],
    uk: ["юрист", "адвокат"],
  },
  realty: {
    ru: ["агентство недвижимости", "риэлтор", "недвижимость", "realtor"],
    en: ["real estate", "realtor", "estate agent", "property agency"],
    es: ["inmobiliaria", "bienes raíces"],
    de: ["immobilien", "makler"],
    fr: ["immobilier", "agence immobilière"],
    tr: ["emlak", "gayrimenkul"],
    uk: ["нерухомість", "рієлтор"],
  },
  education: {
    ru: ["курсы", "обучение", "школа", "учебный центр", "репетитор"],
    en: ["courses", "training center", "tutoring", "academy", "school"],
    es: ["academia", "cursos", "tutoría"],
    de: ["nachhilfe", "kurszentrum"],
    fr: ["cours", "centre de formation"],
    tr: ["kurs", "dershane"],
    uk: ["курси", "репетитор"],
  },
  hotel: {
    ru: ["отель", "гостиница", "гостевой дом", "хостел", "апартаменты"],
    en: ["hotel", "guesthouse", "hostel", "inn", "boutique hotel"],
    es: ["hotel", "hostal", "pensión"],
    de: ["hotel", "pension", "gasthof"],
    fr: ["hôtel", "auberge"],
    tr: ["otel", "pansiyon"],
    uk: ["готель", "хостел"],
    zh: ["酒店", "宾馆"],
    ja: ["ホテル", "旅館"],
  },
  photo: {
    ru: ["фотограф", "фотостудия", "видеосъемка", "фотосалон"],
    en: ["photographer", "photo studio", "videographer"],
    es: ["fotógrafo", "estudio fotográfico"],
    de: ["fotograf", "fotostudio"],
    fr: ["photographe", "studio photo"],
    tr: ["fotoğrafçı", "fotoğraf stüdyosu"],
    uk: ["фотограф", "фотостудія"],
  },
  pets: {
    ru: ["груминг", "ветклиника", "зоомагазин", "гостиница для животных"],
    en: ["pet grooming", "vet clinic", "pet shop", "dog hotel"],
    es: ["veterinario", "peluquería canina"],
    de: ["tierarzt", "hundestudio"],
    fr: ["vétérinaire", "toilettage"],
    tr: ["veteriner", "pet kuaför"],
    uk: ["грумінг", "ветклініка"],
  },
  cleaning: {
    ru: ["клининг", "уборка", "клининговая компания", "химчистка"],
    en: ["cleaning service", "house cleaning", "janitorial", "dry cleaning"],
    es: ["limpieza", "tintorería"],
    de: ["reinigung", "gebäudereinigung"],
    fr: ["ménage", "nettoyage", "pressing"],
    tr: ["temizlik şirketi"],
    uk: ["клінінг", "прибирання"],
  },
  construction: {
    ru: ["строительство", "строительная компания", "ремонт квартир", "отделка"],
    en: ["construction", "contractor", "home renovation", "builder"],
    es: ["construcción", "reformas"],
    de: ["bauunternehmen", "renovierung"],
    fr: ["construction", "rénovation"],
    tr: ["inşaat", "tadilat"],
    uk: ["будівництво", "ремонт квартир"],
  },
  flowers: {
    ru: ["цветы", "цветочный магазин", "флорист", "букеты"],
    en: ["florist", "flower shop", "flowers"],
    es: ["floristería", "flores"],
    de: ["blumenladen", "florist"],
    fr: ["fleuriste"],
    tr: ["çiçekçi"],
    uk: ["квіти", "флорист"],
  },
  pharmacy: {
    ru: ["аптека", "pharmacy", "лекарства"],
    en: ["pharmacy", "drugstore", "chemist"],
    es: ["farmacia"],
    de: ["apotheke"],
    fr: ["pharmacie"],
    tr: ["eczane"],
    uk: ["аптека"],
    ar: ["صيدلية"],
    zh: ["药店", "药房"],
  },
  print: {
    ru: ["типография", "полиграфия", "печать", "копицентр"],
    en: ["print shop", "printing", "copy center"],
    es: ["imprenta"],
    de: ["druckerei"],
    fr: ["imprimerie"],
    tr: ["matbaa"],
    uk: ["друкарня", "поліграфія"],
  },
  it: {
    ru: ["веб студия", "разработка сайтов", "it компания", "digital agency"],
    en: ["web studio", "software company", "it company", "digital agency"],
    es: ["agencia digital", "desarrollo web"],
    de: ["webagentur", "softwarefirma"],
    fr: ["agence web"],
    tr: ["yazılım şirketi", "web ajansı"],
    uk: ["веб студія", "айті компанія"],
  },
};

const GENDER_PREFIX: Record<Exclude<LangCode, never>, { female: string[]; male: string[]; unisex: string[] }> = {
  ru: { female: ["женская", "для женщин", "дамская"], male: ["мужская", "для мужчин", "барбер"], unisex: ["унисекс"] },
  en: { female: ["women", "ladies", "female"], male: ["men", "gents", "male"], unisex: ["unisex"] },
  es: { female: ["mujeres", "damas"], male: ["hombres", "caballeros"], unisex: ["unisex"] },
  de: { female: ["damen"], male: ["herren"], unisex: ["unisex"] },
  fr: { female: ["femmes", "dames"], male: ["hommes"], unisex: ["unisexe"] },
  pt: { female: ["feminino", "mulheres"], male: ["masculino", "homens"], unisex: ["unissex"] },
  it: { female: ["donna", "signore"], male: ["uomo", "signori"], unisex: ["unisex"] },
  tr: { female: ["kadın"], male: ["erkek"], unisex: ["unisex"] },
  pl: { female: ["damski"], male: ["męski"], unisex: ["unisex"] },
  uk: { female: ["жіноча"], male: ["чоловіча"], unisex: ["унісекс"] },
  ar: { female: ["نساء"], male: ["رجال"], unisex: [] },
  zh: { female: ["女士"], male: ["男士"], unisex: [] },
  ja: { female: ["女性"], male: ["男性"], unisex: [] },
  ko: { female: ["여성"], male: ["남성"], unisex: [] },
  hi: { female: ["महिला"], male: ["पुरुष"], unisex: [] },
  nl: { female: ["dames"], male: ["heren"], unisex: ["unisex"] },
  sv: { female: ["dam"], male: ["herr"], unisex: ["unisex"] },
  cs: { female: ["dámské"], male: ["pánské"], unisex: ["unisex"] },
};

function unique(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of items) {
    const v = raw.trim().replace(/\s+/g, " ");
    if (!v) continue;
    const key = v.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(v);
  }
  return out;
}

export function collectSynonyms(
  packs: string[],
  extra?: Partial<Record<LangCode, string[]>>,
): string[] {
  const all: string[] = [];
  for (const packId of packs) {
    const pack = PACKS[packId];
    if (!pack) continue;
    for (const words of Object.values(pack)) {
      if (words) all.push(...words);
    }
  }
  if (extra) {
    for (const words of Object.values(extra)) {
      if (words) all.push(...words);
    }
  }
  return unique(all);
}

export function withGender(terms: string[], gender: "all" | "female" | "male" | "unisex"): string[] {
  if (gender === "all") return terms;
  const extra: string[] = [];
  for (const prefixes of Object.values(GENDER_PREFIX)) {
    const list = prefixes[gender] ?? [];
    for (const p of list) {
      for (const t of terms.slice(0, 12)) {
        extra.push(`${p} ${t}`, `${t} ${p}`);
      }
    }
  }
  return unique([...terms, ...extra]);
}

/** Combinatorial queries: niche, niche+city, city+niche, +district, mixed order. */
export function buildQueries(
  synonyms: string[],
  cityNames: string[],
  districts: string[] = [],
): string[] {
  const syn = unique(synonyms).slice(0, 18);
  const cities = unique(cityNames).slice(0, 4);
  const dist = unique(districts).slice(0, 3);
  const out: string[] = [];

  for (const s of syn) out.push(s);
  for (const s of syn) {
    for (const c of cities) {
      out.push(`${s} ${c}`, `${c} ${s}`, `${s} in ${c}`, `${s} ${c} центр`, `${s} downtown ${c}`);
    }
  }
  for (const s of syn.slice(0, 8)) {
    for (const c of cities.slice(0, 2)) {
      for (const d of dist) {
        out.push(`${s} ${c} ${d}`, `${s} ${d} ${c}`, `${d} ${s}`, `${c} ${d} ${s}`);
      }
    }
  }
  return unique(out);
}
