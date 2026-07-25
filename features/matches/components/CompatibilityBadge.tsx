import React from 'react';

export interface CompatibilityBadgeProps {
  score: number;
  className?: string;
}

export function CompatibilityBadge({ score, className = '' }: CompatibilityBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-black text-[#128A4E] bg-[#E8F5EE] border border-[#128A4E]/25 px-3 py-1 rounded-full shadow-2xs ${className}`}
      title={`${score}% AI Compatibility Match Score`}
    >
      <svg
        className="w-3.5 h-3.5 text-[#128A4E]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
      <span>{score}% Match</span>
    </span>
  );
}
