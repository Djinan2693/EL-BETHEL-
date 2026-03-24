import { Router, type IRouter } from "express";
import { Resend } from "resend";

const router: IRouter = Router();

const RECIPIENT = "contact@ebchristianfellowship.org";
const FROM = "El-Bethel Website <noreply@ebchristianfellowship.org>";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(key);
}

router.post("/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body as {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email, and message are required." });
    return;
  }

  try {
    const resend = getResend();
    await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      replyTo: email,
      subject: subject ? `[Contact] ${subject}` : `[Contact] Message from ${name}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a2e;">
          <div style="background:#1e2d6b;padding:28px 32px;border-radius:8px 8px 0 0;">
            <h2 style="color:#f5c842;margin:0;font-size:22px;">New Contact Message</h2>
            <p style="color:#c5cde8;margin:6px 0 0;font-size:13px;">El-Bethel Christian Fellowship — Website Contact Form</p>
          </div>
          <div style="background:#f9f7f4;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e8e2d9;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #e8e2d9;font-weight:bold;width:140px;color:#666;">Name</td><td style="padding:10px 0;border-bottom:1px solid #e8e2d9;">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #e8e2d9;font-weight:bold;color:#666;">Email</td><td style="padding:10px 0;border-bottom:1px solid #e8e2d9;"><a href="mailto:${email}" style="color:#1e2d6b;">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #e8e2d9;font-weight:bold;color:#666;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #e8e2d9;">${phone}</td></tr>` : ""}
            </table>
            <div style="margin-top:24px;">
              <p style="font-weight:bold;color:#666;margin-bottom:8px;">Message:</p>
              <div style="background:white;border:1px solid #e8e2d9;border-radius:6px;padding:18px;white-space:pre-wrap;line-height:1.7;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
            </div>
            <p style="margin-top:24px;font-size:12px;color:#999;">Sent from the El-Bethel website contact form · <a href="https://ebchristianfellowship.org" style="color:#1e2d6b;">ebchristianfellowship.org</a></p>
          </div>
        </div>
      `,
    });
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
});

router.post("/newsletter", async (req, res) => {
  const { email } = req.body as { email?: string };

  if (!email) {
    res.status(400).json({ error: "Email is required." });
    return;
  }

  try {
    const resend = getResend();
    await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      subject: `[Newsletter] New Subscriber: ${email}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a2e;">
          <div style="background:#1e2d6b;padding:28px 32px;border-radius:8px 8px 0 0;">
            <h2 style="color:#f5c842;margin:0;font-size:22px;">New Newsletter Subscriber</h2>
            <p style="color:#c5cde8;margin:6px 0 0;font-size:13px;">El-Bethel Christian Fellowship — Website</p>
          </div>
          <div style="background:#f9f7f4;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e8e2d9;">
            <p>A new visitor subscribed to the newsletter:</p>
            <p style="font-size:18px;font-weight:bold;color:#1e2d6b;">${email}</p>
            <p style="font-size:12px;color:#999;margin-top:24px;">Subscribed via the El-Bethel website · <a href="https://ebchristianfellowship.org" style="color:#1e2d6b;">ebchristianfellowship.org</a></p>
          </div>
        </div>
      `,
    });
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send newsletter subscription email");
    res.status(500).json({ error: "Failed to subscribe. Please try again later." });
  }
});

router.post("/prayer", async (req, res) => {
  const { name, email, request } = req.body as {
    name?: string;
    email?: string;
    request?: string;
  };

  if (!request) {
    res.status(400).json({ error: "Prayer request is required." });
    return;
  }

  try {
    const resend = getResend();
    await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      replyTo: email,
      subject: `[Prayer Request]${name ? ` from ${name}` : " Anonymous"}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a2e;">
          <div style="background:#1e2d6b;padding:28px 32px;border-radius:8px 8px 0 0;">
            <h2 style="color:#f5c842;margin:0;font-size:22px;">Prayer Request</h2>
            <p style="color:#c5cde8;margin:6px 0 0;font-size:13px;">El-Bethel Christian Fellowship — Website</p>
          </div>
          <div style="background:#f9f7f4;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e8e2d9;">
            ${name || email ? `
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              ${name ? `<tr><td style="padding:10px 0;border-bottom:1px solid #e8e2d9;font-weight:bold;width:140px;color:#666;">Name</td><td style="padding:10px 0;border-bottom:1px solid #e8e2d9;">${name}</td></tr>` : ""}
              ${email ? `<tr><td style="padding:10px 0;border-bottom:1px solid #e8e2d9;font-weight:bold;color:#666;">Email</td><td style="padding:10px 0;border-bottom:1px solid #e8e2d9;"><a href="mailto:${email}" style="color:#1e2d6b;">${email}</a></td></tr>` : ""}
            </table>` : ""}
            <div>
              <p style="font-weight:bold;color:#666;margin-bottom:8px;">Prayer Request:</p>
              <div style="background:white;border:1px solid #e8e2d9;border-left:4px solid #f5c842;border-radius:6px;padding:18px;white-space:pre-wrap;font-style:italic;line-height:1.8;">${request.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
            </div>
            <p style="margin-top:24px;font-size:12px;color:#999;">Submitted via the El-Bethel website · <a href="https://ebchristianfellowship.org" style="color:#1e2d6b;">ebchristianfellowship.org</a></p>
          </div>
        </div>
      `,
    });
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send prayer request email");
    res.status(500).json({ error: "Failed to submit prayer request. Please try again later." });
  }
});

export default router;
