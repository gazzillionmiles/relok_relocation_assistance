"use client";

import React, { useState } from 'react';

export interface MessageComposerProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export function MessageComposer({
  onSendMessage,
  disabled = false,
}: MessageComposerProps) {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim() || disabled) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 sm:p-4 bg-white border-t border-gray-100 flex items-end gap-2.5">
      {/* Attachment Actions Placeholder (Prepared for image/file/voice upload) */}
      <button
        type="button"
        title="Add attachment (Coming Soon)"
        disabled
        className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 cursor-not-allowed shrink-0"
      >
        📎
      </button>

      {/* Message Input Textarea */}
      <textarea
        rows={1}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message... (Enter to send, Shift+Enter for newline)"
        disabled={disabled}
        aria-label="Type a message"
        className="flex-1 min-h-[44px] max-h-32 bg-gray-50 border border-[#E5E7EB] rounded-2xl text-xs sm:text-sm px-4 py-3 focus:outline-none focus:border-[#128A4E] focus:ring-2 focus:ring-[#128A4E]/20 transition-all text-[#0F172A] placeholder-[#9CA3AF] resize-none leading-relaxed"
      />

      {/* Send Button */}
      <button
        type="button"
        onClick={handleSend}
        disabled={!inputText.trim() || disabled}
        aria-label="Send message"
        className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white transition-all shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] ${
          inputText.trim() && !disabled
            ? 'bg-[#128A4E] hover:bg-[#0F7A44] shadow-xs active:scale-95'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </div>
  );
}
