import { createSignal } from 'solid-js';
import { useDisplayMobileMenu } from '~/lib/state';

export default function InputHeader() {
  const [serverURL, setServerURL] = createSignal('');
  const [_, setDisplay] = useDisplayMobileMenu();

  const onSubmit = (e: Event) => {
    e.preventDefault();
    console.log(serverURL());
  };

  return (
    <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white dark:border-white/5 dark:bg-gray-900 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        class="-m-2.5 p-2.5 text-gray-700 dark:text-white lg:hidden"
        onClick={() => setDisplay(true)}
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          ></path>
        </svg>
      </button>

      {/* Separator */}
      <div
        class="h-6 w-px bg-gray-200 dark:bg-gray-600 lg:hidden"
        aria-hidden="true"
      ></div>

      <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form class="relative flex flex-1" onSubmit={onSubmit}>
          <label for="nats-url" class="sr-only">
            Server URL
          </label>
          <svg
            class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 dark:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z"
            />
          </svg>
          <input
            id="nats-url"
            class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500 focus:ring-0 sm:text-sm"
            placeholder="Server URL"
            type="url"
            spellcheck={false}
            list="url-list"
            value={serverURL()}
            onInput={(e) => {
              setServerURL(e.target.value);
            }}
          />
          <datalist id="url-list">
            <option value="http://localhost:8222" />
            <option value="https://localhost:8222" />
            <option value="https://demo.nats.io:8222" />
          </datalist>
        </form>

        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            class="rounded-full bg-cyan-600 p-1 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            onClick={onSubmit}
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
