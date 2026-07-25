"use client";

import React from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { SocialAuthButtons } from '@/features/auth/components/SocialAuthButtons';
import { AuthDivider } from '@/features/auth/components/AuthDivider';
import { EmailLoginForm } from '@/features/auth/components/EmailLoginForm';

export default function LoginPage() {
  return (
    <AuthLayout
      heroTitle="Welcome Back to Relok"
      heroSubtitle="Log in to connect with compatible roommates, brokers, and private co-living spaces."
    >
      <AuthCard>
        <AuthHeader
          title="Log In"
          subtitle="Choose your preferred sign in method"
          backHref="/"
        />

        <div className="flex flex-col gap-2 my-2 w-full">
          <SocialAuthButtons />

          <AuthDivider />

          <EmailLoginForm />

          <div className="text-center pt-3 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-600">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-[#128A4E] font-bold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        <AuthFooter />
      </AuthCard>
    </AuthLayout>
  );
}
