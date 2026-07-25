"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MobileBottomNav() {
  const pathname = usePathname();

  const items = [
    { label: 'Home', href: '/home', icon: 'home' },
    { label: 'Matches', href: '/matches', icon: 'matches' },
    { label: 'Post', href: '/post', icon: 'post', isPost: true },
    { label: 'Chats', href: '/chats', icon: 'chats' },
    { label: 'Profile', href: '/profile', icon: 'profile' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 h-15 bg-white border-t border-gray-200 flex items-center justify-around z-30 px-2 sm:hidden shadow-lg"
      aria-label="Mobile navigation"
    >
      {items.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/home' && pathname.startsWith(item.href));
 
        if (item.isPost) {
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label="Post new room listing"
              className="relative -top-2 flex flex-col items-center justify-center w-12 h-12 bg-[#128A4E] hover:bg-[#0F7A44] text-white rounded-full shadow-lg border-4 border-white transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E]"
            >
              <svg className="w-5 h-5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center gap-1 py-1 px-3 transition-colors ${
              isActive ? 'text-[#128A4E]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {item.icon === 'home' && (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            )}
            {item.icon === 'matches' && (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
            {item.icon === 'chats' && (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            )}
            {item.icon === 'profile' && (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
            <span className="text-[10px] font-bold tracking-wide">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
