"use client";

import React from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { SocialAuthButtons } from '@/features/auth/components/SocialAuthButtons';
import { AuthDivider } from '@/features/auth/components/AuthDivider';
import { Button } from '@/components/ui/Button';

export default function WelcomePage() {
  return (
    <AuthLayout
      heroTitle="Find Your Living Match"
      heroSubtitle="Discover compatible roommates, private rooms, and co-living spaces tailored to your lifestyle."
    >
      <AuthCard>
        <AuthHeader
          title="Welcome to Relok"
          subtitle="How would you like to continue?"
          showLogo
        />

        <div className="flex flex-col gap-4 my-2 w-full">
          <SocialAuthButtons />

          <AuthDivider />

          <Link href="/signup" className="w-full">
            <Button variant="primary" className="w-full h-12 text-sm font-bold">
              Continue with Email
            </Button>
          </Link>

          <div className="text-center pt-2">
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
