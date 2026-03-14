import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Target, MapPin, Calendar, User, Mail, Phone, 
  ArrowRight, Check, Shield, Languages, Camera, Gift,
  ChevronDown, ChevronUp, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import PageLayout from "./components/PageLayout";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";
import { useLanguage } from "../LanguageContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ===== TRANSLATIONS =====
const bookPageTranslations = {
  en: {
    hero: { title: "Book Your Experience", subtitle: "Complete the steps below to send your request." },
    step1: { title: "Choose Your Experience" },
    step2: { title: "Choose City", courseType: "Course Type" },
    step3: { title: "Select Dates", duration: "Duration", startDate: "Start Date", selectWeekend: "Select a Weekend" },
    step4: { 
      title: "Your Information",
      fullName: "Full Name", fullNamePlaceholder: "Enter your full name",
      email: "Email Address", emailPlaceholder: "your@email.com",
      whatsapp: "WhatsApp Number",
      message: "Additional Message (optional)", messagePlaceholder: "Dietary requirements, questions...",
      acceptTerms: "I accept the", termsLink: "Terms and Conditions",
      acceptData: "I agree to the processing of my personal data according to the", privacyLink: "Privacy Policy"
    },
    summary: {
      title: "Summary", experience: "Experience", city: "City", course: "Course", 
      dates: "Dates", duration: "Duration", price: "Price", from: "From"
    },
    buttons: { next: "Next", previous: "Previous", submit: "Send Request", submitting: "Sending..." },
    validation: {
      nameRequired: "Name is required",
      emailRequired: "Email address is required",
      emailInvalid: "Invalid email format",
      emailBlocked: "Please use a valid email address",
      phoneRequired: "WhatsApp number is required",
      phoneInvalid: "Invalid or incomplete phone number",
      acceptTerms: "You must accept the Terms and Conditions",
      acceptData: "You must accept data processing"
    },
    toast: {
      successTitle: "Request sent successfully!",
      successDesc: "We will contact you shortly.",
      errorTitle: "Sending failed",
      errorDesc: "Please try again later."
    },
    experiences: {
      "self-defense": "Self-Defense Weekend",
      "language": "Intensive English Course",
      "storytelling": "Visual Storytelling Weekend"
    },
    courseTypes: {
      "general": "General English", "toefl-ibt": "TOEFL iBT", "toefl-itp": "TOEFL ITP",
      "ielts-academic": "IELTS Academic", "ielts-general": "IELTS General", "business": "Business English"
    },
    durations: {
      "weekend": "Weekend (2 nights / 3 days)", "5days": "5 Days", "7days": "7 Days / 6 Nights",
      "1week": "1 Week", "2weeks": "2 Weeks", "3weeks": "3 Weeks", "4weeks": "4 Weeks",
      "5weeks": "5 Weeks", "6weeks": "6 Weeks", "7weeks": "7 Weeks", "8weeks": "8 Weeks"
    },
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    monthsFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    weekendCalendar: { available: "Available", unavailable: "Unavailable", selectBtn: "Select" },
    earlyBird: { title: "Early Bird", discount: "discount applied!" }
  },
  fr: {
    hero: { title: "Réserver votre expérience", subtitle: "Complétez les étapes ci-dessous pour envoyer votre demande." },
    step1: { title: "Choisissez votre expérience" },
    step2: { title: "Choisissez la ville", courseType: "Type de cours" },
    step3: { title: "Sélectionnez les dates", duration: "Durée", startDate: "Date de début", selectWeekend: "Sélectionnez un weekend" },
    step4: { 
      title: "Vos informations",
      fullName: "Nom complet", fullNamePlaceholder: "Entrez votre nom complet",
      email: "Adresse email", emailPlaceholder: "votre@email.com",
      whatsapp: "Numéro WhatsApp",
      message: "Message supplémentaire (optionnel)", messagePlaceholder: "Régime alimentaire, questions...",
      acceptTerms: "J'accepte les", termsLink: "Conditions Générales de Vente",
      acceptData: "J'accepte le traitement de mes données selon la", privacyLink: "Politique de confidentialité"
    },
    summary: {
      title: "Récapitulatif", experience: "Expérience", city: "Ville", course: "Cours", 
      dates: "Dates", duration: "Durée", price: "Prix", from: "À partir de"
    },
    buttons: { next: "Suivant", previous: "Précédent", submit: "Envoyer la demande", submitting: "Envoi en cours..." },
    validation: {
      nameRequired: "Le nom est requis",
      emailRequired: "L'adresse email est requise",
      emailInvalid: "Format d'email invalide",
      emailBlocked: "Veuillez utiliser une adresse email valide",
      phoneRequired: "Le numéro WhatsApp est requis",
      phoneInvalid: "Numéro de téléphone invalide ou incomplet",
      acceptTerms: "Vous devez accepter les CGV",
      acceptData: "Vous devez accepter le traitement des données"
    },
    toast: {
      successTitle: "Demande envoyée avec succès !",
      successDesc: "Nous vous contacterons très prochainement.",
      errorTitle: "Échec de l'envoi",
      errorDesc: "Veuillez réessayer plus tard."
    },
    experiences: {
      "self-defense": "Self-Defense Weekend",
      "language": "Cours d'Anglais Intensif",
      "storytelling": "Visual Storytelling Weekend"
    },
    courseTypes: {
      "general": "Anglais Général", "toefl-ibt": "TOEFL iBT", "toefl-itp": "TOEFL ITP",
      "ielts-academic": "IELTS Academic", "ielts-general": "IELTS General", "business": "Business English"
    },
    durations: {
      "weekend": "Weekend (2 nuits / 3 jours)", "5days": "5 Jours", "7days": "7 Jours / 6 Nuits",
      "1week": "1 Semaine", "2weeks": "2 Semaines", "3weeks": "3 Semaines", "4weeks": "4 Semaines",
      "5weeks": "5 Semaines", "6weeks": "6 Semaines", "7weeks": "7 Semaines", "8weeks": "8 Semaines"
    },
    months: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
    monthsFull: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    weekendCalendar: { available: "Disponible", unavailable: "Indisponible", selectBtn: "Sélectionner" },
    earlyBird: { title: "Early Bird", discount: "de réduction appliquée !" }
  },
  es: {
    hero: { title: "Reserva tu experiencia", subtitle: "Completa los pasos a continuación para enviar tu solicitud." },
    step1: { title: "Elige tu experiencia" },
    step2: { title: "Elige la ciudad", courseType: "Tipo de curso" },
    step3: { title: "Selecciona fechas", duration: "Duración", startDate: "Fecha de inicio", selectWeekend: "Selecciona un fin de semana" },
    step4: { 
      title: "Tu información",
      fullName: "Nombre completo", fullNamePlaceholder: "Introduce tu nombre completo",
      email: "Correo electrónico", emailPlaceholder: "tu@email.com",
      whatsapp: "Número de WhatsApp",
      message: "Mensaje adicional (opcional)", messagePlaceholder: "Requisitos dietéticos, preguntas...",
      acceptTerms: "Acepto los", termsLink: "Términos y Condiciones",
      acceptData: "Acepto el tratamiento de mis datos según la", privacyLink: "Política de Privacidad"
    },
    summary: {
      title: "Resumen", experience: "Experiencia", city: "Ciudad", course: "Curso", 
      dates: "Fechas", duration: "Duración", price: "Precio", from: "Desde"
    },
    buttons: { next: "Siguiente", previous: "Anterior", submit: "Enviar solicitud", submitting: "Enviando..." },
    validation: {
      nameRequired: "El nombre es obligatorio",
      emailRequired: "El correo electrónico es obligatorio",
      emailInvalid: "Formato de correo inválido",
      emailBlocked: "Por favor usa una dirección de correo válida",
      phoneRequired: "El número de WhatsApp es obligatorio",
      phoneInvalid: "Número de teléfono inválido o incompleto",
      acceptTerms: "Debes aceptar los términos y condiciones",
      acceptData: "Debes aceptar el tratamiento de datos"
    },
    toast: {
      successTitle: "¡Solicitud enviada con éxito!",
      successDesc: "Te contactaremos pronto.",
      errorTitle: "Error al enviar",
      errorDesc: "Por favor, inténtalo de nuevo más tarde."
    },
    experiences: {
      "self-defense": "Fin de Semana de Defensa Personal",
      "language": "Curso Intensivo de Inglés",
      "storytelling": "Fin de Semana de Storytelling Visual"
    },
    courseTypes: {
      "general": "Inglés General", "toefl-ibt": "TOEFL iBT", "toefl-itp": "TOEFL ITP",
      "ielts-academic": "IELTS Academic", "ielts-general": "IELTS General", "business": "Business English"
    },
    durations: {
      "weekend": "Fin de semana (2 noches / 3 días)", "5days": "5 Días", "7days": "7 Días / 6 Noches",
      "1week": "1 Semana", "2weeks": "2 Semanas", "3weeks": "3 Semanas", "4weeks": "4 Semanas",
      "5weeks": "5 Semanas", "6weeks": "6 Semanas", "7weeks": "7 Semanas", "8weeks": "8 Semanas"
    },
    months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    monthsFull: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    weekendCalendar: { available: "Disponible", unavailable: "No disponible", selectBtn: "Seleccionar" },
    earlyBird: { title: "Early Bird", discount: "¡descuento aplicado!" }
  },
  pt: {
    hero: { title: "Reserve sua experiência", subtitle: "Complete os passos abaixo para enviar sua solicitação." },
    step1: { title: "Escolha sua experiência" },
    step2: { title: "Escolha a cidade", courseType: "Tipo de curso" },
    step3: { title: "Selecione as datas", duration: "Duração", startDate: "Data de início", selectWeekend: "Selecione um fim de semana" },
    step4: { 
      title: "Suas informações",
      fullName: "Nome completo", fullNamePlaceholder: "Digite seu nome completo",
      email: "Endereço de email", emailPlaceholder: "seu@email.com",
      whatsapp: "Número do WhatsApp",
      message: "Mensagem adicional (opcional)", messagePlaceholder: "Requisitos alimentares, perguntas...",
      acceptTerms: "Aceito os", termsLink: "Termos e Condições",
      acceptData: "Aceito o processamento dos meus dados de acordo com a", privacyLink: "Política de Privacidade"
    },
    summary: {
      title: "Resumo", experience: "Experiência", city: "Cidade", course: "Curso", 
      dates: "Datas", duration: "Duração", price: "Preço", from: "A partir de"
    },
    buttons: { next: "Próximo", previous: "Anterior", submit: "Enviar solicitação", submitting: "Enviando..." },
    validation: {
      nameRequired: "O nome é obrigatório",
      emailRequired: "O endereço de email é obrigatório",
      emailInvalid: "Formato de email inválido",
      emailBlocked: "Por favor, use um endereço de email válido",
      phoneRequired: "O número de WhatsApp é obrigatório",
      phoneInvalid: "Número de telefone inválido ou incompleto",
      acceptTerms: "Você deve aceitar os termos e condições",
      acceptData: "Você deve aceitar o processamento de dados"
    },
    toast: {
      successTitle: "Solicitação enviada com sucesso!",
      successDesc: "Entraremos em contato em breve.",
      errorTitle: "Falha ao enviar",
      errorDesc: "Por favor, tente novamente mais tarde."
    },
    experiences: {
      "self-defense": "Fim de Semana de Defesa Pessoal",
      "language": "Curso Intensivo de Inglês",
      "storytelling": "Fim de Semana de Visual Storytelling"
    },
    courseTypes: {
      "general": "Inglês Geral", "toefl-ibt": "TOEFL iBT", "toefl-itp": "TOEFL ITP",
      "ielts-academic": "IELTS Academic", "ielts-general": "IELTS General", "business": "Business English"
    },
    durations: {
      "weekend": "Fim de semana (2 noites / 3 dias)", "5days": "5 Dias", "7days": "7 Dias / 6 Noites",
      "1week": "1 Semana", "2weeks": "2 Semanas", "3weeks": "3 Semanas", "4weeks": "4 Semanas",
      "5weeks": "5 Semanas", "6weeks": "6 Semanas", "7weeks": "7 Semanas", "8weeks": "8 Semanas"
    },
    months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    monthsFull: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    weekendCalendar: { available: "Disponível", unavailable: "Indisponível", selectBtn: "Selecionar" },
    earlyBird: { title: "Early Bird", discount: "de desconto aplicado!" }
  },
  de: {
    hero: { title: "Buchen Sie Ihr Erlebnis", subtitle: "Füllen Sie die folgenden Schritte aus, um Ihre Anfrage zu senden." },
    step1: { title: "Wählen Sie Ihr Erlebnis" },
    step2: { title: "Wählen Sie die Stadt", courseType: "Kurstyp" },
    step3: { title: "Datum auswählen", duration: "Dauer", startDate: "Startdatum", selectWeekend: "Wählen Sie ein Wochenende" },
    step4: { 
      title: "Ihre Informationen",
      fullName: "Vollständiger Name", fullNamePlaceholder: "Geben Sie Ihren vollständigen Namen ein",
      email: "E-Mail-Adresse", emailPlaceholder: "ihre@email.com",
      whatsapp: "WhatsApp-Nummer",
      message: "Zusätzliche Nachricht (optional)", messagePlaceholder: "Ernährungsbedürfnisse, Fragen...",
      acceptTerms: "Ich akzeptiere die", termsLink: "Allgemeinen Geschäftsbedingungen",
      acceptData: "Ich stimme der Verarbeitung meiner Daten gemäß der", privacyLink: "Datenschutzrichtlinie"
    },
    summary: {
      title: "Zusammenfassung", experience: "Erlebnis", city: "Stadt", course: "Kurs", 
      dates: "Daten", duration: "Dauer", price: "Preis", from: "Ab"
    },
    buttons: { next: "Weiter", previous: "Zurück", submit: "Anfrage senden", submitting: "Wird gesendet..." },
    validation: {
      nameRequired: "Name ist erforderlich",
      emailRequired: "E-Mail-Adresse ist erforderlich",
      emailInvalid: "Ungültiges E-Mail-Format",
      emailBlocked: "Bitte verwenden Sie eine gültige E-Mail-Adresse",
      phoneRequired: "WhatsApp-Nummer ist erforderlich",
      phoneInvalid: "Ungültige oder unvollständige Telefonnummer",
      acceptTerms: "Sie müssen die AGB akzeptieren",
      acceptData: "Sie müssen der Datenverarbeitung zustimmen"
    },
    toast: {
      successTitle: "Anfrage erfolgreich gesendet!",
      successDesc: "Wir werden Sie in Kürze kontaktieren.",
      errorTitle: "Senden fehlgeschlagen",
      errorDesc: "Bitte versuchen Sie es später erneut."
    },
    experiences: {
      "self-defense": "Selbstverteidigung Wochenende",
      "language": "Intensiv Englischkurs",
      "storytelling": "Visual Storytelling Wochenende"
    },
    courseTypes: {
      "general": "Allgemeines Englisch", "toefl-ibt": "TOEFL iBT", "toefl-itp": "TOEFL ITP",
      "ielts-academic": "IELTS Academic", "ielts-general": "IELTS General", "business": "Business English"
    },
    durations: {
      "weekend": "Wochenende (2 Nächte / 3 Tage)", "5days": "5 Tage", "7days": "7 Tage / 6 Nächte",
      "1week": "1 Woche", "2weeks": "2 Wochen", "3weeks": "3 Wochen", "4weeks": "4 Wochen",
      "5weeks": "5 Wochen", "6weeks": "6 Wochen", "7weeks": "7 Wochen", "8weeks": "8 Wochen"
    },
    months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
    monthsFull: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    weekendCalendar: { available: "Verfügbar", unavailable: "Nicht verfügbar", selectBtn: "Auswählen" },
    earlyBird: { title: "Frühbucher", discount: "Rabatt angewendet!" }
  },
  it: {
    hero: { title: "Prenota la tua esperienza", subtitle: "Completa i passaggi qui sotto per inviare la tua richiesta." },
    step1: { title: "Scegli la tua esperienza" },
    step2: { title: "Scegli la città", courseType: "Tipo di corso" },
    step3: { title: "Seleziona le date", duration: "Durata", startDate: "Data di inizio", selectWeekend: "Seleziona un weekend" },
    step4: { 
      title: "Le tue informazioni",
      fullName: "Nome completo", fullNamePlaceholder: "Inserisci il tuo nome completo",
      email: "Indirizzo email", emailPlaceholder: "tua@email.com",
      whatsapp: "Numero WhatsApp",
      message: "Messaggio aggiuntivo (opzionale)", messagePlaceholder: "Esigenze alimentari, domande...",
      acceptTerms: "Accetto i", termsLink: "Termini e Condizioni",
      acceptData: "Accetto il trattamento dei miei dati secondo la", privacyLink: "Privacy Policy"
    },
    summary: {
      title: "Riepilogo", experience: "Esperienza", city: "Città", course: "Corso", 
      dates: "Date", duration: "Durata", price: "Prezzo", from: "Da"
    },
    buttons: { next: "Avanti", previous: "Indietro", submit: "Invia richiesta", submitting: "Invio in corso..." },
    validation: {
      nameRequired: "Il nome è obbligatorio",
      emailRequired: "L'indirizzo email è obbligatorio",
      emailInvalid: "Formato email non valido",
      emailBlocked: "Per favore usa un indirizzo email valido",
      phoneRequired: "Il numero WhatsApp è obbligatorio",
      phoneInvalid: "Numero di telefono non valido o incompleto",
      acceptTerms: "Devi accettare i termini e condizioni",
      acceptData: "Devi accettare il trattamento dei dati"
    },
    toast: {
      successTitle: "Richiesta inviata con successo!",
      successDesc: "Ti contatteremo a breve.",
      errorTitle: "Invio fallito",
      errorDesc: "Per favore riprova più tardi."
    },
    experiences: {
      "self-defense": "Weekend di Autodifesa",
      "language": "Corso Intensivo di Inglese",
      "storytelling": "Weekend di Visual Storytelling"
    },
    courseTypes: {
      "general": "Inglese Generale", "toefl-ibt": "TOEFL iBT", "toefl-itp": "TOEFL ITP",
      "ielts-academic": "IELTS Academic", "ielts-general": "IELTS General", "business": "Business English"
    },
    durations: {
      "weekend": "Weekend (2 notti / 3 giorni)", "5days": "5 Giorni", "7days": "7 Giorni / 6 Notti",
      "1week": "1 Settimana", "2weeks": "2 Settimane", "3weeks": "3 Settimane", "4weeks": "4 Settimane",
      "5weeks": "5 Settimane", "6weeks": "6 Settimane", "7weeks": "7 Settimane", "8weeks": "8 Settimane"
    },
    months: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
    monthsFull: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
    weekendCalendar: { available: "Disponibile", unavailable: "Non disponibile", selectBtn: "Seleziona" },
    earlyBird: { title: "Early Bird", discount: "di sconto applicato!" }
  }
};

// Minimum days before booking (2 weeks)
const MIN_BOOKING_DAYS = 14;

// ===== SECURITY: Blocked email domains =====
const BLOCKED_EMAIL_DOMAINS = [
  "test.com", "example.com", "example.org", "example.net",
  "mailinator.com", "guerrillamail.com", "10minutemail.com",
  "tempmail.com", "throwaway.email", "fakeinbox.com",
  "yopmail.com", "temp-mail.org", "getnada.com", "trashmail.com"
];

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Validate email
const validateEmail = (email, t) => {
  if (!email) return t.validation.emailRequired;
  if (!EMAIL_REGEX.test(email)) return t.validation.emailInvalid;
  const domain = email.split("@")[1]?.toLowerCase();
  if (BLOCKED_EMAIL_DOMAINS.includes(domain)) {
    return t.validation.emailBlocked;
  }
  return null;
};

// Validate phone
const validatePhone = (phone, t) => {
  if (!phone) return t.validation.phoneRequired;
  if (!isValidPhoneNumber(phone)) return t.validation.phoneInvalid;
  return null;
};

const EXPERIENCES = [
  { 
    id: "self-defense", 
    label: "Self-Defense Weekend", 
    icon: <Shield size={20} />, 
    price: 250,
    format: "weekend",
    cities: ["marrakech", "agadir"],
    durations: ["weekend"]
  },
  { 
    id: "language", 
    label: "Cours d'Anglais Intensif", 
    icon: <Languages size={20} />, 
    pricePerWeek: 400,
    cities: ["casablanca", "marrakech"],
    durations: ["1week", "2weeks", "3weeks", "4weeks", "5weeks", "6weeks", "7weeks", "8weeks"],
    courseTypes: [
      { id: "general", label: "Anglais Général" },
      { id: "toefl-ibt", label: "TOEFL iBT" },
      { id: "toefl-itp", label: "TOEFL ITP" },
      { id: "ielts-academic", label: "IELTS Academic" },
      { id: "ielts-general", label: "IELTS General" },
      { id: "business", label: "Business English" }
    ]
  },
  { 
    id: "storytelling", 
    label: "Visual Storytelling Weekend", 
    icon: <Camera size={20} />, 
    price: 350,
    format: "weekend",
    cities: ["marrakech", "agadir"],
    durations: ["weekend"]
  }
];

const ALL_CITIES = [
  { id: "casablanca", label: "Casablanca" },
  { id: "marrakech", label: "Marrakech" },
  { id: "agadir", label: "Agadir" }
];

const ALL_DURATIONS = [
  { id: "weekend", label: "Weekend (2 nuits / 3 jours)", weeks: 0 },
  { id: "5days", label: "5 Jours", weeks: 0 },
  { id: "7days", label: "7 Jours / 6 Nuits", weeks: 0 },
  { id: "1week", label: "1 Semaine", weeks: 1 },
  { id: "2weeks", label: "2 Semaines", weeks: 2 },
  { id: "3weeks", label: "3 Semaines", weeks: 3 },
  { id: "4weeks", label: "4 Semaines", weeks: 4 },
  { id: "5weeks", label: "5 Semaines", weeks: 5 },
  { id: "6weeks", label: "6 Semaines", weeks: 6 },
  { id: "7weeks", label: "7 Semaines", weeks: 7 },
  { id: "8weeks", label: "8 Semaines", weeks: 8 }
];

// Calculate minimum booking date (14 days from today)
const getMinBookingDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + MIN_BOOKING_DAYS);
  date.setHours(0, 0, 0, 0);
  return date;
};

// Generate all weekends for the next 18 months
const generateAllWeekends = () => {
  const weekends = [];
  const today = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 18);
  
  const date = new Date(today);
  // Find first Friday
  while (date.getDay() !== 5) {
    date.setDate(date.getDate() + 1);
  }
  
  // Generate all Fridays for 18 months
  while (date < endDate) {
    weekends.push(new Date(date));
    date.setDate(date.getDate() + 7);
  }
  
  return weekends;
};

// Get city for weekend (alternating Marrakech/Agadir based on week number of year)
const getWeekendCity = (friday) => {
  const startOfYear = new Date(friday.getFullYear(), 0, 1);
  const days = Math.floor((friday - startOfYear) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return weekNumber % 2 === 0 ? "Agadir" : "Marrakech";
};

// Format weekend date range
const formatWeekendRange = (friday) => {
  const sunday = new Date(friday);
  sunday.setDate(sunday.getDate() + 2);
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
  return `${friday.getDate()} - ${sunday.getDate()} ${months[friday.getMonth()]} ${friday.getFullYear()}`;
};

// Group weekends by month
const groupWeekendsByMonth = (weekends) => {
  const grouped = {};
  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
                      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  
  weekends.forEach(friday => {
    const key = `${monthNames[friday.getMonth()]} ${friday.getFullYear()}`;
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(friday);
  });
  
  return grouped;
};

// Weekend Calendar Step Component
const WeekendCalendarStep = ({ formData, setFormData, selectedExperience, isEarlyBird }) => {
  const [expandedMonths, setExpandedMonths] = useState({});
  const allWeekends = generateAllWeekends();
  const minDate = getMinBookingDate();
  const groupedWeekends = groupWeekendsByMonth(allWeekends);
  const monthKeys = Object.keys(groupedWeekends);
  
  // Auto-expand first 3 months
  useState(() => {
    const initial = {};
    monthKeys.slice(0, 3).forEach(key => { initial[key] = true; });
    setExpandedMonths(initial);
  });

  const toggleMonth = (monthKey) => {
    setExpandedMonths(prev => ({ ...prev, [monthKey]: !prev[monthKey] }));
  };

  const handleSelectWeekend = (friday) => {
    const city = getWeekendCity(friday);
    setFormData(prev => ({ 
      ...prev, 
      startDate: friday,
      duration: "weekend",
      city: city.toLowerCase()
    }));
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-2">
        <Calendar className="text-sunset" size={24} />
        <h2 className="font-syne font-bold text-xl text-ocean">Calendrier des Weekends</h2>
      </div>
      <p className="font-dm text-ocean/60 mb-6">Choisissez votre week-end (Vendredi → Dimanche)</p>

      {/* Early Bird indicator */}
      {isEarlyBird && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
          <Gift className="text-green-600" size={20} />
          <div>
            <p className="font-syne font-bold text-green-700 text-sm">Early Bird -8%</p>
            <p className="font-dm text-green-600 text-xs">Réservation 30+ jours à l'avance</p>
          </div>
        </div>
      )}

      {/* Weekend List by Month */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {monthKeys.map((monthKey) => {
          const weekends = groupedWeekends[monthKey];
          const isExpanded = expandedMonths[monthKey];
          const hasAvailable = weekends.some(f => f >= minDate);
          
          return (
            <div key={monthKey} className="border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => toggleMonth(monthKey)}
                className={`w-full p-3 flex items-center justify-between ${
                  hasAvailable ? 'bg-white hover:bg-warmwhite' : 'bg-gray-50'
                }`}
              >
                <span className={`font-syne font-bold ${hasAvailable ? 'text-ocean' : 'text-gray-400'}`}>
                  {monthKey}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-dm text-ocean/50">
                    {weekends.filter(f => f >= minDate).length} dispo
                  </span>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>
              
              {isExpanded && (
                <div className="p-3 pt-0 space-y-2">
                  {weekends.map((friday, idx) => {
                    const city = getWeekendCity(friday);
                    const isPast = friday < minDate;
                    const isSelected = formData.startDate?.getTime() === friday.getTime();
                    
                    return (
                      <button
                        key={friday.toISOString()}
                        onClick={() => !isPast && handleSelectWeekend(friday)}
                        disabled={isPast}
                        className={`w-full p-3 rounded-lg text-left transition-all flex items-center justify-between ${
                          isPast 
                            ? "bg-gray-100 opacity-50 cursor-not-allowed"
                            : isSelected
                              ? "bg-sunset text-white shadow-md"
                              : "bg-warmwhite hover:bg-sand/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Calendar size={16} className={isSelected ? "text-white" : isPast ? "text-gray-400" : "text-sunset"} />
                          <span className={`font-dm ${isSelected ? "text-white font-medium" : isPast ? "text-gray-400" : "text-ocean"}`}>
                            {formatWeekendRange(friday)}
                          </span>
                        </div>
                        <span className={`text-xs font-dm px-2 py-1 rounded-full ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : city === "Marrakech" 
                              ? "bg-red-100 text-red-700" 
                              : "bg-blue-100 text-blue-700"
                        }`}>
                          {city}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Weekend Summary */}
      {formData.startDate && (
        <div className="mt-4 p-4 bg-ocean/5 rounded-xl">
          <p className="font-dm text-ocean/60 text-sm mb-1">Weekend sélectionné</p>
          <p className="font-syne font-bold text-ocean">
            {formatWeekendRange(formData.startDate)} – {getWeekendCity(formData.startDate)}
          </p>
        </div>
      )}
    </>
  );
};

const BookPage = () => {
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const t = bookPageTranslations[language] || bookPageTranslations.en;
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    experience: "",
    courseType: "",
    city: "",
    duration: "",
    startDate: null,
    name: "",
    email: "",
    whatsapp: "",
    preferredLanguage: "fr",
    message: "",
    acceptTerms: false,
    acceptData: false,
    honeypot: "" // Anti-bot field
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Language options for routing
  const LANGUAGE_OPTIONS = [
    { id: "fr", label: "Français", referent: "FR" },
    { id: "en", label: "English", referent: "EN" },
    { id: "es", label: "Español", referent: "ES" },
    { id: "pt", label: "Português", referent: "PT" },
    { id: "de", label: "Deutsch", referent: "DE" },
    { id: "it", label: "Italiano", referent: "IT" },
    { id: "other", label: language === 'fr' ? 'Autre' : 'Other', referent: "INT" }
  ];

  // Pre-select experience from URL params and skip to step 2
  useEffect(() => {
    const expParam = searchParams.get('experience');
    const cityParam = searchParams.get('city');
    
    if (expParam) {
      const matchedExp = EXPERIENCES.find(e => 
        e.id === expParam || 
        e.id.includes(expParam) || 
        expParam.includes(e.id)
      );
      
      if (matchedExp) {
        setFormData(prev => ({ 
          ...prev, 
          experience: matchedExp.id,
          city: cityParam || ""
        }));
        // Skip to step 2 (city selection) if experience is pre-selected
        setStep(2);
      }
    }
  }, [searchParams]);

  // Clear error when field changes
  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const selectedExperience = EXPERIENCES.find(e => e.id === formData.experience);
  const availableCities = selectedExperience ? ALL_CITIES.filter(c => selectedExperience.cities.includes(c.id)) : [];
  const availableDurations = selectedExperience ? ALL_DURATIONS.filter(d => selectedExperience.durations.includes(d.id)) : [];
  
  // Calculate price
  const selectedDuration = ALL_DURATIONS.find(d => d.id === formData.duration);
  let price = 0;
  if (selectedExperience && formData.duration) {
    if (selectedExperience.price) {
      // Self-Defense: fixed weekend price
      price = selectedExperience.price;
    } else if (selectedExperience.pricePerWeek && selectedDuration?.weeks) {
      // Language course: price per week × number of weeks
      price = selectedExperience.pricePerWeek * selectedDuration.weeks;
    } else if (selectedExperience.prices) {
      // Other experiences: fixed prices
      price = selectedExperience.prices[formData.duration] || 0;
    }
  }
  
  const registrationFee = formData.experience === "language" ? 45 : 0;
  
  // Early Bird discount: 8% off if booking 30+ days in advance
  const EARLY_BIRD_DAYS = 30;
  const EARLY_BIRD_DISCOUNT = 0.08; // 8%
  
  const isEarlyBird = formData.startDate && (() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = formData.startDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= EARLY_BIRD_DAYS;
  })();
  
  const earlyBirdDiscount = isEarlyBird ? Math.round(price * EARLY_BIRD_DISCOUNT) : 0;
  const priceAfterDiscount = price - earlyBirdDiscount;
  const totalPrice = priceAfterDiscount + registrationFee;

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString('en-GB', { 
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' 
    });
  };

  // Real-time field validation (onBlur)
  const validateFieldOnBlur = (field) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case "name":
        if (!formData.name.trim()) {
          newErrors.name = "Le nom est requis";
        } else if (formData.name.trim().length < 2) {
          newErrors.name = "Le nom doit contenir au moins 2 caractères";
        } else {
          delete newErrors.name;
        }
        break;
      case "email":
        const emailError = validateEmail(formData.email);
        if (emailError) {
          newErrors.email = emailError;
        } else {
          delete newErrors.email;
        }
        break;
      case "whatsapp":
        const phoneError = validatePhone(formData.whatsapp);
        if (phoneError) {
          newErrors.whatsapp = phoneError;
        } else {
          delete newErrors.whatsapp;
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  const handleSubmit = async () => {
    // Honeypot check - if filled, silently fail (bot detected)
    if (formData.honeypot) {
      console.log("Bot detected");
      setStep(5); // Fake success
      return;
    }
    
    // Validate step 4
    if (!validateStep4()) {
      toast.error("Veuillez corriger les erreurs", {
        description: "Certains champs sont invalides."
      });
      return;
    }
    
    setIsSubmitting(true);
    const courseTypeLabel = selectedExperience?.courseTypes?.find(c => c.id === formData.courseType)?.label || '';
    const earlyBirdText = isEarlyBird ? `\nEarly Bird Discount: -€${earlyBirdDiscount} (8%)` : '';
    const languageLabel = LANGUAGE_OPTIONS.find(l => l.id === formData.preferredLanguage)?.label || 'Français';
    const referentTag = LANGUAGE_OPTIONS.find(l => l.id === formData.preferredLanguage)?.referent || 'FR';
    const fullWhatsApp = formData.whatsapp;
    
    try {
      await axios.post(`${API}/contact`, {
        name: formData.name,
        email: formData.email,
        message: `🎯 DEMANDE DE RÉSERVATION - Lead ${referentTag}

👤 PARTICIPANT
Nom: ${formData.name}
Email: ${formData.email}
WhatsApp: ${fullWhatsApp}
Langue préférée: ${languageLabel} [TAG: ${referentTag}]

📅 EXPÉRIENCE
Experience: ${selectedExperience?.label}${courseTypeLabel ? ` - ${courseTypeLabel}` : ''}
Ville: ${ALL_CITIES.find(c => c.id === formData.city)?.label}
Durée: ${ALL_DURATIONS.find(d => d.id === formData.duration)?.label}
Date de début: ${formatDate(formData.startDate)}

💰 TARIF
Prix de base: €${price}${earlyBirdText}${registrationFee > 0 ? `\nFrais d'inscription: €${registrationFee}` : ''}
TOTAL: €${totalPrice}

📝 MESSAGE
${formData.message || 'Aucun message additionnel'}

⚡ ACTION REQUISE: Contacter sur WhatsApp (${fullWhatsApp}) sous 24h`,
        trip_interest: selectedExperience?.label,
        lead_tag: referentTag,
        whatsapp: fullWhatsApp,
        preferred_language: formData.preferredLanguage
      });
      
      toast.success("Demande envoyée !", {
        description: `Un référent ${languageLabel} vous contactera sous 24h.`
      });
      setStep(5); // Success step
    } catch (error) {
      toast.error("Erreur lors de l'envoi", {
        description: "Veuillez réessayer ou nous contacter directement."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch(step) {
      case 1: return formData.experience !== "";
      case 2: 
        // Weekend experiences: city is auto-set by weekend selection, skip city check
        if (selectedExperience?.format === "weekend") {
          return true; // Just need experience selected, city will be set in step 3
        }
        if (formData.experience === "language") {
          return formData.city !== "" && formData.courseType !== "";
        }
        return formData.city !== "";
      case 3: 
        // Weekend: just need date selected (duration and city are auto-set)
        if (selectedExperience?.format === "weekend") {
          return formData.startDate !== null;
        }
        return formData.duration !== "" && formData.startDate !== null;
      case 4: 
        // Validate all fields
        const emailError = validateEmail(formData.email);
        const phoneError = validatePhone(formData.whatsapp);
        return formData.name !== "" && !emailError && !phoneError && formData.acceptTerms && formData.acceptData;
      default: return false;
    }
  };

  // Validate step 4 before submission
  const validateStep4 = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const phoneError = validatePhone(formData.whatsapp);
    if (phoneError) newErrors.whatsapp = phoneError;
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Vous devez accepter les CGV";
    }
    
    if (!formData.acceptData) {
      newErrors.acceptData = "Vous devez accepter le traitement des données";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <PageLayout>
      <Toaster position="top-right" richColors />
      
      {/* Hero */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-ocean to-ocean/90 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl mb-4">
              Réserver votre expérience
            </h1>
            <p className="font-dm text-white/80 text-lg">
              Complétez les étapes ci-dessous pour envoyer votre demande.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-3xl mx-auto">
          
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-syne font-bold text-sm ${
                  step >= s ? "bg-sunset text-white" : "bg-white text-ocean/50"
                }`}>
                  {step > s ? <Check size={18} /> : s}
                </div>
                {s < 4 && (
                  <div className={`w-12 sm:w-20 h-1 mx-1 ${step > s ? "bg-sunset" : "bg-white"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Choose Experience */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="text-sunset" size={24} />
                    <h2 className="font-syne font-bold text-xl text-ocean">Choose Your Experience</h2>
                  </div>
                  <div className="space-y-3">
                    {EXPERIENCES.map((exp) => (
                      <button
                        key={exp.id}
                        onClick={() => setFormData(prev => ({ ...prev, experience: exp.id }))}
                        className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                          formData.experience === exp.id
                            ? "border-sunset bg-sunset/5"
                            : "border-border hover:border-sunset/50"
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          formData.experience === exp.id ? "bg-sunset text-white" : "bg-warmwhite text-ocean"
                        }`}>
                          {exp.icon}
                        </div>
                        <span className="font-dm font-medium text-ocean">{exp.label}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Choose City (+ Course Type for Language) - SKIP for Weekend experiences */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  {/* Show selected experience with option to change */}
                  {selectedExperience && (
                    <div className="mb-6 p-4 bg-ocean/5 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-sunset rounded-full flex items-center justify-center text-white">
                            {selectedExperience.icon}
                          </div>
                          <div>
                            <p className="font-syne font-bold text-ocean">{selectedExperience.label}</p>
                            <p className="font-dm text-ocean/60 text-sm">
                              {selectedExperience.price ? `€${selectedExperience.price}` : `€${selectedExperience.pricePerWeek}/semaine`}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setStep(1)}
                          className="text-ocean/60 hover:text-ocean"
                        >
                          Changer
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Weekend experiences: Show info and go to calendar */}
                  {selectedExperience?.format === "weekend" ? (
                    <div className="text-center py-4">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <Calendar className="text-sunset" size={24} />
                        <h2 className="font-syne font-bold text-xl text-ocean">Prochaine étape</h2>
                      </div>
                      <p className="font-dm text-ocean/70 mb-6">
                        Choisissez votre weekend parmi les dates disponibles.<br/>
                        La ville (Marrakech ou Agadir) alterne chaque semaine.
                      </p>
                      <Button 
                        onClick={() => setStep(3)}
                        className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-8"
                      >
                        Voir le calendrier des weekends <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      {/* Course Type for Language */}
                      {formData.experience === "language" && (
                        <div className="mb-8">
                          <div className="flex items-center gap-3 mb-4">
                            <Languages className="text-sunset" size={24} />
                            <h2 className="font-syne font-bold text-xl text-ocean">Type de Cours</h2>
                          </div>
                          <Select value={formData.courseType} onValueChange={(v) => setFormData(prev => ({ ...prev, courseType: v }))}>
                            <SelectTrigger className="border-border rounded-xl">
                              <SelectValue placeholder="Sélectionnez le type de cours" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedExperience?.courseTypes?.map((c) => (
                                <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="flex items-center gap-3 mb-6">
                        <MapPin className="text-sunset" size={24} />
                        <h2 className="font-syne font-bold text-xl text-ocean">Choisissez votre ville</h2>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {availableCities.map((city) => (
                          <button
                            key={city.id}
                            onClick={() => setFormData(prev => ({ ...prev, city: city.id }))}
                            className={`p-6 rounded-xl border-2 text-center transition-all ${
                              formData.city === city.id
                                ? "border-sunset bg-sunset/5"
                                : "border-border hover:border-sunset/50"
                            }`}
                          >
                            <MapPin className={`mx-auto mb-2 ${formData.city === city.id ? "text-sunset" : "text-ocean/50"}`} size={32} />
                            <span className="font-syne font-bold text-ocean">{city.label}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Choose Dates */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  
                  {/* Weekend Experiences (Self-Defense & Visual Storytelling) */}
                  {selectedExperience?.format === "weekend" ? (
                    <WeekendCalendarStep 
                      formData={formData}
                      setFormData={setFormData}
                      selectedExperience={selectedExperience}
                      isEarlyBird={isEarlyBird}
                    />
                  ) : (
                    /* Language Course - Standard Calendar */
                    <>
                      <div className="flex items-center gap-3 mb-6">
                        <Calendar className="text-sunset" size={24} />
                        <h2 className="font-syne font-bold text-xl text-ocean">Durée & Date de début</h2>
                      </div>
                      
                      <div className="mb-6">
                        <label className="font-dm font-medium text-ocean text-sm mb-2 block">Durée</label>
                        <Select value={formData.duration} onValueChange={(v) => setFormData(prev => ({ ...prev, duration: v }))}>
                          <SelectTrigger className="border-border rounded-xl">
                            <SelectValue placeholder="Sélectionnez la durée" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableDurations.map((d) => (
                              <SelectItem key={d.id} value={d.id}>{d.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="font-dm font-medium text-ocean text-sm mb-2 block">Date de début</label>
                        
                        {/* Info: Mondays only */}
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                          <p className="font-dm text-blue-700 text-sm">
                            📅 Les cours commencent chaque <strong>lundi</strong>
                          </p>
                        </div>
                        
                        {formData.startDate && (
                          <p className="font-dm text-sunset mb-2">Sélectionné: <strong>{formatDate(formData.startDate)}</strong></p>
                        )}
                        {isEarlyBird && (
                          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                            <Gift className="text-green-600" size={20} />
                            <div>
                              <p className="font-syne font-bold text-green-700 text-sm">Early Bird -8%</p>
                              <p className="font-dm text-green-600 text-xs">Réservation 30+ jours à l'avance</p>
                            </div>
                          </div>
                        )}
                        <div className="flex justify-center">
                          <CalendarComponent
                            mode="single"
                            selected={formData.startDate}
                            onSelect={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                            weekStartsOn={1}
                            disabled={(date) => {
                              const minDate = getMinBookingDate();
                              // Disable if before min date OR not a Monday (getDay() === 1 is Monday)
                              return date < minDate || date.getDay() !== 1;
                            }}
                            className="rounded-xl border border-border"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Participant Details */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="text-sunset" size={24} />
                    <h2 className="font-syne font-bold text-xl text-ocean">Your Details</h2>
                  </div>
                  
                  {/* Honeypot anti-bot field */}
                  <input
                    type="text"
                    name="website"
                    value={formData.honeypot}
                    onChange={(e) => setFormData(prev => ({ ...prev, honeypot: e.target.value }))}
                    autoComplete="off"
                    tabIndex={-1}
                    style={{ position: "absolute", left: "-9999px", opacity: 0 }}
                    aria-hidden="true"
                  />
                  
                  <div className="space-y-4">
                    <div>
                      <label className="font-dm font-medium text-ocean text-sm mb-2 flex items-center gap-2">
                        <User size={16} /> Nom complet *
                      </label>
                      <Input 
                        value={formData.name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        onBlur={() => validateFieldOnBlur("name")}
                        placeholder="Votre nom complet"
                        className={`border-border rounded-xl transition-colors ${errors.name ? "border-red-500 bg-red-50/50" : "focus:border-sunset"}`}
                        required
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1.5 flex items-center gap-1 bg-red-50 p-2 rounded-lg"
                        >
                          <AlertCircle size={14} /> {errors.name}
                        </motion.p>
                      )}
                    </div>
                    <div>
                      <label className="font-dm font-medium text-ocean text-sm mb-2 flex items-center gap-2">
                        <Mail size={16} /> Email *
                      </label>
                      <Input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                        onBlur={() => validateFieldOnBlur("email")}
                        placeholder="votre@email.com"
                        className={`border-border rounded-xl transition-colors ${errors.email ? "border-red-500 bg-red-50/50" : "focus:border-sunset"}`}
                        required
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1.5 flex items-center gap-1 bg-red-50 p-2 rounded-lg"
                        >
                          <AlertCircle size={14} /> {errors.email}
                        </motion.p>
                      )}
                    </div>
                    <div>
                      <label className="font-dm font-medium text-ocean text-sm mb-2 flex items-center gap-2">
                        <Phone size={16} /> WhatsApp *
                      </label>
                      <div className={`phone-input-wrapper rounded-xl border transition-colors ${errors.whatsapp ? "border-red-500 bg-red-50/50" : "border-border"} overflow-hidden bg-white`}>
                        <PhoneInput
                          international
                          countryCallingCodeEditable={false}
                          defaultCountry="FR"
                          value={formData.whatsapp}
                          onChange={(value) => handleFieldChange("whatsapp", value || "")}
                          onBlur={() => validateFieldOnBlur("whatsapp")}
                          placeholder="6 12 34 56 78"
                          className="phone-input-booking"
                        />
                      </div>
                      {errors.whatsapp && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1.5 flex items-center gap-1 bg-red-50 p-2 rounded-lg"
                        >
                          <AlertCircle size={14} /> {errors.whatsapp}
                        </motion.p>
                      )}
                      {!errors.whatsapp && (
                        <p className="font-dm text-xs text-ocean/50 mt-1">Nous vous contacterons sur WhatsApp</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="font-dm font-medium text-ocean text-sm mb-2 flex items-center gap-2">
                        Langue préférée *
                      </label>
                      <Select 
                        value={formData.preferredLanguage} 
                        onValueChange={(v) => setFormData(prev => ({ ...prev, preferredLanguage: v }))}
                      >
                        <SelectTrigger className="border-border rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {LANGUAGE_OPTIONS.map((lang) => (
                            <SelectItem key={lang.id} value={lang.id}>{lang.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="font-dm text-xs text-ocean/50 mt-1">Un référent {LANGUAGE_OPTIONS.find(l => l.id === formData.preferredLanguage)?.label} vous contactera</p>
                    </div>

                    <div>
                      <label className="font-dm font-medium text-ocean text-sm mb-2">Message additionnel</label>
                      <Textarea 
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Questions ou demandes spéciales ?"
                        className="border-border rounded-xl"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <h3 className="font-syne font-bold text-blue-800 text-sm mb-2">💡 Processus de réservation</h3>
                    <p className="font-dm text-blue-700 text-sm leading-relaxed">
                      L'expérience est confirmée dès que le groupe atteint <strong>8 participants</strong>. 
                      L'acompte de 30% ne sera demandé qu'après l'appel de validation. 
                      Dans le cas où le séjour serait annulé faute de participants, vous serez <strong>entièrement remboursé</strong>.
                    </p>
                  </div>

                  {/* Consent Checkboxes */}
                  <div className="mt-6 space-y-4 p-4 bg-ocean/5 rounded-xl">
                    <h3 className="font-syne font-bold text-ocean text-sm mb-3">Consentements requis</h3>
                    
                    {/* CGV + Privacy Policy */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          checked={formData.acceptTerms}
                          onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 border-2 border-ocean/30 rounded peer-checked:bg-sunset peer-checked:border-sunset transition-all flex items-center justify-center">
                          {formData.acceptTerms && <Check size={14} className="text-white" />}
                        </div>
                      </div>
                      <span className="font-dm text-sm text-ocean/80 leading-relaxed">
                        J'accepte les{" "}
                        <Link to="/cgv" target="_blank" className="text-sunset hover:underline font-medium">
                          Conditions Générales de Vente
                        </Link>{" "}
                        et la{" "}
                        <Link to="/confidentialite" target="_blank" className="text-sunset hover:underline font-medium">
                          Politique de Confidentialité
                        </Link>{" "}
                        de THE BRIDGE. *
                      </span>
                    </label>

                    {/* Data Processing Consent */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          checked={formData.acceptData}
                          onChange={(e) => setFormData(prev => ({ ...prev, acceptData: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 border-2 border-ocean/30 rounded peer-checked:bg-sunset peer-checked:border-sunset transition-all flex items-center justify-center">
                          {formData.acceptData && <Check size={14} className="text-white" />}
                        </div>
                      </div>
                      <span className="font-dm text-sm text-ocean/80 leading-relaxed">
                        J'accepte que mes données personnelles soient traitées par UNYCEO FR dans le cadre de ma demande de réservation. *
                      </span>
                    </label>

                    <p className="font-dm text-xs text-ocean/50 mt-2">
                      * Champs obligatoires
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="mt-6 p-4 bg-warmwhite rounded-xl">
                    <h3 className="font-syne font-bold text-ocean mb-3">Récapitulatif</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-ocean/70">Expérience:</span>
                        <span className="font-medium text-ocean">{selectedExperience?.label}</span>
                      </div>
                      {formData.courseType && (
                        <div className="flex justify-between">
                          <span className="text-ocean/70">Type de cours:</span>
                          <span className="font-medium text-ocean">{selectedExperience?.courseTypes?.find(c => c.id === formData.courseType)?.label}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-ocean/70">Ville:</span>
                        <span className="font-medium text-ocean">{ALL_CITIES.find(c => c.id === formData.city)?.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ocean/70">Durée:</span>
                        <span className="font-medium text-ocean">{ALL_DURATIONS.find(d => d.id === formData.duration)?.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ocean/70">Date de début:</span>
                        <span className="font-medium text-ocean">{formatDate(formData.startDate)}</span>
                      </div>
                      <div className="border-t border-border pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-ocean/70">Prix de base:</span>
                          <span className={`font-medium ${isEarlyBird ? 'line-through text-ocean/50' : 'text-ocean'}`}>€{price}</span>
                        </div>
                        {isEarlyBird && (
                          <div className="flex justify-between items-center bg-green-50 -mx-4 px-4 py-2 my-2">
                            <span className="text-green-700 flex items-center gap-2">
                              <Gift size={16} /> Early Bird (-8%)
                            </span>
                            <span className="font-bold text-green-700">-€{earlyBirdDiscount}</span>
                          </div>
                        )}
                        {isEarlyBird && (
                          <div className="flex justify-between">
                            <span className="text-ocean/70">Prix après réduction:</span>
                            <span className="font-medium text-ocean">€{priceAfterDiscount}</span>
                          </div>
                        )}
                        {registrationFee > 0 && (
                          <div className="flex justify-between">
                            <span className="text-ocean/70">Frais d'inscription:</span>
                            <span className="font-medium text-ocean">€{registrationFee}</span>
                          </div>
                        )}
                        <div className="flex justify-between mt-2">
                          <span className="font-syne font-bold text-ocean">Total:</span>
                          <span className="font-syne font-bold text-sunset text-xl">€{totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="border-none shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="text-green-600" size={40} />
                  </div>
                  <h2 className="font-syne font-bold text-2xl text-ocean mb-4">
                    Merci {formData.name} !
                  </h2>
                  <p className="font-dm text-ocean/80 text-lg mb-4">
                    Votre demande est bien reçue.
                  </p>
                  <div className="bg-ocean/5 rounded-xl p-6 mb-6 text-left">
                    <p className="font-dm text-ocean/80 mb-4">
                      Un de nos référents <strong>{LANGUAGE_OPTIONS.find(l => l.id === formData.preferredLanguage)?.label}</strong> vous contactera personnellement sur WhatsApp sous <strong>24h</strong> pour :
                    </p>
                    <ul className="space-y-2 font-dm text-ocean/70">
                      <li className="flex items-center gap-2">
                        <Check size={16} className="text-green-600" /> Valider votre profil
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={16} className="text-green-600" /> Répondre à vos questions sur l'expérience
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={16} className="text-green-600" /> Confirmer votre place dans le groupe
                      </li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 mb-6">
                    <p className="font-dm text-blue-700 text-sm">
                      💡 <strong>Bon à savoir :</strong> L'acompte de 30% ne sera demandé qu'après l'appel de validation. 
                      Si le séjour est annulé, vous serez entièrement remboursé.
                    </p>
                  </div>
                  <Button asChild className="bg-sunset hover:bg-sunset/90 text-white rounded-full">
                    <Link to="/">Retour à l'accueil</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          {step < 5 && (
            <div className="flex justify-between mt-6">
              {step > 1 ? (
                <Button 
                  variant="outline" 
                  onClick={() => setStep(step - 1)}
                  className="rounded-full"
                >
                  Retour
                </Button>
              ) : <div />}
              
              {step < 4 ? (
                <Button 
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="bg-sunset hover:bg-sunset/90 text-white rounded-full"
                >
                  Continuer <ArrowRight size={16} className="ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="bg-sunset hover:bg-sunset/90 text-white rounded-full"
                >
                  {isSubmitting ? "Envoi..." : "Envoyer la demande"}
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Phone Input Styles */}
      <style>{`
        .phone-input-booking {
          padding: 0.75rem 1rem;
        }
        .phone-input-booking .PhoneInputInput {
          border: none;
          outline: none;
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          width: 100%;
        }
        .phone-input-booking .PhoneInputCountry {
          margin-right: 0.75rem;
        }
        .phone-input-booking .PhoneInputCountryIcon {
          width: 1.5rem;
          height: 1rem;
          border-radius: 2px;
          overflow: hidden;
        }
      `}</style>
    </PageLayout>
  );
};

export default BookPage;
