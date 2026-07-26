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
import { createProperty } from '@/actions/property.actions';

export type StepNumber = 1 | 2 | 3 | 4 | 5 | 'review' | 'published';

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
  const [error, setError] = useState<string>('');

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
    setError('');
  }, []);

  const publishListing = useCallback(async () => {
    setIsPublishing(true);
    setError('');
    try {
      const payload: any = {
        title: formData.title,
        description: formData.description,
        monthly_rent: typeof formData.monthlyRent === 'number' ? formData.monthlyRent : 10000,
        security_deposit: typeof formData.securityDeposit === 'number' ? formData.securityDeposit : 20000,
        property_type: (formData.listingType === '1BHK' || formData.listingType === '2BHK' ? 'Apartment' : 'Co-Living') as any,
        address: formData.address,
        locality: formData.landmark || undefined,
        city: 'Bengaluru',
        latitude: formData.mapCenter?.lat || 12.9116,
        longitude: formData.mapCenter?.lng || 77.6389,
        bedrooms: 1,
        bathrooms: 1,
        balcony: true,
        parking: true,
        furnished: 'Semi' as any,
        available_from: formData.availableFrom || new Date().toISOString().split('T')[0],
        gender_preference: formData.preferredGender as any,
        smoking_allowed: formData.houseRules?.includes('Smoking Allowed') || false,
        pets_allowed: true,
        food_preference: 'Both' as any,
      };

      const res = await createProperty(payload);
      if (res.success) {
        setCurrentStep('published');
      } else {
        setError(res.error || 'Failed to publish property listing.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while publishing.');
    } finally {
      setIsPublishing(false);
    }
  }, [formData]);

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
    error,
  };
}
