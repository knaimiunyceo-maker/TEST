import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  MapPin, ArrowRight, Sun, Users, Home, Dumbbell, 
  Languages, Camera, Check, Star, Mountain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";

const MarrakechPage = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-ocean to-ocean/90 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1600" 
            alt="Marrakech"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-sand" size={20} />
              <span className="font-dm text-sand text-sm">Destination</span>
            </div>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl mb-2">
              Marrakech
            </h1>
            <p className="font-caveat text-sand text-xl mb-4">The Red City</p>
            <p className="font-dm text-white/80 text-lg max-w-2xl">
              Ancient medinas, stunning palaces, and vibrant souks. The heart of 
              Moroccan culture and the perfect base for adventure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About the City */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">About the City</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="font-dm text-ocean/80 text-base leading-relaxed mb-4">
                Marrakech is Morocco's most iconic city. The ancient medina, a UNESCO World Heritage site, 
                offers a maze of souks, stunning riads, and the famous Jemaa el-Fnaa square with its 
                snake charmers, storytellers, and food stalls.
              </p>
              <p className="font-dm text-ocean/80 text-base leading-relaxed mb-4">
                Beyond the medina, modern Marrakech offers world-class restaurants, rooftop pools, and 
                easy access to the Atlas Mountains. It's the perfect blend of ancient culture and 
                modern comfort for your training holiday.
              </p>
              <div className="flex flex-wrap gap-2">
                {["UNESCO Medina", "Atlas Mountains", "Rooftop pools", "Rich culture"].map((tag) => (
                  <span key={tag} className="bg-ocean/10 text-ocean px-3 py-1 rounded-full text-sm font-dm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=400" alt="Marrakech" className="rounded-xl aspect-square object-cover" />
              <img src="https://images.unsplash.com/photo-1760727466827-f11ca401116e?w=400" alt="Medina" className="rounded-xl aspect-square object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Available */}
      <section id="experiences" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Experience Available</h2>
          <div className="max-w-md mx-auto">
            <Card className="border-none bg-warmwhite">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-sunset/10 rounded-full flex items-center justify-center text-sunset mb-4">
                  <Camera size={24} />
                </div>
                <h3 className="font-syne font-bold text-ocean mb-2">Visual Storytelling</h3>
                <p className="font-dm text-ocean/70 text-sm mb-4">Capture the stunning medina, palaces and mountain views. Perfect for filmmakers and photographers.</p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/experiences/visual-storytelling">Learn More <ArrowRight size={14} className="ml-2" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Accommodation Style */}
      <section id="accommodation" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Accommodation Style</h2>
          <Card className="border-none">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-ocean rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <Home size={24} />
                </div>
                <div>
                  <h3 className="font-syne font-bold text-ocean text-lg mb-2">Riads & Partner Hostels</h3>
                  <p className="font-dm text-ocean/70 mb-4">
                    Stay in traditional Moroccan riads (courtyard houses) or modern hostels with rooftop 
                    terraces. All accommodations are centrally located for easy access to training venues 
                    and attractions.
                  </p>
                  <ul className="space-y-2">
                    {["Private or shared rooms", "Rooftop terraces", "Pool access", "Traditional breakfast", "Walking distance to medina"].map((item) => (
                      <li key={item} className="flex items-center gap-2 font-dm text-sm text-ocean/80">
                        <Check size={14} className="text-sunset" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Activities Nearby */}
      <section id="activities" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Activities Nearby</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "Jemaa el-Fnaa", desc: "Famous main square" },
              { title: "Majorelle Garden", desc: "Stunning blue garden" },
              { title: "Medina Souks", desc: "Traditional markets" },
              { title: "Atlas Mountains", desc: "Day trips available" },
              { title: "Hammam & Spa", desc: "Traditional bathhouses" },
              { title: "Desert Trips", desc: "Camel rides and dunes" }
            ].map((activity) => (
              <Card key={activity.title} className="border-none bg-warmwhite">
                <CardContent className="p-4">
                  <h4 className="font-syne font-bold text-ocean text-sm mb-1">{activity.title}</h4>
                  <p className="font-dm text-ocean/60 text-xs">{activity.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Photos */}
      <section id="photos" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=400",
              "https://images.unsplash.com/photo-1760727466827-f11ca401116e?w=400",
              "https://images.unsplash.com/photo-1662009833223-75d3301290bd?w=400",
              "https://images.unsplash.com/photo-1758599669009-5a9002c09487?w=400"
            ].map((img, i) => (
              <img key={i} src={img} alt={`Marrakech ${i+1}`} className="rounded-xl aspect-square object-cover w-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section id="book" className="py-16 px-4 sm:px-6 lg:px-12 bg-ocean text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-white mb-4">Experience Marrakech</h2>
          <p className="font-dm text-white/80 mb-6">
            Book your adventure in the magical Red City.
          </p>
          <Button asChild size="lg" className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-8">
            <Link to="/book">Book Now <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default MarrakechPage;
