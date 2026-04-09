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
      // Wait for navigation to complete before scrolling
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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass border-b border-white/5 py-2 shadow-2xl" : "bg-transparent py-4"
        }`}
      >
        <nav className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-heading font-bold text-foreground cursor-pointer flex items-center gap-1"
              onClick={handleLogoClick}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-primary/80">{en.header.logo}</span>
              <span className="text-primary text-3xl">.</span>
            </motion.span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick(item)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-10 h-10 flex items-center justify-center cursor-pointer z-[60]"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                className="absolute w-6 h-0.5 bg-foreground block rounded-full"
                transition={{ duration: 0.3 }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="absolute w-6 h-0.5 bg-foreground block rounded-full"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                className="absolute w-6 h-0.5 bg-foreground block rounded-full"
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </nav>

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
