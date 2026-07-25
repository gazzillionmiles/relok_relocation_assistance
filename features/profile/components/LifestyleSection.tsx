import React from 'react';
import { LifestylePreferences } from '@/types';

export interface LifestyleSectionProps {
  lifestylePref: LifestylePreferences;
  onEditClick?: () => void;
}

export function LifestyleSection({
  lifestylePref,
  onEditClick,
}: LifestyleSectionProps) {
  const items = [
    { label: 'Sleep Schedule', val: lifestylePref.sleepSchedule || 'Not set', icon: '⏰' },
    { label: 'Cleanliness', val: lifestylePref.cleanliness || 'Not set', icon: '✨' },
    { label: 'Dietary Preference', val: lifestylePref.dietary || 'Not set', icon: '🥦' },
    { label: 'Smoking', val: lifestylePref.smoking || 'Not set', icon: '🚭' },
    { label: 'Drinking', val: lifestylePref.drinking || 'Not set', icon: '🍷' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h3 className="text-sm font-extrabold text-[#0F172A] flex items-center gap-2">
          <span>⚙️</span>
          <span>Lifestyle Preferences</span>
        </h3>
        {onEditClick && (
          <button
            type="button"
            onClick={onEditClick}
            className="text-xs font-bold text-[#128A4E] hover:underline cursor-pointer"
          >
            Edit Attributes
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-slate-50 border border-gray-100 p-3.5 rounded-2xl flex flex-col gap-1 text-xs"
          >
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {item.label}
            </span>
            <span className="font-extrabold text-[#0F172A]">
              {item.icon} {item.val}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
