"use client";

import React, { useRef, useEffect } from 'react';
import { Message } from '@/types';
import { MessageBubble } from './MessageBubble';
import { DateDivider } from './DateDivider';
import { TypingIndicator } from './TypingIndicator';
import { shouldShowDateDivider } from '../lib/message-utils';

export interface MessageListProps {
  messages: Message[];
  partnerName: string;
  isTyping?: boolean;
}

export function MessageList({
  messages,
  partnerName,
  isTyping = false,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div
      className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/70 flex flex-col gap-3"
      role="log"
      aria-live="polite"
      aria-label="Message history"
    >
      <div className="mx-auto my-1 bg-slate-100 text-slate-700 border border-slate-200 text-[10px] px-3 py-1 rounded-full font-bold tracking-wider shadow-2xs">
        💬 Direct User Conversation
      </div>

      {messages.map((message, index) => {
        const prevMsg = messages[index - 1];
        const showDivider = shouldShowDateDivider(prevMsg, message);

        return (
          <React.Fragment key={message.id}>
            {showDivider && <DateDivider dateLabel={message.timestamp} />}
            <MessageBubble message={message} />
          </React.Fragment>
        );
      })}

      {isTyping && <TypingIndicator partnerName={partnerName} />}
      <div ref={messagesEndRef} />
    </div>
  );
}
