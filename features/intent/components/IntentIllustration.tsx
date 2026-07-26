import React from 'react';

export function IntentIllustration() {
  return (
    <div className="w-12 h-12 bg-[#E8F5EE] rounded-xl flex items-center justify-center border border-[#128A4E]/20 shadow-xs shrink-0">
      <svg
        className="w-6 h-6 text-[#128A4E]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    </div>
  );
}
