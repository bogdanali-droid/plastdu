'use client';

import { useEffect, useState, useRef } from 'react';

interface Cifra { valoare: string; eticheta: string; }
interface DespreData { titlu: string; text: string; cifre: Cifra[]; imagini: string[]; }

export default function AdminDesprePage() {
  const [data, setData] = useState<DespreData>({ titlu: '', text: '', cifre: [], imagini: [] });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/admin/content?key=despre')
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function save() {
    setSaving(true); setSaved(false);
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'despre', value: data }),
    });
    setSaving(false); setSaved(true);
  }

  async function uploadImage(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('path', `despre/${Date.now()}-${file.name}`);
    const res = await fetch('/api/admin/images', { method: 'POST', body: fd });
    const { url } = await res.json();
    setData((d) => ({ ...d, imagini: [...d.imagini, url] }));
    setUploading(false);
  }

  async function removeImage(url: string) {
    const path = url.replace('/api/img/', '');
    await fetch('/api/admin/images', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
    });
    setData((d) => ({ ...d, imagini: d.imagini.filter((i) => i !== url) }));
  }

  function updateCifra(i: number, field: keyof Cifra, val: string) {
    const cifre = [...data.cifre];
    cifre[i] = { ...cifre[i], [field]: val };
    setData({ ...data, cifre });
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Despre Noi</h1>
      <div className="bg-white rounded-2xl shadow p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titlu</label>
          <input value={data.titlu} onChange={(e) => setData({ ...data, titlu: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
          <textarea value={data.text} onChange={(e) => setData({ ...data, text: e.target.value })}
            rows={6} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cifre de referință</label>
          {data.cifre.map((c, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input value={c.valoare} onChange={(e) => updateCifra(i, 'valoare', e.target.value)}
                placeholder="ex: 20+" className="w-24 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              <input value={c.eticheta} onChange={(e) => updateCifra(i, 'eticheta', e.target.value)}
                placeholder="Ani experiență" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              <button onClick={() => setData({ ...data, cifre: data.cifre.filter((_, j) => j !== i) })}
                className="text-red-500 hover:text-red-700 px-2">✕</button>
            </div>
          ))}
          <button onClick={() => setData({ ...data, cifre: [...data.cifre, { valoare: '', eticheta: '' }] })}
            className="text-sm text-blue-600 hover:underline">+ Adaugă cifră</button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Imagini</label>
          <div className="flex flex-wrap gap-3 mb-3">
            {data.imagini.map((img, i) => (
              <div key={i} className="relative">
                <img src={img} alt="" className="w-24 h-24 object-cover rounded-lg border" />
                <button onClick={() => removeImage(img)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">✕</button>
              </div>
            ))}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} />
          <button onClick={() => fileRef.current?.click()} disabled={uploading}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition disabled:opacity-50">
            {uploading ? 'Se încarcă...' : '+ Adaugă imagine'}
          </button>
        </div>

        <button onClick={save} disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50">
          {saving ? 'Se salvează...' : 'Salvează'}
        </button>
        {saved && <span className="text-green-600 text-sm ml-3">Salvat!</span>}
      </div>
    </div>
  );
}
