import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GlowingParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      
      // Update variables directly in the DOM to prevent state updates and re-renders
      container.style.setProperty('--mouse-x', `${e.clientX}px`);
      container.style.setProperty('--mouse-y', `${e.clientY}px`);
      container.style.setProperty('--spotlight-opacity', '1');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-50 bg-[#030712] overflow-hidden select-none pointer-events-none"
      style={{
        // Set initial values for server rendering safety
        ['--mouse-x' as any]: '-1000px',
        ['--mouse-y' as any]: '-1000px',
        ['--spotlight-opacity' as any]: '0',
      }}
    >
      
      {/* 1. Large Ambient Aurora Blurs (Soft, premium depth, ~10% opacity) */}
      <div className="absolute inset-0 opacity-[0.11] filter blur-[120px] md:blur-[160px] pointer-events-none">
        {/* Blob 1: Mint Green */}
        <motion.div
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[10%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-[#2dd4bf]"
        />

        {/* Blob 2: Deep Teal */}
        <motion.div
          animate={{
            x: [0, -70, 50, 0],
            y: [0, 40, -60, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#0d9488]"
        />

        {/* Blob 3: Sky Blue */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, 60, -40, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[35%] right-[25%] w-[35vw] h-[35vw] rounded-full bg-[#38bdf8]"
        />
      </div>

      {/* 2. Technical Blueprint Grid Pattern (Static, extremely faint, 2.5% opacity) */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(45, 212, 191, 0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45, 212, 191, 0.8) 1px, transparent 1px)
          `,
          backgroundSize: '45px 45px',
        }}
      />

      {/* 3. Figma-style Blueprint Dot Grid (3% opacity) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(45, 212, 191, 0.8) 1px, transparent 1px)`,
          backgroundSize: '45px 45px',
          backgroundPosition: '-0.5px -0.5px', // Aligns dots at line intersections
        }}
      />

      {/* 4. Mouse-Illuminated Grid Lens (Revealed dynamically on hover, 7% opacity) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 'var(--spotlight-opacity)',
          backgroundImage: `
            linear-gradient(rgba(45, 212, 191, 0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45, 212, 191, 0.8) 1px, transparent 1px)
          `,
          backgroundSize: '45px 45px',
          WebkitMaskImage: `radial-gradient(circle 280px at var(--mouse-x) var(--mouse-y), black, transparent 80%)`,
          maskImage: `radial-gradient(circle 280px at var(--mouse-x) var(--mouse-y), black, transparent 80%)`,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* 5. Mouse Spotlight Glow (Subtle, clean hover light) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 'var(--spotlight-opacity)',
          background: `radial-gradient(circle 350px at var(--mouse-x) var(--mouse-y), rgba(45, 212, 191, 0.08), rgba(56, 189, 248, 0.02) 40%, transparent 80%)`,
          transition: 'opacity 0.5s ease',
        }}
      />
    </div>
  );
};

export default GlowingParticles;