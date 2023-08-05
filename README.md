# NATS Web Dashboard

A web dashboard to display the NATS monitoring metrics.

## TODO

- [ ] Encapsulate last server stats cache
- [ ] Customize the polling time
- [ ] Display raw numbers/bytes
- [ ] Add empty state when no server URL is set
- [ ] Add the mobile menu transition effects
- [ ] Save theme preference
- [ ] Check if dark mode is already set

## About

This is a **static web app** that was inspired by [`nats-top`](https://github.com/nats-io/nats-top), it uses a similar way to fetch the monitoring stats of a NATS server but in the browser instead of the CLI.

Since this is a static web app, it **can be deployed anywhere** and can also **run locally** on your machine.

There's **no backend** involved, the requests are made directly from the browser, so you can monitor a **local NATS server** (http://localhost:8222) even when the app is not running locally.

There's **no data retention**, so no historical stats can be displayed, you will only be able to view the live server stats, if you need this feature you should use a Prometheus exporter with Grafana and set an appropriate retention policy.

## Development

#### Run a local NATS server

```sh
# Start a NATS server using Docker compose
make server
# Remove containers and volumes
make clean
```

#### Run the web app in dev mode

```sh
npm start
```

## Build the App

```sh
# Build a static web app to ./dist
npm run build
```

## Data Fetching

NATS monitoring server does not support [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), but it does support [JSONP](https://en.wikipedia.org/wiki/JSONP) which can be used to fetch the data using a workaround by injecting a `<script>` tag that executes and calls a JavaScript function that receives the data, otherwise we would have to proxy these requests using a reverse proxy or make these requests on a backend.

This is a workaround until NATS starts supporting CORS (Server HTTP headers required) but this method will be kept for the servers without CORS support.

## Alternatives

- [`nats-top`](https://github.com/nats-io/nats-top): A top-like tool for monitoring NATS servers.
- [`prometheus-nats-exporter`](https://github.com/nats-io/prometheus-nats-exporter): A Prometheus exporter for NATS metrics.
- [`nats-surveyor`](https://github.com/nats-io/nats-surveyor): Another Prometheus exporter

## Credits

- [Astro](https://astro.build/): Web Framework
- [Solid](https://www.solidjs.com/): UI Framework
- [Tailwind UI](https://tailwindui.com/): Tailwind CSS components
- [Heroicons](https://heroicons.com/): SVG Icons
- [CNCF Artwork](https://github.com/cncf/artwork): NATS logo
