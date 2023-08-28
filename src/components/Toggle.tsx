interface Props {
  checked: boolean;
  onChange(checked: boolean): void;
}

export default function Toggle(props: Props) {
  return (
    <button
      type="button"
      role="switch"
      class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
      classList={{
        'bg-gray-200 dark:bg-gray-700': !props.checked,
        'bg-sky-600': props.checked,
      }}
      aria-checked={props.checked}
      onClick={() => props.onChange(!props.checked)}
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-gray-50 shadow ring-0 transition duration-200 ease-in-out"
        classList={{
          'translate-x-0': !props.checked,
          'translate-x-5': props.checked,
        }}
      ></span>
    </button>
  );
}
