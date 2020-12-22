#!/bin/bash
set -e
ssh-keyscan -H $IP >>~/.ssh/known_hosts

ls

ssh $USER@$IP echo "docker pull sleepinglotus/subaan-blogs-api;"