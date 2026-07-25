"use client";

import React, { useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Shell route error:', error);
  }, [error]);

  return (
    <PageContainer>
      <div className="w-full bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-4 shadow-2xs my-4">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 text-3xl">
          ⚠️
        </div>
        <div className="flex flex-col gap-1 max-w-sm">
          <h3 className="text-lg font-extrabold text-[#0F172A]">
            Module Error Occurred
          </h3>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            There was a problem loading this section. Please try again.
          </p>
        </div>

        <Button variant="primary" onClick={() => reset()} className="!w-auto px-6 h-11">
          Try Reloading Module ↺
        </Button>
      </div>
    </PageContainer>
  );
}
