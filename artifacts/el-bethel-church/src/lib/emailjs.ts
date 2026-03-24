/**
 * EmailJS Configuration
 * ─────────────────────────────────────────────────────────────────────────────
 * All form emails are sent via EmailJS — no backend server required.
 * This works on any static hosting including cPanel.
 *
 * HOW TO SET UP (one-time, free at emailjs.com):
 *
 * 1. Sign up at https://www.emailjs.com (free — 200 emails/month)
 *
 * 2. Add an Email Service:
 *    Dashboard → Email Services → Add New Service
 *    Connect Gmail or use Custom SMTP with info@ebchristianfellowship.org
 *    Copy the Service ID → paste into SERVICE_ID below
 *
 * 3. Create 3 Email Templates (Dashboard → Email Templates → Create New):
 *
 *    Template A — "Contact Form"
 *      Subject: [Contact] {{subject}} from {{from_name}}
 *      Body:    Name: {{from_name}}, Email: {{from_email}}, Phone: {{phone}}, Message: {{message}}
 *      To:      info@ebchristianfellowship.org
 *      Copy Template ID → paste into CONTACT_TEMPLATE_ID below
 *
 *    Template B — "Prayer Request"
 *      Subject: [Prayer Request] from {{from_name}}
 *      Body:    Name: {{from_name}}, Email: {{from_email}}, Topic: {{topic}}, Request: {{request}}
 *      To:      info@ebchristianfellowship.org
 *      Copy Template ID → paste into PRAYER_TEMPLATE_ID below
 *
 *    Template C — "Newsletter Signup"
 *      Subject: [Newsletter] New Subscriber: {{subscriber_email}}
 *      Body:    New newsletter subscriber: {{subscriber_email}}
 *      To:      info@ebchristianfellowship.org
 *      Copy Template ID → paste into NEWSLETTER_TEMPLATE_ID below
 *
 * 4. Get your Public Key:
 *    Dashboard → Account → API Keys → Public Key
 *    Paste into PUBLIC_KEY below
 *
 * 5. Replace every "YOUR_..." placeholder below with your real values.
 *    No other files need to change.
 */

export const EMAILJS_CONFIG = {
  SERVICE_ID:             "service_3uqyl8n",
  CONTACT_TEMPLATE_ID:    "YOUR_CONTACT_TEMPLATE_ID",
  PRAYER_TEMPLATE_ID:     "YOUR_PRAYER_TEMPLATE_ID",
  NEWSLETTER_TEMPLATE_ID: "YOUR_NEWSLETTER_TEMPLATE_ID",
  PUBLIC_KEY:             "YOUR_PUBLIC_KEY",
} as const;
