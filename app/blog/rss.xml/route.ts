export const runtime = 'edge';

import { ARTICOLE } from '@/lib/blog';

const BASE_URL = 'https://plastdu.ro';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRfc822(dateIso: string): string {
  const d = new Date(dateIso);
  return d.toUTCString();
}

export async function GET() {
  const items = [...ARTICOLE]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((a) => {
      const link = `${BASE_URL}/blog/${a.slug}`;
      return `  <item>
    <title>${escapeXml(a.h1)}</title>
    <link>${link}</link>
    <description>${escapeXml(a.excerpt)}</description>
    <pubDate>${toRfc822(a.date)}</pubDate>
    <guid isPermaLink="true">${link}</guid>
    <category>${escapeXml(a.categorie)}</category>
  </item>`;
    })
    .join('\n');

  const lastBuildDate = new Date(
    [...ARTICOLE].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]?.date ?? Date.now()
  ).toUTCString();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Blog Plast Du IV — Ghiduri dibluri, flanșe și termoizolație</title>
  <link>${BASE_URL}/blog</link>
  <description>Ghiduri tehnice despre montajul diblurilor pentru termoizolație, flanșe, distanțieri și materiale de fațadă, publicate de producătorul Plast Du IV.</description>
  <language>ro-RO</language>
  <lastBuildDate>${lastBuildDate}</lastBuildDate>
  <atom:link href="${BASE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
