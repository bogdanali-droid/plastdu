"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consimțământ cookie-uri"
      className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-neutral-border shadow-2xl px-4 py-4 md:py-5"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-800">Acest site foloseşte cookie-uri. </span>
          Folosim cookie-uri esențiale pentru funcționarea site-ului. Nu colectăm date personale fără consimțământul dvs.{" "}
          <Link href="/politica-cookies" className="underline text-brand-blue hover:text-brand-accent">
            Politica de cookies
          </Link>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={reject}
            className="text-sm font-medium text-slate-600 hover:text-slate-800 px-4 py-2 rounded-lg border border-neutral-border hover:border-slate-300 transition-colors"
          >
            Refuz
          </button>
          <button
            onClick={accept}
            className="text-sm font-semibold bg-brand-blue text-white px-5 py-2 rounded-lg hover:bg-brand-blue/90 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
