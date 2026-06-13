'use client';

import { Reveal } from '@/components/motion/Reveal';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { LOCATION } from '@/lib/data';

export function Location() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    LOCATION.mapQuery,
  )}&output=embed`;

  return (
    <section id="location" className="border-t border-cream/10 bg-charcoal-900 py-section">
      <div className="container-luxe grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-6">— Location</p>
          </Reveal>
          <SplitReveal
            as="h2"
            by="line"
            text={'Narhe Ambegaon\nRoad, Pune'}
            className="font-serif text-4xl font-light leading-[1.05] tracking-tightest text-cream sm:text-5xl"
            stagger={0.09}
          />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md font-sans text-base font-light leading-relaxed text-cream/60">
              {LOCATION.intro}
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <dl className="mt-10 border-t border-cream/12">
              {LOCATION.points.map((point) => (
                <div
                  key={point.place}
                  className="flex items-center justify-between gap-6 border-b border-cream/8 py-5"
                >
                  <dt className="font-sans text-base font-light text-cream/85">{point.place}</dt>
                  <dd className="font-sans text-[0.7rem] uppercase tracking-widest2 text-gold">
                    {point.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal y={48} scale={0.97}>
            <div className="relative aspect-[4/3] w-full overflow-hidden ring-1 ring-inset ring-cream/10 lg:aspect-auto lg:h-full">
              <iframe
                title={`Map of ${LOCATION.address}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[20rem] w-full grayscale-[35%] contrast-110"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
