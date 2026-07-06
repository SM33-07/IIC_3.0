import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TraceLaser {
  traceIndex: number;
  segmentIndex: number;
  t: number;
  speed: number;
  color: string;
  history: { x: number; y: number }[];
  completed: boolean;
}

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

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;

      // Update CSS variables directly in the DOM to bypass React re-renders
      const container = containerRef.current;
      if (container) {
        container.style.setProperty('--mouse-x', `${e.clientX}px`);
        container.style.setProperty('--mouse-y', `${e.clientY}px`);
        container.style.setProperty('--spotlight-opacity', '1');
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

    // Grid config
    const gridSpacing = 45;
    let lasers: TraceLaser[] = [];
    const maxLasers = 3; // Keep it sparse as requested

    // Generate PCB-style circuit traces dynamically matching grid alignment and 45-deg angles
    const generateTraces = (w: number, h: number, spacing: number) => {
      return [
        // Top Left Trace (Corner PCB layout)
        [
          { x: spacing * 2, y: spacing * 3 },
          { x: spacing * 6, y: spacing * 3 },
          { x: spacing * 7, y: spacing * 4 }, // 45-degree angle
          { x: spacing * 10, y: spacing * 4 }
        ],
        // Middle Left Trace
        [
          { x: spacing * 3, y: spacing * 9 },
          { x: spacing * 3, y: spacing * 12 },
          { x: spacing * 4, y: spacing * 13 }, // 45-degree
          { x: spacing * 7, y: spacing * 13 }
        ],
        // Bottom Left Trace
        [
          { x: spacing * 2, y: h - spacing * 4 },
          { x: spacing * 6, y: h - spacing * 4 },
          { x: spacing * 7, y: h - spacing * 5 }, // 45-degree
          { x: spacing * 11, y: h - spacing * 5 }
        ],
        // Top Right Trace
        [
          { x: w - spacing * 2, y: spacing * 2 },
          { x: w - spacing * 6, y: spacing * 2 },
          { x: w - spacing * 7, y: spacing * 3 }, // 45-degree
          { x: w - spacing * 10, y: spacing * 3 }
        ],
        // Bottom Right Trace
        [
          { x: w - spacing * 3, y: h - spacing * 5 },
          { x: w - spacing * 7, y: h - spacing * 5 },
          { x: w - spacing * 8, y: h - spacing * 4 }, // 45-degree
          { x: w - spacing * 12, y: h - spacing * 4 }
        ],
        // Center-right vertical trace
        [
          { x: w - spacing * 6, y: spacing * 7 },
          { x: w - spacing * 6, y: spacing * 10 },
          { x: w - spacing * 7, y: spacing * 11 }, // 45-degree
          { x: w - spacing * 7, y: spacing * 14 }
        ]
      ];
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const traces = generateTraces(width, height, gridSpacing);

      // 1. Draw Grid Lines (Layer 3)
      ctx.lineWidth = 1;
      
      let strokeStyle: string | CanvasGradient = 'rgba(45, 212, 191, 0.015)';
      if (mouse.active) {
        const gridGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 350);
        gridGrad.addColorStop(0, 'rgba(45, 212, 191, 0.07)'); // Spotlight illuminated grid lines
        gridGrad.addColorStop(0.5, 'rgba(45, 212, 191, 0.03)');
        gridGrad.addColorStop(1, 'rgba(45, 212, 191, 0.015)'); // Base grid lines
        strokeStyle = gridGrad;
      }
      ctx.strokeStyle = strokeStyle;

      // Vertical lines
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Blueprint Grid Dots at intersections (Layer 3)
      let fillStyle: string | CanvasGradient = 'rgba(45, 212, 191, 0.02)';
      if (mouse.active) {
        const dotGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300);
        dotGrad.addColorStop(0, 'rgba(56, 189, 248, 0.20)'); // Glowing dots near spotlight
        dotGrad.addColorStop(0.5, 'rgba(45, 212, 191, 0.06)');
        dotGrad.addColorStop(1, 'rgba(45, 212, 191, 0.02)');
        fillStyle = dotGrad;
      }
      ctx.fillStyle = fillStyle;

      for (let x = 0; x < width; x += gridSpacing) {
        for (let y = 0; y < height; y += gridSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Draw PCB Circuit Traces & solder pads (Layer 3 Identity)
      let traceStrokeStyle: string | CanvasGradient = 'rgba(45, 212, 191, 0.06)';
      if (mouse.active) {
        const traceGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 320);
        traceGrad.addColorStop(0, 'rgba(45, 212, 191, 0.22)'); // Spotlight highlighted traces
        traceGrad.addColorStop(0.5, 'rgba(45, 212, 191, 0.10)');
        traceGrad.addColorStop(1, 'rgba(45, 212, 191, 0.06)');
        traceStrokeStyle = traceGrad;
      }
      ctx.strokeStyle = traceStrokeStyle;
      ctx.lineWidth = 1.5;

      traces.forEach(trace => {
        // Draw trace path
        ctx.beginPath();
        ctx.moveTo(trace[0].x, trace[0].y);
        for (let i = 1; i < trace.length; i++) {
          ctx.lineTo(trace[i].x, trace[i].y);
        }
        ctx.stroke();

        // Draw solder pad circles at start and endpoints
        const pStart = trace[0];
        const pEnd = trace[trace.length - 1];

        ctx.fillStyle = ctx.strokeStyle;

        ctx.beginPath();
        ctx.arc(pStart.x, pStart.y, 3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pEnd.x, pEnd.y, 3, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 4. Update and Draw Trace Laser Packets (Layer 4 Motion)
      // Spawn new laser occasionally (sparse zips every few seconds)
      if (Math.random() < 0.007 && lasers.length < maxLasers) {
        const traceIndex = Math.floor(Math.random() * traces.length);
        const colors = ['#2dd4bf', '#38bdf8', '#0ea5e9'];
        lasers.push({
          traceIndex,
          segmentIndex: 0,
          t: 0,
          speed: 0.015 + Math.random() * 0.012, // Slow, elegant speed
          color: colors[Math.floor(Math.random() * colors.length)],
          history: [],
          completed: false
        });
      }

      for (let i = lasers.length - 1; i >= 0; i--) {
        const laser = lasers[i];
        const trace = traces[laser.traceIndex];

        if (!laser.completed) {
          // Progress along segment
          laser.t += laser.speed;
          
          if (laser.t >= 1) {
            laser.t = 0;
            if (laser.segmentIndex < trace.length - 2) {
              laser.segmentIndex += 1;
            } else {
              laser.completed = true;
            }
          }

          // Calculate current head point coordinates
          const p1 = trace[laser.segmentIndex];
          const p2 = trace[laser.segmentIndex + 1];
          const hx = p1.x + (p2.x - p1.x) * laser.t;
          const hy = p1.y + (p2.y - p1.y) * laser.t;

          laser.history.push({ x: hx, y: hy });
        } else {
          // If completed, shrink tail until laser disappears
          if (laser.history.length > 0) {
            laser.history.shift();
          } else {
            lasers.splice(i, 1);
            continue;
          }
        }

        // Limit tail history trail length
        if (laser.history.length > 15 && !laser.completed) {
          laser.history.shift();
        }

        // Draw tail path segments with alpha fading
        if (laser.history.length > 1) {
          for (let h = 1; h < laser.history.length; h++) {
            ctx.beginPath();
            ctx.moveTo(laser.history[h - 1].x, laser.history[h - 1].y);
            ctx.lineTo(laser.history[h].x, laser.history[h].y);
            
            const alpha = (h / laser.history.length) * 0.7;
            ctx.strokeStyle = laser.color === '#2dd4bf' 
              ? `rgba(45, 212, 191, ${alpha})`
              : laser.color === '#38bdf8'
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(14, 165, 233, ${alpha})`;
            
            ctx.lineWidth = 2.5;
            ctx.stroke();
          }

          // Draw head dot glow highlight
          const head = laser.history[laser.history.length - 1];
          ctx.beginPath();
          ctx.arc(head.x, head.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = laser.color;
          ctx.fill();
        }
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
      {/* Layer 1: Dark Navy Base is handled by container styling */}

      {/* Layer 2: Very Soft Aurora Blobs (10% opacity) */}
      <div className="absolute inset-0 opacity-[0.10] filter blur-[120px] md:blur-[160px] pointer-events-none">
        {/* Blob 1: Mint Green */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[8%] left-[12%] w-[45vw] h-[45vw] rounded-full bg-[#2dd4bf]"
        />

        {/* Blob 2: Deep Teal */}
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 30, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-[8%] right-[8%] w-[50vw] h-[50vw] rounded-full bg-[#0d9488]"
        />

        {/* Blob 3: Sky Blue */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, 50, -30, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[30%] right-[22%] w-[38vw] h-[38vw] rounded-full bg-[#38bdf8]"
        />
      </div>

      {/* Layer 3 (Grid/PCB) and Layer 4 (Lasers): Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Layer 5: Mouse Spotlight Glow (Subtle, clean hover light overlay) */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: 'var(--spotlight-opacity)',
          background: `radial-gradient(circle 380px at var(--mouse-x) var(--mouse-y), rgba(45, 212, 191, 0.07), rgba(56, 189, 248, 0.015) 40%, transparent 80%)`,
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* Layer 6: Soft Grain Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-mode-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default GlowingParticles;