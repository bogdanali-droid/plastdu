import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  metadataBase: new URL("https://plastdu.ro"),

  title: {
    default: "Plast Du IV — Producător Dibluri, Flanșe și Elemente Fixare | Jilava, Ilfov",
    template: "%s | Plast Du IV",
  },
  description:
    "Producător român de dibluri termoizolante, flanșe vată minerală și distanțieri beton. " +
    "Furnizor materiale construcții, reabilitare termică și sisteme fațadă. Livrare în toată România. Jilava, Ilfov.",

  keywords: [
    "producator dibluri",
    "producator dibluri termoizolatie",
    "dibluri polistiren",
    "dibluri vata minerala",
    "flanse vata minerala",
    "distantieri beton",
    "materiale reabilitare termica",
    "furnizor dibluri Bucuresti",
    "producator materiale constructii",
    "dibluri fixare fatada",
    "reabilitare termica blocuri",
    "Plast Du IV",
    "Jilava Ilfov",
  ],

  authors: [{ name: "Plast Du IV SRL" }],
  creator: "Plast Du IV SRL",
  publisher: "Plast Du IV SRL",

  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://plastdu.ro",
    siteName: "Plast Du IV",
    title: "Plast Du IV — Producător Dibluri, Flanșe și Materiale Construcții",
    description:
      "Producător român de dibluri termoizolante, flanșe vată și distanțieri beton. Certificat ISO 9001/14001/45001. Livrare rapidă în toată România.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Plast Du IV — Producător dibluri și flanșe",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Plast Du IV — Producător Dibluri și Flanșe Construcții",
    description:
      "Producător român de dibluri termoizolante, flanșe și distanțieri beton. Livrare în toată România.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://plastdu.ro",
  },

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a3c5e",
  width: "device-width",
  initialScale: 1,
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Plast Du IV SRL",
  "legalName": "Plast Du IV SRL",
  "url": "https://plastdu.ro",
  "logo": "https://plastdu.ro/logo.png",
  "description": "Producător român de dibluri termoizolante, flanșe vată minerală și distanțieri beton pentru industria construcțiilor. Certificat ISO 9001, 14001, 45001.",
  "foundingDate": "2017",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Str. Ana Ipătescu nr. 44, Spațiul I4",
    "addressLocality": "Jilava",
    "addressRegion": "Ilfov",
    "postalCode": "077120",
    "addressCountry": "RO",
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+40724658491",
      "contactType": "sales",
      "areaServed": "RO",
      "availableLanguage": ["Romanian"],
    },
    {
      "@type": "ContactPoint",
      "telephone": "+40728211578",
      "contactType": "customer support",
      "areaServed": "RO",
      "availableLanguage": ["Romanian"],
    },
  ],
  "email": "office@plastdu.ro",
  "sameAs": ["https://wa.me/40724658491"],
  "hasCredential": [
    { "@type": "EducationalOccupationalCredential", "name": "ISO 9001 — Management Calitate" },
    { "@type": "EducationalOccupationalCredential", "name": "ISO 14001 — Management de Mediu" },
    { "@type": "EducationalOccupationalCredential", "name": "ISO 45001 — Sănătate și Securitate în Muncă" },
    { "@type": "EducationalOccupationalCredential", "name": "Coface SME Certificate" },
  ],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Plast Du IV",
  "url": "https://plastdu.ro",
  "inLanguage": "ro-RO",
  "publisher": { "@type": "Organization", "name": "Plast Du IV SRL" },
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://plastdu.ro/#localbusiness",
  "name": "Plast Du IV SRL",
  "image": "https://plastdu.ro/logo.png",
  "url": "https://plastdu.ro",
  "telephone": "+40724658491",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Str. Ana Ipătescu nr. 44",
    "addressLocality": "Jilava",
    "addressRegion": "Ilfov",
    "postalCode": "077120",
    "addressCountry": "RO",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 44.3449,
    "longitude": 26.0792,
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00",
    },
  ],
  "areaServed": { "@type": "Country", "name": "România" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        {children}
        <WhatsAppFloat />
        <CookieConsent />
        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('contextmenu', function(e) {
            if (e.target && e.target.tagName === 'IMG') e.preventDefault();
          });
          document.addEventListener('dragstart', function(e) {
            if (e.target && e.target.tagName === 'IMG') e.preventDefault();
          });
        `}} />
      </body>
    </html>
  );
}
