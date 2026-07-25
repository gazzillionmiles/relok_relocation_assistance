import { RoommateCard, UserProfile, LifestylePreferences } from '@/types';
import { getMatchScore } from './compatibility-score';

export interface MatchFilterOptions {
  searchQuery: string;
  selectedCity: string;
  minMatchScore: number;
  dietaryFilter: string;
}

/**
 * Filters roommate candidates based on filter parameters and ranks by match score.
 */
export function filterRoommateMatches(
  roommates: RoommateCard[],
  options: MatchFilterOptions,
  userProfile?: Partial<UserProfile>,
  lifestylePref?: Partial<LifestylePreferences>
): RoommateCard[] {
  const query = options.searchQuery.toLowerCase().trim();

  return roommates
    .map((rm) => ({
      ...rm,
      computedScore: getMatchScore(rm, userProfile, lifestylePref),
    }))
    .filter((rm) => {
      // 1. City Match
      const matchesCity = !options.selectedCity || rm.city === options.selectedCity;

      // 2. Search Keyword Query
      const matchesQuery =
        !query ||
        rm.name.toLowerCase().includes(query) ||
        rm.occupation.toLowerCase().includes(query) ||
        rm.education.toLowerCase().includes(query) ||
        rm.bio.toLowerCase().includes(query);

      // 3. Minimum Match Score Threshold
      const matchesMinScore = rm.computedScore >= options.minMatchScore;

      // 4. Dietary Filter
      const matchesDiet =
        !options.dietaryFilter ||
        options.dietaryFilter === 'All' ||
        rm.dietary === options.dietaryFilter ||
        rm.dietary === 'Any';

      return matchesCity && matchesQuery && matchesMinScore && matchesDiet;
    })
    .sort((a, b) => b.computedScore - a.computedScore);
}
