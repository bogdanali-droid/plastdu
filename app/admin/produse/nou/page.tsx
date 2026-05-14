'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ș/g, 's')
    .replace(/ț/g, 't')
    .replace(/ă/g, 'a')
    .replace(/â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function NewProdusDiribuitPage() {
  const router = useRouter();
  const [titlu, setTitlu] = useState('');
  const [categorie, setCategorie] = useState('Fixare');
  const [descriere, setDescriere] = useState('');
  const [imagine, setImagine] = useState('');
  const [uploadingImg, setUploadingImg] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const generatedSlug = slugify(titlu);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !generatedSlug) {
      setError('Introduceți mai întâi titlul pentru a genera slug-ul');
      return;
    }
    setUploadingImg(true);
    const ext = file.name.split('.').pop() || 'jpg';
    const path = `produse/${generatedSlug}/${Date.now()}.${ext}`;
    const fd = new FormData();
    fd.append('file', file);
    fd.append('path', path);
    try {
      const res = await fetch('/api/admin/images', { method: 'POST', body: fd });
      if (res.ok) {
        const { url } = await res.json();
        setImagine(url);
      } else {
        setError('Upload eșuat');
      }
    } catch {
      setError('Eroare upload');
    } finally {
      setUploadingImg(false);
      e.target.value = '';
    }
  }

  async function handleSave() {
    if (!titlu.trim()) {
      setError('Titlul este obligatoriu');
      return;
    }
    if (!generatedSlug) {
      setError('Slug invalid — introduceți un titlu valid');
      return;
    }
    setSaving(true);
    setError('');

    // Fetch current data
    const res = await fetch('/api/admin/content?key=produse');
    const json = await res.json();
    const currentData = json.data;

    // Check slug uniqueness
    const allSlugs = [
      ...currentData.fabricate.map((p: any) => p.slug),
      ...currentData.distribuite.map((p: any) => p.slug),
    ];
    if (allSlugs.includes(generatedSlug)) {
      setError(`Slug "${generatedSlug}" există deja. Modificați titlul.`);
      setSaving(false);
      return;
    }

    const newProdus = {
      slug: generatedSlug,
      titlu,
      categorie,
      descriere,
      imagine: imagine || '/images/produse/placeholder.jpg',
      badge: 'Distribuit',
    };

    const newData = {
      ...currentData,
      distribuite: [...currentData.distribuite, newProdus],
    };

    const saveRes = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'produse', data: newData }),
    });

    if (saveRes.ok) {
      router.push('/admin/produse');
    } else {
      setError('Eroare la salvare');
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/produse" className="text-slate-400 hover:text-slate-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Produs nou distribuit</h1>
          <p className="text-sm text-slate-500">Adăugați un produs nou în secțiunea distribuite</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Titlu *</label>
          <input
            type="text"
            value={titlu}
            onChange={(e) => setTitlu(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ex: Dibluri metalice speciale"
          />
          {titlu && (
            <p className="text-xs text-slate-400 mt-1">Slug generat: <code className="bg-slate-100 px-1 rounded">{generatedSlug}</code></p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Categorie</label>
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Fixare">Fixare</option>
            <option value="Accesorii">Accesorii</option>
            <option value="Profile">Profile</option>
            <option value="Dibluri">Dibluri</option>
            <option value="Flanșe">Flanșe</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Descriere</label>
          <textarea
            value={descriere}
            onChange={(e) => setDescriere(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descriere scurtă a produsului"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Imagine</label>
          {imagine && (
            <div className="mb-3">
              <img
                src={imagine}
                alt="Preview"
                className="w-24 h-24 object-contain rounded-lg border border-slate-200 bg-slate-50 p-1"
              />
            </div>
          )}
          <label className="inline-flex items-center gap-2 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium px-3 py-2 rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            {uploadingImg ? 'Se încarcă...' : 'Încarcă imagine'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploadingImg || !titlu.trim()}
            />
          </label>
          {!titlu.trim() && (
            <p className="text-xs text-slate-400 mt-1">Introduceți titlul înainte de a încărca o imagine</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving || !titlu.trim()}
          className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
        >
          {saving ? 'Se salvează...' : 'Adaugă produs'}
        </button>
        <Link
          href="/admin/produse"
          className="border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium px-6 py-2.5 rounded-lg transition-colors text-sm"
        >
          Anulează
        </Link>
      </div>
    </div>
  );
}
