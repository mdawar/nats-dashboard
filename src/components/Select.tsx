import { For } from 'solid-js';
import type { Option, OptionType } from '~/components/Dropdown';

interface Props<T> {
  options: Option<T>[];
  value: T;
  onChange(value: T): void;
}

/** Get the option value from the label. */
function valueFromLabel<T>(options: Option<T>[], label: string): T {
  const opt = options.find((option) => option.label === label);
  return opt?.value!;
}

export default function Select<T extends OptionType>(props: Props<T>) {
  return (
    <select
      class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 dark:bg-white/5 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-white/10 focus:ring-2 focus:ring-sky-600 dark:focus:ring-inset dark:focus:ring-sky-500 sm:text-sm sm:leading-6 [&_*]:text-black"
      // Preserve the option's value type by returning the value that was passed instead of the target value which is always string.
      onChange={(e) =>
        props.onChange(valueFromLabel(props.options, e.target.value))
      }
    >
      <For each={props.options}>
        {({ value, label, disabled = false }) => (
          // Both the option's `value` and `label` will default to the text content.
          <option selected={value === props.value} disabled={disabled}>
            {label}
          </option>
        )}
      </For>
    </select>
  );
}
