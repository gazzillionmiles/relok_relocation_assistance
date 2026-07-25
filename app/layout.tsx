import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/components/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RELOK — Co-Living & Roommate Finder',
  description: 'Find compatible roommates and co-living spaces with ease.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#128A4E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-slate-50 min-h-screen text-[#0F172A] selection:bg-[#128A4E]/30">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
