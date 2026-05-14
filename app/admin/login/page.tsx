'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Eroare necunoscută');
        return;
      }
      if (data.firstLogin) {
        router.push('/admin/change-password');
      } else {
        router.push('/admin');
      }
    } catch {
      setError('Eroare de rețea');
    } finally {
      setLoading(false);
    }
  }

  async function handleReset() {
    if (!confirm('Trimitem o parolă nouă pe e-mail?')) return;
    await fetch('/api/admin/reset-password', { method: 'POST' });
    alert('Dacă cheia RESEND_API_KEY este configurată, vei primi e-mailul în câteva secunde.');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Plastdu</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parolă"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Se verifică...' : 'Autentificare'}
          </button>
        </form>
        <button
          onClick={handleReset}
          className="mt-4 w-full text-sm text-gray-500 hover:text-blue-600 transition"
        >
          Am uitat parola
        </button>
      </div>
    </div>
  );
}
