# Structură Site Propusă — plastdu.ro (Redesign B2B)

> Site de prezentare, fără vânzare online | Target: B2B — firme construcții, antreprenori, distribuitori

---

## Arhitectură pagini

```
plastdu.ro/
├── / (Acasă)
├── /despre-noi
├── /produse/
│   ├── /produse/dibluri/
│   │   ├── diblu-cui-plastic
│   │   ├── diblu-cui-plastic-zona-mare
│   │   ├── diblu-cui-metalic
│   │   ├── diblu-beton
│   │   ├── diblu-caramida
│   │   └── diblu-gips-carton
│   ├── /produse/flanse/
│   │   ├── flansa-vata-minerala   ← PRODUS FABRICAT — pagina hero
│   │   ├── flansa-osb             ← PRODUS FABRICAT — pagina hero
│   │   └── flansa-cu-capac-tsf
│   ├── /produse/distantieri/
│   │   ├── distantier-placa
│   │   ├── distantier-beton
│   │   └── distantier-gresie
│   └── /produse/accesorii/
│       ├── suruburi
│       ├── saibe
│       ├── tije-filetate
│       ├── piulite
│       ├── profile-constructii
│       └── agatatoare-carlige
├── /aplicatii/               ← secțiune cheie B2B
│   ├── fixare-polistiren
│   ├── fixare-vata-minerala
│   ├── placi-gips-carton
│   └── constructii-osb
├── /catalog               ← PDF descărcabil
└── /contact
```

---

## Pagini cheie — detalii

### Homepage `/`
- **Hero:** Tagline B2B focusat pe produs fabricat — ex: *"Soluții de prindere pentru construcții. Fabricate în România."*
- Highlight 2 produse fabricate (flanșe + dibluri) cu imagine profesională
- 3 argumente B2B: Calitate / Livrare rapidă / Stoc permanent
- CTA: **"Cere ofertă"** (formular sau WhatsApp) — nu "Cumpără"
- Sectiune logos clienți / parteneri (dacă există)

### Pagina produs `/produse/flanse/flansa-vata-minerala`
- Galerie foto (3-5 imagini profesionale)
- Descriere tehnică: material, diametru, aplicații recomandate
- **Tabel specificații tehnice** (dimensiuni disponibile, sarcina de ancorare)
- Aplicații: "Folosit pentru fixarea vatei minerale pe fațade ventilate, ETICS"
- CTA: **"Solicită ofertă pentru acest produs"** → formular pre-completat cu produsul
- Download fișă tehnică PDF (dacă există)

### Pagina Aplicații `/aplicatii/fixare-polistiren`
- Explică în limbaj B2B: *"Ce sistem de prindere alegem pentru polistiren extrudat pe BCA?"*
- Recomandă produsele Plast Du IV cu link direct
- Imagini de montaj / șantier (dacă clientul are)
- Atrage trafic SEO de la ingineri, șefi șantier, devizști

### Contact `/contact`
- Formular simplu: Nume firmă, Telefon, Email, Mesaj/produs de interes
- WhatsApp Business direct
- Adresă + Google Maps embed
- Program de lucru

---

## Tone of voice B2B

- **Nu:** "Cumpără acum", "Adaugă în coș", prețuri afișate
- **Da:** "Solicită ofertă", "Cere catalogul", "Contactează-ne pentru preț en-gros"
- Limbaj tehnic, direct, fără superlative
- Pagini de produs scurte și dense în informații tehnice

---

## Stack tehnic recomandat

| Opțiune | Pro | Con |
|---|---|---|
| **Next.js static** (recomandat) | Rapid, SEO excelent, Cloudflare Pages gratuit | Necesită dev React |
| WordPress + Elementor | Ușor de editat de client | Mai lent, mai greu de securizat |
| Webflow | Design rapid, fără dev | Cost lunar, mai puțin flexibil |

**Recomandare:** Next.js + Cloudflare Pages (echipa are deja acces Cloudflare activ)

---

## Ce mai lipsește pentru a începe

- [ ] Poze flanșe OSB (absent complet din Drive)
- [ ] Refilmare dibluri zona mare (watermark telefon)
- [ ] Logo vectorial client
- [ ] Denumiri oficiale și dimensiuni pentru fiecare produs fabricat
- [ ] Confirmare dacă vor catalog PDF descărcabil
- [ ] Texte despre companie (sau îl scriem noi)
