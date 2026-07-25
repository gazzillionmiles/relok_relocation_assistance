import React from 'react';
import { BrokerDashboardView } from '@/features/broker/components/BrokerDashboardView';

export const metadata = {
  title: 'Broker Enterprise Dashboard — RELOK',
  description: 'Manage commercial property listings, active customer leads, and agent details.',
};

export default function BrokerDashboardPage() {
  return <BrokerDashboardView />;
}
