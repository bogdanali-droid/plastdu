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

/* ─── Date de test — 5 proiecte în cartiere diferite ────────────────────── */
const DEMO_PROJECTS: Project[] = [
  {
    id: 1,
    name: "Reabilitare termică bloc A12 — Aviației",
    district: "Sector 1 – Aviației",
    year: 2024,
    lat: 44.4734,
    lng: 26.0785,
    photo: "/images/proiecte/aviatiei-a12.jpg",
  },
  {
    id: 2,
    name: "Izolare bloc P+8 — Colentina",
    district: "Sector 2 – Colentina",
    year: 2023,
    lat: 44.4523,
    lng: 26.1456,
    photo: "/images/proiecte/colentina-p8.jpg",
  },
  {
    id: 3,
    name: "Reabilitare complex Vitan — 3 scări",
    district: "Sector 3 – Vitan",
    year: 2024,
    lat: 44.4089,
    lng: 26.1234,
    photo: "/images/proiecte/vitan-complex.jpg",
  },
  {
    id: 4,
    name: "Ansamblu Berceni — reabilitare termică",
    district: "Sector 4 – Berceni",
    year: 2023,
    lat: 44.3812,
    lng: 26.1023,
    photo: "/images/proiecte/berceni-ansamblu.jpg",
  },
  {
    id: 5,
    name: "Bloc P+10 Drumul Taberei — izolare",
    district: "Sector 6 – Drumul Taberei",
    year: 2022,
    lat: 44.4198,
    lng: 26.0234,
    photo: "/images/proiecte/drumul-taberei-p10.jpg",
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
            București — de la Aviației la Berceni, de la Colentina la Drumul Taberei.
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
