export const runtime = 'edge';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorDibluri from '@/components/CalculatorDibluri';

export const metadata: Metadata = {
  title: 'Calculator dibluri termosistem — câte bucăți pe m² ai nevoie',
  description:
    'Calculator online gratuit: află câte dibluri ți flanșe ai nevoie pentru fațada ta pe baza suprafeței m², înălțime ți zonele de colț. Formulă conform normativ termoizolație.',
  alternates: { canonical: 'https://plastdu.ro/calculator-dibluri' },
  openGraph: {
    title: 'Calculator dibluri termosistem — Plast Du IV',
    description: 'Calculează numărul de dibluri necesare pentru termoizolația fațadei.',
    url: 'https://plastdu.ro/calculator-dibluri',
  },
};

const FAQ = [
  {
    q: 'Cum se calculează numărul de dibluri pe m²?',
    a: 'Formula standard: 6 dibluri/m² pe câmp curent (sub 8m înălțime) + 8-10 dibluri/m² în zonele de colț și soclu. Pentru clădiri peste 8m densitatea crește la 10-12 dibluri/m². Se adaugă 5% rezervă pentru șantier.',
  },
  {
    q: 'De ce am nevoie de mai multe dibluri la colțuri?',
    a: 'La colțurile clădirii, forța de smulgere dată de vânt e semnificativ mai mare decât în câmp curent. Densitatea mai mare compensează și previne desprinderea locală a stratului termoizolant în timp.',
  },
  {
    q: 'Trebuie flanșă la fiecare diblu?',
    a: 'Pentru vata minerală e obligatorie flanșa distribuție Ø120-140mm. Pentru polistiren EPS, flanșa nu e obligatorie dar recomandată la panouri mai groase de 10cm pentru distribuția uniformă a forței de fixare.',
  },
  {
    q: 'Câtă rezervă să comand pentru șantier?',
    a: 'Minim 5%, ideal 8-10%. Rezerva acoperă dibluri deteriorate la montaj, ajustări în zone atipice și pierderi de șantier. Comanda mai mare în prima fază evită opriri costisitoare pentru reaprovizionare.',
  },
  {
    q: 'Calculul e valid pentru orice tip de fațadă?',
    a: 'Formula e valabilă pentru sistemele standard de termoizolație exterioară pe zidărie sau beton. Pentru fațade ventilate, structuri metalice sau solucții speciale (fațade curbe, atipice) densitatea se stabilește prin proiect tehnic dedicat.',
  },
];

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://plastdu.ro' },
    { '@type': 'ListItem', position: 2, name: 'Calculator dibluri', item: 'https://plastdu.ro/calculator-dibluri' },
  ],
};

export default function CalculatorDibluriPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <Header />
      <main>
        <section className="bg-brand-blue text-white section-padding">
          <div className="container-site">
            <p className="section-label !text-brand-accent/80 mb-3">Tool interactiv</p>
            <h1 className="text-display-lg text-white mb-4">Calculator dibluri termosistem</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Introdu suprafața fațadei, înălțimea clădirii și procentul zonelor de colț — afli în real-time
              câte dibluri și flanșe ai nevoie pentru comandă. Formulă conform normativelor RO de termoizolație.
            </p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-site max-w-4xl">
            <CalculatorDibluri />
          </div>
        </section>

        <section className="section-padding bg-neutral-surface">
          <div className="container-site max-w-3xl">
            <p className="section-label mb-3">Cum funcționează</p>
            <h2 className="mb-6">Formulă și tabel densități</h2>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>Calculatorul folosește formula standard pentru sistemele de termoizolație exterioară pe zidărie sau beton, conform practicii uzuale a proiectanților din România:</p>
              <div className="overflow-x-auto rounded-xl border border-neutral-border bg-white">
                <table className="w-full text-sm">
                  <thead className="bg-brand-blue text-white">
                    <tr>
                      <th className="text-left px-4 py-3">Zonă</th>
                      <th className="text-left px-4 py-3">Sub 8m</th>
                      <th className="text-left px-4 py-3">Peste 8m</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-border">
                    <tr><td className="px-4 py-3 font-medium">Câmp curent</td><td className="px-4 py-3">6 buc/m²</td><td className="px-4 py-3">10 buc/m²</td></tr>
                    <tr><td className="px-4 py-3 font-medium">Colț + soclu</td><td className="px-4 py-3">8 buc/m²</td><td className="px-4 py-3">12 buc/m²</td></tr>
                  </tbody>
                </table>
              </div>
              <p>Densitatea finală se validează în proiectul tehnic în funcție de zona climatică, expunerea la vânt și solicitările specifice clădirii. Pentru fațade ventilate sau construcții atipice, contactați echipa tehnică pentru dimensionare custom.</p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-site max-w-3xl">
            <p className="section-label mb-3">Întrebări frecvente</p>
            <h2 className="mb-8">FAQ calculator dibluri</h2>
            <div className="space-y-4">
              {FAQ.map((f) => (
                <details key={f.q} className="card group bg-neutral-surface">
                  <summary className="cursor-pointer font-semibold text-slate-800 list-none flex items-center justify-between gap-4">
                    {f.q}
                    <span className="text-brand-accent group-open:rotate-45 transition-transform text-xl leading-none flex-shrink-0">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Gata să comanzi?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">Trimite-ne rezultatul calculului și primesti ofertă personalizată în 30 minute.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors">
              Cere ofertă
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
