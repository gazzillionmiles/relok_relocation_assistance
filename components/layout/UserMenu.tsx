"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User profile menu"
        className="flex items-center gap-2.5 p-1.5 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E]"
      >
        <div className="w-9 h-9 rounded-xl bg-[#E8F5EE] border border-[#128A4E]/30 flex items-center justify-center text-[#128A4E] font-black text-sm shadow-2xs">
          A
        </div>
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-bold text-[#0F172A] leading-tight">
            Aarav Sharma
          </span>
          <span className="text-[10px] text-[#6B7280] font-medium">
            Bengaluru
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-xs font-bold text-[#0F172A]">Aarav Sharma</p>
            <p className="text-[11px] text-gray-500 font-medium truncate">aarav.sharma@relok.in</p>
          </div>

          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-slate-50 hover:text-[#128A4E]"
            >
              <span>👤 Profile Hub</span>
            </Link>
            <Link
              href="/safety"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-slate-50 hover:text-[#128A4E]"
            >
              <span>🛡️ Safety Center</span>
            </Link>
            <Link
              href="/intent"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-slate-50 hover:text-[#128A4E]"
            >
              <span>🎯 Switch Gateway Intent</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-slate-50 hover:text-[#128A4E]"
            >
              <span>🛠️ Admin Queue</span>
            </Link>
          </div>

          <div className="border-t border-gray-100 pt-1">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
            >
              <span>🚪 Sign Out Session</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
