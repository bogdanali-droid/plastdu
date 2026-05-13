"use client";

import type { Project } from "@/components/BucharestMap";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="bg-white rounded-2xl shadow-card border border-neutral-border overflow-hidden hover:shadow-card-hover transition-shadow">
      <div className="aspect-video bg-slate-100 flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.photo}
          alt={project.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.classList.add("bg-gradient-to-br", "from-blue-100", "to-blue-200");
              parent.innerHTML = '<div class="flex items-center justify-center w-full h-full text-slate-300"><svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" /></svg></div>';
            }
          }}
        />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-brand-blue text-base leading-snug mb-1">
          {project.name}
        </h3>
        <p className="text-sm text-slate-500">
          <span className="font-medium text-slate-700">{project.district}</span>
          &nbsp;·&nbsp;{project.year}
        </p>
      </div>
    </article>
  );
}
