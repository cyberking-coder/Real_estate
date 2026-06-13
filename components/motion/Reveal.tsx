'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** vertical travel in px */
  y?: number;
  /** start scale (subtle 4–8% as per brief) */
  scale?: number;
  duration?: number;
  once?: boolean;
  as?: 'div' | 'span' | 'li' | 'section';
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 48,
  scale = 0.94,
  duration = 1.1,
  once = true,
  as = 'div',
}: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y, scale },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration, ease: EASE, delay },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
    >
      {children}
    </MotionTag>
  );
}
