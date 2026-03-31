import { useState, useEffect, lazy, Suspense } from "react";
import { ThemeProvider } from "next-themes";
import { motion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";
import LoadingScreen from "@/components/portfolio/LoadingScreen";
import Header from "@/components/portfolio/Header";
import Hero from "@/components/portfolio/Hero";

// Lazy load all below-the-fold components
const About = lazy(() => import("@/components/portfolio/About"));
const Skills = lazy(() => import("@/components/portfolio/Skills"));
const Projects = lazy(() => import("@/components/portfolio/Projects"));
const Experience = lazy(() => import("@/components/portfolio/Experience"));
const Education = lazy(() => import("@/components/portfolio/Education"));
const Contact = lazy(() => import("@/components/portfolio/Contact"));
const Footer = lazy(() => import("@/components/portfolio/Footer"));
const NoiseOverlay = lazy(() => import("@/components/portfolio/NoiseOverlay"));
const SectionDivider = lazy(() => import("@/components/portfolio/SectionDivider"));

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  const d = portfolioData;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <Suspense fallback={null}>
        <NoiseOverlay />
      </Suspense>
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
            <Suspense fallback={<div className="min-h-[200px]" />}>
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
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer name={d.name} contact={d.contact} />
          </Suspense>
        </motion.div>
      )}
    </ThemeProvider>
  );
};

export default Index;
