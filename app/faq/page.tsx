export const runtime = "edge";

import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqSearch, { type FaqEntry } from "@/components/FaqSearch";
import NewsletterForm from "@/components/NewsletterForm";
import { ARTICOLE } from "@/lib/blog";
import { HUB_FAQ } from "@/lib/faq/hub-faq";
import { classifyFaq } from "@/lib/faq/classify";

export const metadata: Metadata = {
  title: "FAQ — Întrebări frecvente dibluri, flanșe și termoizolație",
  description:
    "Toate întrebările frecvente despre dibluri, flanșe, materiale de fațadă și termoizolație, într-un singur loc, cu răspunsuri tehnice concrete.",
  alternates: { canonical: "https://plastdu.ro/faq" },
  openGraph: {
    title: "FAQ — Întrebări frecvente dibluri, flanșe și termoizolație",
    description:
      "Ghid complet de întrebări și răspunsuri tehnice despre dibluri, flanșe, materiale de fațadă și termoizolație.",
    url: "https://plastdu.ro/faq",
  },
};

export default function FaqPage() {
  const dinArticole: FaqEntry[] = ARTICOLE.flatMap((a) =>
    (a.faq ?? []).map((f) => ({
      q: f.q,
      a: f.a,
      category: classifyFaq(f.q),
      source: `/blog/${a.slug}`,
      sourceLabel: a.h1,
    }))
  );

  const dinHub: FaqEntry[] = HUB_FAQ.map((f) => ({
    q: f.q,
    a: f.a,
    category: classifyFaq(f.q),
    source: f.source,
    sourceLabel: f.source,
  }));

  // Dedupe pe baza întrebării (unele întrebări se repetă între articole/hub-uri)
  const seen = new Set<string>();
  const allFaq: FaqEntry[] = [];
  for (const item of [...dinArticole, ...dinHub]) {
    const key = item.q.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    allFaq.push(item);
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Acasă", item: "https://plastdu.ro/" },
      { "@type": "ListItem", position: 2, name: "FAQ", item: "https://plastdu.ro/faq" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main>
        <section className="bg-brand-blue text-white section-padding">
          <div className="container-site">
            <p className="section-label !text-brand-accent/80 mb-3">Centru de ajutor</p>
            <h1 className="text-display-lg text-white mb-4">
              Întrebări frecvente — Ghid complet dibluri, flanșe și termoizolație
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              {allFaq.length} întrebări și răspunsuri tehnice, adunate din ghidurile noastre de blog,
              paginile de sisteme de termoizolație și calculatorul de dibluri. Caută rapid sau
              filtrează pe categorie.
            </p>
          </div>
        </section>

        <section className="section-padding bg-neutral-surface">
          <div className="container-site max-w-4xl">
            <FaqSearch items={allFaq} />
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

        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Nu ți-am răspuns la întrebare?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Echipa noastră tehnică răspunde direct la întrebări despre produse, montaj sau
              comenzi en-gros.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="tel:+40724658491"
                className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors"
              >
                Sună 0724 658 491
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
              >
                Trimite un mesaj
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
