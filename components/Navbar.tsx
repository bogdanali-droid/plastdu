"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Acasă" },
  { href: "/produse", label: "Produse" },
  { href: "/aplicatii", label: "Aplicații" },
  { href: "/despre", label: "Despre noi" },
  { href: "/proiecte", label: "Proiecte" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-nav border-b border-neutral-border">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#1a3c5e] text-white font-bold text-sm select-none">
              PD
            </span>
            <span className="font-semibold text-[#1a3c5e] text-lg leading-tight">
              Plast Du IV
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-[#1a3c5e] hover:bg-blue-50 transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#f97316] text-white text-sm font-semibold hover:bg-orange-600 transition-colors duration-150 shadow-sm"
            >
              Cere Ofertă
            </Link>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md text-slate-600 hover:bg-blue-50 transition-colors"
            aria-label="Meniu"
            aria-expanded={open}
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-neutral-border bg-white">
          <nav className="max-w-container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 hover:text-[#1a3c5e] hover:bg-blue-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-2.5 rounded-lg bg-[#f97316] text-white text-sm font-semibold text-center hover:bg-orange-600 transition-colors"
            >
              Cere Ofertă
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
