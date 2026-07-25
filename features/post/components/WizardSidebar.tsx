import React from 'react';
import { StepNavigation } from './StepNavigation';
import { StepNumber } from '../hooks/usePostingWizard';

export interface WizardSidebarProps {
  currentStep: StepNumber;
  onGoToStep: (step: 1 | 2 | 3 | 4 | 5) => void;
  isStepValid: (step: number) => boolean;
}

export function WizardSidebar({
  currentStep,
  onGoToStep,
  isStepValid,
}: WizardSidebarProps) {
  const numericStep = typeof currentStep === 'number' ? currentStep : 5;

  return (
    <aside className="w-full bg-white rounded-3xl border border-gray-100 p-6 shadow-xs flex flex-col justify-between gap-6 sticky top-20">
      {/* Header */}
      <div className="flex flex-col gap-1 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-xl">➕</span>
          <h2 className="text-lg font-extrabold text-[#0F172A]">Property Wizard</h2>
        </div>
        <p className="text-xs text-gray-500 font-medium">
          Step {numericStep} of 5 Checklist
        </p>
      </div>

      {/* Checklist Navigation */}
      <StepNavigation
        currentStep={currentStep}
        onGoToStep={onGoToStep}
        isStepValid={isStepValid}
      />

      {/* Tip Banner */}
      <div className="bg-[#E8F5EE] border border-[#128A4E]/20 rounded-2xl p-4 flex gap-2.5 items-center">
        <span className="text-base shrink-0">✨</span>
        <p className="text-xs font-bold text-[#128A4E] leading-relaxed">
          Listings with accurate location pins & photos receive 5x faster flatmate inquiries!
        </p>
      </div>
    </aside>
  );
}
