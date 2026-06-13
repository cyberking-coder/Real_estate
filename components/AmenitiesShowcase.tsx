'use client';

import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  type Variants,
} from 'framer-motion';
import { useRef, useState } from 'react';
import { AMENITY_SCENES } from '@/lib/data';
import { asset } from '@/lib/images';
import { Reveal } from '@/components/motion/Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;
const SCENES = AMENITY_SCENES;

// ── Image reveal: a clip "curtain" wipe + inner Ken-Burns scale ──────────────
const backClip: Variants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.2, ease: EASE } },
  exit: { clipPath: 'inset(100% 0% 0% 0%)', transition: { duration: 0.8, ease: EASE } },
};
const frontClip: Variants = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.2, ease: EASE } },
  exit: { clipPath: 'inset(0% 0% 0% 100%)', transition: { duration: 0.8, ease: EASE } },
};
const kenBurns: Variants = {
  hidden: { scale: 1.18 },
  show: { scale: 1, transition: { duration: 1.6, ease: EASE } },
  exit: { scale: 1.06, transition: { duration: 0.8, ease: EASE } },
};
const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
  exit: { transition: { staggerChildren: 0.08, staggerDirection: -1 } },
};

// ── Text reveal: masked line-by-line rise ────────────────────────────────────
const textWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};
const lineV: Variants = {
  hidden: { y: '115%' },
  show: { y: '0%', transition: { duration: 0.9, ease: EASE } },
  exit: { y: '-115%', transition: { duration: 0.5, ease: EASE } },
};
const fadeV: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.4, ease: EASE } },
};

function MaskedTitle({ title }: { title: string }) {
  return (
    <h3 className="font-serif text-5xl font-light uppercase leading-[0.98] tracking-tightest text-cream lg:text-[4.4rem]">
      {title.split('\n').map((line) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span variants={lineV} className="block">
            {line}
          </motion.span>
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
        style={{ height: `${SCENES.length * 110}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {/* ghosted scene index */}
          <div className="pointer-events-none absolute inset-y-0 right-[6%] flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 0.05, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="font-serif text-[34vw] leading-none tracking-tightest text-cream"
              >
                {index + 1}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="container-luxe relative grid w-full grid-cols-12 items-center gap-16">
            {/* Text */}
            <div className="col-span-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  variants={textWrap}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <motion.p variants={fadeV} className="eyebrow mb-6 flex items-center gap-3">
                    <span className="inline-block h-px w-8 bg-gold" />
                    {scene.eyebrow}
                  </motion.p>
                  <MaskedTitle title={scene.title} />
                  <motion.p
                    variants={fadeV}
                    className="mt-7 max-w-sm font-sans text-base font-light leading-relaxed text-cream/60"
                  >
                    {scene.copy}
                  </motion.p>
                </motion.div>
              </AnimatePresence>

              {/* progress */}
              <div className="mt-12 flex items-center gap-5">
                <span className="font-serif text-sm italic text-gold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-1 flex-col gap-2">
                  {SCENES.map((_, i) => (
                    <span key={i} className="relative h-px w-full overflow-hidden bg-cream/12">
                      <motion.span
                        className="absolute inset-0 origin-left bg-gold"
                        initial={false}
                        animate={{ scaleX: i === index ? 1 : i < index ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                      />
                    </span>
                  ))}
                </div>
                <span className="font-sans text-[0.65rem] tracking-widest2 text-cream/40">
                  {String(SCENES.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Overlapping images */}
            <div className="relative col-span-8 h-[76vh]">
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
                    variants={backClip}
                    onClick={() => onView(scene.images[0])}
                    data-cursor="view"
                    className="group absolute right-0 top-0 h-[80%] w-[66%] overflow-hidden"
                    aria-label="View amenity image"
                  >
                    <motion.span variants={kenBurns} className="absolute inset-0 block">
                      <Image
                        src={asset(scene.images[0])}
                        alt={scene.title.replace('\n', ' ')}
                        fill
                        sizes="50vw"
                        className="object-cover"
                      />
                    </motion.span>
                    <span className="absolute inset-0 bg-charcoal-900/10 transition-colors duration-500 group-hover:bg-charcoal-900/35" />
                    <ViewBadge />
                  </motion.button>

                  {/* front image — bottom left, overlapping */}
                  <motion.button
                    variants={frontClip}
                    onClick={() => onView(scene.images[1])}
                    data-cursor="view"
                    className="group absolute bottom-0 left-0 h-[66%] w-[50%] overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-cream/10"
                    aria-label="View amenity image"
                  >
                    <motion.span variants={kenBurns} className="absolute inset-0 block">
                      <Image
                        src={asset(scene.images[1])}
                        alt={scene.title.replace('\n', ' ')}
                        fill
                        sizes="40vw"
                        className="object-cover"
                      />
                    </motion.span>
                    <span className="absolute inset-0 bg-charcoal-900/10 transition-colors duration-500 group-hover:bg-charcoal-900/35" />
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
        {SCENES.map((s) => (
          <Reveal key={s.title} y={50}>
            <div>
              <p className="eyebrow mb-4 flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-gold" />
                {s.eyebrow}
              </p>
              <MaskedTitleStatic title={s.title} />
              <p className="mt-5 max-w-md font-sans text-base font-light leading-relaxed text-cream/60">
                {s.copy}
              </p>
              <div className="relative mt-8 h-[58vh]">
                <button
                  onClick={() => onView(s.images[0])}
                  data-cursor="view"
                  className="absolute right-0 top-0 h-[78%] w-[72%] overflow-hidden"
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

function MaskedTitleStatic({ title }: { title: string }) {
  return (
    <h3 className="font-serif text-4xl font-light uppercase leading-[0.98] tracking-tightest text-cream">
      {title.split('\n').map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </h3>
  );
}

function ViewBadge() {
  return (
    <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 scale-90 opacity-0 transition-all duration-500 ease-luxe group-hover:scale-100 group-hover:opacity-100">
      <span className="flex items-center gap-2 rounded-full border border-cream/70 bg-charcoal-900/30 px-5 py-2.5 font-sans text-[0.65rem] uppercase tracking-widest2 text-cream backdrop-blur-sm">
        View <span aria-hidden>→</span>
      </span>
    </span>
  );
}
