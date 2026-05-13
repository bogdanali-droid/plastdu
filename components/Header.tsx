"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CTAButton from "./CTAButton";

/* ─── Nav Links ──────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { href: "/",          label: "Acasă" },
  { href: "/produse",   label: "Produse" },
  { href: "/aplicatii", label: "Aplicații" },
  { href: "/proiecte",  label: "Proiecte" },
  { href: "/contact",   label: "Contact" },
] as const;

/* ─── Logo ───────────────────────────────────────────────────────────────── */
function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Plast Du IV"
      width={140}
      height={57}
      priority
      className="h-10 w-auto"
    />
  );
}

/* ─── Hamburger icon ─────────────────────────────────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col justify-center items-center w-5 h-5 gap-[5px]">
      <span
        className={`block h-0.5 w-5 bg-current transition-all duration-200 origin-center ${
          open ? "rotate-45 translate-y-[7px]" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-5 bg-current transition-all duration-200 ${
          open ? "opacity-0 scale-x-0" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-5 bg-current transition-all duration-200 origin-center ${
          open ? "-rotate-45 -translate-y-[7px]" : ""
        }`}
      />
    </span>
  );
}

/* ─── Header Component ───────────────────────────────────────────────────── */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  /* Close menu on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* Shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menu on outside click */
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  /* Prevent body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-nav" : ""
      }`}
      ref={menuRef}
    >
      {/* ── Top bar (contact strip) ── */}
      <div className="hidden lg:block bg-brand-blue text-white">
        <div className="container-site flex items-center justify-between py-1.5 text-xs font-medium">
          <span className="opacity-80">
            Str. Ana Ipătescu nr. 44, Jilava, Ilfov
          </span>
          <div className="flex items-center gap-5 opacity-90">
            <a href="tel:+40724658491" className="hover:text-brand-accent transition-colors">
              0724 658 491
            </a>
            <a href="tel:+40728211578" className="hover:text-brand-accent transition-colors">
              0728 211 578
            </a>
            <a href="mailto:office@plastdu.ro" className="hover:text-brand-accent transition-colors">
              office@plastdu.ro
            </a>
          </div>
        </div>
      </div>

      {/* ── Main navbar ── */}
      <nav aria-label="Navigare principală">
        <div className="container-site flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" aria-label="Plast Du IV — Acasă">
            <Logo />
          </Link>

          {/* Desktop nav links */}
          <ul
            role="list"
            className="hidden lg:flex items-center gap-1"
          >
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? "text-brand-blue"
                        : "text-slate-600 hover:text-brand-blue hover:bg-slate-50"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-brand-accent"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <CTAButton href="/contact" size="sm">
              Cere ofertă
            </CTAButton>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Închide meniu" : "Deschide meniu"}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-brand-blue hover:bg-slate-100 transition-colors"
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Meniu navigare"
        className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t border-neutral-border shadow-lg transition-all duration-200 ${
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="container-site py-4">
          <ul role="list" className="flex flex-col gap-1 mb-5">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors duration-150 ${
                      isActive
                        ? "bg-brand-blue/5 text-brand-blue"
                        : "text-slate-700 hover:bg-slate-50 hover:text-brand-blue"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && (
                      <span
                        className="w-1 h-4 rounded-full bg-brand-accent mr-3 flex-shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Contact strip */}
          <div className="border-t border-neutral-border pt-4 flex flex-col gap-2 text-sm text-slate-600">
            <a href="tel:+40724658491" className="flex items-center gap-2 hover:text-brand-blue">
              <PhoneIcon /> 0724 658 491
            </a>
            <a href="tel:+40728211578" className="flex items-center gap-2 hover:text-brand-blue">
              <PhoneIcon /> 0728 211 578
            </a>
            <a href="mailto:office@plastdu.ro" className="flex items-center gap-2 hover:text-brand-blue">
              <MailIcon /> office@plastdu.ro
            </a>
          </div>

          <div className="mt-5">
            <CTAButton href="/contact" size="md" className="w-full justify-center">
              Cere ofertă
            </CTAButton>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─── Inline micro-icons (no external dep) ───────────────────────────────── */
function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4 text-brand-accent flex-shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 16.352V17.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4 text-brand-accent flex-shrink-0"
      aria-hidden="true"
    >
      <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
      <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
    </svg>
  );
}
