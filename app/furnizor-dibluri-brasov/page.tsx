export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Furnizor Dibluri și Materiale Construcții Brașov — Zonă Montană',
  description:
    'Producător și furnizor de dibluri, flanșe și materiale fațadă pentru șantiere din Brașov și zonele montane. ' +
    'Materiale pentru izolații superioare, rezistente la temperaturi scăzute. Livrare rapidă, prețuri en-gros.',
  alternates: { canonical: 'https://plastdu.ro/furnizor-dibluri-brasov' },
  openGraph: {
    title: 'Furnizor Dibluri Brașov — Plast Du IV',
    description: 'Producător de dibluri termoizolante și materiale fațadă pentru șantiere din Brașov și zona montană.',
    url: 'https://plastdu.ro/furnizor-dibluri-brasov',
    type: 'website',
  },
};

const HERO_IMAGE = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&h=900&fit=crop&auto=format&q=80';

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
    q: 'Livrați materiale de construcții în Brașov și zona montană?',
    a: 'Da. Livrăm în Brașov, Săcele, Predeal, Râșnov, Zărnești și Poiana Brașov, prin curier extern sau transport propriu pentru comenzi mari. Ținem cont de accesul dificil iarna în zonele montane și planificăm livrările în consecință.',
  },
  {
    q: 'Ce grosime de izolație recomandați pentru clădiri din zona montană?',
    a: 'Zonele montane din jurul Brașovului au cerințe de izolație termică superioare celor din câmpie, din cauza temperaturilor mai scăzute și a numărului mai mare de grade-zile de încălzire. Recomandăm dibluri cu lungime adaptată grosimilor mai mari de EPS/vată minerală (14-20cm), verificate cu proiectul de eficiență energetică.',
  },
  {
    q: 'Materialele funcționează la temperaturi scăzute, specifice zonei montane?',
    a: 'Da, gama noastră de dibluri și accesorii e concepută pentru condiții climatice variate din România. Recomandăm însă evitarea montajului adezivilor și tencuielilor sub limita minimă de temperatură indicată pe fișa tehnică a fiecărui produs, frecventă iarna în zona montană.',
  },
  {
    q: 'Livrați pentru cabane și structuri turistice din zona montană?',
    a: 'Da, livrăm materiale de fixare și fațadă pentru construcții turistice — pensiuni, cabane, hoteluri de munte — din zona Poiana Brașov, Predeal și Bran, adaptate la specificul acestor proiecte, adesea cu acces auto limitat.',
  },
  {
    q: 'Ce termen de livrare aveți pentru Brașov din depozitul central?',
    a: 'Termenul standard este de 1-2 zile lucrătoare din depozitul de la Jilava pentru Brașov oraș. Pentru zonele montane mai greu accesibile (Poiana Brașov, Bran, Moeciu) planificăm livrarea împreună cu clientul, în funcție de condițiile de drum.',
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
  '@id': 'https://plastdu.ro/furnizor-dibluri-brasov#local',
  name: 'Plast Du IV — Furnizor Dibluri Brașov',
  url: 'https://plastdu.ro/furnizor-dibluri-brasov',
  telephone: '+40724658491',
  areaServed: [
    { '@type': 'City', name: 'Brașov' },
    { '@type': 'AdministrativeArea', name: 'Județul Brașov' },
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
    { '@type': 'ListItem', position: 2, name: 'Furnizor Brașov', item: 'https://plastdu.ro/furnizor-dibluri-brasov' },
  ],
};

export default async function FurnizorBrasovPage() {
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
            <p className="section-label !text-brand-accent/80 mb-3">Brașov · Zonă montană</p>
            <h1 className="text-display-lg text-white mb-4">Furnizor Dibluri și Materiale Construcții Brașov</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Producător de dibluri termoizolante, flanșe vată minerală și materiale fațadă pentru șantiere
              din Brașov și zonele montane din jur. Materiale adaptate pentru izolații superioare, livrare
              rapidă din depozitul de la Jilava, prețuri en-gros.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact?subiect=cerere-oferta-brasov" className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors">
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
                <p className="text-sm text-slate-500">livrare Brașov din Jilava</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-blue mb-1">14-20cm</p>
                <p className="text-sm text-slate-500">dibluri pentru izolații superioare</p>
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
              <img src={HERO_IMAGE} alt="Zonă montană Brașov — construcții cu izolații superioare" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <p className="section-label mb-3">De ce Plast Du IV pentru Brașov</p>
                <h2 className="mb-6">Izolații gândite pentru climat montan</h2>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>Zona Brașov și localitățile montane din jur (Predeal, Poiana Brașov, Bran) cer grosimi de termoizolație mai mari decât media țării, din cauza temperaturilor scăzute pe perioade lungi. Fabricăm dibluri și accesorii de fixare adaptate acestor grosimi, la fabrica din Jilava, Ilfov.</p>
                  <p>Lucrăm cu firme de construcții și antreprenori activi pe reabilitarea termică a blocurilor din Brașov și Săcele, dar și cu constructori de cabane și structuri turistice din zona montană, unde logistica de livrare cere planificare atentă.</p>
                  <p><strong>Zone acoperite:</strong> Brașov (toate cartierele), Săcele, Predeal, Râșnov, Zărnești, Poiana Brașov, Bran și localitățile din Țara Bârsei.</p>
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
            <p className="section-label mb-3">Proiecte tipice în zona montană</p>
            <h2 className="mb-8">Unde ne folosesc antreprenorii din Brașov</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { t: 'Reabilitare termică blocuri', d: 'Izolații cu grosime superioară, adaptate climatului montan din Brașov și Săcele.' },
                { t: 'Cabane și structuri turistice', d: 'Materiale de fixare pentru pensiuni și hoteluri de munte din Poiana Brașov, Predeal, Bran.' },
                { t: 'Rezidențial nou de munte', d: 'Case și ansambluri rezidențiale noi cu izolații performante pentru climatul rece.' },
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
            <h2 className="mb-8">FAQ furnizor Brașov</h2>
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
              <Link href="/sisteme/termoizolatie-vata-minerala" className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue/10 transition-colors">Sistem termoizolație vată minerală</Link>
              <Link href="/produse/dibluri" className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue/10 transition-colors">Toate diblurile</Link>
              <Link href="/blog/diferenta-diblu-8mm-vs-10mm" className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue/10 transition-colors">Diblu 8mm vs 10mm</Link>
              <Link href="/furnizor-dibluri-cluj" className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue/10 transition-colors">Furnizor Cluj-Napoca</Link>
            </div>
          </div>
        </section>

        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Comandați astăzi — livrăm în Brașov</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">Sunați 0724 658 491 sau trimiteți lista pe office@plastdu.ro. Vă revenim cu ofertă în aceeași zi.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+40724658491" className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors">0724 658 491</a>
              <Link href="/contact?subiect=cerere-oferta-brasov" className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">Formular ofertă</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
