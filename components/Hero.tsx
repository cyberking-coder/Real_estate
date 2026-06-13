'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { IMAGES, img } from '@/lib/images';
import { HERO, BRAND } from '@/lib/data';

const EASE = [0.16, 1, 0.3, 1] as const;
// Hero content enters just as the preloader curtain lifts.
const INTRO_DELAY = 1.95;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] w-full overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 h-full w-full">
        <Image
          src={img(IMAGES.hero, 2400, 80)}
          alt={`${BRAND.name} — residential towers at dusk`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Tonal overlays for legibility + mood */}
      <motion.div
        className="absolute inset-0 bg-charcoal-900"
        style={{ opacity: overlay }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/10 to-charcoal-900/60" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="container-luxe relative z-10 flex h-full flex-col justify-end pb-[12vh]"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: INTRO_DELAY }}
          className="eyebrow mb-6 flex items-center gap-3"
        >
          <span className="inline-block h-px w-10 bg-gold" />
          {HERO.eyebrow}
        </motion.p>

        <h1 className="max-w-[16ch] font-serif text-[13vw] font-light leading-[0.9] tracking-tightest text-cream sm:text-[10vw] lg:text-8xl">
          {HERO.headline.map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, ease: EASE, delay: INTRO_DELAY + i * 0.12 }}
              >
                {word === HERO.accent ? (
                  <em className="font-light not-italic text-gold">{word}</em>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: INTRO_DELAY + 0.45 }}
            className="max-w-md font-sans text-base font-light leading-relaxed text-cream/70"
          >
            {HERO.subtext}
            <span className="mt-4 block text-[0.7rem] uppercase tracking-widest2 text-cream/45">
              MahaRERA Reg. No. {BRAND.rera}
            </span>
          </motion.p>

          <motion.a
            href={BRAND.brochureUrl}
            data-cursor="grow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: INTRO_DELAY + 0.55 }}
            className="group flex items-center gap-4 whitespace-nowrap rounded-full bg-cream px-8 py-4 font-sans text-xs uppercase tracking-widest2 text-charcoal transition-colors duration-500 ease-luxe hover:bg-gold"
          >
            Download Brochure
            <span className="transition-transform duration-500 ease-luxe group-hover:translate-x-1">→</span>
          </motion.a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: INTRO_DELAY + 0.8 }}
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      >
        <span className="font-sans text-[0.6rem] uppercase tracking-widest2 text-cream/50">
          Scroll
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-cream/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gold"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
          />
        </span>
      </motion.div>
    </section>
  );
}
