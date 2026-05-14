'use client';

import { useEffect, useState, useRef } from 'react';

interface Proiect {
  id: string;
  titlu: string;
  descriere: string;
  adresa: string;
  lat: number | null;
  lng: number | null;
  imagini: string[];
}

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

export default function AdminProiectePage() {
  const [proiecte, setProiecte] = useState<Proiect[]>([]);
  const [form, setForm] = useState<Partial<Proiect> & { isNew?: boolean }>({
    titlu: '', descriere: '', adresa: '', lat: null, lng: null, imagini: [], isNew: true,
  });
  const [gpsStatus, setGpsStatus] = useState<'none' | 'found' | 'manual'>('none');
  const [geocoding, setGeocoding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/admin/content?key=proiecte')
      .then((r) => r.json())
      .then(setProiecte);
  }, []);

  async function handlePhotoUpload(file: File) {
    const buf = await file.arrayBuffer();
    const gps = readExifGps(buf);
    if (gps) {
      setForm((f) => ({ ...f, lat: gps.lat, lng: gps.lng }));
      setGpsStatus('found');
    } else {
      setGpsStatus('manual');
    }

    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('path', `proiecte/${Date.now()}-${file.name}`);
    const res = await fetch('/api/admin/images', { method: 'POST', body: fd });
    const { url } = await res.json();
    setForm((f) => ({ ...f, imagini: [...(f.imagini || []), url] }));
    setUploading(false);
  }

  async function geocode() {
    if (!form.adresa) return;
    setGeocoding(true);
    const res = await fetch(`/api/admin/geocode?q=${encodeURIComponent(form.adresa)}`);
    if (res.ok) {
      const { lat, lng } = await res.json();
      setForm((f) => ({ ...f, lat, lng }));
    } else {
      alert('Adresa nu a fost găsită. Încearcă mai specific.');
    }
    setGeocoding(false);
  }

  async function saveProiect() {
    if (!form.titlu) return alert('Titlul este obligatoriu.');
    setSaving(true); setSaved(false);
    const proiect: Proiect = {
      id: form.id || `p-${Date.now()}`,
      titlu: form.titlu || '',
      descriere: form.descriere || '',
      adresa: form.adresa || '',
      lat: form.lat ?? null,
      lng: form.lng ?? null,
      imagini: form.imagini || [],
    };
    const updated = form.isNew
      ? [...proiecte, proiect]
      : proiecte.map((p) => (p.id === proiect.id ? proiect : p));
    setProiecte(updated);
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'proiecte', value: updated }),
    });
    setSaving(false); setSaved(true);
    setForm({ titlu: '', descriere: '', adresa: '', lat: null, lng: null, imagini: [], isNew: true });
    setGpsStatus('none');
  }

  async function deleteProiect(id: string) {
    if (!confirm('Ştergi proiectul?')) return;
    const updated = proiecte.filter((p) => p.id !== id);
    setProiecte(updated);
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'proiecte', value: updated }),
    });
  }

  function editProiect(p: Proiect) {
    setForm({ ...p, isNew: false });
    setGpsStatus(p.lat ? 'found' : 'none');
    setSaved(false);
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Proiecte</h1>

      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">{form.isNew ? 'Proiect nou' : 'Editează proiect'}</h2>

        <input value={form.titlu || ''} onChange={(e) => setForm((f) => ({ ...f, titlu: e.target.value }))}
          placeholder="Titlu proiect" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />

        <textarea value={form.descriere || ''} onChange={(e) => setForm((f) => ({ ...f, descriere: e.target.value }))}
          placeholder="Descriere" rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fotografii proiect</label>
          <div className="flex flex-wrap gap-3 mb-3">
            {(form.imagini || []).map((img, i) => (
              <div key={i} className="relative">
                <img src={img} alt="" className="w-20 h-20 object-cover rounded-lg border" />
                <button onClick={() => setForm((f) => ({ ...f, imagini: (f.imagini || []).filter((_, j) => j !== i) }))}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">✕</button>
              </div>
            ))}
          </div>
          <input ref={imgRef} type="file" accept="image/*" multiple className="hidden"
            onChange={(e) => Array.from(e.target.files || []).forEach(handlePhotoUpload)} />
          <button onClick={() => imgRef.current?.click()} disabled={uploading}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition disabled:opacity-50">
            {uploading ? 'Se încarcă...' : '+ Adaugă fotografii'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {gpsStatus === 'found' && (
            <span className="inline-flex items-center gap-1 text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
              GPS extras din fotografie ({form.lat?.toFixed(5)}, {form.lng?.toFixed(5)})
            </span>
          )}
          {gpsStatus === 'manual' && (
            <span className="inline-flex items-center gap-1 text-sm text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
              Fără GPS în fotografie
            </span>
          )}
        </div>

        {(gpsStatus === 'manual' || gpsStatus === 'none' || !form.lat) && (
          <div className="flex gap-2">
            <input value={form.adresa || ''} onChange={(e) => setForm((f) => ({ ...f, adresa: e.target.value }))}
              placeholder="Adresă manuală (ex: Cluj-Napoca, Calea Florești 10)" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            <button onClick={geocode} disabled={geocoding || !form.adresa}
              className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2 rounded-lg transition disabled:opacity-50">
              {geocoding ? 'Caută...' : 'Localizează'}
            </button>
          </div>
        )}

        {form.lat && form.lng && (
          <p className="text-xs text-gray-500">Coordonate: {form.lat.toFixed(6)}, {form.lng.toFixed(6)}</p>
        )}

        <div className="flex items-center gap-3">
          <button onClick={saveProiect} disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50">
            {saving ? 'Se salvează...' : (form.isNew ? 'Adaugă proiect' : 'Actualizează proiect')}
          </button>
          {!form.isNew && (
            <button onClick={() => { setForm({ titlu: '', descriere: '', adresa: '', lat: null, lng: null, imagini: [], isNew: true }); setGpsStatus('none'); }}
              className="text-sm text-gray-500 hover:text-gray-700">Anulează</button>
          )}
          {saved && <span className="text-green-600 text-sm">Salvat!</span>}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Proiecte existente ({proiecte.length})</h2>
        {proiecte.length === 0 && <p className="text-gray-400 text-sm">Niciun proiect adăugat.</p>}
        <ul className="space-y-3">
          {proiecte.map((p) => (
            <li key={p.id} className="flex items-start justify-between gap-4 border border-gray-100 rounded-xl p-4">
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{p.titlu}</p>
                <p className="text-sm text-gray-500">{p.adresa || 'Fără adresă'}</p>
                {p.lat && <p className="text-xs text-green-600">GPS: {p.lat.toFixed(5)}, {p.lng?.toFixed(5)}</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => editProiect(p)}
                  className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition">Editează</button>
                <button onClick={() => deleteProiect(p.id)}
                  className="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-lg transition">Şterge</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
