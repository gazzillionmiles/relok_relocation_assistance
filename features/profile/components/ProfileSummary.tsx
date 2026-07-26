import React from 'react';
import { UserProfile } from '@/types';
import { ProfileAvatar } from './ProfileAvatar';

export interface ProfileSummaryProps {
  userProfile: UserProfile;
}

export function ProfileSummary({ userProfile }: ProfileSummaryProps) {
  console.log(userProfile)
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs flex flex-col gap-5">
      {/* Top Identity Lockup */}
      <div className="flex items-center gap-4">
        <ProfileAvatar
          photoUrl={userProfile.photoUrl}
          fullName={userProfile.fullName}
          size="lg"
        />

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-[#0F172A] truncate">
              {userProfile.fullName || 'User'}
            </h2>
            <span className="w-5 h-5 rounded-full bg-[#128A4E] text-white flex items-center justify-center text-[10px] font-bold shadow-2xs">
              ✓
            </span>
          </div>

          <p className="text-xs text-gray-500 font-semibold truncate mt-0.5">
            {userProfile.occupation || 'No Occupation Added'}{userProfile.age ? ` • ${userProfile.age} yrs` : ''}
          </p>

          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#128A4E] bg-[#E8F5EE] px-2.5 py-1 rounded-md self-start mt-2 border border-[#128A4E]/15">
            📍 Bengaluru Metro
          </span>
        </div>
      </div>

      {/* Education & Bio */}
      {userProfile.education && (
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 bg-slate-50 p-3 rounded-2xl border border-gray-100">
          <span>🎓</span>
          <span className="truncate">{userProfile.education}</span>
        </div>
      )}

      {userProfile.bio && (
        <div className="flex flex-col gap-1.5 bg-slate-50 p-4 rounded-2xl border border-gray-100 text-xs">
          <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
            Biography
          </span>
          <p className="text-gray-700 italic font-normal leading-relaxed">
            &quot;{userProfile.bio}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
