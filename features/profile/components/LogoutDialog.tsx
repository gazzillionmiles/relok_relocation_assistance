"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogoutDialog({ isOpen, onClose }: LogoutDialogProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleConfirmLogout = () => {
    onClose();
    router.push('/login');
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-dialog-title"
    >
      <div
        className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-xl border border-gray-100 flex flex-col gap-5 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 text-xl mx-auto shadow-2xs">
          🚪
        </div>

        <div className="flex flex-col text-center gap-1.5">
          <h3 id="logout-dialog-title" className="text-lg font-extrabold text-[#0F172A]">
            Sign Out Session?
          </h3>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            Are you sure you want to sign out of your active session? You will be redirected to the login page.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-1">
          <Button variant="outline" onClick={onClose} className="h-11 text-xs">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmLogout}
            className="h-11 text-xs bg-red-600 hover:bg-red-700"
          >
            Confirm Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
