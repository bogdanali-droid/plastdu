import Link from "next/link";

const productLinks = [
  { href: "/produse/dibluri-plastic", label: "Dibluri Cui Plastic" },
  { href: "/produse/dibluri-metalice", label: "Dibluri Cui Metalic Zincat" },
  { href: "/produse/flansa-vata", label: "Flanșă Vată Minerală" },
  { href: "/produse/flansa-osb", label: "Flanșă OSB (TSF-F55)" },
];

const companyLinks = [
  { href: "/despre", label: "Despre noi" },
  { href: "/aplicatii", label: "Aplicații" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1a3c5e] text-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-white font-bold text-sm">
              PD
            </span>
            <span className="font-semibold text-white text-lg">Plast Du IV</span>
          </div>
          <p className="text-blue-200 text-sm leading-relaxed">
            Producător român de dibluri și flanșe pentru construcții.
            Fabricație proprie prin injecție în matrițe proprii.
          </p>
          <p className="text-blue-300 text-xs mt-4">Jilava, Ilfov, România</p>
        </div>

        {/* Produse */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
            Produse
          </h3>
          <ul className="space-y-2">
            {productLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-blue-200 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Companie & Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
            Companie
          </h3>
          <ul className="space-y-2 mb-6">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-blue-200 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-1.5">
            <div className="flex items-start gap-2 text-blue-200 text-sm">
              <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              Str. Ana Ipătescu nr. 44,<br />Jilava, Ilfov
            </div>
            <a
              href="tel:+40724658491"
              className="flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              0724 658 491
            </a>
            <a
              href="tel:+40728211578"
              className="flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              0728 211 578
            </a>
            <a
              href="mailto:office@plastdu.ro"
              className="flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              office@plastdu.ro
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-blue-300 text-xs">
            &copy; {year} Plast Du IV SRL. Toate drepturile rezervate.
          </p>
          <div className="flex gap-4">
            <Link href="/politica-confidentialitate" className="text-blue-300 hover:text-white text-xs transition-colors">
              Politică de confidențialitate
            </Link>
            <Link href="/termeni" className="text-blue-300 hover:text-white text-xs transition-colors">
              Termeni și condiții
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
