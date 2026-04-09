import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import MagneticButton from "./MagneticButton";
import ScrollFloat from "./ScrollFloat";
import SplitText from "./SplitText";
import SplitTextChar from "./SplitTextChar";
import Threads from "./Threads";
import { useEffect, useState } from "react";

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
      {/* Wave background restored as requested */}
      <div className="absolute inset-0 -z-20 opacity-40 dark:opacity-60">
        <Threads
          color={[0.55, 0.36, 0.96]}
          amplitude={1.2}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>

      {/* Minimal clean background overlay */}
      <div className="absolute inset-0 -z-5 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.03),transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollFloat className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl relative">
            {/* Greeting badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 px-4 py-2 glass rounded-full mb-8 border border-white/10 dark:border-white/5"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium tracking-wide text-foreground/80 font-body uppercase">
                Available for new projects
              </span>
            </motion.div>

            <h1 className="text-[clamp(1.75rem,8vw,5rem)] mb-10 text-foreground font-black tracking-tighter drop-shadow-md whitespace-nowrap overflow-visible leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <SplitTextChar text={name} delay={0.2} />
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
               transition={{ delay: 1.2, duration: 0.8 }}
               className="flex flex-wrap justify-center lg:justify-start gap-5"
             >
               <MagneticButton strength={0.15}>
                 <motion.button
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() =>
                     document
                       .getElementById("projects")
                       ?.scrollIntoView({ behavior: "smooth" })
                   }
                   className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold flex items-center gap-2.5 cursor-pointer primary-glow shadow-xl transition-all"
                 >
                   Explore Work <ExternalLink className="w-4 h-4" />
                 </motion.button>
               </MagneticButton>
               <MagneticButton strength={0.15}>
                 <motion.button
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() =>
                     document
                       .getElementById("contact")
                       ?.scrollIntoView({ behavior: "smooth" })
                   }
                   className="px-8 py-4 glass rounded-full font-semibold text-foreground flex items-center gap-2.5 cursor-pointer hover:bg-white/5 transition-all border border-white/10"
                 >
                   Get in Touch
                 </motion.button>
               </MagneticButton>
               <MagneticButton strength={0.15}>
                 <motion.button
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() =>
                     window.open("/Harsha-Resume-New.pdf", "_blank")
                   }
                   className="px-8 py-4 glass rounded-full font-semibold text-foreground flex items-center gap-2.5 cursor-pointer hover:bg-white/5 transition-all border border-white/10"
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
