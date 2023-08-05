/** JSONP fetch request options. */
export interface JSONPOptions {
  // JSONP callback name.
  callback?: string;
  // Timeout in milliseconds.
  timeout?: number;
}

/**
 * JSONP fetch request.
 *
 * The promise will resolve with the response or reject with a `FetchError` or a `TimeoutError`.
 */
export async function jsonp<T>(url: string, opts?: JSONPOptions): Promise<T> {
  return new Promise((resolve, reject) => {
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
      delete window[callback as any];
    };

    // Script loading errors.
    script.onerror = () => {
      reject(new FetchError(jsonpURL.href));
      cleanup();
    };

    // JSONP callback.
    (window as any)[callback] = (response: any) => {
      resolve(response);
      cleanup();
    };

    // The callback is not guaranteed to be called even if the script
    // was loaded successfully so we need to timeout in these cases.
    // e.g. wrong URL, wrong content type, script execution error.
    timeoutID = setTimeout(() => {
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

/** Add query parameters to a URL object (Preserves the existing query params). */
function addQueryParams(url: URL, params: Record<string, string>): URL {
  const newParams = new URLSearchParams([
    ...Array.from(url.searchParams.entries()),
    ...Object.entries(params),
  ]).toString();

  return new URL(`${url.origin}${url.pathname}?${newParams}`);
}
