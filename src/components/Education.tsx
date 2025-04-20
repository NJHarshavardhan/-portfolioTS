import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import data from "../config/data.json";
const education = data.education;

export const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-5xl font-bold text-center mb-16">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
            Education Journey
          </span>
        </h2>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Timeline line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>

          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 
                           shadow-lg hover:shadow-2xl transition-all duration-300 
                           hover:scale-105 hover:border-blue-500 dark:hover:border-blue-400"
              >
                <div className=""></div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                    <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    {edu.school}
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {edu.degree}
                  </p>

                  <div className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.period}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      <MapPin className="w-4 h-4" />
                      <span>{edu.location}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-lg inline-block">
                      {edu.grade}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
