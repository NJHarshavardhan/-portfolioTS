import { motion } from "framer-motion";

const codeSnippets = [
  "const app = express();",
  "import React from 'react';",
  "async function getData() {",
  "  return await fetch(url);",
  "export default App;",
  "npm install",
  "git commit -m 'feat'",
  "const [state, setState]",
  "useEffect(() => {",
  "  console.log('hello');",
  "interface Props {",
  "  name: string;",
  "docker build -t app .",
  "SELECT * FROM users",
  "flutter run --release",
  "pip install fastapi",
  "def main():",
  "class Component:",
  "=> res.json(data)",
  "module.exports = {",
  "<div className={cn(",
  "  variants: {",
  "const router = express",
  "app.listen(3000);",
  "import { motion }",
  "const db = supabase",
  "await prisma.find()",
  "ssh deploy@server",
];

const CodeBackground = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}>
      {/* Code text floating in background - MUCH MORE VISIBLE */}
      {codeSnippets.map((snippet, i) => {
        const row = Math.floor(i / 4);
        const col = i % 4;
        return (
          <motion.span
            key={i}
            className="absolute font-mono text-[11px] sm:text-sm text-primary/[0.15] dark:text-primary/[0.2] whitespace-nowrap select-none"
            style={{
              top: `${6 + row * 14}%`,
              left: `${3 + col * 24}%`,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.8 }}
          >
            {snippet}
          </motion.span>
        );
      })}

      {/* Bracket decorations - darker */}
      <div className="absolute top-10 left-6 text-6xl sm:text-8xl font-mono text-primary/[0.1] dark:text-primary/[0.15] select-none">
        {"{ }"}
      </div>
      <div className="absolute bottom-10 right-6 text-6xl sm:text-8xl font-mono text-primary/[0.1] dark:text-primary/[0.15] select-none">
        {"< />"}
      </div>
      <div className="absolute top-1/2 right-12 text-5xl font-mono text-accent/[0.12] select-none rotate-12">
        {"( )"}
      </div>
      <div className="absolute bottom-1/3 left-[15%] text-4xl font-mono text-primary/[0.08] select-none -rotate-6">
        {"[ ]"}
      </div>

      {/* Dot grid pattern - more visible */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dotgrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotgrid)" />
      </svg>

      {/* Circuit-like lines - more visible */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="20%" x2="30%" y2="20%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
        <line x1="30%" y1="20%" x2="30%" y2="45%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
        <line x1="70%" y1="60%" x2="90%" y2="60%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
        <line x1="70%" y1="60%" x2="70%" y2="85%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
        <line x1="50%" y1="10%" x2="50%" y2="35%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
        <line x1="50%" y1="35%" x2="85%" y2="35%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
        <line x1="15%" y1="70%" x2="40%" y2="70%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
        <line x1="40%" y1="70%" x2="40%" y2="90%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
        <circle cx="30%" cy="20%" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="70%" cy="60%" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="30%" cy="45%" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="70%" cy="85%" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="50%" cy="35%" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="85%" cy="35%" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="40%" cy="70%" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="40%" cy="90%" r="3" fill="currentColor" opacity="0.6" />
      </svg>
    </div>
  );
};

export default CodeBackground;
