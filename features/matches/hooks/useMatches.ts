"use client";

import { useState, useCallback, useMemo } from 'react';
import { RoommateCard } from '@/types';
import { PRESET_ROOMMATES } from '@/data/data';
import { filterRoommateMatches, MatchFilterOptions } from '../lib/match-filters';

export function useMatches(initialRoommates: RoommateCard[] = PRESET_ROOMMATES) {
  const [roommates] = useState<RoommateCard[]>(initialRoommates);
  const [selectedRoommate, setSelectedRoommate] = useState<RoommateCard | null>(
    initialRoommates[0] || null
  );

  const [filterOptions, setFilterOptions] = useState<MatchFilterOptions>({
    searchQuery: '',
    selectedCity: 'Bengaluru',
    minMatchScore: 70,
    dietaryFilter: 'All',
  });

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
  };
}
