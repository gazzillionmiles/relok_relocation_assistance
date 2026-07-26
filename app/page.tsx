import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-slate-50 flex font-sans selection:bg-[#128A4E]/30 antialiased">
      {/* Container Shell */}
      <div className="w-full bg-white grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side (Desktop/Tablet): Hero Branding & Highlights */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[#128A4E] to-[#0A5A30] text-white p-6 lg:p-10 flex flex-col justify-between relative overflow-hidden hidden lg:flex">
          {/* Background Decorative Accents */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          {/* Top Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-xs border border-white/20">
              <img
                src="/logo.png"
                alt="Relok Logo"
                className="w-7 h-7 object-contain"
              />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-white tracking-tight">RELOK</span>
              <span className="block text-[11px] font-medium text-emerald-100/90">
                Co-Living & Roommate Finder
              </span>
            </div>
          </div>

          {/* Center Content */}
          <div className="relative z-10 my-auto py-8 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full w-fit border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-xs font-extrabold text-emerald-100 tracking-wider uppercase">
                Find Your Living Match
              </span>
            </div>

            <h1 className="text-3xl xl:text-5xl font-extrabold leading-tight tracking-tight">
              Find Your Perfect Living Match
            </h1>

            <p className="text-base text-emerald-100/90 leading-relaxed max-w-md">
              Discover compatible roommates, private rooms, and co-living spaces tailored to your lifestyle.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/15 text-left">
              <div className="flex flex-col gap-1">
                <span className="text-xl font-extrabold text-white">98%</span>
                <span className="text-xs text-emerald-200 font-medium">Lifestyle Match</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-extrabold text-white">Direct</span>
                <span className="text-xs text-emerald-200 font-medium">Room Listings</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-extrabold text-white">7 Metros</span>
                <span className="text-xs text-emerald-200 font-medium">Across India</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 pt-4 border-t border-white/15 text-xs text-emerald-200/80 flex items-center justify-between">
            <span>© {new Date().getFullYear()} RELOK</span>
            <span>Trusted Co-Living</span>
          </div>
        </div>

        {/* Right Side / Main Action Card */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between items-center overflow-y-auto">
          
          {/* Mobile Header Logo (Visible on mobile only) */}
          <div className="sm:hidden flex flex-col items-center gap-1.5 pt-2 pb-3">
            <div className="w-12 h-12 bg-[#E8F5EE] rounded-xl flex items-center justify-center border border-[#128A4E]/20 shadow-xs">
              <img
                src="/logo.png"
                alt="Relok Logo"
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="text-xl font-extrabold text-[#128A4E] tracking-tight">RELOK</span>
          </div>
 
          {/* House Vector Illustration Lockup */}
          <div className="my-auto w-full flex flex-col items-center text-center gap-5 max-w-md py-2">
            <div className="w-full max-w-[200px] aspect-square relative bg-gradient-to-tr from-[#E8F5EE] to-[#E8F5EE]/40 rounded-3xl flex items-center justify-center shadow-inner">
              <svg
                className="w-24 h-24 text-[#128A4E]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                aria-hidden="true"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <line x1="9" y1="22" x2="9" y2="16" />
                <line x1="15" y1="22" x2="15" y2="16" />
                <path d="M9 16h6" />
                <circle cx="12" cy="11" r="1.5" />
              </svg>
              {/* Floating decorative shapes */}
              <div className="absolute top-6 left-6 w-5 h-5 rounded-full bg-[#128A4E]/15 animate-bounce" />
              <div className="absolute bottom-8 right-6 w-8 h-8 rounded-xl bg-[#128A4E]/20 rotate-12" />
            </div>
 
            <div className="flex flex-col gap-1.5">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] leading-tight tracking-tight">
                Find Your Perfect Roommate
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-sm mx-auto">
                Discover compatible roommates and available rooms near you.
              </p>
            </div>
 
            {/* Entry Actions */}
            <div className="w-full flex flex-col items-center gap-3 mt-1">
              <Link href="/login" className="w-full">
                <Button
                  variant="primary"
                  icon={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  }
                  className="h-11 text-sm font-bold"
                >
                  Get Started
                </Button>
              </Link>
 
              <Link
                href="/login"
                className="text-xs font-semibold text-[#128A4E] hover:text-[#0F7A44] underline transition-colors cursor-pointer py-0.5"
              >
                Already have an account? Log in
              </Link>
            </div>
          </div>
 
          {/* Footer info */}
          <div className="text-[11px] text-[#6B7280] text-center pt-2">
            <span>By continuing, you accept our Terms of Service & Privacy Policy.</span>
          </div>

        </div>

      </div>
    </main>
  );
}
