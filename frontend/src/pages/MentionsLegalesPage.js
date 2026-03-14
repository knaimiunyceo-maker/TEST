import { motion } from "framer-motion";
import { 
  Building2, FileText, Globe, Shield, Lock, 
  ExternalLink, Scale, Bookmark
} from "lucide-react";
import PageLayout from "./components/PageLayout";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: { title: "Legal Notice", subtitle: "THE BRIDGE — UNYCEO FR" },
  fr: { title: "Mentions Légales", subtitle: "THE BRIDGE — UNYCEO FR" },
  es: { title: "Aviso Legal", subtitle: "THE BRIDGE — UNYCEO FR" },
  pt: { title: "Aviso Legal", subtitle: "THE BRIDGE — UNYCEO FR" },
  de: { title: "Impressum", subtitle: "THE BRIDGE — UNYCEO FR" },
  it: { title: "Note Legali", subtitle: "THE BRIDGE — UNYCEO FR" }
};

const Section = ({ icon: Icon, title, children, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="mb-10"
  >
    <div className="flex items-start gap-3 mb-4">
      <div className="w-10 h-10 bg-sunset/10 rounded-xl flex items-center justify-center flex-shrink-0">
        <Icon className="text-sunset" size={20} />
      </div>
      <h2 className="font-syne font-bold text-xl text-ocean mt-1">{title}</h2>
    </div>
    <div className="pl-13 ml-13 font-dm text-ocean/80 leading-relaxed space-y-4">
      {children}
    </div>
  </motion.div>
);

const MentionsLegalesPage = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.fr;
  
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-ocean to-ocean/90 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Scale className="text-sand" size={32} />
            </div>
            <h1 className="font-syne font-black text-3xl sm:text-4xl lg:text-5xl mb-4">
              {t.title}
            </h1>
            <p className="font-dm text-white/80 text-lg">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 bg-warmwhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Éditeur du site */}
          <Section icon={Building2} title="Éditeur du site" index={0}>
            <p>Le présent site internet est édité par :</p>
            
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-syne font-bold text-ocean text-lg mb-4">UNYCEO FR</h3>
              <p className="mb-2">Société à responsabilité limitée (SARL)</p>
              
              <div className="space-y-2 text-sm">
                <p><strong>SIREN :</strong> 953 646 577</p>
                <p><strong>SIRET (siège social) :</strong> 953 646 577 00015</p>
                <p><strong>N° TVA intracommunautaire :</strong> FR15 953 646 577</p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-medium text-ocean mb-2">Siège social :</p>
                <p>25 rue de Ponthieu</p>
                <p>75008 Paris</p>
                <p>France</p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
                <p><strong>Date d'immatriculation :</strong> 14 juin 2023</p>
                <p><strong>Immatriculation au RNE :</strong> 22 juin 2023</p>
                <p><strong>Activité principale :</strong> Conseil pour les affaires et autres conseils de gestion</p>
                <p><strong>Code NAF / APE :</strong> 70.22Z</p>
              </div>
            </div>
          </Section>

          {/* Marque */}
          <Section icon={Bookmark} title="Marque" index={1}>
            <p>
              La marque <strong>Bridge</strong> est exploitée par la société UNYCEO FR.
            </p>
            <p>
              Le site présente les expériences et activités organisées sous la marque <strong>Bridge by UNYCEO France</strong>.
            </p>
          </Section>

          {/* Hébergement */}
          <Section icon={Globe} title="Hébergement du site" index={2}>
            <p>Le site est hébergé par :</p>
            <div className="bg-white rounded-xl p-6 border border-border">
              <p className="text-ocean/60 italic">(Nom de l'hébergeur à compléter)</p>
              <p className="text-ocean/60 italic">Adresse de l'hébergeur</p>
              <p className="text-ocean/60 italic">Pays</p>
            </div>
          </Section>

          {/* Propriété intellectuelle */}
          <Section icon={Shield} title="Propriété intellectuelle" index={3}>
            <p>
              L'ensemble du contenu présent sur ce site, incluant notamment :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>les textes</li>
              <li>les images</li>
              <li>les photographies</li>
              <li>les vidéos</li>
              <li>les logos</li>
              <li>les éléments graphiques</li>
              <li>la structure du site</li>
            </ul>
            <p>
              est protégé par le droit de la propriété intellectuelle.
            </p>
            <p className="bg-sunset/5 p-4 rounded-xl border-l-4 border-sunset">
              Toute reproduction, distribution, modification ou utilisation sans autorisation préalable écrite de l'éditeur est <strong>strictement interdite</strong>.
            </p>
          </Section>

          {/* Limitation de responsabilité */}
          <Section icon={FileText} title="Limitation de responsabilité" index={4}>
            <p>
              Les informations présentées sur ce site sont fournies à titre informatif.
            </p>
            <p>
              La société UNYCEO FR s'efforce d'assurer l'exactitude des informations diffusées, mais ne saurait garantir qu'elles soient complètes, exactes ou à jour en permanence.
            </p>
            <p>
              L'utilisation des informations et contenus disponibles sur ce site se fait sous la seule responsabilité de l'utilisateur.
            </p>
          </Section>

          {/* Liens externes */}
          <Section icon={ExternalLink} title="Liens externes" index={5}>
            <p>
              Le site peut contenir des liens vers des sites internet tiers.
            </p>
            <p>
              La société UNYCEO FR ne peut être tenue responsable du contenu de ces sites externes.
            </p>
          </Section>

          {/* Données personnelles */}
          <Section icon={Lock} title="Données personnelles" index={6}>
            <p>
              Les informations collectées via le site sont utilisées uniquement dans le cadre des demandes de contact ou des réservations d'expériences.
            </p>
            <p>
              Conformément à la réglementation applicable en matière de protection des données personnelles, les utilisateurs disposent d'un droit :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>d'accès</li>
              <li>de rectification</li>
              <li>de suppression</li>
              <li>d'opposition</li>
            </ul>
            <p>concernant leurs données personnelles.</p>
            <p>
              Toute demande peut être adressée à l'éditeur du site.
            </p>
          </Section>

          {/* Droit applicable */}
          <Section icon={Scale} title="Droit applicable" index={7}>
            <p>
              Le présent site est soumis au <strong>droit français</strong>.
            </p>
            <p>
              Tout litige relatif à l'utilisation du site sera soumis aux juridictions compétentes en France.
            </p>
          </Section>

          {/* Footer note */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="font-dm text-ocean/60 text-sm">
              Dernière mise à jour : Décembre 2025
            </p>
          </div>

        </div>
      </section>
    </PageLayout>
  );
};

export default MentionsLegalesPage;
