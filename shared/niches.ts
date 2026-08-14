import type { Niche, OsmFilter, SubNiche } from "./types";

function s(
  id: string,
  ru: string,
  en: string,
  osm: OsmFilter[],
  packs: string[],
  extra?: SubNiche["extra"],
  genderRelevant = false,
): SubNiche {
  return { id, ru, en, osm, packs, extra, genderRelevant };
}

function n(
  id: string,
  ru: string,
  en: string,
  icon: string,
  group: string,
  subs: SubNiche[],
): Niche {
  return { id, ru, en, icon, group, subs };
}

export const NICHES: Niche[] = [
  n("cosmo", "Косметология", "Cosmetology", "✨", "Красота", [
    s("cosmo-clinic", "Косметологическая клиника", "Aesthetic clinic", [["amenity", "clinic"], ["healthcare", "clinic"], ["shop", "beauty"]], ["cosmo"], { ru: ["чистка лица", "биоревитализация", "ботокс клиника"] }, true),
    s("cosmo-laser", "Лазерная косметология", "Laser aesthetics", [["shop", "beauty"]], ["cosmo"], { ru: ["лазерная эпиляция", "лазер"], en: ["laser hair removal", "laser clinic"] }, true),
    s("cosmo-inject", "Инъекционная косметология", "Injectables", [["shop", "beauty"]], ["cosmo"], { ru: ["филлеры", "уколы красоты"], en: ["fillers", "botox"] }, true),
    s("cosmo-hw", "Аппаратная косметология", "Hardware beauty", [["shop", "beauty"]], ["cosmo"], { ru: ["rf лифтинг", "смас"], en: ["rf lifting", "hifu"] }),
  ]),
  n("hair", "Волосы и барбершопы", "Hair & barbers", "✂️", "Красота", [
    s("hair-barber", "Барбершоп", "Barbershop", [["shop", "hairdresser"], ["shop", "barber"]], ["hair"], { ru: ["мужская парикмахерская", "fade", "бритье", "барбершоп у", "стрижка у"] }, true),
    s("hair-salon", "Парикмахерская / салон", "Hair salon", [["shop", "hairdresser"], ["shop", "beauty"]], ["hair"], undefined, true),
    s("hair-color", "Окрашивание / колорист", "Colorist", [["shop", "hairdresser"]], ["hair"], { ru: ["колорист", "окрашивание волос"], en: ["hair color", "balayage"] }, true),
    s("hair-ext", "Наращивание волос", "Hair extensions", [["shop", "hairdresser"]], ["hair"], { ru: ["наращивание волос", "капсулы"] }),
  ]),
  n("nails", "Ногтевой сервис", "Nails", "💅", "Красота", [
    s("nails-salon", "Ногтевая студия", "Nail studio", [["shop", "beauty"], ["shop", "chemist"]], ["nails"], undefined, true),
    s("nails-pod", "Педикюр / подология", "Pedicure / podiatry", [["shop", "beauty"], ["healthcare", "podiatrist"]], ["nails"]),
  ]),
  n("makeup", "Макияж и брови", "Makeup & brows", "💋", "Красота", [
    s("makeup-studio", "Визажист / студия макияжа", "Makeup studio", [["shop", "beauty"], ["craft", "beauty"]], ["cosmo"], { ru: ["визажист", "макияж"], en: ["makeup artist", "mua"] }, true),
    s("makeup-brows", "Брови и ресницы", "Brows & lashes", [["shop", "beauty"]], ["cosmo"], { ru: ["бровист", "ламинирование бровей", "наращивание ресниц"], en: ["brow bar", "lash extensions"] }, true),
  ]),
  n("spa", "SPA и массаж", "SPA & massage", "🧖", "Красота", [
    s("spa-center", "SPA-центр", "SPA center", [["leisure", "spa"], ["amenity", "spa"]], ["spa"]),
    s("spa-massage", "Массажный салон", "Massage salon", [["shop", "massage"], ["leisure", "massage"]], ["spa"]),
    s("spa-bath", "Бани / сауны / хамам", "Baths / sauna / hammam", [["leisure", "sauna"], ["amenity", "public_bath"]], ["spa"]),
  ]),
  n("tattoo", "Тату и пирсинг", "Tattoo & piercing", "🖋️", "Красота", [
    s("tattoo-studio", "Тату-студия", "Tattoo studio", [["shop", "tattoo"]], ["cosmo"], { ru: ["тату", "татуировка"], en: ["tattoo", "tattoo parlor"] }),
    s("tattoo-piercing", "Пирсинг", "Piercing", [["shop", "tattoo"]], ["cosmo"], { ru: ["пирсинг"], en: ["piercing studio"] }),
  ]),
  n("plastic", "Пластическая хирургия", "Plastic surgery", "🩺", "Красота", [
    s("plastic-clinic", "Пластический хирург", "Plastic surgeon", [["amenity", "clinic"], ["healthcare", "plastic_surgery"]], ["cosmo"], { ru: ["пластика", "ринопластика"], en: ["plastic surgery", "rhinoplasty"] }),
  ]),
  n("tanning", "Загар и солярий", "Tanning", "☀️", "Красота", [
    s("tanning-sol", "Солярий", "Tanning salon", [["leisure", "tanning_salon"], ["shop", "beauty"]], ["spa"], { ru: ["солярий"], en: ["tanning salon", "sunbed"] }),
  ]),
  n("epil", "Эпиляция", "Hair removal", "🔆", "Красота", [
    s("epil-laser", "Лазерная эпиляция", "Laser hair removal", [["shop", "beauty"]], ["cosmo"], { ru: ["лазерная эпиляция", "диодный лазер"], en: ["laser hair removal"] }, true),
    s("epil-wax", "Шугаринг / воск", "Sugaring / wax", [["shop", "beauty"]], ["cosmo"], { ru: ["шугаринг", "восковая депиляция"], en: ["waxing", "sugaring"] }, true),
  ]),
  n("auto-repair", "Автосервис", "Auto repair", "🔧", "Авто", [
    s("auto-sto", "СТО / автосервис", "Auto workshop", [["shop", "car_repair"], ["amenity", "vehicle_inspection"]], ["autoRepair"]),
    s("auto-body", "Кузовной ремонт", "Body shop", [["shop", "car_repair"]], ["autoRepair"], { ru: ["кузовной", "малярка", "рихтовка"], en: ["body shop", "auto body"] }),
    s("auto-diag", "Диагностика / электрика", "Diagnostics / electrics", [["shop", "car_repair"]], ["autoRepair"], { ru: ["автоэлектрик", "чип тюнинг"], en: ["auto electrician"] }),
  ]),
  n("carwash", "Автомойки", "Car wash", "🚿", "Авто", [
    s("wash-full", "Автомойка", "Car wash", [["amenity", "car_wash"]], ["carwash"]),
    s("wash-self", "Мойка самообслуживания", "Self-serve wash", [["amenity", "car_wash"]], ["carwash"], { ru: ["мойка самообслуживания"], en: ["self service car wash"] }),
  ]),
  n("detailing", "Детейлинг", "Detailing", "✨", "Авто", [
    s("det-center", "Детейлинг-центр", "Detailing center", [["shop", "car_repair"], ["amenity", "car_wash"]], ["detailing"]),
    s("det-wrap", "Оклейка / винил", "Car wrap", [["shop", "car_repair"]], ["detailing"], { ru: ["винил", "оклейка авто"], en: ["vehicle wrap", "vinyl wrap"] }),
    s("det-ceramic", "Керамика / полировка", "Ceramic / polish", [["shop", "car_repair"]], ["detailing"]),
  ]),
  n("tires", "Шины и диски", "Tires & wheels", "🛞", "Авто", [
    s("tires-shop", "Шиномонтаж", "Tire service", [["shop", "tyres"], ["shop", "car_repair"]], ["tires"]),
    s("tires-store", "Магазин шин", "Tire store", [["shop", "tyres"]], ["tires"]),
  ]),
  n("parts", "Автозапчасти", "Auto parts", "⚙️", "Авто", [
    s("parts-shop", "Магазин запчастей", "Parts store", [["shop", "car_parts"]], ["autoRepair"], { ru: ["запчасти", "автозапчасти"], en: ["auto parts", "spare parts"] }),
  ]),
  n("dealers", "Автосалоны", "Car dealers", "🚗", "Авто", [
    s("dealer-new", "Автосалон", "Car dealership", [["shop", "car"]], ["autoRepair"], { ru: ["автосалон", "продажа авто"], en: ["car dealer", "dealership"] }),
    s("dealer-used", "Авто с пробегом", "Used cars", [["shop", "car"]], ["autoRepair"], { ru: ["авто с пробегом", "trade in"], en: ["used cars"] }),
  ]),
  n("tuning", "Тюнинг", "Tuning", "🏎️", "Авто", [
    s("tune-shop", "Тюнинг-ателье", "Tuning shop", [["shop", "car_repair"]], ["detailing"], { ru: ["тюнинг", "выхлоп", "подвеска"], en: ["car tuning", "performance shop"] }),
  ]),
  n("fuel", "АЗС", "Fuel stations", "⛽", "Авто", [
    s("fuel-station", "АЗС / заправка", "Gas station", [["amenity", "fuel"]], ["autoRepair"], { ru: ["заправка", "АЗС"], en: ["gas station", "petrol station"] }),
  ]),
  n("rent", "Прокат авто", "Car rental", "🔑", "Авто", [
    s("rent-car", "Прокат автомобилей", "Car rental", [["amenity", "car_rental"]], ["autoRepair"], { ru: ["прокат авто", "аренда авто"], en: ["car rental", "rent a car"] }),
  ]),
  n("clinics", "Медицинские клиники", "Medical clinics", "🏥", "Здоровье", [
    s("clinic-gen", "Медицинский центр", "Medical center", [["amenity", "clinic"], ["amenity", "doctors"], ["healthcare", "clinic"]], ["clinic"]),
    s("clinic-private", "Частная клиника", "Private clinic", [["amenity", "clinic"]], ["clinic"], { ru: ["частная клиника"], en: ["private clinic"] }),
  ]),
  n("dental", "Стоматология", "Dentistry", "🦷", "Здоровье", [
    s("dental-clinic", "Стоматология", "Dental clinic", [["amenity", "dentist"], ["healthcare", "dentist"]], ["dental"]),
    s("dental-ortho", "Ортодонтия", "Orthodontics", [["amenity", "dentist"]], ["dental"], { ru: ["брекеты", "элайнеры"], en: ["braces", "invisalign"] }),
  ]),
  n("pharmacy", "Аптеки", "Pharmacies", "💊", "Здоровье", [
    s("pharm-shop", "Аптека", "Pharmacy", [["amenity", "pharmacy"], ["healthcare", "pharmacy"]], ["pharmacy"]),
  ]),
  n("optics", "Оптика", "Optics", "👓", "Здоровье", [
    s("opt-shop", "Салон оптики", "Optician", [["shop", "optician"], ["healthcare", "optometrist"]], ["clinic"], { ru: ["оптика", "линзы", "очки"], en: ["optician", "eyewear", "glasses"] }),
  ]),
  n("vet", "Ветеринария", "Veterinary", "🐾", "Здоровье", [
    s("vet-clinic", "Ветклиника", "Vet clinic", [["amenity", "veterinary"], ["healthcare", "veterinarian"]], ["pets", "clinic"]),
  ]),
  n("psy", "Психология", "Psychology", "🧠", "Здоровье", [
    s("psy-center", "Психолог / психотерапевт", "Psychologist", [["healthcare", "psychotherapist"], ["amenity", "doctors"]], ["clinic"], { ru: ["психолог", "психотерапевт"], en: ["psychologist", "therapist"] }),
  ]),
  n("labs", "Лаборатории", "Labs", "🧪", "Здоровье", [
    s("lab-diag", "Медлаборатория", "Medical lab", [["healthcare", "laboratory"], ["amenity", "clinic"]], ["clinic"], { ru: ["анализы", "лаборатория"], en: ["medical lab", "blood test"] }),
  ]),
  n("rehab", "Реабилитация", "Rehab", "🦽", "Здоровье", [
    s("rehab-center", "Реабилитационный центр", "Rehab center", [["healthcare", "rehabilitation"], ["amenity", "clinic"]], ["clinic", "spa"]),
  ]),
  n("altmed", "Альтернативная медицина", "Alternative medicine", "🌿", "Здоровье", [
    s("alt-osteo", "Остеопатия / остео", "Osteopathy", [["healthcare", "alternative"], ["amenity", "clinic"]], ["clinic", "spa"], { ru: ["остеопат", "хиропрактик"], en: ["osteopath", "chiropractor"] }),
  ]),
  n("restaurants", "Рестораны", "Restaurants", "🍽️", "Еда", [
    s("rest-gen", "Ресторан", "Restaurant", [["amenity", "restaurant"]], ["restaurant"]),
    s("rest-fine", "Fine dining", "Fine dining", [["amenity", "restaurant"]], ["restaurant"], { ru: ["fine dining", "гастрономия"], en: ["fine dining", "gastronomy"] }),
  ]),
  n("cafes", "Кафе и кофейни", "Cafes & coffee", "☕", "Еда", [
    s("cafe-gen", "Кафе", "Cafe", [["amenity", "cafe"]], ["cafe"]),
    s("cafe-coffee", "Кофейня", "Coffee shop", [["amenity", "cafe"], ["shop", "coffee"]], ["cafe"]),
  ]),
  n("bakery", "Пекарни и кондитерские", "Bakeries", "🥐", "Еда", [
    s("bake-shop", "Пекарня", "Bakery", [["shop", "bakery"]], ["cafe"], { ru: ["пекарня", "хлеб"], en: ["bakery", "bread shop"] }),
    s("bake-cake", "Кондитерская", "Pastry shop", [["shop", "pastry"], ["shop", "confectionery"]], ["cafe"], { ru: ["кондитерская", "торты на заказ"], en: ["pastry", "cake shop"] }),
  ]),
  n("fastfood", "Фастфуд", "Fast food", "🍔", "Еда", [
    s("ff-gen", "Фастфуд", "Fast food", [["amenity", "fast_food"]], ["restaurant"], { ru: ["фастфуд", "бургерная"], en: ["fast food", "burger"] }),
  ]),
  n("bars", "Бары", "Bars", "🍸", "Еда", [
    s("bar-gen", "Бар / паб", "Bar / pub", [["amenity", "bar"], ["amenity", "pub"]], ["restaurant"], { ru: ["бар", "паб", "коктейль-бар"], en: ["bar", "pub", "cocktail bar"] }),
  ]),
  n("sushi", "Суши и азиатская кухня", "Sushi & Asian", "🍣", "Еда", [
    s("sushi-bar", "Суши-бар", "Sushi bar", [["amenity", "restaurant"]], ["restaurant"], { ru: ["суши", "роллы", "японская кухня"], en: ["sushi", "japanese restaurant"] }),
  ]),
  n("pizza", "Пицца", "Pizza", "🍕", "Еда", [
    s("pizza-shop", "Пиццерия", "Pizzeria", [["amenity", "restaurant"], ["cuisine", "pizza"]], ["restaurant"], { ru: ["пиццерия", "пицца"], en: ["pizzeria", "pizza"] }),
  ]),
  n("delivery", "Доставка еды", "Food delivery", "🛵", "Еда", [
    s("del-kitchen", "Дарк-китчен / доставка", "Dark kitchen", [["amenity", "fast_food"]], ["restaurant"], { ru: ["доставка еды", "dark kitchen"], en: ["food delivery", "ghost kitchen"] }),
  ]),
  n("grocery", "Продукты", "Grocery", "🛒", "Еда", [
    s("groc-shop", "Продуктовый / супермаркет", "Grocery / supermarket", [["shop", "supermarket"], ["shop", "convenience"], ["shop", "greengrocer"]], ["cafe"], { ru: ["супермаркет", "продукты", "магазин у дома"], en: ["supermarket", "grocery"] }),
  ]),
  n("alcohol", "Алкоголь", "Alcohol", "🍷", "Еда", [
    s("alc-shop", "Винный / алкомаркет", "Wine / liquor", [["shop", "alcohol"], ["shop", "wine"]], ["restaurant"], { ru: ["винный магазин", "алкомаркет"], en: ["wine shop", "liquor store"] }),
  ]),
  n("streetfood", "Стритфуд", "Street food", "🌮", "Еда", [
    s("sf-kiosk", "Киоск / стритфуд", "Street food kiosk", [["amenity", "fast_food"], ["amenity", "food_court"]], ["restaurant"], { ru: ["стритфуд", "киоск еды"], en: ["street food", "food stall"] }),
  ]),
  n("build", "Строительство", "Construction", "🏗️", "Дом", [
    s("build-co", "Строительная компания", "Construction company", [["office", "construction_company"], ["craft", "builder"]], ["construction"]),
    nsub("build-house", "Строительство домов", "House building", [["craft", "builder"]], ["construction"], { ru: ["строительство домов", "каркасный дом"], en: ["home builder"] }),
  ]),
  n("renovation", "Ремонт квартир", "Renovation", "🛠️", "Дом", [
    s("ren-apt", "Ремонт квартир", "Apartment renovation", [["craft", "painter"], ["office", "construction_company"]], ["construction"]),
    s("ren-design", "Дизайн интерьера", "Interior design", [["office", "architect"], ["craft", "interior_decorator"]], ["construction"], { ru: ["дизайн интерьера", "дизайнер"], en: ["interior designer"] }),
  ]),
  n("plumbing", "Сантехника", "Plumbing", "🚰", "Дом", [
    s("plumb-svc", "Сантехник / услуги", "Plumber", [["craft", "plumber"]], ["construction"], { ru: ["сантехник", "установка сантехники"], en: ["plumber", "plumbing"] }),
    s("plumb-shop", "Магазин сантехники", "Plumbing store", [["shop", "bathroom_furnishing"], ["shop", "doityourself"]], ["construction"]),
  ]),
  n("electric", "Электрика", "Electrical", "💡", "Дом", [
    s("el-svc", "Электрик", "Electrician", [["craft", "electrician"]], ["construction"], { ru: ["электрик", "электромонтаж"], en: ["electrician"] }),
  ]),
  n("hvac", "Отопление и климат", "HVAC", "❄️", "Дом", [
    s("hvac-svc", "Кондиционеры / HVAC", "AC / HVAC", [["craft", "hvac"]], ["construction"], { ru: ["кондиционеры", "вентиляция", "отопление"], en: ["air conditioning", "hvac"] }),
  ]),
  n("windows", "Окна и двери", "Windows & doors", "🪟", "Дом", [
    s("win-shop", "Окна / двери", "Windows / doors", [["craft", "window_construction"], ["shop", "windows"]], ["construction"], { ru: ["окна пвх", "пластиковые окна"], en: ["windows", "pvc windows"] }),
  ]),
  n("roof", "Кровля", "Roofing", "🏠", "Дом", [
    s("roof-svc", "Кровельные работы", "Roofing", [["craft", "roofer"]], ["construction"], { ru: ["кровля", "крыша"], en: ["roofing", "roofer"] }),
  ]),
  n("floor", "Напольные покрытия", "Flooring", "🪵", "Дом", [
    s("floor-shop", "Напольные покрытия", "Flooring store", [["shop", "flooring"], ["shop", "carpet"]], ["construction"], { ru: ["ламинат", "паркет", "натяжные потолки"], en: ["flooring", "laminate"] }),
  ]),
  n("furniture", "Мебель", "Furniture", "🛋️", "Дом", [
    s("furn-shop", "Мебельный салон", "Furniture store", [["shop", "furniture"]], ["construction"], { ru: ["мебель", "кухни на заказ"], en: ["furniture", "custom kitchen"] }),
  ]),
  n("landscape", "Ландшафт", "Landscaping", "🌳", "Дом", [
    s("land-svc", "Ландшафтный дизайн", "Landscaping", [["craft", "gardener"], ["leisure", "garden"]], ["construction", "flowers"], { ru: ["ландшафт", "озеленение"], en: ["landscaping", "garden design"] }),
  ]),
  n("cleaning", "Клининг", "Cleaning", "🧹", "Дом", [
    s("clean-co", "Клининговая компания", "Cleaning company", [["shop", "dry_cleaning"], ["craft", "cleaner"]], ["cleaning"]),
    s("clean-dry", "Химчистка", "Dry cleaning", [["shop", "dry_cleaning"], ["shop", "laundry"]], ["cleaning"]),
  ]),
  n("pest", "Дезинсекция", "Pest control", "🐜", "Дом", [
    s("pest-svc", "Дезинсекция / дератизация", "Pest control", [["office", "company"]], ["cleaning"], { ru: ["дезинсекция", "травля насекомых"], en: ["pest control", "exterminator"] }),
  ]),
  n("security", "Безопасность", "Security", "🚨", "Дом", [
    s("sec-alarm", "Охрана / сигнализация", "Alarms / security", [["shop", "security"], ["office", "security"]], ["it"], { ru: ["сигнализация", "видеонаблюдение", "охрана"], en: ["security alarm", "cctv"] }),
  ]),
  n("moving", "Переезды", "Moving", "📦", "Дом", [
    s("move-co", "Переезд / грузчики", "Movers", [["office", "logistics"], ["amenity", "weighbridge"]], ["construction"], { ru: ["переезд", "грузчики"], en: ["movers", "moving company"] }),
  ]),
  n("fitness", "Фитнес", "Fitness", "💪", "Спорт", [
    s("fit-gym", "Фитнес-клуб / зал", "Gym", [["leisure", "fitness_centre"], ["leisure", "sports_centre"]], ["fitness"]),
    s("fit-box", "Бокс / единоборства", "Boxing / martial arts", [["leisure", "sports_centre"]], ["fitness"], { ru: ["бокс", "мма", "единоборства"], en: ["boxing gym", "mma"] }),
  ]),
  n("yoga", "Йога и пилатес", "Yoga & pilates", "🧘", "Спорт", [
    s("yoga-studio", "Студия йоги", "Yoga studio", [["leisure", "fitness_centre"]], ["fitness", "spa"], { ru: ["йога", "пилатес"], en: ["yoga studio", "pilates"] }, true),
  ]),
  n("dance", "Танцы", "Dance", "💃", "Спорт", [
    s("dance-school", "Школа танцев", "Dance school", [["leisure", "dance"], ["amenity", "studio"]], ["education", "fitness"], { ru: ["школа танцев", "хореография"], en: ["dance school", "dance studio"] }),
  ]),
  n("pool", "Бассейны", "Pools", "🏊", "Спорт", [
    s("pool-swim", "Бассейн", "Swimming pool", [["leisure", "swimming_pool"]], ["fitness"], { ru: ["бассейн", "плавание"], en: ["swimming pool"] }),
  ]),
  n("sportsclub", "Спортклубы", "Sports clubs", "🏟️", "Спорт", [
    s("sport-club", "Спортивный клуб", "Sports club", [["leisure", "sports_centre"], ["leisure", "stadium"]], ["fitness"]),
  ]),
  n("hotels", "Отели", "Hotels", "🏨", "Туризм", [
    s("hotel-gen", "Отель / гостиница", "Hotel", [["tourism", "hotel"], ["tourism", "guest_house"]], ["hotel"]),
    s("hotel-hostel", "Хостел", "Hostel", [["tourism", "hostel"]], ["hotel"]),
  ]),
  n("travel", "Туризм", "Travel", "✈️", "Туризм", [
    s("travel-agency", "Турагентство", "Travel agency", [["shop", "travel_agency"], ["office", "travel_agent"]], ["hotel"], { ru: ["турагентство", "туры"], en: ["travel agency", "tours"] }),
  ]),
  n("photo", "Фото и видео", "Photo & video", "📷", "События", [
    s("photo-studio", "Фотостудия", "Photo studio", [["shop", "photo"], ["craft", "photographer"]], ["photo"]),
    s("photo-video", "Видеограф", "Videographer", [["craft", "photographer"]], ["photo"], { ru: ["видеограф", "видеосъемка"], en: ["videographer"] }),
  ]),
  n("events", "События и свадьбы", "Events & weddings", "💍", "События", [
    s("event-wed", "Свадебное агентство", "Wedding planner", [["office", "company"], ["craft", "photographer"]], ["photo", "flowers"], { ru: ["свадебное агентство", "организатор свадеб"], en: ["wedding planner"] }),
    s("event-agency", "Event-агентство", "Event agency", [["office", "company"]], ["photo"], { ru: ["event агентство", "организация мероприятий"], en: ["event agency"] }),
  ]),
  n("flowers", "Цветы", "Flowers", "💐", "События", [
    s("flow-shop", "Цветочный магазин", "Florist", [["shop", "florist"]], ["flowers"]),
  ]),
  n("pets", "Питомцы", "Pets", "🐕", "Lifestyle", [
    s("pets-groom", "Груминг", "Pet grooming", [["shop", "pet"], ["animal", "shelter"]], ["pets"]),
    s("pets-shop", "Зоомагазин", "Pet shop", [["shop", "pet"]], ["pets"]),
    s("pets-hotel", "Зоогостиница", "Pet hotel", [["amenity", "animal_boarding"]], ["pets"]),
  ]),
  n("laundry", "Прачечные", "Laundry", "👕", "Lifestyle", [
    s("laund-shop", "Прачечная", "Laundry", [["shop", "laundry"], ["amenity", "laundry"]], ["cleaning"]),
  ]),
  n("tailor", "Ателье", "Tailoring", "🧵", "Lifestyle", [
    s("tailor-shop", "Ателье / портной", "Tailor", [["shop", "tailor"], ["craft", "tailor"]], ["cleaning"], { ru: ["ателье", "портной", "ремонт одежды"], en: ["tailor", "alterations"] }),
  ]),
  n("jewelry", "Ювелирные", "Jewelry", "💎", "Lifestyle", [
    s("jew-shop", "Ювелирный салон", "Jewelry store", [["shop", "jewelry"]], ["flowers"], { ru: ["ювелирный", "золото"], en: ["jewelry", "jeweller"] }),
  ]),
  n("fashion", "Одежда", "Fashion", "👗", "Lifestyle", [
    s("fash-boutique", "Бутик / одежда", "Boutique", [["shop", "clothes"]], ["cleaning"], { ru: ["бутик", "магазин одежды"], en: ["boutique", "clothing store"] }, true),
  ]),
  n("shoes", "Обувь", "Shoes", "👟", "Lifestyle", [
    s("shoe-shop", "Обувной магазин", "Shoe store", [["shop", "shoes"]], ["cleaning"], { ru: ["обувь", "ремонт обуви"], en: ["shoe store", "cobbler"] }),
  ]),
  n("watches", "Часы", "Watches", "⌚", "Lifestyle", [
    s("watch-shop", "Часовой салон", "Watch store", [["shop", "watches"], ["shop", "jewelry"]], ["jewelry"], { ru: ["часы", "ремонт часов"], en: ["watches", "watchmaker"] }),
  ]),
  n("gifts", "Подарки", "Gifts", "🎁", "Lifestyle", [
    s("gift-shop", "Магазин подарков", "Gift shop", [["shop", "gift"]], ["flowers"], { ru: ["подарки", "сувениры"], en: ["gift shop", "souvenirs"] }),
  ]),
  n("legal", "Юристы", "Legal", "⚖️", "Бизнес", [
    s("legal-firm", "Юридическая фирма", "Law firm", [["office", "lawyer"], ["office", "attorney"]], ["legal"]),
    s("legal-notary", "Нотариус", "Notary", [["office", "notary"]], ["legal"], { ru: ["нотариус"], en: ["notary"] }),
  ]),
  n("accounting", "Бухгалтерия", "Accounting", "📊", "Бизнес", [
    s("acc-firm", "Бухгалтерские услуги", "Accounting firm", [["office", "accountant"], ["office", "tax_advisor"]], ["legal"], { ru: ["бухгалтер", "аутсорсинг бухгалтерии"], en: ["accountant", "bookkeeping"] }),
  ]),
  n("insurance", "Страхование", "Insurance", "🛡️", "Бизнес", [
    s("ins-agency", "Страховое агентство", "Insurance agency", [["office", "insurance"], ["shop", "insurance"]], ["legal"], { ru: ["страховка", "страхование"], en: ["insurance agency"] }),
  ]),
  n("realty", "Недвижимость", "Real estate", "🏢", "Бизнес", [
    s("re-agency", "Агентство недвижимости", "Real estate agency", [["office", "estate_agent"]], ["realty"]),
  ]),
  n("education", "Образование", "Education", "📚", "Бизнес", [
    s("edu-courses", "Курсы / учебный центр", "Training center", [["amenity", "school"], ["amenity", "college"]], ["education"]),
    s("edu-tutor", "Репетиторы", "Tutoring", [["amenity", "school"]], ["education"]),
  ]),
  n("kids", "Дети", "Kids", "🧸", "Бизнес", [
    s("kids-kg", "Детский сад", "Kindergarten", [["amenity", "kindergarten"], ["amenity", "childcare"]], ["education"], { ru: ["детский сад", "частный садик"], en: ["kindergarten", "preschool"] }),
    s("kids-dev", "Детский центр", "Kids center", [["amenity", "community_centre"]], ["education"], { ru: ["детский центр", "развитие детей"], en: ["kids club", "after school"] }),
  ]),
  n("lang", "Языковые школы", "Language schools", "🗣️", "Бизнес", [
    s("lang-school", "Языковая школа", "Language school", [["amenity", "language_school"], ["amenity", "school"]], ["education"], { ru: ["английский язык", "языковые курсы"], en: ["english school", "language courses"] }),
  ]),
  n("it", "IT и digital", "IT & digital", "💻", "Бизнес", [
    s("it-studio", "Веб-студия / IT", "Web studio / IT", [["office", "it"], ["office", "company"]], ["it"]),
    s("it-market", "Маркетинговое агентство", "Marketing agency", [["office", "advertising_agency"]], ["it"], { ru: ["маркетинг", "smm агентство"], en: ["marketing agency", "smm"] }),
  ]),
  n("ads", "Реклама", "Advertising", "📣", "Бизнес", [
    s("ads-outdoor", "Наружная реклама", "Outdoor ads", [["office", "advertising_agency"]], ["it", "print"], { ru: ["наружная реклама", "вывески"], en: ["outdoor advertising", "signage"] }),
  ]),
  n("print", "Полиграфия", "Print", "🖨️", "Бизнес", [
    s("print-shop", "Типография", "Print shop", [["shop", "copyshop"], ["craft", "printer"]], ["print"]),
  ]),
  n("translate", "Переводы", "Translation", "🌐", "Бизнес", [
    s("tr-bureau", "Бюро переводов", "Translation bureau", [["office", "translator"]], ["education", "legal"], { ru: ["бюро переводов", "переводчик"], en: ["translation agency"] }),
  ]),
  n("hr", "HR и кадры", "HR", "👥", "Бизнес", [
    s("hr-agency", "Кадровое агентство", "Recruitment", [["office", "employment_agency"]], ["legal"], { ru: ["кадровое агентство", "рекрутинг"], en: ["recruitment", "staffing"] }),
  ]),
  n("cowork", "Коворкинги", "Coworking", "🖥️", "Бизнес", [
    s("cw-space", "Коворкинг", "Coworking", [["amenity", "coworking_space"], ["office", "coworking"]], ["it", "hotel"], { ru: ["коворкинг"], en: ["coworking space"] }),
  ]),
  n("logistics", "Логистика", "Logistics", "🚚", "Бизнес", [
    s("log-cargo", "Грузоперевозки", "Freight", [["office", "logistics"], ["amenity", "freight"]], ["construction"], { ru: ["грузоперевозки", "логистика"], en: ["freight", "logistics company"] }),
  ]),
  n("warehouse", "Склады", "Warehouses", "🏭", "Бизнес", [
    s("wh-rent", "Складская логистика", "Warehousing", [["building", "warehouse"], ["landuse", "industrial"]], ["construction"], { ru: ["склад", "ответственное хранение"], en: ["warehouse", "fulfillment"] }),
  ]),
  n("factory", "Производство", "Manufacturing", "🏭", "Бизнес", [
    s("fac-plant", "Производство", "Factory", [["man_made", "works"], ["office", "company"]], ["construction"], { ru: ["производство", "цех"], en: ["factory", "manufacturing"] }),
  ]),
  n("wholesale", "Опт", "Wholesale", "📦", "Бизнес", [
    s("ws-trade", "Оптовая компания", "Wholesale", [["shop", "wholesale"], ["office", "company"]], ["construction"], { ru: ["опт", "оптовая база"], en: ["wholesale"] }),
  ]),
  n("electronics", "Электроника", "Electronics", "📱", "Ритейл", [
    s("el-shop", "Магазин электроники", "Electronics store", [["shop", "electronics"], ["shop", "computer"]], ["it"], { ru: ["электроника", "гаджеты"], en: ["electronics store"] }),
  ]),
  n("phonerepair", "Ремонт телефонов", "Phone repair", "📲", "Ритейл", [
    s("phone-fix", "Ремонт телефонов", "Phone repair", [["shop", "mobile_phone"], ["craft", "electronics_repair"]], ["it"], { ru: ["ремонт телефонов", "сервисный центр"], en: ["phone repair", "cell phone repair"] }),
  ]),
  n("computers", "Компьютеры", "Computers", "🖥️", "Ритейл", [
    s("pc-shop", "Компьютерный магазин", "Computer shop", [["shop", "computer"]], ["it"], { ru: ["компьютеры", "сборка пк"], en: ["computer store"] }),
  ]),
  n("banks", "Финансы", "Finance", "🏦", "Бизнес", [
    s("bank-mfo", "МФО / кредиты", "Microfinance", [["amenity", "bank"], ["office", "financial"]], ["legal"], { ru: ["микрозаймы", "кредиты"], en: ["microfinance", "loans"] }),
  ]),
  n("energy", "Энергия и эко", "Energy & eco", "🔆", "Бизнес", [
    s("en-solar", "Солнечные панели", "Solar", [["office", "energy_supplier"]], ["construction"], { ru: ["солнечные панели", "солнечная электростанция"], en: ["solar panels", "solar installer"] }),
  ]),
  n("music", "Музыка", "Music", "🎸", "Lifestyle", [
    s("mus-school", "Музыкальная школа", "Music school", [["amenity", "music_school"]], ["education"], { ru: ["музыкальная школа", "уроки гитары"], en: ["music school"] }),
    s("mus-shop", "Музыкальный магазин", "Music store", [["shop", "musical_instrument"]], ["education"]),
  ]),
  n("books", "Книги", "Books", "📖", "Ритейл", [
    s("book-shop", "Книжный", "Bookstore", [["shop", "books"]], ["education"], { ru: ["книжный магазин"], en: ["bookstore"] }),
  ]),
  n("toys", "Игрушки", "Toys", "🪀", "Ритейл", [
    s("toy-shop", "Магазин игрушек", "Toy store", [["shop", "toys"]], ["education"], { ru: ["игрушки"], en: ["toy store"] }),
  ]),
  n("sportshop", "Спорттовары", "Sporting goods", "🏅", "Ритейл", [
    s("sp-shop", "Спортивный магазин", "Sport shop", [["shop", "sports"]], ["fitness"], { ru: ["спорттовары"], en: ["sporting goods"] }),
  ]),
  n("hunt", "Охота и рыбалка", "Hunt & fish", "🎣", "Lifestyle", [
    s("hunt-shop", "Охота / рыбалка", "Hunt / fish shop", [["shop", "fishing"], ["shop", "hunting"]], ["fitness"], { ru: ["рыбалка", "охота"], en: ["fishing shop", "hunting"] }),
  ]),
  n("visa", "Визы", "Visa services", "🛂", "Туризм", [
    s("visa-center", "Визовый центр", "Visa center", [["office", "diplomatic"], ["office", "company"]], ["hotel", "legal"], { ru: ["визовый центр", "виза"], en: ["visa center", "visa service"] }),
  ]),
  n("banquet", "Банкетные залы", "Banquet halls", "🥂", "События", [
    s("banq-hall", "Банкетный зал", "Banquet hall", [["amenity", "events_venue"], ["amenity", "community_centre"]], ["restaurant", "events"], { ru: ["банкетный зал", "площадка для свадьбы"], en: ["banquet hall", "event venue"] }),
  ]),
  n("clubs", "Клубы", "Nightclubs", "🎧", "Еда", [
    s("club-night", "Ночной клуб", "Nightclub", [["amenity", "nightclub"]], ["bars"], { ru: ["ночной клуб", "клуб"], en: ["nightclub", "club"] }),
  ]),
  n("funeral", "Ритуальные услуги", "Funeral", "🕯️", "Сервисы", [
    s("fun-svc", "Ритуальные услуги", "Funeral services", [["shop", "funeral_directors"], ["amenity", "funeral_hall"]], ["legal"], { ru: ["ритуальные услуги", "похоронное бюро"], en: ["funeral home"] }),
  ]),
  n("beauty-med", "Трихология / дерматология", "Trichology / derm", "🧬", "Здоровье", [
    s("tri-clinic", "Трихолог", "Trichologist", [["amenity", "clinic"], ["healthcare", "dermatologist"]], ["cosmo", "clinic"], { ru: ["трихолог", "лечение волос"], en: ["trichologist", "dermatologist"] }),
  ]),
  n("wellness-coach", "Нутрициология", "Nutrition", "🥗", "Здоровье", [
    s("nutri", "Нутрициолог / диетолог", "Nutritionist", [["healthcare", "nutrition_counseling"], ["amenity", "doctors"]], ["clinic", "fitness"], { ru: ["нутрициолог", "диетолог"], en: ["nutritionist", "dietitian"] }),
  ]),
];

function nsub(
  id: string,
  ru: string,
  en: string,
  osm: OsmFilter[],
  packs: string[],
  extra?: SubNiche["extra"],
): SubNiche {
  return s(id, ru, en, osm, extra ? packs : packs, extra);
}

export const NICHE_GROUPS = [...new Set(NICHES.map((x) => x.group))];

export function allSubs(): SubNiche[] {
  return NICHES.flatMap((n) => n.subs);
}

export function findSub(id: string): { niche: Niche; sub: SubNiche } | null {
  for (const niche of NICHES) {
    const sub = niche.subs.find((s) => s.id === id);
    if (sub) return { niche, sub };
  }
  return null;
}

export function findSubIdsByNiche(nicheId: string): string[] {
  return NICHES.find((n) => n.id === nicheId)?.subs.map((s) => s.id) ?? [];
}
