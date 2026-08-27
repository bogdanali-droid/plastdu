export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageWithFallback from '@/components/ImageWithFallback';

export const metadata: Metadata = {
  title: 'Materiale fațadă — Distanțieri, dibluri, ancore și accesorii construcții | Plast Du IV',
  description:
    'Hub complet de materiale pentru fațadă: dibluri, flanșe, distanțieri beton, profile PVC, colțare ' +
    'și ancore. Produse proprii și distribuite, livrate din stoc din Jilava, Ilfov.',
  alternates: { canonical: 'https://plastdu.ro/materiale-fatada' },
  openGraph: {
    title: 'Materiale fațadă | Plast Du IV',
    description: 'Toate materialele necesare pentru fațadă, într-un singur loc.',
    url: 'https://plastdu.ro/materiale-fatada',
  },
};

type Produs = { slug: string; titlu: string; categorie: string; imagine: string; descriere: string; badge?: string };

const DEFAULT_FABRICATE: Produs[] = [
  { slug: 'dibluri-plastic', titlu: 'Dibluri Cui Plastic (Poliamidă)', categorie: 'Dibluri', imagine: '/images/produse/dibluri-plastic/01.jpg', descriere: 'Diblu termoizolant pentru fixarea EPS pe fațadă.', badge: 'Produs propriu' },
  { slug: 'dibluri-metalice', titlu: 'Dibluri Cui Metalic Zincat', categorie: 'Dibluri', imagine: '/images/produse/dibluri-metalice/01.jpg', descriere: 'Diblu cu rezistență mecanică sporită pentru vată minerală și EPS.', badge: 'Produs propriu' },
  { slug: 'flansa-vata', titlu: 'Flanșă Vată Minerală', categorie: 'Flanșe', imagine: '/images/produse/flansa-vata/01.jpg', descriere: 'Flanșă cu rozetă extinsă pentru distribuția forței de prindere.', badge: 'Produs propriu' },
  { slug: 'flansa-osb', titlu: 'Flanșă OSB / Capac (TSF-F55)', categorie: 'Flanșe', imagine: '/images/produse/flansa-osb/01.jpg', descriere: 'Flanșă cu capac snap-on pentru finisaj superior.', badge: 'Produs propriu' },
];

const DEFAULT_DISTRIBUITE: Produs[] = [
  { slug: 'distantieri-gresie', titlu: 'Distanțieri pentru gresie', categorie: 'Accesorii', imagine: '/images/produse/distantieri-gresie/01.jpg', descriere: 'Distanțieri din plastic pentru rosturi uniforme la pozarea gresiei și faianței.', badge: 'Distribuit' },
  { slug: 'coltar-pvc', titlu: 'Colțar PVC cu plasă', categorie: 'Profile', imagine: '/images/produse/coltar-pvc/01.jpg', descriere: 'Colțar PVC cu plasă din fibră de sticlă pentru protecția colțurilor la fațade.', badge: 'Distribuit' },
  { slug: 'profil-colt-exterior', titlu: 'Profil de colț exterior', categorie: 'Profile', imagine: '/images/produse/profil-colt/01.jpg', descriere: 'Profil de colț din aluminiu sau PVC pentru finisaje exterioare.', badge: 'Distribuit' },
  { slug: 'ancore-chimice', titlu: 'Ancore chimice', categorie: 'Fixare', imagine: '/images/produse/ancore/01.jpg', descriere: 'Ancore chimice bi-componente pentru fixări structurale în beton și zidărie.', badge: 'Distribuit' },
  { slug: 'suruburi-autoforante', titlu: 'Şuruburi autoforante', categorie: 'Fixare', imagine: '/images/produse/suruburi/01.jpg', descriere: 'Şuruburi autoforante din oțel zincat pentru fixare rapidă.', badge: 'Distribuit' },
  { slug: 'tije-filetate', titlu: 'Tije filetate', categorie: 'Fixare', imagine: '/images/produse/tije-filetate/01.jpg', descriere: 'Tije filetate din oțel zincat în diverse lungimi și diametre metrice.', badge: 'Distribuit' },
  { slug: 'agatatori-balcon', titlu: 'Agățători pentru balcon', categorie: 'Accesorii', imagine: '/images/produse/agatatori/01.jpg', descriere: 'Agățători metalice zincate pentru montaj pe balustrade și balcoane.', badge: 'Distribuit' },
  { slug: 'capace-teava', titlu: 'Capace pentru țeavă', categorie: 'Accesorii', imagine: '/images/produse/capace-teava/01.jpg', descriere: 'Capace din plastic pentru protecția capetelor de țeavă.', badge: 'Distribuit' },
];

const FAQ = [
  {
    q: 'Ce materiale sunt necesare pentru montajul unei fațade termoizolate?',
    a: 'Pe lângă plăcile termoizolante și adeziv, ai nevoie de dibluri și flanșe pentru fixare mecanică, colțare PVC cu plasă pentru protecția muchiilor și, în funcție de suport, ancore chimice sau distanțieri pentru elemente auxiliare.',
  },
  {
    q: 'Ce diferență este între distanțieri și dibluri?',
    a: 'Diblul fixează mecanic placa termoizolantă de suportul fațadei, transmițând forța de smulgere în perete. Distanțierul menține un spațiu uniform între elemente — de exemplu la rosturile de gresie sau la montajul unor structuri auxiliare — fără rol structural de fixare.',
  },
  {
    q: 'Ce profil se folosește la colțurile fațadei?',
    a: 'La colțurile exterioare ale fațadei se montează colțar PVC cu plasă din fibră de sticlă, care protejează muchia de impact mecanic și previne fisurarea tencuielii decorative în timp.',
  },
  {
    q: 'Livrați materiale de fațadă din stoc?',
    a: 'Produsele fabricate propriu (dibluri, flanșe) le avem în stoc permanent la Jilava, Ilfov. Pentru materialele distribuite, termenul de livrare variază în funcție de cantitate — vă confirmăm disponibilitatea la cerere de ofertă.',
  },
];

export default async function MaterialeFatadaPage() {
  let fabricate = DEFAULT_FABRICATE;
  let distribuite = DEFAULT_DISTRIBUITE;

  try {
    const { env } = getRequestContext();
    const kv = (env as any).PLASTDU_CONTENT as KVNamespace | undefined;
    if (kv) {
      const stored = await kv.get('produse');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.fabricate?.length) fabricate = parsed.fabricate;
        if (parsed.distribuite?.length) distribuite = parsed.distribuite;
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
      { '@type': 'ListItem', position: 2, name: 'Materiale fațadă', item: 'https://plastdu.ro/materiale-fatada' },
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
            <span className="text-slate-700 font-medium">Materiale fațadă</span>
          </div>
        </section>

        <section className="bg-brand-blue text-white section-padding">
          <div className="container-site">
            <p className="section-label !text-brand-accent/80 mb-3">Hub materiale</p>
            <h1 className="text-display-lg text-white mb-4">
              Materiale fațadă — Distanțieri, dibluri, ancore și accesorii construcții
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Tot ce ai nevoie pentru montajul unei fațade — de la dibluri și flanșe fabricate propriu,
              până la profile, colțare și elemente de fixare distribuite din stoc.
            </p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Ghid</p>
            <h2 className="mb-6">Ce materiale intră într-un proiect de fațadă</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Un proiect complet de fațadă — termoizolată sau nu — folosește mai multe categorii de
                materiale: elemente de fixare mecanică (dibluri, flanșe, ancore), elemente de protecție
                a muchiilor (colțare PVC cu plasă, profile de colț), elemente de fixare rapidă
                (șuruburi, tije filetate, piulițe, șaibe) și accesorii diverse (agățători, capace).
              </p>
              <p>
                Fabricăm propriu diblurile și flanșele — componentele critice pentru rezistența
                mecanică a fațadei — și distribuim restul materialelor necesare, astfel încât să
                aprovizionați un șantier dintr-un singur furnizor.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-neutral-surface">
          <div className="container-site">
            <p className="section-label mb-3">Producție proprie</p>
            <h2 className="mb-8">Dibluri și flanșe — fabricate la Jilava</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {fabricate.map((p) => (
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
          <div className="container-site">
            <p className="section-label mb-3">Materiale distribuite</p>
            <h2 className="mb-8">Profile, distanțieri și elemente de fixare</h2>
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

        <section className="section-padding bg-neutral-surface">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Întrebări frecvente</p>
            <h2 className="mb-8">Materiale fațadă — FAQ</h2>
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

        <section className="section-padding bg-white">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Vezi și</p>
            <h2 className="mb-6">Resurse conexe</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/produse/dibluri" className="px-4 py-2 rounded-lg bg-neutral-surface border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Hub dibluri — ghid complet
              </Link>
              <Link href="/sisteme/termoizolatie-eps" className="px-4 py-2 rounded-lg bg-neutral-surface border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Sistem termoizolație EPS
              </Link>
              <Link href="/sisteme/termoizolatie-vata-minerala" className="px-4 py-2 rounded-lg bg-neutral-surface border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Sistem termoizolație vată minerală
              </Link>
              <Link href="/produse" className="px-4 py-2 rounded-lg bg-neutral-surface border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Toate produsele
              </Link>
              <Link href="/despre-noi" className="px-4 py-2 rounded-lg bg-neutral-surface border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Despre Plast Du IV
              </Link>
            </div>
          </div>
        </section>

        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Aveți nevoie de materiale pentru un proiect de fațadă?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Vă pregătim o ofertă cu toate materialele necesare, dintr-un singur furnizor.
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
