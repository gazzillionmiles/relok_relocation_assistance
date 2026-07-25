import React from 'react';
import Link from 'next/link';

export interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  showLogo?: boolean;
}

export function AuthHeader({
  title,
  subtitle,
  backHref,
  showLogo = false,
}: AuthHeaderProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {backHref && (
        <div className="flex items-center">
          <Link
            href={backHref}
            className="w-8 h-8 -ml-1.5 rounded-full flex items-center justify-center text-[#0F172A] hover:bg-gray-100 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E]"
            aria-label="Go back"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      )}

      {showLogo && (
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#E8F5EE] rounded-xl flex items-center justify-center border border-[#128A4E]/20 shadow-xs">
            <svg
              className="w-5 h-5 text-[#128A4E]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div>
            <span className="text-lg font-extrabold text-[#128A4E] tracking-tight">RELOK</span>
            <span className="block text-[10px] font-medium text-[#6B7280]">
              Co-Living & Roommate Finder
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-[#6B7280] font-medium leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
