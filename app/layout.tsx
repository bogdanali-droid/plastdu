import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import WhatsAppFloat from "@/components/WhatsAppFloat";

/* ─── Site-wide metadata ─────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://plastdu.ro"),

  title: {
    default: "Plast Du IV — Dibluri și Flanșe pentru Construcții | Jilava, Ilfov",
    template: "%s | Plast Du IV",
  },
  description:
    "Producător român de dibluri, flanșe și elemente de fixare pentru construcții. " +
    "Livrăm în toată țara. Soluții B2B pentru firme de construcții, antreprenori și depozite.",

  keywords: [
    "dibluri constructii",
    "flanse plastic",
    "elemente fixare constructii",
    "producator dibluri Romania",
    "Plast Du IV",
    "plastdu",
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
    title: "Plast Du IV — Dibluri și Flanșe pentru Construcții",
    description:
      "Producător român de dibluri, flanșe și elemente de fixare. Soluții B2B pentru industria construcțiilor.",
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
    title: "Plast Du IV — Dibluri și Flanșe pentru Construcții",
    description:
      "Producător român de dibluri, flanșe și elemente de fixare. Soluții B2B pentru industria construcțiilor.",
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

/* ─── Root Layout ────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="flex flex-col min-h-screen">
        {/* Navbar and Footer are rendered at page level for flexibility */}
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
