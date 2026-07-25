import React from 'react';
import { RoommateCard as RoommateCardType } from '@/types';
import { RoommateCard } from './RoommateCard';
import { calculateItemDistance, Coordinates } from '../lib/distance';
import { EmptyState } from './EmptyState';

export interface RoommateGridProps {
  roommates: RoommateCardType[];
  userCoords?: Coordinates | null;
  onResetFilters?: () => void;
}

export function RoommateGrid({
  roommates,
  userCoords,
  onResetFilters,
}: RoommateGridProps) {
  if (roommates.length === 0) {
    return (
      <EmptyState
        title="No Compatible Roommates Match"
        description="Try expanding your search query or selecting a different metro city."
        onReset={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {roommates.map((rm) => {
        const distance = calculateItemDistance(userCoords ?? null, rm.bio, rm.city);

        return (
          <RoommateCard key={rm.id} roommate={rm} distanceKm={distance} />
        );
      })}
    </div>
  );
}
