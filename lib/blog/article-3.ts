import type { Articol } from "./types";

export const articol3: Articol = {
  slug: "diblu-plastic-vs-metalic-termoizolatie",
  h1: "Diblu plastic vs diblu metalic — Care e cel mai bun pentru termoizolație?",
  metaTitle: "Diblu plastic vs diblu metalic pentru termoizolație — Comparație",
  metaDescription:
    "Comparație tehnică diblu plastic (poliamidă) vs diblu metalic pentru termoizolație: rezistență, cost, punte termică și cazuri de utilizare recomandate.",
  keywords: ["diblu plastic vs metalic", "diblu poliamida vs otel", "diblu termoizolatie recomandare"],
  excerpt:
    "Diblu cu cui din poliamidă sau diblu cu cui metalic? Comparăm rezistență mecanică, cost, punte termică și cazurile în care fiecare tip e recomandarea corectă.",
  date: "2026-08-27",
  categorie: "Ghid produse",
  produsSlugs: ["dibluri-plastic", "dibluri-metalice"],
  hubLinks: [
    { href: "/aplicatii#termoizolatie-polistiren", label: "Aplicații — Termoizolație polistiren" },
  ],
  relatedSlugs: [
    "cate-dibluri-pe-metru-patrat-termosistem",
    "ce-diblu-pentru-vata-minerala",
    "greseli-frecvente-la-montarea-diblurilor-termosistem",
  ],
  faq: [
    {
      q: "Diblul metalic creează punte termică?",
      a: "Diblul metalic are o conductivitate termică mult mai mare decât poliamida, ceea ce introduce o punte termică punctuală la fiecare punct de fixare. Efectul e local și limitat, dar pe suprafețe mari cu mii de puncte de fixare devine relevant pentru performanța energetică generală.",
    },
    {
      q: "Se pot combina cele două tipuri pe aceeași fațadă?",
      a: "Da, este o practică frecventă: diblu plastic în câmp curent, unde solicitarea e moderată, și diblu metalic în zonele de colț, atic sau socluri, unde e nevoie de rezistență mecanică suplimentară.",
    },
  ],
  blocks: [
    { type: "p", text: "Una dintre cele mai frecvente întrebări la achiziția materialelor pentru termoizolație este alegerea între diblul cu cui din plastic (poliamidă) și diblul cu cui metalic (oțel zincat). Ambele variante au corp identic din polipropilenă și rozetă de aceeași dimensiune — diferența esențială stă în materialul cuiului de expandare, iar această diferență influențează rezistența mecanică, comportamentul termic și costul final." },
    { type: "h2", id: "constructie", text: "Diferența de construcție" },
    { type: "p", text: "Ambele tipuri de diblu funcționează după același principiu: un corp din polipropilenă se introduce în gaură, apoi un cui central se bate până la refuz, expandând corpul și blocându-l ferm în suportul de bază. Diferența este materialul acestui cui central:" },
    { type: "ul", items: [
      "Diblu plastic — cui din poliamidă (PA66) Ø5.5mm, material termoizolant",
      "Diblu metalic — cui din oțel zincat Ø5.5mm, material cu rezistență mecanică superioară",
    ]},
    { type: "h2", id: "rezistenta", text: "Rezistență mecanică" },
    { type: "p", text: "Diblul metalic oferă o rezistență la smulgere superioară față de varianta cu cui din plastic, în special pe suporturi cu densitate redusă (BCA, cărămidă cu goluri) sau în zone cu solicitare dinamică ridicată — vânt puternic, clădiri înalte, zone de colț și atic. Diblul plastic acoperă însă majoritatea aplicațiilor standard de termoizolație rezidențială, unde solicitările sunt în limite normale." },
    { type: "h2", id: "punte-termica", text: "Punte termică — diferența invizibilă, dar reală" },
    { type: "p", text: "Poliamida are o conductivitate termică semnificativ mai mică decât oțelul, ceea ce înseamnă că diblul plastic nu creează practic nicio punte termică punctuală prin grosimea izolației. Diblul metalic, în schimb, conduce căldura prin cuiul de oțel, generând un punct rece local la fiecare fixare. Pe o fațadă cu 6-10 dibluri/m², efectul cumulat poate influența ușor performanța termică globală a sistemului, motiv pentru care diblul plastic este preferat implicit acolo unde rezistența mecanică o permite." },
    { type: "h2", id: "cost", text: "Cost" },
    { type: "p", text: "Diblul metalic este, în general, mai scump decât varianta cu cui plastic, din cauza costului materialului (oțel zincat) și a procesului suplimentar de zincare pentru protecție anticorozivă. Pentru proiecte mari, diferența de cost pe fațadă întreagă poate fi semnificativă dacă se folosește exclusiv diblu metalic acolo unde nu e necesar tehnic." },
    { type: "h2", id: "tabel-comparativ", text: "Tabel comparativ rapid" },
    { type: "table",
      headers: ["Criteriu", "Diblu plastic (poliamidă)", "Diblu metalic (oțel zincat)"],
      rows: [
        ["Rezistență la smulgere", "Bună — standard", "Superioară — solicitări ridicate"],
        ["Punte termică", "Practic inexistentă", "Prezentă, punctuală"],
        ["Cost", "Mai redus", "Mai ridicat"],
        ["Recomandare", "Câmp curent, aplicații standard", "Colțuri, atice, suporturi slabe, zone cu vânt puternic"],
      ],
    },
    { type: "h2", id: "cand-fiecare", text: "Când alegeți fiecare variantă" },
    { type: "ul", items: [
      "Alegeți diblu plastic pentru: fațade rezidențiale standard, câmp curent, suporturi solide (beton, cărămidă plină)",
      "Alegeți diblu metalic pentru: zone de colț și atic, clădiri înalte (peste 20m), suporturi poroase sau cu goluri (BCA, cărămidă cu goluri), solicitări dinamice ridicate",
      "Soluție mixtă — combinați ambele tipuri pe aceeași fațadă, în funcție de zona de solicitare, pentru un raport optim cost-performanță",
    ]},
    { type: "p", text: "Alegerea corectă depinde întotdeauna de tipul de suport și de proiectul tehnic al fațadei. Pentru calculul numărului necesar de dibluri pe metru pătrat, consultați articolul dedicat calculului consumului, iar pentru pașii de montaj corect, ghidul complet de montaj al diblului pentru polistiren." },
  ],
};
