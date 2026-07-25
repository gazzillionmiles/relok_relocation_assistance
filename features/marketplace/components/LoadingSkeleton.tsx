import React from 'react';

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-100 rounded-3xl p-4 flex flex-col gap-4 animate-pulse shadow-xs"
        >
          <div className="w-full h-44 bg-gray-200 rounded-2xl" />
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded-md w-3/4" />
            <div className="h-3 bg-gray-100 rounded-md w-1/2" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="h-5 bg-gray-200 rounded-md w-20" />
            <div className="h-8 bg-gray-200 rounded-xl w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
