import type { SecondaryMenuItemProps } from '~/components/Sidebar';

export const site = {
  title: 'NATS Dashboard',
  description: 'A web dashboard for monitoring a NATS server.',
  keywords: [
    'NATS Dashboard',
    'NATS Server Monitoring',
    'NATS JetStream Monitoring',
  ],
} as const;

export const externalLinks: SecondaryMenuItemProps[] = [
  {
    href: 'https://github.com/mdawar/nats-dashboard',
    letter: 'G',
    children: 'GitHub',
    target: '_blank',
  },
  {
    href: 'https://nats.io/',
    letter: 'N',
    children: 'NATS.io',
  },
  {
    href: 'https://docs.nats.io/',
    letter: 'D',
    children: 'NATS Docs',
  },
];
