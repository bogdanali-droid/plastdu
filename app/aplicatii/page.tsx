import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Aplicații — Unde se folosesc produsele Plast Du IV",
  description:
    "Ghid tehnic pentru alegerea diblurilor, flanșelor și accesoriilor în funcție de aplicație: " +
    "fațadă exterioară, izolații interioare, structuri metalice, construcții civile, industrial " +
    "și reabilitare edilitară. Informații pentru ingineri, șefi de șantier și firme de construcții.",
  keywords: [
    "aplicatii dibluri constructii",
    "termoizolatie polistiren",
    "fixare vata minerala",
    "placi OSB diblu",
    "gips carton fixare",
    "structuri metalice fixare",
    "reabilitare edilitara materiale",
    "alegere diblu constructii",
  ],
  alternates: { canonical: "https://plastdu.ro/aplicatii" },
  openGraph: {
    title: "Aplicații — Unde se folosesc produsele Plast Du IV",
    description:
      "Ghid tehnic complet pentru alegerea corectă a diblurilor, flanșelor și accesoriilor în funcție de aplicație și suport.",
    url: "https://plastdu.ro/aplicatii",
  },
};

const APLICATII_FAQ = [
  {
    q: "Cum aleg produsul potrivit pentru aplicația mea?",
    a: "Identificați mai întâi materialul izolant sau structural (polistiren, vată minerală, OSB, gips-carton, structură metalică), apoi tipul de suport (beton, cărămidă, BCA, metal). Fiecare secțiune de mai jos recomandă produsele principale pentru combinația respectivă.",
  },
  {
    q: "Ce diferență e între dibluri pentru fațadă și dibluri pentru structuri interioare?",
    a: "Diblurile pentru fațadă (termoizolație) sunt gândite pentru fixarea plăcilor izolante prin adeziv, cu rozetă care distribuie forța pe material moale. Diblurile pentru structuri interioare (gips-carton, profile metalice) au dimensiuni și forțe de extragere diferite, adaptate suportului de beton sau zidărie.",
  },
  {
    q: "Produsele Plast Du IV sunt potrivite și pentru proiecte industriale?",
    a: "Da — pe lângă gama de dibluri și flanșe pentru termoizolație, distribuim șuruburi autoforante, tije filetate, piulițe și șaibe folosite frecvent la structuri metalice și fixări industriale.",
  },
  {
    q: "Lucrați cu firme de construcții și primării pentru proiecte de reabilitare?",
    a: "Da, livrăm materiale pentru reabilitarea termică a blocurilor de locuințe și clădirilor publice, cu documentația tehnică necesară pentru dosarele de licitație publică.",
  },
  {
    q: "Unde găsesc informații despre montaj pas cu pas?",
    a: "Ghidurile din secțiunea Blog detaliază montajul pas cu pas pentru fiecare tip de produs — dibluri, flanșe, colțare, profile de soclu și dilatație.",
  },
];

/* ─── Date aplicatii ─────────────────────────────────────────────────────── */
interface Aplicatie {
  id: string;
  titlu: string;
  subtitlu: string;
  culoareAccent: string;
  culoareBg: string;
  culoareBorder: string;
  culoareDot: string;
  imagine: string;
  descriereTehnica: string[];
  parametriTehnici: { param: string; val: string }[];
  produse: {
    href: string;
    titlu: string;
    descriere: string;
    principal: boolean;
    extern?: boolean;
  }[];
  noteTehnician: string[];
}

const APLICATII: Aplicatie[] = [
  /* ── 1. Termoizolatie Polistiren ──────────────────────────────────────── */
  {
    id: "termoizolatie-polistiren",
    titlu: "Termoizolație Polistiren ",
    subtitlu: "Sisteme de termoizolație exterioară cu polistiren expandat",
    culoareAccent: "text-brand-blue",
    culoareBg: "bg-brand-blue/5",
    culoareBorder: "border-brand-blue/20",
    culoareDot: "bg-brand-blue",
    imagine: "/images/proiecte/blocuri/02.jpg",
    descriereTehnica: [
      "Sistemele (External Thermal Insulation Composite System) sunt soluția standard pentru reabilitarea termică a clădirilor și construcțiile noi cu cerințe ridicate de eficiență energetică. Polistirenul expandat (EPS) este materialul izolant dominant datorită raportului optim performanță / cost / ușurință de montaj.",
      "Numărul de dibluri pe m² variază între 4 și 12 în funcție de: zona climatică (viteza vântului), înălțimea clădirii (presiunea vântului crește cu înălțimea), tipul suportului (beton > cărămidă plină > BCA) și grosimea stratului de izolație.",
      "Diblul este montat după aplicarea adezivului și înainte de aplicarea tencuielii armate. Cuiul se bate sau se înșurubează până când rozeta stă flush cu suprafața plăcii EPS. Variantele ZM sunt obligatorii pe zidărie cu cărămidă cu goluri.",
    ],
    parametriTehnici: [
      { param: "Material izolant", val: "EPS (polistiren expandat), EPS-G (grafitat)" },
      { param: "Densitate minimă EPS", val: "≥ 15 kg/m³ (standard), ≥ 12 kg/m³ (grafitat)" },
      { param: "Grosimi uzuale", val: "50–200mm (reabilitare termică: 100–200mm)" },
      { param: "Adâncime ancoraj recomandat", val: "≥ 45mm (cărămidă/BCA), ≥ 35mm (beton)" },
      { param: "Număr dibluri / m²", val: "4–6 (zone normale) · 6–10 (zone de colț/margine)" },
      { param: "Diametru gaură montaj", val: "Ø10mm" },
    ],
    produse: [
      {
        href: "/produse/dibluri-plastic",
        titlu: "Dibluri Cui Plastic (Poliamidă)",
        descriere: "Soluție standard pentru — cuiul PA elimină punțile termice. Variante 10x70…10x260ZM.",
        principal: true,
      },
      {
        href: "/produse/dibluri-metalice",
        titlu: "Dibluri Cui Metalic Zincat",
        descriere: "Alternativă cu forță de extragere superioară pentru fațade înalte și zone expuse la vânt.",
        principal: false,
      },
    ],
    noteTehnician: [
      "Folosiți diblu cu cui PA ori de câte ori specificațiile de proiect cer punte termică zero.",
      "La clădiri > P+4, calculați numărul de dibluri conform SR EN 1991-1-4 (acțiunea vântului).",
      "Pe BCA, folosiți dibluri mai lungi pentru a asigura adâncimea minimă de 45mm în material solid.",
      "Variantele ZM (Zonă Mare) sunt obligatorii pe cărămidă cu goluri — ancorajul standard nu este eficient.",
    ],
  },

  /* ── 2. Fixare Vata Minerala ──────────────────────────────────────────── */
  {
    id: "vata-minerala",
    titlu: "Fixare Vată Minerală",
    subtitlu: "Montaj plăci și lamele de vată minerală pe fațade",
    culoareAccent: "text-brand-accent",
    culoareBg: "bg-brand-accent/5",
    culoareBorder: "border-brand-accent/20",
    culoareDot: "bg-brand-accent",
    imagine: "/images/produse/flansa-vata/01.jpg",
    descriereTehnica: [
      "Vata minerală (MW — Mineral Wool) oferă avantaje suplimentare față de EPS: rezistență la foc (clasa A1/A2), izolație fonică superioară și permeabilitate la vapori. Este obligatorie în clădirile înalte (peste 10 etaje) și în zonele cu cerințe sporite de comportament la foc.",
      "Specificul fixării cu vată minerală față de polistiren: vata are rezistență la penetrare semnificativ mai redusă față de EPS. Rozeta standard Ø55mm poate intra în izolant dacă forța de strângere este prea mare. Este obligatorie utilizarea flanșei cu rozetă extinsă Ø120–140mm care distribuie forța pe o suprafață mult mai mare.",
      "Cuiul metalic zincat este preferat față de cuiul PA deoarece rigiditatea metalică previne deformarea plăcilor fibroase de vată. Plăcile de vată minerală lamelă (cu fibre perpendiculare pe suprafață) au rezistență la compresiune mai mare, dar tot se recomandă rozeta mare.",
    ],
    parametriTehnici: [
      { param: "Material izolant", val: "Vată minerală de sticlă sau bazalt (MW)" },
      { param: "Densitate minimă recomandată", val: "≥ 80 kg/m³ (tablie) · ≥ 100 kg/m³ (lamelă)" },
      { param: "Grosimi uzuale", val: "80–200mm" },
      { param: "Adâncime ancoraj recomandat", val: "≥ 50mm (cărămidă/BCA), ≥ 40mm (beton)" },
      { param: "Diametru rozetă flanșă obligatoriu", val: "Ø120–140mm (flanșă vată minerală)" },
      { param: "Număr dibluri / m²", val: "5–8 (tablie) · 6–10 (lamelă)" },
    ],
    produse: [
      {
        href: "/produse/dibluri-metalice",
        titlu: "Dibluri Cui Metalic Zincat",
        descriere: "Soluție principală pentru vată minerală — forță de extragere ridicată, cui rigid metalic.",
        principal: true,
      },
      {
        href: "/produse/flansa-vata",
        titlu: "Flanșă Vată Minerală (Ø120–140mm)",
        descriere: "Disc cu rozetă extinsă — obligatoriu pentru distribuție uniformă pe vată minerală.",
        principal: true,
      },
    ],
    noteTehnician: [
      "Folosiți ÎNTOTDEAUNA flanșa cu rozetă mare Ø120–140mm la vată minerală cu densitate < 100 kg/m³.",
      "Nu strângeți excesiv diblul — rozeta trebuie să fie flush cu suprafața vatei, nu să o comprime.",
      "Pe fațade cu cerințe de incombustibilitate (clasa A), vata minerală este singura opțiune ca izolant.",
      "Verificați că stratul de adeziv + vată nu depășește lungimea diblului ales minus adâncimea de ancoraj.",
      "Variantele ZM sunt obligatorii pe cărămidă cu goluri indiferent de tipul izolantului.",
    ],
  },

  /* ── 3. Placi OSB ─────────────────────────────────────────────────────── */
  {
    id: "placi-osb",
    titlu: "Plăci OSB",
    subtitlu: "Fixarea plăcilor OSB pe structuri din lemn, metal sau beton",
    culoareAccent: "text-emerald-700",
    culoareBg: "bg-emerald-50",
    culoareBorder: "border-emerald-200",
    culoareDot: "bg-emerald-600",
    imagine: "/images/produse/flansa-osb/01.jpg",
    descriereTehnica: [
      "Plăcile OSB (Oriented Strand Board) sunt utilizate extensiv în construcțiile cu structură din lemn (timber frame, CLT) pentru realizarea pereților, planșeelor și acoperișurilor. Sunt folosite și ca strat structural în sisteme de izolație pe structuri ușoare.",
      "Fixarea OSB diferă de fixarea pe zidărie prin natura suportului: pe structuri din lemn (grinzi, montanți) se utilizează șuruburi autoforante, nu dibluri cu expansiune. Pe beton sau zidărie, se utilizează dibluri standard + șurub. Flanșa TSF-F55 cu capac snap-on este soluția optimă când capul de fixare rămâne vizibil sau când suprafața trebuie să fie plană.",
      "OSB-ul se clasifică în patru clase (OSB/1 la OSB/4) în funcție de rezistența structurală și rezistența la umiditate. Cel mai utilizat în construcții este OSB/3 (structuri solicitate la umiditate) și OSB/4 (structuri cu cerințe mari la umiditate).",
    ],
    parametriTehnici: [
      { param: "Tipuri OSB uzuale", val: "OSB/3 (umiditate), OSB/4 (structural, umiditate)" },
      { param: "Grosimi uzuale", val: "9mm / 12mm / 15mm / 18mm / 22mm" },
      { param: "Distanță între fixări (margine placă)", val: "≤ 15cm (conform producător)" },
      { param: "Distanță față de marginea plăcii", val: "≥ 1cm (minim 3 × diametru șurub)" },
      { param: "Șurub recomandat", val: "Șurub galvanizat inclus în setul TSF-F55" },
      { param: "Finisaj", val: "Capac snap-on TSF-F55 — suprafață plană, aspect curat" },
    ],
    produse: [
      {
        href: "/produse/flansa-osb",
        titlu: "Flanșă OSB cu Capac TSF-F55",
        descriere: "Set complet: flanșă + capac snap-on + șurub galvanizat. Finisaj superior, cap ascuns.",
        principal: true,
      },
    ],
    noteTehnician: [
      "TSF-F55 este ideal când suprafața plăcii OSB rămâne vizibilă sau va fi acoperită cu un strat subțire.",
      "Capacul snap-on protejează punctul de fixare împotriva pătrunderii apei — important la OSB/3 expus.",
      "Pe structuri din lemn (montanți), folosiți șurubul galvanizat inclus direct în lemn, fără diblu.",
      "Pe beton sau zidărie, combinați cu diblu Ø10mm pentru prindere solidă în suport.",
      "Respectați distanțele minime față de marginea plăcii pentru a preveni delaminarea OSB.",
    ],
  },

  /* ── 4. Gips-Carton ───────────────────────────────────────────────────── */
  {
    id: "gips-carton",
    titlu: "Gips-Carton",
    subtitlu: "Sisteme de pereți, tavane false și căptușeli din gips-carton",
    culoareAccent: "text-slate-700",
    culoareBg: "bg-slate-50",
    culoareBorder: "border-slate-200",
    culoareDot: "bg-slate-600",
    imagine: "/images/produse/dibluri-plastic/03.jpg",
    descriereTehnica: [
      "Sistemele din gips-carton (GC) sunt utilizate pentru pereți despărțitori, tavane false, căptușeli interioare și sisteme de izolație acustică. Fixarea plăcilor de gips-carton pe profile metalice (montanți și rigle) se realizează cu șuruburi autoforante care nu necesită preforare.",
      "Diblurile sunt necesare în cazul fixărilor profilelor metalice pe pereți existenți (beton/zidărie) sau pentru ancorarea suspensiunilor de tavan. Pe suporturi de beton, se utilizează dibluri cu expansiune Ø8–10mm cu forță de extragere ≥ 400N. Pe zidărie, diblurile cu expansiune controlată PP sunt soluția standard.",
      "Distanțele de fixare ale montanților sunt de 40–60cm în funcție de grosimea plăcilor GC și înălțimea peretelui. Sistemele de tavane suspendate necesită un calcul de sarcini separat conform normativelor în vigoare.",
    ],
    parametriTehnici: [
      { param: "Tipuri GC uzuale", val: "Standard (GKB), Hidrofugat (GKF/GKBI), Anti-foc (GKF)" },
      { param: "Grosimi plăci GC", val: "9.5mm / 12.5mm / 15mm / 18mm" },
      { param: "Profile metalice standard", val: "CW 50/75/100mm (montanți), UW (rigle)" },
      { param: "Pas fixare profile pe suport", val: "≤ 100cm (montanți la 40–60cm distanță)" },
      { param: "Diblu fixare profile pe beton/zidărie", val: "Ø8–10mm, L ≥ 50mm" },
      { param: "Forță extragere minimă (beton)", val: "≥ 400N per diblu de fixare profil" },
    ],
    produse: [
      {
        href: "/produse/dibluri-plastic",
        titlu: "Dibluri Cui Plastic (Poliamidă)",
        descriere: "Pentru ancorarea profilelor metalice pe beton sau zidărie — variantele scurte 10x70, 10x90.",
        principal: false,
      },
      {
        href: "/produse/dibluri-metalice",
        titlu: "Dibluri Cui Metalic Zincat",
        descriere: "Forță de extragere mai mare pentru profile în zone cu solicitări ridicate sau tavane.",
        principal: false,
      },
    ],
    noteTehnician: [
      "Ancorarea profilelor metalice în beton se face cu dibluri Ø8–10mm cu putere de extragere ≥ 400N.",
      "Pe pereți de cărămidă, folosiți dibluri cu expansiune controlată PP — nu dibluri pentru beton.",
      "Distanța maximă între ancore pentru profile UW de perete este 100cm.",
      "În camere umede, folosiți dibluri și șuruburi inox sau zincat gros pentru evitarea coroziunii.",
      "Sistemele de tavane suspendate necesită calcul de sarcini separat — consultați proiectantul.",
    ],
  },

  /* ── 5. Structuri Metalice ────────────────────────────────────────────── */
  {
    id: "structuri-metalice",
    titlu: "Structuri Metalice",
    subtitlu: "Fixare, asamblare și protecție la coroziune pentru structuri din oțel",
    culoareAccent: "text-amber-700",
    culoareBg: "bg-amber-50",
    culoareBorder: "border-amber-200",
    culoareDot: "bg-amber-600",
    imagine: "/images/produse/saibe/03.jpg",
    descriereTehnica: [
      "Structurile metalice — hale industriale, poduri rulante, platforme, cadre de susținere — necesită elemente de fixare cu clase de rezistență certificate și protecție anticorozivă adecvată mediului de exploatare. Șuruburile autoforante, tijele filetate, piulițele hexagonale și șaibele sunt elemente uzuale în asamblarea și mentenanța acestor structuri.",
      "Alegerea corectă a clasei de rezistență (6, 8 sau 10 pentru piulițe și șuruburi) depinde de solicitarea calculată în proiectul de structură. Șaiba corect dimensionată previne amprentarea materialului de bază și distribuie forța de strângere pe suprafața de contact, reducând riscul de slăbire a îmbinării la vibrații.",
      "Protecția anticorozivă (zincare) este obligatorie pentru elementele expuse la exterior sau în medii cu umiditate ridicată. Tijele filetate se folosesc frecvent pentru ancorarea suporților suspendați și a echipamentelor tehnice pe structura metalică existentă.",
    ],
    parametriTehnici: [
      { param: "Clase de rezistență piulițe/șuruburi", val: "6, 8, 10 (conform proiect structură)" },
      { param: "Protecție anticorozivă", val: "Zincare electrolitică / termică, în funcție de expunere" },
      { param: "Tije filetate — diametre uzuale", val: "M8–M20, lungimi la cerere" },
      { param: "Șaibe recomandate", val: "DIN 125 (standard), DIN 9021 (distribuție forță mare)" },
      { param: "Șuruburi autoforante — aplicație", val: "Fixare tablă cutată, panouri sandwich pe structură" },
    ],
    produse: [
      {
        href: "/produse/suruburi-autoforante",
        titlu: "Șuruburi autoforante",
        descriere: "Fixare rapidă fără preforare, pentru tablă și panouri pe structuri metalice.",
        principal: true,
      },
      {
        href: "/produse/tije-filetate",
        titlu: "Tije filetate",
        descriere: "Ancorare suporți suspendați și echipamente tehnice pe structura existentă.",
        principal: false,
      },
      {
        href: "/produse/piulite-hexagonale",
        titlu: "Piulițe hexagonale",
        descriere: "Clase de rezistență 6, 8 și 10, oțel zincat, pentru asamblări structurale.",
        principal: false,
      },
      {
        href: "/produse/saibe",
        titlu: "Șaibe",
        descriere: "Plate și zimțate, oțel zincat, distribuție corectă a forței de strângere.",
        principal: false,
      },
    ],
    noteTehnician: [
      "Verificați clasa de rezistență cerută în proiectul de structură înainte de a comanda șuruburi/piulițe.",
      "Folosiți șaibă DIN 9021 la fixări pe table subțiri sau materiale cu risc de deformare locală.",
      "Elementele de fixare expuse la exterior necesită protecție anticorozivă corespunzătoare clasei de mediu.",
      "La structuri cu vibrații (poduri rulante, utilaje), combinați piulița cu șaibă zimțată sau soluție de blocare dedicată.",
    ],
  },

  /* ── 6. Reabilitare Edilitară / Construcții Civile ────────────────────── */
  {
    id: "reabilitare-edilitara",
    titlu: "Reabilitare Edilitară",
    subtitlu: "Construcții civile, blocuri de locuințe și clădiri publice",
    culoareAccent: "text-brand-blue",
    culoareBg: "bg-brand-blue/5",
    culoareBorder: "border-brand-blue/20",
    culoareDot: "bg-brand-blue",
    imagine: "/images/produse/coltar-pvc/01.jpg",
    descriereTehnica: [
      "Proiectele de reabilitare termică a blocurilor de locuințe și clădirilor publice (primării, școli, spitale) combină termoizolația fațadei cu lucrări de finisaj — profile de colț, distanțieri pentru elementele din beton armat reparate și accesorii de protecție a suprafețelor expuse la trafic pietonal.",
      "Pe șantierele de reabilitare edilitară, volumul de materiale necesare e ridicat și termenele sunt strânse, motiv pentru care planificarea cantităților (dibluri, colțare, distanțieri) direct din proiectul tehnic evită opririle de șantier pentru reaprovizionare.",
      "Colțarul PVC cu plasă protejează muchiile fațadei nou-termoizolate de fisurare, iar distanțierii pentru armătură sunt esențiali la reparațiile locale de beton (balcoane, cornișe, elemente structurale degradate) frecvente pe blocurile vechi.",
    ],
    parametriTehnici: [
      { param: "Aplicații tipice", val: "Blocuri de locuințe, școli, spitale, sedii de primărie" },
      { param: "Colțar protecție fațadă", val: "PVC cu plasă din fibră de sticlă" },
      { param: "Distanțieri reparații beton", val: "Conform acoperirii cerute în proiect (mm)" },
      { param: "Documentație necesară", val: "Fișe tehnice, declarații de conformitate pentru dosarul de licitație" },
    ],
    produse: [
      {
        href: "/produse/dibluri-plastic",
        titlu: "Dibluri Cui Plastic (Poliamidă)",
        descriere: "Soluția de volum pentru termoizolația fațadelor pe blocuri și clădiri publice.",
        principal: true,
      },
      {
        href: "/produse/coltar-pvc",
        titlu: "Colțar PVC cu plasă",
        descriere: "Protecție colțuri fațadă nou-termoizolată, montaj rapid în masa de șpaclu.",
        principal: true,
      },
      {
        href: "/produse/distantieri-gresie",
        titlu: "Distanțieri",
        descriere: "Pentru rosturi și reparații locale de beton pe elementele existente.",
        principal: false,
      },
      {
        href: "/produse/profil-colt-exterior",
        titlu: "Profil de colț exterior",
        descriere: "Finisaje exterioare și interioare pe muchiile clădirii reabilitate.",
        principal: false,
      },
    ],
    noteTehnician: [
      "Pentru licitații publice, pregătiți din timp documentația tehnică — fișe și declarații de conformitate.",
      "Calculați necesarul de materiale direct din proiectul tehnic pentru a evita opriri de șantier.",
      "Pe clădiri înalte sau expuse la vânt, verificați densitatea de dibluri conform zonei de colț/câmp curent.",
      "Colțarul de protecție se montează imediat după stratul de plasă armată, înainte de finisajul decorativ.",
    ],
  },
];

/* ─── Sub-component: Notă tehnică ────────────────────────────────────────── */
function NotaTehnica({ note }: { note: string[] }) {
  return (
    <div className="bg-brand-blue/5 rounded-xl p-5 border border-brand-blue/15 mt-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue mb-3 flex items-center gap-2">
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        Note tehnice pentru șefi de șantier și ingineri
      </p>
      <ul className="space-y-2">
        {note.map((nota, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/50 flex-shrink-0 mt-2" />
            {nota}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Acasă", item: "https://plastdu.ro/" },
    { "@type": "ListItem", position: 2, name: "Aplicații", item: "https://plastdu.ro/aplicatii" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: APLICATII_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AplicatiiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main>
        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section className="bg-brand-blue text-white section-padding">
          <div className="container-site">
            <p className="section-label !text-brand-accent/80 mb-3">Ghid tehnic</p>
            <h1 className="text-display-lg text-white mb-4">Aplicații — Unde se folosesc produsele Plast Du IV</h1>
            <p className="text-lg text-blue-100 max-w-2xl mb-8">
              Ghid tehnic pentru alegerea corectă a diblurilor și flanșelor în funcție de
              tipul aplicației, materialul izolant și suportul structural.
              Informații destinate inginerilor constructori și șefilor de șantier.
            </p>
            {/* Navigare rapidă */}
            <div className="flex flex-wrap gap-2">
              {APLICATII.map((ap) => (
                <a
                  key={ap.id}
                  href={`#${ap.id}`}
                  className="text-sm font-medium bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors border border-white/20"
                >
                  {ap.titlu}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Intro selectie ──────────────────────────────────────────────── */}
        <section className="bg-neutral-surface border-b border-neutral-border py-10">
          <div className="container-site">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
              {[
                {
                  titlu: "Identificați aplicația",
                  subtitlu: "Polistiren, vată minerală, OSB sau gips-carton?",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  titlu: "Verificați suportul",
                  subtitlu: "Beton, cărămidă plină, BCA sau cărămidă cu goluri?",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6z" />
                    </svg>
                  ),
                },
                {
                  titlu: "Alegeți produsul",
                  subtitlu: "Fiecare secțiune recomandă produsele potrivite.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  ),
                  accent: true,
                },
              ].map((item) => (
                <div key={item.titlu} className="flex gap-3 items-start">
                  <div className={`w-10 h-10 rounded-xl ${item.accent ? "bg-brand-accent/10 text-brand-accent" : "bg-brand-blue/10 text-brand-blue"} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-blue text-sm mb-1">{item.titlu}</p>
                    <p className="text-xs text-slate-500">{item.subtitlu}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sectiuni aplicatii ───────────────────────────────────────────── */}
        {APLICATII.map((ap, idx) => (
          <section
            key={ap.id}
            id={ap.id}
            className={`section-padding ${idx % 2 === 0 ? "bg-white" : "bg-neutral-surface"}`}
          >
            <div className="container-site">
              <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">

                {/* ── Coloana stânga: descriere + parametri ── */}
                <div className="lg:col-span-3">
                  {/* Header sectiune */}
                  <div className="mb-6">
                    <p className={`section-label ${ap.culoareAccent} !text-current mb-1`}>
                      Aplicație {idx + 1} / {APLICATII.length}
                    </p>
                    <h2 className="mb-1">{ap.titlu}</h2>
                    <p className="text-slate-500 text-base">{ap.subtitlu}</p>
                  </div>

                  {/* Descriere tehnica */}
                  <div className="space-y-4 mb-8">
                    {ap.descriereTehnica.map((paragraf, i) => (
                      <p key={i} className="text-slate-600 leading-relaxed text-sm">
                        {paragraf}
                      </p>
                    ))}
                  </div>

                  {/* Imagine aplicatie */}
                  <div className="w-full h-56 rounded-2xl overflow-hidden relative mb-8 bg-slate-100 img-watermark">
                    <Image
                      src={ap.imagine}
                      alt={ap.titlu}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>

                  {/* Parametri tehnici */}
                  <div>
                    <h3 className="text-base mb-4">Parametri tehnici de referință</h3>
                    <div className="bg-white rounded-2xl border border-neutral-border shadow-card overflow-hidden">
                      <table className="w-full text-sm">
                        <tbody className="divide-y divide-neutral-border">
                          {ap.parametriTehnici.map(({ param, val }, i) => (
                            <tr key={param} className={i % 2 === 0 ? "bg-white" : "bg-neutral-surface/50"}>
                              <td className="px-4 py-3.5 font-medium text-slate-700 w-5/12 text-sm">{param}</td>
                              <td className="px-4 py-3.5 text-slate-600 text-sm">{val}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Note tehnice */}
                  <NotaTehnica note={ap.noteTehnician} />
                </div>

                {/* ── Coloana dreapta: produse recomandate ── */}
                <div className="lg:col-span-2">
                  <div className="lg:sticky lg:top-24">
                    <h3 className="text-base mb-4 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${ap.culoareDot} inline-block`} />
                      Produse recomandate
                    </h3>

                    <div className="space-y-4 mb-6">
                      {ap.produse.map((prod) => (
                        <Link
                          key={prod.titlu}
                          href={prod.href}
                          className={`card flex flex-col group hover:border-brand-blue/30 ${
                            prod.principal ? "border-brand-accent/30" : ""
                          }`}
                        >
                          {prod.principal && (
                            <span className="text-xs font-semibold bg-brand-accent/10 text-brand-accent px-2.5 py-1 rounded-full self-start mb-3">
                              Produs principal
                            </span>
                          )}
                          <h4 className="text-sm font-semibold text-brand-blue mb-1.5 group-hover:text-brand-blue/70 transition-colors">
                            {prod.titlu}
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed flex-1">
                            {prod.descriere}
                          </p>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-accent mt-3">
                            {prod.extern ? "Solicitați informații" : "Vezi produs"}
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* CTA oferta */}
                    <div className={`p-5 rounded-2xl ${ap.culoareBg} border ${ap.culoareBorder}`}>
                      <p className={`text-sm font-semibold ${ap.culoareAccent} mb-2`}>
                        Aveți nevoie de o ofertă?
                      </p>
                      <p className="text-xs text-slate-500 mb-4">
                        Trimiteți-ne specificațiile proiectului și vă pregătim o ofertă B2B personalizată.
                      </p>
                      <Link
                        href={`/contact?aplicatie=${ap.id}`}
                        className="inline-flex items-center gap-2 bg-brand-blue text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-brand-blue/90 transition-colors"
                      >
                        Solicitați ofertă
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        ))}

        {/* ── Tabel de selectie rapida ─────────────────────────────────────── */}
        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site">
            <p className="section-label !text-brand-accent/80 mb-3">Sinteză</p>
            <h2 className="text-white mb-8">Ghid rapid de selecție produs</h2>

            <div className="bg-white/10 rounded-2xl border border-white/20 overflow-x-auto mb-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left px-5 py-4 font-semibold text-white">Aplicație</th>
                    <th className="text-left px-5 py-4 font-semibold text-white">Material izolant</th>
                    <th className="text-left px-5 py-4 font-semibold text-white">Suport</th>
                    <th className="text-left px-5 py-4 font-semibold text-white">Produs recomandat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {[
                    ["Termoizolație exterioară standard", "EPS / EPS-G", "Beton, cărămidă, BCA", "Dibluri Cui Plastic (PA)"],
                    ["Termoizolație exterioară — solicitări mari", "EPS / EPS-G", "Beton, clădiri înalte", "Dibluri Cui Metalic Zincat"],
                    ["Termoizolație exterioară — cărămidă cu goluri", "EPS / Vată", "Cărămidă cu goluri", "Dibluri ZM (Zonă Mare)"],
                    ["Vată minerală fațadă", "MW lamelă / tablie", "Orice suport", "Diblu metalic + Flanșă Ø120–140mm"],
                    ["OSB pe structură lemn", "—", "Grinzi / montanți lemn", "Flanșă OSB TSF-F55 + șurub galvanizat"],
                    ["Gips-carton (profile)", "—", "Beton, zidărie", "Dibluri Ø10mm (plastic sau metalic)"],
                    ["Structuri metalice", "—", "Oțel", "Șuruburi autoforante, tije filetate, piulițe, șaibe"],
                    ["Reabilitare edilitară", "EPS / Vată", "Blocuri, clădiri publice", "Dibluri + colțar PVC + distanțieri"],
                  ].map(([aplicatie, material, suport, produs], i) => (
                    <tr key={aplicatie} className={i % 2 === 0 ? "bg-white/5" : ""}>
                      <td className="px-5 py-3.5 font-medium text-white">{aplicatie}</td>
                      <td className="px-5 py-3.5 text-blue-200">{material}</td>
                      <td className="px-5 py-3.5 text-blue-200">{suport}</td>
                      <td className="px-5 py-3.5 text-brand-accent font-medium">{produs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/produse"
                className="inline-flex items-center gap-2 bg-white text-brand-blue font-semibold px-6 py-3.5 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Vezi toate produsele
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
              >
                Consultanță tehnică gratuită
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="section-padding bg-neutral-surface">
          <div className="container-site max-w-3xl">
            <p className="section-label">Întrebări frecvente</p>
            <h2 className="mb-8">Ce mai vor să știe cititorii</h2>
            <div className="space-y-4">
              {APLICATII_FAQ.map((f) => (
                <div key={f.q} className="bg-white rounded-2xl border border-neutral-border p-5">
                  <h3 className="text-base font-semibold text-slate-800 mb-2">{f.q}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Resurse conexe ───────────────────────────────────────────────── */}
        <section className="section-padding bg-white">
          <div className="container-site">
            <p className="section-label">Continuă documentarea</p>
            <h2 className="mb-8">Resurse conexe</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { href: "/sisteme/termoizolatie-eps", titlu: "Sistem termoizolație EPS", desc: "Hub tehnic dedicat" },
                { href: "/sisteme/termoizolatie-vata-minerala", titlu: "Sistem termoizolație vată minerală", desc: "Hub tehnic dedicat" },
                { href: "/aplicatii/reabilitare-blocuri", titlu: "Reabilitare blocuri", desc: "Landing dedicat" },
                { href: "/calculator-dibluri", titlu: "Calculator dibluri", desc: "Câte buc/m² ai nevoie" },
                { href: "/blog", titlu: "Blog — ghiduri tehnice", desc: "22 articole de specialitate" },
                { href: "/faq", titlu: "FAQ complet", desc: "Toate întrebările într-un loc" },
                { href: "/materiale-fatada", titlu: "Materiale fațadă", desc: "Distanțieri, ancore, profile" },
                { href: "/proiecte", titlu: "Proiecte realizate", desc: "Studii de caz din șantier" },
              ].map((r) => (
                <Link key={r.href} href={r.href} className="card group !p-5">
                  <h3 className="text-sm font-semibold text-brand-blue mb-1 group-hover:text-brand-accent transition-colors">
                    {r.titlu}
                  </h3>
                  <p className="text-xs text-slate-500">{r.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
