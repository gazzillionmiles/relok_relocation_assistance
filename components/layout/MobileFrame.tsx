import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Responsive mobile containment frame component.
 * Centers the mobile layout on desktop screens and renders full bleed on mobile.
 */
export function MobileFrame({ children, fullWidth = false }: MobileFrameProps) {
  return (
    <div
      className={`min-h-screen ${
        fullWidth ? 'bg-slate-50' : 'bg-slate-900 flex justify-center items-center'
      } font-sans antialiased`}
    >
      <div
        className={`w-full ${
          fullWidth
            ? 'max-w-none bg-slate-50'
            : 'max-w-[430px] bg-white shadow-2xl sm:min-h-[850px] sm:rounded-3xl sm:my-4 sm:border sm:border-slate-800'
        } min-h-screen text-[#0F172A] relative overflow-x-hidden flex flex-col justify-between`}
      >
        {children}
      </div>
    </div>
  );
}
