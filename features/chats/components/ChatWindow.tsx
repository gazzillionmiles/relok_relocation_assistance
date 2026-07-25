"use client";

import React from 'react';
import { ChatThread } from '@/types';
import { ChatHeader } from './ChatHeader';
import { ListingContextCard } from './ListingContextCard';
import { MessageList } from './MessageList';
import { MessageComposer } from './MessageComposer';
import { SafetyReminderBanner } from '@/features/safety/components/SafetyReminderBanner';

export interface ChatWindowProps {
  thread: ChatThread;
  isTyping?: boolean;
  onSendMessage: (text: string) => void;
  onBackMobile?: () => void;
}

export function ChatWindow({
  thread,
  isTyping = false,
  onSendMessage,
  onBackMobile,
}: ChatWindowProps) {
  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden relative">
      {/* Header */}
      <ChatHeader partner={thread.partner} onBackMobile={onBackMobile} />

      {/* Safety Reminder Banner */}
      <div className="px-3 pt-3 bg-white shrink-0">
        <SafetyReminderBanner />
      </div>

      {/* Listing Context Banner (if inquiry) */}
      {thread.roomListing && (
        <div className="p-3 bg-slate-50 border-b border-gray-100 shrink-0 mt-2">
          <ListingContextCard roomListing={thread.roomListing} />
        </div>
      )}

      {/* Messages History */}
      <MessageList
        messages={thread.messages}
        partnerName={thread.partner.name}
        isTyping={isTyping}
      />

      {/* Sticky Message Composer */}
      <MessageComposer onSendMessage={onSendMessage} />
    </div>
  );
}
