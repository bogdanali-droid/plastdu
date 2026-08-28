export const FAQ_CATEGORIES = ["Montaj", "Alegere produs", "Materiale", "Comercial/livrare", "General"] as const;
export type FaqCategory = (typeof FAQ_CATEGORIES)[number];

const COMERCIAL_RE = /livr|comand|ofert|licita|pret|preț|en-gros|cantitate minim|termen/i;
const MONTAJ_RE = /montaj|montea|monta|fixare|se prinde|se ancorea|pas(ul)?\s|instala|se aplic/i;
const MATERIALE_RE = /material|oțel|otel|zinc|plastic|pvc|aluminiu|poliamid|vată|vata|beton|inox|corozi/i;
const ALEGERE_RE = /ce diblu|ce distanț|ce coltar|ce colțar|alegi|alegere|recoman|care (tip|variant|saib)|diferen|vs\b|când e|cand e/i;

/** Clasificare euristică pe baza cuvintelor cheie din întrebare, pt. gruparea FAQ pe categorii. */
export function classifyFaq(q: string): FaqCategory {
  if (COMERCIAL_RE.test(q)) return "Comercial/livrare";
  if (MONTAJ_RE.test(q)) return "Montaj";
  if (ALEGERE_RE.test(q)) return "Alegere produs";
  if (MATERIALE_RE.test(q)) return "Materiale";
  return "General";
}
