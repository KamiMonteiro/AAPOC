import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CalendarSection from "@/components/CalendarSection";
import ServicesSection from "@/components/ServicesSection";
import HistorySection from "@/components/HistorySection";
import ProjectsSection from "@/components/ProjectsSection";
import GallerySection from "@/components/GallerySection";
import HelpSection from "@/components/HelpSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CalendarSection />
      <ServicesSection />
      <HistorySection />
      <ProjectsSection />
      <GallerySection />
      <HelpSection />
      <ContactSection />
    </div>
  );
};

export default Index;
