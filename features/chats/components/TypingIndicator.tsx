import React from 'react';

export interface TypingIndicatorProps {
  partnerName: string;
}

export function TypingIndicator({ partnerName }: TypingIndicatorProps) {
  return (
    <div className="bg-white text-gray-500 text-xs px-4 py-2.5 rounded-2xl rounded-tl-none self-start border border-gray-100 flex items-center gap-2 italic shadow-2xs">
      <div className="flex gap-1 items-center">
        <span className="w-1.5 h-1.5 bg-[#128A4E] rounded-full animate-bounce" />
        <span className="w-1.5 h-1.5 bg-[#128A4E] rounded-full animate-bounce [animation-delay:0.2s]" />
        <span className="w-1.5 h-1.5 bg-[#128A4E] rounded-full animate-bounce [animation-delay:0.4s]" />
      </div>
      <span className="font-medium text-gray-600">
        {partnerName} is typing...
      </span>
    </div>
  );
}
