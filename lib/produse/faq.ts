export interface ProdusFaqItem {
  intrebare: string;
  raspuns: string;
}

/** FAQ per produs (slug). Minimum 3 întrebări per produs cu FAQ definit. */
export const PRODUSE_FAQ: Record<string, ProdusFaqItem[]> = {
  "dibluri-plastic": [
    {
      intrebare: "Ce lungimi standard au diblurile cu cui plastic?",
      raspuns:
        "Diblurile cu cui plastic (poliamidă) Plast Du IV sunt disponibile în lungimi standard de 70, 90, 120, 140, 160, 180 și 200mm, plus variantele ZM (Zonă Mare) de 180, 220, 240 și 260mm pentru zidărie cu goluri sau straturi groase de tencuială/adeziv. Lungimea corectă se alege în funcție de grosimea plăcii de termoizolație plus grosimea stratului de adeziv, la care se adaugă adâncimea minimă de ancoraj în suport (45mm pentru beton, mai mult pentru cărămidă cu goluri).",
    },
    {
      intrebare: "Când folosesc diblu cu cui plastic și când unul metalic?",
      raspuns:
        "Diblul cu cui plastic este soluția recomandată pentru sisteme ETICS standard cu polistiren expandat, unde eficiența termică este prioritară — cuiul din poliamidă elimină complet puntea termică. Diblul cu cui metalic zincat se recomandă pentru vată minerală, zone cu solicitări mecanice mari (colțuri, atic, zone înalte expuse la vânt) sau cărămidă cu goluri, unde forța de extragere trebuie să fie superioară.",
    },
    {
      intrebare: "Cum se montează corect un diblu pentru polistiren?",
      raspuns:
        "Se dă gaură cu burghiul la diametrul și adâncimea recomandate (de regulă Ø10mm), se introduce corpul diblului până la refuz cu rozeta lipită de suprafața polistirenului, apoi se bate cuiul central până se fixează complet. Montajul greșit — gaură prea scurtă, cui neintrodus complet sau rozetă care nu presează uniform placa — reduce semnificativ forța de smulgere și poate compromite stabilitatea termosistemului.",
    },
    {
      intrebare: "Cum sunt ambalate diblurile — la câte bucăți per pungă/cutie?",
      raspuns:
        "Diblurile cu cui plastic Plast Du IV sunt ambalate standard 100 de bucăți per pungă sau cutie, indiferent de lungime. Pentru comenzi en-gros, ambalarea se poate adapta la cerințele șantierului sau depozitului — contactați-ne pentru cantități personalizate și paletizare.",
    },
  ],
  "dibluri-metalice": [
    {
      intrebare: "Când aleg diblu cu cui metalic în locul celui din plastic?",
      raspuns:
        "Diblul cu cui metalic zincat se recomandă atunci când sistemul de termoizolație folosește vată minerală (nu doar polistiren), în zonele cu solicitare mecanică ridicată — colțuri, atic, ultimele niveluri ale clădirilor înalte, expuse la vânt puternic — sau pe zidărie cu goluri, unde este necesară o versiune ZM. Cuiul metalic oferă o forță de extragere net superioară față de cel din plastic.",
    },
    {
      intrebare: "Ce rezistență mecanică au diblurile cu cui metalic zincat?",
      raspuns:
        "Cuiul din oțel zincat asigură o forță de extragere ridicată, superioară variantei cu cui din poliamidă, fiind proiectat pentru solicitări mecanice mari specifice zonelor de colț, atic sau clădirilor cu regim de înălțime mare, unde acțiunea vântului este mai puternică. Corpul din polipropilenă Ø10mm rămâne identic din punct de vedere al ancorării în suport.",
    },
    {
      intrebare: "Rezistă diblurile cu cui metalic la temperaturi extreme?",
      raspuns:
        "Da, diblurile cu cui metalic zincat Plast Du IV sunt proiectate pentru un interval de temperatură de utilizare de -40°C…+80°C, adecvat climatului din România, atât pentru montaj pe timp de iarnă (respectând totuși temperatura minimă recomandată de adeziv/tencuială), cât și pentru expunere îndelungată la soare directă pe fațadele sudice.",
    },
    {
      intrebare: "Ruginesc diblurile cu cui metalic în timp?",
      raspuns:
        "Cuiul este din oțel zincat (protecție anticorozivă prin zincare), rezistent la umiditatea din stratul de termoizolație pe toată durata de viață a sistemului ETICS. Corpul diblului, din polipropilenă, nu este afectat de coroziune. Pentru medii cu umiditate foarte ridicată sau expunere marină, recomandăm consultarea unui specialist pentru soluții suplimentare de protecție.",
    },
  ],
  "flansa-vata": [
    {
      intrebare: "Cu ce dibluri este compatibilă flanșa pentru vată minerală?",
      raspuns:
        "Flanșa pentru vată minerală este compatibilă atât cu diblurile cu cui plastic, cât și cu cele cu cui metalic zincat Plast Du IV, fiind proiectată să se monteze peste corpul standard Ø10mm al diblului. Se recomandă în special în combinație cu diblul metalic pe vată minerală, unde distribuția uniformă a forței de prindere este esențială pentru integritatea stratului izolant, mai moale decât polistirenul.",
    },
    {
      intrebare: "Ce diametre are flanșa pentru vată minerală?",
      raspuns:
        "Flanșa Plast Du IV pentru vată minerală este disponibilă cu rozetă extinsă Ø120–140mm, semnificativ mai mare decât rozeta standard Ø55mm a diblului clasic, model cu spite duble pentru distribuția uniformă a forței pe suprafața moale a vatei minerale, prevenind deformarea sau perforarea locală a izolației.",
    },
    {
      intrebare: "Cum se montează flanșa pentru vată minerală?",
      raspuns:
        "Flanșa se poziționează peste placa de vată minerală, în punctul de montaj al diblului, apoi diblul (cu cui plastic sau metalic) se introduce prin orificiul central al flanșei și se fixează normal, ca la un montaj standard. Rozeta extinsă a flanșei presează o suprafață mai mare din placa de vată, distribuind forța de prindere și reducând riscul de deteriorare a fibrei minerale în jurul punctului de fixare.",
    },
  ],
  "flansa-osb": [
    {
      intrebare: "Ce rol are capacul snap-on al flanșei TSF-F55?",
      raspuns:
        "Capacul snap-on acoperă complet capul diblului după montaj, oferind un finisaj curat și estetic, fără capete metalice sau plastic vizibile pe suprafață. Se montează prin simplă presare, fără scule suplimentare, și este util în special pe aplicații unde aspectul vizual al fixării contează — panouri OSB, finisaje aparente sau elemente decorative de fațadă.",
    },
    {
      intrebare: "Vine flanșa TSF-F55 cu șurub inclus?",
      raspuns:
        "Da, flanșa TSF-F55 este livrată ca set complet: flanșă + capac snap-on + șurub galvanizat (zincare electrochimică), pregătit pentru montaj imediat pe șantier, fără a fi nevoie de achiziționarea separată a elementelor de asamblare.",
    },
    {
      intrebare: "Pentru ce aplicații se folosește flanșa cu capac TSF-F55?",
      raspuns:
        "Flanșa TSF-F55 este recomandată pentru fixarea panourilor OSB și a altor elemente unde este nevoie de un finisaj superior, fără capete de fixare vizibile — construcții ușoare, mansarde, structuri din lemn sau elemente de fațadă cu montaj aparent, unde aspectul estetic al suprafeței finite este important.",
    },
  ],
  "suruburi-autoforante": [
    {
      intrebare: "Ce tipuri de șuruburi autoforante sunt disponibile?",
      raspuns:
        "Plast Du IV distribuie șuruburi autoforante în mai multe variante de cap (înecat, cilindric, hexagonal) și filet, adaptate pentru fixarea în tablă, lemn sau structuri metalice ușoare. Gama acoperă diametre și lungimi diferite, pentru compatibilitate cu majoritatea aplicațiilor de asamblare uzuale în construcții.",
    },
    {
      intrebare: "Cum aleg șurubul autoforant potrivit în funcție de material?",
      raspuns:
        "Alegerea depinde de grosimea și tipul materialului suport: pentru tablă subțire se folosesc șuruburi cu vârf autoforant fin, pentru structuri metalice mai groase sunt necesare vârfuri cu capacitate de perforare mai mare, iar pentru lemn se recomandă filet corespunzător cu pas mai mare. Pentru recomandarea exactă în funcție de proiectul dumneavoastră, contactați echipa Plast Du IV.",
    },
    {
      intrebare: "În ce ambalaje sunt livrate șuruburile autoforante?",
      raspuns:
        "Șuruburile autoforante sunt disponibile atât în cutii de dimensiuni standard pentru retail și depozite, cât și în cantități en-gros pentru firme de construcții și distribuitori. Contactați-ne pentru ambalare personalizată la comenzi de volum mare.",
    },
  ],
  "distantieri-beton": [
    {
      intrebare: "Cum calculez necesarul de distanțieri pentru beton?",
      raspuns:
        "Necesarul de distanțieri se calculează în funcție de suprafața cofrajului sau a armăturii și de distanța recomandată între punctele de sprijin, de regulă la interval de 50-100cm, în funcție de diametrul fierului beton și de grosimea stratului de acoperire cu beton prevăzut în proiect. Pentru plăci, fundații sau elemente verticale, densitatea de montaj poate varia — vă recomandăm să consultați proiectul tehnic de execuție.",
    },
    {
      intrebare: "Ce tipuri de distanțieri pentru beton oferă Plast Du IV?",
      raspuns:
        "Gama include distanțieri din plastic pentru fier beton, în diverse înălțimi, adaptați pentru asigurarea grosimii minime de acoperire cu beton a armăturii, conform normativelor de execuție. Sunt disponibili distanțieri liniari și punctuali, potriviți pentru plăci, fundații și elemente de rezistență diverse.",
    },
    {
      intrebare: "Cum se montează distanțierii pentru beton?",
      raspuns:
        "Distanțierii se prind direct pe barele de armătură, înainte de turnarea betonului, la intervale regulate stabilite conform proiectului de execuție, asigurând poziționarea corectă a fierului beton față de cofraj și grosimea de acoperire minimă necesară pentru protecția anticorozivă a armăturii.",
    },
  ],
  "saibe": [
    {
      intrebare: "Ce standarde DIN acoperă șaibele distribuite de Plast Du IV?",
      raspuns:
        "Plast Du IV distribuie șaibe conform standardelor uzuale din construcții — DIN 125 (șaibă plată standard), DIN 9021 (șaibă lată, cu diametru exterior mărit) și alte variante conexe, în diverse diametre, pentru compatibilitate cu șuruburile și buloanele folosite frecvent pe șantier.",
    },
    {
      intrebare: "Când folosesc o șaibă lată (DIN 9021) în loc de una standard?",
      raspuns:
        "Șaiba lată DIN 9021 se recomandă atunci când materialul de fixat este moale sau are găuri de montaj mai mari decât diametrul standard — de exemplu la fixarea în lemn, structuri ușoare sau materiale unde o suprafață de contact mai mare previne deformarea sau smulgerea îmbinării. Șaiba standard DIN 125 este suficientă pentru majoritatea aplicațiilor metalice uzuale.",
    },
    {
      intrebare: "Șaibele sunt disponibile și galvanizate/zincate?",
      raspuns:
        "Da, în gama Plast Du IV sunt disponibile variante de șaibe zincate, recomandate pentru aplicații expuse la umiditate sau montaj exterior, unde protecția anticorozivă este necesară pe termen lung. Pentru detalii despre stocul disponibil pe fiecare diametru, contactați echipa noastră.",
    },
  ],
  "coltar-pvc": [
    {
      intrebare: "Cum se montează colțarul PVC cu plasă pe fațadă?",
      raspuns:
        "Colțarul PVC cu plasă din fibră de sticlă se aplică pe muchiile verticale ale fațadei, imediat după montarea plăcilor de termoizolație, înglobat în stratul de adeziv/masă de șpaclu. Plasa integrată se întinde de o parte și de alta a colțului, asigurând o tranziție uniformă și consolidând zona cea mai expusă la impact și fisurare din întreaga fațadă.",
    },
    {
      intrebare: "În ce dimensiuni este disponibil colțarul PVC?",
      raspuns:
        "Colțarul PVC cu plasă este disponibil în lungimi standard adaptate înălțimii uzuale a unui etaj/nivel de fațadă, cu aripi de plasă de lățime suficientă pentru o ancorare solidă în stratul de adeziv. Pentru cerințe speciale de lungime sau lățime a plasei, contactați echipa Plast Du IV pentru disponibilitate.",
    },
    {
      intrebare: "Rezistă colțarul PVC la radiațiile UV pe termen lung?",
      raspuns:
        "Da, colțarul este realizat din PVC rezistent la radiațiile UV și la variațiile de temperatură specifice climatului românesc, fiind proiectat pentru a rămâne stabil dimensional și fără degradare vizibilă pe toată durata de viață a sistemului de termoizolație, odată acoperit de stratul final de finisaj/tencuială decorativă.",
    },
  ],
};

export function getProdusFaq(slug: string): ProdusFaqItem[] | undefined {
  return PRODUSE_FAQ[slug];
}
