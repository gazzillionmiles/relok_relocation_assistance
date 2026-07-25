import React from 'react';
import Image from 'next/image';
import { UserProfile, LifestylePreferences, RoomPreferences } from '@/types';

export interface SummaryCardProps {
  userProfile: UserProfile;
  lifestylePref: LifestylePreferences;
  roomPref: RoomPreferences;
}

export function SummaryCard({
  userProfile,
  lifestylePref,
  roomPref,
}: SummaryCardProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center gap-4 text-left">
      <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-gray-100 bg-gray-100">
        {userProfile.photoUrl ? (
          <Image
            src={userProfile.photoUrl}
            alt={userProfile.fullName || 'User Profile Photo'}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">
            {userProfile.fullName?.charAt(0) || 'U'}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <h4 className="text-base font-extrabold text-[#0F172A] truncate">
          {userProfile.fullName || 'User'}
        </h4>
        <p className="text-xs text-[#6B7280] font-medium truncate">
          {userProfile.occupation || 'Co-living Seeker'} • {userProfile.age || '25'} yrs
        </p>

        <div className="flex gap-1.5 mt-1 flex-wrap">
          {lifestylePref.sleepSchedule && (
            <span className="text-[10px] bg-slate-100 text-gray-600 px-2 py-0.5 rounded font-semibold">
              {lifestylePref.sleepSchedule}
            </span>
          )}
          {lifestylePref.cleanliness && (
            <span className="text-[10px] bg-slate-100 text-gray-600 px-2 py-0.5 rounded font-semibold">
              {lifestylePref.cleanliness}
            </span>
          )}
          {roomPref.sharingType && (
            <span className="text-[10px] bg-[#E8F5EE] text-[#128A4E] px-2 py-0.5 rounded font-bold">
              {roomPref.sharingType}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
