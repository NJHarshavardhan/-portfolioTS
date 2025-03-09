import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Globe, Smartphone, ShoppingBag ,Store,Apple } from "lucide-react"; // Import icons

const projects = [
  {
    title: "STORE BLOG",
    type: "Full Stack",
    link_1: "https://apps.shopify.com/storeblog-boost-your-store-seo",
    icon_1: <i className="fab fa-shopify fa-2x text-green-600"></i>, 
    icon_1_text:"Shopify App Store",
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
    link_1: "https://play.google.com/store/apps/details?id=com.filmplace.app&pcampaignid=web_share",
    link_2: "https://apps.apple.com/in/app/filmplace-film-locations/id1597538864",
    icon_1: <i className="fab fa-android fa-2x text-green-600"></i>,
    icon_2: <i className="fab fa-apple fa-2x text-gray-600"></i>,
    icon_1_text:"Android",
    icon_2_text:"App Store",
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
    link_1: "https://play.google.com/store/apps/details?id=com.cron24.cabby&hl=en-IN",
    link_2: "https://play.google.com/store/apps/details?id=com.cron24.cabbydriver&hl=en-IN",
    icon_1:<i className="fab fa-android fa-2x text-green-600"></i>,
    icon_2: <i className="fab fa-android fa-2x text-green-600"></i>,
    icon_1_text:"Android",
    icon_2_text:"Android",
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

                    {/* Icons for Links */}
                    <div className="flex gap-4 mt-4">
                      {project.link_1 && (
                        <button
                          onClick={() => window.open(project.link_1, "_blank")}
                          className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700"
                        >
                          {project.icon_1}
                          <span> {project.icon_1_text}</span>
                        </button>
                      )}
                      {project.link_2 && (
                        <button
                          onClick={() => window.open(project.link_2, "_blank")}
                          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                        >
                          {project.icon_2}
                          <span> {project.icon_2_text}</span>
                        </button>
                      )}
                    </div>
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
