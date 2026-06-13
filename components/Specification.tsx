'use client';

import { Reveal } from '@/components/motion/Reveal';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { AmenityIcon } from '@/components/AmenityIcon';
import { SPECIFICATIONS } from '@/lib/data';

export function Specification() {
  return (
    <section id="specification" className="bg-charcoal py-section">
      <div className="container-luxe">
        <div className="mb-16 max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-6">— Specification</p>
          </Reveal>
          <SplitReveal
            as="h2"
            text="Built to a higher standard."
            className="font-serif text-4xl font-light leading-[1.05] tracking-tightest text-cream sm:text-5xl"
            stagger={0.06}
          />
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden bg-cream/10 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIFICATIONS.map((spec, i) => (
            <Reveal key={spec.title} delay={(i % 3) * 0.08} className="bg-charcoal">
              <div className="flex h-full flex-col gap-6 p-9 sm:p-10">
                <span className="flex h-12 w-12 items-center justify-center text-gold">
                  <AmenityIcon name={spec.icon} className="h-8 w-8" />
                </span>
                <h3 className="font-serif text-2xl font-light text-cream">{spec.title}</h3>
                <ul className="mt-auto flex flex-col gap-3">
                  {spec.lines.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-3 font-sans text-sm font-light leading-relaxed text-cream/65"
                    >
                      <span className="mt-2 h-px w-4 shrink-0 bg-gold/70" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
