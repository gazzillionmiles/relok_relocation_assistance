"use client";

import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      heroTitle="Set New Password"
      heroSubtitle="Choose a strong password to secure your Relok account."
    >
      <AuthCard>
        <AuthHeader
          title="Reset Password"
          subtitle="Enter your new password below"
          backHref="/login"
        />

        <div className="my-2 w-full">
          <ResetPasswordForm />
        </div>

        <AuthFooter />
      </AuthCard>
    </AuthLayout>
  );
}
