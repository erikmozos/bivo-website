
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import RegistrationForm from "@/components/form/RegistrationForm";
import AlliancesSection from "@/components/sections/AlliancesSection";
import RecognitionsSection from "@/components/sections/RecognitionsSection";
import TeamSection from "@/components/sections/TeamSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
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
