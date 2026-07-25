"use client";

import React from 'react';
import { UserProfile, LifestylePreferences, RoomPreferences } from '@/types';
import { StepHeader } from '../StepHeader';
import { SummaryCard } from '../SummaryCard';
import { Button } from '@/components/ui/Button';

export interface Step6CompleteProps {
  userProfile: UserProfile;
  lifestylePref: LifestylePreferences;
  roomPref: RoomPreferences;
  onComplete: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export function Step6Complete({
  userProfile,
  lifestylePref,
  roomPref,
  onComplete,
  onBack,
  onSkip,
}: Step6CompleteProps) {
  return (
    <div className="flex flex-col justify-between flex-1 gap-6">
      <div className="flex flex-col gap-6">
        <StepHeader
          currentStep={6}
          title="Profile Setup Complete!"
          subtitle="Your roommate matching profile is ready. Let’s find your home."
          onBack={onBack}
          onSkip={onSkip}
        />

        <div className="flex flex-col items-center justify-center text-center py-4 gap-6">
          {/* Animated House Completion Lockup */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center bg-[#E8F5EE] rounded-full border-[3px] border-[#128A4E]/20 animate-pulse">
            <svg
              className="w-20 h-20 sm:w-24 sm:h-24 text-[#128A4E]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <div className="absolute -bottom-1 -right-1 bg-[#128A4E] text-white p-3 rounded-full border-4 border-white shadow-md">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          <SummaryCard
            userProfile={userProfile}
            lifestylePref={lifestylePref}
            roomPref={roomPref}
          />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <Button
          variant="primary"
          onClick={onComplete}
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          }
        >
          Continue to Intent Gateway
        </Button>
      </div>
    </div>
  );
}
