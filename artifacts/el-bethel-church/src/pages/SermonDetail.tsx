import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import {
  PlayCircle, Headphones, FileText, Share2, ChevronRight,
  Calendar, Clock, BookOpen, Mic2, ArrowLeft, MessageSquareHeart,
  Twitter, Facebook, Link2, Mail, ChevronLeft,
} from "lucide-react";
import { useSEO, useJsonLd, SITE_URL, DEFAULT_OG, buildBreadcrumbItem } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { sermons, SermonData } from "@/data/sermons";

/* ── animation helpers ──────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeIn  = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } };

/* ── topic colour map (mirrors Sermons listing) ─────────────────── */
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

/* ── SEO helpers ────────────────────────────────────────────────── */
/** "46:12" → "PT46M12S" (ISO 8601 duration) */
function isoDuration(str: string): string {
  const [m, s] = str.split(":").map(Number);
  return `PT${m}M${s}S`;
}
/** Extract YouTube video ID from watch URL */
function ytId(url: string): string {
  const m = url.match(/[?&]v=([^&]+)/);
  return m ? m[1] : url;
}

/* ── helper components ──────────────────────────────────────────── */
function TopicPill({ topic }: { topic: string }) {
  const cls = TOPIC_COLORS[topic] ?? "bg-gray-50 text-gray-700 border-gray-200";
  return (
    <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${cls}`}>
      {topic}
    </span>
  );
}

function SeriesPill({ series }: { series: string }) {
  return (
    <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 text-secondary">
      {series}
    </span>
  );
}

function RelatedCard({ sermon }: { sermon: SermonData }) {
  return (
    <Link href={`/sermons/${sermon.slug}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-2xl">
      <article className="bg-white border border-border rounded-2xl overflow-hidden hover:border-secondary/30 hover:shadow-lg transition-all h-full flex flex-col">
        {/* Thumbnail */}
        <div className="aspect-video relative bg-primary overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/90 via-primary to-secondary/30 p-5">
            <p className="text-secondary/70 text-[10px] font-bold uppercase tracking-widest text-center">{sermon.series}</p>
            <p className="text-white font-serif font-bold text-sm text-center leading-snug line-clamp-2">{sermon.title}</p>
          </div>
          <div className="absolute inset-0 flex items-end justify-end p-3">
            <span className="bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
              <Clock size={9} /> {sermon.duration}
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-secondary/80 flex items-center justify-center">
              <PlayCircle size={22} className="text-white" />
            </div>
          </div>
        </div>
        {/* Info */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex gap-1.5 mb-3">
            <SeriesPill series={sermon.series} />
            <TopicPill topic={sermon.topic} />
          </div>
          <h3 className="font-serif font-bold text-primary text-lg leading-snug mb-2 group-hover:text-secondary transition-colors line-clamp-2 flex-1">
            {sermon.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3">
            <span className="flex items-center gap-1"><Mic2 size={11} /> {sermon.speaker}</span>
            <span className="flex items-center gap-1"><Calendar size={11} /> {sermon.date}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE COMPONENT
════════════════════════════════════════════════════════════════ */
export default function SermonDetail() {
  const { slug } = useParams<{ slug: string }>();
  const sermon = sermons.find((s) => s.slug === slug);

  /* ── SEO + JSON-LD — always called before any early return ── */
  useSEO(
    sermon
      ? {
          title:       `${sermon.title} — ${sermon.speaker}`,
          description: sermon.excerpt.slice(0, 155),
          canonical:   `/sermons/${sermon.slug}`,
          ogType:      "video.other" as const,
        }
      : { title: "Sermon Not Found", description: "This sermon could not be found.", noindex: true },
  );

  useJsonLd(
    sermon
      ? {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type":       "VideoObject",
              "@id":         `${SITE_URL}/sermons/${sermon.slug}#video`,
              name:          sermon.title,
              description:   sermon.excerpt.slice(0, 300),
              uploadDate:    sermon.dateISO,
              duration:      isoDuration(sermon.duration),
              contentUrl:    sermon.videoUrl,
              embedUrl:      `https://www.youtube.com/embed/${ytId(sermon.videoUrl)}`,
              thumbnailUrl:  DEFAULT_OG,
              author:        { "@type": "Person", name: sermon.speaker },
              publisher:     { "@id": `${SITE_URL}/#organization` },
              url:           `${SITE_URL}/sermons/${sermon.slug}`,
            },
            buildBreadcrumbItem([
              { name: "Home",    path: "/" },
              { name: "Sermons", path: "/sermons" },
              { name: sermon.title, path: `/sermons/${sermon.slug}` },
            ]),
          ],
        }
      : null,
  );

  /* ── 404 state ────────────────────────────────────────────── */
  if (!sermon) {
    return (
      <main className="pt-40 pb-24 min-h-screen flex items-start justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <BookOpen size={32} className="text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-3">Sermon Not Found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn't find that message. It may have been removed or the link may be incorrect.
          </p>
          <Link href="/sermons">
            <Button className="rounded-full gap-2">
              <ArrowLeft size={16} /> Back to Sermons
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  /* ── Related sermons ──────────────────────────────────────── */
  const related = sermons
    .filter((s) => s.id !== sermon.id && (s.series === sermon.series || s.speaker === sermon.speaker))
    .slice(0, 3);

  /* ── Prev / next ──────────────────────────────────────────── */
  const idx  = sermons.findIndex((s) => s.id === sermon.id);
  const prev = idx < sermons.length - 1 ? sermons[idx + 1] : null;
  const next = idx > 0                  ? sermons[idx - 1] : null;

  return (
    <main>

      {/* ════════════════════════════════════════════════════════
          1. HERO — editorial dark banner
      ════════════════════════════════════════════════════════ */}
      <section
        aria-label="Sermon hero"
        className="relative pt-36 pb-20 bg-primary overflow-hidden"
      >
        {/* Background layers */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, hsl(42 66% 54%), hsl(42 66% 54%) 1px, transparent 1px, transparent 40px)" }}
          />
        </div>

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-white/40 text-xs uppercase tracking-widest mb-8"
          >
            <Link href="/" className="hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded">Home</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <Link href="/sermons" className="hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded">Sermons</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span className="text-secondary line-clamp-1">{sermon.series}</span>
          </motion.nav>

          <div className="max-w-4xl">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              {/* Pills */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-6">
                <SeriesPill series={sermon.series} />
                <TopicPill topic={sermon.topic} />
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight mb-6"
              >
                {sermon.title}
              </motion.h1>

              {/* Meta row */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-x-6 gap-y-2 text-white/60 text-sm mb-8"
              >
                <span className="flex items-center gap-2 text-white/80 font-medium">
                  <Mic2 size={14} className="text-secondary" aria-hidden="true" />
                  {sermon.speaker}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={14} className="text-secondary" aria-hidden="true" />
                  {sermon.date}
                </span>
                <span className="flex items-center gap-2">
                  <BookOpen size={14} className="text-secondary" aria-hidden="true" />
                  {sermon.scripture}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} className="text-secondary" aria-hidden="true" />
                  {sermon.duration}
                </span>
              </motion.div>

              {/* Excerpt */}
              <motion.p
                variants={fadeUp}
                className="text-white/60 text-lg leading-relaxed max-w-2xl"
              >
                {sermon.excerpt}
              </motion.p>
            </motion.div>
          </div>
        </Container>

        {/* Gradient bottom fade to white */}
        <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ════════════════════════════════════════════════════════
          2. VIDEO EMBED + CONTENT + SIDEBAR
      ════════════════════════════════════════════════════════ */}
      <section aria-label="Sermon content" className="py-16 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 xl:gap-16">

            {/* ── LEFT: video + transcript ───────────────────── */}
            <div className="min-w-0">

              {/* Video embed */}
              <motion.div
                initial="hidden" animate="visible" variants={fadeIn}
                className="relative aspect-video rounded-2xl overflow-hidden bg-primary shadow-2xl shadow-primary/20 mb-10 group"
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-secondary/20 flex flex-col items-center justify-center gap-4 p-8">
                  <SeriesPill series={sermon.series} />
                  <p className="text-white font-serif font-bold text-xl md:text-2xl text-center leading-snug max-w-lg">
                    {sermon.title}
                  </p>
                  <p className="text-white/50 text-sm">{sermon.speaker} · {sermon.date}</p>
                </div>

                {/* Play overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <button
                    aria-label={`Play sermon: ${sermon.title}`}
                    className="w-20 h-20 rounded-full bg-secondary border-4 border-white/20 flex items-center justify-center shadow-2xl shadow-secondary/40 hover:scale-110 hover:bg-secondary/90 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/50 group-hover:scale-105"
                  >
                    <PlayCircle size={36} className="text-secondary-foreground ml-1" aria-hidden="true" />
                  </button>
                  <span className="text-white/60 text-xs">Click to watch · {sermon.duration}</span>
                </div>

                {/* Placeholder label */}
                <div className="absolute top-4 right-4 bg-black/40 text-white/60 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
                  Video Placeholder
                </div>
              </motion.div>

              {/* Quick actions below video */}
              <motion.div
                initial="hidden" animate="visible" variants={stagger}
                className="flex flex-wrap gap-3 mb-12 pb-8 border-b border-border"
              >
                {[
                  { icon: PlayCircle,  label: "Watch",          variant: "default"  as const },
                  { icon: Headphones,  label: "Listen to Audio", variant: "outline" as const },
                  { icon: FileText,    label: "Download Notes",  variant: "outline" as const },
                  { icon: Share2,      label: "Share",           variant: "ghost"   as const },
                ].map(({ icon: Icon, label, variant }) => (
                  <motion.div key={label} variants={fadeUp}>
                    <Button
                      variant={variant}
                      size="sm"
                      className={`rounded-full gap-2 ${variant === "default" ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" : ""}`}
                    >
                      <Icon size={14} aria-hidden="true" />
                      {label}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>

              {/* ── Transcript / Message Content ─────────────── */}
              <motion.article
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                aria-label="Sermon transcript and content"
              >
                <motion.h2 variants={fadeUp} className="text-2xl font-serif font-bold text-primary mb-6">
                  Message Transcript
                </motion.h2>

                {/* Scripture reference block */}
                <motion.div
                  variants={fadeUp}
                  className="bg-primary text-primary-foreground rounded-2xl p-7 mb-8 relative overflow-hidden"
                >
                  <div aria-hidden="true"
                    className="absolute right-6 top-6 text-white/5 font-serif font-bold text-8xl select-none leading-none"
                  >"</div>
                  <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-3">
                    Key Scripture
                  </p>
                  <p className="text-white font-serif text-2xl font-bold leading-snug mb-3 relative z-10">
                    {sermon.scripture}
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed relative z-10">
                    Open your Bible and follow along as the Word of God anchors this message.
                  </p>
                </motion.div>

                {/* Pull-quote from transcript */}
                <motion.blockquote
                  variants={fadeUp}
                  className="relative border-l-4 border-secondary pl-7 my-10"
                >
                  <div aria-hidden="true" className="absolute -left-2 top-0 text-secondary/20 font-serif font-bold text-7xl select-none leading-none">"</div>
                  <p className="font-serif text-xl md:text-2xl text-primary leading-relaxed font-medium italic relative z-10">
                    {sermon.transcriptExcerpt}
                  </p>
                  <footer className="mt-4 flex items-center gap-3">
                    <div className="w-8 h-px bg-secondary" />
                    <cite className="text-sm text-muted-foreground not-italic font-medium">
                      {sermon.speaker}, <time dateTime={sermon.dateISO}>{sermon.date}</time>
                    </cite>
                  </footer>
                </motion.blockquote>

                {/* Extended content */}
                {[
                  {
                    heading: "Opening: Setting the Context",
                    body: `${sermon.excerpt} Every message we bring is grounded in this conviction: that the Bible is not merely an ancient document, but the living, breathing Word of God — relevant to every season of life in Metro Manila and beyond.`,
                  },
                  {
                    heading: "The Heart of the Message",
                    body: `Scripture speaks with remarkable precision to the human condition. In ${sermon.scripture}, we find not a theological abstraction but a practical truth that reaches into the everyday rhythms of life — the workplace, the home, the quiet moments of doubt and the loud seasons of testing.`,
                  },
                  {
                    heading: "Application: What Now?",
                    body: `True biblical preaching never ends with information — it ends with invitation. If this message has stirred something in you today, don't let it be a passing emotion. Let it be a turning point. Take one step this week: open your Bible to ${sermon.scripture}, read it slowly, and ask the Lord to make it real in your specific situation.`,
                  },
                  {
                    heading: "Closing Prayer",
                    body: `Lord, we thank You that Your Word does not return void. We ask that the seeds planted through this message would take root in hearts that are ready to receive. Let this not be another sermon heard and forgotten — but a moment of genuine encounter with the living God. In Jesus' name, Amen.`,
                  },
                ].map(({ heading, body }, i) => (
                  <motion.div key={i} variants={fadeUp} className="mb-8">
                    <h3 className="text-lg font-bold text-primary mb-3 font-serif">{heading}</h3>
                    <p className="text-muted-foreground leading-[1.9] text-base">{body}</p>
                  </motion.div>
                ))}

                {/* Series note */}
                <motion.div
                  variants={fadeUp}
                  className="bg-secondary/5 border border-secondary/20 rounded-2xl p-6 mt-10"
                >
                  <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-2">
                    Part of the "{sermon.series}" Series
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    This message is part of our ongoing series <span className="font-semibold text-foreground">"{sermon.series}"</span>.
                    Find all messages in this series on the{" "}
                    <Link href="/sermons" className="text-secondary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded">
                      Sermons page
                    </Link>
                    .
                  </p>
                </motion.div>
              </motion.article>

              {/* ── Prev / Next navigation ───────────────────── */}
              <div className="mt-16 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prev ? (
                  <Link href={`/sermons/${prev.slug}`} className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-2xl">
                    <div className="bg-white border border-border hover:border-secondary/40 rounded-2xl p-5 transition-all hover:shadow-md h-full">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <ChevronLeft size={13} /> Previous Sermon
                      </span>
                      <p className="font-serif font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                        {prev.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{prev.speaker}</p>
                    </div>
                  </Link>
                ) : <div />}
                {next ? (
                  <Link href={`/sermons/${next.slug}`} className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-2xl">
                    <div className="bg-white border border-border hover:border-secondary/40 rounded-2xl p-5 transition-all hover:shadow-md h-full text-right">
                      <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground mb-2">
                        Next Sermon <ChevronRight size={13} />
                      </span>
                      <p className="font-serif font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                        {next.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{next.speaker}</p>
                    </div>
                  </Link>
                ) : <div />}
              </div>
            </div>

            {/* ── RIGHT: sidebar ─────────────────────────────── */}
            <aside aria-label="Sermon sidebar" className="space-y-6">
              <div className="lg:sticky lg:top-28 space-y-6">

                {/* Metadata card */}
                <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">
                    Message Details
                  </h2>
                  <dl className="space-y-4">
                    {[
                      { icon: Mic2,     label: "Speaker",   value: sermon.speaker },
                      { icon: Calendar, label: "Date",      value: sermon.date },
                      { icon: BookOpen, label: "Scripture", value: sermon.scripture },
                      { icon: Clock,    label: "Duration",  value: sermon.duration },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                          <Icon size={14} aria-hidden="true" />
                        </div>
                        <div>
                          <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</dt>
                          <dd className="text-sm font-medium text-foreground mt-0.5">{value}</dd>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                        <FileText size={14} aria-hidden="true" />
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Series</dt>
                        <dd className="mt-1"><SeriesPill series={sermon.series} /></dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                        <BookOpen size={14} aria-hidden="true" />
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Topic</dt>
                        <dd className="mt-1"><TopicPill topic={sermon.topic} /></dd>
                      </div>
                    </div>
                  </dl>
                </div>

                {/* Quick listen */}
                <div className="bg-primary rounded-2xl p-6">
                  <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-3">Listen Anywhere</p>
                  <p className="text-white font-serif font-bold text-lg leading-snug mb-5 line-clamp-2">
                    {sermon.title}
                  </p>
                  <div className="space-y-2">
                    <Button className="w-full rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 justify-start" size="sm">
                      <PlayCircle size={15} /> Watch on YouTube
                    </Button>
                    <Button variant="outline" className="w-full rounded-full border-white/20 text-white hover:bg-white/10 bg-transparent gap-2 justify-start" size="sm">
                      <Headphones size={15} /> Listen to Podcast
                    </Button>
                    <Button variant="outline" className="w-full rounded-full border-white/20 text-white hover:bg-white/10 bg-transparent gap-2 justify-start" size="sm">
                      <FileText size={15} /> Download Notes PDF
                    </Button>
                  </div>
                </div>

                {/* Share */}
                <div className="bg-white border border-border rounded-2xl p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Share This Message</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: Facebook, label: "Facebook",   cls: "hover:bg-blue-600 hover:text-white hover:border-blue-600"   },
                      { icon: Twitter,  label: "X / Twitter", cls: "hover:bg-black hover:text-white hover:border-black"         },
                      { icon: Link2,    label: "Copy Link",   cls: "hover:bg-primary hover:text-white hover:border-primary"     },
                      { icon: Mail,     label: "Email",       cls: "hover:bg-secondary hover:text-secondary-foreground hover:border-secondary" },
                    ].map(({ icon: Icon, label, cls }) => (
                      <button
                        key={label}
                        aria-label={`Share on ${label}`}
                        className={`flex items-center gap-2 text-xs font-medium text-muted-foreground border border-border rounded-full px-3 py-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${cls}`}
                      >
                        <Icon size={13} aria-hidden="true" /> {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prayer request CTA */}
                <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                    <MessageSquareHeart size={20} aria-hidden="true" />
                  </div>
                  <h3 className="font-serif font-bold text-primary text-lg mb-2">
                    Need Prayer?
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    Did this message stir something in your heart? Our pastoral team would love to pray with you.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2" size="sm">
                      <MessageSquareHeart size={14} />
                      Send a Prayer Request
                    </Button>
                  </Link>
                </div>

                {/* Back to sermons */}
                <Link href="/sermons">
                  <Button variant="outline" className="w-full rounded-full gap-2 border-border hover:border-secondary/40">
                    <ArrowLeft size={14} /> All Sermons
                  </Button>
                </Link>

              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. RELATED SERMONS
      ════════════════════════════════════════════════════════ */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="py-20 bg-white border-t border-border">
          <Container>
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            >
              <motion.div variants={fadeUp} className="flex items-end justify-between gap-4 mb-10">
                <div>
                  <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-2">Continue Learning</p>
                  <h2 id="related-heading" className="text-3xl font-serif font-bold text-primary">
                    More from the "{sermon.series}" Series
                  </h2>
                </div>
                <Link href="/sermons" className="hidden sm:block shrink-0">
                  <Button variant="outline" size="sm" className="rounded-full gap-1.5">
                    All Sermons <ChevronRight size={14} />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {related.map((s) => (
                  <motion.div key={s.id} variants={fadeUp}>
                    <RelatedCard sermon={s} />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 text-center sm:hidden">
                <Link href="/sermons">
                  <Button variant="outline" className="rounded-full gap-2">
                    All Sermons <ChevronRight size={14} />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </Container>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          4. BOTTOM CTA
      ════════════════════════════════════════════════════════ */}
      <section aria-label="Invitation to visit" className="py-24 bg-primary relative overflow-hidden">
        <div aria-hidden="true"
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, hsl(42 66% 54%), transparent 50%)" }}
        />
        <Container className="relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.p variants={fadeUp} className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">
              The Door is Open
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif font-bold text-white mb-5 leading-tight">
              Hear More Like This — Live
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/65 text-lg leading-relaxed mb-10">
              Every Sunday, El-Bethel brings the same biblical depth you just encountered — live, in community, in the heart of Makati City.
              Come experience it in person.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="rounded-full px-10 h-14 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold gap-2">
                  <Calendar size={18} />
                  Plan Your Visit
                </Button>
              </Link>
              <Link href="/sermons">
                <Button size="lg" variant="outline" className="rounded-full px-10 h-14 border-white/25 text-white hover:bg-white/10 bg-transparent gap-2">
                  <ArrowLeft size={18} />
                  All Sermons
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

    </main>
  );
}
