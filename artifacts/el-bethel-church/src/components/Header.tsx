import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { churchInfo } from "@/data/church";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Sermons", path: "/sermons" },
  { name: "Ministries", path: "/ministries" },
  { name: "Events", path: "/events" },
  { name: "Contact", path: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo.jpg"
              alt="El-Bethel Christian Fellowship Church"
              className="w-12 h-12 rounded-full object-cover shadow-md ring-2 ring-secondary/40 group-hover:ring-secondary transition-all duration-300"
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className={cn(
                "font-serif text-lg font-bold tracking-tight transition-colors leading-snug",
                isScrolled ? "text-primary" : "text-white drop-shadow"
              )}>
                El-Bethel
              </span>
              <span className={cn(
                "text-[10px] font-medium uppercase tracking-widest transition-colors",
                isScrolled ? "text-secondary" : "text-secondary"
              )}>
                Christian Fellowship
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-secondary relative group",
                  location === link.path 
                    ? "text-secondary" 
                    : isScrolled ? "text-foreground" : "text-white/90"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full",
                  location === link.path && "w-full"
                )} />
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link href="/give" className="hidden sm:block">
              <Button 
                variant={isScrolled ? "default" : "secondary"} 
                className={cn(
                  "rounded-full px-6 font-medium transition-all duration-300",
                  !isScrolled && "bg-white text-primary hover:bg-white/90 border-transparent shadow-lg"
                )}
              >
                Give Online
              </Button>
            </Link>
            
            <button
              className={cn(
                "p-2 lg:hidden rounded-md transition-colors",
                isScrolled ? "text-primary hover:bg-gray-100" : "text-primary md:text-white hover:bg-white/10"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-primary/95 backdrop-blur-xl z-40 transition-all duration-300 flex flex-col pt-24 px-6 lg:hidden",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-6 items-center text-center mt-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className={cn(
                "text-2xl font-serif text-white hover:text-secondary transition-colors",
                location === link.path && "text-secondary"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="w-16 h-px bg-secondary/50 my-4" />
          <Link href="/give">
            <Button variant="secondary" className="rounded-full px-8 text-lg py-6 mt-2">
              Give Online
            </Button>
          </Link>
        </nav>
        
        <div className="mt-auto mb-10 text-center text-white/50 text-sm">
          <p>{churchInfo.address}</p>
          <p>{churchInfo.phone}</p>
        </div>
      </div>
    </header>
  );
}
