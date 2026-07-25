"use client";

import React from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { SocialAuthButtons } from '@/features/auth/components/SocialAuthButtons';
import { AuthDivider } from '@/features/auth/components/AuthDivider';
import { EmailSignupForm } from '@/features/auth/components/EmailSignupForm';

export default function SignupPage() {
  return (
    <AuthLayout
      heroTitle="Join Relok Co-Living"
      heroSubtitle="Create an account to find roommate matches and list co-living properties across India."
    >
      <AuthCard>
        <AuthHeader
          title="Create an Account"
          subtitle="Sign up with social media or email"
          backHref="/login"
        />

        <div className="flex flex-col gap-2 my-2 w-full">
          <SocialAuthButtons />

          <AuthDivider />

          <EmailSignupForm />

          <div className="text-center pt-3 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-600">
              Already have an account?{' '}
              <Link href="/login" className="text-[#128A4E] font-bold hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>

        <AuthFooter />
      </AuthCard>
    </AuthLayout>
  );
}
