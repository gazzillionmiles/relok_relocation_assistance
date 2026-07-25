import React from 'react';
import { Button } from '@/components/ui/Button';

export interface DangerZoneProps {
  onLogoutClick: () => void;
}

export function DangerZone({ onLogoutClick }: DangerZoneProps) {
  return (
    <div className="bg-red-50/50 border border-red-100 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-extrabold text-red-900 flex items-center gap-2">
          <span>🚪</span>
          <span>Sign Out Session</span>
        </h4>
        <p className="text-xs text-red-700 font-medium leading-relaxed max-w-md">
          Sign out of your active Relok session. You can sign back in anytime using your email address or social login.
        </p>
      </div>

      <Button
        variant="outline"
        onClick={onLogoutClick}
        className="!w-auto px-6 h-11 border-red-200 text-red-700 hover:bg-red-100/60 shrink-0"
      >
        Sign Out
      </Button>
    </div>
  );
}
