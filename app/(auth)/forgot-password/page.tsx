"use client";

import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      heroTitle="Reset Password"
      heroSubtitle="Enter your registered email address to receive password reset instructions."
    >
      <AuthCard>
        <AuthHeader
          title="Forgot Password"
          subtitle="We will send a reset link to your email"
          backHref="/login"
        />

        <div className="my-2 w-full">
          <ForgotPasswordForm />
        </div>

        <AuthFooter />
      </AuthCard>
    </AuthLayout>
  );
}
