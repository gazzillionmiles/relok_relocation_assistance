"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function SafetyCenterPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'staying-safe' | 'scams' | 'meeting' | 'payments' | 'reporting' | 'guidelines' | 'emergency'>('all');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 selection:bg-[#128A4E]/30 antialiased">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-[#128A4E] to-[#0A5A30] text-white py-12 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <Link href="/home" className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-200 hover:text-white transition-colors mb-2">
              ← Back to Marketplace
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-emerald-100 w-fit">
              🛡️ Relok Safety Center
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Marketplace Safety & Guidance
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 font-medium max-w-2xl leading-relaxed">
              Your security and peace of mind are our top priorities. Learn how to navigate co-living, inspect properties safely, and avoid fraudulent activity.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center sm:text-right shrink-0">
            <span className="block text-xs text-emerald-100 uppercase tracking-widest font-bold">Need Immediate Help?</span>
            <span className="block text-lg font-extrabold text-white mt-1">National Helpline: 112</span>
            <span className="block text-[11px] text-emerald-200 mt-0.5">Emergency Services India</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar scrollbar-none border-b border-slate-200">
          {[
            { id: 'all', label: 'All Topics' },
            { id: 'staying-safe', label: 'Staying Safe' },
            { id: 'scams', label: 'Avoiding Scams' },
            { id: 'meeting', label: 'Meeting Safely' },
            { id: 'payments', label: 'Payments' },
            { id: 'reporting', label: 'Reporting Abuse' },
            { id: 'guidelines', label: 'Community Guidelines' },
            { id: 'emergency', label: 'Emergency Contacts' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#128A4E] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notice Disclaimer Banner */}
        <div className="my-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs sm:text-sm font-medium leading-relaxed flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <strong className="font-bold text-amber-950 block">Marketplace Information Notice</strong>
            Relok is a discovery marketplace connecting flatmates and landlords directly. Relok does not verify properties, user identities, or lease documents. Always perform independent due diligence before making advance payments or signing agreements.
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          {/* Section 1: Staying Safe */}
          {(activeTab === 'all' || activeTab === 'staying-safe') && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#128A4E] flex items-center justify-center text-2xl font-bold">
                🏠
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">1. Staying Safe</h2>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#128A4E] font-bold">✓</span>
                  <span>Inspect properties in person during daylight hours before agreeing to rent.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#128A4E] font-bold">✓</span>
                  <span>Bring a friend or family member along when visiting an unfamiliar property.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#128A4E] font-bold">✓</span>
                  <span>Verify property ownership or host authorization directly with building management.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#128A4E] font-bold">✓</span>
                  <span>Keep initial conversations within Relok chat until trust is established.</span>
                </li>
              </ul>
            </div>
          )}

          {/* Section 2: Avoiding Scams */}
          {(activeTab === 'all' || activeTab === 'scams') && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl font-bold">
                🚫
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">2. Avoiding Scams</h2>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Never wire money, UPI transfer, or send token deposits before physically inspecting the property.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Beware of callers claiming to be military/defense officers asking for advance online fees.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Avoid listings priced significantly below market rates without plausible reason.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Do not scan QR codes or enter UPI PINs to receive money (UPI PIN is ONLY for paying out).</span>
                </li>
              </ul>
            </div>
          )}

          {/* Section 3: Meeting Safely */}
          {(activeTab === 'all' || activeTab === 'meeting') && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-bold">
                📍
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">3. Meeting Safely</h2>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Choose well-lit, public locations like cafes for initial roommate meetups.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Share your live location with a contact before attending a property viewing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Trust your instincts. If a situation or individual feels uncomfortable, leave immediately.</span>
                </li>
              </ul>
            </div>
          )}

          {/* Section 4: Payments */}
          {(activeTab === 'all' || activeTab === 'payments') && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F5EE] text-[#128A4E] flex items-center justify-center text-2xl font-bold">
                💳
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">4. Safe Payments</h2>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#128A4E] font-bold">•</span>
                  <span>Always execute a formal written Leave & License or Tenancy Agreement before paying security deposit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#128A4E] font-bold">•</span>
                  <span>Demand written bank receipts or signed payment vouchers for all transactions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#128A4E] font-bold">•</span>
                  <span>Use bank account transfers (NEFT/IMPS/UPI) over untraceable cash payments.</span>
                </li>
              </ul>
            </div>
          )}

          {/* Section 5: Reporting Abuse */}
          {(activeTab === 'all' || activeTab === 'reporting') && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-2xl font-bold">
                🚩
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">5. Reporting Abuse</h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Help us keep Relok safe for everyone. Every listing, profile, and chat window contains a More (⋮) menu with option to report.
              </p>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700 flex flex-col gap-2">
                <span>When to report:</span>
                <span className="text-slate-500 font-medium">• Fake listings or stolen photos</span>
                <span className="text-slate-500 font-medium">• Harassment, hate speech, or inappropriate conduct</span>
                <span className="text-slate-500 font-medium">• Fraudulent advance payment requests</span>
              </div>
            </div>
          )}

          {/* Section 6: Community Guidelines */}
          {(activeTab === 'all' || activeTab === 'guidelines') && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl font-bold">
                🤝
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">6. Community Guidelines</h2>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Respect:</strong> Treat all community members with courtesy regardless of background.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Honesty:</strong> Provide accurate descriptions, photos, and rental prices in room listings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Non-Discrimination:</strong> Relok prohibits discrimination based on gender, religion, caste, or dietary preferences.</span>
                </li>
              </ul>
            </div>
          )}

          {/* Section 7: Emergency Contacts */}
          {(activeTab === 'all' || activeTab === 'emergency') && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col gap-4 md:col-span-2">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center text-2xl font-bold">
                📞
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">7. Emergency Contacts & Helplines (India)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <span className="text-xs font-bold text-slate-500 uppercase">National Emergency</span>
                  <span className="text-2xl font-black text-slate-900">112</span>
                  <span className="text-xs text-slate-500 font-medium">Police, Fire & Ambulance</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <span className="text-xs font-bold text-slate-500 uppercase">Cyber Crime Helpline</span>
                  <span className="text-2xl font-black text-slate-900">1930</span>
                  <span className="text-xs text-slate-500 font-medium">Online Financial Scams</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <span className="text-xs font-bold text-slate-500 uppercase">Women Helpline</span>
                  <span className="text-2xl font-black text-slate-900">1091</span>
                  <span className="text-xs text-slate-500 font-medium">24/7 Safety & Assistance</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <span className="text-xs font-bold text-slate-500 uppercase">Relok Moderation</span>
                  <span className="text-lg font-black text-slate-900">safety@relok.in</span>
                  <span className="text-xs text-slate-500 font-medium">Report non-urgent safety issues</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
