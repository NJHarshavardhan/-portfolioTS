import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import data from "../config/data.json";
import {
  Store,
  Smartphone,
  Apple,
  ExternalLink,
  Github,
  Code,
} from "lucide-react";
// Removed GSAP reveal to avoid layout jump/extra space

const iconMap = {
  Store: <Store className="w-5 h-5" />,
  Smartphone: <Smartphone className="w-5 h-5" />,
  Apple: <Apple className="w-5 h-5" />,
  Github: <Github className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
  ExternalLink: <ExternalLink className="w-5 h-5" />,
};

type IconKey = keyof typeof iconMap;
const projects = data.projects;

export const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(
    null
  );
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // No GSAP reveal here to prevent unexpected spacing on some browsers

  const isMobile = windowWidth < 640; // Tailwind 'sm' breakpoint = 640px

  const cardWidthDesktop = 440;
  const overlapDesktop = 110;

  const cardWidthMobile = 320;
  const overlapMobile = 40;

  const getMarginLeft = (idx: number) => {
    if (isMobile) {
      // If a card is active on mobile, others are slightly pushed aside
      if (activeMobileIndex === null) {
        return idx === 0 ? 0 : -overlapMobile;
      }
      if (idx < activeMobileIndex) {
        return idx === 0 ? 0 : -overlapMobile;
      }
      if (idx === activeMobileIndex) {
        return 0;
      }
      return overlapMobile * 0.6;
    }

    // Desktop hover logic
    if (hoveredIndex === null) {
      return idx === 0 ? 0 : -overlapDesktop;
    }
    if (idx < hoveredIndex) {
      return idx === 0 ? 0 : -overlapDesktop;
    }
    if (idx === hoveredIndex) {
      return 0;
    }
    return overlapDesktop * 0.5;
  };

  const handleMobileClick = (idx: number) => {
    if (!isMobile) return;
    setActiveMobileIndex(activeMobileIndex === idx ? null : idx);
  };

  return (
    <section
      id="projects"
      className="pt-14 pb-10 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
        >
          Featured Projects
        </motion.h2>

        <div
          className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200 dark:scrollbar-thumb-blue-700 dark:scrollbar-track-gray-800 py-2 sm:py-3 gap-0"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            paddingLeft: isMobile ? overlapMobile / 2 : overlapDesktop / 2,
            paddingRight: isMobile ? overlapMobile / 2 : overlapDesktop / 2,
            marginBottom: 0,
          }}
          ref={containerRef}
        >
          {projects.map((project, idx) => {
            const isActiveMobileCard = isMobile && activeMobileIndex === idx;
            return (
              <motion.div
                key={idx}
                onHoverStart={() => !isMobile && setHoveredIndex(idx)}
                onHoverEnd={() => !isMobile && setHoveredIndex(null)}
                onClick={() => handleMobileClick(idx)}
                animate={{
                  marginLeft: getMarginLeft(idx),
                  scale: isActiveMobileCard || hoveredIndex === idx ? 1.05 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`card-shine relative flex-shrink-0 flex bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700
                  shadow-md hover:shadow-xl transition-shadow duration-300 will-change-transform`}
                style={{
                  zIndex:
                    isActiveMobileCard || hoveredIndex === idx ? 10 : 1 + idx,
                  scrollSnapAlign: "start",
                  cursor: "pointer",
                  minWidth: isMobile
                    ? isActiveMobileCard
                      ? "95vw"
                      : cardWidthMobile
                    : cardWidthDesktop,
                  maxWidth: isMobile
                    ? isActiveMobileCard
                      ? "95vw"
                      : cardWidthMobile
                    : cardWidthDesktop,
                  marginBottom: 0,
                }}
                whileTap={{ scale: isMobile ? 0.98 : 0.97 }}
              >
                {/* Vertical title */}
                <div className="flex flex-col justify-center bg-gradient-to-b from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-purple-700 px-3 py-8 sm:py-12 rounded-l-3xl min-w-[52px]">
                  <span
                    className="text-sm font-bold text-white tracking-widest"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {project.title}
                  </span>
                </div>

                {/* Card content */}
                <div className="flex flex-col flex-1 p-4 sm:p-8">
                  <div className="flex justify-start mb-3">
                    <span className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50 whitespace-nowrap w-fit">
                      Role: {project.type}
                    </span>
                  </div>
                  <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-3"></div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                    <span className="font-bold text-xs text-gray-800 dark:text-gray-100 tracking-wide">
                      Description
                    </span>
                  </div>
                  <div className="mb-4 space-y-1.5 sm:space-y-2 text-gray-700 dark:text-gray-200 text-xs sm:text-sm leading-relaxed px-3 sm:px-0 overflow-visible break-words">
                    {project.description.map((desc, i) => (
                      <div className="flex items-start gap-2" key={i}>
                        <span className="mt-1 text-blue-500 text-base select-none leading-none">
                          •
                        </span>
                        <span className="text-xs sm:text-sm">{desc}</span>
                      </div>
                    ))}
                  </div>
                
                  {/* Technologies */}
                  {project.technologies && (
                    <div className="mb-6">
                        <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-3"></div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                        <span className="font-bold text-xs text-gray-800 dark:text-gray-100 tracking-wide">
                          Technologies
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.split(", ").map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium select-none transition"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                     
                  {/* Spacer to push links to bottom */}
                  <div className="flex-1"></div>

                  {/* Links - now at bottom */}
                  <div className="flex gap-3 pt-1 flex-wrap mt-auto">
                  <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-3"></div>
                    {project.link_1 && (
                      
                      <motion.a
                        href={project.link_1}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold shadow-lg transition-transform"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.97 }}
                        title={project.icon_1_text}
                      >
                        
                        {iconMap[project.icon_1 as IconKey] ||
                          iconMap.ExternalLink}
                        <span>{project.icon_1_text}</span>
                      </motion.a>
                    )}
                    {project.link_2 && (
                      <motion.a
                        href={project.link_2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium shadow-sm transition-transform"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.97 }}
                        title={project.icon_2_text}
                      >
                        {iconMap[project.icon_2 as IconKey] ||
                          iconMap.ExternalLink}
                        <span>{project.icon_2_text}</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
