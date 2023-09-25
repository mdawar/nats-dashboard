import { addQueryParams } from '~/lib/utils';

/** JSONP fetch request options. */
export interface JSONPOptions {
  /** JSONP callback name. */
  callback?: string;
  /** Timeout in milliseconds */
  timeout?: number;
  /** Abort signal. */
  signal?: AbortSignal | undefined | null;
}

/**
 * JSONP fetch request.
 *
 * The promise will resolve with the response or reject with a `FetchError` or a `TimeoutError`.
 */
export async function jsonp<T>(url: string, opts?: JSONPOptions): Promise<T> {
  return new Promise((resolve, reject) => {
    // Already aborted.
    if (opts?.signal?.aborted) {
      reject(opts.signal.reason);
      return;
    }

    const timeout = opts?.timeout ?? 5000; // 5s
    const name = opts?.callback ?? 'callback';

    let timeoutID: number;
    const callback = `cb${randomID()}`; // JSONP callback function name.
    const jsonpURL = addQueryParams(new URL(url), { [name]: callback });

    // Script to be inserted into the page.
    const script = document.createElement('script');
    script.src = jsonpURL.href;

    const cleanup = () => {
      clearTimeout(timeoutID);
      script.remove();
      // Removing the callback function may cause a `ReferenceError`
      // if for example the script finishes loading after a timeout
      // which is OK in this case.
      delete window[callback as any];
    };

    // Aborted.
    opts?.signal?.addEventListener('abort', () => {
      reject(opts.signal?.reason);
      cleanup();
    });

    // Script loading errors.
    script.onerror = () => {
      reject(new FetchError(jsonpURL.href));
      cleanup();
    };

    // JSONP callback.
    (window as any)[callback] = (response: T) => {
      resolve(response);
      cleanup();
    };

    // The callback is not guaranteed to be called even if the script
    // was loaded successfully so we need to timeout in these cases.
    // e.g. wrong URL, wrong content type, script execution error.
    timeoutID = window.setTimeout(() => {
      reject(new TimeoutError(jsonpURL.href));
      cleanup();
    }, timeout);

    document.head.appendChild(script);
  });
}

/** JSONP fetch error (Script loading error). */
export class FetchError extends Error {
  constructor(url: string) {
    super(`Cannot fetch from: ${url}`);
    this.name = 'FetchError';
  }
}

/** JSONP timeout error (Script execution error). */
export class TimeoutError extends Error {
  constructor(url: string) {
    super(`Fetch timed out for: ${url}`);
    this.name = 'TimeoutError';
  }
}

/** Generate a random ID. */
function randomID(): string {
  return `${Date.now().toString()}_${Math.floor(
    Math.random() * 1_000_000_000
  )}`;
}
