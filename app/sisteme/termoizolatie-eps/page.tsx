export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageWithFallback from '@/components/ImageWithFallback';

export const metadata: Metadata = {
  title: 'Sistem termoizolație EPS/polistiren — Dibluri și accesorii producător',
  description:
    'Dibluri plastic, metalice și flanșe pentru sistemul de termoizolație EPS/polistiren. ' +
    'Producător român: câți dibluri pe m², etape montaj și accesorii necesare.',
  alternates: { canonical: 'https://plastdu.ro/sisteme/termoizolatie-eps' },
  openGraph: {
    title: 'Sistem termoizolație EPS/polistiren | Plast Du IV',
    description:
      'Dibluri și accesorii producător pentru fixarea polistirenului expandat pe fațadă.',
    url: 'https://plastdu.ro/sisteme/termoizolatie-eps',
  },
};

type Produs = {
  slug: string;
  titlu: string;
  categorie: string;
  imagine: string;
  descriere: string;
};

const DEFAULT_PRODUSE: Produs[] = [
  {
    slug: 'dibluri-plastic',
    titlu: 'Dibluri Cui Plastic (Poliamidă)',
    categorie: 'Dibluri',
    imagine: '/images/produse/dibluri-plastic/01.jpg',
    descriere: 'Diblu termoizolant cu cui din poliamidă Ø5.5mm, corp PP Ø10mm, rozetă Ø55mm. Reduce puntea termică prin cui.',
  },
  {
    slug: 'dibluri-metalice',
    titlu: 'Dibluri Cui Metalic Zincat',
    categorie: 'Dibluri',
    imagine: '/images/produse/dibluri-metalice/01.jpg',
    descriere: 'Diblu cu cui din oțel zincat Ø5.5mm, rezistență mecanică superioară pentru zone cu solicitări dinamice mari.',
  },
  {
    slug: 'flansa-osb',
    titlu: 'Flanșă OSB / Capac (TSF-F55)',
    categorie: 'Flanșe',
    imagine: '/images/produse/flansa-osb/01.jpg',
    descriere: 'Flanșă cu capac snap-on pentru un finisaj curat al capului diblului pe suprafața de polistiren.',
  },
  {
    slug: 'flansa-vata',
    titlu: 'Flanșă distanțieră Ø120–140mm',
    categorie: 'Flanșe',
    imagine: '/images/produse/flansa-vata/01.jpg',
    descriere: 'Disc plastic cu rozetă extinsă pentru distribuție uniformă a forței de prindere pe placa de polistiren.',
  },
];

const FAQ = [
  {
    q: 'Câte dibluri se folosesc pe m² la termosistemul EPS?',
    a: 'Standard se montează 6 dibluri/m² pe câmpul curent al fațadei. La colțuri, socluri și zonele de colț ale clădirii, unde vântul exercită forțe de smulgere mai mari, densitatea crește la 8–10 dibluri/m², conform proiectului tehnic.',
  },
  {
    q: 'Când se montează diblurile pe polistiren?',
    a: 'Diblurile se montează după uscarea totală a stratului adeziv de lipire a plăcii EPS pe suport, de regulă la minimum 24–48 ore, în funcție de adezivul folosit și de temperatura exterioară.',
  },
  {
    q: 'Ce diblu se folosește pentru polistiren pe beton?',
    a: 'Pentru suport de beton se recomandă diblul cu cui din poliamidă Ø5.5mm, cu adâncime de ancorare de minimum 25mm. Pentru zone cu solicitări mecanice ridicate se poate folosi diblul cu cui metalic zincat.',
  },
  {
    q: 'Ce lungime de diblu aleg pentru un termosistem EPS de 10cm?',
    a: 'Lungimea diblului se calculează adunând grosimea plăcii EPS, grosimea adezivului, eventuale nereguli ale suportului și adâncimea minimă de ancorare în suport (25mm în beton, 40mm în cărămidă plină). Pentru un EPS de 10cm rezultă de regulă un diblu de minimum 10×140mm.',
  },
  {
    q: 'De ce se folosește flanșa la montajul diblurilor pe EPS?',
    a: 'Flanșa distribuie uniform forța de prindere pe suprafața plăcii de polistiren și previne deformarea sau spargerea locală a materialului termoizolant în jurul capului diblului.',
  },
  {
    q: 'Diblul cu cui metalic sau cel cu cui plastic pentru fațadă?',
    a: 'Diblul cu cui plastic (poliamidă) reduce puntea termică prin cui și este soluția standard recomandată pentru câmpul curent al fațadei. Diblul cu cui metalic zincat oferă rezistență mecanică mai mare și se recomandă în zone cu solicitări dinamice ridicate.',
  },
];

export default async function TermoizolatieEpsPage() {
  let produse = DEFAULT_PRODUSE;
  try {
    const { env } = getRequestContext();
    const kv = (env as any).PLASTDU_CONTENT as KVNamespace | undefined;
    if (kv) {
      const stored = await kv.get('produse');
      if (stored) {
        const parsed = JSON.parse(stored);
        const fabricate = (parsed.fabricate || []) as any[];
        const relevante = fabricate.filter((p) =>
          ['dibluri-plastic', 'dibluri-metalice', 'flansa-osb', 'flansa-vata'].includes(p.slug)
        );
        if (relevante.length) {
          produse = relevante.map((p) => ({
            slug: p.slug,
            titlu: p.titlu,
            categorie: p.categorie,
            imagine: p.imagine,
            descriere: p.descriere,
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
      { '@type': 'ListItem', position: 2, name: 'Sisteme', item: 'https://plastdu.ro/sisteme/termoizolatie-eps' },
      { '@type': 'ListItem', position: 3, name: 'Termoizolație EPS', item: 'https://plastdu.ro/sisteme/termoizolatie-eps' },
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Header />
      <main>
        {/* Breadcrumb */}
        <section className="bg-neutral-surface border-b border-neutral-border">
          <div className="container-site py-3 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-brand-blue transition-colors">Acasă</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">Sistem termoizolație EPS</span>
          </div>
        </section>

        {/* Hero */}
        <section className="bg-brand-blue text-white section-padding">
          <div className="container-site">
            <p className="section-label !text-brand-accent/80 mb-3">Sisteme de termoizolație</p>
            <h1 className="text-display-lg text-white mb-4">
              Sistem termoizolație EPS/polistiren — Dibluri și accesorii producător
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Producem la Jilava, Ilfov, diblurile și flanșele necesare pentru fixarea mecanică a
              polistirenului expandat pe fațadă. Livrăm în toată țara, direct din stoc sau la comandă.
            </p>
          </div>
        </section>

        {/* Ce este sistemul EPS */}
        <section className="section-padding bg-white">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Ghid tehnic</p>
            <h2 className="mb-6">Ce este sistemul de termoizolație cu polistiren expandat</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Sistemul de termoizolație EPS folosește plăci de polistiren expandat lipite pe fațadă
                cu adeziv mineral, apoi fixate mecanic suplimentar cu dibluri și flanșe. Fixarea mecanică
                preia forțele de smulgere date de vânt și de dilatările termice, pe lângă aderența
                oferită de stratul de lipire.
              </p>
              <p>
                Placa EPS este acoperită ulterior cu un strat de armare cu plasă din fibră de sticlă și
                un strat de finisaj decorativ. Rolul diblurilor este să mențină stratul termoizolant fix
                pe toată durata de exploatare a fațadei, indiferent de variațiile de temperatură și de
                condițiile meteo.
              </p>
              <p>
                Fabricăm dibluri și flanșe compatibile cu grosimi uzuale de EPS între 5 și 15cm, folosite
                atât la clădiri rezidențiale noi, cât și la reabilitarea termică a blocurilor existente.
              </p>
            </div>
          </div>
        </section>

        {/* Componente necesare */}
        <section className="section-padding bg-neutral-surface">
          <div className="container-site">
            <p className="section-label mb-3">Componente necesare</p>
            <h2 className="mb-8">Ce produse folosești la un termosistem EPS</h2>
            <p className="text-slate-600 max-w-2xl mb-8">
              Pentru montajul complet al plăcilor de polistiren pe fațadă ai nevoie de diblu (plastic
              sau metalic, în funcție de zonă și suport), flanșă de distribuție a forței și, opțional,
              flanșă cu capac pentru finisaj estetic.
            </p>
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

        {/* Etape montaj */}
        <section className="section-padding bg-white">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Procedură</p>
            <h2 className="mb-8">Etapele montajului diblurilor pe termosistem EPS</h2>
            <ol className="space-y-6">
              {[
                {
                  t: 'Uscarea adezivului de lipire',
                  d: 'Diblul se montează după uscarea totală a stratului adeziv de lipire a plăcii EPS pe suport, de regulă la minimum 24–48 ore, în funcție de temperatură și umiditate.',
                },
                {
                  t: 'Stabilirea lungimii diblului',
                  d: 'Se calculează grosimea EPS + grosimea adezivului + adâncimea minimă de ancorare în suport (25mm în beton, 40mm în cărămidă plină, 60mm în cărămidă cu goluri).',
                },
                {
                  t: 'Găurirea suportului',
                  d: 'Se dă gaură perpendicular pe fațadă, cu diametrul burghiului recomandat de producător (de regulă 8mm), până la adâncimea calculată.',
                },
                {
                  t: 'Introducerea corpului diblului',
                  d: 'Corpul diblului se introduce în gaură prin placa EPS, cu flanșa așezată la ras cu suprafața termoizolantei.',
                },
                {
                  t: 'Baterea cuiului',
                  d: 'Cuiul (plastic sau metalic) se bate cu ciocanul până la fixarea completă, fără să deformeze sau să crape placa EPS în jurul flanșei.',
                },
                {
                  t: 'Verificarea densității pe fațadă',
                  d: 'Se verifică numărul de dibluri pe m² conform proiectului: standard pe câmp și densitate mărită la colțuri și socluri.',
                },
              ].map((step, i) => (
                <li key={step.t} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">{step.t}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Câte dibluri pe m² */}
        <section className="section-padding bg-neutral-surface">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Consum estimativ</p>
            <h2 className="mb-6">Câte dibluri pe m² la termosistemul EPS</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Numărul de dibluri pe m² depinde de zona fațadei (câmp curent, colț, soclu) și de
              înălțimea clădirii. Valorile de mai jos sunt orientative — densitatea finală se
              stabilește prin proiectul tehnic de termoizolare.
            </p>
            <div className="overflow-x-auto rounded-xl border border-neutral-border">
              <table className="w-full text-sm">
                <thead className="bg-brand-blue text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Zonă fațadă</th>
                    <th className="text-left px-4 py-3 font-semibold">Dibluri / m²</th>
                    <th className="text-left px-4 py-3 font-semibold">Observații</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-border">
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-700">Câmp curent</td>
                    <td className="px-4 py-3 text-slate-600">6 buc/m²</td>
                    <td className="px-4 py-3 text-slate-500">Zona centrală a fațadei, sub 8m înălțime</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-700">Colțuri clădire</td>
                    <td className="px-4 py-3 text-slate-600">8–10 buc/m²</td>
                    <td className="px-4 py-3 text-slate-500">Solicitare la vânt mai mare pe muchii</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-700">Soclu / bază clădire</td>
                    <td className="px-4 py-3 text-slate-600">8 buc/m²</td>
                    <td className="px-4 py-3 text-slate-500">Zonă expusă la impact mecanic direct</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-700">Clădiri peste 8m înălțime</td>
                    <td className="px-4 py-3 text-slate-600">≥10 buc/m²</td>
                    <td className="px-4 py-3 text-slate-500">Conform calculului forței de smulgere din vânt</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-white">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Întrebări frecvente</p>
            <h2 className="mb-8">Sistem termoizolație EPS — FAQ</h2>
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

        {/* Link-uri interne */}
        <section className="section-padding bg-neutral-surface">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Vezi și</p>
            <h2 className="mb-6">Resurse conexe</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/sisteme/termoizolatie-vata-minerala" className="px-4 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Sistem termoizolație vată minerală
              </Link>
              <Link href="/produse/dibluri" className="px-4 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Hub dibluri — ghid complet
              </Link>
              <Link href="/aplicatii/reabilitare-blocuri" className="px-4 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Reabilitare termică blocuri
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

        {/* CTA */}
        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Ai nevoie de dibluri pentru termosistem EPS?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Producem în stoc și la comandă. Vă trimitem ofertă cu prețuri de volum și termene
              de livrare pentru orice cantitate.
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
