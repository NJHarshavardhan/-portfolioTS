import { motion } from "framer-motion";

const SectionDivider = () => (
  <div className="relative py-1">
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="h-px max-w-xs mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent"
    />
  </div>
);

export default SectionDivider;
