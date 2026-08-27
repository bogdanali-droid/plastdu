export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "note"; text: string };

export interface FAQItem {
  q: string;
  a: string;
}

export interface Articol {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  excerpt: string;
  date: string; // ISO
  categorie: string;
  /** slug-uri produse /produse/[slug] — primul e folosit si pt. imaginea OG */
  produsSlugs: string[];
  hubLinks: { href: string; label: string }[];
  relatedSlugs: string[];
  faq?: FAQItem[];
  blocks: Block[];
}

export function countWords(a: Articol): number {
  let words = 0;
  const count = (s: string) => {
    words += s.trim().split(/\s+/).filter(Boolean).length;
  };
  count(a.h1);
  for (const b of a.blocks) {
    if (b.type === "p" || b.type === "h2" || b.type === "h3" || b.type === "note") count(b.text);
    if (b.type === "ul" || b.type === "ol") b.items.forEach(count);
    if (b.type === "table") {
      b.headers.forEach(count);
      b.rows.forEach((r) => r.forEach(count));
    }
  }
  if (a.faq) a.faq.forEach((f) => { count(f.q); count(f.a); });
  return words;
}

export function readingTime(a: Articol): number {
  return Math.max(1, Math.ceil(countWords(a) / 200));
}

/** Fallback local pt. produsele fabricate (sincron cu app/produse/page.tsx) */
export const PRODUSE_FALLBACK: Record<string, { titlu: string; imagine: string }> = {
  "dibluri-plastic": { titlu: "Dibluri Cui Plastic (Poliamidă)", imagine: "/images/produse/dibluri-plastic/01.jpg" },
  "dibluri-metalice": { titlu: "Dibluri Cui Metalic Zincat", imagine: "/images/produse/dibluri-metalice/01.jpg" },
  "flansa-vata": { titlu: "Flanșă Vată Minerală", imagine: "/images/produse/flansa-vata/01.jpg" },
  "flansa-osb": { titlu: "Flanșă OSB / Capac (TSF-F55)", imagine: "/images/produse/flansa-osb/01.jpg" },
};
