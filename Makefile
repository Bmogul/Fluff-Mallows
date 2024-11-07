# Makefile
# Basic variables
BINARY_NAME=myapp
DC=docker compose

# Docker-specific variables
DOCKER_SERVICE=app  # Your service name in docker-compose.yml
DOCKER_EXEC=$(DC) exec $(DOCKER_SERVICE)

.PHONY: help dev docker-dev up down test docker-test

help: ## Show available commands
	@echo 'Usage: make [target]'
	@echo 'Local commands:'
	@echo '  make dev         	- Run locally with Air'
	@echo '  make test        	- Run tests locally'
	@echo 'Docker commands:'
	@echo '  make up  					- Start Docker env'
	@echo '  make down			  	- Stop Docker env'
	@echo '  make docker-dev  	- Run in Docker with Air'
	@echo '  make docker-test 	- Run tests in Docker'
	@echo '  make docker-shell	- Get shell in Docker container'

##@ Local Development
dev: ## Start local development with Air
	air

test: ## Run tests locally
	go test -v ./...

##@ Docker Development
up: ## Start Docker environment
	$(DC) up -d

down: ## Stop Docker environment
	$(DC) down

docker-dev: up ## Run development environment in Docker
	$(DOCKER_EXEC) air

docker-test: ## Run tests in Docker container
	$(DOCKER_EXEC) go test -v ./...

docker-shell: ## Get a shell inside the container
	$(DOCKER_EXEC) sh

##@ Database
migrate-up: ## Run database migrations
	@if [ -z "$(DOCKER)" ]; then \
		migrate -path db/migrations -database "${DB_URL}" up; \
	else \
		$(DOCKER_EXEC) migrate -path db/migrations -database "${DB_URL}" up; \
	fi
