export const runtime = "edge";

import type { Metadata } from "next";
import Link from "next/link";
import { getRequestContext } from "@cloudflare/next-on-pages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageWithFallback from "@/components/ImageWithFallback";
import NewsletterForm from "@/components/NewsletterForm";
import { ARTICOLE, readingTime, PRODUSE_FALLBACK, getBlogHeroImage, type ArticolSumar } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog tehnic — Ghiduri montaj dibluri, flanșe și termoizolație",
  description:
    "Ghiduri tehnice despre montajul diblurilor pentru termoizolație, calculul consumului pe m², alegerea dintre diblu plastic și metalic, fixare vată minerală, gips-carton și distanțieri beton.",
  keywords: [
    "blog tehnic dibluri",
    "ghid montaj termoizolatie",
    "cum se monteaza diblu polistiren",
    "ce diblu pentru vata minerala",
  ],
  alternates: { canonical: "https://plastdu.ro/blog" },
  openGraph: {
    title: "Blog tehnic Plast Du IV — Ghiduri montaj dibluri și termoizolație",
    description: "Ghiduri practice pentru montajul corect al diblurilor, flanșelor și accesoriilor de fixare în construcții.",
    url: "https://plastdu.ro/blog",
  },
};

const FALLBACK_SUMAR: ArticolSumar[] = ARTICOLE.map((a) => ({
  slug: a.slug,
  titlu: a.h1,
  excerpt: a.excerpt,
  data: a.date,
  categorie: a.categorie,
  imagine: getBlogHeroImage(
    a.slug,
    PRODUSE_FALLBACK[a.produsSlugs[0]]?.imagine ?? "/images/produse/dibluri-plastic/01.jpg"
  ),
}));

async function getArticoleSumar(): Promise<ArticolSumar[]> {
  try {
    const { env } = getRequestContext();
    const kv = (env as any).PLASTDU_CONTENT as KVNamespace;
    const stored = await kv.get("blog");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // foloseste fallback static
  }
  return FALLBACK_SUMAR;
}

export default async function BlogHubPage() {
  const articole = await getArticoleSumar();

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="bg-neutral-surface border-b border-neutral-border">
          <div className="container-site py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-brand-blue transition-colors">Acasă</Link>
              <span>/</span>
              <span className="text-slate-800 font-medium">Blog</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="section-padding bg-white">
          <div className="container-site">
            <p className="section-label">Resurse tehnice</p>
            <h1 className="mb-4 max-w-2xl">Blog tehnic — ghiduri de montaj și alegere a diblurilor</h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              Articole practice pentru ingineri, șefi de șantier și firme de construcții: montaj corect,
              calcule de consum, comparații între tipuri de dibluri și flanșe și greșeli frecvente de evitat.
            </p>
          </div>
        </section>

        {/* Grid articole */}
        <section className="section-padding bg-neutral-surface pt-0">
          <div className="container-site">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articole.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="card group flex flex-col overflow-hidden !p-0"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-surface">
                    <ImageWithFallback
                      src={a.imagine}
                      alt={a.titlu}
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent">
                        {a.categorie}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(a.data).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-brand-blue mb-2 group-hover:text-brand-accent transition-colors">
                      {a.titlu}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">{a.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue mt-4 group-hover:text-brand-accent transition-colors">
                      Citește articolul
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="section-padding bg-white">
          <div className="container-site max-w-xl text-center">
            <h2 className="mb-3">Primești ghidurile tehnice direct pe email</h2>
            <p className="text-slate-600 mb-6">
              Abonează-te și primești noile ghiduri de montaj, comparații de produse și calcule de consum,
              imediat ce le publicăm.
            </p>
            <NewsletterForm />
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Aveți nevoie de dibluri sau flanșe pentru proiectul dvs.?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Solicitați o ofertă personalizată pentru cantități mari, cu livrare în toată România.
            </p>
            <Link
              href="/contact?subiect=cerere-oferta"
              className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors"
            >
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
