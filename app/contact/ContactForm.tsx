"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const errs: Record<string, string> = {};
    if (!d.companyName?.trim()) errs.companyName = "Numele firmei este obligatoriu.";
    if (!d.phone?.trim()) errs.phone = "Telefonul este obligatoriu.";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "399ba668-3352-4f7b-aeb3-dba45cc9e804",
          subject: `Cerere ofertă — ${d.companyName}`,
          from_name: d.companyName,
          email: d.email || "noreply@plastdu.ro",
          "Firmă": d.companyName,
          "Persoană contact": d.contactPerson || "—",
          "Telefon": d.phone,
          "Email": d.email || "—",
          "Produs": d.product || "—",
          "Cantitate": d.quantity || "—",
          "Mesaj": d.message || "—",
        }),
      });

      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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
          ✓ Cererea a fost trimisă cu succes! Vă vom contacta în cel mai scurt timp.
        </div>
      )}

      {status === "error" && (
        <div role="alert" className="rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-medium px-4 py-3">
          Nu s-a putut trimite. Sunați direct la{" "}
          <a href="tel:+40724658491" className="font-semibold underline">0724 658 491</a>.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-1 w-full sm:w-auto sm:self-end bg-brand-accent hover:bg-orange-600 active:bg-orange-700
          text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-sm
          flex items-center gap-2 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Se trimite...
          </>
        ) : (
          <>
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
              <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
            </svg>
            Trimite cererea
          </>
        )}
      </button>

      <p className="text-xs text-slate-400 text-center sm:text-right">
        Câmpurile marcate cu <span className="text-red-500">*</span> sunt obligatorii.
        Cererea ajunge direct pe email la office@plastdu.ro.
      </p>
    </form>
  );
}
