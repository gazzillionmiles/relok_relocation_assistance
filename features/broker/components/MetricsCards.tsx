import React from 'react';

export interface MetricsCardsProps {
  totalListings: number;
  totalLeads: number;
  viewsCount?: number;
  responseRate?: string;
}

export function MetricsCards({
  totalListings,
  totalLeads,
  viewsCount = 248,
  responseRate = '98%',
}: MetricsCardsProps) {
  const metrics = [
    {
      label: 'Listed Properties',
      value: totalListings,
      badge: 'Active Units',
      icon: '🏢',
    },
    {
      label: 'Customer Leads',
      value: totalLeads,
      badge: 'Inquiries',
      icon: '💬',
    },
    {
      label: 'Profile Visits',
      value: viewsCount,
      badge: '30 Days',
      icon: '📈',
    },
    {
      label: 'Response Rate',
      value: responseRate,
      badge: 'Fast Reply',
      icon: '⚡',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs flex flex-col gap-2 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <span className="text-xl">{m.icon}</span>
            <span className="text-[10px] font-extrabold text-[#128A4E] bg-[#E8F5EE] border border-[#128A4E]/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
              {m.badge}
            </span>
          </div>

          <div className="flex flex-col gap-0.5 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-[#0F172A]">
              {m.value}
            </span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {m.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
