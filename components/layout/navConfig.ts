export interface NavItemConfig {
  label: string;
  href: string;
  iconName: 'home' | 'users' | 'plus' | 'chat' | 'profile' | 'briefcase';
  badge?: string;
  isPrimaryAction?: boolean;
  isBrokerOnly?: boolean;
}

export const MAIN_NAV_ITEMS: NavItemConfig[] = [
  {
    label: 'Home',
    href: '/home',
    iconName: 'home',
  },
  {
    label: 'Matches',
    href: '/matches',
    iconName: 'users',
    badge: 'AI',
  },
  {
    label: 'Post',
    href: '/post',
    iconName: 'plus',
    isPrimaryAction: true,
  },
  {
    label: 'Chats',
    href: '/chats',
    iconName: 'chat',
  },
  {
    label: 'Profile',
    href: '/profile',
    iconName: 'profile',
  },
  {
    label: 'Broker Hub',
    href: '/broker/onboarding',
    iconName: 'briefcase',
    isBrokerOnly: true,
  },
];
