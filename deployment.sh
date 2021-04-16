#!/usr/bin/env bash
docker-compose build && docker-compose down --remove-orphans && docker-compose up -d