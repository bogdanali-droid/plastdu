"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "success";

const PRODUCTS = [
  { value: "", label: "Selectați produsul" },
  { value: "Dibluri plastic", label: "Dibluri plastic" },
  { value: "Dibluri metalice", label: "Dibluri metalice" },
  { value: "Flanșă vată", label: "Flanșă vată" },
  { value: "Flanșă cu capac TSF-F55", label: "Flanșă OSB/cu capac" },
  { value: "Șuruburi", label: "Șuruburi" },
  { value: "Altele", label: "Altele" },
];

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-neutral-border bg-white px-4 py-2.5 text-sm text-slate-800 " +
  "placeholder:text-slate-400 outline-none transition-shadow " +
  "focus:ring-2 focus:ring-brand-blue focus:border-brand-blue " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const errs: Record<string, string> = {};
    if (!d.companyName?.trim()) errs.companyName = "Numele firmei este obligatoriu.";
    if (!d.phone?.trim()) errs.phone = "Telefonul este obligatoriu.";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    const lines = [
      `Bună ziua! Vă contactez prin site-ul plastdu.ro.`,
      ``,
      `*Firmă:* ${d.companyName}`,
      d.contactPerson ? `*Persoană contact:* ${d.contactPerson}` : "",
      `*Telefon:* ${d.phone}`,
      d.email ? `*Email:* ${d.email}` : "",
      d.product ? `*Produs:* ${d.product}` : "",
      d.quantity ? `*Cantitate:* ${d.quantity}` : "",
      d.message ? `\n*Mesaj:* ${d.message}` : "",
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/40724658491?text=${encodeURIComponent(lines)}`, "_blank");
    setStatus("success");
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Nume firmă" required error={errors.companyName}>
          <input
            type="text" name="companyName" placeholder="SC Exemplu SRL"
            required className={inputCls}
            onChange={() => setErrors(p => ({ ...p, companyName: "" }))}
          />
        </Field>
        <Field label="Persoană contact">
          <input type="text" name="contactPerson" placeholder="Ion Popescu" className={inputCls} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Telefon" required error={errors.phone}>
          <input
            type="tel" name="phone" placeholder="07XX XXX XXX"
            required className={inputCls}
            onChange={() => setErrors(p => ({ ...p, phone: "" }))}
          />
        </Field>
        <Field label="Email">
          <input type="email" name="email" placeholder="contact@firma.ro" className={inputCls} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Produs de interes">
          <select name="product" defaultValue="" className={inputCls + " cursor-pointer"}>
            {PRODUCTS.map(p => (
              <option key={p.value} value={p.value} disabled={p.value === ""}>{p.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Cantitate estimată">
          <input type="text" name="quantity" placeholder="ex. 10.000 buc / 50 cutii" className={inputCls} />
        </Field>
      </div>

      <Field label="Mesaj">
        <textarea name="message" rows={4}
          placeholder="Detalii despre proiect, termen de livrare, etc."
          className={inputCls + " resize-none"}
        />
      </Field>

      {status === "success" && (
        <div role="status" className="rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-medium px-4 py-3">
          ✓ Se deschide WhatsApp cu mesajul pre-completat. Trimiteți mesajul pentru a finaliza cererea.
        </div>
      )}

      <button
        type="submit"
        className="mt-1 w-full sm:w-auto sm:self-end bg-brand-accent hover:bg-orange-600 active:bg-orange-700
          text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-sm
          flex items-center gap-2 justify-center"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Trimite pe WhatsApp
      </button>

      <p className="text-xs text-slate-400 text-center sm:text-right">
        Câmpurile marcate cu <span className="text-red-500">*</span> sunt obligatorii.
        Se va deschide WhatsApp cu cererea pre-completată.
      </p>
    </form>
  );
}
