import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Sun, Users, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";

const DESTINATIONS = [
  {
    id: "casablanca",
    name: "Casablanca",
    tagline: "Morocco's modern metropolis",
    description: "The economic capital of Morocco. A blend of tradition and modernity with stunning Art Deco architecture.",
    image: "https://images.unsplash.com/photo-1581443459255-e895f2a4222f?w=800",
    experiences: ["Combat Holiday", "Language Holiday"],
    highlights: ["Hassan II Mosque", "Art Deco downtown", "Corniche beaches", "Vibrant nightlife"]
  },
  {
    id: "marrakech",
    name: "Marrakech",
    tagline: "The Red City",
    description: "Ancient medinas, stunning palaces, and vibrant souks. The heart of Moroccan culture and adventure.",
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800",
    experiences: ["Combat Holiday", "Language Holiday", "Visual Storytelling"],
    highlights: ["Jemaa el-Fnaa", "Majorelle Garden", "Medina souks", "Atlas Mountains nearby"]
  }
];

const DestinationsPage = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-ocean to-ocean/90 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-sand rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-sunset rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-caveat text-sand text-xl mb-2">Discover Morocco</p>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
              Our Destinations
            </h1>
            <p className="font-dm text-white/80 text-lg max-w-2xl mx-auto">
              From vibrant cities to coastal towns, experience Morocco's diverse beauty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {DESTINATIONS.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card className="border-none shadow-lg overflow-hidden h-full">
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img 
                      src={dest.image} 
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="font-syne font-bold text-2xl text-white">{dest.name}</h3>
                      <p className="font-caveat text-sand text-lg">{dest.tagline}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="font-dm text-ocean/80 text-sm mb-4">{dest.description}</p>
                    
                    <div className="mb-4">
                      <p className="font-dm font-semibold text-ocean text-xs mb-2">Experiences available:</p>
                      <div className="flex flex-wrap gap-2">
                        {dest.experiences.map((exp) => (
                          <span key={exp} className="bg-sunset/10 text-sunset px-2 py-1 rounded-full text-xs font-dm">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="font-dm font-semibold text-ocean text-xs mb-2">Highlights:</p>
                      <div className="flex flex-wrap gap-2">
                        {dest.highlights.map((h) => (
                          <span key={h} className="bg-ocean/10 text-ocean px-2 py-1 rounded-full text-xs font-dm">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button asChild className="w-full bg-ocean hover:bg-ocean/90 text-white rounded-full">
                      <Link to={`/destinations/${dest.id}`}>
                        Explore {dest.name} <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Morocco */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8">Why Morocco?</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: <Sun size={24} />, title: "Year-round Sun", desc: "Perfect weather for training and exploring" },
              { icon: <Users size={24} />, title: "Rich Culture", desc: "Friendly locals and ancient traditions" },
              { icon: <Home size={24} />, title: "Affordable", desc: "Great value for European travelers" }
            ].map((item, i) => (
              <div key={i}>
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
            Choose Your Destination
          </h2>
          <p className="font-dm text-white/80 mb-6">
            Book your experience and discover Morocco with us.
          </p>
          <Button asChild size="lg" className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-8">
            <Link to="/book">Book Now <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default DestinationsPage;
