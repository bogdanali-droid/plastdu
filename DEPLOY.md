# Deploy plastdu.ro pe Cloudflare Pages

## Setup initial (o singura data)

### 1. Instaleaza wrangler
```bash
npm install -g wrangler
wrangler login
```

### 2. Creeaza proiectul in Cloudflare Pages
```bash
wrangler pages project create plastdu
```

### 3. Seteaza secretele GitHub
In repo Settings → Secrets → Actions, adauga:
- `CLOUDFLARE_API_TOKEN` — din Cloudflare dashboard → API Tokens
- `CLOUDFLARE_ACCOUNT_ID` — `6726bcc0f0d403666529923eafede65b`

## Deploy manual (development/staging)

```bash
npm install
npx @cloudflare/next-on-pages
wrangler pages deploy .vercel/output/static --project-name=plastdu
```

## Deploy automat

Orice push pe `main` → GitHub Actions → Cloudflare Pages automat.

## URL-uri
- **Staging:** `https://plastdu.pages.dev`
- **Productie:** `https://plastdu.ro` (dupa conectare domeniu)

## Conectare domeniu plastdu.ro
1. Cloudflare Dashboard → Pages → plastdu → Custom domains
2. Adauga `plastdu.ro` si `www.plastdu.ro`
3. Actualizeaza DNS la registrar cu nameserverele Cloudflare
