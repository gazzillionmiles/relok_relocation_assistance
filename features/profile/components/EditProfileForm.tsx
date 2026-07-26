"use client";

import React from 'react';
import { UserProfile, LifestylePreferences } from '@/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AutocompleteInput } from '@/components/ui/AutocompleteInput';
const OCCUPATIONS = ['Student', 'Software Engineer', 'Designer', 'Doctor', 'Teacher', 'Business', 'Freelancer', 'Other'];
import { getPrioritizedColleges } from '@/lib/autocomplete';

export interface EditProfileFormProps {
  userProfile: UserProfile;
  onUpdateProfile: (fields: Partial<UserProfile>) => void;
  lifestylePref: LifestylePreferences;
  onUpdateLifestyle: (fields: Partial<LifestylePreferences>) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function EditProfileForm({
  userProfile,
  onUpdateProfile,
  lifestylePref,
  onUpdateLifestyle,
  onSave,
  onCancel,
}: EditProfileFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  const collegeSuggestions = getPrioritizedColleges('Bengaluru');

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs flex flex-col gap-6">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h3 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2">
          <span>✏️</span>
          <span>Edit Personal & Lifestyle Attributes</span>
        </h3>
      </div>

      <div className="flex flex-col gap-5">
        <Input
          label="Full Name"
          value={userProfile.fullName}
          onChange={(e) => onUpdateProfile({ fullName: e.target.value })}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Age"
            type="number"
            min={18}
            max={100}
            value={userProfile.age}
            onChange={(e) => onUpdateProfile({ age: e.target.value })}
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
                    onClick={() => onUpdateProfile({ gender: g })}
                    aria-pressed={isSelected}
                    className={`flex-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#128A4E] text-white shadow-2xs'
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
          onChange={(val) => onUpdateProfile({ occupation: val })}
          suggestions={OCCUPATIONS}
        />

        <AutocompleteInput
          label="Education / College"
          placeholder="e.g. B.Tech, IIT Madras"
          value={userProfile.education}
          onChange={(val) => onUpdateProfile({ education: val })}
          suggestions={collegeSuggestions}
        />

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="edit-bio-input" className="text-sm font-semibold text-[#0F172A]">
              Bio Biography
            </label>
            <span className="text-xs text-gray-400 font-medium">
              {userProfile.bio.length}/150
            </span>
          </div>
          <textarea
            id="edit-bio-input"
            rows={3}
            maxLength={150}
            value={userProfile.bio}
            onChange={(e) => onUpdateProfile({ bio: e.target.value.slice(0, 150) })}
            placeholder="Tell flatmates about your daily routine, vibes, and expectations..."
            className="w-full bg-white border border-[#E5E7EB] rounded-xl text-sm p-4 focus:outline-none focus:border-[#128A4E] focus:ring-2 focus:ring-[#128A4E]/20 transition-all text-[#0F172A] placeholder-[#9CA3AF] resize-none"
          />
        </div>

        {/* Lifestyle Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Sleep Schedule
            </label>
            <select
              value={lifestylePref.sleepSchedule}
              onChange={(e) =>
                onUpdateLifestyle({
                  sleepSchedule: e.target.value as 'Early Bird' | 'Night Owl',
                })
              }
              className="w-full h-12 bg-white border border-gray-200 rounded-xl px-3 text-xs font-bold text-[#0F172A]"
            >
              <option value="Early Bird">Early Bird</option>
              <option value="Night Owl">Night Owl</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Cleanliness Level
            </label>
            <select
              value={lifestylePref.cleanliness}
              onChange={(e) =>
                onUpdateLifestyle({
                  cleanliness: e.target.value as 'Spick & Span' | 'Moderate' | 'Chill',
                })
              }
              className="w-full h-12 bg-white border border-gray-200 rounded-xl px-3 text-xs font-bold text-[#0F172A]"
            >
              <option value="Spick & Span">Spick & Span</option>
              <option value="Moderate">Moderate</option>
              <option value="Chill">Chill</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save Profile Changes ✓
        </Button>
      </div>
    </form>
  );
}
