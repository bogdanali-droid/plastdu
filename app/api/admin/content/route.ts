export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';

const DEFAULT_PRODUSE = {
  fabricate: [
    {
      slug: 'dibluri-plastic',
      titlu: 'Dibluri Cui Plastic (Poliamidă)',
      imagine: '/images/produse/dibluri-plastic/01.jpg',
      categorie: 'Dibluri',
      descriere:
        'Diblu termoizolant cu cui din poliamidă Ø5.5mm, corp PP Ø10mm, rozetă Ø55mm. Ideal pentru fixarea polistirenului pe fațade termoizolate.',
      specificatii: ['Corp: Polipropilenă', 'Cui: Poliamidă Ø5.5mm', 'Rozetă: Ø55mm / 2mm'],
      variante: '10x70 … 10x260ZM',
      livrare: '100 buc/pungă–cutie',
      badge: 'Produs propriu',
    },
    {
      slug: 'dibluri-metalice',
      titlu: 'Dibluri Cui Metalic Zincat',
      imagine: '/images/produse/dibluri-metalice/01.jpg',
      categorie: 'Dibluri',
      descriere:
        'Diblu cu cui din oțel zincat Ø5.5mm, corp PP Ø10mm, compatibil cu polistiren şi vată minerală. Rezistență mecanică superioară \xeen solicitări dinamice.',
      specificatii: ['Corp: Polipropilenă', 'Cui: Oțel zincat Ø5.5mm', 'Rozetă: Ø55mm / 2mm'],
      variante: '10x120 … 10x260ZM',
      livrare: '100–200 buc/cutie',
      badge: 'Produs propriu',
    },
    {
      slug: 'flansa-vata',
      titlu: 'Flanśă Vată Minerală',
      imagine: '/images/produse/flansa-vata/01.jpg',
      categorie: 'Flanśe',
      descriere:
        'Disc plastic cu rozeta extinsă Ø120–140mm, model spite duple. Distribuție uniformă a forței de prindere pe vată minerală şi polistiren.',
      specificatii: ['Material: PP', 'Diametru rozetă: Ø120–140mm', 'Model: spite duble'],
      variante: 'Standard',
      livrare: 'La cerere',
      badge: 'Produs propriu',
    },
    {
      slug: 'flansa-osb',
      titlu: 'Flanśă OSB / Capac (TSF-F55)',
      imagine: '/images/produse/flansa-osb/01.jpg',
      categorie: 'Flanśe',
      descriere:
        'Flanśă cu capac snap-on care acoperă capul diblului. Finisaj superior, aspect curat. Include şurub galvanizat. Cod produs: TSF-F55.',
      specificatii: ['Cod: TSF-F55', 'Capac snap-on', 'Şurub galvanizat inclus'],
      variante: 'TSF-F55',
      livrare: 'La cerere',
      badge: 'Produs propriu',
    },
  ],
  distribuite: [
    { slug: 'suruburi-autoforante', titlu: 'Şuruburi autoforante', categorie: 'Fixare', imagine: '/images/produse/suruburi/01.jpg', descriere: 'Şuruburi autoforante din oțel zincat pentru fixare rapidă \xeen metal şi lemn.', badge: 'Distribuit' },
    { slug: 'ancore-chimice', titlu: 'Ancore chimice', categorie: 'Fixare', imagine: '/images/produse/ancore/01.jpg', descriere: 'Ancore chimice bi-componente pentru fixări structurale \xeen beton şi zidarărie.', badge: 'Distribuit' },
    { slug: 'distantieri-gresie', titlu: 'Distanțieri pentru gresie', categorie: 'Accesorii', imagine: '/images/produse/distantieri-gresie/01.jpg', descriere: 'Distanțieri din plastic pentru rosturi uniforme la pozarea gresiei şi faianței.', badge: 'Distribuit' },
    { slug: 'coltar-pvc', titlu: 'Colțar PVC cu plasă', categorie: 'Profile', imagine: '/images/produse/coltar-pvc/01.jpg', descriere: 'Colțar PVC cu plasă din fibră de sticlă pentru protecția colțurilor la fațade.', badge: 'Distribuit' },
    { slug: 'profil-colt-exterior', titlu: 'Profil de colț exterior', categorie: 'Profile', imagine: '/images/produse/profil-colt/01.jpg', descriere: 'Profil de colț din aluminiu sau PVC pentru finisaje exterioare şi interioare.', badge: 'Distribuit' },
    { slug: 'tije-filetate', titlu: 'Tije filetate', categorie: 'Fixare', imagine: '/images/produse/tije-filetate/01.jpg', descriere: 'Tije filetate din oțel zincat \xeen diverse lungimi şi diametre metrice.', badge: 'Distribuit' },
    { slug: 'agatatori-balcon', titlu: 'Agățători pentru balcon', categorie: 'Accesorii', imagine: '/images/produse/agatatori/01.jpg', descriere: 'Agățători metalice zincate pentru montaj pe balustrade şi balcoane.', badge: 'Distribuit' },
    { slug: 'capace-teava', titlu: 'Capace pentru țeavgă', categorie: 'Accesorii', imagine: '/images/produse/capace-teava/01.jpg', descriere: 'Capace din plastic pentru protecția capetelor de țeavgă rotundă şi dreptunghiulară.', badge: 'Distribuit' },
    { slug: 'piulite-hexagonale', titlu: 'Piulițe hexagonale', categorie: 'Fixare', imagine: '/images/produse/piulite/01.jpg', descriere: 'Piulițe hexagonale din oțel zincat \xeen clase de rezistență 6, 8 şi 10.', badge: 'Distribuit' },
    { slug: 'saibe', titlu: 'Şaibe', categorie: 'Fixare', imagine: '/images/produse/saibe/03.jpg', descriere: 'Şaibe plate şi zimțate din oțel zincat \xeen game metrice complete.', badge: 'Distribuit' },
  ],
};

const DEFAULT_CONTACT = {
  phones: [
    { label: 'Telefon 1', number: '0724 658 491', href: 'tel:+40724658491' },
    { label: 'Telefon 2', number: '0728 211 578', href: 'tel:+40728211578' },
  ],
  email: 'office@plastdu.ro',
  address: 'Strada Ana Ipătescu nr. 44, Jilava, Ilfov',
  schedule: 'Luni – Vineri, 08:00 – 17:00 | Sâmbătă – Duminică: \xcenchis',
  whatsapp: 'https://wa.me/40724658491',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2854.2!2d26.0792!3d44.3449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ffb4b5e7a1f%3A0xa4e0f5c8d3b72e1a!2sStrada%20Ana%20Ip%C4%83tescu%2044%2C%20Jilava%2C%20Ilfov!5e0!3m2!1sro!2sro!4v1700000000000!5m2!1sro!2sro',
};

const DEFAULT_DESPRE = {
  cifre: [
    { val: '2017', label: 'An \xeenfăințare' },
    { val: '8+', label: 'Județe deservite' },
    { val: '5', label: 'Linii de producție' },
    { val: 'B2B', label: 'Focus exclusiv' },
  ],
  specializari: [
    'Producția de dibluri pentru polistiren (sisteme de termoizolație exterioară)',
    'Producția de dibluri pentru vată minerală',
    'Producția de distanțieri pentru beton',
    'Distribuția de materiale de construcții şi organe de asamblare',
  ],
  fabrica: {
    imagini: ['/images/fabrica/01.jpg', '/images/fabrica/04.jpg', '/images/fabrica/05.jpg'],
    adresa: 'Str. Ana Ipătescu nr. 44, Spațiul I4, Com. Jilava, Ilfov',
  },
};

const DEFAULT_PROIECTE = [
  {"id":1,"name":"Reabilitare termică — Str. Baicului","district":"Sector 2 – Str. Baicului","year":2026,"lat":44.4520,"lng":26.1180,"photo":"/images/proiecte/baicului/01.jpg","imagini":["/images/proiecte/baicului/01.jpg"]},
  {"id":2,"name":"Reabilitare bloc — Buhuși","district":"Sector 3 – București","year":2026,"lat":44.4150,"lng":26.1420,"photo":"/images/proiecte/buhusi/01.jpg","imagini":["/images/proiecte/buhusi/01.jpg","/images/proiecte/buhusi/02.jpg","/images/proiecte/buhusi/03.jpg"]},
  {"id":3,"name":"Reabilitare termică — Str. Octavian Goga","district":"Sector 3 – Str. Octavian Goga","year":2026,"lat":44.4200,"lng":26.1350,"photo":"/images/proiecte/octavian-goga/01.jpg","imagini":["/images/proiecte/octavian-goga/01.jpg","/images/proiecte/octavian-goga/02.jpg","/images/proiecte/octavian-goga/03.jpg","/images/proiecte/octavian-goga/04.jpg","/images/proiecte/octavian-goga/05.jpg"]},
  {"id":4,"name":"Izolare bloc — Str. Ghica","district":"Sector 2 – Str. Ghica","year":2026,"lat":44.4600,"lng":26.1050,"photo":"/images/proiecte/ghica/01.jpg","imagini":["/images/proiecte/ghica/01.jpg"]},
  {"id":5,"name":"Reabilitare blocuri — proiect multiplu","district":"București","year":2026,"lat":44.4400,"lng":26.0900,"photo":"/images/proiecte/blocuri/01.jpg","imagini":["/images/proiecte/blocuri/01.jpg","/images/proiecte/blocuri/02.jpg","/images/proiecte/blocuri/03.jpg","/images/proiecte/blocuri/04.jpg","/images/proiecte/blocuri/05.jpg"]}
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get('key');

  const { env } = getRequestContext();
  const kv = (env as any).PLASTDU_CONTENT as KVNamespace;

  if (key) {
    let defaultVal: any;
    if (key === 'produse') defaultVal = DEFAULT_PRODUSE;
    else if (key === 'contact') defaultVal = DEFAULT_CONTACT;
    else if (key === 'despre') defaultVal = DEFAULT_DESPRE;
    else if (key === 'proiecte') defaultVal = DEFAULT_PROIECTE;
    else return Response.json({ error: 'Unknown key' }, { status: 400 });

    try {
      const stored = await kv.get(key);
      const data = stored ? JSON.parse(stored) : defaultVal;
      return Response.json({ data });
    } catch {
      return Response.json({ data: defaultVal });
    }
  }

  // Return all keys
  try {
    const [produseRaw, contactRaw, despreRaw, proiecteRaw] = await Promise.all([
      kv.get('produse'),
      kv.get('contact'),
      kv.get('despre'),
      kv.get('proiecte'),
    ]);
    return Response.json({
      produse: produseRaw ? JSON.parse(produseRaw) : DEFAULT_PRODUSE,
      contact: contactRaw ? JSON.parse(contactRaw) : DEFAULT_CONTACT,
      despre: despreRaw ? JSON.parse(despreRaw) : DEFAULT_DESPRE,
      proiecte: proiecteRaw ? JSON.parse(proiecteRaw) : DEFAULT_PROIECTE,
    });
  } catch {
    return Response.json({
      produse: DEFAULT_PRODUSE,
      contact: DEFAULT_CONTACT,
      despre: DEFAULT_DESPRE,
      proiecte: DEFAULT_PROIECTE,
    });
  }
}

export async function PUT(req: Request) {
  const { key, data } = await req.json();
  if (!key || !['produse', 'contact', 'despre', 'proiecte'].includes(key)) {
    return Response.json({ error: 'Invalid key' }, { status: 400 });
  }

  const { env } = getRequestContext();
  const kv = (env as any).PLASTDU_CONTENT as KVNamespace;

  try {
    await kv.put(key, JSON.stringify(data));
    return Response.json({ ok: true });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
