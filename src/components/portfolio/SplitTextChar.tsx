import { motion } from "framer-motion";

interface SplitTextCharProps {
  text: string;
  className?: string;
  delay?: number;
}

const SplitTextChar = ({ text, className = "", delay = 0 }: SplitTextCharProps) => {
  const characters = text.split("");

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { 
          transition: { 
            staggerChildren: 0.05, 
            delayChildren: delay 
          } 
        },
      }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { y: 40, opacity: 0, scale: 0.5 },
            visible: {
              y: 0,
              opacity: 1,
              scale: 1,
              transition: { 
                type: "spring",
                damping: 12,
                stiffness: 200,
                duration: 0.4 
              },
            },
          }}
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default SplitTextChar;
