import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalerieProduse from "./GalerieProduse";

const PRODUSE: Record<
  string,
  {
    titlu: string;
    categorie: string;
    descriere: string;
    specificatii: string[];
    variante: string;
    livrare: string;
    imagini: string[];
  }
> = {
  "dibluri-plastic": {
    titlu: "Dibluri Cui Plastic (Poliamidă)",
    categorie: "Dibluri",
    descriere:
      "Diblu termoizolant cu cui din poliamidă Ø5.5mm, corp PP Ø10mm, rozetă Ø55mm. " +
      "Ideal pentru fixarea polistirenului pe fațade termoizolate. Fabricat în România, conform standardelor europene pentru sisteme ETICS.",
    specificatii: [
      "Corp: Polipropilenă (PP)",
      "Cui: Poliamidă Ø5.5mm — termoizolant",
      "Rozetă: Ø55mm / grosime 2mm",
      "Adâncime de ancorare: min. 25mm în beton",
      "Rezistență la smulgere: ≥ 0.6 kN (beton C20/25)",
    ],
    variante: "10×70, 10×80, 10×100, 10×120, 10×140, 10×160, 10×180, 10×200, 10×220, 10×240, 10×260ZM",
    livrare: "100 buc / pungă sau cutie",
    imagini: ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.jpg","07.jpg","08.jpg","09.jpg","10.jpg","11.jpg","12.jpg","14.jpg"],
  },
  "dibluri-metalice": {
    titlu: "Dibluri Cui Metalic Zincat",
    categorie: "Dibluri",
    descriere:
      "Diblu cu cui din oțel zincat Ø5.5mm, corp PP Ø10mm, compatibil cu polistiren și vată minerală. " +
      "Rezistență mecanică superioară în solicitări dinamice și structuri cu cerințe ridicate.",
    specificatii: [
      "Corp: Polipropilenă (PP)",
      "Cui: Oțel zincat Ø5.5mm",
      "Rozetă: Ø55mm / grosime 2mm",
      "Adâncime de ancorare: min. 25mm în beton",
      "Rezistență la smulgere: ≥ 0.8 kN (beton C20/25)",
    ],
    variante: "10×120, 10×140, 10×160, 10×180, 10×200, 10×220, 10×240, 10×260ZM",
    livrare: "100–200 buc / cutie",
    imagini: ["01.jpg","02.jpg","03.jpg"],
  },
  "flansa-vata": {
    titlu: "Flanșă Vată Minerală",
    categorie: "Flanșe",
    descriere:
      "Disc plastic cu rozetă extinsă Ø120–140mm, model spite duble. Distribuție uniformă a forței de prindere " +
      "pe vată minerală și polistiren. Culoare gri închis. Fabricat din PP virgin.",
    specificatii: [
      "Material: Polipropilenă (PP)",
      "Diametru rozetă: Ø120–140mm",
      "Model: spite duble — distribuție uniformă",
      "Compatibil cu dibluri Ø10mm",
    ],
    variante: "Standard Ø120mm, Standard Ø140mm",
    livrare: "La cerere",
    imagini: ["01.jpg","02.jpg","03.jpg"],
  },
  "flansa-osb": {
    titlu: "Flanșă OSB / Capac (TSF-F55)",
    categorie: "Flanșe",
    descriere:
      "Flanșă cu capac snap-on care acoperă capul diblului pentru un finisaj superior și aspect curat. " +
      "Include șurub galvanizat. Cod produs: TSF-F55. Fabricat în România.",
    specificatii: [
      "Cod produs: TSF-F55",
      "Sistem capac snap-on",
      "Șurub galvanizat inclus",
      "Material: PP + oțel zincat",
    ],
    variante: "TSF-F55",
    livrare: "La cerere",
    imagini: ["01.jpg","02.jpg","03.jpg"],
  },
};

export function generateStaticParams() {
  return Object.keys(PRODUSE).map((slug) => ({ slug }));
}

export default function PagProdusDetal({
  params,
}: {
  params: { slug: string };
}) {
  const produs = PRODUSE[params.slug];
  if (!produs) notFound();

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb */}
        <section className="bg-neutral-surface border-b border-neutral-border">
          <div className="container-site py-3 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-brand-blue transition-colors">Acasă</Link>
            <span>/</span>
            <Link href="/produse" className="hover:text-brand-blue transition-colors">Produse</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">{produs.titlu}</span>
          </div>
        </section>

        {/* Hero produs */}
        <section className="section-padding bg-white">
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Galerie imagini */}
              <GalerieProduse
                slug={params.slug}
                imagini={produs.imagini}
                titlu={produs.titlu}
              />

              {/* Info produs */}
              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-accent/10 text-brand-accent">
                      Produs propriu
                    </span>
                    <span className="text-xs text-slate-400">{produs.categorie}</span>
                  </div>
                  <h1 className="text-display-sm mb-3">{produs.titlu}</h1>
                  <p className="text-slate-600 leading-relaxed">{produs.descriere}</p>
                </div>

                {/* Specificații tehnice */}
                <div className="bg-neutral-surface rounded-xl p-5 border border-neutral-border">
                  <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
                    Specificații tehnice
                  </h2>
                  <ul className="space-y-2">
                    {produs.specificatii.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0 mt-1.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Variante & livrare */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-brand-blue uppercase tracking-wide mb-1">Variante</p>
                    <p className="text-sm text-slate-700">{produs.variante}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-brand-blue uppercase tracking-wide mb-1">Livrare</p>
                    <p className="text-sm text-slate-700">{produs.livrare}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/contact?subiect=cerere-oferta"
                    className="inline-flex items-center justify-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-blue/90 transition-colors"
                  >
                    Solicitați ofertă
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/produse"
                    className="inline-flex items-center justify-center gap-2 border border-neutral-border text-slate-600 font-semibold px-6 py-3 rounded-xl hover:border-brand-blue hover:text-brand-blue transition-colors"
                  >
                    ← Înapoi la produse
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA contact */}
        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center">
            <h2 className="text-white mb-4">Aveți nevoie de cantități mari sau ofertă personalizată?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Lucrăm direct cu firme de construcții, antreprenori și distribuitori.
              Contactați-ne pentru prețuri de volum și termene de livrare.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-accent/90 transition-colors"
            >
              Contactați-ne
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
