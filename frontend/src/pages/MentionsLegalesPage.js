import { motion } from "framer-motion";
import { Building2, FileText, Globe, Shield, Lock, ExternalLink, Scale, Bookmark } from "lucide-react";
import PageLayout from "./components/PageLayout";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: { 
    title: "Legal Notice", 
    subtitle: "THE BRIDGE — UNYCEO FR",
    legalNotice: "The official legal text is in French, as required by French law.",
    lastUpdate: "Last update: December 2025",
    sections: {
      editor: {
        title: "Website Publisher",
        intro: "This website is published by:",
        company: "UNYCEO FR",
        type: "Limited Liability Company (SARL)",
        siren: "SIREN:",
        siret: "SIRET (registered office):",
        tva: "Intra-community VAT No.:",
        addressTitle: "Registered office:",
        address: ["25 rue de Ponthieu", "75008 Paris", "France"],
        regDate: "Registration date:",
        regDateValue: "June 14, 2023",
        rneDate: "RNE registration:",
        rneDateValue: "June 22, 2023",
        activity: "Main activity:",
        activityValue: "Business and management consulting",
        naf: "NAF / APE Code:",
        nafValue: "70.22Z"
      },
      brand: {
        title: "Brand",
        content: ["The Bridge brand is operated by UNYCEO FR.", "The website presents experiences and activities organized under the Bridge by UNYCEO France brand."]
      },
      hosting: {
        title: "Website Hosting",
        intro: "The site is hosted by:",
        placeholder: "(Hosting provider name to be completed)"
      },
      intellectual: {
        title: "Intellectual Property",
        intro: "All content on this site, including:",
        items: ["texts", "images", "photographs", "videos", "logos", "graphic elements", "site structure"],
        protected: "is protected by intellectual property law.",
        warning: "Any reproduction, distribution, modification or use without prior written authorization from the publisher is strictly prohibited."
      },
      liability: {
        title: "Limitation of Liability",
        content: ["The information presented on this site is provided for informational purposes.", "UNYCEO FR strives to ensure the accuracy of the information published, but cannot guarantee that it is complete, accurate or up-to-date at all times.", "The use of information and content available on this site is at the user's sole responsibility."]
      },
      links: {
        title: "External Links",
        content: ["The site may contain links to third-party websites.", "UNYCEO FR cannot be held responsible for the content of these external sites."]
      },
      data: {
        title: "Personal Data",
        content: ["Information collected via the site is used only for contact requests or experience bookings.", "In accordance with applicable data protection regulations, users have the right to:", "access", "rectification", "deletion", "opposition", "regarding their personal data.", "Any request can be addressed to the site publisher."]
      },
      law: {
        title: "Applicable Law",
        content: ["This site is subject to French law.", "Any dispute relating to the use of the site will be submitted to the competent courts in France."]
      }
    }
  },
  fr: { 
    title: "Mentions Légales", 
    subtitle: "THE BRIDGE — UNYCEO FR",
    legalNotice: null,
    lastUpdate: "Dernière mise à jour : Décembre 2025",
    sections: {
      editor: {
        title: "Éditeur du site",
        intro: "Le présent site internet est édité par :",
        company: "UNYCEO FR",
        type: "Société à responsabilité limitée (SARL)",
        siren: "SIREN :",
        siret: "SIRET (siège social) :",
        tva: "N° TVA intracommunautaire :",
        addressTitle: "Siège social :",
        address: ["25 rue de Ponthieu", "75008 Paris", "France"],
        regDate: "Date d'immatriculation :",
        regDateValue: "14 juin 2023",
        rneDate: "Immatriculation au RNE :",
        rneDateValue: "22 juin 2023",
        activity: "Activité principale :",
        activityValue: "Conseil pour les affaires et autres conseils de gestion",
        naf: "Code NAF / APE :",
        nafValue: "70.22Z"
      },
      brand: {
        title: "Marque",
        content: ["La marque Bridge est exploitée par la société UNYCEO FR.", "Le site présente les expériences et activités organisées sous la marque Bridge by UNYCEO France."]
      },
      hosting: {
        title: "Hébergement du site",
        intro: "Le site est hébergé par :",
        placeholder: "(Nom de l'hébergeur à compléter)"
      },
      intellectual: {
        title: "Propriété intellectuelle",
        intro: "L'ensemble du contenu présent sur ce site, incluant notamment :",
        items: ["les textes", "les images", "les photographies", "les vidéos", "les logos", "les éléments graphiques", "la structure du site"],
        protected: "est protégé par le droit de la propriété intellectuelle.",
        warning: "Toute reproduction, distribution, modification ou utilisation sans autorisation préalable écrite de l'éditeur est strictement interdite."
      },
      liability: {
        title: "Limitation de responsabilité",
        content: ["Les informations présentées sur ce site sont fournies à titre informatif.", "La société UNYCEO FR s'efforce d'assurer l'exactitude des informations diffusées, mais ne saurait garantir qu'elles soient complètes, exactes ou à jour en permanence.", "L'utilisation des informations et contenus disponibles sur ce site se fait sous la seule responsabilité de l'utilisateur."]
      },
      links: {
        title: "Liens externes",
        content: ["Le site peut contenir des liens vers des sites internet tiers.", "La société UNYCEO FR ne peut être tenue responsable du contenu de ces sites externes."]
      },
      data: {
        title: "Données personnelles",
        content: ["Les informations collectées via le site sont utilisées uniquement dans le cadre des demandes de contact ou des réservations d'expériences.", "Conformément à la réglementation applicable en matière de protection des données personnelles, les utilisateurs disposent d'un droit :", "d'accès", "de rectification", "de suppression", "d'opposition", "concernant leurs données personnelles.", "Toute demande peut être adressée à l'éditeur du site."]
      },
      law: {
        title: "Droit applicable",
        content: ["Le présent site est soumis au droit français.", "Tout litige relatif à l'utilisation du site sera soumis aux juridictions compétentes en France."]
      }
    }
  },
  es: { 
    title: "Aviso Legal", 
    subtitle: "THE BRIDGE — UNYCEO FR",
    legalNotice: "El texto legal oficial está en francés, según lo exige la ley francesa.",
    lastUpdate: "Última actualización: Diciembre 2025",
    sections: {
      editor: {
        title: "Editor del sitio",
        intro: "Este sitio web es publicado por:",
        company: "UNYCEO FR",
        type: "Sociedad de Responsabilidad Limitada (SARL)",
        siren: "SIREN:",
        siret: "SIRET (sede social):",
        tva: "N° IVA intracomunitario:",
        addressTitle: "Sede social:",
        address: ["25 rue de Ponthieu", "75008 París", "Francia"],
        regDate: "Fecha de registro:",
        regDateValue: "14 de junio de 2023",
        rneDate: "Registro RNE:",
        rneDateValue: "22 de junio de 2023",
        activity: "Actividad principal:",
        activityValue: "Consultoría empresarial y de gestión",
        naf: "Código NAF / APE:",
        nafValue: "70.22Z"
      },
      brand: {
        title: "Marca",
        content: ["La marca Bridge es operada por UNYCEO FR.", "El sitio presenta las experiencias y actividades organizadas bajo la marca Bridge by UNYCEO France."]
      },
      hosting: {
        title: "Alojamiento del sitio",
        intro: "El sitio está alojado por:",
        placeholder: "(Nombre del proveedor de alojamiento por completar)"
      },
      intellectual: {
        title: "Propiedad intelectual",
        intro: "Todo el contenido de este sitio, incluyendo:",
        items: ["textos", "imágenes", "fotografías", "videos", "logotipos", "elementos gráficos", "estructura del sitio"],
        protected: "está protegido por la ley de propiedad intelectual.",
        warning: "Cualquier reproducción, distribución, modificación o uso sin autorización previa por escrito del editor está estrictamente prohibido."
      },
      liability: {
        title: "Limitación de responsabilidad",
        content: ["La información presentada en este sitio se proporciona con fines informativos.", "UNYCEO FR se esfuerza por garantizar la exactitud de la información publicada, pero no puede garantizar que sea completa, exacta o esté actualizada en todo momento.", "El uso de la información y el contenido disponible en este sitio es responsabilidad exclusiva del usuario."]
      },
      links: {
        title: "Enlaces externos",
        content: ["El sitio puede contener enlaces a sitios web de terceros.", "UNYCEO FR no puede ser considerada responsable del contenido de estos sitios externos."]
      },
      data: {
        title: "Datos personales",
        content: ["La información recopilada a través del sitio se utiliza únicamente para solicitudes de contacto o reservas de experiencias.", "De acuerdo con la normativa aplicable de protección de datos, los usuarios tienen derecho a:", "acceso", "rectificación", "supresión", "oposición", "respecto a sus datos personales.", "Cualquier solicitud puede dirigirse al editor del sitio."]
      },
      law: {
        title: "Ley aplicable",
        content: ["Este sitio está sujeto a la ley francesa.", "Cualquier disputa relacionada con el uso del sitio se someterá a los tribunales competentes en Francia."]
      }
    }
  },
  pt: { 
    title: "Aviso Legal", 
    subtitle: "THE BRIDGE — UNYCEO FR",
    legalNotice: "O texto legal oficial está em francês, conforme exigido pela lei francesa.",
    lastUpdate: "Última atualização: Dezembro 2025",
    sections: {
      editor: {
        title: "Editor do site",
        intro: "Este site é publicado por:",
        company: "UNYCEO FR",
        type: "Sociedade de Responsabilidade Limitada (SARL)",
        siren: "SIREN:",
        siret: "SIRET (sede social):",
        tva: "N° IVA intracomunitário:",
        addressTitle: "Sede social:",
        address: ["25 rue de Ponthieu", "75008 Paris", "França"],
        regDate: "Data de registro:",
        regDateValue: "14 de junho de 2023",
        rneDate: "Registro RNE:",
        rneDateValue: "22 de junho de 2023",
        activity: "Atividade principal:",
        activityValue: "Consultoria empresarial e de gestão",
        naf: "Código NAF / APE:",
        nafValue: "70.22Z"
      },
      brand: {
        title: "Marca",
        content: ["A marca Bridge é operada pela UNYCEO FR.", "O site apresenta as experiências e atividades organizadas sob a marca Bridge by UNYCEO France."]
      },
      hosting: {
        title: "Hospedagem do site",
        intro: "O site é hospedado por:",
        placeholder: "(Nome do provedor de hospedagem a completar)"
      },
      intellectual: {
        title: "Propriedade intelectual",
        intro: "Todo o conteúdo deste site, incluindo:",
        items: ["textos", "imagens", "fotografias", "vídeos", "logotipos", "elementos gráficos", "estrutura do site"],
        protected: "está protegido pela lei de propriedade intelectual.",
        warning: "Qualquer reprodução, distribuição, modificação ou uso sem autorização prévia por escrito do editor é estritamente proibido."
      },
      liability: {
        title: "Limitação de responsabilidade",
        content: ["As informações apresentadas neste site são fornecidas para fins informativos.", "A UNYCEO FR esforça-se para garantir a exatidão das informações publicadas, mas não pode garantir que sejam completas, exatas ou atualizadas em todos os momentos.", "O uso das informações e conteúdo disponíveis neste site é de responsabilidade exclusiva do usuário."]
      },
      links: {
        title: "Links externos",
        content: ["O site pode conter links para sites de terceiros.", "A UNYCEO FR não pode ser responsabilizada pelo conteúdo desses sites externos."]
      },
      data: {
        title: "Dados pessoais",
        content: ["As informações coletadas através do site são usadas apenas para solicitações de contato ou reservas de experiências.", "De acordo com a regulamentação aplicável de proteção de dados, os usuários têm o direito de:", "acesso", "retificação", "exclusão", "oposição", "em relação aos seus dados pessoais.", "Qualquer solicitação pode ser dirigida ao editor do site."]
      },
      law: {
        title: "Lei aplicável",
        content: ["Este site está sujeito à lei francesa.", "Qualquer disputa relacionada ao uso do site será submetida aos tribunais competentes na França."]
      }
    }
  },
  de: { 
    title: "Impressum", 
    subtitle: "THE BRIDGE — UNYCEO FR",
    legalNotice: "Der offizielle Rechtstext ist auf Französisch, wie es das französische Recht vorschreibt.",
    lastUpdate: "Letzte Aktualisierung: Dezember 2025",
    sections: {
      editor: {
        title: "Herausgeber der Website",
        intro: "Diese Website wird herausgegeben von:",
        company: "UNYCEO FR",
        type: "Gesellschaft mit beschränkter Haftung (SARL)",
        siren: "SIREN:",
        siret: "SIRET (Firmensitz):",
        tva: "USt-IdNr.:",
        addressTitle: "Firmensitz:",
        address: ["25 rue de Ponthieu", "75008 Paris", "Frankreich"],
        regDate: "Registrierungsdatum:",
        regDateValue: "14. Juni 2023",
        rneDate: "RNE-Registrierung:",
        rneDateValue: "22. Juni 2023",
        activity: "Haupttätigkeit:",
        activityValue: "Unternehmens- und Managementberatung",
        naf: "NAF / APE-Code:",
        nafValue: "70.22Z"
      },
      brand: {
        title: "Marke",
        content: ["Die Marke Bridge wird von UNYCEO FR betrieben.", "Die Website präsentiert die unter der Marke Bridge by UNYCEO France organisierten Erlebnisse und Aktivitäten."]
      },
      hosting: {
        title: "Website-Hosting",
        intro: "Die Website wird gehostet von:",
        placeholder: "(Name des Hosting-Anbieters zu ergänzen)"
      },
      intellectual: {
        title: "Geistiges Eigentum",
        intro: "Alle Inhalte auf dieser Website, einschließlich:",
        items: ["Texte", "Bilder", "Fotografien", "Videos", "Logos", "Grafikelemente", "Website-Struktur"],
        protected: "sind durch das Urheberrecht geschützt.",
        warning: "Jede Vervielfältigung, Verbreitung, Änderung oder Nutzung ohne vorherige schriftliche Genehmigung des Herausgebers ist streng verboten."
      },
      liability: {
        title: "Haftungsbeschränkung",
        content: ["Die auf dieser Website präsentierten Informationen dienen nur zu Informationszwecken.", "UNYCEO FR bemüht sich, die Richtigkeit der veröffentlichten Informationen zu gewährleisten, kann jedoch nicht garantieren, dass sie jederzeit vollständig, genau oder aktuell sind.", "Die Nutzung der auf dieser Website verfügbaren Informationen und Inhalte erfolgt auf alleinige Verantwortung des Nutzers."]
      },
      links: {
        title: "Externe Links",
        content: ["Die Website kann Links zu Websites Dritter enthalten.", "UNYCEO FR kann nicht für den Inhalt dieser externen Websites verantwortlich gemacht werden."]
      },
      data: {
        title: "Personenbezogene Daten",
        content: ["Die über die Website gesammelten Informationen werden nur für Kontaktanfragen oder Erlebnisbuchungen verwendet.", "Gemäß den geltenden Datenschutzbestimmungen haben Nutzer das Recht auf:", "Zugang", "Berichtigung", "Löschung", "Widerspruch", "bezüglich ihrer personenbezogenen Daten.", "Jede Anfrage kann an den Herausgeber der Website gerichtet werden."]
      },
      law: {
        title: "Anwendbares Recht",
        content: ["Diese Website unterliegt französischem Recht.", "Jeder Streit im Zusammenhang mit der Nutzung der Website wird den zuständigen Gerichten in Frankreich vorgelegt."]
      }
    }
  },
  it: { 
    title: "Note Legali", 
    subtitle: "THE BRIDGE — UNYCEO FR",
    legalNotice: "Il testo legale ufficiale è in francese, come richiesto dalla legge francese.",
    lastUpdate: "Ultimo aggiornamento: Dicembre 2025",
    sections: {
      editor: {
        title: "Editore del sito",
        intro: "Questo sito web è pubblicato da:",
        company: "UNYCEO FR",
        type: "Società a Responsabilità Limitata (SARL)",
        siren: "SIREN:",
        siret: "SIRET (sede legale):",
        tva: "N° IVA intracomunitaria:",
        addressTitle: "Sede legale:",
        address: ["25 rue de Ponthieu", "75008 Parigi", "Francia"],
        regDate: "Data di registrazione:",
        regDateValue: "14 giugno 2023",
        rneDate: "Registrazione RNE:",
        rneDateValue: "22 giugno 2023",
        activity: "Attività principale:",
        activityValue: "Consulenza aziendale e di gestione",
        naf: "Codice NAF / APE:",
        nafValue: "70.22Z"
      },
      brand: {
        title: "Marchio",
        content: ["Il marchio Bridge è gestito da UNYCEO FR.", "Il sito presenta le esperienze e le attività organizzate sotto il marchio Bridge by UNYCEO France."]
      },
      hosting: {
        title: "Hosting del sito",
        intro: "Il sito è ospitato da:",
        placeholder: "(Nome del provider di hosting da completare)"
      },
      intellectual: {
        title: "Proprietà intellettuale",
        intro: "Tutti i contenuti di questo sito, inclusi:",
        items: ["testi", "immagini", "fotografie", "video", "loghi", "elementi grafici", "struttura del sito"],
        protected: "sono protetti dalla legge sulla proprietà intellettuale.",
        warning: "Qualsiasi riproduzione, distribuzione, modifica o utilizzo senza previa autorizzazione scritta dell'editore è severamente vietato."
      },
      liability: {
        title: "Limitazione di responsabilità",
        content: ["Le informazioni presentate su questo sito sono fornite a scopo informativo.", "UNYCEO FR si impegna a garantire l'accuratezza delle informazioni pubblicate, ma non può garantire che siano complete, accurate o aggiornate in ogni momento.", "L'utilizzo delle informazioni e dei contenuti disponibili su questo sito è sotto la sola responsabilità dell'utente."]
      },
      links: {
        title: "Link esterni",
        content: ["Il sito può contenere link a siti web di terzi.", "UNYCEO FR non può essere ritenuta responsabile del contenuto di questi siti esterni."]
      },
      data: {
        title: "Dati personali",
        content: ["Le informazioni raccolte tramite il sito sono utilizzate solo per richieste di contatto o prenotazioni di esperienze.", "In conformità con la normativa applicabile sulla protezione dei dati, gli utenti hanno il diritto di:", "accesso", "rettifica", "cancellazione", "opposizione", "riguardo ai propri dati personali.", "Qualsiasi richiesta può essere indirizzata all'editore del sito."]
      },
      law: {
        title: "Legge applicabile",
        content: ["Questo sito è soggetto alla legge francese.", "Qualsiasi controversia relativa all'uso del sito sarà sottoposta ai tribunali competenti in Francia."]
      }
    }
  }
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
  const s = t.sections;
  
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-ocean to-ocean/90 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Scale className="text-sand" size={32} />
            </div>
            <h1 className="font-syne font-black text-3xl sm:text-4xl lg:text-5xl mb-4">{t.title}</h1>
            <p className="font-dm text-white/80 text-lg">{t.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 bg-warmwhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          
          {t.legalNotice && (
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="font-dm text-blue-700 text-sm">ℹ️ {t.legalNotice}</p>
            </div>
          )}
          
          {/* Éditeur */}
          <Section icon={Building2} title={s.editor.title} index={0}>
            <p>{s.editor.intro}</p>
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-syne font-bold text-ocean text-lg mb-4">{s.editor.company}</h3>
              <p className="mb-2">{s.editor.type}</p>
              <div className="space-y-2 text-sm">
                <p><strong>{s.editor.siren}</strong> 953 646 577</p>
                <p><strong>{s.editor.siret}</strong> 953 646 577 00015</p>
                <p><strong>{s.editor.tva}</strong> FR15 953 646 577</p>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-medium text-ocean mb-2">{s.editor.addressTitle}</p>
                {s.editor.address.map((line, i) => <p key={i}>{line}</p>)}
              </div>
              <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
                <p><strong>{s.editor.regDate}</strong> {s.editor.regDateValue}</p>
                <p><strong>{s.editor.rneDate}</strong> {s.editor.rneDateValue}</p>
                <p><strong>{s.editor.activity}</strong> {s.editor.activityValue}</p>
                <p><strong>{s.editor.naf}</strong> {s.editor.nafValue}</p>
              </div>
            </div>
          </Section>

          {/* Marque */}
          <Section icon={Bookmark} title={s.brand.title} index={1}>
            {s.brand.content.map((p, i) => <p key={i}>{p}</p>)}
          </Section>

          {/* Hébergement */}
          <Section icon={Globe} title={s.hosting.title} index={2}>
            <p>{s.hosting.intro}</p>
            <div className="bg-white rounded-xl p-6 border border-border">
              <p className="text-ocean/60 italic">{s.hosting.placeholder}</p>
            </div>
          </Section>

          {/* Propriété intellectuelle */}
          <Section icon={Shield} title={s.intellectual.title} index={3}>
            <p>{s.intellectual.intro}</p>
            <ul className="list-disc pl-5 space-y-1">
              {s.intellectual.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p>{s.intellectual.protected}</p>
            <p className="bg-sunset/5 p-4 rounded-xl border-l-4 border-sunset">
              <strong>{s.intellectual.warning}</strong>
            </p>
          </Section>

          {/* Limitation */}
          <Section icon={FileText} title={s.liability.title} index={4}>
            {s.liability.content.map((p, i) => <p key={i}>{p}</p>)}
          </Section>

          {/* Liens */}
          <Section icon={ExternalLink} title={s.links.title} index={5}>
            {s.links.content.map((p, i) => <p key={i}>{p}</p>)}
          </Section>

          {/* Données */}
          <Section icon={Lock} title={s.data.title} index={6}>
            <p>{s.data.content[0]}</p>
            <p>{s.data.content[1]}</p>
            <ul className="list-disc pl-5 space-y-1">
              {s.data.content.slice(2, 6).map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p>{s.data.content[6]}</p>
            <p>{s.data.content[7]}</p>
          </Section>

          {/* Droit */}
          <Section icon={Scale} title={s.law.title} index={7}>
            {s.law.content.map((p, i) => <p key={i}><strong>{p}</strong></p>)}
          </Section>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="font-dm text-ocean/60 text-sm">{t.lastUpdate}</p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default MentionsLegalesPage;
