import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Page Not Found — RELOK',
  description: 'The requested page could not be found.',
};

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-slate-900 flex items-center justify-center p-6 text-white font-sans selection:bg-[#128A4E]/30 antialiased">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800 flex flex-col items-center text-center gap-6 text-[#0F172A]">
        {/* 404 Icon Badge */}
        <div className="w-20 h-20 rounded-3xl bg-[#E8F5EE] border-2 border-[#128A4E]/20 flex items-center justify-center text-[#128A4E] text-3xl font-black shadow-xs">
          404
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-extrabold text-[#128A4E] bg-[#E8F5EE] px-3 py-1 rounded-full uppercase tracking-wider self-center border border-[#128A4E]/20">
            Page Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Lost Your Way?
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
            The page you are looking for does not exist or has been moved to a new route.
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Link href="/home" className="w-full">
            <Button variant="primary">Go to Home Marketplace →</Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="outline">Back to Landing Page</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
