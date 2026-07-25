"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { UserMenu } from './UserMenu';

export function DesktopTopBar() {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.startsWith('/home')) return 'Marketplace & Co-Living';
    if (pathname.startsWith('/matches')) return 'AI Roommate Match Engine';
    if (pathname.startsWith('/post')) return 'Post Property Listing';
    if (pathname.startsWith('/chats')) return 'Messages & Inquiries';
    if (pathname.startsWith('/profile')) return 'User Profile Hub';
    if (pathname.startsWith('/broker')) return 'Broker Enterprise Hub';
    return 'Dashboard';
  };

  return (
    <header className="h-14 px-5 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-30 hidden sm:flex backdrop-blur-md bg-white/90">
      {/* Left Title / Breadcrumb */}
      <div className="flex items-center gap-3">
        <h1 className="text-sm sm:text-base font-extrabold text-[#0F172A] tracking-tight">
          {getPageTitle()}
        </h1>
        <span className="text-xs text-gray-300 font-light">|</span>
        <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#128A4E] bg-[#E8F5EE] px-2.5 py-0.5 rounded-lg border border-[#128A4E]/15">
          <span>📍 Metro City: Bengaluru</span>
        </div>
      </div>

      {/* Right User Actions */}
      <div className="flex items-center gap-4">
        <UserMenu />
      </div>
    </header>
  );
}
