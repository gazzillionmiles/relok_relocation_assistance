import React from 'react';

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function StepIndicator({
  currentStep,
  totalSteps,
  className = '',
}: StepIndicatorProps) {
  return (
    <div
      className={`w-full flex flex-col gap-2 ${className}`}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Step ${currentStep} of ${totalSteps}`}
    >
      <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-[#128A4E]">
        <span>Step {currentStep} of {totalSteps}</span>
        <span className="text-[#6B7280]">
          {Math.round((currentStep / totalSteps) * 100)}% Completed
        </span>
      </div>
      <div className="w-full h-2 flex gap-1.5 rounded-full overflow-hidden bg-[#E5E7EB]">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-full flex-1 rounded-full transition-colors duration-300 ${
              index < currentStep ? 'bg-[#128A4E]' : 'bg-[#E5E7EB]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
