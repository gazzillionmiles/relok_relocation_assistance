import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'What are you looking for? — RELOK',
  description: 'Select your intent on Relok co-living finder.',
};

export default function IntentGatewayPage() {
  return (
    <main className="min-h-screen w-full bg-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans antialiased">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-800 flex flex-col items-center text-center gap-6">
        {/* Gateway Badge */}
        <div className="w-16 h-16 rounded-2xl bg-[#E8F5EE] border-2 border-[#128A4E] flex items-center justify-center text-[#128A4E] text-2xl shadow-xs">
          🎯
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-extrabold text-[#128A4E] bg-[#E8F5EE] px-3 py-1 rounded-full uppercase tracking-wider self-center border border-[#128A4E]/20">
            Profile Setup Complete
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-1">
            Intent Gateway
          </h1>
          <p className="text-sm text-[#6B7280] font-medium leading-relaxed">
            Your onboarding flow is complete! This Intent Gateway route is ready for the next feature migration phase.
          </p>
        </div>

        <div className="w-full bg-slate-50 border border-gray-100 rounded-2xl p-4 flex flex-col gap-2 text-left text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-500">Onboarding Status</span>
            <span className="font-extrabold text-[#128A4E]">Completed ✓</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-500">Target Route</span>
            <span className="font-extrabold text-gray-800">/intent-gateway</span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3 mt-2">
          <Link href="/onboarding" className="w-full">
            <Button variant="secondary">Back to Onboarding</Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="outline">Back to Landing Page</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
