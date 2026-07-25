"use client";

import React from 'react';
import Image from 'next/image';
import { RoommateCard } from '@/types';
import { CompatibilityBadge } from './CompatibilityBadge';
import { CompatibilityBreakdown } from './CompatibilityBreakdown';
import { LifestyleComparison } from './LifestyleComparison';
import { PreferenceSummary } from './PreferenceSummary';
import { QuickActions } from './QuickActions';
import { getMatchScore } from '../lib/compatibility-score';

export interface MatchDetailsProps {
  roommate: RoommateCard;
  onCloseMobile?: () => void;
}

export function MatchDetails({ roommate, onCloseMobile }: MatchDetailsProps) {
  const matchScore = getMatchScore(roommate);
 
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex flex-col gap-4 overflow-y-auto max-h-[85vh] lg:max-h-[calc(100vh-100px)] sticky top-16">
      {/* Top Header Row with Close Action on Mobile */}
      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
        <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
          Candidate Match Profile
        </span>
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close details"
            className="lg:hidden w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-600 hover:bg-gray-200"
          >
            ✕
          </button>
        )}
      </div>
 
      {/* Hero Avatar Card */}
      <div className="flex flex-col items-center text-center gap-2 bg-gradient-to-br from-[#E8F5EE] to-slate-50 p-4 sm:p-5 rounded-xl border border-[#128A4E]/15">
        <div className="relative w-20 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100">
          {roommate.photoUrl ? (
            <Image
              src={roommate.photoUrl}
              alt={roommate.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-gray-400 text-xl">
              {roommate.name.charAt(0)}
            </div>
          )}
        </div>
 
        <div className="flex flex-col gap-0.5">
          <h3 className="text-lg font-black text-[#0F172A]">{roommate.name}</h3>
          <p className="text-[11px] text-gray-500 font-semibold">
            {roommate.age} years old • {roommate.gender}
          </p>
          <p className="text-[11px] text-gray-400 font-semibold">{roommate.occupation}</p>
        </div>
 
        <CompatibilityBadge score={matchScore} />
      </div>
 
      {/* About Section */}
      <div className="flex flex-col gap-1 bg-slate-50 p-3.5 rounded-xl border border-gray-100">
        <span className="text-[9px] font-extrabold uppercase text-gray-400 tracking-wider">
          About {roommate.name.split(' ')[0]}
        </span>
        <p className="text-xs text-gray-700 italic font-normal leading-relaxed">
          &quot;{roommate.bio}&quot;
        </p>
      </div>

      {/* Parameter Compatibility Breakdown */}
      <CompatibilityBreakdown roommate={roommate} />

      {/* Lifestyle Traits Comparison */}
      <LifestyleComparison roommate={roommate} />

      {/* Education & Budget Summary */}
      <PreferenceSummary roommate={roommate} />

      {/* Quick Action CTA */}
      <QuickActions partnerName={roommate.name} />
    </div>
  );
}
