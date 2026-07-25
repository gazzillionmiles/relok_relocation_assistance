import React from 'react';

export interface MatchHeaderProps {
  matchCount: number;
}

export function MatchHeader({ matchCount }: MatchHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-gray-100">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-extrabold text-[#128A4E] uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#128A4E] animate-pulse" />
          AI Matching Engine Online
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Compatible Roommates ({matchCount})
        </h1>
      </div>

      <div className="flex items-center gap-2 text-xs font-bold text-[#128A4E] bg-[#E8F5EE] border border-[#128A4E]/20 px-3 py-1.5 rounded-2xl shadow-2xs">
        <span>✨ Ranked by Lifestyle Match Score</span>
      </div>
    </div>
  );
}
