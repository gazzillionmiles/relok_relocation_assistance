import React from 'react';
import { Message } from '@/types';

export interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isMe = message.sender === 'me';

  return (
    <div
      className={`flex flex-col gap-1 max-w-[85%] sm:max-w-[75%] ${
        isMe ? 'self-end items-end' : 'self-start items-start'
      }`}
    >
      <div
        className={`rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-2xs font-normal ${
          isMe
            ? 'bg-[#128A4E] text-white rounded-tr-none'
            : 'bg-white text-[#0F172A] rounded-tl-none border border-gray-100'
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
      </div>

      <span
        className={`text-[10px] font-semibold px-1 flex items-center gap-1 ${
          isMe ? 'text-gray-400' : 'text-gray-400'
        }`}
      >
        <span>{message.timestamp}</span>
        {isMe && message.status === 'pending' && (
          <span className="text-amber-500 font-bold animate-pulse">⏳ Queued</span>
        )}
      </span>
    </div>
  );
}
