import type { SecondaryMenuItemProps } from '~/components/Menu';

export const site = {
  title: 'NATS Dashboard',
  description: 'A web dashboard for monitoring NATS servers.',
  keywords: [
    'NATS Dashboard',
    'NATS Server Monitoring',
    'NATS JetStream Monitoring',
  ],
} as const;

export interface Server {
  /** Optional server display name. */
  name?: string;
  /** NATS monitoring server URL. */
  url: string;
}

/** NATS monitoring servers default list. */
export const defaultServersList: Server[] = [
  {
    name: 'localhost',
    url: 'http://localhost:8222',
  },
  {
    name: 'demo.nats.io',
    url: 'https://demo.nats.io:8222',
  },
];

/** Comma separated list of server URLs. */
const SERVERS_LIST: string = import.meta.env.PUBLIC_SERVERS_LIST ?? '';

const customServersList: Server[] = SERVERS_LIST.split(',')
  .filter(Boolean)
  .map((url: string) => ({ url }));

/** NATS monitoring servers list. */
export const serversList = customServersList.length
  ? customServersList
  : defaultServersList;

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
