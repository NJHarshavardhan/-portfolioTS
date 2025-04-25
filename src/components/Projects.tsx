import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import data from "../config/data.json";
import {
  Store,
  Smartphone,
  Apple,
  ExternalLink,
  Github,
  Code,
} from "lucide-react";

const projects = data.projects;

const iconMap = {
  Store: <Store className="w-5 h-5" />,
  Smartphone: <Smartphone className="w-5 h-5" />,
  Apple: <Apple className="w-5 h-5" />,
  Github: <Github className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
  ExternalLink: <ExternalLink className="w-5 h-5" />,
};

// Define a type for the valid icon keys
type IconKey = keyof typeof iconMap;

export const Projects = () => {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative h-[300vh] py-16 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/20"></div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-40 left-10 w-64 h-64 bg-purple-300/10 dark:bg-purple-700/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-300/10 dark:bg-blue-700/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Featured Projects
          </motion.h2>
        </motion.div>
      </div>

      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-6xl mx-auto h-[700px]">
          {projects.map((project, index) => {
            const progress = useTransform(
              scrollYProgress,
              [index / projects.length, (index + 0.6) / projects.length],
              [0, 1]
            );

            const translateY = useTransform(progress, [0, 1], [0, -100]);
            const translateX = useTransform(
              progress,
              [0, 1],
              [0, index % 2 === 0 ? -20 : 20]
            );
            const scale = useTransform(progress, [0, 1], [1, 0.85]);
            const opacity = useTransform(progress, [0, 0.6, 1], [1, 0.8, 0]);
            const rotate = useTransform(
              progress,
              [0, 1],
              [0, index % 2 === 0 ? -3 : 3]
            );

            return (
              <motion.div
                key={index}
                style={{
                  position: "absolute",
                  width: "100%",
                  y: translateY,
                  x: translateX,
                  scale,
                  opacity,
                  rotateZ: rotate,
                  zIndex: projects.length - index,
                }}
                className="p-4"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700"
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                    y: -5,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Card Content */}
                  <div className="p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {project.title.charAt(0)}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                          {project.title}
                        </h3>
                      </div>
                      <span className="px-4 py-1.5 text-sm font-medium bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full self-start sm:self-auto">
                        {project.type}
                      </span>
                    </div>

                    {project.technologies && (
                      <div className="mb-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
                          <span className="font-semibold">Technologies</span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.split(", ").map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-4 mb-8">
                      {project.description.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.1 * i,
                            duration: 0.5,
                            ease: "easeOut",
                          }}
                          className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                        >
                          <span className="text-blue-500 dark:text-blue-400 mt-1 text-lg">
                            •
                          </span>
                          <span className="text-sm">{item}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {project.link_1 && (
                        <motion.a
                          href={project.link_1}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
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
                          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {iconMap[project.icon_2 as IconKey] ||
                            iconMap.ExternalLink}
                          <span>{project.icon_2_text}</span>
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Card Footer with pattern */}
                  <div className="h-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
