import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Code,
  Smartphone,
  Monitor,
  Database,
  BrainCircuit,
  Bot,
  Trophy,
  Target,
  Users,
  Lightbulb,
  Heart,
  Coffee,
} from "lucide-react";
import data from "../config/data.json";
import HarshaPic from "../assets/Harsha-Pic-2.jpeg";
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
    "AI Agents Development": (
      <Bot className="w-8 h-8 text-teal-600 mx-auto mb-4" />
    ),
  };

  const rolesWithIcons = data.roles.map((role) => ({
    ...role,
    icon: iconMap[role.title] || null,
  }));

  // Stats data
  const stats = data.stats;

  // Create a mapping for stats icons
  const statsIconMap: Record<string, JSX.Element> = {
    Trophy: <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-3" />,
    Target: <Target className="w-8 h-8 text-green-500 mx-auto mb-3" />,
    Users: <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />,
    Coffee: <Coffee className="w-8 h-8 text-amber-600 mx-auto mb-3" />,
  };
  return (
    <section
      id="about"
      className="py-20 px-4 bg-gradient-to-b from-gray-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-slate-900"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6"
          >
            <Heart className="w-4 h-4" />
            About Me
          </motion.div>

          <h3 className="text-4xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Turning ideas into intelligent products
          </h3>

          <div className="max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
            >
              {data.about}
            </motion.p>

            {/* Professional image placeholder */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="relative mx-auto mb-12 w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700"
            >
              <img
                src={HarshaPic}
                alt="Harsha - Professional Developer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
            >
              {statsIconMap[stat.icon]}
              <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {rolesWithIcons.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300"
            >
              <div className="relative">
                {skill.icon}

                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId={`bg-${index}`}
                />

                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {skill.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {skill.description}
                </p>

                {/* Decorative element */}
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ scale: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Personal Touch */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center"
        >
          <Lightbulb className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">
            Let's Build Something Amazing Together!
          </h3>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Need smarter, smoother, faster? I design and ship AI-first
            experiences that boost conversion, cut friction, and scale with
            confidence pairing product strategy, ML know how, and UX clarity to
            deliver results that stick.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};
