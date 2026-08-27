import type { Articol } from "./types";

export const articol2: Articol = {
  slug: "cate-dibluri-pe-metru-patrat-termosistem",
  h1: "Câte dibluri se folosesc pe m² la termosistem — Calculator și tabel normativ",
  metaTitle: "Câte dibluri pe m² la termosistem — Tabel și formulă de calcul",
  metaDescription:
    "Câte dibluri sunt necesare pe metru pătrat la termosistem, în funcție de înălțimea clădirii și zona de expunere la vânt. Formulă de calcul și tabel normativ.",
  keywords: ["cate dibluri pe metru patrat termosistem", "consum dibluri termoizolatie", "calcul dibluri fatada"],
  excerpt:
    "Numărul de dibluri pe m² nu e fix — variază cu înălțimea clădirii, zona de expunere și tipul de suport. Iată formula de calcul și un tabel normativ orientativ.",
  date: "2026-08-27",
  categorie: "Calcul & normative",
  produsSlugs: ["dibluri-plastic", "dibluri-metalice"],
  hubLinks: [
    { href: "/sisteme/termoizolatie-eps", label: "Sistem termoizolație EPS" },
    { href: "/produse/dibluri", label: "Toate diblurile" },
  ],
  relatedSlugs: [
    "cum-se-monteaza-diblul-pentru-polistiren",
    "greseli-frecvente-la-montarea-diblurilor-termosistem",
    "diblu-plastic-vs-metalic-termoizolatie",
  ],
  faq: [
    {
      q: "Se pot folosi mai puține dibluri pentru a reduce costul?",
      a: "Nu este recomandat. Reducerea numărului de dibluri sub minimul normativ crește riscul de desprindere a plăcilor la vânt puternic, mai ales în zonele de colț și atic, unde solicitarea e cea mai mare.",
    },
    {
      q: "Consumul de dibluri diferă între beton și cărămidă?",
      a: "Numărul de dibluri pe m² rămâne similar, dar lungimea diblului și adâncimea de ancorare diferă — cărămida și BCA necesită, de regulă, dibluri mai lungi pentru a compensa rezistența mai mică a materialului.",
    },
  ],
  blocks: [
    { type: "p", text: "Consumul de dibluri pe metru pătrat de termosistem nu este o cifră fixă, deși în practică se vehiculează adesea o valoare generică de \"6 bucăți pe m²\". În realitate, numărul corect depinde de trei factori principali: înălțimea clădirii, zona de expunere pe fațadă (câmp curent, colț, atic) și grosimea/densitatea plăcii de polistiren. În acest articol explicăm formula de calcul și oferim un tabel orientativ pe categorii de înălțime." },
    { type: "h2", id: "normativ", text: "Ce spune normativul despre consumul de dibluri" },
    { type: "p", text: "Proiectanții de sisteme de termoizolație stabilesc numărul de dibluri pe m² în funcție de presiunea vântului calculată pentru zona geografică și înălțimea clădirii, conform reglementărilor tehnice de proiectare a fațadelor termoizolate. Practic, cu cât clădirea e mai înaltă și mai expusă, cu atât presiunea vântului pe suprafață crește, iar numărul de puncte de ancorare trebuie mărit proporțional." },
    { type: "h2", id: "formula", text: "Formula de calcul orientativă" },
    { type: "p", text: "O metodă simplă de estimare pentru oferte și comenzi de materiale este:" },
    { type: "note", text: "Necesar dibluri = Suprafață fațadă (m²) × Consum pe m² (buc/m²) + 10% rezervă pentru pierderi și zone de colț" },
    { type: "p", text: "Consumul pe m² (al doilea termen din formulă) se stabilește pe categorii de înălțime a clădirii, prezentate în tabelul de mai jos. Rezerva de 10% acoperă pierderile normale de șantier și necesarul suplimentar din zonele de margine, unde densitatea de fixare crește." },
    { type: "h2", id: "tabel", text: "Tabel orientativ: consum de dibluri pe categorii de înălțime" },
    { type: "table",
      headers: ["Înălțime clădire", "Zonă câmp curent", "Zonă colț / atic", "Recomandare"],
      rows: [
        ["0–8m (P, P+1)", "4–6 buc/m²", "8–10 buc/m²", "Dibluri standard 10x120…10x160"],
        ["8–20m (P+2…P+6)", "6–8 buc/m²", "10–12 buc/m²", "Dibluri standard sau ZM în colțuri"],
        [">20m (peste P+6)", "8–10 buc/m²", "12–14 buc/m²", "Dibluri Zonă Mare (ZM), preferabil metalice"],
      ],
    },
    { type: "p", text: "Valorile de mai sus sunt orientative, pentru estimare rapidă de comandă — proiectul tehnic al fiecărei fațade stabilește necesarul exact în funcție de calculul de vânt real al amplasamentului." },
    { type: "h2", id: "consum-tip", text: "Consum diferit pe tip de diblu" },
    { type: "ul", items: [
      "Dibluri standard (10x70…10x200) — folosite predominant în câmp curent, pe suprafețe cu expunere moderată",
      "Dibluri Zonă Mare — ZM (10x180ZM…10x260ZM) — recomandate pentru colțuri, atice, socluri și clădiri înalte, unde solicitarea la smulgere e mai mare",
      "Dibluri metalice — recomandate pentru zone cu solicitare dinamică ridicată sau când suportul are rezistență mecanică redusă",
    ]},
    { type: "h2", id: "exemplu", text: "Exemplu de calcul practic" },
    { type: "p", text: "Pentru o fațadă de bloc cu P+4 (aproximativ 15m înălțime) și o suprafață totală de 800m², din care aproximativ 15% reprezintă zone de colț și atic (120m²) și 85% câmp curent (680m²):" },
    { type: "ul", items: [
      "Câmp curent: 680m² × 7 buc/m² ≈ 4.760 buc",
      "Zonă colț/atic: 120m² × 11 buc/m² ≈ 1.320 buc",
      "Total brut: 6.080 buc + 10% rezervă ≈ 6.690 buc de dibluri",
    ]},
    { type: "p", text: "Această estimare vă permite să comandați cantitatea corectă din prima, evitând atât lipsa de material pe șantier, cât și stocul excedentar. Pentru alegerea tipului potrivit de diblu în funcție de material de bază, consultați și comparația diblu plastic vs metalic." },
  ],
};
