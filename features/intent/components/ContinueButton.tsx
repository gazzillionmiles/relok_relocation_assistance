"use client";

import React from 'react';
import { Button } from '@/components/ui/Button';

export interface ContinueButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  label?: string;
}

export function ContinueButton({
  onClick,
  disabled = false,
  isLoading = false,
  label = 'Continue to Selected Gateway →',
}: ContinueButtonProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <Button
        variant="primary"
        onClick={onClick}
        disabled={disabled}
        isLoading={isLoading}
      >
        {label}
      </Button>
    </div>
  );
}
