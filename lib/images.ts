// Curated, real Unsplash photo IDs (luxury architecture / minimal interiors).
// Loaded client-side via next/image; sized with the `w` + quality params.
const U = 'https://images.unsplash.com/';

export const img = (id: string, w = 1600, q = 80) =>
  `${U}${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const IMAGES = {
  hero: 'photo-1600596542815-ffad4c1539a9', // moody modern villa at dusk
  intro: 'photo-1512917774080-9991f1c4c750', // sculptural modern house
  lumiere: 'photo-1600607687939-ce8a6c25118c', // warm minimal living room
  crown: 'photo-1567496898669-ee935f5f647a', // penthouse with skyline
  atelier: 'photo-1600566753086-00f18fb6b3ea', // minimal bedroom suite
  cta: 'photo-1613490493576-7fde63acd811', // architectural exterior at night
  gallery: [
    'photo-1600585154340-be6161a56a0c', // white modern exterior
    'photo-1600210492486-724fe5c67fb0', // calm bedroom
    'photo-1618221195710-dd6b41faaea6', // minimal interior detail
    'photo-1600573472550-8090b5e0745e', // dining / kitchen
    'photo-1571939228382-b2f2b585ce15', // infinity pool
    'photo-1505691938895-1758d7feb511', // textured interior
    'photo-1502672260266-1c1ef2d93688', // bright living space
    'photo-1600585154526-990dced4db0d', // facade detail
  ],
} as const;
