import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' }
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    
    if (!element) return;
    
    const lenis: any = (window as any).lenis;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android.*Tablet|Tablet.*Android/i.test(navigator.userAgent);
    
    // Calculate scroll position with offset
    const offset = isMobile || isTablet ? 80 : 100;
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    
    if (lenis && typeof lenis.scrollTo === 'function' && !isMobile && !isTablet) {
      // Use Lenis smooth scroll on laptop/desktop
      lenis.scrollTo(top, { 
        lerp: 0.1,
        duration: 1.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 3)
      });
    } else {
      // Enhanced native smooth scroll for mobile/tablet
      const currentScroll = window.pageYOffset;
      const targetScroll = top;
      const distance = targetScroll - currentScroll;
      const duration = Math.min(Math.abs(distance) / 2, 1000);
      
      const startTime = performance.now();
      
      function easeInOutCubic(t: number): number {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }
      
      function animateScroll(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, currentScroll + distance * easedProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      }
      
      requestAnimationFrame(animateScroll);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        initial={false}
        animate={{ rotate: isOpen ? 90 : 0 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg md:hidden"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Mobile Navigation */}
      <motion.nav
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl z-40 md:hidden"
      >
        <div className="pt-20 px-4">
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left py-3 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mb-2 transition-colors"
            >
              {item.name}
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-full shadow-lg"
        >
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(item.href)}
              className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {item.name}
            </motion.button>
          ))}
        </motion.div>
      </nav>
    </>
  );
};