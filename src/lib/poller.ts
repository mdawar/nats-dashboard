export interface PollerOptions<T> {
  /** Function to call on each poll request. */
  fn: () => Promise<T>;
  /** Polling interval. */
  interval?: number;
  /** Success handler. */
  onSuccess: (result: T) => void;
  /** Error handler. */
  onError: (error: unknown) => void;
}

/** Create a poller that keeps calling a function in a defined interval. */
export function createPoller<T>({
  fn,
  interval = 1000,
  onSuccess,
  onError,
}: PollerOptions<T>) {
  let isStopped = true;
  let timeoutID: number;

  const poll = async () => {
    try {
      onSuccess(await fn());
    } catch (error: unknown) {
      onError(error);
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
