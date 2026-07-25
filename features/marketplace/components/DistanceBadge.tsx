import React from 'react';

export interface DistanceBadgeProps {
  distanceKm: number | null;
  className?: string;
}

export function DistanceBadge({ distanceKm, className = '' }: DistanceBadgeProps) {
  if (distanceKm === null || distanceKm === undefined) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md ${className}`}
    >
      <span>📍</span>
      <span>{distanceKm} km away</span>
    </span>
  );
}
