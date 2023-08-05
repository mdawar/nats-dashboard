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

## Build the Web App

```sh
# Build a static web app to ./dist
npm run build
```

## Credits

- [Astro](https://astro.build/): Web Framework
- [Solid](https://www.solidjs.com/): UI Framework
- [Tailwind UI](https://tailwindui.com/): Tailwind CSS components
- [Heroicons](https://heroicons.com/): SVG Icons
- [CNCF Artwork](https://github.com/cncf/artwork): NATS logo
