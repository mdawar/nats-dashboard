import { A, useLocation, type AnchorProps } from '@solidjs/router';

export default function Navigation() {
  const location = useLocation();

  // Preserve the query params on navigation.
  const path = (path: string) => `${path}${location.search}`;

  return (
    <nav class="flex overflow-x-auto border-b border-gray-200 dark:border-white/10 py-4">
      <ul
        role="list"
        class="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-500 dark:text-gray-400 sm:px-6 lg:px-8"
      >
        <li>
          <Link href={path('/')}>Overview</Link>
        </li>
        <li>
          <Link href={path('/info')}>Info</Link>
        </li>
        <li>
          <Link href={path('/connections')}>Connections</Link>
        </li>
        <li>
          <Link href={path('/jetstream')}>JetStream</Link>
        </li>
      </ul>
    </nav>
  );
}

function Link(props: AnchorProps) {
  return (
    <A activeClass="text-sky-600 dark:text-sky-400" end={true} {...props} />
  );
}
