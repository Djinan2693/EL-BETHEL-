import { Link } from "wouter";
import { ArrowRight, PlayCircle, MapPin, Clock, Calendar as CalendarIcon, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSEO } from "@/lib/seo";
import { sermons } from "@/data/sermons";
import { events } from "@/data/events";
import { ministries } from "@/data/ministries";

export default function Home() {
  useSEO("Home", "Welcome to El-Bethel Christian Fellowship Church. A Spirit-filled community in the heart of Manila.");

  const featuredSermons = sermons.slice(0, 3);
  const upcomingEvents = events.slice(0, 3);
  const featuredMinistries = ministries.slice(0, 4);

  return (
    <main>
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/70 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent z-10" />
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-worship.png`} 
            alt="Worship at El-Bethel" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <Container className="relative z-20 text-center text-white">
          <span className="inline-block py-1 px-3 rounded-full border border-secondary/50 text-secondary text-sm font-medium tracking-wider mb-6 uppercase">
            Welcome Home
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 drop-shadow-lg leading-tight">
            Where Faith <br className="hidden md:block"/> 
            <span className="italic text-secondary font-light">&</span> Family Meet
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 font-light">
            A Spirit-filled community in the heart of Manila dedicated to knowing Christ and making Him known in every area of life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/about">
              <Button size="lg" variant="secondary" className="rounded-full px-8 h-14 text-lg">
                Plan a Visit
              </Button>
            </Link>
            <Link href="/sermons">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg text-white border-white/30 hover:bg-white/10 bg-transparent">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Latest Message
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* 2. Welcome Section */}
      <SectionWrapper className="bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading 
                title="A Place to Belong" 
                subtitle="Our Story"
              />
              <div className="prose prose-lg text-muted-foreground mb-8">
                <p>
                  At El-Bethel Christian Fellowship, we believe that church isn't just a building you visit on Sundays—it's a family you belong to. For over three decades, we have been a beacon of hope in Manila.
                </p>
                <p>
                  Whether you're exploring faith for the first time, or looking for a church to call home, there's a place for you here. We are passionate about authentic worship, unapologetic biblical teaching, and real community.
                </p>
              </div>
              <Link href="/about">
                <Button variant="ghost" className="text-primary p-0 hover:bg-transparent hover:text-secondary group text-lg">
                  Learn Our Story <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/10 translate-x-4 translate-y-4 rounded-2xl" />
              <img 
                src={`${import.meta.env.BASE_URL}images/about-community.png`}
                alt="Church Community" 
                className="relative rounded-2xl shadow-xl w-full h-auto aspect-[4/3] object-cover border-4 border-white"
              />
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 3. Service Times Section */}
      <SectionWrapper className="bg-white border-y border-border/50">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">Join Us This Week</h2>
            <p className="text-muted-foreground">Come as you are. We'd love to worship with you.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-secondary hover-elevate">
              <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-6">
                  <Clock size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">Sunday Morning</h3>
                <p className="text-lg font-medium text-primary mb-4">9:00 AM & 11:00 AM</p>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <MapPin size={16} className="text-secondary" />
                  Main Sanctuary
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                  <Heart size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">Wednesday Prayer</h3>
                <p className="text-lg font-medium text-primary mb-4">7:00 PM</p>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <MapPin size={16} className="text-secondary" />
                  Online & In-Person
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                  <CalendarIcon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">Friday Youth Night</h3>
                <p className="text-lg font-medium text-primary mb-4">6:30 PM</p>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <MapPin size={16} className="text-secondary" />
                  Youth Hall
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </SectionWrapper>

      {/* 4. Featured Sermons */}
      <SectionWrapper className="bg-background">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <SectionHeading 
              title="Recent Messages" 
              subtitle="Listen & Grow"
              className="mb-0"
            />
            <Link href="/sermons" className="hidden md:block">
              <Button variant="outline" className="rounded-full">View All Sermons</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSermons.map(sermon => (
              <Card key={sermon.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="aspect-[16/9] bg-primary/5 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors z-10" />
                  <PlayCircle className="text-white w-16 h-16 z-20 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <img src={`${import.meta.env.BASE_URL}images/pattern-cross.png`} alt="" className="absolute inset-0 opacity-20 mix-blend-multiply w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <Badge variant="secondary" className="bg-secondary/15 text-secondary-foreground hover:bg-secondary/25">
                      {sermon.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-medium">{sermon.date}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                    {sermon.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {sermon.pastor} • {sermon.scripture}
                  </p>
                  <div className="pt-4 border-t border-border flex gap-3">
                    <Button variant="ghost" size="sm" className="px-0 hover:bg-transparent text-primary">
                      Watch Video
                    </Button>
                    <span className="text-border">|</span>
                    <Button variant="ghost" size="sm" className="px-0 hover:bg-transparent text-muted-foreground">
                      Listen Audio
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/sermons">
              <Button variant="outline" className="rounded-full w-full">View All Sermons</Button>
            </Link>
          </div>
        </Container>
      </SectionWrapper>

      {/* 5. Ministries */}
      <SectionWrapper dark>
        <Container>
          <SectionHeading 
            title="Grow Together" 
            subtitle="Our Ministries"
            centered
            dark
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMinistries.map(ministry => (
              <div key={ministry.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">
                  {ministry.name}
                </h3>
                <p className="text-secondary/90 text-sm font-medium mb-4 italic font-serif">
                  {ministry.tagline}
                </p>
                <p className="text-white/60 text-sm line-clamp-3 mb-6">
                  {ministry.description}
                </p>
                <Link href="/ministries">
                  <span className="text-white text-sm font-semibold flex items-center group-hover:text-secondary transition-colors">
                    Learn More <ArrowRight className="ml-1 w-4 h-4" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/ministries">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8">
                Explore All Ministries
              </Button>
            </Link>
          </div>
        </Container>
      </SectionWrapper>

      {/* 6. Upcoming Events */}
      <SectionWrapper className="bg-background">
        <Container>
           <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <SectionHeading 
              title="Upcoming Events" 
              subtitle="Mark Your Calendar"
              className="mb-0"
            />
            <Link href="/events" className="hidden md:block">
              <Button variant="outline" className="rounded-full">View All Events</Button>
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map(event => {
              const [month, day] = event.date.split(" ");
              return (
                <div key={event.id} className="bg-white border rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center hover:shadow-md transition-shadow group">
                  {/* Date Block */}
                  <div className="bg-primary/5 rounded-lg p-4 text-center min-w-[100px] border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="block text-sm font-bold uppercase text-secondary group-hover:text-secondary mb-1">{month}</span>
                    <span className="block text-3xl font-serif font-bold text-primary group-hover:text-white leading-none">{day.replace(',', '')}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <Badge variant="outline" className="mb-2 text-xs">{event.category}</Badge>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Clock size={16} className="text-secondary" /> {event.time}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={16} className="text-secondary" /> {event.location}</span>
                    </div>
                  </div>
                  
                  {/* Action */}
                  <div className="w-full sm:w-auto mt-4 sm:mt-0">
                    <Button variant="ghost" className="w-full sm:w-auto text-primary hover:text-secondary hover:bg-primary/5">
                      Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </SectionWrapper>

      {/* 7. CTA / Give */}
      <section className="bg-white border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-primary p-12 md:p-24 text-white relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 mix-blend-overlay">
               <img src={`${import.meta.env.BASE_URL}images/give-texture.png`} alt="" className="w-full h-full object-cover" />
             </div>
             <div className="relative z-10 max-w-lg ml-auto lg:mr-0">
                <SectionHeading title="Partner With Us" subtitle="Generosity" dark />
                <p className="text-lg text-white/80 mb-8 font-light">
                  Your generosity helps us continue our mission to serve the community of Manila, send out missionaries globally, and build a house where people can encounter the love of Christ.
                </p>
                <Link href="/give">
                  <Button size="lg" variant="secondary" className="rounded-full px-8 font-semibold">
                    Give Online Today
                  </Button>
                </Link>
             </div>
          </div>
          <div className="p-12 md:p-24 bg-background flex flex-col justify-center">
            <div className="max-w-lg">
              <h3 className="text-2xl font-serif font-bold mb-6 text-primary">Other Ways to Give</h3>
              
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-xl shadow-sm border border-border/50">
                  <h4 className="font-bold text-lg mb-2">Direct Bank Transfer</h4>
                  <p className="text-sm text-muted-foreground mb-4">You can deposit directly to our church accounts.</p>
                  <div className="space-y-2 text-sm bg-primary/5 p-4 rounded-lg">
                    <p><span className="font-semibold text-primary">Bank:</span> BDO Savings Account</p>
                    <p><span className="font-semibold text-primary">Name:</span> El-Bethel Christian Fellowship</p>
                    <p><span className="font-semibold text-primary">Account No:</span> 005-123-456-789</p>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-sm border border-border/50">
                   <h4 className="font-bold text-lg mb-2 flex items-center gap-2">GCash</h4>
                   <p className="text-sm text-muted-foreground">Scan our QR code or send to our official GCash number.</p>
                   <p className="font-mono mt-2 font-medium text-primary">0917-123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
