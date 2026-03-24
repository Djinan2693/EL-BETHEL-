import { Resend } from "resend";

const FROM = "El-Bethel Christian Fellowship <contact@ebchristianfellowship.org>";
const ADMIN_EMAIL = "contact@ebchristianfellowship.org";

/** Returns a fresh Resend client on every call (tokens must not be cached). */
function getClient(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY environment variable is not set");
  return new Resend(key);
}

/** Escape user-supplied text before embedding in HTML. */
function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Shared branded email wrapper. */
function layout(title: string, subtitle: string, body: string): string {
  return `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a2e;">
      <div style="background:#1e2d6b;padding:28px 32px;border-radius:8px 8px 0 0;">
        <h2 style="color:#f5c842;margin:0;font-size:22px;">${title}</h2>
        <p style="color:#c5cde8;margin:6px 0 0;font-size:13px;">${subtitle}</p>
      </div>
      <div style="background:#f9f7f4;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e8e2d9;">
        ${body}
        <p style="margin-top:28px;font-size:12px;color:#999;border-top:1px solid #e8e2d9;padding-top:16px;">
          Sent from <a href="https://ebchristianfellowship.org" style="color:#1e2d6b;">ebchristianfellowship.org</a>
        </p>
      </div>
    </div>
  `;
}

/** Renders a simple key-value table row. */
function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e8e2d9;font-weight:bold;width:130px;color:#666;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e8e2d9;vertical-align:top;">${value}</td>
    </tr>
  `;
}

// ─── Public send helpers ───────────────────────────────────────────────────

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface NewsletterPayload {
  email: string;
}

export interface PrayerPayload {
  name?: string;
  email?: string;
  request: string;
}

export async function sendContactEmail(data: ContactPayload): Promise<void> {
  const { name, email, phone, subject, message } = data;

  const rows = [
    row("Name", esc(name)),
    row("Email", `<a href="mailto:${esc(email)}" style="color:#1e2d6b;">${esc(email)}</a>`),
    ...(phone ? [row("Phone", esc(phone))] : []),
  ].join("");

  const body = `
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">${rows}</table>
    <p style="font-weight:bold;color:#666;margin-bottom:8px;">Message:</p>
    <div style="background:white;border:1px solid #e8e2d9;border-radius:6px;padding:18px;white-space:pre-wrap;line-height:1.7;">${esc(message)}</div>
  `;

  await getClient().emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    replyTo: email,
    subject: subject ? `[Contact] ${subject}` : `[Contact] Message from ${name}`,
    html: layout("New Contact Message", "El-Bethel Christian Fellowship — Contact Form", body),
  });
}

export async function sendNewsletterNotification(data: NewsletterPayload): Promise<void> {
  const { email } = data;

  const body = `
    <p style="margin:0 0 12px;">A new visitor subscribed to the church newsletter:</p>
    <p style="font-size:20px;font-weight:bold;color:#1e2d6b;margin:0;">${esc(email)}</p>
  `;

  await getClient().emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `[Newsletter] New Subscriber: ${email}`,
    html: layout("New Newsletter Subscriber", "El-Bethel Christian Fellowship — Website", body),
  });
}

export async function sendPrayerRequest(data: PrayerPayload): Promise<void> {
  const { name, email, request } = data;

  const senderRows = [
    ...(name ? [row("Name", esc(name))] : []),
    ...(email ? [row("Email", `<a href="mailto:${esc(email)}" style="color:#1e2d6b;">${esc(email)}</a>`)] : []),
  ].join("");

  const body = `
    ${senderRows ? `<table style="width:100%;border-collapse:collapse;margin-bottom:24px;">${senderRows}</table>` : ""}
    <p style="font-weight:bold;color:#666;margin-bottom:8px;">Prayer Request:</p>
    <div style="background:white;border:1px solid #e8e2d9;border-left:4px solid #f5c842;border-radius:6px;padding:18px;white-space:pre-wrap;font-style:italic;line-height:1.8;">${esc(request)}</div>
  `;

  await getClient().emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    replyTo: email,
    subject: `[Prayer Request]${name ? ` from ${name}` : " — Anonymous"}`,
    html: layout("Prayer Request", "El-Bethel Christian Fellowship — Website", body),
  });
}
