import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { MarketplaceView } from '@/features/marketplace/components/MarketplaceView';

export const metadata = {
  title: 'Home Marketplace — RELOK',
  description: 'Explore available rooms, private flats, and compatible roommates.',
};

export default function HomePage() {
  return (
    <PageContainer>
      <MarketplaceView />
    </PageContainer>
  );
}
