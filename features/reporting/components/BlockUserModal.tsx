"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export interface BlockUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  onConfirmBlock?: () => void;
}

export function BlockUserModal({
  isOpen,
  onClose,
  userName = 'User',
  onConfirmBlock,
}: BlockUserModalProps) {
  const [isBlocked, setIsBlocked] = useState(false);

  if (!isOpen) return null;

  const handleBlock = () => {
    setIsBlocked(true);
    if (onConfirmBlock) {
      onConfirmBlock();
    }
  };

  if (isBlocked) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
        <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-2xl border border-slate-100 flex flex-col items-center text-center gap-3.5">
          <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center font-bold text-xl">
            🚫
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">User Blocked</h3>
          <p className="text-xs font-medium text-slate-600 leading-relaxed">
            You will no longer receive messages or see listings from <strong className="text-slate-800">{userName}</strong>.
          </p>
          <Button
            variant="primary"
            onClick={() => {
              setIsBlocked(false);
              onClose();
            }}
            className="w-full h-11 mt-1 text-sm font-bold"
          >
            Close
          </Button>
        </div>
      </div>
    );
  }
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-2xl border border-slate-100 flex flex-col gap-4 text-center items-center">
        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-xl">
          🚫
        </div>
 
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-extrabold text-slate-900">Block {userName}?</h2>
          <p className="text-xs font-medium text-slate-600 leading-relaxed">
            They won&apos;t be notified. You can unblock them anytime from your privacy settings.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
          <Button
            variant="secondary"
            onClick={onClose}
            className="w-full h-11 text-xs font-bold"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleBlock}
            className="w-full h-11 text-xs font-bold bg-red-600 hover:bg-red-700 border-red-600"
          >
            Block User
          </Button>
        </div>
      </div>
    </div>
  );
}
