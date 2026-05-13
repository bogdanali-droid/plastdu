"use client";
import { useState } from "react";
import Image from "next/image";

interface Props {
  imagini: string[];
  alt: string;
}

export default function GalerieProduseClient({ imagini, alt }: Props) {
  const [activa, setActiva] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Imagine principală */}
      <div className="relative w-full aspect-square max-w-lg mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100 border border-neutral-border">
        <Image
          src={imagini[activa]}
          alt={`${alt} — imagine ${activa + 1}`}
          fill
          className="object-contain p-4"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        {imagini.length > 1 && (
          <>
            <button
              onClick={() => setActiva((a) => (a - 1 + imagini.length) % imagini.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow rounded-full w-9 h-9 flex items-center justify-center text-slate-700 transition-all"
              aria-label="Anterioară"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActiva((a) => (a + 1) % imagini.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow rounded-full w-9 h-9 flex items-center justify-center text-slate-700 transition-all"
              aria-label="Următoare"
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
        <div className="flex flex-wrap gap-2 max-w-lg mx-auto lg:mx-0 w-full">
          {imagini.map((src, i) => (
            <button
              key={src}
              onClick={() => setActiva(i)}
              className={`relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                activa === i
                  ? "border-brand-blue shadow-md scale-105"
                  : "border-neutral-border hover:border-brand-blue/50"
              }`}
            >
              <Image
                src={src}
                alt={`${alt} ${i + 1}`}
                fill
                className="object-contain p-1"
                sizes="56px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
