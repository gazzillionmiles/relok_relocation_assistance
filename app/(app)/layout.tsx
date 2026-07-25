import React from 'react';
import { AppShell } from '@/components/layout/AppShell';

export const metadata = {
  title: 'RELOK — Co-Living & Roommate Finder',
  description: 'Find compatible roommates and co-living spaces with ease.',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
