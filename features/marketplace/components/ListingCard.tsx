"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RoomListing } from '@/types';
import { DistanceBadge } from './DistanceBadge';
import { formatCurrency } from '@/lib/utils';
import { useSafetyCheck } from '@/components/compliance/useSafetyCheck';
import { SafetyDisclaimerModal } from '@/components/compliance/SafetyDisclaimerModal';
import { TrustSignals } from '@/features/safety/components/TrustSignals';
import { ReportListingDialog } from '@/features/reporting/components/ReportListingDialog';
import { isPropertyFavorited, addPropertyToFavorites, removePropertyFromFavorites } from '@/actions/property.actions';

export interface ListingCardProps {
  room: RoomListing;
  distanceKm?: number | null;
}

export function ListingCard({ room, distanceKm }: ListingCardProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [toastMsg, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    async function checkFav() {
      const favorited = await isPropertyFavorited(room.id);
      setIsSaved(favorited);
    }
    checkFav();
  }, [room.id]);

  const {
    isDisclaimerOpen,
    executeWithSafetyCheck,
    handleDisclaimerAccept,
    handleDisclaimerClose,
    actionDescription,
  } = useSafetyCheck();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    executeWithSafetyCheck(() => {
      router.push('/chats');
    }, `contacting lister for ${room.title}`);
  };

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    setShowMenu(false);
    
    if (newSavedState) {
      await addPropertyToFavorites(room.id);
      showToast('Listing saved to bookmarks! 🔖');
    } else {
      await removePropertyFromFavorites(room.id);
      showToast('Listing removed from saved');
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Listing link copied to clipboard! 🔗');
    }
  };

  const handleHide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHidden(true);
    setShowMenu(false);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  if (isHidden) {
    return (
      <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-5 text-center text-xs font-semibold text-slate-500 flex flex-col items-center gap-1.5">
        <span>Listing hidden from view.</span>
        <button
          onClick={() => setIsHidden(false)}
          className="text-[#128A4E] font-bold hover:underline cursor-pointer"
        >
          Undo Hide
        </button>
      </div>
    );
  }
 
  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md hover:border-[#128A4E]/30 transition-all duration-300 flex flex-col justify-between group relative">
        
        {/* Toast Notification overlay */}
        {toastMsg && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg animate-in fade-in">
            {toastMsg}
          </div>
        )}

        {/* Property Image Header */}
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
          {room.images[0] ? (
            <Image
              src={room.images[0]}
              alt={room.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-3xl font-extrabold">
              🏢
            </div>
          )}

          {/* Sharing Type Badge */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider">
            {room.sharingType}
          </div>

          {/* More Actions Menu (⋮) */}
          <div className="absolute top-3 right-3 z-20">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-slate-700 flex items-center justify-center font-extrabold text-base shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="More options"
            >
              ⋮
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div
                className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-100 p-1.5 z-30 flex flex-col gap-1 text-xs font-bold text-slate-700 animate-in fade-in"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleSaveToggle}
                  className="w-full px-3 py-1.5 rounded-lg text-left hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                >
                  <span>{isSaved ? '❤️ Saved' : '🤍 Save Listing'}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="w-full px-3 py-1.5 rounded-lg text-left hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                >
                  <span>🔗 Share</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    setShowReportDialog(true);
                  }}
                  className="w-full px-3 py-1.5 rounded-lg text-left hover:bg-red-50 text-red-600 flex items-center gap-2 cursor-pointer"
                >
                  <span>🚩 Report Listing</span>
                </button>
                <button
                  onClick={handleHide}
                  className="w-full px-3 py-1.5 rounded-lg text-left hover:bg-slate-50 text-slate-500 flex items-center gap-2 cursor-pointer border-t border-slate-100 pt-1.5"
                >
                  <span>👁️‍🗨️ Hide Listing</span>
                </button>
              </div>
            )}
          </div>

          {/* Rent Tag */}
          <div className="absolute bottom-3 right-3 bg-[#128A4E] text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-md">
            {formatCurrency(room.rent)}/mo
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 flex flex-col justify-between flex-1 gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-[#0F172A] group-hover:text-[#128A4E] transition-colors leading-snug line-clamp-2">
                {room.title}
              </h3>
            </div>

            <p className="text-xs text-gray-500 font-semibold flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5 text-[#128A4E] shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="truncate">{room.location}</span>
            </p>

            <DistanceBadge distanceKm={distanceKm ?? null} />

            <TrustSignals
              memberSince={room.memberSince || "Jan 2024"}
              listingType="Tenant Listing"
              postedAgo={room.createdAt || "Recently"}
              className="mt-1"
            />
          </div>

          {/* Amenities Checklist Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
            {room.amenities.slice(0, 4).map((amenity) => (
              <span
                key={amenity}
                className="text-[10px] bg-[#E8F5EE] text-[#128A4E] px-2 py-0.5 rounded-md font-bold"
              >
                ✓ {amenity}
              </span>
            ))}
            {room.amenities.length > 4 && (
              <span className="text-[10px] bg-slate-100 text-gray-500 px-1.5 py-0.5 rounded-md font-bold">
                +{room.amenities.length - 4} more
              </span>
            )}
          </div>

          {/* Lister Info & Action */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gray-100 bg-gray-100">
                {room.postedBy.photoUrl ? (
                  <Image
                    src={room.postedBy.photoUrl}
                    alt={room.postedBy.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="text-[10px] font-bold text-gray-400 flex items-center justify-center h-full">
                    {room.postedBy.name.charAt(0)}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold text-gray-700 truncate max-w-[110px]">
                {room.postedBy.name}
              </span>
            </div>

            <button
              type="button"
              onClick={handleContactClick}
              className="text-xs font-extrabold text-[#128A4E] bg-[#E8F5EE] hover:bg-[#128A4E] hover:text-white px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              Contact Lister →
            </button>
          </div>
        </div>
      </div>

      <SafetyDisclaimerModal
        isOpen={isDisclaimerOpen}
        onAccept={handleDisclaimerAccept}
        onClose={handleDisclaimerClose}
        requiredForAction={actionDescription}
      />

      <ReportListingDialog
        isOpen={showReportDialog}
        onClose={() => setShowReportDialog(false)}
        listingTitle={room.title}
        listingId={room.id}
      />
    </>
  );
}
