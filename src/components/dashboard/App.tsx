import { Router, Routes, Route } from '@solidjs/router';

import Provider from '~/components/dashboard/Provider';
import Notifications from '~/components/Notifications';
import InputHeader from '~/components/dashboard/InputHeader';
import Navigation from '~/components/dashboard/Navigation';
import Overview from '~/components/dashboard/pages/Overview';
import Info from '~/components/dashboard/pages/Info';
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
    <Provider>
      <Notifications />

      <Router url={props.url}>
        <InputHeader />

        <main>
          <Navigation />

          <Routes>
            <Route path="/" component={Overview} />
            <Route path="/info" component={Info} />
            <Route path="/connections" component={Connections} />
            <Route path="/jetstream" component={JetStream} />
          </Routes>
        </main>
      </Router>
    </Provider>
  );
}
