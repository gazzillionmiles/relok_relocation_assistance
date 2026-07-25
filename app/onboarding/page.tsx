import React from 'react';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';

export const metadata = {
  title: 'Onboarding & Profile Setup — RELOK',
  description: 'Setup your co-living roommate preferences and personal profile.',
};

export default function OnboardingPage() {
  return <OnboardingWizard />;
}
