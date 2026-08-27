export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';

// Bootstrap complet produse: descarcă toate pozele din Drive, populează KV `produse`
// cu structura completă (fabricate cu galerii extinse + distribuite cu poze reale).
// Idempotent — nu duplică dacă există în R2.

type ProdusFabricat = {
  slug: string;
  titlu: string;
  imagine: string;
  galerie: string[];
  categorie: string;
  descriere: string;
  specificatii: string[];
  variante: string;
  livrare: string;
  badge: string;
};

type ProdusDistribuit = {
  slug: string;
  titlu: string;
  categorie: string;
  imagine: string;
  galerie: string[];
  descriere: string;
  badge: string;
};

// Structură date — mapping product slug → lista fileId Drive
const PRODUSE_MAP = {
  fabricate: {
    'dibluri-plastic': {
      images: [
        '1XIRi-kO0yAySjCzthqhJqAfNBCWFlsAx',
        '1kVsEczO3iqvFJflT33VNijV8dNsIO8hb',
        '1FW5FFXVJoy3vvipn9FGbkCZFt2uVKjqs',
        '1wFVHgK_5SjowHzTEYisqV9fdeQNLBPFX',
        '19l99HX7Vf08I9o6JcOm3CsOk9ZTRNBGD',
        '13WM9Zse8b5n56_lOkqhwh4Q0IikKinKX',
        '1gqjyGk8vE5FdYv3yilULKbb2Ep0VItdD',
        '1S6kX859K9bRYmMzy5Uvhjwz5x2GNMyPn',
        '16PmxTF2Buc55-I6PzP513nJ7h8iGD8ti',
        '1gTUx5IPKKfu9FlJ8wsYC6KsAWEH2M0h5',
      ],
    },
    'dibluri-metalice': {
      images: [
        '11xLl2Z6EFo5ceJbfbGAXEs_fN4KqbFeh',
        '1TMJ_yG9sh4pJcp5YPGqqDioEE05rkOyz',
        '1h0IKHx0iRlIabUv1qY72DXW_POwUbiEW',
      ],
    },
    'flansa-vata': {
      images: ['1FuIpm50sLoWfJpmnDU0JYiLvIrPd4vds', '1vgzbOSyF6GMSvaBLTklQjwgnwSQqZvHL', '1Gy874r2MHnpoPuQP8BNWZgyg9n9mWfjW'],
    },
    'flansa-osb': {
      images: ['1QC8suPAOSahHIE_472p9fmgWmqj9Uu0v', '1_hbUWLrtwXLhClO565oa2Hirq47MNasT', '1wCaBZOOQME8Uo0-Hyx8LBSnYKakUWWLW'],
    },
  },
  distribuite: {
    'suruburi-autoforante': {
      images: [
        '1i3UzYxE5uauP4UVfmMsyS9l3uWmTjLo7',
        '1Q9BPwCmNVAIqIqvvauYn3_N9xaUGlb9c',
        '1XZfHuBzDEpFCkt0ZFyWVm1gm52q7gCeM',
        '1BspnN0qgjYbk0ZA9gJ2ReWcgzZwyxdAF',
        '1gKE5wH3Dz5FDHpMEvKAX_-037yTTJEyK',
        '1RZfFo_1FOM9eCacbXhd9_KKLIi2gANWT',
        '1JNiNzZ_gVKtOX9PFJ4dunAZAmQzES9Rk',
        '1jbPzYZ27aLeTW-p_VYXQbb5b8qay-J3V',
        '1NQK4unqHUG7FAsJHH09_ITW_LAfLQRfO',
        '1Y9s88fsVR5pfFyktYPOZL_xAMdDyNKAp',
        '1_mBv_NPhVgYRbif1goNy3y0zsBmscEej',
      ],
    },
    'saibe': {
      images: [
        '1HSORyIUTbUgIt31NMOCjJiKCTZkj-pMc',
        '11BmxmqLwtOVEsbEHBJ8kn7R4UOFj7Ndq',
        '1NMWaQdyYiL3IavCvX5qAmUCxIEMesn8E',
        '1vFYcPb9G9HnutdWn2NY1AAO9pbQnPUSZ',
        '1dhAxClZsKFWLJft68HvB-XN6Vg42eJ6T',
        '1Jr3pT5zNM_no56sy4XYWQgDoBZXlwY9s',
        '1yCe562ppXsrPo8WxsGYLTuviflTFd7Gx',
        '1bb8f7vO3GoxloVkkzVX2_JuWopqnaXKM',
      ],
    },
    'distantieri-beton': {
      images: ['1Q5N3R8x99uMvEIEpmixrgAjDs2NKkbGe', '16QvoQchY8Vz4y-ANBqv7V_LGDVG1-yVv', '1xQ25TcWE_dZ60BhnwTOTcWilBbEMOZ0X'],
    },
    'ancore-conexpand': { images: ['14htdCE8kDoB-yN7tbq8QvAjFJXt8LDbK'] },
    'tije-filetate': { images: ['1WznD9YDelbr0p-zWPhh5t7UYIIUZptxt'] },
    'agatatori-carlige': { images: ['1wQT3RMLcFqfgBHoxSQ7nwbP9OKMinfyH'] },
    'piulite': { images: ['1DYQfPkQLlK0rCO3EF-aI0ST76dDVFUCW'] },
    'dibluri-beton': { images: ['1MwVL1eiUGk3uy-t4mGbnVg4-uGzexbM_'] },
    'dibluri-caramida': { images: ['18G6BsDe2ilmA2lrmA4KPrc_JsMmIEXWc'] },
    'diblu-gips-carton': { images: ['1DWKaAl5wnx3vLzUWjYeIc93UeOc0ezSP'] },
    'diblu-schela': { images: ['1nNxbxj6kw5pObRuYkaVX7mNMxgwfETzz'] },
    'distantier-gresie': { images: ['1MZwkRFDwrHKPRIyF4ldkzmfZKv9J5i-l'] },
    'seturi-graduri': { images: ['1j7Ag7eHdZHC9wTHq-qzpromr0NiMk1aJ'] },
    'capace-teava': { images: ['1SBfN8tF3Sz1AF6PiEz8w_bxOOTJnqLOA'] },
    'coltar-pvc': { images: ['1U7xFwrPRhWGl7MBIXhVrPtGwun3s4ciU'] },
    'profil-colt-exterior': { images: ['1iPOecVgFTPos-xz6u63PEiAKcXUZ0pd1'] },
    'profil-etansare-tamplarie': { images: ['1a96mBppVbg-Px4Qdli5ToDCUdKEnzAD4'] },
    'profil-soclu': { images: ['1jNA_FTZvv3NIx8UsSuYk3Y5cLtrGQbUZ'] },
    'profil-dilatatie': { images: ['1uVMW2oLOL_yP-2vGERMidqsfumq3Rma7'] },
  },
};

async function fetchDriveFile(fileId: string): Promise<{ buffer: ArrayBuffer; contentType: string } | { error: string }> {
  const url = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&authuser=0`;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) return { error: `HTTP ${res.status}` };
    const contentType = res.headers.get('Content-Type') || 'image/jpeg';
    if (contentType.includes('text/html')) return { error: 'Drive HTML confirmation needed' };
    const buffer = await res.arrayBuffer();
    return { buffer, contentType };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Fetch failed' };
  }
}

function extToContentType(ct: string): string {
  if (ct.includes('png')) return 'png';
  if (ct.includes('webp')) return 'webp';
  if (ct.includes('avif')) return 'avif';
  return 'jpg';
}

async function uploadImages(r2: R2Bucket, slug: string, fileIds: string[]): Promise<{ paths: string[]; errors: any[] }> {
  const paths: string[] = [];
  const errors: any[] = [];
  for (let i = 0; i < fileIds.length; i++) {
    const id = fileIds[i];
    // Try to reuse existing (idempotent) — check multiple extensions
    let existingPath: string | null = null;
    for (const ext of ['jpg', 'jpeg', 'png', 'webp', 'avif']) {
      const p = `produse/${slug}/${String(i + 1).padStart(2, '0')}.${ext}`;
      const exists = await r2.head(p);
      if (exists) { existingPath = p; break; }
    }
    if (existingPath) { paths.push(`/api/img/${existingPath}`); continue; }

    const result = await fetchDriveFile(id);
    if ('error' in result) { errors.push({ index: i, fileId: id, error: result.error }); continue; }
    const ext = extToContentType(result.contentType);
    const path = `produse/${slug}/${String(i + 1).padStart(2, '0')}.${ext}`;
    await r2.put(path, result.buffer, { httpMetadata: { contentType: result.contentType } });
    paths.push(`/api/img/${path}`);
  }
  return { paths, errors };
}

const FABRICATE_META: Record<string, Omit<ProdusFabricat, 'imagine' | 'galerie'>> = {
  'dibluri-plastic': {
    slug: 'dibluri-plastic',
    titlu: 'Dibluri Cui Plastic (Poliamidă)',
    categorie: 'Dibluri',
    descriere: 'Diblu termoizolant cu cui din poliamidă, proiectat pentru fixarea termoizolațiilor din polistiren (EPS) pe fațade. Corpul din polipropilenă asigură rezistență mecanică, iar cuiul din PA elimină complet punțile termice.',
    specificatii: [
      'Corp: Polipropilenă (PP) — rezistentă UV, anti-îmbătrânire',
      'Cui: Poliamidă 6.6 (PA66) — termoizolant, fără punte termică',
      'Diametru cui: Ø5.5mm',
      'Diametru corp / gaură de montaj: Ø10mm',
      'Diametru rozeță: Ø55mm / 2mm grosime (standard) sau Ø60–90mm (zone mari)',
      'Suporturi compatibile: Cărămidă plină, BCA, Beton',
      'Lungimi disponibile: 70–200mm (standard), 180–260mm (ZM)',
      'Ambalare: 100 buc / pungă sau cutie',
    ],
    variante: '10x70 … 10x260ZM',
    livrare: '100 buc/pungă–cutie',
    badge: 'Produs propriu',
  },
  'dibluri-metalice': {
    slug: 'dibluri-metalice',
    titlu: 'Dibluri Cui Metalic Zincat',
    categorie: 'Dibluri',
    descriere: 'Diblu cu cui din oțel zincat — soluția de înaltă rezistență pentru fixarea polistirenului și a vatei minerale pe fațade. Forță de extragere superioară, protecție anticorozivă și compatibilitate extinsă cu toate tipurile de suport.',
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
  'flansa-vata': {
    slug: 'flansa-vata',
    titlu: 'Flanșă Vată Minerală',
    categorie: 'Flanșe',
    descriere: 'Disc plastic circular cu rozeță extinsă Ø120–140mm, model cu spite duble. Proiectat pentru fixarea vatei minerale și a polistirenului pe fațade — suprafața mare de contact previne penetrarea stratului izolant.',
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
  'flansa-osb': {
    slug: 'flansa-osb',
    titlu: 'Flanșă OSB / Capac (TSF-F55)',
    categorie: 'Flanșe',
    descriere: 'Flanșă cu capac snap-on care acoperă complet capul diblului și al șurubului după montaj. Asigură un finisaj superior, aspect curat și protecție împotriva coroziunii. Livrată cu șurub galvanizat inclus în set.',
    specificatii: [
      'Cod produs: TSF-F55',
      'Material flanșă: Polipropilenă (PP) injectată',
      'Material capac: PP — snap-on (presare, fără scule)',
      'Șurub inclus: Șurub galvanizat (zincare electrochimică)',
      'Livrat ca: Set complet — flanșă + capac + șurub',
    ],
    variante: 'TSF-F55',
    livrare: 'La cerere (seturi complete)',
    badge: 'Produs propriu',
  },
};

const DISTRIBUITE_META: Record<string, Omit<ProdusDistribuit, 'imagine' | 'galerie'>> = {
  'suruburi-autoforante': { slug: 'suruburi-autoforante', titlu: 'Șuruburi autoforante', categorie: 'Fixare', descriere: 'Gamă completă de șuruburi autoforante din oțel zincat: pentru PAL, lemn, dulgherie, tablă, gips carton, cap hexagonal, cap Imbus, cap torbant, cap crestat. Fixare rapidă fără pre-găurire pentru substrate diverse.', badge: 'Distribuit' },
  'saibe': { slug: 'saibe', titlu: 'Șaibe metalice', categorie: 'Fixare', descriere: 'Șaibe plate, zimțate, cu EPDM și speciale — dimensiuni standard (125, 127, 436, 522, 9021). Din oțel zincat cu rezistență sporită la coroziune.', badge: 'Distribuit' },
  'distantieri-beton': { slug: 'distantieri-beton', titlu: 'Distanțieri pentru beton', categorie: 'Accesorii', descriere: 'Distanțieri cilindrici, cu placă și rozeță pentru menținerea distanței corecte a armăturii în cofrajul de beton. Asigură stratul de acoperire uniform conform normelor de execuție.', badge: 'Distribuit' },
  'ancore-conexpand': { slug: 'ancore-conexpand', titlu: 'Ancoră Conexpand cu cep', categorie: 'Fixare', descriere: 'Ancoră mecanică Conexpand cu cep de expansiune — fixare structurală în beton și zidărie masivă. Forță mare de smulgere, montaj rapid.', badge: 'Distribuit' },
  'tije-filetate': { slug: 'tije-filetate', titlu: 'Tije filetate', categorie: 'Fixare', descriere: 'Tije filetate din oțel zincat, filete metrice standard — folosite în asamblări desfăcăbile, ancoraje chimice și sisteme suspendate.', badge: 'Distribuit' },
  'agatatori-carlige': { slug: 'agatatori-carlige', titlu: 'Agățători și cârlige', categorie: 'Accesorii', descriere: 'Agățători și cârlige metalice pentru balcon, garaj, dulăpioare — diverse forme și portanțe. Finisaj zincat rezistent la coroziune.', badge: 'Distribuit' },
  'piulite': { slug: 'piulite', titlu: 'Piulițe metrice', categorie: 'Fixare', descriere: 'Piulițe hexagonale metrice din oțel zincat, clase de rezistență 6/8/10, filete M4–M20. Compatibile cu șuruburi și tije filetate.', badge: 'Distribuit' },
  'dibluri-beton': { slug: 'dibluri-beton', titlu: 'Dibluri pentru beton', categorie: 'Dibluri', descriere: 'Dibluri distanțier pentru fixare în beton armat — fabricate din PP cu geometrie optimizată pentru rezistență la extragere.', badge: 'Distribuit' },
  'dibluri-caramida': { slug: 'dibluri-caramida', titlu: 'Dibluri pentru cărămidă', categorie: 'Dibluri', descriere: 'Dibluri universale pentru cărămidă plină și cu goluri. Compatibilitate extinsă cu șuruburi de la 4 la 8mm.', badge: 'Distribuit' },
  'diblu-gips-carton': { slug: 'diblu-gips-carton', titlu: 'Dibluri pentru gips-carton', categorie: 'Dibluri', descriere: 'Dibluri autoforante speciale pentru gips-carton — se înfiletă direct în panou fără pre-găurire, cu portanță crescută.', badge: 'Distribuit' },
  'diblu-schela': { slug: 'diblu-schela', titlu: 'Diblu pentru schelă', categorie: 'Dibluri', descriere: 'Diblu special pentru ancorarea schelelor de fațadă — forță mare de smulgere, compatibil cu suporturi diverse.', badge: 'Distribuit' },
  'distantier-gresie': { slug: 'distantier-gresie', titlu: 'Distanțier gresie', categorie: 'Accesorii', descriere: 'Distanțieri Tă și cross pentru rosturi uniforme la pozarea gresiei și faianței. Diverse grosimi disponibile.', badge: 'Distribuit' },
  'seturi-graduri': { slug: 'seturi-graduri', titlu: 'Seturi șuruburi cu diblu', categorie: 'Fixare', descriere: 'Seturi complete șurub + diblu — combinații preambalate pentru fixare rapidă în polistiren, vată, gips-carton și alte substrate.', badge: 'Distribuit' },
  'capace-teava': { slug: 'capace-teava', titlu: 'Capace pentru țeavă', categorie: 'Accesorii', descriere: 'Capace de protecție pentru capătul țevilor rotunde și rectangulare — previn ruginirea, contaminarea și rănirea la manipulare.', badge: 'Distribuit' },
  'coltar-pvc': { slug: 'coltar-pvc', titlu: 'Colțar PVC cu plasă', categorie: 'Profile', descriere: 'Colțar PVC cu plasă din fibră de sticlă — protecția colțurilor exterioare la sistemele de termoizolație. Rezistență UV și la impact.', badge: 'Distribuit' },
  'profil-colt-exterior': { slug: 'profil-colt-exterior', titlu: 'Profil colț cu picurător', categorie: 'Profile', descriere: 'Profil de colț cu picurător pentru finisarea colțurilor exterioare — dirijează apa și previne infiltrațiile la baza fațadei.', badge: 'Distribuit' },
  'profil-etansare-tamplarie': { slug: 'profil-etansare-tamplarie', titlu: 'Profil etanșare tâmplărie', categorie: 'Profile', descriere: 'Profil autoadeziv pentru etanșarea tâmplăriei PVC/aluminiu — protejează rosturile la termoizolare și finisaj.', badge: 'Distribuit' },
  'profil-soclu': { slug: 'profil-soclu', titlu: 'Profil de soclu', categorie: 'Profile', descriere: 'Profil aluminiu de soclu pentru pornirea corectă a sistemului ETICS la bază — asigură aliniamentul și drenajul.', badge: 'Distribuit' },
  'profil-dilatatie': { slug: 'profil-dilatatie', titlu: 'Profil dilatație', categorie: 'Profile', descriere: 'Profil pentru rosturile de dilatație în sistemele de fațadă — preia mișcarea structurii fără să crape stratul de finisaj.', badge: 'Distribuit' },
};

export async function GET() {
  const { env } = getRequestContext();
  const r2 = (env as any).PLASTDU_IMAGES as R2Bucket | undefined;
  const kv = (env as any).PLASTDU_CONTENT as KVNamespace | undefined;

  if (!r2 || !kv) return Response.json({ error: 'R2 or KV not bound' }, { status: 503 });

  const results: any = { fabricate: [], distribuite: [] };
  const fabricateEntries: ProdusFabricat[] = [];
  const distribuiteEntries: ProdusDistribuit[] = [];

  for (const slug of Object.keys(PRODUSE_MAP.fabricate)) {
    const src = (PRODUSE_MAP.fabricate as any)[slug];
    const meta = FABRICATE_META[slug];
    const { paths, errors } = await uploadImages(r2, slug, src.images);
    fabricateEntries.push({ ...meta, imagine: paths[0] || '', galerie: paths.slice(1) });
    results.fabricate.push({ slug, uploaded: paths.length, errors });
  }

  for (const slug of Object.keys(PRODUSE_MAP.distribuite)) {
    const src = (PRODUSE_MAP.distribuite as any)[slug];
    const meta = DISTRIBUITE_META[slug];
    if (!meta) continue;
    const { paths, errors } = await uploadImages(r2, slug, src.images);
    distribuiteEntries.push({ ...meta, imagine: paths[0] || '', galerie: paths.slice(1) });
    results.distribuite.push({ slug, uploaded: paths.length, errors });
  }

  const produseData = { fabricate: fabricateEntries, distribuite: distribuiteEntries };
  await kv.put('produse', JSON.stringify(produseData));

  return Response.json({
    ok: true,
    message: `Bootstrap complet: ${fabricateEntries.length} fabricate + ${distribuiteEntries.length} distribuite. Toate pozele descărcate din Drive.`,
    results,
    produseCount: { fabricate: fabricateEntries.length, distribuite: distribuiteEntries.length },
  });
}
