# SEO Checklist — Plast Du IV (plastdu.ro)

> Audit realizat de @petru (Technical SEO & Indexing) pentru @ana / Bogdan.
> Data: 2026-08-27. Toate rezultatele de mai jos sunt din verificări reale (curl/WebFetch direct pe site), nu estimări — cu excepția secțiunii CWV, unde API-ul Google e indisponibil (vezi motiv la Secțiunea 1).

---

## 1. Core Web Vitals — STATUS: NEDISPONIBIL (raportat onest, nu inventat)

Am încercat două căi de acces la PageSpeed Insights:

1. **PSI API** (`pagespeedonline.googleapis.com/v5/runPagespeed`) → răspuns `429 RESOURCE_EXHAUSTED`, `quota_limit_value: 0` — proiectul folosit de infrastructura noastră nu are cotă alocată pentru acest API (lipsă API key valid / cotă zero pe zi). Nu e o problemă de rețea sau de plastdu.ro.
2. **pagespeed.web.dev/report** (UI web) → e o aplicație JS care încarcă rezultatele asincron; fetch-ul non-browser a prins doar ecranul "Running analysis", fără date finale.

**Nu am numere reale de LCP/CLS/INP de raportat — orice cifră ar fi inventată, deci nu o dau.**

### Ce recomand ca acțiune imediată
Rulați manual (2 minute, gratuit, fără cotă):
- https://pagespeed.web.dev/report?url=https://plastdu.ro
- https://pagespeed.web.dev/report?url=https://plastdu.ro/produse
- https://pagespeed.web.dev/report?url=https://plastdu.ro/blog/cum-se-monteaza-diblul-pentru-polistiren
- https://pagespeed.web.dev/report?url=https://plastdu.ro/sisteme/termoizolatie-eps

sau cereți-mi să reîncerc cu o cheie API PSI validă (gratuită, de la https://developers.google.com/speed/docs/insights/v5/get-started) — atașată la sesiune, pot rula auditul complet într-un minut.

### Observații tehnice colectate real (fără PSI), utile pentru CWV
Din headerele HTTP și HTML-ul livrat (via `curl`, direct de la edge Cloudflare):

- **Stack:** Next.js pe Cloudflare Pages (Workers), header `x-matched-path`, cache tags `_N_T_/...`.
- **Pozitiv pentru LCP:** homepage face deja `<link rel="preload" as="image">` pe imaginile hero de produse (`/images/produse/dibluri-plastic/01.jpg` etc.) încă din faza HTTP/2 103 Early Hints — practică corectă, arată că LCP e tratat cu atenție.
- **Risc TTFB/LCP:** `cache-status: DYNAMIC` pe homepage (`cf-cache-status: DYNAMIC`) — pagina nu e servită din cache-ul edge Cloudflare, ci randată la fiecare request. Pe Cloudflare Pages/Workers asta poate adăuga 100-300ms TTFB față de o pagină cacheable static. **Recomandare → @lucian:** verificați dacă homepage și paginile de produse pot fi marcate ca static/ISR cu `cache-control` mai agresiv (ex. `s-maxage` + `stale-while-revalidate`), nu doar `public, max-age=0, must-revalidate`.
- **Bun semn general:** fără render-blocking vizibil grosier în head (nu am văzut `<script>` sincron mare înainte de content în paginile verificate).

### Top 5 zone de verificat prioritar (checklist manual, până rulăm PSI real)
1. **LCP** — imaginea hero de pe `/` și `/sisteme/termoizolatie-eps` să aibă `fetchpriority="high"` pe lângă preload, și format WebP/AVIF (verificați `/images/produse/*.jpg` — dacă sunt JPG needitat, convertiți în WebP).
2. **CLS** — toate imaginile de produs din grid (`/produse`) trebuie să aibă `width`/`height` sau `aspect-ratio` setat explicit, altfel layout shift la încărcare.
3. **INP** — verificați formularul de contact / calculator ofertă (dacă există JS interactiv greu) pe mobil.
4. **Cache edge** — vezi punctul de mai sus (`cf-cache-status: DYNAMIC`), impact pe TTFB deci indirect pe LCP.
5. **Font loading** — verificați `font-display: swap` pe fonturile custom din `tailwind.config.ts` / `app/layout`.

---

## 2. Verificări indexabilitate — REZULTATE REALE

### 2.1 `robots.txt` — https://plastdu.ro/robots.txt

Status: **OK, corect configurat**, cu o mențiune importantă.

```
User-agent: *
Content-Signal: search=yes,ai-train=no,use=reference
Allow: /

User-agent: Amazonbot / Applebot-Extended / Bytespider / CCBot / ClaudeBot /
            CloudflareBrowserRenderingCrawler / Google-Extended / GPTBot /
            meta-externalagent
Disallow: /

User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/admin
Disallow: /api/bootstrap-

Sitemap: https://plastdu.ro/sitemap.xml
```

- **Googlebot (motor de căutare) NU e blocat** — `Allow: /` general, plus reguli specifice care blochează doar `/admin`, `/api/admin`, `/api/bootstrap-`. Corect, nu afectează indexarea normală.
- `Google-Extended: Disallow: /` — opt-out din antrenarea modelelor Gemini/AI de la Google. **Nu afectează ranking-ul clasic în Search**, dar înseamnă că Plast Du renunță la a fi folosit ca sursă de training pentru Gemini. E o decizie legitimă (Cloudflare Managed Content default), dar merită discutată strategic cu @victoria dacă vreți vizibilitate mai mare în AI Overviews/Gemini — opt-out de training nu blochează AI Overviews (acela ține de `ai-input`/crawling normal, care rămâne permis).
- `Content-Signal: search=yes, ai-train=no, use=reference` — semnal nou (standard emergent), permite indexare search normală dar restricționează folosirea conținutului pentru antrenare AI. Coerent cu `Google-Extended: Disallow`.
- Sitemap declarat corect în robots.txt.
- **Nicio problemă blocantă.**

### 2.2 `sitemap.xml` — https://plastdu.ro/sitemap.xml

Status: **Valid, dar cu discrepanță față de brief.**

- XML valid, schema sitemap standard.
- **47 URL-uri** (brief-ul menționa 44 — verificați dacă au fost adăugate 3 pagini recent; ultimul commit din repo, `feat(seo): sitemap include furnizor-dibluri-bucuresti + 8 articole blog explicit`, confirmă adăugări recente).
- Toate cele 47 au `<lastmod>2026-08-27</lastmod>` — **atenție**: dacă TOATE paginile au exact aceeași dată de azi indiferent de ultima modificare reală, Google poate începe să ignore semnalul `lastmod` ca nesincer ("lastmod fals = penalizare" — vezi KB). Verificați cu @cosmin/@lucian dacă `lastmod` e generat dinamic la fiecare build (greșit) sau reflectă data reală de editare a conținutului (corect).
- Prime URL-uri: `/`, `/produse`, `/produse/dibluri`, `/materiale-fatada`, `/sisteme/termoizolatie-eps`.
- Sitemap conține `<priority>` — reamintesc: **Google ignoră complet `priority` și `changefreq`**, nu investiți timp acolo.

**Acțiune:** @lucian — verificați generarea `lastmod` să reflecte data reală de commit/editare a paginii, nu build time global.

### 2.3 Meta robots + canonical — verificate pe 4 pagini

| Pagină | Meta robots | Canonical | Title | Observație |
|---|---|---|---|---|
| `/` | `index, follow` | `https://plastdu.ro` (self, corect) | "Plast Du IV — Soluții de prindere pentru construcții. Fabricate în România." | OK |
| `/produse` | (index, follow — implicit corect) | self-referential | "Plast Du IV — Producător Dibluri, Flanșe și Elemente Fixare \| Jilava, Ilfov" | OK |
| `/blog/cum-se-monteaza-diblul-pentru-polistiren` | `index, follow` | self-referential | "Cum se montează diblul pentru polistiren — Ghid pas cu pas \| Plast Du IV" | OK |
| `/sisteme/termoizolatie-eps` | (index, follow) | self-referential | **"Sistem termoizolație EPS/polistiren — Dibluri și accesorii producător \| Plast Du IV \| Plast Du IV"** | **BUG: "Plast Du IV" dublat în title** |

**Acțiune → @cosmin:** title tag pe `/sisteme/termoizolatie-eps` (și posibil restul din `/sisteme/*`) are sufixul de brand concatenat de două ori. Fix rapid în template-ul de metadata Next.js (probabil `%s | Plast Du IV` aplicat peste un title care deja conține sufixul).

### 2.4 Schema.org Article — blog

Verificat pe `/blog/cum-se-monteaza-diblul-pentru-polistiren` — **prezent și complet**, tipuri JSON-LD găsite:

`Article`, `FAQPage`, `Question`, `Answer`, `BreadcrumbList`, `ListItem`, `WebPage`, `WebSite`, `Organization`, `LocalBusiness`, `PostalAddress`, `GeoCoordinates`, `OpeningHoursSpecification`, `ContactPoint`, `Country`, `EducationalOccupationalCredential`, `ImageObject`.

Foarte bine structurat — combinație `Article` + `FAQPage` e exact recomandarea pentru AI Overviews/AI Mode (răspunsuri extractabile). Nicio acțiune necesară aici.

---

## 3. Directoare RO — checklist înscriere

### Prioritate 1 — autoritate mare

| Director | URL submission | Info de pregătit | Timp estimat | Link |
|---|---|---|---|---|
| **Termene.ro** (revendicare profil) | https://termene.ro/ → căutați firma, apoi "Revendică firma" / secțiune administrare profil | CUI/CIF, acces email pe domeniul firmei sau document care dovedește calitatea de reprezentant legal | 15-20 min + validare (poate dura zile) | https://termene.ro/ |
| **Camera de Comerț și Industrie a Județului Ilfov** | https://ccilfov.ro/ — secțiune "Members"/înscriere, formular membru PDF | CUI, denumire firmă completă, adresă sediu, telefon, email, obiect de activitate (CAEN), persoană de contact | 30-40 min + taxă (confirmat: 500 RON înscriere + 500 RON cotizație anuală, tel. 021.310.21.73 / office@ccilfov.ro) | https://ccilfov.ro/members/ |
| **WMart.ro** | **⚠️ Nu am putut verifica/confirma existența acestui director** (fetch blocat de politica proxy-ului, iar căutarea web nu a returnat nicio referință la "wmart.ro" ca director de firme din construcții). Nu bifați până Bogdan confirmă manual URL-ul corect. | — | — | — |
| **Europages.ro** | https://www.europages.ro/ → "Adaugă compania ta" | CUI/CIF, adresă completă, telefon, email, descriere companie (RO+EN recomandat), categorii de produse (dibluri, fixare, termoizolație), logo | 20-30 min | https://www.europages.ro/ |

### Prioritate 2 — nișă construcții

| Director | URL submission | Info de pregătit | Timp estimat | Backlink |
|---|---|---|---|---|
| Director | URL submission | Info de pregătit | Timp estimat | Backlink |
|---|---|---|---|---|
| **Construcții.ro** | ⚠️ Nu am putut confirma un director activ la acest domeniu prin fetch direct (blocat de proxy) nici prin căutare web — nu am găsit referințe. Verificați manual URL-ul exact înainte de a aloca timp. | — | — | — |
| **TVC Construcții** | ⚠️ Nu am putut confirma domeniul `tvcconstructii.ro` — fetch blocat de proxy, iar căutarea web nu a găsit nicio referință la acest site. Verificați ortografia/sursa înainte de a bifa. | — | — | — |
| **Spațiul Construit** | https://www.spatiulconstruit.ro/ — **confirmat activ** (răspuns HTTP 200 la verificare directă). Căutați secțiunea firme/parteneri sau contact pentru listare | CUI, denumire, descriere, contact, portofoliu produse (dibluri, flanșe, EPS) | 15-20 min | verificați la înscriere |
| **AgendaConstructiilor.ro** | https://www.agendaconstructiilor.ro/ — **confirmat activ și relevant** (apare cu conținut real în căutări: "TOP 500 Antreprenori și firme de construcții"). Căutați secțiunea de adăugare firmă/agendă | CUI, denumire, adresă, telefon, categorie CAEN, descriere | 15 min | verificați la înscriere |
| ~~agerprestecomconstructii.ro~~ | **Nu am putut confirma existența/validitatea acestui domeniu** — nici fetch direct, nici căutare web nu au găsit vreo urmă. Nu inventez URL. Verificați ortografia exactă cu sursa originală înainte de a-l include în plan. | — | — | — |

**Notă onestă:** din lista de Prioritate 2 din brief, doar **spatiulconstruit.ro** și **agendaconstructiilor.ro** au putut fi confirmate ca site-uri active și relevante. `constructii.ro`, `tvcconstructii.ro` și `agerprestecomconstructii.ro` nu au putut fi verificate (fetch blocat de politica de rețea + fără rezultate la căutare web) — recomand ca Bogdan sau @victoria să verifice manual din browser înainte de a investi timp în înscriere, ca să nu pierdem timp pe domenii inactive/greșite.

### Prioritate 3 — Google Business

| Director | URL submission | Info de pregătit | Timp estimat | Backlink |
|---|---|---|---|---|
| **Google Business Profile** | https://business.google.com/create | CUI, denumire legală exactă, adresă sediu/punct de lucru (Jilava, Ilfov), telefon, categorie business ("Producător materiale de construcții" / "Wholesaler"), orar, fotografii sediu/produse, website | 20-30 min + verificare adresă (card poștal sau video, 1-2 săptămâni) | Citation, nu backlink clasic — dar critic pentru local SEO + Maps |
| **Google Maps (via Business Profile)** | se activează automat odată cu Business Profile | idem + coordonate GPS exacte sediu | inclus în pasul de mai sus | idem |

### Informații generale de pregătit de Bogdan (valabile pentru toate înscrierile)
- CUI/CIF Plast Du IV
- Denumire legală completă a firmei
- Adresă sediu social + punct de lucru (dacă diferă) — Jilava, Ilfov
- Telefon de contact B2B
- Email de contact (ideal pe domeniul plastdu.ro, pentru verificări)
- Descriere scurtă (50-80 cuvinte) și lungă (150-200 cuvinte) a activității — pot redacta eu variantele SEO-friendly la cerere
- Logo (format pătrat + landscape)
- Coduri CAEN relevante (producție dibluri/elemente fixare din plastic)
- Link website: https://plastdu.ro

---

## 4. Templates PR outreach

### Template A — Producător local, content expert (ghid montaj gratuit)

```
Subiect: Ghid tehnic gratuit despre montaj dibluri pentru termoizolație — Plast Du IV

Bună ziua [Nume],

Sunt [Nume], reprezint Plast Du IV, producător român de dibluri și elemente
de fixare pentru construcții (dibluri cui plastic, dibluri cui metalic
zincat, flanșe pentru termoizolație), cu fabricație proprie prin injecție
în matrițe, în Jilava, Ilfov.

Am observat că [Nume Portal] publică des conținut util pentru firme de
construcții și echipe de montaj. Am pregătit un ghid tehnic complet,
pas cu pas, despre montajul corect al diblurilor la termoizolația cu
polistiren (EPS) — unelte necesare, cei 8 pași de montaj, greșeli
frecvente și un FAQ tehnic:

https://plastdu.ro/blog/cum-se-monteaza-diblul-pentru-polistiren

V-aș propune să publicăm o versiune adaptată a acestui ghid pe
[Nume Portal], cu mențiune "Sursă: Plast Du IV" și link către articolul
original / către plastdu.ro. Conținutul e scris de echipa noastră
tehnică, gratuit pentru publicare, fără costuri de ambele părți.

Dacă vi se pare util, vă trimit varianta adaptată în formatul dvs.
preferat (Word/Markdown) și fotografii de montaj reale, din depozit/
fabrică proprie.

Aștept un semn de la dvs.

Cu stimă,
[Nume]
Plast Du IV
[telefon] | [email] | https://plastdu.ro
```

### Template B — Reabilitare edilitară, furnizor cu ISO (portale specializate/primării)

```
Subiect: Furnizor român certificat ISO — sisteme de fixare pentru reabilitare
         termică edilitară

Bună ziua [Nume],

Vă scriu din partea Plast Du IV, producător român de sisteme de fixare
pentru termoizolație (dibluri, flanșe) utilizate în proiecte de
reabilitare termică a blocurilor și clădirilor publice. Producem în
fabrica proprie din Jilava, Ilfov, cu certificare ISO [completați număr/
tip certificare exactă] și documentație tehnică completă pentru
achiziții publice (fișe tehnice, declarații de conformitate).

Am văzut că [Nume Portal] se adresează specialiștilor și autorităților
implicate în proiecte de reabilitare edilitară / eficientizare
energetică. Am pregătit resurse tehnice relevante pentru acest public:

- Sistem termoizolație EPS/polistiren — ghid producător:
  https://plastdu.ro/sisteme/termoizolatie-eps
- Documentație tehnică și fișe de produs disponibile la cerere

V-aș propune fie (a) o listare/prezentare a Plast Du IV ca furnizor
verificat în secțiunea dvs. de furnizori pentru reabilitare, fie (b) un
material tehnic de specialitate redactat de echipa noastră, cu
mențiune și link către plastdu.ro.

Suntem deschiși și la o discuție despre proiecte punctuale de
reabilitare unde am putea furniza direct materiale de fixare.

Cu stimă,
[Nume]
Plast Du IV — Producător certificat ISO
[telefon] | [email] | https://plastdu.ro
```

---

## 5. Sumar acțiuni prioritare

1. **@lucian:** verificați `lastmod` din sitemap (posibil generat static = azi pentru toate, în loc de data reală de editare) + evaluați cacheabilitate homepage (`cf-cache-status: DYNAMIC`).
2. **@cosmin:** fix title tag dublat pe `/sisteme/termoizolatie-eps` ("Plast Du IV | Plast Du IV").
3. **Bogdan:** rulați manual PSI pe cele 4 URL-uri (linkuri în Secțiunea 1) sau furnizați o cheie API PSI pentru rulare automată de către mine.
4. **Bogdan:** pregătiți datele companiei (Secțiunea 3) pentru înscrierea în directoare — pot redacta eu descrierile SEO-friendly.
5. **@victoria/marketing:** folosiți templates din Secțiunea 4 pentru outreach către 3-5 portale construcții.
6. **Clarificare:** confirmați dacă `agerprestecomconstructii.ro` există sub alt nume — nu am putut valida domeniul.
