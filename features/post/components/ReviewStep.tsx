"use client";

import React from 'react';
import Link from 'next/link';
import { PostingFormData } from '../lib/validation';
import { StepNumber } from '../hooks/usePostingWizard';
import { StepHeader } from './StepHeader';
import { ListingPreviewCard } from './ListingPreviewCard';
import { Button } from '@/components/ui/Button';

export interface ReviewStepProps {
  formData: PostingFormData;
  onEditStep: (step: StepNumber) => void;
  onPrev: () => void;
  onPublish: () => void;
  onReset: () => void;
  isPublishing: boolean;
  isPublished: boolean;
  error?: string;
}

export function ReviewStep({
  formData,
  onEditStep,
  onPrev,
  onPublish,
  onReset,
  isPublishing,
  isPublished,
  error,
}: ReviewStepProps) {
  if (isPublished) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-sm flex flex-col items-center text-center gap-6 py-12 animate-in zoom-in-95 duration-200">
        {/* Animated Checkmark Badge */}
        <div className="w-20 h-20 rounded-full bg-[#E8F5EE] border-2 border-[#128A4E] flex items-center justify-center text-[#128A4E] text-3xl animate-bounce shadow-xs">
          ✓
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-extrabold text-[#128A4E] bg-[#E8F5EE] px-3.5 py-1 rounded-full uppercase tracking-wider self-center border border-[#128A4E]/20">
            Property Live
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-1">
            Listing Published Successfully! 🎉
          </h2>
          <p className="text-sm text-[#6B7280] font-medium leading-relaxed max-w-sm">
            Your property listing is now live and fully discoverable across Relok metro searches.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 w-full max-w-sm text-left text-xs bg-slate-50 border border-slate-100 rounded-2xl p-4">
          <div className="flex items-center gap-2.5">
            <span className="text-base">👁️</span>
            <div>
              <p className="font-bold text-gray-800">Discoverable Instantly</p>
              <p className="text-gray-400">Visible on /home marketplace feed</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-base">⚡</span>
            <div>
              <p className="font-bold text-gray-800">AI Match Engine Dispatch</p>
              <p className="text-gray-400">Notified to roommate seekers in your locality</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3.5 w-full max-w-md mt-2">
          <Link href="/home" className="flex-1">
            <Button variant="primary">View Marketplace</Button>
          </Link>
          <Button variant="secondary" onClick={onReset} className="flex-1">
            Post Another Room
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between flex-1 gap-6">
      <div className="flex flex-col gap-6">
        <StepHeader
          currentStep={5}
          title="Review Your Listing"
          subtitle="Verify details before publishing live to the marketplace."
        />

        <ListingPreviewCard data={formData} onEditStep={onEditStep} />

        {error && (
          <div className="p-3 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-2xl">
            ⚠️ {error}
          </div>
        )}

        <div className="bg-[#E8F5EE] border border-[#128A4E]/20 rounded-2xl p-4 flex gap-3 items-center">
          <span className="text-lg shrink-0">✨</span>
          <p className="text-xs font-bold text-[#128A4E]">
            Your listing layout looks clean, complete, and professional!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <Button type="button" variant="secondary" onClick={onPrev} disabled={isPublishing}>
          ← Back to Photos
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={onPublish}
          isLoading={isPublishing}
        >
          Publish Property Live
        </Button>
      </div>
    </div>
  );
}
