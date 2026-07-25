"use client";

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRESET_ROOMS, PRESET_ROOMMATES } from '@/data/data';
import { useMarketplaceFilters, SharingModeFilter } from '../hooks/useMarketplaceFilters';
import { MarketplaceHeader } from './MarketplaceHeader';
import { SearchBar } from './SearchBar';
import { CitySelector } from './CitySelector';
import { NearMeToggle } from './NearMeToggle';
import { FilterBar } from './FilterBar';
import { FilterDrawer } from './FilterDrawer';
import { ActiveFilters } from './ActiveFilters';
import { ListingGrid } from './ListingGrid';

function MarketplaceViewContent() {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get('mode');
  const cityParam = searchParams.get('city');

  const {
    filters,
    setSearchQuery,
    setSelectedCity,
    setCategoryFilter,
    setSharingMode,
    toggleNearMe,
    resetFilters,
    rooms,
    roommates,
  } = useMarketplaceFilters(PRESET_ROOMS, PRESET_ROOMMATES);

  useEffect(() => {
    if (modeParam === 'private') {
      setSharingMode('Private Room');
      setCategoryFilter('rooms');
    } else if (modeParam === 'shared') {
      setSharingMode('Shared Room');
      setCategoryFilter('rooms');
    }

    if (cityParam) {
      setSelectedCity(cityParam);
    }
  }, [modeParam, cityParam, setSharingMode, setCategoryFilter, setSelectedCity]);

  return (
    <div className="w-full flex flex-col gap-6">
      <MarketplaceHeader cityName={filters.selectedCity} />

      {/* Main Grid: Desktop 2-column layout (Left Sidebar Filters + Main Content) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Desktop Sidebar Filters (Visible >=1024px) */}
        <div className="hidden lg:block lg:col-span-3 xl:col-span-3">
          <FilterDrawer
            selectedCity={filters.selectedCity}
            onSelectCity={setSelectedCity}
            category={filters.categoryFilter}
            onSelectCategory={setCategoryFilter}
            sharingMode={filters.sharingMode}
            onSelectSharingMode={setSharingMode}
            nearMeActive={filters.nearMeActive}
            onToggleNearMe={toggleNearMe}
            minRent={filters.minRent}
            maxRent={filters.maxRent}
            onResetFilters={resetFilters}
          />
        </div>

        {/* Main Content Column */}
        <div className="col-span-1 lg:col-span-9 xl:col-span-9 flex flex-col gap-6">
          {/* Top Controls Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <SearchBar
              value={filters.searchQuery}
              onChange={setSearchQuery}
              className="flex-1"
            />

            <div className="flex items-center gap-2">
              <CitySelector
                selectedCity={filters.selectedCity}
                onSelectCity={setSelectedCity}
              />
              <NearMeToggle
                isActive={filters.nearMeActive}
                onToggle={toggleNearMe}
              />
            </div>
          </div>

          {/* Filter Pills Bar */}
          <FilterBar
            category={filters.categoryFilter}
            onSelectCategory={setCategoryFilter}
            sharingMode={filters.sharingMode}
            onSelectSharingMode={setSharingMode}
          />

          {/* Active Filter Tags */}
          <ActiveFilters
            filters={filters}
            onClearSearch={() => setSearchQuery('')}
            onClearSharingMode={() => setSharingMode('' as SharingModeFilter)}
            onClearNearMe={toggleNearMe}
            onResetAll={resetFilters}
          />

          {/* Listing Cards Grid */}
          <ListingGrid
            category={filters.categoryFilter}
            rooms={rooms}
            roommates={roommates}
            userCoords={filters.userCoords}
            onResetFilters={resetFilters}
            onSelectCategory={setCategoryFilter}
          />
        </div>
      </div>
    </div>
  );
}

export function MarketplaceView() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-gray-400 text-sm">
          Loading Marketplace...
        </div>
      }
    >
      <MarketplaceViewContent />
    </Suspense>
  );
}
