import React from 'react';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, badge, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-[9px] font-extrabold text-[#128A4E] bg-[#E8F5EE] border border-[#128A4E]/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
              {badge}
            </span>
          )}
          <h1 className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
            {title}
          </h1>
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-[#6B7280] font-medium leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
