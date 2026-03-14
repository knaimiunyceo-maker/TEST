import { motion } from "framer-motion";
import { FileText, Shield, Users, CreditCard, Calendar, AlertTriangle, Heart, Cloud, Briefcase, Camera, Lock, Scale } from "lucide-react";
import PageLayout from "./components/PageLayout";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: { 
    title: "Terms and Conditions", 
    subtitle: "THE BRIDGE — UNYCEO France",
    legalNotice: "The official legal text is in French. This translation is provided for information purposes only.",
    lastUpdate: "Last update: December 2025",
    sections: [
      { icon: "FileText", title: "1. Purpose and Scope", content: ["These Terms and Conditions define the terms of sale and delivery of services between UNYCEO France (hereinafter \"the Organizer\") and any natural or legal person making a reservation (hereinafter \"the Participant\").", "The experiences consist of themed stays in small groups in Morocco. Any reservation confirms the Participant's full and complete acceptance of these conditions."] },
      { icon: "Briefcase", title: "2. Nature of Experiences", content: ["The Organizer offers short stays based on specific themes (Self-Defense, Visual Storytelling, Language Practice).", "The program includes supervision, accommodation and group activities mentioned on the product sheet. Activities described as \"optional\" or \"off-program\" are not included in the base price."] },
      { icon: "Users", title: "3. Capacity and Group Size", content: ["To preserve exclusivity and quality of support, groups are limited to 10 participants.", "The Organizer reserves the right to close reservations once this quota is reached."] },
      { icon: "Calendar", title: "4. Booking and Confirmation Process", content: ["Selection: The Participant chooses their experience and dates on the website.", "Request: Submission of the completed booking form.", "Validation: The Organizer reviews the request subject to availability.", "Finalization: The booking becomes firm and final only after receipt of payment (deposit or full balance) and sending of a confirmation email by the Organizer."] },
      { icon: "CreditCard", title: "5. Pricing Conditions", content: ["Prices are indicated in Euros (€).", "Included: Logistical engineering, workshop supervision, accommodation.", "Excluded: International flights, transfers to destination (unless otherwise stated), personal insurance, unspecified meals, private expenses and optional activities on site."] },
      { icon: "CreditCard", title: "6. Payment Terms", content: ["Payment is made according to the terms specified at the time of booking. In case of non-payment within the specified deadlines, the Organizer reserves the right to cancel the booking without notice."] },
      { icon: "AlertTriangle", title: "7. Cancellation Policy by Participant", content: ["Any cancellation must be notified in writing.", "More than 14 days before departure: Refund of amounts paid, less administrative fees and actual costs already incurred with local service providers.", "Less than 14 days before departure: No refund can be guaranteed."] },
      { icon: "AlertTriangle", title: "8. Modification or Cancellation by Organizer", content: ["The Organizer may modify or cancel a stay in case of force majeure, security reasons, weather conditions or if the minimum number of participants required for the viability of the stay is not reached.", "In these cases, the Participant will be offered a postponement or full refund of amounts paid."] },
      { icon: "Heart", title: "9. Physical Fitness and Personal Responsibility", content: ["The Participant acknowledges that experiences may require physical commitment.", "Health declaration: The Participant certifies being in good health and fit for the chosen activities. They undertake to report any particular medical condition.", "Responsibility: The Organizer declines any responsibility in case of incident related to an undeclared physical condition or poor assessment by the Participant of their own capabilities."] },
      { icon: "Shield", title: "10. Risk Acceptance and Safety", content: ["The Participant is aware that certain outdoor or sports activities involve an inherent element of risk. By registering, they accept these risks and undertake to follow the safety instructions of the supervisors.", "Non-compliance with these instructions releases the Organizer from any liability."] },
      { icon: "Cloud", title: "11. Program Adaptability (Weather Clause)", content: ["The schedule is given for information purposes. The Organizer reserves the right to adjust the order of activities or replace a service with an equivalent one if conditions (weather, logistics, safety) require.", "These adaptations do not give rise to any compensation."] },
      { icon: "Briefcase", title: "12. Insurance and Personal Logistics", content: ["Each Participant is responsible for:", "Their insurance coverage (Assistance/Repatriation/Cancellation strongly recommended).", "Their travel documents (valid Passport, visa if necessary).", "Monitoring their personal belongings. The Organizer is not responsible for theft or loss of items."] },
      { icon: "Users", title: "13. Off-Program Activities (External Providers)", content: ["Any activity subscribed by the Participant outside the official framework defined by the Organizer is the sole responsibility of the external provider and cannot engage the Organizer's liability."] },
      { icon: "Users", title: "14. Code of Conduct", content: ["Mutual respect between participants, supervisors and local populations is required. The Organizer reserves the right to exclude, without refund, any participant whose behavior would compromise the safety or cohesion of the group."] },
      { icon: "Camera", title: "15. Image Rights", content: ["Audiovisual content may be produced during the stay for the promotion of the Organizer's activities.", "Unless the Participant explicitly objects before the start of the stay, they authorize the use of their image on marketing materials. The Participant has a right of withdrawal upon simple request."] },
      { icon: "Lock", title: "16. Data Protection (GDPR)", content: ["The data collected is used exclusively for booking management and is never transferred to third parties without prior consent."] },
      { icon: "Scale", title: "17. Disputes and Applicable Law", content: ["These Terms and Conditions are subject to French law. In case of dispute, an amicable solution will be preferred before any legal proceedings."] }
    ]
  },
  fr: { 
    title: "Conditions Générales de Vente", 
    subtitle: "THE BRIDGE — UNYCEO France",
    legalNotice: null,
    lastUpdate: "Dernière mise à jour : Décembre 2025",
    sections: [
      { icon: "FileText", title: "1. Objet et Champ d'Application", content: ["Les présentes CGV définissent les modalités de vente et de réalisation des prestations de services entre UNYCEO France (ci-après « l'Organisateur ») et toute personne physique ou morale procédant à une réservation (ci-après « le Participant »).", "Les expériences consistent en des séjours thématiques en petits groupes au Maroc. Toute réservation confirme l'adhésion pleine et entière du Participant aux présentes conditions."] },
      { icon: "Briefcase", title: "2. Nature des Expériences", content: ["L'Organisateur propose des séjours courts articulés autour de thématiques spécifiques (Self-Defense, Visual Storytelling, Language Practice).", "Le programme inclut l'encadrement, l'hébergement et les activités collectives mentionnés sur la fiche produit. Les activités dites « optionnelles » ou « hors programme » ne sont pas incluses dans le tarif de base."] },
      { icon: "Users", title: "3. Capacité et Taille des Groupes", content: ["Pour préserver l'exclusivité et la qualité de l'accompagnement, les groupes sont limités à 10 participants.", "L'Organisateur se réserve le droit de clore les réservations dès que ce quota est atteint."] },
      { icon: "Calendar", title: "4. Processus de Réservation et Confirmation", content: ["Sélection : Le Participant choisit son expérience et ses dates sur le site.", "Demande : Envoi du formulaire de réservation complété.", "Validation : L'Organisateur étudie la demande sous réserve de disponibilité.", "Finalisation : La réservation devient ferme et définitive uniquement après réception du paiement (acompte ou solde total) et l'envoi d'un email de confirmation par l'Organisateur."] },
      { icon: "CreditCard", title: "5. Conditions Tarifaires", content: ["Les prix sont indiqués en Euros (€).", "Inclus : Ingénierie logistique, encadrement des ateliers, hébergement.", "Exclus : Vols internationaux, transferts vers la destination (sauf mention contraire), assurances personnelles, repas non spécifiés, dépenses privées et activités optionnelles sur place."] },
      { icon: "CreditCard", title: "6. Modalités de Paiement", content: ["Le règlement s'effectue selon les modalités précisées lors de la réservation. À défaut de paiement dans les délais impartis, l'Organisateur se réserve le droit d'annuler la réservation sans préavis."] },
      { icon: "AlertTriangle", title: "7. Politique d'Annulation par le Participant", content: ["Toute annulation doit être notifiée par écrit.", "Plus de 14 jours avant le départ : Remboursement des sommes versées, déduction faite des frais de dossier et des frais réels déjà engagés auprès des prestataires locaux.", "Moins de 14 jours avant le départ : Aucun remboursement ne pourra être garanti."] },
      { icon: "AlertTriangle", title: "8. Modification ou Annulation par l'Organisateur", content: ["L'Organisateur peut modifier ou annuler un séjour en cas de force majeure, raisons de sécurité, conditions météo ou si le nombre minimum de participants requis pour la viabilité du séjour n'est pas atteint.", "Dans ces cas, le Participant se verra proposer un report ou un remboursement intégral des sommes versées."] },
      { icon: "Heart", title: "9. Aptitude Physique et Responsabilité Personnelle", content: ["Le Participant reconnaît que les expériences peuvent requérir un engagement physique.", "Déclaration de santé : Le Participant atteste être en bonne santé et apte aux activités choisies. Il s'engage à signaler toute condition médicale particulière.", "Responsabilité : L'Organisateur décline toute responsabilité en cas d'incident lié à une condition physique non déclarée ou à une mauvaise appréciation par le Participant de ses propres capacités."] },
      { icon: "Shield", title: "10. Acceptation des Risques et Sécurité", content: ["Le Participant est conscient que certaines activités en extérieur ou sportives comportent une part de risque inhérente. En s'inscrivant, il accepte ces risques et s'engage à respecter les consignes de sécurité des encadrants.", "Le non-respect de ces consignes dégage l'Organisateur de toute responsabilité."] },
      { icon: "Cloud", title: "11. Adaptabilité du Programme (Clause Météo)", content: ["Le planning est donné à titre indicatif. L'Organisateur se réserve le droit d'ajuster l'ordre des activités ou de remplacer une prestation par une équivalente si les conditions (météo, logistique, sécurité) l'exigent.", "Ces adaptations ne donnent lieu à aucun dédommagement."] },
      { icon: "Briefcase", title: "12. Assurances et Logistique Personnelle", content: ["Chaque Participant est responsable de :", "Sa couverture d'assurance (Assistance/Rapatriement/Annulation fortement recommandées).", "Ses documents de voyage (Passeport en cours de validité, visa si nécessaire).", "La surveillance de ses effets personnels. L'Organisateur n'est pas responsable des vols ou pertes d'objets."] },
      { icon: "Users", title: "13. Activités Hors Programme (Prestataires Externes)", content: ["Toute activité souscrite par le Participant en dehors du cadre officiel défini par l'Organisateur relève de la responsabilité exclusive du prestataire externe et ne saurait engager la responsabilité de l'Organisateur."] },
      { icon: "Users", title: "14. Code de Conduite", content: ["Un respect mutuel entre participants, encadrants et populations locales est exigé. L'Organisateur se réserve le droit d'exclure, sans remboursement, tout participant dont le comportement compromettrait la sécurité ou la cohésion du groupe."] },
      { icon: "Camera", title: "15. Droit à l'Image", content: ["Des contenus audiovisuels peuvent être réalisés durant le séjour pour la promotion des activités de l'Organisateur.", "Sauf opposition explicite du Participant avant le début du séjour, celui-ci autorise l'utilisation de son image sur les supports marketing. Le Participant dispose d'un droit de retrait sur simple demande."] },
      { icon: "Lock", title: "16. Protection des Données (RGPD)", content: ["Les données collectées sont utilisées exclusivement pour la gestion de la réservation et ne sont jamais cédées à des tiers sans consentement préalable."] },
      { icon: "Scale", title: "17. Litiges et Droit Applicable", content: ["Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera privilégiée avant toute procédure judiciaire."] }
    ]
  },
  es: { 
    title: "Términos y Condiciones", 
    subtitle: "THE BRIDGE — UNYCEO France",
    legalNotice: "El texto legal oficial está en francés. Esta traducción se proporciona únicamente con fines informativos.",
    lastUpdate: "Última actualización: Diciembre 2025",
    sections: [
      { icon: "FileText", title: "1. Objeto y Ámbito de Aplicación", content: ["Los presentes Términos y Condiciones definen las modalidades de venta y realización de servicios entre UNYCEO France (en adelante \"el Organizador\") y cualquier persona física o jurídica que realice una reserva (en adelante \"el Participante\").", "Las experiencias consisten en estancias temáticas en pequeños grupos en Marruecos. Cualquier reserva confirma la aceptación plena y total del Participante a estas condiciones."] },
      { icon: "Briefcase", title: "2. Naturaleza de las Experiencias", content: ["El Organizador ofrece estancias cortas articuladas en torno a temas específicos (Defensa Personal, Storytelling Visual, Práctica de Idiomas).", "El programa incluye supervisión, alojamiento y actividades grupales mencionadas en la ficha del producto. Las actividades descritas como \"opcionales\" o \"fuera de programa\" no están incluidas en el precio base."] },
      { icon: "Users", title: "3. Capacidad y Tamaño de Grupos", content: ["Para preservar la exclusividad y calidad del acompañamiento, los grupos están limitados a 10 participantes.", "El Organizador se reserva el derecho de cerrar las reservas una vez alcanzado este cupo."] },
      { icon: "Calendar", title: "4. Proceso de Reserva y Confirmación", content: ["Selección: El Participante elige su experiencia y fechas en el sitio web.", "Solicitud: Envío del formulario de reserva completado.", "Validación: El Organizador estudia la solicitud sujeta a disponibilidad.", "Finalización: La reserva se vuelve firme y definitiva únicamente después de recibir el pago (depósito o saldo total) y el envío de un email de confirmación por el Organizador."] },
      { icon: "CreditCard", title: "5. Condiciones de Precio", content: ["Los precios se indican en Euros (€).", "Incluido: Ingeniería logística, supervisión de talleres, alojamiento.", "Excluido: Vuelos internacionales, traslados al destino (salvo indicación contraria), seguros personales, comidas no especificadas, gastos privados y actividades opcionales en el lugar."] },
      { icon: "CreditCard", title: "6. Modalidades de Pago", content: ["El pago se realiza según las modalidades especificadas en el momento de la reserva. En caso de impago dentro de los plazos establecidos, el Organizador se reserva el derecho de cancelar la reserva sin previo aviso."] },
      { icon: "AlertTriangle", title: "7. Política de Cancelación por el Participante", content: ["Cualquier cancelación debe notificarse por escrito.", "Más de 14 días antes de la salida: Reembolso de las cantidades pagadas, menos gastos administrativos y costos reales ya incurridos con proveedores locales.", "Menos de 14 días antes de la salida: No se puede garantizar ningún reembolso."] },
      { icon: "AlertTriangle", title: "8. Modificación o Cancelación por el Organizador", content: ["El Organizador puede modificar o cancelar una estancia en caso de fuerza mayor, razones de seguridad, condiciones climáticas o si no se alcanza el número mínimo de participantes requerido para la viabilidad de la estancia.", "En estos casos, se ofrecerá al Participante un aplazamiento o reembolso total de las cantidades pagadas."] },
      { icon: "Heart", title: "9. Aptitud Física y Responsabilidad Personal", content: ["El Participante reconoce que las experiencias pueden requerir compromiso físico.", "Declaración de salud: El Participante certifica estar en buena salud y apto para las actividades elegidas. Se compromete a informar cualquier condición médica particular.", "Responsabilidad: El Organizador declina toda responsabilidad en caso de incidente relacionado con una condición física no declarada o mala evaluación por parte del Participante de sus propias capacidades."] },
      { icon: "Shield", title: "10. Aceptación de Riesgos y Seguridad", content: ["El Participante es consciente de que ciertas actividades al aire libre o deportivas conllevan un riesgo inherente. Al inscribirse, acepta estos riesgos y se compromete a seguir las instrucciones de seguridad de los supervisores.", "El incumplimiento de estas instrucciones libera al Organizador de toda responsabilidad."] },
      { icon: "Cloud", title: "11. Adaptabilidad del Programa (Cláusula Meteorológica)", content: ["El horario se proporciona a título informativo. El Organizador se reserva el derecho de ajustar el orden de las actividades o reemplazar un servicio por uno equivalente si las condiciones (clima, logística, seguridad) lo requieren.", "Estas adaptaciones no dan derecho a ninguna compensación."] },
      { icon: "Briefcase", title: "12. Seguros y Logística Personal", content: ["Cada Participante es responsable de:", "Su cobertura de seguro (Asistencia/Repatriación/Cancelación altamente recomendadas).", "Sus documentos de viaje (Pasaporte válido, visa si es necesario).", "La vigilancia de sus pertenencias personales. El Organizador no es responsable de robos o pérdidas de objetos."] },
      { icon: "Users", title: "13. Actividades Fuera de Programa (Proveedores Externos)", content: ["Cualquier actividad contratada por el Participante fuera del marco oficial definido por el Organizador es responsabilidad exclusiva del proveedor externo y no compromete la responsabilidad del Organizador."] },
      { icon: "Users", title: "14. Código de Conducta", content: ["Se requiere respeto mutuo entre participantes, supervisores y poblaciones locales. El Organizador se reserva el derecho de excluir, sin reembolso, a cualquier participante cuyo comportamiento comprometa la seguridad o cohesión del grupo."] },
      { icon: "Camera", title: "15. Derechos de Imagen", content: ["Se pueden producir contenidos audiovisuales durante la estancia para la promoción de las actividades del Organizador.", "A menos que el Participante se oponga explícitamente antes del inicio de la estancia, autoriza el uso de su imagen en materiales de marketing. El Participante tiene derecho de retiro mediante simple solicitud."] },
      { icon: "Lock", title: "16. Protección de Datos (RGPD)", content: ["Los datos recopilados se utilizan exclusivamente para la gestión de reservas y nunca se ceden a terceros sin consentimiento previo."] },
      { icon: "Scale", title: "17. Disputas y Ley Aplicable", content: ["Estos Términos y Condiciones están sujetos a la ley francesa. En caso de disputa, se preferirá una solución amistosa antes de cualquier procedimiento legal."] }
    ]
  },
  pt: { 
    title: "Termos e Condições", 
    subtitle: "THE BRIDGE — UNYCEO France",
    legalNotice: "O texto legal oficial está em francês. Esta tradução é fornecida apenas para fins informativos.",
    lastUpdate: "Última atualização: Dezembro 2025",
    sections: [
      { icon: "FileText", title: "1. Objeto e Âmbito de Aplicação", content: ["Os presentes Termos e Condições definem as modalidades de venda e realização de serviços entre UNYCEO France (doravante \"o Organizador\") e qualquer pessoa física ou jurídica que faça uma reserva (doravante \"o Participante\").", "As experiências consistem em estadias temáticas em pequenos grupos no Marrocos. Qualquer reserva confirma a aceitação plena e total do Participante a estas condições."] },
      { icon: "Briefcase", title: "2. Natureza das Experiências", content: ["O Organizador oferece estadias curtas articuladas em torno de temas específicos (Defesa Pessoal, Storytelling Visual, Prática de Idiomas).", "O programa inclui supervisão, alojamento e atividades coletivas mencionadas na ficha do produto. As atividades descritas como \"opcionais\" ou \"fora do programa\" não estão incluídas no preço base."] },
      { icon: "Users", title: "3. Capacidade e Tamanho dos Grupos", content: ["Para preservar a exclusividade e qualidade do acompanhamento, os grupos são limitados a 10 participantes.", "O Organizador reserva-se o direito de encerrar as reservas assim que este limite for atingido."] },
      { icon: "Calendar", title: "4. Processo de Reserva e Confirmação", content: ["Seleção: O Participante escolhe sua experiência e datas no site.", "Solicitação: Envio do formulário de reserva preenchido.", "Validação: O Organizador analisa o pedido sujeito a disponibilidade.", "Finalização: A reserva torna-se firme e definitiva apenas após o recebimento do pagamento (depósito ou saldo total) e envio de um email de confirmação pelo Organizador."] },
      { icon: "CreditCard", title: "5. Condições de Preço", content: ["Os preços são indicados em Euros (€).", "Incluído: Engenharia logística, supervisão de workshops, alojamento.", "Excluído: Voos internacionais, transferências para o destino (salvo indicação em contrário), seguros pessoais, refeições não especificadas, despesas privadas e atividades opcionais no local."] },
      { icon: "CreditCard", title: "6. Modalidades de Pagamento", content: ["O pagamento é feito de acordo com as modalidades especificadas no momento da reserva. Em caso de não pagamento dentro dos prazos estabelecidos, o Organizador reserva-se o direito de cancelar a reserva sem aviso prévio."] },
      { icon: "AlertTriangle", title: "7. Política de Cancelamento pelo Participante", content: ["Qualquer cancelamento deve ser notificado por escrito.", "Mais de 14 dias antes da partida: Reembolso dos valores pagos, deduzidas as taxas administrativas e custos reais já incorridos com prestadores locais.", "Menos de 14 dias antes da partida: Nenhum reembolso pode ser garantido."] },
      { icon: "AlertTriangle", title: "8. Modificação ou Cancelamento pelo Organizador", content: ["O Organizador pode modificar ou cancelar uma estadia em caso de força maior, razões de segurança, condições climáticas ou se o número mínimo de participantes necessário para a viabilidade da estadia não for atingido.", "Nestes casos, será oferecido ao Participante um adiamento ou reembolso total dos valores pagos."] },
      { icon: "Heart", title: "9. Aptidão Física e Responsabilidade Pessoal", content: ["O Participante reconhece que as experiências podem exigir compromisso físico.", "Declaração de saúde: O Participante atesta estar em boa saúde e apto para as atividades escolhidas. Compromete-se a informar qualquer condição médica particular.", "Responsabilidade: O Organizador declina toda responsabilidade em caso de incidente relacionado a uma condição física não declarada ou má avaliação por parte do Participante de suas próprias capacidades."] },
      { icon: "Shield", title: "10. Aceitação de Riscos e Segurança", content: ["O Participante está ciente de que certas atividades ao ar livre ou esportivas envolvem um risco inerente. Ao se inscrever, aceita esses riscos e compromete-se a seguir as instruções de segurança dos supervisores.", "O não cumprimento dessas instruções libera o Organizador de toda responsabilidade."] },
      { icon: "Cloud", title: "11. Adaptabilidade do Programa (Cláusula Meteorológica)", content: ["O cronograma é fornecido a título informativo. O Organizador reserva-se o direito de ajustar a ordem das atividades ou substituir um serviço por um equivalente se as condições (clima, logística, segurança) exigirem.", "Essas adaptações não dão direito a nenhuma compensação."] },
      { icon: "Briefcase", title: "12. Seguros e Logística Pessoal", content: ["Cada Participante é responsável por:", "Sua cobertura de seguro (Assistência/Repatriação/Cancelamento fortemente recomendadas).", "Seus documentos de viagem (Passaporte válido, visto se necessário).", "A vigilância de seus pertences pessoais. O Organizador não é responsável por roubos ou perdas de objetos."] },
      { icon: "Users", title: "13. Atividades Fora do Programa (Prestadores Externos)", content: ["Qualquer atividade contratada pelo Participante fora do quadro oficial definido pelo Organizador é de responsabilidade exclusiva do prestador externo e não compromete a responsabilidade do Organizador."] },
      { icon: "Users", title: "14. Código de Conduta", content: ["O respeito mútuo entre participantes, supervisores e populações locais é exigido. O Organizador reserva-se o direito de excluir, sem reembolso, qualquer participante cujo comportamento comprometa a segurança ou coesão do grupo."] },
      { icon: "Camera", title: "15. Direitos de Imagem", content: ["Conteúdos audiovisuais podem ser produzidos durante a estadia para promoção das atividades do Organizador.", "A menos que o Participante se oponha explicitamente antes do início da estadia, autoriza o uso de sua imagem em materiais de marketing. O Participante tem direito de retirada mediante simples solicitação."] },
      { icon: "Lock", title: "16. Proteção de Dados (RGPD)", content: ["Os dados coletados são utilizados exclusivamente para gestão de reservas e nunca são cedidos a terceiros sem consentimento prévio."] },
      { icon: "Scale", title: "17. Disputas e Lei Aplicável", content: ["Estes Termos e Condições estão sujeitos à lei francesa. Em caso de disputa, uma solução amigável será preferida antes de qualquer procedimento legal."] }
    ]
  },
  de: { 
    title: "Allgemeine Geschäftsbedingungen", 
    subtitle: "THE BRIDGE — UNYCEO France",
    legalNotice: "Der offizielle Rechtstext ist auf Französisch. Diese Übersetzung dient nur zu Informationszwecken.",
    lastUpdate: "Letzte Aktualisierung: Dezember 2025",
    sections: [
      { icon: "FileText", title: "1. Gegenstand und Geltungsbereich", content: ["Diese AGB definieren die Verkaufs- und Leistungsbedingungen zwischen UNYCEO France (nachfolgend \"der Veranstalter\") und jeder natürlichen oder juristischen Person, die eine Buchung vornimmt (nachfolgend \"der Teilnehmer\").", "Die Erlebnisse bestehen aus thematischen Aufenthalten in kleinen Gruppen in Marokko. Jede Buchung bestätigt die vollständige Zustimmung des Teilnehmers zu diesen Bedingungen."] },
      { icon: "Briefcase", title: "2. Art der Erlebnisse", content: ["Der Veranstalter bietet Kurzaufenthalte zu spezifischen Themen an (Selbstverteidigung, Visual Storytelling, Sprachpraxis).", "Das Programm umfasst Betreuung, Unterkunft und Gruppenaktivitäten, die auf dem Produktblatt erwähnt sind. Als \"optional\" oder \"außerhalb des Programms\" bezeichnete Aktivitäten sind nicht im Grundpreis enthalten."] },
      { icon: "Users", title: "3. Kapazität und Gruppengröße", content: ["Um Exklusivität und Qualität der Betreuung zu gewährleisten, sind die Gruppen auf 10 Teilnehmer begrenzt.", "Der Veranstalter behält sich das Recht vor, Buchungen zu schließen, sobald dieses Kontingent erreicht ist."] },
      { icon: "Calendar", title: "4. Buchungs- und Bestätigungsprozess", content: ["Auswahl: Der Teilnehmer wählt sein Erlebnis und seine Termine auf der Website.", "Anfrage: Einreichung des ausgefüllten Buchungsformulars.", "Validierung: Der Veranstalter prüft die Anfrage vorbehaltlich Verfügbarkeit.", "Abschluss: Die Buchung wird erst nach Zahlungseingang (Anzahlung oder Gesamtbetrag) und Versand einer Bestätigungs-E-Mail durch den Veranstalter verbindlich."] },
      { icon: "CreditCard", title: "5. Preisbedingungen", content: ["Preise sind in Euro (€) angegeben.", "Inbegriffen: Logistische Planung, Workshop-Betreuung, Unterkunft.", "Nicht inbegriffen: Internationale Flüge, Transfers zum Zielort (sofern nicht anders angegeben), persönliche Versicherungen, nicht spezifizierte Mahlzeiten, private Ausgaben und optionale Aktivitäten vor Ort."] },
      { icon: "CreditCard", title: "6. Zahlungsmodalitäten", content: ["Die Zahlung erfolgt gemäß den bei der Buchung angegebenen Modalitäten. Bei Nichtzahlung innerhalb der festgelegten Fristen behält sich der Veranstalter das Recht vor, die Buchung ohne Vorankündigung zu stornieren."] },
      { icon: "AlertTriangle", title: "7. Stornierungsrichtlinie durch den Teilnehmer", content: ["Jede Stornierung muss schriftlich mitgeteilt werden.", "Mehr als 14 Tage vor Abreise: Erstattung der gezahlten Beträge, abzüglich Verwaltungsgebühren und bereits bei lokalen Dienstleistern angefallenen Kosten.", "Weniger als 14 Tage vor Abreise: Keine Erstattung kann garantiert werden."] },
      { icon: "AlertTriangle", title: "8. Änderung oder Stornierung durch den Veranstalter", content: ["Der Veranstalter kann einen Aufenthalt bei höherer Gewalt, Sicherheitsgründen, Wetterbedingungen oder wenn die für die Durchführbarkeit erforderliche Mindestteilnehmerzahl nicht erreicht wird, ändern oder stornieren.", "In diesen Fällen wird dem Teilnehmer eine Verschiebung oder vollständige Erstattung angeboten."] },
      { icon: "Heart", title: "9. Körperliche Eignung und persönliche Verantwortung", content: ["Der Teilnehmer erkennt an, dass die Erlebnisse körperlichen Einsatz erfordern können.", "Gesundheitserklärung: Der Teilnehmer bestätigt, bei guter Gesundheit zu sein und für die gewählten Aktivitäten geeignet zu sein. Er verpflichtet sich, besondere medizinische Bedingungen zu melden.", "Verantwortung: Der Veranstalter lehnt jede Verantwortung bei Vorfällen ab, die auf einen nicht gemeldeten körperlichen Zustand oder eine fehlerhafte Einschätzung der eigenen Fähigkeiten durch den Teilnehmer zurückzuführen sind."] },
      { icon: "Shield", title: "10. Risikoakzeptanz und Sicherheit", content: ["Der Teilnehmer ist sich bewusst, dass bestimmte Outdoor- oder Sportaktivitäten ein inhärentes Risiko beinhalten. Mit der Anmeldung akzeptiert er diese Risiken und verpflichtet sich, die Sicherheitsanweisungen der Betreuer zu befolgen.", "Die Nichteinhaltung dieser Anweisungen befreit den Veranstalter von jeder Haftung."] },
      { icon: "Cloud", title: "11. Programmflexibilität (Wetterklausel)", content: ["Der Zeitplan wird zu Informationszwecken angegeben. Der Veranstalter behält sich das Recht vor, die Reihenfolge der Aktivitäten anzupassen oder eine Leistung durch eine gleichwertige zu ersetzen, wenn die Bedingungen (Wetter, Logistik, Sicherheit) dies erfordern.", "Diese Anpassungen berechtigen nicht zu einer Entschädigung."] },
      { icon: "Briefcase", title: "12. Versicherung und persönliche Logistik", content: ["Jeder Teilnehmer ist verantwortlich für:", "Seinen Versicherungsschutz (Assistenz/Rückführung/Stornierung dringend empfohlen).", "Seine Reisedokumente (gültiger Reisepass, Visum falls erforderlich).", "Die Überwachung seiner persönlichen Gegenstände. Der Veranstalter ist nicht für Diebstahl oder Verlust von Gegenständen verantwortlich."] },
      { icon: "Users", title: "13. Aktivitäten außerhalb des Programms (Externe Anbieter)", content: ["Jede vom Teilnehmer außerhalb des vom Veranstalter definierten offiziellen Rahmens gebuchte Aktivität liegt in der alleinigen Verantwortung des externen Anbieters und kann die Haftung des Veranstalters nicht begründen."] },
      { icon: "Users", title: "14. Verhaltenskodex", content: ["Gegenseitiger Respekt zwischen Teilnehmern, Betreuern und lokaler Bevölkerung ist erforderlich. Der Veranstalter behält sich das Recht vor, jeden Teilnehmer ohne Erstattung auszuschließen, dessen Verhalten die Sicherheit oder den Zusammenhalt der Gruppe gefährden würde."] },
      { icon: "Camera", title: "15. Bildrechte", content: ["Während des Aufenthalts können audiovisuelle Inhalte zur Förderung der Aktivitäten des Veranstalters erstellt werden.", "Sofern der Teilnehmer nicht ausdrücklich vor Beginn des Aufenthalts widerspricht, erlaubt er die Verwendung seines Bildes in Marketingmaterialien. Der Teilnehmer hat ein Widerrufsrecht auf einfache Anfrage."] },
      { icon: "Lock", title: "16. Datenschutz (DSGVO)", content: ["Die gesammelten Daten werden ausschließlich für die Buchungsverwaltung verwendet und niemals ohne vorherige Zustimmung an Dritte weitergegeben."] },
      { icon: "Scale", title: "17. Streitigkeiten und anwendbares Recht", content: ["Diese AGB unterliegen französischem Recht. Im Streitfall wird eine gütliche Lösung vor jedem Gerichtsverfahren bevorzugt."] }
    ]
  },
  it: { 
    title: "Termini e Condizioni", 
    subtitle: "THE BRIDGE — UNYCEO France",
    legalNotice: "Il testo legale ufficiale è in francese. Questa traduzione è fornita solo a scopo informativo.",
    lastUpdate: "Ultimo aggiornamento: Dicembre 2025",
    sections: [
      { icon: "FileText", title: "1. Oggetto e Ambito di Applicazione", content: ["I presenti Termini e Condizioni definiscono le modalità di vendita e realizzazione dei servizi tra UNYCEO France (di seguito \"l'Organizzatore\") e qualsiasi persona fisica o giuridica che effettua una prenotazione (di seguito \"il Partecipante\").", "Le esperienze consistono in soggiorni tematici in piccoli gruppi in Marocco. Qualsiasi prenotazione conferma l'accettazione piena e completa del Partecipante a queste condizioni."] },
      { icon: "Briefcase", title: "2. Natura delle Esperienze", content: ["L'Organizzatore offre soggiorni brevi articolati su temi specifici (Autodifesa, Visual Storytelling, Pratica Linguistica).", "Il programma include supervisione, alloggio e attività di gruppo menzionate nella scheda prodotto. Le attività descritte come \"opzionali\" o \"fuori programma\" non sono incluse nel prezzo base."] },
      { icon: "Users", title: "3. Capacità e Dimensione dei Gruppi", content: ["Per preservare l'esclusività e la qualità dell'accompagnamento, i gruppi sono limitati a 10 partecipanti.", "L'Organizzatore si riserva il diritto di chiudere le prenotazioni una volta raggiunto questo limite."] },
      { icon: "Calendar", title: "4. Processo di Prenotazione e Conferma", content: ["Selezione: Il Partecipante sceglie la sua esperienza e le date sul sito web.", "Richiesta: Invio del modulo di prenotazione compilato.", "Validazione: L'Organizzatore esamina la richiesta in base alla disponibilità.", "Finalizzazione: La prenotazione diventa ferma e definitiva solo dopo il ricevimento del pagamento (acconto o saldo totale) e l'invio di un'email di conferma da parte dell'Organizzatore."] },
      { icon: "CreditCard", title: "5. Condizioni di Prezzo", content: ["I prezzi sono indicati in Euro (€).", "Incluso: Ingegneria logistica, supervisione dei workshop, alloggio.", "Escluso: Voli internazionali, trasferimenti alla destinazione (salvo diversa indicazione), assicurazioni personali, pasti non specificati, spese private e attività opzionali sul posto."] },
      { icon: "CreditCard", title: "6. Modalità di Pagamento", content: ["Il pagamento viene effettuato secondo le modalità specificate al momento della prenotazione. In caso di mancato pagamento entro i termini stabiliti, l'Organizzatore si riserva il diritto di annullare la prenotazione senza preavviso."] },
      { icon: "AlertTriangle", title: "7. Politica di Cancellazione da parte del Partecipante", content: ["Qualsiasi cancellazione deve essere notificata per iscritto.", "Più di 14 giorni prima della partenza: Rimborso degli importi pagati, dedotte le spese amministrative e i costi effettivi già sostenuti con i fornitori locali.", "Meno di 14 giorni prima della partenza: Nessun rimborso può essere garantito."] },
      { icon: "AlertTriangle", title: "8. Modifica o Cancellazione da parte dell'Organizzatore", content: ["L'Organizzatore può modificare o annullare un soggiorno in caso di forza maggiore, motivi di sicurezza, condizioni meteorologiche o se non viene raggiunto il numero minimo di partecipanti necessario per la fattibilità del soggiorno.", "In questi casi, al Partecipante verrà offerto un rinvio o un rimborso totale degli importi pagati."] },
      { icon: "Heart", title: "9. Idoneità Fisica e Responsabilità Personale", content: ["Il Partecipante riconosce che le esperienze possono richiedere impegno fisico.", "Dichiarazione di salute: Il Partecipante attesta di essere in buona salute e idoneo alle attività scelte. Si impegna a segnalare qualsiasi condizione medica particolare.", "Responsabilità: L'Organizzatore declina ogni responsabilità in caso di incidente legato a una condizione fisica non dichiarata o a una cattiva valutazione da parte del Partecipante delle proprie capacità."] },
      { icon: "Shield", title: "10. Accettazione dei Rischi e Sicurezza", content: ["Il Partecipante è consapevole che alcune attività all'aperto o sportive comportano un rischio intrinseco. Iscrivendosi, accetta questi rischi e si impegna a seguire le istruzioni di sicurezza dei supervisori.", "Il mancato rispetto di queste istruzioni solleva l'Organizzatore da ogni responsabilità."] },
      { icon: "Cloud", title: "11. Adattabilità del Programma (Clausola Meteo)", content: ["Il programma è fornito a titolo indicativo. L'Organizzatore si riserva il diritto di modificare l'ordine delle attività o sostituire un servizio con uno equivalente se le condizioni (meteo, logistica, sicurezza) lo richiedono.", "Questi adattamenti non danno diritto ad alcun risarcimento."] },
      { icon: "Briefcase", title: "12. Assicurazioni e Logistica Personale", content: ["Ogni Partecipante è responsabile di:", "La propria copertura assicurativa (Assistenza/Rimpatrio/Cancellazione fortemente raccomandate).", "I propri documenti di viaggio (Passaporto valido, visto se necessario).", "La sorveglianza dei propri effetti personali. L'Organizzatore non è responsabile per furti o perdite di oggetti."] },
      { icon: "Users", title: "13. Attività Fuori Programma (Fornitori Esterni)", content: ["Qualsiasi attività sottoscritta dal Partecipante al di fuori del quadro ufficiale definito dall'Organizzatore è di esclusiva responsabilità del fornitore esterno e non può coinvolgere la responsabilità dell'Organizzatore."] },
      { icon: "Users", title: "14. Codice di Condotta", content: ["Il rispetto reciproco tra partecipanti, supervisori e popolazioni locali è richiesto. L'Organizzatore si riserva il diritto di escludere, senza rimborso, qualsiasi partecipante il cui comportamento comprometta la sicurezza o la coesione del gruppo."] },
      { icon: "Camera", title: "15. Diritti di Immagine", content: ["Durante il soggiorno possono essere prodotti contenuti audiovisivi per la promozione delle attività dell'Organizzatore.", "A meno che il Partecipante non si opponga esplicitamente prima dell'inizio del soggiorno, autorizza l'uso della sua immagine su materiali di marketing. Il Partecipante ha diritto di revoca su semplice richiesta."] },
      { icon: "Lock", title: "16. Protezione dei Dati (GDPR)", content: ["I dati raccolti sono utilizzati esclusivamente per la gestione delle prenotazioni e non vengono mai ceduti a terzi senza previo consenso."] },
      { icon: "Scale", title: "17. Controversie e Legge Applicabile", content: ["I presenti Termini e Condizioni sono soggetti alla legge francese. In caso di controversia, si preferirà una soluzione amichevole prima di qualsiasi procedimento legale."] }
    ]
  }
};

const iconMap = {
  FileText, Shield, Users, CreditCard, Calendar, AlertTriangle, Heart, Cloud, Briefcase, Camera, Lock, Scale
};

const Section = ({ icon, title, children, index }) => {
  const Icon = iconMap[icon] || FileText;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
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
};

const CGVPage = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.fr;
  
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-ocean to-ocean/90 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="text-sand" size={32} />
            </div>
            <h1 className="font-syne font-black text-3xl sm:text-4xl lg:text-5xl mb-4">
              {t.title}
            </h1>
            <p className="font-dm text-white/80 text-lg">{t.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 bg-warmwhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Legal notice for non-French users */}
          {t.legalNotice && (
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="font-dm text-blue-700 text-sm">ℹ️ {t.legalNotice}</p>
            </div>
          )}
          
          {/* Dynamic sections */}
          {t.sections.map((section, i) => (
            <Section key={i} icon={section.icon} title={section.title} index={i}>
              {section.content.map((paragraph, j) => (
                <p key={j} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </Section>
          ))}

          {/* Footer note */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="font-dm text-ocean/60 text-sm">{t.lastUpdate}</p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CGVPage;
