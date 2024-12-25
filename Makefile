# Variables
UID := $(shell id -u)
GID := $(shell id -g)
COMPOSE := docker-compose -p quickdev_app

# Commandes
.PHONY: help up down restart logs bash backend frontend

help:
	@echo "Usage:"
	@echo "  make up          Démarre les conteneurs"
	@echo "  make down        Arrête et supprime les conteneurs"
	@echo "  make restart     Redémarre les conteneurs"
	@echo "  make logs        Affiche les logs des conteneurs"
	@echo "  make bash        Ouvre un shell dans le conteneur backend"
	@echo "  make backend     Exécute un shell dans le conteneur backend"
	@echo "  make frontend    Exécute un shell dans le conteneur frontend"

up:
	UID=$(UID) GID=$(GID) $(COMPOSE) up --build -d

down:
	$(COMPOSE) down

delete:
	$(COMPOSE) down -v

restart: down up

logs:
	$(COMPOSE) logs -f

backend:
	$(COMPOSE) exec backend sh

frontend:
	$(COMPOSE) exec frontend sh
