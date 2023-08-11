import { Router, Routes, Route } from '@solidjs/router';

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

export default function App(props: AppProps) {
  return (
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
  );
}
