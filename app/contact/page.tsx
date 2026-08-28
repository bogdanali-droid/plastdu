export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from './ContactForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact — Cerere ofertă dibluri, flanșe și materiale construcții',
  description:
    'Contactați producătorul Plast Du IV pentru oferte B2B: dibluri, flanșe și elemente de fixare. ' +
    'Telefon, email, WhatsApp și formular de cerere de ofertă. Livrare în toată România din Jilava, Ilfov.',
  alternates: { canonical: 'https://plastdu.ro/contact' },
  openGraph: {
    title: 'Contact Plast Du IV — Cerere ofertă dibluri și flanșe',
    description: 'Date de contact, adresă fabrică Jilava și formular de cerere de ofertă pentru comenzi B2B.',
    url: 'https://plastdu.ro/contact',
  },
};

const DEFAULT_CONTACT = {
  phones: [
    { label: 'Telefon 1', number: '0724 658 491', href: 'tel:+40724658491' },
    { label: 'Telefon 2', number: '0728 211 578', href: 'tel:+40728211578' },
  ],
  email: 'office@plastdu.ro',
  address: 'Strada Ana Ipătescu nr. 44, Jilava, Ilfov',
  schedule: 'Luni – Vineri, 08:00 – 17:00 | Sâmbătă – Duminică: Închis',
  whatsapp: 'https://wa.me/40724658491',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2854.2!2d26.0792!3d44.3449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ffb4b5e7a1f%3A0xa4e0f5c8d3b72e1a!2sStrada%20Ana%20Ip%C4%83tescu%2044%2C%20Jilava%2C%20Ilfov!5e0!3m2!1sro!2sro!4v1700000000000!5m2!1sro!2sro',
};

const JUDETE_LIVRARE = [
  'București', 'Ilfov', 'Constanța', 'Cluj', 'Brașov', 'Prahova',
  'Timiș', 'Iași', 'Dolj', 'Argeș', 'Ploiești', 'Sibiu',
  'Bihor', 'Bacău', 'Mureș', 'Galați',
];

const CONTACT_FAQ = [
  {
    q: 'Cum se face livrarea comenzilor?',
    a: 'Livrăm prin curier rapid sau transport propriu în toată România, în 24–72h de la confirmarea comenzii, în funcție de cantitate și locație. Pentru comenzi mari (paleți) organizăm transport dedicat direct la șantier sau depozit.',
  },
  {
    q: 'Ce modalități de plată acceptați?',
    a: 'Acceptăm plată prin transfer bancar (OP) cu factură, precum și numerar sau card la ridicare din depozitul din Jilava, Ilfov. Pentru clienți instituționali (primării, firme mari) oferim și plată cu termen, conform contractului.',
  },
  {
    q: 'Care este comanda minimă?',
    a: 'Nu impunem o comandă minimă rigidă — lucrăm atât cu comenzi mici (câteva pungi/cutii), cât și cu comenzi en-gros de paleți întregi. Pentru cantități mari sau licitații publice, contactați-ne pentru preț negociat.',
  },
];

export default async function ContactPage() {
  let contact = DEFAULT_CONTACT;

  try {
    const { env } = getRequestContext();
    const kv = (env as any).PLASTDU_CONTENT as KVNamespace;
    const stored = await kv.get('contact');
    if (stored) contact = JSON.parse(stored);
  } catch {
    // use defaults
  }

  const PHONES = contact.phones;
  const EMAIL = contact.email;
  const ADDRESS = contact.address;
  const SCHEDULE = contact.schedule;
  const WHATSAPP_URL = contact.whatsapp;
  const MAPS_EMBED_URL = contact.mapsEmbed;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://plastdu.ro/contact#localbusiness',
    name: 'Plast Du IV SRL',
    image: 'https://plastdu.ro/logo.png',
    url: 'https://plastdu.ro/contact',
    telephone: '+40724658491',
    email: EMAIL,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Str. Ana Ipătescu nr. 44, Spațiul I4',
      addressLocality: 'Jilava',
      addressRegion: 'Ilfov',
      postalCode: '077120',
      addressCountry: 'RO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.3449,
      longitude: 26.0792,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    areaServed: { '@type': 'Country', name: 'România' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://plastdu.ro/' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://plastdu.ro/contact' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CONTACT_FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="min-h-screen bg-neutral-surface">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-neutral-border">
          <div className="max-w-container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-brand-blue-700 transition-colors">Acasă</Link>
              <span>/</span>
              <span className="text-slate-800 font-medium">Contact</span>
            </nav>
          </div>
        </div>

        <section className="bg-brand-blue-700 text-white py-16 px-4">
          <div className="max-w-container mx-auto text-center">
            <h1 className="text-display-md font-bold mb-4">Contact</h1>
            <p className="text-brand-blue-200 text-lg max-w-2xl mx-auto">
              Solicitați o ofertă pentru produsele noastre sau contactați-ne direct.
              Răspundem în aceeași zi lucrătoare.
            </p>
          </div>
        </section>

        <div className="max-w-container mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-5 gap-10">
          <aside className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-card border border-neutral-border p-6 flex flex-col gap-5">
              <h2 className="text-display-sm font-bold text-brand-blue-700">Date de contact</h2>

              <div className="flex flex-col gap-2">
                {PHONES.map((p: { href: string; label: string; number: string }) => (
                  <div key={p.href} className="flex items-center gap-3">
                    <span className="text-brand-accent-500 text-xl leading-none">📞</span>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{p.label}</p>
                      <a href={p.href} className="text-brand-blue-700 font-semibold text-lg hover:text-brand-accent-500 transition-colors">
                        {p.number}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-brand-accent-500 text-xl leading-none">✉️</span>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Email</p>
                  <a href={`mailto:${EMAIL}`} className="text-brand-blue-700 font-semibold hover:text-brand-accent-500 transition-colors break-all">
                    {EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-brand-accent-500 text-xl leading-none mt-0.5">📍</span>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Adresă</p>
                  <p className="text-brand-blue-700 font-semibold">{ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-brand-accent-500 text-xl leading-none">🕐</span>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Program</p>
                  <p className="text-brand-blue-700 font-semibold">{SCHEDULE}</p>
                </div>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb857] text-white font-semibold py-3 px-5 rounded-xl transition-colors shadow-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-card border border-neutral-border aspect-video lg:aspect-auto lg:flex-1">
              <iframe
                src={MAPS_EMBED_URL}
                width="100%"
                height="300"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Locație Plast Du IV — Str. Ana Ipătescu 44, Jilava"
              />
            </div>
          </aside>

          <section className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-card border border-neutral-border p-6 md:p-8">
              <h2 className="text-display-sm font-bold text-brand-blue-700 mb-1">Cerere de ofertă</h2>
              <p className="text-slate-500 mb-8">Completați formularul și vă contactăm cu o ofertă personalizată.</p>
              <ContactForm />
            </div>
          </section>
        </div>

        {/* Zone de livrare */}
        <section className="max-w-container mx-auto px-4 pb-14">
          <div className="bg-white rounded-2xl shadow-card border border-neutral-border p-6 md:p-8">
            <h2 className="text-display-sm font-bold text-brand-blue-700 mb-2">În ce zone livrăm</h2>
            <p className="text-slate-500 mb-5">
              Livrăm dibluri, flanșe și materiale de construcții în toată România, cu prioritate pe județele
              cu volum mare de proiecte de reabilitare termică:
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2">
              {JUDETE_LIVRARE.map((j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                  <svg className="w-4 h-4 text-brand-accent-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {j}
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-500 mt-5">
              Nu găsiți județul dvs. în listă? Livrăm oricum, contactați-ne pentru estimare de transport.
            </p>
          </div>
        </section>

        {/* FAQ comercial */}
        <section className="max-w-container mx-auto px-4 pb-16">
          <div className="bg-white rounded-2xl shadow-card border border-neutral-border p-6 md:p-8">
            <h2 className="text-display-sm font-bold text-brand-blue-700 mb-5">Întrebări frecvente</h2>
            <div className="space-y-3">
              {CONTACT_FAQ.map((f) => (
                <details key={f.q} className="border border-neutral-border rounded-xl p-4 group open:shadow-card">
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-semibold text-sm text-slate-800">
                    <span>{f.q}</span>
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="text-sm text-slate-600 leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue-700 hover:text-brand-accent-500 transition-colors mt-5"
            >
              Vezi toate întrebările frecvente
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
