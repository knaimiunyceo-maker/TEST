import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Target, MapPin, Calendar, User, Mail, Phone, 
  ArrowRight, Check, Shield, Languages, Camera, Gift,
  ChevronDown, ChevronUp
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

// Minimum days before booking (2 weeks)
const MIN_BOOKING_DAYS = 14;

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
    message: "",
    acceptTerms: false,
    acceptData: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const courseTypeLabel = selectedExperience?.courseTypes?.find(c => c.id === formData.courseType)?.label || '';
    const earlyBirdText = isEarlyBird ? `\nEarly Bird Discount: -€${earlyBirdDiscount} (8%)` : '';
    try {
      await axios.post(`${API}/contact`, {
        name: formData.name,
        email: formData.email,
        message: `BOOKING REQUEST
Experience: ${selectedExperience?.label}${courseTypeLabel ? ` - ${courseTypeLabel}` : ''}
City: ${ALL_CITIES.find(c => c.id === formData.city)?.label}
Duration: ${ALL_DURATIONS.find(d => d.id === formData.duration)?.label}
Start Date: ${formatDate(formData.startDate)}
Base Price: €${price}${earlyBirdText}${registrationFee > 0 ? `\nRegistration Fee: €${registrationFee}` : ''}
TOTAL: €${totalPrice}

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
      case 4: return formData.name !== "" && formData.email !== "" && formData.acceptTerms && formData.acceptData;
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
