import { useEffect, useRef } from "react";

interface AuroraBackgroundProps {
  colorStops?: [string, string, string];
  speed?: number;
  className?: string;
}

const AuroraBackground = ({
  colorStops = ["hsl(268, 100%, 84.5%)", "hsl(280, 80%, 70%)", "hsl(250, 90%, 75%)"],
  speed = 1,
  className = "",
}: AuroraBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 0.5;
      canvas.height = canvas.offsetHeight * 0.5;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.003 * speed;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < 3; i++) {
        const x = width * (0.3 + 0.4 * Math.sin(time + i * 2.1));
        const y = height * (0.3 + 0.4 * Math.cos(time * 0.7 + i * 1.5));
        const radius = Math.min(width, height) * (0.4 + 0.1 * Math.sin(time * 0.5 + i));

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, colorStops[i] || colorStops[0]);
        gradient.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [colorStops, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full -z-10 opacity-60 blur-3xl ${className}`}
      style={{ imageRendering: "auto" }}
    />
  );
};

export default AuroraBackground;
