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

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      <Navigation />
      <main className="bg-purple-50 dark:bg-slate-900 text-gray-900 dark:text-white transition-colors duration-200">
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
