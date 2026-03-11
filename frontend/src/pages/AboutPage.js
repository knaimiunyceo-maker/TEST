import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Heart, Target, User, Mail, ArrowRight, Linkedin, Instagram
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "./components/PageLayout";

const AboutPage = () => {
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
            <p className="font-caveat text-sand text-xl mb-2">Our Story</p>
            <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
              About THE BRIDGE
            </h1>
            <p className="font-dm text-white/80 text-lg max-w-2xl mx-auto">
              More than a travel company — we're building bridges between cultures, skills, and people.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Bridge Concept */}
      <section id="concept" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-sunset rounded-full flex items-center justify-center text-white">
              <Heart size={24} />
            </div>
            <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean">The Bridge Concept</h2>
          </div>
          <p className="font-dm text-ocean/80 text-lg leading-relaxed mb-6">
            THE BRIDGE was born from a simple idea: <strong>travel should transform you</strong>. 
            Not just show you new places, but teach you new skills, introduce you to new people, 
            and leave you better than before.
          </p>
          <p className="font-dm text-ocean/80 text-lg leading-relaxed mb-6">
            We combine the best parts of a training camp, a language immersion program, and a 
            group travel experience. The result? Holidays that don't just relax you — they 
            challenge you, connect you, and change you.
          </p>
          <p className="font-caveat text-sunset text-2xl text-center">
            Travel • Practice • Experience
          </p>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-ocean rounded-full flex items-center justify-center text-white">
              <Target size={24} />
            </div>
            <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean">Our Mission</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Connect", desc: "Bring together like-minded travelers from around the world in small, intimate groups." },
              { title: "Challenge", desc: "Push participants to learn new skills and step outside their comfort zones." },
              { title: "Transform", desc: "Create experiences that leave lasting impact — new skills, new friends, new perspectives." }
            ].map((item) => (
              <Card key={item.title} className="border-none bg-warmwhite">
                <CardContent className="p-6 text-center">
                  <h3 className="font-syne font-bold text-ocean text-lg mb-2">{item.title}</h3>
                  <p className="font-dm text-ocean/70 text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section id="founder" className="py-16 px-4 sm:px-6 lg:px-12 bg-warmwhite">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center text-ocean">
              <User size={24} />
            </div>
            <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean">The Founder</h2>
          </div>
          <Card className="border-none">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 bg-ocean rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <User size={48} />
                </div>
                <div>
                  <h3 className="font-syne font-bold text-xl text-ocean mb-1">Naimi Mohamed Karim</h3>
                  <p className="font-dm text-sunset mb-4">Founder & CEO</p>
                  <p className="font-dm text-ocean/80 text-sm mb-4">
                    Karim founded THE BRIDGE after years of combining his passions: martial arts, 
                    languages, and travel. Having trained across Europe and Africa, he saw an 
                    opportunity to create experiences that bring people together through shared 
                    challenges and adventures.
                  </p>
                  <div className="flex gap-3">
                    <a 
                      href="https://www.linkedin.com/in/karim-naimi-b1aa1139/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-ocean/10 rounded-full flex items-center justify-center hover:bg-ocean hover:text-white transition-colors text-ocean"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-ocean/10 rounded-full flex items-center justify-center hover:bg-ocean hover:text-white transition-colors text-ocean"
                    >
                      <Instagram size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-sunset rounded-full flex items-center justify-center text-white">
              <Mail size={24} />
            </div>
            <h2 className="font-syne font-bold text-2xl sm:text-3xl text-ocean">Contact</h2>
          </div>
          <Card className="border-none bg-warmwhite">
            <CardContent className="p-6 md:p-8">
              <p className="font-dm text-ocean/80 mb-6">
                Have questions? Want to know more about our experiences? We'd love to hear from you.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-syne font-bold text-ocean mb-2">General Inquiries</h4>
                  <p className="font-dm text-ocean/70 text-sm">Use the booking form or reach out through our social channels.</p>
                </div>
                <div>
                  <h4 className="font-syne font-bold text-ocean mb-2">Company Info</h4>
                  <a 
                    href="https://annuaire-entreprises.data.gouv.fr/entreprise/unyceo-fr-953646577" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-dm text-sunset text-sm hover:underline"
                  >
                    View on Annuaire Entreprises →
                  </a>
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
            Ready to Join THE BRIDGE?
          </h2>
          <p className="font-dm text-white/80 mb-6">
            Start your transformation journey today.
          </p>
          <Button asChild size="lg" className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-8">
            <Link to="/book">Book Now <ArrowRight size={18} className="ml-2" /></Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;
