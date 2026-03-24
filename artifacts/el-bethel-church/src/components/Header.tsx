import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronRight, Heart, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { churchInfo } from "@/data/church";

const NAV_LINKS = [
  { name: "Home",           path: "/" },
  { name: "About Us",       path: "/about" },
  { name: "Sermons",        path: "/sermons" },
  { name: "Events",         path: "/events" },
  { name: "Prayer Request", path: "/prayer" },
  { name: "Contact",        path: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [location]                  = useLocation();
  const drawerRef                   = useRef<HTMLDivElement>(null);
  const hamburgerRef                = useRef<HTMLButtonElement>(null);

  /* ── scroll detection ──────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── close on route change ─────────────────────────── */
  useEffect(() => { setDrawerOpen(false); }, [location]);

  /* ── close on Escape key ───────────────────────────── */
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeDrawer(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  /* ── trap body scroll while drawer is open ─────────── */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  /* ── focus first drawer link when opened ───────────── */
  useEffect(() => {
    if (drawerOpen) {
      const first = drawerRef.current?.querySelector<HTMLElement>("a, button");
      first?.focus();
    }
  }, [drawerOpen]);

  const isActive = (path: string) =>
    path === "/" ? location === "/" : location.startsWith(path);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          STICKY HEADER
      ═══════════════════════════════════════════════════════ */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/96 backdrop-blur-md shadow-sm border-b border-border/40 py-3"
            : "bg-transparent py-5",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">

            {/* ── Logo ──────────────────────────────────────── */}
            <Link
              href="/"
              className="flex items-center gap-3 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-lg"
              aria-label="El-Bethel Christian Fellowship — Home"
            >
              <img
                src="/images/logo.jpg"
                alt=""
                aria-hidden="true"
                className="w-11 h-11 rounded-full object-cover shadow-md ring-2 ring-secondary/40 group-hover:ring-secondary transition-all duration-300"
              />
              <div className="hidden sm:flex flex-col leading-tight">
                <span className={cn(
                  "font-serif text-[17px] font-bold tracking-tight transition-colors leading-snug",
                  scrolled ? "text-primary" : "text-white drop-shadow",
                )}>
                  El-Bethel
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary">
                  Christian Fellowship
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ───────────────────────────────── */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  aria-current={isActive(link.path) ? "page" : undefined}
                  className={cn(
                    "relative text-sm font-medium transition-colors group",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded",
                    "px-0.5 py-0.5",
                    isActive(link.path)
                      ? "text-secondary"
                      : scrolled
                        ? "text-foreground hover:text-secondary"
                        : "text-white/90 hover:text-secondary",
                  )}
                >
                  {link.name}
                  {/* animated underline */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-secondary rounded-full transition-all duration-300",
                      isActive(link.path) ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              ))}
            </nav>

            {/* ── Right Actions ─────────────────────────────── */}
            <div className="flex items-center gap-3">
              {/* Plan Your Visit — shown ≥ md */}
              <Link
                href="/contact"
                className="hidden md:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-full"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "rounded-full px-4 gap-1.5 font-medium transition-colors",
                    scrolled
                      ? "text-foreground hover:text-primary hover:bg-muted"
                      : "text-white/90 hover:text-white hover:bg-white/10",
                  )}
                >
                  <Calendar size={15} />
                  Plan Your Visit
                </Button>
              </Link>

              {/* Give Online CTA */}
              <Link
                href="/give"
                className="hidden sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-full"
              >
                <Button
                  size="sm"
                  className={cn(
                    "rounded-full px-5 gap-1.5 font-semibold transition-all duration-300 shadow-md",
                    scrolled
                      ? "bg-primary text-white hover:bg-primary/90 shadow-primary/20"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-secondary/30",
                  )}
                >
                  <Heart size={14} />
                  Give Online
                </Button>
              </Link>

              {/* Hamburger — shown < lg */}
              <button
                ref={hamburgerRef}
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={drawerOpen}
                aria-controls="mobile-drawer"
                className={cn(
                  "lg:hidden p-2 rounded-md transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
                  scrolled
                    ? "text-primary hover:bg-muted"
                    : "text-white hover:bg-white/10",
                )}
              >
                <Menu size={22} aria-hidden="true" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════
          MOBILE DRAWER — slides in from the right
      ═══════════════════════════════════════════════════════ */}

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeDrawer}
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      />

      {/* Drawer panel */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-[min(320px,90vw)]",
          "bg-primary flex flex-col shadow-2xl transition-transform duration-300 ease-in-out lg:hidden",
          drawerOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
          >
            <img
              src="/images/logo.jpg"
              alt=""
              aria-hidden="true"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-secondary/40"
            />
            <span className="font-serif text-white font-bold text-base">El-Bethel</span>
          </Link>
          <button
            onClick={closeDrawer}
            aria-label="Close navigation menu"
            className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Drawer nav links */}
        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              aria-current={isActive(link.path) ? "page" : undefined}
              className={cn(
                "flex items-center justify-between px-6 py-4 text-base font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary",
                isActive(link.path)
                  ? "text-secondary bg-white/5 border-r-2 border-secondary"
                  : "text-white/85 hover:text-white hover:bg-white/5",
              )}
            >
              {link.name}
              <ChevronRight
                size={16}
                aria-hidden="true"
                className={cn(
                  "transition-colors",
                  isActive(link.path) ? "text-secondary" : "text-white/30",
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Drawer CTA buttons */}
        <div className="px-6 py-6 border-t border-white/10 flex flex-col gap-3">
          <Link href="/contact" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-full">
            <Button
              variant="outline"
              className="w-full rounded-full border-white/30 text-white hover:bg-white/10 bg-transparent gap-2"
            >
              <Calendar size={16} />
              Plan Your Visit
            </Button>
          </Link>
          <Link href="/give" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-full">
            <Button
              variant="secondary"
              className="w-full rounded-full gap-2 font-semibold"
            >
              <Heart size={16} />
              Give Online
            </Button>
          </Link>
        </div>

        {/* Drawer footer info */}
        <div className="px-6 pb-8 text-center">
          <p className="text-white/40 text-xs leading-relaxed">
            {churchInfo.address}
          </p>
          <a
            href={`tel:${churchInfo.phone}`}
            className="text-secondary/80 text-xs hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded"
          >
            {churchInfo.phone}
          </a>
        </div>
      </div>
    </>
  );
}
