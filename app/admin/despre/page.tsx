'use client';
export const runtime = 'edge';

import { useEffect, useRef, useState } from 'react';

type Cifra = { val: string; label: string };
type DespreData = {
  cifre: Cifra[];
  specializari: string[];
  fabrica: { imagini: string[]; videoclipuri: string[]; adresa: string };
};
type UploadItem = { file: File; id: string; status: 'pending' | 'uploading' | 'done' | 'error'; error?: string };

export default function AdminDesprePage() {
  const [data, setData] = useState<DespreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [imgQueue, setImgQueue] = useState<UploadItem[]>([]);
  const [vidQueue, setVidQueue] = useState<UploadItem[]>([]);
  const [isDraggingImg, setIsDraggingImg] = useState(false);
  const [isDraggingVid, setIsDraggingVid] = useState(false);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const vidInputRef = useRef<HTMLInputElement>(null);
  const imgDragCounter = useRef(0);
  const vidDragCounter = useRef(0);

  useEffect(() => {
    fetch('/api/admin/content?key=despre')
      .then((r) => r.json())
      .then((json) => {
        const d = json.data;
        if (d && !d.fabrica.videoclipuri) d.fabrica.videoclipuri = [];
        setData(d);
      })
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

  async function uploadFiles(files: File[], type: 'image' | 'video') {
    if (!data) return;
    const setQueue = type === 'image' ? setImgQueue : setVidQueue;
    const prefix = type === 'image' ? 'fabrica' : 'fabrica/video';
    const items: UploadItem[] = files.map((file) => ({
      file,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      status: 'pending',
    }));
    setQueue((prev) => [...prev, ...items]);

    for (const item of items) {
      setQueue((prev) => prev.map((q) => q.id === item.id ? { ...q, status: 'uploading' } : q));
      const ext = item.file.name.split('.').pop() || (type === 'video' ? 'mp4' : 'jpg');
      const path = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const fd = new FormData();
      fd.append('file', item.file);
      fd.append('path', path);
      try {
        const res = await fetch('/api/admin/images', { method: 'POST', body: fd });
        const json = await res.json();
        if (res.ok) {
          if (type === 'image') {
            setData((prev) => prev ? { ...prev, fabrica: { ...prev.fabrica, imagini: [...prev.fabrica.imagini, json.url] } } : prev);
          } else {
            setData((prev) => prev ? { ...prev, fabrica: { ...prev.fabrica, videoclipuri: [...(prev.fabrica.videoclipuri || []), json.url] } } : prev);
          }
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

  async function handleDeleteImage(url: string) {
    if (!data || !confirm('Ștergeți această imagine?')) return;
    if (url.startsWith('/api/img/')) {
      await fetch('/api/admin/images', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ path: url.replace('/api/img/', '') }) });
    }
    setData({ ...data, fabrica: { ...data.fabrica, imagini: data.fabrica.imagini.filter((u) => u !== url) } });
  }

  async function handleDeleteVideo(url: string) {
    if (!data || !confirm('Ștergeți acest videoclip?')) return;
    if (url.startsWith('/api/img/')) {
      await fetch('/api/admin/images', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ path: url.replace('/api/img/', '') }) });
    }
    setData({ ...data, fabrica: { ...data.fabrica, videoclipuri: (data.fabrica.videoclipuri || []).filter((u) => u !== url) } });
  }

  function makeDragHandlers(setDragging: (v: boolean) => void, counter: React.MutableRefObject<number>, accept: 'image' | 'video') {
    return {
      onDragEnter(e: React.DragEvent) { e.preventDefault(); counter.current++; setDragging(true); },
      onDragLeave(e: React.DragEvent) { e.preventDefault(); counter.current--; if (counter.current === 0) setDragging(false); },
      onDragOver(e: React.DragEvent) { e.preventDefault(); },
      onDrop(e: React.DragEvent) {
        e.preventDefault(); counter.current = 0; setDragging(false);
        const files = Array.from(e.dataTransfer.files).filter((f) => accept === 'image' ? f.type.startsWith('image/') : f.type.startsWith('video/'));
        if (files.length) uploadFiles(files, accept);
      },
    };
  }

  function UploadQueue({ queue }: { queue: UploadItem[] }) {
    if (!queue.length) return null;
    return (
      <div className="mt-3 space-y-1.5">
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
    );
  }

  if (loading) return <div className="p-8 text-slate-500">Se încarcă...</div>;
  if (error && !data) return <div className="p-8 text-red-500">{error}</div>;
  if (!data) return null;

  const activeUploads = [...imgQueue, ...vidQueue].filter((q) => q.status === 'uploading' || q.status === 'pending').length;
  const imgHandlers = makeDragHandlers(setIsDraggingImg, imgDragCounter, 'image');
  const vidHandlers = makeDragHandlers(setIsDraggingVid, vidDragCounter, 'video');

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
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <h2 className="text-base font-semibold text-slate-800">Fabrică</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Adresă fabrică</label>
            <input type="text" value={data.fabrica.adresa}
              onChange={(e) => setData({ ...data, fabrica: { ...data.fabrica, adresa: e.target.value } })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Imagini */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Imagini fabrică</label>
            {data.fabrica.imagini.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-4">
                {data.fabrica.imagini.map((url, i) => (
                  <div key={url} className="relative group">
                    <img src={url} alt={`Fabrică ${i + 1}`} className="w-28 h-28 object-cover rounded-xl border border-slate-200 bg-slate-50"
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }} />
                    <button onClick={() => handleDeleteImage(url)}
                      className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <UploadQueue queue={imgQueue} />
            <div {...imgHandlers} onClick={() => imgInputRef.current?.click()}
              className={`mt-3 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDraggingImg ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
              }`}>
              <input ref={imgInputRef} type="file" accept="image/*" multiple className="hidden"
                onChange={(e) => { const f = Array.from(e.target.files ?? []); if (f.length) uploadFiles(f, 'image'); e.target.value = ''; }} />
              {isDraggingImg ? <p className="text-blue-600 font-medium">Dă-i drumul!</p> : (
                <><p className="text-sm font-medium text-slate-700">Trage imaginile aici</p>
                <p className="text-xs text-slate-400 mt-0.5">sau <span className="text-blue-600 underline">alege fișierele</span> — multiple imagini simultan</p></>
              )}
            </div>
          </div>

          {/* Videoclipuri */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Videoclipuri fabrică</label>
            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
              Dimensiune maximă recomandată: <strong>100 MB</strong> per fișier. Formate acceptate: MP4, WebM, MOV.
            </p>
            {(data.fabrica.videoclipuri || []).length > 0 && (
              <div className="space-y-3 mb-4">
                {(data.fabrica.videoclipuri || []).map((url, i) => (
                  <div key={url} className="relative group flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
                    <video src={url} className="w-32 h-20 object-cover rounded-lg bg-black flex-shrink-0" preload="metadata" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-600 truncate">Videoclip {i + 1}</p>
                      <p className="text-xs text-slate-400 truncate">{url}</p>
                    </div>
                    <button onClick={() => handleDeleteVideo(url)}
                      className="flex-shrink-0 text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <UploadQueue queue={vidQueue} />
            <div {...vidHandlers} onClick={() => vidInputRef.current?.click()}
              className={`mt-3 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDraggingVid ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
              }`}>
              <input ref={vidInputRef} type="file" accept="video/*" multiple className="hidden"
                onChange={(e) => { const f = Array.from(e.target.files ?? []); if (f.length) uploadFiles(f, 'video'); e.target.value = ''; }} />
              {isDraggingVid ? <p className="text-blue-600 font-medium">Dă-i drumul!</p> : (
                <>
                  <svg className="w-8 h-8 text-slate-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25z" />
                  </svg>
                  <p className="text-sm font-medium text-slate-700">Trage videoclipul aici</p>
                  <p className="text-xs text-slate-400 mt-0.5">sau <span className="text-blue-600 underline">alege fișierul</span> — MP4, WebM, MOV</p>
                </>
              )}
            </div>
          </div>
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
