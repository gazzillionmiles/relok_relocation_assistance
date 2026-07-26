import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { MatchesView } from '@/features/matches/components/MatchesView';

export const metadata = {
  title: 'Compatible Roommates — RELOK',
  description: 'Find AI-matched roommate candidates based on your lifestyle, habits, and preferences.',
};

export const dynamic = 'force-dynamic';

export default function MatchesPage() {
  return (
    <PageContainer>
      <MatchesView />
    </PageContainer>
  );
}
