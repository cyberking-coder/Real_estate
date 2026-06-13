'use client';

import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import { IMAGES, img } from '@/lib/images';
import { Reveal } from '@/components/motion/Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [active, setActive] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 120, damping: 30, mass: 0.4 });

  // Measure horizontal overflow so the track scrolls exactly to its end.
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const overflow = trackRef.current.scrollWidth - window.innerWidth;
      const d = Math.max(overflow, 0);
      setDistance(d);
      setSectionHeight(d + window.innerHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const images = IMAGES.gallery;

  const next = useCallback(
    () => setActive((a) => (a === null ? a : (a + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () => setActive((a) => (a === null ? a : (a - 1 + images.length) % images.length)),
    [images.length],
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
    <section id="gallery" className="bg-charcoal">
      <div className="container-luxe flex items-end justify-between pt-section">
        <div>
          <Reveal>
            <p className="eyebrow mb-5">— Gallery</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-serif text-4xl font-light tracking-tightest text-cream sm:text-5xl">
              A closer look
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <span className="hidden font-sans text-xs uppercase tracking-widest2 text-cream/40 lg:block">
            Scroll to explore →
          </span>
        </Reveal>
      </div>

      {/* Desktop: horizontal scroll-driven track */}
      <div
        ref={sectionRef}
        className="relative mt-12 hidden lg:block"
        style={{ height: sectionHeight ? `${sectionHeight}px` : '100vh' }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div ref={trackRef} style={{ x }} className="flex gap-6 px-6 sm:px-10 lg:px-16">
            {images.map((id, i) => (
              <GalleryItem
                key={id}
                id={id}
                index={i}
                onClick={() => setActive(i)}
                tall={i % 2 === 1}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile / tablet: vertical staggered grid */}
      <div className="mt-12 grid grid-cols-2 gap-3 px-6 sm:px-10 lg:hidden">
        {images.map((id, i) => (
          <button
            key={id}
            onClick={() => setActive(i)}
            className={`relative overflow-hidden ${i % 3 === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-[3/4]'}`}
          >
            <Image
              src={img(id, 1000, 75)}
              alt={`Elyse Residence gallery image ${i + 1}`}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </button>
        ))}
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
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 px-4 font-sans text-sm uppercase tracking-widest2 text-cream/70 transition-colors hover:text-gold sm:left-10"
              aria-label="Previous"
              data-cursor="grow"
            >
              ←
            </button>

            <motion.div
              key={active}
              className="relative h-[70vh] w-[88vw] max-w-5xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={img(images[active], 2000, 85)}
                alt={`Elyse Residence gallery image ${active + 1}`}
                fill
                sizes="88vw"
                className="object-contain"
              />
              <span className="absolute -bottom-9 left-0 font-sans text-xs uppercase tracking-widest2 text-cream/50">
                {String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </span>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 px-4 font-sans text-sm uppercase tracking-widest2 text-cream/70 transition-colors hover:text-gold sm:right-10"
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

function GalleryItem({
  id,
  index,
  onClick,
  tall,
}: {
  id: string;
  index: number;
  onClick: () => void;
  tall: boolean;
}) {
  return (
    <button
      onClick={onClick}
      data-cursor="view"
      className={`group relative shrink-0 overflow-hidden ${
        tall ? 'h-[62vh] w-[34vw]' : 'h-[52vh] w-[42vw]'
      }`}
    >
      <Image
        src={img(id, 1400, 80)}
        alt={`Elyse Residence gallery image ${index + 1}`}
        fill
        sizes="40vw"
        className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-charcoal-900/0 transition-colors duration-700 group-hover:bg-charcoal-900/20" />
      <span className="absolute bottom-5 left-5 font-sans text-[0.65rem] uppercase tracking-widest2 text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        {String(index + 1).padStart(2, '0')}
      </span>
    </button>
  );
}
