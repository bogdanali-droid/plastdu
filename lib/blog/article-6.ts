import type { Articol } from "./types";

export const articol6: Articol = {
  slug: "flansa-osb-vs-flansa-vata-minerala",
  h1: "Flanșă OSB vs Flanșă vată minerală — Diferențe montaj și utilizare",
  metaTitle: "Flanșă OSB vs Flanșă vată minerală — Diferențe și utilizare",
  metaDescription:
    "Diferențele dintre flanșa OSB cu capac snap-on și flanșa extinsă pentru vată minerală: design, montaj și când se folosește fiecare tip.",
  keywords: ["flansa osb vs flansa vata", "flansa capac osb", "flansa vata minerala fatada"],
  excerpt:
    "Flanșa OSB și flanșa pentru vată minerală arată similar, dar au funcții diferite. Comparăm design-ul, montajul și cazurile de utilizare ale fiecăreia.",
  date: "2026-08-27",
  categorie: "Ghid produse",
  produsSlugs: ["flansa-osb", "flansa-vata"],
  hubLinks: [
    { href: "/aplicatii#placi-osb", label: "Aplicații — Plăci OSB" },
    { href: "/aplicatii#vata-minerala", label: "Aplicații — Fixare vată minerală" },
  ],
  relatedSlugs: [
    "ce-diblu-pentru-vata-minerala",
    "ce-diblu-pentru-gips-carton",
    "diblu-plastic-vs-metalic-termoizolatie",
  ],
  faq: [
    {
      q: "Se pot folosi cele două tipuri de flanșă interschimbabil?",
      a: "Nu se recomandă. Flanșa OSB e proiectată pentru finisajul plăcilor rigide, cu capac decorativ, în timp ce flanșa pentru vată minerală e proiectată pentru distribuția forței pe un material fibros compresibil. Folosirea greșită afectează fie aspectul, fie rezistența fixării.",
    },
    {
      q: "Care flanșă costă mai mult?",
      a: "Flanșa OSB cu capac snap-on și șurub galvanizat inclus are, de regulă, un cost pe bucată mai ridicat, din cauza componentelor suplimentare (capac + șurub) față de flanșa simplă pentru vată minerală.",
    },
  ],
  blocks: [
    { type: "p", text: "În gama de accesorii pentru fixarea termoizolației, două tipuri de flanșe sunt frecvent confundate din cauza dimensiunii similare: flanșa pentru plăci OSB (cu capac snap-on, cod TSF-F55) și flanșa extinsă pentru vată minerală. Deși ambele au rolul de a distribui forța diblului pe o suprafață mai mare decât rozeta standard, funcția și design-ul lor diferă semnificativ." },
    { type: "h2", id: "design", text: "Diferențe de design" },
    { type: "h3", text: "Flanșa OSB (TSF-F55)" },
    { type: "p", text: "Este o flanșă cu sistem de capac snap-on, care acoperă complet capul diblului și șurubul de fixare după montaj, oferind un finisaj curat pe suprafața plăcii OSB. Include un șurub galvanizat, proiectat pentru a se înfileta direct în structura de lemn/OSB, nu doar pentru expandare mecanică ca la diblurile clasice." },
    { type: "h3", text: "Flanșa vată minerală" },
    { type: "p", text: "Este un disc simplu din polipropilenă, cu diametru extins (Ø120-140mm) și model de spițe duble pentru rigiditate, fără capac. Rolul ei este exclusiv structural — distribuția presiunii diblului pe suprafața fibroasă a vatei minerale, fără nicio funcție de finisaj estetic, întrucât peste vată se aplică ulterior un strat de tencuială sau alt finisaj." },
    { type: "h2", id: "tabel", text: "Comparație directă" },
    { type: "table",
      headers: ["Criteriu", "Flanșă OSB (TSF-F55)", "Flanșă vată minerală"],
      rows: [
        ["Sistem de capac", "Da — snap-on, acoperă complet capul", "Nu — disc simplu"],
        ["Șurub inclus", "Da — galvanizat", "Nu — se folosește cu diblu separat"],
        ["Diametru", "Compact, adaptat plăcii OSB", "Extins Ø120-140mm"],
        ["Utilizare tipică", "Fixare plăci OSB, finisaj vizibil", "Distribuție forță pe vată minerală, sub tencuială"],
      ],
    },
    { type: "h2", id: "cand-fiecare", text: "Când se folosește fiecare" },
    { type: "ul", items: [
      "Flanșa OSB — la montarea plăcilor OSB pe structuri din lemn sau metal, unde suprafața rămâne parțial vizibilă sau necesită un aspect finisat (hale, pereți despărțitori, structuri ușoare)",
      "Flanșa vată minerală — la fixarea plăcilor de vată minerală bazaltică pe fațadă, sub straturi ulterioare de plasă și tencuială decorativă",
    ]},
    { type: "h2", id: "capac-snap", text: "Capacul snap-on — de ce contează" },
    { type: "p", text: "Capacul snap-on al flanșei OSB nu e doar un element estetic — protejează capul șurubului de expunerea directă la umiditate și variații de temperatură, prevenind coroziunea prematură în zonele unde placa OSB rămâne parțial expusă (de exemplu, în structuri ușoare fără finisaj ulterior complet). La vata minerală, acest rol nu e necesar, deoarece flanșa e întotdeauna acoperită de tencuială." },
    { type: "p", text: "Pentru alegerea corectă a diblului de bază folosit împreună cu fiecare flanșă, consultați articolul dedicat alegerii diblului pentru vată minerală, respectiv comparația diblu plastic vs metalic pentru contextul general de termoizolație." },
  ],
};
