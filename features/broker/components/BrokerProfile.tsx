"use client";

import React, { useState } from 'react';
import { BrokerDetails } from '../hooks/useBrokerDashboard';
import { VerificationStatus } from './VerificationStatus';
import { TrustSignals } from '@/features/safety/components/TrustSignals';
import { ReportUserDialog } from '@/features/reporting/components/ReportUserDialog';
import { BlockUserModal } from '@/features/reporting/components/BlockUserModal';

export interface BrokerProfileProps {
  brokerDetails: BrokerDetails;
  totalListings: number;
}

export function BrokerProfile({
  brokerDetails,
  totalListings,
}: BrokerProfileProps) {
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex flex-col gap-4">
      {/* Header Info */}
      <div className="flex items-center gap-3 pb-2.5 border-b border-gray-100">
        <div className="w-10 h-10 bg-[#E8F5EE] border border-[#128A4E]/20 rounded-xl flex items-center justify-center text-[#128A4E] text-xl shrink-0">
          🏢
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-sm font-extrabold text-[#0F172A] truncate">
            {brokerDetails.agencyName || 'Broker Enterprise'}
          </h3>
          <p className="text-xs text-gray-500 font-semibold">
            {brokerDetails.brokerType} • {brokerDetails.experience} Yrs Exp
          </p>
        </div>
      </div>

      {/* Trust Signals */}
      <TrustSignals
        memberSince={brokerDetails.memberSince || 'Jan 2024'}
        totalListings={totalListings}
        responseRate={brokerDetails.responseRate || '98%'}
      />

      <VerificationStatus
        reraNumber={brokerDetails.reraNumber}
      />

      {/* Operating Cities */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
          Operating Metro Cities
        </span>
        <div className="flex flex-wrap gap-1.5">
          {brokerDetails.areas.map((area) => (
            <span
              key={area}
              className="text-xs bg-[#E8F5EE] text-[#128A4E] font-extrabold px-2.5 py-1 rounded-lg border border-[#128A4E]/15"
            >
              📍 {area}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-gray-100 text-xs">
        <span className="font-bold text-gray-500">Active Listings</span>
        <span className="font-black text-[#128A4E]">{totalListings} Units</span>
      </div>

      {/* Profile Safety Actions */}
      <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
        <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
          Profile Actions
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="h-10 rounded-xl bg-[#128A4E] text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#0F7A44] transition-all cursor-pointer"
          >
            💬 Chat
          </button>
          <button
            type="button"
            className="h-10 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-200 transition-all cursor-pointer"
          >
            📞 Call
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1.5 mt-1">
          <button
            type="button"
            onClick={handleShare}
            className="h-9 rounded-lg bg-slate-50 text-slate-600 font-semibold text-[11px] flex items-center justify-center gap-1 hover:bg-slate-100 border border-slate-200 cursor-pointer"
          >
            {copiedLink ? '✓ Copied' : '🔗 Share'}
          </button>
          <button
            type="button"
            onClick={() => setShowReportDialog(true)}
            className="h-9 rounded-lg bg-slate-50 text-red-600 font-semibold text-[11px] flex items-center justify-center gap-1 hover:bg-red-50 border border-slate-200 cursor-pointer"
          >
            🚩 Report
          </button>
          <button
            type="button"
            onClick={() => setShowBlockModal(true)}
            className="h-9 rounded-lg bg-slate-50 text-slate-700 font-semibold text-[11px] flex items-center justify-center gap-1 hover:bg-slate-100 border border-slate-200 cursor-pointer"
          >
            🚫 Block
          </button>
        </div>
      </div>

      {/* Dialogs */}
      <ReportUserDialog
        isOpen={showReportDialog}
        onClose={() => setShowReportDialog(false)}
        userName={brokerDetails.agencyName}
      />

      <BlockUserModal
        isOpen={showBlockModal}
        onClose={() => setShowBlockModal(false)}
        userName={brokerDetails.agencyName}
      />
    </div>
  );
}
