import React from 'react';
import Link from 'next/link';

export function AuthFooter() {
  return (
    <div className="flex flex-col items-center text-center gap-3 text-xs text-[#6B7280] leading-relaxed pt-2">
      <p>
        By continuing, you agree to Relok’s{' '}
        <Link href="#" className="text-[#128A4E] font-semibold hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="#" className="text-[#128A4E] font-semibold hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
