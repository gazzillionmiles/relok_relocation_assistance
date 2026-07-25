"use client";

import React from 'react';
import { PostingFormData } from '../lib/validation';
import { StepHeader } from './StepHeader';
import { AmenitySelector } from './AmenitySelector';
import { HouseRulesSelector } from './HouseRulesSelector';
import { Button } from '@/components/ui/Button';

export interface PropertyDetailsStepProps {
  formData: PostingFormData;
  updateFormData: (fields: Partial<PostingFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isValid: boolean;
}

export function PropertyDetailsStep({
  formData,
  updateFormData,
  onNext,
  onPrev,
  isValid,
}: PropertyDetailsStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between flex-1 gap-6">
      <div className="flex flex-col gap-6">
        <StepHeader
          currentStep={2}
          title="Property Details & Rules"
          subtitle="Describe your property, amenities included, and house regulations."
        />

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="property-description" className="text-sm font-semibold text-[#0F172A]">
              Property Description (Optional)
            </label>
            <span className="text-xs text-gray-400 font-medium">
              {formData.description.length}/350
            </span>
          </div>
          <textarea
            id="property-description"
            rows={4}
            maxLength={350}
            placeholder="Tell prospective flatmates about the room, house atmosphere, cook/maid services, society security, proximity to tech parks..."
            value={formData.description}
            onChange={(e) =>
              updateFormData({ description: e.target.value.slice(0, 350) })
            }
            className="w-full bg-white border border-[#E5E7EB] rounded-xl text-base p-4 focus:outline-none focus:border-[#128A4E] focus:ring-2 focus:ring-[#128A4E]/20 transition-all text-[#0F172A] placeholder-[#9CA3AF] resize-none"
          />
        </div>

        <AmenitySelector
          selectedAmenities={formData.amenities}
          onChange={(amenities) => updateFormData({ amenities })}
        />

        <HouseRulesSelector
          selectedRules={formData.houseRules}
          onChange={(houseRules) => updateFormData({ houseRules })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <Button type="button" variant="secondary" onClick={onPrev}>
          ← Back
        </Button>
        <Button type="submit" variant="primary" disabled={!isValid}>
          Continue to Step 3 →
        </Button>
      </div>
    </form>
  );
}
