import React, { useEffect, useRef } from 'react';
import Galaxy from './Galaxy';

const GlowingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (container) {
        container.style.setProperty('--mouse-x', `${e.clientX}px`);
        container.style.setProperty('--mouse-y', `${e.clientY}px`);
        container.style.setProperty('--spotlight-opacity', '1');
      }

      const target = e.target as HTMLElement;
      const card = target.closest('.glass-card') as HTMLElement;
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--card-mouse-x', `${(e.clientX - rect.left)}px`);
        card.style.setProperty('--card-mouse-y', `${(e.clientY - rect.top)}px`);
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

    // Draw the static grid once — no animation loop
    const drawGrid = () => {
      ctx.clearRect(0, 0, width, height);
      const gridSpacing = 45;

      ctx.strokeStyle = 'rgba(45, 212, 191, 0.015)';
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Grid intersection dots
      ctx.fillStyle = 'rgba(45, 212, 191, 0.03)';
      for (let x = 0; x < width; x += gridSpacing) {
        for (let y = 0; y < height; y += gridSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // PCB circuit traces
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.05)';
      ctx.lineWidth = 1.5;
      const s = gridSpacing;
      const traces = [
        [{ x: s*2, y: s*3 }, { x: s*6, y: s*3 }, { x: s*7, y: s*4 }, { x: s*10, y: s*4 }],
        [{ x: s*2, y: height-s*4 }, { x: s*5, y: height-s*4 }, { x: s*6, y: height-s*5 }, { x: s*9, y: height-s*5 }],
        [{ x: width-s*2, y: s*2 }, { x: width-s*6, y: s*2 }, { x: width-s*7, y: s*3 }, { x: width-s*10, y: s*3 }],
        [{ x: width-s*3, y: height-s*5 }, { x: width-s*7, y: height-s*5 }, { x: width-s*8, y: height-s*4 }, { x: width-s*12, y: height-s*4 }],
      ];

      traces.forEach(trace => {
        ctx.beginPath();
        ctx.moveTo(trace[0].x, trace[0].y);
        for (let i = 1; i < trace.length; i++) ctx.lineTo(trace[i].x, trace[i].y);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(trace[0].x, trace[0].y, 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(trace[trace.length-1].x, trace[trace.length-1].y, 3, 0, Math.PI * 2);
        ctx.stroke();
      });
    };

    drawGrid();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      drawGrid();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-50 bg-[#020617] overflow-hidden select-none pointer-events-none"
      style={{
        ['--mouse-x' as any]: '-1000px',
        ['--mouse-y' as any]: '-1000px',
        ['--spotlight-opacity' as any]: '0',
      }}
    >
      {/* Galaxy WebGL Starfield — rendered at half resolution for performance */}
      <div className="absolute inset-0 opacity-[0.25] mix-blend-screen pointer-events-none" style={{ imageRendering: 'auto' }}>
        <Galaxy 
          starSpeed={0.15} 
          density={0.5} 
          hueShift={160} 
          twinkleIntensity={0.3} 
          rotationSpeed={0.01} 
          glowIntensity={0.2}
          speed={0.6}
          mouseInteraction={false}
          transparent={true} 
        />
      </div>

      {/* CSS Aurora Blobs (pure CSS, no JS animation) */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div className="absolute top-[-15%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-[#2dd4bf] blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-[#0d9488] blur-[120px]" />
        <div className="absolute top-[-20%] right-[-15%] w-[38vw] h-[38vw] rounded-full bg-[#38bdf8] blur-[120px]" />
      </div>

      {/* Static Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Mouse Spotlight Glow */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: 'var(--spotlight-opacity)',
          background: `radial-gradient(circle 380px at var(--mouse-x) var(--mouse-y), rgba(45, 212, 191, 0.05), rgba(56, 189, 248, 0.01) 40%, transparent 80%)`,
        }}
      />
    </div>
  );
};

export default GlowingParticles;