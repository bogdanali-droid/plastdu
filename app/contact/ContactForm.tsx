"use client";

import { useState, useRef, FormEvent } from "react";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type Status = "idle" | "loading" | "success" | "error";

const PRODUCTS = [
  { value: "", label: "Selectați produsul" },
  { value: "dibluri-plastic", label: "Dibluri plastic" },
  { value: "dibluri-metalice", label: "Dibluri metalice" },
  { value: "flansa-vata", label: "Flanșă vată" },
  { value: "flansa-osb", label: "Flanșă OSB" },
  { value: "altele", label: "Altele" },
];

/* ─── Field component ────────────────────────────────────────────────────── */
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
      {error && (
        <p className="text-xs text-red-600 font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-neutral-border bg-white px-4 py-2.5 text-sm text-slate-800 " +
  "placeholder:text-slate-400 outline-none transition-shadow " +
  "focus:ring-2 focus:ring-brand-blue-400 focus:border-brand-blue-400 " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

/* ─── ContactForm ─────────────────────────────────────────────────────────── */
export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const clearError = (field: string) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFieldErrors({});
    setServerMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setStatus("success");
        setServerMessage(json.message);
        form.reset();
      } else if (res.status === 422 && json.errors) {
        const errMap: Record<string, string> = {};
        for (const err of json.errors as { field: string; message: string }[]) {
          errMap[err.field] = err.message;
        }
        setFieldErrors(errMap);
        setStatus("idle");
      } else {
        setStatus("error");
        setServerMessage(json.message ?? "A apărut o eroare. Vă rugăm încercați din nou.");
      }
    } catch {
      setStatus("error");
      setServerMessage("Nu s-a putut trimite mesajul. Verificați conexiunea și încercați din nou.");
    }
  }

  const isLoading = status === "loading";

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Row 1: Company + Contact person */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Nume firmă" required error={fieldErrors.companyName}>
          <input
            type="text"
            name="companyName"
            placeholder="SC Exemplu SRL"
            required
            disabled={isLoading}
            className={inputCls}
            onChange={() => clearError("companyName")}
          />
        </Field>
        <Field label="Persoană contact">
          <input
            type="text"
            name="contactPerson"
            placeholder="Ion Popescu"
            disabled={isLoading}
            className={inputCls}
          />
        </Field>
      </div>

      {/* Row 2: Phone + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Telefon" required error={fieldErrors.phone}>
          <input
            type="tel"
            name="phone"
            placeholder="07XX XXX XXX"
            required
            disabled={isLoading}
            className={inputCls}
            onChange={() => clearError("phone")}
          />
        </Field>
        <Field label="Email" error={fieldErrors.email}>
          <input
            type="email"
            name="email"
            placeholder="contact@firma.ro"
            disabled={isLoading}
            className={inputCls}
            onChange={() => clearError("email")}
          />
        </Field>
      </div>

      {/* Row 3: Product + Quantity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Produs de interes">
          <select
            name="product"
            disabled={isLoading}
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
            disabled={isLoading}
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
          disabled={isLoading}
          className={inputCls + " resize-none"}
        />
      </Field>

      {/* Server feedback */}
      {status === "success" && (
        <div
          role="status"
          className="rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-medium px-4 py-3"
        >
          ✓ {serverMessage}
        </div>
      )}
      {status === "error" && (
        <div
          role="alert"
          className="rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3"
        >
          ✗ {serverMessage}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-1 w-full sm:w-auto sm:self-end bg-brand-accent-500 hover:bg-brand-accent-600 active:bg-brand-accent-700
          text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-sm
          disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center gap-2 justify-center">
            <svg
              className="animate-spin w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Se trimite…
          </span>
        ) : (
          "Trimite cererea"
        )}
      </button>

      <p className="text-xs text-slate-400 text-center sm:text-right">
        Câmpurile marcate cu <span className="text-red-500">*</span> sunt obligatorii.
      </p>
    </form>
  );
}
