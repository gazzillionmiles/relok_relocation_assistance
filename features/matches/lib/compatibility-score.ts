import { RoommateCard, UserProfile, LifestylePreferences } from '@/types';

export interface CompatibilityParameter {
  id: string;
  label: string;
  userVal: string;
  matchVal: string;
  matched: boolean;
  impact: 'High' | 'Medium' | 'Standard';
}

/**
 * Calculates roommate compatibility percentage score based on user preferences.
 */
export function getMatchScore(
  roommate: RoommateCard,
  userProfile?: Partial<UserProfile>,
  lifestylePref?: Partial<LifestylePreferences>
): number {
  if (!userProfile || !lifestylePref || !userProfile.fullName) {
    return roommate.matchPercentage || 88;
  }

  let score = 70;

  if (lifestylePref.sleepSchedule && lifestylePref.sleepSchedule === roommate.sleepSchedule) {
    score += 10;
  }

  if (lifestylePref.cleanliness && lifestylePref.cleanliness === roommate.cleanliness) {
    score += 10;
  }

  if (
    lifestylePref.dietary &&
    (lifestylePref.dietary === roommate.dietary || roommate.dietary === 'Any')
  ) {
    score += 5;
  }

  if (userProfile.gender && userProfile.gender === roommate.gender) {
    score += 4;
  }

  return Math.min(score, 99);
}

/**
 * Returns a detailed parameter-by-parameter breakdown of compatibility alignment.
 */
export function getCompatibilityBreakdown(
  roommate: RoommateCard,
  userProfile?: Partial<UserProfile>,
  lifestylePref?: Partial<LifestylePreferences>
): CompatibilityParameter[] {
  const userSleep = lifestylePref?.sleepSchedule || 'Early Bird';
  const userClean = lifestylePref?.cleanliness || 'Spick & Span';
  const userDiet = lifestylePref?.dietary || 'Veg';
  const userSmoke = lifestylePref?.smoking || 'Never';

  return [
    {
      id: 'sleep',
      label: 'Sleep Schedule',
      userVal: userSleep,
      matchVal: roommate.sleepSchedule,
      matched: userSleep === roommate.sleepSchedule,
      impact: 'High',
    },
    {
      id: 'cleanliness',
      label: 'Cleanliness Level',
      userVal: userClean,
      matchVal: roommate.cleanliness,
      matched: userClean === roommate.cleanliness,
      impact: 'High',
    },
    {
      id: 'dietary',
      label: 'Dietary Preference',
      userVal: userDiet,
      matchVal: roommate.dietary,
      matched: userDiet === roommate.dietary || roommate.dietary === 'Any',
      impact: 'Medium',
    },
    {
      id: 'smoking',
      label: 'Smoking Stance',
      userVal: userSmoke,
      matchVal: roommate.smoking,
      matched:
        (userSmoke === 'Never' && roommate.smoking === 'No Smoking') ||
        (userSmoke as string) === (roommate.smoking as string),
      impact: 'Standard',
    },
  ];
}
