import React from 'react';
import { Button } from '@/components/ui/Button';

export interface EmptyStateProps {
  onReset?: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="w-full bg-white rounded-3xl border border-gray-100 p-8 text-center flex flex-col items-center justify-center gap-4 shadow-2xs my-4">
      <div className="w-16 h-16 rounded-2xl bg-[#E8F5EE] border border-[#128A4E]/20 flex items-center justify-center text-[#128A4E] text-3xl shadow-2xs">
        ✨
      </div>
      <div className="flex flex-col gap-1 max-w-sm">
        <h3 className="text-lg font-extrabold text-[#0F172A]">
          No Roommates Match Filters
        </h3>
        <p className="text-xs text-gray-500 font-medium leading-relaxed">
          Try lowering the minimum match percentage threshold or switching metro city selections.
        </p>
      </div>

      {onReset && (
        <Button variant="outline" onClick={onReset} className="!w-auto px-6 h-11">
          Reset Filter Parameters
        </Button>
      )}
    </div>
  );
}
