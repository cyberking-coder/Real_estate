import type { Feature } from '@/components/Showcase';
import { MEDIA } from '@/lib/images';

// ─── Brand ────────────────────────────────────────────────────────────────
export const BRAND = {
  name: 'Basil Vrundavan',
  short: 'Basil',
  tagline: 'Vrundavan',
  rera: 'P52100056440',
  location: 'Narhe Ambegaon Rd, Pune',
  locality: 'Ambegaon, Pune',
  phone: '+91 00000 00000', // TODO: replace with real sales number
  whatsapp: '910000000000', // TODO: replace with real WhatsApp number (no +)
  email: 'sales@basilvrundavan.com',
  brochureUrl: '#', // TODO: link the real brochure PDF
};

export const NAV_LINKS = [
  { label: 'About Us', href: '#about' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Specification', href: '#specification' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
  { label: 'Contact Us', href: '#contact' },
];

// ─── Hero ─────────────────────────────────────────────────────────────────
export const HERO = {
  eyebrow: `${BRAND.name} · ${BRAND.locality}`,
  headline: ['Introducing', 'a Culture of', 'Excellence'],
  accent: 'Excellence',
  subtext:
    'Your community of culture & class — a new landmark address rising along Narhe Ambegaon Road, Pune.',
};

// ─── Brand philosophy (intro statement) ─────────────────────────────────────
export const PHILOSOPHY =
  "Here, excellence isn't a mere aspiration — it's ingrained in every brick and every detail. Not just about homes, but about cultivating experiences that redefine the meaning of living well.";

// ─── Showcase features (alternating image + text) ───────────────────────────
export const FEATURES: Feature[] = [
  {
    index: 'About Us',
    name: 'Vibrancy of the\nCulture of Ambegaon',
    type: 'The Neighbourhood',
    copy: 'A neighbourhood teeming with life and energy, with a rich tapestry of experiences waiting to be explored — colourful markets, lively music and bustling cafés. Surrounded by picturesque hills and lush greenery, Ambegaon Katraj encapsulates the very essence of Pune.',
    specs: [
      { label: 'Locale', value: 'Ambegaon Katraj' },
      { label: 'City', value: 'Pune' },
      { label: 'Surroundings', value: 'Hills & Greenery' },
      { label: 'Connectivity', value: 'Katraj · NH-48' },
    ],
    image: MEDIA.ambegaon,
    alt: 'The Basil Vrundavan residential towers set against the Ambegaon skyline',
  },
  {
    index: 'The Clubhouse',
    name: 'A Culture of\nLuxury Lifestyle',
    type: 'Resort-Themed Clubhouse',
    copy: 'Embrace a truly distinctive style with our signature touch. Immerse yourself in a resort-themed clubhouse that transports you to a perpetual holiday ambiance, with an extensive array of outdoor amenities arranged across a sprawling area — an ultimate retreat, accessible every day, just for you.',
    specs: [
      { label: 'Theme', value: 'Resort-Style' },
      { label: 'Access', value: 'Every Day' },
      { label: 'Amenities', value: '24+' },
      { label: 'Setting', value: 'Open-Air' },
    ],
    image: MEDIA.clubhouse,
    alt: 'The resort-themed clubhouse and landscaped entrance plaza at Basil Vrundavan',
  },
];

// ─── Amenities ──────────────────────────────────────────────────────────────
export const AMENITIES_INTRO =
  'Encourage your children to explore the world beyond screens — an optimal setting for their recreational pursuits. Watch as they revel in the freedom of open spaces, uncover the wonders of nature, and delight in the simple pleasures that defined your own happy childhood.';

export type Amenity = { label: string; icon: string };

export const AMENITIES: Amenity[] = [
  { label: 'Party Area', icon: 'party' },
  { label: "Children's Play Area", icon: 'play' },
  { label: 'Senior Citizen Area', icon: 'senior' },
  { label: 'Temple', icon: 'temple' },
  { label: 'Walking Track', icon: 'walk' },
  { label: 'Indoor Games', icon: 'games' },
  { label: 'Baby Pool', icon: 'pool' },
  { label: 'Zumba Hall', icon: 'zumba' },
  { label: 'Directional Signage', icon: 'sign' },
  { label: 'Yoga & Meditation Hall', icon: 'yoga' },
  { label: 'Multipurpose Hall with Pantry', icon: 'hall' },
  { label: 'Table Tennis', icon: 'games' },
  { label: 'Connecting Arbour', icon: 'arbour' },
  { label: 'Swimming Pool with Infinity Edge', icon: 'pool' },
  { label: 'Multipurpose Court', icon: 'court' },
  { label: 'Steam Room', icon: 'steam' },
  { label: 'Buffet Area with Pergola', icon: 'arbour' },
  { label: 'Pool Table', icon: 'games' },
  { label: 'Foosball Table', icon: 'games' },
  { label: 'Sunset Point', icon: 'sunset' },
  { label: 'Outdoor Shower', icon: 'steam' },
  { label: 'Amphitheatre Seating', icon: 'court' },
  { label: 'Floor Games', icon: 'games' },
  { label: 'Stage', icon: 'hall' },
];

// Scroll-pinned amenity "scenes" — text + overlapping images change on scroll.
export type AmenityScene = {
  eyebrow: string;
  title: string; // \n splits into lines
  copy: string;
  images: [string, string];
};

export const AMENITY_SCENES: AmenityScene[] = [
  {
    eyebrow: 'The Clubhouse',
    title: 'Resort-Themed\nClubhouse',
    copy: 'A perpetual holiday ambiance — a sprawling, resort-style clubhouse designed to be your everyday retreat, just steps from your door.',
    images: [MEDIA.clubhouse, '/media/amenities1.jpg'],
  },
  {
    eyebrow: 'Leisure & Wellness',
    title: 'Pool, Gym\n& Steam',
    copy: 'An infinity-edge swimming pool, a fully-equipped fitness studio and a steam room — space to restore, recharge and unwind.',
    images: ['/media/amenities8.jpg', '/media/amenities1.jpg'],
  },
  {
    eyebrow: 'Family & Celebration',
    title: 'Play &\nCelebration',
    copy: "Children's play zones and a sky party terrace, where every occasion — big or small — finds its perfect stage.",
    images: ['/media/amenities5.jpg', '/media/amenities3.jpg'],
  },
  {
    eyebrow: 'The Outdoors',
    title: 'Landscaped\nGardens',
    copy: 'Manicured gardens, a sculpted hedge maze and quiet sunset points, framed by lush greenery across the estate.',
    images: ['/media/amenities7.jpg', '/media/amenities3.jpg'],
  },
];

// ─── Specification ──────────────────────────────────────────────────────────
export type Spec = { title: string; icon: string; lines: string[] };

export const SPECIFICATIONS: Spec[] = [
  {
    title: 'Structure & Masonry',
    icon: 'structure',
    lines: [
      'Earthquake-resistant RCC frame structure',
      'Construction in Mivan technology',
    ],
  },
  {
    title: 'Painting',
    icon: 'paint',
    lines: ['Asian Apex external paint', 'Acrylic paint for all internal walls'],
  },
  {
    title: 'Windows',
    icon: 'window',
    lines: [
      'High-performance glazing for all habitable rooms',
      'Granite full frame for all windows',
    ],
  },
  // TODO: items below are typical placeholders — confirm / replace with the
  // remaining specifications from the brochure.
  {
    title: 'Flooring',
    icon: 'floor',
    lines: ['Vitrified tile flooring in living & bedrooms', 'Anti-skid tiles in balconies'],
  },
  {
    title: 'Kitchen',
    icon: 'kitchen',
    lines: ['Granite platform with stainless-steel sink', 'Designer dado tiles up to lintel'],
  },
  {
    title: 'Doors',
    icon: 'door',
    lines: ['Decorative laminated main door', 'Flush doors for all internal rooms'],
  },
];

// ─── Location ────────────────────────────────────────────────────────────────
export const LOCATION = {
  address: 'Narhe Ambegaon Road, Pune, Maharashtra',
  mapQuery: 'Narhe Ambegaon Road, Pune, Maharashtra',
  intro:
    'Set along Narhe Ambegaon Road, Basil Vrundavan enjoys seamless connectivity to Katraj, the Pune–Satara highway and the city’s key social and business landmarks.',
  // TODO: confirm distances/landmarks with the official location brochure.
  points: [
    { place: 'Katraj Chowk', detail: 'Minutes away' },
    { place: 'Pune–Satara Highway (NH-48)', detail: 'Quick access' },
    { place: 'Schools & Hospitals', detail: 'In the vicinity' },
    { place: 'Pune City Centre', detail: 'Well connected' },
  ],
};
