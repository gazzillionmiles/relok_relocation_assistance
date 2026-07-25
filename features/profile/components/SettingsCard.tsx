import React from 'react';

export interface SettingsCardProps {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export function SettingsCard({
  icon,
  title,
  description,
  onClick,
}: SettingsCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left p-3.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-gray-100 transition-all flex items-center justify-between group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E]"
    >
      <div className="flex gap-3.5 items-center min-w-0">
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg shrink-0 group-hover:bg-[#E8F5EE] group-hover:text-[#128A4E] transition-colors">
          {icon}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs sm:text-sm font-extrabold text-[#0F172A] group-hover:text-[#128A4E] transition-colors truncate">
            {title}
          </span>
          <span className="text-[11px] text-gray-500 font-medium truncate">
            {description}
          </span>
        </div>
      </div>

      <svg
        className="w-4 h-4 text-gray-300 group-hover:translate-x-1 group-hover:text-[#128A4E] transition-all shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
