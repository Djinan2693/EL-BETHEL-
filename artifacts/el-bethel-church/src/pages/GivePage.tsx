import { useSEO } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Building2, Smartphone, CreditCard } from "lucide-react";

export default function GivePage() {
  useSEO("Give", "Support the mission and ministries of El-Bethel Church.");

  return (
    <main className="pt-24">
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <img src={`${import.meta.env.BASE_URL}images/give-texture.png`} alt="" className="w-full h-full object-cover" />
        </div>
        <Container className="relative z-10 text-center max-w-3xl mx-auto">
          <Heart className="w-12 h-12 text-secondary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Worship Through Giving</h1>
          <p className="text-lg text-primary-foreground/80 font-light italic font-serif text-xl mb-8">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
          </p>
          <p className="text-sm text-secondary uppercase tracking-widest font-semibold">— 2 Corinthians 9:7</p>
        </Container>
      </section>

      <SectionWrapper className="bg-background min-h-[50vh]">
        <Container>
          <SectionHeading title="Ways to Give" subtitle="Partner With Us" centered />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Online/Card */}
            <Card className="text-center hover:shadow-lg transition-all border-t-4 border-t-transparent hover:border-t-secondary">
              <CardContent className="pt-10 pb-8 flex flex-col h-full">
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                  <CreditCard size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Give Online</h3>
                <p className="text-muted-foreground text-sm mb-8 flex-1">
                  Securely give using your credit/debit card via our online giving portal. You can set up one-time or recurring gifts.
                </p>
                <Button className="w-full" size="lg">Give Now</Button>
              </CardContent>
            </Card>

            {/* Bank Transfer */}
            <Card className="text-center hover:shadow-lg transition-all border-t-4 border-t-transparent hover:border-t-secondary relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-secondary text-primary text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg z-10">
                Preferred
              </div>
              <CardContent className="pt-10 pb-8 flex flex-col h-full">
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                  <Building2 size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">Bank Transfer</h3>
                <p className="text-muted-foreground text-sm mb-6 flex-1">
                  Direct deposit to our BDO account. Ideal for local tithes and offerings.
                </p>
                <div className="bg-primary/5 p-4 rounded-lg text-left text-sm mb-6 w-full">
                  <p className="text-muted-foreground mb-1">Bank: <span className="text-foreground font-semibold">BDO Savings</span></p>
                  <p className="text-muted-foreground mb-1">Name: <span className="text-foreground font-semibold">El-Bethel Church</span></p>
                  <p className="text-muted-foreground">Acct: <span className="text-foreground font-mono font-bold">005-123-456-789</span></p>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Wallet */}
            <Card className="text-center hover:shadow-lg transition-all border-t-4 border-t-transparent hover:border-t-secondary">
              <CardContent className="pt-10 pb-8 flex flex-col h-full">
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                  <Smartphone size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">GCash / Maya</h3>
                <p className="text-muted-foreground text-sm mb-6 flex-1">
                  Send your tithes quickly and conveniently using your mobile wallet app.
                </p>
                <div className="bg-primary/5 p-4 rounded-lg text-center mb-6 w-full">
                  <p className="font-mono text-xl font-bold tracking-wider text-primary">0917-123-4567</p>
                  <p className="text-xs text-muted-foreground mt-1">El-Bethel GCash Acct</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-16 text-center max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-border shadow-sm">
            <h4 className="font-bold text-lg mb-2">Need Help?</h4>
            <p className="text-muted-foreground text-sm mb-4">
              If you have questions about giving or need an end-of-year giving statement for tax purposes, please contact our finance office.
            </p>
            <Button variant="outline">Contact Finance Office</Button>
          </div>
        </Container>
      </SectionWrapper>
    </main>
  );
}
