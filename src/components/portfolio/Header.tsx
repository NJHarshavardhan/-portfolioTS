import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
const Lanyard = lazy(() => import("./Lanyard"));
import en from "../../data/en.json";

const navItems = ["About", "Skills", "Projects", "Games", "Experience", "Contact"];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLanyard, setShowLanyard] = useState(false);
  const lanyardTimeoutRef = useRef<NodeJS.Timeout | null>(null);



  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (showLanyard) {
      if (lanyardTimeoutRef.current) clearTimeout(lanyardTimeoutRef.current);
      lanyardTimeoutRef.current = setTimeout(() => {
        setShowLanyard(false);
      }, 30000); // 30 seconds
    } else {
      if (lanyardTimeoutRef.current) {
        clearTimeout(lanyardTimeoutRef.current);
        lanyardTimeoutRef.current = null;
      }
    }
    return () => {
      if (lanyardTimeoutRef.current) clearTimeout(lanyardTimeoutRef.current);
    };
  }, [showLanyard]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (item: string) => {
    if (item === "Games") {
      navigate("/games");
      setMobileOpen(false);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const handleLogoClick = () => {
    // setShowLanyard(prev => !prev);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 left-0 right-0 z-50 w-full"
      >
        <div 
          className={`flex flex-col w-full transition-all duration-500 overflow-hidden ${
            scrolled ? "bg-background/90 backdrop-blur-xl border-b border-primary/20 shadow-[0_10px_30px_-15px_rgba(168,85,247,0.3)]" : "bg-background/40 backdrop-blur-md border-b border-border/10"
          }`}
        >
          {/* OS Window Controls (Terminal Vibe) */}
          <div className={`w-full flex items-center px-4 gap-1.5 transition-all duration-500 ${scrolled ? 'h-4 bg-black/50 border-b border-primary/20' : 'opacity-0 h-0 hidden'}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-destructive/80" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
            <span className="text-[8px] text-muted-foreground font-mono ml-4 tracking-wider flex-1 text-left opacity-50 uppercase">
              ~/app/nav.tsx
            </span>
          </div>

          <div className="flex items-center justify-between px-4 md:px-8 py-1 md:py-1.5">
            {/* Blinking Terminal Logo */}
            <div className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="text-base md:text-lg font-mono font-bold text-foreground cursor-pointer flex items-center"
                onClick={handleLogoClick}
              >
                <span className="text-primary mr-1.5 opacity-90 tracking-widest">{">"}</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">{en.header.logo.toLowerCase()}</span>
                <motion.span 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }} 
                  className="w-1.5 h-4 bg-primary ml-1"
                />
              </motion.div>
            </div>

            {/* Desktop Nav - Code Tags */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <motion.button
                  key={item}
                  whileHover="hover"
                  initial="initial"
                  onClick={() => handleNavClick(item)}
                  className="text-sm font-mono font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer relative group flex items-center h-6 overflow-hidden"
                >
                  <motion.span 
                    variants={{ initial: { x: 20, opacity: 0 }, hover: { x: 0, opacity: 1 } }}
                    transition={{ ease: "easeOut", duration: 0.2 }}
                    className="text-primary mr-1 text-sm"
                  >
                    &lt;
                  </motion.span>

                  <span className="tracking-wide uppercase z-10">{item}</span>
                  
                  <motion.span 
                    variants={{ initial: { x: -20, opacity: 0 }, hover: { x: 0, opacity: 1 } }}
                    transition={{ ease: "easeOut", duration: 0.2 }}
                    className="text-primary ml-1 text-sm"
                  >
                    /&gt;
                  </motion.span>
                </motion.button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <div className="p-0.5 rounded border border-border/50 bg-background/50 hidden md:block">
                <ThemeToggle />
              </div>
              
              {/* Mobile hamburger (Code Bracket Style) */}
              <div className="md:hidden flex items-center">
                <div className="p-0.5 rounded border border-border/50 bg-background/50 mr-1.5">
                   <ThemeToggle />
                </div>
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="relative h-6 px-1.5 flex items-center justify-center cursor-pointer bg-primary/10 rounded border border-primary/20 text-primary hover:bg-primary/30 transition-colors font-mono font-bold text-xs"
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? "{..}" : "[+]"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] glass-strong border-l border-border/40 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <span className="text-lg font-heading font-bold text-foreground">
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full w-8 h-8 flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  &times;
                </button>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-6" />

              <nav className="flex-1 px-6 py-8 flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                    onClick={() => handleNavClick(item)}
                    className="text-left py-3 px-4 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all cursor-pointer group flex items-center gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all" />
                    {item}
                  </motion.button>
                ))}
              </nav>

              <div className="px-6 py-6">
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />
                <p className="text-xs text-muted-foreground font-body text-center">
                  © {new Date().getFullYear()} Harsha Vardhan
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Lanyard Overlay */}
      <AnimatePresence>
        {showLanyard && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-20 right-0 z-[100] w-full max-w-[450px] h-[calc(100vh-80px)] pointer-events-none"
          >
            <div className="w-full h-full pointer-events-auto relative">
              <button
                onClick={() => setShowLanyard(false)}
                className="absolute top-20 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-primary transition-all z-50 cursor-pointer backdrop-blur-md border border-white/10"
              >
                <span className="text-xl">&times;</span>
              </button>
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white pointer-events-none">Loading 3D Card...</div>}>
                <Lanyard />
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
