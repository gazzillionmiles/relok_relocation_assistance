import React from 'react';

export interface VerificationStatusProps {
  reraNumber?: string;
  className?: string;
}

export function VerificationStatus({
  reraNumber,
  className = '',
}: VerificationStatusProps) {
  return (
    <div
      className={`flex flex-col gap-2 bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-slate-500" />
        <span className="font-extrabold text-slate-800 uppercase tracking-wider">
          Marketplace Notice
        </span>
      </div>

      <p className="text-slate-600 font-medium leading-relaxed">
        Details provided in this agent profile are self-declared. Relok is a discovery platform and does not independently verify property listings or credentials.
      </p>

      {reraNumber && (
        <span className="text-[10px] font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md self-start border border-slate-200">
          Registration / RERA: {reraNumber}
        </span>
      )}
    </div>
  );
}
