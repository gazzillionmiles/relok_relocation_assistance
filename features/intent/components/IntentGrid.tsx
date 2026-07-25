"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IntentOption } from '../types';
import { INTENT_OPTIONS } from '../data';
import { IntentCard } from './IntentCard';
import { ContinueButton } from './ContinueButton';

export function IntentGrid() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<IntentOption | null>(
    INTENT_OPTIONS[0]
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelect = (option: IntentOption) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (!selectedOption) return;
    setIsLoading(true);
    setTimeout(() => {
      router.push(selectedOption.route);
    }, 200);
  };

  const handleSkip = () => {
    router.push('/home');
  };

  return (
    <div className="w-full flex flex-col gap-8 my-4">
      {/* Responsive Grid: 1-col on Mobile, 2-col on Tablet, 3-col on Desktop */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 w-full max-w-5xl mx-auto"
        role="radiogroup"
        aria-label="Select your primary co-living goal"
      >
        {INTENT_OPTIONS.map((option) => (
          <IntentCard
            key={option.id}
            option={option}
            isSelected={selectedOption?.id === option.id}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Action Footer */}
      <div className="flex flex-col items-center gap-4 pt-4 border-t border-gray-100">
        <ContinueButton
          onClick={handleContinue}
          disabled={!selectedOption}
          isLoading={isLoading}
          label={
            selectedOption
              ? `Continue: ${selectedOption.title} →`
              : 'Select an Option to Continue'
          }
        />

        <button
          type="button"
          onClick={handleSkip}
          className="text-xs sm:text-sm font-semibold text-[#6B7280] hover:text-[#0F172A] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] rounded-md px-3 py-1"
        >
          Skip, just take me to home page
        </button>
      </div>
    </div>
  );
}
