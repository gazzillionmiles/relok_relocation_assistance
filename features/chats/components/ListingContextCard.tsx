import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RoomListing } from '@/types';
import { formatCurrency } from '@/lib/utils';

export interface ListingContextCardProps {
  roomListing: RoomListing;
}

export function ListingContextCard({ roomListing }: ListingContextCardProps) {
  return (
    <div className="bg-[#E8F5EE] border border-[#128A4E]/20 rounded-2xl p-3 flex items-center gap-3 shadow-2xs">
      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white shadow-2xs bg-gray-100">
        {roomListing.images[0] ? (
          <Image
            src={roomListing.images[0]}
            alt={roomListing.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-400">
            🏢
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-extrabold text-[#128A4E] bg-white px-2 py-0.5 rounded-md uppercase tracking-wider">
            Listing Inquiry
          </span>
          <span className="text-xs font-extrabold text-[#128A4E]">
            {formatCurrency(roomListing.rent)}/mo
          </span>
        </div>
        <p className="text-xs font-extrabold text-[#0F172A] truncate mt-0.5">
          {roomListing.title}
        </p>
      </div>

      <Link
        href="/home"
        className="text-[11px] font-extrabold text-[#128A4E] bg-white hover:bg-[#128A4E] hover:text-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-2xs transition-colors shrink-0 cursor-pointer"
      >
        Details →
      </Link>
    </div>
  );
}
