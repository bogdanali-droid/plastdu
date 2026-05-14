import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalerieProduseClient from "@/components/GalerieProduseClient";

export const metadata: Metadata = {
  title: "Flanșă OSB cu Capac TSF-F55 — Fixare cu Finisaj Superior",
  description:
    "Flanșă TSF-F55 cu capac snap-on care acoperă capul diblului — aspect curat, finisaj superior. " +
    "Include șurub galvanizat. Fabricată în România.",
  keywords: ["flansa OSB capac","TSF-F55","diblu capac snap-on","fixare OSB","flansa capac diblu"],
  alternates: { canonical: "https://plastdu.ro/produse/flansa-osb" },
  openGraph: {
    title: "Flanșă OSB / Capac TSF-F55 | Plast Du IV",
    description: "Flanșă cu capac snap-on TSF-F55 — acoperă capul diblului pentru finisaj superior. Șurub galvanizat inclus.",
    url: "https://plastdu.ro/produse/flansa-osb",
    images: [{ url: "/images/produse/flansa-osb/01.jpg", width: 1200, height: 630 }],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Flanșă OSB cu Capac Snap-on TSF-F55 — Plast Du IV",
  description: "Flanșă cu capac snap-on cod TSF-F55. Capacul acoperă complet capul diblului după montaj.",
  image: "https://plastdu.ro/images/produse/flansa-osb/01.jpg",
  brand: { "@type": "Brand", name: "Plast Du IV" },
  manufacturer: {
    "@type": "Organization",
    name: "Plast Du IV SRL",
    address: { "@type": "PostalAddress", streetAddress: "Strada Ana Ipătescu nr. 44", addressLocality: "Jilava", addressRegion: "Ilfov", addressCountry: "RO" },
  },
  sku: "TSF-F55",
  mpn: "TSF-F55",
  material: "Polipropilenă (PP)",
  offers: { "@type": "Offer", availability: "https://schema.org/InStock", url: "https://plastdu.ro/contact?produs=flansa-osb", seller: { "@type": "Organization", name: "Plast Du IV SRL" } },
};

const CARACTERISTICI = [
  {
    titlu: "Capac snap-on integrat",
    descriere: "Capacul se fixează prin presare simplă (snap-on) după montajul diblului și al șurubului. Nu necesită scule suplimentare.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    titlu: "Finisaj curat și estetic",
    descriere: "Capacul acoperă complet capul diblului și șurubului. Rezultatul vizual este o suprafață plană, fără proeminente metalice.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    titlu: "Șurub galvanizat inclus",
    descriere: "Fiecare flanșă TSF-F55 este livrată cu șurubul galvanizat corespunzător. Zincarea protejează împotriva coroziunii.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    titlu: "Montaj simplu și rapid",
    descriere: "Găurire → inserare diblu → înșurubare → fixare capac prin presare. Productivitate ridicată pe șantier.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

const APLICATII = [
  { titlu: "Fixare plăci OSB", descriere: "Soluția principală pentru montajul plăcilor OSB pe pereți și tavane — capacul acoperă capul șurubului și protejează suprafața.", recomandat: true },
  { titlu: "Finisaje exterioare vizibile", descriere: "Acolo unde capul diblului rămâne vizibil în zona finisată, capacul asigură uniformitate vizuală și protecție.", recomandat: true },
  { titlu: "Sisteme de ventilație fațadă", descriere: "Fixarea subansamblelor de prindere în sisteme de fațadă ventilată, unde punctele de fixare sunt expuse.", recomandat: false },
  { titlu: "Aplicații de interior", descriere: "Fixări de tavane false, podele flotante sau alte suprafețe unde estetica punctului de fixare contează.", recomandat: false },
];

const IMAGINI = [
  "/images/produse/flansa-osb/01.jpg",
  "/images/produse/flansa-osb/02.jpg",
  "/images/produse/flansa-osb/03.jpg",
];

export default function FlansaOsbPage() {
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
              <span className="text-slate-800 font-medium">Flanșă OSB / Capac TSF-F55</span>
            </nav>
          </div>
        </div>

        <section className="bg-white section-padding">
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <GalerieProduseClient imagini={IMAGINI} alt="Flanșă OSB cu Capac Snap-on TSF-F55 — Plast Du IV" />

              <div>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="bg-brand-accent/10 text-brand-accent text-xs font-semibold px-3 py-1 rounded-full">Produs propriu</span>
                  <span className="bg-brand-blue/10 text-brand-blue text-xs font-semibold px-3 py-1 rounded-full font-mono">Cod: TSF-F55</span>
                </div>
                <h1 className="mb-4">Flanșă OSB / Flanșă cu Capac (TSF-F55)</h1>
                <p className="text-lg text-slate-600 mb-6">
                  Flanșă cu capac snap-on care acoperă complet capul diblului și al șurubului după montaj.
                  Asigură un finisaj superior, aspect curat și protecție împotriva coroziunii.
                  Livrată cu șurub galvanizat inclus în set.
                </p>
                <dl className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { label: "Cod produs", value: "TSF-F55" },
                    { label: "Material", value: "Polipropilenă (PP)" },
                    { label: "Sistem de închidere", value: "Capac snap-on (presare)" },
                    { label: "Șurub inclus", value: "Șurub galvanizat (set complet)" },
                    { label: "Aplicație principală", value: "OSB, finisaje vizibile, fațade" },
                    { label: "Livrare", value: "La cerere (seturi complete)" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-neutral-surface rounded-xl p-3 border border-neutral-border">
                      <dt className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-0.5">{label}</dt>
                      <dd className="text-sm font-semibold text-brand-blue">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact?produs=flansa-osb" className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors shadow-sm">
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
            <p className="section-label">Ce îl face special</p>
            <h2 className="mb-10">Caracteristici principale TSF-F55</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CARACTERISTICI.map((c) => (
                <div key={c.titlu} className="card">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">{c.icon}</div>
                  <h3 className="text-base mb-2">{c.titlu}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{c.descriere}</p>
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
                      ["Cod produs", "TSF-F55"],
                      ["Material flanșă", "Polipropilenă (PP) injectată"],
                      ["Material capac", "Polipropilenă (PP) — snap-on"],
                      ["Sistem de închidere capac", "Presare (snap-on) — fără scule"],
                      ["Șurub inclus", "Șurub galvanizat (zincare electrochimică)"],
                      ["Temperatură de utilizare", "-30°C … +70°C"],
                      ["Culoare", "Gri (standard)"],
                      ["Livrat ca", "Set complet: flanșă + capac + șurub"],
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

        <section className="section-padding bg-white">
          <div className="container-site">
            <p className="section-label">Unde se utilizează</p>
            <h2 className="mb-10">Aplicații recomandate</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {APLICATII.map((ap) => (
                <div key={ap.titlu} className={`card flex gap-4 ${ap.recomandat ? "border-brand-accent/30" : ""}`}>
                  <div className={`w-1.5 ${ap.recomandat ? "bg-brand-accent" : "bg-slate-200"} rounded-full flex-shrink-0 self-stretch`} />
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="text-base">{ap.titlu}</h3>
                      {ap.recomandat && <span className="text-xs font-semibold bg-brand-accent/10 text-brand-accent px-2 py-0.5 rounded-full">Recomandat</span>}
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{ap.descriere}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site">
            <div className="max-w-2xl">
              <p className="text-brand-accent font-semibold text-sm uppercase tracking-widest mb-3">Solicitați ofertă</p>
              <h2 className="text-white mb-4">Aveți nevoie de flanșe TSF-F55 pentru proiectul dvs.?</h2>
              <p className="text-blue-100 mb-8">Contactați-ne pentru prețuri de volum, mostre tehnice și disponibilitate stoc.</p>
              <Link href="/contact?produs=flansa-osb" className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors shadow-sm">
                Solicitați ofertă pentru TSF-F55
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
