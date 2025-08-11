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

  // Enhanced smooth scroll with proper device detection
  useEffect(() => {
    // Better device detection - distinguish between mobile and laptop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android.*Tablet|Tablet.*Android/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Use Lenis on laptops and desktop (even with touchpads), but disable on mobile/tablets
    if (!isMobile && !isTablet) {
      const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: isTouchDevice ? 0.6 : 0.7,
        touchMultiplier: isTouchDevice ? 0.8 : 1.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        infinite: false,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        lerp: 0.08,
        syncTouch: true,
        syncTouchLerp: 0.1,
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
        lenis?.destroy?.();
        if ((window as any).lenis === lenis) {
          delete (window as any).lenis;
        }
      };
    } else {
      // Mobile/tablet fallback - use native smooth scroll
      (window as any).lenis = null;
      
      // Add CSS for native smooth scroll on mobile
      const style = document.createElement('style');
      style.textContent = `
        html {
          scroll-behavior: smooth;
        }
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
      };
    }
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
