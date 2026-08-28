import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="section-padding bg-white min-h-[60vh] flex items-center">
        <div className="container-site">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-brand-accent font-semibold mb-4 uppercase tracking-widest text-sm">Eroare 404</p>
            <h1 className="text-display-lg mb-4">Pagina nu a fost găsită</h1>
            <p className="text-slate-600 mb-8 text-lg">
              Pagina pe care o căutați nu există sau a fost mutată. Încercați meniul de mai jos
              sau contactați-ne pentru asistență.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <Link href="/" className="card group text-left hover:shadow-md transition-shadow bg-neutral-surface">
                <p className="text-sm font-semibold text-slate-800 group-hover:text-brand-blue">Acasă</p>
                <p className="text-xs text-slate-500 mt-1">Pagina principală Plast Du IV</p>
              </Link>
              <Link href="/produse" className="card group text-left hover:shadow-md transition-shadow bg-neutral-surface">
                <p className="text-sm font-semibold text-slate-800 group-hover:text-brand-blue">Toate produsele</p>
                <p className="text-xs text-slate-500 mt-1">23 produse din stoc</p>
              </Link>
              <Link href="/sisteme/termoizolatie-eps" className="card group text-left hover:shadow-md transition-shadow bg-neutral-surface">
                <p className="text-sm font-semibold text-slate-800 group-hover:text-brand-blue">Sisteme termoizolație</p>
                <p className="text-xs text-slate-500 mt-1">EPS și vată minerală</p>
              </Link>
              <Link href="/blog" className="card group text-left hover:shadow-md transition-shadow bg-neutral-surface">
                <p className="text-sm font-semibold text-slate-800 group-hover:text-brand-blue">Ghiduri tehnice</p>
                <p className="text-xs text-slate-500 mt-1">Ghiduri montaj și alegere</p>
              </Link>
              <Link href="/contact" className="card group text-left hover:shadow-md transition-shadow bg-neutral-surface">
                <p className="text-sm font-semibold text-slate-800 group-hover:text-brand-blue">Contact</p>
                <p className="text-xs text-slate-500 mt-1">0724 658 491</p>
              </Link>
              <Link href="/furnizor-dibluri-bucuresti" className="card group text-left hover:shadow-md transition-shadow bg-neutral-surface">
                <p className="text-sm font-semibold text-slate-800 group-hover:text-brand-blue">Furnizor București</p>
                <p className="text-xs text-slate-500 mt-1">Livrare same-day BUC + Ilfov</p>
              </Link>
            </div>

            <div className="mt-10">
              <Link href="/" className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-blue/90 transition-colors">
                ← Înapoi la pagina principală
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
