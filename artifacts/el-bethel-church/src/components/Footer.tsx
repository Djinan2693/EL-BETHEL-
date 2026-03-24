import { useState } from "react";
import { Link } from "wouter";
import {
  Facebook, Instagram, Youtube, MapPin, Phone, Mail,
  Clock, Send, CheckCircle, ChevronRight, Heart,
} from "lucide-react";
import { churchInfo } from "@/data/church";
import { Container } from "./ui/container";
import { cn } from "@/lib/utils";

const QUICK_LINKS = [
  { name: "About Our Church",  path: "/about" },
  { name: "Watch Sermons",     path: "/sermons" },
  { name: "Ministry Groups",   path: "/ministries" },
  { name: "Upcoming Events",   path: "/events" },
  { name: "Give Online",       path: "/give" },
  { name: "Contact Us",        path: "/contact" },
];

const SERVICE_TIMES = [
  { day: "Sunday",    times: ["9:00 AM — Tagalog Service", "11:00 AM — English Service"] },
  { day: "Wednesday", times: ["7:00 PM — Prayer Night (Hybrid)"] },
  { day: "Friday",    times: ["6:30 PM — Youth & Young Adults"] },
];

const SOCIAL_LINKS = [
  { label: "Facebook",  href: churchInfo.socialMedia.facebook,  icon: Facebook },
  { label: "Instagram", href: churchInfo.socialMedia.instagram, icon: Instagram },
  { label: "YouTube",   href: churchInfo.socialMedia.youtube,   icon: Youtube },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-white font-serif text-lg font-bold mb-5 flex items-center gap-2">
      <span aria-hidden="true" className="inline-block w-4 h-0.5 bg-secondary rounded-full shrink-0" />
      {children}
    </h3>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-1.5 text-sm text-white/70 hover:text-secondary transition-colors",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded",
      )}
    >
      <ChevronRight size={13} aria-hidden="true" className="text-secondary/60 shrink-0" />
      {children}
    </Link>
  );
}

export function Footer() {
  const [email, setEmail]           = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading]       = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || loading) return;
    setLoading(true);
    try {
      await fetch("/api/email/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } finally {
      setSubscribed(true);
      setEmail("");
      setLoading(false);
    }
  }

  return (
    <footer className="bg-primary text-primary-foreground border-t-4 border-secondary">

      {/* ── Newsletter Banner ─────────────────────────────── */}
      <div className="bg-primary/80 border-b border-white/10">
        <Container>
          <div className="py-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-1">Stay Connected</p>
              <h2 className="text-white font-serif text-2xl font-bold">
                Get Kingdom news in your inbox
              </h2>
              <p className="text-white/60 text-sm mt-1">
                Weekly sermon notes, events, devotionals, and announcements — no spam.
              </p>
            </div>

            {subscribed ? (
              <div className="flex items-center gap-3 text-green-400 shrink-0">
                <CheckCircle size={22} />
                <span className="font-medium">You're subscribed — God bless you!</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0"
                aria-label="Newsletter signup"
              >
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className={cn(
                    "w-full sm:w-64 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm",
                    "placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary",
                    "transition-all",
                  )}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm",
                    "bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors shrink-0",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                    "disabled:opacity-60",
                  )}
                >
                  <Send size={14} aria-hidden="true" />
                  {loading ? "Subscribing…" : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </Container>
      </div>

      {/* ── Main Footer Body ──────────────────────────────── */}
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-16 pb-12">

          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-3 mb-5 group w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-lg"
            >
              <img
                src="/images/logo.jpg"
                alt="El-Bethel Christian Fellowship Church"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-secondary/40 group-hover:ring-secondary transition-all"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-xl font-bold text-white">El-Bethel</span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary">
                  Christian Fellowship
                </span>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed mb-6">
              A Spirit-filled community in the heart of Makati City — dedicated to knowing Christ and making Him known in every area of life.
            </p>

            <p className="text-secondary font-serif italic text-sm mb-5">
              "There he built an altar, and he called the place El Bethel." — Genesis 35:7
            </p>

            {/* Social media */}
            <div className="flex gap-3" aria-label="Social media links">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${label}`}
                  className={cn(
                    "w-9 h-9 rounded-full bg-white/10 flex items-center justify-center",
                    "hover:bg-secondary hover:text-primary transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
                  )}
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <nav aria-label="Footer quick links">
              <ul className="space-y-2.5">
                {QUICK_LINKS.map((link) => (
                  <li key={link.path}>
                    <FooterLink href={link.path}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <FooterHeading>Contact Us</FooterHeading>
            <address className="not-italic space-y-4">
              <div className="flex gap-3 text-white/70 text-sm">
                <MapPin size={17} aria-hidden="true" className="text-secondary shrink-0 mt-0.5" />
                <span>{churchInfo.address}</span>
              </div>
              <div className="flex gap-3 text-sm">
                <Phone size={17} aria-hidden="true" className="text-secondary shrink-0 mt-0.5" />
                <a
                  href={`tel:${churchInfo.phone}`}
                  className="text-white/70 hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded"
                >
                  {churchInfo.phone}
                </a>
              </div>
              <div className="flex gap-3 text-sm">
                <Mail size={17} aria-hidden="true" className="text-secondary shrink-0 mt-0.5" />
                <a
                  href={`mailto:${churchInfo.email}`}
                  className="text-white/70 hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded break-all"
                >
                  {churchInfo.email}
                </a>
              </div>

              <div className="flex gap-3 text-sm">
                <Clock size={17} aria-hidden="true" className="text-secondary shrink-0 mt-0.5" />
                <div className="text-white/70">
                  <p>Office: Tue–Fri, 9 AM–5 PM</p>
                  <p>Saturday: 9 AM–1 PM</p>
                </div>
              </div>
            </address>
          </div>

          {/* Col 4 — Service Times */}
          <div>
            <FooterHeading>Service Schedule</FooterHeading>
            <div className="space-y-4">
              {SERVICE_TIMES.map(({ day, times }) => (
                <div key={day} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <Clock size={13} aria-hidden="true" className="text-secondary" />
                    {day}
                  </p>
                  {times.map((t) => (
                    <p key={t} className="text-white/60 text-xs leading-relaxed pl-5">{t}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>

      {/* ── Bottom Bar ────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <Container>
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
            <p>
              &copy; {new Date().getFullYear()} {churchInfo.name}. All rights reserved.
            </p>

            <p className="flex items-center gap-1">
              Made with <Heart size={11} aria-hidden="true" className="text-secondary mx-0.5" /> for the Kingdom
            </p>

            <nav aria-label="Legal links" className="flex gap-4">
              {["Privacy Policy", "Terms of Service"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </Container>
      </div>

    </footer>
  );
}
