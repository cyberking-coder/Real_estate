'use client';

import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  type Variants,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { AMENITY_SCENES } from '@/lib/data';
import { asset } from '@/lib/images';
import { Reveal } from '@/components/motion/Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;
const SCENES = AMENITY_SCENES;

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
  exit: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
};
const imgV: Variants = {
  hidden: { opacity: 0, y: 60, scale: 1.05 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: EASE } },
  exit: { opacity: 0, y: -40, scale: 1.02, transition: { duration: 0.6, ease: EASE } },
};

function TitleLines({ title }: { title: string }) {
  return (
    <h3 className="font-serif text-5xl font-light uppercase leading-[0.98] tracking-tightest text-cream lg:text-6xl">
      {title.split('\n').map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </h3>
  );
}

export function AmenitiesShowcase({ onView }: { onView: (src: string) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(SCENES.length - 1, Math.max(0, Math.floor(v * SCENES.length)));
    setIndex(i);
  });

  const scene = SCENES[index];

  return (
    <>
      {/* Desktop: pinned scroll-telling */}
      <div
        ref={sectionRef}
        className="relative hidden lg:block"
        style={{ height: `${SCENES.length * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="container-luxe grid w-full grid-cols-12 items-center gap-16">
            {/* Text */}
            <div className="col-span-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <p className="eyebrow mb-6 flex items-center gap-3">
                    <span className="inline-block h-px w-8 bg-gold" />
                    {scene.eyebrow}
                  </p>
                  <TitleLines title={scene.title} />
                  <p className="mt-7 max-w-sm font-sans text-base font-light leading-relaxed text-cream/60">
                    {scene.copy}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* progress */}
              <div className="mt-12 flex items-center gap-5">
                <span className="font-serif text-sm italic text-gold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-1 flex-col gap-2">
                  {SCENES.map((_, i) => (
                    <span
                      key={i}
                      className={`h-px w-full origin-left transition-all duration-500 ease-luxe ${
                        i === index ? 'scale-x-100 bg-gold' : 'scale-x-100 bg-cream/15'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-sans text-[0.65rem] tracking-widest2 text-cream/40">
                  {String(SCENES.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Overlapping images */}
            <div className="relative col-span-8 h-[74vh]">
              <AnimatePresence>
                <motion.div
                  key={index}
                  variants={group}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="absolute inset-0"
                >
                  {/* back image — top right */}
                  <motion.button
                    variants={imgV}
                    onClick={() => onView(scene.images[0])}
                    data-cursor="view"
                    className="group absolute right-0 top-0 h-[78%] w-[66%] overflow-hidden"
                    aria-label="View amenity image"
                  >
                    <Image
                      src={asset(scene.images[0])}
                      alt={scene.title.replace('\n', ' ')}
                      fill
                      sizes="50vw"
                      className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-charcoal-900/10 transition-colors duration-500 group-hover:bg-charcoal-900/35" />
                    <ViewBadge />
                  </motion.button>

                  {/* front image — bottom left, overlapping */}
                  <motion.button
                    variants={imgV}
                    onClick={() => onView(scene.images[1])}
                    data-cursor="view"
                    className="group absolute bottom-0 left-0 h-[64%] w-[50%] overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-cream/10"
                    aria-label="View amenity image"
                  >
                    <Image
                      src={asset(scene.images[1])}
                      alt={scene.title.replace('\n', ' ')}
                      fill
                      sizes="40vw"
                      className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-charcoal-900/10 transition-colors duration-500 group-hover:bg-charcoal-900/35" />
                    <ViewBadge />
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: stacked scenes */}
      <div className="flex flex-col gap-20 lg:hidden">
        {SCENES.map((s, i) => (
          <Reveal key={s.title} y={50}>
            <div>
              <p className="eyebrow mb-4 flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-gold" />
                {s.eyebrow}
              </p>
              <TitleLines title={s.title} />
              <p className="mt-5 max-w-md font-sans text-base font-light leading-relaxed text-cream/60">
                {s.copy}
              </p>
              <div className="relative mt-8 h-[58vh]">
                <button
                  onClick={() => onView(s.images[0])}
                  data-cursor="view"
                  className="absolute right-0 top-0 h-[76%] w-[72%] overflow-hidden"
                  aria-label="View amenity image"
                >
                  <Image src={asset(s.images[0])} alt={s.title.replace('\n', ' ')} fill sizes="70vw" className="object-cover" />
                </button>
                <button
                  onClick={() => onView(s.images[1])}
                  data-cursor="view"
                  className="absolute bottom-0 left-0 h-[60%] w-[55%] overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-cream/10"
                  aria-label="View amenity image"
                >
                  <Image src={asset(s.images[1])} alt={s.title.replace('\n', ' ')} fill sizes="55vw" className="object-cover" />
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}

function ViewBadge() {
  return (
    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-90 opacity-0 transition-all duration-500 ease-luxe group-hover:scale-100 group-hover:opacity-100">
      <span className="flex items-center gap-2 rounded-full border border-cream/70 bg-charcoal-900/30 px-5 py-2.5 font-sans text-[0.65rem] uppercase tracking-widest2 text-cream backdrop-blur-sm">
        View <span aria-hidden>→</span>
      </span>
    </span>
  );
}
