import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Code2,
  Database,
  Globe,
  Layout,
  Server,
  PenTool as Tool,
  Cloud,
} from "lucide-react";
import data from "../config/data.json";

const skills = data.technical_skills;

const icons: Record<string, JSX.Element> = {
  languages: <Code2 className="w-6 h-6 text-pink-500" />,
  frameworks: <Layout className="w-6 h-6 text-blue-500" />,
  APIs: <Globe className="w-6 h-6 text-green-500" />,
  platforms: <Server className="w-6 h-6 text-yellow-500" />,
  databases: <Database className="w-6 h-6 text-red-500" />,
  messaging: <Tool className="w-6 h-6 text-indigo-500" />,
  AI: <Cloud className="w-6 h-6 text-teal-500" />,
};

export const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.25 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: "spring", bounce: 0.3 },
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.05, type: "spring", stiffness: 300 },
    }),
  };

  return (
    <section
      id="skills"
      className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-5xl font-extrabold text-center mb-14 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
          Technical Skills
        </h2>

        <div className="grid gap-y-4 gap-x-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([category, skillList], idx) => (
            <motion.div
              key={category}
              variants={cardVariants}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-transform hover:scale-[1.025]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
                  {icons[category] || <Code2 className="w-5 h-5" />}
                </div>
                <h3 className="text-lg font-semibold capitalize text-gray-800 dark:text-white">
                  {category.replace("_", " ")}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillList.map((skill, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={chipVariants}
                    whileHover={{ scale: 1.1 }}
                    className="transition-all duration-200 group"
                  >
                    <span
                      className={`
                        px-4 py-2 rounded-full text-sm font-medium inline-block
                        bg-purple-100 text-gray-800 
                        dark:bg-gradient-to-r dark:from-purple-500 dark:to-blue-500 dark:text-white
                        group-hover:shadow-md group-hover:shadow-purple-400/50
                        group-hover:dark:shadow-blue-400/30
                      `}
                    >
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
