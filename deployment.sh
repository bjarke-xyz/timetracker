#!/usr/bin/env bash
docker-compose build && docker-compose pus
docker stack deploy --compose=docker-compose.yml --with-registry-auth timetracker
