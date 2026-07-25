import React from 'react';
import { UserProfile, LifestylePreferences, HouseRules } from '@/types';
import { calculateProfileCompleteness } from '../lib/profile-validation';

export interface ProfileStatsProps {
  userProfile: UserProfile;
  lifestylePref: LifestylePreferences;
  houseRules: HouseRules;
  onCompleteClick?: () => void;
}

export function ProfileStats({
  userProfile,
  lifestylePref,
  houseRules,
  onCompleteClick,
}: ProfileStatsProps) {
  const completeness = calculateProfileCompleteness(
    userProfile,
    lifestylePref,
    houseRules
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Profile Completion Bar */}
      <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-gray-400 uppercase tracking-wider">
            Profile Completion
          </span>
          <span className="text-[#128A4E] font-black">{completeness}% Completed</span>
        </div>

        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#128A4E] rounded-full transition-all duration-500"
            style={{ width: `${completeness}%` }}
          />
        </div>

        {completeness < 100 && onCompleteClick && (
          <button
            type="button"
            onClick={onCompleteClick}
            className="text-xs font-bold text-[#128A4E] hover:underline text-left mt-1 cursor-pointer"
          >
            Complete remaining details to hit 100% →
          </button>
        )}
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-gray-100 p-4 rounded-2xl flex flex-col items-center text-center gap-0.5 shadow-2xs">
          <span className="text-lg font-black text-[#0F172A]">5</span>
          <span className="text-[10px] font-extrabold text-[#128A4E] uppercase tracking-wider">
            Matches
          </span>
          <span className="text-[9px] text-gray-400 font-medium">Compatible</span>
        </div>

        <div className="bg-white border border-gray-100 p-4 rounded-2xl flex flex-col items-center text-center gap-0.5 shadow-2xs">
          <span className="text-lg font-black text-[#0F172A]">1</span>
          <span className="text-[10px] font-extrabold text-[#128A4E] uppercase tracking-wider">
            Listing
          </span>
          <span className="text-[9px] text-gray-400 font-medium">Posted</span>
        </div>

        <div className="bg-white border border-gray-100 p-4 rounded-2xl flex flex-col items-center text-center gap-0.5 shadow-2xs">
          <span className="text-lg font-black text-[#0F172A]">3</span>
          <span className="text-[10px] font-extrabold text-[#128A4E] uppercase tracking-wider">
            Chats
          </span>
          <span className="text-[9px] text-gray-400 font-medium">Conversations</span>
        </div>
      </div>
    </div>
  );
}
