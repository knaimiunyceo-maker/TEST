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
  { id: "self-defense", label: "Self-Defense Holiday", icon: <Shield size={20} />, prices: { weekend: 250, "5days": 450, "7days": 550 } },
  { id: "language", label: "Language Practice Holiday", icon: <Languages size={20} />, prices: { weekend: 220, "5days": 400, "7days": 500 } },
  { id: "storytelling", label: "Visual Storytelling Holiday", icon: <Camera size={20} />, prices: { weekend: 260, "5days": 480, "7days": 580 } }
];

const CITIES = [
  { id: "casablanca", label: "Casablanca" },
  { id: "marrakech", label: "Marrakech" },
  { id: "agadir", label: "Agadir" }
];

const DURATIONS = [
  { id: "weekend", label: "Weekend (2 nights / 3 days)" },
  { id: "5days", label: "5 Days Experience" },
  { id: "7days", label: "7 Days / 6 Nights" }
];

const BookPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    experience: "",
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
  const price = selectedExperience?.prices[formData.duration] || 0;

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString('en-GB', { 
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' 
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await axios.post(`${API}/contact`, {
        name: formData.name,
        email: formData.email,
        message: `BOOKING REQUEST
Experience: ${selectedExperience?.label}
City: ${CITIES.find(c => c.id === formData.city)?.label}
Duration: ${DURATIONS.find(d => d.id === formData.duration)?.label}
Start Date: ${formatDate(formData.startDate)}
Price: €${price}

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
      case 2: return formData.city !== "";
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
              Book Your Experience
            </h1>
            <p className="font-dm text-white/80 text-lg">
              Complete the steps below to request your booking.
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

          {/* Step 2: Choose City */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="text-sunset" size={24} />
                    <h2 className="font-syne font-bold text-xl text-ocean">Choose Your City</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {CITIES.map((city) => (
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
                    <h2 className="font-syne font-bold text-xl text-ocean">Choose Duration & Dates</h2>
                  </div>
                  
                  <div className="mb-6">
                    <label className="font-dm font-medium text-ocean text-sm mb-2 block">Duration</label>
                    <Select value={formData.duration} onValueChange={(v) => setFormData(prev => ({ ...prev, duration: v }))}>
                      <SelectTrigger className="border-border rounded-xl">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {DURATIONS.map((d) => (
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
                        <User size={16} /> Full Name *
                      </label>
                      <Input 
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your full name"
                        className="border-border rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-dm font-medium text-ocean text-sm mb-2 flex items-center gap-2">
                        <Mail size={16} /> Email Address *
                      </label>
                      <Input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="border-border rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-dm font-medium text-ocean text-sm mb-2 flex items-center gap-2">
                        <Phone size={16} /> Phone (optional)
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
                      <label className="font-dm font-medium text-ocean text-sm mb-2">Additional Message</label>
                      <Textarea 
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Any questions or special requests?"
                        className="border-border rounded-xl"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mt-6 p-4 bg-warmwhite rounded-xl">
                    <h3 className="font-syne font-bold text-ocean mb-3">Booking Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-ocean/70">Experience:</span>
                        <span className="font-medium text-ocean">{selectedExperience?.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ocean/70">City:</span>
                        <span className="font-medium text-ocean">{CITIES.find(c => c.id === formData.city)?.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ocean/70">Duration:</span>
                        <span className="font-medium text-ocean">{DURATIONS.find(d => d.id === formData.duration)?.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ocean/70">Start Date:</span>
                        <span className="font-medium text-ocean">{formatDate(formData.startDate)}</span>
                      </div>
                      <div className="border-t border-border pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="font-syne font-bold text-ocean">Total:</span>
                          <span className="font-syne font-bold text-sunset text-xl">€{price}</span>
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
                  Back
                </Button>
              ) : <div />}
              
              {step < 4 ? (
                <Button 
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="bg-sunset hover:bg-sunset/90 text-white rounded-full"
                >
                  Continue <ArrowRight size={16} className="ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="bg-sunset hover:bg-sunset/90 text-white rounded-full"
                >
                  {isSubmitting ? "Sending..." : "Submit Booking Request"}
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
