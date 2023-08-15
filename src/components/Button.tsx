import { splitProps, type ComponentProps } from 'solid-js';

export default function Button(props: ComponentProps<'button'>) {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <button
      type="button"
      class="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
      classList={{
        [local.class!]: !!local.class,
      }}
      {...rest}
    />
  );
}
