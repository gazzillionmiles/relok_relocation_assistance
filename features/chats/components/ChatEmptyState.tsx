import React from 'react';

export interface ChatEmptyStateProps {
  title?: string;
  description?: string;
}

export function ChatEmptyState({
  title = 'Select a Conversation',
  description = 'Choose a chat thread from the left menu to view messages or start an inquiry.',
}: ChatEmptyStateProps) {
  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center gap-4 bg-slate-50/50 rounded-3xl border border-dashed border-gray-200">
      <div className="w-16 h-16 rounded-2xl bg-[#E8F5EE] border border-[#128A4E]/20 flex items-center justify-center text-[#128A4E] text-3xl shadow-2xs">
        💬
      </div>
      <div className="flex flex-col gap-1 max-w-sm">
        <h3 className="text-lg font-extrabold text-[#0F172A]">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
