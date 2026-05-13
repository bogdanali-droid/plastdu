import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Despre Noi — Plast Du IV SRL",
  description:
    "Plast Du IV SRL — producător român de dibluri și flanșe pentru construcții din 2017, Jilava, Ilfov.",
  alternates: { canonical: "https://plastdu.ro/despre-noi" },
};

const CIFRE = [
  { val: "2017", label: "An înființare" },
  { val: "8+", label: "Județe deservite" },
  { val: "4", label: "Linii de producție" },
  { val: "B2B", label: "Focus exclusiv" },
];

const SPECIALIZARI = [
  "Producția de dibluri pentru polistiren (sisteme de termoizolație exterioară)",
  "Producția de dibluri pentru vată minerală",
  "Producția de distanțieri pentru beton",
  "Distribuția de materiale de construcții și organe de asamblare",
];

export default function DespreNoiPage() {
  return (
    <>
      <Header />
      <main>
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

        <section className="section-padding bg-white">
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="section-label mb-3">Povestea noastră</p>
                <h2 className="mb-6">Producție proprie, calitate controlată</h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>Plast Du IV SRL este o companie românească înființată în anul 2017, care a luat naștere din dorința de a oferi clienților un pachet complet de produse și servicii din domeniul materialelor plastice dedicate industriei construcțiilor.</p>
                  <p>Oferim soluții complete și de calitate pentru diverse proiecte din domeniul construcțiilor de asamblare, cu un focus special pe sisteme de termoizolație exterioară și reabilitare termică a clădirilor.</p>
                  <p>Ne adresăm întregului lanț de aprovizionare din industria construcțiilor — de la subdistribuitori locali, depozite și retaileri, până la companii de construcții și utilizatori industriali.</p>
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
                  <Image src="/images/fabrica/01.jpg" alt="Fabrică Plast Du IV" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100 img-watermark">
                  <Image src="/images/fabrica/04.jpg" alt="Producție dibluri" fill className="object-cover" sizes="25vw" />
                </div>
                <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100 img-watermark">
                  <Image src="/images/fabrica/05.jpg" alt="Matriță producție" fill className="object-cover" sizes="25vw" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-neutral-surface">
          <div className="container-site">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
              <div className="bg-white rounded-2xl p-6 border border-neutral-border shadow-card">
                <h3 className="text-base mb-3">Misiunea noastră</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Să devenim partenerul de încredere pentru toți cei implicați în industria construcțiilor, oferind produse de înaltă calitate, soluții inovatoare și servicii adaptate nevoilor clienților.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-neutral-border shadow-card">
                <h3 className="text-base mb-3">Viziunea noastră</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Să redefenim standardele industriei construcțiilor prin inovație, sustenabilitate și relații de parteneriat solide. Dorim să fim recunoscuți ca lideri în furnizarea de soluții plastice pentru construcții.</p>
              </div>
            </div>
          </div>
        </section>

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
                    <a href="tel:+40724658491" className="block font-semibold text-brand-blue hover:text-brand-accent transition-colors">0724 658 491</a>
                    <a href="tel:+40728211578" className="block font-semibold text-brand-blue hover:text-brand-accent transition-colors">0728 211 578</a>
                    <a href="mailto:office@plastdu.ro" className="block font-semibold text-brand-blue hover:text-brand-accent transition-colors">office@plastdu.ro</a>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-neutral-border shadow-card">
                <p className="text-sm font-semibold text-brand-blue mb-4">Program de lucru</p>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between"><span>Luni — Vineri</span><span className="font-medium text-slate-800">08:00 — 18:00</span></div>
                  <div className="flex justify-between"><span>Sâmbătă</span><span className="font-medium text-slate-800">08:00 — 14:00</span></div>
                  <div className="flex justify-between"><span>Duminică</span><span className="font-medium text-slate-500">Închis</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Construiți cu noi</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">Contactați-ne pentru o ofertă personalizată sau pentru a discuta despre un parteneriat de lungă durată.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors">Solicitați ofertă</Link>
              <Link href="/produse" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">Vezi produsele</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
