import { motion } from "framer-motion";
import { FileText, Shield, Users, CreditCard, Calendar, AlertTriangle, Heart, Cloud, Briefcase, Camera, Lock, Scale } from "lucide-react";
import PageLayout from "./components/PageLayout";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: { title: "Terms and Conditions", subtitle: "THE BRIDGE — UNYCEO France" },
  fr: { title: "Conditions Générales de Vente", subtitle: "THE BRIDGE — UNYCEO France" },
  es: { title: "Términos y Condiciones", subtitle: "THE BRIDGE — UNYCEO France" },
  pt: { title: "Termos e Condições", subtitle: "THE BRIDGE — UNYCEO France" },
  de: { title: "Allgemeine Geschäftsbedingungen", subtitle: "THE BRIDGE — UNYCEO France" },
  it: { title: "Termini e Condizioni", subtitle: "THE BRIDGE — UNYCEO France" }
};

const Section = ({ icon: Icon, title, children, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="mb-8"
  >
    <div className="flex items-start gap-3 mb-3">
      <div className="w-8 h-8 bg-sunset/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
        <Icon className="text-sunset" size={18} />
      </div>
      <h2 className="font-syne font-bold text-xl text-ocean">{title}</h2>
    </div>
    <div className="pl-11 font-dm text-ocean/80 leading-relaxed space-y-3">
      {children}
    </div>
  </motion.div>
);

const CGVPage = () => {
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
              <FileText className="text-sand" size={32} />
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
          
          <Section icon={FileText} title="1. Objet et Champ d'Application" index={0}>
            <p>
              Les présentes CGV définissent les modalités de vente et de réalisation des prestations de services entre UNYCEO France (ci-après « l'Organisateur ») et toute personne physique ou morale procédant à une réservation (ci-après « le Participant »).
            </p>
            <p>
              Les expériences consistent en des séjours thématiques en petits groupes au Maroc. Toute réservation confirme l'adhésion pleine et entière du Participant aux présentes conditions.
            </p>
          </Section>

          <Section icon={Briefcase} title="2. Nature des Expériences" index={1}>
            <p>
              L'Organisateur propose des séjours courts articulés autour de thématiques spécifiques (Self-Defense, Visual Storytelling, Language Practice).
            </p>
            <p>
              Le programme inclut l'encadrement, l'hébergement et les activités collectives mentionnés sur la fiche produit. Les activités dites « optionnelles » ou « hors programme » ne sont pas incluses dans le tarif de base.
            </p>
          </Section>

          <Section icon={Users} title="3. Capacité et Taille des Groupes" index={2}>
            <p>
              Pour préserver l'exclusivité et la qualité de l'accompagnement, les groupes sont limités à <strong>10 participants</strong>.
            </p>
            <p>
              L'Organisateur se réserve le droit de clore les réservations dès que ce quota est atteint.
            </p>
          </Section>

          <Section icon={Calendar} title="4. Processus de Réservation et Confirmation" index={3}>
            <ul className="list-none space-y-2">
              <li><strong>Sélection :</strong> Le Participant choisit son expérience et ses dates sur le site.</li>
              <li><strong>Demande :</strong> Envoi du formulaire de réservation complété.</li>
              <li><strong>Validation :</strong> L'Organisateur étudie la demande sous réserve de disponibilité.</li>
              <li><strong>Finalisation :</strong> La réservation devient ferme et définitive uniquement après réception du paiement (acompte ou solde total) et l'envoi d'un email de confirmation par l'Organisateur.</li>
            </ul>
          </Section>

          <Section icon={CreditCard} title="5. Conditions Tarifaires" index={4}>
            <p>Les prix sont indiqués en Euros (€).</p>
            <p><strong>Inclus :</strong> Ingénierie logistique, encadrement des ateliers, hébergement.</p>
            <p><strong>Exclus :</strong> Vols internationaux, transferts vers la destination (sauf mention contraire), assurances personnelles, repas non spécifiés, dépenses privées et activités optionnelles sur place.</p>
          </Section>

          <Section icon={CreditCard} title="6. Modalités de Paiement" index={5}>
            <p>
              Le règlement s'effectue selon les modalités précisées lors de la réservation. À défaut de paiement dans les délais impartis, l'Organisateur se réserve le droit d'annuler la réservation sans préavis.
            </p>
          </Section>

          <Section icon={AlertTriangle} title="7. Politique d'Annulation par le Participant" index={6}>
            <p>Toute annulation doit être notifiée par écrit.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Plus de 14 jours avant le départ :</strong> Remboursement des sommes versées, déduction faite des frais de dossier et des frais réels déjà engagés auprès des prestataires locaux.</li>
              <li><strong>Moins de 14 jours avant le départ :</strong> Aucun remboursement ne pourra être garanti.</li>
            </ul>
          </Section>

          <Section icon={AlertTriangle} title="8. Modification ou Annulation par l'Organisateur" index={7}>
            <p>
              L'Organisateur peut modifier ou annuler un séjour en cas de force majeure, raisons de sécurité, conditions météo ou si le nombre minimum de participants requis pour la viabilité du séjour n'est pas atteint.
            </p>
            <p>
              Dans ces cas, le Participant se verra proposer un report ou un remboursement intégral des sommes versées.
            </p>
          </Section>

          <Section icon={Heart} title="9. Aptitude Physique et Responsabilité Personnelle" index={8}>
            <p>Le Participant reconnaît que les expériences peuvent requérir un engagement physique.</p>
            <p><strong>Déclaration de santé :</strong> Le Participant atteste être en bonne santé et apte aux activités choisies. Il s'engage à signaler toute condition médicale particulière.</p>
            <p><strong>Responsabilité :</strong> L'Organisateur décline toute responsabilité en cas d'incident lié à une condition physique non déclarée ou à une mauvaise appréciation par le Participant de ses propres capacités.</p>
          </Section>

          <Section icon={Shield} title="10. Acceptation des Risques et Sécurité" index={9}>
            <p>
              Le Participant est conscient que certaines activités en extérieur ou sportives comportent une part de risque inhérente. En s'inscrivant, il accepte ces risques et s'engage à respecter les consignes de sécurité des encadrants.
            </p>
            <p>
              Le non-respect de ces consignes dégage l'Organisateur de toute responsabilité.
            </p>
          </Section>

          <Section icon={Cloud} title="11. Adaptabilité du Programme (Clause Météo)" index={10}>
            <p>
              Le planning est donné à titre indicatif. L'Organisateur se réserve le droit d'ajuster l'ordre des activités ou de remplacer une prestation par une équivalente si les conditions (météo, logistique, sécurité) l'exigent.
            </p>
            <p>
              Ces adaptations ne donnent lieu à aucun dédommagement.
            </p>
          </Section>

          <Section icon={Briefcase} title="12. Assurances et Logistique Personnelle" index={11}>
            <p>Chaque Participant est responsable de :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Sa couverture d'assurance (Assistance/Rapatriement/Annulation fortement recommandées).</li>
              <li>Ses documents de voyage (Passeport en cours de validité, visa si nécessaire).</li>
              <li>La surveillance de ses effets personnels. L'Organisateur n'est pas responsable des vols ou pertes d'objets.</li>
            </ul>
          </Section>

          <Section icon={Users} title="13. Activités Hors Programme (Prestataires Externes)" index={12}>
            <p>
              Toute activité souscrite par le Participant en dehors du cadre officiel défini par l'Organisateur relève de la responsabilité exclusive du prestataire externe et ne saurait engager la responsabilité de l'Organisateur.
            </p>
          </Section>

          <Section icon={Users} title="14. Code de Conduite" index={13}>
            <p>
              Un respect mutuel entre participants, encadrants et populations locales est exigé. L'Organisateur se réserve le droit d'exclure, sans remboursement, tout participant dont le comportement compromettrait la sécurité ou la cohésion du groupe.
            </p>
          </Section>

          <Section icon={Camera} title="15. Droit à l'Image" index={14}>
            <p>
              Des contenus audiovisuels peuvent être réalisés durant le séjour pour la promotion des activités de l'Organisateur.
            </p>
            <p>
              Sauf opposition explicite du Participant avant le début du séjour, celui-ci autorise l'utilisation de son image sur les supports marketing. Le Participant dispose d'un droit de retrait sur simple demande.
            </p>
          </Section>

          <Section icon={Lock} title="16. Protection des Données (RGPD)" index={15}>
            <p>
              Les données collectées sont utilisées exclusivement pour la gestion de la réservation et ne sont jamais cédées à des tiers sans consentement préalable.
            </p>
          </Section>

          <Section icon={Scale} title="17. Litiges et Droit Applicable" index={16}>
            <p>
              Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera privilégiée avant toute procédure judiciaire.
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

export default CGVPage;
