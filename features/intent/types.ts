export type IntentType =
  | 'roommate'
  | 'private_room'
  | 'shared_room'
  | 'post_room'
  | 'broker';

export interface IntentOption {
  id: IntentType;
  title: string;
  description: string;
  badge?: string;
  route: string;
  iconName: 'users' | 'key' | 'bed' | 'home' | 'briefcase';
}
