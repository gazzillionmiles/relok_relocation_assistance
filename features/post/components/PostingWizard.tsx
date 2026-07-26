"use client";

import React from 'react';
import { usePostingWizard } from '../hooks/usePostingWizard';
import { WizardLayout } from './WizardLayout';
import { PropertyInfoStep } from './PropertyInfoStep';
import { PropertyDetailsStep } from './PropertyDetailsStep';
import { RoommatePreferenceStep } from './RoommatePreferenceStep';
import { LocationStep } from './LocationStep';
import { PhotoUploadStep } from './PhotoUploadStep';
import { ReviewStep } from './ReviewStep';

export function PostingWizard() {
  const {
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
  } = usePostingWizard();

  const isCurrentStepValid =
    typeof currentStep === 'number' ? isStepValid(currentStep) : true;

  return (
    <WizardLayout
      currentStep={currentStep}
      onGoToStep={goToStep}
      isStepValid={isStepValid}
    >
      {currentStep === 1 && (
        <PropertyInfoStep
          formData={formData}
          updateFormData={updateFormData}
          onNext={nextStep}
          isValid={isCurrentStepValid}
        />
      )}

      {currentStep === 2 && (
        <PropertyDetailsStep
          formData={formData}
          updateFormData={updateFormData}
          onNext={nextStep}
          onPrev={prevStep}
          isValid={isCurrentStepValid}
        />
      )}

      {currentStep === 3 && (
        <RoommatePreferenceStep
          formData={formData}
          updateFormData={updateFormData}
          onNext={nextStep}
          onPrev={prevStep}
          isValid={isCurrentStepValid}
        />
      )}

      {currentStep === 4 && (
        <LocationStep
          formData={formData}
          updateFormData={updateFormData}
          onNext={nextStep}
          onPrev={prevStep}
          isValid={isCurrentStepValid}
        />
      )}

      {currentStep === 5 && (
        <PhotoUploadStep
          formData={formData}
          updateFormData={updateFormData}
          onNext={() => goToStep('review')}
          onPrev={prevStep}
          isValid={isCurrentStepValid}
        />
      )}

      {currentStep === 'review' && (
        <ReviewStep
          formData={formData}
          onEditStep={goToStep}
          onPrev={() => goToStep(5)}
          onPublish={publishListing}
          onReset={resetForm}
          isPublishing={isPublishing}
          isPublished={false}
          error={error}
        />
      )}

      {currentStep === 'published' && (
        <ReviewStep
          formData={formData}
          onEditStep={goToStep}
          onPrev={() => goToStep(5)}
          onPublish={publishListing}
          onReset={resetForm}
          isPublishing={isPublishing}
          isPublished={true}
          error={error}
        />
      )}
    </WizardLayout>
  );
}
