import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { Preloader } from '@/components/Preloader';
import { CustomCursor } from '@/components/CustomCursor';

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
  metadataBase: new URL('https://elyse-residence.example'),
  title: 'Elyse Residence — A New Standard of Living',
  description:
    'Elyse Residence is a collection of rare, architecturally distinct homes — moody, minimal, and quietly extraordinary. Book a private visit.',
  keywords: [
    'luxury real estate',
    'Elyse Residence',
    'penthouse',
    'duplex residences',
    'architecture',
  ],
  openGraph: {
    title: 'Elyse Residence — A New Standard of Living',
    description:
      'A collection of rare, architecturally distinct homes. Book a private visit.',
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
      </body>
    </html>
  );
}
