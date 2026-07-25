"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { SafetyDisclaimerModal } from '@/components/compliance/SafetyDisclaimerModal';

export function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-white border-t border-gray-100 py-6 px-4 sm:px-6 lg:px-8 mt-auto text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Legal Notice */}
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="font-extrabold text-[#0F172A]">
              Relok Marketplace Platform Notice
            </span>
            <p className="text-[11px] leading-relaxed text-gray-500 font-normal">
              Relok is a discovery marketplace and does not verify users, brokers, property listings, or lease documents. Information displayed is provided directly by community users. Please exercise caution and perform independent due diligence before making payments.
            </p>
          </div>

          {/* Links & Safety Modal Trigger */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#128A4E]">
            <Link
              href="/safety"
              className="hover:underline font-bold flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] rounded-md px-1"
            >
              <span>🛡️ Safety Center</span>
            </Link>
            <span className="text-gray-200">|</span>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="hover:underline cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] rounded-md px-1"
            >
              Safety Guidelines
            </button>
            <span className="text-gray-200">|</span>
            <Link href="#" className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] rounded-md px-1">
              Terms of Service
            </Link>
            <span className="text-gray-200">|</span>
            <Link href="#" className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] rounded-md px-1">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>

      {/* Safety Guidelines Modal */}
      <SafetyDisclaimerModal
        isOpen={isModalOpen}
        onAccept={() => setIsModalOpen(false)}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
