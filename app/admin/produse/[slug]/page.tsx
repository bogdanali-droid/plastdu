'use client';
export const runtime = 'edge';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const FABRICATE_SLUGS = ['dibluri-plastic', 'dibluri-metalice', 'flansa-vata', 'flansa-osb'];

type Produs = {
  slug: string;
  titlu: string;
  categorie: string;
  descriere: string;
  imagine: string;
  specificatii?: string[];
  variante?: string;
  livrare?: string;
  badge: string;
  galerie?: string[];
};

export default function EditProdusFabricatPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const isFabricat = FABRICATE_SLUGS.includes(slug);

  const [produs, setProdus] = useState<Produs | null>(null);
  const [allData, setAllData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [titlu, setTitlu] = useState('');
  const [categorie, setCategorie] = useState('');
  const [descriere, setDescriere] = useState('');
  const [specificatii, setSpecificatii] = useState<string[]>([]);
  const [variante, setVariante] = useState('');
  const [livrare, setLivrare] = useState('');
  const [imagine, setImagine] = useState('');
  const [galerie, setGalerie] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/admin/content?key=produse')
      .then((r) => r.json())
      .then((json) => {
        setAllData(json.data);
        let found: Produs | undefined;
        if (isFabricat) {
          found = json.data.fabricate.find((p: Produs) => p.slug === slug);
        } else {
          found = json.data.distribuite.find((p: Produs) => p.slug === slug);
        }
        if (found) {
          setProdus(found);
          setTitlu(found.titlu);
          setCategorie(found.categorie);
          setDescriere(found.descriere);
          setSpecificatii(found.specificatii || []);
          setVariante(found.variante || '');
          setLivrare(found.livrare || '');
          setImagine(found.imagine);
          setGalerie(found.galerie || []);
        }
      })
      .catch(() => setError('Nu s-a putut încărca produsul'))
      .finally(() => setLoading(false));
  }, [slug, isFabricat]);

  async function handleSave() {
    if (!allData || !produs) return;
    setSaving(true); setMessage(''); setError('');
    const updated: Produs = { ...produs, titlu, categorie, descriere, imagine, specificatii, variante, livrare, galerie };
    const newData = isFabricat
      ? { ...allData, fabricate: allData.fabricate.map((p: Produs) => p.slug === slug ? updated : p) }
      : { ...allData, distribuite: allData.distribuite.map((p: Produs) => p.slug === slug ? updated : p) };
    try {
      const res = await fetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'produse', data: newData }) });
      if (res.ok) { setMessage('Salvat cu succes!'); setAllData(newData); } else setError('Eroare la salvare');
    } catch { setError('Eroare de rețea'); } finally { setSaving(false); }
  }

  async function handleDelete() {
    if (!allData || isFabricat) return;
    if (!confirm(`Ștergeți produsul „${titlu}”?`)) return;
    const newData = { ...allData, distribuite: allData.distribuite.filter((p: Produs) => p.slug !== slug) };
    const res = await fetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: 'produse', data: newData }) });
    if (res.ok) router.push('/admin/produse'); else setError('Eroare la ștergere');
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImg(true); setError('');
    const ext = file.name.split('.').pop() || 'jpg';
    const fd = new FormData();
    fd.append('file', file);
    fd.append('path', `produse/${slug}/${Date.now()}.${ext}`);
    try {
      const res = await fetch('/api/admin/images', { method: 'POST', body: fd });
      if (res.ok) { const { url } = await res.json(); if (!imagine) setImagine(url); else setGalerie((prev) => [...prev, url]); }
      else setError('Upload eșuat');
    } catch { setError('Eroare upload'); } finally { setUploadingImg(false); e.target.value = ''; }
  }

  async function handleDeleteImage(imgUrl: string, isMain: boolean) {
    if (!confirm('Ștergeți această imagine?')) return;
    if (imgUrl.startsWith('/api/img/')) await fetch('/api/admin/images', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ path: imgUrl.replace('/api/img/', '') }) });
    if (isMain) { setImagine(galerie[0] || ''); setGalerie((prev) => prev.slice(1)); } else setGalerie((prev) => prev.filter((u) => u !== imgUrl));
  }

  if (loading) return <div className="p-8 text-slate-500">Se încarcă...</div>;
  if (error && !produs) return <div className="p-8 text-red-500">{error}</div>;
  if (!produs) return <div className="p-8 text-slate-500">Produsul nu a fost găsit.</div>;

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/produse" className="text-slate-400 hover:text-slate-600">←</Link>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Editare produs</h1>
          <p className="text-sm text-slate-500">{isFabricat ? 'Produs propriu' : 'Produs distribuit'} — {slug}</p>
        </div>
      </div>
      {message && <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{message}</div>}
      {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Titlu</label>
          <input type="text" value={titlu} onChange={(e) => setTitlu(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Descriere</label>
          <textarea value={descriere} onChange={(e) => setDescriere(e.target.value)} rows={4} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Imagini</label>
          <div className="flex flex-wrap gap-3 mb-3">
            {imagine && (
              <div className="relative group">
                <img src={imagine} alt="" className="w-24 h-24 object-contain rounded-lg border border-slate-200 bg-slate-50 p-1" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <span className="absolute top-1 left-1 text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded">Main</span>
                <button onClick={() => handleDeleteImage(imagine, true)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100">×</button>
              </div>
            )}
            {galerie.map((url) => (
              <div key={url} className="relative group">
                <img src={url} alt="" className="w-24 h-24 object-contain rounded-lg border border-slate-200 bg-slate-50 p-1" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <button onClick={() => handleDeleteImage(url, false)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100">×</button>
              </div>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium px-3 py-2 rounded-lg">
            {uploadingImg ? 'Se încarcă...' : 'Adaugă imagine'}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImg} />
          </label>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${isFabricat ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
            {isFabricat ? 'Produs propriu' : 'Distribuit'}
          </span>
          {!isFabricat && <button onClick={handleDelete} className="ml-auto text-sm text-red-500 hover:text-red-700 font-medium">Șterge produs</button>}
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <button onClick={handleSave} disabled={saving} className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold px-6 py-2.5 rounded-lg text-sm">
          {saving ? 'Se salvează...' : 'Salvează modificările'}
        </button>
        <Link href="/admin/produse" className="border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium px-6 py-2.5 rounded-lg text-sm">Anulează</Link>
      </div>
    </div>
  );
}
