import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalerieProduseClient from "@/components/GalerieProduseClient";

export const metadata: Metadata = {
  title: "Flanșă Vată Minerală — Disc Plastic Ø120-140mm pentru Termoizolație",
  description:
    "Flanșă plastic cu rozetă extinsă Ø120–140mm pentru fixarea vatei minerale și polistirenului. " +
    "Model cu spite duble, distribuție uniformă a forței de prindere. Fabricată în România.",
  keywords: ["flansa vata minerala","disc plastic fixare vata","flansa termoizolatie","rozeta mare diblu","fixare vata minerala fatada"],
  alternates: { canonical: "https://plastdu.ro/produse/flansa-vata" },
  openGraph: {
    title: "Flanșă Vată Minerală | Plast Du IV",
    description: "Disc plastic cu rozetă Ø120–140mm pentru distribuție uniformă a forței pe vată minerală și polistiren.",
    url: "https://plastdu.ro/produse/flansa-vata",
    images: [{ url: "/images/produse/flansa-vata/01.jpg", width: 1200, height: 630 }],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Flanșă Vată Minerală — Plast Du IV",
  description:
    "Disc plastic circular cu diametru Ø120–140mm, model cu spite duble, gri închis. " +
    "Utilizat pentru fixarea vatei minerale și polistirenului pe fațade.",
  image: "https://plastdu.ro/images/produse/flansa-vata/01.jpg",
  brand: { "@type": "Brand", name: "Plast Du IV" },
  manufacturer: {
    "@type": "Organization",
    name: "Plast Du IV SRL",
    address: { "@type": "PostalAddress", streetAddress: "Strada Ana Ipătescu nr. 44", addressLocality: "Jilava", addressRegion: "Ilfov", addressCountry: "RO" },
  },
  material: "Polipropilenă (PP)",
  color: "Gri închis",
  offers: { "@type": "Offer", availability: "https://schema.org/InStock", url: "https://plastdu.ro/contact?produs=flansa-vata", seller: { "@type": "Organization", name: "Plast Du IV SRL" } },
};

const BENEFICII = [
  {
    titlu: "Suprafață de contact mare",
    descriere: "Diametrul de Ø120–140mm al rozetei distribuie forța de fixare pe o suprafață de cca 113–154cm². Previne penetrarea diblului prin stratul de vată minerală sau EPS.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" />
      </svg>
    ),
  },
  {
    titlu: "Distribuție uniformă a forței",
    descriere: "Modelul cu spite duble rigidizează discul fără a adăuga greutate. Sarcina este distribuită radial, prevenind concentrarea tensiunilor în jurul capului diblului.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    titlu: "Compatibil cu vată minerală și EPS",
    descriere: "Funcționează cu ambele tipuri principale de izolant. Ideal în proiecte mixte sau acolo unde specificațiile de proiect permit ambele materiale.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    titlu: "Material rezistent UV",
    descriere: "Polipropilena stabilizată UV rezistă la expunere solară directă și variații termice fără degradare structurală.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636" />
      </svg>
    ),
  },
];

const APLICATII = [
  { titlu: "Termoizolație exterioară cu vată minerală", descriere: "Fixarea plăcilor de vată minerală lamelă sau tablie pe fațade în sisteme termoizolante certificate." },
  { titlu: "Termoizolație cu EPS gros", descriere: "Atunci când grosimea plăcii de polistiren depășește 15cm, rozeta mare previne deformarea locală sub capul diblului." },
  { titlu: "Plăci de izolație cu densitate redusă", descriere: "Pentru vată minerală cu densitate sub 80 kg/m³ sau polistiren grafitat (EPS-G), flanșa mare este obligatorie." },
  { titlu: "Reabilitare termică complexă", descriere: "Proiecte cu straturi multiple de izolație sau suport neregulat unde este necesară o distribuție mai bună a forțelor." },
];

const IMAGINI = [
  "/images/produse/flansa-vata/01.jpg",
  "/images/produse/flansa-vata/02.jpg",
  "/images/produse/flansa-vata/03.jpg",
];

export default function FlansaVataPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <Header />
      <main>
        <div className="bg-neutral-surface border-b border-neutral-border">
          <div className="container-site py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-brand-blue transition-colors">Acasă</Link>
              <span>/</span>
              <Link href="/produse" className="hover:text-brand-blue transition-colors">Produse</Link>
              <span>/</span>
              <span className="text-slate-800 font-medium">Flanșă Vată Minerală</span>
            </nav>
          </div>
        </div>

        <section className="bg-white section-padding">
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <GalerieProduseClient imagini={IMAGINI} alt="Flanșă Vată Minerală Ø120-140mm — Plast Du IV" />

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-brand-accent/10 text-brand-accent text-xs font-semibold px-3 py-1 rounded-full">Produs propriu</span>
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Flanșe termoizolante</span>
                </div>
                <h1 className="mb-4">Flanșă Vată Minerală</h1>
                <p className="text-lg text-slate-600 mb-6">
                  Disc plastic circular cu rozetă extinsă Ø120–140mm, model cu spite duble, gri închis.
                  Proiectat pentru fixarea vatei minerale și a polistirenului pe fațade —
                  suprafața mare de contact previne penetrarea stratului izolant.
                </p>
                <dl className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { label: "Material", value: "Polipropilenă (PP) stabilizată UV" },
                    { label: "Diametru rozetă", value: "Ø120–140mm" },
                    { label: "Model", value: "Disc circular cu spite duble" },
                    { label: "Culoare", value: "Gri închis" },
                    { label: "Compatibil cu", value: "Vată minerală + EPS / EPS-G" },
                    { label: "Livrare", value: "La cerere (cantități de la 100 buc)" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-neutral-surface rounded-xl p-3 border border-neutral-border">
                      <dt className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-0.5">{label}</dt>
                      <dd className="text-sm font-semibold text-brand-blue">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact?produs=flansa-vata" className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors shadow-sm">
                    Solicitați ofertă pentru acest produs
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </Link>
                  <Link href="/produse" className="inline-flex items-center gap-2 border border-neutral-border text-slate-600 font-semibold px-5 py-3.5 rounded-xl hover:border-brand-blue hover:text-brand-blue transition-colors">Toate produsele</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-neutral-surface">
          <div className="container-site">
            <p className="section-label">Principiu tehnic</p>
            <h2 className="mb-4">De ce este necesară rozeta extinsă?</h2>
            <div className="max-w-3xl mb-10">
              <p className="text-slate-600 mb-4">Diblurile standard cu rozetă Ø55mm sunt proiectate pentru polistiren dens (EPS ≥ 20 kg/m³). Vata minerală și polistirenul grafitat au o rezistență la penetrare mai redusă — flanșa mare distribuie aceeași forță pe o arie mult mai mare.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {BENEFICII.map((b) => (
                <div key={b.titlu} className="card">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">{b.icon}</div>
                  <h3 className="text-base mb-2">{b.titlu}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{b.descriere}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-site">
            <div className="max-w-3xl">
              <p className="section-label">Date tehnice</p>
              <h2 className="mb-8">Specificații tehnice complete</h2>
              <div className="bg-white rounded-2xl border border-neutral-border shadow-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead><tr className="bg-brand-blue text-white"><th className="text-left px-5 py-3.5 font-semibold">Parametru</th><th className="text-left px-5 py-3.5 font-semibold">Valoare</th></tr></thead>
                  <tbody className="divide-y divide-neutral-border">
                    {[
                      ["Material", "Polipropilenă (PP) cu stabilizatori UV"],
                      ["Formă", "Disc circular cu model spite duble"],
                      ["Diametru exterior rozetă", "Ø120–140mm"],
                      ["Culoare", "Gri închis RAL 7011 (aproximativ)"],
                      ["Gaură centrală", "Ø10mm (compatibil diblu Ø10mm)"],
                      ["Suprafață de contact", "~113–154cm²"],
                      ["Temperatură de utilizare", "-40°C … +80°C"],
                      ["Rezistență UV", "Stabilizat contra îmbătrânirii UV"],
                      ["Compatibil cu izolant", "Vată minerală (MW), EPS, EPS-G"],
                      ["Compatibil cu diblu", "Diblu Ø10mm (plastic sau metalic)"],
                      ["Ambalare", "La cerere — pungi 50–100 buc"],
                    ].map(([param, val], i) => (
                      <tr key={param} className={i % 2 === 0 ? "bg-white" : "bg-neutral-surface/50"}>
                        <td className="px-5 py-3.5 font-medium text-slate-700">{param}</td>
                        <td className="px-5 py-3.5 text-slate-600">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-neutral-surface">
          <div className="container-site">
            <p className="section-label">Domenii de utilizare</p>
            <h2 className="mb-10">Aplicații recomandate</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {APLICATII.map((ap) => (
                <div key={ap.titlu} className="card flex gap-4">
                  <div className="w-1.5 bg-brand-accent/60 rounded-full flex-shrink-0 self-stretch" />
                  <div>
                    <h3 className="text-base mb-2">{ap.titlu}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{ap.descriere}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-site">
            <p className="section-label">Produse asociate</p>
            <h2 className="mb-8">Se utilizează împreună cu</h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
              {[
                { href: "/produse/dibluri-plastic", titlu: "Dibluri Cui Plastic (Poliamidă)", descriere: "Diblu termoizolant cu rozetă standard Ø55mm, utilizat cu flanșa mare pe EPS dens." },
                { href: "/produse/dibluri-metalice", titlu: "Dibluri Cui Metalic Zincat", descriere: "Diblu cu cui din oțel zincat — recomandat cu flanșa mare la fixarea vatei minerale." },
              ].map((p) => (
                <Link key={p.href} href={p.href} className="card hover:border-brand-blue/30 hover:shadow-card-hover group">
                  <h3 className="text-base mb-2 group-hover:text-brand-blue/80 transition-colors">{p.titlu}</h3>
                  <p className="text-sm text-slate-500">{p.descriere}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-accent mt-3">Vezi produs <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site">
            <div className="max-w-2xl">
              <p className="text-brand-accent font-semibold text-sm uppercase tracking-widest mb-3">Solicitați ofertă</p>
              <h2 className="text-white mb-4">Aveți nevoie de flanșe pentru vată minerală?</h2>
              <p className="text-blue-100 mb-8">Contactați-ne pentru disponibilitate stoc, prețuri de volum și opțiuni de livrare.</p>
              <Link href="/contact?produs=flansa-vata" className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors shadow-sm">
                Solicitați ofertă pentru acest produs
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
