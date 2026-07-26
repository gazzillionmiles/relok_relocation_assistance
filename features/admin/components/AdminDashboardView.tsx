"use client";

import React, { useState, useEffect } from 'react';
import { ModerationBadge, ModerationState } from './ModerationBadge';
import { getAllReports, updateReportStatus } from '@/actions/profile.actions';

interface MockReport {
  id: string;
  type: 'listing' | 'user';
  targetTitle: string;
  targetId: string;
  reportedBy: string;
  reason: string;
  date: string;
  status: ModerationState;
}

export function AdminDashboardView() {
  const [activeTab, setActiveTab] = useState<'reports' | 'reported-users' | 'reported-listings' | 'hidden-listings' | 'suspended-users' | 'review-queue'>('reports');
  const [reports, setReports] = useState<MockReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchReports() {
      setIsLoading(true);
      try {
        const res = await getAllReports();
        if (res.success && res.data && res.data.length > 0) {
          const dbReports: MockReport[] = res.data.map((r: any) => {
            let uiStatus: ModerationState = 'under_review';
            if (r.status === 'resolved') uiStatus = 'active';
            if (r.status === 'rejected') uiStatus = 'under_review';
            
            return {
              id: r.id, // Keep full DB ID for updating
              type: r.target_type,
              targetTitle: r.target_type === 'listing' ? 'Property Listing Post' : 'User Account Profile',
              targetId: r.target_id,
              reportedBy: 'Anonymous User',
              reason: r.reason,
              date: new Date(r.created_at).toLocaleDateString(),
              status: uiStatus,
            };
          });
          setReports(dbReports);
        } else {
          setReports([]);
        }
      } catch (err) {
        console.error('Failed to load admin reports:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReports();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: ModerationState) => {
    try {
      let dbStatus = 'open';
      if (newStatus === 'active') dbStatus = 'resolved';
      if (newStatus === 'suspended' || newStatus === 'hidden_by_moderation') dbStatus = 'resolved';
      
      await updateReportStatus(id, dbStatus);
    } catch (err) {
      console.error('Failed to save status in database:', err);
    }

    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const filteredReports = reports.filter((r) => {
    if (activeTab === 'reported-users') return r.type === 'user';
    if (activeTab === 'reported-listings') return r.type === 'listing';
    if (activeTab === 'hidden-listings') return r.status === 'hidden_by_moderation';
    if (activeTab === 'suspended-users') return r.status === 'suspended';
    if (activeTab === 'review-queue') return r.status === 'under_review';
    return true; // 'reports'
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              🛠️ Internal Admin Architecture
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Trust & Moderation Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
              Review flagged listings, moderate user profiles, and manage community safety queues.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300">
              Queue: {reports.filter((r) => r.status === 'under_review').length} Pending
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'reports', label: 'All Reports' },
            { id: 'review-queue', label: 'Review Queue' },
            { id: 'reported-listings', label: 'Reported Listings' },
            { id: 'reported-users', label: 'Reported Users' },
            { id: 'hidden-listings', label: 'Hidden Listings' },
            { id: 'suspended-users', label: 'Suspended Users' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#128A4E] text-white shadow-xs'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reports Table / Card List */}
        <div className="bg-slate-800/60 rounded-3xl border border-slate-700/60 overflow-hidden shadow-xl">
          <div className="p-4 sm:p-6 border-b border-slate-700/60 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-white capitalize">
              {activeTab.replace('-', ' ')} ({filteredReports.length})
            </h2>
            <span className="text-xs text-slate-400">Placeholder UI model for backend moderation API</span>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-t-transparent border-emerald-400 rounded-full animate-spin" />
              <span>Loading reports...</span>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs font-medium">
              No records found under this section.
            </div>
          ) : (
            <div className="divide-y divide-slate-700/60 overflow-x-auto">
              {filteredReports.map((report) => (
                <div key={report.id} className="p-4 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:bg-slate-800/90 transition-colors">
                  <div className="flex flex-col gap-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                        report.type === 'listing' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      }`}>
                        {report.type}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">{report.id}</span>
                      <ModerationBadge status={report.status} />
                    </div>

                    <h3 className="text-base font-bold text-white">{report.targetTitle}</h3>
                    <p className="text-xs text-slate-300 font-medium">
                      Reason: <strong className="text-amber-400">{report.reason}</strong>
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-1">
                      <span>Reported by: {report.reportedBy}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-wrap shrink-0">
                    <button
                      onClick={() => handleUpdateStatus(report.id, 'active')}
                      className="px-3 py-1.5 rounded-xl bg-slate-700 text-slate-200 text-xs font-bold hover:bg-slate-600 transition-colors cursor-pointer"
                    >
                      Dismiss / Approve
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(report.id, 'hidden_by_moderation')}
                      className="px-3 py-1.5 rounded-xl bg-orange-600/80 text-white text-xs font-bold hover:bg-orange-600 transition-colors cursor-pointer"
                    >
                      Hide Listing
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(report.id, 'suspended')}
                      className="px-3 py-1.5 rounded-xl bg-red-600/80 text-white text-xs font-bold hover:bg-red-600 transition-colors cursor-pointer"
                    >
                      Suspend User
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
