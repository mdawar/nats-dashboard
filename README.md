# NATS Web Dashboard

A web dashboard to display live [NATS server](https://nats.io/) monitoring metrics.

## About

This is a **static web app** that was inspired by [nats-top](https://github.com/nats-io/nats-top), it fetches and displays the monitoring stats of a [NATS server](https://nats.io/) but in the browser instead of the CLI.

Since this is a static web app, it **can be deployed anywhere** and can also **run locally** on your machine.

This is also a **PWA** (Progressive Web App) so it's installable and usable offline, but of course you need access to the NATS server, for example you can monitor a local NATS server while being offline.

There's **no backend** involved, the requests are made directly from the browser, so you can monitor a **local NATS server** (http://localhost:8222) even when the app is not running locally.

There's **no data retention**, so no historical stats can be displayed, you will only be able to view the live server stats, if you need this feature you should use a Prometheus exporter with Grafana and set an appropriate data retention policy.

## Development

#### Requirements

- **Node**: Version defined in `.nvmrc` file (If you have `nvm` installed, run `nvm use`)
- **Docker** + **Compose Plugin** (Optional): Used for running a local NATS server and the app preview

Install the required packages:

```sh
npm i
```

#### Run the web app in dev mode

```sh
npm start
```

#### Run a local NATS server

```sh
# Start a local NATS server using Docker compose
make server
# Remove containers and volumes
make clean
```

#### Run the tests

There are a few tests for a couple of functions for now, more tests will be added later.

```sh
npm test
# Run the tests and watch for changes
npm run test:watch
```

## Build the App

#### Build the Web App

```sh
# Build a static web app to ./dist
npm run build
```

To build a sitemap and to have proper URL meta tags, the `SITE_DOMAIN` environment variable must be set.

```sh
# The SITE_DOMAIN env variable sets the Astro.site config.
SITE_DOMAIN=https://example.com npm run build
```

#### Build Docker Image

Build using Docker compose:

```sh
make build
# Or
docker compose build
```

The `SITE_DOMAIN` environment variable will be passed as a build argument if set.

Or using the Docker CLI:

```sh
docker build -t nats-dashboard .
# The site domain can be passed as a build arg.
docker build -t nats-dashboard --build-arg SITE_DOMAIN=https://example.com .
```

## Build and Preview

Build the Docker image and run the server on http://localhost:8000 with a NATS server running on port `4222`.

This is useful for testing **SSG** and the **PWA** config (eg: service worker).

```sh
make preview
# Or
docker compose build && docker compose up
```

The `SITE_DOMAIN` environment variable will be passed as a build argument if set.

Cleanup:

```sh
# Remove containers and volumes
make clean
# Or
docker compose down -v
```

## Data Fetching

By default the data is fetched using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) since NATS server started supporting [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) in [v2.9.22](https://github.com/nats-io/nats-server/releases/tag/v2.9.22).

For NATS servers `< v2.9.22` there's an option to use [JSONP](https://en.wikipedia.org/wiki/JSONP) requests that fetch the data by injecting a `<script>` tag that executes and calls a JavaScript function that receives the data.

This option must be explicitly enabled in the app settings.

## Service Worker

The service worker is generated after the site is built, it's available at `src/sw.ts`, it's built by `vite` using the script `scripts/build-sw.mjs` and then the [Workbox](https://developer.chrome.com/docs/workbox/) precache manifest is injected by the `scripts/workbox.mjs` script.

The service worker is registered only in production mode by the script `src/register-sw.ts` that's imported by the base layout at `src/layouts/Base.astro`.

To test locally, use `make preview` to build the Docker container and run a Caddy server similar to a production environment.

#### Generate the Service Worker

```sh
# This is automatically run after the build script.
npm run generateSW
```

## Alternatives

- [nats-top](https://github.com/nats-io/nats-top): A top-like tool for monitoring NATS servers.
- [prometheus-nats-exporter](https://github.com/nats-io/prometheus-nats-exporter): A Prometheus exporter for NATS metrics.
- [nats-surveyor](https://github.com/nats-io/nats-surveyor): Another Prometheus exporter.

## Credits

- [Astro](https://astro.build/): Web Framework
- [Solid](https://www.solidjs.com/): UI Framework
- [TanStack Query](https://tanstack.com/query/latest): Asynchronous state management
- [Tailwind UI](https://tailwindui.com/): Tailwind CSS components
- [Heroicons](https://heroicons.com/): SVG Icons
- [CNCF Artwork](https://github.com/cncf/artwork): NATS logo
- [Workbox](https://developer.chrome.com/docs/workbox/): Service worker libraries and tooling
