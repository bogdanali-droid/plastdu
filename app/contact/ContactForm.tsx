"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

const PRODUCTS = [
  { value: "", label: "Selectați produsul" },
  { value: "Dibluri plastic", label: "Dibluri plastic" },
  { value: "Dibluri metalice", label: "Dibluri metalice" },
  { value: "Flanșă vată", label: "Flanșă vată" },
  { value: "Flanșă cu capac TSF-F55", label: "Flanșă OSB/cu capac" },
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
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const newErrors: Record<string, string> = {};
    if (!data.companyName?.trim()) newErrors.companyName = "Numele firmei este obligatoriu.";
    if (!data.phone?.trim()) newErrors.phone = "Telefonul este obligatoriu.";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
          subject: `Cerere ofertă — ${data.companyName}`,
          from_name: data.companyName,
          firmă: data.companyName,
          "persoană contact": data.contactPerson || "-",
          telefon: data.phone,
          email: data.email || "-",
          produs: data.product || "-",
          cantitate: data.quantity || "-",
          mesaj: data.message || "-",
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

  const isLoading = status === "loading";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Nume firmă" required error={errors.companyName}>
          <input type="text" name="companyName" placeholder="SC Exemplu SRL" required disabled={isLoading} className={inputCls} onChange={() => setErrors(p => ({ ...p, companyName: "" }))} />
        </Field>
        <Field label="Persoană contact">
          <input type="text" name="contactPerson" placeholder="Ion Popescu" disabled={isLoading} className={inputCls} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Telefon" required error={errors.phone}>
          <input type="tel" name="phone" placeholder="07XX XXX XXX" required disabled={isLoading} className={inputCls} onChange={() => setErrors(p => ({ ...p, phone: "" }))} />
        </Field>
        <Field label="Email">
          <input type="email" name="email" placeholder="contact@firma.ro" disabled={isLoading} className={inputCls} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Produs de interes">
          <select name="product" defaultValue="" disabled={isLoading} className={inputCls + " cursor-pointer"}>
            {PRODUCTS.map(p => (
              <option key={p.value} value={p.value} disabled={p.value === ""}>{p.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Cantitate estimată">
          <input type="text" name="quantity" placeholder="ex. 10.000 buc / 50 cutii" disabled={isLoading} className={inputCls} />
        </Field>
      </div>

      <Field label="Mesaj">
        <textarea name="message" rows={4} placeholder="Detalii despre proiect, termen de livrare, etc." disabled={isLoading} className={inputCls + " resize-none"} />
      </Field>

      {status === "success" && (
        <div role="status" className="rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-medium px-4 py-3">
          ✓ Mesaj trimis! Vă contactăm în cel mai scurt timp.
        </div>
      )}
      {status === "error" && (
        <div role="alert" className="rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3">
          ✗ Nu s-a putut trimite. Sunați direct la 0724 658 491.
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-1 w-full sm:w-auto sm:self-end bg-brand-accent hover:bg-orange-600 active:bg-orange-700
          text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-sm
          disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Se trimite…
          </>
        ) : "Trimite cererea"}
      </button>

      <p className="text-xs text-slate-400 text-center sm:text-right">
        Câmpurile marcate cu <span className="text-red-500">*</span> sunt obligatorii.
      </p>
    </form>
  );
}
