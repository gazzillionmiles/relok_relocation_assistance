"use client";

import React, { useState } from 'react';
import { useMatches } from '../hooks/useMatches';
import { MatchHeader } from './MatchHeader';
import { MatchSearch } from './MatchSearch';
import { MatchFilters } from './MatchFilters';
import { MatchGrid } from './MatchGrid';
import { MatchDetails } from './MatchDetails';

export function MatchesView() {
  const {
    filterOptions,
    setSearchQuery,
    setSelectedCity,
    setMinMatchScore,
    setDietaryFilter,
    resetFilters,
    filteredMatches,
    selectedRoommate,
    setSelectedRoommate,
  } = useMatches();

  const [mobileDetailsOpen, setMobileDetailsOpen] = useState<boolean>(false);

  const handleSelectRoommateMobile = (rm: typeof selectedRoommate) => {
    setSelectedRoommate(rm);
    setMobileDetailsOpen(true);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <MatchHeader matchCount={filteredMatches.length} />

      {/* 3-Panel Desktop Layout (Left Filters, Center Grid, Right Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Match Filters (Visible >=1024px) */}
        <div className="hidden lg:block lg:col-span-3">
          <MatchFilters
            filterOptions={filterOptions}
            onSelectCity={setSelectedCity}
            onMinMatchScoreChange={setMinMatchScore}
            onDietaryChange={setDietaryFilter}
            onReset={resetFilters}
          />
        </div>

        {/* Center Column: Search & Match Grid */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
          <MatchSearch
            value={filterOptions.searchQuery}
            onChange={setSearchQuery}
          />

          <MatchGrid
            roommates={filteredMatches}
            selectedRoommateId={selectedRoommate?.id}
            onSelectRoommate={(rm) => {
              handleSelectRoommateMobile(rm);
            }}
            onResetFilters={resetFilters}
          />
        </div>

        {/* Right Column: Persistent Detail Panel (Visible >=1024px) */}
        <div className="hidden lg:block lg:col-span-4">
          {selectedRoommate ? (
            <MatchDetails roommate={selectedRoommate} />
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center text-xs text-gray-400">
              Select a roommate card to view details
            </div>
          )}
        </div>
      </div>

      {/* Mobile & Tablet Modal Sheet for Match Details */}
      {mobileDetailsOpen && selectedRoommate && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileDetailsOpen(false)}
        >
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <MatchDetails
              roommate={selectedRoommate}
              onCloseMobile={() => setMobileDetailsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
