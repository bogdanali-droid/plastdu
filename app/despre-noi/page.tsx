import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Despre Noi — Plast Du IV SRL",
  description:
    "Plast Du IV SRL — producător român de dibluri și flanșe pentru construcții din 2017, Jilava, Ilfov. " +
    "Aflați mai multe despre misiunea, valorile și echipa noastră.",
  alternates: { canonical: "https://plastdu.ro/despre-noi" },
};

const CIFRE = [
  { val: "2017", label: "An înființare" },
  { val: "8+", label: "Județe deservite" },
  { val: "5", label: "Linii de producție" },
  { val: "B2B", label: "Focus exclusiv" },
];

const SPECIALIZARI = [
  "Producția de dibluri pentru polistiren (sisteme de termoizolație exterioară)",
  "Producția de dibluri pentru vată minerală",
  "Producția de distanțieri pentru beton",
  "Distribuția de materiale de construcții și organe de asamblare",
];

const CLIENTI = [
  {
    categorie: "Constructori",
    descriere:
      "Parteneriate solide cu firme de construcții și reabilitări termice din toată țara.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    categorie: "Distribuitori",
    descriere:
      "Aprovizionăm distribuitori în județele: București, Ilfov, Dolj, Argeș, Vâlcea, Prahova, Dâmbovița, Cluj.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    categorie: "Depozite & Magazine",
    descriere:
      "Aprovizionăm depozite și magazine în: București, Ilfov, Dolj, Gorj, Argeș, Vâlcea, Prahova, Dâmbovița, Brașov, Teleorman.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
      </svg>
    ),
  },
];

export default function DespreNoiPage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="bg-brand-blue text-white section-padding">
          <div className="container-site">
            <p className="section-label !text-brand-accent/80 mb-3">Cine suntem</p>
            <h1 className="text-display-lg text-white mb-4">Despre Plast Du IV</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Companie românească înființată în 2017, specializată în producția și distribuția
              de elemente de fixare pentru industria construcțiilor.
              Fabricăm la Jilava, Ilfov și livrăm în toată țara.
            </p>
          </div>
        </section>

        {/* ── Cifre cheie ── */}
        <section className="bg-white border-b border-neutral-border py-10">
          <div className="container-site">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {CIFRE.map((c) => (
                <div key={c.label} className="text-center">
                  <p className="text-3xl font-bold text-brand-blue mb-1">{c.val}</p>
                  <p className="text-sm text-slate-500">{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Cine suntem ── */}
        <section className="section-padding bg-white">
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="section-label mb-3">Povestea noastră</p>
                <h2 className="mb-6">Producție proprie, calitate controlată</h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    Plast Du IV SRL este o companie românească înființată în anul 2017, care a luat
                    naștere din dorința de a oferi clienților un pachet complet de produse și servicii
                    din domeniul materialelor plastice dedicate industriei construcțiilor.
                  </p>
                  <p>
                    Oferim soluții complete și de calitate pentru diverse proiecte din domeniul
                    construcțiilor de asamblare, cu un focus special pe sisteme de termoizolație
                    exterioară  și reabilitare termică a clădirilor.
                  </p>
                  <p>
                    Ne adresăm întregului lanț de aprovizionare din industria construcțiilor — de la
                    subdistribuitori locali, depozite și retaileri, până la companii de construcții
                    și utilizatori industriali.
                  </p>
                </div>

                <div className="mt-8">
                  <p className="text-sm font-semibold text-brand-blue mb-4">Suntem specializați în:</p>
                  <ul className="space-y-2">
                    {SPECIALIZARI.map((s) => (
                      <li key={s} className="flex items-start gap-3 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0 mt-2" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 relative h-56 rounded-2xl overflow-hidden bg-slate-100 img-watermark">
                  <Image
                    src="/images/fabrica/01.jpg"
                    alt="Fabrică Plast Du IV — Jilava, Ilfov"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100 img-watermark">
                  <Image
                    src="/images/fabrica/04.jpg"
                    alt="Producție dibluri Plast Du IV"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
                <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100 img-watermark">
                  <Image
                    src="/images/fabrica/05.jpg"
                    alt="Matriță producție Plast Du IV"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Misiune & Viziune ── */}
        <section className="section-padding bg-neutral-surface">
          <div className="container-site">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
              <div className="bg-white rounded-2xl p-6 border border-neutral-border shadow-card">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="text-base mb-3">Misiunea noastră</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Să devenim partenerul de încredere pentru toți cei implicați în industria
                  construcțiilor, oferind produse de înaltă calitate, soluții inovatoare și servicii
                  adaptate nevoilor clienților. Prin profesionalism și promptitudine, contribuim la
                  dezvoltarea unor proiecte durabile și eficiente.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-neutral-border shadow-card">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-base mb-3">Viziunea noastră</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Să redefinim standardele industriei construcțiilor prin inovație, sustenabilitate
                  și relații de parteneriat solide. Dorim să fim recunoscuți ca lideri în furnizarea
                  de soluții de elemente plastice pentru construcții și reabilitări.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Clienți ── */}
        <section className="section-padding bg-white">
          <div className="container-site">
            <p className="section-label mb-3">Cui ne adresăm</p>
            <h2 className="mb-8">Partenerii noștri</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {CLIENTI.map((c) => (
                <div key={c.categorie} className="card">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">
                    {c.icon}
                  </div>
                  <h3 className="text-base mb-2">{c.categorie}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{c.descriere}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Locație ── */}
        <section className="section-padding bg-neutral-surface">
          <div className="container-site">
            <div className="grid md:grid-cols-2 gap-10 items-start max-w-4xl">
              <div>
                <p className="section-label mb-3">Unde ne găsiți</p>
                <h2 className="mb-6">Sediu și fabrică</h2>
                <div className="space-y-4 text-sm text-slate-600">
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">Sediu & Depozit</p>
                    <p>Str. Ana Ipătescu nr. 44, Spațiul B2</p>
                    <p>Com. Jilava, Ilfov</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">Fabrică</p>
                    <p>Str. Ana Ipătescu nr. 44, Spațiul I4</p>
                    <p>Com. Jilava, Ilfov</p>
                  </div>
                  <div className="pt-2">
                    <a href="tel:+40724658491" className="block font-semibold text-brand-blue hover:text-brand-accent transition-colors">
                      0724 658 491
                    </a>
                    <a href="tel:+40728211578" className="block font-semibold text-brand-blue hover:text-brand-accent transition-colors">
                      0728 211 578
                    </a>
                    <a href="mailto:office@plastdu.ro" className="block font-semibold text-brand-blue hover:text-brand-accent transition-colors">
                      office@plastdu.ro
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-neutral-border shadow-card">
                <p className="text-sm font-semibold text-brand-blue mb-4">Program de lucru</p>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Luni — Vineri</span>
                    <span className="font-medium text-slate-800">08:00 — 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sâmbătă</span>
                    <span className="font-medium text-slate-500">Închis</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duminică</span>
                    <span className="font-medium text-slate-500">Închis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Construiți cu noi</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Contactați-ne pentru o ofertă personalizată sau pentru a discuta despre un
              parteneriat de lungă durată.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors"
              >
                Solicitați ofertă
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/produse"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
              >
                Vezi produsele
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
