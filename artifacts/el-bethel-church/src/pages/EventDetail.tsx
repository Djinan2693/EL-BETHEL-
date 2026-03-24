import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import {
  Calendar, Clock, MapPin, Users, ChevronRight, ArrowLeft,
  Share2, Mail, Facebook, Twitter, Link2, Tag, BadgeCheck,
  MessageSquareHeart, Download, CheckCircle2, Star, Check,
  Image as ImageIcon,
} from "lucide-react";
import { useSEO, useJsonLd, SITE_URL, DEFAULT_OG, buildBreadcrumbItem } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { events, EventData } from "@/data/events";

/* ── animation helpers ──────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeIn  = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } };

/* ── SEO helpers ────────────────────────────────────────────────── */
function to24h(t: string): string {
  const [time, period] = t.trim().split(" ");
  const [h, m] = time.split(":").map(Number);
  const hh = period === "PM" && h !== 12 ? h + 12 : period === "AM" && h === 12 ? 0 : h;
  return `${String(hh).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/* ── category colour map ────────────────────────────────────────── */
const CAT_COLORS: Record<string, string> = {
  Weekly:           "bg-blue-50 text-blue-700 border-blue-200",
  "Special Service":"bg-slate-100 text-slate-700 border-slate-300",
  Family:           "bg-rose-50 text-rose-700 border-rose-200",
  Youth:            "bg-orange-50 text-orange-700 border-orange-200",
  Conference:       "bg-violet-50 text-violet-700 border-violet-200",
  Worship:          "bg-pink-50 text-pink-700 border-pink-200",
  Missions:         "bg-emerald-50 text-emerald-700 border-emerald-200",
  Women:            "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  Children:         "bg-cyan-50 text-cyan-700 border-cyan-200",
};

function CategoryPill({ cat }: { cat: string }) {
  const cls = CAT_COLORS[cat] ?? "bg-gray-50 text-gray-700 border-gray-200";
  return (
    <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${cls}`}>
      {cat}
    </span>
  );
}

function RelatedEventCard({ event }: { event: EventData }) {
  const d = event.date.startsWith("Every") ? null : new Date(event.dateISO + "T00:00:00");
  return (
    <Link href={`/events/${event.slug}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-2xl">
      <article className="bg-white border border-border rounded-2xl overflow-hidden hover:border-secondary/30 hover:shadow-md transition-all h-full flex flex-col">
        <div className={`${event.accentColor} h-2`} aria-hidden="true" />
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <CategoryPill cat={event.category} />
            {event.isFeatured && <Star size={12} className="text-secondary" aria-label="Featured" />}
          </div>
          <h3 className="font-serif font-bold text-primary text-lg leading-snug mb-2 group-hover:text-secondary transition-colors line-clamp-2 flex-1">
            {event.title}
          </h3>
          <div className="space-y-1 text-xs text-muted-foreground mt-3">
            <span className="flex items-center gap-1.5">
              <Calendar size={11} className="text-secondary" />
              {d ? `${d.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" })}` : event.date}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={11} className="text-secondary" />
              {event.location}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE COMPONENT
════════════════════════════════════════════════════════════════ */
export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const event = events.find((e) => e.slug === slug);

  const [copied, setCopied]   = useState(false);
  const [rsvpSent, setRsvpSent] = useState(false);

  /* ── SEO + JSON-LD — always called before any early return ── */
  useSEO(
    event
      ? {
          title:       event.title,
          description: event.excerpt.slice(0, 155),
          canonical:   `/events/${event.slug}`,
          ogType:      "website" as const,
        }
      : { title: "Event Not Found", description: "This event could not be found.", noindex: true },
  );

  useJsonLd(
    event
      ? {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type":              "Event",
              "@id":                `${SITE_URL}/events/${event.slug}#event`,
              name:                 event.title,
              description:          event.excerpt.slice(0, 300),
              startDate:            `${event.dateISO}T${to24h(event.time)}:00+08:00`,
              endDate:              `${event.dateISO}T${to24h(event.endTime)}:00+08:00`,
              eventStatus:          "https://schema.org/EventScheduled",
              eventAttendanceMode:  "https://schema.org/OfflineEventAttendanceMode",
              isAccessibleForFree:  event.cost.toLowerCase().includes("free"),
              location: {
                "@type": "Place",
                name:    event.location,
                address: {
                  "@type":           "PostalAddress",
                  streetAddress:     "7th Floor, KMC Armstrong Corporate Center, HV Dela Costa Street",
                  addressLocality:   "Salcedo Village, Makati City",
                  addressRegion:     "Metro Manila",
                  addressCountry:    "PH",
                },
              },
              organizer: { "@id": `${SITE_URL}/#organization` },
              image:     DEFAULT_OG,
              url:       `${SITE_URL}/events/${event.slug}`,
            },
            buildBreadcrumbItem([
              { name: "Home",   path: "/" },
              { name: "Events", path: "/events" },
              { name: event.title, path: `/events/${event.slug}` },
            ]),
          ],
        }
      : null,
  );

  /* ── 404 ──────────────────────────────────────────────────── */
  if (!event) {
    return (
      <main className="pt-40 pb-24 min-h-screen flex items-start justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <Calendar size={32} className="text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-3">Event Not Found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn't find that event. It may have ended or the link may be incorrect.
          </p>
          <Link href="/events">
            <Button className="rounded-full gap-2"><ArrowLeft size={16} /> All Events</Button>
          </Link>
        </div>
      </main>
    );
  }

  /* ── Related events ───────────────────────────────────────── */
  const related = events
    .filter((e) => e.id !== event.id && e.category === event.category)
    .slice(0, 3);

  const d = event.date.startsWith("Every")
    ? null
    : new Date(event.dateISO + "T00:00:00");

  const displayDate = d
    ? d.toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : event.date;

  /* ── Add-to-calendar URL (Google Calendar) ────────────────── */
  const calStart  = event.dateISO.replace(/-/g, "");
  const calText   = encodeURIComponent(event.title);
  const calLoc    = encodeURIComponent(event.address);
  const calDetail = encodeURIComponent(event.excerpt);
  const gcalUrl   = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calText}&dates=${calStart}/${calStart}&details=${calDetail}&location=${calLoc}`;

  /* ── Share functions ──────────────────────────────────────── */
  const pageUrl   = `${SITE_URL}/events/${event.slug}`;
  const pageTitle = event.title;

  function handleShare(platform: string) {
    switch (platform) {
      case "Facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
          "_blank", "noopener,noreferrer",
        );
        break;
      case "Twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle + " — El-Bethel Christian Fellowship Church")}`,
          "_blank", "noopener,noreferrer",
        );
        break;
      case "Copy":
        navigator.clipboard.writeText(pageUrl).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        }).catch(() => {
          const ta = document.createElement("textarea");
          ta.value = pageUrl;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        });
        break;
      case "Email":
        window.location.href = `mailto:?subject=${encodeURIComponent(pageTitle)}&body=${encodeURIComponent(`I'd like to invite you to this event:\n\n${pageTitle}\n📅 ${displayDate}\n⏰ ${event.time}${event.endTime ? " – " + event.endTime : ""}\n📍 ${event.location}\n\n${event.excerpt}\n\nMore info: ${pageUrl}`)}`;
        break;
      default:
        if (navigator.share) {
          navigator.share({ title: pageTitle, text: event.excerpt, url: pageUrl }).catch(() => {});
        }
    }
  }

  /* ── RSVP / I'll Be There ─────────────────────────────────── */
  function handleRsvp() {
    const subject = encodeURIComponent(`RSVP — ${event!.title} (${displayDate})`);
    const body = encodeURIComponent(
      `Hello El-Bethel,\n\nI would like to let you know that I'll be attending:\n\n📅 Event: ${event!.title}\n🗓️ Date: ${displayDate}\n⏰ Time: ${event!.time}${event!.endTime ? " – " + event!.endTime : ""}\n📍 Venue: ${event!.location}\n\nPlease count me in!\n\nThank you.`
    );
    window.location.href = `mailto:info@ebchristianfellowship.org?subject=${subject}&body=${body}`;
    setRsvpSent(true);
    setTimeout(() => setRsvpSent(false), 4000);
  }

  return (
    <main>

      {/* ════════════════════════════════════════════════════════
          1. HERO — with give-texture overlay
      ════════════════════════════════════════════════════════ */}
      <section aria-label="Event hero" className={`${event.accentColor} relative pt-36 pb-20 overflow-hidden`}>

        {/* Give-texture background overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "url('/images/give-texture.png')", backgroundSize: "cover", backgroundPosition: "center" }}
        />

        {/* Radial gradient overlay */}
        <div aria-hidden="true" className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 80% 30%, hsl(42 66% 54%), transparent 50%), radial-gradient(circle at 10% 80%, white, transparent 40%)" }}
        />

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-white/40 text-xs uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 rounded">Home</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <Link href="/events" className="hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 rounded">Events</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span className="text-white/70 line-clamp-1">{event.category}</span>
          </motion.nav>

          <div className="max-w-3xl">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-5">
                <CategoryPill cat={event.category} />
                {event.isFeatured && (
                  <span className="flex items-center gap-1 bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/30">
                    <Star size={9} /> Featured
                  </span>
                )}
                {event.registrationRequired && (
                  <span className="flex items-center gap-1 bg-white/10 text-white/70 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                    <BadgeCheck size={9} /> Registration Required
                  </span>
                )}
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight mb-6">
                {event.title}
              </motion.h1>

              <motion.div variants={fadeUp}
                className="flex flex-wrap gap-x-6 gap-y-2 text-white/65 text-sm mb-6">
                <span className="flex items-center gap-2 text-white/85 font-medium">
                  <Calendar size={14} className="text-white/70" aria-hidden="true" />
                  {displayDate}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} className="text-white/70" aria-hidden="true" />
                  {event.time}{event.endTime ? ` – ${event.endTime}` : ""}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-white/70" aria-hidden="true" />
                  {event.location}
                </span>
              </motion.div>

              <motion.p variants={fadeUp} className="text-white/65 text-lg leading-relaxed">
                {event.excerpt}
              </motion.p>
            </motion.div>
          </div>
        </Container>
        <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ════════════════════════════════════════════════════════
          2. CONTENT + SIDEBAR
      ════════════════════════════════════════════════════════ */}
      <section aria-label="Event details" className="py-16 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 xl:gap-16">

            {/* ── LEFT: content ─────────────────────────────── */}
            <div className="min-w-0">

              {/* Flyer image — shown only when available */}
              {event.flyer && (
                <motion.div
                  initial="hidden" animate="visible" variants={fadeIn}
                  className="mb-10"
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                    <ImageIcon size={13} aria-hidden="true" />
                    Event Flyer
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-white inline-block max-w-sm w-full">
                    <img
                      src={`/images/${event.flyer}`}
                      alt={`${event.title} — official event flyer`}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              )}

              {/* Description */}
              <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-10">
                <motion.h2 variants={fadeUp} className="text-2xl font-serif font-bold text-primary mb-5">
                  About This Event
                </motion.h2>
                {event.description.split("\n\n").map((para, i) => (
                  <motion.p key={i} variants={fadeUp} className="text-muted-foreground leading-[1.9] text-base mb-4">
                    {para}
                  </motion.p>
                ))}
              </motion.div>

              {/* What to Expect */}
              {event.whatToExpect && event.whatToExpect.length > 0 && (
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                  className="mb-10 p-7 bg-white rounded-2xl border border-border"
                >
                  <motion.h3 variants={fadeUp} className="text-xl font-serif font-bold text-primary mb-5">
                    What to Expect
                  </motion.h3>
                  <ul className="space-y-3">
                    {event.whatToExpect.map((item, i) => (
                      <motion.li key={i} variants={fadeUp} className="flex items-start gap-3">
                        <CheckCircle2 size={17} className="text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Schedule */}
              {event.schedule && event.schedule.length > 0 && (
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                  className="mb-10"
                >
                  <motion.h3 variants={fadeUp} className="text-xl font-serif font-bold text-primary mb-5">
                    Event Schedule
                  </motion.h3>
                  <div className="relative">
                    <div aria-hidden="true" className="absolute left-[52px] top-0 bottom-0 w-px bg-border" />
                    <div className="space-y-3">
                      {event.schedule.map(({ time, item }, i) => (
                        <motion.div key={i} variants={fadeUp} className="flex items-start gap-4">
                          <div className="w-24 shrink-0 text-right">
                            <span className="text-secondary text-xs font-bold">{time}</span>
                          </div>
                          <div className="relative z-10 w-3 h-3 rounded-full bg-secondary border-2 border-white shadow-sm mt-1 shrink-0" aria-hidden="true" />
                          <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">{item}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Map / Venue */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                className="mb-10"
              >
                <h3 className="text-xl font-serif font-bold text-primary mb-5">Venue & Location</h3>
                <div className="rounded-2xl overflow-hidden border border-border bg-primary/5 aspect-[16/7] relative">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/5 to-secondary/5">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <MapPin size={28} className="text-primary/40" aria-hidden="true" />
                    </div>
                    <div className="text-center">
                      <p className="font-serif font-bold text-primary text-lg">{event.location}</p>
                      <p className="text-muted-foreground text-sm mt-1 max-w-sm">{event.address}</p>
                    </div>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex items-center gap-2 text-sm text-secondary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
                    >
                      <MapPin size={14} /> Open in Google Maps
                    </a>
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin size={14} className="text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                  <p>{event.address}</p>
                </div>
              </motion.div>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-border">
                  <Tag size={13} className="text-muted-foreground" aria-hidden="true" />
                  {event.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* ── RIGHT: sidebar ────────────────────────────── */}
            <aside aria-label="Event sidebar" className="space-y-6">
              <div className="lg:sticky lg:top-28 space-y-6">

                {/* CTA card */}
                <div className={`${event.accentColor} rounded-2xl p-6 relative overflow-hidden`}>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-15"
                    style={{ backgroundImage: "url('/images/give-texture.png')", backgroundSize: "cover", backgroundPosition: "center" }}
                  />
                  <div aria-hidden="true" className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "radial-gradient(circle at 90% 10%, white, transparent 50%)" }}
                  />
                  <div className="relative z-10">
                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">{event.category}</p>
                    <p className="text-white font-serif font-bold text-xl leading-snug mb-4 line-clamp-2">{event.title}</p>
                    <div className="space-y-2">
                      {/* RSVP / I'll Be There button */}
                      {event.registrationRequired ? (
                        <Button
                          onClick={handleRsvp}
                          className={`w-full rounded-full gap-2 font-semibold transition-all ${rsvpSent ? "bg-green-500 text-white hover:bg-green-500" : "bg-white text-primary hover:bg-white/90"}`}
                          size="sm"
                        >
                          {rsvpSent
                            ? <><Check size={15} /> RSVP Sent!</>
                            : <><BadgeCheck size={15} /> Register / RSVP</>
                          }
                        </Button>
                      ) : (
                        <Button
                          onClick={handleRsvp}
                          className={`w-full rounded-full gap-2 font-semibold transition-all ${rsvpSent ? "bg-green-500 text-white hover:bg-green-500" : "bg-secondary text-secondary-foreground hover:bg-secondary/90"}`}
                          size="sm"
                        >
                          {rsvpSent
                            ? <><Check size={15} /> RSVP Sent!</>
                            : <><CheckCircle2 size={15} /> I'll Be There</>
                          }
                        </Button>
                      )}
                      <a href={gcalUrl} target="_blank" rel="noopener noreferrer" className="block">
                        <Button variant="outline" className="w-full rounded-full border-white/30 text-white hover:bg-white/10 bg-transparent gap-2" size="sm">
                          <Download size={15} /> Add to Calendar
                        </Button>
                      </a>
                    </div>
                    {rsvpSent && (
                      <p className="text-white/70 text-xs mt-3 text-center">
                        Your email client has opened — send the email to confirm your spot!
                      </p>
                    )}
                  </div>
                </div>

                {/* Event details card */}
                <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">Event Details</h2>
                  <dl className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                        <Calendar size={14} aria-hidden="true" />
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Date</dt>
                        <dd className="text-sm font-medium text-foreground mt-0.5">{displayDate}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                        <Clock size={14} aria-hidden="true" />
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Time</dt>
                        <dd className="text-sm font-medium text-foreground mt-0.5">
                          {event.time}{event.endTime ? ` – ${event.endTime}` : ""}
                        </dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                        <MapPin size={14} aria-hidden="true" />
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Venue</dt>
                        <dd className="text-sm font-medium text-foreground mt-0.5">{event.location}</dd>
                        <dd className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{event.address}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                        <Users size={14} aria-hidden="true" />
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Organiser</dt>
                        <dd className="text-sm font-medium text-foreground mt-0.5">{event.organizer}</dd>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Cost</dt>
                      <dd className="text-sm text-foreground leading-relaxed">{event.cost}</dd>
                    </div>
                  </dl>
                </div>

                {/* Share card */}
                <div className="bg-white border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Share2 size={14} className="text-muted-foreground" aria-hidden="true" />
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Share This Event</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleShare("Facebook")}
                      aria-label="Share on Facebook"
                      className="flex items-center gap-2 text-xs font-medium text-muted-foreground border border-border rounded-full px-3 py-2 transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                    >
                      <Facebook size={13} aria-hidden="true" /> Facebook
                    </button>
                    <button
                      onClick={() => handleShare("Twitter")}
                      aria-label="Share on X / Twitter"
                      className="flex items-center gap-2 text-xs font-medium text-muted-foreground border border-border rounded-full px-3 py-2 transition-all hover:bg-black hover:text-white hover:border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                    >
                      <Twitter size={13} aria-hidden="true" /> X / Twitter
                    </button>
                    <button
                      onClick={() => handleShare("Copy")}
                      aria-label="Copy link to clipboard"
                      className={`flex items-center gap-2 text-xs font-medium border rounded-full px-3 py-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${copied ? "bg-green-600 text-white border-green-600" : "text-muted-foreground border-border hover:bg-primary hover:text-white hover:border-primary"}`}
                    >
                      {copied ? <Check size={13} /> : <Link2 size={13} aria-hidden="true" />}
                      {copied ? "Copied!" : "Copy Link"}
                    </button>
                    <button
                      onClick={() => handleShare("Email")}
                      aria-label="Share via email"
                      className="flex items-center gap-2 text-xs font-medium text-muted-foreground border border-border rounded-full px-3 py-2 transition-all hover:bg-secondary hover:text-secondary-foreground hover:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                    >
                      <Mail size={13} aria-hidden="true" /> Email
                    </button>
                  </div>
                </div>

                {/* Contact / prayer */}
                <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                    <MessageSquareHeart size={20} aria-hidden="true" />
                  </div>
                  <h3 className="font-serif font-bold text-primary text-lg mb-2">Questions?</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Our team would love to help you prepare for this event.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2" size="sm">
                      <Mail size={14} /> Contact Us
                    </Button>
                  </Link>
                </div>

                {/* Back */}
                <Link href="/events">
                  <Button variant="outline" className="w-full rounded-full gap-2 border-border hover:border-secondary/40">
                    <ArrowLeft size={14} /> All Events
                  </Button>
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. RELATED EVENTS
      ════════════════════════════════════════════════════════ */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="py-20 bg-white border-t border-border">
          <Container>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="flex items-end justify-between gap-4 mb-10">
                <div>
                  <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-2">More to Explore</p>
                  <h2 id="related-heading" className="text-3xl font-serif font-bold text-primary">
                    Other {event.category} Events
                  </h2>
                </div>
                <Link href="/events" className="hidden sm:block shrink-0">
                  <Button variant="outline" size="sm" className="rounded-full gap-1.5">
                    All Events <ChevronRight size={14} />
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((e) => (
                  <motion.div key={e.id} variants={fadeUp}>
                    <RelatedEventCard event={e} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </Container>
        </section>
      )}

    </main>
  );
}
