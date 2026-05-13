import type { Metadata } from "next";
import dynamic from "next/dynamic";
import type { Project } from "../../components/BucharestMap";
import { MapSkeleton } from "../../components/BucharestMap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "./ProjectCard";

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Proiecte Realizate în București",
  description:
    "Produsele Plast Du IV sunt utilizate în reabilitarea termică a blocurilor din București. " +
    "Vizualizați proiectele finalizate pe hartă interactivă a capitalei.",
  alternates: { canonical: "https://plastdu.ro/proiecte" },
};

/* ─── Dynamic import — Leaflet nu rulează pe server ─────────────────────── */
const BucharestMap = dynamic(() => import("../../components/BucharestMap"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

/* ─── Proiecte reale ─────────────────────────────────────────────────────── */
const DEMO_PROJECTS: Project[] = [
  {
    id: 1,
    name: "Reabilitare termică — Str. Baicului",
    district: "Sector 2 – Str. Baicului",
    year: 2026,
    lat: 44.4520,
    lng: 26.1180,
    photo: "/images/proiecte/baicului/01.jpg",
  },
  {
    id: 2,
    name: "Reabilitare bloc — Buhuși",
    district: "Sector 3 – București",
    year: 2026,
    lat: 44.4150,
    lng: 26.1420,
    photo: "/images/proiecte/buhusi/01.jpg",
  },
  {
    id: 3,
    name: "Reabilitare termică — Str. Octavian Goga",
    district: "Sector 3 – Str. Octavian Goga",
    year: 2026,
    lat: 44.4200,
    lng: 26.1350,
    photo: "/images/proiecte/octavian-goga/01.jpg",
  },
  {
    id: 4,
    name: "Izolare bloc — Str. Ghica",
    district: "Sector 2 – Str. Ghica",
    year: 2026,
    lat: 44.4600,
    lng: 26.1050,
    photo: "/images/proiecte/ghica/01.jpg",
  },
  {
    id: 5,
    name: "Reabilitare blocuri — proiect multiplu",
    district: "București",
    year: 2026,
    lat: 44.4400,
    lng: 26.0900,
    photo: "/images/proiecte/blocuri/01.jpg",
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function ProiectePage() {
  return (
    <>
    <Header />
    <main className="min-h-screen bg-neutral-surface">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-brand-blue-700 text-white py-16 px-4">
        <div className="max-w-container mx-auto text-center">
          <h1 className="text-display-md font-bold mb-4">
            Proiecte realizate în București
          </h1>
          <p className="text-brand-blue-200 text-lg max-w-3xl mx-auto">
            Produsele noastre sunt utilizate în reabilitarea termică a blocurilor din
            București și din toată țara — Baicului, Ghica, Octavian Goga, Buhuși și multe altele.
          </p>
        </div>
      </section>

      <div className="max-w-container mx-auto px-4 py-14 flex flex-col gap-14">
        {/* ── Hartă interactivă ─────────────────────────────────────────── */}
        <section aria-labelledby="map-heading">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2
                id="map-heading"
                className="text-display-sm font-bold text-brand-blue-700 mb-1"
              >
                Distribuție în București
              </h2>
              <p className="text-slate-500 text-sm">
                Faceți click pe markeri pentru detalii despre fiecare proiect.
              </p>
            </div>
            <p className="text-xs text-slate-400 italic shrink-0">
              Locațiile sunt marcate automat din coordonatele GPS ale fotografiilor de șantier
            </p>
          </div>

          {/* BucharestMap este lazy-loaded — Leaflet nu rulează pe server */}
          <BucharestMap projects={DEMO_PROJECTS} />
        </section>

        {/* ── Grid foto proiecte ─────────────────────────────────────────── */}
        <section aria-labelledby="projects-heading">
          <h2
            id="projects-heading"
            className="text-display-sm font-bold text-brand-blue-700 mb-8"
          >
            Galerie proiecte
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* ── Galerie extinsă ──────────────────────────────────────────── */}
        <section aria-labelledby="gallery-extra-heading">
          <h2
            id="gallery-extra-heading"
            className="text-display-sm font-bold text-brand-blue-700 mb-6"
          >
            Mai multe imagini din șantier
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              "/images/proiecte/baicului/01.jpg",
              "/images/proiecte/buhusi/01.jpg",
              "/images/proiecte/buhusi/02.jpg",
              "/images/proiecte/buhusi/03.jpg",
              "/images/proiecte/octavian-goga/01.jpg",
              "/images/proiecte/octavian-goga/02.jpg",
              "/images/proiecte/octavian-goga/03.jpg",
              "/images/proiecte/octavian-goga/04.jpg",
              "/images/proiecte/octavian-goga/05.jpg",
              "/images/proiecte/ghica/01.jpg",
              "/images/proiecte/blocuri/01.jpg",
              "/images/proiecte/blocuri/02.jpg",
              "/images/proiecte/blocuri/03.jpg",
              "/images/proiecte/blocuri/04.jpg",
              "/images/proiecte/blocuri/05.jpg",
            ].map((src, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-neutral-border img-watermark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Imagine șantier reabilitare termică ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="bg-brand-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-display-sm font-bold mb-3">
            Lucrați pe un șantier de reabilitare în București?
          </h2>
          <p className="text-brand-blue-200 mb-8 max-w-xl mx-auto">
            Contactați-ne pentru o ofertă personalizată. Livrăm rapid în București
            și Ilfov, cu prețuri competitive pentru comenzi en-gros.
          </p>
          <a
            href="/contact"
            className="inline-block bg-brand-accent-500 hover:bg-brand-accent-600 text-white
              font-semibold px-8 py-3 rounded-xl transition-colors shadow-sm"
          >
            Solicită ofertă
          </a>
        </section>
      </div>
    </main>
    <Footer />
    </>
  );
}
