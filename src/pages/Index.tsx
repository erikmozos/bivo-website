import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import WhatIsBivoSection from "@/components/sections/WhatIsBivoSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import AlliancesSection from "@/components/sections/AlliancesSection";
import RecognitionsSection from "@/components/sections/RecognitionsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import TeamSection from "@/components/sections/TeamSection";
import ContactSection from "@/components/sections/ContactSection";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
      window.history.replaceState({}, document.title);
    }

    if (location.hash) {
      const sectionId = location.hash.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.state, location.hash]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <HeroSection />
        <WhatIsBivoSection />
        <HowItWorksSection />
        <AlliancesSection />
        <RecognitionsSection />
        <TestimonialsSection />
        <PricingSection />
        <TeamSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
