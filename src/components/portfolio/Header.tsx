import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloudSun } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Lanyard from "./Lanyard";
import en from "../../data/en.json";

const navItems = ["About", "Skills", "Projects", "Experience", "Contact"];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLanyard, setShowLanyard] = useState(false);
  const [weather, setWeather] = useState<{ temp: number; city: string } | null>(null);
  const lanyardTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number, city: string) => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const data = await res.json();
        setWeather({
          temp: Math.round(data.current_weather.temperature),
          city: city
        });
      } catch (e) {
        console.error("Weather fetch failed", e);
      }
    };

    const getIPFallback = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data.latitude) {
          fetchWeather(data.latitude, data.longitude, data.city || "Your Area");
        }
      } catch (e) {
        console.error("IP fallback failed", e);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Success: Use exact coordinates
          const { latitude: lat, longitude: lon } = position.coords;
          try {
            const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
            const geoData = await geoRes.json();
            const city = geoData.address.city || geoData.address.town || geoData.address.village || "Your Location";
            fetchWeather(lat, lon, city);
          } catch {
            fetchWeather(lat, lon, "Your Location");
          }
        },
        () => {
          // Failure/Denied: Fallback to IP approximation
          getIPFallback();
        },
        { timeout: 5000 }
      );
    } else {
      getIPFallback();
    }
  }, []);

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

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/60 backdrop-blur-xl border-b border-white/10 shadow-sm" : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-xl font-heading font-bold text-foreground cursor-pointer"
              onClick={handleLogoClick}
            >
              {en.header.logo}<span className="text-primary">.</span>
            </motion.span>

            {weather && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-medium text-muted-foreground whitespace-nowrap"
              >
                <CloudSun size={14} className="text-primary" />
                <span className="hidden sm:inline">{weather.city},</span>
                <span className="text-foreground font-bold">{weather.temp}°C</span>
              </motion.div>
            )}
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item}
                whileHover={{ y: -2 }}
                onClick={() => scrollTo(item)}
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
                    onClick={() => scrollTo(item)}
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
              <Lanyard />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
