import type { Articol } from "./types";

export const articol14: Articol = {
  slug: "calcul-necesar-materiale-reabilitare-bloc",
  h1: "Calculul necesarului de materiale pentru reabilitarea unui bloc — pas cu pas",
  metaTitle: "Calcul necesar materiale reabilitare bloc — dibluri, flanșe, ancore",
  metaDescription:
    "Cum calculezi necesarul de dibluri, flanșe și ancore pentru reabilitarea termică a unui bloc, per m² de fațadă, cu exemplu de calcul și template descărcabil.",
  keywords: ["calcul materiale reabilitare bloc", "necesar dibluri fatada", "calcul dibluri m2"],
  excerpt:
    "Un calcul greșit al necesarului de materiale înseamnă fie comenzi suplimentare care întârzie șantierul, fie stoc mort. Iată metoda corectă, cu exemplu real.",
  date: "2026-08-28",
  categorie: "Reabilitare termică",
  produsSlugs: ["dibluri-plastic", "flansa-vata"],
  hubLinks: [
    { href: "/aplicatii/reabilitare-blocuri", label: "Aplicații reabilitare blocuri" },
    { href: "/furnizor-primarii", label: "Furnizor pentru primării și asociații" },
  ],
  relatedSlugs: [
    "cate-dibluri-pe-metru-patrat-termosistem",
    "capace-teava-protectie-santier",
    "diferenta-diblu-8mm-vs-10mm",
  ],
  faq: [
    {
      q: "Cu cât procent de rezervă suplimentăm comanda de dibluri?",
      a: "Recomandăm 5-8% peste calculul teoretic, pentru pierderi la montaj, zone cu distribuție mai densă (colțuri, socluri) și eventuale corecții pe șantier. Pentru comenzi mari (blocuri de peste 10 etaje), 5% e de regulă suficient dacă echipa are experiență.",
    },
    {
      q: "Cum aflu suprafața reală de fațadă dintr-un bloc de locuințe?",
      a: "Se măsoară perimetrul clădirii la fiecare fațadă, înmulțit cu înălțimea, din care se scade suprafața golurilor (ferestre, uși, glafuri) — de regulă 15-25% din suprafața brută, în funcție de tipul blocului. Releveul exact vine din proiectul tehnic de reabilitare.",
    },
    {
      q: "Diferă necesarul de dibluri pentru EPS față de vată minerală?",
      a: "Da — vata minerală, în special cea rigidă (bazaltică), necesită de regulă un număr mai mare de puncte de fixare per m² decât EPS, din cauza greutății mai mari a materialului. Verificați fișa tehnică a sistemului de termoizolație ales.",
    },
  ],
  blocks: [
    { type: "p", text: "Reabilitarea termică a unui bloc de locuințe implică zeci de mii de puncte de fixare — dibluri, flanșe, ancore — comandate cu săptămâni înainte de începerea lucrării. Un calcul greșit are consecințe directe: comandă insuficientă înseamnă oprirea șantierului în așteptarea unei livrări suplimentare, comandă excesivă înseamnă capital blocat în stoc nefolosit. Metoda corectă de calcul elimină ambele riscuri." },
    { type: "h2", id: "pasul1", text: "Pasul 1 — Suprafața reală de fațadă" },
    { type: "p", text: "Porniți de la proiectul tehnic al clădirii sau, în lipsa lui, de la măsurători directe: perimetrul fiecărei fațade înmulțit cu înălțimea totală. Din suprafața brută scădeți golurile — ferestre, uși, balcoane deschise — care de regulă reprezintă 15-25% din suprafața totală la blocurile de locuințe standard din România. Rezultatul e suprafața netă de termoizolat." },
    { type: "h2", id: "pasul2", text: "Pasul 2 — Numărul de dibluri per m²" },
    { type: "p", text: "Distribuția standard pentru termosistem EPS pe suport de beton/cărămidă e de 6-8 dibluri/m² în câmpul curent al fațadei, crescând la 8-10 dibluri/m² în zonele de colț și margine (unde solicitarea la vânt e mai mare). Pentru vată minerală, necesarul crește la 8-10 dibluri/m² în câmp, respectiv 10-12 în zonele de margine. Aceste valori sunt orientative — proiectul tehnic sau fișa tehnică a sistemului ales indică exact schema de distribuție cerută pentru înălțimea și zona eoliană a clădirii." },
    { type: "table", caption: "Exemplu de calcul orientativ (necesar per m²)", headers: ["Material fațadă", "Zonă câmp curent", "Zonă colț/margine"], rows: [
      ["EPS (polistiren expandat)", "6-8 buc/m²", "8-10 buc/m²"],
      ["Vată minerală rigidă", "8-10 buc/m²", "10-12 buc/m²"],
    ]},
    { type: "h2", id: "pasul3", text: "Pasul 3 — Exemplu de calcul complet" },
    { type: "p", text: "Bloc cu 4 fațade, perimetru total 140m, înălțime 30m (10 etaje): suprafață brută = 140 × 30 = 4.200 m². Scădem 20% goluri = 3.360 m² suprafață netă de termoizolat. Estimăm 85% câmp curent (2.856 m²) și 15% zone de colț/margine (504 m²)." },
    { type: "ul", items: [
      "Câmp curent EPS: 2.856 m² × 7 buc/m² = ~20.000 dibluri",
      "Zone colț/margine EPS: 504 m² × 9 buc/m² = ~4.540 dibluri",
      "Total dibluri necesare (teoretic): ~24.540 buc",
      "Cu rezervă de 6%: ~26.000 dibluri de comandat",
    ]},
    { type: "p", text: "Același tip de calcul se aplică și pentru flanșe (la vată minerală, unde e cazul) și pentru ancorele suplimentare din zonele de soclu, unde majoritatea proiectelor cer distanțe mai mici între puncte." },
    { type: "h2", id: "flanse-ancore", text: "Calcul separat pentru flanșe și ancore de soclu" },
    { type: "p", text: "Flanșele (folosite tipic la vată minerală pentru presarea suplimentară a plăcii) se calculează similar, dar de regulă cu o densitate mai mică — 1-2 buc/m² în plus față de diblurile standard, în funcție de sistemul ales. Zona de soclu (primii 2-3m de la sol, mai expusă la impact mecanic) necesită frecvent ancore suplimentare sau plasă întărită, calculate separat pe metrul liniar de soclu, nu pe suprafață." },
    { type: "note", text: "Descărcați și completați un template simplu de calcul (Excel) cu 4 coloane: zonă fațadă, suprafață netă (m²), densitate dibluri/m² conform proiectului, total necesar — apoi însumați pe toate zonele și adăugați procentul de rezervă. Solicitați-l de la echipa noastră tehnică la o cerere de ofertă." },
    { type: "h2", id: "greseli", text: "Greșeli frecvente la calculul necesarului" },
    { type: "ul", items: [
      "Folosirea unei densități unice pe toată suprafața, ignorând zonele de colț/margine cu solicitare mai mare",
      "Calcul pe suprafață brută, fără scăderea golurilor — comandă supradimensionată cu 15-25%",
      "Lipsa rezervei pentru pierderi la montaj — riscă oprirea șantierului la epuizarea stocului",
      "Ignorarea diferenței de densitate între EPS și vată minerală la estimarea rapidă",
    ]},
    { type: "p", text: "Un calcul corect al necesarului de materiale nu e doar o formalitate de aprovizionare — influențează direct bugetul proiectului și ritmul de execuție. Pentru proiecte mari de reabilitare, recomandăm validarea calculului împreună cu echipa tehnică a furnizorului, înainte de plasarea comenzii finale." },
  ],
};
