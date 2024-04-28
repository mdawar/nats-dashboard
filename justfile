_default:
	@just -lu

# Build the Docker image.
build:
	docker compose build

# Run a preview of the app (Useful for testing SSG and the service worker).
preview: build
	docker compose up

# Run a local NATS server.
server:
	docker compose up server

# Remove the containers and volumes.
clean:
	docker compose down -v
