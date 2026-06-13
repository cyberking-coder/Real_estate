'use client';

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { STATS, AMENITIES } from '@/lib/data';

function CountUp({ to }: { to: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const reduce = useReducedMotion();
  const target = parseInt(to, 10);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      count.set(target);
      return;
    }
    const controls = animate(count, target, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [inView, target, count, reduce]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function Amenities() {
  return (
    <section id="amenities" className="border-y border-cream/10 bg-charcoal-900 py-section">
      <div className="container-luxe">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-6">— The Estate</p>
            </Reveal>
            <SplitReveal
              as="h2"
              by="line"
              text={'Measured in\nlight, space\n& silence.'}
              className="font-serif text-4xl font-light leading-[1.05] tracking-tightest text-cream sm:text-5xl"
              stagger={0.1}
            />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-sm font-sans text-base font-light leading-relaxed text-cream/60">
                Every shared space at Elyse is designed with the same intent as the
                residences themselves — generous, tactile, and unhurried.
              </p>
            </Reveal>
          </div>

          {/* Stats */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-px overflow-hidden bg-cream/10 sm:grid-cols-2 lg:grid-cols-2">
              {STATS.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.08} className="bg-charcoal-900">
                  <div className="flex h-full flex-col justify-between gap-10 p-8 sm:p-10">
                    <span className="font-serif text-6xl font-light tracking-tightest text-cream sm:text-7xl">
                      <CountUp to={stat.value} />
                      <span className="text-gold">{stat.suffix}</span>
                    </span>
                    <span className="font-sans text-sm font-light leading-snug text-cream/55">
                      {stat.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Amenities list */}
        <ul className="mt-20 grid grid-cols-1 gap-x-12 border-t border-cream/10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((item, i) => (
            <Reveal as="li" key={item} delay={(i % 3) * 0.07}>
              <div className="flex items-start gap-4 border-b border-cream/8 py-6">
                <span className="mt-1 font-sans text-[0.65rem] tracking-widest2 text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-sans text-base font-light text-cream/80">{item}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
