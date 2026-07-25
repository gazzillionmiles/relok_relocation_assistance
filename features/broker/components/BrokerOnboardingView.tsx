import React from 'react';
import Link from 'next/link';
import { AgencyForm } from './AgencyForm';

export function BrokerOnboardingView() {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#128A4E]/30 antialiased">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-5 sm:p-8 border border-gray-100 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <Link href="/intent" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#E8F5EE] rounded-xl flex items-center justify-center text-[#128A4E] text-lg border border-[#128A4E]/20">
              💼
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-[#128A4E]">RELOK BROKER</span>
              <span className="text-[9px] text-gray-400 font-bold uppercase">Enterprise Agent Portal</span>
            </div>
          </Link>
 
          <Link href="/intent" className="text-xs font-bold text-gray-500 hover:text-[#0F172A]">
            ✕ Cancel
          </Link>
        </div>
 
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Broker Registration
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
            Provide your commercial information and RERA details to list and manage multiple properties.
          </p>
        </div>

        <AgencyForm />
      </div>
    </div>
  );
}
