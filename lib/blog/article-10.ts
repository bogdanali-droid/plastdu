import type { Articol } from "./types";

export const articol10: Articol = {
  slug: "suruburi-autoforante-ghid",
  h1: "Șuruburi autoforante — ghid complet de alegere după material",
  metaTitle: "Șuruburi autoforante — ghid de alegere pe tip de material",
  metaDescription:
    "Ghid tehnic șuruburi autoforante: tipuri pentru PAL, lemn, tablă și gips-carton, cum alegi diametrul și lungimea corectă, greșeli frecvente de montaj.",
  keywords: ["suruburi autoforante", "surub autoforant tabla", "surub autoforant lemn"],
  excerpt:
    "Șurubul autoforant potrivit depinde de materialul de bază — PAL, lemn, tablă sau gips-carton — și de grosimea elementului. Iată cum alegi corect, tip cu tip.",
  date: "2026-08-28",
  categorie: "Ghid produs",
  produsSlugs: ["suruburi-autoforante", "dibluri-plastic"],
  hubLinks: [
    { href: "/produse/dibluri", label: "Toate diblurile" },
    { href: "/materiale-fatada", label: "Materiale fațadă" },
  ],
  relatedSlugs: [
    "ce-diblu-pentru-gips-carton",
    "diferenta-diblu-8mm-vs-10mm",
    "piulite-hexagonale-clase-rezistenta",
  ],
  faq: [
    {
      q: "Ce diferență e între un șurub autoforant și unul autofiletant?",
      a: "Șurubul autoforant are vârf ascuțit special (tip burghiu sau ac) care perforează singur materialul subțire, fără gaură pilot. Șurubul autofiletant necesită de regulă o gaură pilot preexistentă, în care își croiește filetul pe măsură ce e înșurubat.",
    },
    {
      q: "Se poate folosi șurub autoforant pentru tablă direct în profil metalic gros?",
      a: "Depinde de vârf — șuruburile cu vârf tip \"burghiu\" (self-drilling) perforează table de până la 2-3mm fără gaură pilot; peste această grosime e nevoie de gaură pilot sau șurub specific pentru grosimi mari.",
    },
    {
      q: "De ce se rupe capul șurubului la montaj?",
      a: "Cel mai frecvent motiv: cuplu de strângere prea mare la mașina de înșurubat, combinat cu un diametru de șurub subdimensionat pentru grosimea materialului. Reglați cuplul mașinii și verificați compatibilitatea diametru-grosime din fișa tehnică.",
    },
  ],
  blocks: [
    { type: "p", text: "„Șurub autoforant\" e un termen umbrelă pentru zeci de variante diferite, optimizate fiecare pentru un tip de material. Confuzia cea mai frecventă pe șantier: folosirea aceluiași șurub pentru PAL, lemn masiv, tablă și gips-carton — deși fiecare material cere geometrie de filet, vârf și pas diferite pentru o fixare sigură." },
    { type: "h2", id: "ce-inseamna-autoforant", text: "Ce înseamnă, de fapt, \"autoforant\"" },
    { type: "p", text: "Un șurub autoforant își creează singur calea de pătrundere — fie prin vârful ascuțit care găurește direct materialul subțire (tablă, plastic), fie prin filetul agresiv care își croiește propriul canal în materiale mai moi (lemn, PAL, gips-carton), fără gaură pilot separată. Avantajul: montaj rapid, fără etapă de pre-găurire pe fiecare punct." },
    { type: "h2", id: "pal", text: "Șuruburi pentru PAL (mobilă, mobilier tehnic)" },
    { type: "p", text: "PAL-ul (plăcă aglomerată din lemn) e un material fragil la tracțiune transversală — filetul trebuie să fie relativ des, cu diametru mic la vârf, pentru a evita crăparea marginii plăcii. Șuruburile de tip confirmat (euroșurub) au cap special și filet dublu, potrivite pentru îmbinări invizibile de mobilier. Pentru fixări structurale în PAL gros (18-25mm), alegeți lungimea astfel încât să pătrundă minimum 15mm în piesa a doua, fără să iasă prin partea opusă." },
    { type: "h2", id: "lemn", text: "Șuruburi pentru lemn masiv" },
    { type: "p", text: "Lemnul masiv permite filete mai agresive și diametre mai mari fără riscul de crăpare, mai ales dacă lucrați perpendicular pe fibră. Pentru grinzi și elemente structurale se recomandă șuruburi cu filet parțial (zona netedă sub cap trage cele două piese una spre alta) și, la secțiuni predispuse la crăpare (aproape de capătul scândurii), o gaură pilot subțire reduce riscul." },
    { type: "h2", id: "tabla", text: "Șuruburi pentru tablă (self-drilling)" },
    { type: "p", text: "Pentru fixarea tablei cutate, profilelor metalice ușoare sau tinichigerie de fațadă, șurubul cu vârf tip burghiu (self-drilling point) e standardul — perforează, filetează și fixează într-o singură operație. Diametrul vârfului trebuie ales în funcție de grosimea totală a tablei traversate: vârf subdimensionat nu perforează curat, vârf supradimensionat slăbește prinderea." },
    { type: "h2", id: "gips-carton", text: "Șuruburi pentru gips-carton" },
    { type: "p", text: "Gips-cartonul cere șuruburi cu filet special, des și subțire, cu cap tronconic (phillips sau posidriv) care se îngroapă ușor sub suprafață fără a rupe cartonul. Pentru fixare pe structură metalică (profile CW/UW) se folosește vârf fin autoforant; pentru structură din lemn, vârf mai agresiv tip \"coarse thread\". Amestecarea celor două tipuri e o greșeală frecventă care duce la filet slăbit sau montaj instabil." },
    { type: "note", text: "Regula rapidă de alegere: material moale și subțire (gips-carton) → filet des, vârf fin. Material dur și gros (lemn masiv, metal) → filet rar sau vârf tip burghiu, în funcție de grosime." },
    { type: "h2", id: "greseli", text: "Greșeli frecvente de montaj" },
    { type: "ul", items: [
      "Diametru de șurub prea mare pentru grosimea materialului — riscă crăparea PAL-ului sau a gips-cartonului",
      "Cuplu de strângere necontrolat la mașina de înșurubat — capete rupte sau filet distrus în material moale",
      "Lungime greșită — șurub prea scurt nu ancorează suficient, prea lung iese prin partea opusă sau lovește instalații ascunse",
      "Folosirea unui șurub pentru lemn în tablă groasă (fără vârf de găurire) — montaj lent și instabil",
      "Lipsa găurii pilot la capetele scândurilor de lemn masiv, unde riscul de crăpare e maxim",
    ]},
    { type: "p", text: "Un șurub autoforant ales corect pentru materialul de bază reduce timpul de montaj și elimină o mare parte din reclamațiile de fixări slăbite. Verificați întotdeauna fișa tehnică a produsului — diametru, lungime și tip de vârf recomandat pentru fiecare aplicație — înainte de a comanda cantități mari pentru șantier." },
  ],
};
