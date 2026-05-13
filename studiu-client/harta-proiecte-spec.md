# Specificație Tehnică — Hartă Interactivă Proiecte România

## Soluție aleasă: Leaflet.js + leaflet.markercluster + OpenStreetMap

**Cost: ZERO** — tile-uri gratuite OSM, librărie open source.

## Pipeline GPS din poze Samsung

1. Clientul uploadează poze din Samsung (GPS activ) în Drive → folder `Proiecte`
2. Script Python extrage coordonatele EXIF → generează `projects.json`
3. Harta Next.js citește JSON și plasează markeri cu clustering automat

### Script extragere GPS (`extract_gps.py`)
```python
pip install Pillow piexif
# Rulare: python extract_gps.py
# Output: projects.json cu lat/lng per fotografie
```

## Funcționalități hartă
- Centrată pe România, zoom in/out liber
- Markeri clustering (grupare automată zone aglomerate)
- Popup per proiect: fotografie + nume bloc + oraș + an
- Tile CartoDB Positron (design curat, B2B)
- Mobile responsive

## Estimare implementare: 10-12 ore dev (1.5 zile)

## Date contact pentru pagina Contact
- Tel 1: 0724 658 491
- Tel 2: 0728 211 578
- Email: office@plastdu.ro
- Adresă: Str. Ana Ipătescu nr. 44, Jilava, Ilfov
