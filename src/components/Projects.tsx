import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Store } from "lucide-react";

const projects = [
  {
    title: "STORE BLOG",
    type: "Full Stack",
    link: "Shopify App Store",
    description: [
      "AI-powered Shopify app for SEO-optimized blog articles",
      "OpenAI GPT integration with custom prompt engineering",
      "AWS Cron for automated publishing with multi-language support",
      "Hugging Face models for AI-generated images",
    ],
  },
  {
    title: "FILMPLACE",
    type: "Mobile App",
    technologies: "Flutter, Firebase, Stripe, Google Maps",
    description: [
      "Location booking platform for filmmakers",
      "Stripe payments with 15% error reduction",
      "Firebase integration with 30% engagement increase",
      "Multi-platform social login implementation",
    ],
  },
  {
    title: "CABBY",
    type: "Mobile App",
    technologies: "Flutter, Firebase, GeoLocator",
    description: [
      "Full-featured ride-hailing platform",
      "Real-time GPS tracking with 30% better ETA",
      "Background services with 10% crash reduction",
      "Multi-language support for global reach",
    ],
  },
];

export const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="py-20 px-4" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="max-w-6xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const [cardRef, cardInView] = useInView({
              triggerOnce: true,
              threshold: 0.1,
            });

            return (
              <motion.div
                ref={cardRef}
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={cardInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className="h-full relative overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="absolute -inset-0.2 bg-gradient-to-r from-blue-200 to-purple-100 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 blur" />
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl p-4 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {project.title}
                      </h3>
                      <span className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full">
                        {project.type}
                      </span>
                    </div>

                    {project.technologies && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                        <span className="font-semibold">Tech:</span>{" "}
                        {project.technologies}
                      </p>
                    )}

                    <ul className="space-y-1">
                      {project.description.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={cardInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400"
                        >
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
