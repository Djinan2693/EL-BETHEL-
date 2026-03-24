/**
 * SEO utilities for El-Bethel Christian Fellowship Church
 * React + Vite SPA — manages <head> tags imperatively via hooks.
 */
import { useEffect } from "react";
import { useLocation } from "wouter";
import { churchInfo } from "../data/church";

/* ── Constants ───────────────────────────────────────────────────── */
export const SITE_URL     = "https://ebchristianfellowship.org";
export const DEFAULT_OG   = `${SITE_URL}/opengraph.jpg`;
export const SITE_NAME    = churchInfo.name;

/* ── Types ───────────────────────────────────────────────────────── */
export interface SEOProps {
  /** Page title — automatically gets " | El-Bethel Christian Fellowship Church" appended */
  title: string;
  description?: string;
  /** Relative path (/about) or full URL. Defaults to current route. */
  canonical?: string;
  /** Open Graph type. Default: "website" */
  ogType?: "website" | "article" | "video.other";
  /** Absolute URL to OG image. Defaults to /opengraph.jpg */
  ogImage?: string;
  /** Set to true for 404 / not-found pages */
  noindex?: boolean;
}

/* ── Internal helpers ─────────────────────────────────────────────── */
function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  (el as HTMLLinkElement).href = href;
}

/* ── Primary SEO hook ─────────────────────────────────────────────── */
export function useSEO({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage,
  noindex = false,
}: SEOProps) {
  const [location] = useLocation();

  useEffect(() => {
    const fullTitle =
      title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

    const desc =
      description ??
      "A Spirit-filled Christian community in Makati City, Philippines. Join us every Sunday at 4:00 PM for Spirit-led worship and expository preaching.";

    const image  = ogImage ?? DEFAULT_OG;
    const canon  = canonical
      ? canonical.startsWith("http")
        ? canonical
        : `${SITE_URL}${canonical}`
      : `${SITE_URL}${location}`;

    /* ── Title ── */
    document.title = fullTitle;

    /* ── Core meta ── */
    setMeta("name", "description",         desc);
    setMeta("name", "robots",              noindex ? "noindex, nofollow" : "index, follow");
    setMeta("name", "author",              SITE_NAME);

    /* ── Open Graph ── */
    setMeta("property", "og:title",        fullTitle);
    setMeta("property", "og:description",  desc);
    setMeta("property", "og:image",        image);
    setMeta("property", "og:url",          canon);
    setMeta("property", "og:type",         ogType);
    setMeta("property", "og:site_name",    SITE_NAME);
    setMeta("property", "og:locale",       "en_PH");

    /* ── Twitter / X ── */
    setMeta("name", "twitter:card",        "summary_large_image");
    setMeta("name", "twitter:title",       fullTitle);
    setMeta("name", "twitter:description", desc);
    setMeta("name", "twitter:image",       image);

    /* ── Canonical ── */
    setLink("canonical", canon);
  }, [title, description, canonical, ogType, ogImage, noindex, location]);
}

/* ── JSON-LD injection hook ──────────────────────────────────────── */
const JSONLD_ID = "jsonld-page";

export function useJsonLd(schema: Record<string, unknown> | null) {
  useEffect(() => {
    if (!schema) return;

    let script = document.getElementById(JSONLD_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id   = JSONLD_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema, null, 0);

    return () => {
      document.getElementById(JSONLD_ID)?.remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(schema)]);
}

/* ── BreadcrumbList helpers ───────────────────────────────────────── */

/**
 * Returns a full stand-alone BreadcrumbList document (with its own @context).
 * Use on pages where the breadcrumb is the only JSON-LD schema.
 */
export function buildBreadcrumbSchema(
  crumbs: { name: string; path: string }[],
) {
  return {
    "@context":        "https://schema.org",
    "@type":           "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type":    "ListItem",
      position:   i + 1,
      name:       c.name,
      item:       `${SITE_URL}${c.path}`,
    })),
  };
}

/**
 * Returns a bare BreadcrumbList node WITHOUT "@context".
 * Use when embedding this inside another schema's "@graph" array,
 * since the outer document already declares "@context".
 */
export function buildBreadcrumbItem(
  crumbs: { name: string; path: string }[],
) {
  return {
    "@type":           "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type":    "ListItem",
      position:   i + 1,
      name:       c.name,
      item:       `${SITE_URL}${c.path}`,
    })),
  };
}
