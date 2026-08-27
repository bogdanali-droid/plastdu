export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageWithFallback from '@/components/ImageWithFallback';

export const metadata: Metadata = {
  title: 'Reabilitare termică blocuri — Materiale și dibluri pentru proiecte edilitare | Plast Du IV',
  description:
    'Furnizor de dibluri și flanșe pentru reabilitarea termică a blocurilor. Necesar de materiale ' +
    'per m² fațadă, sisteme EPS vs vată minerală, condiții pentru licitații publice.',
  alternates: { canonical: 'https://plastdu.ro/aplicatii/reabilitare-blocuri' },
  openGraph: {
    title: 'Reabilitare termică blocuri | Plast Du IV',
    description: 'Materiale și dibluri pentru proiecte de reabilitare termică edilitară.',
    url: 'https://plastdu.ro/aplicatii/reabilitare-blocuri',
  },
};

type Produs = { slug: string; titlu: string; categorie: string; imagine: string; descriere: string };
type Proiect = { id: number; name: string; district: string; year: number; photo: string; imagini?: string[] };

const DEFAULT_PRODUSE: Produs[] = [
  { slug: 'dibluri-plastic', titlu: 'Dibluri Cui Plastic (Poliamidă)', categorie: 'Dibluri', imagine: '/images/produse/dibluri-plastic/01.jpg', descriere: 'Diblu termoizolant standard pentru fixarea EPS pe fațadele blocurilor.' },
  { slug: 'dibluri-metalice', titlu: 'Dibluri Cui Metalic Zincat', categorie: 'Dibluri', imagine: '/images/produse/dibluri-metalice/01.jpg', descriere: 'Diblu cu rezistență mecanică sporită, recomandat pentru vată minerală și clădiri înalte.' },
  { slug: 'flansa-vata', titlu: 'Flanșă Vată Minerală', categorie: 'Flanșe', imagine: '/images/produse/flansa-vata/01.jpg', descriere: 'Flanșă cu rozetă extinsă pentru distribuția forței de prindere pe vată minerală.' },
  { slug: 'flansa-osb', titlu: 'Flanșă OSB / Capac (TSF-F55)', categorie: 'Flanșe', imagine: '/images/produse/flansa-osb/01.jpg', descriere: 'Flanșă cu capac snap-on pentru finisaj curat pe fațadele reabilitate.' },
];

const DEFAULT_PROIECTE: Proiect[] = [
  { id: 1, name: 'Reabilitare termică — Str. Baicului', district: 'Sector 2 – Str. Baicului', year: 2026, photo: '/images/proiecte/baicului/01.jpg' },
  { id: 2, name: 'Reabilitare bloc — Buhuși', district: 'Buhuși, Bacău', year: 2026, photo: '/images/proiecte/buhusi/01.jpg' },
  { id: 3, name: 'Reabilitare termică — Str. Octavian Goga', district: 'Sector 3 – Str. Octavian Goga', year: 2026, photo: '/images/proiecte/octavian-goga/01.jpg' },
];

const FAQ = [
  {
    q: 'Ce materiale sunt necesare pentru reabilitarea termică a unui bloc?',
    a: 'Pentru reabilitarea termică sunt necesare plăci termoizolante (EPS sau vată minerală), adeziv de lipire și șpaclu, dibluri și flanșe pentru fixare mecanică, plasă din fibră de sticlă pentru armare și materiale de finisaj — tencuială decorativă și vopsea.',
  },
  {
    q: 'Câte dibluri sunt necesare pentru un bloc de 4 etaje?',
    a: 'Consumul se calculează la 6 dibluri/m² pe câmpul curent și 8–10 dibluri/m² la colțuri și socluri. Pentru un bloc de 4 etaje, cu o suprafață de fațadă de aproximativ 800–1000m², necesarul este de regulă între 5.500 și 7.000 de dibluri, în funcție de geometria clădirii.',
  },
  {
    q: 'Putem furniza materiale direct pentru licitații publice de primărie?',
    a: 'Da, livrăm direct către primării, asociații de proprietari și constructori contractați în cadrul programelor de reabilitare edilitară, cu facturare pe firmă, termene de livrare programate și documentație tehnică pentru dosarul de licitație.',
  },
  {
    q: 'Ce diferență de consum de dibluri există între EPS și vată minerală?',
    a: 'Densitatea de fixare (dibluri/m²) este similară pentru ambele sisteme, însă la vată minerală se folosesc flanșe cu rozetă mai mare, iar diblul recomandat este de regulă cel cu cui metalic, pentru rezistență mecanică sporită.',
  },
  {
    q: 'Ce documente oferiți pentru licitații publice?',
    a: 'Punem la dispoziție fișe tehnice ale produselor, declarații de conformitate și certificările companiei (ISO 9001, ISO 14001, ISO 45001), necesare la depunerea documentației pentru achiziții publice.',
  },
];

export default async function ReabilitareBlocuriPage() {
  let produse = DEFAULT_PRODUSE;
  let proiecte: Proiect[] = DEFAULT_PROIECTE;

  try {
    const { env } = getRequestContext();
    const kv = (env as any).PLASTDU_CONTENT as KVNamespace | undefined;
    if (kv) {
      const storedProduse = await kv.get('produse');
      if (storedProduse) {
        const parsed = JSON.parse(storedProduse);
        const fabricate = (parsed.fabricate || []) as any[];
        const relevante = fabricate.filter((p) =>
          ['dibluri-plastic', 'dibluri-metalice', 'flansa-vata', 'flansa-osb'].includes(p.slug)
        );
        if (relevante.length) {
          produse = relevante.map((p) => ({
            slug: p.slug, titlu: p.titlu, categorie: p.categorie, imagine: p.imagine, descriere: p.descriere,
          }));
        }
      }
      const storedProiecte = await kv.get('proiecte');
      if (storedProiecte) {
        const parsed = JSON.parse(storedProiecte);
        if (Array.isArray(parsed) && parsed.length) proiecte = parsed.slice(0, 3);
      }
    }
  } catch {
    // fallback la valorile default
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://plastdu.ro/' },
      { '@type': 'ListItem', position: 2, name: 'Aplicații', item: 'https://plastdu.ro/aplicatii' },
      { '@type': 'ListItem', position: 3, name: 'Reabilitare termică blocuri', item: 'https://plastdu.ro/aplicatii/reabilitare-blocuri' },
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Header />
      <main>
        <section className="bg-neutral-surface border-b border-neutral-border">
          <div className="container-site py-3 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-brand-blue transition-colors">Acasă</Link>
            <span>/</span>
            <Link href="/aplicatii" className="hover:text-brand-blue transition-colors">Aplicații</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">Reabilitare termică blocuri</span>
          </div>
        </section>

        <section className="bg-brand-blue text-white section-padding">
          <div className="container-site">
            <p className="section-label !text-brand-accent/80 mb-3">Proiecte edilitare</p>
            <h1 className="text-display-lg text-white mb-4">
              Reabilitare termică blocuri — Materiale și dibluri pentru proiecte edilitare
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Furnizăm dibluri, flanșe și accesorii de fixare pentru proiecte de reabilitare termică a
              blocurilor, derulate de primării, asociații de proprietari și constructori.
            </p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Context</p>
            <h2 className="mb-6">Reabilitarea termică a blocurilor din România</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Un procent important din blocurile de locuințe construite înainte de 1990 nu
                îndeplinește standardele actuale de eficiență energetică. Programele naționale și
                locale de reabilitare termică, derulate prin primării și asociații de proprietari,
                finanțează izolarea fațadelor și modernizarea acestor clădiri.
              </p>
              <p>
                Ca furnizor de materiale de fixare pentru sistemele de termoizolație, livrăm dibluri și
                flanșe compatibile cu ambele soluții uzuale — EPS și vată minerală — direct către
                echipele de execuție implicate în aceste proiecte.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-neutral-surface">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Estimare consum</p>
            <h2 className="mb-6">Necesar de materiale per m² de fațadă</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Cantitatea de dibluri și flanșe necesară pentru un proiect de reabilitare termică
              depinde de suprafața fațadei, numărul de colțuri și înălțimea clădirii. Valorile de mai
              jos sunt orientative pentru estimarea unui deviz de materiale.
            </p>
            <div className="overflow-x-auto rounded-xl border border-neutral-border">
              <table className="w-full text-sm">
                <thead className="bg-brand-blue text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Material</th>
                    <th className="text-left px-4 py-3 font-semibold">Consum estimat / m²</th>
                    <th className="text-left px-4 py-3 font-semibold">Observații</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-border">
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-700">Dibluri (câmp curent)</td>
                    <td className="px-4 py-3 text-slate-600">6 buc/m²</td>
                    <td className="px-4 py-3 text-slate-500">Plastic sau metalic, în funcție de sistem</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-700">Dibluri (colțuri/socluri)</td>
                    <td className="px-4 py-3 text-slate-600">8–10 buc/m²</td>
                    <td className="px-4 py-3 text-slate-500">Zone cu solicitare mărită la vânt</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-700">Flanșe distribuție forță</td>
                    <td className="px-4 py-3 text-slate-600">1 / diblu</td>
                    <td className="px-4 py-3 text-slate-500">Standard sau extinsă (vată minerală)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-700">Bloc de 4 etaje (~800–1000m²)</td>
                    <td className="px-4 py-3 text-slate-600">~5.500–7.000 dibluri</td>
                    <td className="px-4 py-3 text-slate-500">Estimare totală pentru întreaga fațadă</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Alegere sistem</p>
            <h2 className="mb-6">EPS sau vată minerală la reabilitare</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-base mb-2">Sistem EPS/polistiren</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Soluția uzuală, cost redus, montaj rapid. Fixare cu dibluri cu cui plastic sau metalic,
                  6 buc/m² pe câmp curent.{' '}
                  <Link href="/sisteme/termoizolatie-eps" className="text-brand-accent font-medium hover:underline">
                    Vezi ghidul complet EPS →
                  </Link>
                </p>
              </div>
              <div className="card">
                <h3 className="text-base mb-2">Sistem vată minerală</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Rezistență la foc și fonoizolație superioară. Fixare cu flanșă cu rozetă extinsă și
                  diblu metalic, recomandat pentru clădiri înalte.{' '}
                  <Link href="/sisteme/termoizolatie-vata-minerala" className="text-brand-accent font-medium hover:underline">
                    Vezi ghidul complet vată minerală →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-neutral-surface">
          <div className="container-site">
            <p className="section-label mb-3">Produse folosite</p>
            <h2 className="mb-8">Materiale de fixare pentru reabilitare termică</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {produse.map((p) => (
                <Link key={p.slug} href={`/produse/${p.slug}`} className="card group block">
                  <div className="relative h-40 rounded-xl overflow-hidden bg-slate-100 mb-4 img-watermark">
                    <ImageWithFallback
                      src={p.imagine}
                      alt={`${p.titlu} - Plast Du IV`}
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mb-1">{p.categorie}</p>
                  <h3 className="text-base mb-2 group-hover:text-brand-accent transition-colors">{p.titlu}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{p.descriere}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Licitații publice</p>
            <h2 className="mb-6">Condiții pentru furnizare în achiziții publice</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Livrăm materiale de fixare direct către constructori și distribuitori implicați în
                proiecte de reabilitare edilitară finanțate de primării sau prin fonduri de coeziune.
                Punem la dispoziție fișe tehnice și declarații de conformitate ale produselor, necesare
                la întocmirea documentației de licitație.
              </p>
              <p>
                Compania este certificată ISO 9001 (management calitate), ISO 14001 (management de
                mediu) și ISO 45001 (sănătate și securitate ocupațională), certificări care pot fi
                solicitate ca dovadă a capacității tehnice în cadrul procedurilor de achiziție publică.{' '}
                <Link href="/despre-noi#certificari" className="text-brand-accent font-medium hover:underline">
                  Vezi certificările noastre →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {proiecte.length > 0 && (
          <section className="section-padding bg-neutral-surface">
            <div className="container-site">
              <p className="section-label mb-3">Referințe</p>
              <h2 className="mb-8">Proiecte de reabilitare finalizate</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {proiecte.map((p) => (
                  <div key={p.id} className="card">
                    <div className="relative h-44 rounded-xl overflow-hidden bg-slate-100 mb-4 img-watermark">
                      <ImageWithFallback
                        src={p.photo}
                        alt={`${p.name} - Plast Du IV`}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <h3 className="text-base mb-1">{p.name}</h3>
                    <p className="text-sm text-slate-500">{p.district} — {p.year}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/proiecte" className="text-brand-accent font-medium hover:underline text-sm">
                  Vezi toate proiectele pe hartă →
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="section-padding bg-white">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Întrebări frecvente</p>
            <h2 className="mb-8">Reabilitare termică blocuri — FAQ</h2>
            <div className="space-y-4">
              {FAQ.map((f) => (
                <details key={f.q} className="card group">
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

        <section className="section-padding bg-neutral-surface">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Vezi și</p>
            <h2 className="mb-6">Resurse conexe</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/furnizor-primarii" className="px-4 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Furnizor pentru primării și licitații
              </Link>
              <Link href="/sisteme/termoizolatie-eps" className="px-4 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Sistem termoizolație EPS
              </Link>
              <Link href="/sisteme/termoizolatie-vata-minerala" className="px-4 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Sistem termoizolație vată minerală
              </Link>
              <Link href="/produse/dibluri" className="px-4 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Hub dibluri — ghid complet
              </Link>
              <Link href="/proiecte" className="px-4 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Toate proiectele
              </Link>
              <Link href="/despre-noi" className="px-4 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Despre Plast Du IV
              </Link>
            </div>
          </div>
        </section>

        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Aveți un proiect de reabilitare termică în derulare?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Vă trimitem ofertă de preț pentru volumele necesare, cu termene de livrare adaptate
              graficului de execuție al șantierului.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors">
              Solicitați ofertă
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
