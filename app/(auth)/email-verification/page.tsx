"use client";

import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { EmailVerifiedView } from '@/features/auth/components/EmailVerifiedView';

export default function EmailVerificationPage() {
  return (
    <AuthLayout
      heroTitle="Account Ready"
      heroSubtitle="Your email address has been verified successfully. Welcome to Relok!"
    >
      <AuthCard>
        <EmailVerifiedView />
        <AuthFooter />
      </AuthCard>
    </AuthLayout>
  );
}
