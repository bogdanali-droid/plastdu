import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Aplicații",
  description:
    "Aplicații practice ale diblurilor și flanșelor Plast Du IV în sisteme ETICS, " +
    "termoizolație fațadă, vată minerală și OSB.",
  alternates: { canonical: "https://plastdu.ro/aplicatii" },
};

const APPLICATIONS = [
  {
    title: "Sisteme termoizolante ETICS / EWI",
    description:
      "Diblurile Plast Du IV sunt optimizate pentru sisteme ETICS (External Thermal Insulation Composite Systems). " +
      "Rozeta Ø55mm și corpul PP Ø10mm asigură o forță de smulgere ridicată pe suporturi de beton, BCA și zidărie.",
    products: ["Diblu cui plastic (poliamidă)", "Diblu cui metalic zincat"],
    details: [
      "Adâncime de ancorare: 25–60mm în funcție de suport",
      "Lungimi disponibile: 70–260mm",
      "Compatibil cu plăci EPS, XPS, MW",
    ],
  },
  {
    title: "Fixare vată minerală (lână de rocă / sticlă)",
    description:
      "Flanșa cu disc extins Ø140–160mm distribuie uniform sarcina pe vata minerală, " +
      "prevenind deformarea izolației. Modelul cu spițe duble asigură rigiditate fără masa suplimentară.",
    products: ["Flanșă vată minerală Ø140–160mm"],
    details: [
      "Diametru rozetă: Ø140 sau Ø160mm",
      "Material: Polipropilenă",
      "Model: spite duble pentru rigiditate",
    ],
  },
  {
    title: "Fațade cu finisaj plăci OSB",
    description:
      "Flanșa OSB (TSF-F55) cu capac snap-on acoperă estetic capul diblului, " +
      "oferind un finisaj curat pe fațadele cu plăci OSB sau sisteme uscate de fațadă.",
    products: ["Flanșă OSB / Capac (TSF-F55)"],
    details: [
      "Capac snap-on — montaj și demontaj rapid",
      "Șurub galvanizat inclus în pachet",
      "Finisaj omogen, aspect îngrijit",
    ],
  },
  {
    title: "Construcții rezidențiale și comerciale",
    description:
      "De la blocuri de locuințe la hale industriale și clădiri comerciale — " +
      "diblurile Plast Du IV sunt utilizate în proiecte de reabilitare termică și construcții noi, " +
      "pe toată suprafața României.",
    products: ["Dibluri plastic", "Dibluri metalice", "Flanșe"],
    details: [
      "Volume mari disponibile — comenzi de la 1.000 buc.",
      "Livrare pe șantier sau la depozit",
      "Asistență tehnică la alegerea produsului",
    ],
  },
];

export default function AplicatiiPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-brand-blue text-white section-padding">
          <div className="container-site max-w-3xl">
            <p className="section-label !text-brand-accent/90 mb-3">Aplicații tehnice</p>
            <h1 className="text-white mb-4">Unde se utilizează produsele Plast Du IV</h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              Soluții de fixare pentru sisteme termoizolante, fațade ventilate, plăci OSB și construcții
              din beton sau zidărie. Produse fabricate propriu, testate în condiții reale de șantier.
            </p>
          </div>
        </section>

        {/* Applications list */}
        <section className="section-padding bg-white">
          <div className="container-site">
            <div className="grid md:grid-cols-2 gap-8">
              {APPLICATIONS.map((app, i) => (
                <article key={i} className="card flex flex-col gap-4">
                  <h2 className="text-display-sm">{app.title}</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">{app.description}</p>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                      Produse recomandate
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {app.products.map((prod) => (
                        <span
                          key={prod}
                          className="text-xs font-medium px-3 py-1 rounded-full bg-brand-blue/5 text-brand-blue border border-brand-blue/10"
                        >
                          {prod}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ul className="space-y-1.5">
                    {app.details.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0 mt-1.5" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-brand-blue text-white">
          <div className="container-site text-center max-w-xl mx-auto">
            <h2 className="text-white mb-4">Aveți un proiect specific?</h2>
            <p className="text-blue-100 mb-8">
              Contactați-ne cu detalii despre proiect și vă recomandăm produsele potrivite
              și cantitățile necesare.
            </p>
            <CTAButton href="/contact" size="lg" variant="primary">
              Cere ofertă personalizată
            </CTAButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
