import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'What are you looking for? — RELOK',
  description: 'Select your intent on Relok co-living finder.',
};

export default function IntentGatewayPage() {
  return (
    <main className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans antialiased">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center gap-4">
        {/* Gateway Badge */}
        <div className="w-12 h-12 rounded-xl bg-[#E8F5EE] border border-[#128A4E] flex items-center justify-center text-[#128A4E] text-xl shadow-xs">
          🎯
        </div>
 
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-extrabold text-[#128A4E] bg-[#E8F5EE] px-2.5 py-0.5 rounded-full uppercase tracking-wider self-center border border-[#128A4E]/20">
            Profile Setup Complete
          </span>
          <h1 className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight mt-0.5">
            Intent Gateway
          </h1>
          <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
            Your onboarding flow is complete! This Intent Gateway route is ready for the next feature migration phase.
          </p>
        </div>
 
        <div className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3.5 flex flex-col gap-1.5 text-left text-xs">
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
