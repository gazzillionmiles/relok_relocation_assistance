import React from 'react';

export interface MarketplaceHeaderProps {
  userName?: string;
  cityName: string;
}

export function MarketplaceHeader({
  userName = 'Flatmate',
  cityName,
}: MarketplaceHeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-gray-100">
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] sm:text-xs text-[#128A4E] font-extrabold uppercase tracking-widest flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#128A4E] animate-pulse" />
          AI Co-Living Match Engine Active
        </span>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          {getGreeting()}, {userName} 👋
        </h1>
      </div>

      <div className="flex items-center gap-2 text-xs font-bold text-[#128A4E] bg-[#E8F5EE] border border-[#128A4E]/20 px-3.5 py-1.5 rounded-2xl shadow-2xs">
        <span>📍</span>
        <span>Metro Area: {cityName}</span>
      </div>
    </div>
  );
}
