import React, { createContext, useContext } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
  MotionValue,
} from 'framer-motion';

const VelocityContext = createContext<MotionValue<number> | null>(null);

interface ScrollVelocityContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollVelocityContainer({
  children,
  className = '',
}: ScrollVelocityContainerProps) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 250, // Smoother spring with fewer CPU ticks
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  return (
    <VelocityContext.Provider value={velocityFactor}>
      <div className={`w-full overflow-hidden ${className}`}>
        {children}
      </div>
    </VelocityContext.Provider>
  );
}

interface ScrollVelocityRowProps {
  children: React.ReactNode;
  baseVelocity?: number;
  direction?: 1 | -1;
  className?: string;
}

export function ScrollVelocityRow({
  children,
  baseVelocity = 5,
  direction = 1,
  className = '',
}: ScrollVelocityRowProps) {
  const baseX = useMotionValue(0);
  const velocityFactor = useContext(VelocityContext);

  const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

  // We wrap at -50% because we duplicate the row content 2 times
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    const cappedDelta = Math.min(delta, 30);
    // Calculate total absolute speed (base speed + proportional scroll boost)
    let speed = baseVelocity * (cappedDelta / 1000);

    const velocity = velocityFactor ? velocityFactor.get() : 0;
    speed += Math.abs(velocity) * baseVelocity * 0.08;

    // Move strictly according to the row's native direction to keep them in opposite directions
    baseX.set(baseX.get() + speed * direction);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap w-full pointer-events-auto">
      <motion.div 
        className={`flex whitespace-nowrap flex-nowrap ${className}`} 
        style={{ x, willChange: 'transform' }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </motion.div>
    </div>
  );
}
