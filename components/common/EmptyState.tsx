import React from 'react';
import Link from 'next/link';

export type EmptyStateType =
  | 'no-listings'
  | 'no-messages'
  | 'no-matches'
  | 'no-reports'
  | 'no-saved'
  | 'no-notifications'
  | 'no-search-results';

export interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

const EMPTY_STATE_CONFIGS: Record<
  EmptyStateType,
  { icon: string; title: string; description: string; actionLabel: string; actionHref?: string }
> = {
  'no-listings': {
    icon: '🏠',
    title: 'No Listings Found',
    description: 'There are no active property listings in this area or filter criteria yet.',
    actionLabel: 'Post a Room Listing',
    actionHref: '/post',
  },
  'no-messages': {
    icon: '💬',
    title: 'No Conversations Yet',
    description: 'Start reaching out to prospective roommates or property hosts to begin chatting.',
    actionLabel: 'Explore Marketplace',
    actionHref: '/home',
  },
  'no-matches': {
    icon: '🤝',
    title: 'No Roommate Matches Found',
    description: 'Try adjusting your budget, location, or lifestyle preferences to view more matches.',
    actionLabel: 'Update Preferences',
    actionHref: '/profile',
  },
  'no-reports': {
    icon: '🛡️',
    title: 'No Reports Found',
    description: 'Everything looks clear! There are no pending or resolved safety reports to review.',
    actionLabel: 'Back to Safety Center',
    actionHref: '/safety',
  },
  'no-saved': {
    icon: '🔖',
    title: 'No Saved Listings',
    description: 'Save property listings or roommate profiles you like to view them later.',
    actionLabel: 'Browse Room Listings',
    actionHref: '/home',
  },
  'no-notifications': {
    icon: '🔔',
    title: 'No New Notifications',
    description: 'You are all caught up! Check back later for match updates and message alerts.',
    actionLabel: 'Go to Home',
    actionHref: '/home',
  },
  'no-search-results': {
    icon: '🔍',
    title: 'No Search Results Found',
    description: 'We couldn’t find any matches matching your search term. Try different keywords.',
    actionLabel: 'Clear Search',
    actionHref: '/home',
  },
};

export function EmptyState({
  type = 'no-listings',
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className = '',
}: EmptyStateProps) {
  const config = EMPTY_STATE_CONFIGS[type];
  const finalTitle = title || config.title;
  const finalDesc = description || config.description;
  const finalActionLabel = actionLabel || config.actionLabel;
  const finalHref = actionHref || config.actionHref;

  return (
    <div className={`flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-2xl bg-slate-50/60 border border-slate-200/70 max-w-md mx-auto w-full my-4 ${className}`}>
      <div className="w-14 h-14 rounded-xl bg-white text-2xl flex items-center justify-center shadow-xs border border-slate-100 mb-3">
        {config.icon}
      </div>
 
      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight mb-1.5">
        {finalTitle}
      </h3>
 
      <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-xs mb-4">
        {finalDesc}
      </p>
 
      {onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="px-4 py-2 rounded-lg bg-[#128A4E] text-white font-bold text-xs hover:bg-[#0F7A44] active:scale-[0.98] transition-all shadow-xs cursor-pointer"
        >
          {finalActionLabel}
        </button>
      ) : finalHref ? (
        <Link
          href={finalHref}
          className="px-4 py-2 rounded-lg bg-[#128A4E] text-white font-bold text-xs hover:bg-[#0F7A44] active:scale-[0.98] transition-all shadow-xs cursor-pointer"
        >
          {finalActionLabel}
        </Link>
      ) : null}
    </div>
  );
}
