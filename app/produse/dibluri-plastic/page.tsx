import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ─── Metadata + Schema.org ──────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Dibluri Cui Plastic (Poliamidă) — Fixare Termoizolație ETICS",
  description:
    "Dibluri termoizolante cu cui din poliamidă Ø5.5mm, corp polipropilenă Ø10mm, rozetă Ø55mm. " +
    "Fabricate în România. Variante 10x70…10x260ZM. Livrare 100 buc/cutie.",
  keywords: [
    "dibluri plastic poliamida",
    "dibluri termoizolatie",
    "dibluri ETICS",
    "diblu cui plastic",
    "fixare polistiren fatada",
  ],
  alternates: { canonical: "https://plastdu.ro/produse/dibluri-plastic" },
  openGraph: {
    title: "Dibluri Cui Plastic (Poliamidă) | Plast Du IV",
    description:
      "Dibluri termoizolante cu cui din poliamidă, fabricate în România. Soluție optimă pentru sisteme ETICS.",
    url: "https://plastdu.ro/produse/dibluri-plastic",
    images: [{ url: "/images/produse/diblu-plastic.jpg", width: 1200, height: 630 }],
  },
};

/* ─── Schema.org Product JSON-LD ─────────────────────────────────────────── */
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Diblu Cui Plastic Poliamidă — Plast Du IV",
  description:
    "Diblu termoizolant cu cui din poliamidă Ø5.5mm, corp din polipropilenă Ø10mm, rozetă Ø55mm / 2mm. " +
    "Utilizat pentru fixarea termoizolațiilor din polistiren pe fațade în sisteme ETICS. " +
    "Compatibil cu cărămidă plină, BCA și beton.",
  image: "https://plastdu.ro/images/produse/diblu-plastic.jpg",
  brand: {
    "@type": "Brand",
    name: "Plast Du IV",
  },
  manufacturer: {
    "@type": "Organization",
    name: "Plast Du IV SRL",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Strada Ana Ipătescu nr. 44",
      addressLocality: "Jilava",
      addressRegion: "Ilfov",
      addressCountry: "RO",
    },
  },
  material: "Polipropilenă (corp) + Poliamidă (cui)",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://plastdu.ro/contact?produs=dibluri-plastic",
    seller: {
      "@type": "Organization",
      name: "Plast Du IV SRL",
    },
  },
};

/* ─── Data ───────────────────────────────────────────────────────────────── */
const VARIANTE = [
  { cod: "10x70", diametru: "Ø10mm", lungime: "70mm", adancime: "45mm", zona: "Standard" },
  { cod: "10x90", diametru: "Ø10mm", lungime: "90mm", adancime: "55mm", zona: "Standard" },
  { cod: "10x120", diametru: "Ø10mm", lungime: "120mm", adancime: "75mm", zona: "Standard" },
  { cod: "10x140", diametru: "Ø10mm", lungime: "140mm", adancime: "90mm", zona: "Standard" },
  { cod: "10x160", diametru: "Ø10mm", lungime: "160mm", adancime: "105mm", zona: "Standard" },
  { cod: "10x180", diametru: "Ø10mm", lungime: "180mm", adancime: "120mm", zona: "Standard" },
  { cod: "10x200", diametru: "Ø10mm", lungime: "200mm", adancime: "135mm", zona: "Standard" },
  { cod: "10x180ZM", diametru: "Ø10mm", lungime: "180mm", adancime: "120mm", zona: "Zonă Mare" },
  { cod: "10x220ZM", diametru: "Ø10mm", lungime: "220mm", adancime: "150mm", zona: "Zonă Mare" },
  { cod: "10x240ZM", diametru: "Ø10mm", lungime: "240mm", adancime: "165mm", zona: "Zonă Mare" },
  { cod: "10x260ZM", diametru: "Ø10mm", lungime: "260mm", adancime: "180mm", zona: "Zonă Mare" },
];

const APLICATII = [
  {
    titlu: "Sisteme ETICS (fațade termoizolate)",
    descriere:
      "Fixarea plăcilor de polistiren expandat (EPS) pe fațade în cadrul sistemelor ETICS. " +
      "Cuiul din poliamidă elimină punțile termice, menținând performanța anvelopei termice.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    titlu: "Cărămidă plină și BCA",
    descriere:
      "Ancorare sigură în suporturi din cărămidă masivă și blocuri BCA. " +
      "Expansiunea controlată a corpului PP asigură prindere solidă fără fisurarea suportului.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    titlu: "Structuri din beton",
    descriere:
      "Performanță ridicată de extragere în pereți și plafoane din beton monolit sau prefabricat. " +
      "Dimensiunile ZM sunt recomandate pentru zidărie cu goluri și straturi de tencuială groase.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    titlu: "Izolație termică suplimentară",
    descriere:
      "Potrivit pentru reabilitarea termică a blocurilor și clădirilor cu structură veche. " +
      "Variantele lungi (180–200mm) acoperă straturi groase de izolație cu prindere profundă în suport.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      </svg>
    ),
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function DiblurPlasticPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Header />
      <main>
        {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
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

        {/* ── Hero produs ──────────────────────────────────────────────────── */}
        <section className="bg-white section-padding">
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Imagine */}
              <div className="relative w-full aspect-square max-w-lg mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100 border border-neutral-border">
                <Image
                  src="/images/produse/diblu-plastic.jpg"
                  alt="Diblu Cui Plastic Poliamidă — Plast Du IV"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center text-slate-200 text-8xl select-none pointer-events-none"
                  aria-hidden="true">
                  {/* Fallback vizual dacă imaginea lipsește */}
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-brand-accent/10 text-brand-accent text-xs font-semibold px-3 py-1 rounded-full">
                    Produs propriu
                  </span>
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                    Dibluri termoizolante
                  </span>
                </div>
                <h1 className="mb-4">Dibluri Cui Plastic (Poliamidă)</h1>
                <p className="text-lg text-slate-600 mb-6">
                  Diblu termoizolant cu cui din poliamidă, proiectat pentru fixarea
                  termoizolațiilor din polistiren (EPS) pe fațade în sisteme ETICS.
                  Corpul din polipropilenă asigură rezistență mecanică, iar cuiul din PA
                  elimină complet punțile termice.
                </p>

                {/* Specificatii rapide */}
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

                {/* CTA */}
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

        {/* ── Specificatii tehnice ─────────────────────────────────────────── */}
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

        {/* ── Variante disponibile ─────────────────────────────────────────── */}
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
                    <th className="text-left px-5 py-3.5 font-semibold">Diametru corp</th>
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
                        <span className="font-mono font-semibold text-brand-blue bg-brand-blue/5 px-2 py-0.5 rounded">
                          {v.cod}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">{v.diametru}</td>
                      <td className="px-5 py-3.5 text-slate-600">{v.lungime}</td>
                      <td className="px-5 py-3.5 text-slate-600">{v.adancime}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          v.zona === "Zonă Mare"
                            ? "bg-brand-accent/10 text-brand-accent"
                            : "bg-slate-100 text-slate-600"
                        }`}>
                          {v.zona}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">100 buc</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-400 mt-4">
              * Adâncimea de ancoraj este orientativă și depinde de tipul suportului și grosimea stratului de izolație.
              Consultați fișa tehnică sau contactați-ne pentru recomandări specifice proiectului.
            </p>
          </div>
        </section>

        {/* ── Aplicatii recomandate ────────────────────────────────────────── */}
        <section className="section-padding bg-neutral-surface">
          <div className="container-site">
            <p className="section-label">Domenii de utilizare</p>
            <h2 className="mb-3">Aplicații recomandate</h2>
            <p className="text-slate-500 mb-10 max-w-xl">
              Diblurile cu cui din poliamidă sunt soluția standard în proiectele de reabilitare
              termică și construcție nouă care implică sisteme ETICS.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {APLICATII.map((ap) => (
                <div key={ap.titlu} className="card">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">
                    {ap.icon}
                  </div>
                  <h3 className="text-base mb-2">{ap.titlu}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{ap.descriere}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ───────────────────────────────────────────────────── */}
        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site">
            <div className="max-w-2xl">
              <p className="text-brand-accent font-semibold text-sm uppercase tracking-widest mb-3">
                Solicitați ofertă
              </p>
              <h2 className="text-white mb-4">
                Aveți nevoie de dibluri cu cui plastic pentru proiectul dvs.?
              </h2>
              <p className="text-blue-100 mb-8">
                Lucrăm direct cu firme de construcții, antreprenori generali și depozite de materiale.
                Ofertăm prețuri competitive pentru comenzi în volum, cu livrare în toată România.
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
