"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MAIN_NAV_ITEMS } from './navConfig';
import { NavigationItem } from './NavigationItem';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`bg-white border-r border-gray-100 flex-col justify-between p-4 transition-all duration-300 sticky top-0 h-screen z-40 hidden sm:flex shrink-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header & Logo */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-2 pt-1">
          <Link href="/home" className="flex items-center gap-2.5 group focus:outline-none">
            <div className="w-8 h-8 bg-[#E8F5EE] rounded-xl flex items-center justify-center border border-[#128A4E]/20 shrink-0 group-hover:scale-105 transition-transform">
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
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-[#128A4E] tracking-tight leading-none">
                  RELOK
                </span>
                <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase mt-0.5">
                  Co-Living Shell
                </span>
              </div>
            )}
          </Link>
 
          {/* Collapse Toggle Button */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="w-7 h-7 rounded-lg bg-slate-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#0F172A] hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E]"
          >
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                isCollapsed ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
 
        {/* Navigation Items List */}
        <nav className="flex flex-col gap-1" aria-label="Main sidebar navigation">
          {MAIN_NAV_ITEMS.map((item) => (
            <NavigationItem key={item.href} item={item} collapsed={isCollapsed} />
          ))}
        </nav>
      </div>
 
      {/* Bottom CTA Card */}
      {!isCollapsed ? (
        <div className="bg-[#E8F5EE]/60 border border-[#128A4E]/20 rounded-xl p-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#128A4E] animate-pulse" />
            <span className="text-[10px] font-extrabold text-[#128A4E] uppercase tracking-wider">
              Post Listing
            </span>
          </div>
          <p className="text-[11px] text-[#0F172A] font-medium leading-relaxed">
            Have a room or flat to list? Post in minutes.
          </p>
          <Link
            href="/post"
            className="mt-0.5 w-full h-9 bg-[#128A4E] hover:bg-[#0F7A44] text-white text-xs font-bold rounded-lg flex items-center justify-center transition-all shadow-xs"
          >
            + Post Room
          </Link>
        </div>
      ) : (
        <Link
          href="/post"
          title="Post Room Listing"
          className="w-10 h-10 bg-[#128A4E] hover:bg-[#0F7A44] text-white rounded-xl flex items-center justify-center mx-auto shadow-md transition-transform active:scale-95"
        >
          <svg className="w-5 h-5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      )}
    </aside>
  );
}
