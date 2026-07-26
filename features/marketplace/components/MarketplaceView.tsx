"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMarketplaceFilters, SharingModeFilter } from '../hooks/useMarketplaceFilters';
import { MarketplaceHeader } from './MarketplaceHeader';
import { SearchBar } from './SearchBar';
import { CitySelector } from './CitySelector';
import { NearMeToggle } from './NearMeToggle';
import { FilterBar } from './FilterBar';
import { FilterDrawer } from './FilterDrawer';
import { ActiveFilters } from './ActiveFilters';
import { ListingGrid } from './ListingGrid';
import { searchProperties } from '@/actions/property.actions';
import { searchRoommates } from '@/actions/profile.actions';
import { RoomListing, RoommateCard } from '@/types';

function MarketplaceViewContent() {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get('mode');
  const cityParam = searchParams.get('city');

  const [dbRooms, setDbRooms] = useState<RoomListing[]>([]);
  const [dbRoommates, setDbRoommates] = useState<RoommateCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
  } = useMarketplaceFilters(dbRooms, dbRoommates);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [propsRes, matesRes] = await Promise.all([
          searchProperties({ city: filters.selectedCity }),
          searchRoommates({ city: filters.selectedCity })
        ]);

        if (propsRes.success && propsRes.data) {
          const mappedRooms: RoomListing[] = propsRes.data.map((prop: any) => {
            const imgs = prop.property_images?.map((img: any) => img.url) || [];
            return {
              id: prop.id,
              title: prop.title,
              rent: prop.monthly_rent,
              location: prop.locality || prop.address,
              city: prop.city,
              sharingType: prop.property_type === 'PG' || prop.property_type === 'Co-Living' ? 'Shared Room' : 'Private Room',
              images: imgs.length > 0 ? imgs : [
                'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600&h=400'
              ],
              amenities: ['Wi-Fi', 'AC', 'Kitchen', 'Washing Machine', 'Power Backup'],
              postedBy: {
                name: prop.profiles?.full_name || 'Lister',
                photoUrl: prop.profiles?.avatar_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200',
              },
              description: prop.description,
              createdAt: prop.created_at ? new Date(prop.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently',
              memberSince: prop.profiles?.created_at ? new Date(prop.profiles.created_at).toLocaleDateString([], { month: 'short', year: 'numeric' }) : 'Jan 2024',
            };
          });
          setDbRooms(mappedRooms);
        } else {
          setDbRooms([]);
        }

        if (matesRes.success && matesRes.data) {
          const mappedRoommates: RoommateCard[] = matesRes.data.map((prof: any) => {
            const pref = prof.user_preferences?.[0] || {};
            return {
              id: prof.id,
              name: prof.full_name,
              age: prof.date_of_birth ? new Date().getFullYear() - new Date(prof.date_of_birth).getFullYear() : 24,
              gender: prof.gender || 'Other',
              occupation: prof.occupation || 'Professional',
              education: 'Graduate',
              bio: prof.bio || '',
              matchPercentage: 90,
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
          setDbRoommates(mappedRoommates);
        } else {
          setDbRoommates([]);
        }
      } catch (err) {
        console.error('Failed to load marketplace data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [filters.selectedCity]);

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
          {isLoading ? (
            <div className="p-8 text-center text-[#128A4E] text-sm font-semibold flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-t-transparent border-[#128A4E] rounded-full animate-spin" />
              <span>Updating active listings...</span>
            </div>
          ) : (
            <ListingGrid
              category={filters.categoryFilter}
              rooms={rooms}
              roommates={roommates}
              userCoords={filters.userCoords}
              onResetFilters={resetFilters}
              onSelectCategory={setCategoryFilter}
            />
          )}
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
