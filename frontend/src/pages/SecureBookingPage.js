import { motion } from "framer-motion";
import SecureBookingForm from "../components/SecureBookingForm";
import PageLayout from "./components/PageLayout";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SecureBookingPage = () => {
  
  const handleBookingSubmit = async (formData) => {
    // Send to backend
    await axios.post(`${API}/contact`, {
      name: formData.fullName,
      email: formData.email,
      message: `🔒 RÉSERVATION SÉCURISÉE

👤 PARTICIPANT
Nom: ${formData.fullName}
Email: ${formData.email}
Téléphone: ${formData.phone}

📅 DÉTAILS
Date: ${formData.date}
Heure: ${formData.time}
Nombre de personnes: ${formData.numberOfPeople}

🎯 EXPÉRIENCE
${formData.experience}

⏰ Soumis le: ${formData.timestamp}`,
      trip_interest: formData.experience
    });
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-ocean to-ocean/90 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-syne font-black text-3xl sm:text-4xl lg:text-5xl mb-4">
              Réservation
            </h1>
            <p className="font-dm text-white/80 text-lg">
              Réservez votre expérience THE BRIDGE en toute sécurité
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 sm:py-16 bg-warmwhite">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <SecureBookingForm 
            onSubmit={handleBookingSubmit}
            experienceTitle="Expérience THE BRIDGE"
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default SecureBookingPage;
