import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Smartphone, Apple, Store, Layers } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SpotlightCard from "./SpotlightCard";
import GridPattern from "./GridPattern";
import CodeBackground from "./CodeBackground";
import ScrollFloat from "./ScrollFloat";
import SplitText from "./SplitText";
import BounceCard from "./BounceCard";
import DecayCard from "./DecayCard";
import ScrollFloatText from "./ScrollFloatText";
import projectsBg from "@/assets/projects-bg.jpg";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Smartphone, Apple, Store,
};

interface Project {
  title: string;
  type: string;
  description: string[];
  technologies: string;
  link_1?: string;
  link_2?: string;
  icon_1?: string;
  icon_2?: string;
  icon_1_text?: string;
  icon_2_text?: string;
}

interface ProjectsProps {
  projects: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const types = ["All", ...Array.from(new Set(projects.map((p) => p.type)))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.type === filter);

  return (
    <AnimatedSection id="projects" className="py-16 sm:py-24 relative overflow-hidden">
      <GridPattern />
      <CodeBackground />
      <div className="absolute inset-0 -z-20">
        <img src={projectsBg} alt="" className="w-full h-full object-cover opacity-[0.04] dark:opacity-[0.1]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-primary/40" />
          <ScrollFloatText
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            containerClassName="my-0"
            textClassName="text-3xl sm:text-5xl font-heading font-bold text-foreground"
          >
            My Projects
          </ScrollFloatText>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-primary/40" />
        </motion.div>

        {/* Filters */}
        <ScrollFloat className="flex flex-wrap justify-center gap-3 mb-12" intensity={18}>
          {types.map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(type)}
              className={`px-5 py-2 rounded-full text-sm font-body cursor-pointer transition-all duration-300 ${
                filter === type
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.25)]"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {type}
            </motion.button>
          ))}
        </ScrollFloat>

        {/* Cards */}
        <ScrollFloat className="max-w-6xl mx-auto">
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <BounceCard key={project.title} className="h-full">
                  <DecayCard>
                    <SpotlightCard className="glass rounded-2xl p-6 cursor-pointer group h-full hover:border-primary/20 transition-colors">
                      <div onClick={() => setSelected(project)} className="h-full flex flex-col">
                    {/* Project type badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Layers className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-xs font-body text-primary font-medium uppercase tracking-wider">
                        {project.type}
                      </span>
                    </div>

                    <h3 className="font-heading font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body line-clamp-2 flex-grow">
                      {project.description[0]}
                    </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.technologies.split(",").slice(0, 3).map((t) => (
                            <span key={t.trim()} className="text-xs px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground font-body">
                              {t.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </SpotlightCard>
                  </DecayCard>
                </BounceCard>
              ))}
            </AnimatePresence>
          </motion.div>
        </ScrollFloat>

        {/* Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="glass-strong rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto relative border border-primary/10"
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center cursor-pointer hover:bg-accent transition-colors"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-body text-primary font-medium uppercase tracking-wider">
                    {selected.type}
                  </span>
                </div>

                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                  {selected.title}
                </h3>

                <ul className="space-y-2 mb-6">
                  {selected.description.map((d, i) => (
                    <li key={i} className="text-sm text-muted-foreground font-body flex gap-2">
                      <span className="text-primary mt-1 shrink-0">▸</span>
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="mb-6">
                  <h4 className="text-xs font-heading text-primary uppercase tracking-wider mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.technologies.split(",").map((t) => (
                      <span key={t.trim()} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-body">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {selected.link_1 && (
                    <a
                      href={selected.link_1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-body hover:opacity-90 transition-opacity shadow-[0_0_20px_hsl(var(--primary)/0.2)]"
                    >
                      {selected.icon_1 && iconMap[selected.icon_1] ? (() => {
                        const Icon = iconMap[selected.icon_1!];
                        return <Icon className="w-4 h-4" />;
                      })() : <ExternalLink className="w-4 h-4" />}
                      {selected.icon_1_text || "View"}
                    </a>
                  )}
                  {selected.link_2 && (
                    <a
                      href={selected.link_2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-body text-foreground hover:bg-accent transition-colors"
                    >
                      {selected.icon_2 && iconMap[selected.icon_2] ? (() => {
                        const Icon = iconMap[selected.icon_2!];
                        return <Icon className="w-4 h-4" />;
                      })() : <ExternalLink className="w-4 h-4" />}
                      {selected.icon_2_text || "View"}
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
};

export default Projects;
