help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

start: ## Start the docker containers
	@echo "Starting the docker containers"
	@docker compose up
	@echo "Containers started - http://localhost:8000"

migrations: ## Make the migrations
	@docker compose exec web python manage.py makemigrations

migrate: ## Apply the migrations
	@docker compose exec web python manage.py migrate

test: ## Run the tests
	@docker compose exec web python manage.py test

ssh: ## SSH into running web container
	@docker compose exec web bash


.PHONY: help
.DEFAULT_GOAL := help