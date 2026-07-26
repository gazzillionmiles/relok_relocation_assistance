"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RoommateCard as RoommateCardType } from '@/types';
import { CompatibilityBadge } from './CompatibilityBadge';
import { DistanceBadge } from './DistanceBadge';
import { calculateCompatibility } from '../lib/compatibility';
import { useSafetyCheck } from '@/components/compliance/useSafetyCheck';
import { SafetyDisclaimerModal } from '@/components/compliance/SafetyDisclaimerModal';
import { TrustSignals } from '@/features/safety/components/TrustSignals';
import { ReportUserDialog } from '@/features/reporting/components/ReportUserDialog';
import { BlockUserModal } from '@/features/reporting/components/BlockUserModal';

export interface RoommateCardProps {
  roommate: RoommateCardType;
  distanceKm?: number | null;
}

export function RoommateCard({ roommate, distanceKm }: RoommateCardProps) {
  const router = useRouter();
  const matchScore = calculateCompatibility(roommate);
  const [showMenu, setShowMenu] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [toastMsg, setToastMessage] = useState<string | null>(null);

  const {
    isDisclaimerOpen,
    executeWithSafetyCheck,
    handleDisclaimerAccept,
    handleDisclaimerClose,
    actionDescription,
  } = useSafetyCheck();

  const handleSendMessageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    executeWithSafetyCheck(() => {
      router.push('/chats');
    }, `messaging ${roommate.name}`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  if (isHidden) {
    return (
      <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-5 text-center text-xs font-semibold text-slate-500 flex flex-col items-center gap-1.5">
        <span>Roommate profile hidden from view.</span>
        <button
          onClick={() => setIsHidden(false)}
          className="text-[#128A4E] font-bold hover:underline cursor-pointer"
        >
          Undo Hide
        </button>
      </div>
    );
  }
 
  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 p-4.5 shadow-xs hover:shadow-md hover:border-[#128A4E]/30 transition-all duration-300 flex flex-col justify-between gap-3.5 relative group">
        
        {/* Toast Notification */}
        {toastMsg && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg animate-in fade-in">
            {toastMsg}
          </div>
        )}

        {/* Header Row with Avatar & Compatibility Badge & More menu */}
        <div className="flex justify-between items-start gap-3">
          <div className="flex gap-3.5 items-center">
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
                {roommate.name}
              </h3>
              <p className="text-xs text-gray-500 font-medium truncate">
                {roommate.age} yrs • {roommate.occupation.split(' at ')[0]}
              </p>
              <span className="text-[10px] font-extrabold text-[#128A4E] bg-[#E8F5EE] px-2 py-0.5 rounded-md self-start mt-1">
                Budget: {roommate.budget}/mo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CompatibilityBadge score={matchScore} />

            {/* More Menu (⋮) */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="More options"
              >
                ⋮
              </button>

              {showMenu && (
                <div
                  className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-100 p-1.5 z-30 flex flex-col gap-1 text-xs font-bold text-slate-700 animate-in fade-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => {
                      setIsSaved(!isSaved);
                      setShowMenu(false);
                      showToast(!isSaved ? 'Profile saved! 🔖' : 'Profile removed');
                    }}
                    className="w-full px-3 py-1.5 rounded-lg text-left hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <span>{isSaved ? '❤️ Saved' : '🤍 Save Profile'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                        showToast('Profile link copied! 🔗');
                      }
                    }}
                    className="w-full px-3 py-1.5 rounded-lg text-left hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <span>🔗 Share</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setShowReportDialog(true);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg text-left hover:bg-red-50 text-red-600 flex items-center gap-2 cursor-pointer"
                  >
                    <span>🚩 Report User</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setShowBlockModal(true);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg text-left hover:bg-slate-50 text-slate-600 flex items-center gap-2 cursor-pointer border-t border-slate-100 pt-1.5"
                  >
                    <span>🚫 Block User</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <DistanceBadge distanceKm={distanceKm ?? null} />

        <TrustSignals
          memberSince={roommate.memberSince || "Jan 2024"}
          lastActive="Active recently"
          profileCompletion={92}
        />

        {/* Bio Quote */}
        <p className="text-xs text-gray-600 italic font-normal leading-relaxed line-clamp-2">
          &quot;{roommate.bio}&quot;
        </p>

        {/* Lifestyle Traits Tags */}
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

        {/* Action CTA */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-xs font-bold text-gray-400">{roommate.city}</span>
          <button
            type="button"
            onClick={handleSendMessageClick}
            className="text-xs font-extrabold text-[#128A4E] bg-[#E8F5EE] hover:bg-[#128A4E] hover:text-white px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            Send Message →
          </button>
        </div>
      </div>

      <SafetyDisclaimerModal
        isOpen={isDisclaimerOpen}
        onAccept={handleDisclaimerAccept}
        onClose={handleDisclaimerClose}
        requiredForAction={actionDescription}
      />

      <ReportUserDialog
        isOpen={showReportDialog}
        onClose={() => setShowReportDialog(false)}
        userName={roommate.name}
      />

      <BlockUserModal
        isOpen={showBlockModal}
        onClose={() => setShowBlockModal(false)}
        userName={roommate.name}
      />
    </>
  );
}
