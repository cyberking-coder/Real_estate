'use client';

import { motion, type Variants } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

type SplitRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  /** stagger between lines/words */
  stagger?: number;
  by?: 'word' | 'line';
  as?: 'h1' | 'h2' | 'h3' | 'p';
  once?: boolean;
};

/**
 * Masked, staggered reveal — each word (or line) rises from behind a clip.
 * The signature editorial headline motion.
 */
export function SplitReveal({
  text,
  className,
  delay = 0,
  stagger = 0.07,
  by = 'word',
  as = 'h2',
  once = true,
}: SplitRevealProps) {
  const units = by === 'line' ? text.split('\n') : text.split(' ');

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const child: Variants = {
    hidden: { y: '110%' },
    show: { y: '0%', transition: { duration: 1, ease: EASE } },
  };

  const Tag = motion[as];

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-10% 0px' }}
    >
      {units.map((unit, i) => (
        <span
          key={`${unit}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
        >
          <motion.span variants={child} className="inline-block">
            {unit}
            {by === 'word' && i < units.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
