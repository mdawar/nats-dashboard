import {
  QueryClient,
  QueryCache,
  QueryClientProvider,
} from '@tanstack/solid-query';
import { Router, Routes, Route } from '@solidjs/router';

import { FetchError, TimeoutError } from '~/lib/jsonp';
import InputHeader from '~/components/dashboard/InputHeader';
import Navigation from '~/components/dashboard/Navigation';
import Overview from '~/components/dashboard/pages/Overview';
import Connections from '~/components/dashboard/pages/Connections';
import JetStream from '~/components/dashboard/pages/JetStream';

interface AppProps {
  /**
   * Router url prop.
   *
   * The URL must be passed to the router for SSG.
   */
  url: string;
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError(error, query) {
      // TODO: use toast to display error
      if (error instanceof FetchError) {
        console.log('Fetch error:', error);
      } else if (error instanceof TimeoutError) {
        console.log('Timeout error:', error);
      } else {
        console.log('Other error:', error);
      }

      console.log('fetchFailureCount', query.state.fetchFailureCount);
    },
  }),
});

export default function App(props: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <InputHeader />

        <main>
          <Router url={props.url}>
            <Navigation />

            <Routes>
              <Route path="/" component={Overview} />
              <Route path="/connections" component={Connections} />
              <Route path="/jetstream" component={JetStream} />
            </Routes>
          </Router>
        </main>
      </div>
    </QueryClientProvider>
  );
}
