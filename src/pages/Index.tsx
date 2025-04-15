
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import RegistrationForm from "@/components/form/RegistrationForm";
import AlliancesSection from "@/components/sections/AlliancesSection";
import RecognitionsSection from "@/components/sections/RecognitionsSection";
import TeamSection from "@/components/sections/TeamSection";
import ContactSection from "@/components/sections/ContactSection";
import { useEffect } from "react";

const Index = () => {
  // Ensure images have fallbacks
  useEffect(() => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.hasAttribute('onerror')) {
        img.onerror = function() {
          const imgElement = this as HTMLImageElement;
          imgElement.onerror = null;
          imgElement.src = "https://via.placeholder.com/400x300/f0f0f0/808080?text=Deporte+de+Raqueta";
        };
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <RegistrationForm />
        <AlliancesSection />
        <RecognitionsSection />
        <TeamSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
