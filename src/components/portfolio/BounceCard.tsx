import { ReactNode, forwardRef } from "react";
import { motion } from "framer-motion";

interface BounceCardProps {
  children: ReactNode;
  className?: string;
}

const BounceCard = forwardRef<HTMLDivElement, BounceCardProps>(
  ({ children, className = "" }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
        whileHover={{ y: -6, scale: 1.02 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);

BounceCard.displayName = "BounceCard";

export default BounceCard;

