import React from 'react';
import { ProgressSidebar } from './ProgressSidebar';

export interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
}

const stepsChecklist = [
  { id: 1, title: 'Lifestyle & Preferences', description: 'Sleep, cleanliness & dietary' },
  { id: 2, title: 'About You', description: 'Personal details & photo' },
  { id: 3, title: 'Roommate Preferences', description: 'Target cities, budget & room' },
  { id: 4, title: 'Lifestyle Habits', description: 'Social personality & pets' },
  { id: 5, title: 'House Rules', description: 'Guests & curfew regulations' },
  { id: 6, title: 'Profile Complete', description: 'Ready for co-living matches' },
];

export function OnboardingLayout({ children, currentStep }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex font-sans selection:bg-[#128A4E]/30 antialiased">
      {/* Container Box */}
      <div className="w-full bg-white grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Column (Desktop / Laptop): Progress Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3 bg-gradient-to-br from-[#128A4E] to-[#0A5A30] hidden lg:block border-r border-gray-100 relative">
          <ProgressSidebar currentStep={currentStep} steps={stepsChecklist} />
        </div>
 
        {/* Right Column: Step Form Content */}
        <div className="lg:col-span-8 xl:col-span-9 bg-slate-50 p-5 sm:p-8 lg:p-10 flex flex-col justify-center items-center overflow-y-auto">
          <div className="w-full max-w-xl mx-auto my-auto py-2">
            {children}
          </div>
        </div>
 
      </div>
    </div>
  );
}
