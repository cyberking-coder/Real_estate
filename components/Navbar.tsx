'use client';

import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { NAV_LINKS as LINKS, BRAND } from '@/lib/data';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80);
  });

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-700 ease-luxe ${
          scrolled
            ? 'border-b border-cream/10 bg-charcoal-900/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="container-luxe flex items-center justify-between py-5">
          <a
            href="#top"
            data-cursor="grow"
            className="flex items-baseline gap-2 font-serif text-xl tracking-tightest text-cream transition-opacity hover:opacity-70 sm:text-2xl"
          >
            {BRAND.short}<span className="text-gold">.</span>
            <span className="font-sans text-[0.6rem] uppercase tracking-widest2 text-cream/50">
              {BRAND.tagline}
            </span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-cursor="grow"
                  className="group relative font-sans text-sm font-light text-cream/80 transition-colors hover:text-cream"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 ease-luxe group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href={BRAND.brochureUrl}
              data-cursor="grow"
              className="hidden whitespace-nowrap rounded-full border border-cream/25 px-6 py-2.5 font-sans text-xs uppercase tracking-widest2 text-cream transition-all duration-500 ease-luxe hover:border-gold hover:bg-gold hover:text-charcoal lg:inline-block"
            >
              Brochure
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              data-cursor="grow"
              aria-label="Toggle menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span
                className={`h-px w-6 bg-cream transition-all duration-300 ${open ? 'translate-y-[3px] rotate-45' : ''}`}
              />
              <span
                className={`h-px w-6 bg-cream transition-all duration-300 ${open ? '-translate-y-[3px] -rotate-45' : ''}`}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-charcoal-900 px-8 lg:hidden"
          >
            <ul className="flex flex-col gap-2">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: EASE }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-5xl tracking-tightest text-cream"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={BRAND.brochureUrl}
              onClick={() => setOpen(false)}
              className="mt-12 inline-block w-fit rounded-full border border-gold px-8 py-3 font-sans text-xs uppercase tracking-widest2 text-gold"
            >
              Download Brochure
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
