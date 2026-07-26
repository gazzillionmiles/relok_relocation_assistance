import React from 'react';
import { IntentIllustration } from './IntentIllustration';

export function IntentHeader() {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <IntentIllustration />
      <div className="flex items-center gap-2 bg-[#E8F5EE] border border-[#128A4E]/20 px-3.5 py-1 rounded-full">
        <span className="w-2 h-2 rounded-full bg-[#128A4E] animate-pulse" />
        <span className="text-xs font-extrabold text-[#128A4E] uppercase tracking-wider">
          Customized Navigation
        </span>
      </div>
      <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
        What are you looking for?
      </h1>
    </div>
  );
}
