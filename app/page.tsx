import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { IntroStatement } from '@/components/IntroStatement';
import { Showcase } from '@/components/Showcase';
import { Amenities } from '@/components/Amenities';
import { Specification } from '@/components/Specification';
import { Gallery } from '@/components/Gallery';
import { Location } from '@/components/Location';
import { BookVisit } from '@/components/BookVisit';
import { Footer } from '@/components/Footer';
import { FEATURES } from '@/lib/data';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <IntroStatement />

      <div>
        {FEATURES.map((feature, i) => (
          <Showcase key={feature.name} residence={feature} flip={i % 2 === 1} />
        ))}
      </div>

      <Amenities />
      <Specification />
      <Gallery />
      <Location />
      <BookVisit />
      <Footer />
    </main>
  );
}
