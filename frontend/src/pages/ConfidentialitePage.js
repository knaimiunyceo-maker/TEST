import { motion } from "framer-motion";
import { 
  Shield, Building2, Database, Target, Scale, Users,
  Clock, Lock, UserCheck, Cookie, RefreshCw
} from "lucide-react";
import PageLayout from "./components/PageLayout";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: { title: "Privacy Policy", subtitle: "Protection of your personal data" },
  fr: { title: "Politique de Confidentialité", subtitle: "Protection de vos données personnelles" },
  es: { title: "Política de Privacidad", subtitle: "Protección de sus datos personales" },
  pt: { title: "Política de Privacidade", subtitle: "Proteção dos seus dados pessoais" },
  de: { title: "Datenschutzrichtlinie", subtitle: "Schutz Ihrer persönlichen Daten" },
  it: { title: "Informativa sulla Privacy", subtitle: "Protezione dei tuoi dati personali" }
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
    <div className="font-dm text-ocean/80 leading-relaxed space-y-4">
      {children}
    </div>
  </motion.div>
);

const ConfidentialitePage = () => {
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
              <Shield className="text-sand" size={32} />
            </div>
            <h1 className="font-syne font-black text-3xl sm:text-4xl lg:text-5xl mb-4">
              Politique de Confidentialité
            </h1>
            <p className="font-dm text-white/80 text-lg">
              Protection de vos données personnelles
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 bg-warmwhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* 1. Introduction */}
          <Section icon={Shield} title="1. Introduction" index={0}>
            <p>
              La présente politique de confidentialité a pour objectif d'informer les utilisateurs du site sur la manière dont leurs données personnelles sont collectées, utilisées et protégées.
            </p>
            <p>
              La société <strong>UNYCEO FR</strong>, exploitant la marque <strong>Bridge by UNYCEO France</strong>, accorde une importance particulière à la protection des données personnelles et s'engage à respecter la réglementation en vigueur, notamment le <strong>Règlement Général sur la Protection des Données (RGPD)</strong>.
            </p>
          </Section>

          {/* 2. Responsable du traitement */}
          <Section icon={Building2} title="2. Responsable du traitement" index={1}>
            <p>Les données personnelles collectées sur ce site sont traitées par :</p>
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-syne font-bold text-ocean text-lg mb-3">UNYCEO FR</h3>
              <p>25 rue de Ponthieu</p>
              <p>75008 Paris</p>
              <p>France</p>
              <p className="mt-3"><strong>SIREN :</strong> 953 646 577</p>
            </div>
          </Section>

          {/* 3. Données collectées */}
          <Section icon={Database} title="3. Données collectées" index={2}>
            <p>Lors de l'utilisation du site, certaines données peuvent être collectées, notamment :</p>
            
            <div className="bg-white rounded-xl p-6 border border-border mb-4">
              <h4 className="font-syne font-bold text-ocean mb-3">Données fournies directement par l'utilisateur</h4>
              <p className="mb-3">Lorsque vous remplissez un formulaire de contact ou de réservation :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>nom et prénom</li>
                <li>adresse email</li>
                <li>numéro de téléphone</li>
                <li>informations liées à votre demande ou réservation</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border">
              <h4 className="font-syne font-bold text-ocean mb-3">Données collectées automatiquement</h4>
              <p className="mb-3">Lors de la navigation sur le site :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>adresse IP</li>
                <li>type de navigateur</li>
                <li>pages consultées</li>
                <li>durée de navigation</li>
              </ul>
              <p className="mt-3 text-sm text-ocean/60">
                Ces informations peuvent être collectées à des fins statistiques et d'amélioration du site.
              </p>
            </div>
          </Section>

          {/* 4. Finalités de la collecte */}
          <Section icon={Target} title="4. Finalités de la collecte" index={3}>
            <p>Les données collectées sont utilisées pour :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>répondre aux demandes de contact</li>
              <li>gérer les demandes de réservation</li>
              <li>organiser les expériences proposées</li>
              <li>améliorer le fonctionnement du site</li>
              <li>assurer la sécurité du site</li>
            </ul>
            <p className="bg-ocean/5 p-4 rounded-xl mt-4">
              Les données ne sont utilisées que dans le cadre des activités de <strong>Bridge by UNYCEO France</strong>.
            </p>
          </Section>

          {/* 5. Base légale du traitement */}
          <Section icon={Scale} title="5. Base légale du traitement" index={4}>
            <p>Les données sont traitées sur les bases légales suivantes :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>le consentement de l'utilisateur</strong> (formulaire de contact ou inscription)</li>
              <li><strong>l'exécution d'un contrat</strong> dans le cadre d'une réservation</li>
              <li><strong>l'intérêt légitime</strong> pour améliorer le site et la qualité des services</li>
            </ul>
          </Section>

          {/* 6. Destinataires des données */}
          <Section icon={Users} title="6. Destinataires des données" index={5}>
            <p>Les données personnelles sont destinées uniquement à :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>la société UNYCEO FR</li>
              <li>les prestataires techniques nécessaires au fonctionnement du site (hébergement, services techniques)</li>
            </ul>
            <p className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500 mt-4">
              Les données ne sont <strong>jamais vendues ni cédées</strong> à des tiers à des fins commerciales.
            </p>
          </Section>

          {/* 7. Durée de conservation */}
          <Section icon={Clock} title="7. Durée de conservation des données" index={6}>
            <p>
              Les données personnelles sont conservées uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées.
            </p>
            <p>En règle générale :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>données de contact :</strong> jusqu'à 3 ans après le dernier échange</li>
              <li><strong>données liées aux réservations :</strong> durée nécessaire à la gestion administrative et comptable</li>
            </ul>
          </Section>

          {/* 8. Sécurité des données */}
          <Section icon={Lock} title="8. Sécurité des données" index={7}>
            <p>
              La société UNYCEO FR met en œuvre les mesures techniques et organisationnelles nécessaires afin de protéger les données personnelles contre :
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>l'accès non autorisé</li>
              <li>la perte</li>
              <li>la divulgation</li>
              <li>la modification</li>
            </ul>
          </Section>

          {/* 9. Droits des utilisateurs */}
          <Section icon={UserCheck} title="9. Droits des utilisateurs" index={8}>
            <p>Conformément au RGPD, les utilisateurs disposent des droits suivants :</p>
            <div className="grid sm:grid-cols-2 gap-3 my-4">
              <div className="bg-white p-3 rounded-lg border border-border">
                <span className="font-medium text-ocean">Droit d'accès</span>
                <p className="text-sm text-ocean/60">à leurs données</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-border">
                <span className="font-medium text-ocean">Droit de rectification</span>
                <p className="text-sm text-ocean/60">corriger les données</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-border">
                <span className="font-medium text-ocean">Droit de suppression</span>
                <p className="text-sm text-ocean/60">effacer les données</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-border">
                <span className="font-medium text-ocean">Droit d'opposition</span>
                <p className="text-sm text-ocean/60">s'opposer au traitement</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-border">
                <span className="font-medium text-ocean">Droit à la limitation</span>
                <p className="text-sm text-ocean/60">limiter le traitement</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-border">
                <span className="font-medium text-ocean">Droit à la portabilité</span>
                <p className="text-sm text-ocean/60">récupérer ses données</p>
              </div>
            </div>
            <p>
              Pour exercer ces droits, une demande peut être adressée à l'éditeur du site.
            </p>
          </Section>

          {/* 10. Cookies */}
          <Section icon={Cookie} title="10. Cookies" index={9}>
            <p>Le site peut utiliser des cookies afin :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>d'améliorer l'expérience utilisateur</li>
              <li>d'analyser l'utilisation du site</li>
              <li>de faciliter certaines fonctionnalités</li>
            </ul>
            <p className="bg-ocean/5 p-4 rounded-xl mt-4">
              Un cookie est un petit fichier stocké sur l'ordinateur ou l'appareil de l'utilisateur.
            </p>
            <p>
              L'utilisateur peut configurer son navigateur pour refuser tout ou partie des cookies.
            </p>
          </Section>

          {/* 11. Modification */}
          <Section icon={RefreshCw} title="11. Modification de la politique de confidentialité" index={10}>
            <p>
              La société UNYCEO FR se réserve le droit de modifier la présente politique de confidentialité à tout moment afin de garantir sa conformité avec la législation en vigueur.
            </p>
            <p>
              Les utilisateurs sont invités à consulter régulièrement cette page.
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

export default ConfidentialitePage;
