"use client";

import { useState, useCallback, useMemo } from 'react';
import { ChatThread, Message } from '@/types';
import { PRESET_CHATS } from '@/data/data';
import { filterChatThreads, ChatFilterTab } from '../lib/conversation-utils';

export function useChatState(initialThreads: ChatThread[] = PRESET_CHATS) {
  const [threads, setThreads] = useState<ChatThread[]>(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(
    initialThreads[0]?.id || null
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterTab, setFilterTab] = useState<ChatFilterTab>('all');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Active Chat Thread Object
  const activeThread = useMemo(
    () => threads.find((t) => t.id === activeThreadId) || null,
    [threads, activeThreadId]
  );

  // Filtered threads list
  const filteredThreads = useMemo(
    () => filterChatThreads(threads, filterTab, searchQuery),
    [threads, filterTab, searchQuery]
  );

  // Select Thread & Mark as Read
  const selectThread = useCallback((threadId: string) => {
    setActiveThreadId(threadId);
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, unread: false } : t))
    );
  }, []);

  // Send Message & Trigger Auto Reply Simulation
  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || !activeThreadId) return;

      const userMsg: Message = {
        id: `my-${Date.now()}`,
        sender: 'me',
        text: text.trim(),
        timestamp: 'Just now',
        status: 'sent',
      };

      // Append user message to thread
      setThreads((prev) =>
        prev.map((thread) => {
          if (thread.id === activeThreadId) {
            return {
              ...thread,
              messages: [...thread.messages, userMsg],
              unread: false,
            };
          }
          return thread;
        })
      );

      // Auto Reply Simulation
      const activePartner = activeThread?.partner;
      if (!activePartner) return;

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);

        let responseText = `That sounds great! Let's schedule a brief call or meet up this weekend to discuss shared flat details.`;
        const lower = text.toLowerCase();
        if (lower.includes('rent') || lower.includes('budget') || lower.includes('deposit')) {
          responseText = `Yes, the rent fits my budget. Utility bills are usually split equally among flatmates.`;
        } else if (lower.includes('clean') || lower.includes('cook') || lower.includes('maid')) {
          responseText = `A clean space is super important to me! We have cook & maid services in place and split expenses.`;
        } else if (lower.includes('smoke') || lower.includes('drink') || lower.includes('rule')) {
          responseText = `I agree completely. We prefer maintaining quiet hours after 11 PM and keeping common areas tidy.`;
        }

        const replyMsg: Message = {
          id: `reply-${Date.now()}`,
          sender: 'them',
          text: responseText,
          timestamp: 'Just now',
        };

        setThreads((prev) =>
          prev.map((thread) => {
            if (thread.id === activeThreadId) {
              return {
                ...thread,
                messages: [...thread.messages, replyMsg],
              };
            }
            return thread;
          })
        );
      }, 1400);
    },
    [activeThreadId, activeThread]
  );

  return {
    threads,
    activeThread,
    activeThreadId,
    filteredThreads,
    searchQuery,
    setSearchQuery,
    filterTab,
    setFilterTab,
    isTyping,
    selectThread,
    sendMessage,
    setActiveThreadId,
  };
}
