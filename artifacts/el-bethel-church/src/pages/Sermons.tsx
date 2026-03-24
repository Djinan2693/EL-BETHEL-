import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle, Headphones, Download, Search } from "lucide-react";
import { sermons } from "@/data/sermons";

export default function Sermons() {
  useSEO("Sermons", "Listen to the latest messages and teachings from El-Bethel Christian Fellowship.");
  
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(sermons.map(s => s.category)))];

  const filteredSermons = filter === "All" 
    ? sermons 
    : sermons.filter(s => s.category === filter);

  return (
    <main className="pt-24">
      {/* Hero */}
      <div className="bg-background py-16 border-b border-border">
        <Container>
          <SectionHeading title="Sermons" subtitle="Watch & Listen" />
          <p className="text-lg text-muted-foreground max-w-2xl">
            Catch up on the latest messages. Faith comes by hearing, and hearing by the word of God.
          </p>
        </Container>
      </div>

      <SectionWrapper className="bg-background pt-8">
        <Container>
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Button 
                  key={cat}
                  variant={filter === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(cat)}
                  className="rounded-full"
                >
                  {cat}
                </Button>
              ))}
            </div>
            
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                type="search" 
                placeholder="Search sermons..." 
                className="w-full md:w-64 pl-9 pr-4 py-2 bg-white border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSermons.map(sermon => (
              <Card key={sermon.id} className="overflow-hidden flex flex-col group">
                {/* Thumbnail */}
                <div className="aspect-video bg-primary/5 relative flex items-center justify-center border-b border-border overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/30 transition-colors z-10" />
                  <PlayCircle className="text-white w-12 h-12 z-20 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-md" />
                  {/* Decorative background for mock */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/10" />
                </div>
                
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="text-xs bg-white">
                      {sermon.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-medium">{sermon.duration}</span>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-secondary transition-colors">
                    {sermon.title}
                  </h3>
                  
                  <div className="space-y-1 text-sm text-muted-foreground mb-6 flex-1">
                    <p className="font-medium text-foreground">{sermon.pastor}</p>
                    <p>{sermon.date}</p>
                    <p className="italic">{sermon.scripture}</p>
                  </div>
                  
                  <div className="flex gap-2 pt-4 border-t border-border mt-auto">
                    <Button variant="secondary" size="sm" className="flex-1">
                      <PlayCircle className="w-4 h-4 mr-2" /> Watch
                    </Button>
                    <Button variant="outline" size="sm" className="px-3" title="Listen Audio">
                      <Headphones className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="px-3" title="Download Notes">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredSermons.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No sermons found in this category.
            </div>
          )}

          {/* Pagination Mock */}
          <div className="mt-16 flex justify-center gap-2">
            <Button variant="outline" disabled>Previous</Button>
            <Button variant="default">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Next</Button>
          </div>
        </Container>
      </SectionWrapper>
    </main>
  );
}
