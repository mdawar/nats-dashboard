import { mergeProps, splitProps, Show, type ComponentProps } from 'solid-js';
import { LoadingIcon } from '~/components/icons';

const buttonColors = {
  primary:
    'bg-sky-600 hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:bg-sky-500 dark:hover:bg-sky-400 dark:focus-visible:outline-sky-500',
  secondary:
    'bg-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:hover:bg-white/20 dark:ring-0',
} as const;

type ButtonColor = keyof typeof buttonColors;

const buttonText = {
  primary: 'text-white',
  secondary: 'text-gray-900 dark:text-white',
} as const;

const buttonSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-sm',
  xl: 'text-sm',
} as const;

type ButtonSize = keyof typeof buttonSizes;

const borderRadius = {
  xs: 'rounded',
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-md',
  xl: 'rounded-md',
} as const;

const buttonPadding = {
  xs: 'px-2 py-1 gap-2',
  sm: 'px-2 py-1 gap-2',
  md: 'px-2.5 py-1.5 gap-2.5',
  lg: 'px-3 py-2 gap-3',
  xl: 'px-3.5 py-2.5 gap-3.5',
} as const;

const iconPadding = {
  xs: 'p-1',
  sm: 'p-1',
  md: 'p-1.5',
  lg: 'p-2',
  xl: 'p-2.5',
} as const;

const roundedPadding = {
  xs: 'px-2.5 py-1',
  sm: 'px-2.5 py-1',
  md: 'px-3 py-1.5',
  lg: 'px-3.5 py-2',
  xl: 'px-4 py-2.5',
} as const;

interface Props extends ComponentProps<'button'> {
  /** Button color (Default: primary). */
  color?: ButtonColor;
  /** Button size (Default: lg). */
  size?: ButtonSize;
  /** Rounded button style (Default: false). */
  rounded?: boolean;
  /** Button containing only an icon (Default: false). */
  icon?: boolean;
  /** Display a loading icon. */
  isLoading?: boolean;
}

export default function Button(props: Props) {
  const defaults: Partial<Props> = {
    color: 'primary',
    size: 'lg',
    rounded: false,
    icon: false,
    isLoading: false,
  };

  const [local, rest] = splitProps(mergeProps(defaults, props), [
    'children',
    'class',
    'color',
    'size',
    'rounded',
    'icon',
    'isLoading',
  ]);

  return (
    <button
      type="button"
      class="inline-flex items-center justify-center font-semibold shadow-sm relative"
      classList={{
        [local.class!]: !!local.class,
        // Color.
        [buttonColors[local.color!]]: true,
        // Text color.
        [buttonText[local.color!]]: !local.isLoading,
        // Loading state.
        'text-transparent pointer-events-none': local.isLoading,
        // Size.
        [buttonSizes[local.size!]]: true,
        // Regular button padding.
        [buttonPadding[local.size!]]: !local.icon,
        // Icon button padding.
        [iconPadding[local.size!]]: local.icon,
        // Regular border radius.
        [borderRadius[local.size!]]: !local.rounded,
        // Rounded buttons.
        'rounded-full': local.rounded,
        // Rounded buttons have slightly more x padding.
        [roundedPadding[local.size!]]: local.rounded && !local.icon,
      }}
      {...rest}
    >
      <Show when={local.isLoading}>
        <LoadingIcon class="absolute w-4 h-4 text-gray-900 dark:text-white" />
      </Show>
      {local.children}
    </button>
  );
}
