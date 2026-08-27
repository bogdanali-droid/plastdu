import type { Articol } from "./types";

export const articol5: Articol = {
  slug: "ce-diblu-pentru-gips-carton",
  h1: "Ce diblu pentru gips-carton — Tipuri, sarcini admise și montaj",
  metaTitle: "Ce diblu pentru gips-carton — Tipuri și sarcini admise",
  metaDescription:
    "Ce dibluri se folosesc pentru gips-carton: autoforant, fluture, ancoră metalică. Sarcini admise în kg și când e nevoie de gaură pilot pentru montaj corect.",
  keywords: ["ce diblu pentru gips carton", "diblu fluture gips carton", "montaj obiecte gips carton"],
  excerpt:
    "Gips-cartonul nu se comportă ca zidăria — necesită un tip specific de diblu în funcție de greutatea obiectului montat. Iată tipurile disponibile și sarcinile lor admise.",
  date: "2026-08-27",
  categorie: "Ghid produse",
  produsSlugs: ["dibluri-plastic", "dibluri-metalice"],
  hubLinks: [
    { href: "/aplicatii#gips-carton", label: "Aplicații — Fixare gips-carton" },
  ],
  relatedSlugs: [
    "cum-se-monteaza-diblul-pentru-polistiren",
    "flansa-osb-vs-flansa-vata-minerala",
    "distantieri-beton-ghid-alegere",
  ],
  faq: [
    {
      q: "Se poate monta un obiect greu direct în placa de gips-carton?",
      a: "Pentru sarcini mici și medii (până la 15-20kg), diblurile specializate pentru gips-carton (fluture, autoforant cu expandare) sunt suficiente. Pentru obiecte grele (rafturi încărcate, cabinete suspendate, corpuri sanitare), recomandarea corectă este identificarea și fixarea în structura metalică sau din lemn din spatele plăcii, nu doar în placă.",
    },
    {
      q: "E nevoie de gaură pilot pentru toate tipurile de dibluri de gips-carton?",
      a: "Nu pentru toate. Diblurile autoforante se înfiletează direct în placă, fără gaură pilot. Diblurile fluture și ancorele cu expandare metalică necesită, de regulă, o gaură pilot de diametru corespunzător pentru introducere corectă.",
    },
  ],
  blocks: [
    { type: "p", text: "Placa de gips-carton are o grosime redusă (9,5-15mm) și o rezistență structurală limitată, complet diferită de zidărie sau beton. Montarea obiectelor direct în placă, fără diblul potrivit, duce frecvent la smulgere sau la deteriorarea găurii. Alegerea corectă a diblului depinde de greutatea obiectului montat și de accesul din spatele plăcii." },
    { type: "h2", id: "tipuri", text: "Tipurile principale de dibluri pentru gips-carton" },
    { type: "h3", text: "Diblu autoforant (self-drilling)" },
    { type: "p", text: "Se înfiletează direct în placă, fără gaură pilot, folosind o șurubelniță manuală sau electrică la turație redusă. Capătul filetat este ascuțit, tăind propria gaură pe măsură ce pătrunde. Este soluția cea mai rapidă pentru montaje ușoare — tablouri, rafturi mici, suporturi de cabluri." },
    { type: "h3", text: "Diblu fluture (toggle / spring toggle)" },
    { type: "p", text: "Are două aripioare metalice sau plastice care se pliază pentru introducere prin gaura pilot, apoi se desfac în spatele plăcii, distribuind sarcina pe o suprafață mai mare din interiorul peretelui. Este recomandat pentru sarcini medii — rafturi, oglinzi, corpuri de iluminat suspendate." },
    { type: "h3", text: "Ancoră metalică cu expandare (molly-type)" },
    { type: "p", text: "Un corp metalic tubular care se expandează în spatele plăcii pe măsură ce șurubul central este strâns, creând o zonă de contact mai mare și mai rezistentă decât diblurile din plastic. Recomandată pentru sarcini medii-mari și pentru montaje repetate (obiect care se demontează și remontează de mai multe ori)." },
    { type: "h2", id: "sarcini", text: "Sarcini admise orientative pe tip de diblu" },
    { type: "table",
      headers: ["Tip diblu", "Sarcină admisă orientativă", "Recomandare de utilizare"],
      rows: [
        ["Autoforant simplu", "Până la 5-8 kg", "Tablouri, suporturi ușoare, cabluri"],
        ["Fluture plastic", "8-15 kg", "Rafturi mici, oglinzi, suporturi TV ușoare"],
        ["Ancoră metalică cu expandare", "15-25 kg", "Rafturi mai mari, corpuri de iluminat, montaje repetate"],
        ["Fixare în structură metalică/lemn", "Peste 25 kg", "Cabinete suspendate, corpuri sanitare, rafturi încărcate"],
      ],
    },
    { type: "note", text: "Valorile din tabel sunt orientative pentru placă de gips-carton standard de 12,5mm. Pentru sarcini mari, verificați întotdeauna fișa tehnică a diblului ales și, unde e posibil, fixați direct în structura de rezistență din spatele plăcii." },
    { type: "h2", id: "gaura-pilot", text: "Când e nevoie de gaură pilot" },
    { type: "ul", items: [
      "Diblu autoforant — NU necesită gaură pilot, se înfiletează direct",
      "Diblu fluture — necesită gaură pilot cu diametru corespunzător dimensiunii aripioarelor pliate",
      "Ancoră metalică cu expandare — necesită gaură pilot precisă, conform fișei tehnice a produsului",
    ]},
    { type: "h2", id: "pasi-montaj", text: "Pași de montaj general" },
    { type: "ol", items: [
      "Identificați poziția montanților metalici sau a grinzilor din spatele plăcii (detector de metal/lemn), dacă e posibil să fixați direct în structură",
      "Dacă fixarea se face doar în placă, alegeți tipul de diblu potrivit greutății obiectului",
      "Executați gaura pilot, dacă tipul de diblu o cere, cu diametrul recomandat de producător",
      "Introduceți diblul și strângeți/fixați conform tipului (înfiletare, pliere aripioare, expandare)",
      "Montați obiectul final abia după verificarea stabilității diblului",
    ]},
    { type: "p", text: "Pentru montaje mixte, unde structura din spatele gips-cartonului include și un strat de OSB sau vată minerală, verificați și articolele dedicate flanșei OSB vs flanșa vată minerală și ghidului de montaj al diblului pentru polistiren, aplicabil parțial și la principiile generale de fixare mecanică." },
  ],
};
