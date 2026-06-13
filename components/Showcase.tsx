'use client';

import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';
import { Parallax } from '@/components/motion/Parallax';
import { SplitReveal } from '@/components/motion/SplitReveal';

export type Feature = {
  index: string;
  name: string;
  type: string;
  copy: string;
  specs?: { label: string; value: string }[];
  image: string;
  alt: string;
};

export function Showcase({
  residence,
  flip = false,
}: {
  residence: Feature;
  flip?: boolean;
}) {
  return (
    <div className="container-luxe grid grid-cols-1 items-center gap-10 py-section lg:grid-cols-12 lg:gap-16">
      {/* Image */}
      <div className={`lg:col-span-7 ${flip ? 'lg:order-2 lg:col-start-6' : ''}`}>
        <Reveal y={60} scale={0.96} duration={1.3}>
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/11]">
            <Parallax amount={0.16} className="absolute inset-0">
              <Image
                src={residence.image}
                alt={residence.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </Parallax>
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-cream/10" />
            <span className="absolute left-5 top-5 font-sans text-[0.65rem] uppercase tracking-widest2 text-cream/80">
              {residence.type}
            </span>
          </div>
        </Reveal>
      </div>

      {/* Text */}
      <div className={`lg:col-span-5 ${flip ? 'lg:order-1 lg:col-start-1 lg:row-start-1' : ''}`}>
        <Reveal delay={0.05}>
          <span className="font-serif text-sm italic text-gold">{residence.index}</span>
        </Reveal>

        <SplitReveal
          as="h2"
          text={residence.name}
          className="mt-3 font-serif text-4xl font-light leading-[1.02] tracking-tightest text-cream sm:text-5xl lg:text-6xl"
          stagger={0.06}
        />

        <Reveal delay={0.15}>
          <p className="mt-7 max-w-md font-sans text-base font-light leading-relaxed text-cream/65">
            {residence.copy}
          </p>
        </Reveal>

        {residence.specs && residence.specs.length > 0 && (
          <Reveal delay={0.2}>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-cream/12 pt-8">
              {residence.specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="font-sans text-[0.65rem] uppercase tracking-widest2 text-cream/45">
                    {spec.label}
                  </dt>
                  <dd className="mt-1.5 font-serif text-2xl font-light text-cream">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        <Reveal delay={0.25}>
          <a
            href="#contact"
            data-cursor="grow"
            className="group mt-10 inline-flex items-center gap-3 font-sans text-xs uppercase tracking-widest2 text-cream"
          >
            <span className="border-b border-cream/30 pb-1 transition-colors duration-500 group-hover:border-gold group-hover:text-gold">
              Enquire now
            </span>
            <span className="text-gold transition-transform duration-500 ease-luxe group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </div>
  );
}
