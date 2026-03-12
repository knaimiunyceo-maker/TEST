import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, Languages, Camera, ArrowRight, MapPin, 
  Calendar, Users, Check, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";

const EXPERIENCES = [
  {
    id: "self-defense",
    slug: "self-defense",
    title: "Self-Defense Holiday",
    tagline: "Train your body, explore Morocco",
    description: "Morning self-defense training sessions focusing on practical techniques. Afternoons include beach time, pool time, local exploration, and group dinners.",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800",
    icon: <Shield size={32} />,
    practices: ["Self-defense techniques", "Conditioning", "Practical skills"],
    pricing: { "5_days": 450, "7_days": 550, "weekend": 250 },
    destinations: ["Casablanca", "Marrakech", "Agadir"]
  },
  {
    id: "language",
    slug: "language-practice",
    title: "Language Practice Holiday",
    tagline: "Practice English through travel",
    description: "Cours d'anglais intensif avec 20 heures par semaine. Test de niveau gratuit, TOEFL, IELTS, Business English.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    icon: <Languages size={32} />,
    practices: ["English conversation", "TOEFL/IELTS", "Business English"],
    pricing: { "1_week": 400, "2_weeks": 750, "4_weeks": 1300 },
    destinations: ["Casablanca", "Marrakech"]
  },
  {
    id: "storytelling",
    slug: "visual-storytelling",
    title: "Visual Storytelling Holiday",
    tagline: "Create content while exploring",
    description: "Morning sessions learning filmmaking, photography or drone content creation. Afternoons spent capturing Morocco's beauty.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800",
    icon: <Camera size={32} />,
    practices: ["Filmmaking", "Photography", "Drone content"],
    pricing: { "5_days": 480, "7_days": 580, "weekend": 260 },
    destinations: ["Marrakech", "Agadir"]
  }
];

const ExperiencesPage = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-ocean to-ocean/90 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-sand rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-sunset rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-caveat text-sand text-xl sm:text-2xl mb-2">Travel • Practice • Experience</p>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
              Our Experiences
            </h1>
            <p className="font-dm text-white/80 text-lg max-w-2xl mx-auto mb-2">
              Practice in the morning • Explore Morocco in the afternoon
            </p>
            <p className="font-dm text-sand/80 text-sm">Small international groups (18+)</p>
          </motion.div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-all h-full flex flex-col overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={exp.image} 
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-sunset">
                      {exp.icon}
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <h3 className="font-syne font-bold text-xl text-ocean mb-1">{exp.title}</h3>
                    <p className="font-caveat text-sunset text-lg mb-3">{exp.tagline}</p>
                    <p className="font-dm text-ocean/70 text-sm mb-4 flex-1">{exp.description}</p>

                    {/* Destinations */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {exp.destinations.map((dest, i) => (
                        <span key={i} className="bg-sand/30 text-ocean px-2 py-1 rounded-full text-xs font-dm flex items-center gap-1">
                          <MapPin size={10} /> {dest}
                        </span>
                      ))}
                    </div>

                    <Button asChild className="w-full bg-sunset hover:bg-sunset/90 text-white rounded-full">
                      <Link to={`/experiences/${exp.slug}`}>
                        En savoir plus <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8">
            Why Choose THE BRIDGE?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: <Users size={24} />, title: "Small Groups", desc: "Maximum 10 participants for a personal experience" },
              { icon: <Star size={24} />, title: "All Inclusive", desc: "Accommodation included in partner hostels" },
              { icon: <Calendar size={24} />, title: "Flexible Formats", desc: "5 days, 7 days or weekend experiences" }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-sunset/10 rounded-full flex items-center justify-center mx-auto mb-3 text-sunset">
                  {item.icon}
                </div>
                <h3 className="font-syne font-bold text-ocean mb-1">{item.title}</h3>
                <p className="font-dm text-ocean/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-ocean text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="font-dm text-white/80 mb-6">
            Choose your experience and book your spot today.
          </p>
          <Button asChild size="lg" className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-8">
            <Link to="/book">Book Now <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default ExperiencesPage;
