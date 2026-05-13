"use client";
import { useState } from "react";
import Image from "next/image";

interface Props {
  slug: string;
  imagini: string[];
  titlu: string;
}

export default function GalerieProduse({ slug, imagini, titlu }: Props) {
  const [activa, setActiva] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Imagine principală */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl overflow-hidden border border-neutral-border shadow-sm">
        <Image
          src={`/images/produse/${slug}/${imagini[activa]}`}
          alt={`${titlu} - imagine ${activa + 1}`}
          fill
          className="object-contain p-6"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {imagini.length > 1 && (
          <>
            <button
              onClick={() => setActiva((a) => (a - 1 + imagini.length) % imagini.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow rounded-full w-9 h-9 flex items-center justify-center text-slate-700 transition-all"
              aria-label="Imagine anterioară"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActiva((a) => (a + 1) % imagini.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow rounded-full w-9 h-9 flex items-center justify-center text-slate-700 transition-all"
              aria-label="Imagine următoare"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <span className="absolute bottom-3 right-4 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full">
              {activa + 1} / {imagini.length}
            </span>
          </>
        )}
      </div>

      {/* Miniaturi */}
      {imagini.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {imagini.map((img, i) => (
            <button
              key={img}
              onClick={() => setActiva(i)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                activa === i
                  ? "border-brand-blue shadow-md scale-105"
                  : "border-neutral-border hover:border-brand-blue/40"
              }`}
            >
              <Image
                src={`/images/produse/${slug}/${img}`}
                alt={`${titlu} ${i + 1}`}
                fill
                className="object-contain p-1"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
