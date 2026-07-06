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

      // Track relative coordinates on any hovered .glass-card for global hover spotlight
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

    // Grid config
    const gridSpacing = 45;
    let lasers: TraceLaser[] = [];
    const maxLasers = 2; // Sparse lasers traveling along traces

    // PCB circuit traces positioned in corner/side zones to keep center clean
    const generateTraces = (w: number, h: number, spacing: number) => {
      return [
        // Top Left Corner PCB Trace
        [
          { x: spacing * 2, y: spacing * 3 },
          { x: spacing * 6, y: spacing * 3 },
          { x: spacing * 7, y: spacing * 4 }, // 45-degree turn
          { x: spacing * 10, y: spacing * 4 }
        ],
        // Bottom Left Corner PCB Trace
        [
          { x: spacing * 2, y: h - spacing * 4 },
          { x: spacing * 5, y: h - spacing * 4 },
          { x: spacing * 6, y: h - spacing * 5 }, // 45-degree turn
          { x: spacing * 9, y: h - spacing * 5 }
        ],
        // Top Right Corner PCB Trace
        [
          { x: w - spacing * 2, y: spacing * 2 },
          { x: w - spacing * 6, y: spacing * 2 },
          { x: w - spacing * 7, y: spacing * 3 }, // 45-degree turn
          { x: w - spacing * 10, y: spacing * 3 }
        ],
        // Bottom Right Corner PCB Trace
        [
          { x: w - spacing * 3, y: h - spacing * 5 },
          { x: w - spacing * 7, y: h - spacing * 5 },
          { x: w - spacing * 8, y: h - spacing * 4 }, // 45-degree turn
          { x: w - spacing * 12, y: h - spacing * 4 }
        ]
      ];
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const traces = generateTraces(width, height, gridSpacing);

      // 1. Draw Subtle Grid Lines (Layer 2)
      ctx.lineWidth = 1;
      
      let strokeStyle: string | CanvasGradient = 'rgba(45, 212, 191, 0.015)';
      if (mouse.active) {
        const gridGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 350);
        gridGrad.addColorStop(0, 'rgba(45, 212, 191, 0.07)'); // Spotlight grid highlight
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

      // Draw faint dot grid intersections
      ctx.fillStyle = mouse.active ? strokeStyle : 'rgba(45, 212, 191, 0.015)';
      for (let x = 0; x < width; x += gridSpacing) {
        for (let y = 0; y < height; y += gridSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Draw PCB Circuit Traces & solder pads (Layer 4)
      let traceStrokeStyle: string | CanvasGradient = 'rgba(45, 212, 191, 0.05)';
      if (mouse.active) {
        const traceGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 320);
        traceGrad.addColorStop(0, 'rgba(45, 212, 191, 0.18)'); // Spotlight trace highlight
        traceGrad.addColorStop(0.5, 'rgba(45, 212, 191, 0.08)');
        traceGrad.addColorStop(1, 'rgba(45, 212, 191, 0.05)');
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

        ctx.beginPath();
        ctx.arc(pStart.x, pStart.y, 3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pEnd.x, pEnd.y, 3, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 3. Update and Draw Trace Laser Packets (Layer 5 Motion)
      // Spawn new laser occasionally (sparse zips every few seconds)
      if (Math.random() < 0.005 && lasers.length < maxLasers) {
        const traceIndex = Math.floor(Math.random() * traces.length);
        const colors = ['#2dd4bf', '#38bdf8'];
        lasers.push({
          traceIndex,
          segmentIndex: 0,
          t: 0,
          speed: 0.015 + Math.random() * 0.01, // Slow, elegant speed
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
              : `rgba(56, 189, 248, ${alpha})`;
            
            ctx.lineWidth = 2.0;
            ctx.stroke();
          }

          // Draw head dot glow highlight
          const head = laser.history[laser.history.length - 1];
          ctx.beginPath();
          ctx.arc(head.x, head.y, 2.5, 0, Math.PI * 2);
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
      className="fixed inset-0 -z-50 bg-[#020617] overflow-hidden select-none pointer-events-none"
      style={{
        ['--mouse-x' as any]: '-1000px',
        ['--mouse-y' as any]: '-1000px',
        ['--spotlight-opacity' as any]: '0',
      }}
    >
      {/* Layer 1: Deep Navy Background is handled by container styling */}

      {/* Layer 3: Very Soft Aurora Corners (opacity 8%, heavily blurred, placed in the corners) */}
      <div className="absolute inset-0 opacity-[0.08] filter blur-[120px] md:blur-[160px] pointer-events-none">
        {/* Blob 1: Mint Green (Top Left Corner) */}
        <motion.div
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[-15%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-[#2dd4bf]"
        />

        {/* Blob 2: Deep Teal (Bottom Right Corner) */}
        <motion.div
          animate={{
            x: [0, -20, 10, 0],
            y: [0, 20, -20, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-[-15%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-[#0d9488]"
        />

        {/* Blob 3: Sky Blue (Top Right Corner) */}
        <motion.div
          animate={{
            x: [0, 15, -15, 0],
            y: [0, 20, -10, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[-20%] right-[-15%] w-[38vw] h-[38vw] rounded-full bg-[#38bdf8]"
        />
      </div>

      {/* Layer 2 (Grid), Layer 4 (PCB), Layer 5 (Lasers): Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Layer 6: Mouse Spotlight Glow (Subtle overlay) */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: 'var(--spotlight-opacity)',
          background: `radial-gradient(circle 380px at var(--mouse-x) var(--mouse-y), rgba(45, 212, 191, 0.05), rgba(56, 189, 248, 0.01) 40%, transparent 80%)`,
          transition: 'opacity 0.5s ease',
        }}
      />
    </div>
  );
};

export default GlowingParticles;