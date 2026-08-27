'use client';
export const runtime = 'edge';

import { useEffect, useRef, useState } from 'react';

type PozaProiect = { url: string; lat?: number; lng?: number; data?: string };
type UploadItem = { file: File; id: string; status: 'pending' | 'uploading' | 'error'; error?: string };

function readExifGps(buffer: ArrayBuffer): { lat: number; lng: number } | null {
  const view = new DataView(buffer);
  if (view.getUint16(0) !== 0xFFD8) return null;

  let offset = 2;
  while (offset < view.byteLength - 4) {
    const marker = view.getUint16(offset);
    offset += 2;
    if (marker === 0xFFE1) {
      const segLen = view.getUint16(offset);
      const hdr = new Uint8Array(buffer, offset + 2, 4);
      const exifHeader = String.fromCharCode(hdr[0], hdr[1], hdr[2], hdr[3]);
      if (exifHeader !== 'Exif') { offset += segLen; continue; }
      const tiffStart = offset + 8;
      const byteOrder = view.getUint16(tiffStart);
      const le = byteOrder === 0x4949;
      const read16 = (o: number) => le ? view.getUint16(tiffStart + o, true) : view.getUint16(tiffStart + o);
      const read32 = (o: number) => le ? view.getUint32(tiffStart + o, true) : view.getUint32(tiffStart + o);
      const ifdOffset = read32(4);
      const numEntries = read16(ifdOffset);
      let gpsOffset: number | null = null;
      for (let i = 0; i < numEntries; i++) {
        const entryOffset = ifdOffset + 2 + i * 12;
        if (read16(entryOffset) === 0x8825) { gpsOffset = read32(entryOffset + 8); }
      }
      if (gpsOffset === null) return null;
      const gpsEntries = read16(gpsOffset);
      const gpsData: Record<number, any> = {};
      for (let i = 0; i < gpsEntries; i++) {
        const e = gpsOffset + 2 + i * 12;
        const tag = read16(e);
        const count = read32(e + 4);
        const valOffset = read32(e + 8);
        if (tag === 1 || tag === 3) {
          gpsData[tag] = String.fromCharCode(new Uint8Array(buffer, tiffStart + valOffset)[0]);
        } else if (tag === 2 || tag === 4) {
          const rationals: number[] = [];
          for (let j = 0; j < count; j++) {
            const rOff = tiffStart + valOffset + j * 8;
            const num = le ? view.getUint32(rOff, true) : view.getUint32(rOff);
            const den = le ? view.getUint32(rOff + 4, true) : view.getUint32(rOff + 4);
            rationals.push(den !== 0 ? num / den : 0);
          }
          gpsData[tag] = rationals;
        }
      }
      if (!gpsData[2] || !gpsData[4]) return null;
      const toDeg = (r: number[]) => r[0] + r[1] / 60 + r[2] / 3600;
      let lat = toDeg(gpsData[2]);
      let lng = toDeg(gpsData[4]);
      if (gpsData[1] === 'S') lat = -lat;
      if (gpsData[3] === 'W') lng = -lng;
      return { lat, lng };
    } else {
      if (offset + 2 > view.byteLength) break;
      offset += view.getUint16(offset);
    }
  }
  return null;
}

export default function AdminGalerieProiectePage() {
  const [poze, setPoze] = useState<PozaProiect[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [queue, setQueue] = useState<UploadItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  useEffect(() => {
    fetch('/api/admin/content?key=poze-proiecte')
      .then((r) => r.json())
      .then((json) => setPoze(Array.isArray(json.data) ? json.data : []))
      .catch(() => setError('Nu s-au putut încărca datele'))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (!poze) return;
    setSaving(true); setMessage(''); setError('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'poze-proiecte', data: poze }),
      });
      if (res.ok) setMessage('Poze salvate cu succes!');
      else {
        const j = await res.json().catch(() => ({}));
        setError(j.error || 'Eroare la salvare');
      }
    } catch { setError('Eroare de rețea'); }
    finally { setSaving(false); }
  }

  function removePoza(i: number) {
    if (!poze || !confirm('Ștergeți această poză din galerie?')) return;
    setPoze(poze.filter((_, j) => j !== i));
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
      try {
        const buf = await item.file.arrayBuffer();
        const gps = readExifGps(buf);
        const ext = item.file.name.split('.').pop() || 'jpg';
        const path = `poze-proiecte/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const fd = new FormData();
        fd.append('file', item.file);
        fd.append('path', path);
        const res = await fetch('/api/admin/images', { method: 'POST', body: fd });
        const json = await res.json();
        if (res.ok) {
          const entry: PozaProiect = { url: json.url, data: new Date().toISOString() };
          if (gps) { entry.lat = gps.lat; entry.lng = gps.lng; }
          setPoze((prev) => [...(prev ?? []), entry]);
          setQueue((prev) => prev.filter((q) => q.id !== item.id));
        } else {
          setQueue((prev) => prev.map((q) => q.id === item.id ? { ...q, status: 'error', error: json.error || 'Upload eșuat' } : q));
        }
      } catch {
        setQueue((prev) => prev.map((q) => q.id === item.id ? { ...q, status: 'error', error: 'Eroare rețea' } : q));
      }
    }
  }

  function handleDragEnter(e: React.DragEvent) { e.preventDefault(); dragCounter.current++; setIsDragging(true); }
  function handleDragLeave(e: React.DragEvent) { e.preventDefault(); dragCounter.current--; if (dragCounter.current === 0) setIsDragging(false); }
  function handleDragOver(e: React.DragEvent) { e.preventDefault(); }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault(); dragCounter.current = 0; setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
    if (files.length) uploadFiles(files);
  }

  if (loading) return <div className="p-8 text-slate-500">Se încarcă...</div>;
  if (error && !poze) return <div className="p-8 text-red-500">{error}</div>;
  if (!poze) return null;

  const activeUploads = queue.filter((q) => q.status === 'uploading' || q.status === 'pending').length;
  const cuGps = poze.filter((p) => p.lat != null && p.lng != null).length;

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Galerie poze proiecte</h1>
        <p className="text-slate-500 mt-1">
          Încărcați poze bulk pentru a arăta prezența teritorială Plast Du IV. Pozele cu coordonate GPS
          (extrase automat din EXIF) apar ca puncte suplimentare pe harta din /proiecte, iar pozele fără GPS
          apar în galeria generală de sub hartă. Toate pozele apar în galerie.
        </p>
      </div>

      {message && <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{message}</div>}
      {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            {poze.length} poze totale · <span className="text-green-700">{cuGps} cu GPS</span> · {poze.length - cuGps} fără GPS
          </p>
        </div>

        {poze.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {poze.map((p, i) => (
              <div key={p.url} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-50 aspect-square">
                <img src={p.url} alt="" className="w-full h-full object-cover" />
                {p.lat != null && p.lng != null && (
                  <span className="absolute top-1.5 left-1.5 bg-green-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow">
                    GPS ✓
                  </span>
                )}
                <button
                  onClick={() => removePoza(i)}
                  className="absolute top-1.5 right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Șterge poza"
                >
                  ✕
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
                  q.status === 'error' ? 'bg-red-500' : 'bg-slate-300'
                }`} />
                <span className="text-sm text-slate-600 truncate flex-1">{q.file.name}</span>
                <span className="text-xs text-slate-400 flex-shrink-0">
                  {q.status === 'uploading' ? 'Se încarcă...' : q.status === 'error' ? (q.error || 'Eroare') : 'Așteaptă'}
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
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
          }`}
        >
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden"
            onChange={(e) => { const f = Array.from(e.target.files ?? []); if (f.length) uploadFiles(f); e.target.value = ''; }} />
          {isDragging ? <p className="text-blue-600 font-medium">Dă-i drumul!</p> : (
            <>
              <p className="text-sm font-medium text-slate-700">Trage pozele aici (imagini)</p>
              <p className="text-xs text-slate-400 mt-0.5">sau <span className="text-blue-600 underline">alege fișierele</span> — bulk upload, multiple simultan</p>
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
