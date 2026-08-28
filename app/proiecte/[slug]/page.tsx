export const runtime = "edge";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageWithFallback from "@/components/ImageWithFallback";
import { CASE_STUDIES, getCaseStudy } from "@/lib/proiecte/case-studies";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const caseStudy = getCaseStudy(params.slug);
  if (!caseStudy) return {};
  const url = `https://plastdu.ro/proiecte/${caseStudy.slug}`;
  return {
    title: caseStudy.titlu,
    description: caseStudy.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: caseStudy.titlu,
      description: caseStudy.excerpt,
      url,
      images: [{ url: `https://plastdu.ro${caseStudy.imagini[0]}`, width: 1200, height: 630 }],
      type: "article",
    },
  };
}

export default function ProiectDetaliuPage({ params }: { params: { slug: string } }) {
  const caseStudy = getCaseStudy(params.slug);
  if (!caseStudy) notFound();

  const url = `https://plastdu.ro/proiecte/${caseStudy.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.titlu,
    description: caseStudy.excerpt,
    image: caseStudy.imagini.map((img) => `https://plastdu.ro${img}`),
    datePublished: `${caseStudy.an}-01-01`,
    author: { "@type": "Organization", name: "Plast Du IV SRL" },
    publisher: {
      "@type": "Organization",
      name: "Plast Du IV SRL",
      logo: { "@type": "ImageObject", url: "https://plastdu.ro/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Acasă", item: "https://plastdu.ro/" },
      { "@type": "ListItem", position: 2, name: "Proiecte", item: "https://plastdu.ro/proiecte" },
      { "@type": "ListItem", position: 3, name: caseStudy.titlu, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main>
        {/* Breadcrumb */}
        <nav className="bg-neutral-surface border-b border-neutral-border" aria-label="Breadcrumb">
          <div className="container-site py-3 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-brand-blue transition-colors">Acasă</Link>
            <span>/</span>
            <Link href="/proiecte" className="hover:text-brand-blue transition-colors">Proiecte</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium line-clamp-1">{caseStudy.titlu}</span>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-brand-blue text-white section-padding">
          <div className="container-site">
            <p className="section-label !text-brand-accent/80 mb-3">Studiu de caz — {caseStudy.locatie}</p>
            <h1 className="text-display-lg text-white mb-4">{caseStudy.titlu}</h1>
            <p className="text-lg text-blue-100 max-w-2xl">{caseStudy.excerpt}</p>
          </div>
        </section>

        {/* Galerie hero */}
        <section className="bg-white py-10">
          <div className="container-site">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {caseStudy.imagini.map((img, i) => (
                <div
                  key={img}
                  className={`relative rounded-2xl overflow-hidden bg-neutral-surface img-watermark ${
                    i === 0 ? "sm:col-span-2 sm:row-span-2 aspect-[4/3]" : "aspect-square"
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${caseStudy.titlu} — imagine ${i + 1}`}
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Context */}
        <section className="section-padding bg-neutral-surface">
          <div className="container-site max-w-3xl">
            <p className="section-label">Context proiect</p>
            <h2 className="mb-6">Unde, când și ce cantitate</h2>
            <div className="space-y-4">
              {caseStudy.context.map((p, i) => (
                <p key={i} className="text-slate-600 leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Sarcini tehnice */}
        <section className="section-padding bg-white">
          <div className="container-site max-w-3xl">
            <p className="section-label">Execuție</p>
            <h2 className="mb-6">Sarcini tehnice</h2>
            <ul className="space-y-3">
              {caseStudy.sarciniTehnice.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0 mt-2" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Materiale */}
        <section className="section-padding bg-neutral-surface">
          <div className="container-site max-w-3xl">
            <p className="section-label">Materiale folosite</p>
            <h2 className="mb-6">Produse Plast Du IV pe acest șantier</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {caseStudy.materiale.map((m) => (
                <Link key={m.slug} href={`/produse/${m.slug}`} className="card group !p-5">
                  <h3 className="text-sm font-semibold text-brand-blue mb-1.5 group-hover:text-brand-accent transition-colors">
                    {m.titlu}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{m.nota}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Rezultat */}
        <section className="section-padding bg-white">
          <div className="container-site max-w-3xl">
            <p className="section-label">Rezultat</p>
            <h2 className="mb-6">Ce a livrat proiectul</h2>
            <div className="space-y-4">
              {caseStudy.rezultat.map((p, i) => (
                <p key={i} className="text-slate-600 leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Vrei un proiect similar?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Livrăm materiale pentru reabilitare termică la scară largă, cu aprovizionare
              eșalonată corelată cu ritmul de execuție al șantierului dumneavoastră.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?subiect=cerere-oferta"
                className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors"
              >
                Solicită ofertă
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/proiecte"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
              >
                Vezi toate proiectele
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
