'use client';

import Image from 'next/image';
import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/motion/Reveal';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { Parallax } from '@/components/motion/Parallax';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { IMAGES, img } from '@/lib/images';

const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', placeholder: 'Your name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@email.com' },
  { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 000 000 0000' },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export function BookVisit() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No backend — surface an elegant confirmation state.
    setSent(true);
  };

  return (
    <section id="visit" className="relative overflow-hidden bg-cream text-charcoal">
      {/* faint architectural backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <Parallax amount={0.12} className="h-full w-full">
          <Image
            src={img(IMAGES.cta, 2000, 70)}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
      </div>

      <div className="container-luxe relative grid grid-cols-1 gap-14 py-section lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="mb-6 font-sans text-[0.7rem] uppercase tracking-widest2 text-gold-dark">
              — Book a Private Visit
            </p>
          </Reveal>
          <SplitReveal
            as="h2"
            by="line"
            text={'Experience\nElyse in\nperson.'}
            className="font-serif text-5xl font-light leading-[0.98] tracking-tightest text-charcoal sm:text-6xl lg:text-7xl"
            stagger={0.09}
          />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md font-sans text-base font-light leading-relaxed text-charcoal/70">
              Private viewings are held by appointment with a dedicated residence
              advisor. Share your details and we will be in touch within one
              business day.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-col gap-1 border-t border-charcoal/15 pt-8 font-sans text-sm font-light text-charcoal/70">
              <span>The Elyse Sales Pavilion</span>
              <span>14 Garden Crescent, London W1</span>
              <a href="tel:+442070000000" className="mt-3 text-charcoal transition-colors hover:text-gold-dark" data-cursor="grow">
                +44 (0)20 7000 0000
              </a>
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <div className="lg:col-span-6 lg:pl-10">
          <Reveal delay={0.1}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex h-full min-h-[20rem] flex-col items-start justify-center border-t border-charcoal/15 pt-10"
                >
                  <span className="font-serif text-4xl font-light italic text-gold-dark">
                    Thank you.
                  </span>
                  <p className="mt-4 max-w-sm font-sans text-base font-light text-charcoal/70">
                    Your request has been received. A residence advisor will contact
                    you shortly to arrange your private visit.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-8 border-t border-charcoal/15 pt-10"
                >
                  {FIELDS.map((field) => (
                    <label key={field.name} className="group flex flex-col gap-2">
                      <span className="font-sans text-[0.65rem] uppercase tracking-widest2 text-charcoal/50">
                        {field.label}
                      </span>
                      <input
                        required
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        className="border-b border-charcoal/25 bg-transparent pb-3 font-sans text-lg font-light text-charcoal placeholder:text-charcoal/30 transition-colors duration-500 focus:border-gold-dark focus:outline-none"
                      />
                    </label>
                  ))}

                  <label className="flex flex-col gap-2">
                    <span className="font-sans text-[0.65rem] uppercase tracking-widest2 text-charcoal/50">
                      Residence of interest
                    </span>
                    <select
                      name="residence"
                      className="border-b border-charcoal/25 bg-transparent pb-3 font-sans text-lg font-light text-charcoal transition-colors duration-500 focus:border-gold-dark focus:outline-none"
                    >
                      <option>Lumière Duplex</option>
                      <option>Crown Jewel Penthouse</option>
                      <option>Atelier Suites</option>
                      <option>Undecided</option>
                    </select>
                  </label>

                  <MagneticButton
                    strength={0.35}
                    className="group mt-2 flex w-fit items-center gap-4 rounded-full bg-charcoal px-9 py-4 font-sans text-xs uppercase tracking-widest2 text-cream transition-colors duration-500 ease-luxe hover:bg-gold-dark"
                  >
                    Request a Visit
                    <span className="transition-transform duration-500 ease-luxe group-hover:translate-x-1">
                      →
                    </span>
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
