import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CaseStudySection from "@/components/CaseStudySection";
import ClientShowcase from "@/components/ClientShowcase";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import ServicesSection from "@/components/ServicesSection";
import InteractiveSection from "@/components/InteractiveSection";
import Chatbot from "@/components/Chatbot";
import ContactSection from "@/components/ContactSection";
import { motion } from "framer-motion";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300"
    >
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Case Study Section */}
      <CaseStudySection />
      
      {/* Client Showcase */}
      <div id="customers">
        <ClientShowcase />
      </div>
      
      {/* Projects Carousel */}
      <ProjectsCarousel />
      
      {/* Services Section */}
      <div id="services">
        <ServicesSection />
      </div>

      {/* Interactive Dashboard Section */}
      <InteractiveSection />

      {/* Contact Section */}
      <div id="contact">
        <ContactSection />
      </div>

      {/* Chatbot */}
      <Chatbot />
    </motion.div>
  );
};

export default Index;
