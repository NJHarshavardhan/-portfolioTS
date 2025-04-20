import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin, Download, Eye } from "lucide-react";
import resumeFile from "../assets/Harsha-Resume.pdf";
import data from "../config/data.json";
const resumeUrl = resumeFile;
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
      id="experience"
      className="relative h-[250vh] bg-gray-50 dark:bg-gray-900"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="flex items-center gap-8 mb-12 mt-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Experience
          </motion.h2>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href={resumeUrl}
            download
            className="text-purple-600 hover:text-blue-800"
          >
            <Download className="w-6 h-6" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-blue-800"
          >
            <Eye className="w-6 h-6" />
          </motion.a>
        </div>

        <div className="relative w-full max-w-4xl mx-auto h-[600px]">
          {experienceData.map((exp, index) => {
            const progress = useTransform(
              scrollYProgress,
              [
                index / experienceData.length,
                (index + 1) / experienceData.length,
              ],
              [0, 1]
            );

            const translateY = useTransform(progress, [0, 1], [0, -100]);
            const scale = useTransform(progress, [0, 1], [1, 0.8]);
            const opacity = useTransform(progress, [0, 0.5, 1], [1, 1, 0]);

            return (
              <motion.div
                key={index}
                style={{
                  position: "absolute",
                  width: "100%",
                  y: translateY,
                  scale,
                  opacity,
                  zIndex: experienceData.length - index,
                }}
                className="p-4"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {exp.company}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {exp.role}
                    </h4>
                  </div>

                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
