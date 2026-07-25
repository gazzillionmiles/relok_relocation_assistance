import React from 'react';
import { Sidebar } from './Sidebar';
import { DesktopTopBar } from './DesktopTopBar';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { ResponsiveContent } from './ResponsiveContent';
import { Footer } from './Footer';

export interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex text-[#0F172A] font-sans antialiased selection:bg-[#128A4E]/30 relative">
      {/* Permanent Desktop & Collapsible Tablet Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen pb-20 sm:pb-0">
        {/* Mobile Header (<768px) */}
        <MobileHeader />

        {/* Desktop / Tablet Sticky Top Bar (>=768px) */}
        <DesktopTopBar />

        {/* Main Content Area */}
        <ResponsiveContent>
          {children}
        </ResponsiveContent>

        {/* Persistent Legal & Safety Footer */}
        <Footer />
      </div>

      {/* Fixed Mobile Bottom Navigation (<768px) */}
      <MobileBottomNav />
    </div>
  );
}
