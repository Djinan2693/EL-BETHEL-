import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Check, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "ebcfc_cookie_consent";

function setGAConsent(granted: boolean) {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage:        "denied",
    });
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setVisible(true);
    } else {
      setGAConsent(saved === "granted");
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "granted");
    setGAConsent(true);
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, "denied");
    setGAConsent(false);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-4 left-4 right-4 z-50 max-w-xl mx-auto"
        >
          <div className="bg-white border border-border rounded-2xl shadow-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie size={18} className="text-primary" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h2 className="text-sm font-bold text-primary flex items-center gap-1.5">
                    <Shield size={13} aria-hidden="true" />
                    Confidentialité & cookies
                  </h2>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Nous utilisons Google Analytics pour comprendre comment vous naviguez
                  sur notre site et améliorer votre expérience. Aucune donnée personnelle
                  n'est vendue.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Button
                onClick={handleAccept}
                size="sm"
                className="flex-1 rounded-full gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
              >
                <Check size={13} />
                Accepter
              </Button>
              <Button
                onClick={handleDecline}
                size="sm"
                variant="outline"
                className="flex-1 rounded-full gap-1.5 border-border text-muted-foreground hover:text-foreground text-xs"
              >
                <X size={13} />
                Refuser
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
