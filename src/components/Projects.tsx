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
  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950"
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

        {/* Horizontally scrollable, overlapping cards */}
        <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200 dark:scrollbar-thumb-blue-700 dark:scrollbar-track-gray-800 px-2 py-4 gap-0">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              // Optimize with Framer Motion whileHover, no React hover state
              whileHover={{
                scale: 1.05,
                // Only animate transform, no box-shadow
              }}
              className={`relative flex-shrink-0 flex bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700
                mr-[-110px] last:mr-0 min-w-[440px] max-w-[440px]
                shadow-md
                hover:shadow-xl
                transition-shadow duration-300
                will-change-transform`}
              style={{ zIndex: 1 + idx }} // base zIndex to stack cards
              whileTap={{ scale: 0.97 }}
            >
              {/* Vertical project title area */}
              <div className="flex flex-col justify-center bg-gradient-to-b from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-purple-700 px-3 py-12 rounded-l-3xl min-w-[52px]">
                <span
                  className="text-sm font-bold text-white tracking-widest"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {project.title}
                </span>
              </div>

              {/* Card content */}
              <div className="flex flex-col flex-1 p-8">
                <span className="mb-1 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  {project.type}
                </span>
                <div className="mb-5 space-y-3 text-gray-700 dark:text-gray-200 text-base leading-relaxed">
                  {project.description.map((desc, i) => (
                    <div className="flex items-start gap-2" key={i}>
                      <span className="mt-1 text-blue-500 text-lg select-none leading-none">•</span>
                      <span>{desc}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                {project.technologies && (
                  <div className="mb-8">
                    <span className="block mb-2 font-medium text-sm text-gray-600 dark:text-gray-300">
                      Technologies
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.split(", ").map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium select-none transition"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-4 pt-1 flex-wrap">
                  {project.link_1 && (
                    <motion.a
                      href={project.link_1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg px-4 py-2 text-sm font-semibold shadow-lg transition-transform"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.97 }}
                      title={project.icon_1_text}
                    >
                      {iconMap[project.icon_1 as IconKey] || iconMap.ExternalLink}
                      <span>{project.icon_1_text}</span>
                    </motion.a>
                  )}
                  {project.link_2 && (
                    <motion.a
                      href={project.link_2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-transform"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.97 }}
                      title={project.icon_2_text}
                    >
                      {iconMap[project.icon_2 as IconKey] || iconMap.ExternalLink}
                      <span>{project.icon_2_text}</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
