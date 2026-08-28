"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export interface FaqEntry {
  q: string;
  a: string;
  category: string;
  source: string;
  sourceLabel: string;
}

const CATEGORY_ORDER = ["Montaj", "Alegere produs", "Materiale", "Comercial/livrare", "General"];

export default function FaqSearch({ items }: { items: FaqEntry[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return CATEGORY_ORDER.filter((c) => set.has(c));
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = !activeCategory || item.category === activeCategory;
      const matchesQuery = !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [items, query, activeCategory]);

  const grouped = useMemo(() => {
    const map = new Map<string, FaqEntry[]>();
    for (const item of filtered) {
      const arr = map.get(item.category) ?? [];
      arr.push(item);
      map.set(item.category, arr);
    }
    return CATEGORY_ORDER.filter((c) => map.has(c)).map((c) => ({ category: c, items: map.get(c)! }));
  }, [filtered]);

  return (
    <div>
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative max-w-xl">
          <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Caută o întrebare... (ex: diblu, montaj, flanșă)"
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
          />
        </div>
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors border ${
            activeCategory === null ? "bg-brand-blue text-white border-brand-blue" : "bg-white text-slate-600 border-neutral-border hover:border-brand-blue/40"
          }`}
        >
          Toate ({items.length})
        </button>
        {categories.map((c) => {
          const count = items.filter((i) => i.category === c).length;
          return (
            <button
              key={c}
              onClick={() => setActiveCategory(c === activeCategory ? null : c)}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors border ${
                activeCategory === c ? "bg-brand-blue text-white border-brand-blue" : "bg-white text-slate-600 border-neutral-border hover:border-brand-blue/40"
              }`}
            >
              {c} ({count})
            </button>
          );
        })}
      </div>

      {/* Results */}
      {grouped.length === 0 && (
        <p className="text-slate-500 text-sm mb-8">
          Nicio întrebare nu se potrivește cu căutarea ta. Încearcă alți termeni sau{" "}
          <Link href="/contact" className="text-brand-blue font-semibold underline">
            întreabă-ne direct
          </Link>
          .
        </p>
      )}

      <div className="space-y-10">
        {grouped.map((group) => (
          <div key={group.category}>
            <h2 className="text-base font-bold text-brand-blue mb-4">{group.category}</h2>
            <div className="space-y-3">
              {group.items.map((item, i) => (
                <details key={`${item.category}-${i}-${item.q}`} className="bg-white rounded-2xl border border-neutral-border p-5 group open:shadow-card">
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-semibold text-sm text-slate-800">
                    <span>{item.q}</span>
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="text-sm text-slate-600 leading-relaxed mt-3">{item.a}</p>
                  <Link href={item.source} className="inline-block text-xs font-semibold text-brand-accent mt-3 hover:underline">
                    Vezi sursa — {item.sourceLabel}
                  </Link>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
