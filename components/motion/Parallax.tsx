'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** total vertical travel as a fraction of element height, e.g. 0.18 = 18% */
  amount?: number;
};

/**
 * Wraps content (typically an over-scaled image) and shifts it vertically as it
 * passes through the viewport. The child should be slightly larger than its
 * frame so the shift never reveals an edge.
 */
export function Parallax({ children, className, amount = 0.18 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const shift = `${amount * 100}%`;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ['0%', '0%'] : [`-${shift}`, shift],
  );

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div style={{ y, height: `${100 + amount * 200}%`, top: `-${shift}`, position: 'relative' }}>
        {children}
      </motion.div>
    </div>
  );
}
