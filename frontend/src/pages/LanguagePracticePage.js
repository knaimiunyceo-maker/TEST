import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Calendar as CalendarIcon, Clock, Users, Award, 
  BookOpen, CheckCircle, Globe, GraduationCap, Languages,
  Mail, User, Info, Star, Sun, Moon, X, ChevronDown, ChevronUp,
  ArrowRight, MapPin, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Toaster, toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import PageLayout from "./components/PageLayout";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ============================================
// PRICING CONFIG - Easy to update prices here
// ============================================
const PRICING_CONFIG = {
  pricePerWeek: 215,        // €215 per week
  registrationFee: 45,      // €45 one-time fee
  currency: "€",
  maxWeeks: 12
};

// Week options for dropdown
const WEEK_OPTIONS = [
  { value: "1", label: "1 week", weeks: 1 },
  { value: "2", label: "2 weeks", weeks: 2 },
  { value: "3", label: "3 weeks", weeks: 3 },
  { value: "4", label: "4 weeks", weeks: 4 },
  { value: "5", label: "5 weeks", weeks: 5 },
  { value: "6", label: "6 weeks", weeks: 6 },
  { value: "7", label: "7 weeks", weeks: 7 },
  { value: "8", label: "8 weeks", weeks: 8 },
  { value: "9", label: "9 weeks", weeks: 9 },
  { value: "10", label: "10 weeks", weeks: 10 },
  { value: "11", label: "11 weeks", weeks: 11 },
  { value: "12", label: "12 weeks", weeks: 12 }
];

const COURSE_LEVELS = [
  { id: "a1", name: "A1 - Beginner", description: "No prior knowledge" },
  { id: "a2", name: "A2 - Elementary", description: "Basic phrases" },
  { id: "b1", name: "B1 - Intermediate", description: "Independent user" },
  { id: "b2", name: "B2 - Upper Intermediate", description: "Complex texts" },
  { id: "c1", name: "C1 - Advanced", description: "Fluent expression" }
];

// Schedule data for rotating timetable
const SCHEDULE_DATA = {
  weekA: {
    name: "Week A",
    sessions: [
      { day: "Monday", time: "09:00 - 13:00", type: "morning" },
      { day: "Tuesday", time: "14:00 - 18:00", type: "afternoon" },
      { day: "Wednesday", time: "09:00 - 13:00", type: "morning" },
      { day: "Thursday", time: "14:00 - 18:00", type: "afternoon" },
      { day: "Friday", time: "09:00 - 13:00", type: "morning" }
    ]
  },
  weekB: {
    name: "Week B",
    sessions: [
      { day: "Monday", time: "14:00 - 18:00", type: "afternoon" },
      { day: "Tuesday", time: "09:00 - 13:00", type: "morning" },
      { day: "Wednesday", time: "14:00 - 18:00", type: "afternoon" },
      { day: "Thursday", time: "09:00 - 13:00", type: "morning" },
      { day: "Friday", time: "14:00 - 18:00", type: "afternoon" }
    ]
  }
};

const INCLUSIONS = [
  { icon: <BookOpen size={28} />, title: "20 Lessons/week", description: "4 hours daily, 5 days a week" },
  { icon: <Award size={28} />, title: "Certificate", description: "End-of-course certificate" },
  { icon: <GraduationCap size={28} />, title: "Level Test", description: "Placement test included" },
  { icon: <Users size={28} />, title: "5 Social Activities", description: "Weekly activities included" }
];

// Get first Mondays for beginner start dates
const getFirstMondaysOfNextMonths = (count = 6) => {
  const dates = [];
  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  for (let i = 0; i < count; i++) {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const dayOfWeek = firstDay.getDay();
    const daysUntilMonday = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek;
    const firstMonday = new Date(currentYear, currentMonth, 1 + daysUntilMonday);
    
    if (firstMonday > today) {
      dates.push(firstMonday);
    }
    
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
  }
  
  return dates.slice(0, count);
};

// Booking Modal Component
const BookingModal = ({ isOpen, onClose, bookingDetails }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/contact`, {
        name: formData.name,
        email: formData.email,
        message: `Language Course Booking Request:
- Duration: ${bookingDetails.weeks} weeks
- Level: ${bookingDetails.level}
- Start Date: ${bookingDetails.startDate}
- Tuition: ${bookingDetails.tuition}
- Registration Fee: ${bookingDetails.registrationFee}
- Total: ${bookingDetails.total}`,
        trip_interest: "Language Practice Holiday"
      });
      
      toast.success("Booking request sent!", {
        description: "We'll contact you within 24 hours to confirm your booking."
      });
      onClose();
    } catch (error) {
      toast.error("Error sending request", {
        description: "Please try again or contact us directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-syne font-bold text-xl text-ocean">Complete Your Booking</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} className="text-ocean/60" />
            </button>
          </div>

          {/* Booking Summary */}
          <div className="bg-warmwhite rounded-xl p-4 mb-6">
            <h4 className="font-dm font-semibold text-ocean mb-3">Booking Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ocean/70">Duration:</span>
                <span className="font-medium text-ocean">{bookingDetails.weeks} weeks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ocean/70">Level:</span>
                <span className="font-medium text-ocean">{bookingDetails.level}</span>
              </div>
              {bookingDetails.startDate && (
                <div className="flex justify-between">
                  <span className="text-ocean/70">Start Date:</span>
                  <span className="font-medium text-ocean">{bookingDetails.startDate}</span>
                </div>
              )}
              <div className="border-t border-border pt-2 mt-2 space-y-1">
                <div className="flex justify-between">
                  <span className="text-ocean/70">Tuition ({bookingDetails.weeks} weeks):</span>
                  <span className="font-medium text-ocean">{bookingDetails.tuition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ocean/70">Registration Fee:</span>
                  <span className="font-medium text-ocean">{bookingDetails.registrationFee}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-semibold text-ocean">Total:</span>
                  <span className="font-syne font-bold text-sunset text-lg">{bookingDetails.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-dm font-medium text-ocean text-sm flex items-center gap-2 mb-2">
                <User size={16} /> Full Name
              </label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                className="border-border focus:border-sunset rounded-xl"
              />
            </div>
            
            <div>
              <label className="font-dm font-medium text-ocean text-sm flex items-center gap-2 mb-2">
                <Mail size={16} /> Email Address
              </label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
                className="border-border focus:border-sunset rounded-xl"
              />
            </div>

            <div>
              <label className="font-dm font-medium text-ocean text-sm flex items-center gap-2 mb-2">
                <Globe size={16} /> Phone (optional)
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+33 6 12 34 56 78"
                className="border-border focus:border-sunset rounded-xl"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-sunset hover:bg-sunset/90 text-white rounded-full py-6 font-syne font-bold"
            >
              {isSubmitting ? "Sending..." : "Confirm Booking Request"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// Main Page Component
const LanguagePracticePage = () => {
  const [selectedWeeks, setSelectedWeeks] = useState("4");
  const [selectedLevel, setSelectedLevel] = useState("a2");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Calculate pricing
  const weeks = parseInt(selectedWeeks);
  const tuitionCost = PRICING_CONFIG.pricePerWeek * weeks;
  const totalAmount = tuitionCost + PRICING_CONFIG.registrationFee;

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString('en-GB', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getBookingDetails = () => ({
    weeks: weeks,
    level: COURSE_LEVELS.find(l => l.id === selectedLevel)?.name || "",
    startDate: selectedStartDate ? formatDate(selectedStartDate) : "To be confirmed",
    tuition: `${PRICING_CONFIG.currency}${tuitionCost}`,
    registrationFee: `${PRICING_CONFIG.currency}${PRICING_CONFIG.registrationFee}`,
    total: `${PRICING_CONFIG.currency}${totalAmount}`
  });

  // Clear start date function
  const clearSelection = () => {
    setSelectedWeeks("4");
    setSelectedStartDate(null);
  };

  return (
    <div className="min-h-screen bg-warmwhite">
      <Toaster position="top-right" richColors />
      
      {/* Header */}
      <header className="bg-ocean text-white py-4 px-4 sm:px-6 lg:px-12 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-sand transition-colors">
            <ArrowLeft size={20} />
            <span className="font-dm">Back to Home</span>
          </Link>
          <span className="font-syne font-bold text-lg">THE BRIDGE</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-ocean to-ocean/90 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-sand rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-sunset rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Languages size={20} className="text-sand" />
              <span className="font-dm text-sm">Language Practice Holiday</span>
            </div>
            
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
              Intensive English Course
            </h1>
            <p className="font-dm text-white/80 text-lg max-w-2xl mx-auto mb-2">
              This course includes 20 intensive weekly lessons
            </p>
            <p className="font-dm text-white/60 text-base max-w-2xl mx-auto">
              Immerse yourself in English while exploring Morocco. 
              Real conversations, cultural experiences, and unforgettable memories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Duration Selection - Dropdown Style like Taronja */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h2 className="font-syne font-bold text-xl text-ocean mb-4 flex items-center gap-2">
                    <Clock className="text-sunset" size={22} />
                    Duration
                  </h2>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <Select value={selectedWeeks} onValueChange={setSelectedWeeks}>
                        <SelectTrigger 
                          className="border-2 border-ocean/20 rounded-xl py-6 text-base font-dm focus:border-sunset"
                          data-testid="weeks-select"
                        >
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {WEEK_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <span className="font-dm">{option.label}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {(selectedWeeks !== "4" || selectedStartDate) && (
                      <button
                        onClick={clearSelection}
                        className="text-sunset hover:text-sunset/70 font-dm text-sm underline transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Start Date Selection - Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h2 className="font-syne font-bold text-xl text-ocean mb-4 flex items-center gap-2">
                    <CalendarIcon className="text-sunset" size={22} />
                    Start Date
                  </h2>
                  
                  {selectedStartDate && (
                    <div className="mb-4 p-3 bg-sunset/10 rounded-lg flex items-center justify-between">
                      <span className="font-dm text-ocean">
                        Selected: <strong>{formatDate(selectedStartDate)}</strong>
                      </span>
                      <button 
                        onClick={() => setSelectedStartDate(null)}
                        className="text-sunset hover:text-sunset/70 text-sm underline"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                  
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedStartDate}
                      onSelect={setSelectedStartDate}
                      weekStartsOn={1}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today || date.getDay() !== 1;
                      }}
                      className="rounded-xl border border-border"
                      classNames={{
                        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                        month: "space-y-4",
                        caption: "flex justify-center pt-1 relative items-center",
                        caption_label: "text-sm font-syne font-bold text-ocean",
                        nav: "space-x-1 flex items-center",
                        nav_button: "h-8 w-8 bg-transparent p-0 opacity-70 hover:opacity-100 hover:bg-sand/30 rounded-full transition-colors inline-flex items-center justify-center",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-ocean/60 rounded-md w-10 font-dm font-medium text-[0.8rem]",
                        row: "flex w-full mt-2",
                        cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-sunset/20 [&:has([aria-selected])]:rounded-lg",
                        day: "h-10 w-10 p-0 font-dm font-normal hover:bg-sand/30 rounded-lg transition-colors inline-flex items-center justify-center",
                        day_selected: "bg-sunset text-white hover:bg-sunset hover:text-white focus:bg-sunset focus:text-white rounded-lg",
                        day_today: "bg-ocean/10 text-ocean font-bold",
                        day_outside: "text-ocean/30",
                        day_disabled: "text-ocean/20 hover:bg-transparent cursor-not-allowed",
                        day_hidden: "invisible",
                      }}
                      data-testid="start-date-calendar"
                    />
                  </div>
                  
                  <p className="text-center text-ocean/60 text-sm mt-4 font-dm">
                    <Info size={14} className="inline mr-1" />
                    Courses start every Monday. Select your preferred start date.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Course Level */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h2 className="font-syne font-bold text-xl text-ocean mb-4 flex items-center gap-2">
                    <GraduationCap className="text-sunset" size={22} />
                    Your English Level
                  </h2>
                  
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="border-2 border-ocean/20 rounded-xl py-6 text-base font-dm focus:border-sunset" data-testid="level-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COURSE_LEVELS.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          <div className="flex flex-col">
                            <span className="font-dm font-medium">{level.name}</span>
                            <span className="text-xs text-ocean/60">{level.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </motion.div>

            {/* Schedule Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h2 className="font-syne font-bold text-xl text-ocean mb-2 flex items-center gap-2">
                    <Clock className="text-sunset" size={22} />
                    The Schedule
                  </h2>
                  <p className="font-dm text-ocean/70 text-sm mb-6">
                    Rotating timetable — alternating morning and afternoon sessions each week
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(SCHEDULE_DATA).map(([key, week]) => (
                      <div key={key} className="bg-warmwhite rounded-xl p-4">
                        <h3 className="font-syne font-bold text-ocean mb-4 flex items-center gap-2">
                          {key === 'weekA' ? <Sun className="text-sand" size={18} /> : <Moon className="text-ocean/60" size={18} />}
                          {week.name}
                        </h3>
                        <div className="space-y-2">
                          {week.sessions.map((session, idx) => (
                            <div
                              key={idx}
                              className={`flex justify-between items-center p-3 rounded-lg ${
                                session.type === 'morning' 
                                  ? 'bg-sand/20' 
                                  : 'bg-ocean/10'
                              }`}
                            >
                              <span className="font-dm text-ocean">{session.day}</span>
                              <span className={`font-dm font-medium text-sm px-3 py-1 rounded-full ${
                                session.type === 'morning'
                                  ? 'bg-sand text-ocean'
                                  : 'bg-ocean text-white'
                              }`}>
                                {session.time}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Inclusions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h2 className="font-syne font-bold text-xl text-ocean mb-6 flex items-center gap-2">
                    <CheckCircle className="text-sunset" size={22} />
                    Included in your course
                  </h2>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {INCLUSIONS.map((item, index) => (
                      <div
                        key={index}
                        className="bg-warmwhite rounded-xl p-4 text-center hover:shadow-md transition-shadow"
                      >
                        <div className="w-14 h-14 bg-sunset/10 rounded-full flex items-center justify-center mx-auto mb-3 text-sunset">
                          {item.icon}
                        </div>
                        <h4 className="font-syne font-bold text-ocean text-sm mb-1">{item.title}</h4>
                        <p className="font-dm text-ocean/60 text-xs">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Price Summary (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-none shadow-xl bg-gradient-to-br from-ocean to-ocean/90 text-white overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Star className="text-sand" size={20} />
                      <h3 className="font-syne font-bold text-lg">Price Summary</h3>
                    </div>

                    {/* Price Display - Taronja Style */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 mb-6 text-center">
                      <div className="mb-2">
                        <span className="font-syne font-bold text-4xl text-sand">
                          {PRICING_CONFIG.currency}{tuitionCost}
                        </span>
                      </div>
                      <p className="font-dm text-white/80 text-sm">
                        + {PRICING_CONFIG.currency}{PRICING_CONFIG.registrationFee} Registration Fee
                      </p>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-dm text-white/70">Tuition ({weeks} week{weeks > 1 ? 's' : ''})</span>
                        <span className="font-dm font-medium">{PRICING_CONFIG.currency}{tuitionCost}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-dm text-white/70">Registration Fee</span>
                        <span className="font-dm font-medium">{PRICING_CONFIG.currency}{PRICING_CONFIG.registrationFee}</span>
                      </div>
                      <div className="border-t border-white/20 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="font-syne font-bold">Total Amount</span>
                          <span className="font-syne font-bold text-2xl text-sand">
                            {PRICING_CONFIG.currency}{totalAmount}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">Duration:</span>
                        <span className="font-medium">{weeks} week{weeks > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Level:</span>
                        <span className="font-medium">{COURSE_LEVELS.find(l => l.id === selectedLevel)?.name.split(' - ')[0]}</span>
                      </div>
                      {selectedStartDate && (
                        <div className="flex justify-between">
                          <span className="text-white/70">Start:</span>
                          <span className="font-medium">{formatDate(selectedStartDate)}</span>
                        </div>
                      )}
                    </div>

                    {/* Book Now Button */}
                    <Button
                      onClick={() => setIsBookingModalOpen(true)}
                      className="w-full bg-sunset hover:bg-sunset/90 text-white rounded-full py-6 font-syne font-bold text-lg"
                      data-testid="book-now-btn"
                    >
                      Book Now
                    </Button>

                    <p className="text-center text-white/60 text-xs mt-4 font-dm">
                      No payment required now. We'll contact you to confirm.
                    </p>
                  </CardContent>
                </Card>

                {/* Trust badges */}
                <div className="mt-6 flex items-center justify-center gap-4 text-ocean/60">
                  <div className="flex items-center gap-1 text-xs font-dm">
                    <CheckCircle size={14} className="text-green-500" />
                    <span>Free cancellation</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-dm">
                    <CheckCircle size={14} className="text-green-500" />
                    <span>Verified school</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        bookingDetails={getBookingDetails()}
      />

      {/* Footer */}
      <footer className="bg-ocean py-8 px-4 sm:px-6 lg:px-12 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <Link to="/" className="font-syne font-bold text-xl text-white hover:text-sand transition-colors">
            THE BRIDGE
          </Link>
          <p className="font-dm text-white/60 text-sm mt-2">
            Travel • Practice • Experience
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LanguagePracticePage;
