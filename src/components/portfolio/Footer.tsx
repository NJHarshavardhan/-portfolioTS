import { motion } from "framer-motion";
import { ArrowUp, Linkedin, Github, Mail, Heart } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface FooterProps {
  name: string;
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
}

const Footer = ({ name, contact }: FooterProps) => {
  const socials = [
    { icon: Github, href: contact.github, label: "GitHub" },
    { icon: Linkedin, href: contact.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${contact.email}`, label: "Email" },
  ];

  return (
    <footer className="py-12 border-t border-border relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.02] to-transparent -z-10" />
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground font-body flex items-center gap-1.5">
          © {new Date().getFullYear()} {name}. Made with <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
        </p>

        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <MagneticButton key={s.label} strength={0.4}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 transition-colors"
                aria-label={s.label}
              >
                <s.icon className="w-4 h-4" />
              </a>
            </MagneticButton>
          ))}
        </div>

        <motion.button
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer shadow-[0_0_20px_hsl(var(--primary)/0.2)]"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
