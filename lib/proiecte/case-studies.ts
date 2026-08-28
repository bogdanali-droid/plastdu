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
  "Reabilitare termică — Str. Baicului": "reabilitare-termica-baicului",
  "Reabilitare termică — Str. Octavian Goga": "reabilitare-termica-octavian-goga",
  "Izolare bloc — Str. Ghica": "izolare-bloc-ghica",
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
  {
    slug: "reabilitare-termica-baicului",
    titlu: "Reabilitare termică — Str. Baicului, Sector 2 București",
    locatie: "Str. Baicului, Sector 2, București",
    an: 2026,
    excerpt:
      "Reabilitare termică a unui bloc de locuințe de pe Str. Baicului, Sector 2 București, cu dibluri și flanșe livrate direct din fabrica Plast Du IV din Jilava.",
    imagini: ["/images/proiecte/baicului/01.jpg"],
    context: [
      "Proiectul a vizat reabilitarea termică a unui bloc de locuințe situat pe Str. Baicului, în Sectorul 2 al Municipiului București, în cadrul unui program de eficientizare energetică derulat la nivel de sector. Antreprenorul general s-a aprovizionat direct din fabrica Plast Du IV din Jilava, Ilfov, la aproximativ 20 de kilometri de șantier, ceea ce a permis livrări rapide și eșalonate, corelate cu ritmul echipelor de montaj.",
      "Blocul, cu regim de înălțime P+8, a necesitat un volum important de materiale de fixare pentru termoizolarea fațadelor cu polistiren expandat, având în vedere atât suprafața generoasă a pereților exteriori, cât și cerințele suplimentare de fixare la partea superioară a clădirii, unde acțiunea vântului este mai puternică. Comanda a inclus atât dibluri pentru câmpul curent al fațadei, cât și variante întărite pentru zonele de colț, atic și soclu.",
    ],
    sarciniTehnice: [
      "Fixarea mecanică a plăcilor de polistiren expandat pe structura de zidărie și beton a blocului, cu densitate de montaj crescută în zona ultimelor două niveluri, conform calculului de acțiune a vântului pentru clădiri înalte.",
      "Utilizarea de dibluri cu cui metalic zincat în zonele cu solicitare mecanică ridicată — colțuri, atic, zona balcoanelor — pentru o forță de extragere superioară față de varianta standard cu cui plastic.",
      "Montaj profil de soclu la baza fațadei și colțar PVC cu plasă de fibră de sticlă pe toate muchiile verticale ale clădirii, pentru protecția stratului de finisaj împotriva fisurării și infiltrațiilor de apă.",
      "Coordonarea livrărilor pe faze de execuție (fațadă principală, apoi fațade secundare și calcane), pentru a evita blocarea șantierului din lipsă de materiale sau supra-stocarea nejustificată.",
    ],
    materiale: [
      { slug: "dibluri-plastic", titlu: "Dibluri Cui Plastic (Poliamidă)", nota: "Fixare principală polistiren, câmp curent fațadă" },
      { slug: "dibluri-metalice", titlu: "Dibluri Cui Metalic Zincat", nota: "Zone de colț, atic și solicitare mecanică ridicată" },
      { slug: "coltar-pvc", titlu: "Colțar PVC cu plasă", nota: "Protecție muchii verticale ale fațadei" },
      { slug: "flansa-vata", titlu: "Flanșă Vată Minerală", nota: "Distribuție uniformă a forței de prindere" },
    ],
    rezultat: [
      "Fațadele blocului de pe Str. Baicului au fost termoizolate integral, cu o densitate de fixare adaptată specific pentru un imobil P+8, unde solicitarea la vânt pe ultimele niveluri este semnificativ mai mare decât la un bloc jos.",
      "Proximitatea fabricii Plast Du IV față de șantier (Jilava — Sector 2) a permis livrări în aceeași zi la nevoie, eliminând riscul de întrerupere a lucrărilor din cauza aprovizionării.",
      "Provocarea principală a fost sincronizarea livrărilor cu un șantier care lucra simultan pe mai multe fațade ale clădirii — rezolvată prin comenzi eșalonate, stabilite direct cu șeful de șantier, pe măsură ce fiecare fațadă intra în faza de montaj dibluri.",
    ],
  },
  {
    slug: "reabilitare-termica-octavian-goga",
    titlu: "Reabilitare termică — Str. Octavian Goga, Sector 3 București",
    locatie: "Str. Octavian Goga, Sector 3, București",
    an: 2026,
    excerpt:
      "Reabilitare termică completă a unui bloc de pe Str. Octavian Goga, Sector 3 București — fațadă, soclu și colțuri, cu materiale de fixare din fabrica Plast Du IV.",
    imagini: [
      "/images/proiecte/octavian-goga/01.jpg",
      "/images/proiecte/octavian-goga/02.jpg",
      "/images/proiecte/octavian-goga/03.jpg",
      "/images/proiecte/octavian-goga/04.jpg",
      "/images/proiecte/octavian-goga/05.jpg",
    ],
    context: [
      "Șantierul de pe Str. Octavian Goga, din Sectorul 3 al Municipiului București, a presupus reabilitarea termică a unui bloc de locuințe aflat într-un cartier dens construit, cu acces limitat pentru utilaje și spațiu redus de depozitare a materialelor pe amplasament. Antreprenorul a optat pentru aprovizionare directă din fabrica Plast Du IV, cu livrări în cantități mici și frecvente, adaptate spațiului de depozitare disponibil pe șantier.",
      "Proiectul tehnic de termoizolare a prevăzut fixarea plăcilor de polistiren expandat pe fațadele blocului, cu tratare distinctă a zonelor de colț, a soclului și a zonelor din jurul tâmplăriei, unde punctele de fixare sunt mai numeroase și necesită materiale calibrate precis pentru grosimea izolației.",
    ],
    sarciniTehnice: [
      "Fixarea plăcilor de polistiren expandat pe fațada blocului, cu respectarea distanței minime față de colțurile ferestrelor și ușilor, conform proiectului tehnic, pentru a evita concentrarea tensiunilor la nivelul tâmplăriei.",
      "Montaj dibluri cu lungime adaptată grosimii combinate a stratului de izolație și a adezivului/tencuielii de bază, pentru o ancorare corectă în stratul suport de zidărie sau beton.",
      "Protecția colțurilor fațadei cu colțar din PVC și plasă de fibră de sticlă, precum și montaj profil de soclu pe tot perimetrul clădirii, pentru o linie de start uniformă a termoizolației.",
      "Organizarea logisticii de livrare în cantități reduse și frecvente, adaptate spațiului limitat de depozitare pe un șantier situat într-o zonă urbană dens construită.",
    ],
    materiale: [
      { slug: "dibluri-plastic", titlu: "Dibluri Cui Plastic (Poliamidă)", nota: "Fixare polistiren pe câmpul curent al fațadei" },
      { slug: "dibluri-metalice", titlu: "Dibluri Cui Metalic Zincat", nota: "Zone de colț și zonele adiacente tâmplăriei" },
      { slug: "coltar-pvc", titlu: "Colțar PVC cu plasă", nota: "Protecție colțuri fațadă și glafuri" },
      { slug: "flansa-vata", titlu: "Flanșă Vată Minerală", nota: "Distribuție forță pe zonele cu strat izolant mai gros" },
    ],
    rezultat: [
      "Termoizolarea blocului de pe Str. Octavian Goga a fost finalizată conform proiectului tehnic, cu o atenție deosebită acordată zonelor din jurul tâmplăriei, unde riscul de fisurare a finisajului este cel mai ridicat.",
      "Livrările eșalonate, în cantități mici, au permis antreprenorului să lucreze eficient chiar și cu spațiu redus de depozitare pe șantier — o provocare frecventă pe amplasamentele din zonele dens construite ale Bucureștiului.",
      "Proiectul confirmă capacitatea Plast Du IV de a susține logistic șantiere urbane cu constrângeri de spațiu, printr-un model de livrare flexibil, adaptat ritmului real de execuție, nu doar volumului total contractat.",
    ],
  },
  {
    slug: "izolare-bloc-ghica",
    titlu: "Izolare bloc — Str. Ghica, Sector 2 București",
    locatie: "Str. Ghica, Sector 2, București",
    an: 2026,
    excerpt:
      "Izolare termică a unui bloc de locuințe de pe Str. Ghica, Sector 2 București, cu dibluri, flanșe și accesorii de protecție a fațadei din fabrica Plast Du IV.",
    imagini: ["/images/proiecte/ghica/01.jpg"],
    context: [
      "Proiectul de pe Str. Ghica, din Sectorul 2 al Municipiului București, a constat în izolarea termică a unui bloc de locuințe cu fațadă neizolată anterior, în cadrul unei lucrări de renovare inițiate de asociația de proprietari, prin intermediul unui antreprenor de construcții local. Materialele de fixare — dibluri, flanșe și accesorii de protecție a fațadei — au fost achiziționate integral de la Plast Du IV, direct din fabrica de la Jilava, Ilfov.",
      "Fiind un bloc cu fațadă simplă, fără elemente decorative complexe, proiectul a permis o planificare precisă a necesarului de materiale încă din faza de ofertare, pe baza suprafeței exacte a fațadelor și a densității de fixare recomandate pentru zona respectivă a orașului.",
    ],
    sarciniTehnice: [
      "Fixarea mecanică a plăcilor de polistiren expandat pe zidăria fațadei, cu densitate standard pe câmpul curent și densitate crescută la colțurile clădirii și în zona soclului.",
      "Montaj profil de soclu la baza fațadei, pentru protecția stratului de izolație de la nivelul solului împotriva umidității și a impactului mecanic.",
      "Protecția colțurilor verticale ale clădirii cu colțar din PVC și plasă de fibră de sticlă, pentru prevenirea fisurării finisajului decorativ în timp.",
      "Livrarea integrală a necesarului de materiale într-o singură comandă principală, completată cu o livrare secundară pentru ajustări de cantitate apărute pe parcursul execuției.",
    ],
    materiale: [
      { slug: "dibluri-plastic", titlu: "Dibluri Cui Plastic (Poliamidă)", nota: "Fixare principală polistiren, fațadă simplă fără elemente decorative" },
      { slug: "dibluri-metalice", titlu: "Dibluri Cui Metalic Zincat", nota: "Zone de colț și soclu" },
      { slug: "coltar-pvc", titlu: "Colțar PVC cu plasă", nota: "Protecție colțuri verticale ale clădirii" },
    ],
    rezultat: [
      "Blocul de pe Str. Ghica a fost izolat termic integral, cu o planificare a materialelor bazată pe calcul precis al suprafeței, ceea ce a redus la minimum diferențele dintre cantitatea comandată inițial și necesarul real de pe șantier.",
      "Livrarea principală, completată cu o comandă secundară de ajustare, a demonstrat flexibilitatea Plast Du IV de a răspunde rapid la variații de necesar apărute în timpul execuției, fără a bloca ritmul de montaj al echipei.",
      "Proiectul se adaugă portofoliului de lucrări de reabilitare/izolare termică realizate de Plast Du IV în Sectorul 2 al Bucureștiului, confirmând prezența constantă a companiei pe șantiere din capitală.",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
