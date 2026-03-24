import { useSEO } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { events } from "@/data/events";
import { Calendar as CalendarIcon, Clock, MapPin, Share2 } from "lucide-react";

export default function Events() {
  useSEO("Events", "Upcoming events and gatherings at El-Bethel Christian Fellowship.");

  return (
    <main className="pt-24">
      {/* Hero */}
      <div className="bg-primary text-primary-foreground py-16">
        <Container>
          <SectionHeading title="Events" subtitle="Get Involved" dark />
          <p className="text-lg text-primary-foreground/80 max-w-2xl font-light">
            Stay connected with what's happening in our church family. There's always an opportunity to grow, serve, and fellowship.
          </p>
        </Container>
      </div>

      <SectionWrapper className="bg-background min-h-[60vh]">
        <Container>
          <div className="max-w-4xl mx-auto space-y-6">
            {events.map((event) => {
              // Parse simple mock date "Month DD, YYYY"
              const parts = event.date.split(" ");
              const month = parts[0];
              const day = parts[1].replace(",", "");
              const year = parts[2];

              return (
                <div key={event.id} className="bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition-all group flex flex-col md:flex-row">
                  {/* Date Block */}
                  <div className="bg-primary/5 md:w-48 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border group-hover:bg-primary transition-colors">
                    <span className="text-sm font-bold uppercase tracking-wider text-secondary mb-1">{month}</span>
                    <span className="text-5xl font-serif font-bold text-primary group-hover:text-white transition-colors leading-none mb-1">{day}</span>
                    <span className="text-sm text-muted-foreground group-hover:text-white/70 transition-colors">{year}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 md:p-8 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="bg-secondary/15 text-secondary-foreground">
                        {event.category}
                      </Badge>
                    </div>
                    
                    <h3 className="text-2xl font-bold font-serif mb-4 text-foreground group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="text-secondary w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="text-secondary w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="flex gap-3">
                      <Button>Register / RSVP</Button>
                      <Button variant="outline" size="icon" title="Share Event">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </SectionWrapper>
    </main>
  );
}
