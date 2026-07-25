"use client";

import React from 'react';
import { ChatFilterTab } from '../lib/conversation-utils';

export interface ChatFilterTabsProps {
  activeTab: ChatFilterTab;
  onSelectTab: (tab: ChatFilterTab) => void;
  unreadCount?: number;
}

export function ChatFilterTabs({
  activeTab,
  onSelectTab,
  unreadCount = 0,
}: ChatFilterTabsProps) {
  const tabs: { key: ChatFilterTab; label: string; badge?: number }[] = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: 'Unread', badge: unreadCount },
    { key: 'matches', label: 'Matches' },
    { key: 'messages', label: 'Inquiries' },
  ];

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onSelectTab(tab.key)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] ${
            activeTab === tab.key
              ? 'bg-[#128A4E] text-white shadow-2xs'
              : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
          }`}
        >
          <span>{tab.label}</span>
          {tab.badge !== undefined && tab.badge > 0 && (
            <span className="ml-1.5 bg-white text-[#128A4E] text-[10px] font-black px-1.5 py-0.5 rounded-full">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
