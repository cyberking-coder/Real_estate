import { asset } from '@/lib/images';

/** Basil Vrundavan emblem (public/logo.png). */
export function Logo({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={asset('/logo.png')}
      alt="Basil Vrundavan"
      width={112}
      height={82}
      className={className}
    />
  );
}
