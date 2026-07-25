import React from 'react';
import Image from 'next/image';
import { RoomListing } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { ListingCard } from './ListingCard';

export interface ListingTableProps {
  rooms: RoomListing[];
  deactivatedIds: string[];
  onEdit: (room: RoomListing) => void;
  onToggleActive: (id: string) => void;
}

export function ListingTable({
  rooms,
  deactivatedIds,
  onEdit,
  onToggleActive,
}: ListingTableProps) {
  if (rooms.length === 0) {
    return (
      <div className="p-6 text-center bg-white rounded-2xl border border-gray-100 text-xs text-gray-400 font-semibold">
        No commercial property listings posted yet.
      </div>
    );
  }
 
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Mobile Card Stack */}
      <div className="flex flex-col gap-2.5 sm:hidden">
        {rooms.map((room) => (
          <ListingCard
            key={room.id}
            room={room}
            isDeactivated={deactivatedIds.includes(room.id)}
            onEdit={onEdit}
            onToggleActive={onToggleActive}
          />
        ))}
      </div>
 
      {/* Desktop & Tablet Table (>=640px) */}
      <div className="hidden sm:block w-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-2xs">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <caption className="sr-only">Managed Commercial Property Listings</caption>
          <thead className="bg-slate-50 border-b border-gray-100 text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
            <tr>
              <th scope="col" className="py-2.5 px-3">
                Property
              </th>
              <th scope="col" className="py-2.5 px-3">
                Location
              </th>
              <th scope="col" className="py-2.5 px-3">
                Monthly Rent
              </th>
              <th scope="col" className="py-2.5 px-3">
                Status
              </th>
              <th scope="col" className="py-2.5 px-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rooms.map((room) => {
              const isDeactivated = deactivatedIds.includes(room.id);
 
               return (
                <tr
                  key={room.id}
                  className={`hover:bg-slate-50/60 transition-colors ${
                    isDeactivated ? 'opacity-60' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 font-bold text-[#0F172A]">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-gray-100 bg-gray-100 shrink-0">
                        {room.images[0] ? (
                          <Image
                            src={room.images[0]}
                            alt={room.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <span className="w-full h-full flex items-center justify-center text-xs">
                            🏢
                          </span>
                        )}
                      </div>
                      <span className="truncate max-w-xs font-extrabold text-[#0F172A] text-xs">
                        {room.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-gray-500 font-medium truncate max-w-[150px] text-xs">
                    📍 {room.location}
                  </td>
                  <td className="py-2.5 px-3 font-black text-[#128A4E] text-xs">
                    {formatCurrency(room.rent)}
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider ${
                        isDeactivated
                          ? 'bg-gray-100 text-gray-500'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                      }`}
                    >
                      {isDeactivated ? 'Deactivated' : 'Live'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold space-x-1.5 text-xs">
                    <button
                      type="button"
                      onClick={() => onEdit(room)}
                      className="text-[#128A4E] hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                    <span className="text-gray-200">|</span>
                    <button
                      type="button"
                      onClick={() => onToggleActive(room.id)}
                      className="text-gray-500 hover:text-red-600 hover:underline cursor-pointer"
                    >
                      {isDeactivated ? 'Activate' : 'Deactivate'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
