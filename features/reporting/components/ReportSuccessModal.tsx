"use client";

import React from 'react';
import { Button } from '@/components/ui/Button';

interface ReportSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportSuccessModal({ isOpen, onClose }: ReportSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-2xl border border-slate-100 flex flex-col items-center text-center gap-3.5">
        <div className="w-12 h-12 bg-emerald-100 text-[#128A4E] rounded-full flex items-center justify-center shadow-xs">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
 
        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-extrabold text-slate-900">Thank you</h3>
          <p className="text-xs font-medium text-slate-600 leading-relaxed">
            Your report has been submitted. Our moderation team will review it shortly to keep our community safe.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={onClose}
          className="w-full h-11 mt-2 text-sm font-bold"
        >
          Done
        </Button>
      </div>
    </div>
  );
}
