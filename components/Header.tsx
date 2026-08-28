"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CTAButton from "./CTAButton";

type NavItem = { href: string; label: string; children?: { href: string; label: string; desc?: string }[] };

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Acasă" },
  { href: "/produse", label: "Produse", children: [
    { href: "/produse", label: "Toate produsele", desc: "Catalog complet" },
    { href: "/produse/dibluri", label: "Ghid dibluri", desc: "Matrice alegere & comparativ" },
    { href: "/materiale-fatada", label: "Materiale fațadă", desc: "Distanțieri, ancore, profile" },
    { href: "/calculator-dibluri", label: "Calculator dibluri", desc: "Câte buc/m² ai nevoie" },
  ]},
  { href: "/sisteme", label: "Sisteme", children: [
    { href: "/sisteme/termoizolatie-eps", label: "Termoizolație EPS", desc: "Dibluri pentru polistiren" },
    { href: "/sisteme/termoizolatie-vata-minerala", label: "Termoizolație vată minerală", desc: "Flanșe + dibluri metalice" },
  ]},
  { href: "/aplicatii", label: "Aplicații", children: [
    { href: "/aplicatii", label: "Aplicații tipice", desc: "Utilizări produse" },
    { href: "/aplicatii/reabilitare-blocuri", label: "Reabilitare blocuri", desc: "Termoizolație edilitară" },
    { href: "/furnizor-primarii", label: "Furnizor primării", desc: "Licitații publice" },
    { href: "/furnizor-dibluri-bucuresti", label: "Furnizor București", desc: "Livrare same-day BUC + Ilfov" },
    { href: "/furnizor-dibluri-constanta", label: "Furnizor Constanța", desc: "Litoral + reabilitare hoteluri" },
    { href: "/furnizor-dibluri-cluj", label: "Furnizor Cluj-Napoca", desc: "Office/IT parks + Transilvania" },
    { href: "/furnizor-dibluri-brasov", label: "Furnizor Brașov", desc: "Zonă montană + izolații superioare" },
  ]},
  { href: "/blog", label: "Ghiduri" },
  { href: "/proiecte", label: "Proiecte" },
  { href: "/despre-noi", label: "Despre noi" },
  { href: "/contact", label: "Contact" },
];

function Logo() {
  return (
    <Image src="/logo.png" alt="Plast Du IV" width={200} height={81} priority className="h-14 w-auto" />
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col justify-center items-center w-5 h-5 gap-[5px]">
      <span className={`block h-0.5 w-5 bg-current transition-all duration-200 origin-center ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
      <span className={`block h-0.5 w-5 bg-current transition-all duration-200 ${open ? "opacity-0 scale-x-0" : ""}`} />
      <span className={`block h-0.5 w-5 bg-current transition-all duration-200 origin-center ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
    </span>
  );
}

function ChevronDown() {
  return (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMobileOpen(false); setOpenDropdown(null); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen && !openDropdown) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen, openDropdown]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? "shadow-nav" : ""}`} ref={menuRef}>
      <div className="hidden lg:block bg-brand-blue text-white">
        <div className="container-site flex items-center justify-between py-1.5 text-xs font-medium">
          <span className="opacity-80">Str. Ana Ipătescu nr. 44, Jilava, Ilfov</span>
          <div className="flex items-center gap-5 opacity-90">
            <a href="tel:+40724658491" className="hover:text-brand-accent transition-colors">0724 658 491</a>
            <a href="tel:+40728211578" className="hover:text-brand-accent transition-colors">0728 211 578</a>
            <a href="mailto:office@plastdu.ro" className="hover:text-brand-accent transition-colors">office@plastdu.ro</a>
          </div>
        </div>
      </div>

      <nav aria-label="Navigare principală">
        <div className="container-site flex items-center justify-between h-16">
          <Link href="/" aria-label="Plast Du IV — Acasă"><Logo /></Link>

          <ul role="list" className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const hasChildren = item.children && item.children.length > 0;
              return (
                <li key={item.href} className="relative"
                  onMouseEnter={() => hasChildren && setOpenDropdown(item.href)}
                  onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                      isActive ? "text-brand-blue" : "text-slate-600 hover:text-brand-blue hover:bg-slate-50"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    aria-expanded={hasChildren ? openDropdown === item.href : undefined}
                  >
                    {item.label}
                    {hasChildren && <ChevronDown />}
                    {isActive && (<span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-brand-accent" aria-hidden="true" />)}
                  </Link>

                  {hasChildren && openDropdown === item.href && (
                    <div className="absolute top-full left-0 pt-2 min-w-[280px]">
                      <div className="bg-white rounded-xl shadow-xl border border-neutral-border p-2">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <p className="text-sm font-semibold text-slate-800">{child.label}</p>
                            {child.desc && <p className="text-xs text-slate-500 mt-0.5">{child.desc}</p>}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center">
            <CTAButton href="/contact" size="sm">Cere ofertă</CTAButton>
          </div>

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

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Meniu navigare"
        className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t border-neutral-border shadow-lg transition-all duration-200 max-h-[80vh] overflow-y-auto ${
          mobileOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="container-site py-4">
          <ul role="list" className="flex flex-col gap-1 mb-5">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors duration-150 ${
                      isActive ? "bg-brand-blue/5 text-brand-blue" : "text-slate-700 hover:bg-slate-50 hover:text-brand-blue"
                    }`}
                  >
                    {isActive && (<span className="w-1 h-4 rounded-full bg-brand-accent mr-3 flex-shrink-0" aria-hidden="true" />)}
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="ml-6 border-l border-neutral-border">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="block px-4 py-2 text-sm text-slate-600 hover:text-brand-blue">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="border-t border-neutral-border pt-4 flex flex-col gap-2 text-sm text-slate-600">
            <a href="tel:+40724658491" className="flex items-center gap-2 hover:text-brand-blue"><PhoneIcon /> 0724 658 491</a>
            <a href="tel:+40728211578" className="flex items-center gap-2 hover:text-brand-blue"><PhoneIcon /> 0728 211 578</a>
            <a href="mailto:office@plastdu.ro" className="flex items-center gap-2 hover:text-brand-blue"><MailIcon /> office@plastdu.ro</a>
          </div>

          <div className="mt-5">
            <CTAButton href="/contact" size="md" className="w-full justify-center">Cere ofertă</CTAButton>
          </div>
        </div>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-brand-accent flex-shrink-0" aria-hidden="true">
      <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 16.352V17.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-brand-accent flex-shrink-0" aria-hidden="true">
      <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
      <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
    </svg>
  );
}
