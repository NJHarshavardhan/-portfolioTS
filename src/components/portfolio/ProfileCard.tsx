import { motion } from "framer-motion";
import { MapPin, Briefcase, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import profilePlaceholder from "@/assets/profile-placeholder.jpg";

interface ProfileCardProps {
  name: string;
  titles: string[];
  location: string;
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
}

const ProfileCard = ({ name, titles, location, contact }: ProfileCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="relative group"
    >
      {/* Glow behind card */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

      <div className="relative rounded-3xl overflow-hidden border border-border/60 bg-card/60 backdrop-blur-2xl">
        {/* Banner */}
        <div className="h-24 sm:h-28 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.3),transparent_60%)]" />
          {/* Animated dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary-foreground/30"
              style={{ left: `${15 + i * 15}%`, top: `${30 + (i % 3) * 20}%` }}
              animate={{ y: [0, -8, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 + i * 0.3, delay: i * 0.2 }}
            />
          ))}
        </div>

        {/* Avatar */}
        <div className="px-6 -mt-10 relative z-10">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-card shadow-xl">
              <img
                src={profilePlaceholder}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-card flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="px-6 pt-3 pb-5">
          <h3 className="font-heading font-bold text-lg text-foreground">{name}</h3>
          <p className="text-sm text-primary font-body font-medium">{titles[0]}</p>

          <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground font-body">
            <MapPin className="w-3 h-3" />
            {location}
          </div>

          {/* Status */}
          <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/60 border border-border/40">
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-body text-foreground/80">Open to opportunities</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2 mt-4">
            {[
              { icon: Github, href: contact.github },
              { icon: Linkedin, href: contact.linkedin },
              { icon: Mail, href: `mailto:${contact.email}` },
            ].map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-xl bg-secondary/80 border border-border/40 flex items-center justify-center hover:bg-primary/15 hover:border-primary/30 transition-colors"
              >
                <link.icon className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
              </motion.a>
            ))}
            <motion.a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-auto text-xs px-3 py-1.5 rounded-xl bg-primary/15 text-primary font-body font-medium flex items-center gap-1.5 hover:bg-primary/25 transition-colors border border-primary/20"
            >
              <ExternalLink className="w-3 h-3" /> Connect
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
