'use client';
export const runtime = 'edge';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function slugify(text: string): string {
  return text.toLowerCase().normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ş/g, 's').replace(/ţ/g, 't').replace(/ă/g, 'a').replace(/â/g, 'a').replace(/î/g, 'i')
    .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}

export default function NewProdusDiribuitPage() {
  const router = useRouter();
  const [titlu, setTitlu] = useState('');
  const [categorie, setCategorie] = useState('Fixare');
  const [descriere, setDescriere] = useState('');
  const [imagine, setImagine] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const generatedSlug = slugify(titlu);

  async function uploadFile(file: File) {
    if (!generatedSlug) { setError('Introduceți mai întâi titlul'); return; }
    if (!file.type.startsWith('image/')) return;
    setUploading(true); setUploadError('');
    const ext = file.name.split('.').pop() || 'jpg';
    const fd = new FormData();
    fd.append('file', file);
    fd.append('path', `produse/${generatedSlug}/${Date.now()}.${ext}`);
    try {
      const res = await fetch('/api/admin/images', { method: 'POST', body: fd });
      const json = await res.json();
      if (res.ok) setImagine(json.url);
      else setUploadError(json.error || 'Upload eșuat');
    } catch { setUploadError('Eroare de rețea'); }
    finally { setUploading(false); }
  }

  function handleDragEnter(e: React.DragEvent) { e.preventDefault(); dragCounter.current++; setIsDragging(true); }
  function handleDragLeave(e: React.DragEvent) { e.preventDefault(); dragCounter.current--; if (dragCounter.current === 0) setIsDragging(false); }
  function handleDragOver(e: React.DragEvent) { e.preventDefault(); }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault(); dragCounter.current = 0; setIsDragging(false);
    const file = Array.from(e.dataTransfer.files).find((f) => f.type.startsWith('image/'));
    if (file) uploadFile(file);
  }

  async function handleSave() {
    if (!titlu.trim()) { setError('Titlul este obligatoriu'); return; }
    setSaving(true); setError('');
    const res = await fetch('/api/admin/content?key=produse');
    const json = await res.json();
    const currentData = json.data;
    const allSlugs = [...currentData.fabricate.map((p: any) => p.slug), ...currentData.distribuite.map((p: any) => p.slug)];
    if (allSlugs.includes(generatedSlug)) { setError(`Slug „${generatedSlug}” există deja.`); setSaving(false); return; }
    const newProdus = { slug: generatedSlug, titlu, categorie, descriere, imagine: imagine || '/images/produse/placeholder.jpg', galerie: [], badge: 'Distribuit' };
    const newData = { ...currentData, distribuite: [...currentData.distribuite, newProdus] };
    const saveRes = await fetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'produse', data: newData }) });
    if (saveRes.ok) router.push('/admin/produse'); else { setError('Eroare la salvare'); setSaving(false); }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/produse" className="text-slate-400 hover:text-slate-600">←</Link>
        <h1 className="text-xl font-bold text-slate-800">Produs nou distribuit</h1>
      </div>
      {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Titlu *</label>
          <input type="text" value={titlu} onChange={(e) => setTitlu(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="ex: Dibluri metalice speciale" />
          {titlu && <p className="text-xs text-slate-400 mt-1">Slug: <code className="bg-slate-100 px-1 rounded">{generatedSlug}</code></p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Categorie</label>
          <select value={categorie} onChange={(e) => setCategorie(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
            <option>Fixare</option><option>Accesorii</option><option>Profile</option><option>Dibluri</option><option>Flanşe</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Descriere</label>
          <textarea value={descriere} onChange={(e) => setDescriere(e.target.value)}
            rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Imagine</label>
          {imagine && (
            <div className="relative inline-block mb-3">
              <img src={imagine} alt="" className="w-28 h-28 object-cover rounded-xl border border-slate-200" />
              <button onClick={() => setImagine('')}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow">×</button>
            </div>
          )}
          {uploadError && (
            <div className="mb-3 bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs">
              {uploadError}
              {uploadError.includes('R2') && <p className="mt-0.5 text-red-400">Configurează PLASTDU_IMAGES în Cloudflare Pages → Settings → Functions → R2 bucket bindings.</p>}
            </div>
          )}
          {!titlu.trim() && (
            <p className="text-xs text-amber-600 mb-2">Introduceți titlul înainte de a încărca imaginea.</p>
          )}
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => titlu.trim() && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
              !titlu.trim() ? 'border-slate-200 opacity-50 cursor-not-allowed' :
              isDragging ? 'border-blue-500 bg-blue-50 cursor-pointer' :
              'border-slate-300 hover:border-slate-400 hover:bg-slate-50 cursor-pointer'
            }`}
          >
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f); e.target.value = ''; }}
              disabled={!titlu.trim()} />
            {uploading ? (
              <p className="text-blue-600 text-sm font-medium">Se încarcă...</p>
            ) : isDragging ? (
              <p className="text-blue-600 text-sm font-medium">Dă-i drumul!</p>
            ) : (
              <>
                <svg className="w-8 h-8 text-slate-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p className="text-sm font-medium text-slate-700">Trage imaginea aici</p>
                <p className="text-xs text-slate-400 mt-0.5">sau <span className="text-blue-600 underline">alege fişierul</span></p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <button onClick={handleSave} disabled={saving || !titlu.trim() || uploading}
          className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold px-6 py-2.5 rounded-lg text-sm">
          {saving ? 'Se salvează...' : 'Adaugă produs'}
        </button>
        <Link href="/admin/produse" className="border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium px-6 py-2.5 rounded-lg text-sm">Anulează</Link>
      </div>
    </div>
  );
}
