import {
  Bell,
  Briefcase,
  Building2,
  ChartColumn,
  Compass,
  Info,
  Layers,
  MessagesSquare,
  Radar,
  TrendingUp,
  Unlock,
  Wand,
} from '@lucide/svelte';
import type { LucideIcon } from '@lucide/svelte';
import type { Pathname } from '#lib/pathname.js';

export type SiteNavItem = {
  href: Pathname;
  label: string;
  icon: LucideIcon;
};

export const NAV = {
  jobs: { href: '/jobs', label: 'Open Roles', icon: Briefcase },
  companies: { href: '/companies', label: 'VC Funds', icon: Building2 },
  collections: { href: '/collections', label: 'Collections', icon: Layers },
  talent: { href: '/talent', label: 'Talent Network', icon: Radar },

  howItWorks: { href: '/how-it-works', label: 'How it works', icon: Compass },
  about: { href: '/about', label: 'About', icon: Info },
  open: { href: '/open', label: 'Open', icon: Unlock },

  cvTailoring: { href: '/features/tailor', label: 'CV tailoring', icon: Wand },
  jobNotifications: { href: '/features/notifications', label: 'Job notifications', icon: Bell },

  analytics: { href: '/analytics', label: 'Analytics', icon: ChartColumn },
  trends: { href: '/trends', label: 'Trends', icon: TrendingUp },
  discussions: { href: '/discussions', label: 'Discussions', icon: MessagesSquare },
} as const satisfies Record<string, SiteNavItem>;

export const HEADER_LINKS = [
  NAV.jobs,
  NAV.companies,
  NAV.collections,
  NAV.howItWorks,
  NAV.about,
] as const;
