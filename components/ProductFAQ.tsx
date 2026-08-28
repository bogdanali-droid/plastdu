import type { ProdusFaqItem } from "@/lib/produse/faq";

export default function ProductFAQ({ faq }: { faq: ProdusFaqItem[] }) {
  if (!faq || faq.length === 0) return null;

  return (
    <section className="section-padding bg-neutral-surface">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="section-label">Întrebări frecvente</p>
          <h2 className="mb-8">Ce trebuie să știți despre acest produs</h2>
          <div className="space-y-3">
            {faq.map((item, i) => (
              <details
                key={i}
                className="bg-white rounded-2xl border border-neutral-border p-5 group open:shadow-card"
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-semibold text-sm text-slate-800">
                  <span>{item.intrebare}</span>
                  <svg
                    className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-400 group-open:rotate-180 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">{item.raspuns}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function buildFaqSchema(faq: ProdusFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.intrebare,
      acceptedAnswer: { "@type": "Answer", text: item.raspuns },
    })),
  };
}
