import React from 'react';
import Image from 'next/image';
import { PostingFormData, getEffectiveTitle, getEffectiveDescription } from '../lib/validation';
import { formatCurrency } from '@/lib/utils';

export interface ListingPreviewCardProps {
  data: PostingFormData;
  onEditStep?: (step: 1 | 2 | 3 | 4 | 5) => void;
}

export function ListingPreviewCard({ data, onEditStep }: ListingPreviewCardProps) {
  const effectiveTitle = getEffectiveTitle(data);
  const effectiveDescription = getEffectiveDescription(data);
  const primaryImage = data.photos[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600&h=400';

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm flex flex-col divide-y divide-gray-100">
      {/* Property Hero Image */}
      <div className="relative w-full h-48 sm:h-56 bg-gray-100">
        <Image
          src={primaryImage}
          alt={effectiveTitle}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider">
          {data.listingType}
        </div>
        <div className="absolute bottom-3 right-3 bg-[#128A4E] text-white font-black text-sm px-3.5 py-1.5 rounded-xl shadow-md">
          {formatCurrency(Number(data.monthlyRent) || 18000)}/mo
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 flex flex-col gap-2 relative">
        {onEditStep && (
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="absolute top-4 right-4 text-xs font-bold text-[#128A4E] hover:underline cursor-pointer"
          >
            Edit Specs
          </button>
        )}
        <span className="text-[10px] font-black uppercase text-[#128A4E] tracking-wider">
          {data.listingType} • Stay: {data.stayDuration}
        </span>
        <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] leading-snug pr-12">
          {effectiveTitle}
        </h3>
        <p className="text-xs text-gray-500 font-semibold">
          ⏰ Available From: {data.availableFrom || 'Immediate'} • Deposit:{' '}
          {formatCurrency(Number(data.securityDeposit) || 0)}
        </p>
      </div>

      {/* Amenities Section */}
      <div className="p-5 flex flex-col gap-2 relative">
        {onEditStep && (
          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="absolute top-4 right-4 text-xs font-bold text-[#128A4E] hover:underline cursor-pointer"
          >
            Edit Amenities
          </button>
        )}
        <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
          Included Amenities
        </span>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {data.amenities.map((amenity) => (
            <span
              key={amenity}
              className="text-[10px] bg-[#E8F5EE] text-[#128A4E] px-2.5 py-1 rounded-md font-bold"
            >
              ✓ {amenity}
            </span>
          ))}
        </div>
      </div>

      {/* Location Section */}
      <div className="p-5 flex flex-col gap-2 relative">
        {onEditStep && (
          <button
            type="button"
            onClick={() => onEditStep(4)}
            className="absolute top-4 right-4 text-xs font-bold text-[#128A4E] hover:underline cursor-pointer"
          >
            Edit Address
          </button>
        )}
        <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
          Property Address & Landmark
        </span>
        <p className="text-xs font-extrabold text-[#0F172A] flex items-center gap-1 mt-0.5">
          <span>📍</span>
          <span>{data.address || 'Sector 3, HSR Layout, Bengaluru'}</span>
        </p>
        {data.landmark && (
          <p className="text-xs text-gray-500 font-medium">Landmark: {data.landmark}</p>
        )}
      </div>

      {/* Description Section */}
      <div className="p-5 flex flex-col gap-2 relative">
        {onEditStep && (
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="absolute top-4 right-4 text-xs font-bold text-[#128A4E] hover:underline cursor-pointer"
          >
            Edit Bio
          </button>
        )}
        <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
          Description
        </span>
        <p className="text-xs text-gray-600 font-normal leading-relaxed italic">
          &quot;{effectiveDescription}&quot;
        </p>
      </div>
    </div>
  );
}
