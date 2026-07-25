"use client";

import React from 'react';

export interface MapSelectorProps {
  mapCenter: { lat: number; lng: number };
  onCenterChange: (center: { lat: number; lng: number }) => void;
  pinAccuracy: 'Exact' | 'Near Exact' | 'Approximate';
  onAccuracyChange: (accuracy: 'Exact' | 'Near Exact' | 'Approximate') => void;
  onAutoFillLocation?: () => void;
}

export function MapSelector({
  mapCenter,
  onAccuracyChange,
  pinAccuracy,
  onAutoFillLocation,
}: MapSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Map Embed Container */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-[#0F172A]">
            Pin Location on Map
          </label>
          <span className="text-xs text-gray-400 font-medium">
            Drag marker to adjust exact coordinates
          </span>
        </div>

        <div className="h-52 sm:h-60 rounded-2xl overflow-hidden border border-gray-200 relative bg-slate-100 shadow-inner">
          <iframe
            title="Property Location Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${
              mapCenter.lng - 0.005
            }%2C${mapCenter.lat - 0.003}%2C${mapCenter.lng + 0.005}%2C${
              mapCenter.lat + 0.003
            }&layer=mapnik&marker=${mapCenter.lat}%2C${mapCenter.lng}`}
          />

          {/* Draggable Location Pin Overlay Accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-1 pointer-events-none">
            <div className="w-8 h-8 rounded-full bg-[#128A4E] text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
              📍
            </div>
            <span className="bg-slate-900/85 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-md">
              Draggable Pin Location
            </span>
          </div>

          {onAutoFillLocation && (
            <button
              type="button"
              onClick={onAutoFillLocation}
              className="absolute bottom-3 right-3 bg-white border border-gray-200 hover:border-gray-300 text-xs font-bold text-[#0F172A] py-1.5 px-3 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer z-20"
            >
              <span>📍 Use HSR Layout Sample</span>
            </button>
          )}
        </div>
      </div>

      {/* Pin Accuracy Privacy Control */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Pin Display Accuracy
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            { key: 'Exact' as const, label: 'Exact Pin', desc: 'Displays exact home pin' },
            { key: 'Near Exact' as const, label: 'Near Exact', desc: 'Displays 50m radius' },
            { key: 'Approximate' as const, label: 'Approximate', desc: 'Locality area only' },
          ].map((mode) => (
            <button
              key={mode.key}
              type="button"
              onClick={() => onAccuracyChange(mode.key)}
              aria-pressed={pinAccuracy === mode.key}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] ${
                pinAccuracy === mode.key
                  ? 'border-[#128A4E] bg-[#E8F5EE] ring-1 ring-[#128A4E]'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <span className="text-xs font-bold text-[#0F172A]">{mode.label}</span>
              <span className="text-[10px] text-gray-500 font-medium">{mode.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
