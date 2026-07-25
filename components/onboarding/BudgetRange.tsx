"use client";

import React from 'react';

export interface BudgetRangeProps {
  minBudget: number;
  maxBudget: number;
  onMinChange: (val: number) => void;
  onMaxChange: (val: number) => void;
}

export function BudgetRange({
  minBudget,
  maxBudget,
  onMinChange,
  onMaxChange,
}: BudgetRangeProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-[#0F172A]">
        Preferred Monthly Rent Range (INR / month)
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Min Rent Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="min-rent-input" className="text-xs text-[#6B7280] font-medium">
            Minimum Rent (₹)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
              ₹
            </span>
            <input
              id="min-rent-input"
              type="number"
              min="0"
              placeholder="5000"
              value={minBudget || ''}
              onChange={(e) => onMinChange(Number(e.target.value))}
              className="w-full h-14 bg-white border border-[#E5E7EB] rounded-xl pl-9 pr-4 text-base font-semibold text-[#0F172A] focus:outline-none focus:border-[#128A4E] focus:ring-2 focus:ring-[#128A4E]/20 transition-all"
            />
          </div>
        </div>

        {/* Max Rent Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="max-rent-input" className="text-xs text-[#6B7280] font-medium">
            Maximum Rent (₹)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
              ₹
            </span>
            <input
              id="max-rent-input"
              type="number"
              min="0"
              placeholder="25000"
              value={maxBudget || ''}
              onChange={(e) => onMaxChange(Number(e.target.value))}
              className="w-full h-14 bg-white border border-[#E5E7EB] rounded-xl pl-9 pr-4 text-base font-semibold text-[#0F172A] focus:outline-none focus:border-[#128A4E] focus:ring-2 focus:ring-[#128A4E]/20 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
