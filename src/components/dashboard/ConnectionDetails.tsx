import { createMemo, For, Index, Show, type JSX } from 'solid-js';

import type { ClientConnection, FormattedSubDetail } from '~/lib/format';
import Indicator from '~/components/Indicator';
import Badge from '~/components/Badge';

interface Props {
  connection: ClientConnection;
}

export default function ConnectionDetails(props: Props) {
  return (
    <div class="space-y-6">
      <InfoList
        info={{
          CID: props.connection.cid,
          Name: props.connection.name,
          State: <ConnState connection={props.connection} />,
          Started: props.connection.info.start,
          Stopped: props.connection.info.stop,
          Reason: props.connection.reason,
          Uptime: props.connection.info.uptime,
          'Last Activity': props.connection.info.lastActivity,
          RTT: props.connection.info.rtt,
          Account: props.connection.account,
          'Authorized User': props.connection.authorized_user,
        }}
      />

      <DataList
        title="Information"
        data={{
          'IP Address': props.connection.ip,
          'Port Number': props.connection.port,
          'Language and Version': `${props.connection.lang ?? 'unknown'} ${
            props.connection.version ?? ''
          }`.trim(),
          Subscriptions: props.connection.subscriptions,
        }}
      />

      <Show when={props.connection.info.subscriptionsList}>
        <SubsList
          title="Subscriptions List"
          subs={props.connection.info.subscriptionsList!}
        />
      </Show>

      <Show when={props.connection.info.subscriptionsListDetails}>
        <SubsListDetails
          title="Subscriptions List Details"
          subs={props.connection.info.subscriptionsListDetails!}
        />
      </Show>

      <DataList
        title="Messages"
        data={{
          Sent: props.connection.info.inMsgs.str,
          Received: props.connection.info.outMsgs.str,
        }}
      />

      <Show when={props.connection.info.isOpen}>
        <DataList
          title="Message Rates"
          data={{
            Sent: `${props.connection.info.inMsgsRate.str}/s`,
            Received: `${props.connection.info.outMsgsRate.str}/s`,
          }}
        />
      </Show>

      <DataList
        title="Data"
        data={{
          Sent: props.connection.info.inBytes.str,
          Received: props.connection.info.outBytes.str,
          Pending: props.connection.info.pending.str,
        }}
      />

      <Show when={props.connection.info.isOpen}>
        <DataList
          title="Data Rates"
          data={{
            Sent: `${props.connection.info.inBytesRate.str}/s`,
            Received: `${props.connection.info.outBytesRate.str}/s`,
          }}
        />
      </Show>
    </div>
  );
}

interface InfoListProps {
  info: Record<string, JSX.Element | undefined>;
}

function InfoList(props: InfoListProps) {
  const info = createMemo(() => Object.entries(props.info));

  return (
    <div>
      <dl class="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200 dark:sm:divide-white/10">
        <For each={info()}>
          {([key, value]) => (
            <Show when={value}>
              <div class="sm:flex sm:py-5">
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 sm:w-40 sm:flex-shrink-0 lg:w-48">
                  {key}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2 sm:ml-6 sm:mt-0 break-all">
                  {value}
                </dd>
              </div>
            </Show>
          )}
        </For>
      </dl>
    </div>
  );
}

interface DataListProps {
  title: string;
  data: Record<string, number | string | undefined>;
}

function DataList(props: DataListProps) {
  const data = createMemo(() => Object.entries(props.data));

  return (
    <div>
      <h3 class="font-medium text-gray-900 dark:text-white">{props.title}</h3>
      <dl class="mt-2 divide-y divide-gray-200 dark:divide-white/10 border-b border-t border-gray-200 dark:border-white/10">
        <For each={data()}>
          {([key, value]) => (
            <div class="flex justify-between py-3 text-sm font-medium">
              <dt class="text-gray-500 dark:text-gray-400">{key}</dt>
              <dd class="text-gray-900 dark:text-white">{value}</dd>
            </div>
          )}
        </For>
      </dl>
    </div>
  );
}

interface SubsListProps {
  title: string;
  subs: string[];
}

function SubsList(props: SubsListProps) {
  return (
    <div>
      <h3 class="font-medium text-gray-900 dark:text-white">{props.title}</h3>
      <div class="mt-2 divide-y divide-gray-200 dark:divide-white/10 border-b border-t border-gray-200 dark:border-white/10">
        <Index each={props.subs}>
          {(subject) => (
            <p class="py-3 text-sm font-medium text-gray-500 dark:text-gray-400 break-all">
              {subject()}
            </p>
          )}
        </Index>
      </div>
    </div>
  );
}

interface SubsListDetailProps {
  title: string;
  subs: FormattedSubDetail[];
}

function SubsListDetails(props: SubsListDetailProps) {
  return (
    <div>
      <h3 class="font-medium text-gray-900 dark:text-white">{props.title}</h3>
      <dl class="mt-2 divide-y divide-gray-200 dark:divide-white/10 border-b border-t border-gray-200 dark:border-white/10">
        <For each={props.subs}>
          {(sub) => (
            <div class="py-3 text-sm font-medium space-y-3">
              <dt class="text-gray-500 dark:text-gray-400 break-all">
                {sub.subject}
              </dt>
              <dd class="flex flex-col sm:flex-row flex-wrap gap-2">
                <Badge class="flex justify-between gap-1">
                  <strong>SID</strong>
                  {sub.sid}
                </Badge>
                <Badge
                  class="flex justify-between gap-1"
                  color={sub.msgs.num > 0 ? 'green' : 'gray'}
                >
                  <strong>Msgs.</strong>
                  {sub.msgs.str}
                </Badge>
                <Show when={sub.max}>
                  <Badge class="flex justify-between gap-1">
                    <strong>Max</strong>
                    {sub.max}
                  </Badge>
                </Show>
                <Show when={sub.qgroup}>
                  <Badge class="flex justify-between gap-1">
                    <strong>Queue</strong>
                    {sub.qgroup}
                  </Badge>
                </Show>
                <Show when={sub.account}>
                  <Badge class="flex justify-between gap-1" color="blue">
                    <strong>Account</strong>
                    {sub.account}
                  </Badge>
                </Show>
              </dd>
            </div>
          )}
        </For>
      </dl>
    </div>
  );
}

function ConnState(props: Props) {
  return (
    <div class="flex items-center gap-2">
      <Indicator
        color={
          props.connection.info.isOpen
            ? props.connection.info.isActive
              ? 'green'
              : 'gray'
            : 'red'
        }
      />
      {props.connection.info.isOpen ? 'Open' : 'Closed'}
    </div>
  );
}
