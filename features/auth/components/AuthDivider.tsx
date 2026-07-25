import React from 'react';

export function AuthDivider() {
  return (
    <div className="relative my-4 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-200" />
      </div>
      <div className="relative bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
        OR
      </div>
    </div>
  );
}
