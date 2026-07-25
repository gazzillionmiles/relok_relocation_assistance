import React from 'react';
import Image from 'next/image';
import { ChatThread } from '@/types';
import { ListingContextCard } from './ListingContextCard';
import { CompatibilityBadge } from '@/features/marketplace/components/CompatibilityBadge';

export interface ChatRightPanelProps {
  thread: ChatThread;
}

export function ChatRightPanel({ thread }: ChatRightPanelProps) {
  const { partner, roomListing } = thread;

  return (
    <aside className="w-full bg-white border-l border-gray-100 p-6 flex flex-col gap-6 overflow-y-auto h-full">
      {/* Partner Avatar & Profile Summary */}
      <div className="flex flex-col items-center text-center gap-3 pb-4 border-b border-gray-100">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-100 shadow-sm">
          {partner.photoUrl ? (
            <Image
              src={partner.photoUrl}
              alt={partner.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-gray-400 text-xl">
              {partner.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-0.5">
          <h3 className="text-base font-extrabold text-[#0F172A]">{partner.name}</h3>
          <p className="text-xs text-gray-500 font-medium">
            {partner.age} yrs • {partner.occupation.split(' at ')[0]}
          </p>
          <p className="text-xs text-gray-400 font-semibold">{partner.city}</p>
        </div>

        <CompatibilityBadge score={partner.matchPercentage || 92} />
      </div>

      {/* Property Listing Context (if applicable) */}
      {roomListing && (
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
            Inquired Listing
          </span>
          <ListingContextCard roomListing={roomListing} />
        </div>
      )}

      {/* Bio Quote */}
      <div className="flex flex-col gap-1.5 bg-slate-50 p-4 rounded-2xl border border-gray-100">
        <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
          About {partner.name.split(' ')[0]}
        </span>
        <p className="text-xs text-gray-600 font-normal italic leading-relaxed">
          &quot;{partner.bio}&quot;
        </p>
      </div>

      {/* Lifestyle Traits Tags */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
          Lifestyle Alignment
        </span>
        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs bg-[#E8F5EE] text-[#128A4E] font-bold px-2.5 py-1 rounded-lg">
            ⏰ {partner.sleepSchedule}
          </span>
          <span className="text-xs bg-[#E8F5EE] text-[#128A4E] font-bold px-2.5 py-1 rounded-lg">
            ✨ {partner.cleanliness}
          </span>
          <span className="text-xs bg-[#E8F5EE] text-[#128A4E] font-bold px-2.5 py-1 rounded-lg">
            🥦 {partner.dietary}
          </span>
        </div>
      </div>
    </aside>
  );
}
