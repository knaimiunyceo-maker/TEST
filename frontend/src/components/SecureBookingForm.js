import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Phone, Calendar, Clock, Users, 
  Loader2, CheckCircle, AlertCircle, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

// Blocked email domains (suspicious/test domains)
const BLOCKED_DOMAINS = [
  "test.com", "example.com", "example.org", "example.net",
  "mailinator.com", "guerrillamail.com", "10minutemail.com",
  "tempmail.com", "throwaway.email", "fakeinbox.com",
  "yopmail.com", "temp-mail.org", "getnada.com"
];

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Time slots for booking
const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00"
];

// Number of people options
const PEOPLE_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const SecureBookingForm = ({ onSubmit, experienceTitle = "Expérience THE BRIDGE" }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    numberOfPeople: "",
    honeypot: "" // Anti-bot honeypot field
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [turnstileToken, setTurnstileToken] = useState(null);
  const formRef = useRef(null);

  // Validate email with domain blocking
  const validateEmail = (email) => {
    if (!email) return "L'adresse email est requise";
    if (!EMAIL_REGEX.test(email)) return "Format d'email invalide";
    
    const domain = email.split("@")[1]?.toLowerCase();
    if (BLOCKED_DOMAINS.includes(domain)) {
      return "Veuillez utiliser une adresse email professionnelle";
    }
    
    return null;
  };

  // Validate phone number
  const validatePhone = (phone) => {
    if (!phone) return "Le numéro de téléphone est requis";
    if (!isValidPhoneNumber(phone)) return "Numéro de téléphone invalide";
    return null;
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    
    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Le nom complet est requis";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Le nom doit contenir au moins 3 caractères";
    }
    
    // Email validation
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    // Phone validation
    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;
    
    // Date validation
    if (!formData.date) {
      newErrors.date = "La date est requise";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const minDate = new Date(today);
      minDate.setDate(minDate.getDate() + 14); // Minimum 14 days in advance
      
      if (selectedDate < minDate) {
        newErrors.date = "La date doit être au moins 14 jours à l'avance";
      }
    }
    
    // Time validation
    if (!formData.time) {
      newErrors.time = "L'heure est requise";
    }
    
    // Number of people validation
    if (!formData.numberOfPeople) {
      newErrors.numberOfPeople = "Le nombre de personnes est requis";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check - if filled, silently fail (bot detected)
    if (formData.honeypot) {
      console.log("Bot detected via honeypot");
      setSubmitStatus("success"); // Fake success to fool bots
      return;
    }
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Prepare submission data (exclude honeypot)
      const submissionData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        numberOfPeople: formData.numberOfPeople,
        experience: experienceTitle,
        turnstileToken: turnstileToken,
        timestamp: new Date().toISOString()
      };
      
      if (onSubmit) {
        await onSubmit(submissionData);
      }
      
      setSubmitStatus("success");
      // Reset form on success
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        numberOfPeople: "",
        honeypot: ""
      });
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (14 days from today)
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toISOString().split("T")[0];
  };

  // Handle field change with error clearing
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  return (
    <Card className="border-none shadow-2xl overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-ocean to-ocean/90 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="text-sand" size={24} />
            <h2 className="font-syne font-bold text-xl">Réservation Sécurisée</h2>
          </div>
          <p className="font-dm text-white/80 text-sm">
            {experienceTitle}
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Honeypot field - invisible to users, filled by bots */}
          <input
            type="text"
            name="website"
            value={formData.honeypot}
            onChange={(e) => setFormData(prev => ({ ...prev, honeypot: e.target.value }))}
            autoComplete="off"
            tabIndex={-1}
            style={{
              position: "absolute",
              left: "-9999px",
              opacity: 0,
              height: 0,
              width: 0
            }}
            aria-hidden="true"
          />

          {/* Full Name */}
          <div>
            <label className="font-dm font-medium text-ocean text-sm mb-2 flex items-center gap-2">
              <User size={16} className="text-sunset" /> Nom complet *
            </label>
            <Input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Jean Dupont"
              className={`border-border rounded-xl py-5 ${errors.fullName ? "border-red-500 focus:border-red-500" : "focus:border-sunset"}`}
            />
            <AnimatePresence>
              {errors.fullName && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle size={12} /> {errors.fullName}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Email */}
          <div>
            <label className="font-dm font-medium text-ocean text-sm mb-2 flex items-center gap-2">
              <Mail size={16} className="text-sunset" /> Adresse email *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="jean.dupont@email.com"
              className={`border-border rounded-xl py-5 ${errors.email ? "border-red-500 focus:border-red-500" : "focus:border-sunset"}`}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle size={12} /> {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Phone with International Format */}
          <div>
            <label className="font-dm font-medium text-ocean text-sm mb-2 flex items-center gap-2">
              <Phone size={16} className="text-sunset" /> Téléphone *
            </label>
            <div className={`phone-input-wrapper rounded-xl border ${errors.phone ? "border-red-500" : "border-border"} overflow-hidden`}>
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="FR"
                value={formData.phone}
                onChange={(value) => handleChange("phone", value || "")}
                placeholder="6 12 34 56 78"
                className="phone-input-custom"
              />
            </div>
            <AnimatePresence>
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle size={12} /> {errors.phone}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Date and Time Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="font-dm font-medium text-ocean text-sm mb-2 flex items-center gap-2">
                <Calendar size={16} className="text-sunset" /> Date *
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                min={getMinDate()}
                className={`border-border rounded-xl py-5 ${errors.date ? "border-red-500 focus:border-red-500" : "focus:border-sunset"}`}
              />
              <AnimatePresence>
                {errors.date && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
                    <AlertCircle size={12} /> {errors.date}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Time */}
            <div>
              <label className="font-dm font-medium text-ocean text-sm mb-2 flex items-center gap-2">
                <Clock size={16} className="text-sunset" /> Heure *
              </label>
              <Select value={formData.time} onValueChange={(v) => handleChange("time", v)}>
                <SelectTrigger className={`border-border rounded-xl py-5 ${errors.time ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <AnimatePresence>
                {errors.time && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
                    <AlertCircle size={12} /> {errors.time}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Number of People */}
          <div>
            <label className="font-dm font-medium text-ocean text-sm mb-2 flex items-center gap-2">
              <Users size={16} className="text-sunset" /> Nombre de personnes *
            </label>
            <Select value={formData.numberOfPeople} onValueChange={(v) => handleChange("numberOfPeople", v)}>
              <SelectTrigger className={`border-border rounded-xl py-5 ${errors.numberOfPeople ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Sélectionner le nombre" />
              </SelectTrigger>
              <SelectContent>
                {PEOPLE_OPTIONS.map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num} {num === 1 ? "personne" : "personnes"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <AnimatePresence>
              {errors.numberOfPeople && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle size={12} /> {errors.numberOfPeople}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Cloudflare Turnstile Placeholder */}
          <div id="turnstile-container" className="flex justify-center">
            {/* 
              Cloudflare Turnstile Integration:
              Add your Turnstile site key and uncomment:
              
              <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
              
              Then add the widget:
              <div 
                className="cf-turnstile" 
                data-sitekey="YOUR_SITE_KEY"
                data-callback={(token) => setTurnstileToken(token)}
              />
            */}
            <div className="text-xs text-ocean/40 text-center py-2">
              <Shield size={14} className="inline mr-1" />
              Protection anti-bot activée
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sunset hover:bg-sunset/90 text-white rounded-xl py-6 font-syne font-bold text-base transition-all disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                Envoi en cours...
              </span>
            ) : (
              "Confirmer la Réservation"
            )}
          </Button>

          {/* Status Messages */}
          <AnimatePresence>
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-4 bg-green-50 border border-green-200 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 mt-0.5" size={20} />
                  <div>
                    <p className="font-syne font-bold text-green-800">Demande envoyée avec succès !</p>
                    <p className="font-dm text-green-700 text-sm mt-1">
                      Un email de vérification a été envoyé à votre adresse. 
                      Veuillez cliquer sur le lien pour confirmer votre réservation.
                    </p>
                    <p className="font-dm text-green-600 text-xs mt-2">
                      (Double Opt-in : Vérifiez également vos spams)
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-4 bg-red-50 border border-red-200 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-red-600 mt-0.5" size={20} />
                  <div>
                    <p className="font-syne font-bold text-red-800">Erreur lors de l'envoi</p>
                    <p className="font-dm text-red-700 text-sm mt-1">
                      Veuillez réessayer ou nous contacter directement.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Security Note */}
          <p className="text-center text-xs text-ocean/50 font-dm">
            <Shield size={12} className="inline mr-1" />
            Vos données sont protégées et ne seront jamais partagées.
          </p>
        </form>
      </CardContent>

      {/* Custom styles for phone input */}
      <style>{`
        .phone-input-wrapper {
          background: white;
        }
        .phone-input-custom {
          padding: 0.75rem 1rem;
        }
        .phone-input-custom .PhoneInputInput {
          border: none;
          outline: none;
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          width: 100%;
        }
        .phone-input-custom .PhoneInputCountry {
          margin-right: 0.75rem;
        }
        .phone-input-custom .PhoneInputCountryIcon {
          width: 1.5rem;
          height: 1rem;
          border-radius: 2px;
          overflow: hidden;
        }
        .phone-input-custom .PhoneInputCountrySelectArrow {
          margin-left: 0.25rem;
          opacity: 0.5;
        }
      `}</style>
    </Card>
  );
};

export default SecureBookingForm;
