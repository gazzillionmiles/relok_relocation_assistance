import React from 'react';
import { IntentHeader } from '@/features/intent/components/IntentHeader';
import { IntentDescription } from '@/features/intent/components/IntentDescription';
import { IntentGrid } from '@/features/intent/components/IntentGrid';

export const metadata = {
  title: 'What are you looking for? — RELOK',
  description: 'Select your co-living goal to get personalized roommate and room matches.',
};

export default function IntentPage() {
  return (
    <main className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-5 lg:p-6 font-sans selection:bg-[#128A4E]/30 antialiased">
      {/* Container Card */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:p-8 flex flex-col justify-between gap-5">
        {/* Header & Description */}
        <div className="flex flex-col gap-4">
          <IntentHeader />
          <IntentDescription />
        </div>

        {/* Interactive Responsive Grid */}
        <IntentGrid />
      </div>
    </main>
  );
}
