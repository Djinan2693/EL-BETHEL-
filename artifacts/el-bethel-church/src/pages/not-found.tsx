import { Link } from "wouter";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/lib/seo";

export default function NotFound() {
  useSEO({
    title:       "Page Not Found — El-Bethel Christian Fellowship Church",
    description: "The page you are looking for could not be found. Return to the El-Bethel website.",
    canonical:   "/404",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">

        <div className="mb-8 flex justify-center">
          <img
            src="/images/logo.jpg"
            alt="El-Bethel Christian Fellowship Church"
            className="w-20 h-20 rounded-full object-cover shadow-lg"
          />
        </div>

        <div className="mb-6">
          <p className="text-8xl font-serif font-bold text-primary/20 leading-none select-none">
            404
          </p>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary mt-2 mb-3">
            Page introuvable
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            La page que vous cherchez n'existe pas ou a été déplacée.
            Revenez à l'accueil pour continuer votre visite.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Button asChild className="rounded-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/">
              <Home size={16} />
              Retour à l'accueil
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full gap-2 border-primary/30 text-primary hover:bg-primary/5">
            <Link href="/events">
              <Search size={16} />
              Voir les événements
            </Link>
          </Button>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          <Link href="/contact" className="underline underline-offset-2 hover:text-primary transition-colors">
            Contactez-nous
          </Link>{" "}
          si vous pensez qu'il s'agit d'une erreur.
        </p>

      </div>
    </div>
  );
}
