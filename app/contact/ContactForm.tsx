"use client";

import { useState, FormEvent } from "react";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type Status = "idle" | "success";

const PRODUCTS = [
  { value: "", label: "Selectați produsul" },
  { value: "Dibluri plastic", label: "Dibluri plastic" },
  { value: "Dibluri metalice", label: "Dibluri metalice" },
  { value: "Flanșă vată", label: "Flanșă vată" },
  { value: "Flanșă cu capac TSF-F55", label: "Flanșă OSB/cu capac" },
  { value: "Altele", label: "Altele" },
];

/* ─── Field component ────────────────────────────────────────────────────── */
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-neutral-border bg-white px-4 py-2.5 text-sm text-slate-800 " +
  "placeholder:text-slate-400 outline-none transition-shadow " +
  "focus:ring-2 focus:ring-brand-blue focus:border-brand-blue";

/* ─── ContactForm ─────────────────────────────────────────────────────────── */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const subject = encodeURIComponent(
      `Cerere ofertă — ${data.companyName || "Firmă nouă"}`
    );
    const body = encodeURIComponent(
      [
        `Firmă: ${data.companyName || "-"}`,
        `Persoană contact: ${data.contactPerson || "-"}`,
        `Telefon: ${data.phone || "-"}`,
        `Email: ${data.email || "-"}`,
        `Produs de interes: ${data.product || "-"}`,
        `Cantitate estimată: ${data.quantity || "-"}`,
        ``,
        `Mesaj:`,
        data.message || "-",
      ].join("\n")
    );

    window.location.href = `mailto:office@plastdu.ro?subject=${subject}&body=${body}`;
    setStatus("success");
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Row 1: Company + Contact person */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Nume firmă" required>
          <input
            type="text"
            name="companyName"
            placeholder="SC Exemplu SRL"
            required
            className={inputCls}
          />
        </Field>
        <Field label="Persoană contact">
          <input
            type="text"
            name="contactPerson"
            placeholder="Ion Popescu"
            className={inputCls}
          />
        </Field>
      </div>

      {/* Row 2: Phone + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Telefon" required>
          <input
            type="tel"
            name="phone"
            placeholder="07XX XXX XXX"
            required
            className={inputCls}
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            name="email"
            placeholder="contact@firma.ro"
            className={inputCls}
          />
        </Field>
      </div>

      {/* Row 3: Product + Quantity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Produs de interes">
          <select
            name="product"
            defaultValue=""
            className={inputCls + " cursor-pointer"}
          >
            {PRODUCTS.map((p) => (
              <option key={p.value} value={p.value} disabled={p.value === ""}>
                {p.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Cantitate estimată">
          <input
            type="text"
            name="quantity"
            placeholder="ex. 10.000 buc / 50 cutii"
            className={inputCls}
          />
        </Field>
      </div>

      {/* Message */}
      <Field label="Mesaj">
        <textarea
          name="message"
          rows={4}
          placeholder="Detalii suplimentare despre proiect, termen de livrare, etc."
          className={inputCls + " resize-none"}
        />
      </Field>

      {/* Success feedback */}
      {status === "success" && (
        <div
          role="status"
          className="rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-medium px-4 py-3"
        >
          ✓ Se deschide clientul de email. Trimiteți mesajul pentru a finaliza cererea.
        </div>
      )}

      <button
        type="submit"
        className="mt-1 w-full sm:w-auto sm:self-end bg-brand-accent hover:bg-orange-600 active:bg-orange-700
          text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-sm"
      >
        Trimite cererea
      </button>

      <p className="text-xs text-slate-400 text-center sm:text-right">
        Câmpurile marcate cu <span className="text-red-500">*</span> sunt obligatorii.
      </p>
    </form>
  );
}
