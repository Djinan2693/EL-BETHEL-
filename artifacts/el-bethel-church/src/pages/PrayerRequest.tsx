import { useState } from "react";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "@/lib/emailjs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useSEO } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Heart, HandHeart, ShieldCheck, Users, CheckCircle, Loader2, BookOpen
} from "lucide-react";

const prayerSchema = z.object({
  name:    z.string().min(2, "Please enter your name"),
  email:   z.string().email("A valid email is required so we can follow up"),
  topic:   z.string().min(3, "Please describe the topic briefly"),
  request: z.string().min(20, "Please share a little more detail so we can pray well"),
  isPrivate: z.boolean().optional(),
});

type PrayerFormValues = z.infer<typeof prayerSchema>;

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const PILLARS = [
  {
    icon: HandHeart,
    title: "Dedicated Intercessors",
    body:  "Our prayer team commits to lifting your request before God, often for days at a time.",
  },
  {
    icon: ShieldCheck,
    title: "Completely Confidential",
    body:  "Private requests are seen only by our pastoral team — never shared publicly without your consent.",
  },
  {
    icon: Users,
    title: "Community of Faith",
    body:  "When you choose to share, the whole El-Bethel family joins in agreement on your behalf.",
  },
  {
    icon: BookOpen,
    title: "Scripture-Rooted Prayer",
    body:  "We anchor every prayer in God's Word, trusting His promises over every situation.",
  },
];

export default function PrayerRequest() {
  useSEO({
    title:       "Prayer Request",
    description: "Submit a prayer request to El-Bethel Christian Fellowship Church in Makati City. Our dedicated intercessory team will pray over your needs with faith and complete confidentiality.",
    canonical:   "/prayer",
  });

  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const form = useForm<PrayerFormValues>({
    resolver: zodResolver(prayerSchema),
    defaultValues: { name: "", email: "", topic: "", request: "", isPrivate: true },
  });

  async function onSubmit(data: PrayerFormValues) {
    setLoading(true);
    try {
      await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, {
        form_type:  "Prayer Request",
        from_name:  data.name ?? "",
        from_email: data.email ?? "",
        phone:      "",
        subject:    data.topic ?? "",
        topic:      data.topic ?? "",
        message:    data.request,
      }, { publicKey: EMAILJS_CONFIG.PUBLIC_KEY });
      setSubmitted(true);
      form.reset();
    } catch (err) {
      toast({
        title:       "Request Not Sent",
        description: err instanceof Error ? err.message : "Something went wrong. Please try again.",
        variant:     "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
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
              <Heart className="w-12 h-12 text-secondary mx-auto mb-6" />
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-serif font-bold mb-6">
              We're Here to Pray with You
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-primary-foreground/80 font-light italic font-serif text-xl mb-8">
              "Cast all your anxiety on him because he cares for you."
            </motion.p>
            <motion.p variants={fadeUp} className="text-sm text-secondary uppercase tracking-widest font-semibold">
              — 1 Peter 5:7
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ── Pillars ─────────────────────────────────────────── */}
      <SectionWrapper className="bg-background">
        <Container>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {PILLARS.map(({ icon: Icon, title, body }) => (
              <motion.div
                key={title} variants={fadeUp}
                className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-border/60 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center text-secondary">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1.5">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* ── Form ─────────────────────────────────────────────── */}
      <SectionWrapper className="bg-muted/30">
        <Container>
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <SectionHeading
                  title="Share Your Request"
                  subtitle="Prayer Request Form"
                  centered
                />
                <p className="text-center text-muted-foreground mt-2 mb-10">
                  All information is handled with pastoral care. Private requests stay between you and our prayer team.
                </p>
              </motion.div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 px-8 rounded-3xl bg-white border border-border shadow-sm"
                >
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                    Your Request Has Been Received
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    Our prayer team will begin interceding on your behalf. May God's peace guard your heart.
                  </p>
                  <p className="text-secondary font-serif italic text-sm">
                    "The prayer of a righteous person is powerful and effective." — James 5:16
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="mt-8 rounded-full px-8"
                  >
                    Submit Another Request
                  </Button>
                </motion.div>
              ) : (
                <motion.div variants={fadeUp}>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="bg-white rounded-3xl border border-border shadow-sm p-8 md:p-10 space-y-6"
                    >
                      {/* Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Maria Santos" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="you@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Topic */}
                      <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prayer Topic</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Healing, Family, Financial Provision, Guidance…"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Request details */}
                      <FormField
                        control={form.control}
                        name="request"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prayer Request Details</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Share as much or as little as you're comfortable with. Our team will pray faithfully over every word."
                                className="min-h-[140px] resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Private toggle */}
                      <FormField
                        control={form.control}
                        name="isPrivate"
                        render={({ field }) => (
                          <FormItem>
                            <div
                              className={cn(
                                "flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors",
                                field.value
                                  ? "border-secondary/60 bg-secondary/5"
                                  : "border-border bg-muted/30",
                              )}
                              onClick={() => field.onChange(!field.value)}
                              role="checkbox"
                              aria-checked={field.value}
                              tabIndex={0}
                              onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") field.onChange(!field.value); }}
                            >
                              <div className={cn(
                                "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                                field.value ? "bg-secondary border-secondary" : "border-border bg-white",
                              )}>
                                {field.value && (
                                  <svg viewBox="0 0 12 9" fill="none" className="w-3 h-2.5">
                                    <path d="M1 4.5L4.5 8L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <p className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                                  <ShieldCheck size={14} className="text-secondary" />
                                  Keep this request private
                                </p>
                                <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
                                  Only our pastoral prayer team will see this. Uncheck to allow the congregation to pray along with you.
                                </p>
                              </div>
                            </div>
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full py-3 text-base font-semibold gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                      >
                        {loading ? (
                          <><Loader2 size={18} className="animate-spin" /> Submitting…</>
                        ) : (
                          <><Heart size={18} /> Submit Prayer Request</>
                        )}
                      </Button>
                    </form>
                  </Form>
                </motion.div>
              )}
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* ── Encouragement banner ─────────────────────────────── */}
      <section className="bg-primary py-16">
        <Container>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div variants={fadeUp} className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-5">
              <HandHeart size={26} className="text-secondary" aria-hidden="true" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl font-bold text-white mb-4">
              The El-Bethel Prayer Team
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 leading-relaxed mb-6">
              Every week, our dedicated intercessors gather to pray over submitted requests by name.
              We believe in a God who hears and answers prayer — and we are honoured to stand with you.
            </motion.p>
            <motion.p variants={fadeUp} className="text-secondary/90 font-serif italic">
              "Again, truly I tell you that if two of you on earth agree about anything they ask for,
              it will be done for them by my Father in heaven." — Matthew 18:19
            </motion.p>
          </motion.div>
        </Container>
      </section>

    </main>
  );
}
