import type { Block } from "@/lib/blog";

export default function BlogBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-blog max-w-3xl">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="text-slate-600 leading-relaxed mb-5">
                {b.text}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} id={b.id} className="mt-10 mb-4 scroll-mt-24">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-6 mb-3 text-lg font-semibold text-slate-800">
                {b.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-2 mb-6 list-none">
                {b.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-slate-600 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-2 mb-6 list-decimal list-inside">
                {b.items.map((item, j) => (
                  <li key={j} className="text-slate-600 leading-relaxed pl-1">
                    {item}
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div key={i} className="mb-6 bg-white rounded-2xl border border-neutral-border shadow-card overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-blue text-white">
                      {b.headers.map((h, j) => (
                        <th key={j} className="text-left px-5 py-3.5 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-border">
                    {b.rows.map((row, r) => (
                      <tr key={r} className={r % 2 === 0 ? "bg-white" : "bg-neutral-surface/50"}>
                        {row.map((cell, c) => (
                          <td key={c} className="px-5 py-3.5 text-slate-600">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "note":
            return (
              <div
                key={i}
                className="mb-6 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-slate-700 leading-relaxed"
              >
                <strong className="text-brand-blue">De reținut: </strong>
                {b.text}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
