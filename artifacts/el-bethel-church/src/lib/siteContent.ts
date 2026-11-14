/**
 * EDITABLE SITE CONTENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Small pieces of the site (popup, scrolling banner, hero, gallery, contact
 * details) can be changed by the church from the admin panel at /admin.
 *
 * The admin panel writes /content/site-content.json on the server. On start-up
 * we fetch that file and merge it over the defaults that live in the code.
 * If the file is missing, slow, or broken, the site simply uses the defaults
 * below — the site never depends on the admin panel to work.
 *
 * Anything NOT in this file (layout, pages, sermons, events…) is a "major"
 * change and stays in code.
 */

import { announcement, type AnnouncementConfig } from "@/data/announcement";
import { churchInfo } from "@/data/church";
import { siteDefaults } from "@/data/siteDefaults";

export interface ImageItem {
  src: string;
  alt: string;
}

export interface TickerItem {
  text: string;
  link?: string;
}

export interface ContactExtras {
  phoneNote: string;
  emailNote: string;
  areaLine: string;
  buildingLine: string;
  directions: string;
  officeHours: string;
  mapLink: string;
}

export interface SiteContent {
  ticker: {
    enabled: boolean;
    speed: "slow" | "normal" | "fast";
    items: TickerItem[];
  };
  home: {
    heroTitleLine1: string;
    heroTitleLine2: string;
    heroSubtitle: string;
    heroSlides: ImageItem[];
    stats: { value: string; label: string }[];
    storyTitle: string;
    storyImage: string;
    galleryTitle: string;
    gallery: ImageItem[];
  };
  contact: ContactExtras;
}

const defaults: SiteContent = siteDefaults as SiteContent;

/** Live content object. Read it anywhere after `loadSiteContent()` resolved. */
export const siteContent: SiteContent = structuredClone(defaults);

/**
 * Turn an image reference into a URL.
 *   "gallery-01.jpg"                → /images/gallery-01.jpg   (built-in image)
 *   "/content/uploads/abc.jpg"      → unchanged                 (uploaded from admin)
 *   "https://…"                     → unchanged
 */
export function imageUrl(src: string): string {
  if (!src) return "";
  if (src.startsWith("/") || /^https?:\/\//i.test(src)) return src;
  return `${import.meta.env.BASE_URL}images/${src.replace(/^images\//, "")}`;
}

/** Google Maps link for the church: the custom link from /admin, or a search for the address. */
export function mapUrl(): string {
  return (
    siteContent.contact.mapLink ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(churchInfo.address)}`
  );
}

/* ── tiny validation helpers: never trust the JSON blindly ────────────────── */
const str = (v: unknown, fallback: string, max = 600) =>
  typeof v === "string" ? v.slice(0, max) : fallback;
const bool = (v: unknown, fallback: boolean) => (typeof v === "boolean" ? v : fallback);
const num = (v: unknown, fallback: number) =>
  typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : fallback;

function images(v: unknown, fallback: ImageItem[]): ImageItem[] {
  if (!Array.isArray(v)) return fallback;
  const list = v
    .filter((i) => i && typeof i.src === "string" && i.src)
    .map((i) => ({ src: String(i.src), alt: str(i.alt, "") }));
  return list.length ? list : fallback;
}

function safeLink(v: unknown): string | undefined {
  if (typeof v !== "string" || !v.trim()) return undefined;
  const s = v.trim();
  return s.startsWith("/") || /^https?:\/\//i.test(s) ? s : undefined;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function apply(raw: any) {
  if (!raw || typeof raw !== "object") return;

  /* Scrolling banner */
  const t = raw.ticker ?? {};
  siteContent.ticker = {
    enabled: bool(t.enabled, defaults.ticker.enabled),
    speed: ["slow", "normal", "fast"].includes(t.speed) ? t.speed : "normal",
    items: Array.isArray(t.items)
      ? t.items
          .filter((i: any) => i && typeof i.text === "string" && i.text.trim())
          .map((i: any) => ({ text: str(i.text, "", 200), link: safeLink(i.link) }))
      : [],
  };

  /* Home page */
  const h = raw.home ?? {};
  const d = defaults.home;
  siteContent.home = {
    heroTitleLine1: str(h.heroTitleLine1, d.heroTitleLine1, 60),
    heroTitleLine2: str(h.heroTitleLine2, d.heroTitleLine2, 60),
    heroSubtitle: str(h.heroSubtitle, d.heroSubtitle, 300),
    heroSlides: images(h.heroSlides, d.heroSlides),
    stats:
      Array.isArray(h.stats) && h.stats.length
        ? h.stats.slice(0, 4).map((s: any) => ({ value: str(s?.value, "", 12), label: str(s?.label, "", 40) }))
        : d.stats,
    storyTitle: str(h.storyTitle, d.storyTitle, 80),
    storyImage: str(h.storyImage, d.storyImage, 200) || d.storyImage,
    galleryTitle: str(h.galleryTitle, d.galleryTitle, 80),
    gallery: images(h.gallery, d.gallery),
  };

  /* Popup announcement — merged into the existing config object */
  const a = raw.announcement;
  if (a && typeof a === "object") {
    const next: Partial<AnnouncementConfig> = {
      id: str(a.id, announcement.id, 80),
      enabled: bool(a.enabled, announcement.enabled),
      delayMs: num(a.delayMs, announcement.delayMs),
      showOnceForHours: num(a.showOnceForHours, announcement.showOnceForHours),
      badge: str(a.badge, "", 40) || undefined,
      title: str(a.title, announcement.title, 120),
      description: str(a.description, announcement.description, 600),
      date: str(a.date, "", 80) || undefined,
      time: str(a.time, "", 80) || undefined,
      location: str(a.location, "", 200) || undefined,
      image: str(a.image, "", 200) || undefined,
    };
    const href = safeLink(a.cta?.href);
    next.cta =
      href && typeof a.cta?.label === "string" && a.cta.label.trim()
        ? { label: str(a.cta.label, "", 40), href, external: /^https?:\/\//i.test(href) }
        : undefined;
    Object.assign(announcement, next);
  }

  /* Contact details */
  const c = raw.church;
  if (c && typeof c === "object") {
    churchInfo.phone = str(c.phone, churchInfo.phone, 40) || churchInfo.phone;
    churchInfo.email = str(c.email, churchInfo.email, 120) || churchInfo.email;
    churchInfo.address = str(c.address, churchInfo.address, 300) || churchInfo.address;
    const dc = defaults.contact;
    siteContent.contact = {
      phoneNote: str(c.phoneNote, dc.phoneNote, 80),
      emailNote: str(c.emailNote, dc.emailNote, 80),
      areaLine: str(c.areaLine, dc.areaLine, 80),
      buildingLine: str(c.buildingLine, dc.buildingLine, 120),
      directions: str(c.directions, dc.directions, 400),
      officeHours: str(c.officeHours, dc.officeHours, 200),
      mapLink: safeLink(c.mapLink) ?? "",
    };
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Fetch the content file. Never throws and never waits more than `timeoutMs`,
 * so a problem on the server can't stop the site from rendering.
 */
export async function loadSiteContent(timeoutMs = 2000): Promise<void> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}content/site-content.json?t=${Date.now()}`, {
      signal: ctrl.signal,
      cache: "no-store",
    });
    if (res.ok) apply(await res.json());
  } catch {
    /* no file yet / offline / bad JSON → defaults */
  } finally {
    clearTimeout(timer);
  }
}
