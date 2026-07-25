"use client";

import React from 'react';
import { PostingFormData } from '../lib/validation';
import { StepHeader } from './StepHeader';
import { MapSelector } from './MapSelector';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { GooglePlacesAutocompleteInput } from '@/components/ui/GooglePlacesAutocompleteInput';

export interface LocationStepProps {
  formData: PostingFormData;
  updateFormData: (fields: Partial<PostingFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isValid: boolean;
}

export function LocationStep({
  formData,
  updateFormData,
  onNext,
  onPrev,
  isValid,
}: LocationStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onNext();
  };

  const handleAutoFillHSR = () => {
    updateFormData({
      address: 'Sector 3, HSR Layout, Bengaluru',
      landmark: 'Near HSR Sector 3 Public Park',
      mapCenter: { lat: 12.9116, lng: 77.6389 },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between flex-1 gap-6">
      <div className="flex flex-col gap-6">
        <StepHeader
          currentStep={4}
          title="Property Location"
          subtitle="Provide address details and position the map marker."
        />

        <GooglePlacesAutocompleteInput
          label="Locality / Address"
          placeholder="e.g. Sector 3, Lane 4, HSR Layout, Bengaluru"
          value={formData.address}
          onChange={(val, coords) => {
            updateFormData({
              address: val,
              ...(coords ? { mapCenter: coords } : {}),
            });
          }}
          cityContext="Bengaluru"
        />

        <Input
          label="Nearby Landmark (Optional)"
          placeholder="e.g. Opposite HSR Club or near Metro Station"
          value={formData.landmark}
          onChange={(e) => updateFormData({ landmark: e.target.value })}
        />

        <MapSelector
          mapCenter={formData.mapCenter}
          onCenterChange={(center) => updateFormData({ mapCenter: center })}
          pinAccuracy={formData.pinAccuracy}
          onAccuracyChange={(pinAccuracy) => updateFormData({ pinAccuracy })}
          onAutoFillLocation={handleAutoFillHSR}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <Button type="button" variant="secondary" onClick={onPrev}>
          ← Back
        </Button>
        <Button type="submit" variant="primary" disabled={!isValid}>
          Continue to Step 5 →
        </Button>
      </div>
    </form>
  );
}
