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
      className="relative bg-gray-50 dark:bg-gray-900 py-20 px-4"
    >
      <h2 className="text-center text-4xl font-bold text-blue-600 mb-16">
        Timeline Experience
      </h2>
      <div className="relative max-w-4xl mx-auto before:hidden sm:before:block sm:before:absolute sm:before:left-1/2 sm:before:-ml-px sm:before:w-1 sm:before:h-full sm:before:bg-gradient-to-b sm:before:from-blue-500 sm:before:to-purple-500">

        {experienceData.map((exp, i) => {
          const side = i % 2 === 0 ? "left" : "right";
          const offsetY = useTransform(scrollYProgress, [0, 1], [50, 0]);

          const [showAchievements, setShowAchievements] = useState(false);

          return (
            <motion.div
            key={i}
            className={`mb-10 w-full flex ${
              side === "left" ? "sm:justify-start" : "sm:justify-end"
            } justify-center`}
            style={{ y: offsetY }}
          >
            <motion.div
              layout
              transition={{ layout: { duration: 0.4, type: "spring" } }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full sm:w-[45%] cursor-pointer"
              onClick={() => setShowAchievements((prev) => !prev)}
            >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-blue-600">{exp.company}</h3>
                    <div className="text-sm text-gray-500 flex gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    </div>
                    <h4 className="mt-4 text-md font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Briefcase size={16} />
                      {exp.role}
                    </h4>
                  </div>
                  <ChevronDown
                    size={20}
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
                      className="mt-4 list-disc list-inside text-gray-600 dark:text-gray-400 overflow-hidden"
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
