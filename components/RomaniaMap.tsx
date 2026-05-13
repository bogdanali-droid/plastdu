"use client";

import { useEffect, useRef } from "react";

/* ─── Types ──────────────────────────────────────────────────────────────── */
export interface Project {
  id: string | number;
  name: string;
  city: string;
  year: number;
  lat: number;
  lng: number;
  photo: string; // URL or path to project photo
}

interface RomaniaMapProps {
  projects: Project[];
}

/* ─── Loading skeleton (shown while Leaflet hydrates) ───────────────────── */
export function MapSkeleton() {
  return (
    <div
      className="w-full animate-pulse rounded-2xl overflow-hidden bg-slate-200"
      style={{ height: 600 }}
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
export default function RomaniaMap({ projects }: RomaniaMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let map: import("leaflet").Map;
    let L: typeof import("leaflet");

    (async () => {
      // Dynamic imports — Leaflet must run only in the browser
      L = (await import("leaflet")).default;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const MCG = await import("leaflet.markercluster") as any;
      const MarkerClusterGroup = MCG.MarkerClusterGroup ?? MCG.default?.MarkerClusterGroup ?? MCG.default;

      // Fix default icon paths broken by webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "/leaflet/marker-icon.png",
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        shadowUrl: "/leaflet/marker-shadow.png",
      });

      // Initialise map centred on Romania
      map = L.map(containerRef.current!, {
        center: [45.9432, 24.9668],
        zoom: 7,
        scrollWheelZoom: false,
      });

      mapRef.current = map;

      // CartoDB Positron — clean, B2B-friendly tile layer
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      // Custom red marker icon
      const redIcon = L.divIcon({
        className: "",
        html: `<div style="
          width:28px;height:28px;
          background:#dc2626;
          border:3px solid #ffffff;
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          box-shadow:0 2px 6px rgba(0,0,0,0.35);
        "></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -30],
      });

      // Custom cluster icon factory
      const clusterGroup = new MarkerClusterGroup({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        iconCreateFunction(cluster: any) {
          const count = cluster.getChildCount();
          return L.divIcon({
            className: "",
            html: `<div style="
              width:40px;height:40px;
              background:#dc2626;
              color:#ffffff;
              border:3px solid #ffffff;
              border-radius:50%;
              display:flex;align-items:center;justify-content:center;
              font-weight:700;font-size:14px;
              box-shadow:0 2px 8px rgba(220,38,38,0.4);
              font-family:var(--font-geist-sans,system-ui,sans-serif);
            ">${count}</div>`,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          });
        },
        maxClusterRadius: 60,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
      });

      // Add markers
      projects.forEach((project) => {
        const marker = L.marker([project.lat, project.lng], { icon: redIcon });

        const popupContent = `
          <div style="
            min-width:200px;max-width:260px;
            font-family:var(--font-geist-sans,system-ui,sans-serif);
          ">
            ${
              project.photo
                ? `<img
                    src="${project.photo}"
                    alt="${project.name}"
                    style="width:100%;height:140px;object-fit:cover;border-radius:6px;margin-bottom:10px;"
                    loading="lazy"
                  />`
                : ""
            }
            <h3 style="margin:0 0 4px;font-size:14px;font-weight:700;color:#1a3c5e;line-height:1.3;">
              ${project.name}
            </h3>
            <p style="margin:0;font-size:13px;color:#475569;">
              📍 ${project.city} &nbsp;·&nbsp; ${project.year}
            </p>
          </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 280 });
        clusterGroup.addLayer(marker);
      });

      map.addLayer(clusterGroup);

      // Fit bounds to markers if we have any
      if (projects.length > 0) {
        const bounds = clusterGroup.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [60, 60], maxZoom: 12 });
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

  // Update markers when projects prop changes after initial mount
  // (full re-init is acceptable for this use case; map ref guard handles it)

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl overflow-hidden shadow-card border border-neutral-border"
      style={{ height: 600 }}
      aria-label="Hartă proiecte realizate în România"
    />
  );
}
