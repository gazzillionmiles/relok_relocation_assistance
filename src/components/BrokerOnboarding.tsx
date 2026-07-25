import React, { useState } from 'react';
import { Briefcase, Building2 } from 'lucide-react';
import { PrimaryButton, FormInput, BackButton } from './Common';

interface BrokerOnboardingProps {
  onBack: () => void;
  onComplete: (brokerData: {
    agencyName: string;
    brokerType: 'Individual Agent' | 'Agency';
    experience: string;
    areas: string[];
    reraNumber: string;
  }) => void;
}

export const BrokerOnboarding: React.FC<BrokerOnboardingProps> = ({ onBack, onComplete }) => {
  // Form State
  const [agencyName, setAgencyName] = useState('');
  const [brokerType, setBrokerType] = useState<'Individual Agent' | 'Agency'>('Individual Agent');
  const [experience, setExperience] = useState('');
  const [areas, setAreas] = useState<string[]>([]);
  const [reraNumber, setReraNumber] = useState('');

  const CITIES = [
    'Bengaluru',
    'Mumbai',
    'Delhi NCR',
    'Pune',
    'Hyderabad',
    'Chennai',
    'Kolkata'
  ];

  const toggleCity = (city: string) => {
    if (areas.includes(city)) {
      setAreas(areas.filter(c => c !== city));
    } else {
      setAreas([...areas, city]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      agencyName: agencyName.trim() || 'Independent Agent',
      brokerType,
      experience: experience.trim() || '1+',
      areas: areas.length > 0 ? areas : ['Bengaluru'],
      reraNumber: reraNumber.trim() || ''
    });
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-6 max-w-xl mx-auto w-full animate-in fade-in duration-300">
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-1">
            <BackButton onClick={onBack} />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Broker Profile</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
              Broker Registration
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Provide your agent or agency details to manage multi-unit listings.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <FormInput
              label="Agency or Business Name (Optional)"
              placeholder="e.g. Dream Realty Services"
              value={agencyName}
              onChange={setAgencyName}
            />

            {/* Broker Type Toggle */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#0F172A]">Broker Type</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'Individual Agent' as const, label: 'Individual Agent', icon: <Briefcase size={16} /> },
                  { id: 'Agency' as const, label: 'Agency / Firm', icon: <Building2 size={16} /> }
                ].map((type) => {
                  const isSelected = brokerType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setBrokerType(type.id)}
                      className={`h-14 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#128A4E] text-white border-[#128A4E] shadow-xs'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {type.icon}
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <FormInput
              label="Years of Experience (Optional)"
              placeholder="e.g. 5"
              type="number"
              value={experience}
              onChange={setExperience}
            />

            {/* Operating Cities */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Areas of Operation</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {CITIES.map((city) => {
                  const isSelected = areas.includes(city);
                  return (
                    <button
                      key={city}
                      type="button"
                      onClick={() => toggleCity(city)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#128A4E] text-white border-[#128A4E] shadow-xs'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {city}
                    </button>
                  );
                })}
              </div>
            </div>

            <FormInput
              label="RERA Registration Number (Optional)"
              placeholder="e.g. PRM/KA/RERA/1251/..."
              value={reraNumber}
              onChange={setReraNumber}
            />
          </div>
        </div>

        <div className="mt-8">
          <PrimaryButton
            type="submit"
            text="Complete Setup & Open Dashboard"
          />
        </div>
      </form>
    </div>
  );
};
