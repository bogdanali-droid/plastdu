"use client";

import { useEffect, useRef } from "react";

/* ─── Types ──────────────────────────────────────────────────────────────── */
export interface Project {
  id: string | number;
  name: string;
  district: string;
  year: number;
  lat: number;
  lng: number;
  photo: string;
}

interface BucharestMapProps {
  projects: Project[];
}

/* ─── Loading skeleton ───────────────────────────────────────────────────── */
export function MapSkeleton() {
  return (
    <div
      className="w-full animate-pulse rounded-2xl overflow-hidden bg-slate-200"
      style={{ height: 500 }}
      aria-label="Se încarcă harta..."
    >
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-slate-400 text-sm font-medium tracking-wide">
          Se încarcă harta…
        </span>
      </div>
    </div>
  );
}

/* ─── Map component (client-only) ────────────────────────────────────────── */
export default function BucharestMap({ projects }: BucharestMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let map: import("leaflet").Map;
    let L: typeof import("leaflet");

    (async () => {
      L = (await import("leaflet")).default;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const MCG = await import("leaflet.markercluster") as any;
      const MarkerClusterGroup = MCG.MarkerClusterGroup ?? MCG.default?.MarkerClusterGroup ?? MCG.default;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "/leaflet/marker-icon.png",
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        shadowUrl: "/leaflet/marker-shadow.png",
      });

      // Centrat pe România; se va ajusta automat după proiecte
      map = L.map(containerRef.current!, {
        center: [45.9432, 24.9668],
        zoom: 7,
        minZoom: 4,
        maxZoom: 18,
        scrollWheelZoom: false,
      });

      mapRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      const blueIcon = L.divIcon({
        className: "",
        html: `<div style="
          width:28px;height:28px;
          background:#006EB6;
          border:3px solid #ffffff;
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          box-shadow:0 2px 6px rgba(0,110,182,0.45);
        "></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -32],
      });

      const clusterGroup = new MarkerClusterGroup({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        iconCreateFunction(cluster: any) {
          const count = cluster.getChildCount();
          const size = count < 10 ? 38 : count < 100 ? 44 : 50;
          return L.divIcon({
            className: "",
            html: `<div style="
              width:${size}px;height:${size}px;
              background:#006EB6;
              color:#ffffff;
              border:3px solid #ffffff;
              border-radius:50%;
              display:flex;align-items:center;justify-content:center;
              font-weight:700;font-size:${count < 10 ? 14 : 12}px;
              box-shadow:0 2px 8px rgba(0,110,182,0.45);
              font-family:var(--font-geist-sans,system-ui,sans-serif);
            ">${count}</div>`,
            iconSize: [size, size],
            iconAnchor: [size / 2, size / 2],
          });
        },
        maxClusterRadius: 60,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
      });

      projects.forEach((project) => {
        const marker = L.marker([project.lat, project.lng], { icon: blueIcon });

        const popupContent = `
          <div style="
            min-width:210px;max-width:270px;
            font-family:var(--font-geist-sans,system-ui,sans-serif);
          ">
            ${
              project.photo
                ? `<img
                    src="${project.photo}"
                    alt="${project.name}"
                    style="width:100%;height:145px;object-fit:cover;border-radius:6px;margin-bottom:10px;"
                    loading="lazy"
                    onerror="this.style.display='none'"
                  />`
                : `<div style="
                    width:100%;height:145px;
                    background:linear-gradient(135deg,#dbeafe,#bfdbfe);
                    border-radius:6px;margin-bottom:10px;
                    display:flex;align-items:center;justify-content:center;
                    color:#3b82f6;font-size:28px;
                  ">&#127970;</div>`
            }
            <h3 style="margin:0 0 4px;font-size:14px;font-weight:700;color:#1a3c5e;line-height:1.3;">
              ${project.name}
            </h3>
            <p style="margin:0;font-size:12px;color:#475569;display:flex;gap:6px;">
              <span>&#128205; ${project.district}</span>
              <span style="color:#cbd5e1;">&middot;</span>
              <span>${project.year}</span>
            </p>
          </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 290 });
        clusterGroup.addLayer(marker);
      });

      map.addLayer(clusterGroup);

      // Auto-fit bounds la toate proiectele
      if (projects.length > 0) {
        const bounds = L.latLngBounds(
          projects.filter(p => p.lat && p.lng).map(p => [p.lat, p.lng] as [number, number])
        );
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
        }
      }
    })();

    return () => {
      if (mapRef.current) {
        (mapRef.current as import("leaflet").Map).remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl overflow-hidden shadow-card border border-neutral-border"
      style={{ height: 500 }}
      aria-label="Hartă proiecte realizate în toată țara"
    />
  );
}
