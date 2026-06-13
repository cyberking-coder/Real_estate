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
import { AmenityBadge } from '@/components/AmenityIcon';
import { AMENITIES, AMENITIES_INTRO } from '@/lib/data';

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const reduce = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      count.set(to);
      return;
    }
    const controls = animate(count, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [inView, to, count, reduce]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function Amenities() {
  return (
    <section id="amenities" className="border-y border-cream/10 bg-charcoal-900 py-section">
      <div className="container-luxe">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-6">— Amenities</p>
            </Reveal>
            <SplitReveal
              as="h2"
              by="line"
              text={'A Culture of\nLuxury Lifestyle'}
              className="font-serif text-4xl font-light leading-[1.05] tracking-tightest text-cream sm:text-5xl"
              stagger={0.1}
            />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md font-sans text-base font-light leading-relaxed text-cream/60">
                {AMENITIES_INTRO}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex items-end gap-4 border-t border-cream/12 pt-8">
                <span className="font-serif text-7xl font-light leading-none tracking-tightest text-cream">
                  <CountUp to={AMENITIES.length} />
                  <span className="text-gold">+</span>
                </span>
                <span className="mb-2 font-sans text-sm font-light leading-snug text-cream/55">
                  curated lifestyle
                  <br /> amenities
                </span>
              </div>
            </Reveal>
          </div>

          {/* Amenity grid */}
          <div className="lg:col-span-7">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {AMENITIES.map((item, i) => (
                <Reveal as="li" key={item.label} delay={(i % 4) * 0.05} y={36}>
                  <div className="group flex flex-col items-center text-center" data-cursor="grow">
                    <AmenityBadge name={item.icon} />
                    <span className="mt-4 font-sans text-[0.72rem] uppercase tracking-widest text-cream/65 transition-colors duration-300 group-hover:text-cream">
                      {item.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
