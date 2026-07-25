"use client";

import React, { useState, useEffect } from 'react';
import { RoomListing } from '@/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export interface QuickEditDialogProps {
  room: RoomListing | null;
  onClose: () => void;
  onSave: (roomId: string, title: string, rent: number) => void;
}

export function QuickEditDialog({ room, onClose, onSave }: QuickEditDialogProps) {
  const [title, setTitle] = useState('');
  const [rent, setRent] = useState('');

  useEffect(() => {
    if (room) {
      setTitle(room.title);
      setRent(String(room.rent));
    }
  }, [room]);

  if (!room) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !rent) return;
    onSave(room.id, title.trim(), Number(rent));
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-edit-title"
    >
      <div
        className="bg-white rounded-3xl w-full max-w-md p-6 shadow-xl border border-gray-100 flex flex-col gap-5 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <h3 id="quick-edit-title" className="text-base font-extrabold text-[#0F172A]">
            Edit Property Price & Title
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-gray-400 hover:text-gray-600 text-base cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Property Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Input
            label="Monthly Rent (₹)"
            type="number"
            min={100}
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
