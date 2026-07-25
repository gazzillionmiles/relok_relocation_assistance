"use client";

import React from 'react';
import { PostingFormData } from '../lib/validation';
import { StepHeader } from './StepHeader';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export interface PropertyInfoStepProps {
  formData: PostingFormData;
  updateFormData: (fields: Partial<PostingFormData>) => void;
  onNext: () => void;
  isValid: boolean;
}

const LISTING_TYPES = [
  { key: 'Room' as const, label: 'Single Room', desc: 'Private room in a shared flat' },
  { key: '1BHK' as const, label: '1 BHK Flat', desc: 'Independent 1 BHK apartment' },
  { key: '2BHK' as const, label: '2 BHK Flat', desc: 'Independent 2 BHK apartment' },
  { key: 'Shared Room' as const, label: 'Shared Room', desc: 'Shared bedroom space' },
];

export function PropertyInfoStep({
  formData,
  updateFormData,
  onNext,
  isValid,
}: PropertyInfoStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between flex-1 gap-6">
      <div className="flex flex-col gap-6">
        <StepHeader
          currentStep={1}
          title="Basic Property Information"
          subtitle="Fundamental specs and rental terms of your property."
        />

        {/* Listing Type Selectable Cards */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#0F172A]">Listing Type</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LISTING_TYPES.map((type) => {
              const isSelected = formData.listingType === type.key;

              return (
                <button
                  key={type.key}
                  type="button"
                  onClick={() => updateFormData({ listingType: type.key })}
                  aria-pressed={isSelected}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] ${
                    isSelected
                      ? 'border-[#128A4E] bg-[#E8F5EE]/50 ring-1 ring-[#128A4E] shadow-2xs'
                      : 'border-gray-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-sm font-extrabold text-[#0F172A]">
                    {type.label}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {type.desc}
                  </span>
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#128A4E] flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <Input
          label="Listing Title (Optional)"
          placeholder="e.g. Spacious Master Bedroom with Balcony in HSR Layout"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          helperText="Leave empty to auto-generate a title from type & location."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Monthly Rent (INR)"
            placeholder="18000"
            type="number"
            min={100}
            value={formData.monthlyRent}
            onChange={(e) =>
              updateFormData({
                monthlyRent: e.target.value === '' ? '' : Number(e.target.value),
              })
            }
            required
          />

          <Input
            label="Security Deposit (INR)"
            placeholder="50000"
            type="number"
            min={0}
            value={formData.securityDeposit}
            onChange={(e) =>
              updateFormData({
                securityDeposit: e.target.value === '' ? '' : Number(e.target.value),
              })
            }
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Available From Date"
            type="date"
            value={formData.availableFrom}
            onChange={(e) => updateFormData({ availableFrom: e.target.value })}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="stay-duration-select" className="text-sm font-semibold text-[#0F172A]">
              Minimum Stay Duration
            </label>
            <select
              id="stay-duration-select"
              value={formData.stayDuration}
              onChange={(e) => updateFormData({ stayDuration: e.target.value })}
              className="w-full h-14 bg-white border border-[#E5E7EB] rounded-xl text-base px-4 focus:outline-none focus:border-[#128A4E] focus:ring-2 focus:ring-[#128A4E]/20 transition-all text-[#0F172A] font-medium"
            >
              <option value="Flexible">Flexible Duration</option>
              <option value="3 Months">3 Months Minimum</option>
              <option value="6 Months">6 Months Minimum</option>
              <option value="12 Months">12 Months Minimum</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex justify-end">
        <Button type="submit" variant="primary" disabled={!isValid} className="sm:!w-auto px-8">
          Continue to Step 2 →
        </Button>
      </div>
    </form>
  );
}
