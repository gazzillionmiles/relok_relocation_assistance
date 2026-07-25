import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChatThread } from '@/types';

export interface LeadCardProps {
  chat: ChatThread;
}

export function LeadCard({ chat }: LeadCardProps) {
  const lastMsg = chat.messages[chat.messages.length - 1];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-2xs flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100 bg-gray-100 shrink-0">
          {chat.partner.photoUrl ? (
            <Image
              src={chat.partner.photoUrl}
              alt={chat.partner.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-gray-400 text-xs">
              {chat.partner.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex justify-between items-center">
            <span className="text-xs font-extrabold text-[#0F172A] truncate">
              {chat.partner.name}
            </span>
            <span className="text-[10px] text-gray-400 font-semibold">
              {lastMsg?.timestamp || 'Today'}
            </span>
          </div>
          <span className="text-[10px] text-gray-400 font-semibold">
            {chat.partner.occupation}
          </span>
        </div>
      </div>

      {chat.roomListing && (
        <div className="bg-slate-50 p-2.5 rounded-xl border border-gray-100 text-xs font-semibold text-gray-600 truncate">
          🏢 Inquired: &quot;{chat.roomListing.title}&quot;
        </div>
      )}

      <p className="text-xs text-gray-600 italic font-normal truncate">
        &quot;{lastMsg?.text || 'New customer inquiry'}&quot;
      </p>

      <div className="pt-2 border-t border-gray-100 flex justify-end">
        <Link
          href="/chats"
          className="text-xs font-extrabold text-[#128A4E] bg-[#E8F5EE] hover:bg-[#128A4E] hover:text-white px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
        >
          Open Chat Inquiry →
        </Link>
      </div>
    </div>
  );
}
