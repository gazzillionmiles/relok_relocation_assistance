"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  UserProfile,
  LifestylePreferences,
  RoomPreferences,
  LifestyleHabits,
  HouseRules,
} from '@/types';
import { OnboardingLayout } from './OnboardingLayout';
import { Step1Lifestyle } from './steps/Step1Lifestyle';
import { Step2AboutYou } from './steps/Step2AboutYou';
import { Step3RoommatePref } from './steps/Step3RoommatePref';
import { Step4Habits } from './steps/Step4Habits';
import { Step5Rules } from './steps/Step5Rules';
import { Step6Complete } from './steps/Step6Complete';

export function OnboardingWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: '',
    age: '',
    gender: '',
    occupation: '',
    education: '',
    bio: '',
    photoUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
  });

  // Lifestyle Preferences State
  const [lifestylePref, setLifestylePref] = useState<LifestylePreferences>({
    sleepSchedule: '',
    cleanliness: '',
    socializing: '',
    dietary: '',
    smoking: '',
    drinking: '',
  });

  // Roommate Preferences State
  const [roomPref, setRoomPref] = useState<RoomPreferences>({
    cities: [],
    budgetMin: 0,
    budgetMax: 0,
    sharingType: '',
    moveInDate: '',
    preferredGender: 'Any',
    preferredLocality: '',
    preferredAgeMin: 18,
    preferredAgeMax: 60,
    preferredLanguage: '',
  });

  // Lifestyle Habits State
  const [lifestyleHabits, setLifestyleHabits] = useState<LifestyleHabits>({
    personality: '',
    pets: '',
  });

  // House Rules State
  const [houseRules, setHouseRules] = useState<HouseRules>({
    guests: '',
    loudMusic: '',
    lateEntry: '',
  });

  const handleSkip = () => {
    // Populate fallback default state
    setUserProfile((prev) => ({
      ...prev,
      fullName: prev.fullName || 'User',
      age: prev.age || '25',
      gender: prev.gender || 'Other',
      occupation: prev.occupation || 'Professional',
      education: prev.education || 'Graduate',
      bio: prev.bio || 'Co-living enthusiast',
    }));

    setLifestylePref((prev) => ({
      ...prev,
      sleepSchedule: prev.sleepSchedule || 'Early Bird',
      cleanliness: prev.cleanliness || 'Moderate',
      socializing: prev.socializing || 'Balanced',
      dietary: prev.dietary || 'Any',
      smoking: prev.smoking || 'Never',
      drinking: prev.drinking || 'Never',
    }));

    setRoomPref((prev) => ({
      ...prev,
      cities: prev.cities.length > 0 ? prev.cities : ['Bengaluru'],
      budgetMin: prev.budgetMin || 5000,
      budgetMax: prev.budgetMax || 25000,
      sharingType: prev.sharingType || 'Private Room',
      moveInDate: prev.moveInDate || new Date().toISOString().split('T')[0],
      preferredGender: prev.preferredGender || 'Any',
      preferredLocality: prev.preferredLocality || 'HSR Layout',
      preferredAgeMin: prev.preferredAgeMin || 18,
      preferredAgeMax: prev.preferredAgeMax || 60,
      preferredLanguage: prev.preferredLanguage || 'English',
    }));

    setLifestyleHabits((prev) => ({
      ...prev,
      personality: prev.personality || 'Introvert',
      pets: prev.pets || "Don't mind",
    }));

    setHouseRules((prev) => ({
      ...prev,
      guests: prev.guests || 'Daytime Only',
      loudMusic: prev.loudMusic || 'Quiet Hours',
      lateEntry: prev.lateEntry || 'Anytime',
    }));

    // Navigate to Intent Gateway
    router.push('/intent');
  };

  const handleComplete = () => {
    router.push('/intent');
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <OnboardingLayout currentStep={currentStep}>
      {currentStep === 1 && (
        <Step1Lifestyle
          data={lifestylePref}
          onChange={setLifestylePref}
          onNext={() => setCurrentStep(2)}
          onSkip={handleSkip}
          onBackToLogin={handleBackToLogin}
        />
      )}

      {currentStep === 2 && (
        <Step2AboutYou
          userProfile={userProfile}
          onChangeProfile={setUserProfile}
          targetCity={roomPref.cities[0] || 'Bengaluru'}
          onNext={() => setCurrentStep(3)}
          onBack={() => setCurrentStep(1)}
          onSkip={handleSkip}
        />
      )}

      {currentStep === 3 && (
        <Step3RoommatePref
          data={roomPref}
          onChange={setRoomPref}
          onNext={() => setCurrentStep(4)}
          onBack={() => setCurrentStep(2)}
          onSkip={handleSkip}
        />
      )}

      {currentStep === 4 && (
        <Step4Habits
          data={lifestyleHabits}
          onChange={setLifestyleHabits}
          onNext={() => setCurrentStep(5)}
          onBack={() => setCurrentStep(3)}
          onSkip={handleSkip}
        />
      )}

      {currentStep === 5 && (
        <Step5Rules
          data={houseRules}
          onChange={setHouseRules}
          onNext={() => setCurrentStep(6)}
          onBack={() => setCurrentStep(4)}
          onSkip={handleSkip}
        />
      )}

      {currentStep === 6 && (
        <Step6Complete
          userProfile={userProfile}
          lifestylePref={lifestylePref}
          roomPref={roomPref}
          onComplete={handleComplete}
          onBack={() => setCurrentStep(5)}
          onSkip={handleSkip}
        />
      )}
    </OnboardingLayout>
  );
}
