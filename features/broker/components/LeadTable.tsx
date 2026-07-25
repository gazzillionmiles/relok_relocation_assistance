import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChatThread } from '@/types';
import { LeadCard } from './LeadCard';

export interface LeadTableProps {
  chats: ChatThread[];
}

export function LeadTable({ chats }: LeadTableProps) {
  if (chats.length === 0) {
    return (
      <div className="p-6 text-center bg-white rounded-2xl border border-gray-100 text-xs text-gray-400 font-semibold">
        No customer lead inquiries received yet.
      </div>
    );
  }
 
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Mobile Card Stack */}
      <div className="flex flex-col gap-2.5 sm:hidden">
        {chats.map((chat) => (
          <LeadCard key={chat.id} chat={chat} />
        ))}
      </div>
 
      {/* Desktop & Tablet Table (>=640px) */}
      <div className="hidden sm:block w-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-2xs">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <caption className="sr-only">Customer Inquiries and Leads</caption>
          <thead className="bg-slate-50 border-b border-gray-100 text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
            <tr>
              <th scope="col" className="py-2.5 px-3">
                Customer Seeker
              </th>
              <th scope="col" className="py-2.5 px-3">
                Inquired Property
              </th>
              <th scope="col" className="py-2.5 px-3">
                Last Message
              </th>
              <th scope="col" className="py-2.5 px-3 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {chats.map((chat) => {
              const lastMsg = chat.messages[chat.messages.length - 1];
 
              return (
                <tr key={chat.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-[#0F172A]">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-100 bg-gray-100 shrink-0">
                        {chat.partner.photoUrl ? (
                          <Image
                            src={chat.partner.photoUrl}
                            alt={chat.partner.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <span className="w-full h-full flex items-center justify-center text-xs">
                            👤
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-extrabold text-[#0F172A] text-xs">
                          {chat.partner.name}
                        </span>
                        <span className="text-[9px] text-gray-400 font-semibold leading-none">
                          {chat.partner.occupation}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-gray-700 font-semibold truncate max-w-[150px] text-xs">
                    {chat.roomListing?.title || 'General Inquiry'}
                  </td>
                  <td className="py-2.5 px-3 text-gray-500 font-medium italic truncate max-w-[180px] text-xs">
                    &quot;{lastMsg?.text || 'No messages'}&quot;
                  </td>
                  <td className="py-2.5 px-3 text-right text-xs">
                    <Link
                      href="/chats"
                      className="text-xs font-extrabold text-[#128A4E] hover:underline"
                    >
                      Open Chat →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
