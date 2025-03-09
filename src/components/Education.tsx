import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const education = [
  {
    school: "K.L.N. COLLEGE OF ENGINEERING",
    degree: "Master of Computer Applications",
    period: "April 2022",
    location: "Madurai",
    grade: "CGPA: 9.1 / 10"
  },
  {
    school: "SOURASHTRA COLLEGE",
    degree: "B.Sc. in Computer Science",
    period: "April 2020",
    location: "Madurai",
    grade: "CGPA: 7.1 / 10"
  }
];

export const Education = () => {
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
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-20 px-4">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Education
        </h2>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {edu.school}
                </h3>
              </div>

              <div className="ml-9">
                <p className="text-xl font-semibold mb-2">{edu.degree}</p>
                
                <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {edu.grade}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};