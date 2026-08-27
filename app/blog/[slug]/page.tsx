export const runtime = "edge";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageWithFallback from "@/components/ImageWithFallback";
import BlogBlocks from "@/components/BlogBlocks";
import { ARTICOLE, getArticol, getArticoleConexe, readingTime, PRODUSE_FALLBACK } from "@/lib/blog";
import { getImagineProdus } from "@/lib/blog/produse-kv";

export function generateStaticParams() {
  return ARTICOLE.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const articol = getArticol(params.slug);
  if (!articol) return {};

  const { imagine } = await getImagineProdus(articol.produsSlugs[0]);
  const url = `https://plastdu.ro/blog/${articol.slug}`;

  return {
    title: articol.metaTitle,
    description: articol.metaDescription,
    keywords: articol.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: articol.metaTitle,
      description: articol.metaDescription,
      url,
      images: [{ url: imagine, width: 1200, height: 630 }],
      type: "article",
      publishedTime: articol.date,
    },
  };
}

export default async function BlogArticolPage({ params }: { params: { slug: string } }) {
  const articol = getArticol(params.slug);
  if (!articol) notFound();

  const { imagine } = await getImagineProdus(articol.produsSlugs[0]);
  const conexe = getArticoleConexe(articol);
  const minute = readingTime(articol);
  const url = `https://plastdu.ro/blog/${articol.slug}`;
  const dataFormatata = new Date(articol.date).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: articol.h1,
    description: articol.metaDescription,
    image: [`https://plastdu.ro${imagine}`],
    datePublished: articol.date,
    dateModified: articol.date,
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
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://plastdu.ro/blog" },
      { "@type": "ListItem", position: 3, name: articol.h1, item: url },
    ],
  };

  const faqSchema = articol.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: articol.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <Header />
      <main>
        <article>
          {/* Breadcrumb */}
          <nav className="bg-neutral-surface border-b border-neutral-border" aria-label="Breadcrumb">
            <div className="container-site py-3 flex items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="hover:text-brand-blue transition-colors">Acasă</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-brand-blue transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-slate-700 font-medium line-clamp-1">{articol.h1}</span>
            </div>
          </nav>

          {/* Hero */}
          <section className="section-padding pb-10 bg-white">
            <div className="container-site max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent">
                  {articol.categorie}
                </span>
                <span className="text-xs text-slate-400">{dataFormatata}</span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-400">{minute} min citire</span>
              </div>
              <h1 className="mb-4">{articol.h1}</h1>
              <p className="text-lg text-slate-600">{articol.excerpt}</p>
            </div>
          </section>

          {/* Imagine principala */}
          <section className="bg-white pb-10">
            <div className="container-site max-w-3xl">
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-surface">
                <ImageWithFallback
                  src={`/blog-heroes/${articol.slug}.svg`}
                  alt={articol.h1}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 768px"
                />
              </div>
            </div>
          </section>

          {/* Continut principal */}
          <section className="bg-white pb-4">
            <div className="container-site flex justify-center">
              <BlogBlocks blocks={articol.blocks} />
            </div>
          </section>

          {/* Produse conexe */}
          <section className="bg-white pb-14">
            <div className="container-site flex justify-center">
              <div className="max-w-3xl w-full">
                <div className="bg-neutral-surface rounded-2xl border border-neutral-border p-6">
                  <h2 className="text-base font-semibold text-slate-700 uppercase tracking-wide mb-4">
                    Produse recomandate
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {articol.produsSlugs.map((slug) => (
                      <Link
                        key={slug}
                        href={`/produse/${slug}`}
                        className="inline-flex items-center gap-2 bg-white border border-neutral-border rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-blue hover:border-brand-blue transition-colors"
                      >
                        {PRODUSE_FALLBACK[slug]?.titlu ?? slug}
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                    {articol.hubLinks.map((h) => (
                      <Link
                        key={h.href}
                        href={h.href}
                        className="inline-flex items-center gap-2 bg-brand-blue/5 border border-brand-blue/10 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue/10 transition-colors"
                      >
                        {h.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          {articol.faq && (
            <section className="section-padding bg-neutral-surface">
              <div className="container-site flex justify-center">
                <div className="max-w-3xl w-full">
                  <p className="section-label">Întrebări frecvente</p>
                  <h2 className="mb-8">Ce mai vor să știe cititorii</h2>
                  <div className="space-y-4">
                    {articol.faq.map((f) => (
                      <div key={f.q} className="bg-white rounded-2xl border border-neutral-border p-5">
                        <h3 className="text-base font-semibold text-slate-800 mb-2">{f.q}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{f.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="section-padding bg-brand-blue text-white">
            <div className="container-site text-center">
              <h2 className="text-white mb-4">Ai nevoie de produse? Solicită ofertă</h2>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                Lucrăm direct cu firme de construcții, antreprenori și distribuitori, cu prețuri
                competitive pentru comenzi în volum și livrare în toată România.
              </p>
              <Link
                href="/contact?subiect=cerere-oferta"
                className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors"
              >
                Solicită ofertă
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>

          {/* Articole conexe */}
          {conexe.length > 0 && (
            <section className="section-padding bg-white">
              <div className="container-site">
                <p className="section-label">Continuă lectura</p>
                <h2 className="mb-8">Articole conexe</h2>
                <div className="grid sm:grid-cols-3 gap-6">
                  {conexe.map((c) => (
                    <Link key={c.slug} href={`/blog/${c.slug}`} className="card group !p-5">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent">
                        {c.categorie}
                      </span>
                      <h3 className="text-base font-semibold text-brand-blue mt-3 mb-2 group-hover:text-brand-accent transition-colors">
                        {c.h1}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{c.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
