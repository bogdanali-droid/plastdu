export const runtime = 'edge';

import { getRequestContext } from '@cloudflare/next-on-pages';

const DEFAULTS: Record<string, any> = {
  produse: [
    {
      id: 'suruburi',
      name: 'Șuruburi din plastic',
      description: 'Șuruburi din polipropilenă și poliamidă, rezistente chimic.',
      images: ['/images/suruburi/01.jpg'],
    },
    {
      id: 'piulite',
      name: 'Piulițe din plastic',
      description: 'Piulițe hexagonale și rotunde din PP, PE și PA.',
      images: ['/images/piulite/01.jpg'],
    },
    {
      id: 'saibe',
      name: 'Șaibe din plastic',
      description: 'Șaibe plate și etanșare din diverse materiale plastice.',
      images: ['/images/saibe/01.jpg'],
    },
  ],
  contact: {
    telefoane: ['+40 752 045 232', '+40 729 185 578'],
    email: 'office@plastdu.ro',
    adresa: 'Str. Exemplu nr. 1, București',
    program: 'Luni – Vineri: 08:00 – 17:00',
  },
  despre: {
    titlu: 'Despre Noi',
    text: 'Plastdu este un producător român de elemente de fixare din plastic.',
    cifre: [
      { valoare: '20+', eticheta: 'Ani experiență' },
      { valoare: '500+', eticheta: 'Produse' },
      { valoare: '1000+', eticheta: 'Clienți' },
    ],
    imagini: [],
  },
  proiecte: [],
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');
  if (!key || !DEFAULTS[key]) {
    return Response.json({ error: 'Invalid key' }, { status: 400 });
  }

  const { env } = getRequestContext();
  const kv = (env as any).PLASTDU_CONTENT as KVNamespace;
  const raw = await kv.get(key);
  const data = raw ? JSON.parse(raw) : DEFAULTS[key];
  return Response.json(data);
}

export async function POST(req: Request) {
  const { key, value } = await req.json();
  if (!key || !DEFAULTS[key]) {
    return Response.json({ error: 'Invalid key' }, { status: 400 });
  }

  const { env } = getRequestContext();
  const kv = (env as any).PLASTDU_CONTENT as KVNamespace;
  await kv.put(key, JSON.stringify(value));
  return Response.json({ ok: true });
}
