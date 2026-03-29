import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import SpotlightCard from "./SpotlightCard";
import { GraduationCap, MapPin, Award } from "lucide-react";
import ScrollFloat from "./ScrollFloat";
import SplitText from "./SplitText";

interface EducationItem {
  school: string;
  degree: string;
  period: string;
  location: string;
  grade: string;
}

interface EducationProps {
  education: EducationItem[];
}

const Education = ({ education }: EducationProps) => {
  return (
    <AnimatedSection id="education" className="py-16 sm:py-24 relative">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-primary/40" />
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-foreground">
            <span className="text-primary">
              <SplitText text="Education" />
            </span>
          </h2>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-primary/40" />
        </motion.div>

        <ScrollFloat className="max-w-2xl mx-auto space-y-6" intensity={20}>
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <SpotlightCard className="glass rounded-2xl p-6 group hover:border-primary/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body mt-1">
                      {edu.school}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground font-body">
                      <span>{edu.period}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {edu.location}
                      </span>
                      <span className="flex items-center gap-1 text-primary font-medium">
                        <Award className="w-3 h-3" /> {edu.grade}
                      </span>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </ScrollFloat>
      </div>
    </AnimatedSection>
  );
};

export default Education;
