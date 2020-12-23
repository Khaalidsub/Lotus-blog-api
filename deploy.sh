#!/bin/bash
set -e
ssh-keyscan -H $IP >>~/.ssh/known_hosts

scp ./docker-compose.prod.yml $USER@$IP:.

ssh $USER@$IP echo "docker-compose -f docker-compose.prod.yml up -d --build; docker network inspect blogs-api_default"