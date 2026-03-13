import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Check, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie_consent", JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem("cookie_consent", JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4"
      >
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-border overflow-hidden">
          {/* Main Banner */}
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sunset/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Cookie className="text-sunset" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-syne font-bold text-ocean text-lg mb-2">
                  Nous utilisons des cookies
                </h3>
                <p className="font-dm text-ocean/70 text-sm mb-4">
                  Ce site utilise des cookies pour améliorer votre expérience de navigation et analyser le trafic. 
                  En cliquant sur "Accepter tout", vous consentez à l'utilisation de tous les cookies. 
                  Consultez notre <Link to="/confidentialite" className="text-sunset hover:underline">politique de confidentialité</Link> pour plus d'informations.
                </p>
                
                {/* Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-6"
                  >
                    <Check size={16} className="mr-2" /> Accepter tout
                  </Button>
                  <Button
                    onClick={handleAcceptNecessary}
                    variant="outline"
                    className="rounded-full px-6 border-ocean/20"
                  >
                    Essentiels uniquement
                  </Button>
                  <Button
                    onClick={() => setShowDetails(!showDetails)}
                    variant="ghost"
                    className="rounded-full px-4 text-ocean/60"
                  >
                    <Settings size={16} className="mr-2" /> Paramétrer
                  </Button>
                </div>
              </div>
              <button
                onClick={handleDecline}
                className="text-ocean/40 hover:text-ocean transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Details Panel */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-border overflow-hidden"
              >
                <div className="p-6 bg-warmwhite">
                  <h4 className="font-syne font-bold text-ocean mb-4">Types de cookies</h4>
                  <div className="space-y-4">
                    {/* Necessary */}
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                      <div>
                        <p className="font-dm font-medium text-ocean">Cookies essentiels</p>
                        <p className="font-dm text-ocean/60 text-sm">Nécessaires au fonctionnement du site</p>
                      </div>
                      <div className="bg-green-100 text-green-700 text-xs font-dm px-3 py-1 rounded-full">
                        Toujours actifs
                      </div>
                    </div>
                    
                    {/* Analytics */}
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                      <div>
                        <p className="font-dm font-medium text-ocean">Cookies analytiques</p>
                        <p className="font-dm text-ocean/60 text-sm">Nous aident à comprendre comment vous utilisez le site</p>
                      </div>
                      <div className="text-ocean/50 text-xs font-dm">
                        Optionnels
                      </div>
                    </div>
                  </div>
                  
                  <p className="font-dm text-ocean/60 text-xs mt-4">
                    Pour plus d'informations, consultez notre{" "}
                    <Link to="/confidentialite" className="text-sunset hover:underline">
                      politique de confidentialité
                    </Link>.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieBanner;
