import { type ParentProps } from 'solid-js';
import { Router, Route } from '@solidjs/router';

import Providers from '~/components/dashboard/Providers';
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
    <Providers>
      <Notifications />

      <Router root={Root} url={props.url} explicitLinks={true}>
        <Route path="/" component={Overview} />
        <Route path="/info" component={Info} />
        <Route path="/connections" component={Connections} />
        <Route path="/jetstream" component={JetStream} />
      </Router>
    </Providers>
  );
}

function Root(props: ParentProps) {
  return (
    <>
      <InputHeader />
      <main>
        <Navigation />
        {props.children}
      </main>
    </>
  );
}
