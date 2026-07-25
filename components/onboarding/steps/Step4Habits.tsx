"use client";

import React from 'react';
import { LifestyleHabits } from '@/types';
import { StepHeader } from '../StepHeader';
import { StepFooter } from '../StepFooter';
import { PreferenceSection } from '../PreferenceSection';

export interface Step4HabitsProps {
  data: LifestyleHabits;
  onChange: (data: LifestyleHabits) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export function Step4Habits({
  data,
  onChange,
  onNext,
  onBack,
  onSkip,
}: Step4HabitsProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isComplete = !!data.personality && !!data.pets;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between flex-1 gap-6">
      <div className="flex flex-col gap-6">
        <StepHeader
          currentStep={4}
          title="Lifestyle Habits"
          subtitle="Details regarding social dynamics and pets."
          onBack={onBack}
          onSkip={onSkip}
        />

        <div className="flex flex-col gap-6 mt-2">
          <PreferenceSection
            label="Personality Type"
            options={['Extrovert', 'Introvert', 'Balanced']}
            selectedValue={data.personality}
            onSelect={(val) =>
              onChange({
                ...data,
                personality: val as 'Extrovert' | 'Introvert' | 'Balanced',
              })
            }
          />

          <PreferenceSection
            label="Pet Policy & Stance"
            options={['No Pets', 'Dog Lover', 'Cat Lover', "Don't mind"]}
            selectedValue={data.pets}
            onSelect={(val) =>
              onChange({
                ...data,
                pets: val as 'No Pets' | 'Dog Lover' | 'Cat Lover' | "Don't mind",
              })
            }
          />
        </div>
      </div>

      <StepFooter onBack={onBack} nextText="Continue" isNextDisabled={!isComplete} />
    </form>
  );
}
