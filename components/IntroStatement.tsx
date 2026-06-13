'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

const STATEMENT =
  'We did not set out to build apartments. We set out to compose a way of living — where architecture recedes, light becomes the ornament, and every space is an invitation to slow down.';

export function IntroStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.25'],
  });

  const words = STATEMENT.split(' ');

  return (
    <section className="bg-charcoal py-section">
      <div ref={ref} className="container-luxe">
        <p className="eyebrow mb-12 text-center">— The Philosophy</p>
        <p className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-[0.28em] gap-y-1 text-center font-serif text-3xl font-light leading-[1.35] tracking-tightest text-cream sm:text-4xl lg:text-5xl lg:leading-[1.3]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  // give the accent words a subtle gold tint as they activate
  const emphasised = /light|living|slow/i.test(children);
  return (
    <motion.span style={{ opacity }} className={emphasised ? 'italic text-gold' : undefined}>
      {children}
    </motion.span>
  );
}
