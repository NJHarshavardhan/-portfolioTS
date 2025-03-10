import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Store, Smartphone, Apple } from "lucide-react";

const projects = [
  {
    title: "STORE BLOG",
    type: "Full Stack",
    link_1: "https://apps.shopify.com/storeblog-boost-your-store-seo",
    icon_1: <Store className="w-6 h-6 text-green-600" />,
    icon_1_text: "Shopify App Store",
    description: [
      "AI-powered Shopify app for SEO-optimized blog articles",
      "OpenAI GPT integration with custom prompt engineering",
      "AWS Cron for automated publishing with multi-language support",
      "Hugging Face models for AI-generated images",
    ],
  },
  {
    title: "AI Image Generation API",
    type: "Backend",
    description: [
      "Developed a FastAPI backend for AI-powered image generation",
      "Handled prompt processing and image creation using Hugging Face models",
      "Optimized API performance and response time for high scalability",
    ],
  },
  {
    title: "AI-Powered Notification App",
    type: "Full Stack",
    description: [
      "Shopify-based app that generates AI-driven notifications to boost store sales",
      "Uses OpenAI to analyze store data and suggest useful notifications",
      "Kafka-based pub-sub architecture for real-time event processing",
      "Sends notifications to merchants based on triggered webhooks",
    ],
  },
  {
    title: "FILMPLACE",
    type: "Mobile App",
    technologies: "Flutter, Firebase, Stripe, Google Maps",
    link_1:
      "https://play.google.com/store/apps/details?id=com.filmplace.app&pcampaignid=web_share",
    link_2:
      "https://apps.apple.com/in/app/filmplace-film-locations/id1597538864",
    icon_1: <Smartphone className="w-6 h-6 text-green-600" />,
    icon_2: <Apple className="w-6 h-6 text-gray-600" />,
    icon_1_text: "Android",
    icon_2_text: "App Store",
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
    link_1:
      "https://play.google.com/store/apps/details?id=com.cron24.cabby&hl=en-IN",
    link_2:
      "https://play.google.com/store/apps/details?id=com.cron24.cabbydriver&hl=en-IN",
    icon_1: <Smartphone className="w-6 h-6 text-green-600" />,
    icon_2: <Smartphone className="w-6 h-6 text-green-600" />,
    icon_1_text: "Android",
    icon_2_text: "Android",
    description: [
      "Full-featured ride-hailing platform",
      "Real-time GPS tracking with 30% better ETA",
      "Background services with 10% crash reduction",
      "Multi-language support for global reach",
    ],
  },
];

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative h-[300vh] py-20"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
      >
        Featured Projects
      </motion.h2>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-5xl mx-auto h-[600px]">
          {projects.map((project, index) => {
            const progress = useTransform(
              scrollYProgress,
              [index / projects.length, (index + 1) / projects.length],
              [0, 1]
            );

            const translateY = useTransform(progress, [0, 1], [0, -100]);
            const scale = useTransform(progress, [0, 1], [1, 0.8]);
            const opacity = useTransform(progress, [0, 0.5, 1], [1, 1, 0]);

            return (
              <motion.div
                key={index}
                style={{
                  position: "absolute",
                  width: "100%",
                  y: translateY,
                  scale,
                  opacity,
                  zIndex: projects.length - index,
                }}
                className="p-4"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {project.title}
                    </h3>
                    <span className="px-4 py-2 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full">
                      {project.type}
                    </span>
                  </div>

                  {project.technologies && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                      <span className="font-semibold">Tech:</span>{" "}
                      {project.technologies}
                    </p>
                  )}

                  <ul className="space-y-3 mb-8">
                    {project.description.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-6">
                    {project.link_1 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(project.link_1, "_blank")}
                        className="flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        {project.icon_1}
                        <span>{project.icon_1_text}</span>
                      </motion.button>
                    )}
                    {project.link_2 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(project.link_2, "_blank")}
                        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {project.icon_2}
                        <span>{project.icon_2_text}</span>
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
