import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useSEO } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { churchInfo } from "@/data/church";
import { cn } from "@/lib/utils";
import {
  MapPin, Phone, Mail, Clock, CheckCircle, Loader2,
  Facebook, Instagram, Youtube, ChevronDown, Heart, Calendar,
  MessageCircle, ArrowRight,
} from "lucide-react";

/* ── Schemas ──────────────────────────────────────────── */
const contactSchema = z.object({
  name:    z.string().min(2, "Please enter your name"),
  email:   z.string().email("A valid email is required"),
  phone:   z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactFormValues = z.infer<typeof contactSchema>;

/* ── Motion helpers ───────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ── Static data ──────────────────────────────────────── */
const QUICK_CONTACTS = [
  {
    icon: Phone,
    label: "Call Us",
    value: churchInfo.phone,
    href: `tel:${churchInfo.phone}`,
    sub: "Mon – Fri, 9 AM – 5 PM",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: churchInfo.email,
    href: `mailto:${churchInfo.email}`,
    sub: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Salcedo Village, Makati City",
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(churchInfo.address)}`,
    sub: "7th Floor, KMC Armstrong Corporate Center",
  },
];

const SCHEDULE = [
  {
    day: "Sunday",
    services: [
      { name: "Worship Service", time: "4:00 PM – 6:30 PM", note: "Main Sanctuary · All welcome" },
    ],
  },
  {
    day: "Wednesday",
    services: [
      { name: "Prayer Night", time: "7:00 PM – 8:30 PM", note: "Hybrid — in-person & online" },
    ],
  },
  {
    day: "Office Hours",
    services: [
      { name: "Tuesday – Friday", time: "9:00 AM – 5:00 PM", note: "Administrative team on-site" },
      { name: "Saturday",         time: "9:00 AM – 1:00 PM", note: "Pastoral walk-ins welcome" },
    ],
  },
];

const SOCIAL = [
  { label: "Facebook",  href: churchInfo.socialMedia.facebook,  icon: Facebook,  handle: "@elbethelmanila" },
  { label: "Instagram", href: churchInfo.socialMedia.instagram, icon: Instagram, handle: "@elbethelmanila" },
  { label: "YouTube",   href: churchInfo.socialMedia.youtube,   icon: Youtube,   handle: "El-Bethel Manila" },
];

const FAQS = [
  {
    q: "Is the Sunday service open to first-time visitors?",
    a: "Absolutely — everyone is welcome! Just arrive a few minutes early, and our welcome team will be happy to greet you and help you find a seat. No prior church experience needed.",
  },
  {
    q: "Where exactly is the church located?",
    a: `We meet at the ${churchInfo.address}. Parking is available in the building basement. The nearest MRT station is Ayala, about a 10-minute walk or short Grab ride away.`,
  },
  {
    q: "How do I request a pastoral visit or counselling session?",
    a: "You can send us a message through this contact form, call our office, or email us directly at contact@ebchristianfellowship.org. Our pastoral team will follow up to schedule a time.",
  },
  {
    q: "Is there a children's programme during the Sunday service?",
    a: "Yes! Our Kids' Church runs simultaneously with the Sunday Worship Service for children aged 4–12. It features age-appropriate Bible lessons, worship, and activities in a safe, nurturing environment.",
  },
  {
    q: "How can I get involved or join a small group?",
    a: "We have several connect groups meeting throughout Metro Manila and online. The best first step is to attend a Sunday service and introduce yourself to one of our ministry leaders — or send us a message here and we'll get you connected.",
  },
  {
    q: "Is online giving available?",
    a: "Yes, you can give securely online via our Give page. We accept GCash, credit/debit cards, and bank transfer. All giving supports the local and missions work of El-Bethel.",
  },
];

/* ── FAQ item component ───────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-5 text-left gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded group"
        aria-expanded={open}
      >
        <span className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
          {q}
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={cn(
            "text-secondary shrink-0 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground text-sm leading-relaxed pb-5 pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────── */
export default function Contact() {
  useSEO(
    "Contact Us",
    "Get in touch with El-Bethel Christian Fellowship Church in Makati City. Call, email, visit, or send a message.",
  );

  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  async function onSubmit(data: ContactFormValues) {
    setLoading(true);
    try {
      const res = await fetch("/api/email/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });
      const json = await res.json() as { success?: boolean; error?: string };
      if (!res.ok || !json.success) throw new Error(json.error ?? "Unknown error");
      setSubmitted(true);
      form.reset();
    } catch (err) {
      toast({
        title:       "Message Not Sent",
        description: err instanceof Error ? err.message : "Something went wrong. Please try again.",
        variant:     "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative bg-primary overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "url('/images/pattern-cross.png')", backgroundSize: "280px" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/85" aria-hidden="true" />

        <Container className="relative z-10 pt-36 pb-24">
          <motion.div
            initial="hidden" animate="visible" variants={stagger}
            className="max-w-2xl"
          >
            <motion.p variants={fadeUp} className="text-secondary text-xs font-bold uppercase tracking-widest mb-4">
              We'd Love to Hear from You
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Let's Connect
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 text-lg leading-relaxed mb-5">
              Whether you have a question, want to plan your first visit, need prayer, or simply want to
              know more about El-Bethel — our church family is here for you.
            </motion.p>
            <motion.p variants={fadeUp} className="text-secondary/80 font-serif italic text-base">
              "How good and pleasant it is when God's people live together in unity!" — Psalm 133:1
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════
          QUICK CONTACT STRIP
      ══════════════════════════════════════════ */}
      <div className="bg-white border-b border-border/60">
        <Container>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border/60"
          >
            {QUICK_CONTACTS.map(({ icon: Icon, label, value, href, sub }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                variants={fadeUp}
                className="flex items-center gap-5 px-6 py-8 group hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/6 flex items-center justify-center text-secondary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </Container>
      </div>

      {/* ══════════════════════════════════════════
          MAIN — FORM + MAP + SOCIAL
      ══════════════════════════════════════════ */}
      <SectionWrapper className="bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20">

            {/* LEFT — Map, Social, Address */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="flex flex-col gap-10"
            >
              <motion.div variants={fadeUp}>
                <SectionHeading title="Find Us in Makati" subtitle="Our Location" />
                <p className="text-muted-foreground leading-relaxed mt-3 mb-6">
                  We are located in the heart of Salcedo Village — easily accessible by MRT, Grab, or car from
                  all across Metro Manila.
                </p>

                {/* Map placeholder */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(churchInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative rounded-2xl overflow-hidden shadow-md border border-border/60 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  aria-label="Open location in Google Maps"
                >
                  {/* Simulated map grid background */}
                  <div className="aspect-[16/9] bg-primary/5 relative">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(26,45,94,0.06) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(26,45,94,0.06) 1px, transparent 1px)
                        `,
                        backgroundSize: "32px 32px",
                      }}
                    />
                    {/* Street lines */}
                    <div className="absolute top-1/3 inset-x-0 h-[2px] bg-white/80" />
                    <div className="absolute top-2/3 inset-x-0 h-[2px] bg-white/60" />
                    <div className="absolute left-1/3 inset-y-0 w-[2px] bg-white/70" />
                    <div className="absolute left-2/3 inset-y-0 w-[2px] bg-white/50" />
                    {/* Pin */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-1 group-hover:scale-105 transition-transform duration-300">
                        <div className="w-14 h-14 rounded-full bg-primary shadow-xl flex items-center justify-center ring-4 ring-white">
                          <MapPin size={26} className="text-secondary" aria-hidden="true" />
                        </div>
                        <div className="bg-white rounded-xl shadow-lg px-4 py-2 text-center border border-border/40">
                          <p className="font-bold text-sm text-primary">El-Bethel Church</p>
                          <p className="text-xs text-muted-foreground">Salcedo Village, Makati City</p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-primary/40 mt-0.5" />
                      </div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 flex items-end justify-end p-4">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 bg-white text-primary text-xs font-semibold px-3 py-1.5 rounded-full shadow-md border border-border/40">
                        Open in Google Maps <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </a>

                {/* Full address */}
                <div className="mt-4 flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin size={16} className="text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{churchInfo.address}</span>
                </div>
              </motion.div>

              {/* Social media */}
              <motion.div variants={fadeUp}>
                <h3 className="font-serif text-xl font-bold text-foreground mb-5">Follow Our Community</h3>
                <div className="flex flex-col gap-3">
                  {SOCIAL.map(({ label, href, icon: Icon, handle }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${label}`}
                      className={cn(
                        "flex items-center gap-4 px-5 py-4 rounded-xl border border-border/60 bg-white",
                        "hover:border-secondary/50 hover:bg-secondary/5 hover:shadow-sm transition-all duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary group",
                      )}
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/6 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200 shrink-0">
                        <Icon size={18} aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground">{handle}</p>
                      </div>
                      <ArrowRight size={15} aria-hidden="true" className="text-muted-foreground/40 group-hover:text-secondary group-hover:translate-x-0.5 transition-all" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT — Contact form */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              <div className="bg-white rounded-3xl border border-border shadow-sm p-8 md:p-10">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={32} className="text-green-500" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-primary mb-3">Message Received!</h3>
                    <p className="text-muted-foreground leading-relaxed mb-2">
                      Thank you for reaching out. Someone from our church family will get back to you within
                      24 hours. God bless you!
                    </p>
                    <p className="text-secondary font-serif italic text-sm">
                      "The Lord bless you and keep you." — Numbers 6:24
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="mt-8 rounded-full px-8"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-7">
                      <div className="w-10 h-10 rounded-xl bg-primary/6 flex items-center justify-center text-secondary shrink-0">
                        <MessageCircle size={20} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Send a Message</p>
                        <h2 className="font-serif text-xl font-bold text-foreground leading-tight">How can we help you?</h2>
                      </div>
                    </div>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>

                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Juan dela Cruz" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="juan@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone <span className="text-muted-foreground font-normal">(Optional)</span></FormLabel>
                                <FormControl>
                                  <Input placeholder="+63 917 123 4567" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject <span className="text-muted-foreground font-normal">(Optional)</span></FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Planning My First Visit, General Inquiry…" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="How can we help you? We read every message personally and aim to reply within 24 hours."
                                  className="min-h-[130px] resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          disabled={loading}
                          className="w-full rounded-full py-3 text-base font-semibold gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                        >
                          {loading ? (
                            <><Loader2 size={18} className="animate-spin" /> Sending…</>
                          ) : (
                            <><Mail size={17} /> Send Message</>
                          )}
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                          Replies go to your email from{" "}
                          <a href="mailto:contact@ebchristianfellowship.org" className="text-primary hover:underline">
                            contact@ebchristianfellowship.org
                          </a>
                        </p>
                      </form>
                    </Form>
                  </>
                )}
              </div>
            </motion.div>

          </div>
        </Container>
      </SectionWrapper>

      {/* ══════════════════════════════════════════
          SERVICE SCHEDULE
      ══════════════════════════════════════════ */}
      <SectionWrapper dark>
        <Container>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <SectionHeading title="Plan Your Visit" subtitle="Service Schedule" centered dark />
              <p className="text-center text-white/60 max-w-xl mx-auto mt-3 mb-12">
                Join us in person at our Makati sanctuary or worship with us online. All services are free
                — everyone is welcome just as they are.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              {SCHEDULE.map(({ day, services }) => (
                <motion.div
                  key={day}
                  variants={fadeUp}
                  className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 hover:border-secondary/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <Clock size={16} className="text-secondary" aria-hidden="true" />
                    <h3 className="font-serif text-lg font-bold text-white">{day}</h3>
                  </div>
                  <div className="space-y-4">
                    {services.map(({ name, time, note }) => (
                      <div key={name} className="pl-4 border-l-2 border-secondary/40">
                        <p className="text-white font-semibold text-sm">{name}</p>
                        <p className="text-secondary text-sm font-medium">{time}</p>
                        <p className="text-white/50 text-xs mt-0.5">{note}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="text-center">
              <Link href="/contact#form">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-10 gap-2 font-semibold shadow-lg shadow-secondary/30">
                  <Calendar size={17} /> Plan My First Visit
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <SectionWrapper className="bg-background">
        <Container>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <SectionHeading title="Common Questions" subtitle="FAQ" centered />
              <p className="text-center text-muted-foreground max-w-xl mx-auto mt-3 mb-12">
                Can't find what you're looking for? Send us a message above or call our office — we're always happy to help.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="max-w-3xl mx-auto bg-white rounded-3xl border border-border shadow-sm px-8 py-2">
              {FAQS.map(({ q, a }) => (
                <FAQItem key={q} q={q} a={a} />
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* ══════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════ */}
      <section className="bg-secondary/10 border-t border-secondary/20">
        <Container>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="py-16 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <motion.div variants={fadeUp} className="text-center md:text-left">
              <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-1">Still have questions?</p>
              <h3 className="font-serif text-2xl font-bold text-foreground">We're always here for you.</h3>
              <p className="text-muted-foreground mt-1">
                Reach out anytime — no question is too small, no burden too heavy.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/prayer">
                <Button variant="outline" className="rounded-full px-8 border-primary/30 text-primary hover:bg-primary/5 gap-2 font-semibold">
                  <Heart size={16} /> Submit a Prayer Request
                </Button>
              </Link>
              <a href={`tel:${churchInfo.phone}`}>
                <Button className="rounded-full px-8 bg-primary hover:bg-primary/90 gap-2 font-semibold shadow-md">
                  <Phone size={16} /> Call Us Now
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </section>

    </main>
  );
}
