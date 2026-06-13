'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Preloader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    // lock scroll during intro
    document.body.style.overflow = 'hidden';

    let frame: number;
    const start = performance.now();
    const DURATION = 1700;

    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      // ease-out for the counter
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 350);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = '';
    };
  }, [reduce]);

  useEffect(() => {
    if (done) document.body.style.overflow = '';
  }, [done]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-end justify-between bg-charcoal-900 px-6 pb-10 sm:px-10 lg:px-16"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.05, ease: EASE }}
        >
          <motion.span
            className="font-serif text-2xl tracking-tightest text-cream"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            Elyse<span className="text-gold">.</span>
          </motion.span>

          <div className="overflow-hidden">
            <motion.span
              className="block font-serif text-[18vw] leading-none tracking-tightest text-cream/90 sm:text-[12vw] lg:text-[9vw]"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              {String(count).padStart(3, '0')}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
