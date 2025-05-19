import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Download, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import data from "../config/data.json";
import resumePdf from "../assets/Harsha-Resume.pdf";

export const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const titles = data.titles;

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 -z-10" />

      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center px-4"
      >
        <motion.h1
          className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto]"
          animate={{
            backgroundPosition: ["0%", "200%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {data.name}
        </motion.h1>

        <div className="h-8 mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={titleIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl text-gray-600 dark:text-gray-300 font-poppins font-semibold"
            >
              {titles[titleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          className="flex gap-6 justify-center relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href={data.contact.github}
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-300 relative"
            onMouseEnter={() => setHoveredIcon('github')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <Github className="w-6 h-6" />
            {hoveredIcon === 'github' && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                GitHub Profile
              </div>
            )}
          </motion.a>

          <motion.a
            href={data.contact.linkedin}
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-300 relative"
            onMouseEnter={() => setHoveredIcon('linkedin')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <Linkedin className="w-6 h-6" />
            {hoveredIcon === 'linkedin' && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                LinkedIn Profile
              </div>
            )}
          </motion.a>

          <motion.a
            href={`mailto:${data.contact.email}`}
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-300 relative"
            onMouseEnter={() => setHoveredIcon('email')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <Mail className="w-6 h-6" />
            {hoveredIcon === 'email' && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                Send Email
              </div>
            )}
          </motion.a>

          <motion.a
            href={`tel:${data.contact.phone}`}
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-300 relative"
            onMouseEnter={() => setHoveredIcon('phone')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <Phone className="w-5 h-5" />
            {hoveredIcon === 'phone' && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                Call Phone
              </div>
            )}
          </motion.a>

          <motion.a
            href={resumePdf}
            download="Harsha-Resume.pdf"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-300 relative"
            onMouseEnter={() => setHoveredIcon('download')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <Download className="w-6 h-6" />
            {hoveredIcon === 'download' && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                Download Resume
              </div>
            )}
          </motion.a>

          <motion.a
            href={resumePdf}
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-300 relative"
            onMouseEnter={() => setHoveredIcon('view')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <Eye className="w-6 h-6" />
            {hoveredIcon === 'view' && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                View Resume
              </div>
            )}
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{
            y: [0, 8, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full p-1"
        >
          <motion.div
            animate={{
              y: [0, 16, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
          />
        </motion.div>
        <motion.span
          className="mt-2 text-sm text-gray-400 dark:text-gray-500 font-medium tracking-wider uppercase"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Scroll
        </motion.span>
      </motion.div>
    </motion.section>
  );
};
