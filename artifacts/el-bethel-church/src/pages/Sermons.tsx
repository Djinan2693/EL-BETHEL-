import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, PlayCircle, Headphones, FileText, ChevronDown,
  X, Clock, Calendar, BookOpen, Mic2, LayoutGrid, List,
  Tv2, ChevronRight,
} from "lucide-react";
import { Link } from "wouter";
import { useSEO } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sermons, allSpeakers, allSeries, allTopics, SermonData } from "@/data/sermons";

/* ── animation variants ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

/* ── constants ──────────────────────────────────────────────────── */
const PAGE_SIZE = 6;

const TOPIC_COLORS: Record<string, string> = {
  Healing:       "bg-rose-50 text-rose-700 border-rose-200",
  "Holy Spirit": "bg-violet-50 text-violet-700 border-violet-200",
  Discipleship:  "bg-blue-50 text-blue-700 border-blue-200",
  Prayer:        "bg-amber-50 text-amber-700 border-amber-200",
  Foundations:   "bg-emerald-50 text-emerald-700 border-emerald-200",
  Missions:      "bg-orange-50 text-orange-700 border-orange-200",
  Grace:         "bg-pink-50 text-pink-700 border-pink-200",
  Community:     "bg-cyan-50 text-cyan-700 border-cyan-200",
  Faith:         "bg-indigo-50 text-indigo-700 border-indigo-200",
};

/* ── sub-components ─────────────────────────────────────────────── */
function SelectFilter({
  label, value, options, onChange,
}: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const active = value !== "";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50
          ${active
            ? "bg-secondary text-secondary-foreground border-secondary shadow-sm"
            : "bg-white border-border text-foreground hover:border-secondary/50 hover:bg-secondary/5"
          }`}
      >
        {value || label}
        {active ? (
          <span
            role="button"
            aria-label={`Clear ${label} filter`}
            onClick={(e) => { e.stopPropagation(); onChange(""); setOpen(false); }}
            className="ml-1 hover:opacity-70"
          >
            <X size={12} />
          </span>
        ) : (
          <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            aria-label={`${label} options`}
            onBlur={() => setOpen(false)}
            className="absolute left-0 top-full mt-2 z-50 bg-white border border-border rounded-2xl shadow-xl min-w-[180px] py-2 overflow-hidden"
          >
            {options.map((opt) => (
              <li
                key={opt}
                role="option"
                aria-selected={value === opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`px-4 py-2.5 text-sm cursor-pointer transition-colors
                  ${value === opt
                    ? "bg-secondary/10 text-secondary font-semibold"
                    : "hover:bg-muted text-foreground"
                  }`}
              >
                {opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function TopicBadge({ topic }: { topic: string }) {
  const cls = TOPIC_COLORS[topic] ?? "bg-gray-50 text-gray-700 border-gray-200";
  return (
    <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${cls}`}>
      {topic}
    </span>
  );
}

function ThumbnailPlaceholder({ title, series }: { title: string; series: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/80 via-primary to-primary/90 p-6">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle at 30% 70%, hsl(42 66% 54% / 0.4), transparent 60%)" }}
      />
      <p className="text-secondary/60 text-[10px] font-bold uppercase tracking-widest mb-2 text-center z-10">
        {series}
      </p>
      <p className="text-white font-serif font-bold text-base text-center leading-tight z-10 line-clamp-3">
        {title}
      </p>
    </div>
  );
}

/* ── Featured Sermon Card ───────────────────────────────────────── */
function FeaturedCard({ sermon }: { sermon: SermonData }) {
  return (
    <motion.article
      initial="hidden" animate="visible" variants={fadeUp}
      aria-label={`Featured sermon: ${sermon.title}`}
      className="group relative bg-primary rounded-3xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[340px]">
        {/* Thumbnail left — 2/5 */}
        <div className="lg:col-span-2 relative aspect-video lg:aspect-auto min-h-[200px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-secondary/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
            <p className="text-secondary text-xs font-bold uppercase tracking-widest">{sermon.series}</p>
            <button
              aria-label={`Watch ${sermon.title}`}
              className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <PlayCircle size={32} className="text-white group-hover:text-secondary-foreground transition-colors" aria-hidden="true" />
            </button>
            <p className="text-white/40 text-xs">{sermon.duration}</p>
          </div>
        </div>

        {/* Content right — 3/5 */}
        <div className="lg:col-span-3 flex flex-col justify-center p-8 lg:p-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-secondary/30">
              Latest Sermon
            </span>
            <TopicBadge topic={sermon.topic} />
          </div>
          <Link href={`/sermons/${sermon.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3 leading-snug group-hover:text-secondary/90 transition-colors">
              {sermon.title}
            </h2>
          </Link>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/50 text-xs mb-5">
            <span className="flex items-center gap-1.5"><Mic2 size={11} /> {sermon.speaker}</span>
            <span className="flex items-center gap-1.5"><Calendar size={11} /> {sermon.date}</span>
            <span className="flex items-center gap-1.5"><BookOpen size={11} /> {sermon.scripture}</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-8 line-clamp-3">
            {sermon.excerpt}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/sermons/${sermon.slug}`}>
              <Button size="sm" className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                <PlayCircle size={15} /> Watch Now
              </Button>
            </Link>
            <Button size="sm" variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 bg-transparent gap-2">
              <Headphones size={15} /> Listen
            </Button>
            <Button size="sm" variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 bg-transparent gap-2">
              <FileText size={15} /> Notes
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Sermon Grid Card ───────────────────────────────────────────── */
function SermonCard({ sermon, layout }: { sermon: SermonData; layout: "grid" | "list" }) {
  if (layout === "list") {
    return (
      <motion.article
        variants={fadeUp}
        aria-label={sermon.title}
        className="group flex gap-5 bg-white border border-border rounded-2xl p-5 hover:border-secondary/30 hover:shadow-md transition-all"
      >
        {/* Thumbnail */}
        <div className="shrink-0 w-36 sm:w-48 aspect-video relative rounded-xl overflow-hidden">
          <ThumbnailPlaceholder title={sermon.title} series={sermon.series} />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center group-hover:bg-secondary/80 transition-all">
              <PlayCircle size={18} className="text-white" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary border border-secondary/30 bg-secondary/5 px-2 py-0.5 rounded-full">
                {sermon.series}
              </span>
              <TopicBadge topic={sermon.topic} />
            </div>
            <span className="text-xs text-muted-foreground shrink-0 flex items-center gap-1">
              <Clock size={10} /> {sermon.duration}
            </span>
          </div>
          <Link href={`/sermons/${sermon.slug}`} className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded">
            <h3 className="font-serif font-bold text-primary text-lg leading-snug mb-2 group-hover:text-secondary transition-colors line-clamp-2">
              {sermon.title}
            </h3>
          </Link>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1"><Mic2 size={11} /> {sermon.speaker}</span>
            <span className="flex items-center gap-1"><Calendar size={11} /> {sermon.date}</span>
            <span className="flex items-center gap-1 italic"><BookOpen size={11} /> {sermon.scripture}</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">{sermon.excerpt}</p>
          <div className="flex gap-2 mt-4">
            <Link href={`/sermons/${sermon.slug}`}>
              <Button size="sm" className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-1.5 text-xs px-4">
                <PlayCircle size={13} /> Watch
              </Button>
            </Link>
            <Button size="sm" variant="outline" className="rounded-full text-xs gap-1.5 px-4">
              <Headphones size={13} /> Listen
            </Button>
            <Button size="sm" variant="ghost" className="rounded-full text-xs gap-1.5 px-3 text-muted-foreground hover:text-foreground">
              <FileText size={13} /> Notes
            </Button>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      variants={fadeUp}
      aria-label={sermon.title}
      className="group bg-white border border-border rounded-2xl overflow-hidden flex flex-col hover:border-secondary/30 hover:shadow-lg transition-all"
    >
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden bg-primary">
        <ThumbnailPlaceholder title={sermon.title} series={sermon.series} />
        <div className="absolute inset-0 flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-300">
          <div className="w-14 h-14 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center group-hover:bg-secondary/80 group-hover:border-secondary transition-all duration-300">
            <PlayCircle size={24} className="text-white" aria-hidden="true" />
          </div>
        </div>
        {/* Duration chip */}
        <div className="absolute bottom-3 right-3 z-20 bg-black/60 text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
          <Clock size={10} /> {sermon.duration}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-secondary border border-secondary/30 bg-secondary/5 px-2 py-0.5 rounded-full">
            {sermon.series}
          </span>
          <TopicBadge topic={sermon.topic} />
        </div>

        <Link href={`/sermons/${sermon.slug}`} className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded">
          <h3 className="font-serif font-bold text-primary text-xl leading-snug mb-3 group-hover:text-secondary transition-colors line-clamp-2">
            {sermon.title}
          </h3>
        </Link>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1 font-medium text-foreground/80">
            <Mic2 size={11} aria-hidden="true" /> {sermon.speaker}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={11} aria-hidden="true" /> {sermon.date}
          </span>
        </div>

        <p className="text-xs italic text-secondary/80 flex items-center gap-1.5 mb-3">
          <BookOpen size={11} aria-hidden="true" /> {sermon.scripture}
        </p>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
          {sermon.excerpt}
        </p>

        {/* Actions */}
        <div className="flex gap-2 mt-5 pt-4 border-t border-border">
          <Link href={`/sermons/${sermon.slug}`} className="flex-1">
            <Button size="sm" className="w-full rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-1.5 text-xs">
              <PlayCircle size={13} /> Watch
            </Button>
          </Link>
          <Button size="sm" variant="outline" className="rounded-full gap-1.5 text-xs px-3">
            <Headphones size={13} />
          </Button>
          <Button size="sm" variant="outline" className="rounded-full gap-1.5 text-xs px-3">
            <FileText size={13} />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE COMPONENT
════════════════════════════════════════════════════════════════ */
export default function Sermons() {
  useSEO({
    title:       "Sermons",
    description: "Watch and listen to the latest sermon messages from El-Bethel Christian Fellowship — expository, biblically-grounded preaching from Makati City, Philippines.",
    canonical:   "/sermons",
  });

  const [search,          setSearch]   = useState("");
  const [selectedSpeaker, setSpeaker]  = useState("");
  const [selectedSeries,  setSeries]   = useState("");
  const [selectedTopic,   setTopic]    = useState("");
  const [visibleCount,    setVisible]  = useState(PAGE_SIZE);
  const [layout,          setLayout]   = useState<"grid" | "list">("grid");

  const featured = sermons[0];

  /* ── filtered list (excludes featured when no filters active) ── */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const hasFilter = q || selectedSpeaker || selectedSeries || selectedTopic;
    const pool = hasFilter ? sermons : sermons.slice(1); // hide featured from grid unless searching

    return pool.filter((s) => {
      if (selectedSpeaker && s.speaker !== selectedSpeaker) return false;
      if (selectedSeries  && s.series  !== selectedSeries)  return false;
      if (selectedTopic   && s.topic   !== selectedTopic)   return false;
      if (q && !s.title.toLowerCase().includes(q)
             && !s.speaker.toLowerCase().includes(q)
             && !s.scripture.toLowerCase().includes(q)
             && !s.excerpt.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, selectedSpeaker, selectedSeries, selectedTopic]);

  const hasFilters = !!(search || selectedSpeaker || selectedSeries || selectedTopic);
  const visible    = filtered.slice(0, visibleCount);
  const canLoadMore = visibleCount < filtered.length;

  function clearAll() {
    setSearch(""); setSpeaker(""); setSeries(""); setTopic("");
    setVisible(PAGE_SIZE);
  }

  return (
    <main>
      {/* ═══════════════════════════════════ HERO ════════════════════ */}
      <section
        aria-label="Sermons page header"
        className="pt-36 pb-16 bg-background border-b border-border relative overflow-hidden"
      >
        <div aria-hidden="true"
          className="absolute right-0 top-0 w-[480px] h-[480px] rounded-full bg-secondary/5 -translate-y-1/2 translate-x-1/3" />
        <Container className="relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.nav variants={fadeUp} aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-muted-foreground text-xs mb-6 uppercase tracking-widest">
              <Link href="/" className="hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded">Home</Link>
              <ChevronRight size={12} aria-hidden="true" />
              <span className="text-secondary">Sermons</span>
            </motion.nav>
            <motion.p variants={fadeUp} className="text-secondary text-xs font-bold uppercase tracking-widest mb-3">
              Watch · Listen · Study
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-serif font-bold text-primary mb-5 leading-tight">
              Sermons
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Faith comes by hearing, and hearing by the Word of God. Catch up on our latest
              messages, dig into a series, or search by speaker, topic, or Scripture.
            </motion.p>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Tv2 size={15} className="text-secondary" /> {sermons.length} messages</span>
              <span className="w-px h-4 bg-border" />
              <span className="flex items-center gap-1.5"><Mic2 size={15} className="text-secondary" /> {allSpeakers.length} speakers</span>
              <span className="w-px h-4 bg-border" />
              <span className="flex items-center gap-1.5"><BookOpen size={15} className="text-secondary" /> {allSeries.length} series</span>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════ FEATURED + FILTERS + GRID ══════════════ */}
      <section aria-label="Sermon library" className="py-16 bg-background">
        <Container>

          {/* Featured — only when no filter active */}
          {!hasFilters && (
            <div className="mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                Latest Message
              </p>
              <FeaturedCard sermon={featured} />
            </div>
          )}

          {/* ── Filter bar ────────────────────────────────────────── */}
          <div className="sticky top-[72px] z-30 bg-background/80 backdrop-blur-md py-4 mb-8 -mx-4 px-4 border-b border-border">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

              {/* Search */}
              <div className="relative flex-1 max-w-xs">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setVisible(PAGE_SIZE); }}
                  placeholder="Search sermons…"
                  aria-label="Search sermons"
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all placeholder:text-muted-foreground"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Dropdowns */}
              <div className="flex flex-wrap gap-2 items-center">
                <SelectFilter label="Speaker"  value={selectedSpeaker} options={allSpeakers} onChange={(v) => { setSpeaker(v); setVisible(PAGE_SIZE); }} />
                <SelectFilter label="Series"   value={selectedSeries}  options={allSeries}   onChange={(v) => { setSeries(v);  setVisible(PAGE_SIZE); }} />
                <SelectFilter label="Topic"    value={selectedTopic}   options={allTopics}   onChange={(v) => { setTopic(v);   setVisible(PAGE_SIZE); }} />

                {hasFilters && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 underline underline-offset-2 px-2 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
                  >
                    <X size={11} /> Clear all
                  </button>
                )}
              </div>

              {/* Layout toggle */}
              <div className="sm:ml-auto flex items-center gap-1 bg-muted rounded-full p-1">
                <button
                  aria-label="Grid layout" aria-pressed={layout === "grid"}
                  onClick={() => setLayout("grid")}
                  className={`p-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary
                    ${layout === "grid" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  aria-label="List layout" aria-pressed={layout === "list"}
                  onClick={() => setLayout("list")}
                  className={`p-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary
                    ${layout === "list" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <List size={15} />
                </button>
              </div>
            </div>

            {/* Active filter summary */}
            {hasFilters && (
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs text-muted-foreground mt-2.5 pl-1"
              >
                Showing <span className="font-semibold text-foreground">{filtered.length}</span> sermon{filtered.length !== 1 ? "s" : ""}
                {search && <> matching "<span className="italic">{search}</span>"</>}
              </motion.p>
            )}
          </div>

          {/* ── Sermon grid / list ────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-muted-foreground" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-primary mb-2">No sermons found</h2>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria.</p>
                <Button variant="outline" onClick={clearAll} className="rounded-full">
                  Clear all filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={`${layout}-${search}-${selectedSpeaker}-${selectedSeries}-${selectedTopic}`}
                initial="hidden" animate="visible" variants={stagger}
                className={layout === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
                }
              >
                {visible.map((sermon) => (
                  <SermonCard key={sermon.id} sermon={sermon} layout={layout} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Load more ─────────────────────────────────────────── */}
          {canLoadMore && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mt-12 flex flex-col items-center gap-3"
            >
              <p className="text-sm text-muted-foreground">
                Showing {visible.length} of {filtered.length} sermons
              </p>
              {/* Progress bar */}
              <div className="w-48 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full transition-all duration-500"
                  style={{ width: `${(visible.length / filtered.length) * 100}%` }}
                />
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded-full mt-2 border-secondary/30 text-secondary hover:bg-secondary hover:text-secondary-foreground gap-2"
              >
                Load More Sermons
                <ChevronDown size={16} />
              </Button>
            </motion.div>
          )}

          {/* ── End of results ────────────────────────────────────── */}
          {!canLoadMore && filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mt-12 text-center text-sm text-muted-foreground"
            >
              You've reached the end · {filtered.length} sermon{filtered.length !== 1 ? "s" : ""} shown
            </motion.div>
          )}
        </Container>
      </section>

      {/* ════════════════════════════ CTA BANNER ═════════════════════ */}
      <section aria-label="Newsletter CTA" className="py-20 bg-primary relative overflow-hidden">
        <div aria-hidden="true"
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(42 66% 54%), transparent 50%), radial-gradient(circle at 80% 50%, hsl(229 65% 50%), transparent 50%)" }}
        />
        <Container className="relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            <motion.div variants={fadeUp}>
              <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-3">Never Miss a Message</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-snug">
                Get Sermons Delivered to Your Inbox
              </h2>
              <p className="text-white/65 leading-relaxed">
                Join hundreds of El-Bethel members who receive weekly sermon notes, Scripture devotionals, and new message alerts every Sunday.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address for sermon newsletter"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:border-secondary transition-all"
              />
              <Button className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-7 shrink-0 font-semibold">
                Subscribe
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
