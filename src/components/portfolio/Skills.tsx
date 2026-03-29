import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import SpotlightCard from "./SpotlightCard";
import CodeBackground from "./CodeBackground";
import ScrollFloat from "./ScrollFloat";
import SplitText from "./SplitText";
import BounceCard from "./BounceCard";
import skillsBg from "@/assets/skills-bg.jpg";

interface SkillsProps {
  skills: Record<string, string[]>;
}

const categoryLabels: Record<string, string> = {
  languages: "Languages",
  frameworks: "Frameworks",
  apis: "APIs & Protocols",
  platforms: "Platforms & Cloud",
  databases: "Databases",
  ai_integration: "AI & ML",
  messaging: "Messaging",
};

const categoryEmojis: Record<string, string> = {
  languages: "💻",
  frameworks: "⚡",
  apis: "🔗",
  platforms: "☁️",
  databases: "🗄️",
  ai_integration: "🤖",
  messaging: "📨",
};

const Skills = ({ skills }: SkillsProps) => {
  return (
    <AnimatedSection
      id="skills"
      className="py-16 sm:py-24 relative overflow-hidden"
    >
      <CodeBackground />
      <div className="absolute inset-0 -z-20">
        <img
          src={skillsBg}
          alt=""
          className="w-full h-full object-cover opacity-[0.04] dark:opacity-[0.08]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-primary/40" />
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-foreground">
            <SplitText text="Technical " />
            <span className="text-primary">Skills</span>
          </h2>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-primary/40" />
        </motion.div>

        <ScrollFloat
          className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          intensity={25}
        >
          {Object.entries(skills).map(([category, items], catIdx) => (
            <BounceCard key={category}>
              <SpotlightCard className="glass rounded-2xl p-6 h-full group hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">
                    {categoryEmojis[category] || "📦"}
                  </span>
                  <h3 className="text-sm font-heading font-semibold text-primary uppercase tracking-wider">
                    {categoryLabels[category] || category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: catIdx * 0.05 + i * 0.03,
                        duration: 0.4,
                      }}
                      whileHover={{
                        scale: 1.08,
                        y: -2,
                      }}
                      className="px-3 py-1.5 rounded-lg bg-secondary/80 text-sm font-body text-foreground cursor-default hover:bg-primary/15 hover:text-primary transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </SpotlightCard>
            </BounceCard>
          ))}
        </ScrollFloat>
      </div>
    </AnimatedSection>
  );
};

export default Skills;
