"use client";

import { useState, useCallback, useEffect } from 'react';
import { UserProfile, LifestylePreferences, HouseRules } from '@/types';
import { getProfile, updateProfile as updateProfileServer, updatePreferences as updatePreferencesServer, updateHouseRules as updateHouseRulesServer } from '@/actions/profile.actions';

export const INITIAL_USER_PROFILE: UserProfile = {
  fullName: '',
  age: '',
  gender: '',
  occupation: '',
  education: '',
  bio: '',
  photoUrl:
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200',
};

export const INITIAL_LIFESTYLE_PREF: LifestylePreferences = {
  sleepSchedule: '',
  cleanliness: '',
  socializing: '',
  dietary: '',
  smoking: '',
  drinking: '',
};

export const INITIAL_HOUSE_RULES: HouseRules = {
  guests: '',
  loudMusic: '',
  lateEntry: '',
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  useEffect(() => {
    async function loadProfile() {
      setIsLoading(true);
      try {
        const res = await getProfile();
        if (res.success && res.data) {
          const { profile, preferences, houseRules: dbHouseRules } = res.data as any;

          if (profile) {
            setUserProfile({
              fullName: profile.full_name || '',
              age: profile.date_of_birth
                ? (new Date().getFullYear() - new Date(profile.date_of_birth).getFullYear()).toString()
                : '',
              gender: (profile.gender === 'Any' ? 'Other' : profile.gender) || '',
              occupation: profile.occupation || '',
              education: '',
              bio: profile.bio || '',
              photoUrl:
                profile.avatar_url ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200',
            });
          }

          if (preferences) {
            setLifestylePref({
              sleepSchedule: (preferences.sleep_schedule || '') as any,
              cleanliness: (preferences.cleanliness_level ? (preferences.cleanliness_level > 3 ? 'Spick & Span' : 'Moderate') : '') as any,
              socializing: (preferences.socializing || '') as any,
              dietary: (preferences.food_preference === 'Both' ? 'Any' : (preferences.food_preference || '')) as any,
              smoking: (preferences.smoking_preference ? (preferences.smoking_preference === 'Not Allowed' ? 'Never' : 'Occasionally') : '') as any,
              drinking: '',
            });
          }

          if (dbHouseRules) {
            setHouseRules({
              guests: dbHouseRules.visitors_allowed ? 'Guests Allowed' : 'No Guests',
              loudMusic: '',
              lateEntry: '',
            });
          }
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProfile();
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

  const saveProfileChanges = useCallback(async () => {
    setIsSaving(true);
    try {
      const pRes = await updateProfileServer({
        full_name: userProfile.fullName,
        bio: userProfile.bio,
        occupation: userProfile.occupation,
        gender: (userProfile.gender === 'Other' ? 'Any' : userProfile.gender) as any,
        city: 'Bengaluru',
      });

      const prRes = await updatePreferencesServer({
        food_preference: (lifestylePref.dietary === 'Any' ? 'Both' : lifestylePref.dietary) as any,
        smoking_preference: (lifestylePref.smoking === 'Never' ? 'Not Allowed' : 'Allowed') as any,
        cleanliness_level: lifestylePref.cleanliness === 'Spick & Span' ? 5 : 3,
      });

      const hrRes = await updateHouseRulesServer({
        visitors_allowed: houseRules.guests === 'Guests Allowed',
        overnight_guests: houseRules.guests === 'Guests Allowed',
      });

      if (pRes.success && prRes.success && hrRes.success) {
        setIsEditing(false);
        showToast('Profile attributes updated successfully! ✓');
      } else {
        showToast((pRes as any).error || (prRes as any).error || (hrRes as any).error || 'Failed to update profile.');
      }
    } catch (err: any) {
      showToast(err.message || 'An unexpected error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  }, [userProfile, lifestylePref, houseRules, showToast]);

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
    isLoading,
    isSaving,
  };
}
