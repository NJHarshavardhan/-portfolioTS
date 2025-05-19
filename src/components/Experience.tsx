import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Briefcase, Calendar, MapPin, ChevronDown, Award, ExternalLink } from "lucide-react";
import data from "../config/data.json";

const experienceData = data.experience;

export const Experience = () => {
  // Reference for scroll animations
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-24 px-4 min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500 mb-4 tracking-tight">
            Professional Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My career journey and key professional milestones
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 top-0 h-full w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600 rounded-full hidden md:block" />
          
          {/* Experience Cards */}
          {experienceData.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Separate Component for Experience Cards
const ExperienceCard = ({ experience, index }: { experience: any; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div 
      className="relative mb-12 md:pl-16 pl-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={cardVariants}
    >
      {/* Timeline Dot Marker */}
      <div className="absolute left-8 top-8 transform -translate-x-1/2 hidden md:block">
        <motion.div 
          className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 border-4 border-white dark:border-gray-800 rounded-full shadow-lg"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.4 }}
        />
      </div>

      {/* Card Content */}
      <motion.div
        layout
        className="backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        whileHover={{ 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          y: -5
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Header Section */}
        <div 
          className="p-6 cursor-pointer" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              {/* Position & Time Period Banner */}
              <div className="flex flex-wrap justify-between items-center mb-3">
                <div className="flex items-center">
                  <div className="mr-3 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Briefcase className="text-blue-600 dark:text-blue-400" size={18} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    {experience.role}
                  </h4>
                </div>
                <span className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 mt-2 sm:mt-0">
                  <Calendar size={14} className="mr-1" />
                  {experience.period}
                </span>
              </div>

              {/* Company & Location */}
              <div className="flex flex-wrap justify-between items-center">
                <h3 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500">
                  {experience.company}
                </h3>
                <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
                  <MapPin size={14} className="mr-1" />
                  {experience.location}
                </span>
              </div>
            </div>
            
            {/* Expand/Collapse Icon */}
            <div className="ml-4">
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full"
              >
                <ChevronDown size={18} className="text-blue-600 dark:text-blue-400" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 pb-6 pt-2">
                <div className="flex items-center mb-4">
                  <Award size={18} className="text-indigo-600 dark:text-indigo-400 mr-2" />
                  <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Key Achievements
                  </h5>
                </div>
                <ul className="space-y-3">
                  {experience.achievements.map((achievement: string, i: number) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="h-6 w-6 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3 mt-0.5">
                        <span className="text-xs font-bold">{i + 1}</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};