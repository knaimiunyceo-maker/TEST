import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  MapPin, ArrowRight, Sun, Users, Home, Dumbbell, 
  Languages, Camera, Check, Star, Utensils, Building
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";

const CasablancaPage = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-ocean to-ocean/90 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1581443459255-e895f2a4222f?w=1600" 
            alt="Hassan II Mosque Casablanca"
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
              Casablanca
            </h1>
            <p className="font-caveat text-sand text-xl mb-4">Morocco's modern metropolis</p>
            <p className="font-dm text-white/80 text-lg max-w-2xl">
              The economic heart of Morocco. Where tradition meets modernity in a 
              stunning blend of Art Deco architecture and vibrant street life.
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
                Casablanca is Morocco's largest city and economic powerhouse. Unlike the ancient medinas 
                of Marrakech or Fes, Casa offers a more modern, cosmopolitan experience while still 
                maintaining deep Moroccan roots.
              </p>
              <p className="font-dm text-ocean/80 text-base leading-relaxed mb-4">
                The city is famous for its stunning Art Deco architecture, the magnificent Hassan II 
                Mosque (one of the largest in the world), and a vibrant nightlife scene. The Corniche 
                beachfront offers seaside relaxation just minutes from the city center.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Modern city", "Art Deco architecture", "Beach access", "International airport"].map((tag) => (
                  <span key={tag} className="bg-ocean/10 text-ocean px-3 py-1 rounded-full text-sm font-dm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1581443459255-e895f2a4222f?w=400" alt="Hassan II Mosque" className="rounded-xl aspect-square object-cover" />
              <img src="https://images.unsplash.com/photo-1669831399403-dd59f1436fa7?w=400" alt="Casablanca cityscape" className="rounded-xl aspect-square object-cover mt-8" />
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
                  <Languages size={24} />
                </div>
                <h3 className="font-syne font-bold text-ocean mb-2">Language Practice</h3>
                <p className="font-dm text-ocean/70 text-sm mb-4">Practice English in cafés, explore the cosmopolitan city, and immerse yourself in real conversations.</p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/experiences/language-practice">Learn More <ArrowRight size={14} className="ml-2" /></Link>
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
                  <h3 className="font-syne font-bold text-ocean text-lg mb-2">Partner Hostels & Guesthouses</h3>
                  <p className="font-dm text-ocean/70 mb-4">
                    Stay in our carefully selected partner accommodations. Modern hostels with private 
                    rooms or shared dorms, located in safe, central neighborhoods with easy access to 
                    training venues and attractions.
                  </p>
                  <ul className="space-y-2">
                    {["Private or shared rooms", "Breakfast included", "Central location", "Pool access (select properties)"].map((item) => (
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
              { title: "Hassan II Mosque", desc: "One of the world's largest mosques" },
              { title: "Corniche Beach", desc: "Seaside promenade and beaches" },
              { title: "Art Deco Walk", desc: "Stunning 1920s architecture" },
              { title: "Morocco Mall", desc: "Shopping and entertainment" },
              { title: "Rick's Café", desc: "Famous Casablanca-inspired bar" },
              { title: "Old Medina", desc: "Traditional markets and crafts" }
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
              "https://images.unsplash.com/photo-1581443459255-e895f2a4222f?w=400",
              "https://images.unsplash.com/photo-1581444072387-f3cbbcc8fe33?w=400",
              "https://images.unsplash.com/photo-1706203644187-a719449587bb?w=400",
              "https://images.unsplash.com/photo-1549493207-619ac0ba8963?w=400"
            ].map((img, i) => (
              <img key={i} src={img} alt={`Casablanca ${i+1}`} className="rounded-xl aspect-square object-cover w-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section id="book" className="py-16 px-4 sm:px-6 lg:px-12 bg-ocean text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-white mb-4">Experience Casablanca</h2>
          <p className="font-dm text-white/80 mb-6">
            Book your adventure in Morocco's modern metropolis.
          </p>
          <Button asChild size="lg" className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-8">
            <Link to="/book">Book Now <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default CasablancaPage;
