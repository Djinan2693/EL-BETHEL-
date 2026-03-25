import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  BookOpen, Target, Heart, Users, Globe,
  ShieldCheck, Flame, HandshakeIcon, Home, Star,
  ChevronRight, Calendar, Clock, MapPin, Quote,
  Megaphone, Sprout, HandHeart,
} from "lucide-react";
import { useSEO } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { team } from "@/data/team";

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
const COMMITMENTS = [
  {
    number:     "01",
    icon:       Megaphone,
    title:      "Spread the Gospel with Purpose and Passion",
    intro:      "In a world longing for truth and purpose, we are unwavering in our dedication to sharing the message of Christ.",
    highlights: ["Digital & community outreach", "Bridging culture & generations", "Every soul — a vessel of hope"],
    bodyA:      "Using modern tools — digital media, community gatherings, and cultural events — we aim to bridge divides of culture, generation, and background, reaching people exactly where they are.",
    bodyB:      "Our mission is to inspire, uplift, and encourage all to embrace a life transformed by Jesus Christ. Through His love and the message of salvation, we endeavor to bring peace, unity, and renewal. Our passion is fueled by the belief that each soul touched by the Gospel can become a vessel of hope, impacting countless others.",
    image:      "hero-slide-1.jpg",
    verse:      "Matthew 28:19–20",
  },
  {
    number:     "02",
    icon:       Sprout,
    title:      "Nurture Faith",
    intro:      "We believe in cultivating a personal, deep-rooted relationship with God through genuine worship, purposeful prayer, and a consistent commitment to studying His Word.",
    highlights: ["Bible studies & prayer groups", "Mentorship programs", "Discovering God-given gifts"],
    bodyA:      "In our church community, we create spaces for spiritual growth, offering Bible studies, prayer groups, and mentorship programs that encourage each individual to deepen their understanding of God's love and purpose.",
    bodyB:      "We encourage believers to discover their God-given gifts, understanding that each talent is a tool of light to be used in their families, workplaces, and communities. Through a faith that is alive and active, we seek to empower everyone to live courageously, anchored in the hope of God's promises.",
    image:      "hero-slide-2.jpg",
    verse:      "Colossians 2:6–7",
  },
  {
    number:     "03",
    icon:       HandHeart,
    title:      "Serve Communities with Compassion",
    intro:      "Our calling is to reflect Jesus's compassion by serving those in need and bringing hope, aid, and dignity to every person we encounter.",
    highlights: ["Feeding programs & family support", "Local & global outreach", "Physical, emotional & spiritual care"],
    bodyA:      "We are committed to addressing not only immediate needs but also fostering long-term growth and empowerment — from feeding the hungry and supporting families, to providing a listening ear to those facing hardships.",
    bodyB:      "Through local and global outreach initiatives, we partner with other organizations, churches, and community leaders to create impactful programs that respond to physical, emotional, and spiritual needs — food distribution, educational support, health initiatives, and disaster relief.",
    image:      "hero-slide-3.jpg",
    verse:      "Matthew 25:35–36",
  },
];

const BELIEFS = [
  { icon: BookOpen,     title: "The Bible",           body: "We believe the Scriptures of the Old and New Testaments are the inspired, infallible Word of God — our supreme authority for faith, life, and ministry." },
  { icon: Star,         title: "The Trinity",         body: "We believe in one God, eternally existing in three co-equal Persons: Father, Son, and Holy Spirit — distinct in person, united in nature and purpose." },
  { icon: ShieldCheck,  title: "Salvation",           body: "We believe salvation is by grace through faith in Jesus Christ alone — His atoning death and bodily resurrection — and not by human effort or merit." },
  { icon: Flame,        title: "The Holy Spirit",     body: "We believe the Holy Spirit indwells every believer at conversion, empowering them for righteous living, spiritual gifts, and bold witness." },
  { icon: Home,         title: "The Church",          body: "We believe the Church is the Body of Christ, called to worship, disciple, serve the poor, and proclaim the Gospel until Jesus returns." },
  { icon: Globe,        title: "The Great Commission",body: "We believe every follower of Christ is sent to make disciples of all nations — locally in Makati and globally through missions and partnership." },
];

const VALUES = [
  { icon: BookOpen,      label: "Word-Centred",     desc: "Every sermon, study, and decision is rooted in the authority of Scripture." },
  { icon: Flame,         label: "Spirit-Led",       desc: "We remain open to the move of the Holy Spirit in worship, prayer, and community life." },
  { icon: Heart,         label: "Family-Oriented",  desc: "We prioritise healthy homes, strong marriages, and inter-generational relationships." },
  { icon: Users,         label: "Community-Driven", desc: "Discipleship happens best in the context of authentic, face-to-face relationship." },
  { icon: Globe,         label: "Missions-Minded",  desc: "From Salcedo Village to the nations — we give, go, and send with urgency." },
  { icon: HandshakeIcon, label: "Grace-Full",       desc: "We extend the same grace we have received — to the broken, the searching, and the sinner." },
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
  useSEO({
    title:       "About Us",
    description: "El-Bethel Christian Fellowship Church in Makati City exists to spread the Gospel, nurture faith, and serve communities with compassion — in partnership with El Bethel AG International, India.",
    canonical:   "/about",
  });

  return (
    <main>

      {/* ════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════ */}
      <section
        aria-label="About El-Bethel — hero"
        className="bg-primary text-primary-foreground py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0" aria-hidden="true">
          {/* Church photo — subtle base layer */}
          <img
            src={`${import.meta.env.BASE_URL}images/hero-worship.png`}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          {/* Navy overlay to unify colour with Give Online */}
          <div className="absolute inset-0 bg-primary/70" />
          {/* Geometric network texture — same as Give Online */}
          <img
            src={`${import.meta.env.BASE_URL}images/give-texture.png`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        </div>

        <Container className="relative z-10 text-center max-w-3xl mx-auto pt-16">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}>
              <Home className="w-12 h-12 text-secondary mx-auto mb-6" />
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Who We Are
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-primary-foreground/80 font-light italic font-serif text-xl mb-8">
              "And He called the name of that place Bethel, for there God was revealed to him."
            </motion.p>
            <motion.p variants={fadeUp} className="text-sm text-secondary uppercase tracking-widest font-semibold">
              — Genesis 35:7
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════
          2. MISSION OVERVIEW
      ════════════════════════════════════════════════ */}
      <section aria-labelledby="mission-heading" className="py-24 bg-background">
        <Container>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
          >
            {/* Left — mission statement */}
            <motion.div variants={fadeUp}>
              <SectionLabel>Our Purpose</SectionLabel>
              <h2 id="mission-heading" className="text-4xl font-serif font-bold text-primary mb-5 leading-snug">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                El-Bethel Christian Fellowship Church, in partnership with El Bethel AG International Church in India, is driven by a profound calling to be a beacon of hope, faith, and transformation.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                In today's ever-changing world, where people often feel isolated and in need of support, we embrace our mission to provide a spiritual refuge — a place where God's love is not only preached but actively practiced and embodied in daily life.
              </p>
              <blockquote className="border-l-4 border-secondary pl-5 italic text-primary/80 font-serif text-lg">
                "Go therefore and make disciples of all nations."
                <footer className="text-sm text-muted-foreground mt-1 not-italic font-normal">— Matthew 28:19</footer>
              </blockquote>
            </motion.div>

            {/* Right — scope & commitments */}
            <motion.div variants={fadeUp} className="space-y-10">
              {/* Scope statement — styled as a pull card */}
              <div className="relative bg-white rounded-2xl border border-border overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary rounded-l-2xl" aria-hidden="true" />
                <div className="p-8 pl-9">
                  <p className="font-serif text-base italic text-primary/80 leading-relaxed mb-4">
                    "Our commitment extends far beyond our church doors, reaching into our local community, across nations, and into every place where God's light can shine."
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We envision a vibrant, interwoven community of believers who are empowered, spiritually renewed, and equipped to serve — living authentically in faith, compassionately in service, and boldly in proclamation of the Gospel.
                  </p>
                </div>
              </div>

              {/* Three commitments — refined list */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-secondary mb-5">
                  Our Purpose Is Rooted in Three Core Commitments
                </p>
                <div className="space-y-3">
                  {COMMITMENTS.map((c) => {
                    const Icon = c.icon;
                    return (
                      <div
                        key={c.number}
                        className="group flex items-center gap-4 bg-background hover:bg-white border border-border hover:border-secondary/30 rounded-xl px-5 py-4 transition-all"
                      >
                        <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                          <Icon size={16} aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-primary font-semibold text-sm leading-snug truncate">{c.title}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════
          3. THREE CORE COMMITMENTS
      ════════════════════════════════════════════════ */}
      <section aria-labelledby="commitments-heading" className="py-24 bg-white border-y border-border">
        <Container>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}><SectionLabel>How We Live Out Our Calling</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} id="commitments-heading" className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
              Three Core Commitments
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Everything we do flows from these three convictions — they shape our worship, our community, and our reach into the world.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="space-y-8"
          >
            {COMMITMENTS.map((c, i) => {
              const Icon = c.icon;
              const isAlt = i % 2 === 1;
              return (
                <motion.article
                  key={c.number}
                  variants={fadeUp}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow ${isAlt ? "direction-rtl" : ""}`}
                  aria-labelledby={`commitment-${c.number}-title`}
                >
                  {/* Accent panel */}
                  <div className={`${isAlt ? "lg:order-2" : ""} relative p-10 md:p-14 flex flex-col justify-end min-h-[300px] overflow-hidden`}>
                    {/* Background photo + navy overlay */}
                    <div className="absolute inset-0" aria-hidden="true">
                      <img
                        src={`${import.meta.env.BASE_URL}images/${c.image}`}
                        alt=""
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/80 to-primary/60" />
                    </div>
                    {/* Cross texture */}
                    <div aria-hidden="true" className="absolute inset-0 opacity-5 z-[1]">
                      <img src={`${import.meta.env.BASE_URL}images/pattern-cross.png`} alt="" className="w-full h-full object-cover" />
                    </div>
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Title */}
                      <h3 id={`commitment-${c.number}-title`} className="font-serif text-2xl md:text-3xl font-bold text-white leading-snug mb-5">
                        {c.title}
                      </h3>
                      {/* Scripture reference */}
                      <div className="flex items-center gap-2">
                        <div className="h-px w-8 bg-secondary/50" aria-hidden="true" />
                        <p className="text-secondary/70 text-xs font-semibold">{c.verse}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content panel */}
                  <div className={`${isAlt ? "lg:order-1" : ""} bg-background p-10 md:p-14 flex flex-col justify-center gap-6`}>
                    {/* Lead sentence */}
                    <p className="font-serif text-xl md:text-2xl italic text-primary leading-snug">
                      "{c.intro}"
                    </p>

                    {/* Highlight chips */}
                    <div className="flex flex-wrap gap-2">
                      {c.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-secondary bg-secondary/10 border border-secondary/20 rounded-full px-3.5 py-1.5"
                        >
                          <span className="w-1 h-1 rounded-full bg-secondary shrink-0" aria-hidden="true" />
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="h-px w-10 bg-secondary/30" aria-hidden="true" />

                    {/* Body — two shorter paragraphs */}
                    <div className="space-y-3 text-muted-foreground leading-relaxed text-sm md:text-[15px]">
                      <p>{c.bodyA}</p>
                      <p>{c.bodyB}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════
          4. CLOSING COMMUNITY STATEMENT
      ════════════════════════════════════════════════ */}
      <section aria-labelledby="community-heading" className="py-24 bg-background">
        <Container>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left — image & quote */}
            <motion.div variants={fadeIn} className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-primary/10 border border-border shadow-xl">
                <img
                  src={`${import.meta.env.BASE_URL}images/community-family.jpg`}
                  alt="El-Bethel church community gathered in worship"
                  className="w-full h-full object-cover object-[50%_20%]"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 md:-right-8 max-w-xs bg-white rounded-2xl shadow-2xl p-6 border border-border">
                <Quote size={20} className="text-secondary mb-2" aria-hidden="true" />
                <p className="font-serif italic text-primary text-sm leading-relaxed">
                  "There he built an altar, and he called the place El Bethel — the House of God."
                </p>
                <p className="text-muted-foreground text-xs mt-2">Genesis 35:7</p>
              </div>
            </motion.div>

            {/* Right — community description */}
            <motion.div variants={stagger} className="pt-6 lg:pt-0">
              <motion.div variants={fadeUp}><SectionLabel>More Than a Building</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} id="community-heading" className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 leading-snug">
                A Family United in Faith
              </motion.h2>

              {/* Lead sentence — visually distinct */}
              <motion.p variants={fadeUp} className="text-lg font-medium text-primary/90 leading-relaxed mb-8 pb-8 border-b border-border">
                We are not merely a church; we are a family of believers united in our desire to see lives changed by God's love — where each person is valued, each story is cherished, and each individual is encouraged to step into their God-given purpose.
              </motion.p>

              <motion.div variants={fadeUp} className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  With each day, we move forward with faith, hope, and determination, trusting in God's promises and ready to serve His kingdom with humility and joy.
                </p>
                <p>
                  As we grow together, our church becomes more than a building — it becomes a living testament to God's grace, a place where lives are changed, hearts are healed, and faith is strengthened.
                </p>
              </motion.div>

              <motion.blockquote variants={fadeUp} className="mt-10 font-serif text-xl italic text-primary/80 border-l-4 border-secondary pl-6 leading-snug">
                "El-Bethel is a sanctuary, a source of strength, and a launching point for individuals committed to transforming the world for Christ."
              </motion.blockquote>

              <motion.p variants={fadeUp} className="mt-6 text-sm text-muted-foreground">
                We welcome everyone to join us in this mission.
              </motion.p>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════
          5. STATEMENT OF FAITH
      ════════════════════════════════════════════════ */}
      <section aria-labelledby="beliefs-heading" className="py-24 bg-primary relative overflow-hidden">
        {/* Photo background */}
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={`${import.meta.env.BASE_URL}images/beliefs-bg.jpg`}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-primary/90" />
        </div>
        {/* Cross texture on top */}
        <div aria-hidden="true" className="absolute inset-0 opacity-5 z-[1]">
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
          6. COMMUNITY VALUES
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
          7. PASTORAL LEADERSHIP
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
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {team.map((pastor) => (
              <motion.article
                key={pastor.id}
                variants={fadeUp}
                className="group flex flex-col items-center text-center"
                aria-label={`${pastor.name}, ${pastor.title}`}
              >
                <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-primary/5 to-primary/20 border border-border mb-5 relative">
                  {pastor.imageUrl ? (
                    <img
                      src={`${import.meta.env.BASE_URL}${pastor.imageUrl}`}
                      alt={pastor.name}
                      className="w-full h-full object-contain object-bottom"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users size={32} className="text-primary/40" aria-hidden="true" />
                      </div>
                      <span className="text-primary/30 text-xs font-medium">Photo coming soon</span>
                    </div>
                  )}
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div>
                  <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-1">{pastor.title}</p>
                  <h3 className="font-serif text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                    {pastor.name}
                  </h3>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════
          8. CTA — JOIN THE MISSION
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
              Join Us in This Mission
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              We welcome everyone to join us as we seek to build a brighter, faith-filled future together. Come as you are — you'll find a family ready to journey with you.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              {[
                { icon: Clock,  text: "Sunday · 4:00 PM – 6:30 PM" },
                { icon: MapPin, text: "KMC Armstrong, 7F, Makati City" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/70 text-sm bg-white/5 border border-white/10 rounded-full px-5 py-2.5">
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
