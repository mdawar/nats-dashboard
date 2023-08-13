import {
  mergeProps,
  splitProps,
  type ComponentProps,
  type ParentProps,
} from 'solid-js';

export interface BagdeProps extends ComponentProps<'span'> {
  color?: BadgeColor;
  type?: 'regular' | 'pill';
  border?: boolean;
  class?: string;
}

export type BadgeColor = keyof typeof badgeColors;

// Using the same bg color for the dark variant with and without a border.
const badgeColors = {
  gray: 'text-gray-600 dark:text-gray-400 dark:bg-gray-400/10',
  red: 'text-red-700 dark:text-red-400 dark:bg-gray-400/10',
  yellow: 'text-yellow-800 dark:text-yellow-500 dark:bg-gray-400/10',
  green: 'text-green-700 dark:text-green-400 dark:bg-gray-400/10',
  blue: 'text-blue-700 dark:text-blue-400 dark:bg-gray-400/10',
  indigo: 'text-indigo-700 dark:text-indigo-400 dark:bg-gray-400/10',
  purple: 'text-purple-700 dark:text-purple-400 dark:bg-gray-400/10',
  pink: 'text-pink-700 dark:text-pink-400 dark:bg-gray-400/10',
} as const;

const bgLightColors = {
  gray: 'bg-gray-50',
  red: 'bg-red-50',
  yellow: 'bg-yellow-50',
  green: 'bg-green-50',
  blue: 'bg-blue-50',
  indigo: 'bg-indigo-50',
  purple: 'bg-purple-50',
  pink: 'bg-pink-50',
} as const;

const bgDarkerColors = {
  gray: 'bg-gray-100',
  red: 'bg-red-100',
  yellow: 'bg-yellow-100',
  green: 'bg-green-100',
  blue: 'bg-blue-100',
  indigo: 'bg-indigo-100',
  purple: 'bg-purple-100',
  pink: 'bg-pink-100',
} as const;

const badgeBorders = {
  gray: 'ring-gray-500/10 dark:ring-gray-400/20',
  red: 'ring-red-600/10 dark:ring-red-400/20',
  yellow: 'ring-yellow-600/20 dark:ring-yellow-400/20',
  green: 'ring-green-600/20 dark:ring-green-500/20',
  blue: 'ring-blue-700/10 dark:ring-blue-400/30',
  indigo: 'ring-indigo-700/10 dark:ring-indigo-400/30',
  purple: 'ring-purple-700/10 dark:ring-purple-400/30',
  pink: 'ring-pink-700/10 dark:ring-pink-400/20',
} as const;

export default function Badge(props: ParentProps<BagdeProps>) {
  const defaults: BagdeProps = { color: 'gray', type: 'regular', border: true };
  const [local, rest] = splitProps(mergeProps(defaults, props), [
    'class',
    'color',
    'type',
    'border',
  ]);

  return (
    <span
      class="inline-flex items-center px-2 py-1 text-xs font-medium"
      classList={{
        // Class set by the parent.
        [local.class!]: !!local.class,
        // Shared badge colors.
        [badgeColors[local.color!]]: !!local.color,
        // Use a lighter bg color with the border.
        [bgLightColors[local.color!]]: local.border,
        // Use a slightly darker bg color without the border.
        [bgDarkerColors[local.color!]]: !local.border,
        // Border.
        'ring-1 ring-inset': local.border,
        [badgeBorders[local.color!]]: local.border,
        // Badge type.
        'rounded-md': local.type === 'regular',
        'rounded-full': local.type === 'pill',
      }}
      {...rest}
    />
  );
}
