"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ─── Data ───────────────────────────────────────────────────────────────── */
const PRODUSE_FABRICATE = [
  {
    slug: "dibluri-plastic",
    imagine: "/images/produse/dibluri-plastic/01.jpg",
    titlu: "Dibluri Cui Plastic (Poliamidă)",
    categorie: "Dibluri",
    fabricat: true,
    descriere:
      "Diblu termoizolant cu cui din poliamidă Ø5.5mm, corp PP Ø10mm, rozetă Ø55mm. " +
      "Ideal pentru fixarea polistirenului pe fațade termoizolate.",
    specificatii: ["Corp: Polipropilenă", "Cui: Poliamidă Ø5.5mm", "Rozetă: Ø55mm / 2mm"],
    variante: "10x70 … 10x260ZM",
    livrare: "100 buc/pungă–cutie",
    badge: "Produs propriu",
    badgeColor: "bg-brand-accent/10 text-brand-accent",
  },
  {
    slug: "dibluri-metalice",
    imagine: "/images/produse/dibluri-metalice/01.jpg",
    titlu: "Dibluri Cui Metalic Zincat",
    categorie: "Dibluri",
    fabricat: true,
    descriere:
      "Diblu cu cui din oțel zincat Ø5.5mm, corp PP Ø10mm, compatibil cu polistiren și vată minerală. " +
      "Rezistență mecanică superioară în solicitări dinamice.",
    specificatii: ["Corp: Polipropilenă", "Cui: Oțel zincat Ø5.5mm", "Rozetă: Ø55mm / 2mm"],
    variante: "10x120 … 10x260ZM",
    livrare: "100–200 buc/cutie",
    badge: "Produs propriu",
    badgeColor: "bg-brand-accent/10 text-brand-accent",
  },
  {
    slug: "flansa-vata",
    imagine: "/images/produse/flansa-vata/01.jpg",
    titlu: "Flanșă Vată Minerală",
    categorie: "Flanșe",
    fabricat: true,
    descriere:
      "Disc plastic cu rozeta extinsă Ø140–160mm, model spite duble. Distribuție uniformă a forței de prindere " +
      "pe vată minerală și polistiren. Gri închis.",
    specificatii: ["Material: PP", "Diametru rozetă: Ø140–160mm", "Model: spite duble"],
    variante: "Standard",
    livrare: "La cerere",
    badge: "Produs propriu",
    badgeColor: "bg-brand-accent/10 text-brand-accent",
  },
  {
    slug: "flansa-osb",
    imagine: "/images/produse/flansa-osb/01.jpg",
    titlu: "Flanșă OSB / Capac (TSF-F55)",
    categorie: "Flanșe",
    fabricat: true,
    descriere:
      "Flanșă cu capac snap-on care acoperă capul diblului. Finisaj superior, aspect curat. " +
      "Include șurub galvanizat. Cod produs: TSF-F55.",
    specificatii: ["Cod: TSF-F55", "Capac snap-on", "Șurub galvanizat inclus"],
    variante: "TSF-F55",
    livrare: "La cerere",
    badge: "Produs propriu",
    badgeColor: "bg-brand-accent/10 text-brand-accent",
  },
];

const PRODUSE_DISTRIBUITE = [
  {
    titlu: "Dibluri universale pentru BCA",
    categorie: "Dibluri",
    imagine: "/images/produse/dibluri-plastic/02.jpg",
    descriere: "Dibluri cu expansiune controlată pentru fixări în BCA și zidărie ușoară.",
    badge: "Distribuit",
    badgeColor: "bg-slate-100 text-slate-600",
  },
  {
    titlu: "Șuruburi autoforante",
    categorie: "Fixare",
    imagine: "/images/produse/suruburi/01.jpg",
    descriere: "Șuruburi pentru profile metalice, carton-gips și aplicații uscate. Cap Philips sau Torx.",
    badge: "Distribuit",
    badgeColor: "bg-slate-100 text-slate-600",
  },
  {
    titlu: "Dibluri pentru gips-carton",
    categorie: "Dibluri",
    imagine: "/images/produse/dibluri-metalice/02.jpg",
    descriere: "Soluții de fixare pentru pereți din gips-carton, profile și montanți.",
    badge: "Distribuit",
    badgeColor: "bg-slate-100 text-slate-600",
  },
  {
    titlu: "Ancore chimice (conexpand)",
    categorie: "Fixare",
    imagine: "/images/produse/ancore/01.jpg",
    descriere: "Ancore cu rășină epoxidică sau poliester pentru fixări structurale în beton și zidărie.",
    badge: "Distribuit",
    badgeColor: "bg-slate-100 text-slate-600",
  },
  {
    titlu: "Distanțieri pentru gresie",
    categorie: "Accesorii",
    imagine: "/images/produse/distantieri-gresie/01.jpg",
    descriere: "Distanțieri din plastic pentru rosturi uniforme la montaj gresie și faianță.",
    badge: "Distribuit",
    badgeColor: "bg-slate-100 text-slate-600",
  },
  {
    titlu: "Colțar PVC cu plasă",
    categorie: "Profile",
    imagine: "/images/produse/coltar-pvc/01.webp",
    descriere: "Profil de colț din PVC cu plasă din fibră de sticlă pentru armarea muchiilor fațadei.",
    badge: "Distribuit",
    badgeColor: "bg-slate-100 text-slate-600",
  },
  {
    titlu: "Profil de colț exterior",
    categorie: "Profile",
    imagine: "/images/produse/profil-colt/01.jpg",
    descriere: "Profil metalic zincat pentru protecția și finisarea colțurilor pereților exteriori.",
    badge: "Distribuit",
    badgeColor: "bg-slate-100 text-slate-600",
  },
  {
    titlu: "Tije filetate",
    categorie: "Fixare",
    imagine: "/images/produse/tije-filetate/01.jpg",
    descriere: "Tije filetate M6–M16 din oțel zincat sau inox pentru montaje industriale și construcții.",
    badge: "Distribuit",
    badgeColor: "bg-slate-100 text-slate-600",
  },
  {
    titlu: "Agățători pentru balcon",
    categorie: "Accesorii",
    imagine: "/images/produse/agatatori/01.jpg",
    descriere: "Agățători din plastic rezistent UV pentru fixarea ghivecelor și ornamentelor pe balcon.",
    badge: "Distribuit",
    badgeColor: "bg-slate-100 text-slate-600",
  },
  {
    titlu: "Capace pentru țeavă",
    categorie: "Accesorii",
    imagine: "/images/produse/capace-teava/01.jpg",
    descriere: "Capace din plastic pentru protejarea capetelor țevilor în timpul transportului și depozitării.",
    badge: "Distribuit",
    badgeColor: "bg-slate-100 text-slate-600",
  },
  {
    titlu: "Piulițe hexagonale",
    categorie: "Fixare",
    imagine: "/images/produse/piulite/01.jpg",
    descriere: "Piulițe hexagonale zincat M4–M20, rezistente la coroziune, pentru structuri metalice.",
    badge: "Distribuit",
    badgeColor: "bg-slate-100 text-slate-600",
  },
];

type Filtru = "toate" | "fabricate";

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function ProdusePage() {
  const [filtru, setFiltru] = useState<Filtru>("toate");

  return (
    <>
    <Header />
    <main>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="bg-brand-blue text-white section-padding">
        <div className="container-site">
          <p className="section-label !text-brand-accent/80 mb-3">Catalog produse</p>
          <h1 className="text-display-lg text-white mb-4">
            Dibluri și flanșe pentru construcții
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Plast Du IV SRL produce și distribuie elemente de fixare pentru industria construcțiilor.
            Soluții tehnice certificate pentru sisteme de termoizolație exterioară, termoizolații și lucrări de finisaj —
            livrate direct la depozit sau șantier.
          </p>
        </div>
      </section>

      {/* ── Filtre ──────────────────────────────────────────────────────── */}
      <section className="border-b border-neutral-border bg-neutral-surface sticky top-16 z-10">
        <div className="container-site py-3 flex items-center gap-3">
          <span className="text-sm text-slate-500 font-medium mr-2">Afișare:</span>
          {(
            [
              { key: "toate", label: "Toate produsele" },
              { key: "fabricate", label: "Fabricate de noi" },
            ] as { key: Filtru; label: string }[]
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFiltru(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                filtru === key
                  ? "bg-brand-blue text-white"
                  : "bg-white border border-neutral-border text-slate-600 hover:border-brand-blue hover:text-brand-blue"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Produse fabricate ───────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="section-label">Producție proprie</p>
              <h2>Produse fabricate de Plast Du IV</h2>
            </div>
            <span className="text-sm text-slate-500 hidden sm:block">
              {PRODUSE_FABRICATE.length} produse
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {PRODUSE_FABRICATE.map((p) => (
              <article
                key={p.slug}
                className="card flex flex-col group hover:border-brand-blue/30"
              >
                <div className="w-full h-44 bg-gradient-to-br from-blue-50 to-slate-100 rounded-xl mb-4 overflow-hidden relative img-watermark">
                  {p.imagine ? (
                    <Image
                      src={p.imagine}
                      alt={p.titlu}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-slate-300">
                      {p.categorie === "Dibluri" ? "🔩" : "⚙️"}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                  <span className="text-xs text-slate-400">{p.categorie}</span>
                </div>

                <h3 className="text-base mb-2 group-hover:text-brand-blue/80 transition-colors">
                  {p.titlu}
                </h3>
                <p className="text-sm text-slate-500 flex-1 mb-4">{p.descriere}</p>

                <ul className="mb-4 space-y-1">
                  {p.specificatii.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="w-1 h-1 rounded-full bg-brand-accent flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-3 border-t border-neutral-border flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    <div>
                      <span className="font-medium text-slate-700">Variante:</span> {p.variante}
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Livrare:</span> {p.livrare}
                    </div>
                  </div>
                  <Link
                    href={`/produse/${p.slug}`}
                    className="inline-flex items-center gap-1.5 bg-brand-blue text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-brand-blue/90 transition-colors flex-shrink-0 ml-3"
                  >
                    Detalii
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Produse distribuite ─────────────────────────────────────────── */}
      {filtru === "toate" && (
        <section className="section-padding bg-neutral-surface">
          <div className="container-site">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="section-label">Portofoliu extins</p>
                <h2>Produse distribuite</h2>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUSE_DISTRIBUITE.map((p) => (
                <article key={p.titlu} className="card flex flex-col">
                  <div className="w-full h-36 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl mb-4 overflow-hidden relative img-watermark">
                    <Image
                      src={p.imagine}
                      alt={p.titlu}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                    <span className="text-xs text-slate-400">{p.categorie}</span>
                  </div>

                  <h3 className="text-base mb-2">{p.titlu}</h3>
                  <p className="text-sm text-slate-500 flex-1 mb-4">{p.descriere}</p>

                  <div className="mt-auto pt-3 border-t border-neutral-border">
                    <Link
                      href="/contact?subiect=cerere-produs"
                      className="text-xs font-semibold text-brand-blue hover:text-brand-accent transition-colors"
                    >
                      Solicitați informații →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-brand-blue text-white">
        <div className="container-site text-center">
          <h2 className="text-white mb-4">Aveți nevoie de o ofertă personalizată?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Lucrăm direct cu firme de construcții, antreprenori și depozite de materiale.
            Contactați-ne pentru prețuri de volum și termene de livrare.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors"
          >
            Solicitați ofertă B2B
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
