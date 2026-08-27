export const runtime = "edge";

import { ARTICOLE } from "@/lib/blog";

const BASE_URL = "https://plastdu.ro";

const PRODUSE_SLUGS = ["dibluri-plastic", "dibluri-metalice", "flansa-vata", "flansa-osb"];

interface SitemapEntry {
  loc: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
}

function buildEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [
    { loc: `${BASE_URL}/`, changefreq: "weekly", priority: "1.0" },
    { loc: `${BASE_URL}/produse`, changefreq: "weekly", priority: "0.9" },
    { loc: `${BASE_URL}/aplicatii`, changefreq: "monthly", priority: "0.9" },
    { loc: `${BASE_URL}/despre-noi`, changefreq: "monthly", priority: "0.6" },
    { loc: `${BASE_URL}/proiecte`, changefreq: "monthly", priority: "0.6" },
    { loc: `${BASE_URL}/contact`, changefreq: "yearly", priority: "0.6" },
    { loc: `${BASE_URL}/blog`, changefreq: "weekly", priority: "0.8" },
  ];

  for (const slug of PRODUSE_SLUGS) {
    entries.push({ loc: `${BASE_URL}/produse/${slug}`, changefreq: "monthly", priority: "0.8" });
  }

  for (const articol of ARTICOLE) {
    entries.push({
      loc: `${BASE_URL}/blog/${articol.slug}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: articol.date,
    });
  }

  return entries;
}

export async function GET() {
  const entries = buildEntries();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>
${e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : ""}    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
