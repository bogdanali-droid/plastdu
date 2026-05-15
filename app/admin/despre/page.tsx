'use client';
export const runtime = 'edge';
import { useEffect, useRef, useState } from 'react';

type Cifra = { val: string; label: string };

type DespreData = {
  cifre: Cifra[];
  specializari: string[];
  fabrica: { imagini: string[]; adresa: string };
};

export default function AdminDesprePage() {
  const [data, setData] = useState<DespreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [uploadQueue, setUploadQueue] = useState<{ file: File; id: string; status: 'pending' | 'uploading' | 'done' | 'error'; error?: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  useEffect(() => {
    fetch('/api/admin/content?key=despre')
      .then((r) => r.json())
      .then((json) => setData(json.data))
      .catch(() => setError('Nu s-au putut încărca datele'))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true); setMessage(''); setError('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'despre', data }),
      });
      if (res.ok) setMessage('Date salvate cu succes!');
      else {
        const j = await res.json().catch(() => ({}));
        setError(j.error || 'Eroare la salvare');
      }
    } catch { setError('Eroare de rețea'); }
    finally { setSaving(false); }
  }

  function updateCifra(i: number, field: keyof Cifra, value: string) {
    if (!data) return;
    const next = [...data.cifre];
    next[i] = { ...next[i], [field]: value };
    setData({ ...data, cifre: next });
  }

  function updateSpecializare(i: number, value: string) {
    if (!data) return;
    const next = [...data.specializari];
    next[i] = value;
    setData({ ...data, specializari: next });
  }

  async function uploadFiles(files: File[]) {
    if (!data) return;
    const items = files.map((file) => ({
      file,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      status: 'pending' as const,
    }));
    setUploadQueue((prev) => [...prev, ...items]);

    for (const item of items) {
      setUploadQueue((prev) => prev.map((q) => q.id === item.id ? { ...q, status: 'uploading' } : q));
      const ext = item.file.name.split('.').pop() || 'jpg';
      const path = `fabrica/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const fd = new FormData();
      fd.append('file', item.file);
      fd.append('path', path);
      try {
        const res = await fetch('/api/admin/images', { method: 'POST', body: fd });
        const json = await res.json();
        if (res.ok) {
          setData((prev) => prev ? { ...prev, fabrica: { ...prev.fabrica, imagini: [...prev.fabrica.imagini, json.url] } } : prev);
          setUploadQueue((prev) => prev.map((q) => q.id === item.id ? { ...q, status: 'done' } : q));
        } else {
          setUploadQueue((prev) => prev.map((q) => q.id === item.id ? { ...q, status: 'error', error: json.error || 'Upload eşuat' } : q));
        }
      } catch {
        setUploadQueue((prev) => prev.map((q) => q.id === item.id ? { ...q, status: 'error', error: 'Eroare rețea' } : q));
      }
    }
    setTimeout(() => setUploadQueue((prev) => prev.filter((q) => q.status !== 'done')), 2000);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length) uploadFiles(files);
    e.target.value = '';
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

  function handleDragOver(e: React.DragEvent) { e.preventDefault(); }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
    if (files.length) uploadFiles(files);
  }

  async function handleDeleteImage(url: string) {
    if (!data || !confirm('Śtergeți această imagine?')) return;
    if (url.startsWith('/api/img/')) {
      await fetch('/api/admin/images', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: url.replace('/api/img/', '') }),
      });
    }
    setData({ ...data, fabrica: { ...data.fabrica, imagini: data.fabrica.imagini.filter((u) => u !== url) } });
  }

  if (loading) return <div className="p-8 text-slate-500">Se încarcă...</div>;
  if (error && !data) return <div className="p-8 text-red-500">{error}</div>;
  if (!data) return null;

  const activeUploads = uploadQueue.filter((q) => q.status === 'uploading' || q.status === 'pending');
  const errorUploads = uploadQueue.filter((q) => q.status === 'error');

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Despre Noi</h1>
        <p className="text-slate-500 mt-1">Editați secțiunea Despre Noi de pe site</p>
      </div>

      {message && <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{message}</div>}
      {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

      <div className="space-y-6">
        {/* Cifre */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Cifre de referință</h2>
          <div className="space-y-3">
            {data.cifre.map((c, i) => (
              <div key={i} className="flex gap-3 items-end">
                <div className="w-28">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Valoare</label>
                  <input type="text" value={c.val} onChange={(e) => updateCifra(i, 'val', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Etichetă</label>
                  <input type="text" value={c.label} onChange={(e) => updateCifra(i, 'label', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button onClick={() => setData({ ...data, cifre: data.cifre.filter((_, j) => j !== i) })}
                  className="text-red-400 hover:text-red-600 p-2 mb-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
            <button onClick={() => setData({ ...data, cifre: [...data.cifre, { val: '', label: '' }] })}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium">+ Adaugă cifră</button>
          </div>
        </div>

        {/* Specializari */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Specializări</h2>
          <div className="space-y-2">
            {data.specializari.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={s} onChange={(e) => updateSpecializare(i, e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button onClick={() => setData({ ...data, specializari: data.specializari.filter((_, j) => j !== i) })}
                  className="text-red-400 hover:text-red-600 p-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
            <button onClick={() => setData({ ...data, specializari: [...data.specializari, ''] })}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium">+ Adaugă specializare</button>
          </div>
        </div>

        {/* Fabrica */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Fabrică</h2>

          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-1">Adresă fabrică</label>
            <input type="text" value={data.fabrica.adresa}
              onChange={(e) => setData({ ...data, fabrica: { ...data.fabrica, adresa: e.target.value } })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <label className="block text-sm font-medium text-slate-700 mb-3">Imagini fabrică</label>

          {/* Imagini existente */}
          {data.fabrica.imagini.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4">
              {data.fabrica.imagini.map((url, i) => (
                <div key={url} className="relative group">
                  <img src={url} alt={`Fabrică ${i + 1}`}
                    className="w-28 h-28 object-cover rounded-xl border border-slate-200 bg-slate-50"
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }} />
                  <button onClick={() => handleDeleteImage(url)}
                    className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload progress */}
          {uploadQueue.length > 0 && (
            <div className="mb-4 space-y-2">
              {uploadQueue.map((q) => (
                <div key={q.id} className="flex items-center gap-3 bg-slate-50 rounded-lg px-3 py-2">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    q.status === 'uploading' ? 'bg-blue-500 animate-pulse' :
                    q.status === 'done' ? 'bg-green-500' :
                    q.status === 'error' ? 'bg-red-500' : 'bg-slate-300'
                  }`} />
                  <span className="text-sm text-slate-600 truncate flex-1">{q.file.name}</span>
                  <span className="text-xs text-slate-400 flex-shrink-0">
                    {q.status === 'uploading' ? 'Se încarcă...' :
                     q.status === 'done' ? '✓ Gata' :
                     q.status === 'error' ? q.error || 'Eroare' : 'Aşteaptă'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Error summary */}
          {errorUploads.length > 0 && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
              {errorUploads[0].error}
              {errorUploads[0].error?.includes('R2 storage') && (
                <p className="mt-1 text-xs">Mergi la Cloudflare Pages → Settings → Functions → R2 bucket bindings → adaugă <strong>PLASTDU_IMAGES</strong>.</p>
              )}
            </div>
          )}

          {/* Drop zone */}
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileInput}
            />
            <div className="flex flex-col items-center gap-3 pointer-events-none">
              {isDragging ? (
                <>
                  <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <p className="text-blue-600 font-semibold">Dă-i drumul!</p>
                </>
              ) : (
                <>
                  <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Trage imaginile aici</p>
                    <p className="text-xs text-slate-400 mt-0.5">sau <span className="text-blue-600 underline">alege fişierele</span> — multiple imagini simultan</p>
                  </div>
                  {activeUploads.length > 0 && (
                    <p className="text-xs text-blue-600 font-medium">{activeUploads.length} fişier{activeUploads.length > 1 ? 'e' : ''} în curs de upload...</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button onClick={handleSave} disabled={saving || activeUploads.length > 0}
          className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm">
          {saving ? 'Se salvează...' : activeUploads.length > 0 ? `Aşteaptă upload (${activeUploads.length})...` : 'Salvează modificările'}
        </button>
      </div>
    </div>
  );
}
