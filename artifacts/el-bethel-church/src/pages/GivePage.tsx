import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Building2,
  Smartphone,
  CreditCard,
  Shield,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  ArrowRight,
  Lock,
  Scan,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

type Method = "gcash" | "bank" | "card";

const METHODS: { id: Method; label: string; icon: React.ReactNode; badge?: string }[] = [
  { id: "gcash",  label: "GCash",         icon: <Smartphone className="w-5 h-5" />,  badge: "Instant" },
  { id: "bank",   label: "Bank Transfer", icon: <Building2  className="w-5 h-5" />,  badge: "BPI" },
  { id: "card",   label: "Card Payment",  icon: <CreditCard className="w-5 h-5" />,  badge: "Coming Soon" },
];

const FAQ = [
  {
    q: "Is my donation secure?",
    a: "Yes. GCash and BPI are BSP-regulated financial institutions with end-to-end encryption. Our card payment gateway (when activated) will use PCI-DSS-compliant processing — we never store raw card data.",
  },
  {
    q: "Will I receive a receipt or acknowledgement?",
    a: "You will receive an automatic confirmation from GCash or your bank. For an official church acknowledgement, please email info@ebchristianfellowship.org with your reference number.",
  },
  {
    q: "Can I give a recurring tithe automatically?",
    a: "Yes, via your banking app's scheduled transfer feature to our BPI account. Card-based recurring giving will be available once our payment gateway is fully set up.",
  },
  {
    q: "What is my donation used for?",
    a: "Your gift supports church operations, missions, community outreach, and the ongoing growth of El-Bethel Christian Fellowship Church in Makati City.",
  },
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handle}
      className="ml-2 inline-flex items-center gap-1 text-xs text-secondary hover:text-secondary/80 transition-colors"
      title="Copy"
    >
      {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function GCashPanel() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="grid md:grid-cols-2 gap-10 items-start">
      {/* QR Code */}
      <motion.div variants={fadeUp} className="flex flex-col items-center">
        <div className="relative bg-white rounded-2xl shadow-xl p-4 border border-border w-full max-w-xs mx-auto">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-[#007DFF] hover:bg-[#007DFF] text-white px-3 py-1 text-xs font-bold tracking-wider uppercase shadow">
              GCash QR
            </Badge>
          </div>
          <img
            src={`${import.meta.env.BASE_URL}images/qr-gcash.jpg`}
            alt="GCash QR Code for El-Bethel"
            className="w-full rounded-xl"
          />
        </div>
        <p className="mt-4 text-xs text-muted-foreground text-center">
          Scan with your GCash app or any InstaPay-enabled banking app
        </p>
        <div className="mt-4 bg-primary/5 rounded-xl px-6 py-4 text-center w-full max-w-xs mx-auto border border-border">
          <p className="text-xs text-muted-foreground mb-1">GCash Mobile Number</p>
          <p className="font-mono text-lg font-bold text-primary tracking-wider">0966-926-9566</p>
          <p className="text-xs text-muted-foreground mt-1">PA****K MU****I T.</p>
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div variants={fadeUp} className="space-y-6">
        <div>
          <h3 className="font-bold text-xl mb-1 font-serif text-primary">How to Give via GCash</h3>
          <p className="text-muted-foreground text-sm">Three simple steps — takes less than a minute.</p>
        </div>

        {[
          { step: "1", icon: <Scan className="w-5 h-5" />, title: "Open GCash & Scan", body: "Open your GCash app, tap \"Send Money\" → \"Scan QR\", then scan the QR code above. Alternatively, search for the mobile number 0966-926-9566." },
          { step: "2", icon: <Heart className="w-5 h-5" />, title: "Enter Your Gift Amount", body: "Type the amount you'd like to give. You may add a note such as 'Tithe', 'Offering', or 'Missions' in the message field." },
          { step: "3", icon: <CheckCircle2 className="w-5 h-5" />, title: "Confirm & Send", body: "Review the details and confirm. Save your GCash receipt. Optionally, email your reference to info@ebchristianfellowship.org." },
        ].map(({ step, icon, title, body }) => (
          <div key={step} className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
              {step}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-secondary">{icon}</span>
                <h4 className="font-semibold text-sm">{title}</h4>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
            </div>
          </div>
        ))}

        <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 flex gap-3 items-start">
          <Shield className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/80">
            GCash transactions are encrypted and BSP-regulated. Transfer fees may apply for cross-wallet transfers.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function BankPanel() {
  const acct = "8529881394";
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="grid md:grid-cols-2 gap-10 items-start">
      {/* QR Code */}
      <motion.div variants={fadeUp} className="flex flex-col items-center">
        <div className="relative bg-white rounded-2xl shadow-xl p-4 border border-border w-full max-w-xs mx-auto">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-[#CC0000] hover:bg-[#CC0000] text-white px-3 py-1 text-xs font-bold tracking-wider uppercase shadow">
              BPI InstaPay QR
            </Badge>
          </div>
          <img
            src={`${import.meta.env.BASE_URL}images/qr-bpi.jpg`}
            alt="BPI InstaPay QR Code for El-Bethel"
            className="w-full rounded-xl"
          />
        </div>
        <p className="mt-4 text-xs text-muted-foreground text-center">
          Scan with your BPI app or any InstaPay-enabled banking app
        </p>
      </motion.div>

      {/* Account Details */}
      <motion.div variants={fadeUp} className="space-y-6">
        <div>
          <h3 className="font-bold text-xl mb-1 font-serif text-primary">Bank Transfer Details</h3>
          <p className="text-muted-foreground text-sm">Direct deposit to our BPI savings account. All major Philippine banks support InstaPay.</p>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="bg-[#CC0000] px-6 py-3 flex items-center gap-2">
            <span className="text-white font-bold text-lg tracking-wide">BPI</span>
            <span className="text-white/80 text-sm">Bank of the Philippine Islands</span>
          </div>
          <div className="px-6 py-5 space-y-4">
            {[
              { label: "Bank", value: "Bank of the Philippine Islands (BPI)" },
              { label: "Account Type", value: "Savings Account" },
              { label: "Account Name", value: "El-Bethel Christian Fellowship" },
              { label: "Account Number", value: acct, mono: true, copy: true },
            ].map(({ label, value, mono, copy }) => (
              <div key={label} className="flex justify-between items-center border-b border-border/50 pb-3 last:border-0 last:pb-0">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
                <span className={`text-sm font-semibold text-foreground flex items-center ${mono ? "font-mono" : ""}`}>
                  {value}
                  {copy && <CopyButton value={value} />}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {[
            { icon: <CheckCircle2 className="w-4 h-4 text-green-600" />, text: "Send from any Philippine bank via InstaPay or PESONet" },
            { icon: <CheckCircle2 className="w-4 h-4 text-green-600" />, text: "Use your transaction reference number as your receipt" },
            { icon: <Shield className="w-4 h-4 text-secondary" />, text: "Optionally email your reference to info@ebchristianfellowship.org" },
          ].map(({ icon, text }, i) => (
            <div key={i} className="flex gap-3 items-start text-sm text-muted-foreground">
              <span className="flex-shrink-0 mt-0.5">{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function CardPanel() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-2xl mx-auto text-center space-y-8">
      <motion.div variants={fadeUp}>
        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <CreditCard className="w-10 h-10 text-primary" />
        </div>
        <h3 className="font-bold text-2xl font-serif text-primary mb-3">Pay with Credit or Debit Card</h3>
        <p className="text-muted-foreground leading-relaxed">
          We are setting up a secure, hosted card payment gateway (Maya Checkout / PayMongo) so you can give using any Visa, Mastercard, or JCB card. Card data is never stored on our servers.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: <Lock className="w-5 h-5" />, title: "PCI-DSS Compliant", body: "Bank-grade encryption on all card transactions" },
          { icon: <Shield className="w-5 h-5" />, title: "No Card Storage", body: "Raw card data is never stored on our servers" },
          { icon: <CheckCircle2 className="w-5 h-5" />, title: "BSP-Licensed Gateway", body: "Processed through a licensed Philippine payment provider" },
        ].map(({ icon, title, body }) => (
          <div key={title} className="bg-primary/5 rounded-xl p-4 text-center">
            <div className="text-secondary mx-auto w-fit mb-2">{icon}</div>
            <p className="font-semibold text-sm mb-1">{title}</p>
            <p className="text-xs text-muted-foreground">{body}</p>
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="bg-white border-2 border-dashed border-border rounded-2xl p-8 space-y-4">
        <Badge variant="outline" className="text-muted-foreground border-border">Coming Soon</Badge>
        <p className="text-muted-foreground text-sm">
          Card giving will be live shortly. In the meantime, please use GCash or Bank Transfer above — both are instant and BSP-regulated.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" asChild className="rounded-full">
            <a href="#gcash" onClick={(e) => { e.preventDefault(); document.getElementById("method-gcash")?.click(); }}>
              Give via GCash instead
            </a>
          </Button>
          <Button variant="outline" asChild className="rounded-full">
            <Link href="/contact">
              Contact Us <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex justify-between items-center py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-sm md:text-base text-foreground">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted-foreground text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GivePage() {
  useSEO({
    title: "Give Online",
    description: "Support the mission of El-Bethel Christian Fellowship Church. Give securely via GCash, BPI Bank Transfer, or card — every gift advances the Kingdom.",
    canonical: "/give",
  });

  const [active, setActive] = useState<Method>("gcash");

  return (
    <main className="pt-24">
      {/* ── Hero ── */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={`${import.meta.env.BASE_URL}images/give-texture.png`} alt="" className="w-full h-full object-cover" />
        </div>
        <Container className="relative z-10 text-center max-w-3xl mx-auto">
          <Heart className="w-12 h-12 text-secondary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Worship Through Giving</h1>
          <p className="text-lg text-primary-foreground/80 font-light italic font-serif text-xl mb-4">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
          </p>
          <p className="text-sm text-secondary uppercase tracking-widest font-semibold">— 2 Corinthians 9:7</p>
        </Container>
      </section>

      {/* ── Why Give ── */}
      <SectionWrapper className="bg-background border-b border-border">
        <Container className="max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-4">
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-secondary font-semibold">Partner With Us</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-serif font-bold text-primary">Your Gift Makes a Difference</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
              Generosity is an act of worship. Every gift you give — large or small — directly supports our Sunday services, community outreach, missions in Makati City, and the growth of the Kingdom here in the Philippines. Thank you for your faithfulness.
            </motion.p>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* ── Giving Methods ── */}
      <SectionWrapper className="bg-white">
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-10">
            {/* Tab bar */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
              {METHODS.map(({ id, label, icon, badge }) => (
                <button
                  key={id}
                  id={`method-${id}`}
                  onClick={() => setActive(id)}
                  className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full border text-sm font-semibold transition-all duration-200 ${
                    active === id
                      ? "bg-primary text-primary-foreground border-primary shadow-lg scale-[1.02]"
                      : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  {icon}
                  {label}
                  {badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${
                      active === id ? "bg-secondary text-primary" : "bg-primary/10 text-primary"
                    }`}>
                      {badge}
                    </span>
                  )}
                </button>
              ))}
            </motion.div>

            {/* Panel */}
            <motion.div variants={fadeUp}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-background rounded-3xl border border-border p-6 md:p-10 shadow-sm"
                >
                  {active === "gcash" && <GCashPanel />}
                  {active === "bank"  && <BankPanel />}
                  {active === "card"  && <CardPanel />}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* ── Trust indicators ── */}
      <SectionWrapper className="bg-primary/5 border-y border-border">
        <Container className="max-w-4xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid sm:grid-cols-3 gap-6 text-center"
          >
            {[
              { icon: <Lock className="w-6 h-6" />, title: "Secure Transactions", body: "All payment methods are encrypted and regulated by the Bangko Sentral ng Pilipinas (BSP)." },
              { icon: <Shield className="w-6 h-6" />, title: "No Hidden Fees", body: "We don't charge any processing fees on our end. GCash or bank transfer fees may apply." },
              { icon: <Heart className="w-6 h-6" />, title: "100% Goes to Ministry", body: "Every peso you give is used to fund church operations, outreach, and community care." },
            ].map(({ icon, title, body }) => (
              <motion.div key={title} variants={fadeUp} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  {icon}
                </div>
                <h4 className="font-bold text-sm">{title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* ── FAQ ── */}
      <SectionWrapper className="bg-background">
        <Container className="max-w-2xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-6">
            <motion.div variants={fadeUp} className="text-center">
              <p className="text-xs uppercase tracking-widest text-secondary font-semibold mb-2">Common Questions</p>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">Giving FAQ</h2>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-border shadow-sm px-6">
              {FAQ.map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
            </motion.div>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* ── CTA footer ── */}
      <SectionWrapper className="bg-primary text-primary-foreground">
        <Container className="max-w-xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-5">
            <motion.div variants={fadeUp} className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6 text-primary" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-serif font-bold">Have Questions About Giving?</motion.h2>
            <motion.p variants={fadeUp} className="text-primary-foreground/80 text-sm leading-relaxed">
              Our team is happy to help. Reach out at{" "}
              <a href="mailto:info@ebchristianfellowship.org" className="text-secondary underline underline-offset-2">
                info@ebchristianfellowship.org
              </a>{" "}
              or visit us on Sunday at 4:00 PM.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 rounded-full font-semibold" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full" asChild>
                <Link href="/prayer-request">Submit a Prayer Request</Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </SectionWrapper>
    </main>
  );
}
