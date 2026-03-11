import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Waves, Utensils, Map, Car, ArrowRight, Info, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";

const ACTIVITIES = [
  {
    id: "surf",
    title: "Surf Lessons",
    icon: <Waves size={28} />,
    description: "Ride the Atlantic waves with experienced local instructors. Perfect for beginners and intermediate surfers.",
    price: "From €35/session",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400",
    locations: ["Agadir", "Essaouira"],
    includes: ["Equipment rental", "Instructor", "2-hour session"]
  },
  {
    id: "cooking",
    title: "Cooking Class",
    icon: <Utensils size={28} />,
    description: "Learn to prepare authentic Moroccan dishes — tagines, couscous, pastilla and more.",
    price: "From €40/class",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400",
    locations: ["Marrakech", "Casablanca"],
    includes: ["Ingredients", "Chef guidance", "Full meal"]
  },
  {
    id: "city-tours",
    title: "City Tours",
    icon: <Map size={28} />,
    description: "Guided walking tours through medinas, historical sites, and hidden gems with local experts.",
    price: "From €25/tour",
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=400",
    locations: ["All cities"],
    includes: ["Local guide", "3-4 hours", "Small group"]
  },
  {
    id: "quad-desert",
    title: "Quad / Desert Trip",
    icon: <Car size={28} />,
    description: "Adventure into the desert on quad bikes. Experience dunes, palm groves, and Berber villages.",
    price: "From €50/trip",
    image: "https://images.unsplash.com/photo-1662009833223-75d3301290bd?w=400",
    locations: ["Marrakech", "Agadir"],
    includes: ["Quad rental", "Guide", "Safety gear", "Tea break"]
  }
];

const ActivitiesPage = () => {
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
            <p className="font-caveat text-sand text-xl mb-2">Enhance Your Trip</p>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
              Optional Activities
            </h1>
            <p className="font-dm text-white/80 text-lg max-w-2xl mx-auto">
              Add extra adventures to your experience. All activities can be booked during your stay.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Activities Grid */}
      <section id="activities" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {ACTIVITIES.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-none shadow-lg overflow-hidden h-full">
                  <div className="md:flex">
                    <div className="md:w-2/5">
                      <img 
                        src={activity.image} 
                        alt={activity.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <CardContent className="md:w-3/5 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-sunset/10 rounded-full flex items-center justify-center text-sunset">
                          {activity.icon}
                        </div>
                        <h3 className="font-syne font-bold text-lg text-ocean">{activity.title}</h3>
                      </div>
                      <p className="font-dm text-ocean/70 text-sm mb-4">{activity.description}</p>
                      
                      <div className="mb-3">
                        <p className="font-dm text-xs text-ocean/60 mb-1">Available in:</p>
                        <div className="flex flex-wrap gap-1">
                          {activity.locations.map((loc) => (
                            <span key={loc} className="bg-ocean/10 text-ocean px-2 py-0.5 rounded text-xs font-dm">
                              {loc}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="font-dm text-xs text-ocean/60 mb-1">Includes:</p>
                        <ul className="space-y-1">
                          {activity.includes.map((item) => (
                            <li key={item} className="flex items-center gap-1 font-dm text-xs text-ocean/80">
                              <Check size={12} className="text-sunset" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-syne font-bold text-sunset">{activity.price}</span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Book */}
      <section id="how-to-book" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean mb-8 text-center">How to Book Activities</h2>
          <Card className="border-none bg-warmwhite">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sunset rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <Info size={24} />
                </div>
                <div>
                  <p className="font-dm text-ocean/80 mb-4">
                    Activities are optional and can be booked during your stay. Simply let your 
                    group leader know what you'd like to do, and we'll arrange everything for you.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Activities are paid separately from your main experience",
                      "Prices shown are estimates — final prices confirmed on site",
                      "Group discounts available for some activities",
                      "Weather-dependent activities may be rescheduled"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 font-dm text-sm text-ocean/70">
                        <Check size={14} className="text-sunset mt-1 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-ocean text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-white mb-4">
            Ready for Adventure?
          </h2>
          <p className="font-dm text-white/80 mb-6">
            Book your main experience first, then add activities during your stay.
          </p>
          <Button asChild size="lg" className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-8">
            <Link to="/book">Book Your Experience <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default ActivitiesPage;
