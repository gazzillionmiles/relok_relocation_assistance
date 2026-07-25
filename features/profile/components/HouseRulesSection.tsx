import React from 'react';
import { HouseRules } from '@/types';

export interface HouseRulesSectionProps {
  houseRules: HouseRules;
  onEditClick?: () => void;
}

export function HouseRulesSection({
  houseRules,
  onEditClick,
}: HouseRulesSectionProps) {
  const items = [
    { label: 'Guests Policy', val: houseRules.guests || 'Not set', icon: '👥' },
    { label: 'Loud Music', val: houseRules.loudMusic || 'Not set', icon: '🎵' },
    { label: 'Late Entry', val: houseRules.lateEntry || 'Not set', icon: '🔑' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h3 className="text-sm font-extrabold text-[#0F172A] flex items-center gap-2">
          <span>📜</span>
          <span>House Rules Expectations</span>
        </h3>
        {onEditClick && (
          <button
            type="button"
            onClick={onEditClick}
            className="text-xs font-bold text-[#128A4E] hover:underline cursor-pointer"
          >
            Edit Rules
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
