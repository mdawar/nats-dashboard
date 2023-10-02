FROM node:20.8 AS build
ARG SITE_DOMAIN
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM caddy:2-alpine AS main
COPY config/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 80
