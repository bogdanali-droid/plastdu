export interface CaseStudy {
  slug: string;
  titlu: string;
  locatie: string;
  an: number;
  excerpt: string;
  imagini: string[];
  context: string[];
  sarciniTehnice: string[];
  materiale: { slug: string; titlu: string; nota: string }[];
  rezultat: string[];
}

/** Mapare nume proiect (din KV/DEFAULT_PROJECTS) -> slug pagină case study, pt. link din ProjectCard. */
export const PROJECT_CASE_STUDY_SLUGS: Record<string, string> = {
  "Reabilitare bloc — Buhuiş": "reabilitare-bloc-buhusi",
  "Reabilitare bloc — Buhuși": "reabilitare-bloc-buhusi",
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "reabilitare-bloc-buhusi",
    titlu: "Reabilitare termică bloc de locuințe — Buhuși, Bacău",
    locatie: "Buhuși, județul Bacău",
    an: 2026,
    excerpt:
      "Reabilitare termică completă a unui bloc de locuințe din Buhuși — fațadă, soclu și colțuri protejate, cu materiale livrate direct din fabrica Plast Du IV.",
    imagini: [
      "/images/proiecte/buhusi/01.jpg",
      "/images/proiecte/buhusi/02.jpg",
      "/images/proiecte/buhusi/03.jpg",
    ],
    context: [
      "Proiectul a vizat reabilitarea termică a unui bloc de locuințe cu regim de înălțime P+4 din orașul Buhuși, județul Bacău, în cadrul unui program local de eficientizare energetică a fondului locativ. Firma de construcții antreprenoare a contractat direct din fabrica Plast Du IV din Jilava, Ilfov, întregul necesar de dibluri și accesorii de fixare pentru fațada termoizolată cu polistiren expandat.",
      "Cantitatea contractată a acoperit suprafața integrală a fațadelor blocului, inclusiv zonele de colț și soclu, unde densitatea de fixare este mai ridicată conform proiectului tehnic de termoizolare. Livrarea s-a realizat eșalonat, pe faze de execuție, pentru a corela aprovizionarea cu ritmul de montaj al echipelor de pe șantier.",
    ],
    sarciniTehnice: [
      "Fixarea plăcilor de polistiren expandat pe suport de zidărie și beton, cu densitate diferențiată între câmpul curent al fațadei și zonele de colț/soclu, conform normativelor de acțiune a vântului pentru clădiri cu regim P+4.",
      "Protecția muchiilor fațadei nou-termoizolate cu colțar din PVC și plasă din fibră de sticlă, pentru prevenirea fisurării stratului de finisaj la nivelul colțurilor expuse.",
      "Montaj profil de soclu la baza fațadei, pentru a asigura o linie de start uniformă pe tot perimetrul clădirii și protecția termoizolației la zona cea mai expusă umidității.",
    ],
    materiale: [
      { slug: "dibluri-plastic", titlu: "Dibluri Cui Plastic (Poliamidă)", nota: "Fixare principală polistiren pe câmp curent" },
      { slug: "dibluri-metalice", titlu: "Dibluri Cui Metalic Zincat", nota: "Zone de colț și soclu, solicitare mecanică ridicată" },
      { slug: "coltar-pvc", titlu: "Colțar PVC cu plasă", nota: "Protecție colțuri fațadă" },
      { slug: "flansa-vata", titlu: "Flanșă Vată Minerală", nota: "Distribuție forță pe zonele cu izolație suplimentară" },
    ],
    rezultat: [
      "Fațada blocului a fost termoizolată integral în termenul contractat, cu materialele livrate direct din fabrica Plast Du IV, fără întreruperi de aprovizionare pe parcursul execuției.",
      "Densitatea de fixare diferențiată pe zone (câmp curent vs. colț/soclu) a respectat proiectul tehnic de termoizolare, iar protecția colțurilor cu colțar PVC previne fisurarea prematură a finisajului decorativ.",
      "Proiectul demonstrează capacitatea Plast Du IV de a susține logistic șantiere de reabilitare edilitară din afara Bucureștiului, cu livrare eșalonată corelată cu ritmul de execuție al antreprenorului.",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
