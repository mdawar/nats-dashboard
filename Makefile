server:
	docker compose up

clean:
	docker compose down -v


.PHONY: server clean
