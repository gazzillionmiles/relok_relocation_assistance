import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { ChatView } from '@/features/chats/components/ChatView';

export const metadata = {
  title: 'Messages & Inquiries — RELOK',
  description: 'Manage conversations with flatmates and property listers.',
};

export default function ChatsPage() {
  return (
    <PageContainer className="!py-2">
      <ChatView />
    </PageContainer>
  );
}
