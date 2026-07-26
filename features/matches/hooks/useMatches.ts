"use client";

import { useState, useCallback, useMemo, useEffect } from 'react';
import { RoommateCard } from '@/types';
import { filterRoommateMatches, MatchFilterOptions } from '../lib/match-filters';
import { searchRoommates } from '@/actions/profile.actions';

export function useMatches() {
  const [roommates, setRoommates] = useState<RoommateCard[]>([]);
  const [selectedRoommate, setSelectedRoommate] = useState<RoommateCard | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [filterOptions, setFilterOptions] = useState<MatchFilterOptions>({
    searchQuery: '',
    selectedCity: 'Bengaluru',
    minMatchScore: 70,
    dietaryFilter: 'All',
  });

  useEffect(() => {
    async function fetchMatches() {
      setIsLoading(true);
      try {
        const res = await searchRoommates({ city: filterOptions.selectedCity });
        if (res.success && res.data && res.data.length > 0) {
          const mappedRoommates: RoommateCard[] = res.data.map((prof: any) => {
            const pref = prof.user_preferences?.[0] || {};
            return {
              id: prof.id,
              name: prof.full_name,
              age: prof.date_of_birth ? new Date().getFullYear() - new Date(prof.date_of_birth).getFullYear() : 24,
              gender: prof.gender || 'Other',
              occupation: prof.occupation || 'Professional',
              education: 'Graduate',
              bio: prof.bio || '',
              matchPercentage: 92,
              photoUrl: prof.avatar_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200',
              city: prof.city,
              budget: `₹${pref.budget_min || 5000} - ₹${pref.budget_max || 20000}`,
              sleepSchedule: pref.sleep_schedule || 'Early Bird',
              cleanliness: pref.cleanliness_level > 3 ? 'Spick & Span' : 'Moderate',
              dietary: pref.food_preference || 'Veg',
              smoking: pref.smoking_preference === 'Allowed' ? 'Okay' : 'No Smoking',
              memberSince: prof.created_at ? new Date(prof.created_at).toLocaleDateString([], { month: 'short', year: 'numeric' }) : 'Recently',
            };
          });
          setRoommates(mappedRoommates);
          setSelectedRoommate(mappedRoommates[0] || null);
        } else {
          setRoommates([]);
          setSelectedRoommate(null);
        }
      } catch (err) {
        console.error('Failed to fetch matched roommates:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMatches();
  }, [filterOptions.selectedCity]);

  const setSearchQuery = useCallback((query: string) => {
    setFilterOptions((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const setSelectedCity = useCallback((city: string) => {
    setFilterOptions((prev) => ({ ...prev, selectedCity: city }));
  }, []);

  const setMinMatchScore = useCallback((minScore: number) => {
    setFilterOptions((prev) => ({ ...prev, minMatchScore: minScore }));
  }, []);

  const setDietaryFilter = useCallback((diet: string) => {
    setFilterOptions((prev) => ({ ...prev, dietaryFilter: diet }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilterOptions({
      searchQuery: '',
      selectedCity: 'Bengaluru',
      minMatchScore: 70,
      dietaryFilter: 'All',
    });
  }, []);

  const filteredMatches = useMemo(
    () => filterRoommateMatches(roommates, filterOptions),
    [roommates, filterOptions]
  );

  return {
    filterOptions,
    setSearchQuery,
    setSelectedCity,
    setMinMatchScore,
    setDietaryFilter,
    resetFilters,
    filteredMatches,
    selectedRoommate,
    setSelectedRoommate,
    isLoading,
  };
}
