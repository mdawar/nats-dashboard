export interface PollerOptions<T> {
  /** Polling interval. */
  interval?: number;
  /** Success handler. */
  onSuccess?: (result: T) => void;
  /** Error handler. */
  onError?: (error: unknown) => void;
}

/** Create a poller that keeps calling a function in a defined interval. */
export function createPoller<T>(
  fn: () => Promise<T>,
  { interval, onSuccess, onError }: PollerOptions<T> = { interval: 1000 }
) {
  let isStopped = true;
  let timeoutID: number;

  const poll = async () => {
    try {
      const result = await fn();
      onSuccess?.(result);
    } catch (error: unknown) {
      onError?.(error);
    } finally {
      if (!isStopped) {
        // Schedule next call.
        timeoutID = setTimeout(poll, interval);
      }
    }
  };

  return {
    start() {
      isStopped = false;
      poll();
    },
    stop() {
      isStopped = true;
      clearTimeout(timeoutID);
    },
  };
}
