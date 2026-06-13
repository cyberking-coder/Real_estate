// Real Unsplash photo IDs used as PLACEHOLDERS for the project renders.
// Loaded client-side via next/image. Swap these for the actual Basil
// Vrundavan renders/photography when available.
const U = 'https://images.unsplash.com/';

export const img = (id: string, w = 1600, q = 80) =>
  `${U}${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const IMAGES = {
  hero: 'photo-1600596542815-ffad4c1539a9', // building exterior at dusk
  intro: 'photo-1512917774080-9991f1c4c750', // architecture
  ambegaon: 'photo-1567496898669-ee935f5f647a', // towers / skyline
  clubhouse: 'photo-1600607687939-ce8a6c25118c', // clubhouse interior / lounge
  amenities: 'photo-1571939228382-b2f2b585ce15', // pool / outdoor amenity
  contact: 'photo-1613490493576-7fde63acd811', // architectural exterior at night
  gallery: [
    'photo-1571939228382-b2f2b585ce15', // infinity pool
    'photo-1600607687939-ce8a6c25118c', // clubhouse lounge
    'photo-1600585154340-be6161a56a0c', // facade
    'photo-1600573472550-8090b5e0745e', // dining / kitchen
    'photo-1505691938895-1758d7feb511', // textured interior
    'photo-1600210492486-724fe5c67fb0', // calm bedroom
    'photo-1502672260266-1c1ef2d93688', // bright living space
    'photo-1600585154526-990dced4db0d', // facade detail
  ],
} as const;
