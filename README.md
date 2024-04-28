# NATS Web Dashboard

A web dashboard to display live [NATS server](https://nats.io) monitoring metrics.

[Live demo](https://natsdashboard.com/?url=https%3A%2F%2Fdemo.nats.io%3A8222) monitoring the demo NATS server at https://demo.nats.io:8222.

## About

This is a **static web app** that was inspired by [nats-top](https://github.com/nats-io/nats-top), it fetches and displays the monitoring stats of a [NATS server](https://nats.io) but in the browser instead of the CLI.

Since this is a static web app, it **can be deployed anywhere** and can also **run locally** on your machine.

This is also a **PWA** (Progressive Web App) so it's installable and usable offline, but of course you need access to the NATS server, for example you can monitor a local NATS server while being offline.

There's **no backend** involved, the requests are made directly from the browser, so you can monitor a **local NATS server** (http://localhost:8222) even when the app is not running locally.

There's **no data retention**, so no historical stats can be displayed, you will only be able to view the live server stats, if you need this feature you should use a Prometheus exporter with Grafana and set an appropriate data retention policy.

## Using the App

#### PWA

The app is deployed on [Cloudflare Pages](https://pages.cloudflare.com) at:

https://natsdashboard.com

The app can be installed on your device for offline use (Desktop or mobile).

#### Docker Image

```sh
docker run --rm -it -p 8000:80 mdawar/nats-dashboard
```

The image uses [Caddy server](https://caddyserver.com) and exposes port `80`.

In the example above we map the image port `80` to port `8000` on `localhost`.

**Note**: You can use a custom server configuration (`Caddyfile`) and mount it at `/etc/caddy/Caddyfile`.

#### Build Files

The build files are available on the releases page in a `build.zip` file.

You can serve the app locally using any HTTP server.

Serving using Python's HTTP server:

```sh
cd ./dist && python -m http.server
```

Serving using Caddy server:

```sh
docker run --rm -it -p 8000:80 -v ./dist:/usr/share/caddy caddy
```

## Configuration

The app uses a runtime JSON config file served at `/config.json`.

You can run the Docker image and mount the `config.json` file at `/srv/config.json`.

#### Configuration Options

| Name              | Type       | Description                                 |
| ----------------- | ---------- | ------------------------------------------- |
| `server`          | `Server`   | Default NATS server to monitor.             |
| `servers`         | `Server[]` | List of NATS servers to suggest in the app. |
| `hideServerInput` | `boolean`  | Hide the server URL input.                  |

The `Server` type definition:

```ts
interface Server {
  /** Server display name (Optional). */
  name?: string;
  /** Server URL. */
  url: string;
}
```

#### Example Config File

```json
{
  "server": {
    "name": "My NATS Server",
    "url": "http://nats:8222"
  },
  "servers": [
    {
      "name": "localhost",
      "url": "http://localhost:8222"
    },
    {
      "name": "demo.nats.io",
      "url": "https://demo.nats.io:8222"
    }
  ],
  "hideServerInput": false
}
```

#### Single Server Config Example

This configuration is suitable for monitoring a single NATS server.

```json
{
  "server": {
    "name": "My NATS Server",
    "url": "http://nats:8222"
  },
  "hideServerInput": true
}
```

## Internal NATS Servers

The app can monitor NATS servers accessible to the user only, so any NATS servers accessible on your network can be monitored.

To monitor NATS servers on a private network, you can run your own instance of the app using the Docker image and configure a reverse proxy to the NATS monitoring server.

Example Docker compose configuration:

```yml
services:
  # Internal NATS server.
  server:
    image: nats:2.10
    command: -n internal-server -m 8222 -js

  # NATS dashboard instance running on the same private network.
  dashboard:
    image: mdawar/nats-dashboard
    environment:
      # The NATS monitoring server will be proxied on /proxy/* on the frontend.
      # See: config/Caddyfile for the reverse proxy configuration.
      REVERSE_PROXY_UPSTREAM: 'server:8222'
    volumes:
      # Optional config file.
      - ./config.json:/srv/config.json
    ports:
      - target: 80
        published: 8000
        protocol: tcp
```

Now when using the app you can monitor this private NATS server using the path `/proxy/` on the same domain.

This is an example `config.json` file to set the default URL and disable the URL input:

```json
{
  "server": {
    "name": "Internal Server",
    "url": "https://natsdashboard.example.com/proxy/"
  },
  "hideServerInput": true
}
```

Replace the server `url` with the actual NATS dashboard URL.

**Warning**: Your NATS monitoring server will be exposed to the public, you will have to make sure that you secure your NATS dashboard instance.

## Limitations

#### Mixed Content

> An HTTPS page that includes content fetched using cleartext HTTP is called a mixed content page.

If the app is served over `HTTPS` you won't be able to monitor NATS servers served over `HTTP` (Most browsers block mixed content).

This is the case when using the app hosted on https://natsdashboard.com.

**Note**: This does not affect NATS servers running on `localhost`.

**Solutions**:

1. Serve the NATS monitoring server over `HTTPS`.
2. Reverse proxy the monitoring server on `localhost` (Browsers allow locally delivered mixed content).

For example:

```sh
# Reverse proxy a NATS monitoring server on localhost:8222.
# Now http://localhost:8222 can be used to monitor the server without it being blocked by the browser.
docker run --rm -it --net host caddy caddy reverse-proxy --from http://localhost:8222 --to http://example.com:8222
```

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

The environment variable `SITE_DOMAIN` will be passed as a build argument if set.

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

The environment variable `SITE_DOMAIN` will be passed as a build argument if set.

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

The service worker is generated after the site is built, it's available at `src/sw.ts`, it's built by `vite` using the script `scripts/build-sw.mjs` and then the [Workbox](https://developer.chrome.com/docs/workbox) precache manifest is injected by the `scripts/workbox.mjs` script.

The service worker is registered only in production mode by the script `src/sw-register.ts` that's imported by the base layout at `src/layouts/Base.astro`.

To test locally, use `make preview` to build the Docker container and run a Caddy server similar to a production environment.

#### Generate the Service Worker

```sh
# This is automatically run after the build script.
npm run generateSW
```

## GitHub Actions Requirements

#### Repository Variables

| Variable Name    | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| `DOCKERHUB_USER` | Required to push the Docker image to Docker Hub.               |
| `SITE_DOMAIN`    | Needed to generate a sitemap and the URL meta tags (Optional). |

#### Repository Secrets

| Secret Name             | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `CLOUDFLARE_ACCOUNT_ID` | Required for uploading the assets to Cloudflare Pages.       |
| `CLOUDFLARE_ZONE_ID`    | Required for purging the zone cache.                         |
| `CLOUDFLARE_API_TOKEN`  | Required for Clouflare Pages and for purging the zone cache. |
| `DOCKERHUB_TOKEN`       | Required to push the Docker image to Docker Hub.             |

#### Required Permissions

- Cloudflare [API Token](https://dash.cloudflare.com/profile/api-tokens) with the following permissions:

  - Account > Cloudflare Pages > Edit
  - Zone > Cache Purge > Purge

- Docker Hub [token](https://hub.docker.com/settings/security) with **Read, write, delete** scope.

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
