import {
  createContext,
  useContext,
  createResource,
  type ParentProps,
  type InitializedResource,
} from 'solid-js';

export interface Server {
  /** Server display name (Optional). */
  name?: string;
  /** NATS monitoring server URL. */
  url: string;
}

export interface Config {
  /** Default NATS server. */
  server?: Server;
  /** Default NATS servers list. */
  servers: Server[];
  /**
   * Hide the server URL input.
   *
   * Disables the query params.
   * Useful for instances monitoring a single NATS server.
   */
  hideServerInput: boolean;
}

const defaultConfig = {
  hideServerInput: false,
  servers: [
    {
      name: 'localhost',
      url: 'http://localhost:8222',
    },
  ],
};

interface InitialConfigContext {
  state: 'refreshing';
  loading: true;
  error: undefined;
  latest: Config;
  (): Config;
}

const defaultResource: InitialConfigContext = () => defaultConfig;
defaultResource.state = 'refreshing';
defaultResource.loading = true;
defaultResource.error = undefined;
defaultResource.latest = defaultConfig;

const ConfigContext =
  createContext<InitializedResource<Config>>(defaultResource);

async function fetchConfig() {
  const response = await fetch('/config.json');
  const config: Config = await response.json();
  return { ...defaultConfig, ...config };
}

export function ConfigProvider(props: ParentProps) {
  const [config] = createResource(fetchConfig, { initialValue: defaultConfig });

  return (
    <ConfigContext.Provider value={config}>
      {props.children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}
