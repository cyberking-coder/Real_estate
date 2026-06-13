import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { Preloader } from '@/components/Preloader';
import { CustomCursor } from '@/components/CustomCursor';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://basilvrundavan.com'),
  title: 'Basil Vrundavan — A Culture of Excellence | Ambegaon, Pune',
  description:
    'Basil Vrundavan, Narhe Ambegaon Road, Pune — a community of culture & class with a resort-themed clubhouse and 24+ lifestyle amenities. MahaRERA P52100056440.',
  keywords: [
    'Basil Vrundavan',
    'Ambegaon Pune',
    'Narhe Ambegaon Road',
    'luxury apartments Pune',
    'resort themed clubhouse',
    'real estate Pune',
  ],
  openGraph: {
    title: 'Basil Vrundavan — A Culture of Excellence',
    description:
      'A community of culture & class in Ambegaon, Pune. 24+ lifestyle amenities, resort-themed clubhouse. MahaRERA P52100056440.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Preloader />
        <CustomCursor />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
