'use client';
export const runtime = 'edge';

import { useEffect, useRef, useState } from 'react';

type Certificat = { titlu: string; descriere: string; fisier: string; tip: 'imagine' | 'pdf' };
type UploadItem = { file: File; id: string; status: 'pending' | 'uploading' | 'done' | 'error'; error?: string };

export default function AdminCertificatePage() {
  const [data, setData] = useState<Certificat[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [queue, setQueue] = useState<UploadItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  useEffect(() => {
    fetch('/api/admin/content?key=certificate')
      .then((r) => r.json())
      .then((json) => setData(Array.isArray(json.data) ? json.data : []))
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
        body: JSON.stringify({ key: 'certificate', data }),
      });
      if (res.ok) setMessage('Certificate salvate cu succes!');
      else {
        const j = await res.json().catch(() => ({}));
        setError(j.error || 'Eroare la salvare');
      }
    } catch { setError('Eroare de rețea'); }
    finally { setSaving(false); }
  }

  function updateField(i: number, field: keyof Certificat, value: string) {
    if (!data) return;
    const next = [...data];
    next[i] = { ...next[i], [field]: value } as Certificat;
    setData(next);
  }

  function removeCert(i: number) {
    if (!data || !confirm('Ștergeți acest certificat din listă?')) return;
    setData(data.filter((_, j) => j !== i));
  }

  async function uploadFiles(files: File[]) {
    const items: UploadItem[] = files.map((file) => ({
      file,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      status: 'pending',
    }));
    setQueue((prev) => [...prev, ...items]);

    for (const item of items) {
      setQueue((prev) => prev.map((q) => q.id === item.id ? { ...q, status: 'uploading' } : q));
      const ext = item.file.name.split('.').pop() || 'jpg';
      const path = `certificate/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const fd = new FormData();
      fd.append('file', item.file);
      fd.append('path', path);
      try {
        const res = await fetch('/api/admin/images', { method: 'POST', body: fd });
        const json = await res.json();
        if (res.ok) {
          const tip: Certificat['tip'] = item.file.type === 'application/pdf' ? 'pdf' : 'imagine';
          const titlu = item.file.name.replace(/\.[^.]+$/, '');
          setData((prev) => [...(prev ?? []), { titlu, descriere: '', fisier: json.url, tip }]);
          setQueue((prev) => prev.map((q) => q.id === item.id ? { ...q, status: 'done' } : q));
        } else {
          setQueue((prev) => prev.map((q) => q.id === item.id ? { ...q, status: 'error', error: json.error || 'Upload eșuat' } : q));
        }
      } catch {
        setQueue((prev) => prev.map((q) => q.id === item.id ? { ...q, status: 'error', error: 'Eroare rețea' } : q));
      }
    }
    setTimeout(() => setQueue((prev) => prev.filter((q) => q.status !== 'done')), 2000);
  }

  function handleDragEnter(e: React.DragEvent) { e.preventDefault(); dragCounter.current++; setIsDragging(true); }
  function handleDragLeave(e: React.DragEvent) { e.preventDefault(); dragCounter.current--; if (dragCounter.current === 0) setIsDragging(false); }
  function handleDragOver(e: React.DragEvent) { e.preventDefault(); }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault(); dragCounter.current = 0; setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type === 'application/pdf' || f.type.startsWith('image/'));
    if (files.length) uploadFiles(files);
  }

  if (loading) return <div className="p-8 text-slate-500">Se încarcă...</div>;
  if (error && !data) return <div className="p-8 text-red-500">{error}</div>;
  if (!data) return null;

  const activeUploads = queue.filter((q) => q.status === 'uploading' || q.status === 'pending').length;

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Certificate</h1>
        <p className="text-slate-500 mt-1">Încărcați certificate de calitate (PDF sau imagine) — apar în secțiunea Certificări de pe /despre-noi</p>
      </div>

      {message && <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{message}</div>}
      {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
        {data.length > 0 && (
          <div className="space-y-4">
            {data.map((c, i) => (
              <div key={c.fisier} className="flex gap-3 items-start bg-slate-50 rounded-xl p-3 border border-slate-200">
                <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden">
                  {c.tip === 'imagine' ? (
                    <img src={c.fisier} alt={c.titlu} className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-7 h-7 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <input type="text" value={c.titlu} placeholder="Titlu certificat"
                    onChange={(e) => updateField(i, 'titlu', e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" value={c.descriere} placeholder="Descriere scurtă (opțional)"
                    onChange={(e) => updateField(i, 'descriere', e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button onClick={() => removeCert(i)} className="text-red-400 hover:text-red-600 p-2 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {queue.length > 0 && (
          <div className="space-y-1.5">
            {queue.map((q) => (
              <div key={q.id} className="flex items-center gap-3 bg-slate-50 rounded-lg px-3 py-2">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  q.status === 'uploading' ? 'bg-blue-500 animate-pulse' :
                  q.status === 'done' ? 'bg-green-500' :
                  q.status === 'error' ? 'bg-red-500' : 'bg-slate-300'
                }`} />
                <span className="text-sm text-slate-600 truncate flex-1">{q.file.name}</span>
                <span className="text-xs text-slate-400 flex-shrink-0">
                  {q.status === 'uploading' ? 'Se încarcă...' : q.status === 'done' ? '✓ Gata' : q.status === 'error' ? (q.error || 'Eroare') : 'Așteaptă'}
                </span>
              </div>
            ))}
            {queue.filter(q => q.status === 'error' && q.error?.includes('R2')).slice(0, 1).map(q => (
              <div key={q.id + '-msg'} className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-700">
                {q.error}
                <p className="mt-0.5 text-red-500">Mergi la Cloudflare Pages → Settings → Functions → R2 bucket bindings → adaugă <strong>PLASTDU_IMAGES</strong>.</p>
              </div>
            ))}
          </div>
        )}

        <div
          onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
          }`}
        >
          <input ref={fileInputRef} type="file" accept="application/pdf,image/*" multiple className="hidden"
            onChange={(e) => { const f = Array.from(e.target.files ?? []); if (f.length) uploadFiles(f); e.target.value = ''; }} />
          {isDragging ? <p className="text-blue-600 font-medium">Dă-i drumul!</p> : (
            <>
              <p className="text-sm font-medium text-slate-700">Trage certificatele aici (PDF sau imagine)</p>
              <p className="text-xs text-slate-400 mt-0.5">sau <span className="text-blue-600 underline">alege fișierele</span> — multiple simultan</p>
            </>
          )}
        </div>
      </div>

      <div className="mt-6">
        <button onClick={handleSave} disabled={saving || activeUploads > 0}
          className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm">
          {saving ? 'Se salvează...' : activeUploads > 0 ? `Așteaptă upload (${activeUploads})...` : 'Salvează modificările'}
        </button>
      </div>
    </div>
  );
}
