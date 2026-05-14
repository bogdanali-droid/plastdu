'use client';

import { useEffect, useState } from 'react';

interface ContactData {
  telefoane: string[];
  email: string;
  adresa: string;
  program: string;
}

export default function AdminContactPage() {
  const [data, setData] = useState<ContactData>({
    telefoane: [''],
    email: '',
    adresa: '',
    program: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/content?key=contact')
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function save() {
    setSaving(true);
    setSaved(false);
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'contact', value: data }),
    });
    setSaving(false);
    setSaved(true);
  }

  function updatePhone(i: number, val: string) {
    const phones = [...data.telefoane];
    phones[i] = val;
    setData({ ...data, telefoane: phones });
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Contact</h1>

      <div className="bg-white rounded-2xl shadow p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Numere de telefon</label>
          {data.telefoane.map((t, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={t}
                onChange={(e) => updatePhone(i, e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                placeholder="+40 7xx xxx xxx"
              />
              {data.telefoane.length > 1 && (
                <button
                  onClick={() => setData({ ...data, telefoane: data.telefoane.filter((_, j) => j !== i) })}
                  className="text-red-500 hover:text-red-700 px-2"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => setData({ ...data, telefoane: [...data.telefoane, ''] })}
            className="text-sm text-blue-600 hover:underline"
          >
            + Adaugă număr
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adresă</label>
          <input
            value={data.adresa}
            onChange={(e) => setData({ ...data, adresa: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
          <input
            value={data.program}
            onChange={(e) => setData({ ...data, program: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            placeholder="Luni – Vineri: 08:00 – 17:00"
          />
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50"
        >
          {saving ? 'Se salvează...' : 'Salvează'}
        </button>
        {saved && <span className="text-green-600 text-sm ml-3">Salvat!</span>}
      </div>
    </div>
  );
}
