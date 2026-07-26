"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { getProfile } from '@/actions/profile.actions';
import { signOut } from '@/actions/auth.actions';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function loadUserSession() {
      setIsLoading(true);
      const { data: { user: sessionUser } } = await supabase.auth.getUser();
      setUser(sessionUser);
      
      if (sessionUser) {
        const res = await getProfile();
        if (res.success && res.data) {
          setProfile(res.data.profile);
        }
      }
      setIsLoading(false);
    }
    loadUserSession();

    // Subscribe to auth state changes to reflect instantly
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          const res = await getProfile();
          if (res.success && res.data) {
            setProfile(res.data.profile);
          }
        } else {
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    await signOut();
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="w-9 h-9 rounded-xl bg-slate-100 animate-pulse border border-slate-200" />
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-xs font-bold text-slate-700 hover:text-[#128A4E] transition-colors"
        >
          Log In
        </Link>
        <Link
          href="/signup"
          className="text-xs font-bold bg-[#128A4E] text-white px-4 py-2.5 rounded-xl hover:bg-[#0F7A44] transition-all shadow-xs"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User';
  const displayCity = profile?.city || 'Bengaluru';
  const initialLetter = displayName.charAt(0).toUpperCase();

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
        <div className="relative w-9 h-9 rounded-xl bg-[#E8F5EE] border border-[#128A4E]/30 flex items-center justify-center text-[#128A4E] font-black text-sm shadow-2xs overflow-hidden">
          {profile?.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={displayName}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <span>{initialLetter}</span>
          )}
        </div>
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-bold text-[#0F172A] leading-tight">
            {displayName}
          </span>
          <span className="text-[10px] text-[#6B7280] font-medium">
            {displayCity}
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
            <p className="text-xs font-bold text-[#0F172A]">{displayName}</p>
            <p className="text-[11px] text-gray-500 font-medium truncate">{user?.email}</p>
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
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 text-left cursor-pointer border-none bg-transparent"
            >
              <span>🚪 Sign Out Session</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
