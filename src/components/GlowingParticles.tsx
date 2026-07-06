import React, { useEffect } from 'react';

const GlowingParticles: React.FC = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Find any hover targets with the .glass-card class and set coordinates for hover spotlight
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

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 -z-50 bg-[#020617] overflow-hidden select-none pointer-events-none"
    >
      {/* 1. Static, Barely Perceptible Engineering Grid (2.5% Opacity, Teal Tint for Technical Identity) */}
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

      {/* 2. Symmetrical Engineering Grid Dots (3% Opacity, Aligned at Grid Intersections) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(45, 212, 191, 0.8) 1px, transparent 1px)`,
          backgroundSize: '45px 45px',
          backgroundPosition: '-0.5px -0.5px',
        }}
      />
    </div>
  );
};

export default GlowingParticles;