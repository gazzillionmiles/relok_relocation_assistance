import React from 'react';
import { StepIndicator } from './StepIndicator';

export interface StepHeaderProps {
  currentStep: number;
  totalSteps?: number;
  title: string;
  subtitle: string;
  onBack?: () => void;
  onSkip?: () => void;
}

export function StepHeader({
  currentStep,
  totalSteps = 6,
  title,
  subtitle,
  onBack,
  onSkip,
}: StepHeaderProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {/* Top Controls Row */}
      <div className="flex justify-between items-center h-8">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="w-8 h-8 -ml-1.5 rounded-full flex items-center justify-center text-[#0F172A] hover:bg-gray-100 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E]"
            aria-label="Go to previous step"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : (
          <div />
        )}
 
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="text-xs font-semibold text-[#128A4E] hover:text-[#0F7A44] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] rounded-md px-2 py-0.5 cursor-pointer"
          >
            Skip
          </button>
        )}
      </div>
 
      {/* Progress Bar & Header Text */}
      <div className="flex flex-col gap-1">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight mt-0.5">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-[#6B7280] font-medium leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
