import React from 'react';

export interface StepNavigationProps {
  currentStep: number | 'published';
  onGoToStep: (step: 1 | 2 | 3 | 4 | 5) => void;
  isStepValid: (step: number) => boolean;
}

const STEPS_CONFIG = [
  { id: 1, title: 'Property Info', desc: 'Rent, deposit & terms' },
  { id: 2, title: 'Details & Rules', desc: 'Description & amenities' },
  { id: 3, title: 'Preferences', desc: 'Roommate gender & age' },
  { id: 4, title: 'Location & Map', desc: 'Address & pin position' },
  { id: 5, title: 'Photos & Review', desc: 'Gallery & publish' },
];

export function StepNavigation({
  currentStep,
  onGoToStep,
}: StepNavigationProps) {
  const numericStep = typeof currentStep === 'number' ? currentStep : 5;

  return (
    <div className="flex flex-col gap-3">
      {STEPS_CONFIG.map((step) => {
        const isCompleted = step.id < numericStep;
        const isCurrent = step.id === numericStep;

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onGoToStep(step.id as 1 | 2 | 3 | 4 | 5)}
            className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] ${
              isCurrent
                ? 'border-[#128A4E] bg-[#E8F5EE] shadow-2xs'
                : isCompleted
                ? 'border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50'
                : 'border-gray-100 bg-gray-50/50 hover:bg-gray-100/60'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                isCurrent
                  ? 'bg-[#128A4E] text-white shadow-xs'
                  : isCompleted
                  ? 'bg-[#128A4E] text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {isCompleted ? '✓' : step.id}
            </div>

            <div className="flex flex-col min-w-0">
              <span
                className={`text-xs font-extrabold truncate ${
                  isCurrent ? 'text-[#128A4E]' : 'text-[#0F172A]'
                }`}
              >
                {step.title}
              </span>
              <span className="text-[10px] text-gray-400 font-medium truncate">
                {step.desc}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
