import { ReactNode } from "react";

interface PixelCardProps {
  children: ReactNode;
  className?: string;
}

const PixelCard = ({ children, className = "" }: PixelCardProps) => {
  return (
    <div
      className={[
        "relative rounded-2xl border border-primary/20 bg-gradient-to-br from-background/95 via-card/95 to-background/90",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_18px_45px_rgba(88,28,135,0.4)]",
        "before:absolute before:inset-[6px] before:rounded-xl before:border before:border-primary/10 before:pointer-events-none",
        "overflow-hidden",
        className,
      ].join(" ")}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(129,140,248,0.6),transparent)] opacity-70" />
      <div className="absolute inset-y-0 left-0 w-px bg-[linear-gradient(180deg,transparent,rgba(236,72,153,0.5),transparent)] opacity-60" />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
};

export default PixelCard;

