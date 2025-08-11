import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  Code,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import data from "../config/data.json";
import resumePdf from "../assets/Harsha-Resume.pdf";
import HarshaPic from "../assets/Harsha-Pic-1.jpeg";

export const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const titles = data.titles;

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Professional profile image using avatar API (you can replace with your actual photo)
  const profileImageUrl = HarshaPic;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 pb-8"
    >
      {/* Enhanced background with animated particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 -z-10" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden -z-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Content Section - Now on the left */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center md:text-left order-2 md:order-1"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Available for new opportunities
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto]"
            animate={{
              backgroundPosition: ["0%", "200%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {data.name}
          </motion.h1>

          <div className="h-16 mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={titleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-semibold"
              >
                {titles[titleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-lg"
          >
            {data.experience_in_years} delivering clean UX, lightning-fast code,
            and AI-powered products that boost retention, conversions, and
            growth :) no fluff, only results.
          </motion.p>

          <motion.div
            className="flex gap-3 justify-center md:justify-start flex-wrap mb-16 md:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {/* Social links with enhanced styling */}
            <motion.a
              href={data.contact.github}
              target="_blank"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="group relative p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredIcon("github")}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <Github className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors" />
              {hoveredIcon === "github" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap"
                >
                  GitHub Profile
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-4 border-transparent border-t-gray-800" />
                </motion.div>
              )}
            </motion.a>

            <motion.a
              href={data.contact.linkedin}
              target="_blank"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="group relative p-3 rounded-xl bg-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredIcon("linkedin")}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <Linkedin className="w-6 h-6 text-white" />
              {hoveredIcon === "linkedin" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap"
                >
                  LinkedIn Profile
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-4 border-transparent border-t-gray-800" />
                </motion.div>
              )}
            </motion.a>

            <motion.a
              href={`mailto:${data.contact.email}`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="group relative p-3 rounded-xl bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredIcon("email")}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <Mail className="w-6 h-6 text-white" />
              {hoveredIcon === "email" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap"
                >
                  Send Email
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-4 border-transparent border-t-gray-800" />
                </motion.div>
              )}
            </motion.a>

            <motion.a
              href={`tel:${data.contact.phone.replace(/[^+\d]/g, "")}`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="group relative p-3 rounded-xl bg-red-600 shadow-lg hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredIcon("phone")}
              onMouseLeave={() => setHoveredIcon(null)}
              aria-label={`Call ${data.contact.phone}`}
            >
              <Phone className="w-6 h-6 text-white" />
              {hoveredIcon === "phone" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap"
                >
                  {data.contact.phone}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-4 border-transparent border-t-gray-800" />
                </motion.div>
              )}
            </motion.a>

            <motion.a
              href={resumePdf}
              download="Harsha-Resume.pdf"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredIcon("download")}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Resume
              </div>
              {hoveredIcon === "download" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap"
                >
                  Download Resume
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-4 border-transparent border-t-gray-800" />
                </motion.div>
              )}
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Profile Image Section - Now on the right */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex justify-center md:justify-start order-1 md:order-2"
        >
          <div className="relative">
            {/* Animated rings around profile */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-64 h-64 border-2 border-blue-200 dark:border-blue-800 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 w-56 h-56 border border-purple-200 dark:border-purple-800 rounded-full"
            />

            {/* Profile image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-56 h-56 mx-auto"
            >
              <img
                src={profileImageUrl}
                alt={`${data.name} - Professional Photo`}
                className="w-full h-full rounded-full border-4 border-white dark:border-gray-800 shadow-2xl object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr rounded-full" />
            </motion.div>

            {/* Floating tech icons around profile */}
            {[
              {
                icon: Code,
                position: "-top-4 -right-4",
                color: "text-blue-500",
              },
              {
                icon: Sparkles,
                position: "-bottom-4 -left-4",
                color: "text-purple-500",
              },
            ].map(({ icon: Icon, position, color }, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1.5,
                }}
                className={`absolute ${position} p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg`}
              >
                <Icon className={`w-5 h-5 ${color}`} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator with better mobile positioning */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{
            y: [0, 8, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-6 h-10 border-2 border-blue-400/50 dark:border-blue-500/50 rounded-full p-1 backdrop-blur-sm bg-white/10"
        >
          <motion.div
            animate={{
              y: [0, 16, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-2 h-2 bg-blue-500 rounded-full"
          />
        </motion.div>
        <motion.span
          className="mt-2 text-sm text-blue-500 dark:text-blue-400 font-medium tracking-wider hidden sm:block"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Explore
        </motion.span>
        {/* Mobile-only smaller text */}
        <motion.span
          className="mt-2 text-xs text-blue-500 dark:text-blue-400 font-medium tracking-wider sm:hidden"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Scroll
        </motion.span>
      </motion.div>
    </motion.section>
  );
};
