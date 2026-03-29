import { ReactNode } from "react";
import { motion } from "framer-motion";

interface DecayCardProps {
  children: ReactNode;
  className?: string;
}

const DecayCard = ({ children, className = "" }: DecayCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      whileHover={{ scale: 0.99, rotateX: -2, rotateY: 2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default DecayCard;

