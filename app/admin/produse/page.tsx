'use client';

import { useEffect, useState, useRef } from 'react';

interface Produs { id: string; name: string; description: string; images: string[]; }

export default function AdminProdusePage() {
  const [produse, setProduse] = useState<Produs[]>([]);
  const [selected, setSelected] = useState<Produs | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/admin/content?key=produse')
      .then((r) => r.json())
      .then((d) => { setProduse(d); if (d.length) setSelected(d[0]); });
  }, []);

  function selectProduct(p: Produs) {
    setSelected({ ...p });
    setSaved(false);
  }

  function updateSelected(field: keyof Produs, val: string) {
    if (!selected) return;
    setSelected({ ...selected, [field]: val });
  }

  async function saveSelected() {
    if (!selected) return;
    setSaving(true); setSaved(false);
    const updated = produse.map((p) => (p.id === selected.id ? selected : p));
    setProduse(updated);
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'produse', value: updated }),
    });
    setSaving(false); setSaved(true);
  }

  async function uploadImage(file: File) {
    if (!selected) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('path', `produse/${selected.id}/${Date.now()}-${file.name}`);
    const res = await fetch('/api/admin/images', { method: 'POST', body: fd });
    const { url } = await res.json();
    setSelected((s) => s ? { ...s, images: [...s.images, url] } : s);
    setUploading(false);
  }

  async function removeImage(url: string) {
    if (!selected) return;
    const path = url.replace('/api/img/', '');
    await fetch('/api/admin/images', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
    });
    setSelected((s) => s ? { ...s, images: s.images.filter((i) => i !== url) } : s);
  }

  return (
    <div className="flex gap-6 h-full">
      <div className="w-48 flex-shrink-0">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Produse</h2>
        <ul className="space-y-1">
          {produse.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => selectProduct(p)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                  selected?.id === p.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {p.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selected && (
        <div className="flex-1 bg-white rounded-2xl shadow p-6 space-y-5">
          <h1 className="text-xl font-bold text-gray-800">{selected.name}</h1>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nume produs</label>
            <input value={selected.name} onChange={(e) => updateSelected('name', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descriere</label>
            <textarea value={selected.description} onChange={(e) => updateSelected('description', e.target.value)}
              rows={5} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagini</label>
            <div className="flex flex-wrap gap-3 mb-3">
              {selected.images.map((img, i) => (
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

          <div className="flex items-center gap-3">
            <button onClick={saveSelected} disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50">
              {saving ? 'Se salvează...' : 'Salvează'}
            </button>
            {saved && <span className="text-green-600 text-sm">Salvat!</span>}
          </div>
        </div>
      )}
    </div>
  );
}
