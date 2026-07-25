import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export interface DashboardHeaderProps {
  agencyName: string;
}

export function DashboardHeader({
  agencyName,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          {agencyName || 'Broker Dashboard'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
          Manage multi-unit property listings, customer inquiries, and agent profile settings.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/post">
          <Button variant="primary" className="!w-auto px-6 h-11">
            + Post New Listing
          </Button>
        </Link>
      </div>
    </div>
  );
}
