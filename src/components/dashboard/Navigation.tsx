import { A, type AnchorProps } from '@solidjs/router';

export default function Navigation() {
  return (
    <nav class="flex overflow-x-auto border-b border-gray-200 dark:border-white/10 py-4">
      <ul
        role="list"
        class="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-500 dark:text-gray-400 sm:px-6 lg:px-8"
      >
        <li>
          <Link href="/">Overview</Link>
        </li>
        <li>
          <Link href="/connections">Connections</Link>
        </li>
        <li>
          <Link href="/jetstream">JetStream</Link>
        </li>
        <li>
          <Link href="/accounts">Accounts</Link>
        </li>
        <li>
          <Link href="/routes">Routes</Link>
        </li>
      </ul>
    </nav>
  );
}

function Link(props: AnchorProps) {
  return (
    <A activeClass="text-cyan-600 dark:text-cyan-400" end={true} {...props} />
  );
}
