import { IntentOption } from './types';

export const INTENT_OPTIONS: IntentOption[] = [
  {
    id: 'roommate',
    title: 'Find a Roommate',
    description: 'AI-matched flatmates aligned with your lifestyle, budget, and daily routine.',
    badge: 'Popular',
    route: '/matches',
    iconName: 'users',
  },
  {
    id: 'private_room',
    title: 'Find a Private Room',
    description: 'Browse private rooms in flats near your target location.',
    route: '/home?mode=private',
    iconName: 'key',
  },
  {
    id: 'shared_room',
    title: 'Find a Shared Room',
    description: 'Browse shared rooms and split rent with compatible roommates.',
    route: '/home?mode=shared',
    iconName: 'bed',
  },
  {
    id: 'post_room',
    title: 'Post My Room',
    description: 'List your spare room or entire flat in minutes to find flatmates.',
    badge: 'Instant Listing',
    route: '/post',
    iconName: 'home',
  },
  {
    id: 'broker',
    title: 'Use as Broker',
    description: 'List and manage multiple properties as a real estate agent.',
    badge: 'Enterprise',
    route: '/broker/onboarding',
    iconName: 'briefcase',
  },
];
