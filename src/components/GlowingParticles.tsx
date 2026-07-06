import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GlowingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse coordinates directly on DOM to prevent state updates & re-renders
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;

      const container = containerRef.current;
      if (container) {
        container.style.setProperty('--mouse-x', `${e.clientX}px`);
        container.style.setProperty('--mouse-y', `${e.clientY}px`);
        container.style.setProperty('--spotlight-opacity', '1');
      }

      // Track relative coordinates on any hovered .glass-card for global hover shine
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
      mouseRef.current.active = false;
      const container = containerRef.current;
      if (container) {
        container.style.setProperty('--spotlight-opacity', '0');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const gridSpacing = 48; // Symmetrical grid spacing

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      // 1. Draw Clean Blueprint Grid Lines (No dots, no circles)
      ctx.lineWidth = 1;
      
      let strokeStyle: string | CanvasGradient = 'rgba(45, 212, 191, 0.012)';
      if (mouse.active) {
        const gridGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 350);
        gridGrad.addColorStop(0, 'rgba(45, 212, 191, 0.06)'); // Soft grid highlight near cursor
        gridGrad.addColorStop(0.5, 'rgba(45, 212, 191, 0.025)');
        gridGrad.addColorStop(1, 'rgba(45, 212, 191, 0.012)'); // Base faint blueprint grid lines
        strokeStyle = gridGrad;
      }
      ctx.strokeStyle = strokeStyle;

      // Vertical grid lines
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-50 bg-[#030712] overflow-hidden select-none pointer-events-none"
      style={{
        ['--mouse-x' as any]: '-1000px',
        ['--mouse-y' as any]: '-1000px',
        ['--spotlight-opacity' as any]: '0',
      }}
    >
      {/* Layer 1: Dark Navy Base is set on container bg */}

      {/* Layer 2: Very Soft Aurora Blurs (Minimalist, 10% opacity) */}
      <div className="absolute inset-0 opacity-[0.09] filter blur-[120px] md:blur-[160px] pointer-events-none">
        {/* Blob 1: Mint Green */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 30, 0],
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
            x: [0, -50, 30, 0],
            y: [0, 20, -40, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-[12%] right-[12%] w-[48vw] h-[48vw] rounded-full bg-[#0d9488]"
        />

        {/* Blob 3: Sky Blue */}
        <motion.div
          animate={{
            x: [0, 30, -10, 0],
            y: [0, 40, -20, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[35%] right-[25%] w-[35vw] h-[35vw] rounded-full bg-[#38bdf8]"
        />
      </div>

      {/* Layer 3: Symmetrical Grid Canvas (rendered at 60 FPS) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Layer 4: Soft Mouse Spotlight overlay (adds ambient center shine) */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: 'var(--spotlight-opacity)',
          background: `radial-gradient(circle 380px at var(--mouse-x) var(--mouse-y), rgba(45, 212, 191, 0.05), rgba(56, 189, 248, 0.01) 40%, transparent 80%)`,
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* Layer 5: High-fidelity transparent SVG fractal noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-mode-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default GlowingParticles;