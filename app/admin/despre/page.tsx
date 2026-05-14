'use client';
import { useEffect, useState } from 'react';

type Cifra = { val: string; label: string };

type DespreData = {
  cifre: Cifra[];
  specializari: string[];
  fabrica: {
    imagini: string[];
    adresa: string;
  };
};

export default function AdminDesprePage() {
  const [data, setData] = useState<DespreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/content?key=despre')
      .then((r) => r.json())
      .then((json) => setData(json.data))
      .catch(() => setError('Nu s-au putut încărca datele'))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setMessage('');
    setError('');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'despre', data }),
      });
      if (res.ok) {
        setMessage('Date salvate cu succes!');
      } else {
        setError('Eroare la salvare');
      }
    } catch {
      setError('Eroare de rețea');
    } finally {
      setSaving(false);
    }
  }

  function updateCifra(index: number, field: keyof Cifra, value: string) {
    if (!data) return;
    const newCifre = [...data.cifre];
    newCifre[index] = { ...newCifre[index], [field]: value };
    setData({ ...data, cifre: newCifre });
  }

  function addCifra() {
    if (!data) return;
    setData({ ...data, cifre: [...data.cifre, { val: '', label: '' }] });
  }

  function removeCifra(index: number) {
    if (!data) return;
    setData({ ...data, cifre: data.cifre.filter((_, i) => i !== index) });
  }

  function updateSpecializare(index: number, value: string) {
    if (!data) return;
    const next = [...data.specializari];
    next[index] = value;
    setData({ ...data, specializari: next });
  }

  function addSpecializare() {
    if (!data) return;
    setData({ ...data, specializari: [...data.specializari, ''] });
  }

  function removeSpecializare(index: number) {
    if (!data) return;
    setData({ ...data, specializari: data.specializari.filter((_, i) => i !== index) });
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !data) return;
    setUploadingImg(true);
    const ext = file.name.split('.').pop() || 'jpg';
    const path = `fabrica/${Date.now()}.${ext}`;
    const fd = new FormData();
    fd.append('file', file);
    fd.append('path', path);
    try {
      const res = await fetch('/api/admin/images', { method: 'POST', body: fd });
      if (res.ok) {
        const { url } = await res.json();
        setData({
          ...data,
          fabrica: { ...data.fabrica, imagini: [...data.fabrica.imagini, url] },
        });
      } else {
        setError('Upload eșuat');
      }
    } catch {
      setError('Eroare upload');
    } finally {
      setUploadingImg(false);
      e.target.value = '';
    }
  }

  async function handleDeleteFabricaImage(url: string) {
    if (!data || !confirm('Ștergeți această imagine?')) return;
    if (url.startsWith('/api/img/')) {
      const path = url.replace('/api/img/', '');
      await fetch('/api/admin/images', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });
    }
    setData({
      ...data,
      fabrica: {
        ...data.fabrica,
        imagini: data.fabrica.imagini.filter((u) => u !== url),
      },
    });
  }

  if (loading) return <div className="p-8 text-slate-500">Se încarcă...</div>;
  if (error && !data) return <div className="p-8 text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Despre Noi</h1>
        <p className="text-slate-500 mt-1">Editați secțiunea Despre Noi de pe site</p>
      </div>

      {message && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{message}</div>
      )}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}

      <div className="space-y-6">
        {/* Cifre de referință */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Cifre de referință</h2>
          <div className="space-y-3">
            {data.cifre.map((c, i) => (
              <div key={i} className="flex gap-3 items-end">
                <div className="w-28">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Valoare</label>
                  <input
                    type="text"
                    value={c.val}
                    onChange={(e) => updateCifra(i, 'val', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Etichetă</label>
                  <input
                    type="text"
                    value={c.label}
                    onChange={(e) => updateCifra(i, 'label', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={() => removeCifra(i)}
                  className="text-red-400 hover:text-red-600 p-2 mb-0.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              onClick={addCifra}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              + Adaugă cifră
            </button>
          </div>
        </div>

        {/* Specializări */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Specializări</h2>
          <div className="space-y-2">
            {data.specializari.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={s}
                  onChange={(e) => updateSpecializare(i, e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeSpecializare(i)}
                  className="text-red-400 hover:text-red-600 p-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              onClick={addSpecializare}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              + Adaugă specializare
            </button>
          </div>
        </div>

        {/* Fabrică */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Fabrică</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Adresă fabrică</label>
            <input
              type="text"
              value={data.fabrica.adresa}
              onChange={(e) => setData({ ...data, fabrica: { ...data.fabrica, adresa: e.target.value } })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Imagini fabrică</label>
            <div className="flex flex-wrap gap-3 mb-3">
              {data.fabrica.imagini.map((url) => (
                <div key={url} className="relative group">
                  <img
                    src={url}
                    alt=""
                    className="w-24 h-24 object-cover rounded-lg border border-slate-200 bg-slate-50"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <button
                    onClick={() => handleDeleteFabricaImage(url)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <label className="inline-flex items-center gap-2 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium px-3 py-2 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {uploadingImg ? 'Se încarcă...' : 'Adaugă imagine fabrică'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploadingImg}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
        >
          {saving ? 'Se salvează...' : 'Salvează modificările'}
        </button>
      </div>
    </div>
  );
}
