FROM node:21.5 AS build
ARG SITE_DOMAIN
ARG PUBLIC_SERVERS_LIST
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM caddy:2-alpine AS main
COPY config/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 80
