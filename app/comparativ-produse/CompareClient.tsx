'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import ImageWithFallback from '@/components/ImageWithFallback';
import type { ProdusComparativ } from './page';

interface Props {
  produse: ProdusComparativ[];
}

function ProductPicker({
  label,
  value,
  otherValue,
  produse,
  onChange,
}: {
  label: string;
  value: string;
  otherValue: string;
  produse: ProdusComparativ[];
  onChange: (slug: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-neutral-border bg-white px-4 py-2.5 text-sm text-slate-800
          outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue cursor-pointer"
      >
        <option value="">Selectați produs</option>
        {produse.map((p) => (
          <option key={p.slug} value={p.slug} disabled={p.slug === otherValue}>
            {p.titlu}
          </option>
        ))}
      </select>
    </div>
  );
}

function ProductColumn({ produs }: { produs: ProdusComparativ | undefined }) {
  if (!produs) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[220px] text-slate-400 text-sm">
        Selectați un produs
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-surface">
        <ImageWithFallback src={produs.imagine} alt={produs.titlu} className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <h3 className="text-lg font-bold text-brand-blue">{produs.titlu}</h3>
      <span className="inline-block w-fit text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-accent/10 text-brand-accent">
        {produs.categorie}
      </span>
      <p className="text-sm text-slate-600 leading-relaxed">{produs.descriere}</p>
      {produs.specificatii && produs.specificatii.length > 0 ? (
        <ul className="space-y-2">
          {produs.specificatii.map((s) => (
            <li key={s} className="flex items-start gap-2 text-sm text-slate-700">
              <svg className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {s}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-400 italic">Fără specificații tehnice disponibile — produs distribuit.</p>
      )}
    </div>
  );
}

export default function CompareClient({ produse }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const slugA = searchParams.get('a') ?? '';
  const slugB = searchParams.get('b') ?? '';

  const produsA = produse.find((p) => p.slug === slugA);
  const produsB = produse.find((p) => p.slug === slugB);

  function updateParams(next: { a?: string; b?: string }) {
    const params = new URLSearchParams(searchParams.toString());
    if (next.a !== undefined) {
      if (next.a) params.set('a', next.a);
      else params.delete('a');
    }
    if (next.b !== undefined) {
      if (next.b) params.set('b', next.b);
      else params.delete('b');
    }
    router.replace(`/comparativ-produse?${params.toString()}`);
  }

  return (
    <section className="section-padding bg-neutral-surface">
      <div className="container-site">
        <div className="grid sm:grid-cols-2 gap-4 mb-8 max-w-3xl mx-auto">
          <ProductPicker
            label="Produs A"
            value={slugA}
            otherValue={slugB}
            produse={produse}
            onChange={(slug) => updateParams({ a: slug })}
          />
          <ProductPicker
            label="Produs B"
            value={slugB}
            otherValue={slugA}
            produse={produse}
            onChange={(slug) => updateParams({ b: slug })}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="card">
            <ProductColumn produs={produsA} />
          </div>
          <div className="card">
            <ProductColumn produs={produsB} />
          </div>
        </div>

        {produsA && produsB && (
          <div className="text-center mt-10">
            <a
              href={`/contact?subiect=cerere-oferta&produse=${encodeURIComponent(produsA.titlu)}+%2B+${encodeURIComponent(produsB.titlu)}`}
              className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors"
            >
              Solicitați ofertă pentru ambele
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
