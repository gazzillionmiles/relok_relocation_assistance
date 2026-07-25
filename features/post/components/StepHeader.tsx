import React from 'react';

export interface StepHeaderProps {
  currentStep: number;
  totalSteps?: number;
  title: string;
  subtitle: string;
}

export function StepHeader({
  currentStep,
  totalSteps = 5,
  title,
  subtitle,
}: StepHeaderProps) {
  return (
    <div className="flex flex-col gap-2 pb-4 border-b border-gray-100">
      <div className="flex justify-between items-center text-xs font-bold text-[#128A4E]">
        <span>Step {currentStep} of {totalSteps}</span>
        <span className="text-gray-400 font-medium">
          {Math.round((currentStep / totalSteps) * 100)}% Completed
        </span>
      </div>

      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#128A4E] rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight mt-2">
        {title}
      </h2>
      <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
