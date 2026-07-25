"use client";

import React from 'react';
import { HouseRules } from '@/types';
import { StepHeader } from '../StepHeader';
import { StepFooter } from '../StepFooter';
import { PreferenceSection } from '../PreferenceSection';

export interface Step5RulesProps {
  data: HouseRules;
  onChange: (data: HouseRules) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export function Step5Rules({
  data,
  onChange,
  onNext,
  onBack,
  onSkip,
}: Step5RulesProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isComplete = !!data.guests && !!data.loudMusic && !!data.lateEntry;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between flex-1 gap-6">
      <div className="flex flex-col gap-6">
        <StepHeader
          currentStep={5}
          title="House Rules"
          subtitle="What rules do you expect in your shared home?"
          onBack={onBack}
          onSkip={onSkip}
        />

        <div className="flex flex-col gap-6 mt-2">
          <PreferenceSection
            label="Guests Policy"
            options={['No Guests', 'Daytime Only', 'Guests Allowed']}
            selectedValue={data.guests}
            onSelect={(val) =>
              onChange({
                ...data,
                guests: val as 'No Guests' | 'Daytime Only' | 'Guests Allowed',
              })
            }
          />

          <PreferenceSection
            label="Loud Music Policy"
            options={['Quiet Hours', 'Flexible']}
            selectedValue={data.loudMusic}
            onSelect={(val) =>
              onChange({
                ...data,
                loudMusic: val as 'Quiet Hours' | 'Flexible',
              })
            }
          />

          <PreferenceSection
            label="Late Entry Policy"
            options={['Before 11 PM', 'Anytime']}
            selectedValue={data.lateEntry}
            onSelect={(val) =>
              onChange({
                ...data,
                lateEntry: val as 'Before 11 PM' | 'Anytime',
              })
            }
          />
        </div>
      </div>

      <StepFooter onBack={onBack} nextText="Continue" isNextDisabled={!isComplete} />
    </form>
  );
}
