import React from 'react';
import Image from 'next/image';

export interface ProfileAvatarProps {
  photoUrl: string;
  fullName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProfileAvatar({
  photoUrl,
  fullName,
  size = 'md',
  className = '',
}: ProfileAvatarProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-lg',
    lg: 'w-24 h-24 text-2xl',
  };

  return (
    <div
      className={`relative rounded-full overflow-hidden border-2 border-gray-100 bg-gray-100 shrink-0 shadow-2xs ${sizeClasses[size]} ${className}`}
    >
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={fullName || 'User Avatar'}
          fill
          className="object-cover"
          unoptimized
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center font-bold text-gray-400">
          {fullName?.charAt(0) || 'U'}
        </div>
      )}
    </div>
  );
}
