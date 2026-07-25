import React from 'react';
import Image from 'next/image';
import { RoomListing } from '@/types';
import { formatCurrency } from '@/lib/utils';

export interface ListingCardProps {
  room: RoomListing;
  isDeactivated: boolean;
  onEdit: (room: RoomListing) => void;
  onToggleActive: (id: string) => void;
}

export function ListingCard({
  room,
  isDeactivated,
  onEdit,
  onToggleActive,
}: ListingCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border p-4 shadow-2xs flex flex-col gap-3 transition-all ${
        isDeactivated ? 'border-gray-100 opacity-60' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex gap-3 items-center">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-100 bg-gray-100 shrink-0">
          {room.images[0] ? (
            <Image
              src={room.images[0]}
              alt={room.title}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-gray-400 text-xs">
              🏢
            </div>
          )}
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex justify-between items-start gap-1">
            <h4 className="text-xs font-black text-[#0F172A] truncate flex-1">
              {room.title}
            </h4>
            <span
              className={`text-[9px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wide ${
                isDeactivated
                  ? 'bg-gray-100 text-gray-500'
                  : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
              }`}
            >
              {isDeactivated ? 'Deactivated' : 'Live'}
            </span>
          </div>

          <span className="text-xs font-black text-[#128A4E] mt-0.5">
            {formatCurrency(room.rent)}/mo
          </span>
          <span className="text-[10px] text-gray-400 font-semibold truncate mt-0.5">
            📍 {room.location}
          </span>
        </div>
      </div>

      <div className="flex gap-2 pt-2 border-t border-gray-100 text-xs font-extrabold">
        <button
          type="button"
          onClick={() => onEdit(room)}
          className="text-[#128A4E] hover:underline cursor-pointer"
        >
          ✏️ Edit Details
        </button>
        <span className="text-gray-200">|</span>
        <button
          type="button"
          onClick={() => onToggleActive(room.id)}
          className="text-gray-500 hover:text-red-600 hover:underline cursor-pointer"
        >
          {isDeactivated ? '👁️ Activate Live' : '👁️ Deactivate'}
        </button>
      </div>
    </div>
  );
}
