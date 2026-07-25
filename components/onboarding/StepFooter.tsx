import React from 'react';
import { Button } from '@/components/ui/Button';

export interface StepFooterProps {
  onBack?: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  nextText?: string;
  isNextDisabled?: boolean;
  isLoading?: boolean;
}

export function StepFooter({
  onBack,
  nextText = 'Continue',
  isNextDisabled = false,
  isLoading = false,
}: StepFooterProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 pt-3 border-t border-gray-100">
      {onBack ? (
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
      ) : (
        <div className="hidden sm:block" />
      )}

      <Button type="submit" variant="primary" disabled={isNextDisabled} isLoading={isLoading}>
        {nextText}
      </Button>
    </div>
  );
}
