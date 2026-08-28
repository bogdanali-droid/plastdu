export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompareClient from './CompareClient';

export const metadata: Metadata = {
  title: 'Comparativ produse — Alege între dibluri, flanșe și distanțieri',
  description:
    'Comparați side-by-side două produse Plast Du IV: dibluri, flanșe, distanțieri și accesorii. ' +
    'Imagine, categorie, descriere și specificații tehnice, pentru a alege rapid produsul potrivit.',
  alternates: { canonical: 'https://plastdu.ro/comparativ-produse' },
  openGraph: {
    title: 'Comparativ produse Plast Du IV — Dibluri, flanșe, distanțieri',
    description: 'Comparație tehnică side-by-side între două produse din catalogul Plast Du IV.',
    url: 'https://plastdu.ro/comparativ-produse',
  },
};

export interface ProdusComparativ {
  slug: string;
  titlu: string;
  imagine: string;
  categorie: string;
  descriere: string;
  specificatii?: string[];
  badge?: string;
}

const DEFAULT_FABRICATE: ProdusComparativ[] = [
  {
    slug: 'dibluri-plastic',
    imagine: '/images/produse/dibluri-plastic/01.jpg',
    titlu: 'Dibluri Cui Plastic (Poliamidă)',
    categorie: 'Dibluri',
    descriere: 'Diblu termoizolant cu cui din poliamidă Ø5.5mm, corp PP Ø10mm, rozetă Ø55mm. Ideal pentru fixarea polistirenului pe fațade termoizolate.',
    specificatii: ['Corp: Polipropilenă', 'Cui: Poliamidă Ø5.5mm', 'Rozetă: Ø55mm / 2mm'],
    badge: 'Produs propriu',
  },
  {
    slug: 'dibluri-metalice',
    imagine: '/images/produse/dibluri-metalice/01.jpg',
    titlu: 'Dibluri Cui Metalic Zincat',
    categorie: 'Dibluri',
    descriere: 'Diblu cu cui din oțel zincat Ø5.5mm, corp PP Ø10mm, compatibil cu polistiren și vată minerală. Rezistență mecanică superioară în solicitări dinamice.',
    specificatii: ['Corp: Polipropilenă', 'Cui: Oțel zincat Ø5.5mm', 'Rozetă: Ø55mm / 2mm'],
    badge: 'Produs propriu',
  },
  {
    slug: 'flansa-vata',
    imagine: '/images/produse/flansa-vata/01.jpg',
    titlu: 'Flanșă Vată Minerală',
    categorie: 'Flanșe',
    descriere: 'Disc plastic cu rozeta extinsă Ø120–140mm, model spite duple. Distribuție uniformă a forței de prindere pe vată minerală și polistiren.',
    specificatii: ['Material: PP', 'Diametru rozetă: Ø120–140mm', 'Model: spite duble'],
    badge: 'Produs propriu',
  },
  {
    slug: 'flansa-osb',
    imagine: '/images/produse/flansa-osb/01.jpg',
    titlu: 'Flanșă OSB / Capac (TSF-F55)',
    categorie: 'Flanșe',
    descriere: 'Flanșă cu capac snap-on care acoperă capul diblului. Finisaj superior, aspect curat. Include șurub galvanizat. Cod produs: TSF-F55.',
    specificatii: ['Cod: TSF-F55', 'Capac snap-on', 'Şurub galvanizat inclus'],
    badge: 'Produs propriu',
  },
];

const DEFAULT_DISTRIBUITE: ProdusComparativ[] = [
  { slug: 'suruburi-autoforante', titlu: 'Şuruburi autoforante', categorie: 'Fixare', imagine: '/images/produse/suruburi/01.jpg', descriere: 'Şuruburi autoforante din oțel zincat pentru fixare rapidă în metal și lemn.', badge: 'Distribuit' },
  { slug: 'ancore-chimice', titlu: 'Ancore chimice', categorie: 'Fixare', imagine: '/images/produse/ancore/01.jpg', descriere: 'Ancore chimice bi-componente pentru fixări structurale în beton și zidărie.', badge: 'Distribuit' },
  { slug: 'distantieri-gresie', titlu: 'Distanțieri pentru gresie', categorie: 'Accesorii', imagine: '/images/produse/distantieri-gresie/01.jpg', descriere: 'Distanțieri din plastic pentru rosturi uniforme la pozarea gresiei și faianței.', badge: 'Distribuit' },
  { slug: 'coltar-pvc', titlu: 'Colțar PVC cu plasă', categorie: 'Profile', imagine: '/images/produse/coltar-pvc/01.jpg', descriere: 'Colțar PVC cu plasă din fibră de sticlă pentru protecția colțurilor la fațade.', badge: 'Distribuit' },
  { slug: 'profil-colt-exterior', titlu: 'Profil de colț exterior', categorie: 'Profile', imagine: '/images/produse/profil-colt/01.jpg', descriere: 'Profil de colț din aluminiu sau PVC pentru finisaje exterioare și interioare.', badge: 'Distribuit' },
  { slug: 'tije-filetate', titlu: 'Tije filetate', categorie: 'Fixare', imagine: '/images/produse/tije-filetate/01.jpg', descriere: 'Tije filetate din oțel zincat în diverse lungimi și diametre metrice.', badge: 'Distribuit' },
  { slug: 'agatatori-balcon', titlu: 'Agățători pentru balcon', categorie: 'Accesorii', imagine: '/images/produse/agatatori/01.jpg', descriere: 'Agățători metalice zincate pentru montaj pe balustrade și balcoane.', badge: 'Distribuit' },
  { slug: 'capace-teava', titlu: 'Capace pentru țeavă', categorie: 'Accesorii', imagine: '/images/produse/capace-teava/01.jpg', descriere: 'Capace din plastic pentru protecția capetelor de țeavă rotundă și dreptunghiulară.', badge: 'Distribuit' },
  { slug: 'piulite-hexagonale', titlu: 'Piulițe hexagonale', categorie: 'Fixare', imagine: '/images/produse/piulite/01.jpg', descriere: 'Piulițe hexagonale din oțel zincat în clase de rezistență 6, 8 și 10.', badge: 'Distribuit' },
  { slug: 'saibe', titlu: 'Şaibe', categorie: 'Fixare', imagine: '/images/produse/saibe/03.jpg', descriere: 'Şaibe plate și zimțate din oțel zincat în game metrice complete.', badge: 'Distribuit' },
];

export default async function ComparativProdusePage() {
  let produse: ProdusComparativ[] = [...DEFAULT_FABRICATE, ...DEFAULT_DISTRIBUITE];

  try {
    const { env } = getRequestContext();
    const kv = (env as any).PLASTDU_CONTENT as KVNamespace;
    const stored = await kv.get('produse');
    if (stored) {
      const parsed = JSON.parse(stored);
      const fabricate: ProdusComparativ[] = parsed.fabricate ?? DEFAULT_FABRICATE;
      const distribuite: ProdusComparativ[] = parsed.distribuite ?? DEFAULT_DISTRIBUITE;
      produse = [...fabricate, ...distribuite];
    }
  } catch {
    // foloseste fallback
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://plastdu.ro/' },
      { '@type': 'ListItem', position: 2, name: 'Produse', item: 'https://plastdu.ro/produse' },
      { '@type': 'ListItem', position: 3, name: 'Comparativ produse', item: 'https://plastdu.ro/comparativ-produse' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main>
        <section className="bg-brand-blue text-white section-padding">
          <div className="container-site">
            <p className="section-label !text-brand-accent/80 mb-3">Alege corect</p>
            <h1 className="text-display-lg text-white mb-4">Comparativ produse</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Alegeți două produse din catalog și comparați-le direct: imagine, categorie, descriere
              și specificații tehnice, pentru a decide rapid care se potrivește proiectului dvs.
            </p>
          </div>
        </section>

        <Suspense fallback={<div className="section-padding container-site">Se încarcă...</div>}>
          <CompareClient produse={produse} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
