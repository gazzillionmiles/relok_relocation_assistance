import React from 'react';
import { BrokerOnboardingView } from '@/features/broker/components/BrokerOnboardingView';

export const metadata = {
  title: 'Broker Registration — RELOK',
  description: 'Register as a commercial real estate agent on Relok.',
};

export default function BrokerOnboardingPage() {
  return <BrokerOnboardingView />;
}
