"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { requestPasswordReset } from '@/actions/auth.actions';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setError('');
    setIsLoading(true);
    try {
      const res = await requestPasswordReset({ email });
      setIsLoading(false);
      if (res.success) {
        setIsSent(true);
      } else {
        setError(res.error || 'Failed to request password reset. Please try again.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  if (isSent) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#128A4E] flex items-center justify-center">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-xl font-extrabold text-slate-900">Check Your Email</h2>
        <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
          We sent a password reset link to <strong className="text-slate-800">{email}</strong>. Please check your inbox and follow the instructions.
        </p>
        <Link href="/login" className="w-full mt-2">
          <Button variant="secondary" className="w-full h-11">
            Back to Log In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      {error && (
        <div className="p-2.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <label htmlFor="forgotEmail" className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
          Email Address
        </label>
        <input
          id="forgotEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          required
          className="w-full h-11 px-3.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:bg-white focus:border-[#128A4E] focus:ring-2 focus:ring-[#128A4E]/20 transition-all"
        />
      </div>
 
      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        disabled={!email}
        className="w-full h-11 mt-1 text-sm font-bold"
      >
        Send Reset Link
      </Button>

      <div className="text-center pt-2">
        <Link href="/login" className="text-xs font-semibold text-slate-500 hover:text-slate-800">
          ← Back to Log In
        </Link>
      </div>
    </form>
  );
}
