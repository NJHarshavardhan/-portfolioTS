import { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

const AntigravityCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bubbles: Bubble[] = [];
    let animationFrame: number;
    let lastPointerTime = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const addBurst = (x: number, y: number) => {
      for (let i = 0; i < 10; i++) {
        const angle = (Math.PI * 2 * i) / 10;
        const speed = 0.5 + Math.random() * 0.8;
        bubbles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: -Math.abs(Math.sin(angle) * speed) - (0.8 + Math.random() * 0.6), // bias upward
          life: 1,
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastPointerTime < 35) return;
      lastPointerTime = now;
      addBurst(e.clientX, e.clientY);
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      bubbles.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        b.vy -= 0.01; // gentle upward acceleration
        b.vx *= 0.98;
        b.life -= 0.02;
      });

      bubbles.forEach((b) => {
        if (b.life <= 0) return;
        const alpha = Math.max(0, b.life);
        const radius = 10;
        const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, radius);
        gradient.addColorStop(0, `rgba(168, 85, 247, ${alpha})`);
        gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(b.x, b.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = bubbles.length - 1; i >= 0; i--) {
        if (bubbles[i].life <= 0 || bubbles[i].y + 20 < 0) {
          bubbles.splice(i, 1);
        }
      }

      animationFrame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
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

export default AntigravityCursor;

