// Configurazione centralizzata di promozioni, compatibilità e commissioni.
(function () {
  const config = {};
  config.COMPAT = {
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

  config.TYPE_LABELS = {
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

  config.STRATEGY_CHANNEL_META = {
    site: { label: "Sito ufficiale", comm: 0 },
    booking: { label: "Booking.com", comm: 18 },
    webbeds: { label: "WebBeds", comm: 20 },
    hotelbeds: { label: "HotelBeds", comm: 20 },
    gobeds: { label: "GoBeds", comm: 20 },
    expedia: { label: "Expedia", comm: 18 },
    trip: { label: "Trip.com", comm: 18 },
  };

  config.STRATEGY_PROMO_LIBRARY = {
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

  window.PRISMA_STRATEGY_CONFIG = Object.freeze(config);
})();
