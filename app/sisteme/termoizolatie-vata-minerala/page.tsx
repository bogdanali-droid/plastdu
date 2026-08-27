export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageWithFallback from '@/components/ImageWithFallback';

export const metadata: Metadata = {
  title: 'Sistem termoizolație vată minerală — Flanșe și dibluri pentru fixare | Plast Du IV',
  description:
    'Flanșă vată minerală și diblu metalic pentru fixarea mecanică a vatei bazaltice pe fațadă. ' +
    'Producător român: cum se prinde vata minerală, câte fixări pe m² și accesorii.',
  alternates: { canonical: 'https://plastdu.ro/sisteme/termoizolatie-vata-minerala' },
  openGraph: {
    title: 'Sistem termoizolație vată minerală | Plast Du IV',
    description: 'Flanșe și dibluri metalice pentru fixarea vatei minerale pe fațadă.',
    url: 'https://plastdu.ro/sisteme/termoizolatie-vata-minerala',
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
    slug: 'flansa-vata',
    titlu: 'Flanșă Vată Minerală',
    categorie: 'Flanșe',
    imagine: '/images/produse/flansa-vata/01.jpg',
    descriere: 'Disc plastic cu rozetă extinsă Ø120–140mm, model spite duble, pentru distribuție uniformă a forței pe vată.',
  },
  {
    slug: 'dibluri-metalice',
    titlu: 'Dibluri Cui Metalic Zincat',
    categorie: 'Dibluri',
    imagine: '/images/produse/dibluri-metalice/01.jpg',
    descriere: 'Diblu cu cui din oțel zincat Ø5.5mm, recomandat pentru vată minerală datorită rezistenței mecanice sporite.',
  },
  {
    slug: 'dibluri-plastic',
    titlu: 'Dibluri Cui Plastic (Poliamidă)',
    categorie: 'Dibluri',
    imagine: '/images/produse/dibluri-plastic/01.jpg',
    descriere: 'Diblu termoizolant compatibil și cu vată minerală de densitate mai mică, reduce puntea termică.',
  },
  {
    slug: 'flansa-osb',
    titlu: 'Flanșă OSB / Capac (TSF-F55)',
    categorie: 'Flanșe',
    imagine: '/images/produse/flansa-osb/01.jpg',
    descriere: 'Flanșă cu capac snap-on pentru finisaj curat al capului diblului.',
  },
];

const FAQ = [
  {
    q: 'Cum se prinde vata minerală pe fațadă?',
    a: 'Vata minerală se lipește pe suport cu adeziv mineral, apoi se fixează mecanic suplimentar cu dibluri metalice și flanșe cu rozetă extinsă, care distribuie uniform forța de prindere fără să comprime local materialul fibros.',
  },
  {
    q: 'De ce se folosește flanșă cu diametru mai mare la vată minerală?',
    a: 'Vata minerală are o densitate și o structură fibroasă diferită față de polistiren, iar o flanșă cu rozetă Ø120–140mm distribuie forța de prindere pe o suprafață mai mare, prevenind deformarea sau ruperea fibrelor din jurul capului diblului.',
  },
  {
    q: 'Ce diblu se recomandă pentru vată minerală?',
    a: 'Se recomandă diblul cu cui din oțel zincat, cu rezistență mecanică superioară, mai ales la clădirile înalte sau expuse la vânt puternic. Diblul cu cui plastic poate fi folosit la vată de densitate mai mică, în zone cu solicitări moderate.',
  },
  {
    q: 'Câte fixări pe m² sunt necesare la vată minerală?',
    a: 'Standard, 6 fixări/m² pe câmpul curent al fațadei, cu densitate mărită la 8–10 fixări/m² la colțuri, socluri și clădiri peste 8m înălțime, conform proiectului tehnic de termoizolare.',
  },
  {
    q: 'Când se montează diblurile pe vată minerală?',
    a: 'Diblul se montează după uscarea totală a stratului adeziv de lipire a plăcii de vată pe suport, de regulă la minimum 24–48 ore, în funcție de tipul adezivului și condițiile meteo.',
  },
  {
    q: 'Se poate folosi aceeași flanșă la vată minerală și la polistiren?',
    a: 'Flanșa cu rozetă extinsă Ø120–140mm este compatibilă atât cu vată minerală, cât și cu polistiren, însă pentru polistiren se poate folosi și flanșa standard Ø55mm de pe diblu, în funcție de recomandarea proiectului tehnic.',
  },
];

export default async function TermoizolatieVataPage() {
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
          ['flansa-vata', 'dibluri-metalice', 'dibluri-plastic', 'flansa-osb'].includes(p.slug)
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
      { '@type': 'ListItem', position: 2, name: 'Sisteme', item: 'https://plastdu.ro/sisteme/termoizolatie-vata-minerala' },
      { '@type': 'ListItem', position: 3, name: 'Termoizolație vată minerală', item: 'https://plastdu.ro/sisteme/termoizolatie-vata-minerala' },
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
        <section className="bg-neutral-surface border-b border-neutral-border">
          <div className="container-site py-3 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-brand-blue transition-colors">Acasă</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">Sistem termoizolație vată minerală</span>
          </div>
        </section>

        <section className="bg-brand-blue text-white section-padding">
          <div className="container-site">
            <p className="section-label !text-brand-accent/80 mb-3">Sisteme de termoizolație</p>
            <h1 className="text-display-lg text-white mb-4">
              Sistem termoizolație vată minerală — Flanșe și dibluri pentru fixare
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Producem flanșe cu rozetă extinsă și dibluri metalice special dimensionate pentru
              fixarea mecanică a vatei minerale bazaltice pe fațadele clădirilor.
            </p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Ghid tehnic</p>
            <h2 className="mb-6">Ce este sistemul de termoizolație cu vată minerală</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Sistemul de termoizolație cu vată minerală bazaltică folosește plăci fibroase lipite pe
                fațadă cu adeziv mineral, apoi fixate mecanic cu dibluri și flanșe cu rozetă de
                diametru mărit. Vata minerală este o alegere frecventă la clădiri cu cerințe de
                rezistență la foc sau la fonoizolație superioară.
              </p>
              <p>
                Spre deosebire de polistiren, vata minerală are o structură fibroasă mai puțin rigidă,
                de aceea flanșa de fixare trebuie să distribuie forța de prindere pe o suprafață mai
                mare pentru a nu comprima local materialul termoizolant.
              </p>
              <p>
                Fabricăm flanșe cu rozetă Ø120–140mm și dibluri metalice compatibile, folosite atât la
                fațade noi, cât și la proiecte de reabilitare termică a blocurilor existente.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-neutral-surface">
          <div className="container-site">
            <p className="section-label mb-3">Componente necesare</p>
            <h2 className="mb-8">Ce produse folosești la un termosistem cu vată minerală</h2>
            <p className="text-slate-600 max-w-2xl mb-8">
              Pentru montajul plăcilor de vată minerală pe fațadă ai nevoie de diblu metalic cu
              rezistență mecanică sporită, flanșă cu rozetă extinsă pentru distribuția forței și,
              opțional, flanșă cu capac pentru finisaj estetic.
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

        <section className="section-padding bg-white">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Procedură</p>
            <h2 className="mb-8">Etapele montajului diblurilor pe vată minerală</h2>
            <ol className="space-y-6">
              {[
                {
                  t: 'Uscarea adezivului de lipire',
                  d: 'Diblul se montează după uscarea totală a stratului adeziv de lipire a plăcii de vată pe suport, de regulă la minimum 24–48 ore.',
                },
                {
                  t: 'Stabilirea lungimii diblului',
                  d: 'Se calculează grosimea vatei minerale + grosimea adezivului + adâncimea minimă de ancorare în suport (25mm în beton, 40mm în cărămidă plină).',
                },
                {
                  t: 'Găurirea suportului',
                  d: 'Se dă gaură perpendicular pe fațadă cu diametrul de burghiu recomandat, până la adâncimea calculată.',
                },
                {
                  t: 'Introducerea corpului diblului',
                  d: 'Corpul diblului se introduce prin placa de vată, cu flanșa cu rozetă extinsă așezată la ras cu suprafața termoizolantei.',
                },
                {
                  t: 'Baterea cuiului metalic',
                  d: 'Cuiul metalic se bate uniform, fără să comprime excesiv fibrele din jurul flanșei — controlul forței este esențial la vata minerală.',
                },
                {
                  t: 'Verificarea densității de fixare',
                  d: 'Se verifică numărul de fixări pe m² conform proiectului: standard pe câmp și densitate mărită la colțuri și socluri.',
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

        <section className="section-padding bg-neutral-surface">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Consum estimativ</p>
            <h2 className="mb-6">Câte fixări pe m² la vată minerală</h2>
            <div className="overflow-x-auto rounded-xl border border-neutral-border">
              <table className="w-full text-sm">
                <thead className="bg-brand-blue text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Zonă fațadă</th>
                    <th className="text-left px-4 py-3 font-semibold">Fixări / m²</th>
                    <th className="text-left px-4 py-3 font-semibold">Observații</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-border">
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-700">Câmp curent</td>
                    <td className="px-4 py-3 text-slate-600">6 buc/m²</td>
                    <td className="px-4 py-3 text-slate-500">Zona centrală, sub 8m înălțime</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-700">Colțuri clădire</td>
                    <td className="px-4 py-3 text-slate-600">8–10 buc/m²</td>
                    <td className="px-4 py-3 text-slate-500">Solicitare mărită la vânt</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-700">Soclu / bază clădire</td>
                    <td className="px-4 py-3 text-slate-600">8 buc/m²</td>
                    <td className="px-4 py-3 text-slate-500">Zonă expusă la impact mecanic</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-700">Clădiri peste 8m înălțime</td>
                    <td className="px-4 py-3 text-slate-600">≥10 buc/m²</td>
                    <td className="px-4 py-3 text-slate-500">Conform calculului la vânt</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Întrebări frecvente</p>
            <h2 className="mb-8">Sistem termoizolație vată minerală — FAQ</h2>
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

        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Ai nevoie de flanșe și dibluri pentru vată minerală?</h2>
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
