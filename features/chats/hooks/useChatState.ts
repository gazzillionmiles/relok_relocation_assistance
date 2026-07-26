"use client";

import { useState, useCallback, useMemo, useEffect } from 'react';
import { ChatThread, Message } from '@/types';
import { filterChatThreads, ChatFilterTab } from '../lib/conversation-utils';
import { createClient } from '@/lib/supabase/client';

export function useChatState() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterTab, setFilterTab] = useState<ChatFilterTab>('all');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [myUserId, setMyUserId] = useState<string | null>(null);

  const supabase = createClient() as any;

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

  // Fetch real database chats
  useEffect(() => {
    async function loadConversations() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        setMyUserId(user.id);

        // Fetch participant rows for current user
        const { data: participations, error: pError } = await supabase
          .from('conversation_participants')
          .select('conversation_id')
          .eq('user_id', user.id);

        if (pError || !participations || participations.length === 0) return;

        const convIds = participations.map((p: any) => p.conversation_id);

        // Fetch conversations
        const { data: convs, error: cError } = await supabase
          .from('conversations')
          .select('*, conversation_participants(*), messages(*)')
          .in('id', convIds);

        if (cError || !convs) return;

        // Fetch profiles of other participants
        const dbThreads: ChatThread[] = [];

        for (const conv of convs) {
          const otherPart = conv.conversation_participants.find((p: any) => p.user_id !== user.id);
          if (!otherPart) continue;

          // Fetch other user's profile
          const { data: prof, error: profError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', otherPart.user_id)
            .single();

          if (profError || !prof) continue;

          // Sort messages by created_at
          const sortedMsgs = (conv.messages || []).sort(
            (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );

          const messagesList: Message[] = sortedMsgs.map((m: any) => ({
            id: m.id,
            sender: m.sender_id === user.id ? 'me' : 'them',
            text: m.content,
            timestamp: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: m.read_at ? 'sent' : 'pending',
          }));

          dbThreads.push({
            id: conv.id,
            partner: {
              id: prof.id,
              name: prof.full_name,
              age: 24,
              gender: (prof.gender === 'Any' ? 'Other' : prof.gender) || 'Male',
              occupation: prof.occupation || 'Professional',
              education: 'Graduate',
              bio: prof.bio || '',
              matchPercentage: 95,
              photoUrl: prof.avatar_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200',
              city: prof.city,
              budget: '₹10,000 - ₹20,000',
              sleepSchedule: 'Night Owl',
              cleanliness: 'Spick & Span',
              dietary: 'Veg',
              smoking: 'No Smoking',
            },
            messages: messagesList,
            unread: messagesList.some(m => m.sender === 'them' && m.status === 'pending'),
          });
        }

        if (dbThreads.length > 0) {
          setThreads(dbThreads);
          setActiveThreadId(dbThreads[0].id);
        }
      } catch (err) {
        console.error('Failed to load conversations:', err);
      }
    }

    loadConversations();
  }, []);

  // Real-time messages listener
  useEffect(() => {
    if (!myUserId) return;

    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload: any) => {
        const newMsg = payload.new as any;
        
        setThreads((prev) =>
          prev.map((thread) => {
            if (thread.id === newMsg.conversation_id) {
              const mapped: Message = {
                id: newMsg.id,
                sender: newMsg.sender_id === myUserId ? 'me' : 'them',
                text: newMsg.content,
                timestamp: 'Just now',
              };
              
              // Prevent duplicates
              if (thread.messages.some(m => m.id === newMsg.id)) return thread;

              return {
                ...thread,
                messages: [...thread.messages, mapped],
                unread: newMsg.sender_id !== myUserId,
              };
            }
            return thread;
          })
        );
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [myUserId]);

  // Select Thread & Mark as Read
  const selectThread = useCallback((threadId: string) => {
    setActiveThreadId(threadId);
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, unread: false } : t))
    );
  }, []);

  // Send Message
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || !activeThreadId) return;

      const userMsgId = `my-${Date.now()}`;
      const userMsg: Message = {
        id: userMsgId,
        sender: 'me',
        text: text.trim(),
        timestamp: 'Just now',
        status: 'sent',
      };

      // Append user message locally
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

      // Save message to database if current user is logged in
      if (myUserId) {
        try {
          await supabase.from('messages').insert({
            conversation_id: activeThreadId,
            sender_id: myUserId,
            content: text.trim(),
          });
        } catch (err) {
          console.error('Failed to save message to database:', err);
        }
      }
    },
    [activeThreadId, myUserId]
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
