"use client";

import React, { useState } from 'react';
import { useChatState } from '../hooks/useChatState';
import { ConversationList } from './ConversationList';
import { ChatWindow } from './ChatWindow';
import { ChatRightPanel } from './ChatRightPanel';
import { ChatEmptyState } from './ChatEmptyState';

export function ChatView() {
  const {
    activeThread,
    activeThreadId,
    filteredThreads,
    searchQuery,
    setSearchQuery,
    filterTab,
    setFilterTab,
    isTyping,
    selectThread,
    sendMessage,
    threads,
    setActiveThreadId,
  } = useChatState();

  // Mobile state: whether active thread is open on small screens
  const [mobileThreadOpen, setMobileThreadOpen] = useState<boolean>(false);

  const handleSelectThreadMobile = (threadId: string) => {
    selectThread(threadId);
    setMobileThreadOpen(true);
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] min-h-[500px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden my-1">
      {/* 3-Section WhatsApp Web Style Desktop Layout / 2-Pane Tablet / Stacked Mobile */}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-12">
        {/* Left Column: Conversation List (Visible always on Tablet/Desktop; hidden on Mobile when thread open) */}
        <div
          className={`h-full p-3 sm:p-4 border-r border-gray-100 md:col-span-4 lg:col-span-4 xl:col-span-3 overflow-hidden ${
            mobileThreadOpen ? 'hidden md:block' : 'block'
          }`}
        >
          <ConversationList
            threads={filteredThreads}
            activeThreadId={activeThreadId}
            onSelectThread={(id) => {
              handleSelectThreadMobile(id);
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterTab={filterTab}
            onFilterTabChange={setFilterTab}
            allThreads={threads}
          />
        </div>

        {/* Center Column: Chat Window (Visible always on Tablet/Desktop; on Mobile visible when thread open) */}
        <div
          className={`h-full md:col-span-8 lg:col-span-5 xl:col-span-6 border-r border-gray-100 flex flex-col justify-between overflow-hidden ${
            !mobileThreadOpen && 'hidden md:flex'
          }`}
        >
          {activeThread ? (
            <ChatWindow
              thread={activeThread}
              isTyping={isTyping}
              onSendMessage={sendMessage}
              onBackMobile={() => setMobileThreadOpen(false)}
            />
          ) : (
            <div className="p-8 my-auto">
              <ChatEmptyState />
            </div>
          )}
        </div>

        {/* Right Column: Listing & Profile Context Panel (Visible on Desktop >=1024px) */}
        <div className="hidden lg:block lg:col-span-3 xl:col-span-3 h-full overflow-hidden">
          {activeThread ? (
            <ChatRightPanel thread={activeThread} />
          ) : (
            <div className="p-6 h-full flex items-center justify-center text-center text-xs text-gray-400">
              Select a conversation to view listing details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
