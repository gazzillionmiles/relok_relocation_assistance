"use client";

import React from 'react';
import { RoomPreferences } from '@/types';
import { StepHeader } from '../StepHeader';
import { StepFooter } from '../StepFooter';
import { MultiSelectCities } from '../MultiSelectCities';
import { BudgetRange } from '../BudgetRange';
import { PreferenceSection } from '../PreferenceSection';
import { Input } from '@/components/ui/Input';
import { GooglePlacesAutocompleteInput } from '@/components/ui/GooglePlacesAutocompleteInput';

export interface Step3RoommatePrefProps {
  data: RoomPreferences;
  onChange: (data: RoomPreferences) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

const LANGUAGES = [
  'English',
  'Hindi',
  'Gujarati',
  'Marathi',
  'Kannada',
  'Telugu',
  'Tamil',
  'Bengali',
  'Punjabi',
  'Malayalam',
];

export function Step3RoommatePref({
  data,
  onChange,
  onNext,
  onBack,
  onSkip,
}: Step3RoommatePrefProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const selectedLangs = data.preferredLanguage
    ? data.preferredLanguage.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const toggleLanguage = (lang: string) => {
    let nextLangs: string[];
    if (selectedLangs.includes(lang)) {
      nextLangs = selectedLangs.filter((l) => l !== lang);
    } else {
      nextLangs = [...selectedLangs, lang];
    }
    onChange({ ...data, preferredLanguage: nextLangs.join(', ') });
  };

  const isComplete =
    data.cities.length > 0 &&
    !!data.budgetMax &&
    !!data.sharingType;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between flex-1 gap-6">
      <div className="flex flex-col gap-6">
        <StepHeader
          currentStep={3}
          title="Roommate Preferences"
          subtitle="Define expectations for your room and flatmate."
          onBack={onBack}
          onSkip={onSkip}
        />

        <div className="flex flex-col gap-6">
          <MultiSelectCities
            selectedCities={data.cities}
            onChange={(cities) => onChange({ ...data, cities })}
          />

          <BudgetRange
            minBudget={data.budgetMin}
            maxBudget={data.budgetMax}
            onMinChange={(val) => onChange({ ...data, budgetMin: val })}
            onMaxChange={(val) => onChange({ ...data, budgetMax: val })}
          />

          <PreferenceSection
            label="Sharing Mode Preference"
            options={['Private Room', 'Shared Room', 'Entire Flat']}
            selectedValue={data.sharingType}
            onSelect={(val) =>
              onChange({
                ...data,
                sharingType: val as 'Private Room' | 'Shared Room' | 'Entire Flat',
              })
            }
          />

          <Input
            label="Preferred Move-in Date"
            type="date"
            value={data.moveInDate || ''}
            onChange={(e) => onChange({ ...data, moveInDate: e.target.value })}
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#0F172A]">
              Preferred Flatmate Gender
            </label>
            <div className="flex gap-1.5 h-12 bg-gray-100 p-1.5 rounded-xl">
              {(['Male', 'Female', 'Other', 'Any'] as const).map((g) => {
                const isSelected = (data.preferredGender || 'Any') === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => onChange({ ...data, preferredGender: g })}
                    className={`flex-1 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-[#128A4E] text-white shadow-xs'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>

          <GooglePlacesAutocompleteInput
            label="Preferred Locality / Area"
            placeholder="e.g. Indiranagar, Koramangala"
            value={data.preferredLocality || ''}
            onChange={(val) => onChange({ ...data, preferredLocality: val })}
            cityContext={data.cities[0] || 'Bengaluru'}
          />

          {/* Age Range Sliders & Inputs */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-[#0F172A]">
                Preferred Flatmate Age Range
              </label>
              <span className="text-xs font-extrabold text-[#128A4E]">
                {data.preferredAgeMin || 18} – {data.preferredAgeMax || 60} years
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-gray-100">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-500">Min Age</span>
                  <input
                    type="number"
                    min={18}
                    max={60}
                    value={data.preferredAgeMin || 18}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const maxVal = data.preferredAgeMax || 60;
                      onChange({
                        ...data,
                        preferredAgeMin: Math.max(18, Math.min(val, maxVal - 1)),
                      });
                    }}
                    className="w-16 text-center px-1.5 py-0.5 bg-white border border-gray-200 rounded-md font-bold text-gray-800"
                  />
                </div>
                <input
                  type="range"
                  min={18}
                  max={60}
                  value={data.preferredAgeMin || 18}
                  onChange={(e) => {
                    const minVal = Number(e.target.value);
                    const maxVal = data.preferredAgeMax || 60;
                    onChange({
                      ...data,
                      preferredAgeMin: Math.min(minVal, maxVal - 1),
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
                    value={data.preferredAgeMax || 60}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const minVal = data.preferredAgeMin || 18;
                      onChange({
                        ...data,
                        preferredAgeMax: Math.min(60, Math.max(val, minVal + 1)),
                      });
                    }}
                    className="w-16 text-center px-1.5 py-0.5 bg-white border border-gray-200 rounded-md font-bold text-gray-800"
                  />
                </div>
                <input
                  type="range"
                  min={18}
                  max={60}
                  value={data.preferredAgeMax || 60}
                  onChange={(e) => {
                    const maxVal = Number(e.target.value);
                    const minVal = data.preferredAgeMin || 18;
                    onChange({
                      ...data,
                      preferredAgeMax: Math.max(maxVal, minVal + 1),
                    });
                  }}
                  className="w-full accent-[#128A4E] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Preferred Languages Multi-select */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#0F172A]">
              Preferred Languages
            </label>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => {
                const isSelected = selectedLangs.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-[#128A4E] text-white border-[#128A4E] shadow-2xs'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {lang} {isSelected ? '✓' : ''}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <StepFooter onBack={onBack} nextText="Continue" isNextDisabled={!isComplete} />
    </form>
  );
}
