export const runtime = 'edge';

// IndexNow: submit rapid la Bing, Yandex, Naver, Seznam pentru URL-uri noi/actualizate
// Cheia trebuie să fie accesibilă la /IndexNow-Key.txt cu conținutul cheii
// https://www.indexnow.org/

const INDEXNOW_KEY = 'a7b2c3d4e5f6789012345678901234ab';

export async function GET() {
  return new Response(INDEXNOW_KEY, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
