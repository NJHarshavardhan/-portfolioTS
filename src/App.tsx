import { useState, useEffect } from "react";
import { ThemeToggle } from "./components/ThemeToggle";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import Clarity from "@microsoft/clarity";
import PortfolioJsonLd from "./components/PortfolioJsonLd"; 
import ChatBot from "./components/ChatBot";
import ScrollProgress from "./components/ScrollProgress";
import { ScrollTrigger } from "./lib/gsap";
import Lenis from "@studio-freight/lenis";
function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    const projectId = "qm1frkauta";
    Clarity.init(projectId);
  }, [isDark]);

  // Smooth scroll (Nothing-like slower inertial) + ScrollTrigger sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 0.65,
      touchMultiplier: 0.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 2),
    });

    // Expose for programmatic anchor scrolling (Navigation)
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      // @ts-ignore
      lenis?.destroy?.();
      if ((window as any).lenis === lenis) {
        delete (window as any).lenis;
      }
    };
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
      <ScrollProgress />
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      <Navigation />
      <main className="bg-purple-50 dark:bg-slate-900 bg-mesh text-gray-900 dark:text-white transition-colors duration-200">
        <Hero />
        <About />
        <Experience />
        <PortfolioJsonLd />
        <Skills />
        <Projects />
        <Education />
        <Contact />
        <Footer />
        <ChatBot />
      </main>
    </div>
  );
}

export default App;
