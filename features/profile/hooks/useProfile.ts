"use client";

import { useState, useCallback } from 'react';
import { UserProfile, LifestylePreferences, HouseRules } from '@/types';

export const INITIAL_USER_PROFILE: UserProfile = {
  fullName: 'Aarav Sharma',
  age: '24',
  gender: 'Male',
  occupation: 'Software Engineer at Flipkart',
  education: 'B.Tech, IIT Madras',
  bio: 'Chill developer looking for a flatmate in HSR Layout. I play guitar, love FIFA on weekends, and maintain a clean space during weekdays.',
  photoUrl:
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200',
};

export const INITIAL_LIFESTYLE_PREF: LifestylePreferences = {
  sleepSchedule: 'Night Owl',
  cleanliness: 'Spick & Span',
  socializing: 'Balanced',
  dietary: 'Veg',
  smoking: 'Never',
  drinking: 'Occasionally',
};

export const INITIAL_HOUSE_RULES: HouseRules = {
  guests: 'Guests Allowed',
  loudMusic: 'Quiet Hours',
  lateEntry: 'Anytime',
};

export function useProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [lifestylePref, setLifestylePref] = useState<LifestylePreferences>(
    INITIAL_LIFESTYLE_PREF
  );
  const [houseRules, setHouseRules] = useState<HouseRules>(INITIAL_HOUSE_RULES);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  const updateUserProfile = useCallback((fields: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...fields }));
  }, []);

  const updateLifestylePref = useCallback((fields: Partial<LifestylePreferences>) => {
    setLifestylePref((prev) => ({ ...prev, ...fields }));
  }, []);

  const updateHouseRules = useCallback((fields: Partial<HouseRules>) => {
    setHouseRules((prev) => ({ ...prev, ...fields }));
  }, []);

  const saveProfileChanges = useCallback(() => {
    setIsEditing(false);
    showToast('Profile attributes updated successfully! ✓');
  }, [showToast]);

  return {
    userProfile,
    updateUserProfile,
    lifestylePref,
    updateLifestylePref,
    houseRules,
    updateHouseRules,
    isEditing,
    setIsEditing,
    isLogoutDialogOpen,
    setIsLogoutDialogOpen,
    toastMessage,
    showToast,
    saveProfileChanges,
  };
}
