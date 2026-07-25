"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function EmailVerifiedView() {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-6 w-full">
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#128A4E] flex items-center justify-center shadow-xs animate-bounce">
        <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          ✓ Email Verified
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium max-w-sm mx-auto">
          Your account is now ready. Start discovering compatible roommates and room listings.
        </p>
      </div>

      <Link href="/intent" className="w-full max-w-sm mt-2">
        <Button variant="primary" className="w-full h-12 text-sm font-bold flex items-center justify-center gap-2">
          <span>Continue</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Button>
      </Link>
    </div>
  );
}
