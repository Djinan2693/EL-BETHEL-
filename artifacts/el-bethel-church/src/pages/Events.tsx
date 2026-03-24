import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Clock, MapPin, ChevronRight, Search,
  X, LayoutGrid, List, Users, ArrowRight, Star,
} from "lucide-react";
import { Link } from "wouter";
import { useSEO } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { events, allCategories, EventData } from "@/data/events";

/* ── animation variants ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

/* ── category colour map ────────────────────────────────────────── */
const CAT_COLORS: Record<string, string> = {
  Weekly:          "bg-blue-50 text-blue-700 border-blue-200",
  "Special Service":"bg-slate-100 text-slate-700 border-slate-300",
  Family:          "bg-rose-50 text-rose-700 border-rose-200",
  Youth:           "bg-orange-50 text-orange-700 border-orange-200",
  Conference:      "bg-violet-50 text-violet-700 border-violet-200",
  Worship:         "bg-pink-50 text-pink-700 border-pink-200",
  Missions:        "bg-emerald-50 text-emerald-700 border-emerald-200",
  Women:           "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  Children:        "bg-cyan-50 text-cyan-700 border-cyan-200",
};

function CategoryPill({ cat, small }: { cat: string; small?: boolean }) {
  const cls = CAT_COLORS[cat] ?? "bg-gray-50 text-gray-700 border-gray-200";
  return (
    <span className={`inline-flex items-center font-bold uppercase tracking-widest rounded-full border ${small ? "text-[9px] px-2 py-0.5" : "text-[10px] px-2.5 py-1"} ${cls}`}>
      {cat}
    </span>
  );
}

/* ── Date block ─────────────────────────────────────────────────── */
function DateBlock({ event, large }: { event: EventData; large?: boolean }) {
  if (event.date.startsWith("Every")) {
    return (
      <div className={`flex flex-col items-center justify-center bg-secondary text-secondary-foreground rounded-2xl ${large ? "w-24 h-24" : "w-16 h-16"} shrink-0`}>
        <Calendar size={large ? 22 : 16} aria-hidden="true" />
        <span className={`font-bold leading-tight mt-1 text-center ${large ? "text-xs" : "text-[9px]"}`}>Weekly</span>
      </div>
    );
  }
  const d = new Date(event.dateISO + "T00:00:00");
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day   = d.getDate();
  return (
    <div className={`flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-2xl ${large ? "w-24 h-24" : "w-16 h-16"} shrink-0`}>
      <span className={`text-secondary font-bold uppercase tracking-widest ${large ? "text-sm" : "text-[9px]"}`}>{month}</span>
      <span className={`font-sans font-bold leading-none tracking-tight ${large ? "text-4xl" : "text-2xl"}`}>{day}</span>
    </div>
  );
}

/* ── Featured Card ──────────────────────────────────────────────── */
function FeaturedCard({ event }: { event: EventData }) {
  return (
    <Link href={`/events/${event.slug}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-3xl">
      <motion.article
        variants={fadeUp}
        aria-label={`Featured event: ${event.title}`}
        className={`${event.accentColor} rounded-3xl overflow-hidden relative`}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 80% 20%, hsl(42 66% 54%), transparent 50%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
          <DateBlock event={event} large />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {event.isFeatured && (
                <span className="flex items-center gap-1 bg-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-secondary/30">
                  <Star size={9} /> Featured
                </span>
              )}
              <CategoryPill cat={event.category} />
            </div>
            <h2 className="text-white font-serif font-bold text-2xl md:text-3xl leading-snug mb-3 group-hover:text-secondary/90 transition-colors">
              {event.title}
            </h2>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-white/60 text-sm mb-4">
              <span className="flex items-center gap-1.5"><Clock size={13} className="text-secondary" /> {event.time}{event.endTime ? ` – ${event.endTime}` : ""}</span>
              <span className="flex items-center gap-1.5"><MapPin size={13} className="text-secondary" /> {event.location}</span>
              {event.registrationRequired && <span className="flex items-center gap-1.5"><Users size={13} className="text-secondary" /> Registration required</span>}
            </div>
            <p className="text-white/65 text-sm leading-relaxed line-clamp-2 mb-6">{event.excerpt}</p>
            <div className="flex gap-3">
              <Button size="sm" className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-1.5">
                View Details <ArrowRight size={13} />
              </Button>
              <span className="flex items-center text-white/50 text-xs gap-1.5">
                {event.cost}
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

/* ── Event Card — grid layout ───────────────────────────────────── */
function EventCardGrid({ event }: { event: EventData }) {
  return (
    <Link href={`/events/${event.slug}`} className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-2xl">
      <motion.article
        variants={fadeUp}
        aria-label={event.title}
        className="bg-white border border-border rounded-2xl overflow-hidden flex flex-col h-full hover:border-secondary/30 hover:shadow-lg transition-all"
      >
        {/* Top accent strip */}
        <div className={`${event.accentColor} h-2`} aria-hidden="true" />

        <div className="p-6 flex-1 flex flex-col">
          {/* Date + category */}
          <div className="flex items-start gap-4 mb-4">
            <DateBlock event={event} />
            <div className="pt-1">
              <CategoryPill cat={event.category} small />
              {event.isFeatured && (
                <span className="mt-1 flex items-center gap-1 text-[9px] text-secondary font-semibold uppercase tracking-wider">
                  <Star size={8} /> Featured
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-primary text-xl leading-snug mb-3 group-hover:text-secondary transition-colors line-clamp-2 flex-1">
            {event.title}
          </h3>

          {/* Meta */}
          <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-2">
              <Clock size={12} className="text-secondary shrink-0" />
              {event.isMultiDay ? event.dateRange : event.date} · {event.time}{event.endTime ? ` – ${event.endTime}` : ""}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={12} className="text-secondary shrink-0" />
              {event.location}
            </span>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-5">{event.excerpt}</p>

          <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
            <span className="text-xs text-muted-foreground">{event.cost}</span>
            <Button size="sm" className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-1 text-xs px-4">
              Details <ChevronRight size={12} />
            </Button>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

/* ── Event Card — list layout ───────────────────────────────────── */
function EventCardList({ event }: { event: EventData }) {
  return (
    <Link href={`/events/${event.slug}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-2xl">
      <motion.article
        variants={fadeUp}
        aria-label={event.title}
        className="bg-white border border-border rounded-2xl overflow-hidden hover:border-secondary/30 hover:shadow-md transition-all flex"
      >
        {/* Accent strip */}
        <div className={`${event.accentColor} w-1.5 shrink-0`} aria-hidden="true" />

        <div className="flex gap-5 p-5 flex-1 min-w-0 items-center">
          <DateBlock event={event} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-1.5 mb-2">
              <CategoryPill cat={event.category} small />
              {event.isFeatured && (
                <span className="flex items-center gap-1 text-[9px] text-secondary font-semibold uppercase tracking-wider">
                  <Star size={8} /> Featured
                </span>
              )}
            </div>
            <h3 className="font-serif font-bold text-primary text-lg leading-snug mb-1.5 group-hover:text-secondary transition-colors line-clamp-1">
              {event.title}
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Clock size={11} className="text-secondary" /> {event.time}{event.endTime ? ` – ${event.endTime}` : ""}</span>
              <span className="flex items-center gap-1.5"><MapPin size={11} className="text-secondary" /> {event.location}</span>
            </div>
          </div>
          <div className="shrink-0 hidden sm:block">
            <Button size="sm" className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-1 text-xs">
              Details <ChevronRight size={12} />
            </Button>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE COMPONENT
════════════════════════════════════════════════════════════════ */
export default function Events() {
  useSEO({
    title:       "Events",
    description: "Upcoming events at El-Bethel Christian Fellowship Church — Sunday worship services, special services, Easter, and community gatherings in Makati City, Philippines.",
    canonical:   "/events",
  });

  const [search,      setSearch]   = useState("");
  const [category,    setCategory] = useState("All");
  const [layout,      setLayout]   = useState<"grid" | "list">("grid");
  const [showPast,    setShowPast] = useState(false);

  const today = "2025-03-24";

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return events
      .filter((e) => {
        if (!showPast && e.dateISO < today && !e.date.startsWith("Every")) return false;
        if (category !== "All" && e.category !== category) return false;
        if (q && !e.title.toLowerCase().includes(q)
               && !e.location.toLowerCase().includes(q)
               && !e.excerpt.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => a.dateISO.localeCompare(b.dateISO));
  }, [search, category, showPast]);

  const featured  = filtered.filter((e) => e.isFeatured).slice(0, 2);
  const remaining = filtered.filter((e) => !e.isFeatured || featured.length >= 2 ? !featured.includes(e) : false);

  const hasFilters = search || category !== "All";

  return (
    <main>
      {/* ════════════════════════ HERO ═══════════════════════════ */}
      <section aria-label="Events page header" className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <img
            src={`${import.meta.env.BASE_URL}images/give-texture.png`}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <Container className="relative z-10 text-center max-w-3xl mx-auto pt-16">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}>
              <Calendar className="w-12 h-12 text-secondary mx-auto mb-6" />
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Events
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-primary-foreground/80 font-light italic font-serif text-xl mb-8">
              "Not giving up meeting together, as some are in the habit of doing, but encouraging one another."
            </motion.p>
            <motion.p variants={fadeUp} className="text-sm text-secondary uppercase tracking-widest font-semibold">
              — Hebrews 10:25
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════ FILTER + GRID ══════════════════════ */}
      <section aria-label="Events listing" className="py-16 bg-background">
        <Container>

          {/* ── Filter bar ───────────────────────────────────── */}
          <div className="sticky top-[72px] z-30 bg-background/80 backdrop-blur-md py-4 mb-8 -mx-4 px-4 border-b border-border">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-wrap">
              {/* Search */}
              <div className="relative flex-1 max-w-xs">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  type="search" value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search events…"
                  aria-label="Search events"
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all placeholder:text-muted-foreground"
                />
                {search && (
                  <button onClick={() => setSearch("")} aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                {["All", ...allCategories].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`text-xs font-medium px-3.5 py-2 rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40
                      ${category === cat
                        ? "bg-secondary text-secondary-foreground border-secondary shadow-sm"
                        : "bg-white border-border text-foreground hover:border-secondary/40 hover:bg-secondary/5"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Past toggle + layout */}
              <div className="sm:ml-auto flex items-center gap-3">
                <button
                  onClick={() => setShowPast((p) => !p)}
                  className={`text-xs font-medium px-3.5 py-2 rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40
                    ${showPast ? "bg-primary text-white border-primary" : "bg-white border-border text-muted-foreground hover:border-primary/40"}`}
                >
                  {showPast ? "Hide past" : "Show past"}
                </button>
                <div className="flex items-center gap-1 bg-muted rounded-full p-1">
                  <button aria-label="Grid layout" aria-pressed={layout === "grid"} onClick={() => setLayout("grid")}
                    className={`p-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${layout === "grid" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                    <LayoutGrid size={15} />
                  </button>
                  <button aria-label="List layout" aria-pressed={layout === "list"} onClick={() => setLayout("list")}
                    className={`p-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${layout === "list" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                    <List size={15} />
                  </button>
                </div>
              </div>
            </div>
            {hasFilters && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs text-muted-foreground mt-2.5 pl-1">
                Showing <span className="font-semibold text-foreground">{filtered.length}</span> event{filtered.length !== 1 ? "s" : ""}
                {search && <> matching "<span className="italic">{search}</span>"</>}
              </motion.p>
            )}
          </div>

          {/* ── Empty state ──────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center py-24">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <Calendar size={32} className="text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-primary mb-2">No events found</h2>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filters.</p>
                <Button variant="outline" onClick={() => { setSearch(""); setCategory("All"); }} className="rounded-full">
                  Clear filters
                </Button>
              </motion.div>
            ) : (
              <motion.div key="results" initial="hidden" animate="visible" variants={stagger}>

                {/* Featured events — only when no search filter */}
                {!hasFilters && featured.length > 0 && (
                  <div className="mb-10 space-y-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Featured Events</p>
                    {featured.map((e) => <FeaturedCard key={e.id} event={e} />)}
                    {remaining.length > 0 && (
                      <div className="flex items-center gap-3 pt-4" aria-hidden="true">
                        <div className="h-px flex-1 bg-border" />
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">All Upcoming Events</p>
                        <div className="h-px flex-1 bg-border" />
                      </div>
                    )}
                  </div>
                )}

                {/* Grid / list */}
                {layout === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(hasFilters ? filtered : remaining).map((e) => (
                      <EventCardGrid key={e.id} event={e} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {(hasFilters ? filtered : remaining).map((e) => (
                      <EventCardList key={e.id} event={e} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>

      {/* ═══════════════════════ CTA BANNER ══════════════════════ */}
      <section aria-label="Sunday service CTA" className="py-20 bg-white border-t border-border">
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div variants={fadeUp}>
              <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-3">Every Sunday</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4 leading-snug">
                The Best Event Is This Sunday's Service
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                All the events on this page flow from one thing: a church gathered every Sunday at 4:00 PM. Come and see what El-Bethel is really about — in person, this Sunday.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 gap-2 font-semibold">
                  <Calendar size={18} /> Plan Your Visit
                </Button>
              </Link>
              <Link href="/sermons">
                <Button size="lg" variant="outline" className="rounded-full px-8 gap-2">
                  Watch Online
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
