import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import AuroraBackground from "./AuroraBackground";
import FloatingParticles from "./FloatingParticles";
import MagneticButton from "./MagneticButton";
import GridPattern from "./GridPattern";
import Threads from "./Threads";
import ScrollFloat from "./ScrollFloat";
import SplitText from "./SplitText";
import AntigravityBackground from "./AntigravityBackground";

interface HeroProps {
  name: string;
  titles: string[];
  about: string;
}

const Hero = ({ name, titles, about }: HeroProps) => {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  const firstLine = about.split(".")[0] + ".";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Threads background behind name area */}
      <div className="absolute inset-0 -z-20 opacity-30 dark:opacity-50">
        <Threads
          color={[0.55, 0.36, 0.96]}
          amplitude={1.2}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>

      {/* Layered backgrounds */}
      <AuroraBackground speed={0.8} />
      <FloatingParticles count={30} />
      <GridPattern />
      <AntigravityBackground />

      {/* Decorative orbs */}
      <div className="absolute top-20 right-[15%] w-[400px] h-[400px] rounded-full bg-primary/8 blur-3xl animate-blob" />
      <div className="absolute bottom-20 left-[10%] w-[350px] h-[350px] rounded-full bg-accent/10 blur-3xl animate-blob animation-delay-2000" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 -z-5 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollFloat className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl relative">
            {/* Greeting badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-muted-foreground font-body">
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 text-foreground">
              <SplitText text={name} />
            </h1>

            {/* Rotating title */}
            <div className="h-10 mb-8 overflow-hidden">
              <motion.p
                key={titleIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl sm:text-2xl font-heading text-primary font-medium"
              >
                {titles[titleIndex]}
              </motion.p>
            </div>

            {/* Coffee text cursor accent */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center justify-center lg:justify-start gap-2 text-sm sm:text-base font-body text-muted-foreground"
            >
              <span>☕︎</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-px h-4 sm:h-5 bg-primary/80"
              />
              <span>Coding, caffeinated.</span>
            </motion.div>

            {/* Short intro */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 text-base sm:text-lg leading-relaxed font-body"
            >
              {firstLine}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <MagneticButton strength={0.2}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium flex items-center gap-2 cursor-pointer shadow-[0_0_30px_hsl(var(--ring)/0.25)] hover:shadow-[0_0_50px_hsl(var(--ring)/0.4)] transition-shadow"
                >
                  View Projects <ExternalLink className="w-4 h-4" />
                </motion.button>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-3 glass rounded-full font-medium text-foreground flex items-center gap-2 cursor-pointer hover:border-primary/40 transition-colors"
                >
                  Contact Me
                </motion.button>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    window.open("/Harsha-Resume-New.pdf", "_blank")
                  }
                  className="px-8 py-3 glass rounded-full font-medium text-foreground flex items-center gap-2 cursor-pointer hover:border-primary/40 transition-colors"
                >
                  Resume
                </motion.button>
              </MagneticButton>
            </motion.div>
          </div>
        </ScrollFloat>
      </div>
    </section>
  );
};

export default Hero;
