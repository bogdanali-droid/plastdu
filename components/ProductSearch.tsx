"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ImageWithFallback from "./ImageWithFallback";

interface ProdusItem {
  slug: string;
  titlu: string;
  categorie: string;
  descriere: string;
  imagine: string;
}

const DIACRITICS_RE = new RegExp("[\\u0300-\\u036f]", "g");

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS_RE, "");
}

export default function ProductSearch() {
  const [allProducts, setAllProducts] = useState<ProdusItem[]>([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/content?key=produse");
        const json = await res.json();
        const fabricate = (json?.data?.fabricate ?? []) as ProdusItem[];
        const distribuite = (json?.data?.distribuite ?? []) as ProdusItem[];
        if (!cancelled) setAllProducts([...fabricate, ...distribuite]);
      } catch {
        if (!cancelled) setAllProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 200);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = useMemo(() => {
    const q = normalize(debouncedQuery.trim());
    if (!q) return [];
    return allProducts
      .filter((p) => {
        const haystack = normalize(`${p.titlu} ${p.descriere} ${p.categorie}`);
        return haystack.includes(q);
      })
      .slice(0, 8);
  }, [allProducts, debouncedQuery]);

  const showDropdown = focused && debouncedQuery.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <svg
          className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Caută produs (ex: diblu polistiren)"
          disabled={loading}
          className="w-full pl-11 pr-4 py-4 rounded-xl border border-neutral-border bg-white text-base
            focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue
            disabled:opacity-60"
        />
      </div>

      {showDropdown && (
        <div className="absolute z-30 top-full left-0 right-0 mt-2 bg-white rounded-xl border border-neutral-border shadow-xl max-h-[28rem] overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-5 text-center">
              <p className="text-sm text-slate-500 mb-3">
                Niciun rezultat pentru &lsquo;{debouncedQuery.trim()}&rsquo;. Contactați-ne pentru produse la comandă.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-accent transition-colors"
              >
                Contactați-ne
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ) : (
            <ul role="list" className="divide-y divide-neutral-border">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/produse/${p.slug}`}
                    className="flex items-center gap-4 p-3 hover:bg-neutral-surface transition-colors"
                  >
                    <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-surface">
                      <ImageWithFallback src={p.imagine} alt={p.titlu} className="object-cover" sizes="56px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-800 truncate">{p.titlu}</p>
                      <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent">
                        {p.categorie}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
