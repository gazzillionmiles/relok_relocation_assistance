"use client";

import React from 'react';
import Link from 'next/link';

export function MobileHeader() {
  return (
    <header className="h-16 px-4 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-30 sm:hidden">
      {/* Brand Logo */}
      <Link href="/home" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#E8F5EE] rounded-xl flex items-center justify-center border border-[#128A4E]/20">
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
        <span className="text-lg font-extrabold text-[#128A4E] tracking-tight">RELOK</span>
      </Link>

      {/* Metro City Chip Indicator */}
      <div className="flex items-center gap-1 text-[11px] font-extrabold text-[#128A4E] bg-[#E8F5EE] px-2.5 py-1 rounded-xl border border-[#128A4E]/15">
        <span>📍 Bengaluru</span>
      </div>
    </header>
  );
}
