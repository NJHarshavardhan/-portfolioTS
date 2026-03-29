import { useMemo } from "react";
import { motion } from "framer-motion";

const BallpitBackground = () => {
  const balls = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        size: 24 + Math.random() * 32,
        x: Math.random() * 100,
        y: 60 + Math.random() * 40,
        delay: Math.random() * 3,
        duration: 6 + Math.random() * 5,
        hue: 250 + Math.random() * 40,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden bg-transparent">
      {balls.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.x}%`,
            bottom: `${b.y}%`,
            background: `radial-gradient(circle at 30% 30%, hsl(${b.hue} 100% 80%), hsl(${b.hue} 90% 55%))`,
            boxShadow: `0 18px 45px hsla(${b.hue} 90% 45% / 0.45)`,
          }}
          initial={{ y: 0, x: 0, scale: 0.9 }}
          animate={{
            y: [0, -18 - Math.random() * 16, 0],
            x: [0, (Math.random() - 0.5) * 10, 0],
            scale: [0.9, 1.05, 0.9],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default BallpitBackground;

