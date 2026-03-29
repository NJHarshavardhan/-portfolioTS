import { useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { z } from "zod";
import AnimatedSection from "./AnimatedSection";
import SpotlightCard from "./SpotlightCard";
import GridPattern from "./GridPattern";
import ScrollFloat from "./ScrollFloat";
import SplitText from "./SplitText";
import BounceCard from "./BounceCard";
import DecayCard from "./DecayCard";
import { Mail, Linkedin, Github, Phone, Send, CheckCircle, Sparkles, Download } from "lucide-react";
import Aurora from "./Aurora";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  phone: string;
}

interface ContactProps {
  contact: ContactInfo;
}

const Contact = ({ contact }: ContactProps) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";
  const auroraColors = isDark 
    ? ["#7cff67", "#B19EEF", "#5227FF"] 
    : ["#F5F3FF", "#E9D5FF", "#DDD6FE"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("sending");
    
    try {
      // Build form data per Web3Forms required standard
      const formData = new FormData();
      formData.append("access_key", "dcdd4273-67e0-478b-ae60-a2655e137922");
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("message", form.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const links = [
    { icon: Mail, label: "Email", href: `mailto:${contact.email}`, text: contact.email },
    { icon: Linkedin, label: "LinkedIn", href: contact.linkedin, text: "LinkedIn Profile" },
    { icon: Github, label: "GitHub", href: contact.github, text: "GitHub Profile" },
    { icon: Phone, label: "Phone", href: `tel:${contact.phone}`, text: contact.phone },
  ];

  return (
    <AnimatedSection id="contact" className="py-16 sm:py-24 relative overflow-hidden">
      {isDark && (
        <div className="absolute inset-0 -z-10">
          <Aurora
            colorStops={auroraColors}
            blend={0.5}
            amplitude={1.0}
            speed={1}
          />
        </div>
      )}
      <GridPattern />

      <ScrollFloat className="container mx-auto px-6" intensity={18}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-primary/40" />
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-foreground">
            <SplitText text="Get in " />
            <span className="text-primary">Touch</span>
          </h2>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-primary/40" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground font-body mb-16 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          Let's build something amazing together
        </motion.p>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {(["name", "email", "message"] as const).map((field) => (
              <div key={field} className="relative">
                <motion.label
                  className={`text-sm font-body mb-1 block capitalize transition-colors duration-300 ${
                    focused === field ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {field}
                </motion.label>
                {field === "message" ? (
                  <textarea
                    rows={5}
                    value={form[field]}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className={`w-full px-4 py-3 glass rounded-xl text-foreground font-body resize-none outline-none transition-all bg-transparent ${
                      focused === field ? "border-primary/40 shadow-[0_0_0_2px_hsl(var(--ring)/0.15)]" : ""
                    }`}
                    placeholder={`Your ${field}...`}
                  />
                ) : (
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={form[field]}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className={`w-full px-4 py-3 glass rounded-xl text-foreground font-body outline-none transition-all bg-transparent ${
                      focused === field ? "border-primary/40 shadow-[0_0_0_2px_hsl(var(--ring)/0.15)]" : ""
                    }`}
                    placeholder={`Your ${field}...`}
                  />
                )}
                {errors[field] && (
                  <p className="text-xs text-destructive mt-1 font-body">{errors[field]}</p>
                )}
              </div>
            ))}

            <motion.button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 transition-all shadow-[0_0_25px_hsl(var(--ring)/0.25)] hover:shadow-[0_0_40px_hsl(var(--ring)/0.4)]"
            >
              {status === "sending" ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                />
              ) : status === "sent" ? (
                <>
                  <CheckCircle className="w-5 h-5" /> Message Sent!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send Message
                </>
              )}
            </motion.button>

            <a
              href="/Harsha-Resume-New.pdf"
              download
              className="mt-3 inline-flex items-center justify-center gap-2 w-full py-3 glass rounded-xl text-sm font-body text-foreground hover:border-primary/40 hover:bg-primary/10 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </motion.form>

          {/* Links with bounce + decay effects */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 flex flex-col justify-center"
          >
            <p className="text-muted-foreground font-body mb-4">
              Feel free to reach out through any of these channels. I'm always open to discussing new projects and opportunities.
            </p>
            {links.map((link) => (
              <BounceCard key={link.label}>
                <DecayCard>
                  <SpotlightCard className="glass rounded-xl">
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="p-4 flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <link.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-body">{link.label}</p>
                        <p className="text-sm font-body text-foreground group-hover:text-primary transition-colors">{link.text}</p>
                      </div>
                    </a>
                  </SpotlightCard>
                </DecayCard>
              </BounceCard>
            ))}
          </motion.div>
        </div>
      </ScrollFloat>
    </AnimatedSection>
  );
};

export default Contact;
