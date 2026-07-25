import React from 'react';

export type ModerationState =
  | 'active'
  | 'under_review'
  | 'hidden_by_moderation'
  | 'removed'
  | 'suspended';

export interface ModerationBadgeProps {
  status: ModerationState;
  className?: string;
}

const MODERATION_BADGE_CONFIG: Record<
  ModerationState,
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  active: {
    label: 'Active',
    bg: 'bg-emerald-50',
    text: 'text-[#128A4E]',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
  },
  under_review: {
    label: 'Under Review',
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  hidden_by_moderation: {
    label: 'Hidden by Moderation',
    bg: 'bg-orange-50',
    text: 'text-orange-800',
    border: 'border-orange-200',
    dot: 'bg-orange-500',
  },
  removed: {
    label: 'Removed',
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
  },
  suspended: {
    label: 'Suspended',
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    dot: 'bg-red-500',
  },
};

export function ModerationBadge({ status, className = '' }: ModerationBadgeProps) {
  const config = MODERATION_BADGE_CONFIG[status] || MODERATION_BADGE_CONFIG.active;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
    </span>
  );
}
