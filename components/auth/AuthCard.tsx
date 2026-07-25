import React from 'react';
import { Card } from '@/components/ui/Card';

export interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className = '' }: AuthCardProps) {
  return (
    <Card className={`w-full max-w-md mx-auto flex flex-col justify-between gap-6 ${className}`}>
      {children}
    </Card>
  );
}
