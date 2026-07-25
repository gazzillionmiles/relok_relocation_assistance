import React from 'react';
import { RoommateCard } from '@/types';

export interface PreferenceSummaryProps {
  roommate: RoommateCard;
}

export function PreferenceSummary({ roommate }: PreferenceSummaryProps) {
  return (
    <div className="flex flex-col gap-2 bg-white border border-gray-100 rounded-2xl p-4 shadow-2xs text-xs">
      <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
        Education & Location Expectations
      </span>

      <div className="flex flex-col gap-1.5 mt-1">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-500">Education</span>
          <span className="font-extrabold text-[#0F172A]">{roommate.education}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-500">City Target</span>
          <span className="font-extrabold text-[#0F172A]">{roommate.city}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-500">Monthly Budget</span>
          <span className="font-extrabold text-[#128A4E]">{roommate.budget}/mo</span>
        </div>
      </div>
    </div>
  );
}
