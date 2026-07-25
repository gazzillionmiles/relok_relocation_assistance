import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';

export default function AppLoading() {
  return (
    <PageContainer>
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 gap-4 text-center">
        <div className="w-12 h-12 bg-[#E8F5EE] rounded-2xl border border-[#128A4E]/20 flex items-center justify-center text-[#128A4E] text-2xl animate-spin">
          ⌛
        </div>
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          Loading Module...
        </span>
      </div>
    </PageContainer>
  );
}
