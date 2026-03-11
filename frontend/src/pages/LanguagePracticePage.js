import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Languages, ArrowRight, MapPin, Calendar, Users, Check, 
  Clock, ChevronDown, ChevronUp, BookOpen, Award, GraduationCap,
  Sun, Moon, Mail, User, Globe, X, Info, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Toaster, toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageLayout from "./components/PageLayout";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PROGRAM = [
  { day: "Day 1", morning: "Welcome & Level Assessment", afternoon: "City orientation, group introduction" },
  { day: "Day 2", morning: "Conversation practice", afternoon: "Café culture & social activities" },
  { day: "Day 3", morning: "Real-life scenarios", afternoon: "Medina exploration & shopping practice" },
  { day: "Day 4", morning: "Group discussions", afternoon: "Cultural excursion" },
  { day: "Day 5", morning: "Review & feedback", afternoon: "Farewell activity (5-day)" },
  { day: "Day 6", morning: "Advanced conversation", afternoon: "Day trip excursion" },
  { day: "Day 7", morning: "Final session & certificates", afternoon: "Departure" }
];

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

const FAQ = [
  { q: "What level of English do I need?", a: "All levels welcome! From complete beginners to advanced speakers looking to practice fluency." },
  { q: "Is this a classroom course?", a: "No! This is 100% immersive learning through real conversations, activities, and cultural experiences." },
  { q: "What about accommodation?", a: "Accommodation in partner hostels or guesthouses is included in the price." },
  { q: "How big are the groups?", a: "Maximum 10 participants to ensure quality interaction and practice time." },
  { q: "Can I combine with other experiences?", a: "Yes! Many participants add activities like surf lessons or cooking classes." }
];

const LanguageHolidayPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <PageLayout>
      <Toaster position="top-right" richColors />
      
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-ocean to-ocean/90 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600" 
            alt="Language practice"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-sunset rounded-full flex items-center justify-center">
                <Languages size={28} className="text-white" />
              </div>
              <span className="font-dm text-sand text-sm">Experience</span>
            </div>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
              Language Practice Holiday
            </h1>
            <p className="font-caveat text-sand text-xl mb-4">Practice English through travel</p>
            <p className="font-dm text-white/80 text-lg max-w-2xl">
              Morning English practice sessions with real conversations and group activities. 
              Afternoons dedicated to exploring Morocco and cultural experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Overview</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="font-dm text-ocean/80 text-base leading-relaxed mb-6">
                Forget boring classrooms! Our Language Practice Holiday immerses you in English 
                through real-life situations. Practice ordering coffee, negotiating in souks, 
                making friends from around the world — all while exploring beautiful Morocco.
              </p>
              <p className="font-dm text-ocean/80 text-base leading-relaxed mb-6">
                Mornings are dedicated to structured conversation practice with our facilitators. 
                Afternoons, you'll put your skills to use exploring cities, joining excursions, 
                and participating in social activities with your international group.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Conversation practice", "Real-life scenarios", "Cultural immersion"].map((item) => (
                  <span key={item} className="bg-sunset/10 text-sunset px-4 py-2 rounded-full font-dm text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400" alt="Group conversation" className="rounded-xl aspect-square object-cover" />
              <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400" alt="Learning together" className="rounded-xl aspect-square object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Program */}
      <section id="program" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Program</h2>
          <div className="space-y-4">
            {PROGRAM.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-none ${index >= 5 ? "bg-sand/20" : "bg-warmwhite"}`}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-16 h-16 bg-ocean rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="font-syne font-bold text-white text-sm">{day.day}</span>
                    </div>
                    <div className="flex-1 grid sm:grid-cols-2 gap-2">
                      <div>
                        <p className="font-dm text-xs text-ocean/60 mb-1">Morning</p>
                        <p className="font-dm text-ocean font-medium text-sm">{day.morning}</p>
                      </div>
                      <div>
                        <p className="font-dm text-xs text-ocean/60 mb-1">Afternoon</p>
                        <p className="font-dm text-ocean/80 text-sm">{day.afternoon}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-center font-dm text-ocean/60 text-sm mt-4">* Days 6-7 for 7-day experience only</p>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-2 text-center">The Schedule</h2>
          <p className="font-dm text-ocean/70 text-center mb-8">
            Rotating timetable — alternating morning and afternoon sessions each week
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(SCHEDULE_DATA).map(([key, week]) => (
              <Card key={key} className="border-none">
                <CardContent className="p-4">
                  <h3 className="font-syne font-bold text-ocean mb-4 flex items-center gap-2">
                    {key === 'weekA' ? <Sun className="text-sand" size={18} /> : <Moon className="text-ocean/60" size={18} />}
                    {week.name}
                  </h3>
                  <div className="space-y-2">
                    {week.sessions.map((session, idx) => (
                      <div
                        key={idx}
                        className={`flex justify-between items-center p-3 rounded-lg ${
                          session.type === 'morning' ? 'bg-sand/20' : 'bg-ocean/10'
                        }`}
                      >
                        <span className="font-dm text-ocean text-sm">{session.day}</span>
                        <span className={`font-dm font-medium text-xs px-3 py-1 rounded-full ${
                          session.type === 'morning' ? 'bg-sand text-ocean' : 'bg-ocean text-white'
                        }`}>
                          {session.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-12 bg-ocean text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl mb-8 text-center">Pricing</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { label: "Weekend", duration: "2 nights / 3 days", price: 220, popular: false },
              { label: "5 Days", duration: "5 days experience", price: 400, popular: false },
              { label: "Full Week", duration: "7 days / 6 nights", price: 500, popular: true }
            ].map((plan) => (
              <Card key={plan.label} className={`border-none ${plan.popular ? "bg-sunset" : "bg-white/10"}`}>
                <CardContent className="p-6 text-center">
                  {plan.popular && <span className="bg-sand text-ocean text-xs font-dm px-3 py-1 rounded-full">Most Popular</span>}
                  <h3 className="font-syne font-bold text-xl mt-3 mb-1">{plan.label}</h3>
                  <p className="font-dm text-white/70 text-sm mb-4">{plan.duration}</p>
                  <p className="font-syne font-bold text-4xl mb-4">€{plan.price}</p>
                  <ul className="text-left space-y-2 mb-6">
                    {["Accommodation included", "Daily practice sessions", "Social activities"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 font-dm text-sm text-white/80">
                        <Check size={14} className="text-sand" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className={`w-full rounded-full ${plan.popular ? "bg-white text-sunset hover:bg-white/90" : "bg-sunset hover:bg-sunset/90"}`}>
                    <Link to="/book">Book Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section id="locations" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Locations</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { city: "Marrakech", desc: "Practice in cafés, souks, and cultural settings. Rich environment for immersive learning.", image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=400" },
              { city: "Essaouira", desc: "Relaxed coastal town perfect for conversation practice in a laid-back atmosphere.", image: "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=400" }
            ].map((loc) => (
              <Card key={loc.city} className="border-none overflow-hidden">
                <img src={loc.image} alt={loc.city} className="w-full h-40 object-cover" />
                <CardContent className="p-4">
                  <h3 className="font-syne font-bold text-lg text-ocean mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-sunset" /> {loc.city}
                  </h3>
                  <p className="font-dm text-ocean/70 text-sm">{loc.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">What's Included</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INCLUSIONS.map((item, index) => (
              <div key={index} className="bg-warmwhite rounded-xl p-4 text-center">
                <div className="w-14 h-14 bg-sunset/10 rounded-full flex items-center justify-center mx-auto mb-3 text-sunset">
                  {item.icon}
                </div>
                <h4 className="font-syne font-bold text-ocean text-sm mb-1">{item.title}</h4>
                <p className="font-dm text-ocean/60 text-xs">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">FAQ</h2>
          <div className="space-y-3">
            {FAQ.map((item, index) => (
              <Card key={index} className="border-none bg-white">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <span className="font-dm font-medium text-ocean">{item.q}</span>
                  {openFaq === index ? <ChevronUp size={20} className="text-sunset" /> : <ChevronDown size={20} className="text-ocean/50" />}
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="font-dm text-ocean/70 text-sm">{item.a}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section id="book" className="py-16 px-4 sm:px-6 lg:px-12 bg-sunset text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl mb-4">Ready to Practice?</h2>
          <p className="font-dm text-white/80 mb-6">
            Book your Language Practice Holiday and start speaking with confidence.
          </p>
          <Button asChild size="lg" className="bg-white text-sunset hover:bg-white/90 rounded-full px-8">
            <Link to="/book">Book This Experience <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default LanguageHolidayPage;
