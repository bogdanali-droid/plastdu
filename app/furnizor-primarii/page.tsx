export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageWithFallback from '@/components/ImageWithFallback';

export const metadata: Metadata = {
  title: 'Furnizor materiale reabilitare pentru primării și proiecte edilitare',
  description:
    'Furnizor român de dibluri și flanșe pentru licitații publice de reabilitare termică. ' +
    'Certificări ISO 9001/14001/45001, Coface, stoc permanent, livrare programată pe șantier.',
  alternates: { canonical: 'https://plastdu.ro/furnizor-primarii' },
  openGraph: {
    title: 'Furnizor materiale reabilitare pentru primării | Plast Du IV',
    description: 'Materiale de fixare pentru licitații publice de reabilitare edilitară.',
    url: 'https://plastdu.ro/furnizor-primarii',
  },
};

const FAQ = [
  {
    q: 'Ce documente puteți furniza pentru dosarul de licitație?',
    a: 'Punem la dispoziție fișe tehnice ale produselor, declarații de conformitate, certificatele ISO 9001, ISO 14001, ISO 45001 și raportul de bonitate Coface, documente uzual solicitate în dosarele de achiziție publică.',
  },
  {
    q: 'Livrați direct pe șantier sau doar la depozit?',
    a: 'Livrăm atât la depozit, cât și direct pe șantier, cu livrare programată în funcție de graficul de execuție comunicat de constructor sau de primărie.',
  },
  {
    q: 'Puteți emite factură pe firmă/instituție publică?',
    a: 'Da, emitem facturi pe firmă sau instituție publică, cu termene de plată negociabile pentru contracte de volum, conform practicii uzuale în relația cu constructorii și autoritățile locale.',
  },
  {
    q: 'Ce capacitate de producție aveți pentru comenzi mari?',
    a: 'Producem în stoc permanent diblurile și flanșele cele mai solicitate, iar pentru comenzi de volum mare planificăm producția în avans, pe baza unui grafic de livrare stabilit împreună cu clientul.',
  },
  {
    q: 'Lucrați cu constructori care participă la licitații de reabilitare?',
    a: 'Da, majoritatea clienților noștri sunt firme de construcții și distribuitori care furnizează materiale pentru proiecte de reabilitare termică derulate de primării și asociații de proprietari.',
  },
];

export default async function FurnizorPrimariiPage() {
  let imaginiFabrica: string[] = ['/images/fabrica/01.jpg', '/images/fabrica/04.jpg', '/images/fabrica/05.jpg'];
  let imaginiFabricare: string[] = [
    '/images/produse/dibluri-plastic/03.jpg',
    '/images/produse/dibluri-plastic/04.jpg',
    '/images/produse/dibluri-plastic/05.jpg',
  ];

  try {
    const { env } = getRequestContext();
    const kv = (env as any).PLASTDU_CONTENT as KVNamespace | undefined;
    if (kv) {
      const stored = await kv.get('despre');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.fabrica?.imagini?.length) imaginiFabrica = parsed.fabrica.imagini;
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
      { '@type': 'ListItem', position: 2, name: 'Furnizor primării', item: 'https://plastdu.ro/furnizor-primarii' },
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
            <span className="text-slate-700 font-medium">Furnizor primării și proiecte edilitare</span>
          </div>
        </section>

        <section className="bg-brand-blue text-white section-padding">
          <div className="container-site">
            <p className="section-label !text-brand-accent/80 mb-3">B2B & Licitații publice</p>
            <h1 className="text-display-lg text-white mb-4">
              Furnizor materiale reabilitare pentru primării și proiecte edilitare
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Producător român de dibluri și flanșe pentru sisteme de termoizolație, certificat ISO
              9001/14001/45001, cu stoc permanent și livrare programată pe șantier.
            </p>
            <div className="mt-8">
              <Link href="/contact?subiect=cerere-oferta" className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors">
                Solicitați ofertă rapidă
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Capabilități companie */}
        <section className="section-padding bg-white">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Cine suntem</p>
            <h2 className="mb-6">Capabilitățile companiei</h2>
            <p className="text-slate-600 leading-relaxed">
              Plast Du IV SRL este producător român de dibluri și flanșe pentru sisteme de
              termoizolație, cu fabrică proprie la Jilava, Ilfov. Aprovizionăm constructori,
              distribuitori și depozite din peste 8 județe, iar produsele noastre sunt folosite în
              proiecte de reabilitare termică a blocurilor derulate prin programe locale și
              naționale.
            </p>
          </div>
        </section>

        {/* Certificări */}
        <section className="section-padding bg-neutral-surface">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Calitate atestată</p>
            <h2 className="mb-6">Certificări ISO și Coface</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Compania deține certificările ISO 9001 (management al calității), ISO 14001
              (management de mediu) și ISO 45001 (sănătate și securitate ocupațională), documente
              solicitate frecvent în dosarele de achiziție publică. Beneficiem de asemenea de un
              rating de bonitate atestat de Coface.
            </p>
            <Link href="/despre-noi#certificari" className="inline-flex items-center gap-2 text-brand-accent font-semibold hover:underline">
              Vezi certificările complete
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Capacitate producție & stoc */}
        <section className="section-padding bg-white">
          <div className="container-site">
            <p className="section-label mb-3">Capacitate</p>
            <h2 className="mb-8">Producție și stoc</h2>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Producem în flux continuu diblurile și flanșele cele mai solicitate — cu cui plastic,
                  cui metalic și flanșă pentru vată minerală — pe care le menținem în stoc permanent
                  la depozitul din Jilava, Ilfov.
                </p>
                <p>
                  Pentru comenzi de volum mare, specifice proiectelor de reabilitare termică a mai
                  multor blocuri, planificăm producția în avans pe baza unui grafic de livrare stabilit
                  împreună cu constructorul sau instituția beneficiară.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {imaginiFabricare.slice(0, 2).map((img, i) => (
                  <div key={img} className={`relative h-40 rounded-xl overflow-hidden bg-slate-100 img-watermark ${i === 0 ? 'col-span-2 h-48' : ''}`}>
                    <ImageWithFallback
                      src={img}
                      alt="Producție dibluri Plast Du IV"
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ))}
                {imaginiFabrica[0] && (
                  <div className="col-span-2 relative h-40 rounded-xl overflow-hidden bg-slate-100 img-watermark">
                    <ImageWithFallback
                      src={imaginiFabrica[0]}
                      alt="Fabrică Plast Du IV — Jilava, Ilfov"
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Avantaje B2B */}
        <section className="section-padding bg-neutral-surface">
          <div className="container-site">
            <p className="section-label mb-3">Colaborare B2B</p>
            <h2 className="mb-8">Avantaje pentru primării și constructori</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card">
                <h3 className="text-base mb-2">Facturare pe firmă/instituție</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Emitem factură pe firmă sau instituție publică, conform cerințelor contractuale ale
                  proiectului.
                </p>
              </div>
              <div className="card">
                <h3 className="text-base mb-2">Termene de plată negociabile</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Pentru contracte de volum stabilim termene de plată adaptate ciclului de decontare al
                  proiectelor edilitare.
                </p>
              </div>
              <div className="card">
                <h3 className="text-base mb-2">Livrare programată</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Coordonăm livrările cu graficul de execuție al șantierului, direct pe amplasament sau
                  la depozit.
                </p>
              </div>
              <div className="card">
                <h3 className="text-base mb-2">Documentație completă</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Furnizăm fișe tehnice, declarații de conformitate și certificările companiei pentru
                  dosarul de achiziție.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-white">
          <div className="container-site max-w-4xl">
            <p className="section-label mb-3">Întrebări frecvente</p>
            <h2 className="mb-8">Furnizor primării — FAQ</h2>
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
              <Link href="/aplicatii/reabilitare-blocuri" className="px-4 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Reabilitare termică blocuri
              </Link>
              <Link href="/produse/dibluri" className="px-4 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Hub dibluri — ghid complet
              </Link>
              <Link href="/proiecte" className="px-4 py-2 rounded-lg bg-white border border-neutral-border text-sm font-medium text-brand-blue hover:border-brand-blue transition-colors">
                Proiecte realizate
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

        {/* CTA formular ofertă rapidă */}
        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Aveți un proiect edilitar în pregătire?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Trimiteți-ne necesarul estimat de materiale și vă răspundem cu o ofertă de preț,
              termene de livrare și documentația necesară dosarului de achiziție.
            </p>
            <Link href="/contact?subiect=cerere-oferta" className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors">
              Solicitați ofertă rapidă
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
