import { Link } from "wouter";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";
import { churchInfo } from "@/data/church";
import { Container } from "./ui/container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10 border-t-4 border-secondary">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div>
            <Link href="/" className="font-serif text-3xl font-bold mb-4 block text-white">
              El-Bethel
            </Link>
            <p className="text-primary-foreground/80 mb-6 font-serif italic text-lg">
              "{churchInfo.tagline}"
            </p>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              A Spirit-filled community committed to knowing Christ and making Him known in the heart of Manila and beyond.
            </p>
            <div className="flex gap-4">
              <a href={churchInfo.socialMedia.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href={churchInfo.socialMedia.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href={churchInfo.socialMedia.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold font-serif mb-6 text-white flex items-center gap-2">
              <div className="w-4 h-px bg-secondary" /> 
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "About Our Church", path: "/about" },
                { name: "Watch Sermons", path: "/sermons" },
                { name: "Ministry Groups", path: "/ministries" },
                { name: "Upcoming Events", path: "/events" },
                { name: "Give Online", path: "/give" },
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-primary-foreground/80 hover:text-secondary transition-colors inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-bold font-serif mb-6 text-white flex items-center gap-2">
              <div className="w-4 h-px bg-secondary" /> 
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-primary-foreground/80">
                <MapPin className="text-secondary shrink-0 mt-1" size={18} />
                <span className="text-sm">{churchInfo.address}</span>
              </li>
              <li className="flex gap-3 text-primary-foreground/80">
                <Phone className="text-secondary shrink-0 mt-0.5" size={18} />
                <span className="text-sm">{churchInfo.phone}</span>
              </li>
              <li className="flex gap-3 text-primary-foreground/80">
                <Mail className="text-secondary shrink-0 mt-0.5" size={18} />
                <span className="text-sm">{churchInfo.email}</span>
              </li>
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h4 className="text-lg font-bold font-serif mb-6 text-white flex items-center gap-2">
              <div className="w-4 h-px bg-secondary" /> 
              Service Times
            </h4>
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="flex items-start gap-3 mb-4">
                <Clock className="text-secondary shrink-0 mt-0.5" size={18} />
                <div>
                  <h5 className="font-semibold text-white">Sunday Worship</h5>
                  <p className="text-sm text-primary-foreground/70 mt-1">9:00 AM & 11:00 AM</p>
                </div>
              </div>
              <div className="h-px w-full bg-white/10 my-4" />
              <div className="flex items-start gap-3">
                <Clock className="text-secondary shrink-0 mt-0.5" size={18} />
                <div>
                  <h5 className="font-semibold text-white">Wednesday Prayer</h5>
                  <p className="text-sm text-primary-foreground/70 mt-1">7:00 PM (Online/In-person)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>&copy; {currentYear} {churchInfo.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
