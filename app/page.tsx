import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Plast Du IV — Soluții de prindere pentru construcții. Fabricate în România.",
  description:
    "Producător român de dibluri cui plastic, dibluri cui metalic zincat și flanșe pentru termoizolație. " +
    "Fabricație prin injecție în matrițe proprii. Soluții B2B pentru firme de construcții.",
  alternates: { canonical: "https://plastdu.ro" },
};

/* ─── Date produse fabricate ───────────────────────────────────────────────────── */
const PRODUSE = [
  {
    slug: "dibluri-plastic",
    titlu: "Dibluri Cui Plastic",
    descriere:
      "Corp polipropilenă Ø10mm cu cui poliamidă Ø5.5mm și rozetă Ø55mm. " +
      "Conceput pentru fixarea polistirenului în sisteme de termoizolație exterioară.",
    variante: "10×70 — 10×260mm",
    specificatii: ["Corp: Polipropilenă (PP)", "Cui: Poliamidă Ø5.5mm", "Rozetă: Ø55mm / 2mm"],
    imagine: "/images/produse/dibluri-plastic/01.jpg",
  },
  {
    slug: "dibluri-metalice",
    titlu: "Dibluri Cui Metalic Zincat",
    descriere:
      "Corp PP Ø10mm cu cui din oțel zincat Ø5.5mm. Rezistență mecanică sporită, " +
      "compatibil cu polistiren și vată minerală.",
    variante: "10×120 — 10×260mm",
    specificatii: ["Corp: Polipropilenă (PP)", "Cui: Oțel zincat Ø5.5mm", "Rozetă: Ø55mm / 2mm"],
    imagine: "/images/produse/dibluri-metalice/01.jpg",
  },
  {
    slug: "flansa-vata",
    titlu: "Flanșă Vată Minerală",
    descriere:
      "Disc PP cu rozetă extinsă Ø140–160mm și model spite duble. " +
      "Distribuție uniformă a forței de prindere pe suprafețe mari.",
    variante: "Standard",
    specificatii: ["Material: PP", "Diametru rozetă: Ø140–160mm", "Model: spite duble"],
    imagine: "/images/produse/flansa-vata/01.jpg",
  },
  {
    slug: "flansa-osb",
    titlu: "Flanșă OSB (TSF-F55)",
    descriere:
      "Flanșă cu capac snap-on care acoperă capul diblului. " +
      "Șurub galvanizat inclus. Finisaj îngrijit, cod TSF-F55.",
    variante: "TSF-F55",
    specificatii: ["Cod: TSF-F55", "Capac snap-on inclus", "Șurub galvanizat inclus"],
    imagine: "/images/produse/flansa-osb/01.jpg",
  },
] as const;

/* ─── Argumente B2B ─────────────────────────────────────────────────────────── */
const ARGUMENTE = [
  {
    titlu: "Fabricație proprie",
    text: "Producăm prin injecție în matrițe proprii — control total al calității de la materie primă la livrare, fără intermediari.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
  {
    titlu: "Gamă completă 70–260mm",
    text: "Dibluri disponibile în toate lungimile standard pentru grosimi de termoizolație 50–200mm. Un singur furnizor pentru întreaga gamă.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
  },
  {
    titlu: "Livrare din stoc",
    text: "Stoc permanent la depozit în Jilava, Ilfov. Onoram comenzi de volum mare pentru firme de construcții și antreprenori.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
] as const;

/* ─── Aplicații ─────────────────────────────────────────────────────────────── */
const APLICATII = [
  {
    titlu: "Termoizolație Polistiren",
    descriere: "Fixare placă EPS/XPS pe fațade termoizolate cu dibluri cui plastic sau metalic zincat.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M2.25 12 11.204 3.045a1.125 1.125 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    titlu: "Fixare Vată Minerală",
    descriere: "Flanșe cu rozetă extinsă Ø140–160mm pentru distribuție optimă pe vată minerală rigidă sau semiflexibilă.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    ),
  },
  {
    titlu: "Plăci OSB",
    descriere: "Flanșa TSF-F55 cu capac asigură fixare solidă și finisaj îngrijit al plăcilor OSB pe structuri.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
      </svg>
    ),
  },
  {
    titlu: "Gips-Carton",
    descriere: "Elemente de fixare compatibile cu sisteme uscate, profile metalice și montanți din tablă.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125v-5.625A1.125 1.125 0 0 1 3.375 12h17.25a1.125 1.125 0 0 1 1.125 1.125v5.625m-18.75 0a1.125 1.125 0 0 0 1.125 1.125m17.25-1.125a1.125 1.125 0 0 1-1.125 1.125m0 0h-1.5c-.621 0-1.125-.504-1.125-1.125M21.375 19.5v-5.625M3.375 12V6.75A2.25 2.25 0 0 1 5.625 4.5h12.75A2.25 2.25 0 0 1 20.625 6.75V12" />
      </svg>
    ),
  },
] as const;

/* ─── Componenta SVG chevron ───────────────────────────────────────────────────── */
function ChevronRight({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>

        {/* 1. HERO */}
        <section
          className="relative overflow-hidden bg-[#1a3c5e] text-white"
          aria-label="Plast Du IV — Soluții de prindere pentru construcții"
        >
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 48px,rgba(255,255,255,1) 48px,rgba(255,255,255,1) 49px)," +
                "repeating-linear-gradient(90deg,transparent,transparent 48px,rgba(255,255,255,1) 48px,rgba(255,255,255,1) 49px)",
            }}
          />
          <div className="absolute -top-28 -right-20 w-[420px] h-[420px] rounded-full bg-orange-500/10 blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-sky-400/8 blur-2xl pointer-events-none" aria-hidden="true" />

          <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-7">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" aria-hidden="true" />
                <span className="text-sm font-medium text-blue-100 tracking-wide">
                  Producător român — Jilava, Ilfov
                </span>
              </div>

              <h1 className="text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight mb-6">
                Soluții de prindere
                <br />
                pentru construcții.
                <br />
                <span className="text-orange-400">Fabricate în România.</span>
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mb-10 leading-relaxed">
                Dibluri și flanșe pentru termoizolație, produse prin injecție în matrițe proprii.
                Livrare din stoc pentru firme de construcții, antreprenori și depozite.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#produse"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-150 shadow-lg shadow-orange-500/20 text-base"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                    <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                  </svg>
                  Vezi Produsele
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-150 text-base"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                    <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                  </svg>
                  Cere Ofertă
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden pointer-events-none" aria-hidden="true">
            <svg viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
              <path d="M0 32L1440 32L1440 16C1200 0 960 0 720 16C480 32 240 32 0 16L0 32Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* 2. PRODUSE FABRICATE */}
        <section id="produse" className="py-16 md:py-20 lg:py-24 bg-white" aria-labelledby="heading-produse">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-2">Producție proprie</p>
                <h2 id="heading-produse" className="text-3xl md:text-[2.25rem] font-bold text-[#1a3c5e] leading-tight mb-3">
                  Produse fabricate de Plast Du IV
                </h2>
                <p className="text-slate-500 leading-relaxed">
                  Fabricate prin injecție în matrițe proprii la Jilava, Ilfov. Calitate controlată la fiecare lot de producție.
                </p>
              </div>
              <Link href="/produse" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a3c5e] hover:text-orange-500 transition-colors whitespace-nowrap flex-shrink-0">
                Catalog complet
                <ChevronRight />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {PRODUSE.map((produs) => (
                <article key={produs.slug} className="group flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#1a3c5e]/25 transition-all duration-200">
                  <div className="relative w-full h-48 rounded-t-2xl overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/60 to-slate-100 img-watermark">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={produs.imagine} alt={`${produs.titlu} — Plast Du IV`} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                      Produs propriu
                    </span>
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="font-bold text-[#1a3c5e] text-[0.95rem] mb-2 leading-snug group-hover:text-[#1a3c5e]/75 transition-colors">
                      {produs.titlu}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4">{produs.descriere}</p>

                    <ul className="mb-4 space-y-1">
                      {produs.specificatii.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-xs text-slate-600">
                          <span className="w-1 h-1 rounded-full bg-orange-500 flex-shrink-0" aria-hidden="true" />
                          {s}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                      <div className="text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">Variante:</span>{" "}{produs.variante}
                      </div>
                      <Link href={`/produse/${produs.slug}`} className="inline-flex items-center gap-1 bg-[#1a3c5e] hover:bg-[#1a3c5e]/85 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex-shrink-0">
                        Detalii
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. DE CE PLAST DU IV */}
        <section className="py-16 md:py-20 lg:py-24 bg-slate-50 border-y border-slate-100" aria-labelledby="heading-argumente">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-2">De ce Plast Du IV</p>
              <h2 id="heading-argumente" className="text-3xl md:text-[2.25rem] font-bold text-[#1a3c5e] leading-tight">
                Partener direct pentru industria construcțiilor
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {ARGUMENTE.map((arg) => (
                <div key={arg.titlu} className="flex flex-col bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#1a3c5e]/6 text-[#1a3c5e] mb-5 flex-shrink-0">
                    {arg.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#1a3c5e] mb-2">{arg.titlu}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{arg.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. APLICAȚII */}
        <section className="py-16 md:py-20 lg:py-24 bg-white" aria-labelledby="heading-aplicatii">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-2">Domenii de utilizare</p>
                <h2 id="heading-aplicatii" className="text-3xl md:text-[2.25rem] font-bold text-[#1a3c5e] leading-tight mb-3">
                  Aplicații pentru sisteme de construcție
                </h2>
                <p className="text-slate-500 leading-relaxed">
                  Produsele Plast Du IV sunt proiectate pentru principalele sisteme de izolație și finisaj utilizate în construcțiile rezidențiale și comerciale.
                </p>
              </div>
              <Link href="/aplicatii" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a3c5e] hover:text-orange-500 transition-colors whitespace-nowrap flex-shrink-0">
                Toate aplicațiile
                <ChevronRight />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {APLICATII.map((ap) => (
                <div key={ap.titlu} className="group flex flex-col bg-white rounded-2xl border border-slate-200 p-6 hover:border-[#1a3c5e]/25 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-orange-50 text-orange-500 mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-200 flex-shrink-0">
                    {ap.icon}
                  </div>
                  <h3 className="font-bold text-[#1a3c5e] text-[0.95rem] mb-2 leading-snug">{ap.titlu}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">{ap.descriere}</p>
                  <Link href="/aplicatii" className="mt-auto inline-flex items-center gap-1 text-[#1a3c5e] text-sm font-semibold hover:text-orange-500 transition-colors">
                    Detalii
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. DESPRE NOI */}
        <section className="py-16 md:py-20 bg-neutral-surface border-t border-neutral-border">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-3">Producător român</p>
                <h2 className="text-3xl md:text-[2rem] font-bold text-[#1a3c5e] leading-tight mb-5">
                  Fabricăm la Jilava, Ilfov din 2017
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Plast Du IV SRL produce dibluri și flanșe prin injecție în matrițe proprii.
                  Controlăm calitatea la fiecare lot — de la materia primă PP/PA până la ambalare și livrare.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Ne adresăm firmelor de construcții, antreprenorilor, distribuitorilor și depozitelor de materiale
                  din toată țara. Livrăm în București, Ilfov, Dolj, Argeș, Prahova, Brașov și alte județe.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["Producție proprie PP/PA", "Livrare națională", "B2B direct fabrică", "Prețuri volum"].map(tag => (
                    <span key={tag} className="text-xs font-semibold bg-brand-blue/8 text-brand-blue px-3 py-1.5 rounded-full border border-brand-blue/15">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/despre-noi" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-orange-500 transition-colors">
                  Despre Plast Du IV
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 relative h-52 rounded-2xl overflow-hidden bg-slate-100 img-watermark">
                  <Image src="/images/proiecte/blocuri/03.jpg" alt="Proiect reabilitare termică Plast Du IV" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                <div className="relative h-32 rounded-xl overflow-hidden bg-slate-100 img-watermark">
                  <Image src="/images/produse/dibluri-plastic/04.jpg" alt="Dibluri plastic fabricate de Plast Du IV" fill className="object-contain p-2" sizes="25vw" />
                </div>
                <div className="relative h-32 rounded-xl overflow-hidden bg-slate-100 img-watermark">
                  <Image src="/images/produse/dibluri-metalice/01.jpg" alt="Dibluri metalice fabricate de Plast Du IV" fill className="object-contain p-2" sizes="25vw" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. CTA FINAL */}
        <section className="relative overflow-hidden bg-[#1a3c5e] text-white py-16 md:py-20 lg:py-24" aria-label="Cerere ofertă — Plast Du IV">
          <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-8 w-64 h-64 rounded-full bg-sky-500/8 blur-2xl pointer-events-none" aria-hidden="true" />

          <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-400 mb-4">Colaborare B2B</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mb-5">
              Aveți un proiect?{" "}
              <span className="text-orange-400">Cereți o ofertă astăzi.</span>
            </h2>
            <p className="text-blue-100 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Lucrăm direct cu firme de construcții, antreprenori și depozite de materiale.
              Răspundem prompt la orice solicitare — prețuri de volum și termene flexibile.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#1a3c5e] font-bold px-8 py-4 rounded-xl hover:bg-blue-50 active:bg-white transition-colors duration-150 shadow-xl text-base">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                  <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                  <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                </svg>
                Trimite cerere de ofertă
              </Link>
              <a href="tel:+40724658491" className="inline-flex items-center gap-2 border border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-150 text-base">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                  <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 16.352V17.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
                </svg>
                0724 658 491
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
