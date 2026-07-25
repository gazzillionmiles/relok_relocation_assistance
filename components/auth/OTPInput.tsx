"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface OTPInputProps {
  digits: string[];
  onChange: (digits: string[]) => void;
  onResend?: () => void;
  disabled?: boolean;
}

export function OTPInput({
  digits,
  onChange,
  onResend,
  disabled = false,
}: OTPInputProps) {
  const [timer, setTimer] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 1. Resend Countdown Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  // 2. Focus first box on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleDigitChange = (index: number, val: string) => {
    if (disabled) return;
    const cleanVal = val.replace(/\D/g, ''); // Numbers only

    if (!cleanVal) {
      const newDigits = [...digits];
      newDigits[index] = '';
      onChange(newDigits);
      return;
    }

    // Handle single digit input
    const newDigits = [...digits];
    newDigits[index] = cleanVal.slice(-1);
    onChange(newDigits);

    // Auto-advance to next input box if digit entered
    if (index < 5 && cleanVal) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      // Focus previous input box on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (disabled) return;

      const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
      if (!pastedData) return;

      const newDigits = [...digits];
      for (let i = 0; i < 6; i++) {
        if (pastedData[i]) {
          newDigits[i] = pastedData[i];
        }
      }
      onChange(newDigits);

      // Focus last filled box or last box overall
      const focusIndex = Math.min(pastedData.length, 5);
      inputRefs.current[focusIndex]?.focus();
    },
    [digits, disabled, onChange]
  );

  const handleResendClick = () => {
    if (!canResend || disabled) return;
    setTimer(30);
    setCanResend(false);
    onChange(['1', '2', '3', '4', '5', '6']); // Pre-fill sample helper digits
    inputRefs.current[5]?.focus();
    if (onResend) onResend();
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 6 Grid Inputs */}
      <div
        className="flex justify-between gap-1.5 sm:gap-2"
        role="group"
        aria-label="Enter 6-digit OTP verification code"
      >
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="tel"
            inputMode="numeric"
            maxLength={1}
            pattern="[0-9]*"
            value={digit}
            onChange={(e) => handleDigitChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            disabled={disabled}
            aria-label={`Digit ${i + 1} of 6`}
            className={`w-9 h-11 sm:w-11 sm:h-11 bg-white border rounded-lg text-lg font-bold text-center text-[#0F172A] focus:outline-none focus:border-[#128A4E] focus:ring-2 focus:ring-[#128A4E]/20 transition-all shadow-xs ${
              digit ? 'border-[#128A4E] bg-[#E8F5EE]/20' : 'border-[#E5E7EB]'
            } ${disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''}`}
          />
        ))}
      </div>
 
      {/* Resend Code Section */}
      <div className="text-center">
        {canResend ? (
          <button
            type="button"
            onClick={handleResendClick}
            disabled={disabled}
            className="text-xs font-semibold text-[#128A4E] hover:text-[#0F7A44] hover:underline cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] rounded-md px-2 py-0.5"
          >
            Resend Code
          </button>
        ) : (
          <p className="text-xs text-gray-400 font-medium">
            Didn’t receive the code? Resend in{' '}
            <span className="text-[#128A4E] font-bold font-mono">
              00:{timer < 10 ? `0${timer}` : timer}
            </span>
          </p>
        )}
      </div>
 
      {/* Tester Tip Box */}
      <div className="bg-amber-50/80 rounded-xl border border-amber-100 p-3 flex gap-2 items-start text-left">
        <span className="text-xs shrink-0" aria-hidden="true">
          💡
        </span>
        <p className="text-xs text-amber-800 leading-relaxed font-medium">
          <strong>Tester Tip:</strong> Enter any 6 digits (e.g.{' '}
          <span className="font-bold underline">123456</span>) to proceed.
        </p>
      </div>
    </div>
  );
}
