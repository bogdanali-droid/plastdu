export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');
  if (!q) return Response.json({ error: 'Missing q' }, { status: 400 });

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1&countrycodes=ro`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'plastdu.ro/1.0 (office@plastdu.ro)' },
  });

  const data = await res.json() as any[];
  if (!data.length) return Response.json({ error: 'Not found' }, { status: 404 });

  return Response.json({
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
    display: data[0].display_name,
  });
}
