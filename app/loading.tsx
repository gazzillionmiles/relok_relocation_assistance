import React from 'react';

export default function GlobalLoading() {
  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center p-6 text-white selection:bg-[#128A4E]/30">
      <div className="flex flex-col items-center gap-4 text-center animate-pulse">
        <div className="w-16 h-16 bg-[#E8F5EE] rounded-3xl flex items-center justify-center border-2 border-[#128A4E] shadow-sm">
          <img
            src="/logo.png"
            alt="Relok Logo"
            className="w-8 h-8 object-contain"
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-2xl font-extrabold text-[#128A4E] tracking-tight">RELOK</span>
          <span className="text-xs font-semibold text-emerald-200/80">Loading experience...</span>
        </div>

        <div className="flex gap-2 items-center justify-center mt-2">
          <span className="w-2.5 h-2.5 bg-[#128A4E] rounded-full animate-bounce" />
          <span className="w-2.5 h-2.5 bg-[#128A4E] rounded-full animate-bounce [animation-delay:0.2s]" />
          <span className="w-2.5 h-2.5 bg-[#128A4E] rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
}
