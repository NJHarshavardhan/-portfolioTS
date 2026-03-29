import { useEffect, useRef } from "react";

const SplashCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    const particles: { x: number; y: number; vx: number; vy: number; life: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const addSplash = (x: number, y: number) => {
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const speed = 1.5 + Math.random() * 1.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      addSplash(e.clientX, e.clientY);
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= 0.02;
      });

      ctx.lineWidth = 2;
      particles.forEach((p) => {
        if (p.life <= 0) return;
        const alpha = Math.max(0, p.life);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 18);
        gradient.addColorStop(0, `rgba(168, 85, 247, ${alpha})`);
        gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].life <= 0) particles.splice(i, 1);
      }

      animationFrame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);
    render();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 mix-blend-screen"
    />
  );
};

export default SplashCursor;

