import { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollFloatProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

const ScrollFloat = ({ children, className = "", intensity = 40 }: ScrollFloatProps) => {
  const { scrollYProgress } = useScroll();

  const translateY = useTransform(scrollYProgress, [0, 1], [intensity, -intensity]);
  const translateX = useTransform(scrollYProgress, [0, 1], [-intensity / 4, intensity / 4]);

  return (
    <motion.div
      style={{ y: translateY, x: translateX }}
      className={className}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollFloat;

