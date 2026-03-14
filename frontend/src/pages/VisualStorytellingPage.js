import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Camera, ArrowRight, MapPin, Calendar, Users, Check, 
  Clock, ChevronLeft, ChevronRight, Sun, Moon, Film, Image, Aperture
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";

// Generate weekend dates for a given month
const generateWeekends = (year, month) => {
  const weekends = [];
  const date = new Date(year, month, 1);
  
  // Find all Fridays in the month
  while (date.getMonth() === month) {
    if (date.getDay() === 5) { // Friday
      weekends.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }
  
  return weekends;
};

// Assign cities to weekends (alternating Marrakech/Agadir)
const getWeekendCity = (weekendIndex) => {
  return weekendIndex % 2 === 0 ? "Marrakech" : "Agadir";
};

const TRACKS = [
  { id: "film", name: "Filmmaking", icon: <Film size={20} />, desc: "Apprenez le storytelling vidéo, le cadrage et le montage." },
  { id: "photo", name: "Photography", icon: <Image size={20} />, desc: "Maîtrisez la composition, la lumière et le post-traitement." },
  { id: "drone", name: "Drone", icon: <Aperture size={20} />, desc: "Capturez des images aériennes spectaculaires." }
];

const PROGRAM = [
  { 
    day: "Vendredi", 
    icon: <Moon size={20} />,
    activities: [
      { time: "18:00", activity: "Arrivée & Installation" },
      { time: "19:00", activity: "Briefing créatif & présentation des tracks" },
      { time: "20:00", activity: "Dîner de groupe" }
    ]
  },
  { 
    day: "Samedi", 
    icon: <Sun size={20} />,
    activities: [
      { time: "06:00 - 08:00", activity: "Shooting lever de soleil (optionnel)", highlight: true },
      { time: "09:00 - 12:00", activity: "Session technique + shooting", highlight: true },
      { time: "12:30", activity: "Déjeuner" },
      { time: "14:00 - 18:00", activity: "Exploration & capture de contenu", highlight: true },
      { time: "18:00 - 19:30", activity: "Golden hour shooting", highlight: true },
      { time: "20:00", activity: "Dîner + review des images" }
    ]
  },
  { 
    day: "Dimanche", 
    icon: <Sun size={20} />,
    activities: [
      { time: "09:00 - 12:00", activity: "Session finale + post-production", highlight: true },
      { time: "12:30", activity: "Déjeuner de clôture & partage des créations" },
      { time: "14:00", activity: "Départ" }
    ]
  }
];

const VisualStorytellingPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedWeekend, setSelectedWeekend] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const weekends = generateWeekends(currentYear, currentMonth);

  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
                      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedWeekend(null);
  };

  const formatWeekendDate = (friday) => {
    const sunday = new Date(friday);
    sunday.setDate(sunday.getDate() + 2);
    return `${friday.getDate()} - ${sunday.getDate()} ${monthNames[friday.getMonth()]}`;
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-ocean to-ocean/90 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600" 
            alt="Visual Storytelling"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-sunset rounded-full flex items-center justify-center">
                <Camera size={28} className="text-white" />
              </div>
              <span className="bg-sunset/20 text-sand px-4 py-1 rounded-full text-sm font-dm">Weekend Experience</span>
              <span className="bg-white/10 text-white/80 px-4 py-1 rounded-full text-sm font-dm">3 jours / 2 nuits</span>
            </div>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
              Visual Storytelling Weekend
            </h1>
            <p className="font-caveat text-sand text-xl mb-4">Vendredi → Dimanche</p>
            <p className="font-dm text-white/80 text-lg max-w-2xl">
              Un weekend créatif pour apprendre la photo, vidéo ou drone. 
              Capturez le Maroc avec un petit groupe de 10 personnes maximum.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Info */}
      <section className="py-8 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: <Calendar size={20} />, label: "Durée", value: "3 jours / 2 nuits" },
              { icon: <Clock size={20} />, label: "Horaires", value: "Vendredi → Dimanche" },
              { icon: <Users size={20} />, label: "Groupe", value: "Max 10 personnes" },
              { icon: <MapPin size={20} />, label: "Villes", value: "Marrakech / Agadir" }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-4 text-center">
                <div className="w-10 h-10 bg-sunset/10 rounded-full flex items-center justify-center mx-auto mb-2 text-sunset">
                  {item.icon}
                </div>
                <p className="font-dm text-ocean/60 text-xs mb-1">{item.label}</p>
                <p className="font-syne font-bold text-ocean text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Choose Your Track */}
      <section id="tracks" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-2 text-center">Choisissez votre Track</h2>
          <p className="font-dm text-ocean/60 text-center mb-8">Spécialisez-vous dans un domaine</p>

          <div className="grid sm:grid-cols-3 gap-4">
            {TRACKS.map((track) => (
              <button
                key={track.id}
                onClick={() => setSelectedTrack(track.id)}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  selectedTrack === track.id
                    ? "border-sunset bg-sunset/5 shadow-lg"
                    : "border-border hover:border-sunset/50 hover:shadow-md"
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  selectedTrack === track.id ? "bg-sunset text-white" : "bg-ocean/10 text-ocean"
                }`}>
                  {track.icon}
                </div>
                <h3 className="font-syne font-bold text-ocean mb-2">{track.name}</h3>
                <p className="font-dm text-ocean/60 text-sm">{track.desc}</p>
                {selectedTrack === track.id && (
                  <div className="mt-3 pt-3 border-t border-sunset/20">
                    <span className="text-sunset font-dm text-sm flex items-center gap-1">
                      <Check size={14} /> Sélectionné
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section id="calendar" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-2 text-center">Calendrier des Weekends</h2>
          <p className="font-dm text-ocean/60 text-center mb-8">Choisissez votre weekend</p>

          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateMonth(-1)}
              className="rounded-full"
            >
              <ChevronLeft size={18} />
            </Button>
            <h3 className="font-syne font-bold text-xl text-ocean">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateMonth(1)}
              className="rounded-full"
            >
              <ChevronRight size={18} />
            </Button>
          </div>

          {/* Weekends Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {weekends.map((friday, index) => {
              const city = getWeekendCity(index);
              const isPast = friday < new Date();
              const isSelected = selectedWeekend?.getTime() === friday.getTime();
              
              return (
                <button
                  key={friday.toISOString()}
                  onClick={() => !isPast && setSelectedWeekend(friday)}
                  disabled={isPast}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    isPast 
                      ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                      : isSelected
                        ? "border-sunset bg-sunset/5 shadow-lg"
                        : "border-border hover:border-sunset/50 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-syne font-bold ${isPast ? "text-gray-400" : "text-ocean"}`}>
                      Weekend {index + 1}
                    </span>
                    <span className={`text-xs font-dm px-2 py-1 rounded-full ${
                      city === "Marrakech" 
                        ? "bg-red-100 text-red-700" 
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className={isPast ? "text-gray-400" : "text-sunset"} />
                    <span className={`font-dm ${isPast ? "text-gray-400" : "text-ocean/70"}`}>
                      {formatWeekendDate(friday)}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-sunset/20">
                      <span className="text-sunset font-dm text-sm flex items-center gap-1">
                        <Check size={14} /> Sélectionné
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Book Button */}
          {selectedWeekend && selectedTrack && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <Card className="border-none bg-ocean text-white inline-block">
                <CardContent className="p-6">
                  <p className="font-dm text-white/70 text-sm mb-2">Votre sélection</p>
                  <p className="font-syne font-bold text-xl mb-1">
                    {TRACKS.find(t => t.id === selectedTrack)?.name} Weekend – {getWeekendCity(weekends.findIndex(w => w.getTime() === selectedWeekend.getTime()))}
                  </p>
                  <p className="font-dm text-sand mb-4">{formatWeekendDate(selectedWeekend)}</p>
                  <Button asChild className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-8">
                    <Link to={`/book?experience=storytelling&track=${selectedTrack}&city=${getWeekendCity(weekends.findIndex(w => w.getTime() === selectedWeekend.getTime())).toLowerCase()}&date=${selectedWeekend.toISOString()}`}>
                      Réserver ce weekend <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {selectedWeekend && !selectedTrack && (
            <p className="mt-6 text-center font-dm text-ocean/60">
              ↑ Sélectionnez d'abord votre track (Film, Photo ou Drone)
            </p>
          )}
        </div>
      </section>

      {/* Program */}
      <section id="program" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Programme du Weekend</h2>
          
          <div className="space-y-4">
            {PROGRAM.map((day, dayIndex) => (
              <Card key={dayIndex} className="border-none overflow-hidden">
                <div className={`p-4 ${dayIndex === 0 ? 'bg-ocean' : 'bg-sunset'} text-white flex items-center gap-3`}>
                  {day.icon}
                  <h3 className="font-syne font-bold text-lg">{day.day}</h3>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {day.activities.map((activity, actIndex) => (
                      <div 
                        key={actIndex} 
                        className={`flex items-center gap-4 p-3 rounded-lg ${
                          activity.highlight ? 'bg-sunset/10' : 'bg-warmwhite'
                        }`}
                      >
                        <span className="font-dm text-ocean/60 text-sm w-28 flex-shrink-0">{activity.time}</span>
                        <span className={`font-dm ${activity.highlight ? 'font-semibold text-ocean' : 'text-ocean/80'}`}>
                          {activity.activity}
                        </span>
                        {activity.highlight && <Camera size={16} className="text-sunset ml-auto" />}
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
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl mb-4">Tarif Weekend</h2>
          <div className="bg-white/10 rounded-2xl p-8 mb-6">
            <p className="font-syne font-extrabold text-5xl text-sand mb-2">€350</p>
            <p className="font-dm text-white/70">par personne</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-left max-w-md mx-auto">
            {[
              "Sessions shooting guidées",
              "2 nuits d'hébergement",
              "Tous les repas inclus",
              "Groupe max 10 personnes",
              "Formateur professionnel",
              "Accès spots exclusifs"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check size={16} className="text-sand flex-shrink-0" />
                <span className="font-dm text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Nos Destinations</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="border-none overflow-hidden">
              <img src="https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600" alt="Marrakech" className="w-full h-48 object-cover" />
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-syne font-bold text-lg text-ocean flex items-center gap-2">
                    <MapPin size={16} className="text-sunset" /> Marrakech
                  </h3>
                  <span className="text-xs font-dm bg-red-100 text-red-700 px-2 py-1 rounded-full">Weekends 1 & 3</span>
                </div>
                <p className="font-dm text-ocean/70 text-sm">
                  Médina colorée, palais somptueux, montagnes de l'Atlas. Un terrain de jeu idéal pour les créateurs.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none overflow-hidden">
              <img src="https://images.unsplash.com/photo-1553522987-b6cb62385487?w=600" alt="Agadir" className="w-full h-48 object-cover" />
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-syne font-bold text-lg text-ocean flex items-center gap-2">
                    <MapPin size={16} className="text-sunset" /> Agadir
                  </h3>
                  <span className="text-xs font-dm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Weekends 2 & 4</span>
                </div>
                <p className="font-dm text-ocean/70 text-sm">
                  Couchers de soleil sur l'océan, surf à Taghazout, ambiance beach. Parfait pour le contenu lifestyle.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What You'll Create */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Ce que vous créerez</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { track: "Filmmaking", result: "Un court-métrage de 1-2 min sur votre weekend au Maroc" },
              { track: "Photography", result: "Un portfolio de 15-20 photos éditées prêtes pour Instagram/Portfolio" },
              { track: "Drone", result: "Des séquences aériennes époustouflantes + un showreel" }
            ].map((item, i) => (
              <Card key={i} className="border-none bg-warmwhite">
                <CardContent className="p-4 text-center">
                  <h4 className="font-syne font-bold text-ocean mb-2">{item.track}</h4>
                  <p className="font-dm text-ocean/70 text-sm">{item.result}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-2">Réserver votre weekend</h2>
            <p className="font-dm text-ocean/70">Visual Storytelling Weekend • €350</p>
          </motion.div>
          <SecureBookingForm 
            onSubmit={async (formData) => {
              await axios.post(`${API}/contact`, {
                name: formData.fullName,
                email: formData.email,
                message: `📸 RÉSERVATION VISUAL STORYTELLING WEEKEND

👤 PARTICIPANT
Nom: ${formData.fullName}
Email: ${formData.email}
Téléphone: ${formData.phone}

📅 DÉTAILS
Date: ${formData.date}
Heure: ${formData.time}
Nombre de personnes: ${formData.numberOfPeople}

💰 TARIF: €350 / personne

⏰ Soumis le: ${formData.timestamp}`,
                trip_interest: "Visual Storytelling Weekend"
              });
            }}
            experienceTitle="Visual Storytelling Weekend • €350"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-sunset text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl mb-4">Prêt à créer ?</h2>
          <p className="font-dm text-white/80 mb-6">
            Rejoignez-nous pour un weekend créatif au Maroc.
          </p>
          <Button asChild size="lg" className="bg-white text-sunset hover:bg-white/90 rounded-full px-8">
            <a href="#booking">Réserver maintenant <ArrowRight size={18} className="ml-2" /></a>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default VisualStorytellingPage;
