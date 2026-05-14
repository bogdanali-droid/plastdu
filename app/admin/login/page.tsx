'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetStatus, setResetStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Autentificare eșuată');
      }
    } catch {
      setError('Eroare de rețea. Încercați din nou.');
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword() {
    setResetStatus('loading');
    try {
      const res = await fetch('/api/admin/reset-password', { method: 'POST' });
      if (res.ok) {
        setResetStatus('success');
      } else {
        setResetStatus('error');
      }
    } catch {
      setResetStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 w-full max-w-sm p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4">
            <Image src="/logo.png" alt="Plast Du IV" width={80} height={80} className="object-contain" />
          </div>
          <h1 className="text-xl font-bold text-slate-800">Plast Du IV — Admin</h1>
          <p className="text-sm text-slate-500 mt-1">Panou de administrare</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
              Parolă
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-3 py-2 pr-10 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800"
                placeholder="Introduceți parola"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label={showPassword ? 'Ascunde parola' : 'Arată parola'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Se autentifică...' : 'Autentificare'}
          </button>
        </form>

        <div className="mt-4 text-center">
          {resetStatus === 'idle' && (
            <button
              type="button"
              onClick={handleResetPassword}
              className="text-sm text-slate-400 hover:text-blue-600 transition-colors"
            >
              Ai uitat parola?
            </button>
          )}
          {resetStatus === 'loading' && (
            <p className="text-sm text-slate-400">Se trimite...</p>
          )}
          {resetStatus === 'success' && (
            <p className="text-sm text-green-600">Parolă nouă trimisă pe email (bogdanaliciuc@gmail.com)</p>
          )}
          {resetStatus === 'error' && (
            <p className="text-sm text-red-500">
              Eroare la trimitere.{' '}
              <button
                type="button"
                onClick={handleResetPassword}
                className="underline hover:text-red-700"
              >
                Încearcă din nou
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
