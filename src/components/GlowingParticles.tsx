import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GlowingParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      
      // Update variables directly in the DOM to bypass React re-renders and lag
      container.style.setProperty('--mouse-x', `${e.clientX}px`);
      container.style.setProperty('--mouse-y', `${e.clientY}px`);
      container.style.setProperty('--spotlight-opacity', '1');

      // Track coordinates on hovered glass cards for the global hover glow shine effect
      const target = e.target as HTMLElement;
      const card = target.closest('.glass-card') as HTMLElement;
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--card-mouse-x', `${x}px`);
        card.style.setProperty('--card-mouse-y', `${y}px`);
      }
    };

    const handleMouseLeave = () => {
      const container = containerRef.current;
      if (container) {
        container.style.setProperty('--spotlight-opacity', '0');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-50 bg-[#02040a] overflow-hidden select-none pointer-events-none"
      style={{
        ['--mouse-x' as any]: '-1000px',
        ['--mouse-y' as any]: '-1000px',
        ['--spotlight-opacity' as any]: '0',
      }}
    >
      {/* 1. Deep Space Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-950 via-[#02040a] to-[#010204] pointer-events-none" />

      {/* 2. Large, Soft, Drifting Ambient Auroras (~10% opacity) */}
      <div className="absolute inset-0 opacity-[0.08] filter blur-[120px] md:blur-[160px] pointer-events-none">
        {/* Blob 1: Mint Green (Top-Left) */}
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -40, 30, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[5%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#2dd4bf]"
        />

        {/* Blob 2: Deep Teal (Center-Right) */}
        <motion.div
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 30, -50, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[25%] right-[10%] w-[55vw] h-[55vw] rounded-full bg-[#0d9488]"
        />

        {/* Blob 3: Sky Blue (Bottom-Left) */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, 45, -30, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-[10%] left-[15%] w-[40vw] h-[40vw] rounded-full bg-[#38bdf8]"
        />
      </div>

      {/* 3. Glowing Horizon (Planet-style glow at bottom for visual focal depth, ~14% opacity) */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[120vw] h-[45vh] opacity-[0.14] filter blur-[80px] md:blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(45, 212, 191, 0.4) 0%, rgba(56, 189, 248, 0.1) 60%, transparent 100%)',
        }}
      />

      {/* 4. Mouse-Follow Interactive Spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          opacity: 'var(--spotlight-opacity)',
          background: `radial-gradient(circle 420px at var(--mouse-x) var(--mouse-y), rgba(45, 212, 191, 0.05), rgba(56, 189, 248, 0.015) 50%, transparent 100%)`,
        }}
      />

      {/* 5. Tactile SVG Fractal Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-mode-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default GlowingParticles;