import React from 'react';
import Image from 'next/image';
import { ChatThread } from '@/types';
import { formatMessageTimestamp } from '../lib/message-utils';

export interface ConversationItemProps {
  thread: ChatThread;
  isActive: boolean;
  onSelect: () => void;
}

export function ConversationItem({
  thread,
  isActive,
  onSelect,
}: ConversationItemProps) {
  const lastMsg = thread.messages[thread.messages.length - 1];

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-selected={isActive}
      className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-3.5 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] ${
        isActive
          ? 'bg-[#E8F5EE] border-[#128A4E]/30 shadow-2xs'
          : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-slate-50/60'
      }`}
    >
      {/* Unread Indicator Dot */}
      {thread.unread && (
        <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-[#128A4E] rounded-full ring-2 ring-white" />
      )}

      {/* Avatar & Online Dot */}
      <div className="relative shrink-0">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-100 bg-gray-100">
          {thread.partner.photoUrl ? (
            <Image
              src={thread.partner.photoUrl}
              alt={thread.partner.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-gray-400 text-sm">
              {thread.partner.name.charAt(0)}
            </div>
          )}
        </div>
        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#128A4E] rounded-full ring-2 ring-white" />
      </div>

      {/* Info Container */}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <div className="flex justify-between items-center pr-3">
          <h4 className="text-xs sm:text-sm font-extrabold text-[#0F172A] truncate">
            {thread.partner.name}
          </h4>
          <span className="text-[10px] text-gray-400 font-semibold shrink-0">
            {formatMessageTimestamp(lastMsg?.timestamp || '')}
          </span>
        </div>

        <p className="text-xs text-gray-500 font-medium truncate">
          {lastMsg?.text || 'No messages yet'}
        </p>

        {thread.roomListing && (
          <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-[#128A4E] bg-white px-2 py-0.5 rounded-md border border-[#128A4E]/20 self-start mt-1 truncate max-w-full">
            🏢 {thread.roomListing.title}
          </span>
        )}
      </div>
    </button>
  );
}
