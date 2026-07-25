import React from 'react';
import { Button } from '@/components/ui/Button';

export interface ProfileHeaderProps {
  isEditing: boolean;
  onToggleEdit: () => void;
  onSave?: () => void;
}

export function ProfileHeader({
  isEditing,
  onToggleEdit,
  onSave,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-extrabold text-[#128A4E] uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#128A4E]" />
          User Profile
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Account & Profile Settings
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {isEditing ? (
          <Button variant="primary" onClick={onSave} className="!w-auto px-6 h-11">
            Save Profile Changes ✓
          </Button>
        ) : (
          <Button variant="secondary" onClick={onToggleEdit} className="!w-auto px-5 h-11">
            Edit Profile ✎
          </Button>
        )}
      </div>
    </div>
  );
}
