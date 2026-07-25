import React from 'react';

export function SafetyReminderBanner() {
  return (
    <div className="w-full bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3.5 sm:p-4 flex items-start sm:items-center gap-3 text-amber-900 text-xs sm:text-sm font-medium shadow-2xs">
      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div className="flex-1 leading-relaxed">
        <p className="font-bold text-amber-950">Safety Reminder</p>
        <p className="text-amber-800">
          Meet in a safe public place. Never send money or deposit funds before visiting a property in person.
        </p>
      </div>
    </div>
  );
}
