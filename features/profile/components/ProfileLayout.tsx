import React from 'react';

export interface ProfileLayoutProps {
  sidebarContent: React.ReactNode;
  mainContent: React.ReactNode;
}

export function ProfileLayout({
  sidebarContent,
  mainContent,
}: ProfileLayoutProps) {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Profile Summary & Stats */}
      <div className="col-span-1 lg:col-span-4 flex flex-col gap-6 sticky top-20">
        {sidebarContent}
      </div>

      {/* Right Column: Editable Forms, Sections & Settings */}
      <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
        {mainContent}
      </div>
    </div>
  );
}
