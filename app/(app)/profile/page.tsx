import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { ProfileView } from '@/features/profile/components/ProfileView';

export const metadata = {
  title: 'Profile & Settings — RELOK',
  description: 'Manage your personal attributes, lifestyle preferences, and account settings.',
};

export default function ProfilePage() {
  return (
    <PageContainer>
      <ProfileView />
    </PageContainer>
  );
}
