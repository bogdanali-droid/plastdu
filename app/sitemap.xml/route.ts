export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';

const BASE_URL = 'https://plastdu.ro';

const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/produse', priority: 0.9, changefreq: 'weekly' },
  { path: '/produse/dibluri', priority: 0.9, changefreq: 'weekly' },
  { path: '/materiale-fatada', priority: 0.9, changefreq: 'weekly' },
  { path: '/sisteme/termoizolatie-eps', priority: 0.9, changefreq: 'weekly' },
  { path: '/sisteme/termoizolatie-vata-minerala', priority: 0.9, changefreq: 'weekly' },
  { path: '/aplicatii', priority: 0.8, changefreq: 'monthly' },
  { path: '/aplicatii/reabilitare-blocuri', priority: 0.9, changefreq: 'monthly' },
  { path: '/furnizor-primarii', priority: 0.9, changefreq: 'monthly' },
  { path: '/proiecte', priority: 0.8, changefreq: 'weekly' },
  { path: '/despre-noi', priority: 0.7, changefreq: 'monthly' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
];

export async function GET() {
  const today = '2026-08-27';
  const urls: { loc: string; priority: number; changefreq: string; lastmod?: string }[] = [];

  for (const r of STATIC_ROUTES) {
    urls.push({ loc: `${BASE_URL}${r.path}`, priority: r.priority, changefreq: r.changefreq, lastmod: today });
  }

  try {
    const { env } = getRequestContext();
    const kv = (env as any).PLASTDU_CONTENT as KVNamespace | undefined;
    if (kv) {
      const produseRaw = await kv.get('produse');
      if (produseRaw) {
        const produse = JSON.parse(produseRaw);
        const allProducts = [...(produse.fabricate || []), ...(produse.distribuite || [])];
        for (const p of allProducts) {
          if (p.slug) {
            urls.push({ loc: `${BASE_URL}/produse/${p.slug}`, priority: 0.8, changefreq: 'monthly', lastmod: today });
          }
        }
      }
    }
  } catch {}

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
