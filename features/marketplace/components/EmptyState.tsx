import React from 'react';
import { Button } from '@/components/ui/Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

export function EmptyState({
  title = 'No Listings Found',
  description = 'Try adjusting your search keywords, city selection, or filters.',
  onReset,
}: EmptyStateProps) {
  return (
    <div className="w-full bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-4 shadow-sm my-4">
      <div className="w-16 h-16 rounded-2xl bg-[#E8F5EE] border border-[#128A4E]/20 flex items-center justify-center text-[#128A4E] text-3xl shadow-2xs">
        🔍
      </div>
      <div className="flex flex-col gap-1 max-w-sm">
        <h3 className="text-lg font-extrabold text-[#0F172A]">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
          {description}
        </p>
      </div>

      {onReset && (
        <div className="mt-2">
          <Button variant="outline" onClick={onReset} className="!w-auto px-6 h-11">
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
