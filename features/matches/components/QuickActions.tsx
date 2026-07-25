"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useSafetyCheck } from '@/components/compliance/useSafetyCheck';
import { SafetyDisclaimerModal } from '@/components/compliance/SafetyDisclaimerModal';

export interface QuickActionsProps {
  partnerName: string;
}

export function QuickActions({ partnerName }: QuickActionsProps) {
  const router = useRouter();
  const firstName = partnerName.split(' ')[0];
  const {
    isDisclaimerOpen,
    executeWithSafetyCheck,
    handleDisclaimerAccept,
    handleDisclaimerClose,
    actionDescription,
  } = useSafetyCheck();

  const handleStartConversation = () => {
    executeWithSafetyCheck(() => {
      router.push('/chats');
    }, `starting conversation with ${partnerName}`);
  };

  return (
    <>
      <div className="flex flex-col gap-2.5 pt-2">
        <Button variant="primary" onClick={handleStartConversation}>
          Start Conversation with {firstName} →
        </Button>
        <Link href="/intent" className="w-full">
          <Button variant="outline">
            Adjust Matching Criteria
          </Button>
        </Link>
      </div>

      <SafetyDisclaimerModal
        isOpen={isDisclaimerOpen}
        onAccept={handleDisclaimerAccept}
        onClose={handleDisclaimerClose}
        requiredForAction={actionDescription}
      />
    </>
  );
}
