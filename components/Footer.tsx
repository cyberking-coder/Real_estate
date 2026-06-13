'use client';

import { Reveal } from '@/components/motion/Reveal';

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'Residences', href: '#residences' },
      { label: 'Amenities', href: '#amenities' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Book a Visit', href: '#visit' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: '+44 (0)20 7000 0000', href: 'tel:+442070000000' },
      { label: 'hello@elyse.residence', href: 'mailto:hello@elyse.residence' },
      { label: '14 Garden Crescent, W1', href: '#visit' },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'Instagram', href: '#' },
      { label: 'Pinterest', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-charcoal-900 pt-section">
      <div className="container-luxe">
        <div className="grid grid-cols-1 gap-14 pb-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-6">— A New Standard of Living</p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="max-w-sm font-serif text-3xl font-light leading-tight tracking-tightest text-cream sm:text-4xl">
                Register your interest for the final release of residences.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href="#visit"
                data-cursor="grow"
                className="group mt-8 inline-flex items-center gap-3 font-sans text-xs uppercase tracking-widest2 text-cream"
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

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {COLUMNS.map((col, i) => (
              <Reveal key={col.title} delay={i * 0.07}>
                <h3 className="mb-6 font-sans text-[0.65rem] uppercase tracking-widest2 text-cream/40">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        data-cursor="grow"
                        className="font-sans text-sm font-light text-cream/70 transition-colors duration-300 hover:text-gold"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="overflow-hidden border-t border-cream/10 pt-10">
          <Reveal y={30}>
            <h2 className="select-none font-serif text-[22vw] font-light leading-[0.8] tracking-tightest text-cream/90 lg:text-[16vw]">
              Elyse<span className="text-gold">.</span>
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col gap-3 border-t border-cream/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs font-light text-cream/40">
            © {new Date().getFullYear()} Elyse Residence. A fictional showcase.
          </p>
          <div className="flex gap-6 font-sans text-xs font-light text-cream/40">
            <a href="#" className="transition-colors hover:text-cream" data-cursor="grow">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-cream" data-cursor="grow">
              Terms
            </a>
            <span>Designed with intent.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
