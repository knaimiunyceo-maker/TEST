import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Clock, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";
import { useLanguage } from "../LanguageContext";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const translations = {
  en: {
    loading: "Verifying your payment...",
    success: {
      title: "Payment Successful!",
      subtitle: "Your deposit has been received",
      thankYou: "Thank you for booking with The Bridge!",
      nextSteps: "What happens next?",
      step1: "You will receive a confirmation email shortly",
      step2: "A local referent will contact you within 24 hours",
      step3: "You'll join the \"Circle of Explorers\" to track group formation",
      step4: "Once the group reaches 10 participants, your booking is confirmed"
    },
    pending: {
      title: "Payment Processing",
      subtitle: "Your payment is being processed",
      message: "Please wait a moment while we confirm your payment. This page will update automatically."
    },
    failed: {
      title: "Payment Issue",
      subtitle: "There was a problem with your payment",
      message: "Your payment could not be processed. Please try again or contact us for assistance.",
      tryAgain: "Try Again"
    },
    bookingDetails: "Booking Details",
    experience: "Experience",
    dates: "Dates",
    city: "City",
    depositPaid: "Deposit Paid",
    totalPrice: "Total Price",
    remaining: "Remaining Balance",
    backHome: "Back to Home",
    viewExperiences: "View Experiences"
  },
  fr: {
    loading: "Vérification de votre paiement...",
    success: {
      title: "Paiement réussi !",
      subtitle: "Votre acompte a été reçu",
      thankYou: "Merci d'avoir réservé avec The Bridge !",
      nextSteps: "Prochaines étapes",
      step1: "Vous recevrez un email de confirmation sous peu",
      step2: "Un référent local vous contactera dans les 24 heures",
      step3: "Vous rejoindrez le \"Cercle des Explorateurs\" pour suivre la formation du groupe",
      step4: "Une fois le groupe de 10 participants atteint, votre réservation est confirmée"
    },
    pending: {
      title: "Paiement en cours",
      subtitle: "Votre paiement est en cours de traitement",
      message: "Veuillez patienter pendant que nous confirmons votre paiement. Cette page se mettra à jour automatiquement."
    },
    failed: {
      title: "Problème de paiement",
      subtitle: "Un problème est survenu avec votre paiement",
      message: "Votre paiement n'a pas pu être traité. Veuillez réessayer ou nous contacter pour obtenir de l'aide.",
      tryAgain: "Réessayer"
    },
    bookingDetails: "Détails de la réservation",
    experience: "Expérience",
    dates: "Dates",
    city: "Ville",
    depositPaid: "Acompte payé",
    totalPrice: "Prix total",
    remaining: "Solde restant",
    backHome: "Retour à l'accueil",
    viewExperiences: "Voir les expériences"
  },
  es: {
    loading: "Verificando su pago...",
    success: {
      title: "¡Pago exitoso!",
      subtitle: "Su depósito ha sido recibido",
      thankYou: "¡Gracias por reservar con The Bridge!",
      nextSteps: "Próximos pasos",
      step1: "Recibirá un correo de confirmación en breve",
      step2: "Un referente local lo contactará en 24 horas",
      step3: "Se unirá al \"Círculo de Exploradores\" para seguir la formación del grupo",
      step4: "Una vez que el grupo alcance 10 participantes, su reserva estará confirmada"
    },
    pending: {
      title: "Pago en proceso",
      subtitle: "Su pago está siendo procesado",
      message: "Por favor espere mientras confirmamos su pago. Esta página se actualizará automáticamente."
    },
    failed: {
      title: "Problema de pago",
      subtitle: "Hubo un problema con su pago",
      message: "No se pudo procesar su pago. Por favor intente de nuevo o contáctenos.",
      tryAgain: "Intentar de nuevo"
    },
    bookingDetails: "Detalles de la reserva",
    experience: "Experiencia",
    dates: "Fechas",
    city: "Ciudad",
    depositPaid: "Depósito pagado",
    totalPrice: "Precio total",
    remaining: "Saldo restante",
    backHome: "Volver al inicio",
    viewExperiences: "Ver experiencias"
  },
  pt: {
    loading: "Verificando seu pagamento...",
    success: {
      title: "Pagamento bem-sucedido!",
      subtitle: "Seu depósito foi recebido",
      thankYou: "Obrigado por reservar com The Bridge!",
      nextSteps: "Próximos passos",
      step1: "Você receberá um email de confirmação em breve",
      step2: "Um referente local entrará em contato em 24 horas",
      step3: "Você entrará no \"Círculo dos Exploradores\" para acompanhar a formação do grupo",
      step4: "Quando o grupo atingir 10 participantes, sua reserva estará confirmada"
    },
    pending: {
      title: "Pagamento em processamento",
      subtitle: "Seu pagamento está sendo processado",
      message: "Por favor aguarde enquanto confirmamos seu pagamento. Esta página será atualizada automaticamente."
    },
    failed: {
      title: "Problema de pagamento",
      subtitle: "Houve um problema com seu pagamento",
      message: "Seu pagamento não pôde ser processado. Por favor tente novamente ou entre em contato.",
      tryAgain: "Tentar novamente"
    },
    bookingDetails: "Detalhes da reserva",
    experience: "Experiência",
    dates: "Datas",
    city: "Cidade",
    depositPaid: "Depósito pago",
    totalPrice: "Preço total",
    remaining: "Saldo restante",
    backHome: "Voltar ao início",
    viewExperiences: "Ver experiências"
  },
  de: {
    loading: "Zahlung wird überprüft...",
    success: {
      title: "Zahlung erfolgreich!",
      subtitle: "Ihre Anzahlung wurde erhalten",
      thankYou: "Vielen Dank für Ihre Buchung bei The Bridge!",
      nextSteps: "Nächste Schritte",
      step1: "Sie erhalten in Kürze eine Bestätigungs-E-Mail",
      step2: "Ein lokaler Ansprechpartner wird Sie innerhalb von 24 Stunden kontaktieren",
      step3: "Sie treten dem \"Kreis der Entdecker\" bei, um die Gruppenbildung zu verfolgen",
      step4: "Sobald die Gruppe 10 Teilnehmer erreicht, ist Ihre Buchung bestätigt"
    },
    pending: {
      title: "Zahlung wird verarbeitet",
      subtitle: "Ihre Zahlung wird bearbeitet",
      message: "Bitte warten Sie, während wir Ihre Zahlung bestätigen. Diese Seite wird automatisch aktualisiert."
    },
    failed: {
      title: "Zahlungsproblem",
      subtitle: "Es gab ein Problem mit Ihrer Zahlung",
      message: "Ihre Zahlung konnte nicht verarbeitet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns.",
      tryAgain: "Erneut versuchen"
    },
    bookingDetails: "Buchungsdetails",
    experience: "Erlebnis",
    dates: "Termine",
    city: "Stadt",
    depositPaid: "Anzahlung bezahlt",
    totalPrice: "Gesamtpreis",
    remaining: "Restbetrag",
    backHome: "Zurück zur Startseite",
    viewExperiences: "Erlebnisse ansehen"
  },
  it: {
    loading: "Verifica del pagamento...",
    success: {
      title: "Pagamento riuscito!",
      subtitle: "Il tuo acconto è stato ricevuto",
      thankYou: "Grazie per aver prenotato con The Bridge!",
      nextSteps: "Prossimi passi",
      step1: "Riceverai un'email di conferma a breve",
      step2: "Un referente locale ti contatterà entro 24 ore",
      step3: "Entrerai nel \"Circolo degli Esploratori\" per seguire la formazione del gruppo",
      step4: "Una volta raggiunto il gruppo di 10 partecipanti, la tua prenotazione sarà confermata"
    },
    pending: {
      title: "Pagamento in elaborazione",
      subtitle: "Il tuo pagamento è in elaborazione",
      message: "Attendi mentre confermiamo il tuo pagamento. Questa pagina si aggiornerà automaticamente."
    },
    failed: {
      title: "Problema di pagamento",
      subtitle: "Si è verificato un problema con il tuo pagamento",
      message: "Il pagamento non è andato a buon fine. Riprova o contattaci per assistenza.",
      tryAgain: "Riprova"
    },
    bookingDetails: "Dettagli prenotazione",
    experience: "Esperienza",
    dates: "Date",
    city: "Città",
    depositPaid: "Acconto pagato",
    totalPrice: "Prezzo totale",
    remaining: "Saldo rimanente",
    backHome: "Torna alla home",
    viewExperiences: "Vedi esperienze"
  }
};

const BookSuccessPage = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [searchParams] = useSearchParams();
  
  const [status, setStatus] = useState("loading"); // loading, success, pending, failed
  const [paymentData, setPaymentData] = useState(null);
  const [bookingInfo, setBookingInfo] = useState(null);
  
  const sessionId = searchParams.get("session_id");
  const bookingId = searchParams.get("booking_id");
  
  useEffect(() => {
    // Try to get booking info from localStorage
    const pendingBooking = localStorage.getItem('pending_booking');
    if (pendingBooking) {
      try {
        setBookingInfo(JSON.parse(pendingBooking));
      } catch (e) {
        console.error("Failed to parse pending booking:", e);
      }
    }
    
    // Check payment status
    if (sessionId) {
      checkPaymentStatus();
    } else {
      setStatus("failed");
    }
  }, [sessionId]);
  
  const checkPaymentStatus = async () => {
    try {
      const response = await axios.get(`${API}/bookings/payment-status/${sessionId}`);
      setPaymentData(response.data);
      
      if (response.data.payment_status === "paid") {
        setStatus("success");
        // Clear pending booking from localStorage
        localStorage.removeItem('pending_booking');
      } else if (response.data.payment_status === "pending" || response.data.stripe_status === "open") {
        setStatus("pending");
        // Poll again in 3 seconds
        setTimeout(checkPaymentStatus, 3000);
      } else {
        setStatus("failed");
      }
    } catch (error) {
      console.error("Failed to check payment status:", error);
      // If we can't check status but have booking info, assume success (webhook will update)
      if (bookingInfo) {
        setStatus("success");
      } else {
        setStatus("failed");
      }
    }
  };
  
  const getIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="text-ocean animate-spin" size={48} />;
      case "success":
        return <CheckCircle className="text-green-500" size={48} />;
      case "pending":
        return <Clock className="text-yellow-500" size={48} />;
      case "failed":
        return <AlertCircle className="text-red-500" size={48} />;
      default:
        return null;
    }
  };
  
  const depositAmount = paymentData?.amount || bookingInfo?.deposit_amount || 0;
  const totalPrice = bookingInfo?.total_price || depositAmount / 0.3;
  const remainingBalance = totalPrice - depositAmount;
  
  return (
    <PageLayout>
      <section className="py-16 sm:py-24 bg-warmwhite min-h-[70vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Status Icon */}
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              {getIcon()}
            </div>
            
            {/* Loading State */}
            {status === "loading" && (
              <div>
                <h1 className="font-syne font-bold text-2xl text-ocean mb-4">{t.loading}</h1>
              </div>
            )}
            
            {/* Success State */}
            {status === "success" && (
              <div>
                <h1 className="font-syne font-bold text-3xl text-ocean mb-2">{t.success.title}</h1>
                <p className="font-dm text-ocean/70 text-lg mb-6">{t.success.subtitle}</p>
                <p className="font-dm text-ocean/80 mb-8">{t.success.thankYou}</p>
                
                {/* Booking Details Card */}
                <Card className="border-none shadow-lg mb-8 text-left">
                  <CardContent className="p-6">
                    <h3 className="font-syne font-bold text-ocean mb-4">{t.bookingDetails}</h3>
                    <div className="space-y-3">
                      {bookingInfo?.experience && (
                        <div className="flex justify-between">
                          <span className="font-dm text-ocean/70">{t.experience}</span>
                          <span className="font-dm font-medium text-ocean">{bookingInfo.experience}</span>
                        </div>
                      )}
                      {bookingInfo?.dates && (
                        <div className="flex justify-between">
                          <span className="font-dm text-ocean/70">{t.dates}</span>
                          <span className="font-dm font-medium text-ocean">{bookingInfo.dates}</span>
                        </div>
                      )}
                      {bookingInfo?.city && (
                        <div className="flex justify-between">
                          <span className="font-dm text-ocean/70">{t.city}</span>
                          <span className="font-dm font-medium text-ocean">{bookingInfo.city}</span>
                        </div>
                      )}
                      <div className="border-t border-border pt-3 mt-3">
                        <div className="flex justify-between text-green-600">
                          <span className="font-dm">{t.depositPaid}</span>
                          <span className="font-dm font-bold">€{depositAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="font-dm text-ocean/70">{t.totalPrice}</span>
                          <span className="font-dm text-ocean">€{totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="font-dm text-ocean/70">{t.remaining}</span>
                          <span className="font-dm text-ocean">€{remainingBalance.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Next Steps */}
                <Card className="border-none bg-ocean/5 mb-8 text-left">
                  <CardContent className="p-6">
                    <h3 className="font-syne font-bold text-ocean mb-4">{t.success.nextSteps}</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-sunset rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">1</span>
                        </div>
                        <span className="font-dm text-ocean/80">{t.success.step1}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-sunset rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">2</span>
                        </div>
                        <span className="font-dm text-ocean/80">{t.success.step2}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-sunset rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">3</span>
                        </div>
                        <span className="font-dm text-ocean/80">{t.success.step3}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-sunset rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">4</span>
                        </div>
                        <span className="font-dm text-ocean/80">{t.success.step4}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-ocean hover:bg-ocean/90 rounded-full">
                    <Link to="/">{t.backHome}</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link to="/experiences">{t.viewExperiences} <ArrowRight size={16} className="ml-2" /></Link>
                  </Button>
                </div>
              </div>
            )}
            
            {/* Pending State */}
            {status === "pending" && (
              <div>
                <h1 className="font-syne font-bold text-2xl text-ocean mb-2">{t.pending.title}</h1>
                <p className="font-dm text-ocean/70 mb-4">{t.pending.subtitle}</p>
                <p className="font-dm text-ocean/60 text-sm">{t.pending.message}</p>
                <div className="mt-6">
                  <Loader2 className="text-ocean animate-spin mx-auto" size={24} />
                </div>
              </div>
            )}
            
            {/* Failed State */}
            {status === "failed" && (
              <div>
                <h1 className="font-syne font-bold text-2xl text-ocean mb-2">{t.failed.title}</h1>
                <p className="font-dm text-ocean/70 mb-4">{t.failed.subtitle}</p>
                <p className="font-dm text-ocean/60 mb-6">{t.failed.message}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-sunset hover:bg-sunset/90 rounded-full">
                    <Link to="/book">{t.failed.tryAgain}</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link to="/">{t.backHome}</Link>
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default BookSuccessPage;
