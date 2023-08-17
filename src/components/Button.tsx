import { mergeProps, splitProps, type ComponentProps } from 'solid-js';

interface Props extends ComponentProps<'button'> {
  compact?: boolean;
}

export default function Button(props: Props) {
  const defaults: Partial<Props> = { compact: false };
  const [local, rest] = splitProps(mergeProps(defaults, props), [
    'class',
    'compact',
  ]);

  return (
    <button
      type="button"
      class="inline-flex items-center rounded-md bg-cyan-600 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
      classList={{
        [local.class!]: !!local.class,
        'px-3 py-2': !local.compact,
      }}
      {...rest}
    />
  );
}
