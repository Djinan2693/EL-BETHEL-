import { useSEO } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { team } from "@/data/team";
import { churchInfo } from "@/data/church";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  useSEO("About Us", "Learn about the history, mission, and leadership team of El-Bethel Christian Fellowship.");

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
        <Container className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">About Us</h1>
          <p className="text-xl max-w-2xl mx-auto text-primary-foreground/80 font-light">
            We are a family of believers committed to living out the Gospel in Manila.
          </p>
        </Container>
      </section>

      {/* Mission & Vision */}
      <SectionWrapper className="bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <div className="mb-4 text-secondary">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
              </div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To win the lost, make disciples, and build a vibrant community of faith that transforms Manila through the love and power of Jesus Christ.
              </p>
            </div>
            <div>
              <div className="mb-4 text-secondary">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><path d="M2 12h10"/><path d="M9 4v16"/><path d="m3 9 9-5 9 5"/><path d="M22 10v4"/><path d="M2 10v4"/></svg>
              </div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be a city-on-a-hill church—a spiritual home where every member is equipped for ministry, families are restored, and the next generation is ignited for God's glory.
              </p>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Core Values */}
      <SectionWrapper className="bg-white border-y border-border">
        <Container>
          <SectionHeading title="Core Values" subtitle="What Drives Us" centered />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Biblical Truth", desc: "The Word of God is our ultimate authority for faith and life." },
              { title: "Authentic Worship", desc: "We pursue a lifestyle of worship in spirit and in truth." },
              { title: "Relational Discipleship", desc: "We grow best when we grow together in intentional relationships." }
            ].map((value, i) => (
              <Card key={i} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-8 pb-8">
                  <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold font-serif">
                    0{i+1}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* History */}
      <SectionWrapper className="bg-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading title="Our History" subtitle="Established 1987" centered />
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p>
                {churchInfo.name} began as a small prayer gathering in Sampaloc, Manila in 1987. Founded by Ps. Samuel Lim, the fellowship quickly grew from a living room of twelve people to a vibrant congregation.
              </p>
              <p>
                Over the decades, we have seen God's faithfulness through seasons of challenge and expansion. We acquired our current property on Rizal Avenue in 1995, building a sanctuary dedicated to the Lord's work.
              </p>
              <p>
                Today, El-Bethel continues to stand as a testament to God's enduring grace—a place where faith truly meets family.
              </p>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Leadership */}
      <SectionWrapper className="bg-primary text-primary-foreground">
        <Container>
          <SectionHeading title="Pastoral Team" subtitle="Our Leadership" centered dark />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((pastor) => (
              <div key={pastor.id} className="group">
                <div className="aspect-[3/4] rounded-xl bg-white/10 mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white/20">
                     <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinelinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold font-serif mb-1 group-hover:text-secondary transition-colors">{pastor.name}</h3>
                <p className="text-secondary text-sm font-medium mb-4 uppercase tracking-wider">{pastor.title}</p>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  {pastor.bio}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>
    </main>
  );
}
