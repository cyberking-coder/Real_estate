'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MEDIA, asset } from '@/lib/images';
import { HERO, HERO_STATS, BRAND } from '@/lib/data';

const EASE = [0.16, 1, 0.3, 1] as const;
// Hero content enters just as the preloader curtain lifts.
const INTRO_DELAY = 1.95;

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '32%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] w-full overflow-hidden">
      {/* Parallax background image */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 h-full w-full">
        <Image
          src={asset(MEDIA.clubhouse)}
          alt={`${BRAND.name} — the lit entrance at dusk`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Tonal overlays — dark on the left for legibility, lighter on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900 via-charcoal-900/55 to-charcoal-900/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-charcoal-900/40" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="container-luxe relative z-10 flex h-full flex-col"
      >
        <div className="flex flex-1 flex-col justify-center pt-24">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: INTRO_DELAY }}
            className="mb-7 max-w-fit"
          >
            <p className="flex items-center gap-2 font-sans text-[0.7rem] uppercase tracking-widest2 text-gold">
              <PinIcon />
              {HERO.eyebrow}
            </p>
            <span className="mt-3 block h-px w-full bg-gradient-to-r from-gold to-transparent" />
          </motion.div>

          {/* Headline */}
          <h1 className="max-w-[16ch] font-serif text-[14vw] font-light leading-[0.9] tracking-tightest text-cream sm:text-[10vw] lg:text-[6.5rem]">
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

          {/* Lotus divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, ease: EASE, delay: INTRO_DELAY + 0.4 }}
            className="mt-8 flex max-w-md origin-left items-center gap-4"
          >
            <span className="h-px flex-1 bg-cream/25" />
            <Lotus />
            <span className="h-px flex-1 bg-cream/25" />
          </motion.div>

          {/* Subtext + RERA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: INTRO_DELAY + 0.5 }}
          >
            <p className="mt-8 max-w-md font-sans text-base font-light leading-relaxed text-cream/75">
              {HERO.subtext}
            </p>
            <p className="mt-5 font-sans text-[0.7rem] uppercase tracking-widest2 text-cream/45">
              MahaRERA Reg. No. {BRAND.rera}
            </p>
          </motion.div>

          {/* Download Brochure */}
          <motion.a
            href={BRAND.brochureUrl}
            data-cursor="grow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: INTRO_DELAY + 0.6 }}
            className="group mt-9 inline-flex w-fit items-center gap-3 rounded-full bg-gradient-to-b from-gold-light to-gold-dark px-8 py-4 font-sans text-xs uppercase tracking-widest2 text-charcoal shadow-lg shadow-gold-dark/20 transition-all duration-500 ease-luxe hover:shadow-gold/40"
          >
            <DownloadIcon />
            Download Brochure
          </motion.a>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: INTRO_DELAY + 0.75 }}
          className="mb-10 hidden w-fit items-stretch gap-2 rounded-2xl border border-cream/15 bg-charcoal-900/40 p-2 backdrop-blur-md sm:flex"
        >
          {HERO_STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="flex items-center gap-4 px-6 py-3">
                <span className="text-gold">
                  <StatIcon name={stat.icon} />
                </span>
                <span className="flex flex-col">
                  <span className="font-serif text-2xl font-light leading-none text-cream">
                    {stat.value}
                  </span>
                  <span className="mt-1 font-sans text-[0.65rem] uppercase tracking-widest text-cream/55">
                    {stat.label}
                  </span>
                </span>
              </div>
              {i < HERO_STATS.length - 1 && <span className="my-2 w-px bg-cream/15" />}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll to explore */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: INTRO_DELAY + 0.9 }}
        style={{ opacity: fade }}
        className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      >
        <MouseIcon />
        <span className="font-sans text-[0.6rem] uppercase tracking-widest2 text-cream/55">
          Scroll to Explore
        </span>
      </motion.div>
    </section>
  );
}

/* ── Icons ─────────────────────────────────────────────────────────────── */
function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-500 ease-luxe group-hover:translate-y-0.5">
      <path d="M12 3v12M7 11l5 5 5-5M5 21h14" />
    </svg>
  );
}
function Lotus() {
  return (
    <svg width="34" height="20" viewBox="0 0 34 20" fill="none" stroke="#c9a876" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 18c0-5 0-9 0-15M17 18c-3-2-6-5-6-10 3 1 5 4 6 7M17 18c3-2 6-5 6-10-3 1-5 4-6 7M17 18c-5-1-9-3-11-7 4-1 8 1 11 4M17 18c5-1 9-3 11-7-4-1-8 1-11 4" />
    </svg>
  );
}
function MouseIcon() {
  return (
    <span className="flex h-9 w-6 items-start justify-center rounded-full border border-cream/40 p-1.5">
      <motion.span
        className="h-1.5 w-1 rounded-full bg-gold"
        animate={{ y: [0, 7, 0], opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
      />
    </span>
  );
}
function StatIcon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  if (name === 'building')
    return (
      <svg {...common}>
        <path d="M4 21V6l7-3 7 3v15M4 21h14M9 9h.01M9 13h.01M9 17h.01M14 9h.01M14 13h.01M14 17h.01" />
      </svg>
    );
  if (name === 'home')
    return (
      <svg {...common}>
        <path d="M4 11 12 4l8 7M6 9v11h12V9M10 20v-5h4v5" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
