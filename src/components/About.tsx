import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Smartphone, Monitor, Database, BrainCircuit } from 'lucide-react';

export const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    {
      icon: <Code className="w-8 h-8 text-blue-600 mx-auto mb-4" />,
      title: "Full Stack Web Development",
      description: "Building scalable and performant web applications using React, Remix, and Node.js.",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-purple-600 mx-auto mb-4" />,
      title: "Mobile App Development",
      description: "Developing cross-platform mobile apps for Android and iOS using Flutter.",
    },
    {
      icon: <Monitor className="w-8 h-8 text-green-600 mx-auto mb-4" />,
      title: "macOS App Development",
      description: "Creating macOS applications with a seamless native experience.",
    },
    {
      icon: <Database className="w-8 h-8 text-orange-600 mx-auto mb-4" />,
      title: "Backend & API Development",
      description: "Designing robust backend systems and REST/GraphQL APIs using Node.js, Python(Fast API) & Supabase.",
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-red-600 mx-auto mb-4" />,
      title: "LLM & OpenAI Logic",
      description: "Integrating AI-powered solutions, chat completion, and automation using OpenAI APIs.",
    },
  ];

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
          Software engineer with 2+ years of experience building full-stack solutions using Flutter, React, Node.js, and Shopify. Successfully developed cross-platform mobile apps for Android, iOS, and macOS, along with web applications using Remix. Proficient in creating responsive UIs, integrating AWS Lambda and Supabase cloud services, and solving complex technical challenges. Passionate about writing clean, efficient code and building scalable, high-performance applications.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg"
            >
              {skill.icon}
              <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
