"use client";

import React from 'react';
import { PostingFormData } from '../lib/validation';
import { StepHeader } from './StepHeader';
import { LifestyleSelector } from './LifestyleSelector';
import { Button } from '@/components/ui/Button';

export interface RoommatePreferenceStepProps {
  formData: PostingFormData;
  updateFormData: (fields: Partial<PostingFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isValid: boolean;
}

export function RoommatePreferenceStep({
  formData,
  updateFormData,
  onNext,
  onPrev,
  isValid,
}: RoommatePreferenceStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between flex-1 gap-6">
      <div className="flex flex-col gap-6">
        <StepHeader
          currentStep={3}
          title="Roommate Preferences"
          subtitle="Set gender, age range, and lifestyle expectations for prospective flatmates."
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#0F172A]">
            Preferred Flatmate Gender
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['Male', 'Female', 'Any'] as const).map((gender) => {
              const isSelected = formData.preferredGender === gender;

              return (
                <button
                  key={gender}
                  type="button"
                  onClick={() => updateFormData({ preferredGender: gender })}
                  aria-pressed={isSelected}
                  className={`h-12 rounded-xl border text-sm font-bold transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] ${
                    isSelected
                      ? 'border-[#128A4E] text-[#128A4E] bg-[#E8F5EE] shadow-2xs font-extrabold'
                      : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'
                  }`}
                >
                  {gender}
                </button>
              );
            })}
          </div>
        </div>

        {/* Age Range Sliders */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-[#0F172A]">
              Preferred Age Range
            </label>
            <span className="text-xs font-extrabold text-[#128A4E]">
              {formData.preferredAgeMin} – {formData.preferredAgeMax} years
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-gray-100">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-500">Min Age</span>
                <input
                  type="number"
                  min={18}
                  max={60}
                  value={formData.preferredAgeMin}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    updateFormData({
                      preferredAgeMin: Math.max(18, Math.min(val, formData.preferredAgeMax - 1)),
                    });
                  }}
                  className="w-16 text-center px-2 py-0.5 bg-white border border-gray-200 rounded-md font-bold text-gray-800"
                />
              </div>
              <input
                type="range"
                min={18}
                max={60}
                value={formData.preferredAgeMin}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  updateFormData({
                    preferredAgeMin: Math.min(val, formData.preferredAgeMax - 1),
                  });
                }}
                className="w-full accent-[#128A4E] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-500">Max Age</span>
                <input
                  type="number"
                  min={18}
                  max={60}
                  value={formData.preferredAgeMax}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    updateFormData({
                      preferredAgeMax: Math.min(60, Math.max(val, formData.preferredAgeMin + 1)),
                    });
                  }}
                  className="w-16 text-center px-2 py-0.5 bg-white border border-gray-200 rounded-md font-bold text-gray-800"
                />
              </div>
              <input
                type="range"
                min={18}
                max={60}
                value={formData.preferredAgeMax}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  updateFormData({
                    preferredAgeMax: Math.max(val, formData.preferredAgeMin + 1),
                  });
                }}
                className="w-full accent-[#128A4E] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        <LifestyleSelector
          selectedPrefs={formData.lifestylePrefs}
          onChange={(lifestylePrefs) => updateFormData({ lifestylePrefs })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <Button type="button" variant="secondary" onClick={onPrev}>
          ← Back
        </Button>
        <Button type="submit" variant="primary" disabled={!isValid}>
          Continue to Step 4 →
        </Button>
      </div>
    </form>
  );
}
