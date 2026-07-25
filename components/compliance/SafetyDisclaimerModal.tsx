"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/Button';

export interface SafetyDisclaimerModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onClose?: () => void;
  requiredForAction?: string;
}

export function SafetyDisclaimerModal({
  isOpen,
  onAccept,
  onClose,
  requiredForAction,
}: SafetyDisclaimerModalProps) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check scroll position to enable checkbox & continue button
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    // Check if scrolled within 10px of bottom
    const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
    if (isAtBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
    }
  }, [hasScrolledToBottom]);

  // If text container is short enough to fit without scroll, enable automatically
  useEffect(() => {
    if (isOpen) {
      const el = scrollContainerRef.current;
      if (el && el.scrollHeight <= el.clientHeight + 10) {
        setHasScrolledToBottom(true);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!hasScrolledToBottom || !isChecked) return;
    if (typeof window !== 'undefined') {
      localStorage.setItem('relok_safety_disclaimer_accepted', 'true');
    }
    onAccept();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-dialog-title"
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg p-5 sm:p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200 text-[#0F172A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 text-lg font-bold shadow-2xs">
              ⚠️
            </div>
            <div>
              <h3
                id="disclaimer-dialog-title"
                className="text-sm sm:text-base font-extrabold text-[#0F172A]"
              >
                Platform Safety & Due Diligence Disclaimer
              </h3>
              <p className="text-[10px] text-gray-500 font-medium">
                {requiredForAction
                  ? `Required before ${requiredForAction}`
                  : 'Important Safety Notice'}
              </p>
            </div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer p-1"
              aria-label="Close modal"
            >
              ✕
            </button>
          )}
        </div>

        {/* Scrollable Terms Text Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          tabIndex={0}
          aria-label="Safety Disclaimer Terms Text"
          className="bg-slate-50 border border-gray-200 rounded-2xl p-4 max-h-56 overflow-y-auto text-xs text-gray-700 leading-relaxed space-y-3 font-normal focus:outline-none focus:ring-2 focus:ring-[#128A4E]"
        >
          <p className="font-semibold text-gray-900">
            This platform does not independently verify user identities, government documents, property ownership, broker credentials, or personal safety.
          </p>

          <p>
            All information on Relok is self-declared by individual users, listers, and brokers unless otherwise explicitly stated in writing.
          </p>

          <p>
            Users are solely responsible for exercising appropriate caution when communicating, sharing personal information, making payments, or meeting in person.
          </p>

          <p className="font-semibold text-gray-900">
            Always meet in safe public locations and perform your own independent due diligence before making advance payments or entering into any lease agreement.
          </p>

          <p className="text-[11px] text-gray-500 italic pt-2 border-t border-gray-200">
            Scroll to the bottom of this notice to enable the acknowledgment check box.
          </p>
        </div>

        {/* Scroll Progress Notice */}
        {!hasScrolledToBottom && (
          <p className="text-[11px] text-amber-700 font-bold bg-amber-50 p-2 rounded-xl border border-amber-100 text-center">
            👇 Please scroll to the bottom of the disclaimer text above to proceed.
          </p>
        )}

        {/* Checkbox Acknowledgment */}
        <div className="flex items-start gap-3 pt-1">
          <input
            id="safety-disclaimer-checkbox"
            type="checkbox"
            checked={isChecked}
            disabled={!hasScrolledToBottom}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="w-4 h-4 mt-0.5 accent-[#128A4E] rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          />
          <label
            htmlFor="safety-disclaimer-checkbox"
            className={`text-xs font-semibold select-none ${
              hasScrolledToBottom ? 'text-[#0F172A] cursor-pointer' : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            I understand and accept these safety risks and agree to perform my own due diligence.
          </label>
        </div>

        {/* Action Button */}
        <Button
          variant="primary"
          onClick={handleConfirm}
          disabled={!hasScrolledToBottom || !isChecked}
          className="w-full h-11 text-sm mt-1"
        >
          Acknowledge & Continue
        </Button>
      </div>
    </div>
  );
}
