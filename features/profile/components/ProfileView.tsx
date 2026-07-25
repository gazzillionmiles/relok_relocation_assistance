"use client";

import React from 'react';
import { useProfile } from '../hooks/useProfile';
import { ProfileHeader } from './ProfileHeader';
import { ProfileLayout } from './ProfileLayout';
import { ProfileSummary } from './ProfileSummary';
import { ProfileStats } from './ProfileStats';
import { EditProfileForm } from './EditProfileForm';
import { LifestyleSection } from './LifestyleSection';
import { HouseRulesSection } from './HouseRulesSection';
import { SettingsMenu } from './SettingsMenu';
import { DangerZone } from './DangerZone';
import { LogoutDialog } from './LogoutDialog';

export function ProfileView() {
  const {
    userProfile,
    updateUserProfile,
    lifestylePref,
    updateLifestylePref,
    houseRules,
    isEditing,
    setIsEditing,
    isLogoutDialogOpen,
    setIsLogoutDialogOpen,
    toastMessage,
    showToast,
    saveProfileChanges,
  } = useProfile();

  return (
    <div className="w-full flex flex-col gap-6 relative">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-[#128A4E] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-xl z-50 flex items-center gap-2 border border-white/20 animate-bounce">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Row */}
      <ProfileHeader
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
        onSave={saveProfileChanges}
      />

      {/* Responsive 2-Column Desktop Layout */}
      <ProfileLayout
        sidebarContent={
          <>
            <ProfileSummary userProfile={userProfile} />
            <ProfileStats
              userProfile={userProfile}
              lifestylePref={lifestylePref}
              houseRules={houseRules}
              onCompleteClick={() => setIsEditing(true)}
            />
          </>
        }
        mainContent={
          isEditing ? (
            <EditProfileForm
              userProfile={userProfile}
              onUpdateProfile={updateUserProfile}
              lifestylePref={lifestylePref}
              onUpdateLifestyle={updateLifestylePref}
              onSave={saveProfileChanges}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              <LifestyleSection
                lifestylePref={lifestylePref}
                onEditClick={() => setIsEditing(true)}
              />
              <HouseRulesSection
                houseRules={houseRules}
                onEditClick={() => setIsEditing(true)}
              />
              <SettingsMenu
                onEditProfileClick={() => setIsEditing(true)}
                onShowToast={showToast}
              />
              <DangerZone onLogoutClick={() => setIsLogoutDialogOpen(true)} />
            </>
          )
        }
      />

      {/* Confirmation Sign Out Dialog */}
      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
      />
    </div>
  );
}
