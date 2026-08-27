export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Furnizor Dibluri și Materiale Construcții București — Jilava',
  description:
    'Producător și furnizor de dibluri, flanșe și materiale construcții în București și Ilfov. ' +
    'Livrare rapidă din stoc — Jilava (5 min de sectorul 4). Prețuri en-gros pentru constructori și distribuitori.',
  alternates: { canonical: 'https://plastdu.ro/furnizor-dibluri-bucuresti' },
  openGraph: {
    title: 'Furnizor Dibluri București — Plast Du IV',
    description: 'Producător local de dibluri termoizolante și furnizor materiale fațadă pentru șantiere din București.',
    url: 'https://plastdu.ro/furnizor-dibluri-bucuresti',
    type: 'website',
  },
};

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
    q: 'Livrați în aceeași zi în București?',
    a: 'Da. Pentru comenzi confirmate până la 11:00, livrăm în aceeași zi în București și Ilfov, cu curier propriu sau curier extern (Fan Courier, Sameday). Comenzile mari se ridică direct din depozit — Jilava, Str. Ana Ipătescu 44.',
  },
  {
    q: 'Cum se plătește — numerar sau factură?',
    a: 'Acceptăm plata prin OP la 5–14 zile pentru firme cu istoric, ramburs la curier pentru comenzi noi, sau numerar la ridicare din depozit. Emitem factură fiscală cu TVA pentru toate tranzacțiile.',
  },
  {
    q: 'Ce zone acoperiți în București și Ilfov?',
    a: 'Livrăm în toate sectoarele București (1–6) și în toate localitățile din Ilfov: Jilava, Otopeni, Voluntari, Popesti-Leordeni, Bragadiru, Chiajna, Măgurele, Bolintin, Dărăști, Gruițu, Vidra, Călugăreni.',
  },
  {
    q: 'Aveți stoc permanent pentru cantități mari?',
    a: 'Da, cu producție proprie zilnică. Stoc permanent pentru dibluri 10x100—200mm, flanșe vată minerală și OSB. Pentru comenzi peste 50.000 buc putem produce dedicat în 5–7 zile lucrătoare.',
  },
  {
    q: 'Oferiți prețuri en-gros pentru șantiere mari?',
    a: 'Da. Pentru comenzi confirmate de la 10.000 buc în sus, aplicăm discount volumetric. Trimiteți lista cu produse și cantități la office@plastdu.ro sau 0724 658 491 — vă revenim cu ofertă personalizată în aceeași zi.',
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
  '@id': 'https://plastdu.ro/furnizor-dibluri-bucuresti#local',
  name: 'Plast Du IV — Furnizor Dibluri București',
  url: 'https://plastdu.ro/furnizor-dibluri-bucuresti',
  telephone: '+40724658491',
  areaServed: [
    { '@type': 'City', name: 'București' },
    { '@type': 'AdministrativeArea', name: 'Ilfov' },
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
    { '@type': 'ListItem', position: 2, name: 'Furnizor București', item: 'https://plastdu.ro/furnizor-dibluri-bucuresti' },
  ],
};

export default async function FurnizorBucurestiPage() {
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
            <p className="section-label !text-brand-accent/80 mb-3">București · Ilfov</p>
            <h1 className="text-display-lg text-white mb-4">Furnizor Dibluri și Materiale Construcții București</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Producător local de dibluri termoizolante, flanșe vată minerală și materiale fațadă.
              Livrare rapidă în toate sectoarele București — depozit la Jilava, 5 minute de sectorul 4.
              Prețuri en-gros pentru constructori, distribuitori și șantiere de reabilitare.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact?subiect=cerere-oferta-bucuresti" className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors">
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
                <p className="text-3xl font-bold text-brand-blue mb-1">Same-day</p>
                <p className="text-sm text-slate-500">livrare București pentru comenzi până la 11:00</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-blue mb-1">5 min</p>
                <p className="text-sm text-slate-500">de sectorul 4 (Jilava)</p>
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

        <section className="section-padding bg-white">
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <p className="section-label mb-3">De ce Plast Du IV pentru București</p>
                <h2 className="mb-6">Producător local, nu importator</h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>Fabricăm dibluri, flanșe și distanțieri pentru beton în Jilava, Ilfov. Depozit și producție la 5 minute de sectorul 4 al Bucureștiului. Livrare rapidă, prețuri competitive față de importatori.</p>
                  <p>Lucrăm direct cu firme de construcții, antreprenori reabilitare termică, depozite materiale și distribuitori din București și Ilfov. Adaptăm termenele de plată și prețurile pentru comenzi recurente.</p>
                  <p><strong>Sectoare acoperite:</strong> Sector 1, 2, 3, 4, 5, 6 București + Ilfov (Otopeni, Voluntari, Bragadiru, Popesti-Leordeni, Jilava, Chiajna, Măgurele).</p>
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
            <p className="section-label mb-3">Fluxul de comandă pentru șantierele din București</p>
            <h2 className="mb-8">De la solicitare la livrare — 4 pași</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { n: '1', t: 'Solicitați ofertă', d: 'Telefon 0724 658 491 sau formular contact. Trimiteți lista cu produse și cantități.' },
                { n: '2', t: 'Confirmare + factură', d: 'Vă trimitem oferta în aceeași zi. Emitere factură pro forma și planificare livrare.' },
                { n: '3', t: 'Livrare / ridicare', d: 'Same-day pentru comenzi până la 11:00 sau ridicare direct din depozit Jilava.' },
                { n: '4', t: 'Documente', d: 'Aviz însoțire marfă + factură fiscală. Suport post-vânzare pentru orice întrebare tehnică.' },
              ].map((s) => (
                <div key={s.n} className="bg-white rounded-2xl p-6 border border-neutral-border shadow-card">
                  <div className="w-10 h-10 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold text-lg mb-4">{s.n}</div>
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
            <h2 className="mb-8">FAQ furnizor București</h2>
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

        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Comandați astăzi — livrăm în București</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">Sunați 0724 658 491 sau trimiteți lista pe office@plastdu.ro. Vă revenim cu ofertă în 30 minute.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+40724658491" className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors">0724 658 491</a>
              <Link href="/contact?subiect=cerere-oferta-bucuresti" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">Formular ofertă</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
