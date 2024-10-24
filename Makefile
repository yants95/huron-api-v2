include .env

DOCKER_COMPOSE := docker-compose -f docker-compose.yml
USER_HOST := $(shell id -u):$(shell id -g)

#
# Start & Shutdown
#

network:
	docker network create huron-network

yarn-install:
	$(DOCKER_COMPOSE) run --rm huron-app sh -c "yarn && chown -R ${USER_HOST} ./node_modules"

up-kafka:
	$(DOCKER_COMPOSE) up -d huron-kafka

up-consumer:
	$(DOCKER_COMPOSE) up -d huron-consumer

up-app:
	$(DOCKER_COMPOSE) up -d huron-app

up-app-kafka:
	$(DOCKER_COMPOSE) up -d huron-app huron-kafka

up:
	$(DOCKER_COMPOSE) up -d

down:
	$(DOCKER_COMPOSE) down

logs:
	$(DOCKER_COMPOSE) logs --follow

bash:
	$(DOCKER_COMPOSE) run huron-app sh

restart: restart-app

restart-%:
	$(DOCKER_COMPOSE) restart $*

#
# Lint
#

lint:
	make up
	docker exec -it huron-app yarn lint --fix

#
# Tests
#

test:
	make up
	docker exec -it huron-app yarn test --coverage

test-%:
	make up
	docker exec -it huron-app yarn test $* --coverage

test-watch:
	make up
	docker exec -it huron-app  yarn test:watch

coverage:
	make up
	docker exec -it huron-app  yarn test:cov

#
# Clear volumes
#

database-volume-clean:
	docker volume rm huron_mongo-data

kafka-volume-clean:
	docker volume rm huron_kafka-data huron_zookeeper-data huron_zookeeper-logs

.PHONY: network build yarn-install up-kafka up-app up down logs bash restart restart-% new-migration-% migrate-up migrate-down lint test test-% test-watch coverage list-topics create-topic-% create-message-topic-% database-volume-clean kafka-volume-clean
