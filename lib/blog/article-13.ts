import type { Articol } from "./types";

export const articol13: Articol = {
  slug: "piulite-hexagonale-clase-rezistenta",
  h1: "Piulițe hexagonale — clase de rezistență și cum alegi corect",
  metaTitle: "Piulițe hexagonale clase de rezistență — ghid DIN și aplicații",
  metaDescription:
    "Ghid clase de rezistență piulițe hexagonale (6, 8, 10): ce înseamnă marcajul, standarde DIN/ISO, cum alegi clasa potrivită pentru fiecare aplicație.",
  keywords: ["piulite hexagonale clase", "clasa rezistenta piulita", "piulita hexagonala DIN"],
  excerpt:
    "Marcajul de pe piuliță (6, 8, 10) nu e decorativ — indică rezistența mecanică reală și trebuie să corespundă clasei șurubului cu care se cuplează.",
  date: "2026-08-28",
  categorie: "Ghid tehnic",
  produsSlugs: ["piulite", "suruburi-autoforante"],
  hubLinks: [
    { href: "/produse/dibluri", label: "Toate diblurile și accesoriile" },
    { href: "/aplicatii/reabilitare-blocuri", label: "Aplicații reabilitare blocuri" },
  ],
  relatedSlugs: [
    "suruburi-autoforante-ghid",
    "diferenta-diblu-8mm-vs-10mm",
    "ancore-chimice-vs-mecanice",
  ],
  faq: [
    {
      q: "Ce înseamnă cifra marcată pe piuliță (6, 8, 10)?",
      a: "Cifra indică clasa de rezistență mecanică conform standardului ISO 898-2: aproximativ rezistența la tracțiune a materialului din care e făcută piulița, exprimată convențional (clasa 8 corespunde unei rezistențe minime la tracțiune de cca. 800 N/mm² pentru șurubul asociat).",
    },
    {
      q: "Se poate combina o piuliță clasa 6 cu un șurub clasa 8.8?",
      a: "Nu e recomandat pentru aplicații solicitate mecanic — clasa piuliței trebuie să fie egală sau superioară clasei șurubului, altfel piulița devine elementul slab al îmbinării și poate ceda înainte de a atinge capacitatea nominală a șurubului.",
    },
    {
      q: "Ce standard DIN se folosește pentru piulițele hexagonale standard?",
      a: "Cele mai comune sunt DIN 934 (piuliță hexagonală standard) și DIN 985 sau DIN 982 (piuliță cu inserție de nailon, autoblocantă, împotriva desfacerii prin vibrații).",
    },
  ],
  blocks: [
    { type: "p", text: "Pe orice ambalaj de piulițe hexagonale găsești o cifră marcată — 6, 8 sau 10, uneori 6.8, 8.8, 10.9. Nu e un cod de lot sau o informație secundară: e clasa de rezistență mecanică, standardizată internațional, care determină exact în ce aplicații poate fi folosită piulița în siguranță." },
    { type: "h2", id: "ce-inseamna", text: "Ce înseamnă marcajul de clasă" },
    { type: "p", text: "Standardul ISO 898-2 definește clasele de rezistență pentru piulițe astfel încât să corespundă claselor de rezistență ale șuruburilor (ISO 898-1). Practic, o piuliță de clasă 8 este dimensionată să reziste la tracțiunea maximă pe care o poate genera un șurub de clasă 8.8, fără ca piulița să cedeze primă — filetul se rupe sau tija șurubului cedează, nu piulița." },
    { type: "table", caption: "Clase uzuale de piulițe și corespondența cu șuruburile", headers: ["Clasă piuliță", "Corespondență șurub", "Aplicații tipice"], rows: [
      ["4", "4.6 / 4.8", "Fixări ușoare, structuri neportante, mobilier"],
      ["6", "5.6 / 5.8 / 6.8", "Fixări generale, structuri metalice ușoare"],
      ["8", "8.8", "Structuri metalice, îmbinări solicitate, utilaje"],
      ["10", "10.9", "Structuri portante, aplicații de mare rezistență"],
      ["12", "12.9", "Aplicații speciale, industrie, solicitări extreme"],
    ]},
    { type: "h2", id: "de-ce-conteaza", text: "De ce contează potrivirea clasă piuliță — clasă șurub" },
    { type: "p", text: "O îmbinare filetată e la fel de puternică precum elementul ei cel mai slab. Dacă montați un șurub de clasă 10.9 cu o piuliță de clasă 6, în caz de solicitare mare piulița cedează prima — de regulă prin dezfiletare sau deformarea filetului — înainte ca șurubul să atingă capacitatea lui reală. Rezultatul: o îmbinare care pare corectă vizual, dar rezistă doar la o fracțiune din sarcina proiectată." },
    { type: "note", text: "Regulă simplă: la aplicații structurale sau solicitate mecanic, alegeți întotdeauna piulița cu clasă egală sau superioară șurubului. Nu combinați clase inferioare „pentru că merg fizic\" — se potrivesc dimensional, dar nu mecanic." },
    { type: "h2", id: "standarde", text: "Standardele DIN/ISO relevante" },
    { type: "ul", items: [
      "DIN 934 / ISO 4032 — piuliță hexagonală standard, cea mai comună",
      "DIN 985 / ISO 10511 — piuliță autoblocantă cu inserție de nailon, previne desfacerea prin vibrații",
      "DIN 982 — piuliță autoblocantă cu inserție metalică, pentru temperaturi ridicate unde nailonul nu rezistă",
      "DIN 6923 — piuliță hexagonală cu flanșă, pentru distribuție mai bună a presiunii pe suprafață",
    ]},
    { type: "h2", id: "aplicatii", text: "Alegerea practică pe tip de proiect" },
    { type: "p", text: "Pentru fixări ușoare — console, suporturi decorative, mobilier tehnic — piulițele de clasă 4 sau 6 sunt suficiente și mai economice. Pentru structuri metalice, balustrade solicitate, echipamente montate pe stâlpi sau structuri care preiau sarcini dinamice, clasa 8 devine standardul minim recomandat. Structurile portante propriu-zise (grinzi, cadre metalice de rezistență) folosesc de regulă clasa 8 sau 10, conform proiectului de rezistență, niciodată aleasă „din ochi\"." },
    { type: "p", text: "Pentru zone cu vibrații (utilaje, structuri expuse la vânt puternic, elemente montate pe fațade înalte), alegeți varianta autoblocantă (DIN 985/982) în locul piuliței hexagonale simple, indiferent de clasa de rezistență — desfacerea prin vibrații e o problemă separată de rezistența la tracțiune și cere soluție mecanică dedicată." },
    { type: "p", text: "Verificați întotdeauna marcajul de pe fiecare lot recepționat pe șantier, mai ales la comenzi mari din surse diferite — un amestec de clase neetichetat corect e un risc invizibil până la primul test de sarcină reală." },
  ],
};
