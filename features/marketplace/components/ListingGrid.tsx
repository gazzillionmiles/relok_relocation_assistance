import React from 'react';
import { RoomListing, RoommateCard } from '@/types';
import { RoomGrid } from './RoomGrid';
import { RoommateGrid } from './RoommateGrid';
import { CategoryFilter } from '../hooks/useMarketplaceFilters';
import { Coordinates } from '../lib/distance';

export interface ListingGridProps {
  category: CategoryFilter;
  rooms: RoomListing[];
  roommates: RoommateCard[];
  userCoords?: Coordinates | null;
  onResetFilters?: () => void;
  onSelectCategory: (category: CategoryFilter) => void;
}

export function ListingGrid({
  category,
  rooms,
  roommates,
  userCoords,
  onResetFilters,
  onSelectCategory,
}: ListingGridProps) {
  if (category === 'rooms' || category === 'my') {
    return <RoomGrid rooms={rooms} userCoords={userCoords} onResetFilters={onResetFilters} />;
  }

  if (category === 'roommates') {
    return (
      <RoommateGrid
        roommates={roommates}
        userCoords={userCoords}
        onResetFilters={onResetFilters}
      />
    );
  }

  // Dual Section View for 'all' Category
  return (
    <div className="flex flex-col gap-10 w-full">
      {/* 1. Roommates Section */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h2 className="text-lg font-extrabold text-[#0F172A]">
              Highly Compatible Roommates ({roommates.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onSelectCategory('roommates')}
            className="text-xs font-extrabold text-[#128A4E] hover:underline cursor-pointer"
          >
            See All Roommates →
          </button>
        </div>

        <RoommateGrid
          roommates={roommates.slice(0, 4)}
          userCoords={userCoords}
          onResetFilters={onResetFilters}
        />
      </div>

      {/* 2. Available Rooms Section */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏢</span>
            <h2 className="text-lg font-extrabold text-[#0F172A]">
              Featured Property Listings ({rooms.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onSelectCategory('rooms')}
            className="text-xs font-extrabold text-[#128A4E] hover:underline cursor-pointer"
          >
            See All Rooms →
          </button>
        </div>

        <RoomGrid
          rooms={rooms.slice(0, 4)}
          userCoords={userCoords}
          onResetFilters={onResetFilters}
        />
      </div>
    </div>
  );
}
