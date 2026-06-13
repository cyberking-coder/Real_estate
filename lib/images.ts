// Local project media (optimized copies live in /public/media).
// next/image auto-prefixes basePath for string `src`, so pass these raw to
// <Image>. For plain <video>/<iframe>/<img>, wrap the path in asset().

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Prefix a public-folder path with the deploy basePath (for non-next/image tags). */
export const asset = (p: string) => `${BASE}${p}`;

export const MEDIA = {
  heroVideo: '/hero-bg.mp4',
  heroPoster: '/media/ambegaon.jpg',
  ambegaon: '/media/03.jpg',
  clubhouse: '/media/am1.jpg',
  contactBg: '/media/02.jpg',
  gallery: [
    '/media/ambegaon.jpg',
    '/media/ambegao2.jpg',
    '/media/02.jpg',
    '/media/amenities1.jpg',
    '/media/amenities3.jpg',
    '/media/amenities8.jpg',
    '/media/amenities5.jpg',
    '/media/amenities7.jpg',
  ],
  amenityPhotos: [
    { src: '/media/amenities1.jpg', label: 'Rooftop Infinity Pool' },
    { src: '/media/amenities3.jpg', label: 'Sky Party Terrace' },
    { src: '/media/amenities5.jpg', label: "Children's Play Area" },
    { src: '/media/amenities7.jpg', label: 'Landscape Garden & Maze' },
    { src: '/media/amenities8.jpg', label: 'Fitness Centre' },
  ],
} as const;
