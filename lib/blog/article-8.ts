import type { Articol } from "./types";

export const articol8: Articol = {
  slug: "distantieri-beton-ghid-alegere",
  h1: "Distanțieri beton — Ghid complet de alegere pe tip cofraj",
  metaTitle: "Distanțieri beton — Ghid de alegere pe tip de cofraj",
  metaDescription:
    "Ghid de alegere a distanțierilor pentru beton armat: rol, tipuri (cilindric, placă, rozetă) și calcul orientativ al necesarului pe m² de armătură.",
  keywords: ["distantieri beton alegere", "distantieri armatura beton", "tipuri distantieri cofraj"],
  excerpt:
    "Distanțierii de beton asigură stratul de acoperire corect al armăturii — un element mic, dar esențial pentru durabilitatea structurii. Iată cum se aleg pe tip de cofraj.",
  date: "2026-08-27",
  categorie: "Ghid produse",
  produsSlugs: ["dibluri-plastic", "dibluri-metalice"],
  hubLinks: [
    { href: "/produse", label: "Toate produsele Plast Du IV" },
    { href: "/aplicatii", label: "Aplicații tehnice" },
  ],
  relatedSlugs: [
    "cate-dibluri-pe-metru-patrat-termosistem",
    "diblu-plastic-vs-metalic-termoizolatie",
    "ce-diblu-pentru-gips-carton",
  ],
  faq: [
    {
      q: "Ce se întâmplă dacă stratul de acoperire al armăturii e prea mic?",
      a: "Armătura devine vulnerabilă la coroziune din cauza infiltrațiilor de umiditate și carbonatării premature a betonului din jur, ceea ce reduce semnificativ durata de viață a structurii și poate duce la fisurarea betonului de acoperire.",
    },
    {
      q: "Distanțierii din plastic rezistă la turnarea betonului?",
      a: "Da, distanțierii din plastic (polipropilenă) sunt proiectați să reziste la presiunea betonului proaspăt și la vibrarea mecanică din timpul turnării, păstrându-și poziția și forma pe toată durata procesului.",
    },
  ],
  blocks: [
    { type: "p", text: "Distanțierii de beton sunt elemente aparent minore în execuția unei structuri din beton armat, dar rolul lor este esențial: mențin armătura la distanța corectă față de cofraj sau față de suprafața de turnare, asigurând stratul de acoperire necesar pentru protecția anticorozivă a fierului beton. O alegere greșită a tipului de distanțier poate compromite durabilitatea întregii structuri pe termen lung." },
    { type: "h2", id: "rol", text: "Rolul distanțierilor în structura de beton" },
    { type: "p", text: "Stratul de acoperire al armăturii — distanța dintre bara de oțel și suprafața exterioară a betonului — protejează fierul beton de contactul direct cu umiditatea, oxigenul și agenții agresivi din mediu, care ar duce la coroziune. Distanța corectă variază în funcție de tipul elementului structural (fundație, stâlp, placă) și de clasa de expunere a betonului, fiind stabilită prin proiectul de rezistență. Distanțierii sunt instrumentul fizic prin care această distanță se menține constantă pe toată suprafața de turnare." },
    { type: "h2", id: "tipuri", text: "Tipurile principale de distanțieri" },
    { type: "h3", text: "Distanțier cilindric (rotund)" },
    { type: "p", text: "Formă simplă, cilindrică, cu bază plată de sprijin. Este tipul cel mai răspândit pentru plăci și fundații, ușor de poziționat sub grătarele de armătură, disponibil în diverse înălțimi corespunzătoare grosimii stratului de acoperire cerut." },
    { type: "h3", text: "Distanțier tip placă (cu bază lată)" },
    { type: "p", text: "Are o bază de sprijin mai lată decât varianta cilindrică simplă, oferind stabilitate suplimentară pe cofraje orizontale sau pe folii de polietilenă, unde riscul de înfundare în terenul de dedesubt este mai mare (fundații pe pământ compactat)." },
    { type: "h3", text: "Distanțier tip rozetă / stea (pentru cofraj vertical)" },
    { type: "p", text: "Proiectat pentru elemente verticale — stâlpi, pereți structurali — se fixează direct pe bara de armătură și menține distanța constantă față de cofrajul vertical din toate direcțiile radiale, fiind esențial acolo unde nu există o bază orizontală de sprijin." },
    { type: "h2", id: "tabel-alegere", text: "Ghid rapid de alegere pe tip de element" },
    { type: "table",
      headers: ["Element structural", "Tip cofraj", "Distanțier recomandat"],
      rows: [
        ["Fundație / radier", "Orizontal, pe teren compactat", "Distanțier tip placă (bază lată)"],
        ["Placă de beton", "Orizontal, pe cofraj rigid", "Distanțier cilindric"],
        ["Stâlp / perete structural", "Vertical", "Distanțier tip rozetă / stea"],
        ["Grinzi", "Lateral și inferior", "Combinație cilindric + rozetă, în funcție de poziția armăturii"],
      ],
    },
    { type: "h2", id: "calcul", text: "Calcul orientativ al necesarului pe m² de armătură" },
    { type: "p", text: "Numărul de distanțieri necesar depinde de densitatea grătarului de armătură și de rigiditatea acestuia. O regulă orientativă folosită frecvent pe șantier este:" },
    { type: "note", text: "Necesar distanțieri ≈ 4-6 buc/m² pentru plăci și fundații cu grătar simplu de armătură, cu densitate mai mare (6-8 buc/m²) pentru grătare duble sau zone cu solicitare structurală ridicată." },
    { type: "p", text: "Pentru elemente verticale (stâlpi, pereți), necesarul se calculează pe număr de bare de armătură și înălțime a elementului, cu distanțieri tip rozetă plasați la fiecare 50-100cm pe verticală, în funcție de rigiditatea carcasei de armătură." },
    { type: "h2", id: "material", text: "Material — de ce contează" },
    { type: "p", text: "Distanțierii din plastic (polipropilenă) sunt varianta cea mai folosită în construcțiile civile curente — nu ruginesc, nu creează pete de coroziune pe suprafața finală a betonului și rezistă bine la presiunea de turnare și vibrare. Pentru elemente cu cerințe speciale de rezistență la foc sau la clase de expunere severă, se pot folosi și distanțieri din mortar sau fibrociment, dar plasticul acoperă marea majoritate a aplicațiilor rezidențiale și comerciale standard." },
    { type: "p", text: "Ca producător de accesorii de fixare din plastic pentru construcții, Plast Du IV recomandă întotdeauna verificarea proiectului de rezistență pentru stratul de acoperire exact cerut, iar pentru celelalte etape ale șantierului — de la termoizolație la fixări în structuri finisate — consultați și ghidurile noastre despre alegerea diblurilor potrivite pe tip de suport." },
  ],
};
