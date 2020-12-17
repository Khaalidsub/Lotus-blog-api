#!/bin/bash
set -xe
ssh-keyscan -H $IP >>~/.ssh/known_hosts

ssh $USER_NAME@$IP

