import type { Articol } from "./types";

export const articol9: Articol = {
  slug: "ancore-chimice-vs-mecanice",
  h1: "Ancore chimice vs mecanice — care e alegerea corectă pentru șantierul tău",
  metaTitle: "Ancore chimice vs mecanice — diferențe, rezistență, cost",
  metaDescription:
    "Comparație tehnică ancore chimice vs mecanice: cum funcționează, ce rezistență au, când alegi fiecare tip și cât costă montajul pe șantier.",
  keywords: ["ancore chimice vs mecanice", "ancora chimica", "ancora mecanica beton"],
  excerpt:
    "Ancorele chimice și cele mecanice rezolvă aceeași problemă — fixare sigură în beton — dar prin principii complet diferite. Iată când alegi fiecare tip.",
  date: "2026-08-28",
  categorie: "Ghid produs",
  produsSlugs: ["ancore-conexpand", "dibluri-metalice"],
  hubLinks: [
    { href: "/produse/dibluri", label: "Toate diblurile și ancorele" },
    { href: "/sisteme/termoizolatie-vata-minerala", label: "Sistem termoizolație vată minerală" },
  ],
  relatedSlugs: [
    "diblu-plastic-vs-metalic-termoizolatie",
    "diferenta-diblu-8mm-vs-10mm",
    "distantieri-beton-ghid-alegere",
  ],
  faq: [
    {
      q: "Ancora chimică e mai scumpă decât cea mecanică?",
      a: "Da, per bucată — cartușul de rășină plus tija filetată costă de regulă 3-6 ori mai mult decât o ancoră mecanică echivalentă ca diametru. Diferența se justifică doar la sarcini mari sau suport fisurat, unde ancora mecanică nu oferă suficientă siguranță.",
    },
    {
      q: "Cât timp durează întărirea ancorei chimice?",
      a: "Depinde de rășină și temperatură: între 20 de minute (rășini rapide, +20°C) și câteva ore la temperaturi sub 5°C. Fișa tehnică a produsului indică timpul exact — element montat prea devreme sub sarcină nu atinge capacitatea nominală.",
    },
    {
      q: "Se pot folosi ancore mecanice în beton fisurat?",
      a: "Majoritatea ancorelor mecanice standard nu sunt agrementate pentru beton fisurat (fisuri >0,3mm). Pentru astfel de situații se folosesc fie ancore mecanice speciale cu agrement pentru fisură, fie ancore chimice cu certificare corespunzătoare.",
    },
  ],
  blocks: [
    { type: "p", text: "Când proiectul cere fixare structurală în beton — balustrade, console, utilaje, elemente de fațadă grele — alegerea între ancoră chimică și ancoră mecanică nu e o chestiune de preferință, ci de calcul. Cele două tehnologii ancorează diferit, se comportă diferit la sarcină și au domenii de aplicare care se suprapun doar parțial." },
    { type: "h2", id: "cum-functioneaza", text: "Cum funcționează fiecare tip" },
    { type: "p", text: "Ancora mecanică (tip expandare sau conexpand) transmite sarcina prin frecare și presiune radială: un manșon metalic se dilată în orificiul din beton pe măsură ce piulița sau șurubul e strâns, „mușcând\" pereții găurii. Montajul e rapid, sarcina se poate aplica aproape imediat, dar performanța depinde strict de calitatea betonului din jurul zonei de expandare." },
    { type: "p", text: "Ancora chimică folosește un liant — rășină epoxidică, vinilesterică sau poliesterică, livrată în cartuș sau fiolă — injectat în orificiu, în care se introduce o tijă filetată. Rășina se întărește și creează o legătură adezivă pe toată lungimea de ancorare, distribuind sarcina uniform, nu punctual. Rezultă o ancorare mai puțin sensibilă la fisurile locale din beton." },
    { type: "h2", id: "rezistenta", text: "Rezistență și comportament la sarcină" },
    { type: "table", caption: "Comparație generală (valori orientative, verificați fișa tehnică a produsului ales)", headers: ["Criteriu", "Ancoră mecanică", "Ancoră chimică"], rows: [
      ["Sarcină admisă", "Bună, limitată de expandarea locală", "Superioară la aceeași dimensiune"],
      ["Beton fisurat", "De regulă neagrementată", "Variante agrementate disponibile"],
      ["Distanță minimă de margine", "Mai mare (evită crăparea betonului)", "Mai mică, potrivit pentru elemente înguste"],
      ["Timp până la sarcină", "Imediat", "Minute – ore, în funcție de rășină/temperatură"],
      ["Sensibilitate la temperatură montaj", "Redusă", "Ridicată — rășina are interval de temperatură"],
      ["Cost per bucată", "Mai mic", "Mai mare (3-6x)"],
    ]},
    { type: "h2", id: "cand-alegi", text: "Când alegi ancora mecanică" },
    { type: "ul", items: [
      "Fixări ușoare și medii, cu acces rapid la sarcină (nu poți aștepta întărirea rășinii)",
      "Beton necrăpat, de bună calitate, cunoscut din proiect sau verificat pe șantier",
      "Buget limitat sau volum mare de puncte de fixare cu sarcini moderate",
      "Temperaturi extreme pe șantier unde rășina chimică nu se comportă previzibil",
    ]},
    { type: "h2", id: "cand-alegi-chimica", text: "Când alegi ancora chimică" },
    { type: "ul", items: [
      "Sarcini structurale mari — console, echipamente grele, elemente de siguranță",
      "Beton fisurat sau cu risc de fisurare (cerință explicită de agrement pentru fisură)",
      "Distanțe mici față de marginea elementului de beton, unde ancora mecanică ar risca crăparea",
      "Fixări în zone cu vibrații repetate, unde ancorarea prin adeziv pe toată lungimea reduce riscul de slăbire în timp",
    ]},
    { type: "note", text: "Regulă practică de șantier: pentru termosisteme și fixări ușoare-medii (rozete, profile, console mici), ancora mecanică e alegerea standard, mai rapidă și mai ieftină. Ancora chimică intră în discuție doar la sarcini structurale sau condiții speciale de suport." },
    { type: "h2", id: "cost-montaj", text: "Costul real pe șantier — nu doar prețul per bucată" },
    { type: "p", text: "Prețul per bucată nu spune toată povestea. Ancora chimică necesită pistol de aplicare, timp de așteptare (blochează programul echipei), curățare riguroasă a găurii (perie + suflare, uneori de 2-3 ori) — pași care cresc costul real de montaj cu 30-50% față de prețul cartușului. Ancora mecanică se montează, se strânge și e gata de sarcină, ceea ce reduce costul de manoperă per punct de fixare." },
    { type: "p", text: "Pentru volume mari de fixări similare (ex. reabilitare bloc, montaj termosistem pe zeci de mii de m²), diferența de cost și timp între cele două tehnologii se multiplică rapid — motiv pentru care majoritatea proiectelor de termoizolație folosesc dibluri și ancore mecanice, rezervând ancorele chimice pentru puncte critice de structură." },
    { type: "p", text: "Concluzia practică: nu există un câștigător universal. Alegerea corectă pornește de la sarcina de proiectat, tipul de suport (beton sănătos sau fisurat) și volumul de lucru, nu de la prețul afișat pe ambalaj. Pentru proiecte mixte — unele puncte structurale, majoritatea fixări ușoare — cele două tehnologii se folosesc împreună, fiecare acolo unde are sens tehnic." },
  ],
};
