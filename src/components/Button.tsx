import { mergeProps, splitProps, type ComponentProps } from 'solid-js';

const buttonColors = {
  primary:
    'bg-sky-600 text-white hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600',
  secondary:
    'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
} as const;

type ButtonColor = keyof typeof buttonColors;

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
  xs: 'px-2 py-1',
  sm: 'px-2 py-1',
  md: 'px-2.5 py-1.5',
  lg: 'px-3 py-2',
  xl: 'px-3.5 py-2.5',
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
}

export default function Button(props: Props) {
  const defaults: Partial<Props> = {
    color: 'primary',
    size: 'lg',
    rounded: false,
    icon: false,
  };
  const [local, rest] = splitProps(mergeProps(defaults, props), [
    'class',
    'color',
    'size',
    'rounded',
    'icon',
  ]);

  return (
    <button
      type="button"
      class="inline-flex items-center justify-center font-semibold shadow-sm"
      classList={{
        [local.class!]: !!local.class,
        // Color.
        [buttonColors[local.color!]]: true,
        // Size.
        [buttonSizes[local.size!]]: true,
        // Regular button padding.
        [buttonPadding[local.size!]]: !local.icon,
        // Icon button padding.
        'p-1': local.icon,
        // Regular border radius.
        [borderRadius[local.size!]]: !local.rounded,
        // Rounded buttons.
        'rounded-full': local.rounded,
        // Rounded buttons have slightly more x padding.
        [roundedPadding[local.size!]]: local.rounded && !local.icon,
      }}
      {...rest}
    />
  );
}
