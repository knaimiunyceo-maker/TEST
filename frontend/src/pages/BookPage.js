import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Target, MapPin, Calendar, User, Mail, Phone, 
  ArrowRight, Check, Shield, Languages, Camera
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
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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
    durations: ["1week", "2weeks", "3weeks", "4weeks"],
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
    label: "Visual Storytelling Holiday", 
    icon: <Camera size={20} />, 
    prices: { weekend: 260, "5days": 480, "7days": 580 },
    cities: ["marrakech", "agadir"],
    durations: ["weekend", "5days", "7days"]
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
  { id: "4weeks", label: "4 Semaines", weeks: 4 }
];

const BookPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    experience: "",
    courseType: "",
    city: "",
    duration: "",
    startDate: null,
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const totalPrice = price + registrationFee;

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString('en-GB', { 
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' 
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const courseTypeLabel = selectedExperience?.courseTypes?.find(c => c.id === formData.courseType)?.label || '';
    try {
      await axios.post(`${API}/contact`, {
        name: formData.name,
        email: formData.email,
        message: `BOOKING REQUEST
Experience: ${selectedExperience?.label}${courseTypeLabel ? ` - ${courseTypeLabel}` : ''}
City: ${ALL_CITIES.find(c => c.id === formData.city)?.label}
Duration: ${ALL_DURATIONS.find(d => d.id === formData.duration)?.label}
Start Date: ${formatDate(formData.startDate)}
Price: €${price}${registrationFee > 0 ? ` + €${registrationFee} (inscription) = €${totalPrice}` : ''}

Phone: ${formData.phone || 'Not provided'}
Additional Message: ${formData.message || 'None'}`,
        trip_interest: selectedExperience?.label
      });
      
      toast.success("Booking request sent!", {
        description: "We'll contact you within 24 hours to confirm your booking."
      });
      setStep(5); // Success step
    } catch (error) {
      toast.error("Error sending request", {
        description: "Please try again or contact us directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch(step) {
      case 1: return formData.experience !== "";
      case 2: 
        if (formData.experience === "language") {
          return formData.city !== "" && formData.courseType !== "";
        }
        return formData.city !== "";
      case 3: return formData.duration !== "" && formData.startDate !== null;
      case 4: return formData.name !== "" && formData.email !== "";
      default: return false;
    }
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

          {/* Step 2: Choose City (+ Course Type for Language) */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
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
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Choose Dates */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
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
                    <label className="font-dm font-medium text-ocean text-sm mb-2 block">Start Date</label>
                    {formData.startDate && (
                      <p className="font-dm text-sunset mb-2">Selected: <strong>{formatDate(formData.startDate)}</strong></p>
                    )}
                    <div className="flex justify-center">
                      <CalendarComponent
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                        weekStartsOn={1}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                        className="rounded-xl border border-border"
                      />
                    </div>
                  </div>
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
                  
                  <div className="space-y-4">
                    <div>
                      <label className="font-dm font-medium text-ocean text-sm mb-2 flex items-center gap-2">
                        <User size={16} /> Nom complet *
                      </label>
                      <Input 
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Votre nom complet"
                        className="border-border rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-dm font-medium text-ocean text-sm mb-2 flex items-center gap-2">
                        <Mail size={16} /> Email *
                      </label>
                      <Input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="votre@email.com"
                        className="border-border rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-dm font-medium text-ocean text-sm mb-2 flex items-center gap-2">
                        <Phone size={16} /> Téléphone (optionnel)
                      </label>
                      <Input 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+33 6 12 34 56 78"
                        className="border-border rounded-xl"
                      />
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
                          <span className="text-ocean/70">Prix:</span>
                          <span className="font-medium text-ocean">€{price}</span>
                        </div>
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
                  <h2 className="font-syne font-bold text-2xl text-ocean mb-2">Booking Request Sent!</h2>
                  <p className="font-dm text-ocean/70 mb-6">
                    Thank you for your interest. We'll contact you within 24 hours to confirm your booking and provide payment details.
                  </p>
                  <Button asChild className="bg-sunset hover:bg-sunset/90 text-white rounded-full">
                    <Link to="/">Back to Home</Link>
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
    </PageLayout>
  );
};

export default BookPage;
