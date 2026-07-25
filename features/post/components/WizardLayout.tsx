import React from 'react';
import { WizardSidebar } from './WizardSidebar';
import { StepNumber } from '../hooks/usePostingWizard';

export interface WizardLayoutProps {
  children: React.ReactNode;
  currentStep: StepNumber;
  onGoToStep: (step: 1 | 2 | 3 | 4 | 5) => void;
  isStepValid: (step: number) => boolean;
}

export function WizardLayout({
  children,
  currentStep,
  onGoToStep,
  isStepValid,
}: WizardLayoutProps) {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Sidebar (Visible on Desktop >=1024px) */}
      <div className="hidden lg:block lg:col-span-4 xl:col-span-4">
        <WizardSidebar
          currentStep={currentStep}
          onGoToStep={onGoToStep}
          isStepValid={isStepValid}
        />
      </div>

      {/* Right Active Form Area */}
      <div className="col-span-1 lg:col-span-8 xl:col-span-8 bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-xs flex flex-col justify-between min-h-[580px]">
        {children}
      </div>
    </div>
  );
}
