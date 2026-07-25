"use client";

import { useState, useCallback } from 'react';

/**
 * Custom hook to verify safety disclaimer acknowledgment before user actions.
 */
export function useSafetyCheck() {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [actionDescription, setActionDescription] = useState<string>('opening a chat');

  const executeWithSafetyCheck = useCallback(
    (action: () => void, description = 'opening a chat') => {
      if (typeof window !== 'undefined') {
        const isAccepted = localStorage.getItem('relok_safety_disclaimer_accepted') === 'true';
        if (isAccepted) {
          action();
          return;
        }
      }

      setPendingAction(() => action);
      setActionDescription(description);
      setIsDisclaimerOpen(true);
    },
    []
  );

  const handleDisclaimerAccept = useCallback(() => {
    setIsDisclaimerOpen(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }, [pendingAction]);

  const handleDisclaimerClose = useCallback(() => {
    setIsDisclaimerOpen(false);
    setPendingAction(null);
  }, []);

  return {
    isDisclaimerOpen,
    executeWithSafetyCheck,
    handleDisclaimerAccept,
    handleDisclaimerClose,
    actionDescription,
  };
}
