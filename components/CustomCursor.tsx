'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * A soft trailing ring + dot. Grows over interactive elements ([data-cursor]).
 * Rendered only on fine-pointer devices; falls back to the native cursor on
 * touch (handled via CSS in globals.css).
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<'default' | 'grow' | 'view'>('default');
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 250, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 250, damping: 28, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);

      const target = (e.target as HTMLElement)?.closest('[data-cursor]');
      if (target) {
        const kind = target.getAttribute('data-cursor');
        setVariant(kind === 'view' ? 'view' : 'grow');
      } else {
        setVariant('default');
      }
    };

    const leave = () => setHidden(true);

    window.addEventListener('mousemove', move);
    document.body.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.body.removeEventListener('mouseleave', leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = variant === 'view' ? 84 : variant === 'grow' ? 56 : 34;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden lg:block" aria-hidden>
      {/* trailing ring */}
      <motion.div
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-gold/70 mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: hidden ? 0 : 1,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          backgroundColor:
            variant === 'view' ? 'rgba(201,168,118,0.12)' : 'rgba(201,168,118,0)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {variant === 'view' && (
          <span className="font-sans text-[0.6rem] uppercase tracking-widest2 text-cream">
            View
          </span>
        )}
      </motion.div>

      {/* precise dot */}
      <motion.div
        className="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
        style={{ x, y }}
        animate={{ opacity: hidden || variant !== 'default' ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
