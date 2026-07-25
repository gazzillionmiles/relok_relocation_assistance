import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PostingWizard } from '@/features/post/components/PostingWizard';

export const metadata = {
  title: 'Post Property Listing — RELOK',
  description: 'Create a professional property listing to find flatmates on Relok.',
};

export default function PostPage() {
  return (
    <PageContainer>
      <PostingWizard />
    </PageContainer>
  );
}
