import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Despre noi — Plast Du IV SRL",
  description:
    "Plast Du IV SRL, fondată în 2017, produce dibluri și flanșe pentru construcții la Jilava, Ilfov. " +
    "Fabricație prin injecție în matrițe proprii, 13 angajați, livrare în toată România.",
  alternates: { canonical: "https://plastdu.ro/despre" },
};

/* ─── Date valori companie ───────────────────────────────────────────────── */
const VALORI = [
  {
    titlu: "Calitate controlată",
    descriere:
      "Controlăm întregul ciclu de fabricație — de la granulele de PP și poliamidă " +
      "până la produsul finit. Matrițe proprii, reglate permanent pentru toleranțe strânse.",
    accent: "bg-orange-500",
  },
  {
    titlu: "Producție locală",
    descriere:
      "100% fabricat în România. Investim în capacitate de producție locală și în locuri " +
      "de muncă în județul Ilfov.",
    accent: "bg-[#1a3c5e]",
  },
  {
    titlu: "Parteneriate directe",
    descriere:
      "Lucrăm direct cu firme de construcții, antreprenori și depozite de materiale. " +
      "Prețuri de producător, fără intermediari.",
    accent: "bg-orange-500",
  },
  {
    titlu: "Adaptabilitate",
    descriere:
      "Adaptăm cantitățile, ambalajele și termenele de livrare în funcție de nevoile " +
      "fiecărui partener. Comenzi personalizate la cerere.",
    accent: "bg-[#1a3c5e]",
  },
] as const;

/* ─── Date cifre companie ────────────────────────────────────────────────── */
const CIFRE = [
  { valoare: "2017", eticheta: "Anul fondării" },
  { valoare: "13", eticheta: "Angajați" },
  { valoare: "4", eticheta: "Produse proprii" },
  { valoare: "100%", eticheta: "Fabricat în România" },
] as const;

/* ─── Etape istorice ─────────────────────────────────────────────────────── */
const ETAPE = [
  {
    an: "2017",
    titlu: "Fondarea companiei",
    descriere:
      "Plast Du IV SRL este înregistrată la Jilava, Ilfov. Primele matrițe de injecție " +
      "intră în producție pentru dibluri cui plastic.",
  },
  {
    an: "2018–2020",
    titlu: "Extinderea gamei",
    descriere:
      "Lansăm diblurile cu cui metalic zincat și flanșele pentru vată minerală. " +
      "Creștem capacitatea de producție și numărul de angajați.",
  },
  {
    an: "2021–2023",
    titlu: "Creștere accelerată",
    descriere:
      "Consolidăm parteneriatele cu firme de construcții și depozite la nivel național. " +
      "Lansăm flanșa OSB cu capac TSF-F55.",
  },
  {
    an: "Prezent",
    titlu: "Expansiune continuă",
    descriere:
      "13 angajați, producție continuă, livrare în toată România. " +
      "Investim în noi matrițe și extinderea gamei de produse.",
  },
] as const;

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function DesprePage() {
  return (
    <>
      <Header />
      <main>

        {/* ══════════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-[#1a3c5e] text-white py-16 md:py-20 lg:py-28">
          {/* Decorative glow */}
          <div className="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-orange-400 mb-3">
                Despre companie
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
                Plast Du IV SRL
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                Producător român de dibluri și flanșe pentru industria construcțiilor.
                Fondați în 2017, cu sediu și fabrică proprie în Jilava, Ilfov.
                Livrăm în toată România.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CIFRE CHEIE
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-b border-slate-100" aria-label="Cifre cheie Plast Du IV">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {CIFRE.map((c) => (
                <div key={c.eticheta} className="text-center">
                  <dt className="text-3xl font-bold text-[#1a3c5e]">{c.valoare}</dt>
                  <dd className="text-sm text-slate-500 mt-1 font-medium">{c.eticheta}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            POVESTEA COMPANIEI
        ══════════════════════════════════════════════════════════════ */}
        <section
          className="py-16 md:py-20 lg:py-24 bg-white"
          aria-labelledby="heading-despre-companie"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Text */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-2">
                  Cine suntem
                </p>
                <h2
                  id="heading-despre-companie"
                  className="text-3xl md:text-[2.25rem] font-bold text-[#1a3c5e] leading-tight mb-6"
                >
                  Fabricăm în România din 2017
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Plast Du IV SRL este o companie cu capital 100% românesc, fondată în 2017,
                    specializată în producția prin injecție de plastic a elementelor de fixare
                    pentru construcții. Ne-am construit activitatea în jurul unui principiu simplu:
                    calitate directă de la producător.
                  </p>
                  <p>
                    Fabrica noastră din Jilava, Ilfov, dispune de{" "}
                    <strong className="font-semibold text-[#1a3c5e]">matrițe proprii</strong> pentru
                    fiecare produs din catalog. Aceasta ne permite să controlăm costurile, calitatea
                    și termenele de livrare fără dependența de furnizori externi.
                  </p>
                  <p>
                    Echipa noastră de{" "}
                    <strong className="font-semibold text-[#1a3c5e]">13 angajați</strong> asigură
                    producție continuă și livrare operativă. Lucrăm direct cu firme de construcții,
                    antreprenori generali și depozite de materiale din toată România.
                  </p>
                  <p>
                    Ne-am crescut accelerat prin investiții constante în capacitate de producție
                    și în extinderea gamei de produse — de la primele dibluri cui plastic până la
                    flanșele specializate pentru vată minerală și plăci OSB.
                  </p>
                </div>

                {/* Beneficii rapide */}
                <ul className="mt-7 space-y-2">
                  {[
                    "Fabricație proprie prin injecție în matrițe proprii",
                    "Stoc permanent, livrare rapidă din Jilava, Ilfov",
                    "Aviz client disponibil la cerere",
                    "Parteneriate B2B pe termen lung",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Placeholder imagine fabrică */}
              <div className="relative">
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#1a3c5e]/8 via-blue-50 to-slate-100 rounded-2xl border border-[#1a3c5e]/10 flex flex-col items-center justify-center gap-4">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-[#1a3c5e]/15" aria-hidden="true">
                    <path d="M4 52V24L20 16V8h24v8l16 8v28H4Z" fill="currentColor" />
                    <rect x="14" y="36" width="8" height="16" rx="1" fill="white" opacity=".5" />
                    <rect x="28" y="36" width="8" height="16" rx="1" fill="white" opacity=".5" />
                    <rect x="42" y="36" width="8" height="16" rx="1" fill="white" opacity=".5" />
                    <rect x="22" y="18" width="20" height="12" rx="1" fill="white" opacity=".4" />
                  </svg>
                  <p className="text-sm text-slate-400 italic text-center px-6">
                    Str. Ana Ipătescu nr. 44<br />Jilava, Ilfov
                  </p>
                </div>
                {/* Accent card */}
                <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white rounded-xl px-5 py-3 shadow-lg">
                  <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Fondată</p>
                  <p className="text-2xl font-bold leading-tight">2017</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            VALORILE NOASTRE
        ══════════════════════════════════════════════════════════════ */}
        <section
          className="py-16 md:py-20 lg:py-24 bg-slate-50 border-y border-slate-100"
          aria-labelledby="heading-valori"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-2">
                Valorile noastre
              </p>
              <h2
                id="heading-valori"
                className="text-3xl md:text-[2.25rem] font-bold text-[#1a3c5e] leading-tight"
              >
                Ce ne diferențiază ca producător
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALORI.map((v) => (
                <div
                  key={v.titlu}
                  className="flex flex-col bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
                >
                  <span className={`w-1.5 h-8 rounded-full ${v.accent} mb-5 flex-shrink-0`} aria-hidden="true" />
                  <h3 className="font-bold text-[#1a3c5e] text-base mb-2">{v.titlu}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.descriere}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            ISTORIC / TIMELINE
        ══════════════════════════════════════════════════════════════ */}
        <section
          className="py-16 md:py-20 lg:py-24 bg-white"
          aria-labelledby="heading-istoric"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-2">
                Scurt istoric
              </p>
              <h2
                id="heading-istoric"
                className="text-3xl md:text-[2.25rem] font-bold text-[#1a3c5e] leading-tight"
              >
                De la start-up la producător național
              </h2>
            </div>

            {/* Timeline */}
            <div className="relative max-w-3xl mx-auto">
              {/* Linie verticală */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200 hidden sm:block" aria-hidden="true" />

              <ol className="space-y-8">
                {ETAPE.map((etapa, idx) => (
                  <li key={etapa.an} className="relative flex gap-6 sm:pl-16">
                    {/* Dot */}
                    <div
                      className={`hidden sm:flex absolute left-0 top-0 items-center justify-center w-12 h-12 rounded-full border-2 font-bold text-xs flex-shrink-0 ${
                        idx === ETAPE.length - 1
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "bg-white border-slate-200 text-[#1a3c5e]"
                      }`}
                      aria-hidden="true"
                    >
                      {idx + 1}
                    </div>

                    {/* Card */}
                    <div className="flex-1 bg-slate-50 rounded-xl border border-slate-200 p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                          {etapa.an}
                        </span>
                      </div>
                      <h3 className="font-bold text-[#1a3c5e] text-base mb-1">{etapa.titlu}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{etapa.descriere}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            LOCAȚIE & CONTACT
        ══════════════════════════════════════════════════════════════ */}
        <section
          className="py-16 md:py-20 lg:py-24 bg-slate-50 border-t border-slate-100"
          aria-labelledby="heading-locatie"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Date contact */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-orange-500 mb-2">
                  Locație și contact
                </p>
                <h2
                  id="heading-locatie"
                  className="text-3xl md:text-[2.25rem] font-bold text-[#1a3c5e] leading-tight mb-6"
                >
                  Sediu și producție
                </h2>

                <address className="not-italic mb-7">
                  <p className="font-bold text-[#1a3c5e] text-lg mb-1">Plast Du IV SRL</p>
                  <p className="text-slate-600">Str. Ana Ipătescu nr. 44</p>
                  <p className="text-slate-600">Jilava, județul Ilfov</p>
                  <p className="text-slate-600 mb-5">România</p>

                  <div className="space-y-3">
                    <a
                      href="tel:+40724658491"
                      className="flex items-center gap-3 text-[#1a3c5e] font-semibold hover:text-orange-500 transition-colors"
                    >
                      <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#1a3c5e]/8 flex-shrink-0">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                          <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 16.352V17.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
                        </svg>
                      </span>
                      0724 658 491
                    </a>
                    <a
                      href="tel:+40728211578"
                      className="flex items-center gap-3 text-[#1a3c5e] font-semibold hover:text-orange-500 transition-colors"
                    >
                      <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#1a3c5e]/8 flex-shrink-0">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                          <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 16.352V17.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
                        </svg>
                      </span>
                      0728 211 578
                    </a>
                    <a
                      href="mailto:office@plastdu.ro"
                      className="flex items-center gap-3 text-[#1a3c5e] font-semibold hover:text-orange-500 transition-colors"
                    >
                      <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#1a3c5e]/8 flex-shrink-0">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                          <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                          <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                        </svg>
                      </span>
                      office@plastdu.ro
                    </a>
                  </div>
                </address>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#1a3c5e] hover:bg-[#1a3c5e]/85 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-150 text-sm"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                  </svg>
                  Contactați-ne
                </Link>
              </div>

              {/* Hartă Google Maps embed */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2852.5!2d26.0789!3d44.3456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDIwJzQ0LjIiTiAyNsKwMDQnNDQuMCJF!5e0!3m2!1sro!2sro!4v1700000000000!5m2!1sro!2sro"
                  width="100%"
                  height="320"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Locație Plast Du IV — Str. Ana Ipătescu 44, Jilava, Ilfov"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden bg-[#1a3c5e] text-white py-14 md:py-16"
          aria-label="Cerere ofertă"
        >
          <div className="absolute -top-12 right-0 w-64 h-64 rounded-full bg-orange-500/8 blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
              Doriți să colaborați cu noi?
            </h2>
            <p className="text-blue-100 max-w-lg mx-auto mb-8 leading-relaxed">
              Suntem deschisi parteneriatelor cu firme de construcții, antreprenori și depozite
              de materiale din toată România.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#1a3c5e] font-bold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-sm"
              >
                Cere ofertă
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <Link
                href="/produse"
                className="inline-flex items-center gap-2 border border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm"
              >
                Vezi produsele
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
