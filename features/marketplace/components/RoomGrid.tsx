import React from 'react';
import { RoomListing } from '@/types';
import { ListingCard } from './ListingCard';
import { calculateItemDistance, Coordinates } from '../lib/distance';
import { EmptyState } from './EmptyState';

export interface RoomGridProps {
  rooms: RoomListing[];
  userCoords?: Coordinates | null;
  onResetFilters?: () => void;
}

export function RoomGrid({ rooms, userCoords, onResetFilters }: RoomGridProps) {
  if (rooms.length === 0) {
    return (
      <EmptyState
        title="No Property Listings Match"
        description="Try searching for another locality, switching cities, or clearing sharing mode filters."
        onReset={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {rooms.map((room) => {
        const distance = calculateItemDistance(userCoords ?? null, room.location, room.city);

        return (
          <ListingCard key={room.id} room={room} distanceKm={distance} />
        );
      })}
    </div>
  );
}
