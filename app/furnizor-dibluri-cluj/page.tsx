export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Furnizor Dibluri și Materiale Construcții Cluj-Napoca',
  description:
    'Producător și furnizor de dibluri, flanșe și materiale fațadă pentru șantiere din Cluj-Napoca. ' +
    'Livrare rapidă pentru proiecte office/IT parks și reabilitare termică de blocuri din Transilvania. Prețuri en-gros.',
  alternates: { canonical: 'https://plastdu.ro/furnizor-dibluri-cluj' },
  openGraph: {
    title: 'Furnizor Dibluri Cluj-Napoca — Plast Du IV',
    description: 'Producător de dibluri termoizolante și materiale fațadă pentru șantiere din Cluj-Napoca și Transilvania.',
    url: 'https://plastdu.ro/furnizor-dibluri-cluj',
    type: 'website',
  },
};

const HERO_IMAGE = 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1600&h=900&fit=crop&auto=format&q=80';

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
    q: 'Livrați în Cluj-Napoca și zona metropolitană?',
    a: 'Da. Livrăm în Cluj-Napoca și localitățile din zona metropolitană (Florești, Apahida, Baciu, Gilău, Feleacu), prin curier extern sau transport propriu pentru comenzi consolidate. Termen standard 1-2 zile lucrătoare din depozitul de la Jilava.',
  },
  {
    q: 'Furnizați materiale pentru proiecte office și IT parks?',
    a: 'Da. Cluj-Napoca are un ritm intens de construcții office și clădiri mixte pentru sectorul IT — livrăm dibluri, flanșe și accesorii de fixare pentru fațade ventilate și termoizolate ale acestor proiecte, cu volume mari și termene stricte.',
  },
  {
    q: 'Lucrați cu asociații de proprietari pentru reabilitare termică?',
    a: 'Da, direct sau prin antreprenorii contractați de asociații. Cluj-Napoca și orașele din jur (Turda, Dej, Gherla) au programe active de reabilitare termică a blocurilor construite în perioada 1960-1990, unde livrăm materiale conform proiectului tehnic aprobat.',
  },
  {
    q: 'Aveți stoc suficient pentru șantiere mari, simultane?',
    a: 'Da, cu producție proprie zilnică la Jilava și planificare de stoc pentru comenzi recurente. Pentru proiecte mari din Cluj cu execuție simultană pe mai multe blocuri sau clădiri, recomandăm planificarea comenzii cu 2-3 săptămâni înainte.',
  },
  {
    q: 'Oferiți prețuri speciale pentru dezvoltatori și antreprenori generali?',
    a: 'Da. Pentru contracte-cadru cu dezvoltatori sau antreprenori generali activi în Cluj, negociem prețuri și termene de plată dedicate, valabile pe durata întregului proiect, nu doar per comandă.',
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
  '@id': 'https://plastdu.ro/furnizor-dibluri-cluj#local',
  name: 'Plast Du IV — Furnizor Dibluri Cluj-Napoca',
  url: 'https://plastdu.ro/furnizor-dibluri-cluj',
  telephone: '+40724658491',
  areaServed: [
    { '@type': 'City', name: 'Cluj-Napoca' },
    { '@type': 'AdministrativeArea', name: 'Județul Cluj' },
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
    { '@type': 'ListItem', position: 2, name: 'Furnizor Cluj-Napoca', item: 'https://plastdu.ro/furnizor-dibluri-cluj' },
  ],
};

export default async function FurnizorClujPage() {
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
            <p className="section-label !text-brand-accent/80 mb-3">Cluj-Napoca · Transilvania</p>
            <h1 className="text-display-lg text-white mb-4">Furnizor Dibluri și Materiale Construcții Cluj-Napoca</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Producător de dibluri termoizolante, flanșe vată minerală și materiale fațadă pentru șantiere
              din Cluj-Napoca și Transilvania. Livrare rapidă din depozitul de la Jilava, pentru proiecte
              office/IT parks și reabilitare termică de blocuri.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact?subiect=cerere-oferta-cluj" className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors">
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
                <p className="text-sm text-slate-500">livrare Cluj din Jilava</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-blue mb-1">Office / IT</p>
                <p className="text-sm text-slate-500">materiale pentru clădiri de birouri</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-blue mb-1">Producție</p>
                <p className="text-sm text-slate-500">proprie zilnică</p>
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
              <img src={HERO_IMAGE} alt="Clădiri office și IT parks în Cluj-Napoca" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <p className="section-label mb-3">De ce Plast Du IV pentru Cluj</p>
                <h2 className="mb-6">Ritmul de construcții cere livrare fără întârzieri</h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>Cluj-Napoca are unul dintre cele mai intense ritmuri de construcții office și rezidențiale din țară, alimentat de expansiunea sectorului IT. Fabricăm dibluri, flanșe și distanțieri pentru beton în Jilava, Ilfov, cu livrare organizată pentru șantiere din Cluj și zona metropolitană.</p>
                  <p>Lucrăm cu antreprenori generali pe clădiri office/IT parks, dar și cu firme specializate în reabilitarea termică a blocurilor din Cluj, Turda, Dej și Gherla — proiecte finanțate prin programe locale sau naționale de eficiență energetică.</p>
                  <p><strong>Zone acoperite:</strong> Cluj-Napoca (toate cartierele), Florești, Apahida, Baciu, Gilău, Feleacu, plus orașele din județ — Turda, Dej, Gherla, Câmpia Turzii.</p>
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
            <p className="section-label mb-3">Proiecte tipice în Cluj</p>
            <h2 className="mb-8">Unde ne folosesc antreprenorii din Transilvania</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { t: 'Clădiri office și IT parks', d: 'Fixare fațade ventilate și termoizolate pentru proiecte comerciale noi, cu volume mari și termene stricte.' },
                { t: 'Reabilitare blocuri Transilvania', d: 'Termoizolație pentru blocuri construite 1960-1990 din Cluj, Turda, Dej și Gherla, conform proiect tehnic.' },
                { t: 'Rezidențial nou și extinderi', d: 'Materiale de fixare pentru ansambluri rezidențiale noi din zona metropolitană Cluj.' },
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
            <h2 className="mb-8">FAQ furnizor Cluj-Napoca</h2>
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
              <Link href="/sisteme/termoizolatie-eps" className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue/10 transition-colors">Sistem termoizolație EPS</Link>
              <Link href="/blog/piulite-hexagonale-clase-rezistenta" className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue/10 transition-colors">Clase de rezistență piulițe</Link>
              <Link href="/furnizor-dibluri-bucuresti" className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue/10 transition-colors">Furnizor București</Link>
            </div>
          </div>
        </section>

        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Comandați astăzi — livrăm în Cluj-Napoca</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">Sunați 0724 658 491 sau trimiteți lista pe office@plastdu.ro. Vă revenim cu ofertă în aceeași zi.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+40724658491" className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors">0724 658 491</a>
              <Link href="/contact?subiect=cerere-oferta-cluj" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">Formular ofertă</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
