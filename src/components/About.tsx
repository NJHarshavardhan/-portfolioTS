import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Code,
  Smartphone,
  Monitor,
  Database,
  BrainCircuit,
} from "lucide-react";
import data from "../config/data.json";

export const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const iconMap: Record<string, JSX.Element> = {
    "Full Stack Web Development": (
      <Code className="w-8 h-8 text-blue-600 mx-auto mb-4" />
    ),
    "Mobile App Development": (
      <Smartphone className="w-8 h-8 text-purple-600 mx-auto mb-4" />
    ),
    "macOS App Development": (
      <Monitor className="w-8 h-8 text-green-600 mx-auto mb-4" />
    ),
    "Backend & API Development": (
      <Database className="w-8 h-8 text-orange-600 mx-auto mb-4" />
    ),
    "LLM & OpenAI Logic": (
      <BrainCircuit className="w-8 h-8 text-red-600 mx-auto mb-4" />
    ),
  };

  const rolesWithIcons = data.roles.map((role) => ({
    ...role,
    icon: iconMap[role.title] || null,
  }));

  return (
    <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          About Me
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-700 dark:text-gray-300 mb-12 leading-relaxed"
        >
          {data.about}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rolesWithIcons.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg"
            >
              {skill.icon}
              <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
