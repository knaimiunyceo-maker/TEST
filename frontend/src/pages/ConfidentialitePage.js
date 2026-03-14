import { motion } from "framer-motion";
import { Shield, Building2, Database, Target, Scale, Users, Clock, Lock, UserCheck, Cookie, RefreshCw } from "lucide-react";
import PageLayout from "./components/PageLayout";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: { 
    title: "Privacy Policy", 
    subtitle: "Protection of your personal data",
    legalNotice: "The official legal text is in French. This translation is provided for information purposes only.",
    lastUpdate: "Last update: December 2025",
    sections: {
      intro: {
        title: "1. Introduction",
        content: ["This privacy policy aims to inform users of the site about how their personal data is collected, used and protected.", "UNYCEO FR, operating the Bridge by UNYCEO France brand, attaches particular importance to the protection of personal data and is committed to complying with current regulations, in particular the General Data Protection Regulation (GDPR)."]
      },
      controller: {
        title: "2. Data Controller",
        intro: "Personal data collected on this site is processed by:",
        company: "UNYCEO FR",
        address: ["25 rue de Ponthieu", "75008 Paris", "France"],
        siren: "SIREN:"
      },
      collected: {
        title: "3. Data Collected",
        intro: "When using the site, certain data may be collected, including:",
        direct: {
          title: "Data provided directly by the user",
          intro: "When you fill out a contact or booking form:",
          items: ["first and last name", "email address", "phone number", "information related to your request or booking"]
        },
        auto: {
          title: "Automatically collected data",
          intro: "When browsing the site:",
          items: ["IP address", "browser type", "pages viewed", "browsing duration"],
          note: "This information may be collected for statistical purposes and to improve the site."
        }
      },
      purposes: {
        title: "4. Purposes of Collection",
        intro: "The collected data is used for:",
        items: ["responding to contact requests", "managing booking requests", "organizing proposed experiences", "improving site operation", "ensuring site security"],
        note: "Data is only used within the framework of Bridge by UNYCEO France activities."
      },
      legal: {
        title: "5. Legal Basis for Processing",
        intro: "Data is processed on the following legal bases:",
        items: ["user consent (contact form or registration)", "contract execution as part of a booking", "legitimate interest to improve the site and quality of services"]
      },
      recipients: {
        title: "6. Data Recipients",
        intro: "Personal data is intended only for:",
        items: ["UNYCEO FR", "technical service providers necessary for site operation (hosting, technical services)"],
        note: "Data is never sold or transferred to third parties for commercial purposes."
      },
      retention: {
        title: "7. Data Retention Period",
        content: ["Personal data is retained only for the duration necessary for the purposes for which it was collected.", "Generally:"],
        items: ["contact data: up to 3 years after the last exchange", "booking-related data: duration necessary for administrative and accounting management"]
      },
      security: {
        title: "8. Data Security",
        intro: "UNYCEO FR implements the necessary technical and organizational measures to protect personal data against:",
        items: ["unauthorized access", "loss", "disclosure", "modification"]
      },
      rights: {
        title: "9. User Rights",
        intro: "In accordance with GDPR, users have the following rights:",
        items: [
          { name: "Right of access", desc: "to their data" },
          { name: "Right of rectification", desc: "correct data" },
          { name: "Right of deletion", desc: "erase data" },
          { name: "Right of opposition", desc: "oppose processing" },
          { name: "Right to restriction", desc: "limit processing" },
          { name: "Right to portability", desc: "retrieve data" }
        ],
        note: "To exercise these rights, a request can be addressed to the site publisher."
      },
      cookies: {
        title: "10. Cookies",
        intro: "The site may use cookies to:",
        items: ["improve user experience", "analyze site usage", "facilitate certain features"],
        note: "A cookie is a small file stored on the user's computer or device.",
        config: "Users can configure their browser to refuse all or some cookies."
      },
      modification: {
        title: "11. Privacy Policy Modification",
        content: ["UNYCEO FR reserves the right to modify this privacy policy at any time to ensure compliance with current legislation.", "Users are invited to regularly consult this page."]
      }
    }
  },
  fr: { 
    title: "Politique de Confidentialité", 
    subtitle: "Protection de vos données personnelles",
    legalNotice: null,
    lastUpdate: "Dernière mise à jour : Décembre 2025",
    sections: {
      intro: {
        title: "1. Introduction",
        content: ["La présente politique de confidentialité a pour objectif d'informer les utilisateurs du site sur la manière dont leurs données personnelles sont collectées, utilisées et protégées.", "La société UNYCEO FR, exploitant la marque Bridge by UNYCEO France, accorde une importance particulière à la protection des données personnelles et s'engage à respecter la réglementation en vigueur, notamment le Règlement Général sur la Protection des Données (RGPD)."]
      },
      controller: {
        title: "2. Responsable du traitement",
        intro: "Les données personnelles collectées sur ce site sont traitées par :",
        company: "UNYCEO FR",
        address: ["25 rue de Ponthieu", "75008 Paris", "France"],
        siren: "SIREN :"
      },
      collected: {
        title: "3. Données collectées",
        intro: "Lors de l'utilisation du site, certaines données peuvent être collectées, notamment :",
        direct: {
          title: "Données fournies directement par l'utilisateur",
          intro: "Lorsque vous remplissez un formulaire de contact ou de réservation :",
          items: ["nom et prénom", "adresse email", "numéro de téléphone", "informations liées à votre demande ou réservation"]
        },
        auto: {
          title: "Données collectées automatiquement",
          intro: "Lors de la navigation sur le site :",
          items: ["adresse IP", "type de navigateur", "pages consultées", "durée de navigation"],
          note: "Ces informations peuvent être collectées à des fins statistiques et d'amélioration du site."
        }
      },
      purposes: {
        title: "4. Finalités de la collecte",
        intro: "Les données collectées sont utilisées pour :",
        items: ["répondre aux demandes de contact", "gérer les demandes de réservation", "organiser les expériences proposées", "améliorer le fonctionnement du site", "assurer la sécurité du site"],
        note: "Les données ne sont utilisées que dans le cadre des activités de Bridge by UNYCEO France."
      },
      legal: {
        title: "5. Base légale du traitement",
        intro: "Les données sont traitées sur les bases légales suivantes :",
        items: ["le consentement de l'utilisateur (formulaire de contact ou inscription)", "l'exécution d'un contrat dans le cadre d'une réservation", "l'intérêt légitime pour améliorer le site et la qualité des services"]
      },
      recipients: {
        title: "6. Destinataires des données",
        intro: "Les données personnelles sont destinées uniquement à :",
        items: ["la société UNYCEO FR", "les prestataires techniques nécessaires au fonctionnement du site (hébergement, services techniques)"],
        note: "Les données ne sont jamais vendues ni cédées à des tiers à des fins commerciales."
      },
      retention: {
        title: "7. Durée de conservation des données",
        content: ["Les données personnelles sont conservées uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées.", "En règle générale :"],
        items: ["données de contact : jusqu'à 3 ans après le dernier échange", "données liées aux réservations : durée nécessaire à la gestion administrative et comptable"]
      },
      security: {
        title: "8. Sécurité des données",
        intro: "La société UNYCEO FR met en œuvre les mesures techniques et organisationnelles nécessaires afin de protéger les données personnelles contre :",
        items: ["l'accès non autorisé", "la perte", "la divulgation", "la modification"]
      },
      rights: {
        title: "9. Droits des utilisateurs",
        intro: "Conformément au RGPD, les utilisateurs disposent des droits suivants :",
        items: [
          { name: "Droit d'accès", desc: "à leurs données" },
          { name: "Droit de rectification", desc: "corriger les données" },
          { name: "Droit de suppression", desc: "effacer les données" },
          { name: "Droit d'opposition", desc: "s'opposer au traitement" },
          { name: "Droit à la limitation", desc: "limiter le traitement" },
          { name: "Droit à la portabilité", desc: "récupérer ses données" }
        ],
        note: "Pour exercer ces droits, une demande peut être adressée à l'éditeur du site."
      },
      cookies: {
        title: "10. Cookies",
        intro: "Le site peut utiliser des cookies afin :",
        items: ["d'améliorer l'expérience utilisateur", "d'analyser l'utilisation du site", "de faciliter certaines fonctionnalités"],
        note: "Un cookie est un petit fichier stocké sur l'ordinateur ou l'appareil de l'utilisateur.",
        config: "L'utilisateur peut configurer son navigateur pour refuser tout ou partie des cookies."
      },
      modification: {
        title: "11. Modification de la politique de confidentialité",
        content: ["La société UNYCEO FR se réserve le droit de modifier la présente politique de confidentialité à tout moment afin de garantir sa conformité avec la législation en vigueur.", "Les utilisateurs sont invités à consulter régulièrement cette page."]
      }
    }
  },
  es: { 
    title: "Política de Privacidad", 
    subtitle: "Protección de sus datos personales",
    legalNotice: "El texto legal oficial está en francés. Esta traducción se proporciona únicamente con fines informativos.",
    lastUpdate: "Última actualización: Diciembre 2025",
    sections: {
      intro: {
        title: "1. Introducción",
        content: ["Esta política de privacidad tiene como objetivo informar a los usuarios del sitio sobre cómo se recopilan, utilizan y protegen sus datos personales.", "UNYCEO FR, que opera la marca Bridge by UNYCEO France, otorga especial importancia a la protección de datos personales y se compromete a cumplir con la normativa vigente, en particular el Reglamento General de Protección de Datos (RGPD)."]
      },
      controller: {
        title: "2. Responsable del tratamiento",
        intro: "Los datos personales recopilados en este sitio son tratados por:",
        company: "UNYCEO FR",
        address: ["25 rue de Ponthieu", "75008 París", "Francia"],
        siren: "SIREN:"
      },
      collected: {
        title: "3. Datos recopilados",
        intro: "Durante el uso del sitio, se pueden recopilar ciertos datos, incluyendo:",
        direct: {
          title: "Datos proporcionados directamente por el usuario",
          intro: "Cuando completa un formulario de contacto o reserva:",
          items: ["nombre y apellidos", "dirección de correo electrónico", "número de teléfono", "información relacionada con su solicitud o reserva"]
        },
        auto: {
          title: "Datos recopilados automáticamente",
          intro: "Durante la navegación por el sitio:",
          items: ["dirección IP", "tipo de navegador", "páginas visitadas", "duración de la navegación"],
          note: "Esta información puede recopilarse con fines estadísticos y para mejorar el sitio."
        }
      },
      purposes: {
        title: "4. Finalidades de la recopilación",
        intro: "Los datos recopilados se utilizan para:",
        items: ["responder a solicitudes de contacto", "gestionar solicitudes de reserva", "organizar las experiencias propuestas", "mejorar el funcionamiento del sitio", "garantizar la seguridad del sitio"],
        note: "Los datos solo se utilizan en el marco de las actividades de Bridge by UNYCEO France."
      },
      legal: {
        title: "5. Base legal del tratamiento",
        intro: "Los datos se tratan sobre las siguientes bases legales:",
        items: ["el consentimiento del usuario (formulario de contacto o inscripción)", "la ejecución de un contrato en el marco de una reserva", "el interés legítimo para mejorar el sitio y la calidad de los servicios"]
      },
      recipients: {
        title: "6. Destinatarios de los datos",
        intro: "Los datos personales están destinados únicamente a:",
        items: ["UNYCEO FR", "los proveedores técnicos necesarios para el funcionamiento del sitio (alojamiento, servicios técnicos)"],
        note: "Los datos nunca se venden ni ceden a terceros con fines comerciales."
      },
      retention: {
        title: "7. Período de conservación de datos",
        content: ["Los datos personales se conservan únicamente durante el tiempo necesario para los fines para los que fueron recopilados.", "En general:"],
        items: ["datos de contacto: hasta 3 años después del último intercambio", "datos relacionados con reservas: tiempo necesario para la gestión administrativa y contable"]
      },
      security: {
        title: "8. Seguridad de los datos",
        intro: "UNYCEO FR implementa las medidas técnicas y organizativas necesarias para proteger los datos personales contra:",
        items: ["acceso no autorizado", "pérdida", "divulgación", "modificación"]
      },
      rights: {
        title: "9. Derechos de los usuarios",
        intro: "De acuerdo con el RGPD, los usuarios tienen los siguientes derechos:",
        items: [
          { name: "Derecho de acceso", desc: "a sus datos" },
          { name: "Derecho de rectificación", desc: "corregir datos" },
          { name: "Derecho de supresión", desc: "eliminar datos" },
          { name: "Derecho de oposición", desc: "oponerse al tratamiento" },
          { name: "Derecho a la limitación", desc: "limitar el tratamiento" },
          { name: "Derecho a la portabilidad", desc: "recuperar sus datos" }
        ],
        note: "Para ejercer estos derechos, se puede dirigir una solicitud al editor del sitio."
      },
      cookies: {
        title: "10. Cookies",
        intro: "El sitio puede utilizar cookies para:",
        items: ["mejorar la experiencia del usuario", "analizar el uso del sitio", "facilitar ciertas funcionalidades"],
        note: "Una cookie es un pequeño archivo almacenado en el ordenador o dispositivo del usuario.",
        config: "El usuario puede configurar su navegador para rechazar todas o parte de las cookies."
      },
      modification: {
        title: "11. Modificación de la política de privacidad",
        content: ["UNYCEO FR se reserva el derecho de modificar esta política de privacidad en cualquier momento para garantizar su cumplimiento con la legislación vigente.", "Se invita a los usuarios a consultar esta página regularmente."]
      }
    }
  },
  pt: { 
    title: "Política de Privacidade", 
    subtitle: "Proteção dos seus dados pessoais",
    legalNotice: "O texto legal oficial está em francês. Esta tradução é fornecida apenas para fins informativos.",
    lastUpdate: "Última atualização: Dezembro 2025",
    sections: {
      intro: {
        title: "1. Introdução",
        content: ["Esta política de privacidade tem como objetivo informar os usuários do site sobre como seus dados pessoais são coletados, utilizados e protegidos.", "A UNYCEO FR, que opera a marca Bridge by UNYCEO France, atribui especial importância à proteção de dados pessoais e compromete-se a cumprir a regulamentação vigente, nomeadamente o Regulamento Geral de Proteção de Dados (RGPD)."]
      },
      controller: {
        title: "2. Responsável pelo tratamento",
        intro: "Os dados pessoais coletados neste site são tratados por:",
        company: "UNYCEO FR",
        address: ["25 rue de Ponthieu", "75008 Paris", "França"],
        siren: "SIREN:"
      },
      collected: {
        title: "3. Dados coletados",
        intro: "Durante o uso do site, certos dados podem ser coletados, incluindo:",
        direct: {
          title: "Dados fornecidos diretamente pelo usuário",
          intro: "Quando você preenche um formulário de contato ou reserva:",
          items: ["nome e sobrenome", "endereço de email", "número de telefone", "informações relacionadas ao seu pedido ou reserva"]
        },
        auto: {
          title: "Dados coletados automaticamente",
          intro: "Durante a navegação no site:",
          items: ["endereço IP", "tipo de navegador", "páginas visitadas", "duração da navegação"],
          note: "Estas informações podem ser coletadas para fins estatísticos e de melhoria do site."
        }
      },
      purposes: {
        title: "4. Finalidades da coleta",
        intro: "Os dados coletados são utilizados para:",
        items: ["responder a solicitações de contato", "gerenciar pedidos de reserva", "organizar as experiências propostas", "melhorar o funcionamento do site", "garantir a segurança do site"],
        note: "Os dados são utilizados apenas no âmbito das atividades da Bridge by UNYCEO France."
      },
      legal: {
        title: "5. Base legal do tratamento",
        intro: "Os dados são tratados com base nas seguintes bases legais:",
        items: ["o consentimento do usuário (formulário de contato ou inscrição)", "a execução de um contrato no âmbito de uma reserva", "o interesse legítimo para melhorar o site e a qualidade dos serviços"]
      },
      recipients: {
        title: "6. Destinatários dos dados",
        intro: "Os dados pessoais são destinados apenas a:",
        items: ["UNYCEO FR", "prestadores técnicos necessários ao funcionamento do site (hospedagem, serviços técnicos)"],
        note: "Os dados nunca são vendidos nem cedidos a terceiros para fins comerciais."
      },
      retention: {
        title: "7. Período de conservação dos dados",
        content: ["Os dados pessoais são conservados apenas durante o tempo necessário para as finalidades para as quais foram coletados.", "Em geral:"],
        items: ["dados de contato: até 3 anos após a última troca", "dados relacionados a reservas: tempo necessário para gestão administrativa e contábil"]
      },
      security: {
        title: "8. Segurança dos dados",
        intro: "A UNYCEO FR implementa as medidas técnicas e organizacionais necessárias para proteger os dados pessoais contra:",
        items: ["acesso não autorizado", "perda", "divulgação", "modificação"]
      },
      rights: {
        title: "9. Direitos dos usuários",
        intro: "De acordo com o RGPD, os usuários têm os seguintes direitos:",
        items: [
          { name: "Direito de acesso", desc: "aos seus dados" },
          { name: "Direito de retificação", desc: "corrigir dados" },
          { name: "Direito de exclusão", desc: "apagar dados" },
          { name: "Direito de oposição", desc: "opor-se ao tratamento" },
          { name: "Direito à limitação", desc: "limitar o tratamento" },
          { name: "Direito à portabilidade", desc: "recuperar seus dados" }
        ],
        note: "Para exercer estes direitos, pode ser dirigido um pedido ao editor do site."
      },
      cookies: {
        title: "10. Cookies",
        intro: "O site pode utilizar cookies para:",
        items: ["melhorar a experiência do usuário", "analisar o uso do site", "facilitar certas funcionalidades"],
        note: "Um cookie é um pequeno arquivo armazenado no computador ou dispositivo do usuário.",
        config: "O usuário pode configurar seu navegador para recusar todos ou parte dos cookies."
      },
      modification: {
        title: "11. Modificação da política de privacidade",
        content: ["A UNYCEO FR reserva-se o direito de modificar esta política de privacidade a qualquer momento para garantir sua conformidade com a legislação vigente.", "Os usuários são convidados a consultar esta página regularmente."]
      }
    }
  },
  de: { 
    title: "Datenschutzrichtlinie", 
    subtitle: "Schutz Ihrer persönlichen Daten",
    legalNotice: "Der offizielle Rechtstext ist auf Französisch. Diese Übersetzung dient nur zu Informationszwecken.",
    lastUpdate: "Letzte Aktualisierung: Dezember 2025",
    sections: {
      intro: {
        title: "1. Einleitung",
        content: ["Diese Datenschutzrichtlinie hat das Ziel, die Nutzer der Website darüber zu informieren, wie ihre persönlichen Daten erhoben, verwendet und geschützt werden.", "UNYCEO FR, die die Marke Bridge by UNYCEO France betreibt, legt besonderen Wert auf den Schutz persönlicher Daten und verpflichtet sich zur Einhaltung der geltenden Vorschriften, insbesondere der Datenschutz-Grundverordnung (DSGVO)."]
      },
      controller: {
        title: "2. Verantwortlicher für die Verarbeitung",
        intro: "Die auf dieser Website erhobenen persönlichen Daten werden verarbeitet von:",
        company: "UNYCEO FR",
        address: ["25 rue de Ponthieu", "75008 Paris", "Frankreich"],
        siren: "SIREN:"
      },
      collected: {
        title: "3. Erhobene Daten",
        intro: "Bei der Nutzung der Website können bestimmte Daten erhoben werden, darunter:",
        direct: {
          title: "Vom Nutzer direkt bereitgestellte Daten",
          intro: "Wenn Sie ein Kontakt- oder Buchungsformular ausfüllen:",
          items: ["Vor- und Nachname", "E-Mail-Adresse", "Telefonnummer", "Informationen zu Ihrer Anfrage oder Buchung"]
        },
        auto: {
          title: "Automatisch erhobene Daten",
          intro: "Beim Surfen auf der Website:",
          items: ["IP-Adresse", "Browsertyp", "besuchte Seiten", "Browsing-Dauer"],
          note: "Diese Informationen können zu statistischen Zwecken und zur Verbesserung der Website erhoben werden."
        }
      },
      purposes: {
        title: "4. Zwecke der Erhebung",
        intro: "Die erhobenen Daten werden verwendet für:",
        items: ["Beantwortung von Kontaktanfragen", "Verwaltung von Buchungsanfragen", "Organisation der angebotenen Erlebnisse", "Verbesserung des Website-Betriebs", "Gewährleistung der Website-Sicherheit"],
        note: "Die Daten werden nur im Rahmen der Aktivitäten von Bridge by UNYCEO France verwendet."
      },
      legal: {
        title: "5. Rechtsgrundlage der Verarbeitung",
        intro: "Die Daten werden auf folgenden Rechtsgrundlagen verarbeitet:",
        items: ["Einwilligung des Nutzers (Kontaktformular oder Anmeldung)", "Vertragserfüllung im Rahmen einer Buchung", "berechtigtes Interesse zur Verbesserung der Website und Servicequalität"]
      },
      recipients: {
        title: "6. Datenempfänger",
        intro: "Persönliche Daten sind nur bestimmt für:",
        items: ["UNYCEO FR", "technische Dienstleister, die für den Betrieb der Website erforderlich sind (Hosting, technische Dienste)"],
        note: "Daten werden niemals an Dritte zu kommerziellen Zwecken verkauft oder übertragen."
      },
      retention: {
        title: "7. Dauer der Datenspeicherung",
        content: ["Persönliche Daten werden nur so lange gespeichert, wie es für die Zwecke erforderlich ist, für die sie erhoben wurden.", "Im Allgemeinen:"],
        items: ["Kontaktdaten: bis zu 3 Jahre nach dem letzten Austausch", "Buchungsbezogene Daten: für die Dauer der administrativen und buchhalterischen Verwaltung"]
      },
      security: {
        title: "8. Datensicherheit",
        intro: "UNYCEO FR ergreift die notwendigen technischen und organisatorischen Maßnahmen zum Schutz persönlicher Daten gegen:",
        items: ["unbefugten Zugriff", "Verlust", "Offenlegung", "Änderung"]
      },
      rights: {
        title: "9. Nutzerrechte",
        intro: "Gemäß DSGVO haben Nutzer folgende Rechte:",
        items: [
          { name: "Auskunftsrecht", desc: "zu ihren Daten" },
          { name: "Berichtigungsrecht", desc: "Daten korrigieren" },
          { name: "Löschungsrecht", desc: "Daten löschen" },
          { name: "Widerspruchsrecht", desc: "der Verarbeitung widersprechen" },
          { name: "Recht auf Einschränkung", desc: "Verarbeitung einschränken" },
          { name: "Recht auf Datenübertragbarkeit", desc: "Daten abrufen" }
        ],
        note: "Zur Ausübung dieser Rechte kann eine Anfrage an den Website-Herausgeber gerichtet werden."
      },
      cookies: {
        title: "10. Cookies",
        intro: "Die Website kann Cookies verwenden, um:",
        items: ["die Benutzererfahrung zu verbessern", "die Nutzung der Website zu analysieren", "bestimmte Funktionen zu erleichtern"],
        note: "Ein Cookie ist eine kleine Datei, die auf dem Computer oder Gerät des Nutzers gespeichert wird.",
        config: "Nutzer können ihren Browser so konfigurieren, dass alle oder einige Cookies abgelehnt werden."
      },
      modification: {
        title: "11. Änderung der Datenschutzrichtlinie",
        content: ["UNYCEO FR behält sich das Recht vor, diese Datenschutzrichtlinie jederzeit zu ändern, um ihre Übereinstimmung mit geltendem Recht zu gewährleisten.", "Die Nutzer werden gebeten, diese Seite regelmäßig zu konsultieren."]
      }
    }
  },
  it: { 
    title: "Informativa sulla Privacy", 
    subtitle: "Protezione dei tuoi dati personali",
    legalNotice: "Il testo legale ufficiale è in francese. Questa traduzione è fornita solo a scopo informativo.",
    lastUpdate: "Ultimo aggiornamento: Dicembre 2025",
    sections: {
      intro: {
        title: "1. Introduzione",
        content: ["La presente informativa sulla privacy ha l'obiettivo di informare gli utenti del sito su come i loro dati personali vengono raccolti, utilizzati e protetti.", "UNYCEO FR, che gestisce il marchio Bridge by UNYCEO France, attribuisce particolare importanza alla protezione dei dati personali e si impegna a rispettare la normativa vigente, in particolare il Regolamento Generale sulla Protezione dei Dati (GDPR)."]
      },
      controller: {
        title: "2. Titolare del trattamento",
        intro: "I dati personali raccolti su questo sito sono trattati da:",
        company: "UNYCEO FR",
        address: ["25 rue de Ponthieu", "75008 Parigi", "Francia"],
        siren: "SIREN:"
      },
      collected: {
        title: "3. Dati raccolti",
        intro: "Durante l'utilizzo del sito, possono essere raccolti alcuni dati, tra cui:",
        direct: {
          title: "Dati forniti direttamente dall'utente",
          intro: "Quando compili un modulo di contatto o prenotazione:",
          items: ["nome e cognome", "indirizzo email", "numero di telefono", "informazioni relative alla tua richiesta o prenotazione"]
        },
        auto: {
          title: "Dati raccolti automaticamente",
          intro: "Durante la navigazione sul sito:",
          items: ["indirizzo IP", "tipo di browser", "pagine visitate", "durata della navigazione"],
          note: "Queste informazioni possono essere raccolte a fini statistici e per migliorare il sito."
        }
      },
      purposes: {
        title: "4. Finalità della raccolta",
        intro: "I dati raccolti sono utilizzati per:",
        items: ["rispondere alle richieste di contatto", "gestire le richieste di prenotazione", "organizzare le esperienze proposte", "migliorare il funzionamento del sito", "garantire la sicurezza del sito"],
        note: "I dati sono utilizzati solo nell'ambito delle attività di Bridge by UNYCEO France."
      },
      legal: {
        title: "5. Base giuridica del trattamento",
        intro: "I dati sono trattati sulle seguenti basi giuridiche:",
        items: ["il consenso dell'utente (modulo di contatto o iscrizione)", "l'esecuzione di un contratto nell'ambito di una prenotazione", "l'interesse legittimo per migliorare il sito e la qualità dei servizi"]
      },
      recipients: {
        title: "6. Destinatari dei dati",
        intro: "I dati personali sono destinati esclusivamente a:",
        items: ["UNYCEO FR", "i fornitori tecnici necessari al funzionamento del sito (hosting, servizi tecnici)"],
        note: "I dati non vengono mai venduti né ceduti a terzi per scopi commerciali."
      },
      retention: {
        title: "7. Periodo di conservazione dei dati",
        content: ["I dati personali sono conservati solo per il tempo necessario alle finalità per cui sono stati raccolti.", "In generale:"],
        items: ["dati di contatto: fino a 3 anni dopo l'ultimo scambio", "dati relativi alle prenotazioni: tempo necessario per la gestione amministrativa e contabile"]
      },
      security: {
        title: "8. Sicurezza dei dati",
        intro: "UNYCEO FR implementa le misure tecniche e organizzative necessarie per proteggere i dati personali contro:",
        items: ["accesso non autorizzato", "perdita", "divulgazione", "modifica"]
      },
      rights: {
        title: "9. Diritti degli utenti",
        intro: "Conformemente al GDPR, gli utenti hanno i seguenti diritti:",
        items: [
          { name: "Diritto di accesso", desc: "ai propri dati" },
          { name: "Diritto di rettifica", desc: "correggere i dati" },
          { name: "Diritto di cancellazione", desc: "cancellare i dati" },
          { name: "Diritto di opposizione", desc: "opporsi al trattamento" },
          { name: "Diritto alla limitazione", desc: "limitare il trattamento" },
          { name: "Diritto alla portabilità", desc: "recuperare i propri dati" }
        ],
        note: "Per esercitare questi diritti, è possibile inviare una richiesta all'editore del sito."
      },
      cookies: {
        title: "10. Cookie",
        intro: "Il sito può utilizzare cookie per:",
        items: ["migliorare l'esperienza utente", "analizzare l'utilizzo del sito", "facilitare alcune funzionalità"],
        note: "Un cookie è un piccolo file memorizzato sul computer o dispositivo dell'utente.",
        config: "L'utente può configurare il proprio browser per rifiutare tutti o parte dei cookie."
      },
      modification: {
        title: "11. Modifica dell'informativa sulla privacy",
        content: ["UNYCEO FR si riserva il diritto di modificare la presente informativa sulla privacy in qualsiasi momento per garantirne la conformità con la legislazione vigente.", "Gli utenti sono invitati a consultare regolarmente questa pagina."]
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
    <div className="font-dm text-ocean/80 leading-relaxed space-y-4">
      {children}
    </div>
  </motion.div>
);

const ConfidentialitePage = () => {
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
              <Shield className="text-sand" size={32} />
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
          
          {/* 1. Introduction */}
          <Section icon={Shield} title={s.intro.title} index={0}>
            {s.intro.content.map((p, i) => <p key={i}>{p}</p>)}
          </Section>

          {/* 2. Controller */}
          <Section icon={Building2} title={s.controller.title} index={1}>
            <p>{s.controller.intro}</p>
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-syne font-bold text-ocean text-lg mb-3">{s.controller.company}</h3>
              {s.controller.address.map((line, i) => <p key={i}>{line}</p>)}
              <p className="mt-3"><strong>{s.controller.siren}</strong> 953 646 577</p>
            </div>
          </Section>

          {/* 3. Collected */}
          <Section icon={Database} title={s.collected.title} index={2}>
            <p>{s.collected.intro}</p>
            <div className="bg-white rounded-xl p-6 border border-border mb-4">
              <h4 className="font-syne font-bold text-ocean mb-3">{s.collected.direct.title}</h4>
              <p className="mb-3">{s.collected.direct.intro}</p>
              <ul className="list-disc pl-5 space-y-1">
                {s.collected.direct.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 border border-border">
              <h4 className="font-syne font-bold text-ocean mb-3">{s.collected.auto.title}</h4>
              <p className="mb-3">{s.collected.auto.intro}</p>
              <ul className="list-disc pl-5 space-y-1">
                {s.collected.auto.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="mt-3 text-sm text-ocean/60">{s.collected.auto.note}</p>
            </div>
          </Section>

          {/* 4. Purposes */}
          <Section icon={Target} title={s.purposes.title} index={3}>
            <p>{s.purposes.intro}</p>
            <ul className="list-disc pl-5 space-y-2">
              {s.purposes.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="bg-ocean/5 p-4 rounded-xl mt-4">{s.purposes.note}</p>
          </Section>

          {/* 5. Legal */}
          <Section icon={Scale} title={s.legal.title} index={4}>
            <p>{s.legal.intro}</p>
            <ul className="list-disc pl-5 space-y-2">
              {s.legal.items.map((item, i) => <li key={i}><strong>{item.split('(')[0]}</strong>{item.includes('(') ? `(${item.split('(')[1]}` : ''}</li>)}
            </ul>
          </Section>

          {/* 6. Recipients */}
          <Section icon={Users} title={s.recipients.title} index={5}>
            <p>{s.recipients.intro}</p>
            <ul className="list-disc pl-5 space-y-2">
              {s.recipients.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500 mt-4">
              <strong>{s.recipients.note}</strong>
            </p>
          </Section>

          {/* 7. Retention */}
          <Section icon={Clock} title={s.retention.title} index={6}>
            {s.retention.content.map((p, i) => <p key={i}>{p}</p>)}
            <ul className="list-disc pl-5 space-y-2">
              {s.retention.items.map((item, i) => <li key={i}><strong>{item.split(':')[0]}:</strong>{item.split(':')[1]}</li>)}
            </ul>
          </Section>

          {/* 8. Security */}
          <Section icon={Lock} title={s.security.title} index={7}>
            <p>{s.security.intro}</p>
            <ul className="list-disc pl-5 space-y-2">
              {s.security.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </Section>

          {/* 9. Rights */}
          <Section icon={UserCheck} title={s.rights.title} index={8}>
            <p>{s.rights.intro}</p>
            <div className="grid sm:grid-cols-2 gap-3 my-4">
              {s.rights.items.map((item, i) => (
                <div key={i} className="bg-white p-3 rounded-lg border border-border">
                  <span className="font-medium text-ocean">{item.name}</span>
                  <p className="text-sm text-ocean/60">{item.desc}</p>
                </div>
              ))}
            </div>
            <p>{s.rights.note}</p>
          </Section>

          {/* 10. Cookies */}
          <Section icon={Cookie} title={s.cookies.title} index={9}>
            <p>{s.cookies.intro}</p>
            <ul className="list-disc pl-5 space-y-2">
              {s.cookies.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="bg-ocean/5 p-4 rounded-xl mt-4">{s.cookies.note}</p>
            <p>{s.cookies.config}</p>
          </Section>

          {/* 11. Modification */}
          <Section icon={RefreshCw} title={s.modification.title} index={10}>
            {s.modification.content.map((p, i) => <p key={i}>{p}</p>)}
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

export default ConfidentialitePage;
