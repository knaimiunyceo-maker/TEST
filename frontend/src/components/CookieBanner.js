import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Check, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: {
    title: "We use cookies",
    description: "This site uses cookies to improve your browsing experience and analyze traffic. By clicking \"Accept all\", you consent to the use of all cookies. See our",
    privacyPolicy: "privacy policy",
    forMoreInfo: "for more information.",
    acceptAll: "Accept all",
    essentialsOnly: "Essentials only",
    customize: "Customize",
    cookieTypes: "Cookie types",
    essentialCookies: "Essential cookies",
    essentialDesc: "Necessary for the site to function",
    alwaysActive: "Always active",
    analyticsCookies: "Analytics cookies",
    analyticsDesc: "Help us understand how you use the site",
    optional: "Optional",
    moreInfo: "For more information, see our"
  },
  fr: {
    title: "Nous utilisons des cookies",
    description: "Ce site utilise des cookies pour améliorer votre expérience de navigation et analyser le trafic. En cliquant sur \"Accepter tout\", vous consentez à l'utilisation de tous les cookies. Consultez notre",
    privacyPolicy: "politique de confidentialité",
    forMoreInfo: "pour plus d'informations.",
    acceptAll: "Accepter tout",
    essentialsOnly: "Essentiels uniquement",
    customize: "Paramétrer",
    cookieTypes: "Types de cookies",
    essentialCookies: "Cookies essentiels",
    essentialDesc: "Nécessaires au fonctionnement du site",
    alwaysActive: "Toujours actifs",
    analyticsCookies: "Cookies analytiques",
    analyticsDesc: "Nous aident à comprendre comment vous utilisez le site",
    optional: "Optionnels",
    moreInfo: "Pour plus d'informations, consultez notre"
  },
  es: {
    title: "Usamos cookies",
    description: "Este sitio utiliza cookies para mejorar su experiencia de navegación y analizar el tráfico. Al hacer clic en \"Aceptar todo\", consiente el uso de todas las cookies. Consulte nuestra",
    privacyPolicy: "política de privacidad",
    forMoreInfo: "para más información.",
    acceptAll: "Aceptar todo",
    essentialsOnly: "Solo esenciales",
    customize: "Personalizar",
    cookieTypes: "Tipos de cookies",
    essentialCookies: "Cookies esenciales",
    essentialDesc: "Necesarias para el funcionamiento del sitio",
    alwaysActive: "Siempre activas",
    analyticsCookies: "Cookies analíticas",
    analyticsDesc: "Nos ayudan a entender cómo usa el sitio",
    optional: "Opcionales",
    moreInfo: "Para más información, consulte nuestra"
  },
  pt: {
    title: "Usamos cookies",
    description: "Este site usa cookies para melhorar sua experiência de navegação e analisar o tráfego. Ao clicar em \"Aceitar tudo\", você consente com o uso de todos os cookies. Consulte nossa",
    privacyPolicy: "política de privacidade",
    forMoreInfo: "para mais informações.",
    acceptAll: "Aceitar tudo",
    essentialsOnly: "Apenas essenciais",
    customize: "Personalizar",
    cookieTypes: "Tipos de cookies",
    essentialCookies: "Cookies essenciais",
    essentialDesc: "Necessários para o funcionamento do site",
    alwaysActive: "Sempre ativos",
    analyticsCookies: "Cookies analíticos",
    analyticsDesc: "Nos ajudam a entender como você usa o site",
    optional: "Opcionais",
    moreInfo: "Para mais informações, consulte nossa"
  },
  de: {
    title: "Wir verwenden Cookies",
    description: "Diese Website verwendet Cookies, um Ihr Browsererlebnis zu verbessern und den Datenverkehr zu analysieren. Durch Klicken auf \"Alle akzeptieren\" stimmen Sie der Verwendung aller Cookies zu. Weitere Informationen finden Sie in unserer",
    privacyPolicy: "Datenschutzrichtlinie",
    forMoreInfo: ".",
    acceptAll: "Alle akzeptieren",
    essentialsOnly: "Nur essenzielle",
    customize: "Anpassen",
    cookieTypes: "Cookie-Typen",
    essentialCookies: "Essenzielle Cookies",
    essentialDesc: "Notwendig für das Funktionieren der Website",
    alwaysActive: "Immer aktiv",
    analyticsCookies: "Analytische Cookies",
    analyticsDesc: "Helfen uns zu verstehen, wie Sie die Website nutzen",
    optional: "Optional",
    moreInfo: "Für weitere Informationen, siehe unsere"
  },
  it: {
    title: "Utilizziamo i cookie",
    description: "Questo sito utilizza i cookie per migliorare la tua esperienza di navigazione e analizzare il traffico. Cliccando su \"Accetta tutto\", acconsenti all'uso di tutti i cookie. Consulta la nostra",
    privacyPolicy: "informativa sulla privacy",
    forMoreInfo: "per maggiori informazioni.",
    acceptAll: "Accetta tutto",
    essentialsOnly: "Solo essenziali",
    customize: "Personalizza",
    cookieTypes: "Tipi di cookie",
    essentialCookies: "Cookie essenziali",
    essentialDesc: "Necessari per il funzionamento del sito",
    alwaysActive: "Sempre attivi",
    analyticsCookies: "Cookie analitici",
    analyticsDesc: "Ci aiutano a capire come utilizzi il sito",
    optional: "Opzionali",
    moreInfo: "Per maggiori informazioni, consulta la nostra"
  }
};

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
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
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sunset/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Cookie className="text-sunset" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-syne font-bold text-ocean text-lg mb-2">
                  {t.title}
                </h3>
                <p className="font-dm text-ocean/70 text-sm mb-4">
                  {t.description}{" "}
                  <Link to="/confidentialite" className="text-sunset hover:underline">{t.privacyPolicy}</Link>{" "}
                  {t.forMoreInfo}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-6"
                  >
                    <Check size={16} className="mr-2" /> {t.acceptAll}
                  </Button>
                  <Button
                    onClick={handleAcceptNecessary}
                    variant="outline"
                    className="rounded-full px-6 border-ocean/20"
                  >
                    {t.essentialsOnly}
                  </Button>
                  <Button
                    onClick={() => setShowDetails(!showDetails)}
                    variant="ghost"
                    className="rounded-full px-4 text-ocean/60"
                  >
                    <Settings size={16} className="mr-2" /> {t.customize}
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

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-border overflow-hidden"
              >
                <div className="p-6 bg-warmwhite">
                  <h4 className="font-syne font-bold text-ocean mb-4">{t.cookieTypes}</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                      <div>
                        <p className="font-dm font-medium text-ocean">{t.essentialCookies}</p>
                        <p className="font-dm text-ocean/60 text-sm">{t.essentialDesc}</p>
                      </div>
                      <div className="bg-green-100 text-green-700 text-xs font-dm px-3 py-1 rounded-full">
                        {t.alwaysActive}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                      <div>
                        <p className="font-dm font-medium text-ocean">{t.analyticsCookies}</p>
                        <p className="font-dm text-ocean/60 text-sm">{t.analyticsDesc}</p>
                      </div>
                      <div className="text-ocean/50 text-xs font-dm">
                        {t.optional}
                      </div>
                    </div>
                  </div>
                  
                  <p className="font-dm text-ocean/60 text-xs mt-4">
                    {t.moreInfo}{" "}
                    <Link to="/confidentialite" className="text-sunset hover:underline">
                      {t.privacyPolicy}
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
