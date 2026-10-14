import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  source?: string;
  pack?: string;
  locale?: string;
  message?: string;
};

function readEnv(name: string): string {
  return String(process.env[name] ?? "").trim();
}

async function emailLead(lead: Required<Pick<LeadPayload, "email">> & LeadPayload) {
  const apiKey = readEnv("RESEND_API_KEY");
  const from = readEnv("LEADS_EMAIL_FROM") || readEnv("DAILY_REPORT_EMAIL_FROM");
  const to = readEnv("LEADS_EMAIL_TO") || "jakub@doubleyellowsquash.com";
  if (!apiKey || !from) {
    return { sent: false as const, reason: "missing_resend_config" };
  }

  const subject = `[DY Lead] ${lead.source || "website"}${lead.pack ? ` · ${lead.pack}` : ""}`;
  const text = [
    `Source: ${lead.source || "—"}`,
    `Pack: ${lead.pack || "—"}`,
    `Name: ${lead.name || "—"}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || "—"}`,
    `Locale: ${lead.locale || "—"}`,
    `Message: ${lead.message || "—"}`,
    `When: ${new Date().toISOString()}`,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((part) => part.trim()).filter(Boolean),
      subject,
      text,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    return { sent: false as const, reason: `resend_${response.status}`, body: body.slice(0, 300) };
  }

  return { sent: true as const };
}

export async function POST(request: Request) {
  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = String(payload.email || "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  }

  const lead = {
    name: String(payload.name || "").trim().slice(0, 120),
    email: email.slice(0, 200),
    phone: String(payload.phone || "").trim().slice(0, 40),
    source: String(payload.source || "website").trim().slice(0, 80),
    pack: String(payload.pack || "").trim().slice(0, 120),
    locale: String(payload.locale || "").trim().slice(0, 8),
    message: String(payload.message || "").trim().slice(0, 1000),
  };

  try {
    const mail = await emailLead(lead);
    // Always accept the lead so WhatsApp CTA is not blocked if email is unset.
    console.log("lead.captured", JSON.stringify({ ...lead, emailed: mail.sent, mailReason: "reason" in mail ? mail.reason : null }));
    return NextResponse.json({ ok: true, emailed: mail.sent });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lead capture failed";
    console.error("lead.capture_failed", message);
    return NextResponse.json({ ok: true, emailed: false, error: message });
  }
}
