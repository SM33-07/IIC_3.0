import React, { useRef, useEffect } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZαβγδεζηθικλμνξοπρστυφχψω'.split('');
    const fontSize = 22; 
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);
    
    const speeds = new Array(columns).fill(0).map(() => 0.8);

    ctx.textBaseline = 'top';

    const draw = () => {
      if (!ctx) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        
        ctx.shadowColor = 'rgba(20, 10, 80, 0.8)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = 'rgba(255, 90, 90, 0.9)';
        ctx.font = `bold ${fontSize}px 'Courier New', 'Monaco', monospace`;
        
        const x = i * fontSize + (Math.random() - 0.5) * 2;
        const y = drops[i] * fontSize + (Math.random() - 0.5) * 2;
        
        ctx.fillText(text, x, y);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
          drops[i] = -Math.random() * 5;
          speeds[i] = 0.8; 
        }

        drops[i] += speeds[i];
      }

      animationFrameId.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
     
      const newColumns = Math.floor(canvas.width / fontSize);
      drops.length = newColumns;
      speeds.length = newColumns;
      
      
      for (let i = 0; i < newColumns; i++) {
        if (drops[i] === undefined) drops[i] = Math.random() * canvas.height / fontSize;
        if (speeds[i] === undefined) speeds[i] = 0.8;
      }
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        backgroundColor: '#0a0202',
      }}
    />
  );
};

export default ParticleBackground;