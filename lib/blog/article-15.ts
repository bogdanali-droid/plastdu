import type { Articol } from "./types";

export const articol15: Articol = {
  slug: "diferenta-diblu-8mm-vs-10mm",
  h1: "Diblu 8mm vs 10mm — care e diferența reală și când alegi fiecare",
  metaTitle: "Diblu 8mm vs 10mm — diferență, rezistență, unde se folosește",
  metaDescription:
    "Comparație diblu 8mm vs 10mm: diferența de rezistență la smulgere, tipul de suport recomandat pentru fiecare diametru și cum alegi corect pe șantier.",
  keywords: ["diblu 8mm vs 10mm", "diametru diblu termoizolatie", "diblu 8mm sau 10mm"],
  excerpt:
    "Diferența de 2mm dintre diblul de 8mm și cel de 10mm pare mică, dar înseamnă un burghiu diferit, o rezistență diferită și, uneori, o alegere greșită costisitoare.",
  date: "2026-08-28",
  categorie: "Ghid produs",
  produsSlugs: ["dibluri-plastic", "dibluri-metalice"],
  hubLinks: [
    { href: "/produse/dibluri", label: "Toate diblurile" },
    { href: "/sisteme/termoizolatie-eps", label: "Sistem termoizolație EPS" },
  ],
  relatedSlugs: [
    "ancore-chimice-vs-mecanice",
    "cum-se-monteaza-diblul-pentru-polistiren",
    "diblu-plastic-vs-metalic-termoizolatie",
  ],
  faq: [
    {
      q: "Diblul de 10mm rezistă întotdeauna mai mult decât cel de 8mm?",
      a: "De regulă da, la suport identic — diametrul mai mare distribuie forța pe o suprafață mai largă de contact. Diferența devine semnificativă mai ales pe suporturi poroase sau slabe (BCA, cărămidă găurită), unde diblul de 8mm poate avea o rezistență la smulgere insuficientă.",
    },
    {
      q: "Pot folosi același burghiu pentru ambele diametre?",
      a: "Nu. Diblul de 8mm cere burghiu Ø8mm, cel de 10mm cere burghiu Ø10mm. O gaură prea largă pentru diametrul diblului reduce drastic forța de fixare, chiar dacă diblul \"intră\" fizic în gaură.",
    },
    {
      q: "Diblul de 10mm costă semnificativ mai mult decât cel de 8mm?",
      a: "Diferența de preț per bucată e de regulă mică (câțiva bani), dar la comenzi de zeci de mii de bucăți pentru un șantier de reabilitare, diferența devine vizibilă în buget — motiv pentru care alegerea corectă a diametrului, nu supradimensionarea „ca să fie sigur\", contează financiar.",
    },
  ],
  blocks: [
    { type: "p", text: "Diblul de 8mm și cel de 10mm rezolvă aceeași funcție — fixarea termoizolației sau a altor elemente pe suport — dar diferența de diametru schimbă atât rezistența la smulgere, cât și tipul de suport pe care fiecare variantă performează optim. Alegerea greșită între ele înseamnă fie o fixare subdimensionată, fie un cost inutil de supradimensionare." },
    { type: "h2", id: "diferenta", text: "Diferența tehnică dintre cele două diametre" },
    { type: "p", text: "Diametrul diblului determină suprafața de contact cu suportul din jurul zonei de expandare a cuiului. Un diblu de 10mm are un corp cu perete mai gros și o zonă de expandare mai mare decât unul de 8mm, ceea ce se traduce, la același suport, într-o forță de smulgere mai mare — de regulă cu 20-40% superioară, în funcție de producător și tip de suport." },
    { type: "table", caption: "Comparație orientativă diblu 8mm vs 10mm", headers: ["Criteriu", "Diblu Ø8mm", "Diblu Ø10mm"], rows: [
      ["Burghiu necesar", "Ø8mm", "Ø10mm"],
      ["Forță de smulgere (suport dur)", "Bună", "Superioară (~20-40%)"],
      ["Recomandat pentru", "Beton compact, cărămidă plină, sarcini standard", "BCA, cărămidă găurită, sarcini mai mari"],
      ["Consum de material la găurire", "Mai mic", "Mai mare (praf, timp)"],
      ["Cost per bucată", "Ușor mai mic", "Ușor mai mare"],
    ]},
    { type: "h2", id: "cand-8mm", text: "Când alegi diblul de 8mm" },
    { type: "ul", items: [
      "Suport dur, compact — beton turnat, cărămidă plină, în stare bună, fără fisuri",
      "Sarcini standard de termoizolație (EPS ușor) în zone de câmp curent, fără solicitare eolică ridicată",
      "Volum mare de puncte de fixare, unde reducerea diametrului scade și timpul de găurire, și consumul de burghie",
    ]},
    { type: "h2", id: "cand-10mm", text: "Când alegi diblul de 10mm" },
    { type: "ul", items: [
      "Suport poros sau mai slab — BCA, cărămidă găurită, zidărie veche cu rezistență incertă",
      "Zone de colț și margine ale fațadei, cu solicitare eoliană mai mare",
      "Vată minerală (mai grea decât EPS), unde forța de smulgere necesară e mai ridicată",
      "Clădiri înalte, unde presiunea vântului pe fațadă crește semnificativ față de construcțiile joase",
    ]},
    { type: "note", text: "Nu presupuneți diametrul „din ochi\" pe baza tipului de proiect — verificați întotdeauna fișa tehnică a diblului ales și, dacă e disponibil, proiectul tehnic de termoizolație, care specifică exact diametrul și schema de distribuție pentru fiecare zonă a fațadei." },
    { type: "h2", id: "greseala", text: "Greșeala frecventă: „mai gros = mai sigur\"" },
    { type: "p", text: "O presupunere comună pe șantier e că diblul de 10mm e „varianta sigură\" universal, indiferent de suport. În realitate, pe un suport dur și compact, diblul de 8mm bine ales oferă o rezistență suficientă, iar supradimensionarea aduce doar cost suplimentar și timp de găurire mai mare — fără beneficiu real de siguranță. Alegerea corectă pornește de la tipul de suport și sarcina proiectată, nu de la principiul „mai mare, mai bine\"." },
    { type: "p", text: "Pentru proiecte mixte, unde clădirea are zone cu suport diferit (fundație de beton, extindere din BCA), e complet normal să folosiți ambele diametre în același șantier — 8mm acolo unde suportul o permite, 10mm acolo unde suportul cere o forță de smulgere mai mare. Consultați echipa tehnică pentru validarea alegerii pe fiecare zonă distinctă a clădirii." },
  ],
};
