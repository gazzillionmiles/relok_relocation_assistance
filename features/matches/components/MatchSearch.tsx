"use client";

import React from 'react';
import { SearchBar } from '@/features/marketplace/components/SearchBar';

export interface MatchSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function MatchSearch({ value, onChange }: MatchSearchProps) {
  return (
    <SearchBar
      value={value}
      onChange={onChange}
      placeholder="Search roommates by name, job, college, or bio..."
    />
  );
}
