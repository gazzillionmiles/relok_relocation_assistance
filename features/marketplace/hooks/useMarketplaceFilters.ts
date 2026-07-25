"use client";

import { useState, useCallback } from 'react';
import { RoomListing, RoommateCard } from '@/types';
import { calculateItemDistance, CITY_COORDINATES, Coordinates } from '../lib/distance';
import { calculateCompatibility } from '../lib/compatibility';

export type CategoryFilter = 'all' | 'rooms' | 'roommates' | 'my';
export type SharingModeFilter = 'Private Room' | 'Shared Room' | 'Entire Flat' | '';

export interface MarketplaceFiltersState {
  searchQuery: string;
  selectedCity: string;
  categoryFilter: CategoryFilter;
  sharingMode: SharingModeFilter;
  nearMeActive: boolean;
  userCoords: Coordinates | null;
  minRent: number;
  maxRent: number;
}

export function useMarketplaceFilters(
  initialRooms: RoomListing[],
  initialRoommates: RoommateCard[]
) {
  const [filters, setFilters] = useState<MarketplaceFiltersState>({
    searchQuery: '',
    selectedCity: 'Bengaluru',
    categoryFilter: 'all',
    sharingMode: '',
    nearMeActive: false,
    userCoords: null,
    minRent: 0,
    maxRent: 100000,
  });

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const setSelectedCity = useCallback((city: string) => {
    setFilters((prev) => ({ ...prev, selectedCity: city }));
  }, []);

  const setCategoryFilter = useCallback((category: CategoryFilter) => {
    setFilters((prev) => ({ ...prev, categoryFilter: category }));
  }, []);

  const setSharingMode = useCallback((mode: SharingModeFilter) => {
    setFilters((prev) => ({ ...prev, sharingMode: mode }));
  }, []);

  const toggleNearMe = useCallback(() => {
    setFilters((prev) => {
      if (prev.nearMeActive) {
        return { ...prev, nearMeActive: false, userCoords: null };
      }

      // Try browser geolocation fallback to city coords
      const cityCoords = CITY_COORDINATES[prev.selectedCity] || CITY_COORDINATES['Bengaluru'];
      return { ...prev, nearMeActive: true, userCoords: cityCoords };
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      searchQuery: '',
      selectedCity: 'Bengaluru',
      categoryFilter: 'all',
      sharingMode: '',
      nearMeActive: false,
      userCoords: null,
      minRent: 0,
      maxRent: 100000,
    });
  }, []);

  // Filter Room Listings
  const filteredRooms = initialRooms.filter((room) => {
    const matchesCity = room.city === filters.selectedCity;
    const matchesSearch =
      !filters.searchQuery ||
      room.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      room.location.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesSharing = !filters.sharingMode || room.sharingType === filters.sharingMode;
    const matchesRent = room.rent >= filters.minRent && room.rent <= filters.maxRent;

    return matchesCity && matchesSearch && matchesSharing && matchesRent;
  });

  // Sort Rooms by Distance if Near Me active
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (!filters.nearMeActive || !filters.userCoords) return 0;
    const distA = calculateItemDistance(filters.userCoords, a.location, a.city) ?? 9999;
    const distB = calculateItemDistance(filters.userCoords, b.location, b.city) ?? 9999;
    return distA - distB;
  });

  // Filter Roommates
  const filteredRoommates = initialRoommates.filter((rm) => {
    const matchesCity = rm.city === filters.selectedCity;
    const matchesSearch =
      !filters.searchQuery ||
      rm.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      rm.occupation.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      rm.bio.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return matchesCity && matchesSearch;
  });

  // Sort Roommates by Distance / Compatibility
  const sortedRoommates = [...filteredRoommates].sort((a, b) => {
    if (filters.nearMeActive && filters.userCoords) {
      const distA = calculateItemDistance(filters.userCoords, a.bio, a.city) ?? 9999;
      const distB = calculateItemDistance(filters.userCoords, b.bio, b.city) ?? 9999;
      return distA - distB;
    }
    return calculateCompatibility(b) - calculateCompatibility(a);
  });

  return {
    filters,
    setSearchQuery,
    setSelectedCity,
    setCategoryFilter,
    setSharingMode,
    toggleNearMe,
    resetFilters,
    rooms: sortedRooms,
    roommates: sortedRoommates,
  };
}
