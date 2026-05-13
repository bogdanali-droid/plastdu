import { NextRequest, NextResponse } from "next/server";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface ContactFormData {
  companyName: string;
  contactPerson?: string;
  phone: string;
  email?: string;
  product?: string;
  quantity?: string;
  message?: string;
}

interface ValidationError {
  field: string;
  message: string;
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function validatePayload(body: unknown): {
  data?: ContactFormData;
  errors?: ValidationError[];
} {
  const errors: ValidationError[] = [];

  if (!body || typeof body !== "object") {
    return { errors: [{ field: "body", message: "Payload invalid." }] };
  }

  const raw = body as Record<string, unknown>;

  const companyName = typeof raw.companyName === "string" ? raw.companyName.trim() : "";
  const phone = typeof raw.phone === "string" ? raw.phone.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : undefined;

  if (!companyName) {
    errors.push({ field: "companyName", message: "Numele firmei este obligatoriu." });
  } else if (companyName.length < 2) {
    errors.push({ field: "companyName", message: "Numele firmei trebuie să aibă minim 2 caractere." });
  }

  if (!phone) {
    errors.push({ field: "phone", message: "Telefonul este obligatoriu." });
  } else if (!/^[0-9\s\+\-\(\)]{7,20}$/.test(phone)) {
    errors.push({ field: "phone", message: "Număr de telefon invalid." });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: "email", message: "Adresă de email invalidă." });
  }

  if (errors.length > 0) return { errors };

  return {
    data: {
      companyName,
      contactPerson: typeof raw.contactPerson === "string" ? raw.contactPerson.trim() : undefined,
      phone,
      email: email || undefined,
      product: typeof raw.product === "string" ? raw.product.trim() : undefined,
      quantity: typeof raw.quantity === "string" ? raw.quantity.trim() : undefined,
      message: typeof raw.message === "string" ? raw.message.trim() : undefined,
    },
  };
}

/* ─── POST /api/contact ──────────────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "JSON invalid." },
      { status: 400 }
    );
  }

  const { data, errors } = validatePayload(body);

  if (errors) {
    return NextResponse.json(
      { success: false, message: "Date invalide.", errors },
      { status: 422 }
    );
  }

  /*
   * TODO: implementare reală SMTP (ex. Nodemailer + Resend / SendGrid):
   *
   * await transporter.sendMail({
   *   from: "site@plastdu.ro",
   *   to: "office@plastdu.ro",
   *   subject: `Cerere ofertă — ${data!.companyName}`,
   *   text: formatEmailBody(data!),
   * });
   */

  console.info("[contact/route] New inquiry from:", data!.companyName, "|", data!.phone);

  return NextResponse.json(
    {
      success: true,
      message: "Mesajul a fost trimis cu succes. Vă vom contacta în cel mai scurt timp.",
    },
    { status: 200 }
  );
}

/* ─── Method guard ───────────────────────────────────────────────────────── */
export async function GET() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}
