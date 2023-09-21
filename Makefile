build:
	docker compose build

preview: build
	docker compose up

server:
	docker compose up server

clean:
	docker compose down -v

.PHONY: build preview server clean
