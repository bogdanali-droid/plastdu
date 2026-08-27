/**
 * Imagini hero reale (Unsplash) pentru articolele de blog, cate una per slug.
 * Folosim URL-uri directe images.unsplash.com cu parametri de resize (gratuite,
 * fara CORS, licenta Unsplash permite folosire comerciala fara atributie).
 * Fallback (slug fara poza reala): SVG-ul minimalist din /public/blog-heroes/{slug}.svg,
 * daca exista pentru slug-ul respectiv, altfel imaginea de produs primita ca parametru.
 */
export const BLOG_HEROES: Record<string, string> = {
  "cum-se-monteaza-diblul-pentru-polistiren":
    "https://images.unsplash.com/photo-1646082276009-bb35409086ed",
  "cate-dibluri-pe-metru-patrat-termosistem":
    "https://images.unsplash.com/photo-1653280679689-078c04c417a1",
  "diblu-plastic-vs-metalic-termoizolatie":
    "https://images.unsplash.com/photo-1758345680667-bd6008f4021b",
  "ce-diblu-pentru-vata-minerala":
    "https://images.unsplash.com/photo-1634213587842-344d5ada82d7",
  "ce-diblu-pentru-gips-carton":
    "https://images.unsplash.com/photo-1482731215275-a1f151646268",
  "flansa-osb-vs-flansa-vata-minerala":
    "https://images.unsplash.com/photo-1769971361807-1e3d025c2abb",
  "greseli-frecvente-la-montarea-diblurilor-termosistem":
    "https://images.unsplash.com/photo-1533427221277-ccf4a4e89bc8",
  "distantieri-beton-ghid-alegere":
    "https://images.unsplash.com/photo-1582540730843-f4418d96ccbe",
};

const UNSPLASH_PARAMS = "w=1600&h=900&fit=crop&auto=format&q=80";

/** Slug-uri cu SVG minimalist disponibil in /public/blog-heroes/{slug}.svg, folosit ca fallback secundar. */
const SVG_FALLBACK_SLUGS = new Set([
  "cate-dibluri-pe-metru-patrat-termosistem",
  "ce-diblu-pentru-gips-carton",
  "ce-diblu-pentru-vata-minerala",
  "cum-se-monteaza-diblul-pentru-polistiren",
  "diblu-plastic-vs-metalic-termoizolatie",
  "distantieri-beton-ghid-alegere",
  "flansa-osb-vs-flansa-vata-minerala",
  "greseli-frecvente-la-montarea-diblurilor-termosistem",
]);

/**
 * Returneaza URL-ul hero pentru slug:
 * 1. poza reala Unsplash (cu parametrii de resize aplicati), daca exista in BLOG_HEROES;
 * 2. altfel SVG-ul minimalist /blog-heroes/{slug}.svg, daca exista pentru slug;
 * 3. altfel fallback-ul dat (de regula imaginea de produs).
 */
export function getBlogHeroImage(slug: string, fallback: string): string {
  const base = BLOG_HEROES[slug];
  if (base) return `${base}?${UNSPLASH_PARAMS}`;
  if (SVG_FALLBACK_SLUGS.has(slug)) return `/blog-heroes/${slug}.svg`;
  return fallback;
}
