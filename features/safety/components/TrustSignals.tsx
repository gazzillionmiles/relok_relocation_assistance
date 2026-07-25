import React from 'react';

export interface TrustSignalsProps {
  memberSince?: string;
  lastActive?: string;
  profileCompletion?: number; // e.g. 85
  responseRate?: string; // e.g. "95%"
  responseTime?: string; // e.g. "< 1 hour"
  totalListings?: number;
  listingType?: 'Owner Listing' | 'Broker Listing' | 'Tenant Listing';
  postedAgo?: string;
  className?: string;
}

export function TrustSignals({
  memberSince = 'Jan 2024',
  lastActive = 'Active today',
  profileCompletion = 90,
  responseRate = '95%',
  responseTime = '< 1 hour',
  totalListings,
  listingType,
  postedAgo,
  className = '',
}: TrustSignalsProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 ${className}`}>
      {/* Listing Type Tag */}
      {listingType && (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold border border-slate-200/80">
          {listingType}
        </span>
      )}

      {/* Member Since */}
      {memberSince && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50/80 text-emerald-800 border border-emerald-200/60 font-medium">
          <svg className="w-3.5 h-3.5 text-[#128A4E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Joined {memberSince}
        </span>
      )}

      {/* Profile Completion */}
      {profileCompletion !== undefined && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[#128A4E]" />
          {profileCompletion}% Profile Complete
        </span>
      )}

      {/* Last Active */}
      {lastActive && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {lastActive}
        </span>
      )}

      {/* Posted Ago */}
      {postedAgo && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
          Posted {postedAgo}
        </span>
      )}

      {/* Total Listings */}
      {totalListings !== undefined && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
          {totalListings} {totalListings === 1 ? 'Listing' : 'Listings'}
        </span>
      )}

      {/* Response Rate & Time */}
      {responseRate && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
          ⚡ Responds {responseTime} ({responseRate})
        </span>
      )}
    </div>
  );
}
