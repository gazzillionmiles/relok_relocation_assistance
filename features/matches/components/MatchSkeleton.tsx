import React from 'react';

export function MatchSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-3xl border border-gray-100 p-5 flex flex-col gap-4 animate-pulse shadow-2xs"
        >
          <div className="flex justify-between items-center">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
            <div className="w-20 h-6 bg-gray-200 rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded-md w-3/4" />
            <div className="h-3 bg-gray-100 rounded-md w-1/2" />
          </div>
          <div className="h-12 bg-gray-100 rounded-2xl w-full" />
          <div className="h-10 bg-gray-200 rounded-xl w-full" />
        </div>
      ))}
    </div>
  );
}
