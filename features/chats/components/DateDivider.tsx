import React from 'react';

export interface DateDividerProps {
  dateLabel: string;
}

export function DateDivider({ dateLabel }: DateDividerProps) {
  return (
    <div className="flex items-center gap-3 my-3">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-[10px] font-extrabold text-gray-400 bg-[#E8F5EE] text-[#128A4E] px-3 py-1 rounded-full uppercase tracking-wider">
        {dateLabel}
      </span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}
