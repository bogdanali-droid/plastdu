'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type FabricatProdus = {
  slug: string;
  titlu: string;
  categorie: string;
  imagine: string;
  badge: string;
};

type DistribuitProdus = {
  slug: string;
  titlu: string;
  categorie: string;
  imagine: string;
  badge: string;
};

type ProduseData = {
  fabricate: FabricatProdus[];
  distribuite: DistribuitProdus[];
};

export default function AdminProdusePage() {
  const [data, setData] = useState<ProduseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/content?key=produse')
      .then((r) => r.json())
      .then((json) => setData(json.data))
      .catch(() => setError('Nu s-au putut încărca produsele'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-slate-500">Se încarcă...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Produse</h1>
          <p className="text-slate-500 mt-1">Gestionați catalogul de produse</p>
        </div>
      </div>

      {/* Fabricate */}
      <section className="bg-white rounded-2xl border border-slate-200 mb-8">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-800">Produse fabricate</h2>
            <p className="text-xs text-slate-500 mt-0.5">Producție proprie Plast Du IV</p>
          </div>
          <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium">
            {data.fabricate.length} produse
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">Imagine</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">Titlu</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">Categorie</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">Badge</th>
                <th className="text-right text-xs font-semibold text-slate-500 px-6 py-3">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {data.fabricate.map((p) => (
                <tr key={p.slug} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden relative flex-shrink-0">
                      <img
                        src={p.imagine}
                        alt={p.titlu}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm font-medium text-slate-800">{p.titlu}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm text-slate-600">{p.categorie}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{p.badge}</span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Link
                      href={`/admin/produse/${p.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Editează
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Distribuite */}
      <section className="bg-white rounded-2xl border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-800">Produse distribuite</h2>
            <p className="text-xs text-slate-500 mt-0.5">Portofoliu extins — produse terțe</p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-medium">
            {data.distribuite.length} produse
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">Imagine</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">Titlu</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">Categorie</th>
                <th className="text-right text-xs font-semibold text-slate-500 px-6 py-3">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {data.distribuite.map((p) => (
                <tr key={p.slug} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                      <img
                        src={p.imagine}
                        alt={p.titlu}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm font-medium text-slate-800">{p.titlu}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm text-slate-600">{p.categorie}</span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Link
                      href={`/admin/produse/${p.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Editează
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-100">
          <Link
            href="/admin/produse/nou"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Adaugă produs distribuit
          </Link>
        </div>
      </section>
    </div>
  );
}
