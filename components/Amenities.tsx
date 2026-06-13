'use client';

import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { AmenitiesShowcase } from '@/components/AmenitiesShowcase';
import { AMENITIES } from '@/lib/data';
import { asset } from '@/lib/images';

const EASE = [0.16, 1, 0.3, 1] as const;

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      count.set(to);
      return;
    }
    const controls = animate(count, to, { duration: 1.8, ease: EASE });
    return controls.stop;
  }, [inView, to, count, reduce]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function Amenities() {
  const [view, setView] = useState<string | null>(null);

  useEffect(() => {
    if (!view) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setView(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [view]);

  return (
    <section id="amenities" className="border-y border-cream/10 bg-charcoal-900 py-section">
      <div className="container-luxe">
        {/* Header */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-6">— Amenities</p>
            </Reveal>
            <SplitReveal
              as="h2"
              by="line"
              text={'A Culture of\nLuxury Lifestyle'}
              className="font-serif text-4xl font-light leading-[1.05] tracking-tightest text-cream sm:text-5xl lg:text-6xl"
              stagger={0.1}
            />
          </div>
          <div className="flex items-end lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="flex items-end gap-4">
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
        </div>
      </div>

      {/* Scroll-pinned showcase (full-bleed container handled inside) */}
      <div className="mt-10 lg:mt-0">
        <AmenitiesShowcase onView={setView} />
      </div>

      {/* Full amenity directory — editorial index */}
      <div className="container-luxe mt-24">
        <Reveal>
          <p className="eyebrow mb-12">— Every Comfort, Considered</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-x-20 md:grid-cols-2">
          {AMENITIES.map((item, i) => (
            <Reveal as="div" key={item.label} delay={(i % 2) * 0.04} y={24}>
              <div className="group flex items-center gap-6 border-b border-cream/10 py-5 transition-colors duration-500 hover:border-gold/40">
                <span className="w-9 shrink-0 font-serif text-base italic text-gold/60 tabular-nums transition-colors duration-300 group-hover:text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-sans text-sm font-light uppercase tracking-[0.18em] text-cream/75 transition-colors duration-300 group-hover:text-cream">
                  {item.label}
                </span>
                <span className="-translate-x-2 text-gold opacity-0 transition-all duration-500 ease-luxe group-hover:translate-x-0 group-hover:opacity-100">
                  →
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {view && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-charcoal-900/96 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setView(null)}
          >
            <button
              onClick={() => setView(null)}
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-gold hover:text-gold"
              aria-label="Close"
              data-cursor="grow"
            >
              ✕
            </button>
            <motion.div
              key={view}
              className="relative h-[78vh] w-[90vw] max-w-5xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={asset(view)} alt="Amenity" fill sizes="90vw" className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
