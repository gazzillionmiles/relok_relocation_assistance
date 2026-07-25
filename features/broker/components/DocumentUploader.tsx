"use client";

import React from 'react';

export interface DocumentUploaderProps {
  label: string;
  description: string;
  uploadedFileName?: string | null;
  onUpload: (fileName: string) => void;
  onRemove: () => void;
  required?: boolean;
}

export function DocumentUploader({
  label,
  description,
  uploadedFileName,
  onUpload,
  onRemove,
  required = false,
}: DocumentUploaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-[#0F172A]">{label}</label>
        {required ? (
          <span className="text-[10px] font-extrabold uppercase text-[#128A4E] bg-[#E8F5EE] px-2 py-0.5 rounded-md border border-[#128A4E]/20">
            Required
          </span>
        ) : (
          <span className="text-[10px] font-extrabold uppercase text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
            Optional
          </span>
        )}
      </div>

      <p className="text-xs text-gray-500 font-medium">{description}</p>

      {uploadedFileName ? (
        <div className="w-full p-4 bg-[#E8F5EE] border border-[#128A4E]/30 rounded-2xl flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#128A4E]/10 rounded-xl flex items-center justify-center text-[#128A4E] text-lg">
              📄
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-extrabold text-[#0F172A] truncate">
                {uploadedFileName}
              </span>
              <span className="text-[10px] text-gray-500 font-semibold">
                File attached successfully
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="text-xs font-extrabold text-red-600 hover:underline cursor-pointer"
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onUpload('Attachment_Document.pdf')}
          className="w-full p-6 border-2 border-dashed border-gray-200 hover:border-[#128A4E] bg-slate-50 hover:bg-[#E8F5EE]/30 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer group"
        >
          <span className="text-2xl text-gray-400 group-hover:scale-110 transition-transform">
            📁
          </span>
          <span className="text-xs font-extrabold text-gray-600 group-hover:text-[#128A4E]">
            Tap to upload document copy
          </span>
          <span className="text-[10px] font-medium text-gray-400">
            PDF, JPG or PNG (max 10MB)
          </span>
        </button>
      )}
    </div>
  );
}
