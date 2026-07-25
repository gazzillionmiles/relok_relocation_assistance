"use client";

import React from 'react';
import { UserProfile } from '@/types';
import { StepHeader } from '../StepHeader';
import { StepFooter } from '../StepFooter';
import { ProfilePhotoUploader } from '../ProfilePhotoUploader';
import { Input } from '@/components/ui/Input';
import { AutocompleteInput } from '@/components/ui/AutocompleteInput';
import { OCCUPATIONS } from '@/data/autocompleteData';
import { getPrioritizedColleges } from '@/lib/autocomplete';

export interface Step2AboutYouProps {
  userProfile: UserProfile;
  onChangeProfile: (profile: UserProfile) => void;
  targetCity?: string;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export function Step2AboutYou({
  userProfile,
  onChangeProfile,
  targetCity = 'Bengaluru',
  onNext,
  onBack,
  onSkip,
}: Step2AboutYouProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isComplete =
    !!userProfile.fullName.trim() &&
    !!userProfile.age &&
    !!userProfile.gender;

  const collegeSuggestions = getPrioritizedColleges(targetCity);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between flex-1 gap-6">
      <div className="flex flex-col gap-6">
        <StepHeader
          currentStep={2}
          title="About You"
          subtitle="Tell prospective roommates a bit about yourself."
          onBack={onBack}
          onSkip={onSkip}
        />

        <ProfilePhotoUploader
          photoUrl={userProfile.photoUrl}
          onChange={(url) => onChangeProfile({ ...userProfile, photoUrl: url })}
        />

        <div className="flex flex-col gap-5">
          <Input
            label="Full Name"
            placeholder="e.g. Aarav Sharma"
            value={userProfile.fullName}
            onChange={(e) => onChangeProfile({ ...userProfile, fullName: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Age"
              placeholder="e.g. 24"
              type="number"
              min={18}
              max={100}
              value={userProfile.age}
              onChange={(e) => onChangeProfile({ ...userProfile, age: e.target.value })}
              required
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#0F172A]">Gender</label>
              <div className="flex gap-1.5 h-14 bg-gray-100 p-1.5 rounded-xl">
                {(['Male', 'Female', 'Other'] as const).map((g) => {
                  const isSelected = userProfile.gender === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => onChangeProfile({ ...userProfile, gender: g })}
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
          </div>

          <AutocompleteInput
            label="Occupation"
            placeholder="e.g. Software Engineer"
            value={userProfile.occupation}
            onChange={(val) => onChangeProfile({ ...userProfile, occupation: val })}
            suggestions={OCCUPATIONS}
          />

          <AutocompleteInput
            label="Education / College"
            placeholder="e.g. IIT Madras"
            value={userProfile.education}
            onChange={(val) => onChangeProfile({ ...userProfile, education: val })}
            suggestions={collegeSuggestions}
          />

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="user-bio-input" className="text-sm font-semibold text-[#0F172A]">
                Short Bio
              </label>
              <span className="text-xs text-gray-400 font-medium">
                {userProfile.bio.length}/150
              </span>
            </div>
            <textarea
              id="user-bio-input"
              rows={3}
              maxLength={150}
              placeholder="Write a brief bio about your habits, work, or hobbies..."
              value={userProfile.bio}
              onChange={(e) =>
                onChangeProfile({ ...userProfile, bio: e.target.value.slice(0, 150) })
              }
              className="w-full bg-white border border-[#E5E7EB] rounded-xl text-base p-4 focus:outline-none focus:border-[#128A4E] focus:ring-2 focus:ring-[#128A4E]/20 transition-all text-[#0F172A] placeholder-[#9CA3AF] resize-none"
            />
          </div>
        </div>
      </div>

      <StepFooter onBack={onBack} nextText="Continue" isNextDisabled={!isComplete} />
    </form>
  );
}
