import type { ConnState, ConnzSortOpt, SubsOption } from '~/types';
import type { Options } from '~/components/Dropdown';

/** Connz sorting options. */
export function sortOptions(state: ConnState): Options<ConnzSortOpt> {
  return [
    { value: 'cid', label: 'CID' },
    { value: 'rtt', label: 'RTT' },
    { value: 'uptime', label: 'Uptime' },
    { value: 'last', label: 'Last Activity' },
    { value: 'idle', label: 'Idle Time' },
    { value: 'subs', label: 'Subscriptions' },
    { value: 'msgs_from', label: 'Msgs. Sent' },
    { value: 'msgs_to', label: 'Msgs. Received' },
    { value: 'bytes_from', label: 'Data Size Sent' },
    { value: 'bytes_to', label: 'Data Size Received' },
    { value: 'pending', label: 'Pending Data' },
    { value: 'start', label: 'Connection Start' },
    // Only valid for closed connections.
    { value: 'stop', label: 'Connection Stop', disabled: state !== 'closed' },
    { value: 'reason', label: 'Close Reason', disabled: state !== 'closed' },
  ];
}

/** Sorting options valid only for closed connections. */
export const closedConnSortOpts: readonly ConnzSortOpt[] = ['stop', 'reason'];

/** Connz return results limit options. */
export const limitOptions: Options<number> = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
  { value: 250, label: '250' },
  { value: 500, label: '500' },
  { value: 1000, label: '1000' },
];

/** Connz connection state options. */
export const stateOptions: Options<ConnState> = [
  { value: 'open', label: 'Open' },
  { value: 'closed', label: 'Closed' },
  { value: 'any', label: 'Any' },
];

/** Connz subscriptions options. */
export const subsOptions: Options<SubsOption> = [
  { value: false, label: 'No Subscriptions' },
  { value: true, label: 'Include Subscriptions' },
  { value: 'detail', label: 'Detailed Subscriptions' },
];
