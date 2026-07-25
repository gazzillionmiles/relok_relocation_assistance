import React from 'react';
import { RoommateCard } from '@/types';
import { getCompatibilityBreakdown } from '../lib/compatibility-score';

export interface CompatibilityBreakdownProps {
  roommate: RoommateCard;
}

export function CompatibilityBreakdown({ roommate }: CompatibilityBreakdownProps) {
  const breakdown = getCompatibilityBreakdown(roommate);

  return (
    <div className="flex flex-col gap-3 bg-white border border-gray-100 rounded-2xl p-4 shadow-xs">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <h4 className="text-xs font-extrabold text-[#0F172A] uppercase tracking-wider">
          Compatibility Parameter Breakdown
        </h4>
        <span className="text-[10px] font-bold text-[#128A4E] bg-[#E8F5EE] px-2 py-0.5 rounded-md">
          AI Evaluated
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {breakdown.map((param) => (
          <div
            key={param.id}
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-gray-100 text-xs"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-extrabold text-[#0F172A]">{param.label}</span>
              <span className="text-[10px] text-gray-500 font-medium">
                You: {param.userVal} • {roommate.name.split(' ')[0]}: {param.matchVal}
              </span>
            </div>

            <span
              className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                param.matched
                  ? 'bg-[#E8F5EE] text-[#128A4E]'
                  : 'bg-amber-50 text-amber-700'
              }`}
            >
              {param.matched ? 'Perfect Alignment ✓' : 'Moderate'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
