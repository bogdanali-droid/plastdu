import type { Articol } from "./types";

export const articol17: Articol = {
  slug: "tipuri-saibe-din-standarde",
  h1: "Tipuri de șaibe DIN — ce standard alegi pentru fiecare aplicație",
  metaTitle: "Tipuri șaibe DIN 125, 127, 436, 522, 9021 — ghid alegere",
  metaDescription:
    "Diferența dintre șaibele DIN 125, 127, 436, 522 și 9021: dimensiuni, grosime, când folosești fiecare tip pe șantier sau în producție.",
  keywords: ["tipuri saibe DIN", "saibe DIN 125", "saibe DIN 9021", "saibe zimtate DIN 127"],
  excerpt:
    "Șaiba potrivită protejează suportul, distribuie forța de strângere și previne slăbirea îmbinării. Iată cum alegi între cele mai comune standarde DIN.",
  date: "2026-08-28",
  categorie: "Ghid tehnic",
  produsSlugs: ["saibe"],
  hubLinks: [
    { href: "/produse", label: "Toate produsele" },
    { href: "/materiale-fatada", label: "Materiale fațadă" },
  ],
  relatedSlugs: [
    "piulite-hexagonale-clase-rezistenta",
    "suruburi-autoforante-ghid",
    "diferenta-diblu-8mm-vs-10mm",
  ],
  faq: [
    {
      q: "Care e diferența principală între DIN 125 și DIN 9021?",
      a: "DIN 125 e șaiba plată standard, cu diametru exterior redus, potrivită pentru îmbinări obișnuite. DIN 9021 are diametru exterior mult mai mare pentru aceeași gaură interioară — distribuie forța de strângere pe o suprafață extinsă, utilă pe materiale moi sau găuri ovalizate.",
    },
    {
      q: "Când e obligatorie șaiba zimțată DIN 127?",
      a: "Când îmbinarea e supusă la vibrații (utilaje, structuri metalice mobile, echipamente industriale) și nu se folosește altă soluție anti-desfacere (piuliță de siguranță, frenetite). Zimții mușcă în suprafețele de contact și opun rezistență suplimentară la autodeșurubare.",
    },
    {
      q: "Ce șaibă se folosește la structuri metalice cu șuruburi de înaltă rezistență?",
      a: "DIN 6916 sau DIN 7989, gândite special pentru clasa de rezistență 8.8/10.9 din structuri metalice, cu grosime mărită față de DIN 125. Pentru aplicații generale de fixare, DIN 125 sau DIN 9021 rămân opțiunile standard.",
    },
    {
      q: "Șaiba mărește sau micșorează riscul de slăbire a îmbinării în timp?",
      a: "O șaibă corect aleasă reduce riscul, pentru că distribuie presiunea și protejează suprafața de amprentarea capului de șurub/piuliță. O șaibă greșit dimensionată (prea mică, prea subțire) poate, dimpotrivă, să favorizeze deformarea locală și slăbirea în timp.",
    },
  ],
  blocks: [
    { type: "p", text: "Pe hârtie, o șaibă pare cel mai simplu element dintr-o îmbinare — un disc plat cu o gaură la mijloc. În practică, alegerea greșită a tipului de șaibă poate compromite o îmbinare aparent corect executată: strângere insuficientă distribuită, deformarea suportului sau desfacere în timp din cauza vibrațiilor. Standardele DIN diferențiază șaibele exact pe aceste criterii — diametru exterior, grosime și geometrie de contact." },
    { type: "h2", id: "din-125", text: "DIN 125 — șaiba plată standard" },
    { type: "p", text: "DIN 125 (variante A și B) e cea mai răspândită șaibă plată din oțel, folosită la îmbinări generale cu șuruburi și piulițe hexagonale. Diametrul exterior e moderat, suficient pentru majoritatea aplicațiilor de fixare unde suportul e rigid (metal, lemn dens). Grosimea standard oferă protecție de bază împotriva amprentării suprafeței de contact." },
    { type: "p", text: "Varianta A are gaură interioară cu toleranță mai strânsă și e preferată în producție, unde precizia contează. Varianta B are toleranță mai largă, potrivită pentru montaj manual pe șantier, unde o marjă de eroare la aliniere e binevenită." },
    { type: "h2", id: "din-127", text: "DIN 127 — șaiba elastică zimțată" },
    { type: "p", text: "DIN 127 (tip A cu dinți interiori, tip B cu dinți exteriori) e o șaibă de siguranță concepută să prevină autodeșurubarea la vibrații. Dinții se deformează ușor la strângere și mușcă în suprafețele adiacente, opunând rezistență suplimentară față de rotația inversă." },
    { type: "note", text: "Șaiba zimțată DIN 127 nu înlocuiește o piuliță de siguranță pe îmbinări critice — e o soluție complementară, potrivită pentru aplicații generale expuse la vibrații moderate, nu pentru elemente structurale cu cerințe de siguranță ridicate." },
    { type: "h2", id: "din-436-522", text: "DIN 436 și DIN 522 — șaibe pătrate și cu diametru extins" },
    { type: "p", text: "DIN 436 e o șaibă pătrată, groasă, folosită tradițional la structuri din lemn — profilul pătrat previne rotirea șaibei în material moale la strângere. DIN 522 e o șaibă plată cu diametru exterior mărit față de DIN 125, la aceeași grosime relativ subțire — utilă când vrei o suprafață de contact mai mare fără costul unei șaibe groase precum DIN 9021." },
    { type: "h2", id: "din-9021", text: "DIN 9021 — șaiba lată pentru distribuție de forță" },
    { type: "p", text: "DIN 9021 are diametrul exterior semnificativ mai mare decât DIN 125, pentru același diametru interior — uneori dublu. E soluția standard când suportul e moale, fisurat, ovalizat sau prezintă goluri (lemn, materiale ușoare, structuri vechi de renovat), pentru că distribuie presiunea de strângere pe o suprafață mult mai extinsă și reduce riscul de smulgere locală." },
    { type: "table", caption: "Comparație rapidă tipuri de șaibe DIN", headers: ["Standard", "Tip", "Aplicație tipică"], rows: [
      ["DIN 125", "Plată standard", "Îmbinări generale, producție și șantier"],
      ["DIN 127", "Elastică zimțată", "Vibrații moderate, fără piuliță de siguranță dedicată"],
      ["DIN 436", "Pătrată groasă", "Structuri din lemn, prevenire rotire"],
      ["DIN 522", "Plată diametru extins", "Distribuție forță medie, cost redus"],
      ["DIN 9021", "Lată, groasă", "Suport moale/fisurat, distribuție forță mare"],
    ] },
    { type: "h2", id: "cum-alegi", text: "Cum alegi practic șaiba potrivită" },
    { type: "ul", items: [
      "Suport rigid, îmbinare standard → DIN 125",
      "Vibrații fără piuliță de siguranță → DIN 127",
      "Structură din lemn → DIN 436",
      "Suprafață de contact medie, cost controlat → DIN 522",
      "Suport moale, fisurat sau cu goluri → DIN 9021",
    ]},
    { type: "p", text: "Pentru comenzi mari de șantier, un mix de 2-3 tipuri de șaibe acoperă majoritatea aplicațiilor curente — DIN 125 pentru volumul general, DIN 9021 pentru zonele cu suport slab și DIN 127 pentru echipamente cu vibrații. Plast Du IV distribuie șaibe plate și zimțate din oțel zincat în game metrice complete, disponibile pentru comenzi en-gros cu livrare rapidă." },
  ],
};
