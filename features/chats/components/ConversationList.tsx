"use client";

import React from 'react';
import { ChatThread } from '@/types';
import { ConversationItem } from './ConversationItem';
import { ChatFilterTabs } from './ChatFilterTabs';
import { SearchBar } from '@/features/marketplace/components/SearchBar';
import { ChatFilterTab, getUnreadCount } from '../lib/conversation-utils';

export interface ConversationListProps {
  threads: ChatThread[];
  activeThreadId: string | null;
  onSelectThread: (threadId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterTab: ChatFilterTab;
  onFilterTabChange: (tab: ChatFilterTab) => void;
  allThreads: ChatThread[];
}

export function ConversationList({
  threads,
  activeThreadId,
  onSelectThread,
  searchQuery,
  onSearchChange,
  filterTab,
  onFilterTabChange,
  allThreads,
}: ConversationListProps) {
  const unreadCount = getUnreadCount(allThreads);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Search Input */}
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search conversations..."
      />

      {/* Filter Tabs */}
      <ChatFilterTabs
        activeTab={filterTab}
        onSelectTab={onFilterTabChange}
        unreadCount={unreadCount}
      />

      {/* Threads List Container */}
      <div
        className="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1"
        role="region"
        aria-label="Conversation list"
      >
        {threads.length === 0 ? (
          <div className="py-8 text-center text-xs text-gray-400 font-semibold bg-slate-50 rounded-2xl border border-dashed border-gray-200 p-4">
            No conversations match your filter.
          </div>
        ) : (
          threads.map((thread) => (
            <ConversationItem
              key={thread.id}
              thread={thread}
              isActive={thread.id === activeThreadId}
              onSelect={() => onSelectThread(thread.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
