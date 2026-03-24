/**
 * AnnouncementModal
 * ─────────────────────────────────────────────────────────────────────────────
 * A reusable popup modal for important church announcements.
 * All content is driven by `src/data/announcement.ts` — edit that file,
 * not this component, to change what is displayed.
 *
 * Behaviour
 *   • Appears after `announcement.delayMs` milliseconds on every page.
 *   • If `showOnceForHours > 0`, stores a dismissal timestamp in localStorage
 *     so the popup stays hidden for that many hours after the visitor closes it.
 *   • Set `announcement.enabled = false` to disable the popup instantly.
 *   • Escape key and clicking the backdrop both close the modal.
 */

import { useEffect, useState, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { announcement } from "@/data/announcement";
import { Button } from "@/components/ui/button";

/* ── localStorage helpers ──────────────────────────────────────────────────── */
function getDismissedAt(id: string): number | null {
  try {
    const raw = localStorage.getItem(`announcement_dismissed_${id}`);
    return raw ? parseInt(raw, 10) : null;
  } catch {
    return null;
  }
}

function setDismissedAt(id: string): void {
  try {
    localStorage.setItem(`announcement_dismissed_${id}`, Date.now().toString());
  } catch {
    /* silently ignore (private browsing / storage full) */
  }
}

function shouldShow(id: string, showOnceForHours: number): boolean {
  if (showOnceForHours === 0) return true;
  const ts = getDismissedAt(id);
  if (ts === null) return true;
  const hoursAgo = (Date.now() - ts) / (1000 * 60 * 60);
  return hoursAgo >= showOnceForHours;
}

/* ── animation variants ────────────────────────────────────────────────────── */
const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
};

const modalVariants = {
  hidden:  { opacity: 0, scale: 0.92, y: 16 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, scale: 0.94, y: 8,  transition: { duration: 0.2 } },
};

/* ── Component ─────────────────────────────────────────────────────────────── */
export function AnnouncementModal() {
  const [open, setOpen] = useState(false);

  /* Show after delay if enabled and not recently dismissed */
  useEffect(() => {
    if (!announcement.enabled) return;
    if (!shouldShow(announcement.id, announcement.showOnceForHours)) return;

    const timer = setTimeout(() => setOpen(true), announcement.delayMs);
    return () => clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setDismissedAt(announcement.id);
  }, []);

  /* Keyboard: Escape to close */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  /* Lock body scroll while open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const cfg = announcement;
  const BASE = import.meta.env.BASE_URL;

  /* CTA: render as <Link> for internal routes, <a> for external */
  const CtaButton = cfg.cta ? (
    cfg.cta.external ? (
      <a href={cfg.cta.href} target="_blank" rel="noopener noreferrer" onClick={close}>
        <Button className="w-full rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 font-semibold">
          {cfg.cta.label} <ArrowRight size={15} />
        </Button>
      </a>
    ) : (
      <Link href={cfg.cta.href} onClick={close}>
        <Button className="w-full rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 font-semibold">
          {cfg.cta.label} <ArrowRight size={15} />
        </Button>
      </Link>
    )
  ) : null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Backdrop ──────────────────────────────────────────── */}
          <motion.div
            key="announcement-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
            onClick={close}
          />

          {/* ── Modal panel ───────────────────────────────────────── */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="announcement-title"
            className="fixed inset-0 z-[301] flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              key="announcement-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              {/* ── Close button ──────────────────────────────────── */}
              <button
                onClick={close}
                aria-label="Close announcement"
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X size={16} />
              </button>

              {/* ── Optional image ────────────────────────────────── */}
              {cfg.image && (
                <div className="w-full aspect-[4/3] overflow-hidden bg-primary/10">
                  <img
                    src={`${BASE}images/${cfg.image}`}
                    alt={cfg.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}

              {/* ── Content ───────────────────────────────────────── */}
              <div className="p-6 sm:p-7">

                {/* Badge */}
                {cfg.badge && (
                  <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-3">
                    {cfg.badge}
                  </span>
                )}

                {/* Title */}
                <h2
                  id="announcement-title"
                  className="font-serif font-bold text-primary text-2xl sm:text-3xl leading-snug mb-3"
                >
                  {cfg.title}
                </h2>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {cfg.description}
                </p>

                {/* Meta row — date / time / location */}
                {(cfg.date || cfg.time || cfg.location) && (
                  <div className="space-y-2 mb-6 p-4 bg-primary/4 rounded-xl border border-border">
                    {cfg.date && (
                      <div className="flex items-start gap-2.5 text-sm">
                        <Calendar size={14} className="text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="font-medium text-foreground">{cfg.date}</span>
                      </div>
                    )}
                    {cfg.time && (
                      <div className="flex items-start gap-2.5 text-sm">
                        <Clock size={14} className="text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-muted-foreground">{cfg.time}</span>
                      </div>
                    )}
                    {cfg.location && (
                      <div className="flex items-start gap-2.5 text-sm">
                        <MapPin size={14} className="text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-muted-foreground leading-relaxed">{cfg.location}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* CTA */}
                {CtaButton}

                {/* Dismiss link */}
                <button
                  onClick={close}
                  className="block w-full mt-3 text-center text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  Maybe later
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
