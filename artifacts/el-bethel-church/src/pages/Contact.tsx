import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  useSEO("Contact Us", "Get in touch with El-Bethel Christian Fellowship.");
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  async function onSubmit(data: ContactFormValues) {
    setLoading(true);
    try {
      const res = await fetch("/api/email/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json() as { success?: boolean; error?: string };
      if (!res.ok || !json.success) throw new Error(json.error ?? "Unknown error");
      setSubmitted(true);
      form.reset();
    } catch (err) {
      toast({
        title: "Message Not Sent",
        description: err instanceof Error ? err.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="pt-24">
      <SectionWrapper className="bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info Sidebar */}
            <div>
              <SectionHeading title="Get In Touch" subtitle="Contact Us" />
              <p className="text-lg text-muted-foreground mb-10">
                Have a question, need prayer, or want to know more about our church? We'd love to hear from you.
              </p>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-secondary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Our Location</h4>
                    <p className="text-muted-foreground">{churchInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-secondary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone</h4>
                    <a href={`tel:${churchInfo.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {churchInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-secondary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email</h4>
                    <a href={`mailto:${churchInfo.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {churchInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-secondary shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Office Hours</h4>
                    <p className="text-muted-foreground">Tuesday – Friday: 9:00 AM – 5:00 PM</p>
                    <p className="text-muted-foreground">Saturday: 9:00 AM – 1:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(churchInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-video bg-primary rounded-xl flex items-center justify-center relative overflow-hidden shadow-inner group"
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity group-hover:opacity-40 transition-opacity" />
                <div className="relative z-10 text-center">
                  <MapPin className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <p className="text-white font-medium">View on Google Maps</p>
                  <p className="text-white/70 text-sm mt-1">Salcedo Village, Makati City</p>
                </div>
              </a>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-border/50">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-primary mb-3">Message Sent!</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Thank you for reaching out. Someone from our church family will get back to you soon. God bless you!
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="mt-8"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-serif font-bold mb-6 text-primary">Send us a message</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Juan dela Cruz" className="bg-background" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="juan@example.com" type="email" className="bg-background" {...field} />
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
                              <FormLabel>Phone (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="+63 917 123 4567" className="bg-background" {...field} />
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
                            <FormLabel>Subject (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="What is this about?" className="bg-background" {...field} />
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
                                placeholder="How can we help you?" 
                                className="min-h-[140px] bg-background" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" size="lg" className="w-full" disabled={loading}>
                        {loading ? (
                          <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Sending…</>
                        ) : (
                          <><Mail className="mr-2 w-4 h-4" /> Send Message</>
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        Your message goes directly to <strong>contact@ebchristianfellowship.org</strong>
                      </p>
                    </form>
                  </Form>
                </>
              )}
            </div>
            
          </div>
        </Container>
      </SectionWrapper>
    </main>
  );
}
