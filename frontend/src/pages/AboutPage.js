import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Compass, Users, Target, Sun, Sunrise, MapPin, 
  Heart, Shield, Camera, Languages, ArrowRight 
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
          <div className="absolute top-20 left-10 w-64 h-64 bg-sand rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-sunset rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-syne font-black text-4xl sm:text-5xl lg:text-6xl mb-6">
              About The Bridge
            </h1>
            <p className="font-dm text-xl sm:text-2xl text-sand">
              A different way to travel
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 sm:py-20 bg-warmwhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="font-dm text-lg text-ocean/80 leading-relaxed mb-6">
              The Bridge was created for people who love to travel but don't want to spend their days lying on a beach chair.
            </p>
            <p className="font-dm text-lg text-ocean/80 leading-relaxed mb-6">
              Our experiences are designed for curious travelers who want to learn something new, stay active, and connect with people while discovering Morocco.
            </p>
            <p className="font-dm text-lg text-ocean/80 leading-relaxed">
              Instead of traditional tourism, we offer small group experiences built around <strong className="text-ocean">learning</strong>, <strong className="text-ocean">exploration</strong>, and <strong className="text-ocean">human connection</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Travel with Purpose */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-syne font-bold text-3xl sm:text-4xl text-ocean mb-4">
              Travel with purpose
            </h2>
            <p className="font-dm text-ocean/70 max-w-2xl mx-auto">
              Each experience combines two elements:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-lg h-full bg-gradient-to-br from-sunset/5 to-sunset/10">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-sunset rounded-2xl flex items-center justify-center mb-6">
                    <Sunrise className="text-white" size={28} />
                  </div>
                  <h3 className="font-syne font-bold text-xl text-ocean mb-3">A skill in the morning</h3>
                  <p className="font-dm text-ocean/70">
                    Training, learning, or creative practice.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-lg h-full bg-gradient-to-br from-sand/10 to-sand/20">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-sand rounded-2xl flex items-center justify-center mb-6">
                    <Sun className="text-ocean" size={28} />
                  </div>
                  <h3 className="font-syne font-bold text-xl text-ocean mb-3">Exploration in the afternoon</h3>
                  <p className="font-dm text-ocean/70">
                    Discovering the city, meeting people, and experiencing the local culture.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center font-dm text-ocean/70 mt-10 max-w-2xl mx-auto"
          >
            This simple structure allows participants to travel while developing a new ability and sharing a meaningful experience with others.
          </motion.p>
        </div>
      </section>

      {/* Small Groups */}
      <section className="py-16 sm:py-20 bg-ocean text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-syne font-bold text-3xl sm:text-4xl mb-6">
                Small groups, real connections
              </h2>
              <p className="font-dm text-white/80 text-lg mb-6">
                All experiences are limited to a maximum of <strong className="text-sand">10 participants</strong>.
              </p>
              <p className="font-dm text-white/80 mb-6">
                This allows us to create a friendly and relaxed atmosphere where people can:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-sand rounded-full"></div>
                  <span className="font-dm text-white/90">Learn comfortably</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-sand rounded-full"></div>
                  <span className="font-dm text-white/90">Meet like-minded travelers</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-sand rounded-full"></div>
                  <span className="font-dm text-white/90">Share authentic moments</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-48 h-48 bg-sand/20 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-sand/30 rounded-full flex items-center justify-center">
                    <Users className="text-sand" size={48} />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-sunset text-white font-syne font-bold text-xl px-4 py-2 rounded-full">
                  Max 10
                </div>
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center font-dm text-white/70 mt-12 text-lg"
          >
            Our goal is not mass tourism, but <strong className="text-sand">quality experiences</strong> and <strong className="text-sand">real human connections</strong>.
          </motion.p>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-16 sm:py-20 bg-warmwhite">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-syne font-bold text-3xl sm:text-4xl text-ocean mb-4">
              Experiences designed around skills
            </h2>
            <p className="font-dm text-ocean/70 max-w-2xl mx-auto">
              The Bridge focuses on experiences where travel meets learning.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link to="/experiences/self-defense">
                <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-sunset/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="text-sunset" size={32} />
                    </div>
                    <h3 className="font-syne font-bold text-ocean mb-2">Self-Defense</h3>
                    <p className="font-dm text-ocean/60 text-sm">Weekend experiences</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/experiences/visual-storytelling">
                <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-sunset/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Camera className="text-sunset" size={32} />
                    </div>
                    <h3 className="font-syne font-bold text-ocean mb-2">Visual Storytelling</h3>
                    <p className="font-dm text-ocean/60 text-sm">Weekend experiences</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/experiences/language-practice">
                <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-sunset/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Languages className="text-sunset" size={32} />
                    </div>
                    <h3 className="font-syne font-bold text-ocean mb-2">Language Practice</h3>
                    <p className="font-dm text-ocean/60 text-sm">Weekly experiences</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center font-dm text-ocean/70 mt-10 max-w-2xl mx-auto"
          >
            Each program is designed to be accessible, engaging, and practical, whether you want to improve a skill or simply try something new.
          </motion.p>
        </div>
      </section>

      {/* Morocco */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-syne font-bold text-3xl sm:text-4xl text-ocean mb-6">
                Morocco as a playground
              </h2>
              <p className="font-dm text-ocean/80 text-lg mb-6">
                Morocco offers a unique combination of culture, landscapes, and energy.
              </p>
              <p className="font-dm text-ocean/70 mb-6">
                Our experiences take place in cities such as <strong className="text-ocean">Marrakech</strong> and <strong className="text-ocean">Agadir</strong>, where participants can enjoy both dynamic urban environments and inspiring surroundings.
              </p>
              <p className="font-dm text-ocean/70">
                From vibrant markets to ocean views, Morocco becomes the perfect setting for active travel experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <Link to="/destinations/marrakech" className="group">
                <div className="bg-gradient-to-br from-sunset/10 to-sunset/20 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                  <MapPin className="text-sunset mx-auto mb-3" size={32} />
                  <h4 className="font-syne font-bold text-ocean group-hover:text-sunset transition-colors">Marrakech</h4>
                </div>
              </Link>
              <Link to="/destinations/agadir" className="group">
                <div className="bg-gradient-to-br from-sand/20 to-sand/30 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                  <MapPin className="text-ocean mx-auto mb-3" size={32} />
                  <h4 className="font-syne font-bold text-ocean group-hover:text-sunset transition-colors">Agadir</h4>
                </div>
              </Link>
              <Link to="/destinations/casablanca" className="group col-span-2">
                <div className="bg-gradient-to-br from-ocean/5 to-ocean/10 rounded-2xl p-6 text-center hover:shadow-lg transition-all">
                  <MapPin className="text-ocean mx-auto mb-3" size={32} />
                  <h4 className="font-syne font-bold text-ocean group-hover:text-sunset transition-colors">Casablanca</h4>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-ocean to-ocean/90 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-syne font-bold text-3xl sm:text-4xl mb-8">
              The Bridge philosophy
            </h2>
            <p className="font-dm text-xl text-white/80 mb-6">
              We believe travel should be more than just visiting places.
            </p>
            <p className="font-dm text-xl text-white/80 mb-10">
              It should be about <span className="text-sand">learning</span>, <span className="text-sand">moving</span>, <span className="text-sand">creating</span>, and <span className="text-sand">connecting</span>.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10">
              <p className="font-syne font-bold text-2xl text-sand">
                The Bridge is exactly that:
              </p>
              <p className="font-dm text-xl text-white mt-2">
                a bridge between travel, skills, and people.
              </p>
            </div>
            <Button asChild size="lg" className="bg-sunset hover:bg-sunset/90 text-white rounded-full px-8">
              <Link to="/book">
                Start Your Journey <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;
