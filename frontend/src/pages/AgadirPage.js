import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  MapPin, ArrowRight, Sun, Users, Home, Shield, 
  Check, Waves, UtensilsCrossed, Palmtree
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";

const AgadirPage = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-ocean to-ocean/90 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1596627116790-af6f46dddbf4?w=1600" 
            alt="Agadir Beach Morocco"
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
              Agadir
            </h1>
            <p className="font-caveat text-sand text-xl mb-4">Morocco's sunny beach paradise</p>
            <p className="font-dm text-white/80 text-lg max-w-2xl">
              The premier beach destination of Morocco. Where the Atlantic Ocean meets golden 
              sands and a vibrant modern city awaits.
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
                Agadir is Morocco's premier beach resort city, rebuilt after the devastating 1960 earthquake 
                into a modern, sun-drenched paradise. With over 300 days of sunshine per year, it's the 
                perfect destination for beach lovers and fitness enthusiasts.
              </p>
              <p className="font-dm text-ocean/80 text-base leading-relaxed mb-4">
                The city boasts a stunning 10km beach promenade, a lively marina, and excellent sports 
                facilities. It's also the gateway to the famous surf spots of Taghazout and the 
                stunning Paradise Valley.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Beach paradise", "300+ sunny days", "Surf nearby", "Modern city"].map((tag) => (
                  <span key={tag} className="bg-ocean/10 text-ocean px-3 py-1 rounded-full text-sm font-dm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1596627116790-af6f46dddbf4?w=400" alt="Agadir beach" className="rounded-xl aspect-square object-cover" />
              <img src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400" alt="Agadir marina" className="rounded-xl aspect-square object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Available */}
      <section id="experiences" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">Experience Available</h2>
          <div className="max-w-md mx-auto">
            <Card className="border-none bg-warmwhite">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-sunset/10 rounded-full flex items-center justify-center text-sunset mb-4">
                  <Shield size={24} />
                </div>
                <h3 className="font-syne font-bold text-ocean mb-2">Self-Defense</h3>
                <p className="font-dm text-ocean/70 text-sm mb-4">Train self-defense techniques by the beach. Morning sessions followed by beach time and exploration.</p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/experiences/self-defense">Learn More <ArrowRight size={14} className="ml-2" /></Link>
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
                  <h3 className="font-syne font-bold text-ocean text-lg mb-2">Beachfront Hostels & Guesthouses</h3>
                  <p className="font-dm text-ocean/70 mb-4">
                    Stay in our carefully selected beachfront accommodations. Modern hostels with 
                    private rooms or shared dorms, just steps from the beach and close to training venues.
                  </p>
                  <ul className="space-y-2">
                    {["Private or shared rooms", "Breakfast included", "Beachfront location", "Pool access"].map((item) => (
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
              { title: "Beach & Swimming", desc: "10km of golden sandy beach", icon: <Waves size={18} /> },
              { title: "Surf Taghazout", desc: "World-famous surf spot nearby", icon: <Waves size={18} /> },
              { title: "Paradise Valley", desc: "Natural pools and waterfalls", icon: <Palmtree size={18} /> },
              { title: "Marina Promenade", desc: "Restaurants and nightlife", icon: <UtensilsCrossed size={18} /> },
              { title: "Jet Ski & Water Sports", desc: "Adrenaline on the water", icon: <Waves size={18} /> },
              { title: "Souk El Had", desc: "Largest market in Morocco", icon: <MapPin size={18} /> }
            ].map((activity) => (
              <Card key={activity.title} className="border-none bg-warmwhite">
                <CardContent className="p-4">
                  <div className="w-8 h-8 bg-sunset/10 rounded-full flex items-center justify-center text-sunset mb-2">
                    {activity.icon}
                  </div>
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
              "https://images.unsplash.com/photo-1596627116790-af6f46dddbf4?w=400",
              "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400",
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
              "https://images.unsplash.com/photo-1476673160081-cf065607f449?w=400"
            ].map((img, i) => (
              <img key={i} src={img} alt={`Agadir ${i+1}`} className="rounded-xl aspect-square object-cover w-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section id="book" className="py-16 px-4 sm:px-6 lg:px-12 bg-ocean text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-white mb-4">Experience Agadir</h2>
          <p className="font-dm text-white/80 mb-6">
            Book your self-defense adventure in Morocco's sunny beach paradise.
          </p>
          <Button asChild size="lg" className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-8">
            <Link to="/book">Book Now <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default AgadirPage;
