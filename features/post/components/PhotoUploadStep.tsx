"use client";

import React from 'react';
import { PostingFormData } from '../lib/validation';
import { StepHeader } from './StepHeader';
import { ImageUploader } from './ImageUploader';
import { Button } from '@/components/ui/Button';

export interface PhotoUploadStepProps {
  formData: PostingFormData;
  updateFormData: (fields: Partial<PostingFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isValid: boolean;
}

export function PhotoUploadStep({
  formData,
  updateFormData,
  onNext,
  onPrev,
  isValid,
}: PhotoUploadStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between flex-1 gap-6">
      <div className="flex flex-col gap-6">
        <StepHeader
          currentStep={5}
          title="Upload Photos"
          subtitle="Add clear photos of bedroom, living room, and kitchen."
        />

        <ImageUploader
          photos={formData.photos}
          onChange={(photos) => updateFormData({ photos })}
        />

        {/* Photo Tips Banner */}
        <div className="bg-amber-50/80 border border-amber-100 rounded-2xl p-4 flex gap-3 items-start">
          <span className="text-base shrink-0">💡</span>
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-bold text-amber-900">Photo tips for 5x higher responses:</p>
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              Shoot in bright daylight from room corners to showcase space. Ensure washroom & kitchen photos are clean and well lit.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <Button type="button" variant="secondary" onClick={onPrev}>
          ← Back
        </Button>
        <Button type="submit" variant="primary" disabled={!isValid}>
          Review & Publish →
        </Button>
      </div>
    </form>
  );
}
