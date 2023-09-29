FROM node:20.8 AS build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM caddy:2-alpine AS main
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 80
