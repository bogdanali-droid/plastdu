import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalerieProduse from "./GalerieProduse";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = 'edge';

type ProdusData = {
  slug: string;
  titlu: string;
  categorie: string;
  descriere: string;
  imagine?: string;
  galerie?: string[];
  specificatii?: string[];
  variante?: string;
  livrare?: string;
  badge?: string;
};

async function getProdus(slug: string): Promise<ProdusData | null> {
  try {
    const { env } = getRequestContext();
    const kv = (env as any).PLASTDU_CONTENT as KVNamespace | undefined;
    if (!kv) return null;
    const raw = await kv.get('produse');
    if (!raw) return null;
    const data = JSON.parse(raw);
    const all = [...(data.fabricate || []), ...(data.distribuite || [])];
    return all.find((p: any) => p.slug === slug) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const produs = await getProdus(params.slug);
  if (!produs) return { title: 'Produs indisponibil' };

  const title = `${produs.titlu} — ${produs.categorie} | Plast Du IV`;
  const description = produs.descriere.slice(0, 155) + (produs.descriere.length > 155 ? '...' : '');

  return {
    title,
    description,
    alternates: { canonical: `https://plastdu.ro/produse/${params.slug}` },
    openGraph: {
      title,
      description,
      url: `https://plastdu.ro/produse/${params.slug}`,
      type: 'website',
      images: produs.imagine ? [{ url: produs.imagine, alt: produs.titlu }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: produs.imagine ? [produs.imagine] : undefined,
    },
  };
}

export default async function PagProdusDetal({ params }: { params: { slug: string } }) {
  const produs = await getProdus(params.slug);
  if (!produs) notFound();

  const imagineaMax = produs.imagine || '';
  const galerie = produs.galerie || [];
  const totalImagini = [imagineaMax, ...galerie].filter(Boolean);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": produs.titlu,
    "description": produs.descriere,
    "category": produs.categorie,
    "brand": { "@type": "Brand", "name": "Plast Du IV" },
    "manufacturer": { "@type": "Organization", "name": "Plast Du IV SRL" },
    "image": totalImagini.map((img) => (img.startsWith('http') ? img : `https://plastdu.ro${img}`)),
    "url": `https://plastdu.ro/produse/${produs.slug}`,
    "offers": {
      "@type": "Offer",
      "url": `https://plastdu.ro/produse/${produs.slug}`,
      "priceCurrency": "RON",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": { "@type": "Organization", "name": "Plast Du IV SRL" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://plastdu.ro" },
      { "@type": "ListItem", "position": 2, "name": "Produse", "item": "https://plastdu.ro/produse" },
      { "@type": "ListItem", "position": 3, "name": produs.titlu, "item": `https://plastdu.ro/produse/${produs.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />
      <main>
        <section className="bg-neutral-surface border-b border-neutral-border">
          <nav aria-label="Breadcrumb" className="container-site py-3">
            <ol className="flex items-center gap-2 text-sm text-slate-500">
              <li>
                <Link href="/" className="hover:text-brand-blue transition-colors">Acasă</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/produse" className="hover:text-brand-blue transition-colors">Produse</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-slate-700 font-medium">{produs.titlu}</li>
            </ol>
          </nav>
        </section>

        <section className="section-padding bg-white">
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <GalerieProduse
                slug={params.slug}
                imagini={totalImagini.length > 0 ? totalImagini.map(u => u.replace('/api/img/', '').split('/').pop() || u) : []}
                titlu={produs.titlu}
              />

              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      produs.badge === 'Produs propriu'
                        ? 'bg-brand-accent/10 text-brand-accent'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {produs.badge || 'Produs'}
                    </span>
                    <span className="text-xs text-slate-400">{produs.categorie}</span>
                  </div>
                  <h1 className="text-display-sm mb-3">{produs.titlu}</h1>
                  <p className="text-slate-600 leading-relaxed">{produs.descriere}</p>
                </div>

                {produs.specificatii && produs.specificatii.length > 0 && (
                  <div className="bg-neutral-surface rounded-xl p-5 border border-neutral-border">
                    <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
                      Specificații tehnice
                    </h2>
                    <ul className="space-y-2">
                      {produs.specificatii.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0 mt-1.5" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(produs.variante || produs.livrare) && (
                  <div className="grid grid-cols-2 gap-4">
                    {produs.variante && (
                      <div className="bg-blue-50 rounded-xl p-4">
                        <p className="text-xs font-semibold text-brand-blue uppercase tracking-wide mb-1">Variante</p>
                        <p className="text-sm text-slate-700">{produs.variante}</p>
                      </div>
                    )}
                    {produs.livrare && (
                      <div className="bg-blue-50 rounded-xl p-4">
                        <p className="text-xs font-semibold text-brand-blue uppercase tracking-wide mb-1">Livrare</p>
                        <p className="text-sm text-slate-700">{produs.livrare}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/contact?subiect=cerere-oferta"
                    className="inline-flex items-center justify-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-blue/90 transition-colors"
                  >
                    Solicitați ofertă
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/produse"
                    className="inline-flex items-center justify-center gap-2 border border-neutral-border text-slate-600 font-semibold px-6 py-3 rounded-xl hover:border-brand-blue hover:text-brand-blue transition-colors"
                  >
                    ← Înapoi la produse
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Aveți nevoie de cantități mari sau ofertă personalizată?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Lucrăm direct cu firme de construcții, antreprenori și distribuitori.
              Contactați-ne pentru prețuri de volum și termene de livrare.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors"
            >
              Contactați-ne
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
