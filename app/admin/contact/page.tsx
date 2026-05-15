'use client';
export const runtime = 'edge';
import { useEffect, useState } from 'react';

type Phone = { label: string; number: string; href: string };

type ContactData = {
  phones: Phone[];
  email: string;
  address: string;
  schedule: string;
  whatsapp: string;
  mapsEmbed: string;
};

export default function AdminContactPage() {
  const [data, setData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/content?key=contact')
      .then((r) => r.json())
      .then((json) => setData(json.data))
      .catch(() => setError('Nu s-au putut încărca datele de contact'))
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
        body: JSON.stringify({ key: 'contact', data }),
      });
      if (res.ok) {
        setMessage('Date de contact salvate cu succes!');
      } else {
        setError('Eroare la salvare');
      }
    } catch {
      setError('Eroare de rețea');
    } finally {
      setSaving(false);
    }
  }

  function updatePhone(index: number, field: keyof Phone, value: string) {
    if (!data) return;
    const newPhones = [...data.phones];
    newPhones[index] = { ...newPhones[index], [field]: value };
    setData({ ...data, phones: newPhones });
  }

  function addPhone() {
    if (!data) return;
    setData({
      ...data,
      phones: [...data.phones, { label: `Telefon ${data.phones.length + 1}`, number: '', href: '' }],
    });
  }

  function removePhone(index: number) {
    if (!data) return;
    setData({ ...data, phones: data.phones.filter((_, i) => i !== index) });
  }

  if (loading) return <div className="p-8 text-slate-500">Se încarcă...</div>;
  if (error && !data) return <div className="p-8 text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Contact</h1>
        <p className="text-slate-500 mt-1">Editați datele de contact afișate pe site</p>
      </div>

      {message && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{message}</div>
      )}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}

      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Numere de telefon</h2>
          <div className="space-y-4">
            {data.phones.map((phone, i) => (
              <div key={i} className="grid grid-cols-3 gap-3 items-end">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Etichetă</label>
                  <input
                    type="text"
                    value={phone.label}
                    onChange={(e) => updatePhone(i, 'label', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Număr afișat</label>
                  <input
                    type="text"
                    value={phone.number}
                    onChange={(e) => updatePhone(i, 'number', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-slate-500 mb-1">Href (tel:+40...)</label>
                    <input
                      type="text"
                      value={phone.href}
                      onChange={(e) => updatePhone(i, 'href', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => removePhone(i)}
                    className="self-end mb-0.5 text-red-400 hover:text-red-600 p-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addPhone}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              + Adaugă număr de telefon
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-base font-semibold text-slate-800 mb-2">Informații generale</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Adresă</label>
            <input
              type="text"
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Program</label>
            <input
              type="text"
              value={data.schedule}
              onChange={(e) => setData({ ...data, schedule: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Link WhatsApp</label>
            <input
              type="url"
              value={data.whatsapp}
              onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">URL embed Google Maps</label>
            <textarea
              value={data.mapsEmbed}
              onChange={(e) => setData({ ...data, mapsEmbed: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
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
