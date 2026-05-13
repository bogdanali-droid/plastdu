import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalerieProduseClient from "@/components/GalerieProduseClient";

export const metadata: Metadata = {
  title: "Dibluri Cui Plastic (Poliamidă) — Fixare Termoizolație ETICS",
  description:
    "Dibluri termoizolante cu cui din poliamidă Ø5.5mm, corp polipropilenă Ø10mm, rozetă Ø55mm. " +
    "Fabricate în România. Variante 10x70…10x260ZM. Livrare 100 buc/cutie.",
  keywords: ["dibluri plastic poliamida","dibluri termoizolatie","dibluri ETICS","diblu cui plastic","fixare polistiren fatada"],
  alternates: { canonical: "https://plastdu.ro/produse/dibluri-plastic" },
  openGraph: {
    title: "Dibluri Cui Plastic (Poliamidă) | Plast Du IV",
    description: "Dibluri termoizolante cu cui din poliamidă, fabricate în România. Soluție optimă pentru sisteme ETICS.",
    url: "https://plastdu.ro/produse/dibluri-plastic",
    images: [{ url: "/images/produse/dibluri-plastic/01.jpg", width: 1200, height: 630 }],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Diblu Cui Plastic Poliamidă — Plast Du IV",
  description: "Diblu termoizolant cu cui din poliamidă Ø5.5mm, corp din polipropilenă Ø10mm, rozetă Ø55mm / 2mm.",
  brand: { "@type": "Brand", name: "Plast Du IV" },
  manufacturer: {
    "@type": "Organization",
    name: "Plast Du IV SRL",
    address: { "@type": "PostalAddress", streetAddress: "Strada Ana Ipătescu nr. 44", addressLocality: "Jilava", addressRegion: "Ilfov", addressCountry: "RO" },
  },
  offers: { "@type": "Offer", availability: "https://schema.org/InStock", url: "https://plastdu.ro/contact?produs=dibluri-plastic", seller: { "@type": "Organization", name: "Plast Du IV SRL" } },
};

const VARIANTE = [
  { cod: "10x70",   lungime: "70mm",  adancime: "45mm", zona: "Standard" },
  { cod: "10x90",   lungime: "90mm",  adancime: "55mm", zona: "Standard" },
  { cod: "10x120",  lungime: "120mm", adancime: "75mm", zona: "Standard" },
  { cod: "10x140",  lungime: "140mm", adancime: "90mm", zona: "Standard" },
  { cod: "10x160",  lungime: "160mm", adancime: "105mm",zona: "Standard" },
  { cod: "10x180",  lungime: "180mm", adancime: "120mm",zona: "Standard" },
  { cod: "10x200",  lungime: "200mm", adancime: "135mm",zona: "Standard" },
  { cod: "10x180ZM",lungime: "180mm", adancime: "120mm",zona: "Zonă Mare" },
  { cod: "10x220ZM",lungime: "220mm", adancime: "150mm",zona: "Zonă Mare" },
  { cod: "10x240ZM",lungime: "240mm", adancime: "165mm",zona: "Zonă Mare" },
  { cod: "10x260ZM",lungime: "260mm", adancime: "180mm",zona: "Zonă Mare" },
];

const IMAGINI = [
  "/images/produse/dibluri-plastic/01.jpg",
  "/images/produse/dibluri-plastic/02.jpg",
  "/images/produse/dibluri-plastic/03.jpg",
  "/images/produse/dibluri-plastic/04.jpg",
  "/images/produse/dibluri-plastic/05.jpg",
  "/images/produse/dibluri-plastic/06.jpg",
  "/images/produse/dibluri-plastic/07.jpg",
  "/images/produse/dibluri-plastic/08.jpg",
  "/images/produse/dibluri-plastic/09.jpg",
  "/images/produse/dibluri-plastic/10.jpg",
  "/images/produse/dibluri-plastic/11.jpg",
  "/images/produse/dibluri-plastic/12.jpg",
  "/images/produse/dibluri-plastic/14.jpg",
];

export default function DiblurPlasticPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="bg-neutral-surface border-b border-neutral-border">
          <div className="container-site py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-brand-blue transition-colors">Acasă</Link>
              <span>/</span>
              <Link href="/produse" className="hover:text-brand-blue transition-colors">Produse</Link>
              <span>/</span>
              <span className="text-slate-800 font-medium">Dibluri Cui Plastic</span>
            </nav>
          </div>
        </div>

        {/* Hero produs */}
        <section className="bg-white section-padding">
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Galerie interactivă */}
              <GalerieProduseClient imagini={IMAGINI} alt="Diblu Cui Plastic Poliamidă" />

              {/* Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-brand-accent/10 text-brand-accent text-xs font-semibold px-3 py-1 rounded-full">Produs propriu</span>
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Dibluri termoizolante</span>
                </div>
                <h1 className="mb-4">Dibluri Cui Plastic (Poliamidă)</h1>
                <p className="text-lg text-slate-600 mb-6">
                  Diblu termoizolant cu cui din poliamidă, proiectat pentru fixarea
                  termoizolațiilor din polistiren (EPS) pe fațade în sisteme ETICS.
                  Corpul din polipropilenă asigură rezistență mecanică, iar cuiul din PA
                  elimină complet punțile termice.
                </p>

                <dl className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { label: "Material corp", value: "Polipropilenă (PP)" },
                    { label: "Material cui", value: "Poliamidă (PA) Ø5.5mm" },
                    { label: "Diametru corp", value: "Ø10mm" },
                    { label: "Diametru rozetă", value: "Ø55mm / 2mm grosime" },
                    { label: "Suport compatibil", value: "Cărămidă, BCA, Beton" },
                    { label: "Livrare", value: "100 buc / pungă–cutie" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-neutral-surface rounded-xl p-3 border border-neutral-border">
                      <dt className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-0.5">{label}</dt>
                      <dd className="text-sm font-semibold text-brand-blue">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact?produs=dibluri-plastic"
                    className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors shadow-sm"
                  >
                    Solicitați ofertă pentru acest produs
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/produse"
                    className="inline-flex items-center gap-2 border border-neutral-border text-slate-600 font-semibold px-5 py-3.5 rounded-xl hover:border-brand-blue hover:text-brand-blue transition-colors"
                  >
                    Toate produsele
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specificatii tehnice */}
        <section className="section-padding bg-neutral-surface">
          <div className="container-site">
            <div className="max-w-3xl">
              <p className="section-label">Date tehnice</p>
              <h2 className="mb-8">Specificații tehnice complete</h2>
              <div className="bg-white rounded-2xl border border-neutral-border shadow-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-blue text-white">
                      <th className="text-left px-5 py-3.5 font-semibold">Parametru</th>
                      <th className="text-left px-5 py-3.5 font-semibold">Valoare</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-border">
                    {[
                      ["Material corp", "Polipropilenă (PP) — rezistentă UV, anti-îmbătrânire"],
                      ["Material cui", "Poliamidă 6.6 (PA66) — termoizolant, fără punte termică"],
                      ["Diametru cui", "Ø5.5mm"],
                      ["Diametru corp / gaură de montaj", "Ø10mm"],
                      ["Diametru rozetă", "Ø55mm"],
                      ["Grosime rozetă", "2mm"],
                      ["Lungimi disponibile", "70 / 90 / 120 / 140 / 160 / 180 / 200mm (standard)"],
                      ["Lungimi zonă mare (ZM)", "180 / 220 / 240 / 260mm"],
                      ["Suporturi compatibile", "Cărămidă plină, BCA, Beton monolit/prefabricat"],
                      ["Temperatură de utilizare", "-40°C … +80°C"],
                      ["Culoare", "Gri / Gri-alb (standard)"],
                      ["Ambalare", "100 buc / pungă sau cutie"],
                      ["Conformitate", "EN 14566 (fixare termosisteme)"],
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

        {/* Variante disponibile */}
        <section className="section-padding bg-white">
          <div className="container-site">
            <p className="section-label">Gamă completă</p>
            <h2 className="mb-3">Variante disponibile</h2>
            <p className="text-slate-500 mb-8 max-w-xl">
              Toate dimensiunile sunt disponibile din stoc. Variantele <strong>ZM (Zonă Mare)</strong> sunt
              recomandate pentru zidărie cu goluri și straturi groase de tencuială sau adeziv.
            </p>
            <div className="bg-white rounded-2xl border border-neutral-border shadow-card overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-blue text-white">
                    <th className="text-left px-5 py-3.5 font-semibold">Cod produs</th>
                    <th className="text-left px-5 py-3.5 font-semibold">Lungime totală</th>
                    <th className="text-left px-5 py-3.5 font-semibold">Adâncime ancoraj</th>
                    <th className="text-left px-5 py-3.5 font-semibold">Zonă</th>
                    <th className="text-left px-5 py-3.5 font-semibold">Ambalare</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-border">
                  {VARIANTE.map((v, i) => (
                    <tr key={v.cod} className={i % 2 === 0 ? "bg-white" : "bg-neutral-surface/50"}>
                      <td className="px-5 py-3.5">
                        <span className="font-mono font-semibold text-brand-blue bg-brand-blue/5 px-2 py-0.5 rounded">{v.cod}</span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">{v.lungime}</td>
                      <td className="px-5 py-3.5 text-slate-600">{v.adancime}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          v.zona === "Zonă Mare" ? "bg-brand-accent/10 text-brand-accent" : "bg-slate-100 text-slate-600"
                        }`}>{v.zona}</span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">100 buc</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site">
            <div className="max-w-2xl">
              <p className="text-brand-accent font-semibold text-sm uppercase tracking-widest mb-3">Solicitați ofertă</p>
              <h2 className="text-white mb-4">Aveți nevoie de dibluri cu cui plastic pentru proiectul dvs.?</h2>
              <p className="text-blue-100 mb-8">
                Lucrăm direct cu firme de construcții, antreprenori generali și depozite de materiale.
                Oferăm prețuri competitive pentru comenzi în volum, cu livrare în toată România.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact?produs=dibluri-plastic"
                  className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors shadow-sm"
                >
                  Solicitați ofertă pentru acest produs
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/aplicatii"
                  className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Vezi aplicații
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
