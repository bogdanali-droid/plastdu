export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';

const DEFAULT_PRODUSE = {
  fabricate: [
    {
      slug: 'dibluri-plastic',
      titlu: 'Dibluri Cui Plastic (Poliamidă)',
      imagine: '/images/produse/dibluri-plastic/01.jpg',
      galerie: [
        '/images/produse/dibluri-plastic/02.jpg',
        '/images/produse/dibluri-plastic/03.jpg',
        '/images/produse/dibluri-plastic/04.jpg',
        '/images/produse/dibluri-plastic/05.jpg',
        '/images/produse/dibluri-plastic/06.jpg',
        '/images/produse/dibluri-plastic/07.jpg',
        '/images/produse/dibluri-plastic/08.jpg',
        '/images/produse/dibluri-plastic/09.jpg',
        '/images/produse/dibluri-plastic/10.jpg',
        '/images/produse/dibluri-plastic/11.jpg',
        '/images/produse/dibluri-plastic/12.jpg',
        '/images/produse/dibluri-plastic/14.jpg',
      ],
      categorie: 'Dibluri',
      descriere:
        'Diblu termoizolant cu cui din poliamidă, proiectat pentru fixarea termoizolațiilor din polistiren (EPS) pe fațade în sisteme ETICS. Corpul din polipropilenă asigură rezistență mecanică, iar cuiul din PA elimină complet punțile termice.',
      specificatii: [
        'Corp: Polipropilenă (PP) — rezistentă UV, anti-îmbătrânire',
        'Cui: Poliamidă 6.6 (PA66) — termoizolant, fără punte termică',
        'Diametru cui: Ø5.5mm',
        'Diametru corp / gaură de montaj: Ø10mm',
        'Diametru rozeță: Ø55mm / 2mm grosime',
        'Suporturi compatibile: Cărămidă plină, BCA, Beton',
        'Lungimi disponibile: 70–200mm (standard), 180–260mm (ZM)',
        'Ambalare: 100 buc / pungă sau cutie',
      ],
      variante: '10x70 … 10x260ZM',
      livrare: '100 buc/pungă–cutie',
      badge: 'Produs propriu',
    },
    {
      slug: 'dibluri-metalice',
      titlu: 'Dibluri Cui Metalic Zincat',
      imagine: '/images/produse/dibluri-metalice/01.jpg',
      galerie: [
        '/images/produse/dibluri-metalice/02.jpg',
        '/images/produse/dibluri-metalice/03.jpg',
      ],
      categorie: 'Dibluri',
      descriere:
        'Diblu cu cui din oțel zincat — soluția de înaltă rezistență pentru fixarea polistirenului şi a vatei minerale pe fațade. Forță de extragere superioară, protecție anticorozivă şi compatibilitate extinsă cu toate tipurile de suport.',
      specificatii: [
        'Corp: Polipropilenă (PP) — rezistentă UV, anti-îmbătrânire',
        'Cui: Oțel zincat electrolitic — protecție coroziune clasa C3',
        'Diametru cui: Ø5.5mm',
        'Diametru corp / gaură de montaj: Ø10mm',
        'Diametru rozeță: Ø55mm / 2mm',
        'Suporturi compatibile: Cărămidă, BCA, Beton, Cărăm. cu goluri (ZM)',
        'Lungimi disponibile: 120–200mm (standard), 180–260mm (ZM)',
        'Ambalare: 200 buc/cutie (120–180mm) · 100 buc (200–260mm)',
      ],
      variante: '10x120 … 10x260ZM',
      livrare: '200 buc/cutie (120–180mm) · 100 buc (200–260mm)',
      badge: 'Produs propriu',
    },
    {
      slug: 'flansa-vata',
      titlu: 'Flanşă Vată Minerală',
      imagine: '/images/produse/flansa-vata/01.jpg',
      galerie: [
        '/images/produse/flansa-vata/02.jpg',
        '/images/produse/flansa-vata/03.jpg',
      ],
      categorie: 'Flanşe',
      descriere:
        'Disc plastic circular cu rozeță extinsă Ø120–140mm, model cu spite duble, gri închis. Proiectat pentru fixarea vatei minerale şi a polistirenului pe fațade — suprafața mare de contact previne penetrarea stratului izolant.',
      specificatii: [
        'Material: Polipropilenă (PP) cu stabilizatori UV',
        'Formă: Disc circular cu model spite duble',
        'Diametru exterior rozeță: Ø120–140mm',
        'Gaură centrală: Ø10mm (compatibil diblu Ø10mm)',
        'Compatibil cu: Vată minerală (MW), EPS, EPS-G',
        'Ambalare: La cerere — pungi 50–100 buc',
      ],
      variante: 'Standard',
      livrare: 'La cerere',
      badge: 'Produs propriu',
    },
    {
      slug: 'flansa-osb',
      titlu: 'Flanşă OSB / Capac (TSF-F55)',
      imagine: '/images/produse/flansa-osb/01.jpg',
      galerie: [
        '/images/produse/flansa-osb/02.jpg',
        '/images/produse/flansa-osb/03.jpg',
      ],
      categorie: 'Flanşe',
      descriere:
        'Flanşă cu capac snap-on care acoperă complet capul diblului şi al şurubului după montaj. Asigură un finisaj superior, aspect curat şi protecție împotriva coroziunii. Livrată cu şurub galvanizat inclus în set.',
      specificatii: [
        'Cod produs: TSF-F55',
        'Material flanşă: Polipropilenă (PP) injectată',
        'Material capac: PP — snap-on (presare, fără scule)',
        'Şurub inclus: Şurub galvanizat (zincare electrochimică)',
        'Livrat ca: Set complet — flanşă + capac + şurub',
      ],
      variante: 'TSF-F55',
      livrare: 'La cerere (seturi complete)',
      badge: 'Produs propriu',
    },
  ],
  distribuite: [
    { slug: 'suruburi-autoforante', titlu: 'Şuruburi autoforante', categorie: 'Fixare', imagine: '/images/produse/suruburi/01.jpg', galerie: [], descriere: 'Şuruburi autoforante din oțel zincat pentru fixare rapidă în metal şi lemn.', badge: 'Distribuit' },
    { slug: 'ancore-chimice', titlu: 'Ancore chimice', categorie: 'Fixare', imagine: '/images/produse/ancore/01.jpg', galerie: [], descriere: 'Ancore chimice bi-componente pentru fixări structurale în beton şi zidarărie.', badge: 'Distribuit' },
    { slug: 'distantieri-gresie', titlu: 'Distanțieri pentru gresie', categorie: 'Accesorii', imagine: '/images/produse/distantieri-gresie/01.jpg', galerie: [], descriere: 'Distanțieri din plastic pentru rosturi uniforme la pozarea gresiei şi fianței.', badge: 'Distribuit' },
    { slug: 'coltar-pvc', titlu: 'Colțar PVC cu plasă', categorie: 'Profile', imagine: '/images/produse/coltar-pvc/01.jpg', galerie: [], descriere: 'Colțar PVC cu plasă din fibră de sticlă pentru protecția colțurilor la fațade.', badge: 'Distribuit' },
    { slug: 'profil-colt-exterior', titlu: 'Profil de colț exterior', categorie: 'Profile', imagine: '/images/produse/profil-colt/01.jpg', galerie: [], descriere: 'Profil de colț din aluminiu sau PVC pentru finisaje exterioare şi interioare.', badge: 'Distribuit' },
    { slug: 'tije-filetate', titlu: 'Tije filetate', categorie: 'Fixare', imagine: '/images/produse/tije-filetate/01.jpg', galerie: [], descriere: 'Tije filetate din oțel zincat în diverse lungimi şi diametre metrice.', badge: 'Distribuit' },
    { slug: 'agatatori-balcon', titlu: 'Agățători pentru balcon', categorie: 'Accesorii', imagine: '/images/produse/agatatori/01.jpg', galerie: [], descriere: 'Agățători metalice zincate pentru montaj pe balustrade şi balcoane.', badge: 'Distribuit' },
    { slug: 'capace-teava', titlu: 'Capace pentru țeavă', categorie: 'Accesorii', imagine: '/images/produse/capace-teava/01.jpg', galerie: [], descriere: 'Capace din plastic pentru protecția capetelor de țeavă rotundă şi dreptunghiulară.', badge: 'Distribuit' },
    { slug: 'piulite-hexagonale', titlu: 'Piulițe hexagonale', categorie: 'Fixare', imagine: '/images/produse/piulite/01.jpg', galerie: [], descriere: 'Piulițe hexagonale din oțel zincat în clase de rezistență 6, 8 şi 10.', badge: 'Distribuit' },
    { slug: 'saibe', titlu: 'Śaibe', categorie: 'Fixare', imagine: '/images/produse/saibe/03.jpg', galerie: [], descriere: 'Śaibe plate şi zimțate din oțel zincat în game metrice complete.', badge: 'Distribuit' },
  ],
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

const DEFAULT_DESPRE = {
  cifre: [
    { val: '2017', label: 'An înființare' },
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
    videoclipuri: [],
    adresa: 'Str. Ana Ipătescu nr. 44, Spațiul I4, Com. Jilava, Ilfov',
  },
};

const DEFAULT_PROIECTE = [
  {"id":1,"name":"Reabilitare termică — Str. Baicului","district":"Sector 2 – Str. Baicului","year":2026,"lat":44.4520,"lng":26.1180,"photo":"/images/proiecte/baicului/01.jpg","imagini":["/images/proiecte/baicului/01.jpg"]},
  {"id":2,"name":"Reabilitare bloc — Buhuşi","district":"Sector 3 – Bucureşti","year":2026,"lat":44.4150,"lng":26.1420,"photo":"/images/proiecte/buhusi/01.jpg","imagini":["/images/proiecte/buhusi/01.jpg","/images/proiecte/buhusi/02.jpg","/images/proiecte/buhusi/03.jpg"]},
  {"id":3,"name":"Reabilitare termică — Str. Octavian Goga","district":"Sector 3 – Str. Octavian Goga","year":2026,"lat":44.4200,"lng":26.1350,"photo":"/images/proiecte/octavian-goga/01.jpg","imagini":["/images/proiecte/octavian-goga/01.jpg","/images/proiecte/octavian-goga/02.jpg","/images/proiecte/octavian-goga/03.jpg","/images/proiecte/octavian-goga/04.jpg","/images/proiecte/octavian-goga/05.jpg"]},
  {"id":4,"name":"Izolare bloc — Str. Ghica","district":"Sector 2 – Str. Ghica","year":2026,"lat":44.4600,"lng":26.1050,"photo":"/images/proiecte/ghica/01.jpg","imagini":["/images/proiecte/ghica/01.jpg"]},
  {"id":5,"name":"Reabilitare blocuri — proiect multiplu","district":"Bucureşti","year":2026,"lat":44.4400,"lng":26.0900,"photo":"/images/proiecte/blocuri/01.jpg","imagini":["/images/proiecte/blocuri/01.jpg","/images/proiecte/blocuri/02.jpg","/images/proiecte/blocuri/03.jpg","/images/proiecte/blocuri/04.jpg","/images/proiecte/blocuri/05.jpg"]}
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get('key');

  const { env } = getRequestContext();
  const kv = (env as any).PLASTDU_CONTENT as KVNamespace | undefined;

  if (key) {
    let defaultVal: any;
    if (key === 'produse') defaultVal = DEFAULT_PRODUSE;
    else if (key === 'contact') defaultVal = DEFAULT_CONTACT;
    else if (key === 'despre') defaultVal = DEFAULT_DESPRE;
    else if (key === 'proiecte') defaultVal = DEFAULT_PROIECTE;
    else return Response.json({ error: 'Unknown key' }, { status: 400 });

    if (!kv) return Response.json({ data: defaultVal });

    try {
      const stored = await kv.get(key);
      const data = stored ? JSON.parse(stored) : defaultVal;
      return Response.json({ data });
    } catch {
      return Response.json({ data: defaultVal });
    }
  }

  if (!kv) {
    return Response.json({
      produse: DEFAULT_PRODUSE,
      contact: DEFAULT_CONTACT,
      despre: DEFAULT_DESPRE,
      proiecte: DEFAULT_PROIECTE,
    });
  }

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
  const kv = (env as any).PLASTDU_CONTENT as KVNamespace | undefined;

  if (!kv) {
    return Response.json(
      { error: 'KV storage not configured. Bind PLASTDU_CONTENT in Cloudflare Pages → Settings → Functions → KV namespace bindings.' },
      { status: 503 }
    );
  }

  try {
    await kv.put(key, JSON.stringify(data));
    return Response.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Eroare internă';
    return Response.json({ error: message }, { status: 500 });
  }
}
