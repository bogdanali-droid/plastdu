'use client';
export const runtime = 'edge';

import { useEffect, useRef, useState } from 'react';

interface Cifra { valoare: string; eticheta: string; }
interface DespreData { titlu: string; text: string; cifre: Cifra[]; imagini: string[]; }

type UploadItem = { file: File; id: string; status: 'pending' | 'uploading' | 'done' | 'error'; error?: string };

export default function AdminDesprePage() {
  const [data, setData] = useState<DespreData>({ titlu: '', text: '', cifre: [], imagini: [] });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<UploadItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

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

  async function uploadFiles(files: File[]) {
    const imageFiles = files.filter((f) => f.type.startsWith('image/'));
    if (!imageFiles.length) return;

    const items: UploadItem[] = imageFiles.map((file) => ({
      file,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      status: 'pending',
    }));
    setUploadQueue((prev) => [...prev, ...items]);

    for (const item of items) {
      setUploadQueue((prev) => prev.map((q) => q.id === item.id ? { ...q, status: 'uploading' } : q));
      try {
        const fd = new FormData();
        fd.append('file', item.file);
        fd.append('path', `despre/${Date.now()}-${item.file.name}`);
        const res = await fetch('/api/admin/images', { method: 'POST', body: fd });
        const json = await res.json();
        if (!res.ok || json.error) {
          const errMsg = json.error || 'Upload eșuat';
          setUploadQueue((prev) => prev.map((q) => q.id === item.id ? { ...q, status: 'error', error: errMsg } : q));
        } else {
          setData((d) => ({ ...d, imagini: [...d.imagini, json.url] }));
          setUploadQueue((prev) => prev.map((q) => q.id === item.id ? { ...q, status: 'done' } : q));
          setTimeout(() => setUploadQueue((prev) => prev.filter((q) => q.id !== item.id)), 2000);
        }
      } catch {
        setUploadQueue((prev) => prev.map((q) => q.id === item.id ? { ...q, status: 'error', error: 'Eroare de rețea' } : q));
      }
    }
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

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault();
    dragCounter.current++;
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) setIsDragging(false);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    uploadFiles(files);
  }

  const uploadingCount = uploadQueue.filter((q) => q.status === 'pending' || q.status === 'uploading').length;

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
          <label className="block text-sm font-medium text-gray-700 mb-2">Imagini fabrică</label>
          <div className="flex flex-wrap gap-3 mb-3">
            {data.imagini.map((img, i) => (
              <div key={i} className="relative">
                <img src={img} alt="" className="w-24 h-24 object-cover rounded-lg border" />
                <button onClick={() => removeImage(img)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">✕</button>
              </div>
            ))}
          </div>

          {/* Drag & drop zone */}
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`cursor-pointer border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}
          >
            {isDragging ? (
              <p className="text-blue-600 font-medium">Dă-i drumul!</p>
            ) : (
              <>
                <p className="text-gray-500 text-sm">Trage imagini aici sau <span className="text-blue-600 underline">selectează fișiere</span></p>
                <p className="text-gray-400 text-xs mt-1">Poți selecta mai multe imagini deodată</p>
              </>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && uploadFiles(Array.from(e.target.files))}
          />

          {/* Upload queue status */}
          {uploadQueue.length > 0 && (
            <div className="mt-3 space-y-1">
              {uploadQueue.map((item) => (
                <div key={item.id} className="flex items-center gap-2 text-sm">
                  <span className="truncate max-w-xs text-gray-600">{item.file.name}</span>
                  {item.status === 'pending' && <span className="text-gray-400">În așteptare...</span>}
                  {item.status === 'uploading' && <span className="text-blue-600">Se încarcă...</span>}
                  {item.status === 'done' && <span className="text-green-600">✓ Gata</span>}
                  {item.status === 'error' && (
                    <span className="text-red-500">
                      ✕ {item.error}
                      {item.error?.includes('R2') && <span className="text-xs block text-gray-400">Verifică binding-ul R2 în Cloudflare Pages → Settings → Functions</span>}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={save} disabled={saving || uploadingCount > 0}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50">
          {saving ? 'Se salvează...' : uploadingCount > 0 ? `Așteaptă (${uploadingCount} imagini)...` : 'Salvează'}
        </button>
        {saved && <span className="text-green-600 text-sm ml-3">Salvat!</span>}
      </div>
    </div>
  );
}
