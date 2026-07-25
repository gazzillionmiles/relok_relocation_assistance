import { RoommateCard, UserProfile, LifestylePreferences } from '@/types';

/**
 * Calculates roommate compatibility percentage score based on lifestyle traits.
 */
export function calculateCompatibility(
  roommate: RoommateCard,
  userProfile?: Partial<UserProfile>,
  lifestylePref?: Partial<LifestylePreferences>
): number {
  if (!userProfile || !lifestylePref || !userProfile.fullName) {
    return roommate.matchPercentage || 85;
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
