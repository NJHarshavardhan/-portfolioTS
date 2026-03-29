import { motion } from "framer-motion";

const bubbles = Array.from({ length: 12 }, (_, i) => i);

const AntigravityBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {bubbles.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/12 dark:bg-primary/18 blur-2xl"
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
            duration: 14 + Math.random() * 10,
            delay: Math.random() * 6,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: 140 + Math.random() * 160,
            height: 140 + Math.random() * 160,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default AntigravityBackground;

