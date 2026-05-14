'use client';
import Link from 'next/link';
import Image from 'next/image';
import ImageWithFallback from '@/components/ImageWithFallback';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Produs = {
  slug?: string;
  titlu: string;
  imagine: string;
  categorie: string;
  descriere: string;
  specificatii?: string[];
  variante?: string;
  livrare?: string;
  badge: string;
};

type Props = {
  fabricate: Produs[];
  distribuite: Produs[];
};

type Filtru = 'toate' | 'fabricate';

export default function ProduseFiltruClient({ fabricate, distribuite }: Props) {
  const [filtru, setFiltru] = useState<Filtru>('toate');

  return (
    <>
      <Header />
      <main>
        <section className="bg-brand-blue text-white section-padding">
          <div className="container-site">
            <p className="section-label !text-brand-accent/80 mb-3">Catalog produse</p>
            <h1 className="text-display-lg text-white mb-4">Dibluri și flanșe pentru construcții</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Plast Du IV SRL produce și distribuie elemente de fixare pentru industria construcțiilor.
              Soluții tehnice certificate pentru sisteme de termoizolație exterioară, termoizolații și lucrări de finisaj —
              livrate direct la depozit sau șantier.
            </p>
          </div>
        </section>

        <section className="border-b border-neutral-border bg-neutral-surface sticky top-16 z-10">
          <div className="container-site py-3 flex items-center gap-3">
            <span className="text-sm text-slate-500 font-medium mr-2">Afișare:</span>
            {([
              { key: 'toate', label: 'Toate produsele' },
              { key: 'fabricate', label: 'Fabricate de noi' },
            ] as { key: Filtru; label: string }[]).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFiltru(key)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  filtru === key
                    ? 'bg-brand-blue text-white'
                    : 'bg-white border border-neutral-border text-slate-600 hover:border-brand-blue hover:text-brand-blue'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-site">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="section-label">Producție proprie</p>
                <h2>Produse fabricate de Plast Du IV</h2>
              </div>
              <span className="text-sm text-slate-500 hidden sm:block">{fabricate.length} produse</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {fabricate.map((p) => (
                <article key={p.slug || p.titlu} className="card flex flex-col group hover:border-brand-blue/30">
                  <div className="w-full h-44 bg-gradient-to-br from-blue-50 to-slate-100 rounded-xl mb-4 overflow-hidden relative img-watermark">
                    <Image src={p.imagine} alt={p.titlu} fill className="object-contain p-4" sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent">{p.badge}</span>
                    <span className="text-xs text-slate-400">{p.categorie}</span>
                  </div>
                  <h3 className="text-base mb-2 group-hover:text-brand-blue/80 transition-colors">{p.titlu}</h3>
                  <p className="text-sm text-slate-500 flex-1 mb-4">{p.descriere}</p>
                  {p.specificatii && (
                    <ul className="mb-4 space-y-1">
                      {p.specificatii.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-xs text-slate-600">
                          <span className="w-1 h-1 rounded-full bg-brand-accent flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-auto pt-3 border-t border-neutral-border flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                      {p.variante && <div><span className="font-medium text-slate-700">Variante:</span> {p.variante}</div>}
                      {p.livrare && <div><span className="font-medium text-slate-700">Livrare:</span> {p.livrare}</div>}
                    </div>
                    {p.slug && (
                      <Link href={`/produse/${p.slug}`} className="inline-flex items-center gap-1.5 bg-brand-blue text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-brand-blue/90 transition-colors flex-shrink-0 ml-3">
                        Detalii
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {filtru === 'toate' && (
          <section className="section-padding bg-neutral-surface">
            <div className="container-site">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="section-label">Portofoliu extins</p>
                  <h2>Produse distribuite</h2>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {distribuite.map((p) => (
                  <article key={p.slug || p.titlu} className="card flex flex-col">
                    <div className="w-full h-36 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl mb-4 overflow-hidden relative img-watermark">
                      <ImageWithFallback src={p.imagine} alt={p.titlu} className="object-contain p-3" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{p.badge}</span>
                      <span className="text-xs text-slate-400">{p.categorie}</span>
                    </div>
                    <h3 className="text-base mb-2">{p.titlu}</h3>
                    <p className="text-sm text-slate-500 flex-1 mb-4">{p.descriere}</p>
                    <div className="mt-auto pt-3 border-t border-neutral-border">
                      <Link href="/contact?subiect=cerere-produs" className="text-xs font-semibold text-brand-blue hover:text-brand-accent transition-colors">Solicitați informații →</Link>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-10 bg-white rounded-2xl border border-neutral-border p-6 flex flex-col md:flex-row md:items-center gap-4 shadow-card">
                <div className="flex-1">
                  <p className="font-semibold text-brand-blue mb-1">Gamă largă de produse pentru reabilitare termică</p>
                  <p className="text-sm text-slate-500">Oferim o gamă extinsă de produse specifice proiectelor de reabilitare. Dacă nu găsiți produsul dorit în catalog, contactați-ne — vă pregătim o ofertă personalizată.</p>
                </div>
                <Link href="/contact?subiect=cerere-produs" className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-5 py-3 rounded-xl hover:bg-brand-blue/90 transition-colors flex-shrink-0">
                  Solicitați ofertă personalizată
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Aveți nevoie de o ofertă personalizată?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">Lucrăm direct cu firme de construcții, antreprenori și depozite de materiale. Contactați-ne pentru prețuri de volum și termene de livrare.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors">
              Solicitați ofertă B2B
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
