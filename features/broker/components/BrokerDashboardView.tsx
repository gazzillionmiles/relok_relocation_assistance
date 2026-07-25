"use client";

import React, { useState } from 'react';
import { useBrokerDashboard } from '../hooks/useBrokerDashboard';
import { BrokerLayout } from './BrokerLayout';
import { DashboardHeader } from './DashboardHeader';
import { MetricsCards } from './MetricsCards';
import { ListingTable } from './ListingTable';
import { LeadTable } from './LeadTable';
import { BrokerProfile } from './BrokerProfile';
import { QuickEditDialog } from './QuickEditDialog';

export function BrokerDashboardView() {
  const {
    brokerDetails,
    rooms,
    deactivatedIds,
    toggleListingActive,
    chats,
    editingRoom,
    setEditingRoom,
    saveQuickEdit,
    toastMessage,
  } = useBrokerDashboard();

  const [activeTab, setActiveTab] = useState<'properties' | 'leads'>('properties');

  return (
    <BrokerLayout>
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-[#128A4E] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md z-50 flex items-center gap-2 border border-white/20 animate-bounce">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
 
      {/* Header Row */}
      <DashboardHeader
        agencyName={brokerDetails.agencyName}
      />
 
      {/* 4 Metric Cards Row */}
      <MetricsCards
        totalListings={rooms.length}
        totalLeads={chats.length}
      />
 
      {/* Main Grid (Center Work Area + Right Profile Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Main Work Area Column (col-span-8) */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-4">
          {/* Filter Tabs Header */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('properties')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                  activeTab === 'properties'
                    ? 'bg-[#128A4E] text-white shadow-2xs'
                    : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                }`}
              >
                Managed Properties ({rooms.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('leads')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                  activeTab === 'leads'
                    ? 'bg-[#128A4E] text-white shadow-2xs'
                    : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                }`}
              >
                Customer Leads ({chats.length})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'properties' ? (
            <ListingTable
              rooms={rooms}
              deactivatedIds={deactivatedIds}
              onEdit={(room) => setEditingRoom(room)}
              onToggleActive={toggleListingActive}
            />
          ) : (
            <LeadTable chats={chats} />
          )}
        </div>

        {/* Right Sidebar Column (col-span-4) */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          <BrokerProfile
            brokerDetails={brokerDetails}
            totalListings={rooms.length}
          />
        </div>
      </div>

      {/* Quick Edit Dialog Modal */}
      <QuickEditDialog
        room={editingRoom}
        onClose={() => setEditingRoom(null)}
        onSave={saveQuickEdit}
      />
    </BrokerLayout>
  );
}
