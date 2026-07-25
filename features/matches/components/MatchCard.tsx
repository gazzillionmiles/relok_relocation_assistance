"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RoommateCard } from '@/types';
import { CompatibilityBadge } from './CompatibilityBadge';
import { getMatchScore } from '../lib/compatibility-score';
import { useSafetyCheck } from '@/components/compliance/useSafetyCheck';
import { SafetyDisclaimerModal } from '@/components/compliance/SafetyDisclaimerModal';

export interface MatchCardProps {
  roommate: RoommateCard;
  isSelected?: boolean;
  onSelect: () => void;
}

export function MatchCard({
  roommate,
  isSelected = false,
  onSelect,
}: MatchCardProps) {
  const router = useRouter();
  const matchScore = getMatchScore(roommate);
  const {
    isDisclaimerOpen,
    executeWithSafetyCheck,
    handleDisclaimerAccept,
    handleDisclaimerClose,
    actionDescription,
  } = useSafetyCheck();

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    executeWithSafetyCheck(() => {
      router.push('/chats');
    }, `messaging ${roommate.name}`);
  };

  return (
    <>
      <div
        onClick={onSelect}
        className={`bg-white rounded-2xl border p-4.5 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-3.5 cursor-pointer relative group ${
          isSelected
            ? 'border-[#128A4E] ring-2 ring-[#128A4E]/20 bg-[#E8F5EE]/20 shadow-sm scale-[1.01]'
            : 'border-gray-100 hover:border-[#128A4E]/30'
        }`}
      >
        {/* Header Row: Avatar, Name, Score */}
        <div className="flex justify-between items-start gap-3">
          <div className="flex items-center gap-3.5">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100 shrink-0 bg-gray-100">
              {roommate.photoUrl ? (
                <Image
                  src={roommate.photoUrl}
                  alt={roommate.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-gray-400 text-lg">
                  {roommate.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex flex-col min-w-0">
              <h3 className="text-base font-extrabold text-[#0F172A] group-hover:text-[#128A4E] transition-colors truncate">
                {roommate.name}, {roommate.age}
              </h3>
              <p className="text-xs text-gray-500 font-medium truncate">
                {roommate.occupation.split(' at ')[0]}
              </p>
              <span className="text-[10px] font-extrabold text-[#128A4E] bg-[#E8F5EE] px-2 py-0.5 rounded-md self-start mt-1">
                Budget: {roommate.budget}/mo
              </span>
            </div>
          </div>

          <CompatibilityBadge score={matchScore} />
        </div>

        {/* Bio Quote */}
        <p className="text-xs text-gray-600 italic font-normal leading-relaxed line-clamp-2">
          &quot;{roommate.bio}&quot;
        </p>

        {/* Traits Badges */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
          <span className="text-[10px] bg-slate-50 text-gray-600 font-bold px-2 py-0.5 rounded-md border border-gray-100">
            ⏰ {roommate.sleepSchedule}
          </span>
          <span className="text-[10px] bg-slate-50 text-gray-600 font-bold px-2 py-0.5 rounded-md border border-gray-100">
            ✨ {roommate.cleanliness}
          </span>
          <span className="text-[10px] bg-slate-50 text-gray-600 font-bold px-2 py-0.5 rounded-md border border-gray-100">
            🥦 {roommate.dietary}
          </span>
        </div>

        {/* Footer Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="text-xs font-bold text-gray-600 hover:text-[#128A4E] hover:underline cursor-pointer"
          >
            View Full Profile →
          </button>

          <button
            type="button"
            onClick={handleChatClick}
            className="text-xs font-extrabold text-white bg-[#128A4E] hover:bg-[#0F7A44] px-3.5 py-1.5 rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            Chat Direct
          </button>
        </div>
      </div>

      <SafetyDisclaimerModal
        isOpen={isDisclaimerOpen}
        onAccept={handleDisclaimerAccept}
        onClose={handleDisclaimerClose}
        requiredForAction={actionDescription}
      />
    </>
  );
}
