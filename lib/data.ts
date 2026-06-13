import type { Residence } from '@/components/Showcase';
import { IMAGES } from '@/lib/images';

export const RESIDENCES: Residence[] = [
  {
    index: '01 — Residence',
    name: 'Lumière Duplex',
    type: 'Garden Duplex',
    copy: 'Double-height living volumes wrapped in glass, opening onto a private terraced garden. Designed around the path of the afternoon sun, the Lumière collection turns daylight into the principal material.',
    specs: [
      { label: 'Configuration', value: '3 — 4 Bed' },
      { label: 'Interior', value: '3,200 ft²' },
      { label: 'Outdoor', value: '900 ft²' },
      { label: 'Residences', value: 'Six' },
    ],
    image: IMAGES.lumiere,
    alt: 'Warm minimal living room with floor-to-ceiling glazing — Lumière Duplex',
  },
  {
    index: '02 — Residence',
    name: 'Crown Jewel\nPenthouse',
    type: 'Sky Penthouse',
    copy: 'A singular crowning residence spanning the upper two floors, with a wraparound terrace and an infinity edge that dissolves into the skyline. Privacy, elevation, and an uninterrupted horizon.',
    specs: [
      { label: 'Configuration', value: '5 Bed' },
      { label: 'Interior', value: '6,400 ft²' },
      { label: 'Terrace', value: '2,100 ft²' },
      { label: 'Availability', value: 'One' },
    ],
    image: IMAGES.crown,
    alt: 'Penthouse interior overlooking a city skyline at dusk — Crown Jewel Penthouse',
  },
  {
    index: '03 — Residence',
    name: 'Atelier Suites',
    type: 'Studio Residences',
    copy: 'Intimately scaled suites for the considered collector — calm, tactile, and complete. Hand-finished plaster, oak, and stone compose a sanctuary measured in quality rather than square footage.',
    specs: [
      { label: 'Configuration', value: '1 — 2 Bed' },
      { label: 'Interior', value: '1,450 ft²' },
      { label: 'Ceilings', value: '3.4 m' },
      { label: 'Residences', value: 'Five' },
    ],
    image: IMAGES.atelier,
    alt: 'Minimal bedroom suite with natural materials — Atelier Suites',
  },
];

export const STATS = [
  { value: '60', suffix: '%', label: 'Landscaped green space across the estate' },
  { value: '150', suffix: 'k', label: 'Square feet of considered architecture' },
  { value: '24', suffix: '/7', label: 'Private concierge & residence management' },
  { value: '12', suffix: '', label: 'Architecturally distinct residences' },
];

export const AMENITIES = [
  'Subterranean wellness spa & 25m pool',
  'Residents-only library and screening room',
  'Valet parking with EV charging',
  'Private dining room & catering kitchen',
  'Landscaped roof gardens by SLA',
  'Biometric security & 24/7 concierge',
];
