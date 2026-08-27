export const runtime = 'edge';
import { getRequestContext } from '@cloudflare/next-on-pages';

type ProdusFabricat = { slug: string; titlu: string; imagine: string; galerie: string[]; categorie: string; descriere: string; specificatii: string[]; variante: string; livrare: string; badge: string; };
type ProdusDistribuit = { slug: string; titlu: string; categorie: string; imagine: string; galerie: string[]; descriere: string; badge: string; };

const PRODUSE_MAP = {
  fabricate: {
    'dibluri-plastic': { images: ['1XIRi-kO0yAySjCzthqhJqAfNBCWFlsAx','1kVsEczO3iqvFJflT33VNijV8dNsIO8hb','1FW5FFXVJoy3vvipn9FGbkCZFt2uVKjqs','1wFVHgK_5SjowHzTEYisqV9fdeQNLBPFX','19l99HX7Vf08I9o6JcOm3CsOk9ZTRNBGD','13WM9Zse8b5n56_lOkqhwh4Q0IikKinKX','1gqjyGk8vE5FdYv3yilULKbb2Ep0VItdD','1S6kX859K9bRYmMzy5Uvhjwz5x2GNMyPn','16PmxTF2Buc55-I6PzP513nJ7h8iGD8ti','1gTUx5IPKKfu9FlJ8wsYC6KsAWEH2M0h5'] },
    'dibluri-metalice': { images: ['11xLl2Z6EFo5ceJbfbGAXEs_fN4KqbFeh','1TMJ_yG9sh4pJcp5YPGqqDioEE05rkOyz','1h0IKHx0iRlIabUv1qY72DXW_POwUbiEW'] },
    'flansa-vata': { images: ['1FuIpm50sLoWfJpmnDU0JYiLvIrPd4vds','1vgzbOSyF6GMSvaBLTklQjwgnwSQqZvHL','1Gy874r2MHnpoPuQP8BNWZgyg9n9mWfjW'] },
    'flansa-osb': { images: ['1QC8suPAOSahHIE_472p9fmgWmqj9Uu0v','1_hbUWLrtwXLhClO565oa2Hirq47MNasT','1wCaBZOOQME8Uo0-Hyx8LBSnYKakUWWLW'] },
  },
  distribuite: {
    'suruburi-autoforante': { images: ['1i3UzYxE5uauP4UVfmMsyS9l3uWmTjLo7','1Q9BPwCmNVAIqIqvvauYn3_N9xaUGlb9c','1XZfHuBzDEpFCkt0ZFyWVm1gm52q7gCeM','1BspnN0qgjYbk0ZA9gJ2ReWcgzZwyxdAF','1gKE5wH3Dz5FDHpMEvKAX_-037yTTJEyK','1RZfFo_1FOM9eCacbXhd9_KKLIi2gANWT','1JNiNzZ_gVKtOX9PFJ4dunAZAmQzES9Rk','1jbPzYZ27aLeTW-p_VYXQbb5b8qay-J3V','1NQK4unqHUG7FAsJHH09_ITW_LAfLQRfO','1Y9s88fsVR5pfFyktYPOZL_xAMdDyNKAp','1_mBv_NPhVgYRbif1goNy3y0zsBmscEej'] },
    'saibe': { images: ['1HSORyIUTbUgIt31NMOCjJiKCTZkj-pMc','11BmxmqLwtOVEsbEHBJ8kn7R4UOFj7Ndq','1NMWaQdyYiL3IavCvX5qAmUCxIEMesn8E','1vFYcPb9G9HnutdWn2NY1AAO9pbQnPUSZ','1dhAxClZsKFWLJft68HvB-XN6Vg42eJ6T','1Jr3pT5zNM_no56sy4XYWQgDoBZXlwY9s','1yCe562ppXsrPo8WxsGYLTuviflTFd7Gx','1bb8f7vO3GoxloVkkzVX2_JuWopqnaXKM'] },
    'distantieri-beton': { images: ['1Q5N3R8x99uMvEIEpmixrgAjDs2NKkbGe','16QvoQchY8Vz4y-ANBqv7V_LGDVG1-yVv','1xQ25TcWE_dZ60BhnwTOTcWilBbEMOZ0X'] },
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

function extFromContentType(ct: string): string {
  if (ct.includes('png')) return 'png';
  if (ct.includes('webp')) return 'webp';
  if (ct.includes('avif')) return 'avif';
  return 'jpg';
}

async function processImage(r2: R2Bucket, slug: string, index: number, fileId: string): Promise<{ path: string | null; error?: string }> {
  for (const ext of ['jpg', 'jpeg', 'png', 'webp', 'avif']) {
    const p = `produse/${slug}/${String(index + 1).padStart(2, '0')}.${ext}`;
    const exists = await r2.head(p);
    if (exists) return { path: `/api/img/${p}` };
  }
  const result = await fetchDriveFile(fileId);
  if ('error' in result) return { path: null, error: result.error };
  const ext = extFromContentType(result.contentType);
  const path = `produse/${slug}/${String(index + 1).padStart(2, '0')}.${ext}`;
  await r2.put(path, result.buffer, { httpMetadata: { contentType: result.contentType } });
  return { path: `/api/img/${path}` };
}

const FABRICATE_META: Record<string, Omit<ProdusFabricat, 'imagine' | 'galerie'>> = {
  'dibluri-plastic': { slug: 'dibluri-plastic', titlu: 'Dibluri Cui Plastic (Poliamidă)', categorie: 'Dibluri', descriere: 'Diblu termoizolant cu cui din poliamidă, proiectat pentru fixarea termoizolațiilor din polistiren (EPS) pe fațade. Corpul din polipropilenă asigură rezistență mecanică, iar cuiul din PA elimină complet punțile termice.', specificatii: ['Corp: Polipropilenă (PP) — rezistentă UV, anti-îmbătrânire','Cui: Poliamidă 6.6 (PA66) — termoizolant, fără punte termică','Diametru cui: Ø5.5mm','Diametru corp: Ø10mm','Diametru rozeță: Ø55mm (standard) sau Ø60–90mm (zone mari)','Suporturi: Cărămidă plină, BCA, Beton','Lungimi: 70–260mm','Ambalare: 100 buc / cutie'], variante: '10x70 … 10x260ZM', livrare: '100 buc/cutie', badge: 'Produs propriu' },
  'dibluri-metalice': { slug: 'dibluri-metalice', titlu: 'Dibluri Cui Metalic Zincat', categorie: 'Dibluri', descriere: 'Diblu cu cui din oțel zincat — soluția de înaltă rezistență pentru fixarea polistirenului și a vatei minerale pe fațade.', specificatii: ['Corp: PP UV-stabilizat','Cui: Oțel zincat electrolitic C3','Diametru cui: Ø5.5mm','Diametru corp: Ø10mm','Suporturi: Cărămidă, BCA, Beton','Lungimi: 120–260mm','Ambalare: 200/100 buc/cutie'], variante: '10x120 … 10x260ZM', livrare: '200 buc/cutie (120–180mm)', badge: 'Produs propriu' },
  'flansa-vata': { slug: 'flansa-vata', titlu: 'Flanșă Vată Minerală', categorie: 'Flanșe', descriere: 'Disc plastic circular cu rozeță extinsă Ø120–140mm, model cu spite duble. Proiectat pentru fixarea vatei minerale și a polistirenului pe fațade.', specificatii: ['Material: PP cu stabilizatori UV','Formă: Disc cu spite duble','Diametru rozeță: Ø120–140mm','Gaură centrală: Ø10mm','Compatibil: Vată minerală, EPS, EPS-G','Ambalare: 50–100 buc'], variante: 'Standard', livrare: 'La cerere', badge: 'Produs propriu' },
  'flansa-osb': { slug: 'flansa-osb', titlu: 'Flanșă OSB / Capac (TSF-F55)', categorie: 'Flanșe', descriere: 'Flanșă cu capac snap-on care acoperă complet capul diblului și al șurubului după montaj.', specificatii: ['Cod: TSF-F55','Material flanșă: PP injectat','Material capac: PP snap-on','Șurub inclus: galvanizat','Livrat: Set complet'], variante: 'TSF-F55', livrare: 'La cerere', badge: 'Produs propriu' },
};

const DISTRIBUITE_META: Record<string, Omit<ProdusDistribuit, 'imagine' | 'galerie'>> = {
  'suruburi-autoforante': { slug: 'suruburi-autoforante', titlu: 'Șuruburi autoforante', categorie: 'Fixare', descriere: 'Gamă completă de șuruburi autoforante din oțel zincat: pentru PAL, lemn, dulgherie, tablă, gips carton, cap hexagonal, Imbus, torbant, crestat.', badge: 'Distribuit' },
  'saibe': { slug: 'saibe', titlu: 'Șaibe metalice', categorie: 'Fixare', descriere: 'Șaibe plate, zimțate, cu EPDM și speciale — dimensiuni standard (125, 127, 436, 522, 9021).', badge: 'Distribuit' },
  'distantieri-beton': { slug: 'distantieri-beton', titlu: 'Distanțieri pentru beton', categorie: 'Accesorii', descriere: 'Distanțieri cilindrici, cu placă și rozeță pentru menținerea distanței corecte a armăturii în cofrajul de beton.', badge: 'Distribuit' },
  'ancore-conexpand': { slug: 'ancore-conexpand', titlu: 'Ancoră Conexpand cu cep', categorie: 'Fixare', descriere: 'Ancoră mecanică Conexpand cu cep de expansiune — fixare structurală în beton și zidărie masivă.', badge: 'Distribuit' },
  'tije-filetate': { slug: 'tije-filetate', titlu: 'Tije filetate', categorie: 'Fixare', descriere: 'Tije filetate din oțel zincat, filete metrice standard.', badge: 'Distribuit' },
  'agatatori-carlige': { slug: 'agatatori-carlige', titlu: 'Agățători și cârlige', categorie: 'Accesorii', descriere: 'Agățători și cârlige metalice zincate — diverse forme și portanțe.', badge: 'Distribuit' },
  'piulite': { slug: 'piulite', titlu: 'Piulițe metrice', categorie: 'Fixare', descriere: 'Piulițe hexagonale metrice din oțel zincat, clase 6/8/10, filete M4–M20.', badge: 'Distribuit' },
  'dibluri-beton': { slug: 'dibluri-beton', titlu: 'Dibluri pentru beton', categorie: 'Dibluri', descriere: 'Dibluri distanțier pentru fixare în beton armat.', badge: 'Distribuit' },
  'dibluri-caramida': { slug: 'dibluri-caramida', titlu: 'Dibluri pentru cărămidă', categorie: 'Dibluri', descriere: 'Dibluri universale pentru cărămidă plină și cu goluri.', badge: 'Distribuit' },
  'diblu-gips-carton': { slug: 'diblu-gips-carton', titlu: 'Dibluri pentru gips-carton', categorie: 'Dibluri', descriere: 'Dibluri autoforante pentru gips-carton — fără pre-găurire.', badge: 'Distribuit' },
  'diblu-schela': { slug: 'diblu-schela', titlu: 'Diblu pentru schelă', categorie: 'Dibluri', descriere: 'Diblu special pentru ancorarea schelelor de fațadă.', badge: 'Distribuit' },
  'distantier-gresie': { slug: 'distantier-gresie', titlu: 'Distanțier gresie', categorie: 'Accesorii', descriere: 'Distanțieri T și cross pentru rosturi uniforme la pozarea gresiei și faianței.', badge: 'Distribuit' },
  'seturi-graduri': { slug: 'seturi-graduri', titlu: 'Seturi șuruburi cu diblu', categorie: 'Fixare', descriere: 'Seturi complete șurub + diblu preambalate pentru fixare rapidă.', badge: 'Distribuit' },
  'capace-teava': { slug: 'capace-teava', titlu: 'Capace pentru țeavă', categorie: 'Accesorii', descriere: 'Capace de protecție pentru capătul țevilor rotunde și rectangulare.', badge: 'Distribuit' },
  'coltar-pvc': { slug: 'coltar-pvc', titlu: 'Colțar PVC cu plasă', categorie: 'Profile', descriere: 'Colțar PVC cu plasă din fibră de sticlă pentru colțurile exterioare la termoizolație.', badge: 'Distribuit' },
  'profil-colt-exterior': { slug: 'profil-colt-exterior', titlu: 'Profil colț cu picurător', categorie: 'Profile', descriere: 'Profil de colț cu picurător pentru finisarea colțurilor exterioare.', badge: 'Distribuit' },
  'profil-etansare-tamplarie': { slug: 'profil-etansare-tamplarie', titlu: 'Profil etanșare tâmplărie', categorie: 'Profile', descriere: 'Profil autoadeziv pentru etanșarea tâmplăriei PVC/aluminiu.', badge: 'Distribuit' },
  'profil-soclu': { slug: 'profil-soclu', titlu: 'Profil de soclu', categorie: 'Profile', descriere: 'Profil aluminiu de soclu pentru pornirea sistemului ETICS la bază.', badge: 'Distribuit' },
  'profil-dilatatie': { slug: 'profil-dilatatie', titlu: 'Profil dilatație', categorie: 'Profile', descriere: 'Profil pentru rosturile de dilatație în sistemele de fațadă.', badge: 'Distribuit' },
};

export async function GET(req: Request) {
  const { env } = getRequestContext();
  const r2 = (env as any).PLASTDU_IMAGES as R2Bucket | undefined;
  const kv = (env as any).PLASTDU_CONTENT as KVNamespace | undefined;
  if (!r2 || !kv) return Response.json({ error: 'R2 or KV not bound' }, { status: 503 });

  const url = new URL(req.url);
  const section = url.searchParams.get('section'); // 'fabricate' | 'distribuite' | null (both)

  const results: any = { fabricate: [], distribuite: [] };
  const fabricateEntries: ProdusFabricat[] = [];
  const distribuiteEntries: ProdusDistribuit[] = [];

  if (!section || section === 'fabricate') {
    // Process ALL fabricate products în PARALEL
    const fabricatePromises = Object.keys(PRODUSE_MAP.fabricate).map(async (slug) => {
      const src = (PRODUSE_MAP.fabricate as any)[slug];
      const meta = FABRICATE_META[slug];
      // Toate imaginile pentru acest produs în paralel
      const imgResults = await Promise.all(
        src.images.map((id: string, i: number) => processImage(r2, slug, i, id))
      );
      const paths = imgResults.filter(r => r.path).map(r => r.path!);
      const errors = imgResults.filter(r => r.error).map((r, i) => ({ index: i, error: r.error }));
      return { slug, entry: { ...meta, imagine: paths[0] || '', galerie: paths.slice(1) }, log: { slug, uploaded: paths.length, errors } };
    });
    const fabricateResults = await Promise.all(fabricatePromises);
    for (const r of fabricateResults) {
      fabricateEntries.push(r.entry);
      results.fabricate.push(r.log);
    }
  }

  if (!section || section === 'distribuite') {
    const distribuitePromises = Object.keys(PRODUSE_MAP.distribuite).map(async (slug) => {
      const src = (PRODUSE_MAP.distribuite as any)[slug];
      const meta = DISTRIBUITE_META[slug];
      if (!meta) return null;
      const imgResults = await Promise.all(
        src.images.map((id: string, i: number) => processImage(r2, slug, i, id))
      );
      const paths = imgResults.filter(r => r.path).map(r => r.path!);
      const errors = imgResults.filter(r => r.error).map((r, i) => ({ index: i, error: r.error }));
      return { slug, entry: { ...meta, imagine: paths[0] || '', galerie: paths.slice(1) }, log: { slug, uploaded: paths.length, errors } };
    });
    const distribuiteResults = (await Promise.all(distribuitePromises)).filter(Boolean) as any[];
    for (const r of distribuiteResults) {
      distribuiteEntries.push(r.entry);
      results.distribuite.push(r.log);
    }
  }

  // Merge with existing KV data if only one section was processed
  const existingRaw = await kv.get('produse');
  const existing = existingRaw ? JSON.parse(existingRaw) : { fabricate: [], distribuite: [] };

  const produseData = {
    fabricate: fabricateEntries.length > 0 ? fabricateEntries : existing.fabricate,
    distribuite: distribuiteEntries.length > 0 ? distribuiteEntries : existing.distribuite,
  };
  await kv.put('produse', JSON.stringify(produseData));

  return Response.json({
    ok: true,
    message: `Bootstrap complet: ${produseData.fabricate.length} fabricate + ${produseData.distribuite.length} distribuite. Paralel processing.`,
    section: section || 'all',
    results,
  });
}
