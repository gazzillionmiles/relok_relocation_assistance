"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

interface EmailLoginFormProps {
  onSuccess?: () => void;
}

export function EmailLoginForm({ onSuccess }: EmailLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);

    // Mock authentication delay before routing
    setTimeout(() => {
      setIsLoading(false);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/intent');
      }
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      {error && (
        <div className="p-2.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}
 
      {/* Email Input */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
          Email Address
        </label>
        <input
          id="email"
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
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-[#128A4E] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError('');
            }}
            placeholder="••••••••"
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
 
      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        disabled={!email || !password}
        className="w-full h-11 mt-1 text-sm font-bold"
      >
        Continue
      </Button>
    </form>
  );
}
