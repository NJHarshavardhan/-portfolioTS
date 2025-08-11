import { useRef, useLayoutEffect, useEffect } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!barRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left center" });
      
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          gsap.to(barRef.current, {
            scaleX: self.progress,
            duration: 0.1,
            ease: "power2.out",
          });
        },
      });
    });
    
    return () => ctx.revert();
  }, []);

  // Fallback for mobile when GSAP isn't available
  useEffect(() => {
    if (!barRef.current) return;
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      const updateProgress = () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollTop / docHeight;
        
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${progress})`;
        }
      };
      
      window.addEventListener('scroll', updateProgress, { passive: true });
      updateProgress(); // Initial call
      
      return () => window.removeEventListener('scroll', updateProgress);
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent">
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
      />
    </div>
  );
};

export default ScrollProgress;


