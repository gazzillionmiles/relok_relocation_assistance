import { UserProfile, LifestylePreferences, HouseRules } from '@/types';

/**
 * Calculates profile completion percentage score based on filled fields.
 */
export function calculateProfileCompleteness(
  profile?: Partial<UserProfile>,
  lifestyle?: Partial<LifestylePreferences>,
  rules?: Partial<HouseRules>
): number {
  if (!profile) return 20;

  let totalFields = 0;
  let filledFields = 0;

  // Profile fields
  const profileKeys: (keyof UserProfile)[] = [
    'fullName',
    'age',
    'gender',
    'occupation',
    'education',
    'bio',
    'photoUrl',
  ];

  profileKeys.forEach((key) => {
    totalFields++;
    if (profile[key] && String(profile[key]).trim().length > 0) {
      filledFields++;
    }
  });

  // Lifestyle fields
  if (lifestyle) {
    const lifestyleKeys: (keyof LifestylePreferences)[] = [
      'sleepSchedule',
      'cleanliness',
      'dietary',
      'smoking',
      'drinking',
    ];
    lifestyleKeys.forEach((key) => {
      totalFields++;
      if (lifestyle[key] && String(lifestyle[key]).trim().length > 0) {
        filledFields++;
      }
    });
  }

  // House rules fields
  if (rules) {
    const rulesKeys: (keyof HouseRules)[] = ['guests', 'loudMusic', 'lateEntry'];
    rulesKeys.forEach((key) => {
      totalFields++;
      if (rules[key] && String(rules[key]).trim().length > 0) {
        filledFields++;
      }
    });
  }

  if (totalFields === 0) return 0;
  return Math.min(Math.round((filledFields / totalFields) * 100), 100);
}

/**
 * Validates editable profile fields.
 */
export function validateProfileForm(profile: Partial<UserProfile>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!profile.fullName || !profile.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!profile.age || Number(profile.age) < 18 || Number(profile.age) > 100) {
    errors.age = 'Please enter a valid age between 18 and 100';
  }

  if (profile.bio && profile.bio.length > 150) {
    errors.bio = 'Bio cannot exceed 150 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
