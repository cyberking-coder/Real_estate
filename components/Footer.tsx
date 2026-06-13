'use client';

import { Reveal } from '@/components/motion/Reveal';
import { BRAND } from '@/lib/data';

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Amenities', href: '#amenities' },
      { label: 'Specification', href: '#specification' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Location', href: '#location' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: BRAND.phone, href: `tel:${BRAND.phone.replace(/\s/g, '')}` },
      { label: BRAND.email, href: `mailto:${BRAND.email}` },
      { label: BRAND.location, href: '#location' },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'Instagram', href: '#' },
      { label: 'Facebook', href: '#' },
      { label: 'WhatsApp', href: `https://wa.me/${BRAND.whatsapp}` },
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
              <p className="eyebrow mb-6">— A Community of Culture &amp; Class</p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="max-w-sm font-serif text-3xl font-light leading-tight tracking-tightest text-cream sm:text-4xl">
                Register your interest in {BRAND.name}, {BRAND.locality}.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href="#contact"
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
            <h2 className="select-none font-serif text-[16vw] font-light leading-[0.8] tracking-tightest text-cream/90 lg:text-[11vw]">
              {BRAND.name}<span className="text-gold">.</span>
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col gap-3 border-t border-cream/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs font-light text-cream/40">
            © {new Date().getFullYear()} {BRAND.name}. MahaRERA Reg. No. {BRAND.rera}.
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
