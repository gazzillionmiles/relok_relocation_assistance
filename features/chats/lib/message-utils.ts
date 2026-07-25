import { Message } from '@/types';

/**
 * Formats timestamps for messages and chat threads.
 */
export function formatMessageTimestamp(rawTimestamp: string): string {
  if (!rawTimestamp) return 'Just now';
  return rawTimestamp;
}

/**
 * Determines whether a date divider separator should be shown above a message.
 */
export function shouldShowDateDivider(
  prevMessage?: Message,
  currentMessage?: Message
): boolean {
  if (!currentMessage) return false;
  if (!prevMessage) return true;
  return prevMessage.timestamp !== currentMessage.timestamp;
}
