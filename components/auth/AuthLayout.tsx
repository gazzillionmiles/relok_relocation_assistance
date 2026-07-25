import React from 'react';
import Link from 'next/link';

export interface AuthLayoutProps {
  children: React.ReactNode;
  heroTitle?: string;
  heroSubtitle?: string;
}

export function AuthLayout({
  children,
  heroTitle = 'Find Your Perfect Living Match',
  heroSubtitle = 'Discover compatible roommates and available rooms near you across top metro cities.',
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex font-sans selection:bg-[#128A4E]/30 antialiased">
      {/* Outer Containment Container */}
      <div className="w-full bg-white grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Side: Brand Hero Panel (Visible on Desktop / Laptop, balanced on Tablet) */}
        <div className="lg:col-span-5 xl:col-span-6 bg-gradient-to-br from-[#128A4E] to-[#0A5A30] text-white p-6 lg:p-10 flex flex-col justify-between relative overflow-hidden hidden lg:flex">
          {/* Background Decorative Graphic Accent Shapes */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
 
          {/* Top Brand Header */}
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 group focus:outline-none">
              <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-xs border border-white/20 group-hover:bg-white/25 transition-all">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">RELOK</span>
            </Link>
          </div>
 
          {/* Center Content Section */}
          <div className="relative z-10 my-4 flex flex-col gap-4">
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full w-fit border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-[10px] font-extrabold text-emerald-100 tracking-wider uppercase">
                AI Co-Living Match Engine
              </span>
            </div>
 
            <h2 className="text-2xl xl:text-3xl font-extrabold leading-tight tracking-tight">
              {heroTitle}
            </h2>
 
            <p className="text-sm text-emerald-100/90 leading-relaxed font-normal max-w-md">
              {heroSubtitle}
            </p>
 
            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/15">
              <div className="flex flex-col gap-0.5">
                <span className="text-base font-bold text-white">98% Match</span>
                <span className="text-[10px] text-emerald-200 font-medium">Lifestyle Alignment</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-base font-bold text-white">Direct</span>
                <span className="text-[10px] text-emerald-200 font-medium">Brokers & Flatmates</span>
              </div>
            </div>
          </div>
 
          {/* Bottom Footer Quote */}
          <div className="relative z-10 pt-3 border-t border-white/15 text-[11px] text-emerald-200/80 flex items-center justify-between">
            <span>© {new Date().getFullYear()} Relok Co-Living Inc.</span>
            <span>Made for Metro India 🇮🇳</span>
          </div>
        </div>
 
        {/* Right Side: Auth Form Container (Full width on Mobile, 7 cols on Desktop) */}
        <div className="lg:col-span-7 xl:col-span-6 bg-white p-5 sm:p-8 lg:p-10 flex flex-col justify-center items-center overflow-y-auto">
          <div className="w-full max-w-md mx-auto my-auto py-2">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}
