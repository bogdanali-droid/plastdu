'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CalculatorDibluri() {
  const [mp, setMp] = useState<string>('100');
  const [inaltime, setInaltime] = useState<'sub8' | 'peste8'>('sub8');
  const [colturi, setColturi] = useState<string>('10');
  const [flansa, setFlansa] = useState<boolean>(true);

  const mpNr = Math.max(0, parseFloat(mp) || 0);
  const colturiPct = Math.min(50, Math.max(0, parseFloat(colturi) || 0));

  const dibluriCamp = inaltime === 'sub8' ? 6 : 10;
  const dibluriColt = inaltime === 'sub8' ? 8 : 12;

  const mpCamp = mpNr * (1 - colturiPct / 100);
  const mpColt = mpNr * (colturiPct / 100);

  const nrDibluri = Math.ceil(mpCamp * dibluriCamp + mpColt * dibluriColt);
  const nrDibluriPlusRezerva = Math.ceil(nrDibluri * 1.05);
  const nrFlanse = flansa ? nrDibluriPlusRezerva : 0;

  return (
    <div className="bg-white rounded-2xl border border-neutral-border shadow-card p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="mp" className="block text-sm font-semibold text-slate-700 mb-2">
              Suprafața fațadă (m²)
            </label>
            <input
              id="mp"
              type="number"
              value={mp}
              onChange={(e) => setMp(e.target.value)}
              min="0"
              step="1"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Înălțime clădire
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setInaltime('sub8')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  inaltime === 'sub8'
                    ? 'bg-brand-blue text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Sub 8m
              </button>
              <button
                type="button"
                onClick={() => setInaltime('peste8')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  inaltime === 'peste8'
                    ? 'bg-brand-blue text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Peste 8m
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="colturi" className="block text-sm font-semibold text-slate-700 mb-2">
              Procent zone colț + soclu (%)
            </label>
            <input
              id="colturi"
              type="number"
              value={colturi}
              onChange={(e) => setColturi(e.target.value)}
              min="0"
              max="50"
              step="1"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
            <p className="text-xs text-slate-500 mt-1">Zone cu densitate crescută (colțuri, soclu). Standard 10-15%.</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="flansa"
              type="checkbox"
              checked={flansa}
              onChange={(e) => setFlansa(e.target.checked)}
              className="w-4 h-4 accent-brand-blue"
            />
            <label htmlFor="flansa" className="text-sm text-slate-700">
              Include și flanșe distribuţie (1:1)
            </label>
          </div>
        </div>

        <div className="bg-neutral-surface rounded-xl p-6 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2">Rezultat estimativ</p>
          <div className="space-y-3">
            <div>
              <p className="text-4xl font-black text-brand-blue">{nrDibluri.toLocaleString('ro-RO')}</p>
              <p className="text-sm text-slate-600">buc dibluri (bază)</p>
            </div>
            <div className="pt-3 border-t border-neutral-border">
              <p className="text-2xl font-bold text-slate-800">{nrDibluriPlusRezerva.toLocaleString('ro-RO')}</p>
              <p className="text-xs text-slate-500">buc cu rezervă 5% pentru șantier</p>
            </div>
            {flansa && (
              <div className="pt-3 border-t border-neutral-border">
                <p className="text-2xl font-bold text-brand-accent">{nrFlanse.toLocaleString('ro-RO')}</p>
                <p className="text-xs text-slate-500">buc flanșe distribuție</p>
              </div>
            )}
          </div>

          <Link
            href={`/contact?subiect=cerere-oferta&dibluri=${nrDibluriPlusRezerva}&flanse=${nrFlanse}`}
            className="mt-6 inline-flex items-center justify-center gap-2 bg-brand-blue text-white font-semibold py-3 rounded-xl hover:bg-brand-blue/90 transition-colors"
          >
            Solicită ofertă pentru {nrDibluriPlusRezerva.toLocaleString('ro-RO')} buc
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-xl text-xs text-slate-600 leading-relaxed">
        <p><strong>Formula folosită:</strong> {dibluriCamp} buc/m² pe câmp curent + {dibluriColt} buc/m² în zone colț/soclu, plus 5% rezervă șantier. Densitatea finală se validează în proiectul tehnic în funcție de zona climatică și solicitările la vânt.</p>
      </div>
    </div>
  );
}
