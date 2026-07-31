const COMPAT = {
  genius: ["vacanze", "base", "lastminute", "prenota", "mobile", "paese"],
  vacanze: ["genius"],
  base: ["genius", "mobile", "paese"],
  lastminute: ["genius", "mobile", "paese"],
  prenota: ["genius", "mobile", "paese"],
  mobile: ["genius", "base", "lastminute", "prenota"],
  paese: ["genius", "base", "lastminute", "prenota", "mobile"],
  deep: [],
  none: null,
};

const TYPE_LABELS = {
  genius: "Genius",
  vacanze: "Offerta Vacanze",
  base: "Offerta Base",
  lastminute: "Last Minute",
  prenota: "Prenota Prima",
  mobile: "Tariffa Mobile",
  paese: "GEO",
  deep: "Deep Deal (48h)",
  none: "Senza vincoli",
};

const STRATEGY_CHANNEL_META = {
  site: { label: "Sito ufficiale", comm: 0 },
  booking: { label: "Booking.com", comm: 18 },
  webbeds: { label: "WebBeds", comm: 20 },
  hotelbeds: { label: "HotelBeds", comm: 20 },
  gobeds: { label: "GoBeds", comm: 20 },
  expedia: { label: "Expedia", comm: 18 },
  trip: { label: "Trip.com", comm: 18 },
};

// I contatti operatori sono separati in components/OperatorsPanel.js.
const OPERATOR_CONTACTS = window.OPERATOR_CONTACTS || {};

const STRATEGY_PROMO_LIBRARY = {
  site: [
    { id: "site_early", l: "Early Bird", p: 10, type: "prenota", appliesTo: "notref", rule: "cumulabile con NOT REF", period: "30gg prima" },
    { id: "site_last", l: "Last Minute", p: 15, type: "lastminute", appliesTo: "notref", rule: "alternativa a Early Bird", period: "entro 24h" },
    { id: "site_weekend", l: "Weekend Escape", p: 15, type: "vacanze", appliesTo: "both", rule: "VEN SAB DOM, min stay 2", period: "weekend" },
  ],
  booking: [
    { id: "bk_genius", l: "Genius", p: 10, type: "genius", appliesTo: "both", rule: "cumulabile con molte promo Booking", period: "sempre" },
    { id: "bk_basic3", l: "Basic Deal", p: 3, type: "base", appliesTo: "both", rule: "cumulabile con Genius, mobile e paese", period: "ottobre" },
    { id: "bk_basic10", l: "Basic Deal", p: 10, type: "base", appliesTo: "both", rule: "cumulabile con Genius, mobile e paese", period: "novembre-febbraio" },
    { id: "bk_last", l: "Last Minute", p: 10, type: "lastminute", appliesTo: "both", rule: "cumulabile con Genius, mobile e paese", period: "sotto data" },
    { id: "bk_prenota", l: "Prenota Prima", p: 10, type: "prenota", appliesTo: "both", rule: "cumulabile con Genius, mobile e paese", period: "anticipo" },
    { id: "bk_getaway25", l: "Getaway", p: 25, type: "vacanze", appliesTo: "both", rule: "di norma cumulabile con Genius, esclude base/last/prenota", period: "maggio-luglio, settembre" },
    { id: "bk_getaway30", l: "Getaway agosto", p: 30, type: "vacanze", appliesTo: "both", rule: "di norma cumulabile con Genius, esclude base/last/prenota", period: "agosto" },
    { id: "bk_48h", l: "48h Deal", p: 30, type: "deep", appliesTo: "both", rule: "promo forte, tende a escludere le altre", period: "flash sale" },
    { id: "bk_mobile", l: "Mobile rate", p: 10, type: "mobile", appliesTo: "both", rule: "cumulabile con Genius/base/last/prenota", period: "sempre" },
    { id: "bk_geo", l: "GEO", p: 0, type: "paese", appliesTo: "both", rule: "una sola area geografica attiva per volta", period: "mercato geo" },
  ],
  webbeds: [
    { id: "wb_alta", l: "Alta stagione", p: 20, type: "none", appliesTo: "both", rule: "sconto wholesale stagionale", period: "aprile-giugno, settembre-ottobre" },
    { id: "wb_bassa", l: "Bassa stagione", p: 25, type: "none", appliesTo: "both", rule: "sconto wholesale stagionale", period: "luglio-inizio settembre, novembre-marzo" },
    { id: "wb_package", l: "Package/Opaque", p: 10, type: "none", appliesTo: "both", rule: "tariffa pacchetto o opaca", period: "sempre" },
  ],
  hotelbeds: [
    { id: "hb_early", l: "Early Booking", p: 10, type: "prenota", appliesTo: "both", rule: "prenotazione anticipata", period: "30gg prima" },
    { id: "hb_tactical", l: "Tactical Sale", p: 15, type: "base", appliesTo: "both", rule: "spinta commerciale su date selezionate", period: "da definire" },
    { id: "hb_package", l: "Package rate", p: 10, type: "none", appliesTo: "both", rule: "pacchetto / B2B", period: "sempre" },
  ],
  gobeds: [
    { id: "gb_flash", l: "Flash Sale", p: 15, type: "base", appliesTo: "both", rule: "promo tattica", period: "date selezionate" },
    { id: "gb_mobile", l: "Mobile", p: 10, type: "mobile", appliesTo: "both", rule: "visibile da mobile", period: "sempre" },
    { id: "gb_package", l: "Package", p: 12, type: "none", appliesTo: "both", rule: "pacchetto", period: "sempre" },
  ],
  expedia: [
    { id: "ex_member", l: "Member Only", p: 10, type: "genius", appliesTo: "both", rule: "sconto membri Expedia", period: "sempre" },
    { id: "ex_mobile", l: "Mobile Deal", p: 10, type: "mobile", appliesTo: "both", rule: "mobile app/web", period: "sempre" },
    { id: "ex_early", l: "Book Early", p: 20, type: "prenota", appliesTo: "both", rule: "prenotazione anticipata", period: "date ampie" },
    { id: "ex_midyear", l: "Mid-Year Sale", p: 30, type: "vacanze", appliesTo: "both", rule: "campagna Expedia", period: "giugno-dicembre" },
  ],
  trip: [
    { id: "tc_member", l: "Member Deal", p: 10, type: "genius", appliesTo: "both", rule: "sconto iscritti Trip.com", period: "sempre" },
    { id: "tc_mobile", l: "App Deal", p: 10, type: "mobile", appliesTo: "both", rule: "visibile in app", period: "sempre" },
    { id: "tc_campaign", l: "Campaign Sale", p: 15, type: "base", appliesTo: "both", rule: "campagna mercato", period: "date selezionate" },
  ],
};

const MONTHS = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
const WEEKDAYS = ["L", "M", "M", "G", "V", "S", "D"];
const WEEKDAY_LONG = ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato"];
const STORAGE_KEY = "prisma-local-data-v1";
const APP_VERSION = "20260623-contacts-serhs-welcomebeds";
const IMPORTER_TEXT_STORE_LIMIT = 2500;
const PMS_LAST_UPLOAD = "19/05/2026 12:52";
const NON_REF_DISCOUNT = 10;
const AUTO_REVENUE_IMPORT_MAX_ENTRIES = 500;
const MAX_REVENUE_DIARY_ENTRIES = 3000;
const AVAILABILITY_HISTORY_START = "2026-01-01";
const AVAILABILITY_HISTORY_END = "2028-12-31";
const UNDATED_PROMO_VISIBILITY_END = "2026-12-31";

const PROPERTY_SOURCE_SYSTEMS = {
  laville: {
    pms: "Beddzle",
    channelManager: "Beddzle",
    importLabel: "Beddzle",
    rateSource: "Price Strategy",
    bookingSource: "R_bzl-bookings",
  },
  pineta: {
    pms: "Alyante",
    channelManager: "Figaro",
    importLabel: "Alyante/Figaro",
    rateSource: "Alyante / Figaro tariffe",
    bookingSource: "Alyante / Figaro prenotazioni",
  },
};

const HOLIDAYS = {
  "2026-01-01": "Capodanno",
  "2026-01-06": "Epifania",
  "2026-04-05": "Pasqua",
  "2026-04-06": "Pasquetta",
  "2026-04-25": "Liberazione",
  "2026-05-01": "Festa del Lavoro",
  "2026-06-02": "Festa della Repubblica",
  "2026-08-15": "Ferragosto",
  "2026-11-01": "Ognissanti",
  "2026-12-08": "Immacolata",
  "2026-12-25": "Natale",
  "2026-12-26": "Santo Stefano",
  "2027-01-01": "Capodanno",
  "2027-01-06": "Epifania",
  "2027-03-28": "Pasqua",
  "2027-03-29": "Pasquetta",
  "2027-04-25": "Liberazione",
  "2027-05-01": "Festa del Lavoro",
  "2027-06-02": "Festa della Repubblica",
  "2027-08-15": "Ferragosto",
  "2027-11-01": "Ognissanti",
  "2027-12-08": "Immacolata",
  "2027-12-25": "Natale",
  "2027-12-26": "Santo Stefano",
};

const RATES = {
  laville: {
    "2026-05-14": 269,
    "2026-05-15": 269,
    "2026-05-16": 259,
    "2026-05-17": 159,
    "2026-06-01": 179,
    "2026-07-01": 149,
    "2026-08-01": 129,
    "2026-09-01": 159,
    "2026-10-01": 199,
    "2026-11-01": 139,
    "2026-12-31": 189,
    "2027-02-28": 149,
  },
  pineta: {
    "2026-05-14": 124,
    "2026-05-16": 144,
    "2026-06-01": 94,
    "2026-07-01": 94,
    "2026-08-01": 94,
    "2026-09-01": 109,
    "2026-10-01": 114,
    "2026-11-01": 89,
    "2026-12-31": 119,
    "2027-02-28": 89,
  },
};

const PROPERTY_RATE_ROOM_ORDER = {
  laville: [
    "lv_charme",
    "lv_classic",
    "lv_superior",
    "lv_superior_tripla",
    "lv_superior_letto",
    "lv_deluxe",
    "lv_deluxe_letto",
    "lv_deluxe_twin",
    "lv_family_superior",
    "lv_family_junior",
  ],
  pineta: [
    "pp1",
    "pp2",
    "pp3",
    "pp4",
    "pp5",
    "pp6",
    "pp7",
    "pp8",
    "pp9",
    "pp10",
  ],
};

const PROPERTY_AVAIL_ROOM_ORDER = {
  laville: [
    "lv_charme",
    "lv_classic",
    "lv_superior",
    "lv_superior_tripla",
    "lv_deluxe_twin",
    "lv_deluxe",
    "lv_superior_letto",
    "lv_family_superior",
    "lv_family_junior",
    "lv_deluxe_letto",
  ],
  pineta: [
    "pp1",
    "pp2",
    "pp3",
    "pp4",
    "pp5",
    "pp6",
    "pp7",
    "pp8",
    "pp9",
    "pp10",
  ],
};

const PMS_ROOM_ORDER = PROPERTY_RATE_ROOM_ORDER.laville;
const PMS_AVAIL_ORDER = PROPERTY_AVAIL_ROOM_ORDER.laville;

const LAVILLE_MAX_ROOM_AVAILABILITY = 40;
const IMPORT_AVAIL_RULES = {
  laville: { expectedColumns: 10, maxTotalRooms: 21 },
  pineta: { expectedColumns: 10, maxTotalRooms: 126 },
};

const PMS_DOUBLE_OCCUPANCY_OFFSET = {
  laville: {
    lv_charme: 20,
    lv_classic: 20,
    lv_superior: 20,
    lv_deluxe: 20,
    lv_deluxe_letto: 20,
  },
};

const LAVILLE_ENTRY_CASCADE = {
  lv_charme: 0,
  lv_classic: 0,
  lv_superior: 10,
  lv_superior_tripla: 30,
  lv_superior_letto: 30,
  lv_deluxe: 25,
  lv_deluxe_letto: 45,
  lv_deluxe_twin: 25,
  lv_family_superior: 144,
  lv_family_junior: 144,
};

const PMS_DUS_ROOM_IDS = {
  laville: new Set([
    "lv_charme",
    "lv_classic",
    "lv_superior",
    "lv_deluxe",
    "lv_deluxe_letto",
  ]),
};

const PINETA_COMFORT_RATE_BANDS = [
  { id: "extreme", label: "Extreme Offer", bb: 74, dus: 64 },
  { id: "low_1", label: "LOW 1", bb: 84, dus: 74 },
  { id: "low_2", label: "LOW 2", bb: 89, dus: 79 },
  { id: "low_3", label: "LOW 3", bb: 94, dus: 84 },
  { id: "mid_1", label: "MID 1", bb: 99, dus: 89 },
  { id: "mid_2", label: "MID 2", bb: 104, dus: 94 },
  { id: "mid_3", label: "MID 3", bb: 109, dus: 99 },
  { id: "high_1", label: "HIGH 1", bb: 114, dus: 104 },
  { id: "high_2", label: "HIGH 2", bb: 119, dus: 109 },
  { id: "high_3", label: "HIGH 3", bb: 124, dus: 114 },
  { id: "top_1", label: "TOP 1", bb: 134, dus: 124 },
  { id: "top_2", label: "TOP 2", bb: 139, dus: 129 },
  { id: "top_3", label: "TOP 3", bb: 144, dus: 134 },
];

const PINETA_ROOM_ONLY_RULES = {
  easyconsulting: { label: "EasyConsulting", mode: "per_room", amount: 9 },
  ota: { label: "OTA", mode: "per_room", amount: 9 },
  wholesaler: { label: "Wholesaler", mode: "per_room", amount: 9 },
};

const PINETA_STANDARD_TOTAL = 68;
const PINETA_INVENTORY_GROUPS = [
  { id: "comfort", label: "MT/DP Comfort", count: 32, roomId: "pp1", aliases: ["DUS Comfort"] },
  { id: "comfort_tripla", label: "Tripla Comfort", count: 30, roomId: "pp2" },
  { id: "comfort_quadrupla", label: "Quadrupla Comfort", count: 4, roomId: "", note: "da mappare" },
  { id: "comfort_premium", label: "MT/DP Comfort Premium", count: 22, roomId: "pp3", aliases: ["DP Comfort Premium", "DUS Comfort Premium"] },
  { id: "comfort_premium_extra", label: "MT+LT Comfort Premium", count: 18, roomId: "pp4" },
  { id: "superior", label: "MT Superior", count: 10, roomId: "pp5", aliases: ["DUS Superior"] },
  { id: "junior_suite", label: "Junior Suite", count: 4, roomId: "pp6" },
  { id: "suite", label: "Suite", count: 3, roomId: "pp7" },
  { id: "suite_deluxe", label: "Suite Deluxe", count: 2, roomId: "", note: "da mappare" },
  { id: "comfort_premium_quadrupla", label: "Quadrupla Comfort Premium", count: 1, roomId: "", note: "da mappare" },
];

const PINETA_FIGARO_RATE_PLANS = [
  { id: "comfort_ro", label: "Matrim./Doppia Comfort RO", roomId: "pp1", board: "RO", occupancy: "double", sourceRule: "ota" },
  { id: "comfort_bb", label: "Matrim./Doppia Comfort BB", roomId: "pp1", board: "BB", occupancy: "double", sourceRule: "bb" },
  { id: "comfort_dus_ro", label: "DUS Comfort RO", roomId: "pp1", board: "RO", occupancy: "dus", sourceRule: "dus" },
  { id: "comfort_tripla_ro", label: "Tripla Comfort RO", roomId: "pp2", board: "RO", occupancy: "triple", sourceRule: "ota" },
  { id: "comfort_tripla_bb", label: "Tripla Comfort BB", roomId: "pp2", board: "BB", occupancy: "triple", sourceRule: "bb" },
  { id: "comfort_premium_ro", label: "Matrimoniale Comfort Premium RO", roomId: "pp3", board: "RO", occupancy: "double", sourceRule: "ota" },
  { id: "comfort_premium_bb", label: "Matrimoniale Comfort Premium BB", roomId: "pp3", board: "BB", occupancy: "double", sourceRule: "bb" },
  { id: "comfort_premium_dus_ro", label: "DUS Comfort Premium RO", roomId: "pp3", board: "RO", occupancy: "dus", sourceRule: "dus" },
  { id: "comfort_premium_extra_ro", label: "Matrim.+Letto Comfort Premium RO", roomId: "pp4", board: "RO", occupancy: "extra_bed", sourceRule: "ota" },
  { id: "comfort_premium_extra_bb", label: "Matrim.+Letto Comfort Premium BB", roomId: "pp4", board: "BB", occupancy: "extra_bed", sourceRule: "bb" },
  { id: "comfort_premium_tripla_bb", label: "Tripla Comfort Premium BB", roomId: "pp4", board: "BB", occupancy: "triple", sourceRule: "bb", warning: "Da verificare: in alcuni screenshot compare prezzo 999." },
  { id: "superior_ro", label: "Superior RO", roomId: "pp5", board: "RO", occupancy: "double", sourceRule: "ota" },
  { id: "superior_bb", label: "Superior BB", roomId: "pp5", board: "BB", occupancy: "double", sourceRule: "bb" },
  { id: "superior_dus_ro", label: "DUS Superior RO", roomId: "pp5", board: "RO", occupancy: "dus", sourceRule: "dus" },
  { id: "junior_suite_ro", label: "Junior Suite RO", roomId: "pp6", board: "RO", occupancy: "double", sourceRule: "ota" },
  { id: "junior_suite_bb", label: "Junior Suite BB", roomId: "pp6", board: "BB", occupancy: "double", sourceRule: "bb" },
  { id: "suite_ro", label: "Suite RO", roomId: "pp7", board: "RO", occupancy: "double", sourceRule: "ota" },
  { id: "suite_bb", label: "Suite BB", roomId: "pp7", board: "BB", occupancy: "double", sourceRule: "bb" },
];

const PMS_RATES = {
  laville: parsePmsRates(`
2026-05-19 189 209
2026-05-20 179 199
2026-05-21 205 225
2026-05-22 209 229
2026-05-23 199 219
2026-05-24 199 219
2026-05-25 179 199
2026-05-26 179 199
2026-05-27 189 209
2026-05-28 210 230
2026-05-29 159 179
2026-05-30 169 189
2026-05-31 169 189
2026-06-01 159 179
2026-06-02 159 179
2026-06-03 199 219
2026-06-04 185 205
2026-06-05 185 205
2026-06-06 180 200
2026-06-07 174 194
2026-06-08 200 220
2026-06-09 200 220
2026-06-10 200 220
2026-06-11 189 209
2026-06-12 179 199
2026-06-13 169 189
2026-06-14 169 189
2026-06-15 194 214
2026-06-16 189 209
2026-06-17 189 209
2026-06-18 189 209
2026-06-19 199 219
2026-06-20 169 189
2026-06-21 169 189
2026-06-22 189 209
2026-06-23 189 209
2026-06-24 189 209
2026-06-25 189 209
2026-06-26 189 209
2026-06-27 169 189
2026-06-28 169 189
2026-06-29 189 209
2026-06-30 189 209
2026-07-01 139 159
2026-07-02 139 159
2026-07-03 139 159
2026-07-04 199 219
2026-07-05 129 149
2026-07-06 139 159
2026-07-07 139 159
2026-07-08 139 159
2026-07-09 139 159
2026-07-10 139 159
2026-07-11 129 149
2026-07-12 129 149
2026-07-13 139 159
2026-07-14 139 159
2026-07-15 139 159
2026-07-16 139 159
2026-07-17 139 159
2026-07-18 129 149
2026-07-19 129 149
2026-07-20 139 159
2026-07-21 139 159
2026-07-22 139 159
2026-07-23 139 159
2026-07-24 139 159
2026-07-25 129 149
2026-07-26 129 149
2026-07-27 139 159
2026-07-28 139 159
2026-07-29 139 159
2026-07-30 139 159
2026-07-31 139 159
2026-08-01 119 139
2026-08-02 119 139
2026-08-03 129 149
2026-08-04 129 149
2026-08-05 129 149
2026-08-06 129 149
2026-08-07 119 139
2026-08-08 119 139
2026-08-09 119 139
2026-08-10 129 149
2026-08-11 129 149
2026-08-12 129 149
2026-08-13 129 149
2026-08-14 119 139
2026-08-15 119 139
2026-08-16 119 139
2026-08-17 129 149
2026-08-18 129 149
2026-08-19 129 149
2026-08-20 129 149
2026-08-21 119 139
2026-08-22 119 139
2026-08-23 119 139
2026-08-24 129 149
2026-08-25 129 149
2026-08-26 129 149
2026-08-27 129 149
2026-08-28 119 139
2026-08-29 119 139
2026-08-30 119 139
2026-08-31 159 179
2026-09-01 159 179
2026-09-02 159 179
2026-09-03 159 179
2026-09-04 159 179
2026-09-05 149 169
2026-09-06 149 169
2026-09-07 179 199
2026-09-08 179 199
2026-09-09 179 199
2026-09-10 179 199
2026-09-11 179 199
2026-09-12 159 179
2026-09-13 159 179
2026-09-14 179 199
2026-09-15 179 199
2026-09-16 179 199
2026-09-17 179 199
2026-09-18 179 199
2026-09-19 179 199
2026-09-20 179 199
2026-09-21 179 199
2026-09-22 179 199
2026-09-23 179 199
2026-09-24 179 199
2026-09-25 179 199
2026-09-26 159 179
2026-09-27 159 179
2026-09-28 179 199
2026-09-29 179 199
2026-09-30 179 199
2026-10-01 179 199
2026-10-02 159 179
2026-10-03 159 179
2026-10-04 159 179
2026-10-05 179 199
2026-10-06 179 199
2026-10-07 179 199
2026-10-08 179 199
2026-10-09 179 199
2026-10-10 159 179
2026-10-11 159 179
2026-10-12 179 199
2026-10-13 179 199
2026-10-14 179 199
2026-10-15 179 199
2026-10-16 179 199
2026-10-17 159 179
2026-10-18 159 179
2026-10-19 179 199
2026-10-20 179 199
2026-10-21 179 199
2026-10-22 179 199
2026-10-23 179 199
2026-10-24 159 179
2026-10-25 159 179
2026-10-26 179 199
2026-10-27 179 199
2026-10-28 179 199
2026-10-29 179 199
2026-10-30 179 199
2026-10-31 159 179
2026-11-01 129 149
2026-11-02 139 159
2026-11-03 139 159
2026-11-04 139 159
2026-11-05 139 159
2026-11-06 139 159
2026-11-07 129 149
2026-11-08 129 149
2026-11-09 139 159
2026-11-10 139 159
2026-11-11 139 159
2026-11-12 139 159
2026-11-13 139 159
2026-11-14 129 149
2026-11-15 129 149
2026-11-16 139 159
2026-11-17 139 159
2026-11-18 139 159
2026-11-19 139 159
2026-11-20 139 159
2026-11-21 129 149
2026-11-22 129 149
2026-11-23 139 159
2026-11-24 139 159
2026-11-25 139 159
2026-11-26 139 159
2026-11-27 139 159
2026-11-28 129 149
2026-11-29 129 149
2026-11-30 139 159
2026-12-01 139 159
2026-12-02 139 159
2026-12-03 139 159
2026-12-04 139 159
2026-12-05 139 159
2026-12-06 139 159
2026-12-07 139 159
2026-12-08 139 159
2026-12-09 139 159
2026-12-10 139 159
2026-12-11 139 159
2026-12-12 129 149
2026-12-13 129 149
2026-12-14 139 159
2026-12-15 139 159
2026-12-16 139 159
2026-12-17 139 159
2026-12-18 139 159
2026-12-19 129 149
2026-12-20 129 149
2026-12-21 139 159
2026-12-22 139 159
2026-12-23 139 159
2026-12-24 139 159
2026-12-25 139 159
2026-12-26 129 149
2026-12-27 129 149
2026-12-28 139 159
2026-12-29 139 159
2026-12-30 139 159
2026-12-31 179 199
2027-01-01 179 199
2027-01-02 129 149
2027-01-03 129 149
2027-01-04 139 159
2027-01-05 139 159
2027-01-06 139 159
2027-01-07 139 159
2027-01-08 139 159
2027-01-09 129 149
2027-01-10 129 149
2027-01-11 139 159
2027-01-12 139 159
2027-01-13 139 159
2027-01-14 139 159
2027-01-15 139 159
2027-01-16 129 149
2027-01-17 129 149
2027-01-18 139 159
2027-01-19 139 159
2027-01-20 139 159
2027-01-21 139 159
2027-01-22 139 159
2027-01-23 129 149
2027-01-24 129 149
2027-01-25 139 159
2027-01-26 139 159
2027-01-27 139 159
2027-01-28 139 159
2027-01-29 139 159
2027-01-30 129 149
2027-01-31 129 149
2027-02-01 159 179
2027-02-02 159 179
2027-02-03 159 179
2027-02-04 159 179
2027-02-05 159 179
2027-02-06 139 159
2027-02-07 139 159
2027-02-08 159 179
2027-02-09 159 179
2027-02-10 159 179
2027-02-11 159 179
2027-02-12 159 179
2027-02-13 139 159
2027-02-14 139 159
2027-02-15 159 179
2027-02-16 159 179
2027-02-17 159 179
2027-02-18 159 179
2027-02-19 159 179
2027-02-20 139 159
2027-02-21 139 159
2027-02-22 159 179
2027-02-23 159 179
2027-02-24 159 179
2027-02-25 159 179
2027-02-26 159 179
2027-02-27 139 159
2027-02-28 139 159
  `),
  pineta: {
    "2026-06-20": 119,
    "2026-06-21": 119,
    "2026-06-22": 119,
    "2026-06-23": 119,
    "2026-06-24": 124,
    "2026-06-25": 124,
    "2026-06-26": 124,
    "2026-06-27": 109,
    "2026-06-28": 109,
    "2026-06-29": 109,
    "2026-06-30": 109,
    "2026-07-01": 109,
    "2026-07-02": 109,
    "2026-07-03": 109,
    "2026-07-04": 109,
    "2026-07-05": 104,
    "2026-07-06": 104,
    "2026-07-07": 104,
    "2026-07-08": 104,
    "2026-07-09": 104,
    "2026-07-10": 104,
    "2026-07-11": 104,
    "2026-07-12": 104,
    "2026-07-13": 104,
    "2026-07-14": 104,
    "2026-07-15": 104,
    "2026-07-16": 104,
    "2026-07-17": 104,
    "2026-07-18": 104,
    "2026-07-19": 104,
    "2026-07-20": 104,
    "2026-07-21": 104,
    "2026-07-22": 104,
    "2026-07-23": 104,
    "2026-07-24": 104,
    "2026-07-25": 104,
    "2026-07-26": 104,
    "2026-07-27": 104,
    "2026-07-28": 104,
    "2026-07-29": 104,
    "2026-07-30": 104,
    "2026-07-31": 104,
    "2026-08-01": 104,
    "2026-08-02": 104,
    "2026-08-03": 104,
    "2026-08-04": 104,
    "2026-08-05": 104,
    "2026-08-06": 104,
    "2026-08-07": 104,
    "2026-08-08": 104,
    "2026-08-09": 104,
    "2026-08-10": 104,
    "2026-08-11": 104,
    "2026-08-12": 104,
    "2026-08-13": 104,
    "2026-08-14": 104,
    "2026-08-15": 104,
    "2026-08-16": 104,
    "2026-08-17": 104,
    "2026-08-18": 104,
    "2026-08-19": 104,
    "2026-08-20": 104,
    "2026-08-21": 104,
    "2026-08-22": 104,
    "2026-08-23": 104,
    "2026-08-24": 104,
    "2026-08-25": 104,
    "2026-08-26": 104,
    "2026-08-27": 104,
    "2026-08-28": 104,
    "2026-08-29": 104,
    "2026-08-30": 104,
    "2026-08-31": 109,
    "2026-09-01": 109,
    "2026-09-02": 109,
    "2026-09-03": 119,
    "2026-09-04": 119,
    "2026-09-05": 119,
    "2026-09-06": 119,
    "2026-09-07": 124,
    "2026-09-08": 124,
    "2026-09-09": 119,
    "2026-09-10": 119,
    "2026-09-11": 119,
    "2026-09-12": 119,
    "2026-09-13": 124,
    "2026-09-14": 124,
    "2026-09-15": 124,
    "2026-09-16": 119,
    "2026-09-17": 119,
    "2026-09-18": 119,
    "2026-09-19": 124,
    "2026-09-20": 119,
    "2026-09-21": 119,
    "2026-09-22": 119,
    "2026-09-23": 124,
    "2026-09-24": 124,
    "2026-09-25": 134,
    "2026-09-26": 134,
    "2026-09-27": 119,
    "2026-09-28": 119,
    "2026-09-29": 119,
    "2026-09-30": 124,
    "2026-10-01": 124,
    "2026-10-02": 124,
    "2026-10-03": 124,
    "2026-10-04": 124,
    "2026-10-05": 124,
    "2026-10-06": 124,
    "2026-10-07": 124,
    "2026-10-08": 124,
    "2026-10-09": 124,
    "2026-10-10": 124,
    "2026-10-11": 124,
    "2026-10-12": 124,
    "2026-10-13": 124,
    "2026-10-14": 124,
    "2026-10-15": 124,
    "2026-10-16": 124,
    "2026-10-17": 124,
    "2026-10-18": 124,
    "2026-10-19": 124,
    "2026-10-20": 124,
    "2026-10-21": 124,
    "2026-10-22": 124,
    "2026-10-23": 124,
    "2026-10-24": 124,
    "2026-10-25": 124,
    "2026-10-26": 124,
    "2026-10-27": 124,
    "2026-10-28": 124,
    "2026-10-29": 144,
    "2026-10-30": 124,
    "2026-10-31": 124,
    "2026-11-01": 99,
    "2026-11-02": 99,
    "2026-11-03": 99,
    "2026-11-04": 99,
    "2026-11-05": 99,
    "2026-11-06": 99,
    "2026-11-07": 99,
    "2026-11-08": 99,
    "2026-11-09": 99,
    "2026-11-10": 99,
    "2026-11-11": 99,
    "2026-11-12": 99,
    "2026-11-13": 99,
    "2026-11-14": 99,
    "2026-11-15": 99,
    "2026-11-16": 99,
    "2026-11-17": 99,
    "2026-11-18": 99,
    "2026-11-19": 99,
    "2026-11-20": 99,
    "2026-11-21": 99,
    "2026-11-22": 99,
    "2026-11-23": 99,
    "2026-11-24": 99,
    "2026-11-25": 99,
    "2026-11-26": 99,
    "2026-11-27": 99,
    "2026-11-28": 99,
    "2026-11-29": 99,
    "2026-11-30": 99,
    "2026-12-01": 99,
    "2026-12-02": 99,
    "2026-12-03": 99,
    "2026-12-04": 99,
    "2026-12-05": 99,
    "2026-12-06": 99,
    "2026-12-07": 99,
    "2026-12-08": 99,
    "2026-12-09": 99,
    "2026-12-10": 99,
    "2026-12-11": 99,
    "2026-12-12": 99,
    "2026-12-13": 99,
    "2026-12-14": 99,
    "2026-12-15": 99,
    "2026-12-16": 99,
    "2026-12-17": 99,
    "2026-12-18": 99,
    "2026-12-19": 99,
    "2026-12-20": 99,
    "2026-12-21": 99,
    "2026-12-22": 99,
    "2026-12-23": 99,
    "2026-12-24": 99,
    "2026-12-25": 99,
    "2026-12-26": 124,
    "2026-12-27": 124,
    "2026-12-28": 124,
    "2026-12-29": 124,
    "2026-12-30": 124,
    "2026-12-31": 134,
    "2027-01-01": 134,
    "2027-01-02": 134,
    "2027-01-03": 99,
    "2027-01-04": 99,
    "2027-01-05": 99,
    "2027-01-06": 99,
    "2027-01-07": 99,
    "2027-01-08": 99,
    "2027-01-09": 99,
    "2027-01-10": 99,
    "2027-01-11": 99,
    "2027-01-12": 99,
    "2027-01-13": 99,
    "2027-01-14": 99,
    "2027-01-15": 99,
    "2027-01-16": 99,
    "2027-01-17": 99,
    "2027-01-18": 99,
    "2027-01-19": 99,
    "2027-01-20": 99,
    "2027-01-21": 99,
    "2027-01-22": 99,
    "2027-01-23": 99,
    "2027-01-24": 99,
    "2027-01-25": 99,
    "2027-01-26": 99,
    "2027-01-27": 99,
    "2027-01-28": 99,
    "2027-01-29": 99,
    "2027-01-30": 99,
  },
};

const PP_AVAIL = {
  "2026-05-14": [8, 9, 0, 1, 6, 1, 2],
  "2026-05-15": [1, 3, 0, 3, 4, 0, 2],
  "2026-05-16": [1, 0, 3, 3, 6, 3, 2],
  "2026-05-17": [0, 23, 4, 6, 5, 2, 2],
  "2026-06-01": [0, 8, 5, 0, 7, 4, 1],
  "2026-07-01": [11, 23, 2, 10, 9, 4, 3],
  "2026-08-01": [24, 25, 11, 17, 10, 4, 3],
  "2026-09-01": [27, 29, 11, 17, 10, 4, 3],
  "2026-10-01": [5, 18, 11, 17, 10, 4, 3],
  "2026-11-01": [22, 23, 0, 17, 10, 4, 3],
  "2026-12-31": [0, 9, 10, 18, 10, 4, 3],
};

const LV_AVAIL = parseAvailability(`
2026-05-19 0 0 0 0 0 0 0 0 1 0
2026-05-20 0 0 0 0 0 0 0 0 1 0
2026-05-21 1 0 0 0 0 0 0 0 1 0
2026-05-22 0 0 0 0 0 0 0 0 1 0
2026-05-23 0 0 0 0 0 0 0 0 1 0
2026-05-24 1 0 2 0 0 0 1 0 1 0
2026-05-25 1 0 0 0 0 0 0 0 1 0
2026-05-26 0 0 0 0 0 0 0 0 1 0
2026-05-27 0 0 0 0 0 0 0 0 1 0
2026-05-28 0 0 0 0 0 0 0 0 1 0
2026-05-29 0 1 1 1 0 0 1 -1 1 0
2026-05-30 0 0 0 0 0 0 0 -1 1 0
2026-05-31 2 2 0 0 0 2 0 -1 1 1
2026-06-01 2 4 0 0 2 1 0 -1 1 1
2026-06-02 2 4 0 1 2 0 0 0 1 1
2026-06-03 0 0 0 1 0 0 0 0 1 0
2026-06-04 0 2 0 0 0 0 0 0 1 0
2026-06-05 1 0 0 0 0 0 0 0 1 0
2026-06-06 2 0 1 0 0 0 0 0 1 0
2026-06-07 0 0 0 0 0 0 0 0 1 0
2026-06-08 0 1 0 0 0 0 0 0 1 0
2026-06-09 0 0 0 0 0 1 0 0 1 0
2026-06-10 0 0 0 0 0 1 0 0 1 0
2026-06-11 1 2 1 0 0 2 0 0 1 0
2026-06-12 2 5 2 0 1 2 0 0 1 1
2026-06-13 3 6 1 0 1 2 0 0 1 1
2026-06-14 3 6 1 0 2 2 1 0 1 1
2026-06-15 3 2 0 0 0 0 0 0 1 0
2026-06-16 3 5 1 0 0 1 1 0 1 1
2026-06-17 2 1 1 0 0 1 1 0 1 0
2026-06-18 2 6 2 0 0 2 0 0 1 0
2026-06-19 3 0 0 0 0 1 0 0 1 0
2026-06-20 3 1 1 0 1 2 1 0 1 1
2026-06-21 3 3 1 0 1 3 1 0 1 1
2026-06-22 3 0 0 1 1 2 0 0 1 1
2026-06-23 3 2 2 0 1 1 1 0 1 1
2026-06-24 3 3 1 0 2 1 2 0 1 1
2026-06-25 3 4 2 1 1 1 2 0 1 1
2026-06-26 3 5 2 1 1 1 2 0 1 0
2026-06-27 3 4 2 0 1 1 0 0 1 0
2026-06-28 3 5 2 1 1 1 2 0 1 0
2026-06-29 3 2 0 1 2 2 2 0 1 1
2026-06-30 3 2 0 1 1 2 2 0 1 1
2026-07-01 2 0 0 1 1 2 1 0 1 1
2026-07-02 2 0 1 1 0 2 1 0 1 1
2026-07-03 2 2 0 1 0 3 0 0 1 1
2026-07-04 3 1 1 1 0 1 0 0 1 1
2026-07-05 3 3 2 0 1 3 0 0 1 1
2026-07-06 3 4 2 1 1 3 0 0 1 1
2026-07-07 3 2 2 1 1 3 0 0 1 1
2026-07-08 3 4 2 1 1 2 2 0 1 1
2026-07-09 3 3 1 1 2 0 1 0 1 1
2026-07-10 3 6 2 1 2 1 2 0 1 1
2026-07-11 3 6 2 1 2 2 2 0 1 1
2026-07-12 3 6 1 1 2 2 1 0 1 1
2026-07-13 3 6 1 1 2 2 1 0 1 1
2026-07-14 3 6 1 1 2 2 1 0 1 1
2026-07-15 3 5 1 1 2 3 1 0 1 1
2026-07-16 3 5 0 1 2 2 1 0 1 1
2026-07-17 3 4 0 1 1 2 1 0 1 0
2026-07-18 3 5 1 1 1 2 1 0 1 0
2026-07-19 3 6 1 1 1 2 0 0 1 0
2026-07-20 3 6 1 1 1 3 0 0 1 1
2026-07-21 3 6 2 1 1 3 0 0 1 1
2026-07-22 3 6 2 1 1 3 0 0 1 1
2026-07-23 3 6 2 1 2 3 1 0 1 1
2026-07-24 3 6 2 1 2 2 1 0 1 1
2026-07-25 3 6 1 1 1 2 2 0 1 1
2026-07-26 3 6 2 1 2 3 2 0 1 1
2026-07-27 3 6 2 1 2 3 2 0 1 1
2026-07-28 3 6 2 1 2 3 2 0 1 1
2026-07-29 3 6 1 1 2 3 2 0 1 1
2026-07-30 3 6 1 1 2 3 2 0 1 1
2026-07-31 3 6 1 1 2 3 2 0 1 1
2026-08-01 3 6 1 1 2 3 2 0 1 1
2026-08-02 3 6 2 1 2 3 2 0 1 1
2026-08-03 3 6 2 1 2 3 2 0 1 1
2026-08-04 3 6 2 1 2 3 2 0 1 1
2026-08-05 3 6 2 1 2 3 2 0 1 1
2026-08-06 3 6 2 0 2 3 2 0 1 1
2026-08-07 3 6 2 0 2 3 2 0 1 1
2026-08-08 3 6 2 0 2 3 2 0 1 1
2026-08-09 3 6 2 0 2 3 2 0 1 1
2026-08-10 3 6 2 0 2 3 2 0 1 1
2026-08-11 3 6 2 1 2 3 2 0 1 1
2026-08-12 3 6 2 1 2 3 2 0 1 1
2026-08-13 3 6 2 1 2 3 2 0 1 1
2026-08-14 3 6 2 1 2 3 2 0 1 1
2026-08-15 3 6 2 1 2 3 2 0 1 1
2026-08-16 3 6 2 1 2 3 2 0 1 1
2026-08-17 3 6 2 1 2 3 2 0 1 1
2026-08-18 3 6 2 1 2 3 2 0 1 1
2026-08-19 3 6 2 1 2 3 2 0 1 1
2026-08-20 3 6 2 1 2 3 2 0 1 1
2026-08-21 3 6 2 1 2 3 2 0 1 1
2026-08-22 3 6 2 1 2 3 2 0 1 1
2026-08-23 3 6 2 1 2 3 2 1 1 1
2026-08-24 3 6 1 1 2 3 2 1 1 1
2026-08-25 3 6 2 1 2 3 2 1 1 1
2026-08-26 3 6 1 1 2 3 2 1 1 1
2026-08-27 3 6 1 1 2 3 2 1 1 1
2026-08-28 3 6 2 1 2 3 2 1 1 1
2026-08-29 3 6 2 1 2 3 2 1 1 1
2026-08-30 3 6 2 1 1 3 2 1 1 1
2026-08-31 3 5 2 1 0 2 2 1 1 1
2026-09-01 3 5 1 1 0 2 2 1 1 1
2026-09-02 3 5 1 1 0 2 2 1 1 1
2026-09-03 3 4 1 1 0 1 2 1 1 1
2026-09-04 3 4 2 1 0 1 2 1 1 0
2026-09-05 3 4 2 1 1 1 0 0 1 0
2026-09-06 2 6 2 1 2 2 0 0 1 0
2026-09-07 0 4 1 0 0 2 0 0 1 0
2026-09-08 1 3 2 0 0 2 2 1 1 1
2026-09-09 1 2 2 0 0 2 2 1 1 1
2026-09-10 0 1 2 0 0 1 2 1 1 0
2026-09-11 1 0 0 0 0 0 1 0 1 1
2026-09-12 1 3 2 0 0 1 2 1 1 1
2026-09-13 3 6 2 1 2 2 2 1 1 1
2026-09-14 3 5 2 1 2 2 1 0 1 1
2026-09-15 3 4 2 1 2 2 0 0 1 1
2026-09-16 3 3 2 1 2 1 0 0 1 1
2026-09-17 3 4 1 1 2 0 0 0 1 1
2026-09-18 3 5 0 1 2 1 1 0 1 1
2026-09-19 0 2 0 0 1 1 1 0 1 0
2026-09-20 0 2 1 0 0 0 2 1 1 0
2026-09-21 0 2 1 0 0 0 2 1 1 0
2026-09-22 2 5 1 1 1 1 2 1 1 1
2026-09-23 2 3 0 1 0 0 1 0 1 1
2026-09-24 2 2 1 1 0 0 1 0 1 1
2026-09-25 2 1 0 1 0 0 1 0 1 1
2026-09-26 3 5 1 1 1 1 2 1 1 1
2026-09-27 3 6 1 1 1 1 2 1 1 1
2026-09-28 3 6 2 1 1 2 2 1 1 1
2026-09-29 3 6 2 1 2 3 2 1 1 1
2026-09-30 3 6 2 1 2 3 2 1 1 1
2026-10-01 3 6 2 1 2 2 2 1 1 1
2026-10-02 3 6 1 1 2 2 2 1 1 1
2026-10-03 3 6 1 1 2 2 2 1 1 1
2026-10-04 3 6 2 1 2 2 2 1 1 1
2026-10-05 3 6 2 1 2 2 2 1 1 1
2026-10-06 3 6 2 1 2 3 1 1 1 1
2026-10-07 3 6 2 1 2 3 1 1 1 1
2026-10-08 2 6 2 1 2 2 1 1 1 0
2026-10-09 3 6 2 1 2 2 1 1 1 1
2026-10-10 3 6 2 1 2 3 1 1 1 1
2026-10-11 3 6 2 1 2 3 1 1 1 1
2026-10-12 3 6 2 1 2 3 1 1 1 1
2026-10-13 3 6 2 1 2 3 2 1 1 1
2026-10-14 3 6 2 1 2 3 2 1 1 1
2026-10-15 3 6 2 1 2 3 2 1 1 1
2026-10-16 3 6 1 1 2 3 2 1 1 1
2026-10-17 3 6 2 1 2 3 1 1 1 1
2026-10-18 3 6 2 1 2 3 1 1 1 1
2026-10-19 3 6 2 1 2 3 1 1 1 1
2026-10-20 3 6 2 1 2 3 1 1 1 1
2026-10-21 3 6 2 1 2 3 1 1 1 1
2026-10-22 3 6 2 1 2 3 1 1 1 1
2026-10-23 3 6 2 0 2 2 1 1 1 1
2026-10-24 3 6 2 0 2 2 2 1 1 1
2026-10-25 3 6 2 0 2 2 2 1 1 1
2026-10-26 3 6 2 0 2 2 2 1 1 1
2026-10-27 3 6 2 0 2 2 2 1 1 1
2026-10-28 3 6 2 1 2 3 2 1 1 1
2026-10-29 3 6 2 1 2 3 2 1 1 1
2026-10-30 3 6 2 1 2 3 2 1 1 1
2026-10-31 3 6 2 1 2 3 2 1 1 1
2026-11-01 3 6 2 1 2 3 2 1 1 1
2026-11-02 3 6 2 1 2 3 2 1 1 1
2026-11-03 3 6 2 1 2 3 2 1 1 1
2026-11-04 3 6 2 1 2 3 2 1 1 1
2026-11-05 3 6 2 1 2 3 2 1 1 1
2026-11-06 3 6 2 1 2 3 2 1 1 1
2026-11-07 3 6 2 1 2 3 2 1 1 1
2026-11-08 3 6 2 1 2 3 2 1 1 1
2026-11-09 3 6 2 1 2 3 2 1 1 1
2026-11-10 3 6 2 1 2 3 2 1 1 1
2026-11-11 2 6 2 1 2 2 2 1 1 0
2026-11-12 3 6 2 1 2 3 2 1 1 1
2026-11-13 3 6 2 0 2 3 2 1 1 1
2026-11-14 3 6 2 0 2 3 2 1 1 1
2026-11-15 3 6 2 0 2 3 2 1 1 1
2026-11-16 3 6 2 1 2 3 2 1 1 1
2026-11-17 3 6 2 1 2 3 2 1 1 1
2026-11-18 3 6 2 1 2 3 2 1 1 1
2026-11-19 3 6 2 1 2 3 2 1 1 1
2026-11-20 3 6 2 1 2 3 2 1 1 1
2026-11-21 3 6 2 1 2 3 1 0 1 1
2026-11-22 3 6 2 1 2 3 1 0 1 1
2026-11-23 3 6 2 1 2 3 1 0 1 1
2026-11-24 3 6 2 1 2 3 2 1 1 1
2026-11-25 3 6 2 1 2 3 2 1 1 1
2026-11-26 3 6 2 0 2 3 2 1 1 1
2026-11-27 3 6 2 0 2 3 2 1 1 1
2026-11-28 3 6 2 0 2 3 2 1 1 1
2026-11-29 3 6 2 1 2 3 2 1 1 1
2026-11-30 3 6 2 1 2 3 2 1 1 1
2026-12-01 3 6 2 1 2 3 2 1 1 1
2026-12-02 3 6 2 1 2 3 2 1 1 1
2026-12-03 3 6 2 1 2 3 2 1 1 1
2026-12-04 3 6 2 1 2 3 2 1 1 1
2026-12-05 3 6 2 1 2 3 2 1 1 1
2026-12-06 3 6 2 1 2 3 2 1 1 1
2026-12-07 3 6 2 1 2 3 2 1 1 1
2026-12-08 3 6 2 1 2 3 2 1 1 1
2026-12-09 3 6 2 1 2 3 2 1 1 1
2026-12-10 2 6 2 1 2 2 2 1 1 0
2026-12-11 3 6 2 1 2 3 2 1 1 1
2026-12-12 3 6 2 1 2 3 2 1 1 1
2026-12-13 3 6 2 1 2 3 2 1 1 1
2026-12-14 3 6 2 1 2 3 2 1 1 1
2026-12-15 3 6 2 1 2 3 2 1 1 1
2026-12-16 3 6 2 1 2 3 2 1 1 1
2026-12-17 3 6 1 1 2 3 2 1 1 1
2026-12-18 3 6 1 1 2 3 2 1 1 1
2026-12-19 3 6 1 1 2 3 2 1 1 1
2026-12-20 3 6 2 1 2 3 2 1 1 1
2026-12-21 3 6 2 1 2 3 2 1 1 1
2026-12-22 3 6 2 1 2 3 2 1 1 1
2026-12-23 3 6 2 1 2 3 2 1 1 1
2026-12-24 3 6 2 1 2 3 2 1 1 1
2026-12-25 3 6 2 1 2 3 2 1 1 1
2026-12-26 3 6 2 1 2 3 2 1 1 1
2026-12-27 3 6 2 1 2 3 2 1 1 1
2026-12-28 3 6 2 1 2 3 2 1 1 1
2026-12-29 3 6 2 1 2 3 2 1 1 1
2026-12-30 3 6 2 1 2 3 2 1 1 1
2026-12-31 3 6 2 1 2 3 2 1 1 1
2027-01-01 3 6 2 1 2 3 2 1 1 1
2027-01-02 3 6 2 1 2 3 2 1 1 1
2027-01-03 3 6 2 1 2 3 2 1 1 1
2027-01-04 3 6 2 1 2 3 2 1 1 1
2027-01-05 3 6 2 1 2 3 2 1 1 1
2027-01-06 3 6 2 1 2 3 2 1 1 1
2027-01-07 3 6 2 1 2 3 2 1 1 1
2027-01-08 3 6 2 1 2 3 2 1 1 1
2027-01-09 3 6 2 1 2 3 2 1 1 1
2027-01-10 3 6 2 1 2 3 2 1 1 1
2027-01-11 3 6 2 1 2 3 2 1 1 1
2027-01-12 3 6 2 1 2 3 2 1 1 1
2027-01-13 3 6 2 1 2 3 2 1 1 1
2027-01-14 3 6 2 1 2 3 2 1 1 1
2027-01-15 3 6 2 1 2 3 2 1 1 1
2027-01-16 3 6 2 1 2 3 2 1 1 1
2027-01-17 3 6 2 1 2 3 2 1 1 1
2027-01-18 3 6 2 1 2 3 2 1 1 1
2027-01-19 3 6 2 1 2 3 2 1 1 1
2027-01-20 3 6 2 1 2 3 2 1 1 1
2027-01-21 3 6 2 1 2 3 2 1 1 1
2027-01-22 3 6 2 1 2 3 2 1 1 1
2027-01-23 3 6 2 1 2 3 2 1 1 1
2027-01-24 3 6 2 1 2 3 2 1 1 1
2027-01-25 3 6 2 1 2 3 2 1 1 1
2027-01-26 3 6 2 1 2 3 2 1 1 1
2027-01-27 3 6 2 1 2 3 2 1 1 1
2027-01-28 3 6 2 1 2 3 2 1 1 1
2027-01-29 3 6 2 1 2 3 2 1 1 1
2027-01-30 3 6 2 1 2 3 2 1 1 1
2027-01-31 3 6 2 1 2 3 2 1 1 1
2027-02-01 3 6 2 1 2 3 2 1 1 1
2027-02-02 3 6 2 1 2 3 2 1 1 1
2027-02-03 3 6 2 1 2 3 2 1 1 1
2027-02-04 3 6 2 1 2 3 2 1 1 1
2027-02-05 3 6 2 1 2 3 2 1 1 1
2027-02-06 3 6 2 1 2 3 2 1 1 1
2027-02-07 3 6 2 1 2 3 2 1 1 1
2027-02-08 3 6 2 1 2 3 2 1 1 1
2027-02-09 3 6 2 1 2 3 2 1 1 1
2027-02-10 3 6 2 1 2 3 2 1 1 1
2027-02-11 3 6 2 1 2 3 2 1 1 1
2027-02-12 3 6 2 1 2 3 2 1 1 1
2027-02-13 3 6 2 1 2 3 2 1 1 1
2027-02-14 3 6 2 1 2 3 2 1 1 1
2027-02-15 3 6 2 1 2 3 2 1 1 1
2027-02-16 3 6 2 1 2 3 2 1 1 1
2027-02-17 3 6 2 1 2 3 2 1 1 1
2027-02-18 3 6 2 1 2 3 2 1 1 1
2027-02-19 3 6 2 1 2 3 2 1 1 1
2027-02-20 3 6 2 1 2 3 2 1 1 1
2027-02-21 3 6 2 1 2 3 2 1 1 1
2027-02-22 3 6 2 1 2 3 2 1 1 1
2027-02-23 3 6 2 1 2 3 2 1 1 1
2027-02-24 3 6 2 1 2 3 2 1 1 1
2027-02-25 3 6 2 1 2 3 2 1 1 1
2027-02-26 3 6 2 1 2 3 2 1 1 1
2027-02-27 3 6 2 1 2 3 2 1 1 1
2027-02-28 3 6 2 1 2 3 2 1 1 1
2027-03-01 3 6 2 1 2 3 2 1 1 1
2027-03-02 3 6 2 1 2 3 2 1 1 1
2027-03-03 3 6 2 1 2 3 2 1 1 1
2027-03-04 3 6 2 1 2 3 2 1 1 1
2027-03-05 3 6 2 1 2 3 2 1 1 1
2027-03-06 3 6 2 1 2 3 2 1 1 1
2027-03-07 3 6 2 1 2 3 2 1 1 1
2027-03-08 3 6 2 1 2 3 2 1 1 1
2027-03-09 3 6 2 1 2 3 2 1 1 1
2027-03-10 3 6 2 1 2 3 2 1 1 1
2027-03-11 3 6 2 1 2 3 2 1 1 1
2027-03-12 3 6 2 1 2 3 2 1 1 1
2027-03-13 3 6 2 1 2 3 2 1 1 1
2027-03-14 3 6 2 1 2 3 2 1 1 1
2027-03-15 3 6 2 1 2 3 2 1 1 1
2027-03-16 3 6 2 1 2 3 2 1 1 1
2027-03-17 3 6 2 1 2 3 2 1 1 1
2027-03-18 3 6 2 1 2 3 2 1 1 1
2027-03-19 3 6 2 1 2 3 2 1 1 1
2027-03-20 3 6 2 1 2 3 2 1 1 1
2027-03-21 3 6 2 1 2 3 2 1 1 1
2027-03-22 3 6 2 1 2 3 2 1 1 1
`);

const PP_IDX = Object.fromEntries(roomOrderForProperty("pineta", "availability").map((roomId, index) => [roomId, index]));
const LV_IDX = Object.fromEntries(roomOrderForProperty("laville", "availability").map((roomId, index) => [roomId, index]));

const LAVILLE_CORPORATE_RATES = [
  { company: "Universita Bocconi", lowDus: 140, lowDbl: 165, highDus: 180, highDbl: 205 },
  { company: "Fascino", lowDus: 150, lowDbl: 175, highDus: 180, highDbl: 205 },
  { company: "ANCE", lowDus: 140, lowDbl: 165, highDus: 160, highDbl: 185 },
  { company: "SANEDIL", lowDus: 140, lowDbl: 165, highDus: 160, highDbl: 185 },
  { company: "Net Insurance/Jellyfish", lowDus: 135, lowDbl: 160, highDus: 160, highDbl: 185 },
  { company: "ANEC", lowDus: 135, lowDbl: 160, highDus: 160, highDbl: 185 },
  { company: "AGIS", lowDus: 135, lowDbl: 160, highDus: 160, highDbl: 185 },
  { company: "Legacoop", lowDus: 135, lowDbl: 160, highDus: 160, highDbl: 185 },
  { company: "Assomusica", lowDus: 140, lowDbl: 165, highDus: 180, highDbl: 205 },
  { company: "Sildan", lowDus: 150, lowDbl: 175, highDus: 180, highDbl: 205 },
];

const DEFAULT_DATA = [
  {
    id: "laville",
    label: "La Ville",
    baseRateLabel: "2 PAX BB ENTRY LEVEL",
    diff: 60,
    rooms: [
      { id: "lv_classic", name: "Classic DBL", delta: 0, base: true },
      { id: "lv_charme", name: "Charme Double", delta: 20, base: false },
      { id: "lv_superior", name: "Superior Double/Twin", delta: 10, base: false },
      { id: "lv_superior_tripla", name: "Superior Tripla", delta: 30, base: false },
      { id: "lv_deluxe_twin", name: "Deluxe Double/Twin", delta: 25, base: false },
      { id: "lv_deluxe", name: "Deluxe Double", delta: 25, base: false },
      { id: "lv_superior_letto", name: "Superior Double + letto", delta: 30, base: false },
      { id: "lv_family_superior", name: "Family Superior", delta: 144, base: false },
      { id: "lv_family_junior", name: "Family Junior", delta: 144, base: false },
      { id: "lv_deluxe_letto", name: "Deluxe Double + letto", delta: 45, base: false },
    ],
    sitePromos: [
      { l: "Last Minute 24h", p: 10, on: true, condition: "last_minute", appliesTo: "notref", note: "24 ore prima - solo NOT REF" },
      { l: "Early Booking", p: 10, on: true, condition: "early_bird", appliesTo: "notref", note: "30+ giorni prima - solo NOT REF" },
      { l: "Mlos 3 solo NRF", p: 15, on: true, condition: "three_nights", appliesTo: "notref", minStay: 3, note: "MLOS 3 - solo NOT REF" },
    ],
    channels: [
      {
        id: "bk_lv",
        name: "Booking.com",
        comm: 18,
        promos: [
          { l: "Genius 10%", p: 10, on: true, type: "genius", locked: true },
          { l: "Basic Deal 3%", p: 3, on: false, type: "base", dates: [{ from: "2026-10-01", to: "2026-10-31" }] },
          { l: "Basic Deal 10%", p: 10, on: false, type: "base", dates: [{ from: "2026-11-01", to: "2027-02-28" }] },
          { l: "Last Minute", p: 10, on: false, type: "lastminute" },
          { l: "Prenota Prima", p: 10, on: false, type: "prenota" },
          { l: "Getaway 25%", p: 25, on: false, type: "vacanze", locked: true, dates: [{ from: "2026-05-14", to: "2026-07-31" }, { from: "2026-09-01", to: "2026-09-30" }] },
          { l: "Getaway ago 30%", p: 30, on: false, type: "vacanze", locked: true, dates: [{ from: "2026-08-01", to: "2026-08-31" }] },
          { l: "48h Deal", p: 30, on: false, type: "deep" },
          { l: "Mobile rate", p: 10, on: false, type: "mobile" },
          { l: "EEA country", p: 5, on: true, type: "paese", defaultPaese: true },
          { l: "UK country", p: 5, on: false, type: "paese" },
          { l: "US country", p: 10, on: false, type: "paese" },
        ],
      },
      {
        id: "wb_lv",
        name: "WebBeds",
        comm: 20,
        promos: [
          { l: "Alta stagione 20%", p: 20, on: false, type: "none", dates: [{ from: "2026-04-01", to: "2026-06-30" }, { from: "2026-09-08", to: "2026-10-31" }] },
          { l: "Bassa stagione 25%", p: 25, on: false, type: "none", dates: [{ from: "2026-07-01", to: "2026-09-07" }, { from: "2026-11-01", to: "2027-03-31" }] },
          { l: "Package 10%", p: 10, on: true, type: "none" },
        ],
      },
      { id: "hb_lv", name: "HotelBeds", comm: 20, promos: [] },
    ],
  },
  {
    id: "pineta",
    label: "Pineta Palace",
    baseRateLabel: "Comfort BB entry level",
    diff: 60,
    rooms: [
      { id: "pp1", name: "Comfort BB", delta: 0, base: true, availability: 32 },
      { id: "pp2", name: "Comfort Tripla BB", delta: 30, base: false, availability: 30 },
      { id: "pp3", name: "Comfort Premium BB", delta: 25, base: false, availability: 22 },
      { id: "pp4", name: "Matrim.+Letto CP BB", delta: 55, base: false, availability: 18 },
      { id: "pp5", name: "Superior BB", delta: 45, base: false, availability: 10 },
      { id: "pp6", name: "Junior Suite BB", delta: 70, base: false, availability: 4 },
      { id: "pp7", name: "Suite BB", delta: 85, base: false, availability: 3 },
      { id: "pp8", name: "Quadrupla Comfort BB", delta: 60, base: false, availability: 4 },
      { id: "pp9", name: "Suite Deluxe BB", delta: 100, base: false, availability: 2 },
      { id: "pp10", name: "Quadrupla Comfort Premium BB", delta: 80, base: false, availability: 1 },
    ],
    sitePromos: [{ l: "Convenzionati/Top Club", p: 15, on: false }],
    channels: [
      {
        id: "bk_pp",
        name: "Booking.com",
        comm: 18,
        promos: [
          { l: "Genius 10%", p: 10, on: true, type: "genius" },
          { l: "Basic Deal ott 3%", p: 3, on: false, type: "base", dates: [{ from: "2026-10-01", to: "2026-10-31" }] },
          { l: "Basic Deal nov-feb 10%", p: 10, on: false, type: "base", dates: [{ from: "2026-11-01", to: "2027-02-28" }] },
          { l: "Last Minute", p: 10, on: false, type: "lastminute" },
          { l: "Prenota Prima", p: 10, on: false, type: "prenota" },
          { l: "Getaway 20%", p: 20, on: false, type: "vacanze", dates: [{ from: "2026-04-01", to: "2026-06-30" }] },
          { l: "Getaway 15%", p: 15, on: false, type: "vacanze", dates: [{ from: "2026-03-26", to: "2026-09-30" }] },
          { l: "48h Deal", p: 30, on: false, type: "deep" },
          { l: "Mobile rate", p: 10, on: false, type: "mobile" },
          { l: "EEA country", p: 5, on: true, type: "paese", defaultPaese: true },
          { l: "US country", p: 10, on: false, type: "paese" },
        ],
      },
      {
        id: "exp_pp",
        name: "Expedia",
        comm: 18,
        promos: [
          { l: "May Sale 15%", p: 15, on: false, type: "none", dates: [{ from: "2026-04-14", to: "2026-10-31" }] },
          { l: "Book early 20%", p: 20, on: false, type: "none", dates: [{ from: "2026-06-21", to: "2026-11-17" }] },
          { l: "Mobile Deal 10%", p: 10, on: false, type: "none" },
          { l: "Mid-Year 30%", p: 30, on: false, type: "none", dates: [{ from: "2026-06-02", to: "2026-12-15" }] },
        ],
      },
      {
        id: "wb_pp",
        name: "WebBeds",
        comm: 20,
        promos: [
          { l: "Sconto 20%", p: 20, on: false, type: "none", dates: [{ from: "2026-04-02", to: "2026-06-30" }, { from: "2026-09-12", to: "2026-10-31" }] },
          { l: "Sconto 25%", p: 25, on: false, type: "none", dates: [{ from: "2026-07-01", to: "2026-09-11" }, { from: "2026-11-01", to: "2026-12-25" }] },
          { l: "Opaque Package 10%", p: 10, on: false, type: "none" },
        ],
      },
      {
        id: "agoda_pp",
        name: "Agoda V5",
        comm: 18,
        promos: [
          { l: "Member Deal", p: 10, on: false, type: "genius" },
          { l: "Early Bird 30", p: 15, on: false, type: "prenota" },
          { l: "Mobile Rate", p: 10, on: false, type: "mobile" },
          { l: "VIP Deal", p: 20, on: false, type: "base" },
        ],
      },
      {
        id: "arcadia_pp",
        name: "Arcadia Tour",
        comm: 20,
        promos: [
          { l: "Sconto standard", p: 20, on: false, type: "none" },
          { l: "Package rate", p: 10, on: false, type: "none" },
        ],
      },
      {
        id: "cisalpina_pp",
        name: "Cisalpina",
        comm: 20,
        promos: [
          { l: "Sconto standard", p: 20, on: false, type: "none" },
          { l: "Last minute", p: 15, on: false, type: "lastminute" },
        ],
      },
      {
        id: "ctrip_pp",
        name: "CTrip",
        comm: 18,
        promos: [
          { l: "Member Deal", p: 10, on: false, type: "genius" },
          { l: "App Deal", p: 10, on: false, type: "mobile" },
          { l: "Campaign Sale", p: 15, on: false, type: "base" },
          { l: "Flash Sale", p: 20, on: false, type: "vacanze" },
        ],
      },
      {
        id: "destitalia_pp",
        name: "Destination Italia",
        comm: 20,
        promos: [
          { l: "Sconto standard", p: 20, on: false, type: "none" },
          { l: "Package", p: 10, on: false, type: "none" },
        ],
      },
      {
        id: "easyres_pp",
        name: "EasyReservations",
        comm: 18,
        promos: [
          { l: "Sconto standard", p: 15, on: false, type: "none" },
          { l: "Early booking", p: 10, on: false, type: "prenota" },
        ],
      },
      {
        id: "edreams_pp",
        name: "Edreams Odigeo",
        comm: 18,
        promos: [
          { l: "Member Only", p: 10, on: false, type: "genius" },
          { l: "Mobile Deal", p: 10, on: false, type: "mobile" },
          { l: "Exclusive Sale", p: 20, on: false, type: "vacanze" },
        ],
      },
      {
        id: "hoteleasy_pp",
        name: "Hotel Easy Reservations",
        comm: 18,
        promos: [
          { l: "Sconto standard", p: 15, on: false, type: "none" },
          { l: "Last minute", p: 15, on: false, type: "lastminute" },
        ],
      },
      {
        id: "hb_pp",
        name: "HotelBeds",
        comm: 20,
        promos: [
          { l: "Early Booking", p: 10, on: false, type: "prenota" },
          { l: "Tactical Sale", p: 15, on: false, type: "base" },
          { l: "Package rate", p: 10, on: false, type: "none" },
          { l: "Flash Sale", p: 20, on: false, type: "vacanze" },
        ],
      },
      {
        id: "hotusa_pp",
        name: "Hotusa",
        comm: 20,
        promos: [
          { l: "Sconto standard", p: 20, on: false, type: "none" },
          { l: "Package", p: 10, on: false, type: "none" },
        ],
      },
      {
        id: "hrs_pp",
        name: "HRS 3V10",
        comm: 18,
        promos: [
          { l: "Corporate Rate", p: 10, on: false, type: "none" },
          { l: "Mobile Rate", p: 10, on: false, type: "mobile" },
          { l: "Early Bird", p: 15, on: false, type: "prenota" },
        ],
      },
      {
        id: "hyperguest_pp",
        name: "HyperGuest",
        comm: 18,
        promos: [
          { l: "Sconto standard", p: 15, on: false, type: "none" },
          { l: "Last minute", p: 15, on: false, type: "lastminute" },
        ],
      },
      {
        id: "italcamel_pp",
        name: "Italcamel",
        comm: 20,
        promos: [
          { l: "Sconto standard", p: 20, on: false, type: "none" },
          { l: "Package rate", p: 10, on: false, type: "none" },
          { l: "Group rate", p: 15, on: false, type: "none" },
        ],
      },
      {
        id: "lastmin_pp",
        name: "Lastminute GHE",
        comm: 18,
        promos: [
          { l: "Last Minute", p: 15, on: false, type: "lastminute" },
          { l: "Top Secret", p: 25, on: false, type: "vacanze" },
          { l: "Mobile Deal", p: 10, on: false, type: "mobile" },
        ],
      },
      {
        id: "serhs_pp",
        name: "Serhs",
        comm: 20,
        promos: [
          { l: "Sconto standard", p: 20, on: false, type: "none" },
          { l: "Package", p: 10, on: false, type: "none" },
        ],
      },
      {
        id: "traveltino_pp",
        name: "Traveltino",
        comm: 18,
        promos: [
          { l: "Sconto standard", p: 15, on: false, type: "none" },
          { l: "Flash Sale", p: 20, on: false, type: "vacanze" },
        ],
      },
      {
        id: "xenia_pp",
        name: "Xenia GDS",
        comm: 20,
        promos: [
          { l: "Corporate Rate", p: 10, on: false, type: "none" },
          { l: "GDS standard", p: 15, on: false, type: "none" },
        ],
      },
    ],
  },
];

const state = {
  data: structuredClone(DEFAULT_DATA).map((prop) => prop.id === "laville" ? { ...prop, sitePromos: normalizeLaVilleSitePromos(prop.sitePromos) } : prop),
  curIdx: 0,
  selectedDate: todayLocal(),
  theme: "light",
  editing: false,
  view: "calc",
  calcTab: "channels",
  importTab: "rates",
  calendarChannel: "site",
  calendarYear: 2026,
  calendarRange: "quarter",
  calendarStartMonth: 4,
  calendarOnlyProblems: false,
  calendarHidePast: false,
  datePickerOpen: false,
  datePickerYear: 2026,
  datePickerMonth: 4,
  strategy: {
    channelId: "site",
    baseRate: "",
    name: "Nuova promo",
    discount: "",
    appliesTo: "notref",
    stack: "replace",
    selectedPromoIds: [],
    percentOverrides: {},
    periodFrom: "",
    periodTo: "",
    note: "",
  },
  explore: {
    compareRoomIds: [],
    lastModifiedBy: "Giorgia",
    priceChanges: {},
  },
  billing: {
    date: todayLocal(),
    channelId: "bk_lv",
    rateType: "flex",
    invoiceAmount: "",
  },
  revenueDraft: {
    actionDate: todayLocal(),
    stayDate: todayLocal(),
    channelId: "site",
    roomLabel: "",
    beforeRate: "",
    afterRate: "",
    reason: "",
    pickup24: "",
    pickup48: "",
    note: "",
  },
  revenueEntries: [],
  revenueAgendaDate: todayLocal(),
  revenueAgendaShowAll: false,
  revenueRegisterOpen: false,
  revenueCalendarMonth: todayLocal().slice(0, 7),
  revenueFilterLevel: "all",
  revenueFilterSource: "all",
  revenueFilterChannel: "all",
  emailImports: [],
  operatorContacts: structuredClone(OPERATOR_CONTACTS),
  importer: {
    propertyId: "laville",
    ratesText: "",
    availabilityText: "",
    emailText: "",
    emailParsed: null,
    emailOperatorKey: "",
    lastUpload: PMS_LAST_UPLOAD,
    message: "",
    validationWarnings: [],
    locked: false,
    ratesLocked: false,
    availabilityLocked: false,
    editPending: false,
    editBackup: null,
  },
  deepDealReminders: [],
  reminders: [
    {
      id: "rem-laville-otherbeds",
      propertyId: "laville",
      type: "HotelBeds",
      date: "2026-05-19",
      title: "Aggiornare promo HotelBeds",
      note: "La Ville - contratto in partenza",
    },
  ],
  reminderSavedAt: "",
  modal: null,
  pendingConfirm: null,
  hasCalendar: false,
  occupancy: "double",
  selectedRoomId: null,
  sito: 100,
};

const app = document.querySelector("#app");

function loadStoredImportData() {
  try {
    if (typeof localStorage === "undefined") return;
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!stored) return;
    if (stored.importer) state.importer = { ...state.importer, ...stored.importer };
    if (stored.theme === "light" || stored.theme === "dark") state.theme = stored.theme;
    if (stored.importTab === "rates" || stored.importTab === "availability" || stored.importTab === "email") state.importTab = stored.importTab;
    if (stored.calcTab === "channels" || stored.calcTab === "contacts") state.calcTab = stored.calcTab;
    if (stored.operatorContacts && typeof stored.operatorContacts === "object") state.operatorContacts = stored.operatorContacts;
    if (stored.sitePromos) {
      state.data = state.data.map((prop) => ({
        ...prop,
        sitePromos: prop.id === "laville"
          ? normalizeLaVilleSitePromos(Array.isArray(stored.sitePromos[prop.id]) ? stored.sitePromos[prop.id] : prop.sitePromos)
          : Array.isArray(stored.sitePromos[prop.id]) ? stored.sitePromos[prop.id] : prop.sitePromos,
      }));
    }
    if (Array.isArray(stored.reminders)) state.reminders = stored.reminders;
    if (Array.isArray(stored.deepDealReminders)) state.deepDealReminders = stored.deepDealReminders;
    if (Array.isArray(stored.revenueEntries)) state.revenueEntries = stored.revenueEntries;
    if (Array.isArray(stored.emailImports)) state.emailImports = stored.emailImports;
    if (typeof stored.revenueAgendaDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(stored.revenueAgendaDate)) {
      state.revenueAgendaDate = stored.revenueAgendaDate;
    }
    if (typeof stored.revenueAgendaShowAll === "boolean") state.revenueAgendaShowAll = stored.revenueAgendaShowAll;
    if (typeof stored.revenueRegisterOpen === "boolean") state.revenueRegisterOpen = stored.revenueRegisterOpen;
    if (typeof stored.revenueCalendarMonth === "string" && /^\d{4}-\d{2}$/.test(stored.revenueCalendarMonth)) {
      state.revenueCalendarMonth = stored.revenueCalendarMonth;
    }
    if (typeof stored.revenueFilterLevel === "string") state.revenueFilterLevel = stored.revenueFilterLevel;
    if (typeof stored.revenueFilterSource === "string") state.revenueFilterSource = stored.revenueFilterSource;
    if (typeof stored.revenueFilterChannel === "string") state.revenueFilterChannel = stored.revenueFilterChannel;
    if (stored.explore) state.explore = { ...state.explore, ...stored.explore };
    if (stored.rates && typeof stored.rates === "object") {
      Object.entries(stored.rates).forEach(([propertyId, rates]) => {
        if (!rates || typeof rates !== "object") return;
        PMS_RATES[propertyId] = { ...(PMS_RATES[propertyId] || {}), ...rates };
      });
    }
    if (stored.availability?.laville) {
      clearAvailabilityStore("laville");
      writeAvailabilityStore("laville", compactAvailabilityRowsForStorage("laville", stored.availability.laville));
    }
    if (stored.availability?.pineta) {
      clearAvailabilityStore("pineta");
      writeAvailabilityStore("pineta", compactAvailabilityRowsForStorage("pineta", stored.availability.pineta));
    }
    const importerPropertyId = stored.importer?.propertyId || "laville";
    const hasStoredAvailabilityRows = Boolean(
      stored.availability?.[importerPropertyId]
      && Object.keys(stored.availability[importerPropertyId]).length
    );
    // Fallback legacy: ricostruisco da testo solo se non ho uno store disponibilità già salvato.
    // Evita il bug "n/d" al riavvio quando il testo incollato è troncato per limiti localStorage.
    if (stored.importer?.availabilityText && !hasStoredAvailabilityRows) {
      const propertyId = stored.importer?.propertyId || "laville";
      clearAvailabilityStore(propertyId);
      writeAvailabilityStore(propertyId, parseImportedAvailability(stored.importer.availabilityText, propertyId));
    }
  } catch (error) {
    state.importer.message = "Non sono riuscita a leggere i dati salvati nel browser.";
  }
}

function saveStoredImportData() {
  const compactAvailability = {
    laville: compactAvailabilityRowsForStorage("laville", LV_AVAIL),
    pineta: compactAvailabilityRowsForStorage("pineta", PP_AVAIL),
  };
  try {
    if (typeof localStorage === "undefined") return;
    const importerForStorage = {
      ...state.importer,
      ratesText: String(state.importer?.ratesText || "").slice(0, IMPORTER_TEXT_STORE_LIMIT),
      availabilityText: String(state.importer?.availabilityText || "").slice(0, IMPORTER_TEXT_STORE_LIMIT),
      emailText: String(state.importer?.emailText || "").slice(0, IMPORTER_TEXT_STORE_LIMIT),
      validationWarnings: Array.isArray(state.importer?.validationWarnings) ? state.importer.validationWarnings.slice(0, 20) : [],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      importer: importerForStorage,
      theme: state.theme,
      importTab: state.importTab,
      calcTab: state.calcTab,
      operatorContacts: state.operatorContacts,
      explore: state.explore,
      reminders: state.reminders,
      deepDealReminders: state.deepDealReminders,
      revenueEntries: state.revenueEntries,
      emailImports: Array.isArray(state.emailImports) ? state.emailImports.slice(0, 60) : [],
      revenueAgendaDate: state.revenueAgendaDate,
      revenueAgendaShowAll: state.revenueAgendaShowAll,
      revenueRegisterOpen: state.revenueRegisterOpen,
      revenueCalendarMonth: state.revenueCalendarMonth,
      revenueFilterLevel: state.revenueFilterLevel,
      revenueFilterSource: state.revenueFilterSource,
      revenueFilterChannel: state.revenueFilterChannel,
      sitePromos: Object.fromEntries(state.data.map((prop) => [prop.id, prop.sitePromos || []])),
      rates: PMS_RATES,
      availability: compactAvailability,
    }));
  } catch (error) {
    try {
      // Fallback anti-quota: mantengo solo ciò che serve a ricaricare disponibilità/tariffe.
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        importer: {
          propertyId: state.importer?.propertyId || "laville",
          lastUpload: state.importer?.lastUpload || "",
          message: state.importer?.message || "",
          ratesLocked: Boolean(state.importer?.ratesLocked),
          availabilityLocked: Boolean(state.importer?.availabilityLocked),
        },
        theme: state.theme,
        importTab: state.importTab,
        rates: PMS_RATES,
        availability: compactAvailability,
      }));
      const baseMessage = state.importer?.message || "Dati aggiornati.";
      state.importer.message = baseMessage.includes("Salvati in modalità compatta")
        ? baseMessage
        : `${baseMessage} Salvati in modalità compatta.`;
    } catch (fallbackError) {
      state.importer.message = "Dati aggiornati, ma non sono riuscita a salvarli nel browser.";
    }
  }
}

function syncReminderEditorFromDom() {
  if (!app) return;
  const fields = [...app.querySelectorAll('[data-action="reminder-field"]')];
  if (!fields.length) return;
  fields.forEach((fieldEl) => {
    const { id, field } = fieldEl.dataset;
    if (!id || !field) return;
    state.reminders = state.reminders.map((item) => (item.id === id ? { ...item, [field]: fieldEl.value } : item));
  });
  saveStoredImportData();
}

function clone(value) {
  return structuredClone(value);
}

function operatorKeyFromChannelName(name = "") {
  const n = String(name).toLowerCase();
  if (n.includes("arcadia tour")) return "arcadiatour";
  if (n.includes("booking")) return "booking";
  if (n.includes("expedia")) return "expedia";
  if (n.includes("welcomebeds") || n.includes("welcome beds")) return "serhs";
  if (n.includes("webbeds")) return "webbeds";
  if (n.includes("hotelbeds") || n.includes("hbx")) return "hotelbeds";
  if (n.includes("agoda")) return "agoda";
  if (n.includes("easyconsulting") || n.includes("lvghotelconsulting")) return "easyconsulting";
  if (n.includes("hyperguest")) return "hyperguest";
  if (n.includes("edreams")) return "edreams";
  if (n.includes("italcamel")) return "italcamel";
  if (n.includes("lastminute")) return "lastminute";
  if (n.includes("keytel")) return "keytel";
  if (n.includes("hotusa")) return "keytel";
  if (n.includes("hrs")) return "hrs";
  if (n.includes("grupoveci") || n.includes("grupo veci")) return "grupoveci";
  if (n.includes("serhs")) return "serhs";
  if (n.includes("sunhotels")) return "sunhotels";
  if (n.includes("traveltino")) return "traveltino";
  if (n.includes("xenia")) return "xenia";
  if (n.includes("g2") && n.includes("travel")) return "g2travel";
  if (n.includes("ctrip") || n.includes("trip.com")) return "tripcom";
  if (n.includes("arcadia")) return "arcadia";
  if (n.includes("destination italia")) return "destinationitalia";
  if (n.includes("cisalpina")) return "cisalpina";
  return "generic";
}

function operatorKeyFromDomain(domain = "") {
  const d = String(domain).toLowerCase();
  if (d.endsWith("arcadiaviaggi.it")) return "arcadiatour";
  if (d.endsWith("booking.com")) return "booking";
  if (d.endsWith("expedia.com") || d.endsWith("expediagroup.com")) return "expedia";
  if (d.endsWith("welcomebeds.com")) return "serhs";
  if (d.endsWith("webbeds.com")) return "webbeds";
  if (d.endsWith("hbxgroup.com") || d.endsWith("hotelbeds.com")) return "hotelbeds";
  if (d.endsWith("agoda.com")) return "agoda";
  if (d.endsWith("lvghotelconsulting.com") || d.endsWith("easyconsulting.it") || d.endsWith("easyconsulting.com")) return "easyconsulting";
  if (d.endsWith("hyperguest.com")) return "hyperguest";
  if (d.endsWith("edreamsodigeo.com")) return "edreams";
  if (d.endsWith("italcamel.com")) return "italcamel";
  if (d.endsWith("lastminute.com")) return "lastminute";
  if (d.endsWith("cisalpinatours.it")) return "cisalpina";
  if (d.endsWith("grupoveci.es")) return "traveltino";
  if (d.endsWith("sunhotels.com")) return "sunhotels";
  if (d.endsWith("traveltino.com")) return "traveltino";
  if (d.endsWith("keytel.com")) return "keytel";
  if (d.endsWith("g2-travel.com")) return "g2travel";
  if (d.endsWith("trip.com")) return "tripcom";
  if (d.endsWith("xeniahs.com")) return "xenia";
  if (d.endsWith("destinationitalia.com")) return "destinationitalia";
  return "generic";
}

function extractEmailDomains(text) {
  const body = String(text || "");
  const domains = new Set();
  const fromDomain = (body.match(/proveniente\s+da\s*:\s*([^\s]+)\s*$/im) || [])[1];
  if (fromDomain) domains.add(fromDomain.trim());
  const emails = body.match(/[a-z0-9._%+-]+@([a-z0-9.-]+\.[a-z]{2,})/gi) || [];
  emails.forEach((email) => {
    const m = String(email).match(/@([a-z0-9.-]+\.[a-z]{2,})/i);
    if (m?.[1]) domains.add(m[1].toLowerCase());
  });
  return [...domains];
}

function ensureOperatorContacts() {
  const defaults = structuredClone(OPERATOR_CONTACTS);
  const stored = state.operatorContacts && typeof state.operatorContacts === "object" ? state.operatorContacts : {};
  const keys = new Set([...Object.keys(defaults), ...Object.keys(stored)]);
  const contacts = {};

  const pickString = (curValue, defValue) => {
    const cur = typeof curValue === "string" ? curValue.trim() : "";
    if (cur) return curValue;
    const def = typeof defValue === "string" ? defValue : "";
    return def;
  };

  keys.forEach((key) => {
    const def = defaults[key] || { name: key, email: "", phone: "", role: "", notes: "", emails: [] };
    const cur = stored[key] || {};
    contacts[key] = {
      ...def,
      ...cur,
      name: pickString(cur.name, def.name || key) || key,
      email: pickString(cur.email, def.email || ""),
      phone: pickString(cur.phone, def.phone || ""),
      role: pickString(cur.role, def.role || ""),
      notes: pickString(cur.notes, def.notes || ""),
      contactName: pickString(cur.contactName, def.contactName || ""),
      emails: Array.isArray(cur.emails) ? cur.emails : (def.emails || []),
    };
  });

  // Migrazione minima: se avevamo salvato Booking.com con l’email di Arcadia, lo correggo al nuovo default.
  if (contacts.booking?.email && String(contacts.booking.email).includes("arcadiaviaggi.it")) {
    contacts.booking.email = defaults.booking?.email || contacts.booking.email;
    contacts.booking.contactName = defaults.booking?.contactName || contacts.booking.contactName;
    contacts.booking.role = defaults.booking?.role || contacts.booking.role;
  }

  const allChannels = state.data.flatMap((p) => p.channels || []);
  allChannels.forEach((ch) => {
    const key = operatorKeyFromChannelName(ch.name);
    if (!contacts[key]) {
      contacts[key] = { name: ch.name || key, email: "", phone: "", role: "", notes: "", emails: [] };
    }
  });
  if (!contacts.generic) contacts.generic = { name: "Altro", email: "", phone: "", role: "", notes: "", emails: [] };
  state.operatorContacts = contacts;
}

function propertySourceSystems(propertyId) {
  return PROPERTY_SOURCE_SYSTEMS[propertyId] || {
    pms: "PMS",
    channelManager: "Channel manager",
    importLabel: "PMS",
    rateSource: "foglio tariffe",
    bookingSource: "report prenotazioni",
  };
}

function normalizeLaVilleSitePromos(promos) {
  const source = Array.isArray(promos) ? promos : [];
  const normalized = source
    .filter((promo) => !/weekend/i.test(String(promo.l || "")) && promo.condition !== "weekend")
    .map((promo) => {
      if (promo.condition === "last_minute" || /last/i.test(String(promo.l || ""))) {
        return { ...promo, l: "Last Minute 24h", p: 10, on: true, condition: "last_minute", appliesTo: "notref", note: "24 ore prima - solo NOT REF" };
      }
      if (promo.condition === "early_bird" || /early/i.test(String(promo.l || ""))) {
        return { ...promo, l: "Early Booking", p: 10, on: true, condition: "early_bird", appliesTo: "notref", note: "30+ giorni prima - solo NOT REF" };
      }
      if (promo.condition === "three_nights" || /tre notti|mlos/i.test(String(promo.l || ""))) {
        return { ...promo, l: "Mlos 3 solo NRF", p: 15, on: true, condition: "three_nights", appliesTo: "notref", minStay: 3, note: "MLOS 3 - solo NOT REF" };
      }
      return promo;
    });
  const hasLast = normalized.some((promo) => promo.condition === "last_minute");
  const hasEarly = normalized.some((promo) => promo.condition === "early_bird");
  const hasMlos = normalized.some((promo) => promo.condition === "three_nights");
  return [
    ...normalized,
    ...(hasLast ? [] : [{ l: "Last Minute 24h", p: 10, on: true, condition: "last_minute", appliesTo: "notref", note: "24 ore prima - solo NOT REF" }]),
    ...(hasEarly ? [] : [{ l: "Early Booking", p: 10, on: true, condition: "early_bird", appliesTo: "notref", note: "30+ giorni prima - solo NOT REF" }]),
    ...(hasMlos ? [] : [{ l: "Mlos 3 solo NRF", p: 15, on: true, condition: "three_nights", appliesTo: "notref", minStay: 3, note: "MLOS 3 - solo NOT REF" }]),
  ];
}

function parseAvailability(raw) {
  return raw
    .trim()
    .split(/\n+/)
    .reduce((acc, line) => {
      const parts = line.trim().split(/\s+/);
      acc[parts[0]] = parts.slice(1).map(Number);
      return acc;
    }, {});
}

function parsePmsRates(raw) {
  const roomOrder = roomOrderForProperty("laville", "rate");
  return raw
    .trim()
    .split(/\n+/)
    .reduce((acc, line) => {
      const parts = line.trim().split(/\s+/);
      const date = parts[0];
      const values = parts.slice(1).map(Number);
      if (values.length === 1 || values.length === 2) {
        const entryDus = values[0];
        const entryDbl = values.length === 2 ? values[1] : entryDus + 20;
        acc[date] = roomOrder.reduce((rooms, roomId) => {
          const supplement = LAVILLE_ENTRY_CASCADE[roomId] ?? 0;
          const hasDus = PMS_DUS_ROOM_IDS.laville.has(roomId);
          rooms[roomId] = hasDus ? entryDus + supplement : entryDbl + supplement;
          return rooms;
        }, {});
        return acc;
      }
      acc[date] = roomOrder.reduce((rooms, roomId, index) => {
        rooms[roomId] = values[index];
        return rooms;
      }, {});
      return acc;
    }, {});
}

function isValidAvailabilityRow(values, expectedLength = PMS_AVAIL_ORDER.length) {
  return Array.isArray(values)
    && values.length === expectedLength
    && values.every((value) => Number.isFinite(Number(value)) && Number(value) >= -1 && Number(value) <= LAVILLE_MAX_ROOM_AVAILABILITY);
}

function normalizeAvailabilityRow(values) {
  if (!Array.isArray(values)) return null;
  const nums = values.map(Number);
  return isValidAvailabilityRow(nums) ? nums : null;
}

function findAvailabilityValues(values) {
  const nums = values.map(Number).filter((value) => Number.isFinite(value));
  if (nums.length < PMS_AVAIL_ORDER.length) return null;
  let candidate = null;
  for (let index = 0; index <= nums.length - PMS_AVAIL_ORDER.length; index += 1) {
    const slice = nums.slice(index, index + PMS_AVAIL_ORDER.length);
    if (isValidAvailabilityRow(slice)) candidate = slice;
  }
  return candidate;
}

function findAvailabilityColumnIndexes(parts) {
  const cells = parts.map((part) => String(part || "").trim().toLowerCase());
  const findIndex = (predicate) => cells.findIndex((cell, index) => index > 0 && predicate(cell));
  const roomIndexes = [
    findIndex((cell) => /charme/.test(cell)),
    findIndex((cell) => /\bclassic\b/.test(cell)),
    findIndex((cell) => /superior/.test(cell) && /(double|twin)/.test(cell) && !/letto/.test(cell)),
    findIndex((cell) => /superior/.test(cell) && /tripla/.test(cell)),
    findIndex((cell) => /deluxe/.test(cell) && /(double|twin)/.test(cell) && !/letto/.test(cell)),
    findIndex((cell) => /deluxe/.test(cell) && /double/.test(cell) && !/(twin|letto)/.test(cell)),
    findIndex((cell) => /superior/.test(cell) && /letto/.test(cell)),
    findIndex((cell) => /family/.test(cell) && /superior/.test(cell)),
    findIndex((cell) => /family/.test(cell) && /junior/.test(cell)),
    findIndex((cell) => /deluxe/.test(cell) && /letto/.test(cell)),
  ];
  if (roomIndexes.every((index) => index >= 0)) return roomIndexes;
  return parts
    .map((part, index) => ({ part: String(part || "").trim().toLowerCase(), index }))
    .filter(({ part, index }) => index > 0 && /^avail\.?$/.test(part))
    .map(({ index }) => index);
}

function availabilityFromIndexedRow(parts, indexes) {
  if (!indexes || indexes.length < PMS_AVAIL_ORDER.length) return null;
  const values = indexes
    .slice(0, PMS_AVAIL_ORDER.length)
    .map((index) => Number(String(parts[index] || "").replace(",", ".").trim()));
  if (!values.every((value) => Number.isFinite(value))) return null;
  return normalizeAvailabilityRow(values);
}

function normalizeImportDate(value) {
  const raw = String(value || "").trim();
  const iso = raw.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (iso) {
    const [, yyyy, mm, dd] = iso;
    return `${yyyy}-${mm}-${dd}`;
  }
  const ita = raw.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (ita) {
    const [, dd, mm, yyyy] = ita;
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  }
  const itaDash = raw.match(/(\d{1,2})-(\d{1,2})-(\d{4})/);
  if (itaDash) {
    const [, dd, mm, yyyy] = itaDash;
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  }
  return null;
}

function numericImportValues(parts) {
  return parts
    .map((part) => String(part).replace("€", "").replace(/\./g, "").replace(",", ".").trim())
    .filter((part) => /^-?\d+(\.\d+)?$/.test(part))
    .map(Number);
}

function splitImportLine(line) {
  const raw = String(line || "").trim();
  if (raw.includes("\t")) return raw.split("\t").map((part) => part.trim());
  if (raw.includes(";")) return raw.split(";").map((part) => part.trim());
  if (raw.includes(",")) return raw.split(",").map((part) => part.trim());
  return raw.split(/\s{2,}|\s+/).filter(Boolean);
}

function availabilityFromRateTriplets(values) {
  if (!Array.isArray(values) || values.length < 3) return null;
  const candidates = [];
  for (let i = 0; i <= values.length - 3; i += 1) {
    const avail = values[i];
    const nextA = values[i + 1];
    const nextB = values[i + 2];
    const isAvailability = Number.isFinite(avail) && avail >= -1 && avail <= LAVILLE_MAX_ROOM_AVAILABILITY;
    const looksLikeRates = Number.isFinite(nextA) && Number.isFinite(nextB) && nextA > 40 && nextB > 40;
    if (isAvailability && looksLikeRates) candidates.push(avail);
  }
  if (candidates.length >= PMS_AVAIL_ORDER.length) {
    const row = candidates.slice(0, PMS_AVAIL_ORDER.length);
    return isValidAvailabilityRow(row) ? row : null;
  }
  return null;
}

function availabilityFromNumericTail(values, expectedColumns, maxCellAvailability = LAVILLE_MAX_ROOM_AVAILABILITY) {
  if (!Array.isArray(values) || values.length < expectedColumns) return null;
  const integers = values
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value))
    .map((value) => Math.trunc(value));

  if (integers.length === expectedColumns) {
    return isValidAvailabilityRow(integers, expectedColumns) ? integers : null;
  }

  let best = null;
  for (let offset = 0; offset <= Math.min(6, Math.max(0, integers.length - 3)); offset += 1) {
    const row = [];
    for (let index = offset; index + 2 < integers.length; index += 3) {
      const avail = integers[index];
      const dus = integers[index + 1];
      const dbl = integers[index + 2];
      const isAvailability = avail >= -1 && avail <= maxCellAvailability;
      const looksLikeRatePair = dus > maxCellAvailability && dbl > maxCellAvailability;
      if (isAvailability && looksLikeRatePair) row.push(avail);
      else if (row.length) break;
    }
    if (row.length >= expectedColumns) {
      const candidate = row.slice(0, expectedColumns);
      if (isValidAvailabilityRow(candidate, expectedColumns)) {
        best = candidate;
        break;
      }
    }
  }

  if (best) return best;
  return null;
}

function importAvailabilityRule(propertyId) {
  return IMPORT_AVAIL_RULES[propertyId] || IMPORT_AVAIL_RULES.laville;
}

function roomOrderForProperty(propertyId, mode = "availability") {
  const source = mode === "rate" ? PROPERTY_RATE_ROOM_ORDER : PROPERTY_AVAIL_ROOM_ORDER;
  return source[propertyId] || source.laville || [];
}

function roomIdToLabel(propertyId, roomId) {
  const fromState = state?.data?.find((item) => item.id === propertyId)?.rooms?.find((room) => room.id === roomId)?.name;
  if (fromState) return fromState;
  const fromDefault = DEFAULT_DATA.find((item) => item.id === propertyId)?.rooms?.find((room) => room.id === roomId)?.name;
  return fromDefault || roomId;
}

function expectedAvailabilityColumns(propertyId) {
  const fromState = state?.data?.find((item) => item.id === propertyId)?.rooms?.length;
  if (Number.isFinite(fromState) && fromState > 0) return fromState;
  const fromDefault = DEFAULT_DATA.find((item) => item.id === propertyId)?.rooms?.length;
  if (Number.isFinite(fromDefault) && fromDefault > 0) return fromDefault;
  return importAvailabilityRule(propertyId).expectedColumns;
}

function availabilityStore(propertyId) {
  if (propertyId === "laville") return LV_AVAIL;
  if (propertyId === "pineta") return PP_AVAIL;
  return null;
}

function normalizeAvailabilityRowByProperty(propertyId, values) {
  if (!Array.isArray(values)) return null;
  const expected = expectedAvailabilityColumns(propertyId);
  const row = values.map(Number);
  return isValidAvailabilityRow(row, expected) ? row : null;
}

function clearAvailabilityStore(propertyId) {
  const store = availabilityStore(propertyId);
  if (!store) return 0;
  const beforeCount = Object.keys(store).length;
  Object.keys(store).forEach((dateKey) => { delete store[dateKey]; });
  return beforeCount;
}

function writeAvailabilityStore(propertyId, rowsByDate) {
  const store = availabilityStore(propertyId);
  if (!store || !rowsByDate || typeof rowsByDate !== "object") return 0;
  let written = 0;
  Object.entries(rowsByDate).forEach(([dateKey, row]) => {
    if (dateKey < AVAILABILITY_HISTORY_START || dateKey > AVAILABILITY_HISTORY_END) return;
    const cleanRow = normalizeAvailabilityRowByProperty(propertyId, row);
    if (cleanRow) {
      store[dateKey] = cleanRow;
      written += 1;
    }
  });
  return written;
}

function compactAvailabilityRowsForStorage(propertyId, rowsByDate, maxRows = 1500) {
  if (!rowsByDate || typeof rowsByDate !== "object") return {};
  const expected = expectedAvailabilityColumns(propertyId);
  const validEntries = Object.entries(rowsByDate)
    .filter(([dateKey, row]) => {
      if (dateKey < AVAILABILITY_HISTORY_START || dateKey > AVAILABILITY_HISTORY_END) return false;
      if (!Array.isArray(row)) return false;
      return isValidAvailabilityRow(row.map(Number), expected);
    })
    .sort(([a], [b]) => a.localeCompare(b));
  const clipped = validEntries.length > maxRows
    ? validEntries.slice(validEntries.length - maxRows)
    : validEntries;
  return Object.fromEntries(clipped.map(([dateKey, row]) => [dateKey, row.map(Number)]));
}

function mergeAvailabilityRowsByMax(existingRow, nextRow) {
  if (!Array.isArray(existingRow)) return [...nextRow];
  return nextRow.map((value, index) => {
    const prev = Number(existingRow[index]);
    const curr = Number(value);
    if (!Number.isFinite(prev)) return curr;
    if (!Number.isFinite(curr)) return prev;
    return Math.max(prev, curr);
  });
}

function isTimestampLike(value) {
  const raw = String(value || "").trim();
  return /^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}(:\d{2})?$/.test(raw)
    || /^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\s+\d{2}:\d{2}(:\d{2})?$/.test(raw);
}

function isDateOnlyLike(value) {
  const raw = String(value || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(raw) || /^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}$/.test(raw);
}

function detectImportAvailabilityLayout(lines, expectedColumns) {
  const previewRows = lines.slice(0, 4).map((line) => splitImportLine(line));
  const maxCols = previewRows.reduce((best, row) => Math.max(best, row.length), 0);
  let dataColIndex = -1;
  let bestScore = -1;

  for (let col = 0; col < maxCols; col += 1) {
    let dateOnlyCount = 0;
    let timestampCount = 0;
    previewRows.forEach((row) => {
      const cell = row[col] || "";
      if (isTimestampLike(cell)) timestampCount += 1;
      else if (isDateOnlyLike(cell) && normalizeImportDate(cell)) dateOnlyCount += 1;
    });
    if (dateOnlyCount > bestScore && timestampCount === 0) {
      bestScore = dateOnlyCount;
      dataColIndex = col;
    }
  }

  if (dataColIndex < 0) {
    for (let col = 0; col < maxCols; col += 1) {
      const hasDate = previewRows.some((row) => normalizeImportDate(row[col] || ""));
      const hasTs = previewRows.some((row) => isTimestampLike(row[col] || ""));
      if (hasDate && !hasTs) {
        dataColIndex = col;
        break;
      }
    }
  }

  if (dataColIndex < 0) return { dataColIndex: -1, availabilityColumns: [], source: "none" };

  const splitRows = lines.map((line) => splitImportLine(line));
  const firstDataRowIndex = splitRows.findIndex((cells) => normalizeImportDate(cells[dataColIndex] || ""));
  const headerRows = (firstDataRowIndex >= 0 ? splitRows.slice(0, firstDataRowIndex) : splitRows.slice(0, 3));
  const dataRows = (firstDataRowIndex >= 0 ? splitRows.slice(firstDataRowIndex) : splitRows)
    .filter((cells) => normalizeImportDate(cells[dataColIndex] || ""))
    .slice(0, 40);

  const headerAvailColumns = [];
  for (let col = dataColIndex + 1; col < maxCols; col += 1) {
    const hasAvailMarker = headerRows.some((row) => /\bavail\b/i.test(String(row[col] || "")));
    const hasOccMarker = headerRows.some((row) => /%occ/i.test(String(row[col] || "")));
    if (hasAvailMarker && !hasOccMarker) headerAvailColumns.push(col);
  }
  if (headerAvailColumns.length >= expectedColumns) {
    return {
      dataColIndex,
      availabilityColumns: headerAvailColumns.slice(-expectedColumns),
      source: "header",
    };
  }

  const availabilityColumns = [];
  for (let col = dataColIndex + 1; col < maxCols; col += 1) {
    let validCount = 0;
    let invalidCount = 0;
    dataRows.forEach((cells) => {
      const raw = String(cells[col] || "").trim();
      if (!raw) return;
      const normalized = raw.replace(",", ".");
      const value = Number(normalized);
      const isInteger = Number.isFinite(value) && Math.trunc(value) === value;
      const isValidAvail = isInteger && value >= -1 && value <= LAVILLE_MAX_ROOM_AVAILABILITY;
      if (isValidAvail) validCount += 1;
      else invalidCount += 1;
    });
    if (validCount > 0 && invalidCount === 0) availabilityColumns.push(col);
  }

  if (availabilityColumns.length === expectedColumns) {
    return { dataColIndex, availabilityColumns, source: "numeric" };
  }

  const rawFallbackCols = [];
  for (let col = dataColIndex + 1; col < maxCols && rawFallbackCols.length < expectedColumns; col += 1) {
    rawFallbackCols.push(col);
  }
  if (rawFallbackCols.length === expectedColumns) {
    return { dataColIndex, availabilityColumns: rawFallbackCols, source: "raw-fallback" };
  }

  return { dataColIndex, availabilityColumns: [], source: "none" };
}

function compareAvailabilityAgainstBaseline(importedRows, baselineRows, propertyId = "laville") {
  const warnings = [];
  const { maxTotalRooms } = importAvailabilityRule(propertyId);
  const sampleDates = Object.keys(importedRows)
    .filter((date) => Array.isArray(baselineRows?.[date]))
    .sort()
    .slice(0, 12);
  sampleDates.forEach((date) => {
    const imported = importedRows[date];
    const baseline = baselineRows[date];
    const importedTotal = imported.reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0);
    const baselineTotal = baseline.reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0);
    const diff = Math.abs(importedTotal - baselineTotal);
    const threshold = Math.max(1, baselineTotal * 0.5);
    if (diff > threshold && Math.max(importedTotal, baselineTotal) > maxTotalRooms / 3) {
      warnings.push(`[${date}] differenza >50% rispetto baseline (import ${importedTotal}, baseline ${baselineTotal})`);
    }
  });
  return warnings;
}

function parseImportedRates(raw, propertyId = "laville") {
  const roomOrder = roomOrderForProperty(propertyId, "rate");
  const deltaByRoom = Object.fromEntries(
    (DEFAULT_DATA.find((item) => item.id === propertyId)?.rooms || []).map((room) => [room.id, Number(room.delta) || 0]),
  );
  const baseRoomId = roomOrder[0] || null;
  let nextSequentialDate = todayLocal();
  const minDate = AVAILABILITY_HISTORY_START;
  return String(raw || "")
    .trim()
    .split(/\n+/)
    .reduce((acc, line) => {
      const parts = splitImportLine(line);
      let date = normalizeImportDate(parts[0]);
      let values = [];
      if (date && parts.length >= 14) {
        values = numericImportValues([parts[13]]);
      } else {
        values = numericImportValues(date ? parts.slice(1) : parts);
      }
      if (!date && values.length) {
        date = nextSequentialDate;
        nextSequentialDate = addDays(nextSequentialDate, 1);
      }
      if (!date || date < minDate) return acc;
      if (values.length < 1) return acc;
      if (propertyId === "laville" && (values.length === 1 || values.length === 2)) {
        const entryDus = values[0];
        const entryDbl = values.length === 2 ? values[1] : entryDus + 20;
        acc[date] = roomOrder.reduce((rooms, roomId) => {
          const supplement = LAVILLE_ENTRY_CASCADE[roomId] ?? 0;
          const hasDus = PMS_DUS_ROOM_IDS.laville.has(roomId);
          rooms[roomId] = hasDus ? entryDus + supplement : entryDbl + supplement;
          return rooms;
        }, {});
        return acc;
      }
      if (values.length === 1 && baseRoomId) {
        const base = Number(values[0]) || 0;
        acc[date] = roomOrder.reduce((rooms, roomId) => {
          rooms[roomId] = base + (deltaByRoom[roomId] ?? 0);
          return rooms;
        }, {});
        return acc;
      }
      acc[date] = roomOrder.reduce((rooms, roomId, index) => {
        const directValue = Number(values[index]);
        if (Number.isFinite(directValue)) {
          rooms[roomId] = directValue;
        } else if (baseRoomId && Number.isFinite(Number(values[0]))) {
          rooms[roomId] = Number(values[0]) + (deltaByRoom[roomId] ?? 0);
        }
        return rooms;
      }, {});
      return acc;
    }, {});
}

function pinetaRoomOnlyRate(bbRate, sourceType = "ota", guests = 2) {
  const bb = Number(bbRate);
  if (!Number.isFinite(bb)) return null;
  const rule = PINETA_ROOM_ONLY_RULES[sourceType] || PINETA_ROOM_ONLY_RULES.ota;
  const discount = rule.mode === "per_person"
    ? rule.amount * Math.max(1, Number(guests) || 1)
    : rule.amount;
  return bb - discount;
}

function pinetaRateBandFromBb(bbRate) {
  const rate = Number(bbRate);
  if (!Number.isFinite(rate)) return null;
  return PINETA_COMFORT_RATE_BANDS.find((band) => band.bb === rate) || null;
}

function pinetaRateBandLabel(bbRate) {
  const band = pinetaRateBandFromBb(bbRate);
  if (!band) return "";
  const easyRo = pinetaRoomOnlyRate(band.bb, "easyconsulting", 2);
  const otaRo = pinetaRoomOnlyRate(band.bb, "ota", 2);
  return `${band.label} - BB${band.bb} - RO Easy ${easyRo} - RO OTA/Wh ${otaRo}`;
}

function pinetaFigaroRatePlansByRoom() {
  return PINETA_FIGARO_RATE_PLANS.reduce((groups, plan) => {
    const label = cleanRoomOccupancyName(roomIdToLabel("pineta", plan.roomId));
    if (!groups[label]) groups[label] = [];
    groups[label].push(plan);
    return groups;
  }, {});
}

function pinetaFigaroPlanSummary(plan) {
  const suffix = plan.warning ? " *" : "";
  return `${plan.label}${suffix}`;
}

function pinetaInventoryDeclaredTotal() {
  return PINETA_INVENTORY_GROUPS.reduce((sum, group) => sum + Number(group.count || 0), 0);
}

function pinetaInventoryMappedTotal() {
  return PINETA_INVENTORY_GROUPS
    .filter((group) => group.roomId)
    .reduce((sum, group) => sum + Number(group.count || 0), 0);
}

function pinetaInventoryLine(group) {
  const aliases = (group.aliases || []).length ? ` · include ${group.aliases.join(", ")}` : "";
  const note = group.note ? ` · ${group.note}` : "";
  return `${group.count} camere${aliases}${note}`;
}

function renderPinetaInventoryInfo() {
  const declaredTotal = pinetaInventoryDeclaredTotal();
  const mappedTotal = pinetaInventoryMappedTotal();
  return `
    <div class="import-rules pineta-inventory-groups">
      ${PINETA_INVENTORY_GROUPS.map((group) => `
        <div>
          <strong>${escapeHtml(group.label)}</strong>
          <span>${escapeHtml(pinetaInventoryLine(group))}</span>
        </div>
      `).join("")}
      <div>
        <strong>Standard</strong>
        <span>${PINETA_STANDARD_TOTAL} camere indicate come riferimento separato</span>
      </div>
      <div>
        <strong>Totale mappato in PRISMA</strong>
        <span>${mappedTotal} camere nelle 7 camere gia operative</span>
      </div>
      <div>
        <strong>Totale operativo dichiarato</strong>
        <span>${declaredTotal} camere, incluse categorie ancora da mappare</span>
      </div>
    </div>
  `;
}

function parseImportedAvailabilityDetailed(raw, propertyId = "laville", baselineRows = null) {
  const minDate = AVAILABILITY_HISTORY_START;
  const maxDate = AVAILABILITY_HISTORY_END;
  const { maxTotalRooms } = importAvailabilityRule(propertyId);
  const expectedColumns = expectedAvailabilityColumns(propertyId);
  const warnings = [];
  const lines = String(raw || "")
    .trim()
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  console.log("PRISMA DEBUG availability:", {
    linesCount: lines.length,
    firstLines: lines.slice(0, 3),
    expectedColumns,
    propertyId,
  });

  const layout = detectImportAvailabilityLayout(lines, expectedColumns);
  console.log("PRISMA DEBUG layout:", layout);
  if (layout.dataColIndex < 0) {
    warnings.push("Colonna DATA non trovata nelle prime righe.");
  }
  if (layout.availabilityColumns.length === expectedColumns) {
    warnings.push(`Parser disponibilità: modalità ${layout.source}.`);
  } else {
    warnings.push(`Colonne disponibilità non riconosciute in modo sicuro (attese ${expectedColumns}): uso parser triplette.`);
  }

  const rows = lines.reduce((acc, line) => {
    const cells = splitImportLine(line);
    const fallbackDateToken = line.match(/(\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}-\d{1,2}-\d{4})/);
    const dateStr = layout.dataColIndex >= 0
      ? normalizeImportDate(cells[layout.dataColIndex] || "")
      : fallbackDateToken
        ? normalizeImportDate(fallbackDateToken[0])
        : null;
    if (!dateStr || dateStr < minDate || dateStr > maxDate) return acc;

    if (layout.availabilityColumns.length === expectedColumns) {
      const extracted = layout.availabilityColumns.map((columnIndex) => {
        const raw = String(cells[columnIndex] || "").trim();
        const normalized = raw.replace(",", ".");
        const value = Number(normalized);
        if (!Number.isFinite(value)) return NaN;
        if (Math.trunc(value) !== value) return NaN;
        return Math.trunc(value);
      });

      if (!extracted.every((value) => Number.isFinite(value))) {
        warnings.push(`[${dateStr}] valori non validi nelle colonne disponibilità: riga scartata`);
        return acc;
      }

      const mapped = extracted;
      if (!isValidAvailabilityRow(mapped, expectedColumns)) {
        warnings.push(`[${dateStr}] colonne disponibilità fuori range: riga scartata`);
        return acc;
      }

      const total = mapped.reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0);
      if (total > maxTotalRooms * 2) {
        warnings.push(`[${dateStr}] totale ${total} oltre soglia ${maxTotalRooms * 2}: possibile foglio tariffe mescolato.`);
        return acc;
      }

      acc[dateStr] = mergeAvailabilityRowsByMax(acc[dateStr], mapped);
      return acc;
    }

    const directDateIndex = cells.findIndex((part) => normalizeImportDate(part));
    const directValues = directDateIndex >= 0
      ? numericImportValues(cells.slice(directDateIndex + 1))
      : numericImportValues(cells);
    const candidate = availabilityFromNumericTail(directValues, expectedColumns)
      || availabilityFromRateTriplets(directValues);
    if (candidate) {
      const mapped = [...candidate];
      if (!isValidAvailabilityRow(mapped, expectedColumns)) {
        warnings.push(`[${dateStr}] fallback fuori range: riga scartata.`);
        return acc;
      }
      const total = mapped.reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0);
      if (total > maxTotalRooms * 2) {
        warnings.push(`[${dateStr}] totale ${total} oltre soglia ${maxTotalRooms * 2}: possibile foglio tariffe mescolato.`);
        return acc;
      }
      acc[dateStr] = mergeAvailabilityRowsByMax(acc[dateStr], mapped);
      return acc;
    }
    warnings.push(`[${dateStr}] nessuna struttura disponibilità valida trovata: riga scartata.`);
    return acc;
  }, {});

  if (baselineRows) warnings.push(...compareAvailabilityAgainstBaseline(rows, baselineRows, propertyId));
  return { rows, warnings };
}

function parseBeddzleMixedAvailability(raw, propertyId = "laville") {
  const minDate = AVAILABILITY_HISTORY_START;
  const maxDate = AVAILABILITY_HISTORY_END;
  const expectedColumns = expectedAvailabilityColumns(propertyId);
  const warnings = [];

  const allLines = String(raw || "")
    .trim()
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  console.log("PRISMA DEBUG Beddzle Mixed:", {
    totalLines: allLines.length,
    firstLines: allLines.slice(0, 5),
  });

  let dataStartIndex = -1;
  let dateColIndex = -1;

  for (let i = 0; i < Math.min(allLines.length, 10); i += 1) {
    const cells = splitImportLine(allLines[i]);
    for (let c = 0; c < cells.length; c += 1) {
      const normalizedDate = normalizeImportDate(cells[c]);
      if (normalizedDate && normalizedDate >= minDate && normalizedDate <= maxDate) {
        dataStartIndex = i;
        dateColIndex = c;
        break;
      }
    }
    if (dataStartIndex >= 0) break;
  }

  if (dataStartIndex < 0) {
    warnings.push("Nessuna colonna DATA trovata nelle prime 10 righe.");
    return { rows: {}, warnings };
  }

  const dataLines = allLines.slice(dataStartIndex);
  const sampleRows = dataLines.slice(0, Math.min(20, dataLines.length));
  const maxCols = sampleRows.reduce((best, line) => Math.max(best, splitImportLine(line).length), 0);

  const colStats = [];
  for (let col = 0; col < maxCols; col += 1) {
    if (col === dateColIndex) continue;

    const values = [];
    sampleRows.forEach((line) => {
      const cells = splitImportLine(line);
      const rawVal = String(cells[col] || "").trim().replace(",", ".");
      const num = Number(rawVal);
      if (Number.isFinite(num)) values.push(num);
    });

    if (!values.length) continue;

    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const allIntegers = values.every((value) => Math.trunc(value) === value);
    const maxThreshold = propertyId === "laville" ? LAVILLE_MAX_ROOM_AVAILABILITY : 50;
    const looksLikeAvailability = allIntegers && max <= maxThreshold && min >= -1;

    colStats.push({ col, avg, max, min, count: values.length, looksLikeAvailability });
  }

  console.log("PRISMA DEBUG colStats:", colStats);

  let availCols = colStats
    .filter((stat) => stat.looksLikeAvailability)
    .slice(0, expectedColumns)
    .map((stat) => stat.col);

  if (availCols.length < expectedColumns) {
    warnings.push(`Trovate ${availCols.length} colonne disp. su ${expectedColumns}. Uso fallback.`);
    const fallback = colStats
      .filter((stat) => stat.max <= 100 && stat.min >= -1)
      .slice(0, expectedColumns)
      .map((stat) => stat.col);
    if (fallback.length >= expectedColumns) availCols = fallback;
  }

  console.log("PRISMA DEBUG availCols:", availCols);

  const rows = {};
  let validRows = 0;

  dataLines.forEach((line) => {
    const cells = splitImportLine(line);
    const dateStr = normalizeImportDate(cells[dateColIndex] || "");
    if (!dateStr || dateStr < minDate || dateStr > maxDate) return;

    const extracted = availCols.map((colIndex) => {
      const rawVal = String(cells[colIndex] || "").trim().replace(",", ".");
      return Math.trunc(Number(rawVal));
    });

    if (!extracted.every((value) => Number.isFinite(value))) return;
    if (!isValidAvailabilityRow(extracted, expectedColumns)) return;

    rows[dateStr] = mergeAvailabilityRowsByMax(rows[dateStr], extracted);
    validRows += 1;
  });

  const uniqueDates = Object.keys(rows).length;
  warnings.unshift(`Beddzle Mixed: ${uniqueDates} date valide (righe elaborate: ${validRows}). Colonne: ${availCols.length}/${expectedColumns}`);
  console.log("PRISMA DEBUG result:", { validRows, uniqueDates, sampleDates: Object.keys(rows).slice(0, 3) });

  return { rows, warnings };
}

function parseImportedAvailabilityWithFallback(raw, propertyId = "laville", baselineRows = null) {
  const classic = parseImportedAvailabilityDetailed(raw, propertyId, baselineRows);
  if (Object.keys(classic.rows).length > 0) return classic;

  console.log("PRISMA: Parser classico 0 righe, provo Beddzle Mixed...");
  const mixed = parseBeddzleMixedAvailability(raw, propertyId);
  return { rows: mixed.rows, warnings: [...(classic.warnings || []), ...(mixed.warnings || [])] };
}

function parseImportedAvailability(raw, propertyId = "laville", baselineRows = null) {
  const result = parseImportedAvailabilityWithFallback(raw, propertyId, baselineRows);
  if (result.warnings.length && state?.importer) {
    state.importer.validationWarnings = [
      ...(state.importer.validationWarnings || []),
      ...result.warnings,
    ];
  }
  return result.rows;
}

function formatUploadStamp(date = new Date()) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}

function fmt(n) {
  return "EUR " + Number(n).toFixed(2);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function todayLocal() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function ensureStrategyPeriodToday() {
  const today = todayLocal();
  if (!state.strategy.periodFrom) state.strategy.periodFrom = today;
  if (!state.strategy.periodTo) state.strategy.periodTo = state.strategy.periodFrom;
}

function dateToLocalMidnight(dateStr) {
  const [yyyy, mm, dd] = dateStr.split("-").map(Number);
  return new Date(yyyy, mm - 1, dd);
}

function weekdayLabel(dateStr) {
  return WEEKDAY_LONG[dateToLocalMidnight(dateStr).getDay()];
}

function holidayName(dateStr) {
  return HOLIDAYS[dateStr] || "";
}

function holidayShortLabel(name) {
  const labels = {
    "Festa del Lavoro": "Festa lavoratori",
    "Liberazione": "Liberazione",
    "Festa della Repubblica": "Repubblica",
    "Capodanno": "Capodanno",
    "Epifania": "Epifania",
    "Pasqua": "Pasqua",
    "Pasquetta": "Pasquetta",
    "Ferragosto": "Ferragosto",
    "Ognissanti": "Ognissanti",
    "Immacolata": "Immacolata",
    "Natale": "Natale",
    "Santo Stefano": "S. Stefano",
  };
  return labels[name] || name;
}

function daysUntil(dateStr) {
  const today = dateToLocalMidnight(todayLocal());
  const arrival = dateToLocalMidnight(dateStr);
  return Math.round((arrival - today) / 86400000);
}

function addDays(dateStr, days) {
  const d = dateToLocalMidnight(dateStr);
  d.setDate(d.getDate() + days);
  return todayFromDate(d);
}

function todayFromDate(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function addDeepDealReminder(channelId, startDate) {
  const reopenDate = addDays(startDate, 15);
  const exists = state.deepDealReminders.some((item) => item.channelId === channelId && item.startDate === startDate);
  if (!exists) state.deepDealReminders.push({ channelId, startDate, reopenDate });
}

function deepDealRemindersForDate(dateStr) {
  return state.deepDealReminders.filter((item) => item.reopenDate === dateStr);
}

const REMINDER_TYPES = ["HotelBeds", "WebBeds", "Booking", "48h Deal", "Promo", "Contratto", "Altro"];

function remindersForDate(dateStr, propId = currentProp().id) {
  return state.reminders.filter((item) => item.propertyId === propId && item.date === dateStr);
}

function formatShortDate(dateStr) {
  const [yyyy, mm, dd] = dateStr.split("-");
  return `${dd}/${mm}/${yyyy}`;
}

function renderReminderNotice(reminder) {
  return `
    <div class="notice">
      <div class="notice-mark">!</div>
      <div>
        <strong>${escapeHtml(reminder.type)} ${formatShortDate(reminder.date)}</strong>
        <span>${escapeHtml(reminder.title)}${reminder.note ? ` - ${escapeHtml(reminder.note)}` : ""}</span>
      </div>
      <button class="ghost notice-edit" data-action="edit-reminders">Modifica reminder</button>
    </div>
  `;
}

function renderReminderEditor(prop) {
  const propertyReminders = state.reminders.filter((item) => item.propertyId === prop.id);
  return `
    <section class="reminder-editor">
      <div class="reminder-editor-head">
        <strong>Reminder modificabili</strong>
        <div class="reminder-editor-actions">
          ${state.reminderSavedAt ? `<span class="reminder-saved">Salvato ${state.reminderSavedAt}</span>` : ""}
          <button class="primary compact-button" data-action="save-reminders">Salva reminder</button>
          <button class="ghost" data-action="add-reminder">+ reminder</button>
        </div>
      </div>
      ${propertyReminders.map((item) => `
        <div class="reminder-row">
          <select data-action="reminder-field" data-id="${item.id}" data-field="type">
            ${REMINDER_TYPES.map((type) => `<option value="${escapeHtml(type)}" ${type === item.type ? "selected" : ""}>${escapeHtml(type)}</option>`).join("")}
          </select>
          <input type="date" value="${escapeHtml(item.date)}" data-action="reminder-field" data-id="${escapeHtml(item.id)}" data-field="date" />
          <input type="text" value="${escapeHtml(item.title)}" placeholder="Titolo reminder" data-action="reminder-field" data-id="${escapeHtml(item.id)}" data-field="title" />
          <input type="text" value="${escapeHtml(item.note || "")}" placeholder="Nota" data-action="reminder-field" data-id="${escapeHtml(item.id)}" data-field="note" />
          <button class="ghost danger-text" data-action="delete-reminder" data-id="${item.id}">Rimuovi</button>
        </div>
      `).join("") || `<div class="empty compact">Nessun reminder per questa struttura.</div>`}
    </section>
  `;
}

function getRate(id, date, occupancy = state.occupancy) {
  const pmsBaseRoom = id === "laville" ? "lv_classic" : id === "pineta" ? "pp1" : null;
  const pmsRate = pmsBaseRoom ? getRoomRate(id, pmsBaseRoom, date, occupancy) : null;
  return pmsRate ?? RATES[id]?.[date] ?? null;
}

function getSelectedRoom(prop = currentProp()) {
  if (!state.selectedRoomId) return null;
  return prop.rooms.find((room) => room.id === state.selectedRoomId) || null;
}

function getSelectableRooms(prop = currentProp(), occupancy = state.occupancy) {
  return occupancy === "dus" ? prop.rooms.filter((room) => supportsDus(prop.id, room.id)) : prop.rooms;
}

function getCalendarReferenceRoom(prop = currentProp()) {
  const selectedRoom = getSelectedRoom(prop);
  if (selectedRoom) return selectedRoom;
  if (prop.id === "laville") return prop.rooms.find((room) => room.id === "lv_classic") || getSelectableRooms(prop)[0] || null;
  return getSelectableRooms(prop)[0] || prop.rooms[0] || null;
}

function getAggregateAvailability(prop = currentProp(), date = state.selectedDate, occupancy = state.occupancy) {
  const values = getSelectableRooms(prop, occupancy)
    .map((room) => getAvailability(prop.id, room.id, date))
    .filter((value) => value != null);
  if (!values.length) return null;
  return values.reduce((total, value) => total + Math.max(0, value), 0);
}

function getCalendarAvailabilityValue(prop = currentProp(), date = state.selectedDate, occupancy = state.occupancy) {
  const selectedRoom = getSelectedRoom(prop);
  if (selectedRoom) return getAvailability(prop.id, selectedRoom.id, date);
  return getAggregateAvailability(prop, date, occupancy);
}

function getCalendarAvailabilityMax(prop = currentProp(), occupancy = state.occupancy) {
  const selectedRoom = getSelectedRoom(prop);
  const rooms = selectedRoom ? [selectedRoom] : getSelectableRooms(prop, occupancy);
  const source = prop.id === "laville" ? LV_AVAIL : prop.id === "pineta" ? PP_AVAIL : {};
  const max = Object.values(source).reduce((best, row) => {
    const total = rooms.reduce((sum, room) => {
      const index = prop.id === "laville" ? LV_IDX[room.id] : PP_IDX[room.id];
      const value = index == null ? null : row?.[index];
      return sum + Math.max(0, Number(value) || 0);
    }, 0);
    return Math.max(best, total);
  }, 0);
  return max || null;
}

function calendarAvailabilityInfo(prop = currentProp(), date = state.selectedDate) {
  const value = getCalendarAvailabilityValue(prop, date);
  const max = getCalendarAvailabilityMax(prop);
  if (value == null || !max) return { value, percent: null, level: "unknown" };
  const percent = Math.max(0, Math.min(100, Math.round((Math.max(0, value) / max) * 100)));
  const level = percent <= 30 ? "low" : percent <= 79 ? "medium" : "high";
  return { value, percent, level };
}

function getOperationalRate(prop = currentProp(), date = state.selectedDate, occupancy = state.occupancy) {
  const room = getSelectedRoom(prop);
  if (!room) return getRate(prop.id, date, occupancy);
  return getRoomRate(prop.id, room.id, date, occupancy) ?? getRate(prop.id, date, occupancy);
}

function getRoomRate(propId, roomId, date, occupancy = "double") {
  if (occupancy === "dus" && !supportsDus(propId, roomId)) return null;
  const occupancyOffset = occupancy === "dus" ? 0 : PMS_DOUBLE_OCCUPANCY_OFFSET[propId]?.[roomId] ?? 0;
  const pmsRow = PMS_RATES[propId]?.[date];
  if (pmsRow == null) return null;
  if (typeof pmsRow === "number") {
    const prop = state.data.find((item) => item.id === propId) || DEFAULT_DATA.find((item) => item.id === propId);
    const room = prop?.rooms?.find((item) => item.id === roomId);
    const roomDelta = Number(room?.delta) || 0;
    return pmsRow + roomDelta + occupancyOffset;
  }
  const pmsRate = pmsRow?.[roomId];
  if (pmsRate == null) return null;
  return pmsRate + occupancyOffset;
}

function refreshOperationalRate(prop = currentProp(), date = state.selectedDate, occupancy = state.occupancy) {
  const rate = getOperationalRate(prop, date, occupancy);
  state.hasCalendar = rate != null;
  state.sito = rate != null ? rate : "";
  return rate;
}

function supportsDus(propId, roomId) {
  return Boolean(PMS_DUS_ROOM_IDS[propId]?.has(roomId));
}

function hasDusRate(propId, roomId, date = state.selectedDate) {
  return getRoomRate(propId, roomId, date, "dus") != null;
}

function cleanRoomOccupancyName(roomName) {
  return roomName
    .replace(/\bDouble\/Twin\b/gi, "Twin")
    .replace(/\bDBL\b/gi, "")
    .replace(/\bDouble\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function roomSelectLabel(prop, room) {
  const lavilleLabelByRoom = {
    lv_charme: "Charme",
    lv_classic: "Classic",
    lv_superior: "Superior",
    lv_superior_tripla: "Superior Tripla",
    lv_deluxe_twin: "Deluxe Twin",
    lv_deluxe: "Deluxe",
    lv_superior_letto: "Superior + letto",
    lv_family_superior: "Family Superior",
    lv_family_junior: "Family Junior",
    lv_deluxe_letto: "Deluxe + letto",
  };
  const base = prop.id === "laville"
    ? (lavilleLabelByRoom[room.id] || cleanRoomOccupancyName(room.name) || room.name)
    : (cleanRoomOccupancyName(room.name) || room.name);
  const isTripla = /tripla/i.test(room.name);
  const canShowDus = supportsDus(prop.id, room.id);
  if (state.occupancy === "dus") return canShowDus ? `${base} Dus` : base;
  if (isTripla) return base;
  return `${base} Dbl`;
}

function getPmsRateRow(prop, date) {
  return PMS_RATES[prop.id]?.[date] ?? null;
}

function inRange(dateStr, ranges) {
  if (!ranges?.length) return false;
  const md = dateStr.slice(5);
  return ranges.some(({ from, to }) => {
    if (from.length === 10 || to.length === 10) {
      return from <= to ? dateStr >= from && dateStr <= to : dateStr >= from || dateStr <= to;
    }
    return from <= to ? md >= from && md <= to : md >= from || md <= to;
  });
}

function autoActivate(channels, dateStr) {
  return channels.map((ch) => {
    const hasManualCountry = ch.promos.some((pr) => pr.type === "paese" && pr.on && !pr.defaultPaese);
    return {
      ...ch,
      promos: ch.promos.map((pr) => {
        const hasRealDates = Boolean(pr.dates?.length);
        const inRealWindow = hasRealDates ? inRange(dateStr, pr.dates) : dateStr <= UNDATED_PROMO_VISIBILITY_END;
        if (pr.defaultPaese) {
          const on = !hasManualCountry && inRealWindow;
          return { ...pr, on, autoDate: on };
        }
        if (!hasRealDates) return { ...pr, on: Boolean(pr.on && inRealWindow), autoDate: false };
        const on = inRange(dateStr, pr.dates);
        return { ...pr, on, autoDate: on };
      }),
    };
  });
}

function resolvePromos(promos) {
  const active = promos.map((p, i) => ({ ...p, i })).filter((p) => p.on);
  const shadowed = new Set();
  for (let a = 0; a < active.length; a += 1) {
    for (let b = a + 1; b < active.length; b += 1) {
      const pa = active[a];
      const pb = active[b];
      if (!pa.type || !pb.type || pa.type === "none" || pb.type === "none") continue;
      if (pa.type === "paese" && pb.type === "paese") continue;
      const rA = COMPAT[pa.type];
      const rB = COMPAT[pb.type];
      if ((rA && !rA.includes(pb.type)) || (rB && !rB.includes(pa.type))) {
        if (pa.p <= pb.p) shadowed.add(pa.i);
        else shadowed.add(pb.i);
      }
    }
  }
  return { effective: promos.filter((p, i) => p.on && !shadowed.has(i)), shadowed };
}

function cmpd(base, promos) {
  return promos.reduce((v, p) => v * (1 - p.p / 100), base);
}

function nonRefundableRate(rate) {
  return rate * (1 - NON_REF_DISCOUNT / 100);
}

function isWeekendEscapePromo(sitePromo) {
  return sitePromo?.condition === "weekend";
}

function siteFlexPromoRate(rate, sitePromo) {
  if (!promoAppliesToTarget(sitePromo, "flex")) return null;
  return rate * (1 - sitePromo.p / 100);
}

function siteSellRate(rate, sitePromo) {
  const nonRefRate = nonRefundableRate(rate);
  if (!sitePromo || !promoAppliesToTarget(sitePromo, "notref")) return nonRefRate;
  return nonRefRate * (1 - sitePromo.p / 100);
}

function sitePromoNote(sitePromo, target = "notref") {
  if (!sitePromo) return `NOT REF ${NON_REF_DISCOUNT}%`;
  if (target === "flex") return `${sitePromo.l} ${sitePromo.p}%`;
  return `NOT REF ${NON_REF_DISCOUNT}% + ${sitePromo.l} ${sitePromo.p}%`;
}

function sitePromoRateLines(rate, promos, target) {
  return promos
    .map((promo) => {
      const price = target === "flex" ? siteFlexPromoRate(rate, promo) : siteSellRate(rate, promo);
      if (price == null) return null;
      return { price, note: sitePromoNote(promo, target) };
    })
    .filter(Boolean);
}

function renderSitePromoRateLines(lines, emptyText, badgeForLine = null) {
  if (!lines.length) return `<strong>-</strong>${emptyText ? `<span>${emptyText}</span>` : ""}`;
  return lines
    .map((line) => `
      <div class="promo-rate-line">
        <strong>${fmt(line.price)}</strong>
        <span>${line.note}</span>
        ${badgeForLine ? badgeForLine(line) : ""}
      </div>
    `)
    .join("");
}

function hasNonRefundableVisibilityWindow(channel) {
  const name = String(channel?.name || channel?.label || "").toLowerCase();
  if (!name) return false;
  if (name.includes("easyconsulting")) return false;
  if (name.includes("sito")) return false;
  if (name.includes("site")) return false;
  return true;
}

function getNonRefundableVisibility(channel, dateStr) {
  if (!hasNonRefundableVisibilityWindow(channel)) return { visible: true, note: "non rimb." };
  const days = daysUntil(dateStr);
  if (days < 2) {
    return {
      visible: false,
      label: "NOT REF VISIBILE DOPO 48H",
      note: "",
    };
  }
  return { visible: true, note: "anticipo oltre 48h" };
}

function channelBaseRate(channel, flexRate, dateStr) {
  const visibility = getNonRefundableVisibility(channel, dateStr);
  return {
    base: visibility.visible ? nonRefundableRate(flexRate) : flexRate,
    label: visibility.visible ? "non rimb." : "flex",
    note: visibility.note,
  };
}

function semKey(ota, site) {
  const d = ((ota - site) / site) * 100;
  if (d > 10) return "green";
  if (d > 0) return "amber";
  return "red";
}

function pctDelta(value, base) {
  if (!base) return 0;
  return ((value - base) / base) * 100;
}

function fmtPct(value) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

function competitiveBadge(value, base) {
  const key = semKey(value, base);
  return `<span class="competitive ${key}">Competitivo ${fmtPct(pctDelta(value, base))} VS SITO</span>`;
}

function siteCompetitiveBadge(competitorValue, siteValue, competitorLabel) {
  if (competitorValue == null || siteValue == null) return "";
  const delta = pctDelta(competitorValue, siteValue);
  const key = semKey(competitorValue, siteValue);
  const label = delta > 0 ? "Competitivo" : "Non competitivo";
  return `<span class="competitive ${key}">${label} ${fmtPct(delta)} VS ${competitorLabel.toUpperCase()}</span>`;
}

function sitePromoCheck(promo, dateStr) {
  if (promo?.on === false) return { ok: false, msg: "Non attiva" };
  if (promo?.dates?.length && !inRange(dateStr, promo.dates)) return { ok: false, msg: "Fuori periodo" };
  if (!promo?.dates?.length && dateStr > UNDATED_PROMO_VISIBILITY_END) return { ok: false, msg: "Promo non caricata" };
  if (!promo?.condition && !promo?.noWeekend) return { ok: true };
  const arr = dateToLocalMidnight(dateStr);
  const days = daysUntil(dateStr);
  const dow = arr.getDay();
  if (promo.noWeekend && (dow === 5 || dow === 6)) return { ok: false, msg: "Non ven/sab" };
  const cond = promo.condition;
  if (cond === "last_minute" && (days < 0 || days > 1)) return { ok: false, msg: "Solo entro 24h" };
  if (cond === "early_bird" && days < 30) return { ok: false, msg: "Solo 30+ giorni prima" };
  if (cond === "weekend" && ![0, 5, 6].includes(dow)) return { ok: false, msg: "Solo ven/sab/dom" };
  if (cond === "three_nights") return { ok: true };
  return { ok: true };
}

function getActiveSitePromo(prop, dateStr = state.selectedDate) {
  return prop.sitePromos.find((p) => sitePromoCheck(p, dateStr).ok);
}

function getCalendarSitePromos(prop, dateStr) {
  if (isPropertyClosed(prop, dateStr)) return [];
  return prop.sitePromos.filter((promo) => sitePromoCheck(promo, dateStr).ok);
}

function getCalendarChannelPromos(prop, channel, dateStr) {
  if (isPropertyClosed(prop, dateStr) || !channel) return [];
  const calendarChannel = autoActivate([channel], dateStr)[0];
  return resolvePromos(calendarChannel.promos).effective;
}

function dateStr(year, monthIndex, day) {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatItalianDate(dateStrValue) {
  const [yyyy, mm, dd] = dateStrValue.split("-");
  return `${dd}/${mm}/${yyyy}`;
}

function importDateRangeLabel(importedRows) {
  const dates = Object.keys(importedRows || {}).sort();
  if (!dates.length) return "";
  const first = formatItalianDate(dates[0]);
  const last = formatItalianDate(dates[dates.length - 1]);
  return first === last ? `giorno ${first}` : `dal ${first} al ${last}`;
}

function corporateSeason(dateStrValue) {
  const [, mm, dd] = dateStrValue.split("-").map(Number);
  const isLow = mm === 11 || mm === 12 || mm === 1 || (mm === 2 && dd <= 28) || mm === 7 || mm === 8;
  return isLow ? "low" : "high";
}

function corporateSeasonLabel(season) {
  return season === "low" ? "BASSA" : "ALTA";
}

function mondayStartBlankCount(year, monthIndex) {
  const jsDay = new Date(year, monthIndex, 1).getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

function getCalendarChannels(prop) {
  return [{ id: "site", name: "Sito Ufficiale" }].concat(prop.channels.map((ch) => ({ id: ch.id, name: ch.name })));
}

function promoCode(promo) {
  const label = promo.l.toLowerCase();
  if (label.includes("alta stagione")) return `AS ${promo.p}`;
  if (label.includes("bassa stagione")) return `BS ${promo.p}`;
  if (label.includes("opaque") || label.includes("package")) return `PK ${promo.p}`;
  if (label.includes("sconto")) return `SC ${promo.p}`;
  if (label.includes("getaway")) return `GD ${promo.p}`;
  if (label.includes("early")) return `EB ${promo.p}`;
  if (label.includes("last")) return `LM ${promo.p}`;
  if (label.includes("weekend")) return `WE ${promo.p}`;
  if (label.includes("basic")) return `BD ${promo.p}`;
  if (label.includes("genius")) return `G ${promo.p}`;
  if (label.includes("mobile")) return `M ${promo.p}`;
  if (label.includes("prenota")) return `PP ${promo.p}`;
  if (label.includes("country") || label.includes("eea") || label.includes("paese")) return `C ${promo.p}`;
  if (label.includes("48h") || label.includes("deep")) return `48 ${promo.p}`;
  return `${promo.l.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase()} ${promo.p}`;
}

function promoStyle(promo) {
  const label = promo.l.toLowerCase();
  if (label.includes("alta stagione") || label.includes("sconto 20")) return "background:#ea580c;color:#fff";
  if (label.includes("bassa stagione") || label.includes("sconto 25")) return "background:#0f766e;color:#fff";
  if (label.includes("opaque") || label.includes("package")) return "background:#4f46e5;color:#fff";
  if (label.includes("sconto")) return "background:#0891b2;color:#fff";
  if (label.includes("last")) return "background:#facc15;color:#713f12";
  if (label.includes("weekend")) return "background:#2563eb;color:#fff";
  if (label.includes("early")) return "background:#db2777;color:#fff";
  if (label.includes("getaway")) return "background:#16a34a;color:#fff";
  if (label.includes("basic")) return "background:#7c3aed;color:#fff";
  return "background:#0891b2;color:#fff";
}

function availabilityBadge(n) {
  if (n == null) return null;
  if (n <= 0) return { label: "GOAL 100%", bg: "#dcfce7", color: "#166534" };
  if (n <= 2) return { label: `${n}`, bg: "#fee2e2", color: "#991b1b" };
  if (n <= 5) return { label: `${n}`, bg: "#fef3c7", color: "#92530a" };
  return { label: `${n}`, bg: "#dcfce7", color: "#2d6a0f" };
}

function getAvailability(propId, roomId, date) {
  if (propId === "pineta" && PP_IDX[roomId] != null) return PP_AVAIL[date]?.[PP_IDX[roomId]] ?? null;
  if (propId === "laville" && LV_IDX[roomId] != null) {
    const cleanRow = normalizeAvailabilityRow(LV_AVAIL[date]);
    return cleanRow?.[LV_IDX[roomId]] ?? null;
  }
  return null;
}

function isPropertyClosed(prop, date) {
  const values = prop.rooms
    .map((room) => getAvailability(prop.id, room.id, date))
    .filter((value) => value != null);
  return values.length > 0 && values.every((value) => value <= 0);
}

function isCalendarDateSoldOut(prop, date) {
  const selectedRoom = getSelectedRoom(prop);
  const selectedAvailability = selectedRoom ? getAvailability(prop.id, selectedRoom.id, date) : getAggregateAvailability(prop, date);
  if (selectedAvailability != null) return selectedAvailability <= 0;
  return isPropertyClosed(prop, date);
}

function isRateNotLoaded(prop, date) {
  if (PMS_RATES[prop.id]) return !getPmsRateRow(prop, date);
  return getOperationalRate(prop, date) == null;
}

function init() {
  loadStoredImportData();
  state.data = state.data.map((p) => ({ ...p, channels: autoActivate(p.channels, state.selectedDate) }));
  ensureOperatorContacts();
  state.selectedRoomId = null;
  ensureStrategyPeriodToday();
  refreshOperationalRate(state.data[0], state.selectedDate, state.occupancy);
  syncStrategyBaseRate();
  render();
}

function currentProp() {
  return state.data[state.curIdx] || state.data[0];
}

function getChannelDiffPercent(prop, channel) {
  const channelDiff = Number(channel?.diff);
  if (Number.isFinite(channelDiff)) return channelDiff;
  const legacyDiff = Number(prop?.diff);
  return Number.isFinite(legacyDiff) ? legacyDiff : 0;
}

function getChannelMultiplier(prop, channel) {
  return 1 + (getChannelDiffPercent(prop, channel) / 100);
}

function setDate(date) {
  state.selectedDate = date;
  state.datePickerOpen = false;
  state.data = state.data.map((p) => ({ ...p, channels: autoActivate(p.channels, date) }));
  refreshOperationalRate(currentProp(), date, state.occupancy);
  syncStrategyBaseRate();
  render();
}

function openDatePicker() {
  const [year, month] = state.selectedDate.split("-").map(Number);
  state.datePickerYear = year;
  state.datePickerMonth = month - 1;
  state.datePickerOpen = !state.datePickerOpen;
  render();
}

function moveDatePickerMonth(delta) {
  const d = new Date(state.datePickerYear, state.datePickerMonth + delta, 1);
  state.datePickerYear = d.getFullYear();
  state.datePickerMonth = d.getMonth();
  state.datePickerOpen = true;
  render();
}

function setProperty(index) {
  state.curIdx = index;
  state.selectedRoomId = null;
  refreshOperationalRate(currentProp(), state.selectedDate, state.occupancy);
  syncStrategyBaseRate();
  render();
}

function setOccupancy(occupancy) {
  state.occupancy = occupancy;
  const prop = currentProp();
  if (occupancy === "dus" && state.selectedRoomId && !supportsDus(prop.id, state.selectedRoomId)) {
    state.selectedRoomId = null;
  }
  refreshOperationalRate(currentProp(), state.selectedDate, occupancy);
  syncStrategyBaseRate();
  render();
}

function setSelectedRoom(roomId) {
  state.selectedRoomId = roomId || null;
  refreshOperationalRate(currentProp(), state.selectedDate, state.occupancy);
  syncStrategyBaseRate();
  render();
}

function syncStrategyBaseRate(date = state.selectedDate) {
  const rate = getOperationalRate(currentProp(), date, state.occupancy);
  state.strategy.baseRate = rate != null ? String(rate) : "";
}

function updateCurrent(fn) {
  const data = clone(state.data);
  data[state.curIdx] = fn(data[state.curIdx]);
  state.data = data;
  render();
}

function toggleSitePromo(index) {
  updateCurrent((p) => ({
    ...p,
    sitePromos: p.sitePromos.map((sp, j) => ({ ...sp, on: j === index ? !sp.on : false })),
  }));
}

function togglePromo(channelId, index, confirmed = false) {
  const ch = currentProp().channels.find((item) => item.id === channelId);
  const promo = ch?.promos[index];
  if (promo?.locked) return;
  const deepTurningOnNow = promo?.type === "deep" && !promo.on;
  if (deepTurningOnNow) addDeepDealReminder(channelId, state.selectedDate);
  updateCurrent((p) => ({
    ...p,
    channels: p.channels.map((ch) => {
      if (ch.id !== channelId) return ch;
      const pr = ch.promos[index];
      const deepTurningOn = pr.type === "deep" && !pr.on;
      return {
        ...ch,
        promos: ch.promos.map((promo, j) => {
          if (deepTurningOn && j !== index && promo.type !== "paese" && !promo.locked) return { ...promo, on: false, autoDate: false };
          return j === index ? { ...promo, on: !promo.on, autoDate: false } : promo;
        }),
      };
    }),
  }));
}

function toggleCountry(channelId, index, confirmed = false) {
  const ch = currentProp().channels.find((item) => item.id === channelId);
  const promo = index === -1 ? null : ch?.promos[index];
  const activeCountry = ch?.promos.find((item) => item.type === "paese" && item.on);
  updateCurrent((p) => ({
    ...p,
    channels: p.channels.map((ch) => {
      if (ch.id !== channelId) return ch;
      const activating = index !== -1 && !ch.promos[index].on;
      const compatible = ["genius", "base", "lastminute", "prenota", "mobile", "none", null, undefined];
      return {
        ...ch,
        promos: ch.promos.map((promo, j) => {
          if (promo.type === "paese") {
            if (index === -1) return { ...promo, on: false, autoDate: false };
            return { ...promo, on: j === index ? !promo.on : false, autoDate: false };
          }
          if (activating && !compatible.includes(promo.type)) return { ...promo, on: false, autoDate: false };
          return promo;
        }),
      };
    }),
  }));
}

function confirmDeactivate() {
  const pending = state.pendingConfirm;
  state.pendingConfirm = null;
  if (!pending) {
    render();
    return;
  }
  if (pending.kind === "site") toggleSitePromo(pending.index);
  if (pending.kind === "promo") togglePromo(pending.channelId, pending.index, true);
  if (pending.kind === "country") toggleCountry(pending.channelId, pending.index, true);
}

function cancelDeactivate() {
  state.pendingConfirm = null;
  render();
}

function addChannel() {
  updateCurrent((p) => ({
    ...p,
    channels: [...p.channels, { id: crypto.randomUUID(), name: "Nuovo canale", comm: 18, diff: Number(p.diff) || 0, promos: [] }],
  }));
}

function addRoom() {
  updateCurrent((p) => ({
    ...p,
    rooms: [...p.rooms, { id: crypto.randomUUID(), name: "Nuova categoria", delta: 15, base: false, availability: 4 }],
  }));
}

function addPromo(channelId) {
  updateCurrent((p) => ({
    ...p,
    channels: p.channels.map((ch) =>
      ch.id === channelId
        ? { ...ch, promos: [...ch.promos, { l: "Nuova promo", p: 10, on: false, type: ch.name === "Booking.com" ? "base" : "none" }] }
        : ch,
    ),
  }));
}

function stat(label, value, note, cls = "") {
  return `<div class="stat ${cls}"><small>${label}</small><strong>${value}</strong><div class="mini">${note}</div></div>`;
}

function renderPmsSourceBadge(prop) {
  const row = getPmsRateRow(prop, state.selectedDate);
  if (!row) return `<div class="source-meta"><span class="source-badge missing">Fonte manuale/fallback</span></div>`;
  const source = propertySourceSystems(prop.id);
  return `
    <div class="source-meta">
      <span class="source-badge">PMS: ${escapeHtml(source.pms)}</span>
      <span class="source-badge">Channel: ${escapeHtml(source.channelManager)}</span>
      <span class="source-upload">Ultimo caricamento ${state.importer.lastUpload}</span>
    </div>
  `;
}

function exploreContextKey(prop = currentProp(), date = state.selectedDate) {
  const room = getSelectedRoom(prop)?.id || "all";
  return `${prop.id}:${date}:${state.occupancy}:${room}`;
}

function markExplorePriceChange(note = "") {
  const key = exploreContextKey();
  state.explore.priceChanges = {
    ...(state.explore.priceChanges || {}),
    [key]: {
      at: new Date().toISOString(),
      by: state.explore.lastModifiedBy || "Utente",
      note,
    },
  };
  saveStoredImportData();
}

function getExploreLastModified(prop = currentProp()) {
  const key = exploreContextKey(prop);
  return state.explore.priceChanges?.[key] || null;
}

function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function exploreRateBenchmark(prop = currentProp(), room = getCalendarReferenceRoom(prop)) {
  if (!room || !PMS_RATES[prop.id]) return null;
  const values = Object.entries(PMS_RATES[prop.id])
    .map(([date, row]) => getRoomRate(prop.id, room.id, date, state.occupancy))
    .filter((value) => Number.isFinite(value));
  if (!values.length) return null;
  return {
    median: median(values),
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

function explorePriceAlert(prop = currentProp(), rate = state.sito) {
  const room = getCalendarReferenceRoom(prop);
  const bench = exploreRateBenchmark(prop, room);
  if (!bench || !Number.isFinite(rate)) {
    return {
      cls: "price-alert--info",
      icon: "i",
      text: "Benchmark non disponibile per questa camera.",
    };
  }
  const lowThreshold = bench.median * 0.85;
  const highThreshold = bench.median * 1.2;
  if (rate < lowThreshold) {
    return {
      cls: "price-alert--warning",
      icon: "!",
      text: `Prezzo sotto media (${fmt(rate)} vs mediana ${fmt(bench.median)}).`,
    };
  }
  if (rate > highThreshold) {
    return {
      cls: "price-alert--danger",
      icon: "!",
      text: `Prezzo sopra media (${fmt(rate)} vs mediana ${fmt(bench.median)}).`,
    };
  }
  return {
    cls: "price-alert--ok",
    icon: "OK",
    text: `Prezzo in fascia obiettivo (mediana ${fmt(bench.median)}).`,
  };
}

function getExploreComparisonRooms(prop = currentProp()) {
  const available = getSelectableRooms(prop);
  const requested = (state.explore.compareRoomIds || []).filter((roomId) => available.some((room) => room.id === roomId));
  const filled = [...requested];
  available.forEach((room) => {
    if (filled.length < 3 && !filled.includes(room.id)) filled.push(room.id);
  });
  return filled.slice(0, 3);
}

function exploreComparisonRow(prop, roomId) {
  const room = prop.rooms.find((item) => item.id === roomId);
  if (!room) return null;
  const price = getRoomRate(prop.id, room.id, state.selectedDate, state.occupancy);
  const availability = getAvailability(prop.id, room.id, state.selectedDate);
  const ref = state.sito || 0;
  const delta = price == null || !ref ? null : pctDelta(price, ref);
  const status = availability == null
    ? { cls: "info", text: "Disponibilita non caricata" }
    : availability <= 0
      ? { cls: "info", text: "Goal 100% raggiunto" }
      : delta != null && delta > 20
        ? { cls: "warning", text: "Sopra camera selezionata" }
        : delta != null && delta < -15
          ? { cls: "danger", text: "Sotto camera selezionata" }
          : { cls: "", text: "In equilibrio" };
  return {
    room,
    price,
    availability,
    delta,
    status,
  };
}

function buildExploreExportPayload(prop = currentProp()) {
  const room = getSelectedRoom(prop);
  const compareRows = getExploreComparisonRooms(prop)
    .map((roomId) => exploreComparisonRow(prop, roomId))
    .filter(Boolean)
    .map((row) => ({
      room: row.room.name,
      price: row.price,
      availability: row.availability,
      deltaPct: row.delta == null ? null : Number(row.delta.toFixed(1)),
      status: row.status.text,
    }));
  const last = getExploreLastModified(prop);
  return {
    hotel: prop.label,
    date: state.selectedDate,
    occupancy: state.occupancy,
    room: room ? room.name : "camera non selezionata",
    siteRate: state.sito,
    compare: compareRows,
    lastModified: last
      ? { by: last.by, at: last.at, note: last.note }
      : null,
  };
}

function downloadTextFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function exportExplore(format, prop = currentProp()) {
  const payload = buildExploreExportPayload(prop);
  const date = state.selectedDate;
  if (format === "json") {
    downloadTextFile(`prisma-esplorazione-${prop.id}-${date}.json`, JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
    return;
  }
  const rows = [
    ["Hotel", payload.hotel],
    ["Data", payload.date],
    ["Occupazione", payload.occupancy],
    ["Camera", payload.room],
    ["Tariffa sito", payload.siteRate],
    ["Ultima modifica", payload.lastModified?.at || ""],
    ["Modificato da", payload.lastModified?.by || ""],
  ];
  const compareHeader = ["Camera confronto", "Prezzo", "Disponibilita", "Delta %", "Stato"];
  const compareRows = payload.compare.map((row) => [row.room, row.price ?? "", row.availability ?? "", row.deltaPct ?? "", row.status]);
  const csv = [
    rows.map((row) => row.map((value) => `"${String(value ?? "").replace(/"/g, "\"\"")}"`).join(",")).join("\n"),
    compareRows.length ? [compareHeader, ...compareRows].map((row) => row.map((value) => `"${String(value ?? "").replace(/"/g, "\"\"")}"`).join(",")).join("\n") : "",
  ].filter(Boolean).join("\n\n");
  downloadTextFile(`prisma-esplorazione-${prop.id}-${date}.csv`, csv, "text/csv;charset=utf-8");
}

function renderExploreEnhancements(prop) {
  return '';
}

function renderSiteBlock(prop) {
  const validSitePromos = getCalendarSitePromos(prop, state.selectedDate);
  const selectedRoom = getSelectedRoom(prop);
  const roomOptions = getSelectableRooms(prop);
  const placeholderSelected = selectedRoom ? "" : "selected";
  const placeholderLabel = state.occupancy === "dus" ? "Seleziona camera Dus" : "Seleziona camera Dbl";
  const roomOptionMarkup = `<option value="" ${placeholderSelected}></option>` + roomOptions.map((room) => {
    const availability = getAvailability(prop.id, room.id, state.selectedDate);
    const badge = availabilityBadge(availability);
    const statusClass = availability == null ? "room-option-missing" : availability > 0 ? "room-option-open" : "room-option-closed";
    const statusStyle = availability == null
      ? "background:#f1f5f9;color:#64748b;"
      : availability > 0
        ? "background:#dcfce7;color:#166534;"
        : "background:#fee2e2;color:#991b1b;";
    return `<option class="${statusClass}" style="${statusStyle}" value="${escapeHtml(room.id)}" ${selectedRoom?.id === room.id ? "selected" : ""}>${escapeHtml(roomSelectLabel(prop, room))} - ${escapeHtml(badge ? badge.label : "n/d")}</option>`;
  }).join("");
  const selectedAvailability = selectedRoom ? getAvailability(prop.id, selectedRoom.id, state.selectedDate) : getAggregateAvailability(prop);
  const selectedBadge = availabilityBadge(selectedAvailability);
  const siteFlex = state.sito;
  const siteNonRef = nonRefundableRate(siteFlex);
  const flexPromoLines = sitePromoRateLines(siteFlex, validSitePromos, "flex");
  const notRefPromoLines = sitePromoRateLines(siteFlex, validSitePromos, "notref");
  const booking = prop.channels.find((ch) => ch.name === "Booking.com");
  const bookingLabel = booking?.name || "OTA";
  const bookingEffective = booking ? resolvePromos(booking.promos).effective : [];
  const bookingMultiplier = getChannelMultiplier(prop, booking);
  const bookingFlexVisible = booking ? cmpd(siteFlex * bookingMultiplier, bookingEffective) : null;
  const bookingNonRefVisibility = getNonRefundableVisibility(booking, state.selectedDate);
  const bookingNonRefVisible = booking && bookingNonRefVisibility.visible ? cmpd(siteNonRef * bookingMultiplier, bookingEffective) : null;
  const showSiteBadgesOnBase = !validSitePromos.length;
  const flexPromoBadge = (line) => siteCompetitiveBadge(bookingFlexVisible, line.price, bookingLabel);
  const notRefPromoBadge = (line) => siteCompetitiveBadge(bookingNonRefVisible ?? bookingFlexVisible, line.price, bookingLabel);
  return `
    <section class="panel">
      <h2>Sito Ufficiale</h2>
      <div class="segmented-control site-occupancy" aria-label="Occupazione tariffa">
        <button class="${state.occupancy === "double" ? "active" : ""}" data-action="occupancy" data-occupancy="double">Dbl</button>
        <button class="${state.occupancy === "dus" ? "active" : ""}" data-action="occupancy" data-occupancy="dus">Dus</button>
      </div>
      <label class="field">
        Camera
        <select class="room-select ${selectedRoom ? "" : "is-placeholder"}" aria-label="${escapeHtml(placeholderLabel)}" data-action="room-select">${roomOptionMarkup}</select>
      </label>
      <div class="availability-panel ${selectedAvailability === 0 ? "closed" : ""}">
        <span>${selectedRoom ? "Disponibilita" : "Disponibilita totale"}</span>
        <strong>${selectedBadge ? selectedBadge.label : "n/d"}</strong>
      </div>
      <label class="field">
        <input class="rate-input" type="number" min="1" value="${siteFlex}" data-action="site-rate" />
      </label>
      <div class="rate-matrix site-matrix">
        <div class="matrix-head"></div>
        <div class="matrix-head">FLEX</div>
        <div class="matrix-head">NOT REF</div>
        <div class="matrix-label">Tariffa sito</div>
        <div class="matrix-cell">
          <strong>${fmt(siteFlex)}</strong>
          <span>tariffa cancellabile</span>
          ${showSiteBadgesOnBase ? siteCompetitiveBadge(bookingFlexVisible, siteFlex, bookingLabel) : ""}
        </div>
        <div class="matrix-cell">
          <strong>${fmt(siteNonRef)}</strong>
          <span>-${NON_REF_DISCOUNT}%</span>
          ${showSiteBadgesOnBase ? siteCompetitiveBadge(bookingNonRefVisible ?? bookingFlexVisible, siteNonRef, bookingLabel) : ""}
        </div>
        <div class="matrix-label">TARIFFA CON PROMO</div>
        <div class="matrix-cell ${flexPromoLines.length ? "promo-list-cell" : "muted-cell"}">
          ${renderSitePromoRateLines(flexPromoLines, "", flexPromoBadge)}
        </div>
        <div class="matrix-cell promo-list-cell">
          ${renderSitePromoRateLines(notRefPromoLines, `NOT REF ${NON_REF_DISCOUNT}%`, notRefPromoBadge)}
        </div>
      </div>
      <div class="mini" style="margin-bottom:6px">Promo sito</div>
      <div class="chipbar">
        ${validSitePromos.length ? validSitePromos.map((p) => `<span class="chip on inert" title="${escapeHtml(p.note || "")}">${escapeHtml(p.l)} ${escapeHtml(p.p)}%</span>`).join("") : `<div class="empty compact">Nessuna promo attiva</div>`}
      </div>
      ${renderExploreEnhancements(prop)}
      ${renderCorporateSummary(prop, siteFlex)}
    </section>
  `;
}

function bookingVisibleClientRate(prop, baseRate = state.sito) {
  const booking = prop.channels.find((ch) => ch.name === "Booking.com");
  if (!booking || !baseRate) return null;
  const multiplier = getChannelMultiplier(prop, booking);
  const { effective } = resolvePromos(booking.promos);
  const flexVisible = cmpd(baseRate * multiplier, effective);
  const visibility = getNonRefundableVisibility(booking, state.selectedDate);
  const notRefVisible = visibility.visible ? cmpd(nonRefundableRate(baseRate) * multiplier, effective) : null;
  return Math.min(...[flexVisible, notRefVisible].filter((value) => value != null));
}

function bookingFlexClientRate(prop, baseRate = state.sito) {
  const booking = prop.channels.find((ch) => ch.name === "Booking.com");
  if (!booking || !baseRate) return null;
  const multiplier = getChannelMultiplier(prop, booking);
  const { effective } = resolvePromos(booking.promos);
  return cmpd(baseRate * multiplier, effective);
}

function siteVisibleClientRate(prop, baseRate = state.sito) {
  if (!baseRate) return null;
  const promos = getCalendarSitePromos(prop, state.selectedDate);
  const flexLines = sitePromoRateLines(baseRate, promos, "flex").map((line) => line.price);
  const notRefLines = sitePromoRateLines(baseRate, promos, "notref").map((line) => line.price);
  return Math.min(baseRate, nonRefundableRate(baseRate), ...flexLines, ...notRefLines);
}

function renderCorporateSummary(prop, siteFlex) {
  if (prop.id !== "laville") return "";
  const season = corporateSeason(state.selectedDate);
  const activeKey = season === "low" ? (state.occupancy === "dus" ? "lowDus" : "lowDbl") : (state.occupancy === "dus" ? "highDus" : "highDbl");
  const activeLabel = state.occupancy === "dus" ? "Dus" : "Dbl";
  const bookingFlex = bookingFlexClientRate(prop, siteFlex);
  const grouped = new Map();
  LAVILLE_CORPORATE_RATES.forEach((row) => {
    const rate = row[activeKey];
    if (!grouped.has(rate)) grouped.set(rate, []);
    grouped.get(rate).push(row.company);
  });
  const cards = [...grouped.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([rate, companies]) => {
      const siteRisk = siteFlex != null && siteFlex < rate;
      const bookingRisk = bookingFlex != null && bookingFlex < rate;
      const statusClass = siteRisk || bookingRisk ? "risk" : "ok";
      const statusText = [
        siteRisk ? `Non competitivo +${fmt(rate - siteFlex).replace("EUR ", "")} VS SITO` : "",
        bookingRisk ? `Non competitivo +${fmt(rate - bookingFlex).replace("EUR ", "")} VS BOOKING` : "",
      ].filter(Boolean).join(" + ") || (siteFlex == null ? "n/d" : `Competitivo ${fmtPct(pctDelta(siteFlex, rate))} VS SITO`);
      return `
        <div class="corporate-group ${statusClass}">
          <div class="corporate-group-rate">
            <span>${fmt(rate)}</span>
            <strong>${statusText}</strong>
          </div>
          <div class="corporate-group-companies">${companies.map((company) => `<span>${escapeHtml(company)}</span>`).join("")}</div>
        </div>
      `;
    }).join("");
  return `
    <div class="corporate-inline">
      <div class="corporate-inline-head">
        <div>
          <strong>Convenzionati</strong>
          <span>BB FLEX · ${corporateSeasonLabel(season)} · ${activeLabel}</span>
        </div>
      </div>
      <div class="corporate-groups">${cards}</div>
    </div>
  `;
}

function renderCorporateRates(prop) {
  if (prop.id !== "laville") return "";
  const season = corporateSeason(state.selectedDate);
  const activeKey = season === "low" ? (state.occupancy === "dus" ? "lowDus" : "lowDbl") : (state.occupancy === "dus" ? "highDus" : "highDbl");
  const activeLabel = state.occupancy === "dus" ? "Dus" : "Dbl";
  const siteVisible = siteVisibleClientRate(prop);
  const bookingVisible = bookingVisibleClientRate(prop);
  const rows = LAVILLE_CORPORATE_RATES.map((row) => {
    const activeRate = row[activeKey];
    const siteRisk = siteVisible != null && activeRate > siteVisible;
    const bookingRisk = bookingVisible != null && activeRate > bookingVisible;
    const isTooHigh = siteRisk || bookingRisk;
    const siteDelta = siteVisible == null ? null : activeRate - siteVisible;
    const bookingDelta = bookingVisible == null ? null : activeRate - bookingVisible;
    const check = [
      siteRisk ? `<span class="corporate-check risk">Sopra sito +${fmt(siteDelta).replace("EUR ", "")}</span>` : "",
      bookingRisk ? `<span class="corporate-check risk">Sopra Booking +${fmt(bookingDelta).replace("EUR ", "")}</span>` : "",
    ].filter(Boolean).join("");
    return `
      <tr class="${isTooHigh ? "corporate-risk-row" : ""}">
        <td><strong>${escapeHtml(row.company)}</strong></td>
        <td class="${season === "low" ? "active-season" : ""}">${fmt(row.lowDus)}</td>
        <td class="${season === "low" ? "active-season" : ""}">${fmt(row.lowDbl)}</td>
        <td class="${season === "high" ? "active-season" : ""}">${fmt(row.highDus)}</td>
        <td class="${season === "high" ? "active-season" : ""}">${fmt(row.highDbl)}</td>
        <td><strong>${fmt(activeRate)}</strong></td>
        <td>${siteVisible == null ? "n/d" : fmt(siteVisible)}</td>
        <td>${bookingVisible == null ? "n/d" : fmt(bookingVisible)}</td>
        <td>${check || `<span class="corporate-check ok">OK</span>`}</td>
      </tr>
    `;
  }).join("");
  return `
    <section class="panel corporate-panel" style="grid-column:1 / -1">
      <div class="channel-head">
        <div>
          <h2>Convenzionati La Ville</h2>
          <div class="mini">Fonte: file Valentina · stagione attiva ${corporateSeasonLabel(season)} · vista ${activeLabel} · sito ${siteVisible == null ? "n/d" : fmt(siteVisible)} · Booking ${bookingVisible == null ? "n/d" : fmt(bookingVisible)}</div>
        </div>
        <span class="source-badge">${corporateSeasonLabel(season)}</span>
      </div>
      <div class="corporate-note">Bassa: novembre-28 febbraio + luglio-agosto. Alta: 1 marzo-31 ottobre, esclusi luglio e agosto. Il convenzionato deve restare uguale o sotto la tariffa cliente piu bassa visibile su sito e Booking.</div>
      <div class="rooms corporate-table">
        <table>
          <thead>
            <tr>
              <th>Azienda</th>
              <th>Bassa Dus</th>
              <th>Bassa Dbl</th>
              <th>Alta Dus</th>
              <th>Alta Dbl</th>
              <th>Attiva</th>
              <th>Sito cliente</th>
              <th>Booking cliente</th>
              <th>Check</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderRooms(prop) {
  if (!prop.rooms.length && !state.editing) return "";
  const channelHeads = prop.channels.map((ch) => `<th>${ch.name}</th>`).join("");
  const activePromo = getActiveSitePromo(prop);
  const money = (value) => fmt(value).toLowerCase();
  const rows = prop.rooms.map((room) => {
    const roomBaseRate = getRoomRate(prop.id, room.id, state.selectedDate) ?? state.sito + room.delta;
    const roomDusRate = getRoomRate(prop.id, room.id, state.selectedDate, "dus");
    const canShowDus = hasDusRate(prop.id, room.id);
    const roomFlexRate = roomBaseRate;
    const rs = siteSellRate(roomFlexRate, activePromo);
    const dateAvailability = getAvailability(prop.id, room.id, state.selectedDate);
    const badge = availabilityBadge(dateAvailability);
    const isClosed = dateAvailability === 0;
    const isOpen = dateAvailability != null && dateAvailability > 0;
    const cells = prop.channels.map((ch) => {
      const { effective } = resolvePromos(ch.promos);
      const multiplier = getChannelMultiplier(prop, ch);
      const dusPub = canShowDus ? roomDusRate * multiplier : null;
      const flexPub = roomFlexRate * multiplier;
      const nonRefPub = nonRefundableRate(roomFlexRate) * multiplier;
      const dusPrice = dusPub == null ? null : cmpd(dusPub, effective);
      const flexPrice = cmpd(flexPub, effective);
      const nonRefPrice = cmpd(nonRefPub, effective);
      const s = semKey(nonRefPrice, rs);
      return `<td>
        <span class="dot" style="background:${isClosed ? "#b91c1c" : s === "green" ? "#2d6a0f" : s === "amber" ? "#92530a" : "#991b1b"}"></span>
        <div class="rate-stack ota-room-stack">
          ${dusPrice == null ? "" : `<div class="room-rate-line dus-line"><span>dus</span><strong>${money(dusPrice)}</strong></div>`}
          <div class="room-rate-line"><span>flex</span><strong>${money(flexPrice)}</strong></div>
          <div class="room-rate-line nonref-line"><span>not ref</span><strong>${money(nonRefPrice)}</strong></div>
        </div>
      </td>`;
    }).join("");
    return `<tr class="room-row ${isClosed ? "closed" : isOpen ? "open" : ""}">
      <td>${room.name}${room.base ? ' <span class="mini">(base)</span>' : ` <span class="mini">${room.delta > 0 ? "+" : ""}${room.delta}</span>`}${badge ? `<span class="badge" style="background:${badge.bg};color:${badge.color}">${badge.label}</span>` : ""}</td>
      <td class="site-cell">
        <div class="rate-stack">
          ${canShowDus ? `<div class="room-rate-line dus-line"><span>dus</span><strong>${money(roomDusRate)}</strong></div>` : ""}
          <div class="room-rate-line"><span>flex</span><strong>${money(roomFlexRate)}</strong></div>
          <div class="room-rate-line nonref-line"><span>not ref</span><strong>${money(rs)}</strong></div>
        </div>
      </td>
      ${cells}
    </tr>`;
  }).join("");
  return `
    <section class="panel" style="grid-column:1 / -1">
      <div class="channel-head">
        <div>
          <h2>Tariffe per tipologia camera</h2>
          ${renderPmsSourceBadge(prop)}
        </div>
        ${state.editing ? '<button class="ghost" data-action="add-room">+ categoria</button>' : ""}
      </div>
      <div class="rooms">
        <table>
          <thead><tr><th>Categoria</th><th>Sito</th>${channelHeads}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderClosedDate(prop) {
  const closedRooms = prop.rooms.filter((room) => getAvailability(prop.id, room.id, state.selectedDate) === 0);
  return `
    <section class="panel" style="grid-column:1 / -1">
      <h2>Data non disponibile</h2>
      <div class="notice" style="margin:0 0 12px">
        <div style="font-size:18px">!</div>
        <div>
          <strong>${prop.label} non ha disponibilità il ${formatItalianDate(state.selectedDate)}</strong>
        </div>
      </div>
      <div class="chipbar">
        ${closedRooms.map((room) => `<span class="chip blocked">${room.name}: OBIETTIVO 100%</span>`).join("")}
      </div>
    </section>
  `;
}

function channelThemeClass(channelName) {
  const name = String(channelName || "").toLowerCase();
  if (name.includes("booking")) return "channel-booking";
  if (name.includes("expedia")) return "channel-expedia";
  if (name.includes("webbeds")) return "channel-webbeds";
  if (name.includes("hotelbeds")) return "channel-hotelbeds";
  if (name.includes("agoda")) return "channel-agoda";
  if (name.includes("arcadia")) return "channel-arcadia";
  if (name.includes("ctrip") || name.includes("trip.com")) return "channel-ctrip";
  if (name.includes("edreams")) return "channel-edreams";
  if (name.includes("italcamel")) return "channel-italcamel";
  if (name.includes("lastminute")) return "channel-lastminute";
  if (name.includes("hotusa")) return "channel-hotusa";
  if (name.includes("hrs")) return "channel-hrs";
  if (name.includes("hyperguest")) return "channel-hyperguest";
  if (name.includes("serhs")) return "channel-serhs";
  if (name.includes("sunhotels")) return "channel-sunhotels";
  if (name.includes("traveltino")) return "channel-traveltino";
  if (name.includes("xenia")) return "channel-xenia";
  return "channel-generic";
}

function renderChannel(ch, prop, siteWithPromo) {
  const siteFlex = state.sito;
  const diffPercent = getChannelDiffPercent(prop, ch);
  const multiplier = getChannelMultiplier(prop, ch);
  const channelBase = channelBaseRate(ch, siteFlex, state.selectedDate);
  const channelFlex = siteFlex * multiplier;
  const channelNonRef = nonRefundableRate(siteFlex) * multiplier;
  const { effective, shadowed } = resolvePromos(ch.promos);
  const flexVisible = cmpd(channelFlex, effective);
  const nonRefVisible = channelBase.label === "flex" ? null : cmpd(channelNonRef, effective);
  const flexNet = flexVisible * (1 - ch.comm / 100);
  const nonRefNet = nonRefVisible == null ? null : nonRefVisible * (1 - ch.comm / 100);
  const hiddenNonRefLabel = channelBase.note || "";
  const countryPromos = ch.promos.map((p, i) => ({ ...p, i })).filter((p) => p.type === "paese");
  const nonCountry = ch.promos.map((p, i) => ({ ...p, i })).filter((p) => p.type !== "paese");
  const paeseBlocked = effective.some((p) => p.type === "vacanze");
  const activeNonCountry = nonCountry.filter((p) => p.on && !shadowed.has(p.i));
  const activeCountryPromos = paeseBlocked ? [] : countryPromos.filter((p) => p.on && !shadowed.has(p.i));
  const activePromos = [...activeNonCountry, ...activeCountryPromos];
  const desc = effective.length ? effective.map((p) => `-${p.p}%`).join(" + ") : "Nessuna";
  const themeClass = channelThemeClass(ch.name);
  return `
    <article class="channel ${themeClass}">
      <div class="channel-head">
        <strong>${ch.name}</strong>
      </div>
      <div class="rate-matrix">
        <div class="matrix-head"></div>
        <div class="matrix-head">FLEX</div>
        <div class="matrix-head">NOT REF</div>
        <div class="matrix-label">Tariffa con differenziale ${diffPercent > 0 ? `(+${diffPercent}%)` : `(${diffPercent}%)`}</div>
        <div class="matrix-cell">
          <strong>${fmt(channelFlex)}</strong>
          <span>x${multiplier.toFixed(2)}</span>
        </div>
        <div class="matrix-cell">
          <strong>${fmt(channelNonRef)}</strong>
          <span>x${multiplier.toFixed(2)}</span>
        </div>
        <div class="matrix-label">TARIFFA CLIENTE (NO CITY TAX)</div>
        <div class="matrix-cell">
          <strong>${fmt(flexVisible)}</strong>
          <span>${desc}</span>
        </div>
        <div class="matrix-cell ${nonRefVisible == null ? "unavailable-cell" : ""}">
          ${nonRefVisible == null ? `<strong>NOT REF VISIBILE DOPO 48H</strong><span>${hiddenNonRefLabel}</span>` : `<strong>${fmt(nonRefVisible)}</strong><span>${desc}</span>`}
        </div>
        <div class="matrix-label">NETTO HOTEL</div>
        <div class="matrix-cell">
          <strong>${fmt(flexNet)}</strong>
          <span>-${ch.comm}% comm.</span>
        </div>
        <div class="matrix-cell ${nonRefNet == null ? "unavailable-cell" : ""}">
          ${nonRefNet == null ? `<strong>-</strong><span></span>` : `<strong>${fmt(nonRefNet)}</strong><span>-${ch.comm}% comm.</span>`}
        </div>
      </div>
      <div class="divider"></div>
      <div class="mini" style="margin-bottom:6px">Promozioni attive</div>
      ${activePromos.length ? `
        <div class="chipbar">
          ${activeNonCountry.map((p) => `<span class="chip on inert ${p.autoDate ? "auto" : ""}" title="${escapeHtml(TYPE_LABELS[p.type] || "")}">${escapeHtml(p.l)}${p.autoDate ? " auto" : ""}</span>`).join("")}
          ${activeCountryPromos.map((p) => `<span class="chip on inert">${escapeHtml(p.l)}${p.defaultPaese ? " (EU)" : ""} ${escapeHtml(p.p)}%</span>`).join("")}
        </div>
      ` : `<div class="empty compact">Nessuna promo attiva</div>`}
      ${state.editing ? `
        <div class="divider"></div>
        <div class="mini" style="margin-bottom:6px">Configurazione promo</div>
        <div class="chipbar">
          ${nonCountry.map((p) => `<button class="chip ${p.on && !shadowed.has(p.i) ? "on" : "available"} ${p.autoDate ? "auto" : ""} ${p.locked ? "locked" : ""}" ${p.locked ? "disabled" : ""} data-action="toggle-promo" data-channel="${escapeHtml(ch.id)}" data-index="${escapeHtml(p.i)}" title="${escapeHtml(p.locked ? "Promo fissa" : TYPE_LABELS[p.type] || "")}">${escapeHtml(p.l)}${p.autoDate ? " auto" : ""}${p.locked ? " fissa" : ""}</button>`).join("")}
          <button class="ghost" data-action="add-promo" data-channel="${ch.id}">+ promo</button>
        </div>
      ` : ""}
      ${state.editing && countryPromos.length ? `
        <div class="divider"></div>
        <div class="mini" style="margin-bottom:6px">Configurazione tariffe paese ${paeseBlocked ? " - escluse con Getaway" : ""}</div>
        <div class="chipbar">
          <button class="chip ${countryPromos.some((p) => p.on && !p.defaultPaese) ? "available" : "on"} ${paeseBlocked ? "blocked" : ""}" data-action="clear-country" data-channel="${ch.id}">Nessun paese 0%</button>
          ${countryPromos.map((p) => `<button class="chip ${p.on ? "on" : "available"} ${paeseBlocked ? "blocked" : ""}" data-action="toggle-country" data-channel="${ch.id}" data-index="${p.i}">${p.l}${p.defaultPaese ? " (EU)" : ""} ${p.p}%</button>`).join("")}
        </div>
      ` : ""}
    </article>
  `;
}

function renderChannels(prop, siteWithPromo) {
  if (!prop.channels.length) return '<div class="empty">Nessun canale configurato.</div>';
  return `<div class="channel-list">${prop.channels.map((ch) => renderChannel(ch, prop, siteWithPromo)).join("")}</div>`;
}

function renderCalcSubtabs() {
  return `
    <div class="calc-subtabs">
      <button class="tab ${state.calcTab === "channels" ? "active" : ""}" data-action="calc-tab" data-tab="channels">Canali</button>
      <button class="tab ${state.calcTab === "contacts" ? "active" : ""}" data-action="calc-tab" data-tab="contacts">Contatti</button>
    </div>
  `;
}

function operatorContactsSorted() {
  return Object.entries(state.operatorContacts || {})
    .map(([key, value]) => ({ key, ...(value || {}) }))
    .filter((row) => row.key !== "generic")
    .sort((a, b) => String(a.name || a.key).localeCompare(String(b.name || b.key), "it", { sensitivity: "base" }));
}

function renderOperatorContacts() {
  const rows = operatorContactsSorted();
  if (!rows.length) return `<div class="empty">Nessun operatore.</div>`;
  return `
    <section class="panel contacts-panel" style="grid-column:1 / -1">
      <div class="channel-head">
        <div>
          <h2>Contatti operatori</h2>
          <div class="mini">Rubrica e log email per canale · ${rows.length} operatori</div>
        </div>
      </div>
      <div class="contacts-table-wrap">
        <table class="contacts-table">
          <thead>
            <tr>
              <th>Operatore</th>
              <th>Referente</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Ruolo</th>
              <th>Note</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                <td><strong>${escapeHtml(row.name || row.key)}</strong></td>
                <td><input class="contact-input" data-action="contact-field" data-op="${escapeHtml(row.key)}" data-field="contactName" value="${escapeHtml(row.contactName || "")}" placeholder="Nome"/></td>
                <td><input class="contact-input" data-action="contact-field" data-op="${escapeHtml(row.key)}" data-field="email" value="${escapeHtml(row.email || "")}" placeholder="email@..."/></td>
                <td><input class="contact-input" data-action="contact-field" data-op="${escapeHtml(row.key)}" data-field="phone" value="${escapeHtml(row.phone || "")}" placeholder="+39..."/></td>
                <td><input class="contact-input" data-action="contact-field" data-op="${escapeHtml(row.key)}" data-field="role" value="${escapeHtml(row.role || "")}" placeholder="Account Manager"/></td>
                <td><input class="contact-input" data-action="contact-field" data-op="${escapeHtml(row.key)}" data-field="notes" value="${escapeHtml(row.notes || "")}" placeholder="Note"/></td>
                <td class="contacts-actions">
                  <button class="ghost compact-button" data-action="operator-log" data-op="${escapeHtml(row.key)}">Vedi email</button>
                  <button class="ghost compact-button" data-action="operator-add-email" data-op="${escapeHtml(row.key)}">Aggiungi email</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderToolbarDatePicker(prop) {
  const year = state.datePickerYear;
  const month = state.datePickerMonth;
  const blanks = mondayStartBlankCount(year, month);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();
  const leading = Array.from({ length: blanks }, (_, i) => `<span class="date-picker-day muted">${previousMonthDays - blanks + i + 1}</span>`).join("");
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNumber = i + 1;
    const d = dateStr(year, month, dayNumber);
    const isSelected = d === state.selectedDate;
    const isToday = d === todayLocal();
    const soldOut = isCalendarDateSoldOut(prop, d);
    const noRate = isRateNotLoaded(prop, d);
    return `
      <button class="date-picker-day ${isSelected ? "selected" : ""} ${isToday ? "today" : ""} ${soldOut ? "soldout" : ""} ${noRate ? "no-rate" : ""}" data-action="date-picker-day" data-date="${escapeHtml(d)}" title="${escapeHtml(noRate ? "TARIFFA NON CARICATA" : soldOut ? "OBIETTIVO COMPLETATO" : d)}">
        <span>${dayNumber}</span>
        ${noRate ? `<span class="date-picker-no-rate-dot"></span>` : ""}
        ${soldOut ? `<span class="date-picker-soldout-dot"></span>` : ""}
      </button>
    `;
  }).join("");
  const totalCells = blanks + daysInMonth;
  const trailingCount = (7 - (totalCells % 7)) % 7;
  const trailing = Array.from({ length: trailingCount }, (_, i) => `<span class="date-picker-day muted">${i + 1}</span>`).join("");
  return `
    <div class="date-picker-wrap">
      <button class="date-display" data-action="toggle-date-picker" aria-label="Apri calendario">
        <span>${formatItalianDate(state.selectedDate)}</span>
        <span class="date-display-icon">▣</span>
      </button>
      ${state.datePickerOpen ? `
        <div class="date-picker-popover">
          <div class="date-picker-head">
            <strong>${MONTHS[month].toLowerCase()} ${year}</strong>
            <div class="date-picker-nav">
              <button data-action="date-picker-prev" aria-label="Mese precedente">↑</button>
              <button data-action="date-picker-next" aria-label="Mese successivo">↓</button>
            </div>
          </div>
          <div class="date-picker-weekdays">${WEEKDAYS.map((d) => `<span>${d}</span>`).join("")}</div>
          <div class="date-picker-grid">${leading}${days}${trailing}</div>
          <div class="date-picker-foot">
            <button data-action="date-picker-clear">Cancella</button>
            <button data-action="today">Oggi</button>
          </div>
        </div>
      ` : ""}
    </div>
  `;
}

function renderCalendarDay(prop, channel, year, monthIndex, day) {
  const d = dateStr(year, monthIndex, day);
  const closed = isCalendarDateSoldOut(prop, d);
  const noRate = isRateNotLoaded(prop, d);
  const rate = getOperationalRate(prop, d, state.occupancy);
  const availability = calendarAvailabilityInfo(prop, d);
  const holiday = holidayName(d);
  const deepReminders = deepDealRemindersForDate(d);
  const manualReminders = remindersForDate(d, prop.id);
  const isPastDate = d < todayLocal();
  const effectiveNoRate = noRate && !isPastDate;
  const noAvailability = availability.value == null;
  const promos = isPastDate ? [] : channel === "site" ? getCalendarSitePromos(prop, d) : getCalendarChannelPromos(prop, prop.channels.find((ch) => ch.id === channel), d);
  const visible = effectiveNoRate ? [] : promos.slice(0, 5);
  const hasAlert = noAvailability || effectiveNoRate;
  const filteredOut = (state.calendarOnlyProblems && !hasAlert) || (state.calendarHidePast && isPastDate);
  if (filteredOut) {
    return `
      <div class="day day-filtered" aria-hidden="true">
        <div class="day-top"><span class="day-number">${day}</span></div>
      </div>
    `;
  }
  const statusLabel = closed
    ? "Obiettivo completato (goal 100%)"
    : noAvailability
      ? "Disponibilita non caricata"
      : effectiveNoRate
        ? "Tariffa non caricata"
        : isPastDate
          ? "Giorno passato"
          : promos.length
            ? "Promo attive"
            : "No promo";
  const refRoom = getCalendarReferenceRoom(prop);
  const tariffReference = refRoom
    ? roomSelectLabel(prop, refRoom)
    : (state.occupancy === "dus" ? "Tariffa Dus" : "Tariffa Dbl");
  const promoLabel = promos.length
    ? promos.map((promo) => {
      const label = String(promo.l || "").trim();
      if (!Number.isFinite(Number(promo.p))) return label || "Promo";
      const pct = Number(promo.p);
      const hasPercentInLabel = new RegExp(`(^|\\D)${pct}\\s*%`).test(label);
      if (!label) return `${pct}%`;
      return hasPercentInLabel ? label : `${label} ${pct}%`;
    }).join(", ")
    : "Nessuna promo";
  const reminderLabel = manualReminders.length
    ? manualReminders.map((item) => `${item.type}: ${item.title}`).join(" | ")
    : "";
  const tooltipRows = [
    { k: "Data", v: formatItalianDate(d) },
    { k: "Tariffa", v: `${tariffReference}: ${rate != null ? fmt(rate) : "n/d"}` },
    { k: "Disponibilita", v: availability.value == null ? "n/d" : `${availability.value} camere` },
    { k: "Stato", v: statusLabel },
    { k: "Promo", v: promoLabel },
    holiday ? { k: "Festivita", v: holiday } : null,
    deepReminders.length ? { k: "Reminder", v: "48h reinseribile" } : null,
    reminderLabel ? { k: "Note", v: reminderLabel } : null,
  ].filter(Boolean);
  const tooltipText = tooltipRows.map((row) => `${row.k}: ${row.v}`).join(" | ");
  const tooltipHtml = tooltipRows
    .map((row) => `<div class="day-tooltip-row"><span class="day-tooltip-k">${escapeHtml(row.k)}</span><span class="day-tooltip-v">${escapeHtml(row.v)}</span></div>`)
    .join("");
  const warning = !closed && !effectiveNoRate && promos.length > 2;
  const statusClass = closed ? "closed" : noAvailability ? "no-availability" : effectiveNoRate ? "no-rate" : promos.length ? "has-promo" : "no-promo";
  const availabilityClass = availability.percent == null ? "avail-unknown" : `avail-${availability.level}`;
  const availabilityLabel = availability.value == null ? "D n/d" : `D${availability.value}`;
  const canShowRate = !isPastDate && !noRate && !closed && availability.value != null && availability.value > 0 && rate != null;
  return `
    <button class="day ${statusClass} ${availabilityClass} ${warning ? "has-warning" : ""} ${holiday ? "holiday" : ""} ${deepReminders.length ? "deep-reminder" : ""} ${manualReminders.length ? "manual-reminder" : ""} ${hasAlert ? "day-problem" : ""}" data-action="calendar-day" data-date="${escapeHtml(d)}" aria-label="${escapeHtml(tooltipText)}">
      <div class="day-body">
        <div class="day-top">
          <span class="day-number">${day}</span>
          ${canShowRate ? `<span class="day-rate">${fmt(rate).replace("EUR ", "")}</span>` : ""}
        </div>
        ${availability.percent != null ? `<div class="day-availability">${availabilityLabel}</div>` : ""}
        ${holiday ? `<div class="holiday-name">${holidayShortLabel(holiday)}</div>` : ""}
        ${deepReminders.length ? `<div class="deep-reminder-label">48H OK</div>` : ""}
        ${manualReminders.length ? `<div class="manual-reminder-label">REM</div>` : ""}
        ${noAvailability && !closed ? `<div class="no-availability-marker"><span class="no-availability-dot"></span>NO DISP</div>` : ""}
        ${effectiveNoRate && !closed ? `<div class="no-rate-marker"><span class="no-rate-dot"></span>NO TARIFFA</div>` : ""}
        ${closed ? `<div class="soldout-marker"><span class="soldout-dot"></span>GOAL 100%</div>` : ""}
        ${visible.length ? `<div class="promo-tags">${visible.map((promo) => `<span class="promo-tag" style="${promoStyle(promo)}">${promoCode(promo)}</span>`).join("")}</div>` : ""}
        ${!isPastDate && !noRate && !closed && !promos.length ? `<div class="day-status">NO PROMO</div>` : ""}
      </div>
      <div class="day-tooltip" role="tooltip">${tooltipHtml}</div>
    </button>
  `;
}

function renderMonth(prop, channel, year, monthIndex) {
  const blanks = mondayStartBlankCount(year, monthIndex);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const empty = Array.from({ length: blanks }, () => '<div class="day empty"></div>').join("");
  const days = Array.from({ length: daysInMonth }, (_, i) => renderCalendarDay(prop, channel, year, monthIndex, i + 1)).join("");
  return `
    <section class="month">
      <h3>${MONTHS[monthIndex]} ${year}</h3>
      <div class="weekdays">${WEEKDAYS.map((d) => `<span>${d}</span>`).join("")}</div>
      <div class="days">${empty}${days}</div>
    </section>
  `;
}

function renderCalendar(prop) {
  const selectedChannel = getCalendarChannels(prop).some((ch) => ch.id === state.calendarChannel) ? state.calendarChannel : "site";
  state.calendarChannel = selectedChannel;
  const selectedName = getCalendarChannels(prop).find((ch) => ch.id === selectedChannel)?.name || "Sito Ufficiale";
  const rangeMonths = { month: 1, quarter: 3, semester: 6, year: 12 }[state.calendarRange] || 3;
  const startMonth = state.calendarRange === "year" ? 0 : Math.min(state.calendarStartMonth, 12 - rangeMonths);
  const monthsToShow = Array.from({ length: rangeMonths }, (_, i) => startMonth + i);
  return `
    <section class="panel" style="grid-column:1 / -1">
      <div class="channel-head">
        <h2>Calendario promo</h2>
        <span class="mini">${prop.label} - ${selectedName}</span>
      </div>
      <div class="calendar-controls">
        <label>
          Canale
          <select data-action="calendar-channel">
            ${getCalendarChannels(prop).map((ch) => `<option value="${escapeHtml(ch.id)}" ${ch.id === selectedChannel ? "selected" : ""}>${escapeHtml(ch.name)}</option>`).join("")}
          </select>
        </label>
        <label>
          Anno
          <select data-action="calendar-year">
            ${[2026, 2027].map((year) => `<option value="${year}" ${year === state.calendarYear ? "selected" : ""}>${year}</option>`).join("")}
          </select>
        </label>
        <label>
          Vista
          <select data-action="calendar-range">
            <option value="month" ${state.calendarRange === "month" ? "selected" : ""}>Mensile</option>
            <option value="quarter" ${state.calendarRange === "quarter" ? "selected" : ""}>Trimestre</option>
            <option value="semester" ${state.calendarRange === "semester" ? "selected" : ""}>Semestre</option>
            <option value="year" ${state.calendarRange === "year" ? "selected" : ""}>Annuale</option>
          </select>
        </label>
        ${state.calendarRange !== "year" ? `<label>
          Da mese
          <select data-action="calendar-start-month">
            ${MONTHS.map((m, i) => `<option value="${i}" ${i === startMonth ? "selected" : ""}>${m}</option>`).join("")}
          </select>
        </label>` : ""}
        <span class="mini">Clicca un giorno per aprirlo nel calcolo.</span>
      </div>
      <div class="calendar-togglebar">
        <button class="calendar-toggle ${state.calendarOnlyProblems ? "active" : ""}" data-action="calendar-toggle-problems">Solo allarmi</button>
        <button class="calendar-toggle ${state.calendarHidePast ? "active" : ""}" data-action="calendar-toggle-past">Nascondi passati</button>
        <button class="calendar-toggle" data-action="calendar-reset-filters">Reset filtri</button>
      </div>
      <div class="calendar-grid">
        ${monthsToShow.map((i) => renderMonth(prop, selectedChannel, state.calendarYear, i)).join("")}
      </div>
      <div class="calendar-legend">
        <span class="legend-item"><span class="promo-dot"></span>giorno con promo</span>
        <span class="legend-item"><span class="promo-dot" style="background:#f59e0b"></span>piu promo sovrapposte</span>
        <span class="legend-item"><span class="promo-dot" style="background:#f59e0b"></span>NO PROMO</span>
        <span class="legend-item"><span class="promo-dot" style="background:#374151"></span>tariffa non caricata</span>
        <span class="legend-item"><span class="promo-dot" style="background:#22c55e"></span>obiettivo completato (goal 100%)</span>
        <span class="legend-item"><span class="promo-dot" style="background:#f7ff00"></span>festività</span>
        <span class="legend-item">hover: elenco promo</span>
      </div>
    </section>
  `;
}

function strategyApplies(target, column) {
  return target === "both" || target === column;
}

function strategyDelta(after, before) {
  if (after == null || before == null) return "-";
  const diff = after - before;
  const sign = diff > 0 ? "+" : "";
  return `${sign}${fmt(diff).replace("EUR ", "")}`;
}

function renderStrategyMetric(label, before, after, extra = "") {
  return `
    <div class="strategy-metric">
      <span>${label}</span>
      <strong>${after == null ? "-" : fmt(after)}</strong>
      <small>${before == null ? "" : `oggi ${fmt(before)}`}</small>
      ${extra && after != null ? `<em>${extra}</em>` : ""}
    </div>
  `;
}

function inferStrategyChannelKey(value, prop = currentProp()) {
  if (value === "site") return "site";
  if (value?.startsWith("library:")) return value.slice(8);
  const channel = prop.channels.find((ch) => ch.id === value);
  const name = channel?.name.toLowerCase() || "";
  if (name.includes("booking")) return "booking";
  if (name.includes("webbeds")) return "webbeds";
  if (name.includes("hotelbeds")) return "hotelbeds";
  if (name.includes("gobeds") || name.includes("gopeds")) return "gobeds";
  if (name.includes("expedia")) return "expedia";
  if (name.includes("trip")) return "trip";
  return "booking";
}

function strategyChannelMeta(value, prop = currentProp()) {
  if (value === "site") return { key: "site", label: "Sito ufficiale", comm: 0, diff: 0, channel: null };
  const key = inferStrategyChannelKey(value, prop);
  const channel = prop.channels.find((ch) => ch.id === value) || null;
  return {
    key,
    label: channel?.name || STRATEGY_CHANNEL_META[key]?.label || "Canale",
    comm: channel?.comm ?? STRATEGY_CHANNEL_META[key]?.comm ?? 18,
    diff: channel ? getChannelDiffPercent(prop, channel) : (Number(prop?.diff) || 0),
    channel,
  };
}

function strategyChannelOptions(prop) {
  const usedKeys = new Set(["site"]);
  const existing = prop.channels.map((ch) => {
    const key = inferStrategyChannelKey(ch.id, prop);
    usedKeys.add(key);
    return { value: ch.id, label: ch.name };
  });
  const extras = Object.entries(STRATEGY_CHANNEL_META)
    .filter(([key]) => key !== "site" && !usedKeys.has(key))
    .map(([key, meta]) => ({ value: `library:${key}`, label: meta.label }));
  return [{ value: "site", label: "Sito ufficiale" }, ...existing, ...extras];
}

function selectedStrategyPromos(strategy, prop = currentProp()) {
  const key = inferStrategyChannelKey(strategy.channelId, prop);
  const ids = new Set(strategy.selectedPromoIds || []);
  return (STRATEGY_PROMO_LIBRARY[key] || [])
    .filter((promo) => ids.has(promo.id))
    .map((promo) => {
      const rawValue = strategy.percentOverrides?.[promo.id];
      return { ...promo, p: rawValue === "" || rawValue == null ? null : Number(rawValue), on: true };
    });
}

function promoIdentity(promo) {
  if (promo.type === "paese") return "type:paese";
  const label = String(promo.l || "")
    .toLowerCase()
    .replace(/\b(ago|agosto|auto)\b/g, "")
    .replace(/\d+/g, "")
    .replace(/%/g, "")
    .replace(/[^a-z]+/g, " ")
    .trim()
    .split(" ")[0] || "promo";
  return `${promo.type || "none"}:${label}`;
}

function promoChipText(promo) {
  const label = String(promo.l || "");
  const hasPercent = promo.p != null && label.includes(`${promo.p}%`);
  return `${escapeHtml(label)}${promo.p != null && !hasPercent ? ` ${promo.p}%` : ""}`;
}

function enrichCalendarPromo(promo, meta, prop) {
  const library = STRATEGY_PROMO_LIBRARY[meta.key] || [];
  const inferredType = promo.type
    || (promo.condition === "early_bird" ? "prenota" : promo.condition === "last_minute" ? "lastminute" : promo.condition === "weekend" ? "vacanze" : "none");
  const draft = { ...promo, type: inferredType };
  const match = library.find((item) => promoIdentity(item) === promoIdentity(draft))
    || library.find((item) => item.type === inferredType && Number(item.p) === Number(promo.p));
  const appliesTo = match?.appliesTo
    || (promo.condition === "early_bird" || promo.condition === "last_minute" ? "notref" : "both");
  return {
    ...draft,
    id: `active:${prop.id}:${meta.key}:${promoIdentity(draft)}:${promo.p}`,
    appliesTo,
    on: true,
    alreadyActive: true,
  };
}

function strategySimulationDate(strategy) {
  return strategy.periodFrom || state.selectedDate;
}

function strategyCalendarPromos(strategy, prop, meta) {
  const date = strategySimulationDate(strategy);
  const promos = meta.key === "site"
    ? getCalendarSitePromos(prop, date)
    : meta.channel ? getCalendarChannelPromos(prop, meta.channel, date) : [];
  return promos.map((promo) => enrichCalendarPromo(promo, meta, prop));
}

function promoAppliesToTarget(promo, target) {
  return promo.appliesTo === "both" || promo.appliesTo === target;
}

function applyStrategyPromos(base, promos, target) {
  return cmpd(base, promos.filter((promo) => promo.p != null && promoAppliesToTarget(promo, target)));
}

function strategyPromoGroups(library) {
  const groups = [
    { title: "Premium programmes", types: ["genius"] },
    { title: "Targeting", types: ["mobile", "paese"] },
    { title: "Campaign deals", types: ["vacanze"] },
    { title: "Portfolio deals", types: ["base", "lastminute", "prenota"] },
    { title: "Deep deals", types: ["deep"] },
    { title: "Altre promo", types: ["none"] },
  ];
  return groups
    .map((group) => ({ ...group, promos: library.filter((promo) => group.types.includes(promo.type || "none")) }))
    .filter((group) => group.promos.length);
}

function renderStepBadge(number) {
  return `<span class="step-badge">${number}</span>`;
}

function renderStrategyContext(prop, date = state.selectedDate) {
  const room = getSelectedRoom(prop);
  const availability = room ? getAvailability(prop.id, room.id, date) : null;
  const badge = availabilityBadge(availability);
  const siteFlex = getOperationalRate(prop, date, state.occupancy) ?? state.sito;
  const siteNotRef = nonRefundableRate(siteFlex);
  const sitePromos = getCalendarSitePromos(prop, date);
  const flexPromoLines = sitePromoRateLines(siteFlex, sitePromos, "flex");
  const notRefPromoLines = sitePromoRateLines(siteFlex, sitePromos, "notref");
  const roomLabel = `${room?.name || "Camera"} · ${state.occupancy === "dus" ? "Dus" : "Dbl"}`;
  const channelRows = prop.channels.map((ch) => {
    const multiplier = getChannelMultiplier(prop, ch);
    const channelFlex = siteFlex * multiplier;
    const channelNotRef = nonRefundableRate(siteFlex) * multiplier;
    const { effective } = resolvePromos(ch.promos);
    const flexVisible = cmpd(channelFlex, effective);
    const visibility = getNonRefundableVisibility(ch, date);
    const nonRefVisible = visibility.visible ? cmpd(channelNotRef, effective) : null;
    const promoLabel = effective.length ? effective.map((p) => p.l).join(" + ") : "nessuna promo";
    return `
      <div class="context-channel-row">
        <div>
          <strong>${ch.name}</strong>
          <span>${promoLabel}</span>
        </div>
        <div class="context-rate-pair">
          <span>flex ${fmt(flexVisible)}</span>
          <span>not ref ${nonRefVisible == null ? "visibile dopo 48h" : fmt(nonRefVisible)}</span>
        </div>
      </div>
    `;
  }).join("");
  return `
    <section class="panel strategy-current-panel">
      <div class="channel-head">
        <div>
          <h2>Situazione attuale</h2>
          <div class="mini">${prop.label} · ${weekdayLabel(date)} ${formatItalianDate(date)}</div>
        </div>
        <span class="strategy-context">${roomLabel}</span>
      </div>
      <div class="current-context-grid">
        <div class="context-card">
          <small>Disponibilità</small>
          <strong>${badge ? badge.label : "n/d"}</strong>
        </div>
        <div class="context-card">
          <small>FLEX sito</small>
          <strong>${fmt(siteFlex)}</strong>
        </div>
        <div class="context-card">
          <small>NOT REF sito</small>
          <strong>${fmt(siteNotRef)}</strong>
        </div>
      </div>
      <div class="current-site-promos">
        <div class="context-subtitle">Promo sito attive</div>
        <div class="chipbar">
          ${sitePromos.length ? sitePromos.map((p) => `<span class="chip on inert">${p.l} ${p.p}%</span>`).join("") : `<div class="empty compact">Nessuna promo attiva</div>`}
        </div>
        <div class="context-promo-results">
          <div>
            <span>FLEX con promo</span>
            <strong>${flexPromoLines.length ? flexPromoLines.map((line) => `${line.note}: ${fmt(line.price)}`).join(" · ") : "-"}</strong>
          </div>
          <div>
            <span>NOT REF con promo</span>
            <strong>${notRefPromoLines.length ? notRefPromoLines.map((line) => `${line.note}: ${fmt(line.price)}`).join(" · ") : fmt(siteNotRef)}</strong>
          </div>
        </div>
      </div>
      <div class="current-channels">
        <div class="context-subtitle">Canali</div>
        ${channelRows || `<div class="empty compact">Nessun canale configurato</div>`}
      </div>
    </section>
  `;
}

function renderStrategy(prop) {
  const strategy = state.strategy;
  const meta = strategyChannelMeta(strategy.channelId, prop);
  const room = getSelectedRoom(prop);
  const channel = meta.channel;
  const library = STRATEGY_PROMO_LIBRARY[meta.key] || [];
  const simulationDate = strategySimulationDate(strategy);
  const calendarPromos = strategyCalendarPromos(strategy, prop, meta);
  const calendarPromoKeys = new Set(calendarPromos.map(promoIdentity));
  const availableLibrary = library.filter((promo) => !calendarPromoKeys.has(promoIdentity(promo)));
  const hasBaseRate = strategy.baseRate !== "" && Number.isFinite(Number(strategy.baseRate));
  const baseRate = hasBaseRate ? Number(strategy.baseRate) : 0;
  const selectedPromos = selectedStrategyPromos(strategy, prop).filter((promo) => !calendarPromoKeys.has(promoIdentity(promo)));
  const selectedResolved = resolvePromos([...calendarPromos, ...selectedPromos]);
  const selectedEffective = selectedResolved.effective;
  const selectedBlocked = selectedPromos.filter((_, index) => selectedResolved.shadowed.has(calendarPromos.length + index));
  const activeSitePromos = getCalendarSitePromos(prop, simulationDate);
  const appliesChannelDiff = meta.key !== "site";
  const channelMultiplier = appliesChannelDiff ? 1 + meta.diff / 100 : 1;
  const baseFlex = baseRate * channelMultiplier;
  const baseNotRef = nonRefundableRate(baseFlex);
  const currentFlex = hasBaseRate ? baseFlex : null;
  const pseudoChannel = channel || { name: meta.label };
  const channelNotRefVisible = meta.key === "site" ? true : getNonRefundableVisibility(pseudoChannel, simulationDate).visible;
  const currentNotRef = !hasBaseRate ? null : meta.key !== "site"
    ? channelNotRefVisible ? baseNotRef : null
    : baseNotRef;
  const strategyPromos = selectedEffective;
  const flexAfter = !hasBaseRate ? null : strategyPromos.some((promo) => promo.p != null && promoAppliesToTarget(promo, "flex"))
    ? applyStrategyPromos(baseFlex, strategyPromos, "flex")
    : currentFlex;
  const notRefAfter = !hasBaseRate ? null : meta.key !== "site" && !channelNotRefVisible
    ? null
    : strategyPromos.some((promo) => promo.p != null && promoAppliesToTarget(promo, "notref"))
      ? applyStrategyPromos(baseNotRef, strategyPromos, "notref")
      : currentNotRef;
  const flexNet = meta.key !== "site" && flexAfter != null ? flexAfter * (1 - meta.comm / 100) : null;
  const notRefNet = meta.key !== "site" && notRefAfter != null ? notRefAfter * (1 - meta.comm / 100) : null;
  const siteFlex = baseRate;
  const siteNotRefReference = siteSellRate(nonRefundableRate(siteFlex), activeSitePromos[0] || null);
  const maxDiscounted = [flexAfter, notRefAfter].filter((value) => value != null).sort((a, b) => a - b)[0] ?? null;
  const maxDiscountPct = maxDiscounted == null || !baseFlex ? 0 : ((baseFlex - maxDiscounted) / baseFlex) * 100;
  const groups = strategyPromoGroups(availableLibrary);
  const calendarPromoSummary = calendarPromos.length
    ? calendarPromos.map((promo) => `<span class="chip on inert">${promoChipText(promo)}</span>`).join("")
    : `<div class="empty compact">Nessuna promo già attiva</div>`;
  const availability = room ? getAvailability(prop.id, room.id, simulationDate) : null;
  const availabilityLabel = availabilityBadge(availability)?.label || "n/d";
  const sitePromoSummary = activeSitePromos.length
    ? activeSitePromos.map((promo) => `<span class="chip on inert">${promoChipText(promo)}</span>`).join("")
    : `<div class="empty compact">Nessuna promo attiva</div>`;
  const siteFlexPromoLines = sitePromoRateLines(siteFlex, activeSitePromos, "flex");
  const siteNotRefPromoLines = sitePromoRateLines(siteFlex, activeSitePromos, "notref");
  const siteFlexPromoSummary = siteFlexPromoLines.length
    ? siteFlexPromoLines.map((line) => `${line.note}: ${fmt(line.price)}`).join(" · ")
    : "-";
  const siteNotRefPromoSummary = siteNotRefPromoLines.length
    ? siteNotRefPromoLines.map((line) => `${line.note}: ${fmt(line.price)}`).join(" · ")
    : fmt(nonRefundableRate(siteFlex));
  const deepReminderSummary = state.deepDealReminders.length
    ? state.deepDealReminders
        .map((item) => `48h impostata il ${formatItalianDate(item.startDate)}: reinseribile dal ${formatItalianDate(item.reopenDate)}`)
        .join(" · ")
    : "";
  return `
    <section class="panel strategy-panel">
      <div class="strategy-head">
        <div>
          <h2>Simulatore di sconto massimo</h2>
          <p>Simula combinazioni di tariffa base e sconti. Questa è una simulazione: non attiva alcuna promo sulla struttura.</p>
        </div>
      </div>

      <div class="max-discount-simulator">
        <div class="sim-left">
          <div class="sim-step">
            <h3>${renderStepBadge(1)} Step 1</h3>
            <label class="field">
              Tariffa base selezionata
              <div class="currency-input">
                <input type="number" min="0" value="${escapeHtml(strategy.baseRate)}" data-action="strategy-base-rate" />
                <span>EUR</span>
              </div>
            </label>
            <div class="strategy-period">
              <label class="field">
                Dal
                <input type="date" value="${escapeHtml(strategy.periodFrom)}" data-action="strategy-period-from" />
              </label>
              <label class="field">
                Al
                <input type="date" value="${escapeHtml(strategy.periodTo)}" data-action="strategy-period-to" />
              </label>
            </div>
          </div>

          <div class="sim-step">
            <h3>${renderStepBadge(2)} Step 2</h3>
            <p class="step-copy">Seleziona diversi sconti e modifica gli importi. Le regole di cumulabilità sono già considerate.</p>
            <label class="field">
              Canale
              <select data-action="strategy-channel">
                ${strategyChannelOptions(prop).map((option) => `<option value="${escapeHtml(option.value)}" ${strategy.channelId === option.value ? "selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}
              </select>
            </label>

            <div class="active-strategy-promos">
              <div class="context-subtitle">Già attive il ${formatItalianDate(simulationDate)}</div>
              <div class="chipbar">${calendarPromoSummary}</div>
            </div>

            <div class="discount-groups">
              ${groups.length ? groups.map((group) => `
                <div class="discount-group">
                  <div class="discount-group-head">
                    <strong>${group.title}</strong>
                  </div>
                  ${group.promos.map((promo) => {
                    const selected = (strategy.selectedPromoIds || []).includes(promo.id);
                    const override = strategy.percentOverrides?.[promo.id] ?? "";
                    const blocked = selectedBlocked.some((item) => item.id === promo.id);
                    const effective = selected && !blocked;
                    return `
                      <div class="discount-row ${selected ? "selected" : ""} ${effective ? "effective" : ""} ${blocked ? "blocked-rule" : ""}">
                        <button class="switch ${selected ? "on" : ""}" data-action="strategy-toggle-promo" data-promo-id="${escapeHtml(promo.id)}" aria-label="${escapeHtml(promo.l)}"></button>
                        <div class="discount-info">
                          <strong>${promo.l}</strong>
                        </div>
                        <div class="percent-input">
                          <input type="number" min="0" max="90" value="${escapeHtml(override)}" data-action="strategy-promo-percent" data-promo-id="${escapeHtml(promo.id)}" />
                          <span>%</span>
                        </div>
                      </div>
                    `;
                  }).join("")}
                </div>
              `).join("") : `<div class="empty compact">Non ci sono altre promo da simulare per questo canale.</div>`}
            </div>
          </div>
        </div>

        <div class="sim-right">
          <div class="sim-step result-step">
            <h3>${renderStepBadge(3)} Step 3</h3>
            <p class="step-copy">Vedi la tariffa massima scontata, tasse escluse. Il risultato serve per fare ipotesi e non modifica la distribuzione.</p>
            ${selectedBlocked.length ? `<div class="strategy-warning">Escluse per cumulabilità: ${selectedBlocked.map((promo) => promo.p == null ? promo.l : `${promo.l} ${promo.p}%`).join(", ")}</div>` : ""}

            <div class="strategy-recap">
              <div class="recap-head">
                <strong>Recap controllo</strong>
                <span>${weekdayLabel(simulationDate)} ${formatItalianDate(simulationDate)}</span>
              </div>
              <div class="recap-grid">
                <div>
                  <span>Camera</span>
                  <strong>${room?.name || "Camera"} · ${state.occupancy === "dus" ? "Dus" : "Dbl"}</strong>
                </div>
                <div>
                  <span>Disponibilità</span>
                  <strong>${availabilityLabel}</strong>
                </div>
                <div>
                  <span>Sito FLEX</span>
                  <strong>${fmt(siteFlex)}</strong>
                </div>
                <div>
                  <span>Sito NOT REF</span>
                  <strong>${fmt(nonRefundableRate(siteFlex))}</strong>
                </div>
              </div>
              <div class="recap-block">
                <span>Promo sito attive</span>
                <div class="chipbar">${sitePromoSummary}</div>
                <small>FLEX con promo: ${siteFlexPromoSummary}</small>
                <small>NOT REF con promo: ${siteNotRefPromoSummary}</small>
              </div>
              <div class="recap-block">
                <span>Canale selezionato: ${meta.label}</span>
                <div class="chipbar">${calendarPromoSummary}</div>
              </div>
              ${deepReminderSummary ? `
                <div class="recap-block deep-recap">
                  <span>Reminder 48h</span>
                  <small>${deepReminderSummary}</small>
                </div>
              ` : ""}
            </div>

            <div class="max-result">
              <span>Tariffa massima scontata</span>
              <strong>${maxDiscounted == null ? "-" : fmt(maxDiscounted)}</strong>
              <small>${maxDiscounted == null ? "" : `sconto massimo stimato ${fmtPct(maxDiscountPct)}`}</small>
            </div>

            <div class="strategy-cards compact-results">
              ${renderStrategyMetric("FLEX cliente", currentFlex, flexAfter, `delta ${strategyDelta(flexAfter, currentFlex)}`)}
              ${renderStrategyMetric("NOT REF cliente", currentNotRef, notRefAfter, `delta ${strategyDelta(notRefAfter, currentNotRef)}`)}
              ${meta.key !== "site" ? renderStrategyMetric("FLEX netto hotel", flexNet == null ? null : currentFlex * (1 - meta.comm / 100), flexNet, `comm. ${meta.comm}%`) : ""}
              ${meta.key !== "site" ? renderStrategyMetric("NOT REF netto hotel", currentNotRef == null ? null : currentNotRef * (1 - meta.comm / 100), notRefNet, `comm. ${meta.comm}%`) : ""}
            </div>

            ${meta.key !== "site" ? `
              <div class="strategy-compare">
                <span>Confronto vs sito</span>
                ${competitiveBadge(flexAfter, siteFlex)}
                ${notRefAfter == null ? "" : competitiveBadge(notRefAfter, siteNotRefReference)}
              </div>
            ` : ""}
          </div>
        </div>
      </div>
    </section>
    ${renderStrategyContext(prop, simulationDate)}
  `;
}

function commercialChannelOptions(prop, selectedId) {
  return [
    `<option value="site" ${selectedId === "site" ? "selected" : ""}>Sito ufficiale</option>`,
    ...prop.channels.map((channel) => `<option value="${escapeHtml(channel.id)}" ${selectedId === channel.id ? "selected" : ""}>${escapeHtml(channel.name)}</option>`),
  ].join("");
}

function billingCalculation(prop) {
  const billing = state.billing;
  const channel = prop.channels.find((item) => item.id === billing.channelId) || prop.channels[0];
  const date = billing.date || state.selectedDate;
  const roomRate = getOperationalRate(prop, date, state.occupancy) ?? state.sito;
  if (!channel || !roomRate) {
    return { channel, date, roomRate, customerRate: null, expectedNet: null, diff: null };
  }
  const multiplier = getChannelMultiplier(prop, channel);
  const channelFlex = roomRate * multiplier;
  const pseudoChannel = channel || { name: "Canale", comm: 0 };
  const notRefVisible = getNonRefundableVisibility(pseudoChannel, date).visible;
  const baseRate = billing.rateType === "notref"
    ? notRefVisible ? nonRefundableRate(channelFlex) : null
    : channelFlex;
  const { effective } = resolvePromos(channel.promos || []);
  const customerRate = baseRate == null ? null : cmpd(baseRate, effective);
  const expectedNet = customerRate == null ? null : customerRate * (1 - channel.comm / 100);
  const invoice = billing.invoiceAmount === "" ? null : Number(billing.invoiceAmount);
  const diff = invoice == null || expectedNet == null ? null : invoice - expectedNet;
  return { channel, date, roomRate, customerRate, expectedNet, invoice, diff, notRefVisible };
}

function billingStatus(diff) {
  if (diff == null) return `<span class="billing-status neutral">Inserisci importo fattura</span>`;
  if (Math.abs(diff) <= 0.5) return `<span class="billing-status ok">OK</span>`;
  const label = diff > 0 ? `Fattura sopra atteso +${fmt(diff)}` : `Fattura sotto atteso ${fmt(diff)}`;
  return `<span class="billing-status risk">${label}</span>`;
}

function renderBilling(prop) {
  const calc = billingCalculation(prop);
  const billing = state.billing;
  const isBooking = calc.channel?.name?.toLowerCase().includes("booking");
  return `
    <section class="panel workspace-panel">
      <div class="workspace-head">
        <div>
          <h2>Fatturazione</h2>
          <p>Controllo manuale tra importo fattura e netto atteso dal canale.</p>
        </div>
        ${billingStatus(calc.diff)}
      </div>

      <div class="workspace-grid">
        <div class="workspace-form">
          <label class="field">
            Data soggiorno
            <input type="date" value="${escapeHtml(billing.date)}" data-action="billing-field" data-field="date" />
          </label>
          <label class="field">
            Canale
            <select data-action="billing-field" data-field="channelId">
              ${prop.channels.map((channel) => `<option value="${escapeHtml(channel.id)}" ${billing.channelId === channel.id ? "selected" : ""}>${escapeHtml(channel.name)}</option>`).join("")}
            </select>
          </label>
          <label class="field">
            Piano tariffario
            <select data-action="billing-field" data-field="rateType">
              <option value="flex" ${billing.rateType === "flex" ? "selected" : ""}>Flex</option>
              <option value="notref" ${billing.rateType === "notref" ? "selected" : ""}>Not ref</option>
            </select>
          </label>
          <label class="field">
            Importo fattura
            <div class="currency-input">
              <input type="number" min="0" step="0.01" value="${escapeHtml(billing.invoiceAmount)}" data-action="billing-field" data-field="invoiceAmount" />
              <span>EUR</span>
            </div>
          </label>
        </div>

        <div class="workspace-results">
          <div class="billing-card">
            <span>Tariffa cliente</span>
            <strong>${calc.customerRate == null ? "NOT REF VISIBILE DOPO 48H" : fmt(calc.customerRate)}</strong>
            <small>${calc.customerRate == null ? "" : isBooking ? "Booking lordo cliente" : "Tariffa canale prima del netto"}</small>
          </div>
          <div class="billing-card highlight">
            <span>Netto atteso</span>
            <strong>${calc.expectedNet == null ? "-" : fmt(calc.expectedNet)}</strong>
            <small>${isBooking ? `lordo -${calc.channel?.comm || 0}% commissione` : "netto diretto da confrontare"}</small>
          </div>
          <div class="billing-card">
            <span>Importo fattura</span>
            <strong>${calc.invoice == null ? "-" : fmt(calc.invoice)}</strong>
            <small>dato inserito manualmente</small>
          </div>
          <div class="billing-card ${calc.diff == null ? "" : Math.abs(calc.diff) <= 0.5 ? "ok-card" : "risk-card"}">
            <span>Differenza</span>
            <strong>${calc.diff == null ? "-" : fmt(calc.diff)}</strong>
            <small>${calc.diff == null ? "in attesa" : "fattura - netto atteso"}</small>
          </div>
        </div>
      </div>

      <div class="rule-strip">
        <span>Booking.com: lordo cliente meno commissione.</span>
        <span>WebBeds e HotelBeds: controllo sul netto atteso.</span>
        <span>Nessun collegamento API: i dati si verificano a mano.</span>
      </div>
    </section>
  `;
}

function revenueAutoRoomId(prop) {
  if (!prop?.rooms?.length) return null;
  if (prop.id === "laville") return "lv_classic";
  const baseRoom = prop.rooms.find((room) => room.base);
  return baseRoom?.id || prop.rooms[0]?.id || null;
}

function revenueRoomLabel(prop, roomId) {
  const room = prop?.rooms?.find((item) => item.id === roomId);
  if (!room) return roomId;
  const cleaned = cleanRoomOccupancyName(room.name) || room.name;
  if (/tripla/i.test(room.name)) return cleaned;
  return `${cleaned} Dbl`;
}

function revenueBaselineSnapshot(propertyId, roomId, stayDate) {
  const prop = state.data.find((item) => item.id === propertyId) || currentProp();
  return {
    room: roomId ? getAvailability(propertyId, roomId, stayDate) : null,
    total: getAggregateAvailability(prop, stayDate, "double"),
  };
}

function normalizeRevenueRoomLabel(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\bdbl\b/g, "")
    .replace(/\bdus\b/g, "")
    .trim();
}

function resolveRevenueEntryRoomId(entry, prop = currentProp()) {
  if (entry?.roomId && prop.rooms.some((room) => room.id === entry.roomId)) return entry.roomId;
  const roomLabel = normalizeRevenueRoomLabel(entry?.roomLabel || "");
  if (!roomLabel) return null;
  const matchedRoom = prop.rooms.find((room) => {
    const aliasList = [
      room.name,
      cleanRoomOccupancyName(room.name),
      revenueRoomLabel(prop, room.id),
      roomSelectLabel(prop, room),
    ].map(normalizeRevenueRoomLabel);
    return aliasList.some((alias) => alias && (roomLabel.includes(alias) || alias.includes(roomLabel)));
  });
  return matchedRoom?.id || null;
}

function daysBetweenDates(fromDate, toDate = todayLocal()) {
  if (!fromDate || !toDate) return null;
  const from = dateToLocalMidnight(fromDate);
  const to = dateToLocalMidnight(toDate);
  if (!Number.isFinite(from.getTime()) || !Number.isFinite(to.getTime())) return null;
  return Math.round((to - from) / 86400000);
}

function revenueEntryProgress(entry, today = todayLocal()) {
  const prop = state.data.find((item) => item.id === (entry.propertyId || currentProp().id)) || currentProp();
  const roomId = resolveRevenueEntryRoomId(entry, prop);
  const currentRoomAvailability = roomId ? getAvailability(prop.id, roomId, entry.stayDate) : null;
  const currentTotalAvailability = getAggregateAvailability(prop, entry.stayDate, "double");
  const baselineRoomAvailability = Number(entry.baselineRoomAvailability);
  const baselineTotalAvailability = Number(entry.baselineTotalAvailability);
  const useRoomScope = roomId != null && Number.isFinite(baselineRoomAvailability) && currentRoomAvailability != null;
  const baseline = useRoomScope
    ? baselineRoomAvailability
    : Number.isFinite(baselineTotalAvailability) ? baselineTotalAvailability : null;
  const current = useRoomScope ? currentRoomAvailability : currentTotalAvailability;
  const ageDays = daysBetweenDates(entry.actionDate, today);
  const scopeLabel = useRoomScope ? "camera" : "totale hotel";
  if (entry.closedAt) {
    return {
      level: "closed",
      title: "Chiuso",
      hint: `Voce chiusa il ${formatItalianDate(entry.closedAt)}.`,
      scopeLabel,
      ageDays,
    };
  }
  if (baseline == null || current == null) {
    return {
      level: "unknown",
      title: "Monitoraggio in attesa",
      hint: "Non ho abbastanza disponibilità per misurare il pickup su questa data.",
      scopeLabel,
      ageDays,
    };
  }
  const bookedDelta = baseline - current;
  if (bookedDelta >= 5) {
    return {
      level: "hot",
      title: `+${bookedDelta} prenotazioni dopo la modifica`,
      hint: ageDays != null && ageDays >= 7 ? "Trend forte: puoi valutare un rialzo." : "Pickup molto buono: tieni monitorato il ritmo.",
      scopeLabel,
      ageDays,
      bookedDelta,
      baseline,
      current,
    };
  }
  if (bookedDelta >= 1) {
    return {
      level: "good",
      title: `+${bookedDelta} prenotazioni`,
      hint: "La modifica sta reagendo: puoi mantenere o ritoccare leggermente.",
      scopeLabel,
      ageDays,
      bookedDelta,
      baseline,
      current,
    };
  }
  if (bookedDelta < 0) {
    return {
      level: "down",
      title: `+${Math.abs(bookedDelta)} disponibilità (cancellazioni)`,
      hint: "Sono entrate cancellazioni: valuta se difendere o rilanciare la tariffa.",
      scopeLabel,
      ageDays,
      bookedDelta,
      baseline,
      current,
    };
  }
  if (ageDays != null && ageDays >= 7) {
    return {
      level: "idle",
      title: `Nessuna prenotazione da ${ageDays} giorni`,
      hint: "Nessun movimento: valuta ribasso o promo.",
      scopeLabel,
      ageDays,
      bookedDelta,
      baseline,
      current,
    };
  }
  return {
    level: "neutral",
    title: "Nessuna prenotazione ancora",
    hint: "Monitoriamo i prossimi giorni prima di cambiare.",
    scopeLabel,
    ageDays,
    bookedDelta,
    baseline,
    current,
  };
}

function buildRevenueEntriesFromRateImport(propertyId, previousRates, importedRates, actionDate = todayLocal()) {
  const prop = state.data.find((item) => item.id === propertyId) || currentProp();
  const roomId = revenueAutoRoomId(prop);
  if (!roomId) return { entries: [], truncated: 0 };
  const roomLabel = revenueRoomLabel(prop, roomId);
  const dates = Object.keys(importedRates || {}).sort();
  const draft = [];
  dates.forEach((stayDate) => {
    const before = Number(previousRates?.[stayDate]?.[roomId]);
    const after = Number(importedRates?.[stayDate]?.[roomId]);
    if (!Number.isFinite(before) || !Number.isFinite(after) || before === after) return;
    const baseline = revenueBaselineSnapshot(propertyId, roomId, stayDate);
    draft.push({
      id: `rev-auto-${Date.now()}-${stayDate}-${roomId}-${draft.length}`,
      propertyId,
      actionDate,
      stayDate,
      channelId: "site",
      channelLabel: "Sito ufficiale",
      roomId,
      roomLabel,
      beforeRate: String(before),
      afterRate: String(after),
      delta: after - before,
      pickup24: "",
      pickup48: "",
      reason: "Import tariffe",
      note: "Variazione rilevata automaticamente dal caricamento tariffe.",
      auto: true,
      closedAt: "",
      baselineRoomAvailability: baseline.room,
      baselineTotalAvailability: baseline.total,
    });
  });
  let truncated = 0;
  let entries = draft;
  if (draft.length > AUTO_REVENUE_IMPORT_MAX_ENTRIES) {
    truncated = draft.length - AUTO_REVENUE_IMPORT_MAX_ENTRIES;
    entries = draft.slice(draft.length - AUTO_REVENUE_IMPORT_MAX_ENTRIES);
  }
  entries.sort((a, b) => b.stayDate.localeCompare(a.stayDate));
  return { entries, truncated };
}

const REVENUE_LEVEL_PRIORITY = {
  hot: 6,
  good: 5,
  idle: 4,
  down: 3,
  neutral: 2,
  unknown: 1,
  closed: 0,
};

function revenueMonthKey(dateStr = todayLocal()) {
  return String(dateStr || todayLocal()).slice(0, 7);
}

function revenueMonthStart(monthKey) {
  const [year, month] = String(monthKey).split("-").map(Number);
  return new Date(year, (month || 1) - 1, 1);
}

function shiftRevenueMonth(monthKey, offset) {
  const start = revenueMonthStart(monthKey);
  start.setMonth(start.getMonth() + offset);
  return `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}`;
}

function revenueMonthLabel(monthKey) {
  const [year, month] = String(monthKey).split("-").map(Number);
  if (!year || !month) return monthKey;
  return `${MONTHS[month - 1]} ${year}`;
}

function revenueCalendarDays(monthKey) {
  const monthStart = revenueMonthStart(monthKey);
  const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
  const startOffset = (monthStart.getDay() + 6) % 7;
  const totalDays = monthEnd.getDate();
  const cells = [];
  for (let i = 0; i < startOffset; i += 1) cells.push(null);
  for (let day = 1; day <= totalDays; day += 1) {
    const date = new Date(monthStart.getFullYear(), monthStart.getMonth(), day);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    cells.push(key);
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function revenueAlertForDate(entries, progressById) {
  if (!entries.length) return { level: "neutral", title: "Nessuna variazione", count: 0 };
  let best = { level: "neutral", title: "Monitoraggio", count: entries.length };
  entries.forEach((entry) => {
    const progress = progressById.get(entry.id) || revenueEntryProgress(entry);
    if ((REVENUE_LEVEL_PRIORITY[progress.level] || 0) > (REVENUE_LEVEL_PRIORITY[best.level] || 0)) {
      best = { level: progress.level, title: progress.title, count: entries.length };
    }
  });
  return best;
}

function revenueChangeType(entry) {
  if (!Number.isFinite(entry.delta)) return "n/d";
  if (entry.delta < 0) return "Rollback";
  if (entry.delta > 0) return "Rialzo";
  return "Allineamento";
}

function renderRevenueDiary(prop) {
  const today = todayLocal();
  const agendaDate = state.revenueAgendaDate || today;
  const monthKey = /^\d{4}-\d{2}$/.test(state.revenueCalendarMonth || "") ? state.revenueCalendarMonth : revenueMonthKey(agendaDate);
  const allEntries = [...state.revenueEntries]
    .sort((a, b) => b.actionDate.localeCompare(a.actionDate) || a.stayDate.localeCompare(b.stayDate));
  const progressById = new Map(allEntries.map((entry) => [entry.id, revenueEntryProgress(entry)]));
  const classifyEntry = (entry) => {
    const progress = progressById.get(entry.id) || revenueEntryProgress(entry);
    const bucket = entry.delta < 0 || progress.level === "down"
      ? "rollback"
      : progress.level === "hot" || progress.level === "good"
        ? "goal"
        : "watch";
    return { entry, progress, bucket };
  };
  const entriesByActionDate = allEntries.reduce((acc, entry) => {
    if (!acc[entry.actionDate]) acc[entry.actionDate] = [];
    acc[entry.actionDate].push(entry);
    return acc;
  }, {});
  const selectedDayEntries = entriesByActionDate[agendaDate] || [];

  const filteredEntries = allEntries.filter((entry) => {
    const progress = progressById.get(entry.id) || revenueEntryProgress(entry);
    if (!state.revenueAgendaShowAll && entry.actionDate !== agendaDate) return false;
    if (state.revenueFilterLevel !== "all" && progress.level !== state.revenueFilterLevel) return false;
    return true;
  });

  const maxVisibleRows = 500;
  const visibleEntries = filteredEntries.slice(0, maxVisibleRows);
  const remainingEntries = Math.max(0, filteredEntries.length - visibleEntries.length);
  const filteredClassified = filteredEntries.map(classifyEntry);
  const boardGoal = filteredClassified.filter((item) => item.bucket === "goal");
  const boardWatch = filteredClassified.filter((item) => item.bucket === "watch");
  const boardRollback = filteredClassified.filter((item) => item.bucket === "rollback");
  const timelineItems = filteredClassified.slice(0, 8);
  const monthEntries = allEntries.filter((entry) => entry.actionDate.slice(0, 7) === monthKey);
  const monthGoalCount = monthEntries.filter((entry) => {
    const progress = progressById.get(entry.id) || revenueEntryProgress(entry);
    return progress.level === "hot" || progress.level === "good";
  }).length;
  const monthRollbackCount = monthEntries.filter((entry) => {
    const progress = progressById.get(entry.id) || revenueEntryProgress(entry);
    return entry.delta < 0 || progress.level === "down";
  }).length;
  const monthWatchCount = Math.max(0, monthEntries.length - monthGoalCount - monthRollbackCount);
  const totalRollbacks = allEntries.filter((entry) => Number(entry.delta) < 0).length;
  const totalGood = allEntries.filter((entry) => {
    const level = (progressById.get(entry.id) || {}).level;
    return level === "hot" || level === "good";
  }).length;
  const totalWatch = allEntries.filter((entry) => {
    const level = (progressById.get(entry.id) || {}).level;
    return level === "idle" || level === "down" || level === "neutral" || level === "unknown";
  }).length;

  const calendarCells = revenueCalendarDays(monthKey);
  const timelineRowsHtml = timelineItems.length
    ? timelineItems.map(({ entry, progress, bucket }) => {
      const deltaLabel = entry.delta == null ? "-" : `${entry.delta >= 0 ? "+" : ""}${fmt(entry.delta)}`;
      const pickupLabel = progress.bookedDelta == null
        ? "Pickup in attesa"
        : progress.bookedDelta < 0
          ? `Cancellazioni +${Math.abs(progress.bookedDelta)}`
          : `Pickup +${progress.bookedDelta}`;
      return `
        <article class="revenue-timeline-row ${bucket}">
          <div class="revenue-timeline-dot ${bucket}"></div>
          <div class="revenue-timeline-main">
            <strong>${formatItalianDate(entry.actionDate)} · ${escapeHtml(revenueChangeType(entry))}</strong>
            <span>${escapeHtml(entry.roomLabel || "Camera")} · soggiorno ${formatItalianDate(entry.stayDate)}</span>
            <small>${escapeHtml(progress.hint || progress.title || "")}</small>
          </div>
          <div class="revenue-timeline-side">
            <span class="timeline-delta">${deltaLabel}</span>
            <span class="timeline-pickup">${escapeHtml(pickupLabel)}</span>
          </div>
        </article>
      `;
    }).join("")
    : `<div class="empty compact">Nessuna variazione nel periodo selezionato.</div>`;

  const buildBoardColumn = (title, key, items) => `
    <article class="revenue-board-col ${key}">
      <div class="revenue-board-col-head">
        <strong>${title}</strong>
        <span>${items.length}</span>
      </div>
      <div class="revenue-board-list">
        ${items.length ? items.slice(0, 6).map(({ entry, progress }) => {
          const deltaLabel = entry.delta == null ? "-" : `${entry.delta >= 0 ? "+" : ""}${fmt(entry.delta)}`;
          return `
            <div class="revenue-board-card ${key}">
              <div class="revenue-board-card-head">
                <small>${formatItalianDate(entry.actionDate)} · ${formatItalianDate(entry.stayDate)}</small>
                <span>${deltaLabel}</span>
              </div>
              <strong>${escapeHtml(entry.roomLabel || "Camera")}</strong>
              <p>${escapeHtml(progress.title || "Monitoraggio")}</p>
            </div>
          `;
        }).join("") : `<div class="empty compact">Nessuna voce.</div>`}
      </div>
    </article>
  `;

  return `
    <section class="panel workspace-panel">
      <div class="workspace-head">
        <div>
          <h2>Diario revenue</h2>
          <p>Registro automatico delle variazioni tariffarie rilevate durante il caricamento tariffe.</p>
        </div>
        <span class="import-preview">Ultimo import: ${escapeHtml(state.importer.lastUpload || "-")}</span>
      </div>

      <div class="revenue-kpi-strip">
        <div class="revenue-kpi">
          <small>Variazioni auto</small>
          <strong>${allEntries.length}</strong>
        </div>
        <div class="revenue-kpi">
          <small>Rollback</small>
          <strong>${totalRollbacks}</strong>
        </div>
        <div class="revenue-kpi">
          <small>Goal</small>
          <strong>${totalGood}</strong>
        </div>
        <div class="revenue-kpi">
          <small>Da monitorare</small>
          <strong>${totalWatch}</strong>
        </div>
      </div>

      <div class="revenue-ac-grid">
        <section class="revenue-timeline-panel">
          <div class="revenue-register-head">
            <strong>Timeline automatica</strong>
            <span class="mini">${state.revenueAgendaShowAll ? "Storico filtrato" : `Solo ${formatItalianDate(agendaDate)}`}</span>
          </div>
          <div class="revenue-timeline-list">
            ${timelineRowsHtml}
          </div>
        </section>

        <section class="revenue-board-panel">
          <div class="revenue-register-head">
            <strong>Board esiti</strong>
            <span class="mini">${revenueMonthLabel(monthKey)}</span>
          </div>
          <div class="revenue-board-summary">
            <span class="goal">Goal ${monthGoalCount}</span>
            <span class="watch">Da monitorare ${monthWatchCount}</span>
            <span class="rollback">Rollback ${monthRollbackCount}</span>
          </div>
          <div class="revenue-board-grid">
            ${buildBoardColumn("Goal", "goal", boardGoal)}
            ${buildBoardColumn("Da monitorare", "watch", boardWatch)}
            ${buildBoardColumn("Rollback", "rollback", boardRollback)}
          </div>
        </section>
      </div>

      <div class="revenue-bd-grid">
        <section class="revenue-calendar-panel">
          <div class="revenue-calendar-head">
            <div class="revenue-calendar-nav">
              <button class="ghost compact-button" data-action="revenue-month-prev" aria-label="Mese precedente">◀</button>
              <strong>${revenueMonthLabel(monthKey)}</strong>
              <button class="ghost compact-button" data-action="revenue-month-next" aria-label="Mese successivo">▶</button>
            </div>
            <button class="ghost compact-button" data-action="revenue-day-today">Oggi</button>
          </div>
          <div class="revenue-calendar-weekdays">
            ${WEEKDAYS.map((label) => `<span>${label}</span>`).join("")}
          </div>
          <div class="revenue-calendar-grid">
            ${calendarCells.map((dateKey) => {
              if (!dateKey) return `<div class="revenue-day empty"></div>`;
              const entries = entriesByActionDate[dateKey] || [];
              const alert = revenueAlertForDate(entries, progressById);
              const isSelected = dateKey === agendaDate;
              const isToday = dateKey === today;
              return `
                <button class="revenue-day ${alert.level} ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}" data-action="revenue-select-day" data-date="${dateKey}">
                  <div class="revenue-day-top">
                    <strong>${Number(dateKey.slice(-2))}</strong>
                  </div>
                  <small>${entries.length}</small>
                </button>
              `;
            }).join("")}
          </div>
          <div class="revenue-calendar-meta">
            <span>${selectedDayEntries.length} variazioni il ${formatItalianDate(agendaDate)}</span>
          </div>
        </section>

        <section class="revenue-register-panel">
          <div class="revenue-register-head">
            <strong>Registro compatto</strong>
            ${state.revenueRegisterOpen
              ? `
                <div class="revenue-register-actions">
                  <button class="ghost compact-button" data-action="revenue-toggle-all">${state.revenueAgendaShowAll ? "Solo giorno" : "Tutto storico"}</button>
                  <button class="ghost compact-button" data-action="revenue-register-close">Chiudi</button>
                </div>
              `
              : `<span class="mini">Clicca un giorno del calendario per aprire</span>`}
          </div>
          ${state.revenueRegisterOpen
            ? `
              <div class="revenue-filters">
                <label class="field">
                  Performance
                  <select data-action="revenue-filter" data-field="level">
                    <option value="all" ${state.revenueFilterLevel === "all" ? "selected" : ""}>Tutti</option>
                    <option value="hot" ${state.revenueFilterLevel === "hot" ? "selected" : ""}>Goal forte</option>
                    <option value="good" ${state.revenueFilterLevel === "good" ? "selected" : ""}>Positivo</option>
                    <option value="idle" ${state.revenueFilterLevel === "idle" ? "selected" : ""}>Fermo</option>
                    <option value="down" ${state.revenueFilterLevel === "down" ? "selected" : ""}>Cancellazioni</option>
                    <option value="neutral" ${state.revenueFilterLevel === "neutral" ? "selected" : ""}>In attesa</option>
                    <option value="unknown" ${state.revenueFilterLevel === "unknown" ? "selected" : ""}>Dati mancanti</option>
                    <option value="closed" ${state.revenueFilterLevel === "closed" ? "selected" : ""}>Chiuso</option>
                  </select>
                </label>
              </div>
              <div class="diary-table-wrap">
                <table class="diary-table">
                  <thead>
                    <tr>
                      <th>Azione</th>
                      <th>Soggiorno</th>
                      <th>Tipo</th>
                      <th>Camera</th>
                      <th>Prima</th>
                      <th>Dopo</th>
                      <th>Delta</th>
                      <th>Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${visibleEntries.length ? visibleEntries.map((entry) => {
                      const progress = progressById.get(entry.id) || revenueEntryProgress(entry);
                      const dayHistory = allEntries.filter((item) => item.stayDate === entry.stayDate && resolveRevenueEntryRoomId(item, prop) === resolveRevenueEntryRoomId(entry, prop));
                      return `
                        <tr>
                          <td>${formatItalianDate(entry.actionDate)}</td>
                          <td>${formatItalianDate(entry.stayDate)}</td>
                          <td>${escapeHtml(revenueChangeType(entry))}</td>
                          <td>${escapeHtml(entry.roomLabel || "Camera")}</td>
                          <td>${entry.beforeRate === "" ? "-" : fmt(Number(entry.beforeRate))}</td>
                          <td>${entry.afterRate === "" ? "-" : fmt(Number(entry.afterRate))}</td>
                          <td>${entry.delta == null ? "-" : `${entry.delta >= 0 ? "+" : ""}${fmt(entry.delta)}`}</td>
                          <td>
                            <span class="revenue-alert ${progress.level}">${escapeHtml(progress.title)}</span>
                            ${dayHistory.length > 1 ? `<div class="revenue-memory">${dayHistory.length} cambi su data/camera</div>` : ""}
                          </td>
                        </tr>
                      `;
                    }).join("") : `<tr><td colspan="8">Nessuna variazione nel filtro corrente.</td></tr>`}
                  </tbody>
                </table>
                ${remainingEntries > 0 ? `<div class="revenue-table-foot">Mostro ${maxVisibleRows} righe su ${filteredEntries.length}. Altre ${remainingEntries} disponibili con filtri più stretti.</div>` : ""}
              </div>
            `
            : `
              <div class="revenue-register-empty">
                <div class="revenue-register-empty-icon">📅</div>
                <strong>Registro compatto chiuso</strong>
                <span>Seleziona un giorno nel calendario per vedere i dettagli.</span>
              </div>
            `}
        </section>
      </div>
    </section>
  `;
}

function sitePromoConditionLabel(condition) {
  return {
    none: "Sempre",
    last_minute: "Last minute 24h",
    early_bird: "Early booking 30+",
    three_nights: "Mlos 3",
    weekend: "Weekend ven/sab/dom",
  }[condition || "none"] || "Sempre";
}

function sitePromoAppliesLabel(appliesTo) {
  return {
    notref: "Solo NOT REF",
    flex: "Solo FLEX",
    both: "FLEX + NOT REF",
  }[appliesTo || "notref"] || "Solo NOT REF";
}

function sitePromoDateValue(promo, field) {
  return promo?.dates?.[0]?.[field] || "";
}

function updateSitePromoField(index, field, value) {
  const prop = currentProp();
  const promos = (prop.sitePromos || []).map((promo, promoIndex) => {
    if (promoIndex !== index) return promo;
    const next = { ...promo };
    if (field === "on") next.on = Boolean(value);
    else if (field === "p") next.p = Math.max(0, Math.min(90, Number(value || 0)));
    else if (field === "condition") {
      next.condition = value === "none" ? "" : value;
      if (value === "three_nights") next.minStay = next.minStay || 3;
    } else if (field === "from" || field === "to") {
      const current = next.dates?.[0] || { from: "", to: "" };
      const draft = { ...current, [field]: value };
      next.dates = draft.from || draft.to ? [{ from: draft.from || "1900-01-01", to: draft.to || "2099-12-31" }] : [];
    } else {
      next[field] = value;
    }
    return next;
  });
  const data = clone(state.data);
  data[state.curIdx] = { ...data[state.curIdx], sitePromos: promos };
  state.data = data;
  saveStoredImportData();
}

function renderSitePromoManager(prop) {
  const promos = prop.sitePromos || [];
  return `
    <section class="promo-manager">
      <div class="promo-manager-head">
        <div>
          <h3>Promo sito</h3>
          <p>Modifica le promo reali del sito senza andare a toccare formule o canali.</p>
        </div>
        <button class="ghost" data-action="add-site-promo">+ promo sito</button>
      </div>
      <div class="promo-manager-list">
        ${promos.map((promo, index) => `
          <div class="promo-edit-row">
            <label class="promo-toggle">
              <input type="checkbox" ${promo.on ? "checked" : ""} data-action="site-promo-field" data-index="${index}" data-field="on" />
              <span>Attiva</span>
            </label>
            <label>
              Nome
              <input type="text" value="${escapeHtml(promo.l || "")}" data-action="site-promo-field" data-index="${index}" data-field="l" />
            </label>
            <label>
              %
              <input type="number" min="0" max="90" value="${escapeHtml(promo.p ?? "")}" data-action="site-promo-field" data-index="${index}" data-field="p" />
            </label>
            <label>
              Regola
              <select data-action="site-promo-field" data-index="${index}" data-field="condition">
                ${["last_minute", "early_bird", "three_nights", "weekend", "none"].map((condition) => `<option value="${condition}" ${(promo.condition || "none") === condition ? "selected" : ""}>${sitePromoConditionLabel(condition)}</option>`).join("")}
              </select>
            </label>
            <label>
              Applica a
              <select data-action="site-promo-field" data-index="${index}" data-field="appliesTo">
                ${["notref", "flex", "both"].map((target) => `<option value="${target}" ${(promo.appliesTo || "notref") === target ? "selected" : ""}>${sitePromoAppliesLabel(target)}</option>`).join("")}
              </select>
            </label>
            <label>
              Dal
              <input type="date" value="${escapeHtml(sitePromoDateValue(promo, "from"))}" data-action="site-promo-field" data-index="${index}" data-field="from" />
            </label>
            <label>
              Al
              <input type="date" value="${escapeHtml(sitePromoDateValue(promo, "to"))}" data-action="site-promo-field" data-index="${index}" data-field="to" />
            </label>
            <label class="promo-note-field">
              Nota
              <input type="text" value="${escapeHtml(promo.note || "")}" data-action="site-promo-field" data-index="${index}" data-field="note" />
            </label>
            <button class="ghost danger-text" data-action="delete-site-promo" data-index="${index}">Rimuovi</button>
          </div>
        `).join("") || `<div class="empty compact">Nessuna promo sito configurata.</div>`}
      </div>
    </section>
  `;
}

const EXPECTED_AVAIL_HEADERS = [
  "charme",
  "classic",
  "superior",
  "superior tripla",
  "deluxe twin",
  "deluxe",
  "superior letto",
  "family superior",
  "family junior",
  "deluxe letto",
];

const EXPECTED_AVAIL_HEADER_ALIASES = {
  charme: ["charme", "charme double"],
  classic: ["classic"],
  superior: ["superior", "superior double/twin", "superior double"],
  "superior tripla": ["superior tripla", "superior triple"],
  "deluxe twin": ["deluxe twin", "deluxe double/twin"],
  deluxe: ["deluxe", "deluxe double"],
  "superior letto": ["superior letto", "superior double con letto", "superior double con letto aggiunto"],
  "family superior": ["family superior"],
  "family junior": ["family junior"],
  "deluxe letto": ["deluxe letto", "deluxe double con letto", "deluxe double con letto aggiunto"],
};

function normalizeHeaderCell(cell) {
  return String(cell || "").toLowerCase()
    .replace(/\|/g, " ")
    .replace(/\d+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function matchHeaderCell(cell, expectedRoom) {
  const normalized = normalizeHeaderCell(cell);
  const aliases = EXPECTED_AVAIL_HEADER_ALIASES[expectedRoom] || [expectedRoom];
  return aliases.some((alias) => normalized.includes(alias));
}

function detectFixedAvailabilityFormat(lines) {
  if (!lines || lines.length < 2) return null;

  // Supporta sia header classico (DATE in colonna A)
  // sia export con timestamp in colonna A e DATE in colonna B.
  for (let rowIdx = 0; rowIdx < Math.min(8, lines.length); rowIdx += 1) {
    const cells = splitImportLine(lines[rowIdx]);
    if (cells.length < 11) continue;

    const dateColCandidates = [];
    cells.forEach((cell, colIdx) => {
      const normalized = String(cell || "").trim().toLowerCase();
      if (normalized === "date") dateColCandidates.push(colIdx);
    });
    if (!dateColCandidates.length) continue;

    for (const dateCol of dateColCandidates) {
      const matchedCols = [];
      const usedCols = new Set();
      let allMatched = true;

      for (let roomIdx = 0; roomIdx < EXPECTED_AVAIL_HEADERS.length; roomIdx += 1) {
        let found = false;
        for (let colIdx = 0; colIdx < cells.length; colIdx += 1) {
          if (colIdx === dateCol) continue;
          if (usedCols.has(colIdx)) continue;
          if (matchHeaderCell(cells[colIdx], EXPECTED_AVAIL_HEADERS[roomIdx])) {
            matchedCols.push(colIdx);
            usedCols.add(colIdx);
            found = true;
            break;
          }
        }
        if (!found) {
          allMatched = false;
          break;
        }
      }

      if (allMatched && matchedCols.length === EXPECTED_AVAIL_HEADERS.length) {
        return {
          format: "beddzle-fixed",
          headerRow: rowIdx,
          dataStartRow: rowIdx + 1,
          dateCol,
          availCols: matchedCols,
          confidence: "high",
        };
      }
    }
  }

  return null;
}

function normalizeRoomTypeForMatching(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[|/_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function bookingRoomTypeToRoomId(roomTypeName, propertyId = "laville") {
  const roomType = normalizeRoomTypeForMatching(roomTypeName);
  if (!roomType) return null;
  if (propertyId === "pineta") {
    if (roomType.includes("comfort") && roomType.includes("tripla")) return "pp2";
    if (roomType.includes("comfort") && roomType.includes("premium")) return "pp3";
    if (roomType.includes("matrim") || (roomType.includes("letto") && roomType.includes("cp"))) return "pp4";
    if (roomType.includes("superior")) return "pp5";
    if (roomType.includes("junior")) return "pp6";
    if (roomType.includes("suite")) return "pp7";
    if (roomType.includes("comfort")) return "pp1";
    return null;
  }
  if (roomType.includes("superior") && roomType.includes("letto")) return "lv_superior_letto";
  if (roomType.includes("deluxe") && roomType.includes("letto")) return "lv_deluxe_letto";
  if (roomType.includes("family superior")) return "lv_family_superior";
  if (roomType.includes("family junior")) return "lv_family_junior";
  if (roomType.includes("superior") && (roomType.includes("tripla") || roomType.includes("triple"))) return "lv_superior_tripla";
  if (roomType.includes("deluxe") && roomType.includes("twin")) return "lv_deluxe_twin";
  if (roomType.includes("deluxe") && roomType.includes("double")) return "lv_deluxe";
  if (roomType.includes("superior") && (roomType.includes("double") || roomType.includes("twin"))) return "lv_superior";
  if (roomType.includes("charme")) return "lv_charme";
  if (roomType.includes("classic")) return "lv_classic";
  if (roomType === "superior") return "lv_superior";
  if (roomType === "deluxe") return "lv_deluxe";
  return null;
}

function detectBookingsFormat(lines) {
  for (let rowIdx = 0; rowIdx < Math.min(5, lines.length); rowIdx += 1) {
    const cells = splitImportLine(lines[rowIdx]);
    if (!cells.length) continue;
    const headers = cells.map((cell) => String(cell || "").trim().toUpperCase());
    const headerIndex = (name) => headers.findIndex((header) => header === name);
    const checkInCol = headerIndex("CHECK_IN");
    const checkOutCol = headerIndex("CHECK_OUT");
    const roomTypeCol = headerIndex("ROOM_TYPE_NAME");
    if (checkInCol < 0 || checkOutCol < 0 || roomTypeCol < 0) continue;
    return {
      format: "beddzle-bookings",
      headerRow: rowIdx,
      dataStartRow: rowIdx + 1,
      cols: {
        checkIn: checkInCol,
        checkOut: checkOutCol,
        roomType: roomTypeCol,
        bkStatus: headerIndex("BK_STATUS"),
        isConfirmed: headerIndex("IS_CONFIRMED"),
        isCancelled: headerIndex("IS_CANCELLED"),
        roomKey: headerIndex("ROOM_KEY"),
        bkRoomId: headerIndex("BK_ROOM_ID"),
      },
    };
  }
  return null;
}

function dateToIso(value) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateBefore(a, b) {
  return a < b;
}

function forEachNight(checkIn, checkOut, callback) {
  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime())) return;
  const cursor = new Date(start);
  while (cursor < end) {
    callback(dateToIso(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
}

function forEachDateInclusive(fromDate, toDate, callback) {
  const start = new Date(`${fromDate}T00:00:00`);
  const end = new Date(`${toDate}T00:00:00`);
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime())) return;
  const cursor = new Date(start);
  while (cursor <= end) {
    callback(dateToIso(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
}

function defaultAvailabilityCapacityRow(propertyId, expectedColumns) {
  if (propertyId === "laville") {
    return [3, 6, 2, 1, 2, 3, 2, 1, 1, 1].slice(0, expectedColumns);
  }
  const prop = DEFAULT_DATA.find((item) => item.id === propertyId);
  const availabilityOrder = roomOrderForProperty(propertyId, "availability").slice(0, expectedColumns);
  if (prop?.rooms?.length && availabilityOrder.length) {
    const byRoomId = Object.fromEntries(prop.rooms.map((room) => [room.id, Number(room.availability ?? 0)]));
    return availabilityOrder.map((roomId) => Number(byRoomId[roomId] ?? 0));
  }
  return Array.from({ length: expectedColumns }, () => 0);
}

function maxAvailabilityFromStore(propertyId, expectedColumns) {
  const store = availabilityStore(propertyId) || {};
  const maxima = Array.from({ length: expectedColumns }, () => 0);
  Object.values(store).forEach((row) => {
    const clean = normalizeAvailabilityRowByProperty(propertyId, row);
    if (!clean) return;
    clean.forEach((value, index) => {
      maxima[index] = Math.max(maxima[index] || 0, Number(value) || 0);
    });
  });
  return maxima;
}

function analyzeBookingsAvailability(raw, propertyId = "laville") {
  const expectedColumns = expectedAvailabilityColumns(propertyId);
  const availabilityOrder = roomOrderForProperty(propertyId, "availability").slice(0, expectedColumns);
  const roomIndexById = Object.fromEntries(availabilityOrder.map((roomId, index) => [roomId, index]));
  const minDate = AVAILABILITY_HISTORY_START;
  const maxDate = AVAILABILITY_HISTORY_END;
  const lines = String(raw || "")
    .trim()
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const format = detectBookingsFormat(lines);
  if (!format) return null;

  const warnings = [];
  const roomKeySets = Object.fromEntries(availabilityOrder.map((roomId) => [roomId, new Set()]));
  const bookedByDate = {};
  const seenActiveRows = new Set();
  let skippedRows = 0;
  let unknownRoomRows = 0;
  let earliestBookingStart = null;
  let latestBookingEnd = null;

  const rows = lines.slice(format.dataStartRow);
  rows.forEach((line, lineIndex) => {
    const cells = splitImportLine(line);
    const roomTypeRaw = cells[format.cols.roomType];
    const roomId = bookingRoomTypeToRoomId(roomTypeRaw, propertyId);
    const checkIn = normalizeImportDate(cells[format.cols.checkIn] || "");
    const checkOut = normalizeImportDate(cells[format.cols.checkOut] || "");

    if (!roomId) {
      unknownRoomRows += 1;
      return;
    }

    if (!checkIn || !checkOut || !dateBefore(checkIn, checkOut)) {
      skippedRows += 1;
      return;
    }
    if (!earliestBookingStart || checkIn < earliestBookingStart) earliestBookingStart = checkIn;
    if (!latestBookingEnd || checkOut > latestBookingEnd) latestBookingEnd = checkOut;

    const status = format.cols.bkStatus >= 0 ? String(cells[format.cols.bkStatus] || "").trim().toLowerCase() : "";
    const confirmedFlag = format.cols.isConfirmed >= 0 ? String(cells[format.cols.isConfirmed] || "").trim().toUpperCase() : "";
    const cancelledFlag = format.cols.isCancelled >= 0 ? String(cells[format.cols.isCancelled] || "").trim().toUpperCase() : "";
    const cancelled = cancelledFlag === "Y" || /(cancel|deleted|delete|no ?show)/i.test(status);
    let active = false;
    if (confirmedFlag) active = confirmedFlag === "Y" && !cancelled;
    else active = !cancelled && !status.includes("pending");
    if (!active) return;

    const roomKey = format.cols.roomKey >= 0 ? String(cells[format.cols.roomKey] || "").trim() : "";
    if (roomKey && active) {
      // Aggiungi ai set solo se la prenotazione interseca il range di calcolo
      // Evita che prenotazioni 2024-2025 gonfino la capacità 2026+
      const intersectsRange = !checkOut || checkOut > minDate;
      if (intersectsRange) {
        roomKeySets[roomId].add(roomKey);
      }
    }

    const bookingRoomId = format.cols.bkRoomId >= 0 ? String(cells[format.cols.bkRoomId] || "").trim() : "";
    const uniq = `${bookingRoomId || `row-${lineIndex}`}|${roomId}|${checkIn}|${checkOut}`;
    if (seenActiveRows.has(uniq)) return;
    seenActiveRows.add(uniq);

    const rowIndex = roomIndexById[roomId];
    if (rowIndex == null || rowIndex >= expectedColumns) return;

    forEachNight(checkIn, checkOut, (dateKey) => {
      if (dateKey < minDate || dateKey > maxDate) return;
      if (!bookedByDate[dateKey]) bookedByDate[dateKey] = Array.from({ length: expectedColumns }, () => 0);
      bookedByDate[dateKey][rowIndex] += 1;
    });
  });

  const defaults = defaultAvailabilityCapacityRow(propertyId, expectedColumns);
  const fromStore = maxAvailabilityFromStore(propertyId, expectedColumns);
  const fromRoomKeys = availabilityOrder.map((roomId) => roomKeySets[roomId]?.size || 0);
  const capacities = defaults.map((base, index) => {
    const roomKeyCount = Number(fromRoomKeys[index]) || 0;
    const storeCapacity = Number(fromStore[index]) || 0;
    const defaultCapacity = Number(base) || 0;

    if (roomKeyCount > 0 && defaultCapacity > 0) {
      const diff = roomKeyCount - defaultCapacity;
      if (Math.abs(diff) <= 1) {
        // Vicinanza: il default è affidabile
        return defaultCapacity;
      } else if (diff < -1) {
        // Meno stanze viste: fidati dei dati (stanze dismesse)
        return roomKeyCount;
      }
      // Più stanze viste: default probabilmente obsoleto, ma alza di max 1
      return defaultCapacity + 1;
    }

    if (storeCapacity > 0) {
      const maxFromStore = Math.max(defaultCapacity * 2, defaultCapacity + 2, 8);
      if (storeCapacity <= maxFromStore) {
        return Math.max(defaultCapacity, storeCapacity);
      }
    }

    return Math.max(defaultCapacity, roomKeyCount);
  });
  const capacityTotal = capacities.reduce((acc, value) => acc + value, 0);
  if (capacityTotal <= 0) {
    warnings.push("Capacità camere non riconosciuta dalle prenotazioni. Controlla ROOM_TYPE_NAME e ROOM_KEY.");
  }
  if (unknownRoomRows > 0) {
    warnings.push(`${unknownRoomRows} righe con ROOM_TYPE_NAME non mappato.`);
  }

  const previewRows = {};
  forEachDateInclusive(minDate, maxDate, (dateKey) => {
    const booked = bookedByDate[dateKey] || Array.from({ length: expectedColumns }, () => 0);
    const availability = capacities.map((capacity, index) => {
      const residual = Number(capacity || 0) - Number(booked[index] || 0);
      return residual < 0 ? 0 : residual;
    });
    if (isValidAvailabilityRow(availability, expectedColumns)) {
      previewRows[dateKey] = availability;
    }
  });

  const validRows = Object.keys(previewRows).length;
  if (validRows === 0 && earliestBookingStart && latestBookingEnd) {
    warnings.push(`Prenotazioni trovate nel file: ${earliestBookingStart} → ${latestBookingEnd}. Range accettato in PRISMA: ${minDate} → ${maxDate}.`);
  }
  return {
    analyzed: true,
    validRows,
    skippedRows,
    columnsFound: expectedColumns,
    firstDataRow: rows[0]?.substring(0, 80) || null,
    detectedFormat: {
      name: "beddzle-bookings",
      confidence: "high",
      description: "Disponibilità calcolata da CHECK_IN/CHECK_OUT delle prenotazioni",
    },
    warnings,
    previewRows,
    hasErrors: validRows === 0,
  };
}

function analyzeAvailabilityImport(raw, propertyId = "laville") {
  const minDate = AVAILABILITY_HISTORY_START;
  const maxDate = AVAILABILITY_HISTORY_END;
  const expectedColumns = expectedAvailabilityColumns(propertyId);

  if (!raw || !raw.trim()) {
    return { analyzed: false, validRows: 0, warnings: [], previewRows: {} };
  }

  const lines = String(raw)
    .trim()
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const bookingResult = analyzeBookingsAvailability(raw, propertyId);
  if (bookingResult) return bookingResult;

  const fixedFormat = detectFixedAvailabilityFormat(lines);

  if (fixedFormat) {
    const warnings = [];
    const previewRows = {};
    let validRows = 0;
    let skippedRows = 0;
    let earliestSeenDate = null;
    let latestSeenDate = null;

    const dataLines = lines.slice(fixedFormat.dataStartRow);

    dataLines.forEach((line) => {
      const cells = splitImportLine(line);
      const dateStr = normalizeImportDate(cells[fixedFormat.dateCol] || "");
      if (dateStr) {
        if (!earliestSeenDate || dateStr < earliestSeenDate) earliestSeenDate = dateStr;
        if (!latestSeenDate || dateStr > latestSeenDate) latestSeenDate = dateStr;
      }

      if (!dateStr || dateStr < minDate || dateStr > maxDate) {
        skippedRows += 1;
        return;
      }

      const row = fixedFormat.availCols.map((colIdx) => {
        const rawVal = String(cells[colIdx] || "").trim().replace(",", ".");
        return Math.trunc(Number(rawVal));
      });

      if (!row.every((value) => Number.isFinite(value))) {
        skippedRows += 1;
        return;
      }

      if (!isValidAvailabilityRow(row, expectedColumns)) {
        skippedRows += 1;
        return;
      }

      previewRows[dateStr] = mergeAvailabilityRowsByMax(previewRows[dateStr], row);
      validRows += 1;
    });

    const uniqueDates = Object.keys(previewRows).length;
    if (uniqueDates === 0 && earliestSeenDate && latestSeenDate) {
      warnings.push(`Date trovate nel file: ${earliestSeenDate} → ${latestSeenDate}. Range accettato in PRISMA: ${minDate} → ${maxDate}.`);
    }

    return {
      analyzed: true,
      validRows: uniqueDates,
      skippedRows: Math.max(0, skippedRows + Math.max(0, validRows - uniqueDates)),
      columnsFound: fixedFormat.availCols.length,
      firstDataRow: lines[fixedFormat.dataStartRow]?.substring(0, 50) || null,
      detectedFormat: {
        name: "beddzle-fixed",
        confidence: "high",
        description: "Formato Beddzle pulito: header riconosciuto, 10 colonne disponibilità",
      },
      warnings: warnings.length ? warnings : [`Formato riconosciuto: ${fixedFormat.availCols.length} colonne disponibilità`],
      previewRows,
      hasErrors: false,
    };
  }

  const mixedResult = analyzeAvailabilityImportMixedFallback(raw, propertyId);
  if (mixedResult.validRows > 0) {
    return mixedResult;
  }

  return {
    analyzed: true,
    validRows: 0,
    skippedRows: 0,
    columnsFound: 0,
    firstDataRow: null,
    detectedFormat: {
      name: "unknown",
      confidence: "none",
      description: "Formato non riconosciuto",
    },
    warnings: [
      "Formato non riconosciuto. Atteso header: DATE, Charme, Classic, Superior, Superior Tripla, Deluxe Twin, Deluxe, Superior Letto, Family Superior, Family Junior, Deluxe Letto",
    ],
    previewRows: {},
    hasErrors: true,
  };
}

function analyzeAvailabilityImportMixedFallback(raw, propertyId = "laville") {
  const minDate = AVAILABILITY_HISTORY_START;
  const maxDate = AVAILABILITY_HISTORY_END;
  const expectedColumns = expectedAvailabilityColumns(propertyId);

  const lines = String(raw)
    .trim()
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  let dataStartIndex = -1;
  let dateColIndex = -1;

  for (let i = 0; i < Math.min(lines.length, 15); i += 1) {
    const cells = splitImportLine(lines[i]);
    for (let c = 0; c < cells.length; c += 1) {
      if (normalizeImportDate(cells[c])) {
        dataStartIndex = i;
        dateColIndex = c;
        break;
      }
    }
    if (dataStartIndex >= 0) break;
  }

  if (dataStartIndex < 0) {
    return { analyzed: true, validRows: 0, warnings: ["Nessuna colonna DATA trovata"], previewRows: {} };
  }

  const dataLines = lines.slice(dataStartIndex);
  const sample = dataLines.slice(0, Math.min(30, dataLines.length));
  const maxCols = sample.reduce((best, line) => Math.max(best, splitImportLine(line).length), 0);

  const colProfiles = [];
  for (let col = 0; col < maxCols; col += 1) {
    if (col === dateColIndex) continue;
    const values = [];
    sample.forEach((line) => {
      const cells = splitImportLine(line);
      const value = Number(String(cells[col] || "").trim().replace(",", "."));
      if (Number.isFinite(value)) values.push(value);
    });
    if (!values.length) continue;
    const maxThreshold = propertyId === "laville" ? LAVILLE_MAX_ROOM_AVAILABILITY : 50;
    const availCount = values.filter((value) => value >= -1 && value <= maxThreshold).length;
    colProfiles.push({ col, availRatio: availCount / values.length, max: Math.max(...values) });
  }

  const availCols = colProfiles
    .filter((profile) => profile.availRatio >= 0.7)
    .sort((a, b) => b.availRatio - a.availRatio)
    .slice(0, expectedColumns)
    .map((profile) => profile.col);

  const warnings = [];
  const previewRows = {};
  let validRows = 0;
  let skippedRows = 0;

  if (availCols.length >= expectedColumns) {
    dataLines.forEach((line) => {
      const cells = splitImportLine(line);
      const dateStr = normalizeImportDate(cells[dateColIndex] || "");
      if (!dateStr || dateStr < minDate || dateStr > maxDate) {
        skippedRows += 1;
        return;
      }
      const row = availCols.map((colIdx) => Math.trunc(Number(String(cells[colIdx] || "").trim().replace(",", "."))));
      if (!row.every((value) => Number.isFinite(value))) {
        skippedRows += 1;
        return;
      }
      if (!isValidAvailabilityRow(row, expectedColumns)) {
        skippedRows += 1;
        return;
      }
      previewRows[dateStr] = mergeAvailabilityRowsByMax(previewRows[dateStr], row);
      validRows += 1;
    });
  }

  const uniqueDates = Object.keys(previewRows).length;
  return {
    analyzed: true,
    validRows: uniqueDates,
    skippedRows: Math.max(0, skippedRows + Math.max(0, validRows - uniqueDates)),
    columnsFound: availCols.length,
    firstDataRow: dataStartIndex >= 0 ? lines[dataStartIndex]?.substring(0, 50) : null,
    detectedFormat: { name: "beddzle-mixed", confidence: "low", description: "Formato misto (fallback)" },
    warnings,
    previewRows,
    hasErrors: uniqueDates === 0,
  };
}

function renderRatesPanel(prop, importer) {
  const preview = parseImportedRates(importer.ratesText, prop.id);
  const count = Object.keys(preview).length;
  const range = importDateRangeLabel(preview);
  const rateOrder = roomOrderForProperty(prop.id, "rate");
  const previewRooms = rateOrder.slice(0, 3);
  const previewRoomLabels = previewRooms.map((roomId) => cleanRoomOccupancyName(roomIdToLabel(prop.id, roomId)));
  const previewRows = Object.entries(preview).slice(0, 5);
  const isLaVille = prop.id === "laville";
  const source = propertySourceSystems(prop.id);
  const pinetaBandSummary = PINETA_COMFORT_RATE_BANDS
    .map((band) => `${band.label} BB${band.bb}`)
    .join(" · ");
  const pinetaFigaroGroups = isLaVille ? {} : pinetaFigaroRatePlansByRoom();
  return `
    <div class="import-v2-panel">
      <div class="panel-header">
        <h3>Tariffe ${prop.label}</h3>
        <div class="panel-actions">
          <button class="ghost" data-action="clear-rates-text">Pulisci</button>
          <label class="file-btn">Carica file
            <input type="file" accept=".csv,.tsv,.txt,text/csv,text/tab-separated-values,text/plain" data-action="import-file" data-field="ratesText" hidden />
          </label>
        </div>
      </div>
      <div class="import-instructions">
        <div class="instruction-card">
          <strong>Istruzioni tariffe</strong>
          <p>${isLaVille
    ? 'Copia dal foglio <code>Price Strategy</code>. Per La Ville uso A=data e N=DUS; DBL=DUS+20.'
    : `Copia dal foglio tariffe di <code>${escapeHtml(source.rateSource)}</code>. Se incolli una sola colonna numerica, PRISMA ricostruisce le altre camere dai delta configurati su Pineta.`}</p>
          ${isLaVille ? "" : `
            <p><strong>Pineta Comfort:</strong> ${escapeHtml(pinetaBandSummary)}.</p>
            <p><strong>Room Only:</strong> EasyConsulting = BB - EUR 5 per persona. OTA e Wholesaler = BB - EUR 9 per camera.</p>
            <p><strong>Inventario:</strong> PRISMA non somma DUS/DP uguali al precedente, per evitare doppioni.</p>
            ${renderPinetaInventoryInfo()}
            <div class="import-rules pineta-figaro-plans">
              ${Object.entries(pinetaFigaroGroups).map(([roomLabel, plans]) => `
                <div>
                  <strong>${escapeHtml(roomLabel)}</strong>
                  <span>${plans.map(pinetaFigaroPlanSummary).map(escapeHtml).join(" · ")}</span>
                </div>
              `).join("")}
            </div>
            <small>* Prezzo/listino da verificare se in Figaro compare 999 o un valore chiaramente anomalo.</small>
          `}
        </div>
      </div>
      <label class="field">
        <span>Incolla TSV/CSV tariffe</span>
        <textarea class="import-textarea" data-action="import-field" data-field="ratesText" rows="8" placeholder="${isLaVille ? "Data [tab] DUS&#10;2026-05-19 189" : "Data [tab] Tariffa base&#10;2026-05-19 109"}">${escapeHtml(importer.ratesText)}</textarea>
      </label>
      ${count > 0 ? `
      <div class="import-preview import-v2-preview">
        <div class="preview-header"><strong>Anteprima (${count})</strong><span>${escapeHtml(range || "")}</span></div>
        <div class="preview-table-wrap">
          <table class="preview-table">
            <thead>
              <tr>
                <th>Data</th>
                ${isLaVille
    ? "<th>DUS</th><th>DBL</th>"
    : previewRoomLabels.map((label) => `<th>${escapeHtml(label)}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${previewRows.map(([date, rates]) => {
                const dbl = Number(rates.lv_classic);
                const dus = dbl - 20;
                if (isLaVille) return `<tr><td>${formatItalianDate(date)}</td><td>${dus}</td><td>${dbl}</td></tr>`;
                return `
                  <tr>
                    <td>${formatItalianDate(date)}</td>
                    ${previewRooms.map((roomId) => `<td>${fmt(Number(rates[roomId] || 0))}</td>`).join("")}
                  </tr>
                `;
              }).join("")}
              ${count > 5 ? `<tr><td colspan="${isLaVille ? 3 : (previewRooms.length + 1)}" class="preview-more">... e altre ${count - 5} righe</td></tr>` : ""}
            </tbody>
          </table>
        </div>
      </div>` : ""}
      <div class="import-actions-bar">
        <button type="button" class="primary" data-action="apply-rates">Aggiorna tariffe</button>
        ${count === 0 ? '<span class="action-hint">Nessuna riga valida: clicca comunque per vedere il dettaglio errore.</span>' : ""}
      </div>
    </div>
  `;
}

function renderAvailabilityPanel(prop, importer) {
  const analysis = analyzeAvailabilityImport(importer.availabilityText, prop.id);
  const count = analysis.validRows;
  const warnings = analysis.warnings || [];
  const detectedFormat = analysis.detectedFormat;
  const source = propertySourceSystems(prop.id);
  const detectedName = prop.id === "pineta"
    ? String(detectedFormat?.name || "").replace(/^beddzle/, "alyante-figaro")
    : detectedFormat?.name;
  const detectedDescription = prop.id === "pineta"
    ? String(detectedFormat?.description || "").replace(/Beddzle/g, source.importLabel)
    : detectedFormat?.description;
  const isBookingMode = detectedFormat?.name === "beddzle-bookings"
    || /BK_STATUS|CHECK_IN|ROOM_TYPE_NAME/i.test(importer.availabilityText || "");
  const availabilityOrder = roomOrderForProperty(prop.id, "availability").slice(0, expectedAvailabilityColumns(prop.id));
  const availabilityLabels = availabilityOrder.map((roomId) => cleanRoomOccupancyName(roomIdToLabel(prop.id, roomId)));
  return `
    <div class="import-v2-panel">
      <div class="panel-header">
        <h3>Prenotazioni ${prop.label}</h3>
        <div class="panel-actions">
          <button type="button" class="ghost danger-text" data-action="clear-availability-store">Azzera prenotazioni</button>
          <label class="file-btn">Carica file
            <input type="file" accept=".csv,.tsv,.txt,text/csv,text/tab-separated-values,text/plain" data-action="import-file" data-field="availabilityText" hidden />
          </label>
        </div>
      </div>
      <div class="format-detector">
        ${detectedFormat ? `
        <div class="format-badge ${detectedFormat.confidence === "high" ? "ok" : detectedFormat.confidence === "medium" ? "warning" : "error"}">
          <strong>Formato rilevato: ${escapeHtml(detectedName)}</strong>
          <span>${escapeHtml(detectedDescription)}</span>
        </div>
        ` : `
        <div class="format-badge unknown">
          <strong>Formato non rilevato</strong>
          <span>Incolla i dati per analisi automatica</span>
        </div>
        `}
      </div>
      <div class="import-instructions">
        <div class="instruction-card">
          <strong>Istruzioni prenotazioni ${prop.label}</strong>
          <p>Copia da <code>${escapeHtml(source.bookingSource)}</code>. PRISMA ricostruisce la disponibilità interna da <code>CHECK_IN</code>/<code>CHECK_OUT</code>.</p>
          <p><strong>Formato supportato:</strong> header con <code>CHECK_IN</code>, <code>CHECK_OUT</code>, <code>ROOM_TYPE_NAME</code>, <code>BK_STATUS</code>.</p>
          ${prop.id === "pineta" ? `
            <p><strong>Inventario Pineta:</strong> uso le camere operative indicate e non duplico le righe vendute come DUS/DP dello stesso gruppo.</p>
            ${renderPinetaInventoryInfo()}
          ` : ""}
          <div class="mapping-grid">
            ${availabilityLabels.map((label, index) => `<div class="mapping-item"><span class="mapping-num">${index + 1}</span><span class="mapping-name">${escapeHtml(label)}</span></div>`).join("")}
          </div>
        </div>
      </div>
      <label class="field">
        <span>Incolla TSV prenotazioni</span>
        <textarea class="import-textarea ${analysis.hasErrors ? "has-errors" : ""}" data-action="import-field" data-field="availabilityText" rows="10" placeholder="... BK_STATUS ... ROOM_TYPE_NAME ... CHECK_IN ... CHECK_OUT ...">${escapeHtml(importer.availabilityText)}</textarea>
      </label>
      ${analysis.analyzed ? `
      <div class="import-analysis">
        <div class="analysis-stats">
          <div class="stat-box ${count > 0 ? "ok" : "error"}"><span>Righe valide</span><strong>${count}</strong></div>
          <div class="stat-box ${analysis.skippedRows === 0 ? "ok" : "warning"}"><span>Righe scartate</span><strong>${analysis.skippedRows}</strong></div>
          <div class="stat-box ${analysis.columnsFound >= expectedAvailabilityColumns(prop.id) ? "ok" : "error"}"><span>Colonne trovate</span><strong>${analysis.columnsFound}/${expectedAvailabilityColumns(prop.id)}</strong></div>
          <div class="stat-box info"><span>Prima riga data</span><strong>${escapeHtml(analysis.firstDataRow || "N/D")}</strong></div>
        </div>
        ${warnings.length ? `
        <div class="analysis-warnings">
          <strong>Warning (${warnings.length})</strong>
          <ul>${warnings.slice(0, 5).map((warning) => `<li>${escapeHtml(warning)}</li>`).join("")}${warnings.length > 5 ? `<li>... e altri ${warnings.length - 5} warning</li>` : ""}</ul>
        </div>
        ` : ""}
        ${count > 0 ? `
        <div class="import-preview import-v2-preview">
          <div class="preview-header"><strong>Anteprima prime righe</strong></div>
          <div class="preview-table-wrap">
            <table class="preview-table availability-preview">
              <thead><tr><th>Data</th>${availabilityLabels.map((label) => `<th>${escapeHtml(label)}</th>`).join("")}</tr></thead>
              <tbody>
                ${Object.entries(analysis.previewRows || {}).slice(0, 5).map(([date, row]) => `<tr><td>${formatItalianDate(date)}</td>${row.map((value) => `<td class="${value <= 0 ? "zero" : value <= 2 ? "low" : ""}">${value}</td>`).join("")}</tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>
        ` : ""}
      </div>` : ""}
      <div class="import-actions-bar">
        <button type="button" class="primary" data-action="apply-availability-now">Aggiorna disponibilità da prenotazioni</button>
        ${count === 0 ? `<span class="action-hint">${isBookingMode ? "Formato prenotazioni riconosciuto ma senza righe valide nel range. Clicca comunque per vedere il dettaglio." : "TSV non valido o vuoto: clicca comunque per vedere il dettaglio errore."}</span>` : ""}
      </div>
    </div>
  `;
}

const IT_MONTHS = {
  gennaio: 1,
  febbraio: 2,
  marzo: 3,
  aprile: 4,
  maggio: 5,
  giugno: 6,
  luglio: 7,
  agosto: 8,
  settembre: 9,
  ottobre: 10,
  novembre: 11,
  dicembre: 12,
};

function isoDate(year, month, day) {
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

function monthNumberFromItalian(value) {
  if (!value) return null;
  const key = String(value).toLowerCase().trim().replace(/\./g, "");
  return IT_MONTHS[key] || null;
}

function extractEmailHeaderValue(text, key) {
  const re = new RegExp(`^\\s*${key}\\s*:\\s*(.+)$`, "gmi");
  const m = re.exec(text || "");
  return m ? String(m[1] || "").trim() : "";
}

function inferPromoYear(text) {
  const m = String(text || "").match(/\b(20\d{2})\b/);
  return m ? Number(m[1]) : new Date().getFullYear();
}

function parsePromoLine(line, year) {
  const raw = String(line || "").trim();
  if (!raw) return null;
  const clean = raw
    .replace(/[•\t]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/[–—]/g, "-")
    .trim();

  // Esempi gestiti:
  // "1 - 5 gennaio: sconto 20%"
  // "6 gennaio - 1 aprile: sconto 25%"
  // "26 - 31 dicembre: sconto 20%"

  const pctMatch = clean.match(/sconto\s*(\d{1,2})\s*%/i);
  if (!pctMatch) return null;
  const discountPct = Number(pctMatch[1]);

  const rangePart = clean.split(":")[0].trim();
  const m1 = rangePart.match(/^(\d{1,2})\s*-\s*(\d{1,2})\s+([a-zà]+)$/i);
  if (m1) {
    const fromDay = Number(m1[1]);
    const toDay = Number(m1[2]);
    const month = monthNumberFromItalian(m1[3]);
    if (!month) return null;
    return { from: isoDate(year, month, fromDay), to: isoDate(year, month, toDay), discountPct };
  }

  const m2 = rangePart.match(/^(\d{1,2})\s+([a-zà]+)\s*-\s*(\d{1,2})\s+([a-zà]+)$/i);
  if (m2) {
    const fromDay = Number(m2[1]);
    const fromMonth = monthNumberFromItalian(m2[2]);
    const toDay = Number(m2[3]);
    const toMonth = monthNumberFromItalian(m2[4]);
    if (!fromMonth || !toMonth) return null;
    const toYear = toMonth < fromMonth ? year + 1 : year;
    return { from: isoDate(year, fromMonth, fromDay), to: isoDate(toYear, toMonth, toDay), discountPct };
  }

  const m3 = rangePart.match(/^(\d{1,2})\s+([a-zà]+)\s*-\s*(\d{1,2})$/i);
  if (m3) {
    const fromDay = Number(m3[1]);
    const month = monthNumberFromItalian(m3[2]);
    const toDay = Number(m3[3]);
    if (!month) return null;
    return { from: isoDate(year, month, fromDay), to: isoDate(year, month, toDay), discountPct };
  }

  const m4 = rangePart.match(/^(\d{1,2})\s*-\s*(\d{1,2})\s+([a-zà]+)$/i);
  if (m4) {
    const fromDay = Number(m4[1]);
    const toDay = Number(m4[2]);
    const month = monthNumberFromItalian(m4[3]);
    if (!month) return null;
    return { from: isoDate(year, month, fromDay), to: isoDate(year, month, toDay), discountPct };
  }

  return null;
}

function parsePromoEmail(text, fallbackPropertyId = "laville") {
  const body = String(text || "");
  const subject = extractEmailHeaderValue(body, "oggetto") || body.split("\n").map((l) => l.trim()).filter(Boolean)[0] || "Email";
  const year = inferPromoYear(subject + "\n" + body);
  const receivedAt = extractEmailHeaderValue(body, "data") || "";
  const opaqueMatch = body.replace(/[–—]/g, "-").match(/opac\w*.*?(\d{1,2})\s*%/i);
  const opaquePct = opaqueMatch ? Number(opaqueMatch[1]) : null;

  const lower = body.toLowerCase();
  const propertyId = lower.includes("pineta") ? "pineta" : (lower.includes("la ville") || lower.includes("laville")) ? "laville" : fallbackPropertyId;

  const domains = extractEmailDomains(body);
  const operatorKey = domains.map(operatorKeyFromDomain).find((key) => key !== "generic") || "generic";

  const promos = body
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => parsePromoLine(l, year))
    .filter(Boolean);

  return { subject, year, receivedAt, propertyId, operatorKey, opaquePct, promos };
}

function renderEmailImportPanel(importProp, importer) {
  const preview = importer.emailParsed;
  const archived = (state.emailImports || []).filter((item) => item.propertyId === importProp.id).slice(0, 8);
  const previewRows = preview?.promos || [];
  const operatorEntries = Object.entries(state.operatorContacts || {})
    .map(([key, value]) => ({ key, name: value?.name || key }))
    .sort((a, b) => a.name.localeCompare(b.name, "it", { sensitivity: "base" }));
  const selectedOperatorKey = importer.emailOperatorKey || preview?.operatorKey || "generic";
  return `
    <div class="import-v2-panel">
      <div class="panel-header">
        <h3>Email promo/accordi</h3>
        <div class="panel-actions">
          <button class="ghost" data-action="email-clear">Svuota</button>
        </div>
      </div>

      <label class="field">
        <span>Incolla qui il testo dell’email</span>
        <textarea class="import-textarea" data-action="import-field" data-field="emailText" rows="10" placeholder="Incolla oggetto + testo dell’email...">${escapeHtml(importer.emailText || "")}</textarea>
      </label>

      <div class="import-actions-bar">
        <button type="button" class="primary" data-action="email-parse">Analizza email</button>
        <button type="button" class="ghost" data-action="email-save">Salva in archivio</button>
        ${preview ? "" : `<span class="action-hint">Prima clicca “Analizza email”.</span>`}
      </div>

      ${preview ? `
        <div class="import-preview import-v2-preview">
          <div class="preview-header">
            <strong>Anteprima</strong>
            <span>${escapeHtml(preview.subject)} · ${escapeHtml(String(preview.year || ""))}</span>
          </div>
          <div class="import-v2-hotel-selector" style="margin-top:10px">
            <label class="field">
              <span>Operatore (dove salvare questa email)</span>
              <select data-action="import-field" data-field="emailOperatorKey">
                ${operatorEntries.map((op) => `<option value="${escapeHtml(op.key)}" ${op.key === selectedOperatorKey ? "selected" : ""}>${escapeHtml(op.name)}</option>`).join("")}
              </select>
            </label>
          </div>
          ${preview.opaquePct != null ? `<div class="mini" style="margin:6px 0 10px">Opaca cumulabile: ${escapeHtml(String(preview.opaquePct))}%</div>` : ""}
          ${previewRows.length ? `
            <div class="preview-table-wrap">
              <table class="preview-table">
                <thead><tr><th>Dal</th><th>Al</th><th>Sconto</th></tr></thead>
                <tbody>
                  ${previewRows.map((row) => `<tr><td>${formatItalianDate(row.from)}</td><td>${formatItalianDate(row.to)}</td><td>${escapeHtml(String(row.discountPct))}%</td></tr>`).join("")}
                </tbody>
              </table>
            </div>
          ` : `<div class="empty compact">Non ho trovato righe “dal/al + sconto %” in questa email.</div>`}
        </div>
      ` : ""}

      ${archived.length ? `
        <div class="divider"></div>
        <div class="mini" style="margin-bottom:6px">Archivio (ultime ${archived.length})</div>
        <div class="email-archive">
          ${archived.map((item) => `
            <div class="email-card">
              <div>
                <strong>${escapeHtml(item.subject || "Email")}</strong>
                <div class="mini">${escapeHtml(String(item.year || ""))} · ${escapeHtml(String((item.promos || []).length))} periodi</div>
              </div>
              <button class="ghost compact-button" data-action="email-delete" data-id="${escapeHtml(item.id)}">Elimina</button>
            </div>
          `).join("")}
        </div>
      ` : ""}
    </div>
  `;
}

function renderConfirmModal() {
  if (!state.pendingConfirm) return "";
  if (state.pendingConfirm.action === "unlock-import-data") {
    return `
      <div class="modal">
        <div class="dialog">
          <div class="dialog-head">
            <div class="dialog-title">${escapeHtml(state.pendingConfirm.title)}</div>
            <button class="ghost" data-action="cancel-deactivate">Chiudi</button>
          </div>
          <div class="dialog-copy">${escapeHtml(state.pendingConfirm.body)}</div>
          <div class="dialog-warning">Se non devi cambiare il file, lascia i dati protetti.</div>
          <div class="dialog-actions">
            <button class="ghost" data-action="cancel-deactivate">${escapeHtml(state.pendingConfirm.cancelLabel || "No")}</button>
            <button class="primary" data-action="confirm-pending-action">${escapeHtml(state.pendingConfirm.confirmLabel || "Conferma")}</button>
          </div>
        </div>
      </div>
    `;
  }
  return `
    <div class="modal">
      <div class="dialog">
        <div class="dialog-head">
          <div class="dialog-title">Disattivare la promo?</div>
          <button class="ghost" data-action="cancel-deactivate">Chiudi</button>
        </div>
        <div class="dialog-copy">Stai per disattivare <strong>${escapeHtml(state.pendingConfirm.label)}</strong> per calcolare questa data.</div>
        <div class="dialog-warning">Così facendo il prezzo tornerà senza questa promo attiva.</div>
        <div class="dialog-actions">
          <button class="ghost" data-action="cancel-deactivate">Annulla</button>
          <button class="danger" data-action="confirm-deactivate">Disattiva e calcola</button>
        </div>
      </div>
    </div>
  `;
}

function renderInfoModal() {
  if (!state.modal) return "";
  if (state.modal.kind === "import-feedback") {
    const title = state.modal.title || (state.modal.success ? "Aggiornamento completato" : "Aggiornamento non completato");
    const body = state.modal.body || (state.modal.success ? "Dati aggiornati." : "Non è stato possibile aggiornare i dati.");
    return `
      <div class="modal">
        <div class="dialog">
          <div class="dialog-head">
            <div class="dialog-title">${escapeHtml(title)}</div>
            <button class="ghost" data-action="close-modal">Chiudi</button>
          </div>
          <div class="dialog-copy">${escapeHtml(body)}</div>
          <div class="${state.modal.success ? "dialog-success" : "dialog-warning"}">
            ${state.modal.success ? "L'aggiornamento è stato applicato correttamente." : "Controlla il formato dei dati e riprova."}
          </div>
          <div class="dialog-actions">
            <button class="primary" data-action="close-modal">OK</button>
          </div>
        </div>
      </div>
    `;
  }
  if (state.modal.kind === "deep-deal") {
    return `
      <div class="modal">
        <div class="dialog">
          <div class="dialog-head">
            <div class="dialog-title">Regola 48h Deal</div>
            <button class="ghost" data-action="close-modal">Chiudi</button>
          </div>
          <div class="dialog-copy">
            La promo 48h è visibile dalle <strong>00:01</strong> fino alle <strong>23:59 del giorno dopo</strong>.
          </div>
          <div class="dialog-warning">
            Si può reimpostare solamente dopo che sono trascorsi <strong>15 giorni</strong>.
          </div>
          <div class="dialog-actions">
            <button class="primary" data-action="close-modal">Ho capito</button>
          </div>
        </div>
      </div>
    `;
  }
  if (state.modal.kind === "operator-log") {
    const key = state.modal.operatorKey;
    const op = state.operatorContacts?.[key] || { name: key, emails: [] };
    const emails = (op.emails || []).slice(0, 50);
    return `
      <div class="modal">
        <div class="dialog" style="max-width:900px">
          <div class="dialog-head">
            <div class="dialog-title">Email · ${escapeHtml(op.name || key)}</div>
            <button class="ghost" data-action="close-modal">Chiudi</button>
          </div>
          ${emails.length ? `
            <div class="email-log">
              ${emails.map((e) => `
                <div class="email-log-row">
                  <div>
                    <strong>${escapeHtml(e.subject || "-")}</strong>
                    <div class="mini">${escapeHtml(String(e.date || ""))} · ${escapeHtml(e.direction || "")} · ${escapeHtml(e.kind || "")}</div>
                  </div>
                  <button class="ghost compact-button" data-action="operator-delete-email" data-op="${escapeHtml(key)}" data-id="${escapeHtml(e.id)}">Elimina</button>
                </div>
              `).join("")}
            </div>
          ` : `<div class="empty">Nessuna email salvata per questo operatore.</div>`}
          <div class="dialog-actions">
            <button class="primary" data-action="operator-add-email" data-op="${escapeHtml(key)}">Aggiungi email</button>
          </div>
        </div>
      </div>
    `;
  }
  if (state.modal.kind === "operator-add-email") {
    const key = state.modal.operatorKey;
    const op = state.operatorContacts?.[key] || { name: key };
    const draft = state.modal.draft || { subject: "", date: todayLocal(), kind: "comunicazione", direction: "sent" };
    return `
      <div class="modal">
        <div class="dialog" style="max-width:720px">
          <div class="dialog-head">
            <div class="dialog-title">Aggiungi email · ${escapeHtml(op.name || key)}</div>
            <button class="ghost" data-action="close-modal">Chiudi</button>
          </div>
          <div class="dialog-copy">
            <label class="field">
              <span>Data</span>
              <input type="date" value="${escapeHtml(draft.date || todayLocal())}" data-action="operator-email-field" data-field="date" />
            </label>
            <label class="field">
              <span>Direzione</span>
              <select data-action="operator-email-field" data-field="direction">
                <option value="received" ${draft.direction === "received" ? "selected" : ""}>Ricevuta</option>
                <option value="sent" ${draft.direction === "sent" ? "selected" : ""}>Inviata</option>
              </select>
            </label>
            <label class="field">
              <span>Tipo</span>
              <select data-action="operator-email-field" data-field="kind">
                <option value="promo" ${draft.kind === "promo" ? "selected" : ""}>Promo</option>
                <option value="accordo" ${draft.kind === "accordo" ? "selected" : ""}>Accordo</option>
                <option value="comunicazione" ${draft.kind === "comunicazione" ? "selected" : ""}>Comunicazione</option>
              </select>
            </label>
            <label class="field">
              <span>Oggetto</span>
              <input type="text" value="${escapeHtml(draft.subject || "")}" data-action="operator-email-field" data-field="subject" placeholder="Oggetto email" />
            </label>
            <label class="field">
              <span>Note (opzionale)</span>
              <textarea rows="4" data-action="operator-email-field" data-field="note" placeholder="Testo libero...">${escapeHtml(draft.note || "")}</textarea>
            </label>
          </div>
          <div class="dialog-actions">
            <button class="ghost" data-action="close-modal">Annulla</button>
            <button class="primary" data-action="operator-save-email" data-op="${escapeHtml(key)}">Salva</button>
          </div>
        </div>
      </div>
    `;
  }
  return "";
}

function safeRender(html) {
  if (!app) {
    console.error("PRISMA: elemento #app non trovato nel DOM");
    return;
  }
  const range = document.createRange();
  range.selectNode(app);
  const fragment = range.createContextualFragment(html);
  app.innerHTML = "";
  app.appendChild(fragment);
}

function render() {
  const prop = currentProp();
  const activePromo = getActiveSitePromo(prop);
  const siteWithPromo = siteSellRate(state.sito, activePromo);
  const closed = isPropertyClosed(prop, state.selectedDate);
  document.body.setAttribute("data-view", state.view || "calc");
  document.body.setAttribute("data-theme", state.theme || "light");
  document.body.classList.toggle("theme-dark", state.theme === "dark");
  const reminderNotices = state.reminders
    .filter((item) => item.propertyId === prop.id)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(renderReminderNotice)
    .join("");
  const propertyOptions = state.data
    .map((p, i) => ({ ...p, index: i }))
    .sort((a, b) => a.label.localeCompare(b.label, "it", { sensitivity: "base" }));
  const isWorkspaceView = ["strategy", "billing", "revenue", "import"].includes(state.view);
  safeRender(`
    <div class="shell">
      ${state.editing ? renderReminderEditor(prop) : reminderNotices}

      <header class="topbar">
        <div class="brand">
          <div class="logo-mark" aria-hidden="true">
            <span class="logo-prism"></span>
            <span class="logo-ray ray-one"></span>
            <span class="logo-ray ray-two"></span>
            <span class="logo-ray ray-three"></span>
          </div>
          <div>
            <div class="title">PRISMA</div>
            <div class="subtitle">Pricing, Rate Intelligence & Strategy Monitoring Assistant</div>
          </div>
        </div>
        <div class="topbar-actions">
          <span class="version-pill">v${APP_VERSION}</span>
          <button class="ghost theme-toggle" data-action="toggle-theme">${state.theme === "dark" ? "Tema: Scuro" : "Tema: Chiaro"}</button>
          <button class="ghost last-version" data-action="last-version">Last version</button>
          <button class="ghost" data-action="toggle-edit">${state.editing ? "Fine modifica" : "Modifica"}</button>
        </div>
      </header>

      ${state.view === "calc" ? `<section class="toolbar">
        <strong>Data</strong>
        ${renderToolbarDatePicker(prop)}
        <span class="weekday-pill">${weekdayLabel(state.selectedDate)}</span>
        ${holidayName(state.selectedDate) ? `<span class="holiday-pill">${holidayName(state.selectedDate)}</span>` : ""}
        <button class="ghost" data-action="today">Oggi</button>
      </section>` : ""}

      <nav class="hotel-picker">
        <label class="hotel-select">
          <span>Hotel</span>
          <select data-action="property-select">
            ${propertyOptions.map((p) => `<option value="${escapeHtml(p.index)}" ${p.index === state.curIdx ? "selected" : ""}>${escapeHtml(p.label)}</option>`).join("")}
          </select>
        </label>
        ${state.editing ? '<button class="ghost" data-action="add-property">+ struttura</button>' : ""}
      </nav>

      <div class="view-tabs">
        <button class="tab tab-vision ${state.view === "calendar" ? "active" : ""}" data-action="view" data-view="calendar">Visione</button>
        <button class="tab tab-explore ${state.view === "calc" ? "active" : ""}" data-action="view" data-view="calc">Esplorazione</button>
        <button class="tab tab-strategy ${state.view === "strategy" ? "active" : ""}" data-action="view" data-view="strategy">Strategia</button>
        <button class="tab tab-revenue ${state.view === "revenue" ? "active" : ""}" data-action="view" data-view="revenue">Diario revenue</button>
        <button class="tab tab-billing ${state.view === "billing" ? "active" : ""}" data-action="view" data-view="billing">Fatturazione</button>
      </div>

      ${state.view === "calc" ? `<section class="ota-row" style="margin-bottom:12px">
        ${state.editing ? '<button class="ghost" data-action="add-channel">+ canale</button>' : ""}
      </section>` : ""}

      <div class="${isWorkspaceView ? "strategy-grid" : "grid"}">
        ${state.view === "calc"
          ? (closed
            ? renderClosedDate(prop)
            : `${renderSiteBlock(prop)}${renderCalcSubtabs()}${state.calcTab === "contacts" ? renderOperatorContacts() : `${renderChannels(prop, siteWithPromo)}${state.editing ? renderRooms(prop) : ""}`}`)
          : state.view === "calendar" ? renderCalendar(prop)
            : state.view === "strategy" ? renderStrategy(prop)
              : state.view === "billing" ? renderBilling(prop)
                : state.view === "revenue" ? renderRevenueDiary(prop)
: renderCalendar(prop)}
</div>
      ${renderConfirmModal()}
      ${renderInfoModal()}
    </div>
  `);
}

app.addEventListener("click", (event) => {
  const el = event.target.closest("[data-action]");
  if (!el) return;
  const action = el.dataset.action;
  if (action === "toggle-edit") {
    if (state.editing) syncReminderEditorFromDom();
    state.editing = !state.editing;
    render();
  }
  if (action === "toggle-theme") {
    state.theme = state.theme === "dark" ? "light" : "dark";
    saveStoredImportData();
    render();
  }
  if (action === "last-version") {
    const url = new URL(window.location.href);
    url.searchParams.set("v", `${APP_VERSION}-${Date.now()}`);
    window.location.href = url.toString();
  }
  if (action === "edit-reminders") {
    state.editing = true;
    render();
  }
  if (action === "view") {
    state.view = el.dataset.view;
    if (state.view === "strategy") {
      ensureStrategyPeriodToday();
      syncStrategyBaseRate();
    }
    if (state.view === "billing" && !state.billing.date) {
      state.billing.date = state.selectedDate;
    }
    if (state.view === "revenue") {
      state.revenueDraft.stayDate = state.revenueDraft.stayDate || state.selectedDate;
      state.revenueDraft.actionDate = state.revenueDraft.actionDate || todayLocal();
      state.revenueAgendaDate = state.revenueAgendaDate || todayLocal();
      state.revenueCalendarMonth = state.revenueCalendarMonth || revenueMonthKey(state.revenueAgendaDate);
    }
    render();
  }
  if (action === "calc-tab") {
    state.calcTab = el.dataset.tab === "contacts" ? "contacts" : "channels";
    saveStoredImportData();
    render();
  }
  if (action === "today") setDate(todayLocal());
  if (action === "toggle-date-picker") openDatePicker();
  if (action === "date-picker-prev") moveDatePickerMonth(-1);
  if (action === "date-picker-next") moveDatePickerMonth(1);
  if (action === "date-picker-day") setDate(el.dataset.date);
  if (action === "date-picker-clear") {
    state.datePickerOpen = false;
    render();
  }
  if (action === "property") setProperty(Number(el.dataset.index));
  if (action === "occupancy") setOccupancy(el.dataset.occupancy);
  if (action === "toggle-site" && !el.classList.contains("blocked")) toggleSitePromo(Number(el.dataset.index));
  if (action === "toggle-promo") togglePromo(el.dataset.channel, Number(el.dataset.index));
  if (action === "toggle-country" && !el.classList.contains("blocked")) toggleCountry(el.dataset.channel, Number(el.dataset.index));
  if (action === "clear-country" && !el.classList.contains("blocked")) toggleCountry(el.dataset.channel, -1);
  if (action === "confirm-pending-action") {
    const pending = state.pendingConfirm;
    state.pendingConfirm = null;
    if (pending?.action === "unlock-import-data") {
      state.importer.editBackup = {
        ratesText: state.importer.ratesText,
        availabilityText: state.importer.availabilityText,
        ratesLocked: state.importer.ratesLocked,
        availabilityLocked: state.importer.availabilityLocked,
        message: state.importer.message,
      };
      state.importer.locked = false;
      state.importer.ratesLocked = false;
      state.importer.availabilityLocked = false;
      state.importer.editPending = true;
      state.importer.message = "Campi sbloccati: puoi correggere il copia/incolla e poi aggiornare di nuovo.";
      saveStoredImportData();
      render();
    }
  }
  if (action === "strategy-toggle-promo") {
    const promo = (STRATEGY_PROMO_LIBRARY[inferStrategyChannelKey(state.strategy.channelId)] || [])
      .find((item) => item.id === el.dataset.promoId);
    const ids = new Set(state.strategy.selectedPromoIds || []);
    const isActivating = !ids.has(el.dataset.promoId);
    if (ids.has(el.dataset.promoId)) ids.delete(el.dataset.promoId);
    else ids.add(el.dataset.promoId);
    state.strategy.selectedPromoIds = [...ids];
    if (isActivating && promo?.type === "deep") {
      addDeepDealReminder(state.strategy.channelId, strategySimulationDate(state.strategy));
      state.modal = { kind: "deep-deal" };
    }
    render();
  }
  if (action === "explore-export-csv") {
    exportExplore("csv");
  }
  if (action === "explore-export-json") {
    exportExplore("json");
  }
  if (action === "close-modal") {
    state.modal = null;
    render();
  }
  if (action === "operator-log") {
    const key = el.dataset.op;
    if (!key) return;
    state.modal = { kind: "operator-log", operatorKey: key };
    render();
  }
  if (action === "operator-add-email") {
    const key = el.dataset.op;
    if (!key) return;
    state.modal = {
      kind: "operator-add-email",
      operatorKey: key,
      draft: { date: todayLocal(), direction: "sent", kind: "comunicazione", subject: "", note: "" },
    };
    render();
  }
  if (action === "operator-save-email") {
    const key = el.dataset.op;
    if (!key) return;
    const op = state.operatorContacts?.[key];
    if (!op) return;
    const draft = state.modal?.draft || {};
    const entry = {
      id: `mailm-${Date.now()}`,
      direction: draft.direction || "sent",
      kind: draft.kind || "comunicazione",
      date: draft.date || todayLocal(),
      subject: draft.subject || "",
      note: draft.note || "",
    };
    op.emails = [entry, ...(op.emails || [])].slice(0, 80);
    state.operatorContacts[key] = op;
    state.modal = { kind: "operator-log", operatorKey: key };
    saveStoredImportData();
    render();
  }
  if (action === "operator-delete-email") {
    const key = el.dataset.op;
    const id = el.dataset.id;
    const op = state.operatorContacts?.[key];
    if (!op || !id) return;
    op.emails = (op.emails || []).filter((item) => item.id !== id);
    state.operatorContacts[key] = op;
    saveStoredImportData();
    render();
  }
  if (action === "add-reminder") {
    state.reminders.push({
      id: `rem-${Date.now()}`,
      propertyId: currentProp().id,
      type: "Promo",
      date: state.selectedDate,
      title: "Nuovo reminder",
      note: "",
    });
    saveStoredImportData();
    render();
  }
  if (action === "save-reminders") {
    syncReminderEditorFromDom();
    state.reminderSavedAt = formatUploadStamp();
    render();
  }
  if (action === "delete-reminder") {
    state.reminders = state.reminders.filter((item) => item.id !== el.dataset.id);
    saveStoredImportData();
    render();
  }
  if (action === "add-channel") addChannel();
  if (action === "add-room") addRoom();
  if (action === "add-promo") addPromo(el.dataset.channel);
  if (action === "add-site-promo") {
    updateCurrent((prop) => ({
      ...prop,
      sitePromos: [
        ...(prop.sitePromos || []),
        { l: "Nuova promo", p: 10, on: true, condition: "last_minute", appliesTo: "notref", note: "" },
      ],
    }));
    saveStoredImportData();
    render();
  }
  if (action === "delete-site-promo") {
    const index = Number(el.dataset.index);
    updateCurrent((prop) => ({
      ...prop,
      sitePromos: (prop.sitePromos || []).filter((_, promoIndex) => promoIndex !== index),
    }));
    saveStoredImportData();
    render();
  }
  if (action === "confirm-deactivate") confirmDeactivate();
  if (action === "cancel-deactivate") cancelDeactivate();
  if (action === "add-property") {
    state.data.push({ id: crypto.randomUUID(), label: "Nuova struttura", diff: 60, rooms: [], sitePromos: [], channels: [] });
    state.curIdx = state.data.length - 1;
    render();
  }
  if (action === "add-revenue-entry") {
    const propForRevenue = currentProp();
    const room = getSelectedRoom(propForRevenue);
    const draft = state.revenueDraft;
    const before = draft.beforeRate === "" ? null : Number(draft.beforeRate);
    const after = draft.afterRate === "" ? null : Number(draft.afterRate);
    const channelLabel = draft.channelId === "site"
      ? "Sito ufficiale"
      : propForRevenue.channels.find((channel) => channel.id === draft.channelId)?.name || "Canale";
    const roomId = room?.id || revenueAutoRoomId(propForRevenue);
    const baseline = revenueBaselineSnapshot(propForRevenue.id, roomId, draft.stayDate || todayLocal());
    state.revenueEntries.unshift({
      ...draft,
      id: `rev-${Date.now()}`,
      propertyId: propForRevenue.id,
      channelLabel,
      roomId,
      roomLabel: draft.roomLabel || room?.name || "Camera",
      delta: before == null || after == null ? null : after - before,
      closedAt: "",
      baselineRoomAvailability: baseline.room,
      baselineTotalAvailability: baseline.total,
    });
    state.revenueEntries = state.revenueEntries.slice(0, MAX_REVENUE_DIARY_ENTRIES);
    state.revenueAgendaDate = draft.actionDate || todayLocal();
    state.revenueAgendaShowAll = false;
    saveStoredImportData();
    state.revenueDraft = {
      ...state.revenueDraft,
      beforeRate: "",
      afterRate: "",
      pickup24: "",
      pickup48: "",
      note: "",
    };
    render();
  }
  if (action === "revenue-day-prev") {
    state.revenueAgendaDate = addDays(state.revenueAgendaDate || todayLocal(), -1);
    state.revenueCalendarMonth = revenueMonthKey(state.revenueAgendaDate);
    state.revenueAgendaShowAll = false;
    saveStoredImportData();
    render();
  }
  if (action === "revenue-day-next") {
    const nextDay = addDays(state.revenueAgendaDate || todayLocal(), 1);
    state.revenueAgendaDate = nextDay > todayLocal() ? todayLocal() : nextDay;
    state.revenueCalendarMonth = revenueMonthKey(state.revenueAgendaDate);
    state.revenueAgendaShowAll = false;
    saveStoredImportData();
    render();
  }
  if (action === "revenue-day-today") {
    state.revenueAgendaDate = todayLocal();
    state.revenueCalendarMonth = revenueMonthKey(state.revenueAgendaDate);
    state.revenueAgendaShowAll = false;
    saveStoredImportData();
    render();
  }
  if (action === "revenue-month-prev") {
    state.revenueCalendarMonth = shiftRevenueMonth(state.revenueCalendarMonth || revenueMonthKey(state.revenueAgendaDate || todayLocal()), -1);
    saveStoredImportData();
    render();
  }
  if (action === "revenue-month-next") {
    state.revenueCalendarMonth = shiftRevenueMonth(state.revenueCalendarMonth || revenueMonthKey(state.revenueAgendaDate || todayLocal()), 1);
    saveStoredImportData();
    render();
  }
  if (action === "revenue-select-day") {
    const selected = String(el.dataset.date || "");
    if (/^\d{4}-\d{2}-\d{2}$/.test(selected)) {
      state.revenueAgendaDate = selected;
      state.revenueCalendarMonth = revenueMonthKey(selected);
      state.revenueAgendaShowAll = false;
      state.revenueRegisterOpen = true;
      saveStoredImportData();
      render();
    }
  }
  if (action === "revenue-register-close") {
    state.revenueRegisterOpen = false;
    saveStoredImportData();
    render();
  }
  if (action === "revenue-toggle-all") {
    state.revenueAgendaShowAll = !state.revenueAgendaShowAll;
    saveStoredImportData();
    render();
  }
  if (action === "close-revenue-entry") {
    state.revenueEntries = state.revenueEntries.map((entry) => entry.id === el.dataset.id ? { ...entry, closedAt: todayLocal() } : entry);
    saveStoredImportData();
    render();
  }
  if (action === "reopen-revenue-entry") {
    state.revenueEntries = state.revenueEntries.map((entry) => entry.id === el.dataset.id ? { ...entry, closedAt: "" } : entry);
    saveStoredImportData();
    render();
  }
  if (action === "unlock-import-data") {
    state.importer.editBackup = state.importer.editBackup || {
      ratesText: state.importer.ratesText,
      availabilityText: state.importer.availabilityText,
      ratesLocked: state.importer.ratesLocked,
      availabilityLocked: state.importer.availabilityLocked,
      message: state.importer.message,
    };
    state.importer.locked = false;
    state.importer.ratesLocked = false;
    state.importer.availabilityLocked = false;
    state.importer.editPending = true;
    state.importer.message = "Campi sbloccati: puoi correggere il copia/incolla e poi aggiornare di nuovo.";
    saveStoredImportData();
    render();
  }
  if (action === "request-unlock-import-data") {
    state.pendingConfirm = {
      title: "Vuoi continuare con la modifica?",
      body: "I campi verranno sbloccati. Se hai cliccato per errore, scegli No e i dati restano protetti.",
      confirmLabel: "Sì, modifica",
      cancelLabel: "No",
      action: "unlock-import-data",
    };
    render();
  }
  if (action === "cancel-import-edit") {
    const backup = state.importer.editBackup;
    if (backup) {
      state.importer.ratesText = backup.ratesText;
      state.importer.availabilityText = backup.availabilityText;
      state.importer.ratesLocked = backup.ratesLocked;
      state.importer.availabilityLocked = backup.availabilityLocked;
      state.importer.message = backup.message || "Modifica annullata: dati ripristinati.";
    }
    state.importer.editPending = false;
    state.importer.editBackup = null;
    saveStoredImportData();
    render();
  }
  if (action === "import-tab") {
    state.importTab = el.dataset.tab === "availability"
      ? "availability"
      : el.dataset.tab === "email"
        ? "email"
        : "rates";
    saveStoredImportData();
    render();
  }
  if (action === "email-clear") {
    state.importer.emailText = "";
    state.importer.emailParsed = null;
    state.importer.message = "Email svuotata.";
    saveStoredImportData();
    render();
  }
  if (action === "email-parse") {
    const fallbackPropId = state.importer.propertyId || currentProp().id;
    const parsed = parsePromoEmail(state.importer.emailText, fallbackPropId);
    state.importer.emailParsed = parsed;
    state.importer.emailOperatorKey = parsed.operatorKey || "generic";
    state.importer.message = parsed.promos.length
      ? `Email analizzata: trovati ${parsed.promos.length} periodi promo.`
      : "Email analizzata: non ho trovato periodi promo (dal/al + sconto %).";
    saveStoredImportData();
    render();
  }
  if (action === "email-save") {
    const parsed = state.importer.emailParsed;
    if (!parsed) {
      state.importer.message = "Prima clicca “Analizza email”.";
      saveStoredImportData();
      render();
      return;
    }
    const propId = parsed.propertyId || state.importer.propertyId || currentProp().id;
    const operatorKey = state.importer.emailOperatorKey || parsed.operatorKey || "generic";
    if (!state.operatorContacts?.[operatorKey]) {
      state.operatorContacts = {
        ...(state.operatorContacts || {}),
        [operatorKey]: { name: operatorKey, email: "", phone: "", role: "", notes: "", emails: [] },
      };
    }
    const entry = {
      id: `mail-${Date.now()}`,
      propertyId: propId,
      operatorKey,
      subject: parsed.subject,
      year: parsed.year,
      receivedAt: parsed.receivedAt || "",
      opaquePct: parsed.opaquePct,
      promos: parsed.promos || [],
      savedAt: formatUploadStamp(),
      kind: parsed.promos?.length ? "promo" : "comunicazione",
      direction: "received",
    };
    state.emailImports = [entry, ...(state.emailImports || [])].slice(0, 120);
    const logEntry = {
      id: entry.id,
      direction: "received",
      kind: entry.kind,
      date: entry.receivedAt || entry.savedAt,
      subject: entry.subject,
      promos: entry.promos,
      opaquePct: entry.opaquePct,
    };
    state.operatorContacts[operatorKey].emails = [logEntry, ...(state.operatorContacts[operatorKey].emails || [])].slice(0, 80);
    state.importer.message = `Email salvata nel log di ${state.operatorContacts[operatorKey].name}.`;
    saveStoredImportData();
    render();
  }
  if (action === "email-delete") {
    const id = el.dataset.id;
    state.emailImports = (state.emailImports || []).filter((item) => item.id !== id);
    state.importer.message = "Voce rimossa dall’archivio.";
    saveStoredImportData();
    render();
  }
  if (action === "clear-rates-text") {
    state.importer.ratesText = "";
    state.importer.validationWarnings = [];
    saveStoredImportData();
    render();
  }
  if (action === "clear-availability-store") {
    const targetPropId = state.importer.propertyId || currentProp().id;
    const cleared = clearAvailabilityStore(targetPropId);
    console.log(`Clear bookings-derived availability ${targetPropId}: cancellate ${cleared} date`);
    state.importer.validationWarnings = [];
    state.importer.availabilityLocked = false;
    state.importer.locked = false;
    state.importer.availabilityText = "";
    state.importer.message = `Prenotazioni azzerate per ${targetPropId}: cancellate ${cleared} date disponibilità derivate e svuotato il testo incollato.`;
    saveStoredImportData();
    render();
  }
  if (action === "apply-rates") {
    const targetPropId = state.importer.propertyId || currentProp().id;
    const previousRates = structuredClone(PMS_RATES[targetPropId] || {});
    const importedRates = parseImportedRates(state.importer.ratesText, targetPropId);
    const rateCount = Object.keys(importedRates).length;
    let autoDiaryCount = 0;
    let autoDiaryTruncated = 0;
    if (rateCount) {
      PMS_RATES[targetPropId] = { ...(PMS_RATES[targetPropId] || {}), ...importedRates };
      const autoDiary = buildRevenueEntriesFromRateImport(targetPropId, previousRates, importedRates, todayLocal());
      autoDiaryCount = autoDiary.entries.length;
      autoDiaryTruncated = autoDiary.truncated;
      if (autoDiary.entries.length) {
        state.revenueEntries = [...autoDiary.entries, ...state.revenueEntries].slice(0, MAX_REVENUE_DIARY_ENTRIES);
        state.revenueAgendaDate = todayLocal();
        state.revenueCalendarMonth = revenueMonthKey(state.revenueAgendaDate);
      }
    }
    state.importer.lastUpload = formatUploadStamp();
    state.importer.ratesLocked = Boolean(rateCount);
    state.importer.validationWarnings = [];
    state.importer.message = rateCount
      ? `Tariffe aggiornate: ${rateCount} righe per ${targetPropId}.`
      : "Nessuna riga tariffa valida trovata.";
    if (rateCount) {
      if (autoDiaryCount > 0) {
        state.importer.message += ` Diario revenue: +${autoDiaryCount} variazioni auto registrate.`;
        if (autoDiaryTruncated > 0) state.importer.message += ` (${autoDiaryTruncated} escluse per limite ${AUTO_REVENUE_IMPORT_MAX_ENTRIES}).`;
      } else {
        state.importer.message += " Diario revenue: nessuna variazione rispetto all'ultimo import.";
      }
    }
    state.modal = {
      kind: "import-feedback",
      success: rateCount > 0,
      title: rateCount > 0 ? "Tariffe aggiornate" : "Tariffe non aggiornate",
      body: state.importer.message,
    };
    saveStoredImportData();
    render();
  }
  if (action === "apply-availability" || action === "apply-availability-now") {
    console.log("Click apply availability:", action);
    const targetPropId = state.importer.propertyId || currentProp().id;
    const analysis = analyzeAvailabilityImport(state.importer.availabilityText, targetPropId);
    let availabilityUpdated = false;
    state.importer.validationWarnings = [...(analysis.warnings || [])];
    const maxRowsAllowed = 1500;
    if (analysis.validRows > maxRowsAllowed) {
      state.importer.message = `⚠️ Import bloccato: ${analysis.validRows} righe è un valore anomalo. Controlla il TSV (atteso intervallo ${AVAILABILITY_HISTORY_START} - ${AVAILABILITY_HISTORY_END}).`;
      state.importer.validationWarnings.push(`Import bloccato per sicurezza: righe valide ${analysis.validRows} > soglia ${maxRowsAllowed}.`);
    } else if (analysis.validRows > 0) {
      clearAvailabilityStore(targetPropId);
      writeAvailabilityStore(targetPropId, analysis.previewRows);
      availabilityUpdated = true;
      state.importer.availabilityLocked = true;
      const fromBookings = analysis.detectedFormat?.name === "beddzle-bookings";
      state.importer.message = fromBookings
        ? `Disponibilità ricalcolata da prenotazioni: ${analysis.validRows} date per ${targetPropId}.`
        : `Disponibilità aggiornata: ${analysis.validRows} righe per ${targetPropId}.`;
    } else {
      state.importer.message = "⚠️ Nessuna riga valida. Dati precedenti NON cancellati.";
    }
    state.modal = {
      kind: "import-feedback",
      success: availabilityUpdated,
      title: availabilityUpdated ? "Disponibilità aggiornata" : "Disponibilità non aggiornata",
      body: state.importer.message,
    };
    state.importer.lastUpload = formatUploadStamp();
    saveStoredImportData();
    render();
  }
  if (action === "clear-imported-availability") {
    const targetPropId = state.importer.propertyId || currentProp().id;
    const cleared = clearAvailabilityStore(targetPropId);
    console.log(`Clear bookings-derived availability ${targetPropId}: cancellate ${cleared} date`);
    state.importer.validationWarnings = [];
    state.importer.availabilityLocked = false;
    state.importer.locked = false;
    state.importer.availabilityText = "";
    state.importer.message = `Prenotazioni azzerate per ${targetPropId}: cancellate ${cleared} date disponibilità derivate e svuotato il testo incollato.`;
    saveStoredImportData();
    render();
  }
  if (action === "apply-import-data") {
    const targetPropId = state.importer.propertyId || currentProp().id;
    const targetPropLabel = state.data.find((item) => item.id === targetPropId)?.label || targetPropId;
    const baselineAvailability = structuredClone(availabilityStore(targetPropId) || {});
    const previousRates = structuredClone(PMS_RATES[targetPropId] || {});
    const importedRates = parseImportedRates(state.importer.ratesText, targetPropId);
    const availabilityAnalysis = parseImportedAvailabilityWithFallback(state.importer.availabilityText, targetPropId, baselineAvailability);
    const importedAvailability = availabilityAnalysis.rows;
    state.importer.validationWarnings = availabilityAnalysis.warnings || [];
    const hasAvailabilityPayload = String(state.importer.availabilityText || "").trim().length > 0;
    const rateCount = Object.keys(importedRates).length;
    const availabilityCount = Object.keys(importedAvailability).length;
    let autoDiaryCount = 0;
    let autoDiaryTruncated = 0;
    const maxRowsAllowed = 1500;
    const rateRange = importDateRangeLabel(importedRates);
    const availabilityRange = importDateRangeLabel(importedAvailability);
    const rangeParts = [
      rateRange ? `tariffe ${rateRange}` : "",
      availabilityRange ? `disponibilità ${availabilityRange}` : "",
    ].filter(Boolean);
    const oldAvailabilityCount = Object.keys(availabilityStore(targetPropId) || {}).length;
    if (rateCount) {
      PMS_RATES[targetPropId] = { ...(PMS_RATES[targetPropId] || {}), ...importedRates };
      const autoDiary = buildRevenueEntriesFromRateImport(targetPropId, previousRates, importedRates, todayLocal());
      autoDiaryCount = autoDiary.entries.length;
      autoDiaryTruncated = autoDiary.truncated;
      if (autoDiary.entries.length) {
        state.revenueEntries = [...autoDiary.entries, ...state.revenueEntries].slice(0, MAX_REVENUE_DIARY_ENTRIES);
        state.revenueAgendaDate = todayLocal();
        state.revenueCalendarMonth = revenueMonthKey(state.revenueAgendaDate);
      }
    }
    let availabilityReplaceApplied = false;
    let availabilityImportInvalid = false;
    if (hasAvailabilityPayload) {
      if (availabilityCount > maxRowsAllowed) {
        availabilityImportInvalid = true;
        state.importer.message = `⚠️ Import disponibilità bloccato: ${availabilityCount} righe è un valore anomalo. Controlla il TSV (atteso intervallo ${AVAILABILITY_HISTORY_START} - ${AVAILABILITY_HISTORY_END}).`;
        state.importer.validationWarnings.push(`Import bloccato per sicurezza: righe valide ${availabilityCount} > soglia ${maxRowsAllowed}.`);
      } else if (availabilityCount > 0) {
        clearAvailabilityStore(targetPropId);
        writeAvailabilityStore(targetPropId, importedAvailability);
        availabilityReplaceApplied = true;
      } else {
        const expectedCols = expectedAvailabilityColumns(targetPropId);
        availabilityImportInvalid = true;
        state.importer.message = `⚠️ Import disponibilità non valido: nessuna riga letta. I dati precedenti NON sono stati cancellati. Controlla il formato del TSV (deve avere data + ${expectedCols} colonne numeriche per ${targetPropLabel}).`;
        state.importer.validationWarnings.push(`Nessuna riga valida trovata nel TSV. Formato atteso: DATA [tab] AVAIL1 [tab] AVAIL2 ... [tab] AVAIL${expectedCols}`);
        state.importer.validationWarnings.push(`Formato non riconosciuto. Prova a incollare dal report corretto di ${propertySourceSystems(targetPropId).importLabel}.`);
        const existingCount = Object.keys(availabilityStore(targetPropId) || {}).length;
        if (existingCount > 0) {
          state.importer.validationWarnings.push(`Mantenute ${existingCount} date disponibilità già presenti.`);
        }
      }
    }
    console.log(`Import ${targetPropId}: ${availabilityCount} righe, prima avevo ${oldAvailabilityCount} date`);
    state.importer.lastUpload = formatUploadStamp();
    if (targetPropId === "laville") {
      if (availabilityImportInvalid) {
        if (!state.importer.message) {
          state.importer.message = "Import disponibilità non valido: nessuna riga letta. I dati precedenti NON sono stati cancellati.";
        }
      } else if (rateCount || availabilityCount) {
        state.importer.message = `Dati aggiornati: ${rateCount} righe tariffe e ${availabilityCount} righe disponibilità per La Ville${rangeParts.length ? ` (${rangeParts.join("; ")})` : ""}.`;
      } else {
        state.importer.message = "Non ho letto righe valide: controlla che le colonne siano data e dus oppure la disponibilità con 10 valori.";
      }
    } else {
      if (availabilityImportInvalid) {
        if (!state.importer.message) state.importer.message = "Import disponibilità non valido: nessuna riga letta. I dati precedenti NON sono stati cancellati.";
      } else if (availabilityReplaceApplied || rateCount) {
        state.importer.message = `Dati aggiornati: ${rateCount} righe tariffe e ${availabilityCount} righe disponibilità per ${targetPropLabel}${rangeParts.length ? ` (${rangeParts.join("; ")})` : ""}.`;
      } else if (!state.importer.message) {
        state.importer.message = "Import disponibilità non valido: nessuna riga letta. I dati precedenti NON sono stati cancellati.";
      }
    }
    if (state.importer.validationWarnings.length) {
      state.importer.message += ` Rilevati ${state.importer.validationWarnings.length} warning di validazione.`;
    }
    if (rateCount) {
      if (autoDiaryCount > 0) {
        state.importer.message += ` Diario revenue: +${autoDiaryCount} variazioni auto registrate.`;
        if (autoDiaryTruncated > 0) state.importer.message += ` (${autoDiaryTruncated} escluse per limite ${AUTO_REVENUE_IMPORT_MAX_ENTRIES}).`;
      } else {
        state.importer.message += " Diario revenue: nessuna variazione rispetto all'ultimo import.";
      }
    }
    const importSuccess = Boolean(rateCount || availabilityReplaceApplied);
    state.modal = {
      kind: "import-feedback",
      success: importSuccess,
      title: importSuccess ? "Aggiornamento completato" : "Aggiornamento non completato",
      body: state.importer.message,
    };
    state.importer.locked = false;
    state.importer.ratesLocked = Boolean(state.importer.ratesLocked || rateCount);
    state.importer.availabilityLocked = Boolean(state.importer.availabilityLocked || availabilityCount);
    state.importer.editPending = false;
    state.importer.editBackup = null;
    refreshOperationalRate(currentProp(), state.selectedDate, state.occupancy);
    saveStoredImportData();
    render();
  }
  if (action === "calendar-day") {
    setDate(el.dataset.date);
    state.view = "calc";
    render();
  }
  if (action === "calendar-toggle-problems") {
    state.calendarOnlyProblems = !state.calendarOnlyProblems;
    render();
  }
  if (action === "calendar-toggle-past") {
    state.calendarHidePast = !state.calendarHidePast;
    render();
  }
  if (action === "calendar-reset-filters") {
    state.calendarOnlyProblems = false;
    state.calendarHidePast = false;
    render();
  }
});

app.addEventListener("input", (event) => {
  const el = event.target.closest("[data-action]");
  if (!el) return;
  if (el.dataset.action === "site-rate") {
    state.sito = Number(el.value || 0);
    state.hasCalendar = false;
  }
  if (el.dataset.action === "explore-modified-by") {
    state.explore.lastModifiedBy = el.value;
    saveStoredImportData();
  }
  if (el.dataset.action === "channel-diff") {
    const channelId = el.dataset.channel;
    if (!channelId) return;
    state.data[state.curIdx] = {
      ...currentProp(),
      channels: currentProp().channels.map((ch) => (
        ch.id === channelId ? { ...ch, diff: Number(el.value || 0) } : ch
      )),
    };
  }
  if (el.dataset.action === "strategy-name") {
    state.strategy.name = el.value;
  }
  if (el.dataset.action === "strategy-discount") {
    state.strategy.discount = Math.max(0, Math.min(90, Number(el.value || 0)));
  }
  if (el.dataset.action === "strategy-base-rate") {
    state.strategy.baseRate = el.value;
  }
  if (el.dataset.action === "strategy-promo-percent") {
    state.strategy.percentOverrides = {
      ...(state.strategy.percentOverrides || {}),
      [el.dataset.promoId]: el.value === "" ? "" : Math.max(0, Math.min(90, Number(el.value || 0))),
    };
  }
  if (el.dataset.action === "strategy-note") {
    state.strategy.note = el.value;
  }
  if (el.dataset.action === "strategy-period-from") {
    state.strategy.periodFrom = el.value;
    state.strategy.periodTo = el.value;
    syncStrategyBaseRate(el.value);
  }
  if (el.dataset.action === "strategy-period-to") {
    state.strategy.periodTo = el.value;
  }
  if (el.dataset.action === "reminder-field") {
    const { id, field } = el.dataset;
    state.reminders = state.reminders.map((item) => (item.id === id ? { ...item, [field]: el.value } : item));
    saveStoredImportData();
  }
  if (el.dataset.action === "billing-field") {
    state.billing = { ...state.billing, [el.dataset.field]: el.value };
  }
  if (el.dataset.action === "revenue-field") {
    state.revenueDraft = { ...state.revenueDraft, [el.dataset.field]: el.value };
  }
  if (el.dataset.action === "import-field") {
    state.importer = { ...state.importer, [el.dataset.field]: el.value, validationWarnings: [] };
  }
  if (el.dataset.action === "contact-field") {
    const key = el.dataset.op;
    const field = el.dataset.field;
    if (!key || !field) return;
    const contacts = state.operatorContacts || {};
    const existing = contacts[key] || { name: key, email: "", phone: "", role: "", notes: "", emails: [] };
    contacts[key] = { ...existing, [field]: el.value };
    state.operatorContacts = contacts;
    saveStoredImportData();
  }
  if (el.dataset.action === "operator-email-field") {
    const field = el.dataset.field;
    if (!field || !state.modal) return;
    const draft = state.modal.draft || {};
    state.modal = { ...state.modal, draft: { ...draft, [field]: el.value } };
  }
  if (el.dataset.action === "site-promo-field") {
    const field = el.dataset.field;
    const value = field === "on" ? el.checked : el.value;
    updateSitePromoField(Number(el.dataset.index), field, value);
  }
});

app.addEventListener("change", async (event) => {
  const el = event.target.closest("[data-action]");
  if (el?.dataset.action === "import-file") {
    const file = el.files?.[0];
    const field = el.dataset.field;
    if (!file || !field) return;
    const text = await file.text();
    state.importer = {
      ...state.importer,
      [field]: text,
      validationWarnings: [],
      message: `File caricato: ${file.name}. Controlla l'anteprima e poi clicca Aggiorna dati.`,
    };
    saveStoredImportData();
    render();
    return;
  }
  if (el?.dataset.action === "date") setDate(el.value);
  if (el?.dataset.action === "room-select") setSelectedRoom(el.value);
  if (el?.dataset.action === "property-select") setProperty(Number(el.value));
  if (el?.dataset.action === "site-rate") {
    state.sito = Number(el.value || 0);
    state.hasCalendar = false;
    markExplorePriceChange("Tariffa sito aggiornata");
    render();
  }
  if (el?.dataset.action === "explore-compare-room") {
    const slot = Math.max(0, Math.min(2, Number(el.dataset.slot || 0)));
    const next = [...(state.explore.compareRoomIds || [])];
    next[slot] = el.value;
    state.explore.compareRoomIds = next;
    saveStoredImportData();
    render();
  }
  if (el?.dataset.action === "explore-modified-by") {
    state.explore.lastModifiedBy = el.value;
    saveStoredImportData();
  }
  if (el?.dataset.action === "calendar-channel") {
    state.calendarChannel = el.value;
    render();
  }
  if (el?.dataset.action === "calendar-year") {
    state.calendarYear = Number(el.value);
    render();
  }
  if (el?.dataset.action === "calendar-range") {
    state.calendarRange = el.value;
    render();
  }
  if (el?.dataset.action === "calendar-start-month") {
    state.calendarStartMonth = Number(el.value);
    render();
  }
  if (el?.dataset.action === "channel-diff") {
    const channelId = el.dataset.channel;
    if (!channelId) return;
    state.data[state.curIdx] = {
      ...currentProp(),
      channels: currentProp().channels.map((ch) => (
        ch.id === channelId ? { ...ch, diff: Number(el.value || 0) } : ch
      )),
    };
    render();
  }
  if (el?.dataset.action === "strategy-channel") {
    state.strategy.channelId = el.value;
    state.strategy.selectedPromoIds = [];
    state.strategy.percentOverrides = {};
    render();
  }
  if (el?.dataset.action === "strategy-applies") {
    state.strategy.appliesTo = el.value;
    render();
  }
  if (el?.dataset.action === "strategy-stack") {
    state.strategy.stack = el.value;
    render();
  }
  if (el?.dataset.action === "strategy-base-rate") {
    state.strategy.baseRate = el.value;
    render();
  }
  if (el?.dataset.action === "strategy-promo-percent") {
    state.strategy.percentOverrides = {
      ...(state.strategy.percentOverrides || {}),
      [el.dataset.promoId]: el.value === "" ? "" : Math.max(0, Math.min(90, Number(el.value || 0))),
    };
    render();
  }
  if (el?.dataset.action === "strategy-period-from") {
    state.strategy.periodFrom = el.value;
    state.strategy.periodTo = el.value;
    syncStrategyBaseRate(el.value);
    render();
  }
  if (el?.dataset.action === "strategy-period-to") {
    state.strategy.periodTo = el.value;
    render();
  }
  if (el?.dataset.action === "reminder-field") {
    const { id, field } = el.dataset;
    state.reminders = state.reminders.map((item) => (item.id === id ? { ...item, [field]: el.value } : item));
    saveStoredImportData();
    render();
  }
  if (el?.dataset.action === "billing-field") {
    state.billing = { ...state.billing, [el.dataset.field]: el.value };
    render();
  }
  if (el?.dataset.action === "revenue-field") {
    state.revenueDraft = { ...state.revenueDraft, [el.dataset.field]: el.value };
    render();
  }
  if (el?.dataset.action === "revenue-filter") {
    if (el.dataset.field === "level") state.revenueFilterLevel = el.value || "all";
    saveStoredImportData();
    render();
  }
  if (el?.dataset.action === "import-field") {
    state.importer = { ...state.importer, [el.dataset.field]: el.value, validationWarnings: [] };
  }
  if (el?.dataset.action === "site-promo-field") {
    const field = el.dataset.field;
    const value = field === "on" ? el.checked : el.value;
    updateSitePromoField(Number(el.dataset.index), field, value);
    render();
  }
});

app.addEventListener("keydown", (event) => {
  const el = event.target.closest("[data-action]");
  if (!el || event.key !== "Enter") return;
  const commitOnEnter = new Set([
    "site-rate",
    "channel-diff",
    "strategy-base-rate",
    "strategy-promo-percent",
    "billing-field",
    "revenue-field",
    "reminder-field",
  ]);
  if (!commitOnEnter.has(el.dataset.action)) return;
  event.preventDefault();
  el.blur();
});

init();
