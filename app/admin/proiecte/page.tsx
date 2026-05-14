'use client';
import { useEffect, useState, useRef } from 'react';

interface Project {
  id: number;
  name: string;
  district: string;
  year: number;
  lat: number;
  lng: number;
  photo: string;
  imagini: string[];
}

const DEFAULT_PROJECTS: Project[] = [
  {id:1,name:"Reabilitare termică — Str. Baicului",district:"Sector 2 – Str. Baicului",year:2026,lat:44.4520,lng:26.1180,photo:"/images/proiecte/baicului/01.jpg",imagini:["/images/proiecte/baicului/01.jpg"]},
  {id:2,name:"Reabilitare bloc — Buhuși",district:"Sector 3 – București",year:2026,lat:44.4150,lng:26.1420,photo:"/images/proiecte/buhusi/01.jpg",imagini:["/images/proiecte/buhusi/01.jpg","/images/proiecte/buhusi/02.jpg","/images/proiecte/buhusi/03.jpg"]},
  {id:3,name:"Reabilitare termică — Str. Octavian Goga",district:"Sector 3 – Str. Octavian Goga",year:2026,lat:44.4200,lng:26.1350,photo:"/images/proiecte/octavian-goga/01.jpg",imagini:["/images/proiecte/octavian-goga/01.jpg","/images/proiecte/octavian-goga/02.jpg","/images/proiecte/octavian-goga/03.jpg","/images/proiecte/octavian-goga/04.jpg","/images/proiecte/octavian-goga/05.jpg"]},
  {id:4,name:"Izolare bloc — Str. Ghica",district:"Sector 2 – Str. Ghica",year:2026,lat:44.4600,lng:26.1050,photo:"/images/proiecte/ghica/01.jpg",imagini:["/images/proiecte/ghica/01.jpg"]},
  {id:5,name:"Reabilitare blocuri — proiect multiplu",district:"București",year:2026,lat:44.4400,lng:26.0900,photo:"/images/proiecte/blocuri/01.jpg",imagini:["/images/proiecte/blocuri/01.jpg","/images/proiecte/blocuri/02.jpg","/images/proiecte/blocuri/03.jpg","/images/proiecte/blocuri/04.jpg","/images/proiecte/blocuri/05.jpg"]},
];

async function extractGPS(file: File): Promise<{ lat: number; lng: number } | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const buf = e.target?.result as ArrayBuffer;
        const view = new DataView(buf);
        if (view.getUint16(0) !== 0xFFD8) { resolve(null); return; }
        let offset = 2;
        while (offset < view.byteLength - 2) {
          const marker = view.getUint16(offset);
          offset += 2;
          if (marker === 0xFFE1) {
            const len = view.getUint16(offset);
            const exifHeader = String.fromCharCode(
              view.getUint8(offset + 2), view.getUint8(offset + 3),
              view.getUint8(offset + 4), view.getUint8(offset + 5)
            );
            if (exifHeader === 'Exif') {
              const tiffStart = offset + 8;
              const byteOrder = view.getUint16(tiffStart);
              const le = byteOrder === 0x4949;
              const read16 = (o: number) => le ? view.getUint16(tiffStart + o, true) : view.getUint16(tiffStart + o);
              const read32 = (o: number) => le ? view.getUint32(tiffStart + o, true) : view.getUint32(tiffStart + o);
              const ifd0 = read32(4);
              const entries = read16(ifd0);
              let gpsIFDOffset = -1;
              for (let i = 0; i < entries; i++) {
                const base = ifd0 + 2 + i * 12;
                if (read16(base) === 0x8825) {
                  gpsIFDOffset = read32(base + 8);
                }
              }
              if (gpsIFDOffset < 0) { resolve(null); return; }
              const gpsEntries = read16(gpsIFDOffset);
              const gpsMap: Record<number, number> = {};
              for (let i = 0; i < gpsEntries; i++) {
                const base = gpsIFDOffset + 2 + i * 12;
                const tag = read16(base);
                const type = read16(base + 2);
                const valOffset = base + 8;
                if (type === 5) {
                  const ptr = read32(valOffset);
                  const num = read32(ptr);
                  const den = read32(ptr + 4);
                  gpsMap[tag] = num / den;
                } else if (type === 2) {
                  gpsMap[tag] = view.getUint8(valOffset);
                }
              }
              if (gpsMap[2] !== undefined && gpsMap[4] !== undefined) {
                const readDMS = (entryIdx: number): number => {
                  let dmsBase = -1;
                  for (let i = 0; i < gpsEntries; i++) {
                    const b = gpsIFDOffset + 2 + i * 12;
                    if (read16(b) === entryIdx) { dmsBase = b; break; }
                  }
                  if (dmsBase < 0) return 0;
                  const ptr = read32(dmsBase + 8);
                  const d = read32(ptr) / read32(ptr + 4);
                  const m = read32(ptr + 8) / read32(ptr + 12);
                  const s = read32(ptr + 16) / read32(ptr + 20);
                  return d + m / 60 + s / 3600;
                };
                let lat = readDMS(2);
                let lng = readDMS(4);
                if (gpsMap[1] === 83) lat = -lat;
                if (gpsMap[3] === 87) lng = -lng;
                if (lat !== 0 && lng !== 0) { resolve({ lat, lng }); return; }
              }
            }
            offset += len;
          } else if ((marker & 0xFF00) === 0xFF00) {
            offset += view.getUint16(offset);
          } else break;
        }
        resolve(null);
      } catch { resolve(null); }
    };
    reader.readAsArrayBuffer(file.slice(0, 65536));
  });
}

const EMPTY_FORM = {
  name: '',
  district: '',
  year: new Date().getFullYear(),
  lat: '',
  lng: '',
};

export default function AdminProiectePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Form state
  const [form, setForm] = useState<typeof EMPTY_FORM>({ ...EMPTY_FORM });
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [gpsStatus, setGpsStatus] = useState<'none' | 'found' | 'notfound'>('none');
  const [geocodeAddr, setGeocodeAddr] = useState('');
  const [geocodeStatus, setGeocodeStatus] = useState<'' | 'loading' | 'ok' | 'error'>('');
  const [geocodeMsg, setGeocodeMsg] = useState('');
  const [formError, setFormError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/admin/content?key=proiecte')
      .then((r) => r.json())
      .then((json) => setProjects(json.data ?? DEFAULT_PROJECTS))
      .catch(() => setProjects(DEFAULT_PROJECTS))
      .finally(() => setLoading(false));
  }, []);

  function openAdd() {
    setEditId(null);
    setForm({ ...EMPTY_FORM });
    setExistingImages([]);
    setNewFiles([]);
    setNewPreviews([]);
    setGpsStatus('none');
    setGeocodeAddr('');
    setGeocodeStatus('');
    setGeocodeMsg('');
    setFormError('');
    setShowForm(true);
  }

  function openEdit(p: Project) {
    setEditId(p.id);
    setForm({ name: p.name, district: p.district, year: p.year, lat: String(p.lat), lng: String(p.lng) });
    setExistingImages(p.imagini ?? [p.photo]);
    setNewFiles([]);
    setNewPreviews([]);
    setGpsStatus(p.lat ? 'found' : 'none');
    setGeocodeAddr('');
    setGeocodeStatus('');
    setGeocodeMsg('');
    setFormError('');
    setShowForm(true);
  }

  function cancelForm() {
    setShowForm(false);
    setEditId(null);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setNewFiles((prev) => [...prev, ...files]);
    const previews = files.map((f) => URL.createObjectURL(f));
    setNewPreviews((prev) => [...prev, ...previews]);

    // Try EXIF GPS from first new file only if GPS not already set
    if (gpsStatus !== 'found') {
      const gps = await extractGPS(files[0]);
      if (gps) {
        setForm((prev) => ({ ...prev, lat: String(gps.lat.toFixed(6)), lng: String(gps.lng.toFixed(6)) }));
        setGpsStatus('found');
      } else {
        setGpsStatus('notfound');
      }
    }
  }

  function removeExistingImage(idx: number) {
    setExistingImages((prev) => prev.filter((_, i) => i !== idx));
  }

  function removeNewFile(idx: number) {
    setNewFiles((prev) => prev.filter((_, i) => i !== idx));
    setNewPreviews((prev) => {
      URL.revokeObjectURL(prev[idx]);
      return prev.filter((_, i) => i !== idx);
    });
  }

  async function handleGeocode() {
    if (!geocodeAddr.trim()) return;
    setGeocodeStatus('loading');
    setGeocodeMsg('');
    try {
      const res = await fetch(`/api/admin/geocode?q=${encodeURIComponent(geocodeAddr)}`);
      const json = await res.json();
      if (!res.ok) {
        setGeocodeStatus('error');
        setGeocodeMsg(json.error ?? 'Eroare necunoscută');
      } else {
        setForm((prev) => ({ ...prev, lat: String(json.lat.toFixed(6)), lng: String(json.lng.toFixed(6)) }));
        setGeocodeStatus('ok');
        setGeocodeMsg(json.display ?? '');
      }
    } catch {
      setGeocodeStatus('error');
      setGeocodeMsg('Eroare la geocodare');
    }
  }

  async function handleSave() {
    setFormError('');
    if (!form.name.trim()) { setFormError('Introduceți denumirea proiectului.'); return; }
    if (!form.lat || !form.lng) { setFormError('Coordonatele GPS sunt obligatorii.'); return; }
    const allImages = [...existingImages];
    if (existingImages.length === 0 && newFiles.length === 0) {
      setFormError('Adăugați cel puțin o imagine.'); return;
    }
    setSaving(true);
    try {
      const id = editId ?? (projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1);
      // Upload new files
      const uploadedUrls: string[] = [];
      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
        const idx = existingImages.length + i + 1;
        const path = `proiecte/${id}/${String(idx).padStart(2, '0')}.${ext}`;
        const fd = new FormData();
        fd.append('file', file);
        fd.append('path', path);
        const res = await fetch('/api/admin/images', { method: 'POST', body: fd });
        const json = await res.json();
        uploadedUrls.push(json.url);
      }
      const allImagini = [...existingImages, ...uploadedUrls];
      const project: Project = {
        id,
        name: form.name.trim(),
        district: form.district.trim(),
        year: Number(form.year),
        lat: parseFloat(String(form.lat)),
        lng: parseFloat(String(form.lng)),
        photo: allImagini[0] ?? '',
        imagini: allImagini,
      };
      // Load current list and update
      const kvRes = await fetch('/api/admin/content?key=proiecte');
      const kvJson = await kvRes.json();
      let list: Project[] = kvJson.data ?? DEFAULT_PROJECTS;
      if (editId !== null) {
        list = list.map((p) => (p.id === editId ? project : p));
      } else {
        list = [...list, project];
      }
      await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'proiecte', data: list }),
      });
      setProjects(list);
      setShowForm(false);
      setEditId(null);
    } catch (err: any) {
      setFormError(err.message ?? 'Eroare la salvare');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Ștergeți acest proiect?')) return;
    try {
      const kvRes = await fetch('/api/admin/content?key=proiecte');
      const kvJson = await kvRes.json();
      let list: Project[] = kvJson.data ?? DEFAULT_PROJECTS;
      const proj = list.find((p) => p.id === id);
      if (proj) {
        // Delete images from R2
        for (const url of proj.imagini ?? [proj.photo]) {
          if (url.startsWith('/api/img/')) {
            const path = url.replace('/api/img/', '');
            await fetch('/api/admin/images', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ path }),
            });
          }
        }
      }
      list = list.filter((p) => p.id !== id);
      await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'proiecte', data: list }),
      });
      setProjects(list);
    } catch {
      alert('Eroare la ștergere');
    }
  }

  if (loading) return <div className="p-8 text-slate-500">Se încarcă...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Proiecte</h1>
          <p className="text-slate-500 mt-1">Gestionați proiectele realizate</p>
        </div>
        {!showForm && (
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Adaugă proiect
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-200 mb-8 p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-5">
            {editId !== null ? 'Editează proiect' : 'Proiect nou'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Denumire proiect *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Reabilitare termică — Str. Exemplu"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Localitate / sector</label>
              <input
                type="text"
                value={form.district}
                onChange={(e) => setForm((p) => ({ ...p, district: e.target.value }))}
                placeholder="Sector 2 – Str. Exemplu"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Anul</label>
              <input
                type="number"
                value={form.year}
                onChange={(e) => setForm((p) => ({ ...p, year: parseInt(e.target.value) || new Date().getFullYear() }))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Latitudine *</label>
                <input
                  type="number"
                  step="any"
                  value={form.lat}
                  onChange={(e) => setForm((p) => ({ ...p, lat: e.target.value }))}
                  placeholder="44.4520"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Longitudine *</label>
                <input
                  type="number"
                  step="any"
                  value={form.lng}
                  onChange={(e) => setForm((p) => ({ ...p, lng: e.target.value }))}
                  placeholder="26.1180"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Image upload */}
          <div className="border border-dashed border-slate-300 rounded-xl p-4 mb-5">
            <p className="text-xs font-semibold text-slate-600 mb-2">Poze proiect</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium px-3 py-2 rounded-lg transition-colors mb-3"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Alege fișiere
            </button>

            {/* GPS status */}
            {gpsStatus === 'found' && (
              <p className="text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-3">
                GPS detectat din EXIF: {form.lat}, {form.lng}
              </p>
            )}
            {gpsStatus === 'notfound' && (
              <div className="mb-3">
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-2">
                  GPS nedetectat — introdu adresa pentru geocodare:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={geocodeAddr}
                    onChange={(e) => setGeocodeAddr(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleGeocode(); }}
                    placeholder="Str. Exemplu nr. 1, Sector 2, București"
                    className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleGeocode}
                    disabled={geocodeStatus === 'loading'}
                    className="bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
                  >
                    {geocodeStatus === 'loading' ? 'Se caută...' : 'Caută pe hartă'}
                  </button>
                </div>
                {geocodeStatus === 'ok' && (
                  <p className="text-xs text-green-700 mt-1">Găsit: {geocodeMsg.slice(0, 80)}</p>
                )}
                {geocodeStatus === 'error' && (
                  <p className="text-xs text-red-600 mt-1">{geocodeMsg}</p>
                )}
              </div>
            )}

            {/* Existing images */}
            {existingImages.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-slate-500 mb-2">Imagini existente (prima = principală):</p>
                <div className="flex flex-wrap gap-2">
                  {existingImages.map((src, i) => (
                    <div key={i} className="relative">
                      <img
                        src={src}
                        alt={`Imagine ${i + 1}`}
                        className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                        onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
                      />
                      {i === 0 && (
                        <span className="absolute -top-1 -left-1 bg-blue-600 text-white text-[10px] px-1 rounded">Main</span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeExistingImage(i)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs leading-none"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New file previews */}
            {newPreviews.length > 0 && (
              <div>
                <p className="text-xs text-slate-500 mb-2">Imagini noi de adăugat:</p>
                <div className="flex flex-wrap gap-2">
                  {newPreviews.map((src, i) => (
                    <div key={i} className="relative">
                      <img
                        src={src}
                        alt={`Nouă ${i + 1}`}
                        className="w-16 h-16 object-cover rounded-lg border border-blue-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewFile(i)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs leading-none"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {formError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
              {formError}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
            >
              {saving ? 'Se salvează...' : 'Salvează'}
            </button>
            <button
              type="button"
              onClick={cancelForm}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium px-5 py-2 rounded-lg transition-colors"
            >
              Anulează
            </button>
          </div>
        </div>
      )}

      {/* Projects list */}
      <section className="bg-white rounded-2xl border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-800">Lista proiecte</h2>
            <p className="text-xs text-slate-500 mt-0.5">Proiecte salvate în KV</p>
          </div>
          <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium">
            {projects.length} proiecte
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">Foto</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">Denumire</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">Localitate</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">An</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-3 py-3">GPS</th>
                <th className="text-right text-xs font-semibold text-slate-500 px-6 py-3">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400 text-sm">Nu există proiecte. Adăugați primul proiect.</td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                        <img
                          src={p.photo}
                          alt={p.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-sm font-medium text-slate-800">{p.name}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-sm text-slate-600">{p.district}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-sm text-slate-600">{p.year}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-xs text-slate-400 font-mono">{p.lat.toFixed(4)}, {p.lng.toFixed(4)}</span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Editează
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="inline-flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Șterge
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
