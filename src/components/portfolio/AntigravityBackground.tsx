import { motion } from "framer-motion";

const bubbles = Array.from({ length: 6 }, (_, i) => i);

const AntigravityBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {bubbles.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/10 dark:bg-primary/15 blur-xl"
          initial={{
            x: `${Math.random() * 100}%`,
            y: "110%",
            scale: 0.6 + Math.random() * 0.8,
            opacity: 0,
          }}
          animate={{
            y: "-20%",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 16 + Math.random() * 8,
            delay: Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: 100 + Math.random() * 120,
            height: 100 + Math.random() * 120,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default AntigravityBackground;

