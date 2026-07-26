"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { signUpWithEmail } from '@/actions/auth.actions';

interface EmailSignupFormProps {
  onSuccess?: () => void;
}

export function EmailSignupForm({ onSuccess }: EmailSignupFormProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await signUpWithEmail({
        email,
        password,
        full_name: name,
        city: 'Bengaluru', // Default city per project conventions
      });
      setIsLoading(false);

      if (res.success) {
        if (res.data?.needsVerification) {
          setSuccessMsg('Account created successfully! Please check your email inbox to verify your account before logging in.');
        } else {
          if (onSuccess) {
            onSuccess();
          } else {
            router.push('/home');
          }
        }
      } else {
        setError(res.error || 'Failed to create account. Please try again.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'An unexpected error occurred during signup.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      {error && (
        <div className="p-2.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="p-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg">
          {successMsg}
        </div>
      )}
 
      {/* Name Input */}
      <div className="flex flex-col gap-1">
        <label htmlFor="fullName" className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError('');
          }}
          placeholder="John Doe"
          required
          className="w-full h-11 px-3.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:bg-white focus:border-[#128A4E] focus:ring-2 focus:ring-[#128A4E]/20 transition-all"
        />
      </div>
 
      {/* Email Input */}
      <div className="flex flex-col gap-1">
        <label htmlFor="signupEmail" className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
          Email Address
        </label>
        <input
          id="signupEmail"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          placeholder="name@example.com"
          required
          className="w-full h-11 px-3.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:bg-white focus:border-[#128A4E] focus:ring-2 focus:ring-[#128A4E]/20 transition-all"
        />
      </div>
 
      {/* Password Input */}
      <div className="flex flex-col gap-1">
        <label htmlFor="signupPassword" className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
          Password
        </label>
        <div className="relative">
          <input
            id="signupPassword"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError('');
            }}
            placeholder="Min 6 characters"
            required
            className="w-full h-11 pl-3.5 pr-12 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:bg-white focus:border-[#128A4E] focus:ring-2 focus:ring-[#128A4E]/20 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-800 p-1"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
 
      {/* Confirm Password Input */}
      <div className="flex flex-col gap-1">
        <label htmlFor="confirmPassword" className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (error) setError('');
          }}
          placeholder="Repeat password"
          required
          className="w-full h-11 px-3.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:bg-white focus:border-[#128A4E] focus:ring-2 focus:ring-[#128A4E]/20 transition-all"
        />
      </div>
 
      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        disabled={!name || !email || !password || !confirmPassword}
        className="w-full h-11 mt-1 text-sm font-bold"
      >
        Continue
      </Button>
    </form>
  );
}
