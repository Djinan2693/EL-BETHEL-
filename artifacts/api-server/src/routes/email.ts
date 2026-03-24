import { Router, type IRouter } from "express";
import {
  sendContactEmail,
  sendNewsletterNotification,
  sendPrayerRequest,
  type ContactPayload,
  type NewsletterPayload,
  type PrayerPayload,
} from "../lib/mailer";

const router: IRouter = Router();

// POST /api/email/contact
router.post("/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body as Partial<ContactPayload>;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: "Name, email, and message are required." });
    return;
  }

  try {
    await sendContactEmail({ name, email, phone, subject, message });
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
});

// POST /api/email/newsletter
router.post("/newsletter", async (req, res) => {
  const { email } = req.body as Partial<NewsletterPayload>;

  if (!email?.trim()) {
    res.status(400).json({ error: "A valid email address is required." });
    return;
  }

  try {
    await sendNewsletterNotification({ email });
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send newsletter notification");
    res.status(500).json({ error: "Failed to subscribe. Please try again later." });
  }
});

// POST /api/email/prayer
router.post("/prayer", async (req, res) => {
  const { name, email, request } = req.body as Partial<PrayerPayload>;

  if (!request?.trim()) {
    res.status(400).json({ error: "Prayer request text is required." });
    return;
  }

  try {
    await sendPrayerRequest({ name, email, request });
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send prayer request");
    res.status(500).json({ error: "Failed to submit prayer request. Please try again later." });
  }
});

export default router;
