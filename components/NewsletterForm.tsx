"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "399ba668-3352-4f7b-aeb3-dba45cc9e804";

export default function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "Abonare newsletter — ghiduri tehnice Plast Du IV",
          from_name: "Formular newsletter plastdu.ro",
          email,
          "Abonat email": email,
          Sursă: "Newsletter site",
        }),
      });

      const json = await res.json();
      if (json.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-medium px-4 py-3 text-center"
      >
        ✓ V-ați abonat cu succes! Veți primi ghidurile noastre tehnice pe email.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="adresa@email.ro"
          disabled={status === "loading"}
          className="flex-1 rounded-xl border border-neutral-border bg-white px-4 py-3 text-sm text-slate-800
            placeholder:text-slate-400 outline-none transition-shadow
            focus:ring-2 focus:ring-brand-blue focus:border-brand-blue disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-brand-accent hover:bg-orange-600 active:bg-orange-700 text-white font-semibold
            px-6 py-3 rounded-xl transition-colors shadow-sm whitespace-nowrap
            disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Se trimite..." : "Abonează-te la ghiduri"}
        </button>
      </div>

      {status === "error" && (
        <p role="alert" className="text-xs text-red-600 font-medium">
          Nu s-a putut trimite abonarea. Încercați din nou sau scrieți-ne la{" "}
          <a href="mailto:office@plastdu.ro" className="underline">office@plastdu.ro</a>.
        </p>
      )}

      <p className="text-xs text-slate-400">
        Vă abonați la newsletter cu ghiduri tehnice. Puteți dezabona oricând.
      </p>
    </form>
  );
}
