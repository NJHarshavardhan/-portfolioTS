import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { motion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";
import LoadingScreen from "@/components/portfolio/LoadingScreen";
import Header from "@/components/portfolio/Header";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Education from "@/components/portfolio/Education";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import NoiseOverlay from "@/components/portfolio/NoiseOverlay";
import SectionDivider from "@/components/portfolio/SectionDivider";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  const d = portfolioData;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <NoiseOverlay />
      <LoadingScreen isLoading={isLoading} name={d.name} />
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <Header />
          <main>
            <Hero name={d.name} titles={d.titles} about={d.about} />
            <SectionDivider />
            <About about={d.about} stats={d.stats} roles={d.roles} />
            <SectionDivider />
            <Skills skills={d.technical_skills} />
            <SectionDivider />
            <Projects projects={d.projects} />
            <SectionDivider />
            <Experience experience={d.experience} />
            <SectionDivider />
            <Education education={d.education} />
            <SectionDivider />
            <Contact contact={d.contact} />
          </main>
          <Footer name={d.name} contact={d.contact} />
        </motion.div>
      )}
    </ThemeProvider>
  );
};

export default Index;
