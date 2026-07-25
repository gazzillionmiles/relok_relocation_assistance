"use client";

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center p-6 text-white font-sans selection:bg-[#128A4E]/30">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-800 flex flex-col items-center text-center gap-6 text-[#0F172A]">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 text-3xl shadow-2xs">
          ⚠️
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-extrabold text-red-600 bg-red-50 border border-red-100 px-3 py-1 rounded-full uppercase tracking-wider self-center">
            System Alert
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1">
            Something went wrong
          </h1>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            An unexpected error occurred. Please try again or return to the landing page.
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Button variant="primary" onClick={() => reset()}>
            Try Again ↺
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = '/')}>
            Go to Landing Page
          </Button>
        </div>
      </div>
    </div>
  );
}
