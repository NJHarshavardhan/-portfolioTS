import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, Calendar, MapPin, ChevronDown } from "lucide-react";
import data from "../config/data.json";

const experienceData = data.experience;

export const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      id="timeline"
      className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-24 px-4"
    >
      <h2 className="text-center text-5xl font-extrabold text-blue-600 mb-20 tracking-tight">
        Experience
      </h2>

      <div className="relative max-w-5xl mx-auto">
        {/* Timeline Line */}
        <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />

        {experienceData.map((exp, i) => {
          const side = i % 2 === 0 ? "sm:justify-start" : "sm:justify-end";
          const offsetY = useTransform(scrollYProgress, [0, 1], [60, 0]);

          const [showAchievements, setShowAchievements] = useState(false);

          return (
            <motion.div
              key={i}
              className={`mb-20 flex ${side} justify-center relative`}
              style={{ y: offsetY }}
            >
              {/* Timeline Dot */}
              <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 top-4 z-10">
                <div className="w-5 h-5 bg-blue-600 border-4 border-white dark:border-gray-900 rounded-full shadow-md" />
              </div>

              <motion.div
                layout
                transition={{ layout: { duration: 0.5, type: "spring" } }}
                className="backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 sm:w-[48%] w-full border border-gray-200 dark:border-gray-700 hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                onClick={() => setShowAchievements((prev) => !prev)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400">{exp.company}</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400 flex gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    </div>
                    <h4 className="mt-4 text-md font-semibold text-gray-800 dark:text-gray-300 flex items-center gap-2">
                      <Briefcase size={16} />
                      {exp.role}
                    </h4>
                  </div>
                  <ChevronDown
                    size={22}
                    className={`transition-transform duration-300 ${
                      showAchievements ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <AnimatePresence initial={false}>
                  {showAchievements && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2"
                    >
                      {exp.achievements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
