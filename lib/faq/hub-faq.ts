export interface HubFaqItem {
  q: string;
  a: string;
  source: string;
}

/**
 * FAQ suplimentare din hub pages (sisteme termoizolație) și calculator dibluri,
 * neexportate direct din paginile respective — duplicate aici pentru agregarea /faq.
 */
export const HUB_FAQ: HubFaqItem[] = [
  // Sistem termoizolație EPS — /sisteme/termoizolatie-eps
  {
    q: "Câte dibluri se folosesc pe m² la termosistemul EPS?",
    a: "Standard se montează 6 dibluri/m² pe câmpul curent al fațadei. La colțuri, socluri și zonele de colț ale clădirii, unde vântul exercită forțe de smulgere mai mari, densitatea crește la 8–10 dibluri/m², conform proiectului tehnic.",
    source: "/sisteme/termoizolatie-eps",
  },
  {
    q: "Când se montează diblurile pe polistiren?",
    a: "Diblurile se montează după uscarea totală a stratului adeziv de lipire a plăcii EPS pe suport, de regulă la minimum 24–48 ore, în funcție de adezivul folosit și de temperatura exterioară.",
    source: "/sisteme/termoizolatie-eps",
  },
  {
    q: "Ce diblu se folosește pentru polistiren pe beton?",
    a: "Pentru suport de beton se recomandă diblul cu cui din poliamidă Ø5.5mm, cu adâncime de ancorare de minimum 25mm. Pentru zone cu solicitări mecanice ridicate se poate folosi diblul cu cui metalic zincat.",
    source: "/sisteme/termoizolatie-eps",
  },
  {
    q: "Ce lungime de diblu aleg pentru un termosistem EPS de 10cm?",
    a: "Lungimea diblului se calculează adunând grosimea plăcii EPS, grosimea adezivului, eventuale nereguli ale suportului și adâncimea minimă de ancorare în suport (25mm în beton, 40mm în cărămidă plină). Pentru un EPS de 10cm rezultă de regulă un diblu de minimum 10×140mm.",
    source: "/sisteme/termoizolatie-eps",
  },
  {
    q: "De ce se folosește flanșa la montajul diblurilor pe EPS?",
    a: "Flanșa distribuie uniform forța de prindere pe suprafața plăcii de polistiren și previne deformarea sau spargerea locală a materialului termoizolant în jurul capului diblului.",
    source: "/sisteme/termoizolatie-eps",
  },
  {
    q: "Diblul cu cui metalic sau cel cu cui plastic pentru fațadă?",
    a: "Diblul cu cui plastic (poliamidă) reduce puntea termică prin cui și este soluția standard recomandată pentru câmpul curent al fațadei. Diblul cu cui metalic zincat oferă rezistență mecanică mai mare și se recomandă în zone cu solicitări dinamice ridicate.",
    source: "/sisteme/termoizolatie-eps",
  },
  // Sistem termoizolație vată minerală — /sisteme/termoizolatie-vata-minerala
  {
    q: "Cum se prinde vata minerală pe fațadă?",
    a: "Vata minerală se lipește pe suport cu adeziv mineral, apoi se fixează mecanic suplimentar cu dibluri metalice și flanșe cu rozetă extinsă, care distribuie uniform forța de prindere fără să comprime local materialul fibros.",
    source: "/sisteme/termoizolatie-vata-minerala",
  },
  {
    q: "De ce se folosește flanșă cu diametru mai mare la vată minerală?",
    a: "Vata minerală are o densitate și o structură fibroasă diferită față de polistiren, iar o flanșă cu rozetă Ø120–140mm distribuie forța de prindere pe o suprafață mai mare, prevenind deformarea sau ruperea fibrelor din jurul capului diblului.",
    source: "/sisteme/termoizolatie-vata-minerala",
  },
  {
    q: "Ce diblu se recomandă pentru vată minerală?",
    a: "Se recomandă diblul cu cui din oțel zincat, cu rezistență mecanică superioară, mai ales la clădirile înalte sau expuse la vânt puternic. Diblul cu cui plastic poate fi folosit la vată de densitate mai mică, în zone cu solicitări moderate.",
    source: "/sisteme/termoizolatie-vata-minerala",
  },
  {
    q: "Câte fixări pe m² sunt necesare la vată minerală?",
    a: "Standard, 6 fixări/m² pe câmpul curent al fațadei, cu densitate mărită la 8–10 fixări/m² la colțuri, socluri și clădiri peste 8m înălțime, conform proiectului tehnic de termoizolare.",
    source: "/sisteme/termoizolatie-vata-minerala",
  },
  {
    q: "Când se montează diblurile pe vată minerală?",
    a: "Diblul se montează după uscarea totală a stratului adeziv de lipire a plăcii de vată pe suport, de regulă la minimum 24–48 ore, în funcție de tipul adezivului și condițiile meteo.",
    source: "/sisteme/termoizolatie-vata-minerala",
  },
  {
    q: "Se poate folosi aceeași flanșă la vată minerală și la polistiren?",
    a: "Flanșa cu rozetă extinsă Ø120–140mm este compatibilă atât cu vată minerală, cât și cu polistiren, însă pentru polistiren se poate folosi și flanșa standard Ø55mm de pe diblu, în funcție de recomandarea proiectului tehnic.",
    source: "/sisteme/termoizolatie-vata-minerala",
  },
  // Calculator dibluri — /calculator-dibluri
  {
    q: "Cum se calculează numărul de dibluri pe m²?",
    a: "Formula standard: 6 dibluri/m² pe câmp curent (sub 8m înălțime) + 8-10 dibluri/m² în zonele de colț și soclu. Pentru clădiri peste 8m densitatea crește la 10-12 dibluri/m². Se adaugă 5% rezervă pentru șantier.",
    source: "/calculator-dibluri",
  },
  {
    q: "De ce am nevoie de mai multe dibluri la colțuri?",
    a: "La colțurile clădirii, forța de smulgere dată de vânt e semnificativ mai mare decât în câmp curent. Densitatea mai mare compensează și previne desprinderea locală a stratului termoizolant în timp.",
    source: "/calculator-dibluri",
  },
  {
    q: "Trebuie flanșă la fiecare diblu?",
    a: "Pentru vata minerală e obligatorie flanșa distribuție Ø120-140mm. Pentru polistiren EPS, flanșa nu e obligatorie dar recomandată la panouri mai groase de 10cm pentru distribuția uniformă a forței de fixare.",
    source: "/calculator-dibluri",
  },
  {
    q: "Câtă rezervă să comand pentru șantier?",
    a: "Minim 5%, ideal 8-10%. Rezerva acoperă dibluri deteriorate la montaj, ajustări în zone atipice și pierderi de șantier. Comanda mai mare în prima fază evită opriri costisitoare pentru reaprovizionare.",
    source: "/calculator-dibluri",
  },
  {
    q: "Calculul e valid pentru orice tip de fațadă?",
    a: "Formula e valabilă pentru sistemele standard de termoizolație exterioară pe zidărie sau beton. Pentru fațade ventilate, structuri metalice sau soluții speciale (fațade curbe, atipice) densitatea se stabilește prin proiect tehnic dedicat.",
    source: "/calculator-dibluri",
  },
  // Comercial / livrare — generice, nepreluate din alte pagini
  {
    q: "Livrați comenzi en-gros în toată țara?",
    a: "Da, Plast Du IV livrează comenzi en-gros de dibluri, flanșe și accesorii de fixare în toată România, cu termene adaptate volumului comenzii. Pentru șantiere din București și Ilfov sunt disponibile livrări rapide.",
    source: "/contact",
  },
  {
    q: "Emiteți ofertă pentru licitații publice (primării, instituții)?",
    a: "Da, pregătim oferte tehnico-comerciale pentru achiziții publice, cu documentația necesară (fișe tehnice, declarații de conformitate) pentru dosarul de licitație.",
    source: "/furnizor-primarii",
  },
  {
    q: "Care este cantitatea minimă de comandă?",
    a: "Lucrăm atât cu comenzi mici, pentru firme de construcții și echipe de montaj, cât și cu comenzi mari, en-gros, pentru distribuitori și șantiere de reabilitare la scară largă. Contactați echipa de vânzări pentru o ofertă adaptată volumului dumneavoastră.",
    source: "/contact",
  },
];
