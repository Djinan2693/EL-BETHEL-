import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, PlayCircle, MapPin, Clock,
  Heart, Mail, Phone, BookOpen, Users, Star,
  Send, HeartHandshake, Globe, X, Loader2, CheckCircle,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSEO } from "@/lib/seo";
import { sermons } from "@/data/sermons";
import { events } from "@/data/events";
import { churchInfo, testimonials } from "@/data/church";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } }
};

/* ── Hero slider data ──────────────────────────────────────────── */
const HERO_SLIDES = [
  {
    src: "images/hero-slide-1.jpg",
    alt: "Worship and praise at El-Bethel Christian Fellowship Church",
  },
  {
    src: "images/hero-slide-2.jpg",
    alt: "Community and fellowship at El-Bethel Christian Fellowship Church",
  },
  {
    src: "images/hero-slide-3.jpg",
    alt: "Sunday service at El-Bethel Christian Fellowship Church",
  },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: [0.32, 0.72, 0, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1] },
  }),
};

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="h-px flex-1 bg-secondary/30" />
      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
      <div className="h-px flex-1 bg-secondary/30" />
    </div>
  );
}

export default function Home() {
  useSEO({
    title:       "El-Bethel Christian Fellowship Church",
    description: "A Spirit-filled Christian community in the heart of Makati City, Philippines. Join us every Sunday at 4:00 PM for worship, expository preaching, and genuine community.",
    canonical:   "/",
  });

  // Hero slider
  const [heroIndex, setHeroIndex] = useState(0);
  const [slideDir, setSlideDir] = useState(1);

  const goToSlide = useCallback((next: number, dir: number) => {
    setSlideDir(dir);
    setHeroIndex(next);
  }, []);

  const prevSlide = useCallback(() => {
    goToSlide((heroIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length, -1);
  }, [heroIndex, goToSlide]);

  const nextSlide = useCallback(() => {
    goToSlide((heroIndex + 1) % HERO_SLIDES.length, 1);
  }, [heroIndex, goToSlide]);

  // Auto-advance every 6 s
  useEffect(() => {
    const id = setInterval(() => {
      setSlideDir(1);
      setHeroIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 35000);
    return () => clearInterval(id);
  }, [heroIndex]);

  // Newsletter
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  // Prayer modal
  const [prayerOpen, setPrayerOpen] = useState(false);
  const [prayerName, setPrayerName] = useState("");
  const [prayerEmail, setPrayerEmail] = useState("");
  const [prayerRequest, setPrayerRequest] = useState("");
  const [prayerLoading, setPrayerLoading] = useState(false);
  const [prayerDone, setPrayerDone] = useState(false);

  const featuredSermons = sermons.slice(0, 3);
  const upcomingEvents = events.slice(0, 3);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || subscribing) return;
    setSubscribing(true);
    try {
      await fetch("/api/email/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribed(true);
      setEmail("");
    } finally {
      setSubscribing(false);
    }
  }

  async function handlePrayerSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prayerRequest.trim() || prayerLoading) return;
    setPrayerLoading(true);
    try {
      await fetch("/api/email/prayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: prayerName, email: prayerEmail, request: prayerRequest }),
      });
      setPrayerDone(true);
    } catch {
      setPrayerDone(true);
    } finally {
      setPrayerLoading(false);
    }
  }

  function closePrayer() {
    setPrayerOpen(false);
    setTimeout(() => { setPrayerDone(false); setPrayerName(""); setPrayerEmail(""); setPrayerRequest(""); }, 400);
  }

  return (
    <main className="overflow-x-hidden">

      {/* ══════════════════════════════════════════
          1. HERO SECTION
      ══════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        aria-label="Welcome — hero slideshow"
      >
        {/* ── Slider images ────────────────────────────────────── */}
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <AnimatePresence initial={false} custom={slideDir}>
            <motion.div
              key={heroIndex}
              custom={slideDir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <img
                src={`${import.meta.env.BASE_URL}${HERO_SLIDES[heroIndex].src}`}
                alt={HERO_SLIDES[heroIndex].alt}
                className="w-full h-full object-cover object-center"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Persistent gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/15 to-primary/75 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 z-10" />
        </div>


        {/* ── Arrow: previous ──────────────────────────────────── */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-13 md:h-13 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          <ChevronLeft size={20} />
        </button>

        {/* ── Arrow: next ─────────────────────────────────────── */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-13 md:h-13 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          <ChevronRight size={20} />
        </button>

        {/* ── Main text content ────────────────────────────────── */}
        <Container className="relative z-20 text-center text-white pt-28 pb-20">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp}
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-secondary/60 text-secondary text-xs font-semibold tracking-widest mb-8 uppercase">
              <Star size={12} className="fill-secondary" /> Genesis 35:7
            </motion.span>

            <motion.h1 variants={fadeUp}
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold mb-6 drop-shadow-xl leading-[0.95] tracking-tight">
              Where Faith
              <br />
              <span className="italic text-secondary font-light">&amp;</span>{" "}
              <span className="text-white">Family Meet</span>
            </motion.h1>

            <motion.p variants={fadeUp}
              className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              A Spirit-filled community in the heart of Makati City — dedicated to
              knowing Christ and making Him known in every area of life.
            </motion.p>

            <motion.div variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <Button size="lg"
                  className="rounded-full px-9 h-14 text-base font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg shadow-secondary/20 hover:shadow-secondary/40 transition-all duration-300">
                  Plan Your Visit
                </Button>
              </Link>
              <Link href="/sermons">
                <Button size="lg" variant="outline"
                  className="rounded-full px-9 h-14 text-base text-white border-white/40 hover:bg-white/10 bg-transparent backdrop-blur-sm">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Online
                </Button>
              </Link>
            </motion.div>

            {/* ── Dot indicators ─────────────────────────────── */}
            <motion.div variants={fadeIn} className="mt-12 flex items-center justify-center gap-2.5" role="tablist" aria-label="Slide indicators">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === heroIndex}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goToSlide(i, i > heroIndex ? 1 : -1)}
                  className={`transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                    i === heroIndex
                      ? "w-8 h-2.5 bg-secondary"
                      : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </motion.div>

          </motion.div>
        </Container>

        {/* ── Bottom stat bar ──────────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-secondary/10 backdrop-blur-md border-t border-secondary/20">
          <Container>
            <div className="grid grid-cols-3 divide-x divide-white/10 py-5">
              {[
                { value: "20+", label: "Years of Ministry" },
                { value: "100+", label: "Church Family" },
                { value: "6", label: "Active Ministries" },
              ].map(stat => (
                <div key={stat.label} className="px-4 text-center">
                  <div className="text-2xl md:text-3xl font-serif font-bold text-secondary">{stat.value}</div>
                  <div className="text-xs text-white/60 mt-0.5 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          2. WELCOME / INTRODUCTION
      ══════════════════════════════════════════ */}
      <SectionWrapper className="bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}>
              <div className="absolute inset-0 bg-secondary/15 translate-x-5 translate-y-5 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-4 border-t-4 border-secondary rounded-tl-xl" />
              <img
                src={`${import.meta.env.BASE_URL}images/about-community.jpg`}
                alt="Church Community"
                className="rounded-2xl shadow-2xl w-full h-auto aspect-[4/3] object-cover object-top border-4 border-white"
              />
              {/* Floating verse card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-xl max-w-[200px] border border-border/50">
                <p className="text-xs font-serif italic text-muted-foreground leading-relaxed">
                  "And He came to a place called El-Bethel, and there He built an altar."
                </p>
                <p className="text-[10px] text-secondary font-bold mt-2 uppercase tracking-widest">Genesis 35:7</p>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              className="order-1 lg:order-2"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp}>
                <SectionHeading title="A Place to Belong" subtitle="Our Story" />
              </motion.div>
              <motion.div variants={fadeUp} className="space-y-5 text-muted-foreground leading-relaxed mb-8">
                <p>
                  El-Bethel Christian Fellowship Church has been a place of encounter — a spiritual home where lives are changed, families are restored, and communities are transformed by the power of the Gospel.
                </p>
                <p>
                  Founded on the scripture of Genesis 35:7, we believe that just as Jacob built an altar at Bethel — a place where God revealed Himself — our church exists to be that sacred space in every believer's life.
                </p>
                <p className="font-medium text-foreground">
                  Whether you're seeking answers, rebuilding your faith, or hungry to grow deeper in God, <span className="text-secondary">there is a place for you here.</span>
                </p>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link href="/about">
                  <Button variant="ghost" className="text-primary p-0 hover:bg-transparent hover:text-secondary group text-base font-semibold">
                    Discover Our Story <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>


      {/* ══════════════════════════════════════════
          3. SERVICE TIMES
      ══════════════════════════════════════════ */}
      <section className="bg-primary py-20 relative overflow-hidden">
        {/* Photo background */}
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={`${import.meta.env.BASE_URL}images/welcome-bg.jpg`}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-primary/90" />
        </div>
        <Container className="relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-secondary text-xs font-bold uppercase tracking-widest mb-3">
              You Are Always Welcome
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif text-white font-bold">
              Join Us This Week
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 mt-3 max-w-lg mx-auto">
              Come as you are. Every service is an invitation to encounter the living God.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <BookOpen size={26} />,
                day: "Sunday",
                name: "Sunday Worship Service",
                time: "9:00 AM & 11:00 AM",
                location: "Main Sanctuary",
                detail: "Live praise & worship, expository teaching, and fellowship."
              },
              {
                icon: <Heart size={26} />,
                day: "Wednesday",
                name: "Wednesday Prayer Night",
                time: "7:00 PM",
                location: "Online & In-Person",
                detail: "Corporate prayer, intercession, and midweek spiritual refreshing."
              },
              {
                icon: <Users size={26} />,
                day: "Friday",
                name: "Youth Friday Night",
                time: "6:30 PM",
                location: "Youth Hall",
                detail: "Spirit-filled gathering for teens and young adults to connect and grow."
              }
            ].map(service => (
              <motion.div key={service.name} variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-secondary/40 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-primary transition-colors duration-300">
                  {service.icon}
                </div>
                <span className="text-secondary text-xs font-bold uppercase tracking-widest">{service.day}</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-1">{service.name}</h3>
                <p className="text-2xl font-serif text-secondary/90 font-semibold mb-3">{service.time}</p>
                <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
                  <MapPin size={14} className="text-secondary" /> {service.location}
                </div>
                <GoldDivider />
                <p className="text-white/60 text-sm mt-3 leading-relaxed">{service.detail}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mt-12">
            <Link href="/contact">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8">
                <MapPin className="mr-2 h-4 w-4 text-secondary" />
                Get Directions
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>


      {/* ══════════════════════════════════════════
          4. LATEST SERMONS
      ══════════════════════════════════════════ */}
      <SectionWrapper className="bg-background">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <SectionHeading title="Recent Messages" subtitle="Listen &amp; Grow" className="mb-0" />
            <Link href="/sermons" className="hidden md:block">
              <Button variant="outline" className="rounded-full">
                View All Sermons <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSermons.map(sermon => (
              <motion.div key={sermon.id} variants={fadeUp}>
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-400 border-border/60 h-full flex flex-col">
                  {/* Thumbnail */}
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/60 transition-colors z-10" />
                    <img
                      src={`${import.meta.env.BASE_URL}images/pattern-cross.png`}
                      alt=""
                      className="absolute inset-0 opacity-10 mix-blend-overlay w-full h-full object-cover"
                    />
                    <div className="z-20 flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-full border-2 border-white/50 flex items-center justify-center group-hover:border-secondary group-hover:scale-110 transition-all duration-300">
                        <PlayCircle className="text-white w-8 h-8" />
                      </div>
                      <span className="text-white/60 text-xs">{sermon.duration}</span>
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-center mb-3">
                      <Badge className="bg-secondary/15 text-secondary border-0 hover:bg-secondary/25 text-xs font-semibold">
                        {sermon.topic}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{sermon.date}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-1 group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                      {sermon.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{sermon.speaker}</p>
                    <p className="text-xs text-secondary font-medium mb-4">{sermon.scripture}</p>
                    <div className="mt-auto pt-4 border-t border-border flex gap-4">
                      <Button variant="ghost" size="sm" className="px-0 hover:bg-transparent text-primary text-sm font-semibold">
                        <PlayCircle className="mr-1.5 w-4 h-4" /> Watch
                      </Button>
                      <Button variant="ghost" size="sm" className="px-0 hover:bg-transparent text-muted-foreground text-sm">
                        <BookOpen className="mr-1.5 w-4 h-4" /> Notes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/sermons">
              <Button variant="outline" className="rounded-full w-full">View All Sermons</Button>
            </Link>
          </div>
        </Container>
      </SectionWrapper>


      {/* ══════════════════════════════════════════
          5. UPCOMING EVENTS
      ══════════════════════════════════════════ */}
      <SectionWrapper className="bg-white border-y border-border/50">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <SectionHeading title="Upcoming Events" subtitle="Mark Your Calendar" className="mb-0" />
            <Link href="/events" className="hidden md:block">
              <Button variant="outline" className="rounded-full">
                All Events <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="space-y-4">
            {upcomingEvents.map(event => {
              const parts = event.date.split(" ");
              const month = parts[0];
              const day = parts[1]?.replace(",", "") ?? "";
              return (
                <motion.div key={event.id} variants={fadeUp}
                  className="bg-white border border-border/70 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center hover:shadow-lg hover:border-secondary/30 transition-all duration-300 group">
                  {/* Date badge */}
                  <div className="shrink-0 w-20 h-20 rounded-xl bg-primary/5 border border-primary/10 flex flex-col items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-secondary mb-0.5">{month}</span>
                    <span className="text-3xl font-serif font-bold text-primary group-hover:text-white leading-none transition-colors">{day}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="mb-2 text-[10px] font-bold uppercase tracking-wider">{event.category}</Badge>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-secondary transition-colors">{event.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1 mb-3">{event.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Clock size={14} className="text-secondary" /> {event.time}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={14} className="text-secondary" /> {event.location}</span>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto">
                    <Button size="sm" variant="ghost"
                      className="w-full sm:w-auto rounded-full border border-border text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/events">
              <Button variant="outline" className="rounded-full w-full">All Events</Button>
            </Link>
          </div>
        </Container>
      </SectionWrapper>


      {/* ══════════════════════════════════════════
          6. PRAYER REQUEST HIGHLIGHT
      ══════════════════════════════════════════ */}
      <SectionWrapper dark>
        {/* Photo background */}
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={`${import.meta.env.BASE_URL}images/prayer-bg.jpg`}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-primary/90" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>

            <motion.div variants={fadeUp}>
              <SectionHeading title="We're Here to Pray with You" subtitle="Prayer Request" centered dark />
            </motion.div>

            <motion.p variants={fadeUp}
              className="text-center text-white/60 max-w-2xl mx-auto text-lg leading-relaxed mb-14">
              Whatever you are facing — healing, provision, relationships, guidance — you don't have to
              carry it alone. Share your need and our intercessory team will lift it before God in faith.
            </motion.p>

            <motion.div variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
              {[
                { icon: HeartHandshake, title: "Dedicated Intercessors", body: "A faithful team commits to praying over every request, often for days at a time." },
                { icon: Heart,          title: "Covered in Love",        body: "Every need is met with compassion and genuine care from our whole church family." },
                { icon: Star,           title: "Rooted in Scripture",    body: "We anchor every prayer in God's Word, trusting His promises over every situation." },
                { icon: Globe,          title: "Global & Local",         body: "From personal struggles to community concerns — no burden is too small or too large." },
              ].map(({ icon: Icon, title, body }, i) => (
                <motion.div key={title} variants={fadeUp}
                  className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-secondary/40 transition-all duration-300 group flex flex-col">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300
                    ${i % 2 === 0 ? "bg-secondary/20 text-secondary group-hover:bg-secondary group-hover:text-primary" : "bg-white/10 text-white/60 group-hover:bg-secondary group-hover:text-primary"}`}>
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-secondary transition-colors">
                    {title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1">{body}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="text-center">
              <Link href="/prayer">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-10 py-3 text-base font-semibold shadow-lg shadow-secondary/30 gap-2">
                  <Heart size={17} /> Submit a Prayer Request
                </Button>
              </Link>
            </motion.div>

          </motion.div>
        </Container>
      </SectionWrapper>


      {/* ══════════════════════════════════════════
          7. TESTIMONIALS
      ══════════════════════════════════════════ */}
      <SectionWrapper className="bg-background">
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <SectionHeading title="Changed Lives" subtitle="Community Voices" centered />
            </motion.div>

            <motion.div variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map(t => (
                <motion.div key={t.id} variants={fadeUp}>
                  <Card className="h-full border-border/60 hover:shadow-lg hover:border-secondary/30 transition-all duration-300 group">
                    <CardContent className="p-8 flex flex-col h-full">
                      {/* Quote mark */}
                      <div className="text-6xl font-serif text-secondary/20 leading-none mb-4 select-none group-hover:text-secondary/30 transition-colors">
                        "
                      </div>
                      <p className="text-muted-foreground italic leading-relaxed text-[15px] flex-1 mb-6">
                        {t.quote}
                      </p>
                      <GoldDivider />
                      <div className="flex items-center gap-4 mt-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-secondary/30 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                          {t.initials}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-foreground">{t.name}</p>
                          <p className="text-xs text-secondary font-medium">{t.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </SectionWrapper>


      {/* ══════════════════════════════════════════
          8. PRAYER REQUEST CTA
      ══════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={`${import.meta.env.BASE_URL}images/care-bg.jpg`}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-primary/90" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="max-w-2xl mx-auto text-center">
            <motion.div variants={fadeUp}
              className="w-20 h-20 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center text-secondary mx-auto mb-8">
              <HeartHandshake size={34} />
            </motion.div>
            <motion.p variants={fadeUp} className="text-secondary text-xs font-bold uppercase tracking-widest mb-3">
              We Care for You
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif font-bold text-white mb-5 leading-tight">
              Can We Pray for You?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 text-lg leading-relaxed mb-10">
              No need is too small, no burden too heavy. Our prayer team is committed to lifting you up before God. Share your prayer request and let the family stand with you.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setPrayerOpen(true)}
                className="rounded-full px-9 h-14 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold shadow-xl shadow-secondary/20">
                <HeartHandshake className="mr-2 h-5 w-5" />
                Submit a Prayer Request
              </Button>
              <a href={`tel:${churchInfo.phone}`}>
                <Button size="lg" variant="outline"
                  className="rounded-full px-9 h-14 border-white/30 text-white hover:bg-white/10 bg-transparent">
                  <Phone className="mr-2 h-4 w-4" />
                  Call the Church
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </section>


      {/* ══════════════════════════════════════════
          9. DONATION / GIVE
      ══════════════════════════════════════════ */}
      <section className="bg-white border-y border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left — CTA */}
          <div className="bg-secondary p-12 md:p-20 relative overflow-hidden flex items-center">
            <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/3 translate-x-1/3" />
            <div className="absolute left-0 bottom-0 w-48 h-48 rounded-full bg-black/10 translate-y-1/3 -translate-x-1/3" />
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative z-10">
              <p className="text-secondary-foreground/70 text-xs font-bold uppercase tracking-widest mb-4">Partner With Us</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary-foreground mb-5 leading-tight">
                Support Our Mission
              </h2>
              <p className="text-secondary-foreground/80 text-lg leading-relaxed mb-8 max-w-md">
                Your generosity sends missionaries, feeds families, and builds the Kingdom of God right here in Makati and beyond the Philippines.
              </p>
              <blockquote className="border-l-4 border-secondary-foreground/40 pl-4 mb-8">
                <p className="text-secondary-foreground/70 italic text-sm">
                  "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." — 2 Corinthians 9:7
                </p>
              </blockquote>
              <Link href="/give">
                <Button size="lg"
                  className="rounded-full px-9 h-13 bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90 font-bold shadow-lg">
                  Give Online Today
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right — Bank details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="p-12 md:p-20 bg-background flex flex-col justify-center">
            <h3 className="text-2xl font-serif font-bold mb-2 text-primary">Other Ways to Give</h3>
            <p className="text-muted-foreground text-sm mb-8">We make it easy to sow into the work of God.</p>

            <div className="space-y-5">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-border/60 hover:border-secondary/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <BookOpen size={16} />
                  </div>
                  <h4 className="font-bold">BDO Bank Transfer</h4>
                </div>
                <div className="space-y-1.5 text-sm text-muted-foreground bg-primary/5 p-4 rounded-xl">
                  <p><span className="font-semibold text-foreground">Account Name:</span> El-Bethel Christian Fellowship</p>
                  <p><span className="font-semibold text-foreground">Account No:</span> 005-123-456-789</p>
                  <p><span className="font-semibold text-foreground">Branch:</span> Makati City</p>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl shadow-sm border border-border/60 hover:border-secondary/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary">
                    <Phone size={16} />
                  </div>
                  <h4 className="font-bold">GCash</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Send to our official GCash number:
                </p>
                <p className="font-mono text-lg font-bold text-primary mt-1">+63 966 926 9566</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          10. LOCATION & CONTACT PREVIEW
      ══════════════════════════════════════════ */}
      <SectionWrapper className="bg-white">
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <SectionHeading title="Find Us" subtitle="Visit Our Church" centered />
            </motion.div>

            <motion.div variants={fadeUp}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-4 items-stretch">
              {/* Map placeholder */}
              <div className="lg:col-span-3">
                <div className="w-full h-72 lg:h-full min-h-[280px] bg-primary/5 rounded-2xl border border-border/60 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-secondary/20 border-2 border-secondary/40 flex items-center justify-center text-secondary mb-4">
                      <MapPin size={28} />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-primary mb-2">El-Bethel Church</h3>
                    <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-5">
                      {churchInfo.address}
                    </p>
                    <a
                      href={`https://maps.google.com/?q=KMC+Armstrong+Corporate+Center+Salcedo+Village+Makati`}
                      target="_blank"
                      rel="noreferrer">
                      <Button variant="outline" size="sm" className="rounded-full">
                        <MapPin className="mr-2 w-4 h-4 text-secondary" />
                        Open in Maps
                      </Button>
                    </a>
                  </div>
                  {/* Subtle grid overlay */}
                  <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" className="text-primary" />
                  </svg>
                </div>
              </div>

              {/* Contact info */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {[
                  {
                    icon: <MapPin size={20} />,
                    label: "Address",
                    value: churchInfo.address,
                    href: `https://maps.google.com/?q=KMC+Armstrong+Corporate+Center+Salcedo+Makati`
                  },
                  {
                    icon: <Phone size={20} />,
                    label: "Phone / Viber",
                    value: churchInfo.phone,
                    href: `tel:${churchInfo.phone}`
                  },
                  {
                    icon: <Mail size={20} />,
                    label: "Email",
                    value: churchInfo.email,
                    href: `mailto:${churchInfo.email}`
                  },
                  {
                    icon: <Clock size={20} />,
                    label: "Office Hours",
                    value: "Mon–Fri: 9AM–5PM\nSat: 10AM–2PM",
                    href: null
                  }
                ].map(item => (
                  <div key={item.label}
                    className="flex items-start gap-4 p-5 bg-white border border-border/60 rounded-2xl hover:border-secondary/30 hover:shadow-sm transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-medium text-foreground hover:text-secondary transition-colors whitespace-pre-line">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-foreground whitespace-pre-line">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                <Link href="/contact">
                  <Button className="w-full rounded-full h-12 bg-primary hover:bg-primary/90 font-semibold mt-2">
                    Get In Touch <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </SectionWrapper>


      {/* ══════════════════════════════════════════
          11. NEWSLETTER SIGNUP
      ══════════════════════════════════════════ */}
      <section className="bg-background border-t border-border py-24">
        <Container>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="max-w-2xl mx-auto text-center">
            <motion.div variants={fadeUp}
              className="w-16 h-16 rounded-full bg-secondary/15 border border-secondary/30 flex items-center justify-center text-secondary mx-auto mb-6">
              <Mail size={28} />
            </motion.div>
            <motion.p variants={fadeUp} className="text-secondary text-xs font-bold uppercase tracking-widest mb-3">
              Stay Connected
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
              Never Miss a Blessing
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Subscribe to our weekly newsletter and receive sermon notes, upcoming events, devotionals, and church announcements straight to your inbox.
            </motion.p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-secondary/10 border border-secondary/30 rounded-2xl p-8">
                <div className="text-4xl mb-3">🙏</div>
                <h3 className="font-serif font-bold text-xl text-primary mb-2">You're Subscribed!</h3>
                <p className="text-muted-foreground">God bless you. Check your inbox for a welcome message from the El-Bethel family.</p>
              </motion.div>
            ) : (
              <motion.form variants={fadeUp} onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-full border border-border bg-white text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all"
                  />
                </div>
                <Button type="submit"
                  className="rounded-full px-7 h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold shrink-0 shadow-md shadow-secondary/20">
                  <Send className="mr-2 w-4 h-4" />
                  Subscribe
                </Button>
              </motion.form>
            )}

            <motion.p variants={fadeUp} className="text-xs text-muted-foreground mt-4">
              We respect your privacy. No spam — only Kingdom news.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════
          PRAYER REQUEST MODAL
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {prayerOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) closePrayer(); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-primary px-8 py-6 flex items-center justify-between">
                <div>
                  <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-1">Prayer Team</p>
                  <h3 className="text-white text-xl font-serif font-bold">Submit a Prayer Request</h3>
                </div>
                <button onClick={closePrayer} className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8">
                {prayerDone ? (
                  <div className="text-center py-6">
                    <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-serif font-bold text-primary mb-2">Prayer Received 🙏</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Your prayer request has been sent to our prayer team. We will be lifting you up before God. You are not alone.
                    </p>
                    <Button onClick={closePrayer} className="mt-6">
                      Close
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handlePrayerSubmit} className="space-y-5">
                    <p className="text-sm text-muted-foreground -mt-1">
                      Share your prayer request and our team will pray specifically for you. You may remain anonymous.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Your Name <span className="text-muted-foreground font-normal">(optional)</span></label>
                        <input
                          type="text"
                          value={prayerName}
                          onChange={e => setPrayerName(e.target.value)}
                          placeholder="Juan dela Cruz"
                          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Email <span className="text-muted-foreground font-normal">(optional)</span></label>
                        <input
                          type="email"
                          value={prayerEmail}
                          onChange={e => setPrayerEmail(e.target.value)}
                          placeholder="juan@example.com"
                          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Your Prayer Request <span className="text-red-500">*</span></label>
                      <textarea
                        value={prayerRequest}
                        onChange={e => setPrayerRequest(e.target.value)}
                        placeholder="Share what's on your heart…"
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all resize-none"
                      />
                    </div>
                    <Button type="submit" className="w-full h-12" disabled={prayerLoading || !prayerRequest.trim()}>
                      {prayerLoading ? (
                        <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Sending to Prayer Team…</>
                      ) : (
                        <><HeartHandshake className="mr-2 w-4 h-4" /> Send Prayer Request</>
                      )}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Your request is handled with care and confidentiality.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
