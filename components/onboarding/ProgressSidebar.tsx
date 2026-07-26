import React from 'react';

export interface ProgressSidebarProps {
  currentStep: number;
  steps: { id: number; title: string; description: string }[];
}

export function ProgressSidebar({ currentStep, steps }: ProgressSidebarProps) {
  return (
    <aside className="w-full text-white p-6 flex flex-col justify-between relative overflow-hidden h-full min-h-screen">
      {/* Background Decorative Accents */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
 
      {/* Top Header */}
      <div className="relative z-10 flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-xs border border-white/20">
            <img
              src="/logo.png"
              alt="Relok Logo"
              className="w-5 h-5 object-contain"
            />
          </div>
          <span className="text-lg font-extrabold text-white tracking-tight">RELOK</span>
        </div>
        <p className="text-[11px] font-medium text-emerald-100/90 pl-0.5">
          Profile Setup & Matching Engine
        </p>
      </div>
 
      {/* Step Progress Checklist */}
      <div className="relative z-10 my-4 flex flex-col gap-3">
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
 
          return (
            <div key={step.id} className="flex items-start gap-3 group">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-all ${
                  isCompleted
                    ? 'bg-emerald-300 text-[#0A5A30]'
                    : isCurrent
                    ? 'bg-white text-[#128A4E] ring-4 ring-white/20'
                    : 'bg-white/15 text-emerald-200 border border-white/20'
                }`}
              >
                {isCompleted ? '✓' : step.id}
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-xs font-bold leading-tight ${
                    isCurrent
                      ? 'text-white'
                      : isCompleted
                      ? 'text-emerald-100'
                      : 'text-emerald-200/50'
                  }`}
                >
                  {step.title}
                </span>
                <span className="text-[10px] text-emerald-200/60 font-medium">
                  {step.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
 
      {/* Bottom Information Tip Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 flex gap-2.5 items-center">
        <span className="text-base shrink-0">✨</span>
        <p className="text-[10px] text-emerald-100 font-medium leading-relaxed">
          Accurate preferences increase your roommate match score by up to 3x!
        </p>
      </div>
    </aside>
  );
}
