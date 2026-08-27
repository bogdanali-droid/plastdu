import { getRequestContext } from "@cloudflare/next-on-pages";
import { PRODUSE_FALLBACK } from "./types";

/**
 * Returneaza harta slug -> {titlu, imagine} pentru produsele fabricate,
 * citind din KV 'produse' (acelasi format ca app/produse/page.tsx),
 * cu fallback la lista statica din types.ts daca KV nu e disponibil.
 */
export async function getProduseImagini(): Promise<Record<string, { titlu: string; imagine: string }>> {
  try {
    const { env } = getRequestContext();
    const kv = (env as any).PLASTDU_CONTENT as KVNamespace;
    const stored = await kv.get("produse");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed.fabricate)) {
        const map: Record<string, { titlu: string; imagine: string }> = {};
        for (const p of parsed.fabricate) {
          if (p?.slug && p?.imagine) {
            map[p.slug] = { titlu: p.titlu ?? p.slug, imagine: p.imagine };
          }
        }
        return { ...PRODUSE_FALLBACK, ...map };
      }
    }
  } catch {
    // foloseste fallback
  }
  return PRODUSE_FALLBACK;
}

export async function getImagineProdus(slug: string): Promise<{ titlu: string; imagine: string }> {
  const map = await getProduseImagini();
  return map[slug] ?? PRODUSE_FALLBACK["dibluri-plastic"];
}
