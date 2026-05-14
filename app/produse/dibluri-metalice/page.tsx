import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalerieProduseClient from "@/components/GalerieProduseClient";

export const metadata: Metadata = {
  title: "Dibluri Cui Metalic Zincat — Fixare Polistiren și Vată Minerală",
  description:
    "Dibluri cu cui din oțel zincat Ø5.5mm, corp polipropilenă Ø10mm, rozetă Ø55mm. " +
    "Compatibile cu polistiren și vată minerală. Fabricate în România. Variante 10x120…10x260ZM.",
  keywords: [
    "dibluri metalice zincate",
    "diblu cui metalic",
    "fixare vata minerala",
    "diblu otel zincat",
    "dibluri ETICS metalice",
  ],
  alternates: { canonical: "https://plastdu.ro/produse/dibluri-metalice" },
  openGraph: {
    title: "Dibluri Cui Metalic Zincat | Plast Du IV",
    description:
      "Dibluri cu cui din oțel zincat pentru fixarea polistirenului și vatei minerale. Fabricate în România.",
    url: "https://plastdu.ro/produse/dibluri-metalice",
    images: [{ url: "/images/produse/dibluri-metalice/01.jpg", width: 1200, height: 630 }],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Diblu Cui Metalic Zincat — Plast Du IV",
  description:
    "Diblu cu cui din oțel zincat Ø5.5mm, corp polipropilenă Ø10mm, rozetă Ø55mm / 2mm. " +
    "Utilizat pentru fixarea polistirenului și vatei minerale pe fațade. " +
    "Compatibil cu cărămidă plină, cărămidă cu goluri (ZM), BCA și beton.",
  image: "https://plastdu.ro/images/produse/dibluri-metalice/01.jpg",
  brand: { "@type": "Brand", name: "Plast Du IV" },
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
  material: "Polipropilenă (corp) + Oțel zincat (cui)",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://plastdu.ro/contact?produs=dibluri-metalice",
    seller: { "@type": "Organization", name: "Plast Du IV SRL" },
  },
};

const VARIANTE = [
  { cod: "10x120", diametru: "Ø10mm", lungime: "120mm", adancime: "75mm", zona: "Standard", ambalare: "200 buc" },
  { cod: "10x140", diametru: "Ø10mm", lungime: "140mm", adancime: "90mm", zona: "Standard", ambalare: "200 buc" },
  { cod: "10x160", diametru: "Ø10mm", lungime: "160mm", adancime: "105mm", zona: "Standard", ambalare: "200 buc" },
  { cod: "10x180", diametru: "Ø10mm", lungime: "180mm", adancime: "120mm", zona: "Standard", ambalare: "200 buc" },
  { cod: "10x200", diametru: "Ø10mm", lungime: "200mm", adancime: "135mm", zona: "Standard", ambalare: "100 buc" },
  { cod: "10x180ZM", diametru: "Ø10mm", lungime: "180mm", adancime: "120mm", zona: "Zonă Mare", ambalare: "100 buc" },
  { cod: "10x220ZM", diametru: "Ø10mm", lungime: "220mm", adancime: "150mm", zona: "Zonă Mare", ambalare: "100 buc" },
  { cod: "10x240ZM", diametru: "Ø10mm", lungime: "240mm", adancime: "165mm", zona: "Zonă Mare", ambalare: "100 buc" },
  { cod: "10x260ZM", diametru: "Ø10mm", lungime: "260mm", adancime: "180mm", zona: "Zonă Mare", ambalare: "100 buc" },
];

const AVANTAJE = [
  {
    titlu: "Rezistență mecanică superioară",
    descriere:
      "Cuiul din oțel zincat oferă rezistență la extragere semnificativ mai mare față de variantele plastic. " +
      "Recomandat pentru zone cu solicitări dinamice (vânt, vibrații).",
  },
  {
    titlu: "Compatibil cu vată minerală",
    descriere:
      "Singura variantă recomandată atunci când stratul izolator este din vată minerală. " +
      "Rigiditatea cuiului metalic previne deformarea plăcilor fibroase.",
  },
  {
    titlu: "Protecție anticorozivă",
    descriere:
      "Zincarea electrochimică a cuiului protejează împotriva coroziunii în condiții de umiditate, " +
      "condensare și expunere la alcalinitatea adezivului.",
  },
  {
    titlu: "Cărămidă cu goluri (ZM)",
    descriere:
      "Versiunile Zonă Mare sunt proiectate special pentru zidărie cu goluri, unde ancorele standard " +
      "nu realizează prindere suficientă. Corpul extins traversează zona goală și se expandează în perete solid.",
  },
];

const APLICATII = [
  {
    titlu: "Sisteme ETICS cu vată minerală",
    descriere:
      "Fixarea plăcilor de vată minerală (lamelă sau standard) pe fațade ETICS. " +
      "Cuiul metalic traversează vata fără a o comprima sau deplasa, menținând grosimea nominală.",
    icon: "🏗️",
  },
  {
    titlu: "Polistiren pe suporturi dure",
    descriere:
      "Aplicații pe beton armat, zidărie din cărămidă plină și BCA unde se necesită prindere " +
      "cu forță de extragere ridicată, de ex. fațade înalte sau zone expuse la vânt.",
    icon: "🧱",
  },
  {
    titlu: "Cărămidă cu goluri — ZM",
    descriere:
      "Zidărie cu cărămidă cu goluri verticale sau orizontale. Variantele ZM depășesc zona de gol " +
      "și asigură ancorare în zona solidă a cărămizii.",
    icon: "⬛",
  },
  {
    titlu: "Reabilitare termică clădiri",
    descriere:
      "Proiecte de eficiență energetică la clădiri existente unde stratul de tencuială veche " +
      "necesită dibluri de lungime mai mare (160–260mm).",
    icon: "🔧",
  },
];

const IMAGINI = [
  "/images/produse/dibluri-metalice/01.jpg",
  "/images/produse/dibluri-metalice/02.jpg",
  "/images/produse/dibluri-metalice/03.jpg",
];

export default function DiblurMetalicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Header />
      <main>
        <div className="bg-neutral-surface border-b border-neutral-border">
          <div className="container-site py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-brand-blue transition-colors">Acasă</Link>
              <span>/</span>
              <Link href="/produse" className="hover:text-brand-blue transition-colors">Produse</Link>
              <span>/</span>
              <span className="text-slate-800 font-medium">Dibluri Cui Metalic Zincat</span>
            </nav>
          </div>
        </div>

        <section className="bg-white section-padding">
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <GalerieProduseClient imagini={IMAGINI} alt="Diblu Cui Metalic Zincat — Plast Du IV" />

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-brand-accent/10 text-brand-accent text-xs font-semibold px-3 py-1 rounded-full">
                    Produs propriu
                  </span>
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                    Dibluri cu cui metalic
                  </span>
                </div>
                <h1 className="mb-4">Dibluri Cui Metalic Zincat</h1>
                <p className="text-lg text-slate-600 mb-6">
                  Diblu cu cui din oțel zincat — soluția de înaltă rezistență pentru fixarea
                  polistirenului <strong>și</strong> a vatei minerale pe fațade. Forță de extragere
                  superioară, protecție anticorozivă și compatibilitate extinsă cu toate tipurile de suport.
                </p>

                <dl className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { label: "Material corp", value: "Polipropilenă (PP)" },
                    { label: "Material cui", value: "Oțel zincat Ø5.5mm" },
                    { label: "Diametru corp", value: "Ø10mm" },
                    { label: "Diametru rozetă", value: "Ø55mm / 2mm grosime" },
                    { label: "Suport compatibil", value: "Cărămidă, BCA, Beton, Cărăm. cu goluri (ZM)" },
                    { label: "Livrare", value: "200 buc/cutie (120–180mm) · 100 buc (200–260mm)" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-neutral-surface rounded-xl p-3 border border-neutral-border">
                      <dt className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-0.5">{label}</dt>
                      <dd className="text-sm font-semibold text-brand-blue">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact?produs=dibluri-metalice"
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

        <section className="section-padding bg-neutral-surface">
          <div className="container-site">
            <p className="section-label">De ce oțel zincat?</p>
            <h2 className="mb-10">Avantaje față de variantele plastic</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {AVANTAJE.map((av) => (
                <div key={av.titlu} className="card flex gap-4">
                  <div className="w-2 bg-brand-accent rounded-full flex-shrink-0 self-stretch" />
                  <div>
                    <h3 className="text-base mb-2">{av.titlu}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{av.descriere}</p>
                  </div>
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
                  <thead>
                    <tr className="bg-brand-blue text-white">
                      <th className="text-left px-5 py-3.5 font-semibold">Parametru</th>
                      <th className="text-left px-5 py-3.5 font-semibold">Valoare</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-border">
                    {[
                      ["Material corp", "Polipropilenă (PP) — rezistentă UV, anti-îmbătrânire"],
                      ["Material cui", "Oțel zincat electrolitic — protecție coroziune clasa C3"],
                      ["Diametru cui", "Ø5.5mm"],
                      ["Diametru corp / gaură de montaj", "Ø10mm"],
                      ["Diametru rozetă", "Ø55mm"],
                      ["Grosime rozetă", "2mm"],
                      ["Lungimi disponibile (standard)", "120 / 140 / 160 / 180 / 200mm"],
                      ["Lungimi zonă mare (ZM)", "180 / 220 / 240 / 260mm"],
                      ["Suporturi compatibile standard", "Cărămidă plină, BCA, Beton"],
                      ["Suporturi compatibile ZM", "Cărămidă cu goluri verticale/orizontale"],
                      ["Materiale izolante compatibile", "Polistiren expandat (EPS), Vată minerală (MW)"],
                      ["Temperatură de utilizare", "-40°C … +80°C"],
                      ["Culoare", "Gri (corp) / Argintiu (cui zincat)"],
                      ["Ambalare 120–180mm", "200 buc / cutie"],
                      ["Ambalare 200–260mm", "100 buc / cutie"],
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

        <section className="section-padding bg-neutral-surface">
          <div className="container-site">
            <p className="section-label">Gamă completă</p>
            <h2 className="mb-3">Variante disponibile</h2>
            <p className="text-slate-500 mb-8 max-w-xl">
              Variantele <strong>ZM (Zonă Mare)</strong> sunt obligatorii pentru zidărie cu cărămidă cu goluri.
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
                        <span className="font-mono font-semibold text-brand-blue bg-brand-blue/5 px-2 py-0.5 rounded">{v.cod}</span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">{v.diametru}</td>
                      <td className="px-5 py-3.5 text-slate-600">{v.lungime}</td>
                      <td className="px-5 py-3.5 text-slate-600">{v.adancime}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          v.zona === "Zonă Mare" ? "bg-brand-accent/10 text-brand-accent" : "bg-slate-100 text-slate-600"
                        }`}>{v.zona}</span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">{v.ambalare}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-site">
            <p className="section-label">Domenii de utilizare</p>
            <h2 className="mb-10">Aplicații recomandate</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {APLICATII.map((ap) => (
                <div key={ap.titlu} className="card">
                  <div className="text-3xl mb-4" aria-hidden="true">{ap.icon}</div>
                  <h3 className="text-base mb-2">{ap.titlu}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{ap.descriere}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-neutral-surface">
          <div className="container-site">
            <p className="section-label">Alegerea corectă</p>
            <h2 className="mb-8">Plastic vs. Metalic — când să alegeți fiecare variantă</h2>
            <div className="bg-white rounded-2xl border border-neutral-border shadow-card overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-blue text-white">
                    <th className="text-left px-5 py-4 font-semibold">Criteriu</th>
                    <th className="text-center px-5 py-4 font-semibold">Cui Plastic (PA)</th>
                    <th className="text-center px-5 py-4 font-semibold">Cui Metalic Zincat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-border">
                  {[
                    ["Tip izolant", "Polistiren (EPS)", "Polistiren + Vată minerală"],
                    ["Punte termică", "Nulă — recomandat pasiv", "Minimă — oțel zincat"],
                    ["Forță extragere", "Standard", "Ridicată"],
                    ["Cărămidă cu goluri", "Nu (standard)", "Da (versiune ZM)"],
                    ["Cost unitar", "Mai redus", "Superior"],
                    ["Recomandare principală", "ETICS standard, eficiență termică maximă", "Vată minerală, zone cu solicitări mari"],
                  ].map(([criteriu, plastic, metalic], i) => (
                    <tr key={criteriu} className={i % 2 === 0 ? "bg-white" : "bg-neutral-surface/50"}>
                      <td className="px-5 py-3.5 font-medium text-slate-700">{criteriu}</td>
                      <td className="px-5 py-3.5 text-center text-slate-600">
                        <Link href="/produse/dibluri-plastic" className="hover:text-brand-blue underline underline-offset-2">{plastic}</Link>
                      </td>
                      <td className="px-5 py-3.5 text-center font-semibold text-brand-blue">{metalic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site">
            <div className="max-w-2xl">
              <p className="text-brand-accent font-semibold text-sm uppercase tracking-widest mb-3">Solicitați ofertă</p>
              <h2 className="text-white mb-4">Aveți nevoie de dibluri cu cui metalic pentru proiectul dvs.?</h2>
              <p className="text-blue-100 mb-8">
                Oferăm prețuri competitive pentru comenzi în volum — direct producător,
                cu livrare la depozit sau șantier în toată România.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact?produs=dibluri-metalice"
                  className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors shadow-sm"
                >
                  Solicitați ofertă pentru acest produs
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/produse"
                  className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Toate produsele
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
