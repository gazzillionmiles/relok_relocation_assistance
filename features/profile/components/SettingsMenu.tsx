"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { SettingsCard } from './SettingsCard';

export interface SettingsMenuProps {
  onEditProfileClick: () => void;
  onShowToast: (msg: string) => void;
}

export function SettingsMenu({
  onEditProfileClick,
  onShowToast,
}: SettingsMenuProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs flex flex-col gap-3">
      <div className="pb-2 border-b border-gray-100">
        <h3 className="text-sm font-extrabold text-[#0F172A] flex items-center gap-2">
          <span>🛠️</span>
          <span>Account Settings & Preferences</span>
        </h3>
      </div>

      <div className="flex flex-col gap-1">
        <SettingsCard
          icon="👤"
          title="Account Attributes & Bio"
          description="Update name, age, job, education, and short bio"
          onClick={onEditProfileClick}
        />

        <SettingsCard
          icon="🎯"
          title="Switch Intent Gateway"
          description="Change your primary co-living goal on Relok"
          onClick={() => router.push('/intent')}
        />

        <SettingsCard
          icon="💬"
          title="Help & Support Desk"
          description="Connect with Relok team for account or listing assistance"
          onClick={() =>
            onShowToast('Dedicated Support Desk: support@relok.in')
          }
        />
      </div>
    </div>
  );
}
