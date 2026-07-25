"use client";

import { useState, useCallback } from 'react';
import { RoomListing, ChatThread } from '@/types';
import { PRESET_ROOMS, PRESET_CHATS } from '@/data/data';

export interface BrokerDetails {
  agencyName: string;
  brokerType: 'Individual Agent' | 'Agency';
  experience: string;
  areas: string[];
  reraNumber: string;
  memberSince?: string;
  responseRate?: string;
}

export function useBrokerDashboard() {
  const [brokerDetails, setBrokerDetails] = useState<BrokerDetails>({
    agencyName: 'Dream Realty Services',
    brokerType: 'Agency',
    experience: '5',
    areas: ['Bengaluru', 'Mumbai', 'Hyderabad'],
    reraNumber: 'PRM/KA/RERA/1251/310/PR/210312',
    memberSince: 'Jan 2024',
    responseRate: '98%',
  });

  const [rooms, setRooms] = useState<RoomListing[]>(PRESET_ROOMS);
  const [deactivatedIds, setDeactivatedIds] = useState<string[]>([]);
  const [chats] = useState<ChatThread[]>(PRESET_CHATS);

  const [editingRoom, setEditingRoom] = useState<RoomListing | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  const toggleListingActive = useCallback(
    (id: string) => {
      setDeactivatedIds((prev) => {
        if (prev.includes(id)) {
          showToast('Property listing is now LIVE on marketplace! ✓');
          return prev.filter((x) => x !== id);
        } else {
          showToast('Property listing has been deactivated.');
          return [...prev, id];
        }
      });
    },
    [showToast]
  );

  const saveQuickEdit = useCallback(
    (roomId: string, title: string, rent: number) => {
      setRooms((prev) =>
        prev.map((r) => (r.id === roomId ? { ...r, title, rent } : r))
      );
      setEditingRoom(null);
      showToast('Property listing details updated! ✓');
    },
    [showToast]
  );

  const updateBrokerDetails = useCallback(
    (details: Partial<BrokerDetails>) => {
      setBrokerDetails((prev) => ({ ...prev, ...details }));
      showToast('Broker agency profile updated! ✓');
    },
    [showToast]
  );

  return {
    brokerDetails,
    updateBrokerDetails,
    rooms,
    deactivatedIds,
    toggleListingActive,
    chats,
    editingRoom,
    setEditingRoom,
    saveQuickEdit,
    toastMessage,
    showToast,
  };
}
