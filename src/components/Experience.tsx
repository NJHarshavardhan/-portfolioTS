import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import resumeFile from "../assets/Harsha-Resume.pdf"; 
import { Download, Eye } from "lucide-react";
const resumeUrl =resumeFile;
const experienceData = [
  {
    company: "BINARYCHAKRA",
    role: "Software Engineer",
    period: "Oct 2023 - Present",
    location: "Madurai",
    achievements: [
      "Developed and deployed multiple successful Shopify apps using Polaris, Remix, React, and Node.js, enhancing client satisfaction and user engagement.",
      "Built cross-platform macOS applications with Flutter, reducing development time and maintenance efforts.",
      "Designed and optimized real-time data systems using MQTT protocols, improving application performance by 30%.",
      "Developed and optimized API logic using Python FastAPI to enhance performance and integrate AI models seamlessly.",
      "Collaborated with cross-functional teams to integrate APIs, third-party services, and cloud solutions.",
    ],
  },
  {
    company: "CRON24 TECHNOLOGIES",
    role: "Mobile App Developer",
    period: "Mar 2022 – Sept 2023",
    location: "Madurai",
    achievements: [
      "Designed and implemented efficient state management systems for Android & iOS applications, ensuring smooth functionality.",
      "Developed and maintained mobile apps using Dart, Flutter, and integrated APIs with JSON for dynamic data handling.",
      "Integrated key features like Google Maps API, Stripe payments, Firebase push notifications, Firebase Realtime Database, Google Analytics, and Google Ads",
      "Managed app performance, debugging, and deployment.",
      "Handled multilingual content updates to improve localization and user engagement.",
    ],
  },
];

export const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-12 md:py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center items-center gap-4">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
             Experience
          </h2>
          <a href={resumeUrl} download className="text-purple-600 hover:text-blue-800">
            <Download className="w-6 h-12 cursor-pointer font-bold" />
          </a>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-blue-800">
            <Eye className="w-6 h-12 cursor-pointer font-bold" />
          </a>
        </div>
        <br/>
     <br/>
        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="absolute hidden md:block left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />

          {experienceData.map((exp, index) => {
            const [cardRef, cardInView] = useInView({
              triggerOnce: true,
              threshold: 0.1,
            });

            return (
              <div ref={cardRef} key={index} className="relative mb-8 md:mb-12">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={cardInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`relative w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:ml-auto md:pl-8" : "md:pr-8"
                  }`}
                >
                  {/* Timeline dot - hidden on mobile */}
                  <div
                    className={`absolute top-0 hidden md:block ${
                      index % 2 === 0 ? "md:-left-3" : "md:-right-3"
                    } w-6 h-6 bg-white dark:bg-gray-900 rounded-full border-4 border-blue-600 dark:border-blue-400`}
                  />

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-900 rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-4">
                      <h3 className="text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400">
                        {exp.company}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                      <Briefcase className="w-3 h-3 md:w-4 md:h-4" />
                      {exp.role}
                    </h4>

                    <ul className="space-y-1.5 md:space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={cardInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400"
                        >
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
