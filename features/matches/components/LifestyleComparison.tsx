import React from 'react';
import { RoommateCard } from '@/types';

export interface LifestyleComparisonProps {
  roommate: RoommateCard;
}

export function LifestyleComparison({ roommate }: LifestyleComparisonProps) {
  return (
    <div className="flex flex-col gap-2.5 bg-slate-50 border border-gray-100 rounded-2xl p-4">
      <h4 className="text-xs font-extrabold text-[#0F172A] uppercase tracking-wider">
        Lifestyle Highlights
      </h4>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex flex-col gap-0.5">
          <span className="text-[10px] text-gray-400 font-bold uppercase">Sleep Schedule</span>
          <span className="font-extrabold text-[#0F172A]">⏰ {roommate.sleepSchedule}</span>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex flex-col gap-0.5">
          <span className="text-[10px] text-gray-400 font-bold uppercase">Cleanliness</span>
          <span className="font-extrabold text-[#0F172A]">✨ {roommate.cleanliness}</span>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex flex-col gap-0.5">
          <span className="text-[10px] text-gray-400 font-bold uppercase">Dietary</span>
          <span className="font-extrabold text-[#0F172A]">🥦 {roommate.dietary}</span>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex flex-col gap-0.5">
          <span className="text-[10px] text-gray-400 font-bold uppercase">Smoking</span>
          <span className="font-extrabold text-[#0F172A]">🚭 {roommate.smoking}</span>
        </div>
      </div>
    </div>
  );
}
