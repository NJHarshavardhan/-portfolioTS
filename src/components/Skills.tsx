import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, Globe, Layout, Server, PenTool as Tool, Cloud, GitBranch } from 'lucide-react';

const skills = {
  languages: ['JavaScript','Dart', 'Python (Fast API)',  'HTML', 'CSS'],
  frameworks: ['Flutter', 'React', 'Remix', 'Express'],
  APIs: ['REST API', 'GraphQL', 'JSON', 'Google Maps API'],
  platforms: [
    'Shopify Polaris Components',
    'AWS S3',
    'AWS Lambda',
    'AWS API Gateway',
    'Firebase',
    'Git',
  ],
  databases: ['Supabase', 'MongoDB', 'MySQL', 'Firebase Database'],
  AI: ['OpenAI Chat Completion', 'Azure OpenAI', 'Hugging Face Models'],
  messaging: ['Kafka', 'MQTT'],
  
};

export const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Technical Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, skillList], index) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-6">
                {category === 'languages' && <Code2 className="w-6 h-6 text-blue-600" />}
                {category === 'frameworks' && <Layout className="w-6 h-6 text-purple-600" />}
                {category === 'APIs' && <Globe className="w-6 h-6 text-green-600" />}
                {category === 'platforms' && <Server className="w-6 h-6 text-yellow-600" />}
                {category === 'databases' && <Database className="w-6 h-6 text-red-600" />}
                {category === 'messaging' && <Tool className="w-6 h-6 text-indigo-600" />}
                {category === 'AI' && <Cloud className="w-6 h-6 text-teal-600" />}
                <h3 className="text-2xl font-bold capitalize">{category.replace('_', ' ')}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skillList.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ delay: idx * 0.1, type: "spring", stiffness: 300 }}
                    className="px-4 py-2 bg-purple-100 text-black rounded-full dark:bg-purple-400 dark:text-black"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
