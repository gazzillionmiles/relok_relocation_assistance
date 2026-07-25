"use client";

import React from 'react';

export interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function PhoneInput({
  value,
  onChange,
  error,
  disabled = false,
}: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // Numbers only
    if (rawValue.length <= 10) {
      onChange(rawValue);
    }
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor="phone-number-input" className="text-xs font-semibold text-[#475569]">
        Mobile Number
      </label>
 
      <div className="flex gap-2 h-11 w-full">
        {/* Country Code Prefix Badge */}
        <div
          className="flex items-center gap-2 px-3 h-full bg-gray-50 border border-[#E5E7EB] rounded-lg text-sm font-bold text-[#0F172A] select-none shrink-0"
          aria-label="Country code +91 (India)"
        >
          {/* India Flag SVG */}
          <svg
            width="18"
            height="12"
            viewBox="0 0 3 2"
            className="rounded-xs border border-slate-200/50 shadow-xs shrink-0"
            aria-hidden="true"
          >
            <rect width="3" height="2" fill="#FFFFFF" />
            <rect width="3" height="0.67" fill="#FF9933" />
            <rect y="1.33" width="3" height="0.67" fill="#138808" />
            <circle cx="1.5" cy="1" r="0.2" fill="#000080" />
            <circle cx="1.5" cy="1" r="0.1" fill="#FFFFFF" />
            <circle cx="1.5" cy="1" r="0.05" fill="#000080" />
          </svg>
          <span>+91</span>
        </div>
 
        {/* 10-Digit Mobile Input */}
        <input
          id="phone-number-input"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={10}
          placeholder="98765 43210"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? 'phone-input-error' : undefined}
          className={`flex-1 h-full bg-white border rounded-lg text-sm px-3.5 focus:outline-none focus:ring-2 transition-all duration-200 text-[#0F172A] font-medium placeholder-[#9CA3AF] ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-[#E5E7EB] focus:border-[#128A4E] focus:ring-[#128A4E]/20'
          } ${disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''}`}
        />
      </div>

      {error && (
        <p id="phone-input-error" className="text-xs font-semibold text-red-600 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}
