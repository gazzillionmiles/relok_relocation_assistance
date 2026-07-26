"use client";

import React from 'react';
import Link from 'next/link';

export function MobileHeader() {
  return (
    <header className="h-16 px-4 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-30 sm:hidden">
      {/* Brand Logo */}
      <Link href="/home" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#E8F5EE] rounded-xl flex items-center justify-center border border-[#128A4E]/20">
          <img
            src="/logo.png"
            alt="Relok Logo"
            className="w-5 h-5 object-contain"
          />
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
