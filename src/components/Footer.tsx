import { motion } from 'framer-motion';
import { GithubIcon, Linkedin, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-6 mb-6">
            <motion.a
              href="https://github.com/NJHarshavardhan"
               target="_blank"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-300"
            >
              <GithubIcon className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/harshavardhannj/"
               target="_blank"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="mailto:harshavardhannj@gmail.com"
               target="_blank"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-300"
            >
              <Mail className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="tel:+919976871783"
              whileHover={{ scale: 1.1 }}
               target="_blank"
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-300"
            >
              <Phone className="w-5 h-5" />
            </motion.a>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Harsha Vardhan NJ  All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};