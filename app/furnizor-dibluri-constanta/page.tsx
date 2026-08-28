export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Furnizor Dibluri și Materiale Construcții Constanța — Litoral',
  description:
    'Producător și furnizor de dibluri, flanșe și materiale fațadă pentru șantiere din Constanța și litoral. ' +
    'Livrare din stoc pentru reabilitări termice de hoteluri și blocuri, lucrări portuare și rezidențiale. Prețuri en-gros.',
  alternates: { canonical: 'https://plastdu.ro/furnizor-dibluri-constanta' },
  openGraph: {
    title: 'Furnizor Dibluri Constanța — Plast Du IV',
    description: 'Producător de dibluri termoizolante și materiale fațadă pentru șantiere din Constanța și litoralul românesc.',
    url: 'https://plastdu.ro/furnizor-dibluri-constanta',
    type: 'website',
  },
};

const HERO_IMAGE = 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=1600&h=900&fit=crop&auto=format&q=80';

type Produs = { slug: string; titlu: string; imagine?: string; descriere?: string; categorie?: string };

async function getProduseFabricate(): Promise<Produs[]> {
  try {
    const { env } = getRequestContext();
    const kv = (env as any).PLASTDU_CONTENT as KVNamespace | undefined;
    if (!kv) return [];
    const raw = await kv.get('produse');
    if (!raw) return [];
    return JSON.parse(raw).fabricate || [];
  } catch { return []; }
}

const FAQ = [
  {
    q: 'Livrați materiale de construcții în Constanța și pe litoral?',
    a: 'Da. Livrăm regulat în Constanța, Mamaia, Năvodari, Eforie și Mangalia, prin curier extern sau transport propriu pentru comenzi mari. Termenul standard de livrare din depozitul de la Jilava este de 1-2 zile lucrătoare pentru zona litoral.',
  },
  {
    q: 'Aveți experiență cu reabilitarea termică a hotelurilor de pe litoral?',
    a: 'Da, lucrăm cu antreprenori care execută reabilitări termice și renovări la hoteluri și pensiuni din stațiunile de pe litoral, unde sezonalitatea cere planificare atentă a stocului — livrăm materiale în extra-sezon, când lucrările sunt programate.',
  },
  {
    q: 'Dibluri și materiale rezistente la mediul salin din zona de coastă?',
    a: 'Recomandăm variante zincate sau din poliamidă rezistentă la umiditate pentru proiectele din proximitatea mării, unde expunerea la aerul salin accelerează coroziunea componentelor metalice neprotejate. Echipa noastră tehnică vă recomandă varianta potrivită în funcție de distanța față de țărm.',
  },
  {
    q: 'Livrați și pentru șantiere din zona portuară sau industrială Constanța?',
    a: 'Da, livrăm materiale de fixare și fațadă pentru proiecte industriale și logistice din zona portului Constanța și platformele industriale adiacente, cu facturare B2B și termene de plată adaptate contractelor mari.',
  },
  {
    q: 'Ce cantitate minimă de comandă acceptați pentru livrare pe litoral?',
    a: 'Nu impunem o cantitate minimă strictă, dar pentru eficiență recomandăm comenzi consolidate (o singură livrare pentru mai multe puncte de lucru din aceeași stațiune), mai ales în sezonul cu trafic intens pe DN39 și A4.',
  },
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const LOCAL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://plastdu.ro/furnizor-dibluri-constanta#local',
  name: 'Plast Du IV — Furnizor Dibluri Constanța',
  url: 'https://plastdu.ro/furnizor-dibluri-constanta',
  telephone: '+40724658491',
  areaServed: [
    { '@type': 'City', name: 'Constanța' },
    { '@type': 'AdministrativeArea', name: 'Județul Constanța' },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Str. Ana Ipătescu nr. 44',
    addressLocality: 'Jilava',
    addressRegion: 'Ilfov',
    postalCode: '077120',
    addressCountry: 'RO',
  },
};

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://plastdu.ro' },
    { '@type': 'ListItem', position: 2, name: 'Furnizor Constanța', item: 'https://plastdu.ro/furnizor-dibluri-constanta' },
  ],
};

export default async function FurnizorConstantaPage() {
  const produse = await getProduseFabricate();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />

      <Header />
      <main>
        <section className="bg-brand-blue text-white section-padding">
          <div className="container-site">
            <p className="section-label !text-brand-accent/80 mb-3">Constanța · Litoral</p>
            <h1 className="text-display-lg text-white mb-4">Furnizor Dibluri și Materiale Construcții Constanța</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Producător de dibluri termoizolante, flanșe vată minerală și materiale fațadă pentru șantiere
              din Constanța și stațiunile de pe litoral. Livrare rapidă din depozitul de la Jilava,
              prețuri en-gros pentru reabilitări termice de hoteluri, blocuri și proiecte portuare.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact?subiect=cerere-oferta-constanta" className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors">
                Solicitați ofertă
              </Link>
              <a href="tel:+40724658491" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">
                0724 658 491
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white border-b border-neutral-border py-10">
          <div className="container-site">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-blue mb-1">1-2 zile</p>
                <p className="text-sm text-slate-500">livrare pe litoral din Jilava</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-blue mb-1">Rezistență</p>
                <p className="text-sm text-slate-500">la mediu salin — variante zincate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-blue mb-1">Hoteluri</p>
                <p className="text-sm text-slate-500">experiență reabilitare litoral</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-blue mb-1">B2B</p>
                <p className="text-sm text-slate-500">factură cu TVA + termen plată</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white pb-14">
          <div className="container-site">
            <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-neutral-surface img-watermark">
              <img src={HERO_IMAGE} alt="Zona litoral Constanța — reabilitare termică hoteluri și blocuri" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <p className="section-label mb-3">De ce Plast Du IV pentru litoral</p>
                <h2 className="mb-6">Materiale adaptate mediului de coastă</h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>Litoralul cere materiale de fixare rezistente la umiditate și mediu salin, pe lângă rigorile obișnuite ale unui șantier de reabilitare termică. Fabricăm dibluri, flanșe și distanțieri pentru beton în Jilava, Ilfov, cu livrare organizată pe axa București–Constanța.</p>
                  <p>Lucrăm cu antreprenori activi pe reabilitarea termică a blocurilor din Constanța, dar și cu firme care execută renovări la hoteluri și pensiuni în Mamaia, Eforie și Năvodari — proiecte cu ferestre de execuție strânse, între sezoane.</p>
                  <p><strong>Zone acoperite:</strong> Constanța (toate cartierele — Tomis, Faleză, Km 4-5, Palas), Mamaia, Năvodari, Eforie Nord/Sud, Mangalia, zona portuară și platformele industriale adiacente.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {produse.slice(0, 4).map((p) => (
                  <Link key={p.slug} href={`/produse/${p.slug}`} className="card group hover:shadow-md transition-shadow bg-neutral-surface">
                    {p.imagine && (
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 mb-3 img-watermark">
                        <img src={p.imagine} alt={p.titlu} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <h3 className="text-sm font-semibold text-slate-800 group-hover:text-brand-blue transition-colors">{p.titlu}</h3>
                    {p.categorie && <p className="text-xs text-slate-500 mt-1">{p.categorie}</p>}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-neutral-surface">
          <div className="container-site">
            <p className="section-label mb-3">Proiecte tipice pe litoral</p>
            <h2 className="mb-8">Unde ne folosesc antreprenorii din Constanța</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { t: 'Reabilitare hoteluri și pensiuni', d: 'Termoizolație fațadă în extra-sezon, materiale rezistente la umiditate ridicată de coastă.' },
                { t: 'Reabilitare blocuri de locuințe', d: 'Programe de reabilitare termică coordonate cu asociații de proprietari și primărie.' },
                { t: 'Proiecte portuare și industriale', d: 'Materiale de fixare pentru clădiri logistice și platforme din zona portului Constanța.' },
              ].map((s) => (
                <div key={s.t} className="bg-white rounded-2xl p-6 border border-neutral-border shadow-card">
                  <h3 className="text-base mb-2 text-slate-800">{s.t}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-site">
            <p className="section-label mb-3">Întrebări frecvente</p>
            <h2 className="mb-8">FAQ furnizor Constanța</h2>
            <div className="space-y-4 max-w-3xl">
              {FAQ.map((f) => (
                <details key={f.q} className="group bg-neutral-surface rounded-2xl p-5 border border-neutral-border">
                  <summary className="font-semibold text-slate-800 cursor-pointer flex items-center justify-between">
                    {f.q}
                    <svg className="w-4 h-4 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-site">
            <p className="section-label mb-3">Continuă documentarea</p>
            <h2 className="mb-8">Resurse utile pentru șantierul dumneavoastră</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/aplicatii/reabilitare-blocuri" className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue/10 transition-colors">Aplicații reabilitare blocuri</Link>
              <Link href="/produse/dibluri" className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue/10 transition-colors">Toate diblurile</Link>
              <Link href="/blog/calcul-necesar-materiale-reabilitare-bloc" className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue/10 transition-colors">Calcul necesar materiale</Link>
              <Link href="/furnizor-dibluri-bucuresti" className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue/10 transition-colors">Furnizor București</Link>
              <Link href="/blog/ancore-chimice-vs-mecanice" className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue/10 transition-colors">Ancore chimice vs mecanice</Link>
            </div>
          </div>
        </section>

        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Comandați astăzi — livrăm pe litoral</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">Sunați 0724 658 491 sau trimiteți lista pe office@plastdu.ro. Vă revenim cu ofertă în aceeași zi.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+40724658491" className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors">0724 658 491</a>
              <Link href="/contact?subiect=cerere-oferta-constanta" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">Formular ofertă</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
