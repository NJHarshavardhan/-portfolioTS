import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import CodeBackground from "./CodeBackground";
import CardSwap, { Card } from "./CardSwap";
import ScrollFloat from "./ScrollFloat";
import SplitText from "./SplitText";
import {
  Briefcase,
  MapPin,
  Calendar,
  Building2,
  ChevronRight,
  Zap,
} from "lucide-react";
import experienceBg from "@/assets/experience-bg.jpg";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  current_working?: boolean;
  achievements: string[];
}

interface ExperienceProps {
  experience: ExperienceItem[];
}

const ExperienceCard = ({
  exp,
  index,
}: {
  exp: ExperienceItem;
  index: number;
}) => (
  <div className="p-6 h-full flex flex-col min-h-0">
    {/* Header */}
    <div className="flex items-start gap-4 mb-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
          exp.current_working
            ? "bg-gradient-to-br from-primary/30 to-accent/20 shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
            : "bg-primary/10"
        }`}
      >
        <Building2 className="w-6 h-6 text-primary" />
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h3 className="font-heading font-bold text-lg text-foreground">
            {exp.company}
          </h3>
          {exp.current_working && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-body font-semibold uppercase tracking-wider flex items-center gap-1 border border-primary/20">
              <Zap className="w-2.5 h-2.5" /> Current
            </span>
          )}
        </div>
        <p className="text-sm text-foreground/80 font-body font-medium">
          {exp.role}
        </p>
      </div>
    </div>

    {/* Meta pills */}
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-secondary/80 text-foreground/70 font-body border border-border/40">
        <Calendar className="w-3 h-3 text-primary" /> {exp.period}
      </span>
      <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-secondary/80 text-foreground/70 font-body border border-border/40">
        <MapPin className="w-3 h-3 text-primary" /> {exp.location}
      </span>
    </div>

    {/* Divider */}
    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />

    {/* Achievements */}
    <div className="space-y-2 flex-grow min-h-0 overflow-y-auto pr-1">
      {exp.achievements.map((a, j) => (
        <div key={j} className="flex items-start gap-2">
          <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <ChevronRight className="w-3 h-3 text-primary" />
          </div>
          <span className="text-xs text-foreground/70 font-body leading-relaxed">
            {a}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const Experience = ({ experience }: ExperienceProps) => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <AnimatedSection
      id="experience"
      className="py-16 sm:py-24 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-20">
        <img
          src={experienceBg}
          alt=""
          className="w-full h-full object-cover opacity-[0.06] dark:opacity-[0.12]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>
      <CodeBackground />

      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24 sm:mb-28 md:mb-32"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-4 text-sm text-muted-foreground font-body"
          >
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            Career Journey
          </motion.span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-foreground">
            <SplitText text="Work " />
            <span className="text-primary">Experience</span>
          </h2>
        </motion.div>

        {/* Desktop: CardSwap + Detail panel */}
        <ScrollFloat
          className="hidden md:flex items-start justify-center gap-16 max-w-5xl mx-auto"
          intensity={22}
        >
          {/* CardSwap on left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-[420px] h-[380px] shrink-0"
          >
            <CardSwap
              width={380}
              height={340}
              cardDistance={50}
              verticalDistance={60}
              delay={6000}
              pauseOnHover={true}
              skewAmount={4}
              easing="elastic"
              onCardClick={(idx) => setActiveIdx(idx)}
              onActiveChange={(idx) => setActiveIdx(idx)}
            >
              {experience.map((exp, i) => (
                <Card key={exp.company} customClass="cursor-pointer">
                  <ExperienceCard exp={exp} index={i} />
                </Card>
              ))}
            </CardSwap>
          </motion.div>

          {/* Right: Details of currently active */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 max-w-md"
          >
            <div className="glass rounded-2xl p-6 border border-border/50 h-[380px] overflow-hidden">
              {experience[activeIdx] && (
                <ExperienceCard exp={experience[activeIdx]} index={activeIdx} />
              )}
            </div>
          </motion.div>
        </ScrollFloat>

        {/* Mobile: CardSwap only */}
        <ScrollFloat
          className="md:hidden flex justify-center mt-12"
          intensity={18}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-sm h-[360px]"
          >
            <CardSwap
              width="100%"
              height={340}
              cardDistance={50}
              verticalDistance={60}
              delay={6000}
              pauseOnHover={true}
              skewAmount={4}
              easing="elastic"
              onCardClick={(idx) => setActiveIdx(idx)}
              onActiveChange={(idx) => setActiveIdx(idx)}
            >
              {experience.map((exp, i) => (
                <Card key={exp.company} customClass="cursor-pointer">
                  <ExperienceCard exp={exp} index={i} />
                </Card>
              ))}
            </CardSwap>
          </motion.div>
        </ScrollFloat>
      </div>
    </AnimatedSection>
  );
};

export default Experience;
