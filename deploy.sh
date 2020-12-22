#!/bin/bash
set -e
ssh-keyscan -H $IP >>~/.ssh/known_hosts

ssh $USER@$IP echo "docker pull sleepinglotus/subaan-blogs-api;docker pull sleepinglotus/chat-client;"