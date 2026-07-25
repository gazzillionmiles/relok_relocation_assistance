"use client";

import React from 'react';
import { IntentOption } from '../types';

export interface IntentCardProps {
  option: IntentOption;
  isSelected: boolean;
  onSelect: (option: IntentOption) => void;
}

export function IntentCard({ option, isSelected, onSelect }: IntentCardProps) {
  const renderIcon = () => {
    switch (option.iconName) {
      case 'users':
        return (
          <svg className="w-6 h-6 text-[#128A4E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'key':
        return (
          <svg className="w-6 h-6 text-[#128A4E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        );
      case 'bed':
        return (
          <svg className="w-6 h-6 text-[#128A4E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'home':
        return (
          <svg className="w-6 h-6 text-[#128A4E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        );
      case 'briefcase':
        return (
          <svg className="w-6 h-6 text-[#128A4E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <button
      type="button"
      onClick={() => onSelect(option)}
      aria-selected={isSelected}
      className={`w-full text-left bg-white rounded-3xl p-6 border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] focus-visible:ring-offset-2 ${
        isSelected
          ? 'border-[#128A4E] ring-2 ring-[#128A4E]/20 bg-[#E8F5EE]/20 shadow-md scale-[1.01]'
          : 'border-gray-200 hover:border-[#128A4E]/50 hover:shadow-lg hover:bg-slate-50/60'
      }`}
    >
      {/* Badge Pill */}
      {option.badge && (
        <span className="absolute top-5 right-5 text-[10px] font-extrabold text-[#128A4E] bg-[#E8F5EE] border border-[#128A4E]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          {option.badge}
        </span>
      )}

      {/* Icon & Selected Check Indicator */}
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-2xl bg-[#E8F5EE] flex items-center justify-center shrink-0 border border-[#128A4E]/10 group-hover:scale-105 transition-transform duration-200">
          {renderIcon()}
        </div>

        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            isSelected
              ? 'border-[#128A4E] bg-[#128A4E] text-white'
              : 'border-gray-300 group-hover:border-[#128A4E]/60'
          }`}
          aria-hidden="true"
        >
          {isSelected && (
            <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 min-h-[72px]">
        <h3 className="text-lg font-extrabold text-[#0F172A] group-hover:text-[#128A4E] transition-colors leading-snug">
          {option.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#6B7280] font-medium leading-relaxed">
          {option.description}
        </p>
      </div>

      {/* Primary Action Row Indicator */}
      <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#128A4E] pt-2 border-t border-gray-100 mt-1">
        <span>Select Option</span>
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
