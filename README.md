# NATS Web Dashboard

A web dashboard to display live [NATS server](https://nats.io/) monitoring metrics.

## About

This is a **static web app** that was inspired by [nats-top](https://github.com/nats-io/nats-top), it uses a similar way to fetch the monitoring stats of a [NATS server](https://nats.io/) but in the browser instead of the CLI.

Since this is a static web app, it **can be deployed anywhere** and can also **run locally** on your machine.

There's **no backend** involved, the requests are made directly from the browser, so you can monitor a **local NATS server** (http://localhost:8222) even when the app is not running locally.

There's **no data retention**, so no historical stats can be displayed, you will only be able to view the live server stats, if you need this feature you should use a Prometheus exporter with Grafana and set an appropriate data retention policy.

## Development

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

```sh
npm run test
# Run the tests and watch for changes
npm run test:watch
```

## Build the App

#### Build the Web App

```sh
# Build a static web app to ./dist
npm run build
```

#### Build Docker Image

```sh
make build
# Same as
docker compose build
```

Without using `docker compose`:

```sh
docker build -t nats-dashboard .
```

## Build and Preview

```sh
# Build the docker image and run on http://localhost:8000
# Also runs a local NATS server on port 4222
make preview
# Same as
docker compose up
# Remove containers and volumes
make clean
```

## Data Fetching

NATS monitoring server does not support [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), but it does support [JSONP](https://en.wikipedia.org/wiki/JSONP) which can be used to fetch the data using a workaround by injecting a `<script>` tag that executes and calls a JavaScript function that receives the data, otherwise we would have to proxy these requests using a reverse proxy or make these requests on a backend.

This is a workaround until NATS starts supporting CORS (Server HTTP headers required) but this method will be kept for the servers without CORS support.

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
