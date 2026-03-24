import { useSEO } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ministries } from "@/data/ministries";
import { Users, Mail } from "lucide-react";

export default function Ministries() {
  useSEO("Ministries", "Discover the various ministries and small groups at El-Bethel.");

  return (
    <main className="pt-24">
      {/* Hero */}
      <div className="bg-background py-16 border-b border-border">
        <Container>
          <SectionHeading title="Our Ministries" subtitle="Find Your Place" />
          <p className="text-lg text-muted-foreground max-w-2xl">
            We believe that every member is a minister. Find a place to connect, serve, and grow in your walk with God.
          </p>
        </Container>
      </div>

      <SectionWrapper className="bg-cream">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry) => (
              <Card key={ministry.id} className="h-full flex flex-col border-t-4 border-t-transparent hover:border-t-secondary transition-all hover:shadow-lg">
                <CardHeader className="bg-primary/5 pb-4 border-b border-border/50">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm mb-4">
                    <Users size={24} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary">{ministry.name}</h3>
                  <p className="text-secondary font-medium italic font-serif text-sm">{ministry.tagline}</p>
                </CardHeader>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6 flex-1">
                    {ministry.description}
                  </p>
                  
                  <div className="bg-background rounded-lg p-4 mb-6 border border-border/50">
                    <p className="text-sm text-muted-foreground mb-1">Ministry Head</p>
                    <p className="font-semibold">{ministry.leader}</p>
                  </div>
                  
                  <Button variant="outline" className="w-full group">
                    <Mail className="w-4 h-4 mr-2 group-hover:text-secondary transition-colors" /> Contact Leader
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </SectionWrapper>
    </main>
  );
}
