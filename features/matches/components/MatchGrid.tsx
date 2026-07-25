import React from 'react';
import { RoommateCard } from '@/types';
import { MatchCard } from './MatchCard';
import { EmptyState } from './EmptyState';

export interface MatchGridProps {
  roommates: RoommateCard[];
  selectedRoommateId?: string | null;
  onSelectRoommate: (roommate: RoommateCard) => void;
  onResetFilters?: () => void;
}

export function MatchGrid({
  roommates,
  selectedRoommateId,
  onSelectRoommate,
  onResetFilters,
}: MatchGridProps) {
  if (roommates.length === 0) {
    return <EmptyState onReset={onResetFilters} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full">
      {roommates.map((rm) => (
        <MatchCard
          key={rm.id}
          roommate={rm}
          isSelected={rm.id === selectedRoommateId}
          onSelect={() => onSelectRoommate(rm)}
        />
      ))}
    </div>
  );
}
