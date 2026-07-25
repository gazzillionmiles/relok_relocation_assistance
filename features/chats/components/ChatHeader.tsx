"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { RoommateCard } from '@/types';
import { OnlineStatus } from './OnlineStatus';
import { CompatibilityBadge } from '@/features/marketplace/components/CompatibilityBadge';
import { ReportUserDialog } from '@/features/reporting/components/ReportUserDialog';
import { BlockUserModal } from '@/features/reporting/components/BlockUserModal';

export interface ChatHeaderProps {
  partner: RoommateCard;
  onBackMobile?: () => void;
  onDeleteConversation?: () => void;
}

export function ChatHeader({ partner, onBackMobile, onDeleteConversation }: ChatHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);

  return (
    <div className="h-16 px-4 sm:px-6 bg-white border-b border-gray-100 flex items-center justify-between shrink-0 relative">
      <div className="flex items-center gap-3">
        {onBackMobile && (
          <button
            type="button"
            onClick={onBackMobile}
            aria-label="Back to conversations list"
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E]"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100 shrink-0 bg-gray-100">
          {partner.photoUrl ? (
            <Image
              src={partner.photoUrl}
              alt={partner.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-gray-400 text-sm">
              {partner.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <h2 className="text-xs sm:text-sm font-extrabold text-[#0F172A] truncate">
            {partner.name}
          </h2>
          <OnlineStatus isOnline={true} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <CompatibilityBadge score={partner.matchPercentage || 92} />

        {/* Chat Safety Menu (⋮) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-extrabold text-base hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Chat options"
          >
            ⋮
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-30 flex flex-col gap-1 text-xs font-bold text-slate-700 animate-in fade-in">
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  setShowReportDialog(true);
                }}
                className="w-full px-3 py-2 rounded-xl text-left hover:bg-red-50 text-red-600 flex items-center gap-2 cursor-pointer"
              >
                <span>🚩 Report Conversation</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  setShowBlockModal(true);
                }}
                className="w-full px-3 py-2 rounded-xl text-left hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
              >
                <span>🚫 Block User</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  if (onDeleteConversation) onDeleteConversation();
                }}
                className="w-full px-3 py-2 rounded-xl text-left hover:bg-slate-50 text-slate-500 flex items-center gap-2 cursor-pointer border-t border-slate-100 pt-1.5"
              >
                <span>🗑️ Delete Conversation</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <ReportUserDialog
        isOpen={showReportDialog}
        onClose={() => setShowReportDialog(false)}
        userName={partner.name}
      />

      <BlockUserModal
        isOpen={showBlockModal}
        onClose={() => setShowBlockModal(false)}
        userName={partner.name}
      />
    </div>
  );
}
