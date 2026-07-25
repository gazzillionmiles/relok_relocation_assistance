"use client";

import React from 'react';
import { LifestylePreferences } from '@/types';
import { PreferenceSection } from '../PreferenceSection';
import { StepHeader } from '../StepHeader';
import { StepFooter } from '../StepFooter';

export interface Step1LifestyleProps {
  data: LifestylePreferences;
  onChange: (data: LifestylePreferences) => void;
  onNext: () => void;
  onSkip: () => void;
  onBackToLogin: () => void;
}

export function Step1Lifestyle({
  data,
  onChange,
  onNext,
  onSkip,
  onBackToLogin,
}: Step1LifestyleProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isComplete =
    !!data.sleepSchedule &&
    !!data.cleanliness &&
    !!data.smoking &&
    !!data.drinking &&
    !!data.dietary;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between flex-1 gap-6">
      <div className="flex flex-col gap-6">
        <StepHeader
          currentStep={1}
          title="Lifestyle & Preferences"
          subtitle="Help us find roommates with matching daily routines."
          onBack={onBackToLogin}
          onSkip={onSkip}
        />

        <div className="flex flex-col gap-6 mt-2">
          <PreferenceSection
            label="Sleep Schedule"
            options={['Early Bird', 'Night Owl']}
            selectedValue={data.sleepSchedule}
            onSelect={(val) =>
              onChange({ ...data, sleepSchedule: val as 'Early Bird' | 'Night Owl' })
            }
          />

          <PreferenceSection
            label="Cleanliness Level"
            options={['Spick & Span', 'Moderate', 'Chill']}
            selectedValue={data.cleanliness}
            onSelect={(val) =>
              onChange({
                ...data,
                cleanliness: val as 'Spick & Span' | 'Moderate' | 'Chill',
              })
            }
          />

          <PreferenceSection
            label="Smoking Preference"
            options={['Never', 'Occasionally', 'Yes']}
            selectedValue={data.smoking}
            onSelect={(val) =>
              onChange({ ...data, smoking: val as 'Never' | 'Occasionally' | 'Yes' })
            }
          />

          <PreferenceSection
            label="Drinking Preference"
            options={['Never', 'Occasionally', 'Yes']}
            selectedValue={data.drinking}
            onSelect={(val) =>
              onChange({ ...data, drinking: val as 'Never' | 'Occasionally' | 'Yes' })
            }
          />

          <PreferenceSection
            label="Dietary Preference"
            options={['Veg', 'Non-Veg', 'Any']}
            selectedValue={data.dietary}
            onSelect={(val) =>
              onChange({ ...data, dietary: val as 'Veg' | 'Non-Veg' | 'Any' })
            }
          />
        </div>
      </div>

      <StepFooter nextText="Continue" isNextDisabled={!isComplete} />
    </form>
  );
}
