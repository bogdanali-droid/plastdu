import type { Articol } from "./types";

export const articol20: Articol = {
  slug: "dilatia-termosistem-cand-e-necesara",
  h1: "Când e necesar profilul de dilatație la termosistem",
  metaTitle: "Dilatație termosistem — când e obligatorie, distanțe, montaj",
  metaDescription:
    "Când trebuie prevăzut profil de dilatație la un sistem de termoizolație, care sunt distanțele maxime fără dilatație și cum se montează corect.",
  keywords: ["dilatatie termosistem", "profil dilatatie fatada", "rost dilatatie termoizolatie"],
  excerpt:
    "Fațadele mari, fără rost de dilatație, fisurează în timp din cauza mișcărilor termice. Profilul de dilatație e soluția — dacă știi unde și cum îl montezi.",
  date: "2026-08-28",
  categorie: "Ghid tehnic",
  produsSlugs: ["profil-dilatatie"],
  hubLinks: [
    { href: "/sisteme/termoizolatie-eps", label: "Termoizolație EPS" },
    { href: "/materiale-fatada", label: "Materiale fațadă" },
  ],
  relatedSlugs: [
    "cum-montezi-profil-de-soclu",
    "greseli-frecvente-la-montarea-diblurilor-termosistem",
    "cate-dibluri-pe-metru-patrat-termosistem",
  ],
  faq: [
    {
      q: "La ce distanță maximă e nevoie de rost de dilatație pe o fațadă?",
      a: "Nu există o regulă universală valabilă pentru orice clădire — distanța depinde de orientarea fațadei (expunere la soare), culoarea finisajului (culorile închise se dilată mai mult), tipul de suport și recomandările producătorului sistemului termoizolant folosit. Proiectul tehnic stabilește punctele exacte, dar rostul de dilatație existent în structura clădirii se preia obligatoriu și în stratul termoizolant.",
    },
    {
      q: "Rostul de dilatație al structurii trebuie continuat obligatoriu în termosistem?",
      a: "Da. Dacă structura clădirii are un rost de dilatație (de regulă la clădiri lungi sau compuse din corpuri distincte), acest rost trebuie continuat identic prin toate straturile termosistemului — izolație, adeziv, plasă, finisaj — altfel mișcarea structurii fisurează stratul de finisaj exact în dreptul rostului ascuns.",
    },
    {
      q: "Culoarea finisajului influențează necesarul de dilatație?",
      a: "Da, semnificativ. Finisajele în culori închise absorb mai multă căldură solară și ating temperaturi de suprafață mai mari decât cele deschise, ceea ce mărește amplitudinea mișcărilor termice și, implicit, necesarul de rosturi de dilatație sau restricții privind suprafața maximă de fațadă cu aceeași culoare fără rost.",
    },
  ],
  blocks: [
    { type: "p", text: "Materialele dintr-o fațadă termoizolată — suport din beton sau zidărie, strat de polistiren sau vată minerală, adeziv, plasă armată, finisaj decorativ — se dilată și se contractă diferit la variații de temperatură. Pe suprafețe mari sau la clădiri cu geometrie complexă, aceste mișcări acumulate pot fisura finisajul dacă nu există un punct de eliberare a tensiunii: profilul de dilatație." },
    { type: "h2", id: "cand-e-necesar", text: "Când e necesar profilul de dilatație" },
    { type: "p", text: "Profilul de dilatație e obligatoriu în cel puțin trei situații: în dreptul rosturilor de dilatație existente în structura clădirii (transmise obligatoriu prin toate straturile termosistemului), la joncțiunea între corpuri de clădire construite în perioade diferite sau cu fundații independente, și pe suprafețe mari de fațadă continuă, unde recomandarea tehnică a sistemului termoizolant folosit limitează dimensiunea maximă fără rost." },
    { type: "note", text: "Rostul de dilatație al structurii de rezistență nu poate fi \"acoperit\" cu un strat continuu de termoizolație — mișcarea structurii de sub finisaj va găsi punctul cel mai slab și va fisura exact acolo, chiar dacă rostul nu e vizibil dinspre exterior înainte de aplicarea sistemului." },
    { type: "h2", id: "factori", text: "Factori care influențează necesarul de dilatație" },
    { type: "ul", items: [
      "Orientarea fațadei — sudul și vestul primesc expunere solară maximă, cu variații termice mai mari",
      "Culoarea finisajului — culorile închise ating temperaturi de suprafață semnificativ mai mari",
      "Tipul de suport — structurile metalice se dilată diferit față de beton sau zidărie",
      "Lungimea continuă a fațadei fără întrerupere — cu cât suprafața e mai mare, cu atât mișcarea acumulată e mai importantă",
      "Recomandările tehnice ale producătorului sistemului termoizolant, care stabilesc suprafața maximă fără rost",
    ]},
    { type: "h2", id: "montaj", text: "Cum se montează profilul de dilatație" },
    { type: "ol", items: [
      "Se identifică poziția rostului conform proiectului tehnic sau rostului structural existent",
      "Se montează profilul de dilatație astfel încât să acopere continuu rostul pe toată înălțimea/lungimea fațadei",
      "Termoizolația se întrerupe de o parte și de alta a profilului, fără punte termică rigidă între cele două secțiuni",
      "Adezivul și plasa armată se aplică respectând rostul profilului, fără a-l acoperi sau bloca mișcarea",
      "Finisajul decorativ se aplică ultim, cu rostul rămânând vizibil și funcțional ca element de etanșare elastică",
    ]},
    { type: "h2", id: "tipuri", text: "Tipuri de profile de dilatație" },
    { type: "p", text: "Profilele de dilatație pentru fațade termoizolate sunt fabricate de regulă din PVC sau aluminiu, cu o secțiune centrală elastică sau flexibilă care absoarbe mișcarea fără a transmite tensiune stratului de finisaj. Grosimea și lățimea profilului se aleg în funcție de grosimea totală a sistemului termoizolant (izolație + adeziv + finisaj) și de amplitudinea de mișcare estimată la rostul respectiv." },
    { type: "p", text: "Omisiunea profilului de dilatație e una dintre cauzele cele mai frecvente de fisuri repetitive pe fațade reabilitate — fisuri care reapar constant în același loc, indiferent de câte ori se repară local finisajul, pentru că problema nu e la suprafață, ci în lipsa unui punct de eliberare a tensiunii. Plast Du IV distribuie profile de dilatație compatibile cu sistemele de termoizolație uzuale, disponibile pentru comenzi de șantier." },
  ],
};
