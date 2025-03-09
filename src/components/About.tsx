import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Cpu, Globe, Rocket } from 'lucide-react';

export const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
        Software engineer with 2+ years of
experience building full-stack
solutions using Flutter, React,
Node.js, and Shopify. Successfully
developed cross-platform mobile
apps for Android, iOS, and macOS,
along with web applications using
Remix. Proficient in creating
responsive UIs, integrating AWS
Lambda and Supabase cloud
services, and solving complex
technical challenges. Passionate
about writing clean, efficient code
and building scalable,
high-performance applications.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg"
          >
            <Code className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Full Stack Development</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Expertise in both frontend and backend technologies, creating seamless user experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg"
          >
            <Globe className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Cross-Platform Development</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Building applications that work seamlessly across multiple platforms and devices.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};