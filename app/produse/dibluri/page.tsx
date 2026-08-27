export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageWithFallback from '@/components/ImageWithFallback';

export const metadata: Metadata = {
  title: 'Dibluri pentru construcții — Ghid complet și matrice alegere | Plast Du IV',
  description:
    'Diblu plastic vs metalic: matrice comparativă, ghid de alegere pe tip de suport (cărămidă, ' +
    'beton, BCA, gips-carton) și dibluri distribuite pentru cazuri speciale. Producător român.',
  alternates: { canonical: 'https://plastdu.ro/produse/dibluri' },
  openGraph: {
    title: 'Dibluri pentru construcții — Ghid complet | Plast Du IV',
    description: 'Matrice comparativă diblu plastic vs metalic și ghid de alegere pe suport.',
    url: 'https://plastdu.ro/produse/dibluri',
  },
};

type Produs = { slug: string; titlu: string; categorie: string; imagine: string; descriere: string; badge?: string };

const DEFAULT_PROPRII: Produs[] = [
  { slug: 'dibluri-plastic', titlu: 'Dibluri Cui Plastic (Poliamidă)', categorie: 'Dibluri', imagine: '/images/produse/dibluri-plastic/01.jpg', descriere: 'Cui din poliamidă Ø5.5mm, corp PP Ø10mm. Reduce puntea termică. Standard pentru EPS.', badge: 'Produs propriu' },
  { slug: 'dibluri-metalice', titlu: 'Dibluri Cui Metalic Zincat', categorie: 'Dibluri', imagine: '/images/produse/dibluri-metalice/01.jpg', descriere: 'Cui din oțel zincat Ø5.5mm. Rezistență mecanică superioară pentru vată minerală.', badge: 'Produs propriu' },
  { slug: 'flansa-vata', titlu: 'Flanșă Vată Minerală', categorie: 'Flanșe', imagine: '/images/produse/flansa-vata/01.jpg', descriere: 'Rozetă extinsă Ø120–140mm pentru distribuția forței de prindere.', badge: 'Produs propriu' },
  { slug: 'flansa-osb', titlu: 'Flanșă OSB / Capac (TSF-F55)', categorie: 'Flanșe', imagine: '/images/produse/flansa-osb/01.jpg', descriere: 'Flanșă cu capac snap-on pentru finisaj superior al capului diblului.', badge: 'Produs propriu' },
];

const DEFAULT_DISTRIBUITE: Produs[] = [
  { slug: 'ancore-chimice', titlu: 'Ancore chimice (beton)', categorie: 'Fixare', imagine: '/images/produse/ancore/01.jpg', descriere: 'Pentru fixări structurale în beton, unde diblul standard nu oferă rezistență suficientă.', badge: 'Distribuit' },
  { slug: 'suruburi-autoforante', titlu: 'Şuruburi autoforante (metal)', categorie: 'Fixare', imagine: '/images/produse/suruburi/01.jpg', descriere: 'Pentru fixare rapidă în structuri metalice, fără nevoie de pre-găurire.', badge: 'Distribuit' },
  { slug: 'tije-filetate', titlu: 'Tije filetate (structuri suspendate)', categorie: 'Fixare', imagine: '/images/produse/tije-filetate/01.jpg', descriere: 'Pentru montaje suspendate și fixări structurale în combinație cu ancore chimice.', badge: 'Distribuit' },
  { slug: 'agatatori-balcon', titlu: 'Agățători pentru balcon (gips-carton)', categorie: 'Accesorii', imagine: '/images/produse/agatatori/01.jpg', descriere: 'Soluție de fixare ușoară pentru elemente montate pe pereți din gips-carton.', badge: 'Distribuit' },
];

const FAQ = [
  {
    q: 'Diblu plastic sau diblu metalic — care e mai bun pentru polistiren?',
    a: 'Diblul cu cui plastic (poliamidă) este soluția standard pentru polistiren, fiindcă reduce puntea termică prin cui. Diblul cu cui metalic se recomandă în zone cu solicitări mecanice mai mari — colțuri, socluri, clădiri înalte — datorită rezistenței superioare la smulgere.',
  },
  {
    q: 'Ce diblu se folosește pentru cărămidă?',
    a: 'Pentru cărămidă plină se recomandă o adâncime de ancorare de minimum 40mm, cu diblu plastic sau metalic în funcție de aplicație. Pentru cărămidă cu goluri, adâncimea de ancorare crește la minimum 60mm, deoarece rezistența materialului este mai mică.',
  },
  {
    q: 'Ce diblu se folosește pentru beton?',
    a: 'Pentru suport de beton (C20/25 sau superior) este suficientă o adâncime de ancorare de 25mm, iar diblul cu cui plastic oferă rezistență la smulgere de minimum 0.6kN, respectiv 0.8kN pentru cel cu cui metalic.',
  },
  {
    q: 'Ce diblu se folosește pentru BCA?',
    a: 'BCA-ul (beton celular autoclavizat) are rezistență mecanică redusă, de aceea se recomandă o adâncime de ancorare mărită, de minimum 60–90mm, și verificarea prealabilă prin test de smulgere pe o zonă mică din fațadă.',
  },
  {
    q: 'Ce diblu se folosește pentru gips-carton?',
    a: 'Pentru pereți din gips-carton nu se folosește diblul standard pentru termosistem, ci elemente de fixare specifice — agățători cu ancorare prin expansiune în interiorul plăcii, dimensionate pentru greutăți mici și medii.',
  },
  {
    q: 'Cum aleg lungimea corectă a diblului?',
    a: 'Lungimea diblului rezultă din suma dintre grosimea materialului termoizolant, grosimea stratului adeziv și adâncimea minimă de ancorare specifică suportului (25mm în beton, 40–60mm în cărămidă, 60–90mm în BCA).',
  },
  {
    q: 'Ce reprezintă rezistența la smulgere a unui diblu?',
    a: 'Rezistența la smulgere reprezintă forța maximă pe care diblul o poate prelua înainte de a ceda din suport, exprimată în kN. Se determină experimental pentru fiecare tip de suport și influențează direct densitatea de montaj (dibluri/m²).',
  },
];

export default async function HubDibluriPage() {
  let proprii = DEFAULT_PROPRII;
  let distribuite = DEFAULT_DISTRIBUITE;

  try {
    const { env } = getRequestContext();
    const kv = (env as any).PLASTDU_CONTENT as KVNamespace | undefined;
    if (kv) {
      const stored = await kv.get('produse');
      if (stored) {
        const parsed = JSON.parse(stored);
        const fabricate = (parsed.fabricate || []) as any[];
        const relevanteProprii = fabricate.filter((p) =>
          ['dibluri-plastic', 'dibluri-metalice', 'flansa-vata', 'flansa-osb'].includes(p.slug)
        );
        if (relevanteProprii.length) {
          proprii = relevanteProprii.map((p) => ({
            slug: p.slug, titlu: p.titlu, categorie: p.categorie, imagine: p.imagine, descriere: p.descriere, badge: p.badge,
          }));
        }
        const dist = (parsed.distribuite || []) as any[];
        const relevanteDist = dist.filter((p) =>
          ['ancore-chimice', 'suruburi-autoforante', 'tije-filetate', 'agatatori-balcon'].includes(p.slug)
        );
        if (relevanteDist.length) {
          distribuite = relevanteDist.map((p) => ({
            slug: p.slug, titlu: p.titlu, categorie: p.categorie, imagine: p.imagine, descriere: p.descriere, badge: p.badge,
          }));
        }
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
      { '@type': 'ListItem', position: 2, name: 'Produse', item: 'https://plastdu.ro/produse' },
      { '@type': 'ListItem', position: 3, name: 'Dibluri', item: 'https://plastdu.ro/produse/dibluri' },
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
            <Link href="/produse" className="hover:text-brand-blue transition-colors">Produse</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">Dibluri</span>
          </div>
        </section>

        <section className="bg-brand-blue text-white section-padding">
          <div className="container-site">
            <p className="section-label !text-brand-accent/80 mb-3">Hub produse</p>
            <h1 className="text-display-lg text-white mb-4">
              Dibluri pentru construcții — Ghid complet și matrice alegere
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Comparăm diblul plastic cu cel metalic, explicăm cum alegi diblul potrivit pe tip de
              suport și listăm soluțiile pentru cazurile speciale.
            </p>
          </div>
        </section>

        {/* Matrice comparativă */}
        <section className="section-padding bg-white">
          <div className="container-site max-w-5xl">
            <p className="section-label mb-3">Comparație</p>
            <h2 className="mb-8">Diblu plastic vs diblu metalic</h2>
            <div className="overflow-x-auto rounded-xl border border-neutral-border">
              <table className="w-full text-sm">
                <thead className="bg-brand-blue text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Criteriu</th>
                    <th className="text-left px-4 py-3 font-semibold">Diblu plastic (poliamidă)</th>
                    <th className="text-left px-4 py-3 font-semibold">Diblu metalic (oțel zincat)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-border">
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-700">Rezistență la smulgere</td>
                    <td className="px-4 py-3 text-slate-600">≥ 0.6 kN (beton C20/25)</td>
                    <td className="px-4 py-3 text-slate-600">≥ 0.8 kN (beton C20/25)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-700">Punte termică</td>
                    <td className="px-4 py-3 text-slate-600">Redusă — cui izolant</td>
                    <td className="px-4 py-3 text-slate-600">Prezentă — cui metalic conduce căldura</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-700">Cost</td>
                    <td className="px-4 py-3 text-slate-600">Mai redus</td>
                    <td className="px-4 py-3 text-slate-600">Mai ridicat</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-700">Aplicație recomandată</td>
                    <td className="px-4 py-3 text-slate-600">EPS, câmp curent fațadă</td>
                    <td className="px-4 py-3 text-slate-600">Vată minerală, colțuri, clădiri înalte</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-700">Comportament dinamic (vânt)</td>
                    <td className="px-4 py-3 text-slate-600">Bun pentru solicitări moderate</td>
                    <td className="px-4 py-3 text-slate-600">Superior în solicitări dinamice mari</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              Valorile de rezistență sunt orientative, determinate pentru suport standard de beton
              C20/25 — rezistența reală depinde de calitatea suportului și adâncimea de ancorare.
            </p>
          </div>
        </section>

        {/* Ghid alegere pe suport */}
        <section className="section-padding bg-neutral-surface">
          <div className="container-site max-w-5xl">
            <p className="section-label mb-3">Ghid alegere</p>
            <h2 className="mb-8">Ce diblu alegi în funcție de suport</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-base mb-2">Cărămidă plină</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Adâncime minimă de ancorare 40mm. Diblu plastic pentru câmp curent, metalic pentru
                  zone cu solicitări mari.
                </p>
              </div>
              <div className="card">
                <h3 className="text-base mb-2">Cărămidă cu goluri</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Adâncime minimă de ancorare 60mm, din cauza rezistenței reduse a materialului la
                  zona golurilor.
                </p>
              </div>
              <div className="card">
                <h3 className="text-base mb-2">Beton</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Adâncime minimă de ancorare 25mm. Cel mai bun comportament mecanic dintre toate
                  tipurile de suport — orice tip de diblu funcționează corect.
                </p>
              </div>
              <div className="card">
                <h3 className="text-base mb-2">BCA (beton celular autoclavizat)</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Adâncime minimă de ancorare 60–90mm, cu recomandare de test de smulgere prealabil,
                  datorită rezistenței reduse a materialului.
                </p>
              </div>
              <div className="card sm:col-span-2">
                <h3 className="text-base mb-2">Gips-carton</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Diblul standard pentru termosistem nu se folosește pe gips-carton. Se recomandă
                  elemente de fixare specifice, dimensionate pentru greutăți mici și medii — vezi
                  secțiunea de mai jos cu produsele distribuite pentru cazuri speciale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Produse proprii */}
        <section className="section-padding bg-white">
          <div className="container-site">
            <p className="section-label mb-3">Producție proprie</p>
            <h2 className="mb-8">Dibluri și flanșe fabricate de noi</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {proprii.map((p) => (
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

        {/* Distribuite pentru cazuri speciale */}
        <section className="section-padding bg-neutral-surface">
          <div className="container-site">
            <p className="section-label mb-3">Cazuri speciale</p>
            <h2 className="mb-8">Dibluri distribuite pentru situații particulare</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {distribuite.map((p) => (
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
            <p className="section-label mb-3">Întrebări frecvente</p>
            <h2 className="mb-8">Dibluri — FAQ</h2>
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
              <Link href="/sisteme/termoizolatie-eps" className="px-4 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Sistem termoizolație EPS
              </Link>
              <Link href="/sisteme/termoizolatie-vata-minerala" className="px-4 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Sistem termoizolație vată minerală
              </Link>
              <Link href="/materiale-fatada" className="px-4 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Materiale fațadă
              </Link>
              <Link href="/produse" className="px-4 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Toate produsele
              </Link>
              <Link href="/despre-noi" className="px-4 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Despre Plast Du IV
              </Link>
            </div>
          </div>
        </section>

        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Nu sunteți siguri ce diblu vi se potrivește?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Spuneți-ne tipul de suport și aplicația — vă recomandăm soluția potrivită și vă trimitem
              ofertă de preț.
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
