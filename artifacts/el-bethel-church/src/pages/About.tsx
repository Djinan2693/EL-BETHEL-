import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  BookOpen, Target, Eye, Heart, Users, Globe,
  ShieldCheck, Flame, HandshakeIcon, Home, Star,
  ChevronRight, Calendar, Clock, MapPin, Quote,
} from "lucide-react";
import { useSEO } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { team } from "@/data/team";
import { churchInfo } from "@/data/church";

/* ── animation variants ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};

/* ── page data ──────────────────────────────────────────────────── */
const BELIEFS = [
  { icon: BookOpen,     title: "The Bible",       body: "We believe the Scriptures of the Old and New Testaments are the inspired, infallible Word of God — our supreme authority for faith, life, and ministry." },
  { icon: Star,         title: "The Trinity",     body: "We believe in one God, eternally existing in three co-equal Persons: Father, Son, and Holy Spirit — distinct in person, united in nature and purpose." },
  { icon: ShieldCheck,  title: "Salvation",       body: "We believe salvation is by grace through faith in Jesus Christ alone — His atoning death and bodily resurrection — and not by human effort or merit." },
  { icon: Flame,        title: "The Holy Spirit", body: "We believe the Holy Spirit indwells every believer at conversion, empowering them for righteous living, spiritual gifts, and bold witness." },
  { icon: Home,         title: "The Church",      body: "We believe the Church is the Body of Christ, called to worship, disciple, serve the poor, and proclaim the Gospel until Jesus returns." },
  { icon: Globe,        title: "The Great Commission", body: "We believe every follower of Christ is sent to make disciples of all nations — locally in Makati and globally through missions and partnership." },
];

const VALUES = [
  { icon: BookOpen,      label: "Word-Centred",      desc: "Every sermon, study, and decision is rooted in the authority of Scripture." },
  { icon: Flame,         label: "Spirit-Led",        desc: "We remain open to the move of the Holy Spirit in worship, prayer, and community life." },
  { icon: Heart,         label: "Family-Oriented",   desc: "We prioritise healthy homes, strong marriages, and inter-generational relationships." },
  { icon: Users,         label: "Community-Driven",  desc: "Discipleship happens best in the context of authentic, face-to-face relationship." },
  { icon: Globe,         label: "Missions-Minded",   desc: "From Salcedo Village to the nations — we give, go, and send with urgency." },
  { icon: HandshakeIcon, label: "Grace-Full",        desc: "We extend the same grace we have received — to the broken, the searching, and the sinner." },
];

const HISTORY_MILESTONES = [
  { year: "1987", title: "A Prayer Meeting in Sampaloc", body: "Ps. Samuel Lim gathered twelve believers in a small living room in Sampaloc, Manila — praying for revival in the city. That humble circle was the seed of what would become El-Bethel." },
  { year: "1992", title: "First Church Building", body: "Five years of faithful growth led the congregation to rent its first dedicated space in Santa Mesa. Sunday attendance surpassed 150, and the first small group network was launched." },
  { year: "1998", title: "Expansion to Makati", body: "Responding to a city-wide call, El-Bethel planted a satellite congregation in Salcedo Village, Makati — reaching the professional and business community with the Gospel." },
  { year: "2010", title: "A New Senior Pastor", body: "Ps. Rene Santos was commissioned as Senior Pastor, ushering in a season of biblical depth, structural growth, and renewed passion for expository preaching and family ministry." },
  { year: "2019", title: "Church Home at KMC Armstrong", body: "El-Bethel Makati moved into its current home on the 7th Floor of KMC Armstrong Corporate Center — a strategically placed sanctuary in the heart of the city's financial district." },
  { year: "Today", title: "37+ Years of God's Faithfulness", body: "With 500+ church family members, 6 active ministries, and missions partnerships across Southeast Asia, El-Bethel continues to be a house of prayer for all nations." },
];

const WHY_VISIT = [
  { icon: BookOpen, title: "Deep, Applicable Teaching", body: "Every Sunday you'll encounter expository preaching that takes the Bible seriously and connects it to your daily life in Manila's fast-paced context." },
  { icon: Heart,    title: "A Community That Cares", body: "You won't just attend El-Bethel — you'll belong. From your first Sunday, our connect teams and small groups will make sure no one walks the journey alone." },
  { icon: Users,    title: "Ministry for Every Season", body: "Whether you're a student, a young professional, a parent, or a retiree, there's a place for you to grow, serve, and be known here." },
];

/* ── sub-components ─────────────────────────────────────────────── */
function GoldRule() {
  return (
    <div className="flex items-center gap-3 my-0" aria-hidden="true">
      <div className="h-px flex-1 bg-secondary/30" />
      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
      <div className="h-px flex-1 bg-secondary/30" />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-3">
      {children}
    </p>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════ */
export default function About() {
  useSEO(
    "About Us",
    "Discover the mission, history, beliefs, and pastoral team of El-Bethel Christian Fellowship Church — a Spirit-filled community in Makati City, Philippines.",
  );

  return (
    <main>

      {/* ════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════ */}
      <section
        aria-label="About El-Bethel — hero"
        className="relative pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden bg-primary"
      >
        {/* Background layers */}
        <div className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-worship.png`}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/80 to-primary" />
          <img
            src={`${import.meta.env.BASE_URL}images/pattern-cross.png`}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-5 mix-blend-overlay"
          />
        </div>

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-white/50 text-xs mb-8 uppercase tracking-widest">
            <Link href="/" className="hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded">Home</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span className="text-secondary">About Us</span>
          </nav>

          <motion.div
            initial="hidden" animate="visible" variants={stagger}
            className="max-w-3xl"
          >
            <motion.p variants={fadeUp} className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">
              Est. {churchInfo.founded} · Makati City, Philippines
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
              Who We Are
            </motion.h1>
            <motion.div variants={fadeUp}>
              <GoldRule />
            </motion.div>
            <motion.p variants={fadeUp} className="text-xl text-white/75 mt-6 leading-relaxed max-w-2xl">
              El-Bethel Christian Fellowship is more than a church — it is a family, a school, a sanctuary, and a launching pad. For over three decades, we have been a place where broken people find wholeness, where the searching find truth, and where the faithful find belonging.
            </motion.p>
          </motion.div>
        </Container>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ════════════════════════════════════════════════
          2. MISSION & VISION
      ════════════════════════════════════════════════ */}
      <section aria-labelledby="mission-vision-heading" className="py-24 bg-background">
        <Container>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
          >
            {/* Mission */}
            <motion.div variants={fadeUp}>
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary mb-6">
                <Target size={26} />
              </div>
              <SectionLabel>Our Purpose</SectionLabel>
              <h2 id="mission-vision-heading" className="text-4xl font-serif font-bold text-primary mb-5 leading-snug">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To win the lost, make disciples, and build a vibrant community of faith that transforms Makati — and the nation — through the love and power of Jesus Christ.
              </p>
              <blockquote className="border-l-4 border-secondary pl-5 italic text-primary/80 font-serif text-lg">
                "Go therefore and make disciples of all nations."
                <footer className="text-sm text-muted-foreground mt-1 not-italic font-normal">— Matthew 28:19</footer>
              </blockquote>
            </motion.div>

            {/* Vision */}
            <motion.div variants={fadeUp}>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
                <Eye size={26} />
              </div>
              <SectionLabel>Our Aspiration</SectionLabel>
              <h2 className="text-4xl font-serif font-bold text-primary mb-5 leading-snug">
                Our Vision
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To be a city-on-a-hill church — a spiritual home where every member is equipped for ministry, families are restored, and the next generation is ignited for God's glory in every sphere of society.
              </p>
              <blockquote className="border-l-4 border-primary/40 pl-5 italic text-primary/80 font-serif text-lg">
                "You are the light of the world. A city set on a hill cannot be hidden."
                <footer className="text-sm text-muted-foreground mt-1 not-italic font-normal">— Matthew 5:14</footer>
              </blockquote>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════
          3. OUR STORY — HISTORY TIMELINE
      ════════════════════════════════════════════════ */}
      <section aria-labelledby="history-heading" className="py-24 bg-white border-y border-border">
        <Container>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <motion.div variants={fadeUp}><SectionLabel>Since {churchInfo.founded}</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} id="history-heading" className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
              Our Story
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed">
              A story of ordinary people, extraordinary faith, and a God who never abandons what He starts.
            </motion.p>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div aria-hidden="true" className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-secondary/20 -translate-x-1/2" />

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="space-y-12"
            >
              {HISTORY_MILESTONES.map((m, i) => {
                const isRight = i % 2 === 0;
                return (
                  <motion.div
                    key={m.year}
                    variants={fadeUp}
                    className={`relative flex items-start gap-6 md:gap-0 ${isRight ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Year bubble — desktop: centred; mobile: left */}
                    <div className="relative z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-2">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-lg shadow-secondary/30">
                        <span className="text-secondary-foreground text-[10px] font-bold leading-tight text-center px-1">
                          {m.year}
                        </span>
                      </div>
                    </div>

                    {/* Card */}
                    <div className={`md:w-[calc(50%-3rem)] bg-background rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow ${isRight ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"} ml-0 flex-1 md:flex-initial`}>
                      <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-2 md:hidden">{m.year}</p>
                      <h3 className="font-serif text-xl font-bold text-primary mb-2">{m.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{m.body}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════
          4. STATEMENT OF FAITH
      ════════════════════════════════════════════════ */}
      <section aria-labelledby="beliefs-heading" className="py-24 bg-primary relative overflow-hidden">
        {/* subtle texture */}
        <div aria-hidden="true" className="absolute inset-0 opacity-5">
          <img src={`${import.meta.env.BASE_URL}images/pattern-cross.png`} alt="" className="w-full h-full object-cover" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp}><SectionLabel>Doctrinal Foundation</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} id="beliefs-heading" className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              What We Believe
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
              Our faith is anchored in the historic truths of orthodox Christianity. These are not opinions — they are the convictions we stake our lives on.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {BELIEFS.map(({ icon: Icon, title, body }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary mb-5 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3 className="text-white font-serif font-bold text-xl mb-3">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════
          5. COMMUNITY VALUES
      ════════════════════════════════════════════════ */}
      <section aria-labelledby="values-heading" className="py-24 bg-background">
        <Container>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp}><SectionLabel>How We Live Together</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} id="values-heading" className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
              Our Community Values
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Culture is what happens when nobody's watching. These six values describe the kind of people we are — and are becoming — together.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {VALUES.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="group flex gap-5 bg-white border border-border rounded-2xl p-7 hover:border-secondary/40 hover:shadow-md transition-all"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-secondary/60 text-xs font-bold font-serif">0{i + 1}</span>
                    <h3 className="font-bold text-primary text-base">{label}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════
          6. PASTORAL LEADERSHIP
      ════════════════════════════════════════════════ */}
      <section aria-labelledby="team-heading" className="py-24 bg-white border-y border-border">
        <Container>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp}><SectionLabel>Servant Leaders</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} id="team-heading" className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
              Meet Our Pastoral Team
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Our pastors lead not from positions of power, but from a posture of service — following the example of Jesus who came not to be served, but to serve.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {team.map((pastor) => (
              <motion.article
                key={pastor.id}
                variants={fadeUp}
                className="group flex flex-col"
                aria-label={`${pastor.name}, ${pastor.title}`}
              >
                {/* Photo placeholder */}
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/30 border border-border mb-5 relative">
                  {pastor.imageUrl ? (
                    <img src={pastor.imageUrl} alt={pastor.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users size={32} className="text-primary/40" aria-hidden="true" />
                      </div>
                      <span className="text-primary/30 text-xs font-medium">Photo coming soon</span>
                    </div>
                  )}
                  {/* Hover shimmer */}
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-1">{pastor.title}</p>
                  <h3 className="font-serif text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                    {pastor.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pastor.bio}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════
          7. WHY VISIT US
      ════════════════════════════════════════════════ */}
      <section aria-labelledby="why-visit-heading" className="py-24 bg-background">
        <Container>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left — image & quote */}
            <motion.div variants={fadeIn} className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-primary/10 border border-border shadow-xl">
                <img
                  src={`${import.meta.env.BASE_URL}images/about-community.png`}
                  alt="El-Bethel church community gathered in worship"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating quote card */}
              <div className="absolute -bottom-6 -right-4 md:-right-8 max-w-xs bg-white rounded-2xl shadow-2xl p-6 border border-border">
                <Quote size={20} className="text-secondary mb-2" aria-hidden="true" />
                <p className="font-serif italic text-primary text-sm leading-relaxed">
                  "There he built an altar, and he called the place El Bethel — the House of God."
                </p>
                <p className="text-muted-foreground text-xs mt-2">Genesis 35:7</p>
              </div>
            </motion.div>

            {/* Right — reasons */}
            <motion.div variants={stagger}>
              <motion.div variants={fadeUp}><SectionLabel>An Open Invitation</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} id="why-visit-heading" className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 leading-snug">
                Why El-Bethel?
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed mb-10">
                We know there are many churches in Metro Manila. Here's why we believe you'll find something rare here:
              </motion.p>

              <div className="space-y-8">
                {WHY_VISIT.map(({ icon: Icon, title, body }, i) => (
                  <motion.div key={title} variants={fadeUp} className="flex gap-5">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary mt-0.5">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary text-lg mb-1">{title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════
          8. CTA — JOIN US
      ════════════════════════════════════════════════ */}
      <section aria-labelledby="cta-heading" className="py-28 bg-primary relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0">
          <img src={`${import.meta.env.BASE_URL}images/hero-worship.png`} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/90" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.p variants={fadeUp} className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">
              You're Welcome Here
            </motion.p>
            <motion.h2 variants={fadeUp} id="cta-heading" className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Join Us This Sunday
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Whether you're a lifelong believer or exploring faith for the first time — the doors of El-Bethel are open to you. Come as you are. You'll find a family waiting.
            </motion.p>

            {/* Service info */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              {[
                { icon: Clock,   text: "9:00 AM · Tagalog Service" },
                { icon: Clock,   text: "11:00 AM · English Service" },
                { icon: MapPin,  text: "KMC Armstrong, 7F, Makati City" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/70 text-sm bg-white/5 border border-white/10 rounded-full px-4 py-2">
                  <Icon size={14} className="text-secondary shrink-0" aria-hidden="true" />
                  {text}
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="rounded-full px-10 h-14 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold text-base shadow-xl shadow-secondary/20"
                >
                  <Calendar size={18} className="mr-2" />
                  Plan Your Visit
                </Button>
              </Link>
              <Link href="/sermons">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-10 h-14 border-white/30 text-white hover:bg-white/10 bg-transparent text-base"
                >
                  Watch a Sermon First
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

    </main>
  );
}
