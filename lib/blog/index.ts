import type { Articol } from "./types";
import { articol1 } from "./article-1";
import { articol2 } from "./article-2";
import { articol3 } from "./article-3";
import { articol4 } from "./article-4";
import { articol5 } from "./article-5";
import { articol6 } from "./article-6";
import { articol7 } from "./article-7";
import { articol8 } from "./article-8";
import { articol9 } from "./article-9";
import { articol10 } from "./article-10";
import { articol11 } from "./article-11";
import { articol12 } from "./article-12";
import { articol13 } from "./article-13";
import { articol14 } from "./article-14";
import { articol15 } from "./article-15";
import { articol16 } from "./article-16";

export * from "./types";
export * from "./heroes";

export const ARTICOLE: Articol[] = [
  articol1,
  articol2,
  articol3,
  articol4,
  articol5,
  articol6,
  articol7,
  articol8,
  articol9,
  articol10,
  articol11,
  articol12,
  articol13,
  articol14,
  articol15,
  articol16,
];

export function getArticol(slug: string): Articol | undefined {
  return ARTICOLE.find((a) => a.slug === slug);
}

export function getArticoleConexe(a: Articol): Articol[] {
  return a.relatedSlugs
    .map((slug) => getArticol(slug))
    .filter((x): x is Articol => Boolean(x));
}

/** Rezumat folosit pentru fallback-ul KV al hub-ului /blog */
export interface ArticolSumar {
  slug: string;
  titlu: string;
  excerpt: string;
  data: string;
  categorie: string;
  imagine: string;
}
