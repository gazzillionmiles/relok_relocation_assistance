"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ReportSuccessModal } from './ReportSuccessModal';

export interface ReportUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userId?: string;
}

const USER_REPORT_REASONS = [
  'Spam',
  'Fake Profile',
  'Scam',
  'Harassment',
  'Inappropriate Behaviour',
  'Other',
];

export function ReportUserDialog({
  isOpen,
  onClose,
  userName = 'User',
}: ReportUserDialogProps) {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 500);
  };

  const handleCloseAll = () => {
    setSelectedReason('');
    setComments('');
    setShowSuccess(false);
    onClose();
  };

  if (showSuccess) {
    return <ReportSuccessModal isOpen={true} onClose={handleCloseAll} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-lg w-full shadow-2xl border border-slate-100 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
              👤
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Report User</h2>
              <p className="text-xs font-medium text-slate-500">{userName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>
 
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
              Reason for reporting
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {USER_REPORT_REASONS.map((reason) => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => setSelectedReason(reason)}
                  className={`p-2.5 rounded-lg border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                    selectedReason === reason
                      ? 'border-[#128A4E] bg-emerald-50/70 text-[#128A4E] ring-1 ring-[#128A4E]'
                      : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{reason}</span>
                  {selectedReason === reason && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#128A4E]" />
                  )}
                </button>
              ))}
            </div>
          </div>
 
          <div className="flex flex-col gap-1.5">
            <label htmlFor="user-report-comments" className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
              Additional Details (Optional)
            </label>
            <textarea
              id="user-report-comments"
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Describe what happened..."
              className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-800 text-xs font-medium focus:outline-none focus:bg-white focus:border-[#128A4E] focus:ring-2 focus:ring-[#128A4E]/20 transition-all resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="h-11 text-xs font-bold px-5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!selectedReason || isSubmitting}
              isLoading={isSubmitting}
              className="h-11 text-xs font-bold px-6 bg-red-600 hover:bg-red-700 border-red-600"
            >
              Submit Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
