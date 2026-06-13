import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { IntroStatement } from '@/components/IntroStatement';
import { Showcase } from '@/components/Showcase';
import { Amenities } from '@/components/Amenities';
import { Gallery } from '@/components/Gallery';
import { BookVisit } from '@/components/BookVisit';
import { Footer } from '@/components/Footer';
import { RESIDENCES } from '@/lib/data';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <IntroStatement />

      <div id="residences">
        {RESIDENCES.map((residence, i) => (
          <Showcase key={residence.name} residence={residence} flip={i % 2 === 1} />
        ))}
      </div>

      <Amenities />
      <Gallery />
      <BookVisit />
      <Footer />
    </main>
  );
}
