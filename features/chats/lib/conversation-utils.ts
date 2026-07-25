import { ChatThread } from '@/types';

export type ChatFilterTab = 'all' | 'unread' | 'matches' | 'messages' | 'system';

/**
 * Filters chat threads by active category tab and search query.
 */
export function filterChatThreads(
  threads: ChatThread[],
  filterTab: ChatFilterTab,
  searchQuery: string
): ChatThread[] {
  return threads.filter((thread) => {
    // 1. Search Query filter
    const matchesSearch =
      !searchQuery ||
      thread.partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.partner.occupation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (thread.roomListing &&
        thread.roomListing.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      thread.messages.some((m) =>
        m.text.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (!matchesSearch) return false;

    // 2. Category Tab filter
    switch (filterTab) {
      case 'all':
        return !thread.isArchived;
      case 'unread':
        return thread.unread && !thread.isArchived;
      case 'matches':
        return !thread.roomListing && !thread.isArchived;
      case 'messages':
        return !!thread.roomListing && !thread.isArchived;
      case 'system':
        return false;
      default:
        return true;
    }
  });
}

/**
 * Calculates total unread chat threads count.
 */
export function getUnreadCount(threads: ChatThread[]): number {
  return threads.filter((t) => t.unread && !t.isArchived).length;
}
