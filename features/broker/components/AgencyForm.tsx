"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { INDIAN_CITIES } from '@/data/data';

export function AgencyForm() {
  const router = useRouter();

  // Agent / Agency Setup Details
  const [agencyName, setAgencyName] = useState('');
  const [brokerType, setBrokerType] = useState<'Individual Agent' | 'Agency'>(
    'Individual Agent'
  );
  const [experience, setExperience] = useState('');
  const [areas, setAreas] = useState<string[]>(['Bengaluru']);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleCity = (city: string) => {
    if (areas.includes(city)) {
      setAreas(areas.filter((c) => c !== city));
    } else {
      setAreas([...areas, city]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/broker/dashboard');
    }, 500);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-1 pb-3 border-b border-gray-100">
        <h2 className="text-lg font-extrabold text-[#0F172A]">
          Agent & Agency Profile
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Set up your broker profile details to manage property listings on Relok.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Input
          label="Agency or Business Name"
          placeholder="e.g. Dream Realty Services"
          value={agencyName}
          onChange={(e) => setAgencyName(e.target.value)}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#0F172A]">Broker Type</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'Individual Agent' as const, label: 'Individual Agent', icon: '💼' },
              { id: 'Agency' as const, label: 'Agency / Firm', icon: '🏢' },
            ].map((type) => {
              const isSelected = brokerType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setBrokerType(type.id)}
                  className={`h-14 rounded-2xl border flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] ${
                    isSelected
                      ? 'bg-[#128A4E] text-white border-[#128A4E] shadow-2xs'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span>{type.icon}</span>
                  <span>{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <Input
          label="Years of Experience"
          placeholder="e.g. 5"
          type="number"
          min={0}
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />

        {/* Operating Cities Multi-select */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Operating Metro Cities
          </label>
          <div className="flex flex-wrap gap-2">
            {INDIAN_CITIES.map((city) => {
              const isSelected = areas.includes(city);
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => toggleCity(city)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] ${
                    isSelected
                      ? 'bg-[#128A4E] text-white border-[#128A4E] shadow-2xs'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {city} {isSelected ? '✓' : ''}
                </button>
              );
            })}
          </div>
        </div>

        <Input
          label="RERA / Business Registration Number (Optional)"
          placeholder="e.g. PRM/KA/RERA/1251/310/PR/..."
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
        />

        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          className="w-full h-12 text-sm font-bold mt-2"
        >
          Complete Setup & Open Dashboard
        </Button>
      </form>
    </div>
  );
}
