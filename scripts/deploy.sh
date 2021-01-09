#!/bin/bash -xe
ssh-keyscan -H $IP >>~/.ssh/known_hosts
ssh $USER@$IP  "./dockerPull.sh"
