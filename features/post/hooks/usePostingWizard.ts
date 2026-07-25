"use client";

import { useState, useCallback } from 'react';
import {
  PostingFormData,
  validateStep1,
  validateStep2,
  validateStep3,
  validateStep4,
  validateStep5,
} from '../lib/validation';

export type StepNumber = 1 | 2 | 3 | 4 | 5 | 'published';

export const INITIAL_POSTING_DATA: PostingFormData = {
  listingType: 'Room',
  title: '',
  monthlyRent: '',
  securityDeposit: '',
  availableFrom: '',
  stayDuration: '6 Months',
  description: '',
  amenities: ['Wi-Fi', 'Kitchen', 'AC'],
  houseRules: ['No Smoking', 'Quiet Hours'],
  lifestylePrefs: [],
  preferredGender: 'Any',
  preferredAgeMin: 18,
  preferredAgeMax: 60,
  address: '',
  landmark: '',
  mapCenter: { lat: 12.9116, lng: 77.6389 },
  pinAccuracy: 'Exact',
  photos: [
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600&h=400',
  ],
};

export function usePostingWizard() {
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [formData, setFormData] = useState<PostingFormData>(INITIAL_POSTING_DATA);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);

  const updateFormData = useCallback((fields: Partial<PostingFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  }, []);

  const isStepValid = useCallback(
    (step: number): boolean => {
      switch (step) {
        case 1:
          return validateStep1(formData);
        case 2:
          return validateStep2(formData);
        case 3:
          return validateStep3(formData);
        case 4:
          return validateStep4(formData);
        case 5:
          return validateStep5(formData);
        default:
          return true;
      }
    },
    [formData]
  );

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (typeof prev === 'number' && prev < 5) {
        return (prev + 1) as StepNumber;
      }
      return prev;
    });
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (typeof prev === 'number' && prev > 1) {
        return (prev - 1) as StepNumber;
      }
      return prev;
    });
  }, []);

  const goToStep = useCallback((step: StepNumber) => {
    setCurrentStep(step);
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_POSTING_DATA);
    setCurrentStep(1);
    setIsPublishing(false);
  }, []);

  const publishListing = useCallback(() => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setCurrentStep('published');
    }, 600);
  }, []);

  return {
    currentStep,
    formData,
    updateFormData,
    isStepValid,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
    publishListing,
    isPublishing,
  };
}
