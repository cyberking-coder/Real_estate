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
import { useEffect, useRef, useState, useCallback } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { AmenityBadge } from '@/components/AmenityIcon';
import { AMENITIES, AMENITIES_INTRO } from '@/lib/data';
import { MEDIA, asset } from '@/lib/images';

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
  const photos = MEDIA.amenityPhotos;
  const [active, setActive] = useState<number | null>(null);

  const next = useCallback(
    () => setActive((a) => (a === null ? a : (a + 1) % photos.length)),
    [photos.length],
  );
  const prev = useCallback(
    () => setActive((a) => (a === null ? a : (a - 1 + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active, next, prev]);

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
                  <div className="group flex flex-col items-center text-center">
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

        {/* Amenity photo strip — hover reveals a View button, click opens lightbox */}
        <div className="mt-20 border-t border-cream/10 pt-12">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {photos.map((photo, i) => (
              <Reveal
                as="li"
                key={photo.src}
                delay={(i % 5) * 0.06}
                className={i === 0 ? 'col-span-2 sm:col-span-1' : ''}
              >
                <button
                  onClick={() => setActive(i)}
                  data-cursor="view"
                  className="group relative block aspect-[4/5] w-full overflow-hidden"
                  aria-label={`View ${photo.label}`}
                >
                  <Image
                    src={asset(photo.src)}
                    alt={photo.label}
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal-900/20 transition-colors duration-500 group-hover:bg-charcoal-900/45" />

                  {/* View button */}
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-90 opacity-0 transition-all duration-500 ease-luxe group-hover:scale-100 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full border border-cream/70 bg-charcoal-900/40 px-5 py-2.5 font-sans text-[0.65rem] uppercase tracking-widest2 text-cream backdrop-blur-sm">
                      View
                      <span aria-hidden>→</span>
                    </span>
                  </span>

                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-900/85 to-transparent p-4 text-left font-sans text-[0.7rem] uppercase tracking-widest text-cream">
                    {photo.label}
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-charcoal-900/96 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-gold hover:text-gold"
              aria-label="Close"
              data-cursor="grow"
            >
              ✕
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 px-4 text-sm uppercase tracking-widest2 text-cream/70 transition-colors hover:text-gold sm:left-10"
              aria-label="Previous"
              data-cursor="grow"
            >
              ←
            </button>

            <motion.figure
              key={active}
              className="relative h-[70vh] w-[88vw] max-w-5xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={asset(photos[active].src)}
                alt={photos[active].label}
                fill
                sizes="88vw"
                className="object-contain"
              />
              <figcaption className="absolute -bottom-9 left-0 font-sans text-xs uppercase tracking-widest2 text-cream/60">
                {photos[active].label} — {String(active + 1).padStart(2, '0')} /{' '}
                {String(photos.length).padStart(2, '0')}
              </figcaption>
            </motion.figure>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 px-4 text-sm uppercase tracking-widest2 text-cream/70 transition-colors hover:text-gold sm:right-10"
              aria-label="Next"
              data-cursor="grow"
            >
              →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
