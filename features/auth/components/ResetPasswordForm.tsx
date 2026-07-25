"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#128A4E] flex items-center justify-center">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-extrabold text-slate-900">Password Saved</h2>
        <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
          Your password has been reset successfully. You can now log in with your new password.
        </p>
        <Link href="/login" className="w-full mt-2">
          <Button variant="primary" className="w-full h-11">
            Log In Now
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
        <label htmlFor="newPassword" className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
          New Password
        </label>
        <input
          id="newPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password (min 6 characters)"
          required
          className="w-full h-11 px-3.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:bg-white focus:border-[#128A4E] focus:ring-2 focus:ring-[#128A4E]/20 transition-all"
        />
      </div>
 
      <div className="flex flex-col gap-1">
        <label htmlFor="confirmNewPassword" className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
          Confirm Password
        </label>
        <input
          id="confirmNewPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          required
          className="w-full h-11 px-3.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:bg-white focus:border-[#128A4E] focus:ring-2 focus:ring-[#128A4E]/20 transition-all"
        />
      </div>
 
      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        disabled={!password || !confirmPassword}
        className="w-full h-11 mt-1 text-sm font-bold"
      >
        Save Password
      </Button>
    </form>
  );
}
